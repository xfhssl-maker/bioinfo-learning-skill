# {{PROJECT_NAME}}

> 📊 项目类型: {{PROJECT_TYPE}} | 🛠️ 技能: {{SKILLS}} | 📅 创建时间: {{DATE}}

## 📋 项目简介

{{DESCRIPTION}}

## 📁 数据来源

- **数据类型**: {{DATA_TYPE}}
- **下载链接**: {{DATA_URL}}
- **样本数量**: {{SAMPLE_COUNT}}
- **参考基因组**: {{REFERENCE_GENOME}}

## 🔄 分析流程

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   原始数据   │ -> │   质量控制   │ -> │   数据处理   │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                              ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   结果报告   │ <- │   可视化    │ <- │   分析计算   │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 详细步骤

{{ANALYSIS_STEPS}}

## 📊 主要结果

### 质控结果

{{QC_RESULTS}}

### 分析结果

{{ANALYSIS_RESULTS}}

### 关键图表

| 图表 | 说明 |
|------|------|
| ![图1](results/fig1.png) | 结果说明1 |
| ![图2](results/fig2.png) | 结果说明2 |

## 🚀 使用方法

### 环境配置

```bash
# 创建conda环境
conda env create -f environment.yml
conda activate {{ENV_NAME}}
```

### 运行分析

```bash
# 1. 下载数据
bash scripts/00_download_data.sh

# 2. 质量控制
bash scripts/01_qc.sh

# 3. 数据处理
bash scripts/02_process.sh

# 4. 分析计算
bash scripts/03_analysis.sh

# 5. 可视化
Rscript scripts/04_visualization.R
```

## 📁 项目结构

```
{{PROJECT_NAME}}/
├── README.md           # 项目说明
├── environment.yml     # 环境配置
├── data/              # 数据目录
│   ├── raw/           # 原始数据
│   └── processed/     # 处理后数据
├── scripts/           # 分析脚本
│   ├── 00_download_data.sh
│   ├── 01_qc.sh
│   ├── 02_process.sh
│   ├── 03_analysis.sh
│   └── 04_visualization.R
├── results/           # 分析结果
│   ├── figures/       # 图表
│   └── tables/        # 表格
└── notes/            # 笔记记录
    └── analysis_notes.md
```

## 🛠️ 依赖工具

| 工具 | 版本 | 用途 |
|------|------|------|
| {{TOOL_1}} | {{VERSION_1}} | {{PURPOSE_1}} |
| {{TOOL_2}} | {{VERSION_2}} | {{PURPOSE_2}} |

## 📝 学习笔记

{{LEARNING_NOTES}}

## 🔗 参考资料

- [参考文档1]({{REF_URL_1}})
- [参考文档2]({{REF_URL_2}})

## 👤 作者

- GitHub: [{{GITHUB_USERNAME}}](https://github.com/{{GITHUB_USERNAME}})
- 博客: {{BLOG_URL}}

---

*本项目是生物信息学学习计划的一部分*
