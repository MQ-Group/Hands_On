# 体系结构模拟器使用方法

本页汇总课题组常用的体系结构模拟器的安装与基本用法，当前包含：Ramulator2、Olive。

> 提示：不同版本可能略有差异，请以各项目的官方 README 为准，并在本地根据实际硬件与依赖版本进行调整。

## Ramulator2（内存系统模拟器）

- **简介**：Ramulator2 是新一代的开源内存系统模拟器，支持多种现代 DRAM 标准与研究原型，常用于体系结构与存储系统研究。
- **依赖**：建议使用较新的编译工具链与 CMake；运行示例通常需要配置 YAML/JSON 工作负载与内存配置文件。

### 安装构建（示例）
```bash
# 获取源码
git clone https://github.com/CMU-SAFARI/ramulator2.git
cd ramulator2

# 构建（示例，具体以官方说明为准）
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc)
```

### 运行示例（示意）
```bash
# 可执行文件名称可能因版本变化而不同，以下作为示意
./ramulator2 \
  --config ../configs/example/ddr4.yaml \
  --workload ../workloads/example/traces.yaml \
  --stats out/stats.yaml
```
- 常见参数：
  - `--config`：内存/控制器配置（YAML/JSON）。
  - `--workload`：工作负载/trace 或生成器配置。
  - `--stats`：输出统计结果路径（通常为 YAML/JSON/TOML）。
- 常见实践：
  - 修改控制器/调度策略相关的配置并对比统计数据。
  - 使用不同 DRAM 标准配置（如 DDR4、HBM、LPDDR 等）进行灵敏度分析。

### 结果与可视化
- 运行后通常会产生统计文件（如 `stats.yaml`）。
- 可使用 Python 脚本读取并可视化：
```bash
pip install pandas matplotlib ruamel.yaml
python - <<'PY'
import sys
import yaml
import pandas as pd
import matplotlib.pyplot as plt
with open('out/stats.yaml') as f:
    stats = yaml.safe_load(f)
print(list(stats.keys()))
# 根据项目实际字段绘图
PY
```

---

## Olive（体系结构/系统模拟相关项目）

> 说明：社区中存在多个名为 “Olive” 的项目（如模型优化/部署工具、硬件/体系结构相关工具等）。本节聚焦于体系结构仿真/研究语境下常见的 Olive 类项目的通用用法模板。请替换为你所使用的具体 Olive 仓库与命令。

### 获取与安装（示例模板）
```bash
git clone https://github.com/<org>/olive.git
cd olive
# 若为 C++ 项目
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc)
# 若为 Python 项目
# pip install -e .
```

### 基本运行（示例模板）
```bash
# 示例：运行一个配置与工作负载
./olive \
  --config configs/example.yaml \
  --input  workloads/trace.fxt \
  --stats  out/olive_stats.json
```
- 根据仓库 README 调整：
  - 配置文件路径、trace 格式与统计输出位置。
  - 线程/核数、缓存层级、内存模型等参数。

### 常见排错
- 确认依赖（编译器版本、第三方库、Python 依赖）。
- 使用 `--help` 或查看 `examples/`、`configs/` 目录。
- 若为学术仓库，注意子模块更新：
```bash
git submodule update --init --recursive
```

---

## 参考
- Ramulator2 官方仓库：`https://github.com/CMU-SAFARI/ramulator2`
- 请将具体 Olive 仓库链接补充到此处，以便统一维护。
