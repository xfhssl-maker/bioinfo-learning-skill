# Bioinfo Learning Skill

**生物信息学就业导向学习助手** - 25周完整学习计划 + 可视化进度跟踪面板


<img width="1873" height="834" alt="image" src="https://github.com/user-attachments/assets/1db1dbec-9387-4819-ac67-23c8b224cb9e" />
<img width="1893" height="857" alt="image" src="https://github.com/user-attachments/assets/2fdffdf8-f52d-4e24-af02-996026f15cda" />
<img width="1892" height="845" alt="image" src="https://github.com/user-attachments/assets/64f37417-8179-47d4-9ce5-99e80a06e5f4" />
<img width="1893" height="852" alt="image" src="https://github.com/user-attachments/assets/f6a74206-745f-45c1-8340-406ad6560ea7" />
![Uploading image.png…]()




## ✨ 功能特性

### 🎯 25周结构化课程
- **阶段1 (1-8周)**: 基础技能 - Linux、R、Python、Git
- **阶段2 (9-16周)**: 核心生信技能 - RNA-seq、WES、数据库
- **阶段3 (17-20周)**: 进阶项目 - 单细胞、多组学
- **阶段4 (21-24周)**: 求职准备 - 面试、简历、作品集
- **阶段5 (25周)**: AI辅助分析 - Claude Code、技能整合

### 📊 可视化面板功能
- **仪表盘**: 学习统计、番茄钟、热力图、今日任务
- **技能面板**: RPG风格技能成长系统、点击查看相关课程
- **学习计划**: 24周课程详情、任务进度、4C框架展示
- **面试准备**: 7类面试题目、编程挑战、场景问题
- **资源中心**: 概念词典、工具指南、数据库参考

### 🧠 4C学习框架
每个课程内容包含四个维度：
- **Content (内容)**: 生物学背景、实际场景、行业标准
- **Cognitive (认知)**: 布鲁姆认知层级、渐进式学习
- **Collaborative (协作)**: 结对编程、小组讨论、Code Review
- **Contextual (情境)**: 真实场景模拟、角色扮演

---

## 🚀 快速开始

### 方式一：打开可视化面板

```bash
# 克隆仓库
git clone https://github.com/your-repo/bioinfo-learning-skill.git

# 打开面板（直接用浏览器打开）
open bioinfo-learning-skill/dashboard/index.html
```

### 方式二：配置Claude Code技能

```bash
# 创建技能目录
mkdir -p ~/.claude/skills

# 复制技能文件
cp -r bioinfo-learning-skill/.claude/skills/* ~/.claude/skills/

# 重启Claude Code
claude
```

### 方式三：AI辅助分析环境

```bash
# 安装Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 配置API密钥
claude config set api-key YOUR_API_KEY

# 启动
claude
```

---

## 📖 Claude Code 命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/bioinfo init` | 初始化学习计划 | 设置个人信息和目标 |
| `/bioinfo week [n]` | 查看第n周内容 | `/bioinfo week 5` |
| `/bioinfo today` | 今日学习任务 | 显示当天待完成任务 |
| `/bioinfo progress` | 学习进度统计 | 总时长、完成率等 |
| `/bioinfo log [hours]` | 记录学习时长 | `/bioinfo log 2.5` |
| `/bioinfo done [task]` | 标记任务完成 | `/bioinfo done w1t1` |
| `/bioinfo interview [topic]` | 面试题练习 | `/bioinfo interview RNA-seq` |
| `/bioinfo concept [term]` | 概念解释 | `/bioinfo concept FPKM` |
| `/bioinfo project [name]` | 创建项目骨架 | `/bioinfo project RNA-seq-demo` |

---

## 📁 项目结构

```
bioinfo-learning-skill/
├── dashboard/                    # 可视化面板
│   ├── index.html               # 主页面
│   ├── css/
│   │   └── style.css            # 样式表
│   └── js/
│       ├── data.js              # 课程数据
│       ├── app.js               # 应用逻辑
│       └── rpg_system.js        # 技能系统
│
├── .claude/skills/bioinfo-learning/   # Claude技能
│   ├── SKILL.md                       # 技能定义
│   ├── references/                    # 参考文档
│   │   ├── curriculum_overview.md     # 课程概览
│   │   ├── concepts_reference.md      # 概念词典
│   │   ├── tools_reference.md         # 工具指南
│   │   ├── databases_reference.md     # 数据库指南
│   │   ├── interview_questions.md     # 面试题库
│   │   └── data_skills_methodology.md # 数据技能方法论
│   └── assets/                        # 资产文件
│       ├── examples/                  # 示例
│       └── templates/                 # 模板
│
├── CHANGELOG.md                  # 更新日志
└── README.md                     # 说明文档
```

---

## 📚 学习资源

### 视频教程
- [生信技能树 B站频道](https://space.bilibili.com/33826981)
- [R语言实战视频](https://www.bilibili.com/video/av31349855/)

### 官方文档
- [DESeq2](https://bioconductor.org/packages/DESeq2/)
- [GATK Best Practices](https://gatk.broadinstitute.org/)
- [Seurat](https://satijalab.org/seurat/)
- [Claude Code](https://docs.anthropic.com/claude/docs/claude-code)

### 公共数据库
- [GEO](https://www.ncbi.nlm.nih.gov/geo/) - 基因表达数据库
- [TCGA](https://portal.gdc.cancer.gov/) - 癌症基因组数据
- [Ensembl](https://www.ensembl.org/) - 基因组注释

### 参考项目
- [Bioinformatics-data-skills](https://github.com/ShenChen-bioUtopia/Bioinformatics-data-skills) - 数据技能方法论
- [claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) - Claude技能模板

---

## 🎮 技能系统

### 技能类别

| 类别 | 技能 | 相关周次 |
|------|------|---------|
| 基础 | Linux命令、Shell脚本 | 1, 2, 7, 8 |
| 核心 | R语言、Python | 3-6, 12-18 |
| 分析 | RNA-seq、WES/WGS、ChIP-seq | 10-17 |
| 进阶 | 单细胞分析、数据挖掘 | 9, 18, 19 |
| 未来 | AI辅助分析 | 25 |

### 等级系统
- **Lv.1-2**: 入门探索者
- **Lv.3-4**: 熟练使用者
- **Lv.5-6**: 专业分析师
- **Lv.7-8**: 高级专家
- **Lv.9-10**: 领域大师

---

## 📊 数据统计

| 项目 | 数量 |
|------|------|
| 课程周数 | 25周 |
| 学习任务 | 100+ |
| 核心概念 | 12个 |
| 工具软件 | 20个 |
| 公共数据库 | 14个 |
| 面试题目 | 50+ |
| 论文案例 | 22个 |

---

## 🙏 致谢

本项目参考了以下优秀资源：

- **[Bioinformatics-data-skills](https://github.com/ShenChen-bioUtopia/Bioinformatics-data-skills)** - 《Bioinformatics Data Skills》中文版，提供数据技能学习方法论
- **[claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills)** - Claude技能仓库标准结构

---

## 📄 License

MIT License

---

**开始你的生信学习之旅！** 🚀

```bash
# 打开可视化面板
open dashboard/index.html

# 或初始化Claude技能
/bioinfo init
```
