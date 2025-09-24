# lm_eval_harness 语言模型评估工具使用指南

lm_eval_harness 是一个统一的语言模型评估框架，支持多种模型架构和评估任务，是目前最权威的LLM评估工具之一。

---

## 简介

lm_eval_harness 由EleutherAI开发，提供了：
- **标准化评估**：统一的评估协议和指标
- **多任务支持**：200+评估任务
- **模型兼容性**：支持Hugging Face、OpenAI API等多种模型
- **可重现性**：确保评估结果的一致性和可比性

## 安装与配置

### 基础安装

```bash
# 从PyPI安装
pip install lm_eval

# 或从源码安装（推荐）
git clone https://github.com/EleutherAI/lm-evaluation-harness
cd lm-evaluation-harness
pip install -e .
```

### 额外依赖

```bash
# 支持更多模型后端
pip install lm_eval[all]

# 特定后端支持
pip install lm_eval[vllm]          # vLLM支持
pip install lm_eval[anthropic]     # Anthropic API
pip install lm_eval[openai]        # OpenAI API
```

## 核心概念

### 任务(Tasks)
- **语言理解**：阅读理解、常识推理
- **数学推理**：GSM8K、MATH等
- **代码生成**：HumanEval、MBPP等
- **多语言**：多种语言的评估任务

### 模型后端(Model Backends)
- **hf (Hugging Face)**：本地Transformers模型
- **vllm**：高性能推理引擎
- **openai**：OpenAI API
- **anthropic**：Anthropic API

### 评估指标
- **准确率(Accuracy)**：分类任务
- **困惑度(Perplexity)**：语言建模
- **BLEU/ROUGE**：文本生成
- **Pass@k**：代码生成

## 基本使用

### 1. 快速开始

```bash
# 评估GPT-2在HellaSwag任务上的表现
lm_eval --model hf \
        --model_args pretrained=gpt2 \
        --tasks hellaswag \
        --device cuda:0 \
        --batch_size 8
```

### 2. 多任务评估

```bash
# 评估多个任务
lm_eval --model hf \
        --model_args pretrained=microsoft/DialoGPT-medium \
        --tasks arc_easy,arc_challenge,hellaswag,winogrande \
        --device cuda:0 \
        --batch_size 4
```

### 3. 自定义模型路径

```bash
# 评估本地模型
lm_eval --model hf \
        --model_args pretrained=/path/to/your/model \
        --tasks mmlu \
        --device cuda:0 \
        --batch_size 2
```

## 高级用法

### 1. 使用vLLM后端

```bash
# 使用vLLM进行高效推理
lm_eval --model vllm \
        --model_args pretrained=meta-llama/Llama-2-7b-hf,tensor_parallel_size=1 \
        --tasks gsm8k \
        --batch_size 8
```

### 2. Few-shot评估

```bash
# 设置few-shot示例数量
lm_eval --model hf \
        --model_args pretrained=gpt2 \
        --tasks arc_challenge \
        --num_fewshot 5 \
        --device cuda:0
```

### 3. 限制样本数量

```bash
# 限制每个任务的样本数（用于快速测试）
lm_eval --model hf \
        --model_args pretrained=gpt2 \
        --tasks hellaswag \
        --limit 100 \
        --device cuda:0
```

### 4. 保存结果

```bash
# 保存详细结果到文件
lm_eval --model hf \
        --model_args pretrained=gpt2 \
        --tasks arc_easy \
        --output_path results/ \
        --log_samples \
        --device cuda:0
```

## 重要任务介绍

### 1. 常识推理

**HellaSwag**：句子完成任务
```bash
lm_eval --model hf \
        --model_args pretrained=your_model \
        --tasks hellaswag \
        --device cuda:0
```

**WinoGrande**：代词消歧任务
```bash
lm_eval --model hf \
        --model_args pretrained=your_model \
        --tasks winogrande \
        --device cuda:0
```

### 2. 阅读理解

**ARC (AI2 Reasoning Challenge)**：
```bash
# ARC-Easy和ARC-Challenge
lm_eval --model hf \
        --model_args pretrained=your_model \
        --tasks arc_easy,arc_challenge \
        --device cuda:0
```

### 3. 数学推理

**GSM8K**：小学数学应用题
```bash
lm_eval --model hf \
        --model_args pretrained=your_model \
        --tasks gsm8k \
        --device cuda:0
```

