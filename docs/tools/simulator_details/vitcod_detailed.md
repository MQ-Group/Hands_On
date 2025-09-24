# ViTCoD Vision Transformer 加速器详细运行记录

## 概述

ViTCoD (Vision Transformer Acceleration via Dedicated Algorithm and Accelerator Co-Design) 是专门针对Vision Transformer的硬件加速器仿真器，发表于HPCA 2023。

## 运行环境

- **位置**: `/data5/wangmeiqi/simulator/ViTCoD/`
- **Python环境**: base conda环境
- **依赖**: numpy, matplotlib等基础科学计算包

## 详细运行步骤

### 步骤1: 环境准备

```bash
cd /data5/wangmeiqi/simulator/ViTCoD/Hardware/Simulator
```

检查目录结构：
```
ViTCoD/Hardware/Simulator/
├── figs/                    # 架构图和说明图
│   ├── arch.png            # 加速器架构图
│   └── sparse_attention.jpg # 稀疏注意力示意图
├── masks/                   # 预训练的注意力掩码数据
│   └── deit_tiny_lowrank/
│       ├── info_0.95.npy   # 95%稀疏度注意力图
│       └── ...
├── PE.py                    # 处理单元模拟
├── SRAM.py                 # 存储器模拟
├── ViTCoD.py              # 主仿真器
├── ViT_FFN.py             # FFN层仿真
└── reorder.py             # 注意力图重排序
```

### 步骤2: 注意力图极化预处理

```bash
python reorder.py
```

**执行过程**：
- 读取DeiT-Tiny模型在95%稀疏度下的注意力图
- 将稀疏注意力图重新组织为密集和稀疏两种模式
- 生成优化后的数据结构

**生成文件**：
- `global_token_info_0.95.npy`: 记录密集区域的token数量
- `reodered_info_0.95.npy`: 重排序后的稀疏模式

### 步骤3: 注意力计算仿真

```bash
python ViTCoD.py \
    --root 'masks/deit_tiny_lowrank' \
    --sparse 0.95 \
    --feature_dim 64 \
    --ratio 0.667 \
    --PE_width 64 \
    --PE_height 8
```

**参数解析**：
- `--root`: 注意力掩码数据目录
- `--sparse 0.95`: 95%稀疏度
- `--feature_dim 64`: 特征维度（DeiT-Tiny的头维度）
- `--ratio 0.667`: 密集引擎占总PE的比例
- `--PE_width 64`: PE阵列宽度
- `--PE_height 8`: PE阵列高度

**实际运行结果**：

```
[2023/06/27 21:16:22] - Shape: (12, 3, 197, 64)
[2023/06/27 21:16:22] - ******************************
[2023/06/27 21:16:22] - Layer: 0; Head: 0
[2023/06/27 21:16:22] - global tokens: 1
[2023/06/27 21:16:22] - Dense SpMM dataloader | cycles: 200
[2023/06/27 21:16:22] - Dense SpMM decoder | cycles: 198
[2023/06/27 21:16:22] - Sparse SpMM dataloader | cycles: 197
[2023/06/27 21:16:22] - Sparse SpMM decoder | cycles: 196
[2023/06/27 21:16:22] - Dense SDMM PE caclulation | cycles: 120
[2023/06/27 21:16:22] - Sparse SDMM PE caclulation | cycles: 117
```

**逐层分析**：

| 层编号 | 全局Token数 | 密集引擎周期 | 稀疏引擎周期 | 特点 |
|--------|-------------|--------------|--------------|------|
| Layer 0 | 1 | 200 | 392 | 极稀疏，大部分计算在稀疏引擎 |
| Layer 2 | 70 | 269 | 254 | 密集区域较大，负载均衡 |
| Layer 5 | 20 | 219 | 354 | 中等密集度 |
| Layer 11 | 31 | 230 | 332 | 最后一层，密集度适中 |

**最终统计结果**：
```
[2023/06/27 21:16:22] - ******************************
[2023/06/27 21:16:22] - number of non-zeros in the sparser region: 0.03630901957304232
[2023/06/27 21:16:22] - total preloading cycles: 9492
[2023/06/27 21:16:22] - total processing cycles: 4728
[2023/06/27 21:16:22] - total Computation cycles: 4709
[2023/06/27 21:16:22] - ******************************
[2023/06/27 21:16:22] - Total cycles: 9492
```

### 步骤4: FFN层仿真

```bash
python ViT_FFN.py \
    --root 'masks/deit_tiny_lowrank' \
    --sparse 0.95 \
    --feature_dim 64 \
    --embedding 192 \
    --ratio 0.667 \
    --PE_width 64 \
    --PE_height 8
```

**新增参数**：
- `--embedding 192`: DeiT-Tiny的嵌入维度

**FFN运行结果**：
```
[2023/06/27 21:16:10] - ******************************
[2023/06/27 21:16:10] - total linear preprocessing cycles: 0
[2023/06/27 21:16:10] - total linear preloading cycles: 23304
[2023/06/27 21:16:10] - total linear computation cycles: 681492
[2023/06/27 21:16:10] - total ffn preloading cycles: 0
[2023/06/27 21:16:10] - total ffn computation cycles: 1361664
[2023/06/27 21:16:10] - 
[2023/06/27 21:16:10] - total linear cycles: 681492
[2023/06/27 21:16:10] - total ffn cycles: 1361664
[2023/06/27 21:16:10] - total cycles: 2043156
[2023/06/27 21:16:10] - ******************************
```

## 性能分析

### 注意力计算性能

1. **稀疏度效果**：
   - 稀疏区域非零元素比例：3.63%
   - 实现了96.37%的稀疏度

2. **双引擎负载分配**：
   - 密集引擎：处理重排序后的密集区域
   - 稀疏引擎：处理极稀疏区域
   - 动态PE分配比例：2:1（密集:稀疏）

3. **延迟分解**：
   - 数据预加载：9,492 cycles
   - 实际计算：4,709 cycles
   - 预加载占总延迟的66.8%

### FFN计算性能

1. **计算分布**：
   - 线性投影层：681,492 cycles (33.4%)
   - FFN层：1,361,664 cycles (66.6%)

2. **内存访问**：
   - 线性层预加载：23,304 cycles
   - FFN层预加载：0 cycles（数据重用）

### 端到端性能

- **注意力总延迟**：9,492 cycles
- **FFN总延迟**：2,043,156 cycles
- **注意力占比**：0.46%
- **FFN占比**：99.54%

**关键洞察**：
1. FFN层是主要的计算瓶颈，占总延迟的99.5%以上
2. 注意力计算通过稀疏化获得了显著加速
3. 数据预加载是注意力计算的主要延迟来源

## 架构特色

### 1. 注意力图极化算法
- 将随机稀疏模式重组为规整的密集+稀疏模式
- 提高硬件利用率，减少负载不均衡

### 2. 双引擎架构
- 密集引擎：优化密集计算，提高吞吐量
- 稀疏引擎：处理稀疏计算，避免无效操作

### 3. 片上编解码器
- 压缩Q、K矩阵，减少存储需求
- 动态解压缩，平衡计算和存储

## 使用建议

1. **稀疏度选择**：95%稀疏度在精度和性能间达到良好平衡
2. **PE配置**：64x8的PE阵列适合DeiT-Tiny规模
3. **比例调优**：密集:稀疏 = 2:1的PE分配比例较为合理

## 局限性

1. 仅支持固定稀疏模式，不适用于动态稀疏
2. 针对特定ViT架构优化，泛化性有限
3. 没有考虑实际硬件的制造约束
