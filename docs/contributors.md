# 贡献者

感谢所有为 MQ-Group Hands-On 项目做出贡献的成员！

## 自动贡献者统计

> **注意**: 以下统计数据基于 GitHub 提交历史自动生成，包含代码行数、提交次数等信息。

### 贡献者列表

<!-- 此部分将通过 GitHub API 自动更新 -->
<div id="contributors-list">
  <p><em>正在加载贡献者数据...</em></p>
</div>

### 贡献统计图表

<!-- 贡献活动热力图将通过 GitHub API 生成 -->
<div id="contributors-chart">
  <p><em>正在加载贡献统计图表...</em></p>
</div>

## 贡献者徽章系统

根据 GitHub 提交数据自动计算的贡献程度：

- 🥇 **核心贡献者** (500+ 提交): 项目核心成员，负责主要功能开发
- 🥈 **活跃贡献者** (100-499 提交): 积极参与项目，贡献重要功能  
- 🥉 **社区贡献者** (20-99 提交): 社区成员，贡献文档或小功能
- 🌟 **新手贡献者** (<20 提交): 初次贡献，欢迎加入社区

## 如何成为贡献者

### 加入项目
1. **联系维护者**：联系 Yongchao Xu (chaochao825) 申请加入仓库
2. **提供信息**：提供你的 GitHub 用户名和邮箱
3. **获得权限**：等待维护者将你添加为协作者
4. **开始贡献**：按照 [如何贡献](collaboration/how_to_contribute.md) 指南开始工作

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