**MATH**：竞赛级数学题
```bash
lm_eval --model hf \
        --model_args pretrained=your_model \
        --tasks math \
        --device cuda:0
```

### 4. 代码生成

**HumanEval**：Python代码生成
```bash
lm_eval --model hf \
        --model_args pretrained=your_model \
        --tasks humaneval \
        --device cuda:0
```

### 5. 综合评估

**MMLU (Massive Multitask Language Understanding)**：
```bash
lm_eval --model hf \
        --model_args pretrained=your_model \
        --tasks mmlu \
        --device cuda:0
```

## 实用技巧

### 1. 查看可用任务

```bash
# 列出所有可用任务
lm_eval --tasks list

# 搜索特定任务
lm_eval --tasks list | grep math
```

### 2. 任务组合

```bash
# 使用预定义的任务组
lm_eval --model hf \
        --model_args pretrained=your_model \
        --tasks leaderboard \
        --device cuda:0
```

### 3. 内存优化

```bash
# 对于大模型，使用较小的batch size
lm_eval --model hf \
        --model_args pretrained=your_model,device_map=auto \
        --tasks hellaswag \
        --batch_size 1 \
        --device cuda:0
```

### 4. 并行评估

```bash
# 使用多GPU
lm_eval --model hf \
        --model_args pretrained=your_model,device_map=auto \
        --tasks mmlu \
        --batch_size 4
```

## 结果解释

### 输出格式

典型的评估结果包含：

```json
{
  "results": {
    "hellaswag": {
      "acc": 0.6234,
      "acc_stderr": 0.0048,
      "acc_norm": 0.7123,
      "acc_norm_stderr": 0.0045
    }
  },
  "versions": {
    "hellaswag": 0
  },
  "config": {
    "model": "hf-causal",
    "model_args": "pretrained=gpt2",
    "num_fewshot": 10,
    "batch_size": 8
  }
}
```

### 关键指标

- **acc**: 原始准确率
- **acc_norm**: 归一化准确率（考虑选项长度）
- **stderr**: 标准误差
- **bleu/rouge**: 文本生成质量指标

## 自定义评估

### 1. 创建自定义任务

```python
# custom_task.py
from lm_eval.api.task import ConfigurableTask

class MyCustomTask(ConfigurableTask):
    def __init__(self):
        super().__init__(config={
            "task": "my_custom_task",
            "dataset_path": "path/to/dataset",
            "output_type": "multiple_choice",
            # ... 其他配置
        })
```

### 2. 使用配置文件

```yaml
# custom_task.yaml
task: my_custom_task
dataset_path: path/to/dataset
dataset_name: null
output_type: multiple_choice
training_split: null
validation_split: validation
test_split: null
num_fewshot: 0
metric_list:
  - metric: acc
    aggregation: mean
    higher_is_better: true
```

## 最佳实践

### 1. 评估流程

1. **选择合适的任务**：根据研究目标选择相关任务
2. **设置合理的参数**：batch size、few-shot数量等
3. **多次运行**：确保结果稳定性
4. **记录配置**：保存完整的评估配置

### 2. 性能优化

- 使用vLLM后端提高推理速度
- 合理设置batch size平衡速度和内存
- 对于大模型使用device_map=auto

### 3. 结果报告

- 报告标准误差
- 说明评估配置（few-shot、batch size等）
- 与baseline模型对比
- 提供可重现的命令

## 常见问题

### 1. 内存不足

```bash
# 解决方案：减少batch size或使用CPU
lm_eval --model hf \
        --model_args pretrained=your_model \
        --tasks hellaswag \
        --batch_size 1 \
        --device cpu
```

### 2. 模型加载失败

```bash
# 解决方案：检查模型路径和权限
lm_eval --model hf \
        --model_args pretrained=your_model,trust_remote_code=True \
        --tasks hellaswag
```

### 3. 任务不存在

```bash
# 解决方案：检查任务名称
lm_eval --tasks list | grep your_task_name
```

## 总结

lm_eval_harness 是语言模型评估的标准工具，提供了：

- **标准化**：统一的评估协议
- **全面性**：涵盖多个领域的评估任务
- **可扩展性**：支持自定义任务和模型
- **可重现性**：确保结果的一致性

通过合理使用这个工具，可以全面评估语言模型的能力，为模型改进提供科学依据。