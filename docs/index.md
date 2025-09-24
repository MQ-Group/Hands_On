#MQ-Group Hands-On

这里可以放入一些工具使用教程或记录，以免遗忘以及方便其他人查看。
某个领域的tutorial,供大家学习。
只需编辑docs下的.md文档，图片、数据、脚本等文件放在assets目录下引用插入，更新后使用`mkdocs gh-deploy`命令会自动推送到网页。

\*note: organization中有owner权限的人都可以合并更新，无需pull request，但最好还是在提交前让其他人先进行检查后再提交。
## 🚀 快速开始

### 🔧 工具与资源
- **[四大仿真器使用指南](tools/simulators.md)** - ViTCoD、Olive、Ramulator2、SCALE-Sim v3 详细使用方法
- **[lm_eval_harness 使用方法](tools/lm_eval_harness.md)** - 大模型评估框架完整指南

### 📚 教程与学习
- **[体系结构四大顶会](tutorials/arch_conferences.md)** - ISCA、MICRO、ASPLOS、HPCA 深度解析
- **[Git 协作流程](collaboration/git_workflow.md)** - 详细的分支管理与团队协作

##  如何贡献

### 快速贡献步骤

1. **获取仓库访问权限**
   - 联系项目维护者申请加入仓库
   - 提供你的 GitHub 用户名

2. **克隆仓库**
   ```bash
   git clone git@github.com:MQ-Group/Hands_On.git
   cd Hands_On
   ```

3. **本地环境设置**
   ```bash
   # 安装MkDocs和相关依赖
   pip install mkdocs mkdocs-material mkdocs-git-revision-date-localized-plugin
   
   # 本地预览网站
   mkdocs serve
   # 访问 http://127.0.0.1:8000 查看实时预览
   ```

4. **创建功能分支**
   ```bash
   git checkout -b docs/your-feature-name
   ```

5. **编辑内容**
   - 使用 Markdown 格式编写文档
   - 遵循项目的文档结构和命名规范
   - 本地预览确保格式正确

6. **本地测试和构建**
   ```bash
   # 本地预览确保格式正确
   mkdocs serve
   
   # 构建测试确保无错误
   mkdocs build --strict
   ```

7. **提交更改**
   ```bash
   git add .
   git commit -m "docs: add your feature description"
   git push -u origin docs/your-feature-name
   ```

8. **创建 Pull Request**
   - 在 GitHub 上创建 PR
   - 填写详细的变更描述
   - 等待审查和合并


我们使用 **GitHub Actions** 实现完全自动化的部署流程：

1. **在本地 main 分支上编写和修改**
   - 所有文档编辑都在 `main` 分支进行
   - 使用 `mkdocs serve` 本地预览

2. **推送到 GitHub main 分支**
   ```bash
   git push origin main
   ```

3. **GitHub Actions 自动触发**
   - GitHub 检测到 main 分支更新
   - 自动运行 `.github/workflows/ci.yml` 工作流

4. **自动构建和部署**
   - 虚拟服务器拉取 main 分支代码
   - 安装 Python、MkDocs 等依赖
   - 运行 `mkdocs build` 构建网站
   - 将生成的 `site/` 内容推送到 `gh-pages` 分支
   - 网站自动更新至 https://MQ-Group.github.io/Hands_On/

!!! success "完全自动化"
    您只需关心 main 分支的源代码，部署过程完全自动化！

#### 📁 文件组织结构
```
HandsOn/
├── .github/workflows/   # GitHub Actions 配置
│   └── ci.yml          # 自动部署工作流
├── docs/               # 文档源文件
│   ├── tools/          # 工具使用指南
│   ├── tutorials/      # 基础教程
│   ├── collaboration/  # 协作指南
│   └── assets/        # 图片等静态资源
├── mkdocs.yml         # MkDocs 配置文件
└── site/              # 构建输出（自动生成，无需提交）
```

#### 📝 Markdown 内容结构
```markdown
# 页面标题

## 概述
简要介绍主题内容

## 详细步骤
分步骤详细说明，使用编号列表

## 代码示例
\```bash
# 提供具体的命令示例
mkdocs serve
\```

## 常见问题
FAQ和故障排除

## 参考资源
相关链接和进一步阅读
```

#### 🎨 MkDocs 特殊语法

**警告框**：
```markdown
!!! note "提示"
    这是一个信息提示框

!!! warning "注意"
    这是一个警告框

!!! success "成功"
    这是一个成功提示框
```

**代码高亮**：
```markdown
\```python linenums="1" hl_lines="2 3"
def hello():
    print("Hello")  # 高亮行
    return "World"   # 高亮行
\```
```

**选项卡**：
```markdown
=== "Python"
    \```python
    print("Hello Python")
    \```

=== "Bash"
    \```bash
    echo "Hello Bash"
    \```
```

#### 🔧 本地开发最佳实践

**环境设置**：
```bash
# 推荐使用虚拟环境
python -m venv mkdocs-env
source mkdocs-env/bin/activate  # Linux/macOS
# 或 mkdocs-env\Scripts\activate  # Windows

# 安装依赖
pip install mkdocs mkdocs-material mkdocs-git-revision-date-localized-plugin
```

**开发工作流**：
```bash
# 1. 启动实时预览
mkdocs serve

# 2. 编辑文档文件（在另一个终端或编辑器中）

# 3. 浏览器自动刷新显示更改

# 4. 构建测试
mkdocs build --strict

# 5. 提交推送
git add . && git commit -m "docs: your changes" && git push origin main
```

**常用MkDocs命令**：
```bash
mkdocs serve          # 启动开发服务器
mkdocs build          # 构建静态网站
mkdocs build --strict # 严格模式构建（推荐）
mkdocs --help         # 查看帮助
```

#### ⚠️ 注意事项

- **不要提交 `site/` 目录**：这是自动生成的，由GitHub Actions处理
- **本地测试必要性**：推送前务必运行 `mkdocs build --strict` 检查错误
- **图片资源管理**：将图片放在 `docs/assets/` 目录下
- **链接检查**：确保所有内部链接正确，避免死链
- **配置文件**：修改 `mkdocs.yml` 后要特别小心测试

#### 🚀 提交信息规范
遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：
- `docs: add simulator installation guide`
- `fix: correct navigation display issue`
- `feat: add contributor statistics page`
- `style: improve markdown formatting`
- `refactor: reorganize documentation structure`

- **GitHub Issues**: 问题报告和功能请求
- **Pull Requests**: 代码审查和讨论
- **项目维护者**: 重要问题可直接联系

### 🔗 有用资源

- [MkDocs 官方文档](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Markdown 语法指南](https://www.markdownguide.org/)

---

*最后更新：{{ git_revision_date_localized }}*
