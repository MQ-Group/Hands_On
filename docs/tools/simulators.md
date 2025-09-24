# 四大仿真器使用指南

本文档详细介绍了课题组常用的四个仿真器的使用方法、原理和测试结果。

## 📋 快速导航

| 仿真器 | 用途 | 详细文档 | 状态 |
|--------|------|----------|------|
| [ViTCoD](#1-vitcod-vision-transformer-加速器仿真器) | Vision Transformer加速器 | [详细运行记录](simulator_details/vitcod_detailed.md) | ✅ 已测试 |
| [Olive](#2-olive-onnx模型优化工具包) | ONNX模型优化 | [详细运行记录](simulator_details/olive_detailed.md) | ✅ 已测试 |
| [Ramulator2](#3-ramulator2-现代dram仿真器) | DRAM内存仿真 | [详细运行记录](simulator_details/ramulator2_detailed.md) | ✅ 已测试 |
| [SCALE-Sim v3](#4-scale-sim-v3-脉动阵列加速器仿真器) | CNN加速器仿真 | [详细运行记录](simulator_details/scalesim_detailed.md) | ✅ 已测试 |

!!! tip "使用建议"
    - 点击"详细运行记录"查看完整的安装、配置和运行过程
    - 每个仿真器都包含实际测试结果和性能分析
    - 建议先阅读本页概述，再查看详细文档

---

## 1. ViTCoD: Vision Transformer 加速器仿真器

### 简介

ViTCoD (Vision Transformer Acceleration via Dedicated Algorithm and Accelerator Co-Design) 是一个专门针对视觉Transformer的算法-硬件协同设计仿真器。它通过算法层面的注意力图稀疏化和硬件层面的专用加速器设计，实现了高效的ViT推理加速。

### 核心原理

**算法层面创新**：
- **注意力图极化**：将稀疏的注意力图重新组织为更密集或更稀疏的固定模式
- **自编码器压缩**：使用轻量级自编码器压缩Q和K矩阵，减少数据传输开销

**硬件层面创新**：
- **双引擎架构**：分别处理密集和稀疏的注意力模式
- **动态PE分配**：在密集和稀疏引擎间动态分配处理单元
- **片上编解码器**：集成编码器和解码器引擎

### 环境配置

```bash
# 进入ViTCoD目录
cd /data5/wangmeiqi/simulator/ViTCoD/Hardware/Simulator

# 确保Python环境包含numpy等基础包
pip install numpy matplotlib
```

### 使用步骤

#### 1. 注意力图极化预处理

```bash
python reorder.py
```

这一步会：
- 读取预训练的稀疏注意力图（存储在`masks/deit_tiny_lowrank/info_0.95.npy`）
- 将注意力图极化为密集和稀疏两种模式
- 生成`global_token_info_0.95.npy`（密集区域token数量）
- 生成`reodered_info_0.95.npy`（稀疏区域模式）

#### 2. 注意力计算延迟仿真

```bash
python ViTCoD.py \
    --root 'masks/deit_tiny_lowrank' \
    --sparse 0.95 \
    --feature_dim 64 \
    --ratio 0.667 \
    --PE_width 64 \
    --PE_height 8
```

**参数说明**：
- `--root`: 注意力图数据目录
- `--sparse`: 稀疏度（95%稀疏）
- `--feature_dim`: 特征维度
- `--ratio`: 密集/稀疏引擎PE分配比例
- `--PE_width`: PE阵列宽度
- `--PE_height`: PE阵列高度

#### 3. 端到端延迟仿真

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

### 仿真结果分析

从我们的测试结果可以看到：

**注意力计算部分**：
- 总预加载周期：9,492 cycles
- 总处理周期：4,728 cycles  
- 总计算周期：4,709 cycles
- **注意力总周期：9,492 cycles**

**FFN计算部分**：
- 线性层预加载：23,304 cycles
- 线性层计算：681,492 cycles
- FFN计算：1,361,664 cycles
- **FFN总周期：2,043,156 cycles**

**性能优势**：
- 通过注意力图极化，显著减少了不规则访存
- 动态PE分配提高了硬件利用率
- 片上编解码器减少了数据传输开销

---

## 2. Olive: ONNX模型优化工具包

### 简介

Olive (ONNX LIVE) 是Microsoft开发的AI模型优化工具包，专门针对ONNX Runtime进行模型优化。它能够自动选择最佳的优化技术组合，在满足精度和延迟约束的前提下，输出最高效的ONNX模型。

### 核心原理

**优化技术栈**：
- **量化**：支持INT8、INT4等多种量化方案
- **剪枝**：结构化和非结构化剪枝
- **知识蒸馏**：模型压缩
- **图优化**：ONNX图级别优化
- **硬件适配**：针对不同硬件平台优化

**自动优化流程**：
1. 模型获取（从Hugging Face等）
2. 量化优化（GPTQ、AWQ等）
3. ONNX图捕获和优化
4. 硬件特定优化

### 环境配置

```bash
# 安装Olive CLI
pip install olive-ai[auto-opt]
pip install transformers onnxruntime-genai

# 或从源码安装
cd /data5/wangmeiqi/simulator/Olive
pip install -e .
```

### 使用方法

#### 1. 命令行自动优化

```bash
# 基本优化命令
olive optimize \
    --model_name_or_path microsoft/DialoGPT-medium \
    --precision int4 \
    --output_path models/dialogpt \
    --device cpu
```

**参数说明**：
- `--model_name_or_path`: 模型名称或路径
- `--precision`: 目标精度（fp32, fp16, int8, int4）
- `--output_path`: 输出路径
- `--device`: 目标设备（cpu, cuda, etc.）

#### 2. 支持的模型架构

Olive支持多种主流模型架构：
- **语言模型**：Llama, GPT, BERT, T5
- **视觉模型**：ResNet, EfficientNet, ViT
- **多模态模型**：CLIP, BLIP

#### 3. 高级配置

可以通过YAML配置文件进行更精细的控制：

```yaml
# olive_config.yaml
model:
  type: hf_model
  model_path: microsoft/DialoGPT-medium

passes:
  quantization:
    type: gptq
    bits: 4
  
  optimization:
    type: onnx_optimization
    
engine:
  type: onnx_runtime
  providers: [CPUExecutionProvider]
```

### 优化效果

**模型压缩**：
- INT4量化可减少75%的模型大小
- 推理速度提升2-4倍
- 内存占用显著降低

**支持的优化技术**：
- GPTQ、AWQ量化算法
- 动态量化和静态量化
- 模型剪枝和知识蒸馏

---

## 3. Ramulator2: 现代DRAM仿真器

### 简介

Ramulator 2.0是一个现代化、模块化、可扩展的周期精确DRAM仿真器。它是Ramulator 1.0的继承者，在保持高仿真速度的同时，提供了更好的扩展性和易用性。

### 核心原理

**DRAM建模**：
- **多标准支持**：DDR3/4/5, LPDDR5, GDDR6, HBM2/3
- **周期精确**：精确建模DRAM时序和状态转换
- **可扩展架构**：接口与实现分离的设计模式

**内存控制器功能**：
- **调度算法**：FRFCFS, FCFS等多种调度策略
- **刷新管理**：支持多种刷新策略
- **RowHammer缓解**：集成多种RowHammer防护技术

### 环境配置

```bash
# 确保C++20编译器可用
# 推荐 g++-12 或 clang++-15

cd /data5/wangmeiqi/simulator/ramulator2
mkdir build && cd build
cmake ..
make -j
cp ./ramulator2 ../ramulator2
```

### 使用方法

#### 1. 基本仿真

```bash
# 使用默认配置运行
./ramulator2 -f ./example_config.yaml
```

#### 2. 配置文件详解

```yaml
# example_config.yaml
Frontend:
  impl: SimpleO3          # 前端实现
  clock_ratio: 8          # 时钟比例
  num_expected_insts: 500000  # 预期指令数
  traces: 
    - example_inst.trace   # 指令trace文件

MemorySystem:
  impl: GenericDRAM       # 内存系统实现
  clock_ratio: 3          # 内存时钟比例
  
  DRAM:
    impl: DDR4            # DRAM类型
    org:
      preset: DDR4_8Gb_x8 # 组织结构预设
      channel: 1          # 通道数
      rank: 2            # Rank数
    timing:
      preset: DDR4_2400R  # 时序预设
```

#### 3. 参数扫描

```python
import os
import yaml

baseline_config_file = "./example_config.yaml"
nRCD_list = [10, 15, 20, 25]

with open(baseline_config_file, 'r') as f:
    base_config = yaml.safe_load(f)

for nRCD in nRCD_list:
    base_config["MemorySystem"]["DRAM"]["timing"]["nRCD"] = nRCD
    cmd = ["./ramulator2", yaml.dump(base_config)]
    # 运行仿真...
```

### 仿真结果

**性能指标**：
- **带宽利用率**：实际带宽/理论带宽
- **平均延迟**：内存访问平均延迟
- **队列占用率**：请求队列平均占用

**支持的分析**：
- Bank冲突分析
- 行缓冲命中率
- 功耗估算（配合DRAMPower）

---

## 4. SCALE-Sim v3: 脉动阵列加速器仿真器

### 简介

SCALE-Sim v3是一个专门针对脉动阵列架构的CNN加速器仿真器。它支持卷积、全连接等多种层类型的仿真，并提供了稀疏性支持、内存建模、能耗分析等高级功能。

### 核心原理

**脉动阵列建模**：
- **PE阵列**：可配置的处理单元阵列
- **数据流**：支持多种数据流（Weight Stationary, Output Stationary等）
- **内存层次**：片上SRAM + 片外DRAM建模

**高级功能**：
- **稀疏性支持**：层级稀疏性和行级稀疏性
- **多核支持**：多核脉动阵列仿真
- **内存建模**：集成Ramulator进行详细内存建模
- **能耗分析**：集成Accelergy进行能耗估算

### 环境配置

```bash
cd /data5/wangmeiqi/simulator/scale-sim-v3

# 安装依赖
pip install -r requirements.txt

# 安装SCALE-Sim
pip install -e .
```

### 使用方法

#### 1. 基本仿真

```bash
python -m scalesim.scale \
    -c configs/scale.cfg \
    -t topologies/CSV/MLPERF.csv \
    -p outputs
```

**参数说明**：
- `-c`: 架构配置文件
- `-t`: 网络拓扑文件
- `-p`: 输出目录

#### 2. 配置文件详解

```ini
# configs/scale.cfg
[architecture_presets]
ArrayHeight: 32        # PE阵列高度
ArrayWidth: 32         # PE阵列宽度
IfmapSramSzkB: 64     # 输入特征图SRAM大小
FilterSramSzkB: 64    # 权重SRAM大小
OfmapSramSzkB: 64     # 输出特征图SRAM大小
Dataflow: ws          # 数据流类型
Bandwidth: 10         # 内存带宽

[sparsity]
SparsitySupport: true  # 稀疏性支持
SparseRep: csr        # 稀疏表示方法
BlockSize: 8          # 块大小
```

#### 3. 网络拓扑文件

```csv
# topologies/CSV/example.csv
Layer name, IFMAP Height, IFMAP Width, Filter Height, Filter Width, Channels, Num Filter, Strides,
Conv1, 224, 224, 3, 3, 3, 64, 1,
Conv2, 224, 224, 3, 3, 64, 64, 1,
# ... 更多层
```

### 仿真输出

**报告文件**：
- `COMPUTE_REPORT.csv`: 计算周期、停顿、利用率
- `BANDWIDTH_REPORT.csv`: 带宽需求分析
- `DETAILED_ACCESS_REPORT.csv`: 详细访存分析

**关键指标**：
- **计算利用率**：实际计算/理论峰值
- **内存带宽利用率**：实际带宽需求/可用带宽
- **能耗分解**：计算、存储、数据传输能耗

---

## 总结与对比

| 仿真器 | 主要用途 | 特色功能 | 适用场景 |
|--------|----------|----------|----------|
| ViTCoD | ViT加速器 | 注意力图极化、双引擎架构 | Vision Transformer优化 |
| Olive | 模型优化 | 自动优化、多精度量化 | 模型部署优化 |
| Ramulator2 | DRAM仿真 | 多标准支持、RowHammer防护 | 内存系统分析 |
| SCALE-Sim v3 | CNN加速器 | 稀疏性支持、多核仿真 | 脉动阵列设计 |

这四个仿真器覆盖了从算法优化到硬件架构设计的完整链条，为AI加速器研究提供了强有力的工具支持。