# Git 使用速查

## 初始设置
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
# 使用 SSH 免密
essh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub  # 添加到 GitHub SSH keys
```

## 常用流程
```bash
# 更新本地
git checkout main
git pull origin main

# 开新分支开发
git checkout -b docs/add-xxx

# 查看更改与暂存
git status
git add path/to/file.md

git commit -m "docs: add xxx"

# 推送与合并
git push -u origin docs/add-xxx
# 在 GitHub 发起 Pull Request，Review 后合并
```

## 解决冲突
```bash
git pull --rebase origin main
# 解决文件冲突后：
git add <conflicted-file>
git rebase --continue
```

## 回退与撤销
```bash
# 撤销工作区修改（谨慎）
git checkout -- path/to/file
# 回退提交（生成新提交）
git revert <commit_sha>
```

## 常见建议
- 以小步提交、信息清晰：`docs: fix typos in tools page`
- 分支命名简洁：`feat/`、`fix/`、`docs/`、`chore/`
- 提交前本地预览文档：`mkdocs serve`
