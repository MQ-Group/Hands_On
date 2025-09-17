# Git 使用规范与速查

## 初始设置
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
# 使用 SSH 免密
essh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub  # 添加到 GitHub SSH keys
```

## 分支与协作模型
- 主分支：`main`（只存放文档源码与配置）
- 发布分支：`gh-pages`（由 CI 或 `mkdocs gh-deploy` 自动生成，不要手工编辑）
- 功能分支：按类型命名，如：
  - `docs/...` 文档新增/修改
  - `feat/...` 新功能（如站点功能）
  - `fix/...` 缺陷修复
  - `chore/...` 杂务（依赖、配置、重命名等）

## 提交信息规范（遵循 Conventional Commits）
- 前缀：`docs|feat|fix|chore|refactor|style|perf|ci`
- 示例：
  - `docs: add lm_eval_harness guide`
  - `fix(tools): 修复 Tools 导航不显示问题`
  - `chore(ci): bump actions/checkout to v4`
- 原则：一句话概述改动范围与意图，英文或中文均可，保持一致。

## 常用工作流
```bash
# 更新本地主分支
git checkout main
git pull origin main

# 开发：从 main 切分支
git checkout -b docs/add-markdown-guide

# 修改文件并查看状态
git status
git add docs/tutorials/markdown_guide.md

git commit -m "docs: expand markdown guide with Material tips"

git push -u origin docs/add-markdown-guide
# 在 GitHub 发起 Pull Request，指派 Review，CI 通过后合并
```

## PR 自检清单
- [ ] 文档语法正确、无死链；本地 `mkdocs build` 通过
- [ ] 导航（`mkdocs.yml` 的 `nav`）已更新且不重复
- [ ] 新页面放在合适目录：`docs/tools/` 或 `docs/tutorials/`
- [ ] 资源（图片等）放 `docs/assets/` 并引用相对路径
- [ ] 提交信息清晰，分支命名规范

## 变基与解决冲突
```bash
# 在功能分支
git fetch origin
git rebase origin/main
# 按提示解决冲突，逐个文件：
# 1) 修复内容 2) git add <file>
git rebase --continue
```

## 回退与撤销
```bash
# 撤销工作区修改（谨慎）
git checkout -- path/to/file
# 撤销暂存
git reset HEAD path/to/file
# 回退某次提交（生成新提交）
git revert <commit_sha>
```

## 部署与发布
- 常规发布：合并到 `main` 后，GitHub Actions 会运行 `.github/workflows/deploy.yml`，将构建结果发布到 `gh-pages`。
- 手动发布（管理员）：
```bash
mkdocs gh-deploy --force
```
- 注意：不要向 `gh-pages` 直接提交内容；如需同步历史，可使用合并策略（见下节）。

## 维护者操作：同步 gh-pages 与 main（可选）
- 若需把 `gh-pages` 的历史合并到 `main` 仅保留 `main` 的文件（避免将构建产物混入源码）：
```bash
git checkout main
git fetch origin
git merge -s ours origin/gh-pages -m "chore: merge gh-pages history into main (ours)"
git push origin main
```

## 常见建议
- 以小步提交、保持单一目的；提交前本地预览：`mkdocs serve`
- 图片与大文件谨慎纳入仓库，优先压缩或使用外链
- 避免直接改 `gh-pages`，一切改动走 `main` → CI 发布
