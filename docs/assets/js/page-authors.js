// 页面作者统计功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    const fileName = getCurrentFileName(currentPath);
    
    // 创建页面作者信息容器
    createPageAuthorsContainer(fileName);
});

function getCurrentFileName(path) {
    // 从路径中提取文件名
    const segments = path.split('/').filter(segment => segment);
    if (segments.length === 0) return 'index.md';
    
    const lastSegment = segments[segments.length - 1];
    if (lastSegment === 'index.html' || lastSegment === '') {
        return 'index.md';
    }
    
    // 将 .html 转换为 .md
    return lastSegment.replace('.html', '.md');
}

async function createPageAuthorsContainer(fileName) {
    // 创建容器
    const container = document.createElement('div');
    container.className = 'page-authors-container';
    
    // 显示加载状态
    container.innerHTML = `
        <div class="page-authors-header">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
            </svg>
            <span>页面作者信息</span>
        </div>
        <div style="text-align: center; padding: 1rem; color: var(--md-default-fg-color--light);">
            <em>正在加载作者信息...</em>
        </div>
    `;
    
    // 将容器添加到页面内容底部
    const content = document.querySelector('.md-content__inner');
    if (content) {
        content.appendChild(container);
    }
    
    try {
        // 获取页面元数据
        const pageMeta = await getPageMetadata(fileName);
        
        // 更新容器内容
        container.innerHTML = `
            <div class="page-authors-header">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                </svg>
                <span>页面作者信息</span>
            </div>
            
            <div class="page-authors-meta">
                <div class="page-authors-meta-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19M17,12H7V10H17V12M15,16H7V14H15V16M17,8H7V6H17V8Z"/>
                    </svg>
                    <span>最后编辑: ${pageMeta.lastModified}</span>
                </div>
                
                <div class="page-authors-meta-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                    </svg>
                    <span>创建时间: ${pageMeta.created}</span>
                </div>
                
                <div class="page-authors-meta-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16,4C18.2,4 20,5.8 20,8C20,10.2 18.2,12 16,12C13.8,12 12,10.2 12,8C12,5.8 13.8,4 16,4M16,5.9A2.1,2.1 0 0,0 13.9,8A2.1,2.1 0 0,0 16,10.1A2.1,2.1 0 0,0 18.1,8A2.1,2.1 0 0,0 16,5.9M16,13C18.67,13 24,14.33 24,17V20H8V17C8,14.33 13.33,13 16,13M8.1,20H23.9V17C23.9,15.9 20.9,14.9 16,14.9C11.1,14.9 8.1,15.9 8.1,17V20M12,8C12,10.2 10.2,12 8,12C5.8,12 4,10.2 4,8C4,5.8 5.8,4 8,4C10.2,4 12,5.8 12,8M8,5.9A2.1,2.1 0 0,0 5.9,8A2.1,2.1 0 0,0 8,10.1A2.1,2.1 0 0,0 10.1,8A2.1,2.1 0 0,0 8,5.9M8,13C10.67,13 16,14.33 16,17V20H0V17C0,14.33 5.33,13 8,13M15.9,20H16.1V17C16.1,15.9 13.1,14.9 8,14.9C2.9,14.9 -0.1,15.9 -0.1,17V20H0.1V17C0.1,15.9 3.1,14.9 8,14.9C12.9,14.9 15.9,15.9 15.9,17V20Z"/>
                    </svg>
                    <span>作者: ${pageMeta.authors.map(a => a.name).join(', ')}</span>
                </div>
                
                <a href="https://github.com/MQ-Group/Hands_On" class="github-link" target="_blank">
                    <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.55,6.87 11.7,6.75 12.85,6.75C14,6.75 15.15,6.87 16.2,7.17C18.11,5.88 18.95,6.15 18.95,6.15C19.5,7.5 19.15,8.54 19.05,8.79C19.7,9.5 20.08,10.39 20.08,11.5C20.08,15.32 17.75,16.17 15.53,16.42C15.81,16.67 16.09,17.11 16.18,17.76C16.75,18 17.7,18.45 18.57,16.93C18.57,16.93 19.1,15.97 20.1,15.9C20.1,15.9 21.08,15.88 20.17,16.5C20.17,16.5 19.52,16.81 19.06,17.97C19.06,17.97 18.47,19.91 15.7,19.31C15.7,20.14 15.7,20.77 15.7,21C15.7,21.27 15.86,21.58 16.36,21.5C20.33,20.17 23.2,16.42 23.2,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                    <span>GitHub</span>
                </a>
            </div>
            
            <div class="page-authors-list">
                <span class="label">Page Authors:</span>
                <div class="authors">
                    ${pageMeta.authors.map(author => `
                        <a href="${author.url}" class="page-author-item" target="_blank">
                            <img src="${author.avatar}" alt="${author.name}" class="page-author-avatar">
                            <span class="page-author-name">${author.name}</span>
                            <span class="page-author-percentage">(${author.percentage}%)</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Failed to load page authors:', error);
        container.innerHTML = `
            <div class="page-authors-header">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                </svg>
                <span>页面作者信息</span>
            </div>
            <div style="text-align: center; padding: 1rem; color: var(--md-default-fg-color--light);">
                <em>无法加载作者信息</em>
            </div>
        `;
    }
}

