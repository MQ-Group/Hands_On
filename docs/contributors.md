## 如何成为贡献者

### 加入项目
1. **联系维护者**：申请加入（Private）仓库
2. **提供信息**：提供 GitHub 用户名和邮箱
3. **获得权限**：等待维护者将你添加为协作者

### 贡献流程
1. Fork 本项目（可选）
2. 创建功能分支
3. 提交你的贡献
4. 发起 Pull Request
5. 通过 Review 后合并

### 如何添加新贡献者（维护者操作）

#### 1. 添加协作者到 GitHub 仓库
```bash
# 在 GitHub 网页上操作：
# 1. 访问仓库 Settings > Manage access
# 2. 点击 "Invite a collaborator"
# 3. 输入新贡献者的 GitHub 用户名或邮箱
# 4. 选择权限级别（通常选择 "Write"）
```

#### 2. 更新贡献者信息
```bash
# 编辑 docs/contributors.md 文件
# 添加新贡献者的信息：
# - 姓名和 GitHub 用户名
# - 主要贡献领域
# - 联系方式（可选）
```

#### 3. 更新页面作者数据
```bash
# 编辑 docs/assets/js/page-authors.js 文件
# 在 mockData 中添加新贡献者的信息：
# - GitHub 用户名
# - 头像链接
# - GitHub 个人页面链接
```

#### 4. 通知新贡献者
- 发送欢迎邮件或 GitHub 通知
- 提供项目访问链接和基本指南
- 介绍项目结构和协作流程

详细流程请参考 [如何贡献](collaboration/how_to_contribute.md)。

## 贡献者协议

所有贡献者需要：

- 遵循项目的 [Git 使用规范](tutorials/git_usage.md)
- 保持代码和文档的质量
- 尊重其他贡献者的意见
- 积极参与项目讨论

---

*统计数据自动更新于：{{ git_revision_date_localized }}*

<script>
// GitHub API 获取贡献者数据
async function loadContributors() {
  try {
    const response = await fetch('https://api.github.com/repos/MQ-Group/Hands_On/contributors');
    const contributors = await response.json();
    
    let html = '<table><tr><th>贡献者</th><th>提交数</th><th>贡献比例</th><th>GitHub</th></tr>';
    
    contributors.forEach(contributor => {
      const percentage = ((contributor.contributions / contributors.reduce((sum, c) => sum + c.contributions, 0)) * 100).toFixed(1);
      html += `
        <tr>
          <td><img src="${contributor.avatar_url}" width="20" height="20" style="border-radius: 50%;"> ${contributor.login}</td>
          <td>${contributor.contributions}</td>
          <td>${percentage}%</td>
          <td><a href="${contributor.html_url}" target="_blank">@${contributor.login}</a></td>
        </tr>
      `;
    });
    
    html += '</table>';
    document.getElementById('contributors-list').innerHTML = html;
  } catch (error) {
    document.getElementById('contributors-list').innerHTML = '<p><em>无法加载贡献者数据，请检查网络连接。</em></p>';
  }
}

// 页面加载完成后获取数据
document.addEventListener('DOMContentLoaded', loadContributors);
</script>
