# 更新日志

## 2026-04-01 - 新增AI辅助生信分析专题课程

### 🎯 新增课程

**第25周：AI辅助生信分析专题**
- **阶段**：第5阶段（AI工具整合）
- **学时**：8h学习 + 12h实践
- **难度**：★★★★☆

**课程内容**：
1. AI辅助生信分析概述
2. Claude Code安装与配置
3. bioinfo-learning Skill使用
4. AI辅助代码编写与调试
5. 批判性评估AI输出
6. 构建个人AI工作流

**参考资源**：
- [Bioinformatics-data-skills](https://github.com/ShenChen-bioUtopia/Bioinformatics-data-skills) - 数据技能方法论

### 🛠️ 安装指南

**Claude Code安装**：
```bash
# 安装Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 配置API密钥
claude config set api-key YOUR_API_KEY

# 启动
claude
```

**bioinfo-learning技能配置**：
```bash
# 克隆技能仓库
git clone https://github.com/your-repo/bioinfo-learning-skill.git

# 放置到Claude技能目录
mkdir -p ~/.claude/skills
cp -r bioinfo-learning-skill/.claude/skills/* ~/.claude/skills/
```

### 🎮 新增技能

**AI辅助分析**（进阶技能）
- 相关周次：第25周
- 能力等级：
  - Lv.1 AI探索者 - 了解AI辅助分析的可能性
  - Lv.3 提示词工程师 - 编写有效的分析提示词
  - Lv.5 AI协作专家 - 熟练使用Claude Code辅助分析
  - Lv.7 技能开发者 - 能开发自定义Claude Skills
  - Lv.10 AI增强分析师 - 完美融合AI与传统技能

### 📋 新增任务

| 任务ID | 描述 | 类型 |
|--------|------|------|
| w25t1 | 安装Claude Code CLI | setup |
| w25t2 | 配置bioinfo-learning技能 | setup |
| w25t3 | AI辅助完成RNA-seq质控 | practice |
| w25t4 | AI辅助编写分析脚本 | practice |
| w25t5 | 构建个人AI辅助工作流 | project |

### 📚 学习目标

**认知层级**：
- 理解AI辅助分析的适用场景和局限性
- 应用Claude Code进行日常生信分析
- 分析AI输出的正确性和可靠性
- 创建个人AI辅助分析工作流

**核心能力**：
- 高效利用AI加速分析流程
- 批判性评估AI建议
- 保持独立思考能力
- 确保分析可复现性

---

## 2026-04-01 - 技能面板新增点击查看相关课程功能

### ✨ 新增功能

**技能课程关联**
- 点击技能卡片可查看相关课程周次
- 每个技能关联了对应的课程周数

| 技能 | 相关周次 |
|------|---------|
| Linux 命令 | 第1, 2, 7周 |
| Shell 脚本 | 第2, 7, 8周 |
| R 语言 | 第3, 4, 12-16周 |
| Python | 第5, 6, 18周 |
| RNA-seq 分析 | 第10-13周 |
| WES/WGS 分析 | 第14-16周 |
| ChIP-seq 分析 | 第17周 |
| 单细胞分析 | 第18周 |
| 数据挖掘 | 第9, 19周 |

**课程卡片展示**
- 显示周次、标题、难度
- 显示学习主题标签
- 显示任务完成进度条
- 点击卡片直接跳转到周详情

**学习建议**
- 显示当前技能等级
- 显示升级所需经验
- 提供学习路径建议

### 🎨 UI优化

- 技能卡片添加可点击提示
- 悬停效果增强（上移+阴影）
- 新增课程卡片样式
- 新增学习建议面板样式

### 📁 修改的文件

- `js/rpg_system.js` - 为技能添加relatedWeeks字段
- `js/app.js` - 添加showSkillCourses和navigateToWeek函数
- `index.html` - 添加技能课程模态框
- `css/style.css` - 添加技能课程相关样式

---

## 2026-04-01 - 修复周详情模态框显示问题

### 🐛 Bug修复

**问题描述**：学习计划与进度页面点击具体周后，下拉内容显示不全

**问题原因**：
- 模态框高度计算不正确
- modal-body的max-height未考虑概览栏和标签页导航的高度

**修复方案**：
```css
/* 模态框设置为固定高度 */
.modal-content.xlarge {
    max-height: 95vh;
    height: 95vh;
    display: flex;
    flex-direction: column;
}

/* modal-body使用flex: 1自适应 */
.modal-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
}

/* 标签页面板添加滚动 */
.detail-tab-panel {
    overflow-y: auto;
    max-height: 100%;
}
```

### 📐 布局优化

- 模态框使用flex布局，确保内容区自适应
- 标签页面板支持独立滚动
- 增加模态框高度至95vh，提供更多显示空间

---

## 2026-04-01 - 文件注释完善

### 📝 文件头注释

为所有主要代码文件添加了详细的文件头注释，包括：

**index.html**
```html
<!--
@description  24周生物信息学学习课程可视化面板
@author       Bioinfo Learning Team
@version      2.0.0
@pages        仪表盘、技能面板、学习计划、面试准备、资源中心
@dependencies style.css, data.js, app.js
-->
```

**data.js**
```javascript
/**
 * @description  存储24周生物信息学学习课程的全部数据
 * @structure    CURRICULUM_DATA, CASE_STUDIES, INTERVIEW_DATA,
 *               REFERENCE_DATA, PROJECT_TEMPLATES, TASK_STEPS
 * @dataFormat   4C框架、认知层级、难度等级
 */
```

**app.js**
```javascript
/**
 * @description  可视化面板核心功能实现
 * @structure    AppState、初始化函数、渲染函数、事件处理、数据持久化
 * @dependencies data.js, localStorage
 */
```

**style.css**
```css
/**
 * @description  完整样式定义
 * @colorScheme  主色调#6366f1, 成功色#22c55e, 警告色#f59e0b
 * @structure    变量定义、基础样式、布局、组件、响应式
 */
```

### 🔧 数据块注释

为数据文件中的各个数据块添加了详细注释：

| 数据块 | 说明 |
|--------|------|
| CURRICULUM_DATA | 24周课程数据结构说明 |
| CASE_STUDIES | 论文案例库格式说明 |
| PAPER_CATEGORIES | 论文分类定义 |
| INTERVIEW_DATA | 面试题库分类说明 |
| REFERENCE_DATA | 资源参考数据格式 |
| PROJECT_TEMPLATES | 项目模板用途 |
| TASK_STEPS | 任务步骤数据结构 |

### ✅ 语法修复

修复了data.js中的语法错误：
- 删除了重复的结束符号 `};`

---

## 2026-04-01 - 技能仓库内容整合到可视化面板

### 📚 资源中心内容扩展

**核心概念（新增4个，共12个）**
| 概念 | 说明 |
|------|------|
| FASTQ | 测序数据格式，含序列和质量分数结构说明 |
| BAM | 比对结果二进制格式，含操作代码示例 |
| GTF | 基因注释文件格式 |
| PCA | 主成分分析，用于样本聚类和质控 |
| GC Content | 新增代码示例：`gc_content(seq)` |

**工具软件（新增10个，共20个）**
| 工具 | 分类 | 说明 |
|------|------|------|
| MultiQC | 质量控制 | 汇总多个QC报告 |
| fastp | 数据预处理 | 一站式质控，比Trimmomatic更快 |
| SAMtools | 文件处理 | SAM/BAM操作工具 |
| HTSeq | 表达定量 | Python定量工具 |
| edgeR | 差异分析 | 小样本差异分析 |
| BCFtools | 变异检测 | VCF操作和变异检测 |
| SnpEff | 变异注释 | 变异功能注释 |
| VEP | 变异注释 | Ensembl变异注释 |
| Salmon | 定量工具 | 无比对定量 |
| Kallisto | 定量工具 | 无比对定量 |

**公共数据库（新增8个，共14个）**
| 数据库 | 分类 | 说明 |
|------|------|------|
| UCSC Genome Browser | 基因组浏览器 | 基因组可视化和数据下载 |
| dbSNP | 变异数据库 | SNP数据库 |
| ArrayExpress | 表达数据库 | EMBL-EBI功能基因组库 |
| SRA | 测序数据 | 原始FASTQ存储库 |
| UniProt | 蛋白质数据库 | 蛋白质序列和功能 |
| PDB | 结构数据库 | 蛋白质三维结构 |
| KEGG | 通路数据库 | 代谢和信号通路 |
| GO | 功能注释 | 基因本体论 |

**文件格式（新增3个，共8个）**
| 格式 | 说明 |
|------|------|
| SAM | 比对结果文本格式 |
| BED | 基因组区间格式 |
| BEDPE | 成对基因组区间格式 |

### 🎤 面试准备内容扩展

**新增分类**
- **场景题**：新增5道实际场景问题
  - 测序质量分数低的处理
  - RNA-seq批次效应处理
  - 比对率低的排查方法

- **编程题**：新增7道编程挑战
  - 计算反向互补序列
  - 计算N50值
  - 解析GTF文件
  - 统计FASTQ reads数
  - 提取唯一序列
  - 解析VCF文件
  - 计算GC含量

- **统计概念**：新增4道统计问题
  - 多重检验校正
  - 参数vs非参数检验
  - p值与置信区间
  - 效应量概念

### 🔧 数据结构增强

**概念数据新增字段**
- `formula`: 公式说明
- `code`: 代码示例
- `table`: 数值对照表

**工具数据新增字段**
- `install`: 安装命令
- `usage`: 使用示例
- `note`: 使用提示

**数据库新增字段**
- `description`: 详细描述
- `data_types`: 数据类型
- `code`: R/Python访问代码

---

## 2026-04-01 - 页面合并与JavaScript修复

### 🔧 页面合并
- **学习计划 + 学习进度** → 合并为"学习计划与进度"页面
- 导航从6个页面减少到5个页面

### 🐛 JavaScript错误修复
修复了多个因DOM元素不存在导致的JavaScript错误：

| 函数 | 问题 | 修复 |
|------|------|------|
| `initDashboard()` | `today-date`元素不存在 | 添加null检查 |
| `updateProgressRing()` | `weekly-progress-ring`不存在 | 使用正确的gauge元素 |
| `updateUI()` | 多个元素直接访问 | 添加null检查 |
| `initPomodoro()` | 按钮元素直接访问 | 添加null检查 |
| `loadTodayTasks()` | `today-tasks-list`不存在 | 添加null检查 |
| `updatePomodoroStats()` | 统计元素不存在 | 添加null检查 |
| `renderSkills()` | `skills-grid`不存在 | 添加null检查 |
| `renderWeeks()` | `weeks-list`不存在 | 添加null检查 |
| `initInterview()` | 分类列表不存在 | 添加null检查 |
| `initAISettings()` | 多个表单元素不存在 | 添加null检查 |

### 📝 页面标题更新
- 学习计划 → 学习计划与进度
- 概念速查 → 资源中心

### ⌨️ 快捷键更新
```
1 → 仪表盘
2 → 技能面板
3 → 学习计划与进度
4 → 面试准备
5 → 资源中心
```

---

## 2026-04-01 - 技能仓库创建与资源整合

### 🎯 Claude Skill 仓库结构
参考 [claude-scientific-skills/venue-templates](https://github.com/K-Dense-AI/claude-scientific-skills/tree/main/scientific-skills/venue-templates) 创建完整的技能仓库结构。

### 📁 目录结构
```
.claude/skills/bioinfo-learning/
├── SKILL.md                    # 主技能定义文件
├── references/                 # 参考文档目录
│   ├── curriculum_overview.md  # 24周课程概览
│   ├── concepts_reference.md   # 核心概念词典
│   ├── tools_reference.md      # 工具软件指南
│   ├── databases_reference.md  # 公共数据库指南
│   ├── interview_questions.md  # 面试问题集
│   ├── data_skills_methodology.md  # 数据技能学习方法论
│   └── skill_development_guide.md  # 技能仓库开发指南
├── scripts/                    # 辅助脚本目录
│   ├── query_content.py        # 查询课程内容
│   └── query_resources.py      # 查询资源数据库
└── assets/                     # 资产文件目录
    ├── examples/               # 示例文件
    │   └── rnaseq_workflow_example.md
    └── templates/              # 模板文件
        ├── learning_note_template.md
        └── project_readme_template.md
```

### 📝 SKILL.md 主文件内容
- **name**: bioinfo-learning
- **description**: 24周生物信息学学习课程，集成4C框架
- **allowed-tools**: Read, Write, Edit, Bash, Glob, Grep
- **核心能力**:
  - 24周结构化课程
  - 4C框架集成（Content, Cognitive, Collaborative, Contextual）
  - 资源中心（概念、工具、数据库）
  - 案例库
  - 面试准备

### 📚 参考文档 (references/)
| 文件 | 内容 |
|------|------|
| curriculum_overview.md | 24周完整课程安排，每周主题、难度、任务 |
| concepts_reference.md | FPKM、TPM、FDR、VCF等核心概念解释 |
| tools_reference.md | FastQC、HISAT2、DESeq2、GATK等工具使用指南 |
| databases_reference.md | GEO、TCGA、Ensembl、gnomAD等数据库访问方法 |
| interview_questions.md | 技术问题、场景问题、编程挑战、行为问题 |
| data_skills_methodology.md | 数据技能学习方法论（整合Bioinformatics Data Skills） |
| skill_development_guide.md | Claude技能仓库开发教程 |

### 🛠️ 辅助脚本 (scripts/)
| 脚本 | 功能 |
|------|------|
| query_content.py | 按周/主题/难度查询课程内容 |
| query_resources.py | 查询概念、工具、数据库资源 |

### 📦 示例与模板 (assets/)
| 文件 | 用途 |
|------|------|
| rnaseq_workflow_example.md | 完整RNA-seq分析流程示例 |
| learning_note_template.md | 学习笔记模板 |
| project_readme_template.md | 项目README模板 |

### 🙏 致谢

#### 技能仓库结构参考
- **[claude-scientific-skills/venue-templates](https://github.com/K-Dense-AI/claude-scientific-skills/tree/main/scientific-skills/venue-templates)**: 提供了 Claude 技能仓库的标准结构，包括 SKILL.md 格式、目录组织、辅助脚本模式等。

#### 学习方法论参考
- **[ShenChen-bioUtopia/Bioinformatics-data-skills](https://github.com/ShenChen-bioUtopia/Bioinformatics-data-skills)**: 《Bioinformatics Data Skills》中文翻译版，提供了数据技能学习的核心方法论，包括：
  - 命令行熟练度的重要性
  - 脚本编程与自动化
  - Git版本控制实践
  - 数据格式深入理解
  - 批判性评估工具输出
  - 健壮和可重复研究的原则

### 🔄 整合功能

从 **Bioinformatics-data-skills** 整合的核心概念：
- 数据技能 > 工具学习：工具会变，技能可迁移
- 批判性思维：不信任默认参数，验证每一步结果
- 可重复研究：记录一切、自动化、版本控制
- 项目结构规范：data/scripts/results/docs 分离

从 **claude-scientific-skills** 整合的结构规范：
- SKILL.md YAML 元数据格式
- references/scripts/assets 目录结构
- 辅助脚本开发模式
- 与其他技能的集成方式

### 🔗 与 Dashboard 集成
技能仓库与现有的 Web Dashboard 配合使用：
- Dashboard：可视化学习进度跟踪
- Skill 仓库：为 Claude 提供结构化知识库

---

## 2026-04-01 - 界面重构与功能整合更新

### 🗑️ 删除功能
- **成就殿堂页面**：完全移除独立的成就页面，简化界面结构
- **项目管理页面**：移除项目管理模块，项目相关内容整合到课程体系中
- **成就进度预览**：学习进度页面的成就预览卡片已删除

### ✨ 新增功能
- **资源中心**：全新整合的资源中心页面，集合四大类资源
  - 核心概念（FPKM、TPM、FDR、log2FC、Phred score等）
  - 常用工具（FastQC、HISAT2、featureCounts、DESeq2、GATK等）
  - 公共数据库（GEO、TCGA、Ensembl、gnomAD、ClinVar、Bioconductor）
  - 文件格式（FASTQ、FASTA、BAM、GTF、VCF等）
- **论文案例库**：每周学习内容新增相关论文案例（weeks 1-22）
  - 包含论文标题、作者、期刊、DOI
  - 研究摘要、主要发现、方法工具
  - 与本周学习关联、学习要点

### 🔄 4C理论整合
- **Content（内容）**：生物学背景（为什么学、真实场景、行业标准）
- **Cognitive（认知）**：布鲁姆认知层级（记忆→理解→应用→分析→评估→创造）
- **Collaborative（协作）**：结对编程、小组讨论、Code Review清单
- **Contextual（情境）**：真实场景模拟（背景、角色、任务步骤、交付物）

### 🎨 UI优化
- **周详情模态框**：采用标签页布局，内容分6个标签页
  - 概览、认知目标、场景实践、任务清单、论文案例、AI助教
- **仪表盘重构**：全新三栏布局
  - 顶部统计栏：学习时长、完成任务、连续学习、当前进度
  - 左栏：今日任务、学习热力图
  - 中栏：番茄钟、本周进度
  - 右栏：快速记录、技能图谱
- **任务卡片优化**：新增任务类型图标、认知层级徽章
- **响应式设计**：完整的移动端适配

### 📊 数据更新
- 课程数据完全按照4C维度重构（weeks 1-24）
- 新增论文案例数据（CASE_STUDIES）
- 认知层级标签与任务关联

### 🔧 导航调整
- 删除：项目管理
- 重命名：概念速查 → 资源中心
- 新图标：资源中心使用数据库图标

### ⌨️ 快捷键更新
- `1` 仪表盘
- `2` 技能面板
- `3` 学习计划
- `4` 学习进度
- `5` 面试准备
- `6` 资源中心

---

## 2026-04-01 - 内容扩展更新

### ✨ 新增功能
- 概念库扩展至10个核心概念
- 练习题库扩展至6道题（3选择+3代码）
- 新增8个分类标签系统
- 部分概念添加代码示例

### 📊 数据更新
**概念速查（10个）**
1. FPKM - RNA-seq标准化
2. TPM - 转录本标准化
3. FDR - 错误发现率
4. VCF - 变异格式
5. UMAP - 降维算法
6. DESeq2 - 差异分析（新增代码示例）
7. BAM - 二进制比对格式
8. Phred Score - 质量分数
9. PCA - 主成分分析
10. log2FC - 倍数变化

**练习题库（6道）**
1. FASTQ序列统计（选择题 - Linux）
2. FDR vs p-value（选择题 - RNA-seq）
3. 批量重命名（代码题 - Shell）
4. CSV读取（代码题 - R）
5. GC含量计算（代码题 - Python）
6. VCF字段解释（选择题 - 变异检测）

### 📝 文档更新
- 更新USER_GUIDE.md，补充详细功能说明
- 更新COMPLETE_REPORT.md，记录最新数据
- 新增CHANGELOG.md，追踪版本变化

### 🎯 覆盖技能领域
- Linux命令行
- RNA-seq分析
- Shell脚本
- R语言
- Python编程
- 变异检测
- 质量控制
- 降维分析

---

## 历史版本

### 2026-03-XX - 4C优化完成
- 完成24周课程4C优化
- 创建可视化面板v2
- 实现数据持久化
- 添加详细任务指南