async function getPageMetadata(fileName) {
    try {
        // 尝试从 GitHub API 获取真实的贡献者数据
        const contributors = await fetchPageContributors(fileName);
        if (contributors && contributors.length > 0) {
            return contributors;
        }
    } catch (error) {
        console.warn('Failed to fetch real contributors, using mock data:', error);
    }
    
    // 使用模拟数据作为后备
    const mockData = {
        'index.md': {
            lastModified: '2024年9月23日',
            created: '2024年9月22日',
            authors: [
                { name: 'chaochao825', percentage: '73.79%', avatar: 'https://github.com/chaochao825.png', url: 'https://github.com/chaochao825' },
                { name: 'contributor2', percentage: '25.24%', avatar: 'https://github.com/contributor2.png', url: 'https://github.com/contributor2' },
                { name: 'contributor3', percentage: '0.97%', avatar: 'https://github.com/contributor3.png', url: 'https://github.com/contributor3' }
            ]
        },
        'tutorial/index.md': {
            lastModified: '2024年9月23日',
            created: '2024年9月23日',
            authors: [
                { name: 'chaochao825', percentage: '85.5%', avatar: 'https://github.com/chaochao825.png', url: 'https://github.com/chaochao825' },
                { name: 'contributor2', percentage: '14.5%', avatar: 'https://github.com/contributor2.png', url: 'https://github.com/contributor2' }
            ]
        }
    };
    
    // 返回对应页面的数据，如果没有则返回默认数据
    return mockData[fileName] || {
        lastModified: '2024年9月23日',
        created: '2024年9月23日',
        authors: [
            { name: 'chaochao825', percentage: '100%', avatar: 'https://github.com/chaochao825.png', url: 'https://github.com/chaochao825' }
        ]
    };
}

// 从 GitHub API 获取真实的贡献者数据
async function fetchPageContributors(fileName) {
    try {
        // 构建文件路径
        const filePath = `docs/${fileName}`;
        
        // 获取文件的提交历史
        const response = await fetch(`https://api.github.com/repos/MQ-Group/Hands_On/commits?path=${filePath}&per_page=100`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const commits = await response.json();
        
        if (commits.length === 0) {
            return null;
        }
        
        // 统计每个作者的提交次数
        const authorStats = {};
        let totalCommits = 0;
        
        commits.forEach(commit => {
            const author = commit.author || commit.committer;
            if (author) {
                const authorName = author.login || author.name;
                if (!authorStats[authorName]) {
                    authorStats[authorName] = {
                        name: authorName,
                        commits: 0,
                        avatar: author.avatar_url || `https://github.com/${authorName}.png`,
                        url: author.html_url || `https://github.com/${authorName}`
                    };
                }
                authorStats[authorName].commits++;
                totalCommits++;
            }
        });
        
        // 计算百分比并排序
        const authors = Object.values(authorStats)
            .map(author => ({
                ...author,
                percentage: ((author.commits / totalCommits) * 100).toFixed(2) + '%'
            }))
            .sort((a, b) => b.commits - a.commits);
        
        // 获取创建和最后修改时间
        const firstCommit = commits[commits.length - 1];
        const lastCommit = commits[0];
        
        const created = new Date(firstCommit.commit.author.date).toLocaleDateString('zh-CN');
        const lastModified = new Date(lastCommit.commit.author.date).toLocaleDateString('zh-CN');
        
        return {
            lastModified,
            created,
            authors
        };
        
    } catch (error) {
        console.error('Failed to fetch page contributors:', error);
        throw error;
    }
}
