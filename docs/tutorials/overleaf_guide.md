# Overleaf 使用速查

## 创建与导入
- 新建工程：Overleaf Dashboard → New Project
- 从模板创建：如 ACM/IEEE/Elsevier 模板
- 从 Git 导入：Menu → Git，绑定仓库（专业版支持）

## 常用文件
- `main.tex`：主文档入口
- `sections/`：章节拆分 `\input{sections/intro}`
- `figures/`：图片资源 `\includegraphics{figures/arch.pdf}`
- `refs.bib`：BibTeX 文献数据库

## 基本编译
- 编译器：XeLaTeX / pdfLaTeX / LuaLaTeX（中文推荐 XeLaTeX + `ctex`）
- 常用宏包：`graphicx`、`booktabs`、`hyperref`、`amsmath`、`cite`

## 常用片段
- 图片：
```latex
\begin{figure}[t]
  \centering
  \includegraphics[width=0.9\linewidth]{figures/arch.pdf}
  \caption{系统架构}
  \label{fig:arch}
\end{figure}
```

- 表格：
```latex
\begin{table}[t]
  \centering
  \begin{tabular}{lcc}
    \toprule
    Method & Acc & Latency \\
    \midrule
    A & 90.1 & 10ms \\
    B & 91.3 & 8ms \\
    \bottomrule
  \end{tabular}
  \caption{结果比较}
  \label{tab:results}
\end{table}
```

- 引用文献：
```latex
As shown in~\cite{he2016deep} ...
```

## 协作与版本
- 使用 Overleaf 的 Track Changes 与 Review
- 绑定 GitHub/GitLab 做版本管理（专业版）
- 注意 `.latexmkrc`、`latexmk` 清理中间文件

## 常见问题
- 字体/中文乱码：使用 `\usepackage{ctex}`，或设置 `xelatex` 编译。
- 参考文献不显示：确认 `\bibliography{refs}` 与 `\bibliographystyle{unsrt}`，多编译几次或启用 `biber`。
- 图中路径错误：统一放到 `figures/`，并检查相对路径。
