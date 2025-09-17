# 编辑页面指南（MkDocs）

本站基于 MkDocs + Material 主题。你可以通过 GitHub 在线编辑或本地编辑并预览。

## 一、在线编辑（推荐）
- 在页面右上角点击 “在 GitHub 上编辑”（或侧边栏的铅笔图标）。
- 进入相应 Markdown 文件（位于 `docs/` 目录）后，直接修改并提交 PR 或 push（有权限）。
- 提交信息建议遵循规范（见《Git 使用规范与速查》）。

## 二、本地编辑与预览
```bash
# 克隆仓库（推荐使用 SSH）
git clone git@github.com:MQ-Group/Hands_On.git
cd Hands_On

# 创建并激活虚拟环境（可选）
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt || pip install mkdocs mkdocs-material mkdocs-git-revision-date-localized-plugin

# 启动本地预览（热更新）
mkdocs serve
# 浏览器访问 http://127.0.0.1:8000
```

## 三、文件与导航
```
mkdocs.yml         # 站点配置（导航、主题、插件）
docs/
  index.md         # 首页
  tools/           # 工具与资源
  tutorials/       # 教程
```
- 新增页面：放入合理目录（如 `docs/tutorials/xxx.md`）。
- 更新导航：在 `mkdocs.yml` 的 `nav` 中加入对应路径，避免重复或死链。

## 四、书写规范
- 标题层级清晰，从 `#` 开始；文件名用下划线：`editing_pages.md`
- 中英文混排注意空格，如：“这是示例 English 文本”。
- 代码块标注语言：```bash / ```python；图片统一放 `docs/assets/`。
- 使用 Material 组件：`admonition`、`details`、`tabbed` 等（已在配置中启用）。

## 五、提交前自检清单
- [ ] 本地 `mkdocs build` 通过，无错误
- [ ] 导航更新正确，可点击且无重复
- [ ] 图片/链接为相对路径，资源存在
- [ ] 页面内标题、目录结构清晰，语法无误
- [ ] 提交信息清晰（如：`docs: add overleaf guide`）

## 六、发布流程
- 常规：合并到 `main` 后，GitHub Actions 会自动运行 `.github/workflows/deploy.yml`，发布到 `gh-pages`。
- 管理员可手动发布：
```bash
mkdocs gh-deploy --force
```

## 七、维护者分支策略（仅管理员）
- `main`：文档源码主分支
- `gh-pages`：构建产物分支（不要直接编辑）
- 如需把 `gh-pages` 历史合并回 `main` 但保留 `main` 内容：
```bash
git checkout main
git fetch origin
git merge -s ours origin/gh-pages -m "chore: merge gh-pages history into main (ours)"
git push origin main
```

## 八、常见问题
- 打不开页面：等待 GitHub Pages 缓存刷新，或手动 `mkdocs gh-deploy --force`
- 样式异常：检查 `mkdocs.yml` 主题与插件缩进、语法
- 中文搜索效果：已启用 `search` 插件并配置 `lang: ja` 以改善中文分词

## 九、推荐阅读
- 《Git 使用规范与速查》
- 《Markdown 使用速查》
- 《Overleaf 使用速查》
