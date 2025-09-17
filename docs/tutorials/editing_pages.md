# 编辑页面指南（MkDocs）

本站基于 MkDocs + Material 主题。你可以通过 GitHub 在线编辑或本地编辑并预览。

## 一、在线编辑（推荐）
- 在页面右上角点击 “在 GitHub 上编辑”（或侧边栏的铅笔图标）。
- 进入相应 Markdown 文件（位于 `docs/` 目录）后，直接修改并提交 PR 或 push（有权限）。

## 二、本地编辑与预览
```bash
# 克隆仓库
git clone git@github.com:MQ-Group/Hands_On.git
cd Hands_On

# 创建并激活虚拟环境（可选）
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt || pip install mkdocs mkdocs-material mkdocs-git-revision-date-localized-plugin

# 启动本地预览（热更新）
mkdocs serve
# 浏览器访问 http://127.0.0.1:8000
```

## 三、文件结构
```
mkdocs.yml         # 站点配置
docs/
  index.md         # 首页
  tools/           # 工具与资源
  tutorials/       # 教程
```

## 四、常用 Markdown 片段
- 代码块：
```bash
# 命令
mkdocs build
```

- 提示/警告：
```
!!! note "说明"
    这里是一个说明块。
```

## 五、提交与发布
```bash
git checkout -b docs/update-xxx
git add .
git commit -m "docs: update xxx"
git push -u origin docs/update-xxx
# 发起 PR 或直接合并到 main（有权限）
```
