# 如何贡献

欢迎为 MQ-Group Hands-On 项目做出贡献！本指南将帮助你了解如何参与项目开发。

## 目录

1. [加入 GitHub 私有仓库](#1-加入-github-私有仓库)
2. [本地 Git 账户配置](#2-本地-git-账户配置)
3. [本地部署](#3-本地部署)
4. [添加新内容](#4-添加新内容)
5. [提交代码](#5-提交代码)

---

## 1. 加入 GitHub 私有仓库

### 获取仓库访问权限
1. 联系项目维护者（Yongchao Xu - chaochao825）申请加入仓库
2. 提供你的 GitHub 用户名
3. 等待维护者将你添加为协作者

### Fork 仓库（可选）
如果你希望独立开发，可以 Fork 仓库：
1. 访问 [MQ-Group/Hands_On](https://github.com/MQ-Group/Hands_On)
2. 点击右上角的 "Fork" 按钮
3. 克隆你的 Fork 到本地

### 克隆仓库
```bash
# 克隆主仓库（推荐）
git clone git@github.com:MQ-Group/Hands_On.git
cd Hands_On

# 或克隆你的 Fork
git clone git@github.com:你的用户名/Hands_On.git
cd Hands_On
```

---

## 2. 本地 Git 账户配置

### 配置用户信息
```bash
# 设置全局用户信息
git config --global user.name "你的姓名"
git config --global user.email "你的邮箱@example.com"

# 或仅为当前项目设置
git config user.name "你的姓名"
git config user.email "你的邮箱@example.com"
```

### 配置 SSH 密钥（推荐）
```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "你的邮箱@example.com"

# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 将公钥添加到 GitHub
# 1. 复制上面的公钥内容
# 2. 访问 GitHub Settings > SSH and GPG keys
# 3. 点击 "New SSH key" 并粘贴公钥
```

### 设置上游仓库
```bash
# 添加上游仓库（如果使用 Fork）
git remote add upstream git@github.com:MQ-Group/Hands_On.git

# 查看远程仓库
git remote -v
```

---

## 3. 本地部署

### 环境准备
```bash
# 创建虚拟环境（推荐）
python3 -m venv .venv
source .venv/bin/activate  # Linux/macOS
# 或 .venv\Scripts\activate  # Windows

# 安装依赖
pip install mkdocs mkdocs-material mkdocs-git-revision-date-localized-plugin
```

### 本地预览
```bash
# 启动本地服务器
mkdocs serve

# 浏览器访问 http://127.0.0.1:8000
```

### 构建测试
```bash
# 构建静态网站
mkdocs build

# 检查构建结果
ls site/
```

---

## 4. 添加新内容

### 创建功能分支
```bash
# 更新主分支
git checkout main
git pull origin main

# 创建新分支
git checkout -b docs/add-your-feature
```

### 编辑内容
#### 在线编辑（推荐新手）
1. 在页面右上角点击 "在 GitHub 上编辑"
2. 直接修改文件内容
3. 填写提交信息并创建 Pull Request

#### 本地编辑
1. 使用你喜欢的编辑器（VS Code, Vim, Typora 等）
2. 遵循项目的 Markdown 规范
3. 本地预览：`mkdocs serve`

### 文件组织
```
docs/
├── index.md                    # 首页
├── contributors.md             # 贡献者信息
├── changelog.md               # 更新日志
├── tools/                     # 工具指南
├── tutorials/                  # 教程
├── tutorial/                  # 新教程部分
└── collaboration/             # 协作指南
```

### 添加新页面示例
```bash
# 创建新教程页面
mkdir -p docs/new-section
touch docs/new-section/index.md

# 编辑 mkdocs.yml 添加导航
# 在 nav: 部分添加新页面链接
```

---

## 5. 提交代码

### 提交更改
```bash
# 查看更改状态
git status

# 添加文件到暂存区
git add docs/new-section/
git add mkdocs.yml

# 提交更改（遵循 Conventional Commits）
git commit -m "docs: add new section with comprehensive guide

- Add detailed installation instructions
- Include troubleshooting section
- Update navigation structure"
```

### 推送并创建 Pull Request
```bash
# 推送分支
git push -u origin docs/add-your-feature
```

### Pull Request 流程
1. 在 GitHub 上访问你的分支
2. 点击 "Compare & pull request"
3. 填写详细的 PR 描述：

```markdown
## 变更描述
简要描述本次变更的内容和目的。

## 变更类型
- [ ] 文档更新
- [ ] 新功能
- [ ] 错误修复
- [ ] 重构

## 测试
- [ ] 本地构建通过 (`mkdocs build`)
- [ ] 本地预览正常 (`mkdocs serve`)
- [ ] 导航链接正确
- [ ] 无死链或格式错误

## 相关 Issue
Closes #<issue-number>
```

### 审查和合并
1. **自动检查**：GitHub Actions 会运行构建测试
2. **人工审查**：维护者会检查代码质量和内容
3. **反馈和修改**：根据审查意见进行修改
4. **最终合并**：通过审查后合并到主分支

---

## 贡献指南

### 文档编写规范

#### 文件命名
- 使用小写字母和下划线
- 文件名应描述内容：`git_usage.md`, `simulator_guide.md`

#### 内容结构
```markdown
# 标题

## 概述
简要介绍主题内容

## 详细内容
分章节详细介绍

## 示例
提供具体的代码示例

## 参考
相关链接和资源
```

#### 代码块
```bash
# 使用适当的语言标识
git clone https://github.com/example/repo.git
```

#### 链接格式
- 内部链接：`[链接文本](relative/path.md)`
- 外部链接：`[链接文本](https://example.com)`

### 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<类型>[可选范围]: <描述>

[可选正文]

[可选脚注]
```

#### 类型
- `docs`: 文档相关
- `feat`: 新功能
- `fix`: 错误修复
- `chore`: 维护任务
- `refactor`: 重构
- `style`: 格式调整

#### 示例
```bash
git commit -m "docs: add simulator installation guide"
git commit -m "fix: correct navigation display issue"
git commit -m "feat: add contributor statistics page"
```

### 代码审查流程

#### 审查检查清单
- [ ] 文档语法正确，无错别字
- [ ] 代码示例可运行
- [ ] 链接有效，无死链
- [ ] 导航结构正确
- [ ] 本地构建通过
- [ ] 遵循项目约定

#### 审查反馈
- 提供具体的改进建议
- 解释为什么需要修改
- 保持友好和专业的态度
- 及时响应审查意见

## 项目结构

```
docs/
├── index.md                    # 首页
├── contributors.md             # 贡献者信息
├── changelog.md               # 更新日志
├── tools/                     # 工具指南
│   ├── index.md
│   ├── simulators.md
│   └── lm_eval_harness.md
├── tutorials/                  # 教程
│   ├── arch_conferences.md
│   ├── editing_pages.md
│   ├── git_usage.md
│   ├── markdown_guide.md
│   └── overleaf_guide.md
├── tutorial/                   # 新教程部分
│   ├── index.md
│   ├── basic_knowledge.md
│   ├── common_tools.md
│   ├── research_and_writing.md
│   └── model_compression_vlsi.md
└── collaboration/             # 协作指南
    ├── git_workflow.md
    └── how_to_contribute.md
```

## 开发工具推荐

### 编辑器
- **VS Code**: 优秀的 Markdown 支持
- **Typora**: 专业的 Markdown 编辑器
- **Vim/Neovim**: 命令行编辑器

### 有用插件
- **VS Code**: Markdown All in One, Markdown Preview Enhanced
- **Vim**: vim-markdown, markdown-preview

### 预览工具
```bash
# 本地预览
mkdocs serve

# 构建测试
mkdocs build

# 检查链接
mkdocs build --strict
```

## 常见问题

### Q: 如何添加新的工具指南？
A: 
1. 在 `docs/tools/` 下创建新的 `.md` 文件
2. 在 `mkdocs.yml` 的 `nav` 中添加链接
3. 遵循现有的文档结构

### Q: 如何修改导航结构？
A: 编辑 `mkdocs.yml` 文件中的 `nav` 部分，注意缩进和格式。

### Q: 本地预览显示异常怎么办？
A: 
1. 检查 `mkdocs.yml` 语法
2. 确认插件安装正确
3. 查看构建日志中的错误信息

### Q: 如何更新贡献者信息？
A: 编辑 `docs/contributors.md` 文件，添加新的贡献者信息。

## 社区准则

### 行为准则
- 保持友好和尊重
- 欢迎不同背景的贡献者
- 专注于建设性的讨论
- 尊重他人的观点

### 沟通渠道
- **GitHub Issues**: 问题报告和功能请求
- **Pull Requests**: 代码审查和讨论
- **Email**: 重要问题联系维护者

## 获得帮助

### 文档资源
- [MkDocs 官方文档](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Markdown 语法指南](https://www.markdownguide.org/)

### 联系维护者
- 通过 GitHub Issues 提问
- 发送邮件到项目维护者
- 参与项目讨论

## 贡献者认可

### 贡献者徽章
根据贡献程度，我们为贡献者提供徽章：
- 🥇 核心贡献者 (500+ 行)
- 🥈 活跃贡献者 (200-499 行)
- 🥉 社区贡献者 (50-199 行)
- 🌟 新手贡献者 (<50 行)

### 贡献统计
- 在 `contributors.md` 中记录贡献者信息
- 统计代码行数和贡献比例
- 定期更新贡献者列表

---

感谢你的贡献！每一个贡献都让项目变得更好。

*最后更新：{{ git_revision_date_localized }}*

## 详细贡献流程

### 第一步：准备项目目录

#### Fork 项目
1. 访问 [MQ-Group/Hands_On](https://github.com/MQ-Group/Hands_On)
2. 点击右上角的 "Fork" 按钮
3. 克隆你的 Fork 到本地：
```bash
git clone git@github.com:你的用户名/Hands_On.git
cd Hands_On
```

#### 设置开发环境
```bash
# 添加上游仓库
git remote add upstream git@github.com:MQ-Group/Hands_On.git

# 创建虚拟环境（推荐）
python3 -m venv .venv
source .venv/bin/activate  # Linux/macOS
# 或 .venv\Scripts\activate  # Windows

# 安装依赖
pip install mkdocs mkdocs-material mkdocs-git-revision-date-localized-plugin
```

### 第二步：如何编辑内容

#### 创建新的教程部分（示例）
假设你要添加一个新的教程部分，按照以下步骤组织文件：

1. **创建教程文件夹**：
```bash
# 在 docs 目录下创建新的教程文件夹
mkdir -p docs/tutorial
mkdir -p docs/tutorial/assets
```

2. **更新 MkDocs 配置文件**：
编辑 `mkdocs.yml` 文件，在 `nav:` 部分添加：
```yaml
nav:
  - 首页: index.md
  # ... 其他现有导航项
  - Tutorial:
    - 概述: tutorial/index.md
    - 1. 基础知识: tutorial/basic_knowledge.md
    - 2. 常用工具: tutorial/common_tools.md
    - 3. 科研与写作: tutorial/research_and_writing.md
    - 4. 模型压缩与VLSI优化: tutorial/model_compression_vlsi.md
```

3. **创建 Markdown 文件**：
在 `docs/tutorial/` 目录中创建以下文件：

**文件 1: `tutorial/index.md` (概述)**
```markdown
# 教程概述

![本教程概述](assets/overview_mindmap.png)

本教程将引导您了解...
```

**文件 2: `tutorial/basic_knowledge.md`**
```markdown
# 第 1 部分：基础知识

## 硬件电路设计的基础概念

在我们实验室的主要工作是数字设计...
```

4. **添加图片资源**：
- 将图片保存到 `docs/tutorial/assets/` 文件夹
- 使用描述性文件名：`overview_mindmap.png`, `az_reader_ui.png` 等
- 在 Markdown 中引用：`![图片描述](assets/filename.png)`

#### 编辑现有内容
1. **在线编辑**（推荐新手）：
   - 在页面右上角点击 "在 GitHub 上编辑"
   - 直接修改文件内容
   - 填写提交信息并创建 Pull Request

2. **本地编辑**：
   - 使用你喜欢的编辑器（VS Code, Vim, Typora 等）
   - 遵循项目的 Markdown 规范
   - 本地预览：`mkdocs serve`

### 第三步：如何提交更改

#### 创建功能分支
```bash
# 更新主分支
git checkout main
git pull upstream main

# 创建新分支（遵循命名规范）
git checkout -b docs/add-tutorial-section
```

#### 提交更改
```bash
# 查看更改状态
git status

# 添加文件到暂存区
git add docs/tutorial/
git add mkdocs.yml

# 提交更改（遵循 Conventional Commits）
git commit -m "docs: add comprehensive tutorial section with 4 parts

- Add tutorial overview and basic knowledge guide
- Include common tools and research writing sections  
- Add model compression and VLSI optimization content
- Update navigation structure for new tutorial section"
```

#### 推送并创建 Pull Request
```bash
# 推送分支到你的 Fork
git push -u origin docs/add-tutorial-section
```

然后在 GitHub 上：
1. 访问你的 Fork 页面
2. 点击 "Compare & pull request"
3. 填写详细的 PR 描述：

```markdown
## 变更描述
添加了完整的教程部分，包含4个主要章节：
- 基础知识：硬件电路设计概念
- 常用工具：ASIC和FPGA开发流程
- 科研与写作：文献管理和论文写作
- 模型压缩与VLSI优化：神经网络硬件设计

## 变更类型
- [x] 文档更新
- [x] 新功能
- [ ] 错误修复
- [ ] 重构

## 测试
- [x] 本地构建通过 (`mkdocs build`)
- [x] 本地预览正常 (`mkdocs serve`)
- [x] 导航链接正确
- [x] 图片资源完整
- [x] 无死链或格式错误

## 相关 Issue
Closes #<issue-number>

## 截图
[添加相关截图说明变更效果]
```

### 第四步：本地测试

#### 预览网站
```bash
# 启动本地服务器
mkdocs serve

# 浏览器访问 http://127.0.0.1:8000
```

#### 检查清单
- [ ] 导航栏中出现了新的 "Tutorial" 部分
- [ ] 所有新页面都能正常加载
- [ ] 文本格式正确（标题、列表、粗体等）
- [ ] 所有图片都可见且位置正确
- [ ] 结构与 `mkdocs.yml` 中定义的相符

#### 构建测试
```bash
# 构建静态网站
mkdocs build

# 检查是否有错误
# 查看 site/ 目录中的生成文件
```

### 第五步：部署网站

#### 自动部署
- 合并到 `main` 分支后，GitHub Actions 会自动部署
- 等待几分钟后访问：`https://MQ-Group.github.io/Hands_On/`

#### 手动部署（管理员）
```bash
# 部署到 GitHub Pages
mkdocs gh-deploy --force
```

### 第六步：等待审查和合并

#### 审查流程
1. **自动检查**：GitHub Actions 会运行构建测试
2. **人工审查**：维护者会检查代码质量和内容
3. **反馈和修改**：根据审查意见进行修改
4. **最终合并**：通过审查后合并到主分支

#### 审查期间
- 及时响应审查意见
- 解释设计决策
- 主动修复问题
- 保持积极态度

## 贡献指南

### 文档编写规范

#### 文件命名
- 使用小写字母和下划线
- 文件名应描述内容：`git_usage.md`, `simulator_guide.md`

#### 内容结构
```markdown
# 标题

## 概述
简要介绍主题内容

## 详细内容
分章节详细介绍

## 示例
提供具体的代码示例

## 参考
相关链接和资源
```

#### 代码块
```bash
# 使用适当的语言标识
git clone https://github.com/example/repo.git
```

#### 链接格式
- 内部链接：`[链接文本](relative/path.md)`
- 外部链接：`[链接文本](https://example.com)`

### 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<类型>[可选范围]: <描述>

[可选正文]

[可选脚注]
```

#### 类型
- `docs`: 文档相关
- `feat`: 新功能
- `fix`: 错误修复
- `chore`: 维护任务
- `refactor`: 重构
- `style`: 格式调整

#### 示例
```bash
git commit -m "docs: add simulator installation guide"
git commit -m "fix: correct navigation display issue"
git commit -m "feat: add contributor statistics page"
```

### 代码审查流程

#### 审查检查清单
- [ ] 文档语法正确，无错别字
- [ ] 代码示例可运行
- [ ] 链接有效，无死链
- [ ] 导航结构正确
- [ ] 本地构建通过
- [ ] 遵循项目约定

#### 审查反馈
- 提供具体的改进建议
- 解释为什么需要修改
- 保持友好和专业的态度
- 及时响应审查意见

## 项目结构

```
docs/
├── index.md                    # 首页
├── contributors.md             # 贡献者信息
├── changelog.md               # 更新日志
├── tools/                     # 工具指南
│   ├── index.md
│   ├── simulators.md
│   └── lm_eval_harness.md
├── tutorials/                  # 教程
│   ├── arch_conferences.md
│   ├── editing_pages.md
│   ├── git_usage.md
│   ├── markdown_guide.md
│   └── overleaf_guide.md
└── collaboration/             # 协作指南
    ├── git_workflow.md
    └── how_to_contribute.md
```

## 开发工具推荐

### 编辑器
- **VS Code**: 优秀的 Markdown 支持
- **Typora**: 专业的 Markdown 编辑器
- **Vim/Neovim**: 命令行编辑器

### 有用插件
- **VS Code**: Markdown All in One, Markdown Preview Enhanced
- **Vim**: vim-markdown, markdown-preview

### 预览工具
```bash
# 本地预览
mkdocs serve

# 构建测试
mkdocs build

# 检查链接
mkdocs build --strict
```

## 常见问题

### Q: 如何添加新的工具指南？
A: 
1. 在 `docs/tools/` 下创建新的 `.md` 文件
2. 在 `mkdocs.yml` 的 `nav` 中添加链接
3. 遵循现有的文档结构

### Q: 如何修改导航结构？
A: 编辑 `mkdocs.yml` 文件中的 `nav` 部分，注意缩进和格式。

### Q: 本地预览显示异常怎么办？
A: 
1. 检查 `mkdocs.yml` 语法
2. 确认插件安装正确
3. 查看构建日志中的错误信息

### Q: 如何更新贡献者信息？
A: 编辑 `docs/contributors.md` 文件，添加新的贡献者信息。

## 社区准则

### 行为准则
- 保持友好和尊重
- 欢迎不同背景的贡献者
- 专注于建设性的讨论
- 尊重他人的观点

### 沟通渠道
- **GitHub Issues**: 问题报告和功能请求
- **Pull Requests**: 代码审查和讨论
- **Email**: 重要问题联系维护者

## 获得帮助

### 文档资源
- [MkDocs 官方文档](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Markdown 语法指南](https://www.markdownguide.org/)

### 联系维护者
- 通过 GitHub Issues 提问
- 发送邮件到项目维护者
- 参与项目讨论

## 贡献者认可

### 贡献者徽章
根据贡献程度，我们为贡献者提供徽章：
- 🥇 核心贡献者 (500+ 行)
- 🥈 活跃贡献者 (200-499 行)
- 🥉 社区贡献者 (50-199 行)
- 🌟 新手贡献者 (<50 行)

### 贡献统计
- 在 `contributors.md` 中记录贡献者信息
- 统计代码行数和贡献比例
- 定期更新贡献者列表

---

感谢你的贡献！每一个贡献都让项目变得更好。

*最后更新：{{ git_revision_date_localized }}*
