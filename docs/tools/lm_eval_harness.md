# lm_eval_harness 使用方法

`lm-evaluation-harness`（简称 `lm_eval`）是 EleutherAI 开源的语言模型评测框架，支持多种模型后端与任务集合。

## 安装

> 推荐使用 Python 3.9+ 与虚拟环境。
```bash
# 获取源码并以开发模式安装（或直接 pip 安装发行版）
git clone https://github.com/EleutherAI/lm-evaluation-harness.git
cd lm-evaluation-harness
pip install -e .
# 可选：安装额外依赖（根据需要选择）
# pip install ".[huggingface,torch,accelerate,dev]"
```

## 快速上手

- 列出可用任务：
```bash
lm_eval --tasks list
```

- 评测 Hugging Face Hub 上的模型（示例：GPT-J-6B 在 hellaswag）：
```bash
lm_eval \
  --model hf \
  --model_args pretrained=EleutherAI/gpt-j-6B \
  --tasks hellaswag \
  --device cuda:0 \
  --batch_size auto
```

- 评测多个任务与自定义精度：
```bash
lm_eval \
  --model hf \
  --model_args pretrained=EleutherAI/pythia-160m,dtype=float \
  --tasks lambada_openai,arc_easy \
  --device cuda:0 \
  --batch_size auto
```

- 评测本地模型权重：
```bash
lm_eval \
  --model hf \
  --model_args pretrained=/path/to/local/model \
  --tasks hellaswag \
  --device cuda:0
```

## 多 GPU 与大模型

- 使用 accelerate 进行数据并行：
```bash
accelerate launch -m lm_eval \
  --model hf \
  --model_args pretrained=EleutherAI/pythia-1.4b \
  --tasks lambada_openai,arc_easy \
  --batch_size 16
```

- 将模型按权重映射到多卡（张量并行/自动切分）：
```bash
lm_eval \
  --model hf \
  --model_args pretrained=big/model,parallelize=True,device_map_option=auto \
  --tasks hellaswag \
  --batch_size auto
```
常用可选项（因版本而异）：`max_memory_per_gpu`、`max_cpu_memory`、`offload_folder`。

## 结果与导出

默认会在控制台打印分数。可添加输出到文件：
```bash
lm_eval \
  --model hf \
  --model_args pretrained=EleutherAI/pythia-160m \
  --tasks hellaswag \
  --output_path results/pythia160m_hellaswag.json
```

## 常见问题
- CUDA/显存不足：降低 `--batch_size` 或启用 `parallelize=True`。
- 权限错误/模型下载失败：设置 `HF_HOME`、`HF_TOKEN` 或提前 `huggingface-cli login`。
- 任务不可用：使用 `lm_eval --tasks list` 检查任务名；部分任务需额外数据依赖。

## 参考
- 项目主页：`https://github.com/EleutherAI/lm-evaluation-harness`
