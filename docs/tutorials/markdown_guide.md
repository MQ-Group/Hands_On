# Markdown 使用速查

## 基础语法
- 标题：`#` ~ `######`
- 加粗：`**bold**`，斜体：`*italic*`
- 列表：`- item` / `1. item`
- 链接：`[文本](https://example.com)`
- 图片：`![alt](path/to.png)`
- 行内代码：`` `code` ``，代码块：
```python
print("hello")
```

## 表格
```
| 列1 | 列2 |
| --- | --- |
| A   | B   |
```

## 引用与提示块（Material）
```
> 这是引用

!!! note "注意"
    这是一个提示块（需要启用 admonition 插件）。
```

## 选项卡（Material）
````
=== "PyTorch"
    ```python
    import torch
    ```
=== "TensorFlow"
    ```python
    import tensorflow as tf
    ```
````

## 图片尺寸与对齐
```
![logo](assets/images/logo.svg){ width=200 }
```

## 常见规范
- 文件放在 `docs/` 下，对应导航在 `mkdocs.yml` 的 `nav` 中维护。
- 文件名小写、下划线分隔，如 `markdown_guide.md`。
- 中英文混排注意空格：示例（中文 English 混排）。
