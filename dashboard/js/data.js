/**
 * ============================================================================
 * 生物信息学学习系统 - 数据模块
 * ============================================================================
 *
 * @description  存储24周生物信息学学习课程的全部数据，包括课程结构、资源参考、
 *               面试题库、项目模板和任务步骤等
 *
 * @author       Bioinfo Learning Team
 * @version      2.0.0
 * @lastUpdate   2026-04-01
 *
 * @structure
 *   - CURRICULUM_DATA  : 24周课程数据（4阶段、每周主题、任务列表）
 *   - CASE_STUDIES     : 论文案例库（每周相关论文）
 *   - INTERVIEW_DATA   : 面试题库（7个分类、问答详情）
 *   - REFERENCE_DATA   : 资源参考（概念、工具、数据库、格式）
 *   - PROJECT_TEMPLATES: 项目模板（RNA-seq、WES、单细胞等）
 *   - TASK_STEPS       : 任务详细步骤指南
 *
 * @dataFormat
 *   - 4C框架: Content(内容), Cognitive(认知), Collaborative(协作), Contextual(情境)
 *   - 认知层级: remember, understand, apply, analyze, evaluate, create
 *   - 难度等级: ★☆☆☆☆ 到 ★★★★★
 *
 * ============================================================================
 */

// ============================================================================
// 课程数据
// ============================================================================
// 包含4个阶段（基础、核心、进阶、求职）和24周的详细学习内容
// 每周数据包含：主题、难度、学时、4C维度、任务列表、资源链接

const CURRICULUM_DATA = {
    phases: [
        { id: 1, name: "基础技能", weeks: "1-8", goal: "基础技能 + 第一个项目", role: "实习生" },
        { id: 2, name: "核心生信技能", weeks: "9-16", goal: "核心生信技能 + 标准项目", role: "初级分析师" },
        { id: 3, name: "进阶项目", weeks: "17-20", goal: "进阶项目 + 作品集", role: "中级分析师" },
        { id: 4, name: "求职准备", weeks: "21-24", goal: "求职准备 + 面试", role: "求职者" },
        { id: 5, name: "AI辅助分析", weeks: "25", goal: "AI工具整合 + 未来技能", role: "AI增强分析师" }
    ],
    weeks: [
        {
            week: 1, phase: 1, title: "环境搭建 + Linux基础",
            difficulty: "★☆☆☆☆",
            learning_hours: 10, practice_hours: 5,
            topics: ["安装Linux系统（WSL2或虚拟机）", "学习基本命令：ls, cd, mkdir, cp, mv, rm, cat, head, tail"],
            // 4C维度：生物学背景
            biological_context: {
                why: "生信分析在Linux服务器上进行，掌握Linux是生信工作的第一步",
                real_scenario: "公司服务器都是Linux系统，不会Linux就无法开展工作",
                industry_standard: "生信岗位要求熟练使用Linux命令行"
            },
            // 4C维度：认知层级
            cognitive_levels: {
                remember: ["记住10个基本Linux命令"],
                understand: ["理解文件系统结构"],
                apply: ["在终端中操作文件和目录"],
                analyze: ["比较不同命令的使用场景"],
                evaluate: ["评估命令执行结果的正确性"],
                create: ["设计合理的项目目录结构"]
            },
            // 4C维度：情境模拟
            scenario: {
                title: "第一天入职",
                background: "入职第一天，导师让你登录服务器熟悉环境",
                role: "实习生",
                tasks: ["SSH登录服务器", "查看服务器配置", "创建自己的工作目录"],
                time_limit: "30分钟"
            },
            // 4C维度：协作学习
            collaboration: {
                pair_task: null,
                group_discussion: "在群里自我介绍，分享学习目标",
                code_review: null
            },
            tasks: [
                { id: "w1t1", desc: "注册GitHub账号，创建仓库 bioinfo-learning", cognitive: "apply", time: "15分钟" },
                { id: "w1t2", desc: "注册Gitee账号（国内备选）", cognitive: "apply", time: "10分钟" },
                { id: "w1t3", desc: "创建项目目录结构", cognitive: "create", time: "30分钟" },
                { id: "w1t4", desc: "写第一篇学习笔记", cognitive: "understand", time: "30分钟" },
                { id: "w1t5", desc: "提交到GitHub", cognitive: "apply", time: "20分钟" }
            ],
            resources: [
                { name: "生信技能树 Linux合集", url: "https://www.bilibili.com/video/BV1o4411q7AQ/" }
            ],
            reflection: [
                "我理解了为什么生信工作需要Linux吗？",
                "我能独立完成基本的文件操作吗？",
                "遇到问题我知道去哪里查找答案吗？"
            ]
        },
        {
            week: 2, phase: 1, title: "Linux进阶 + Shell脚本",
            difficulty: "★★☆☆☆",
            learning_hours: 10, practice_hours: 5,
            topics: ["学习文本处理三剑客：grep, awk, sed", "学习管道和重定向", "学习循环和条件判断"],
            biological_context: {
                why: "生信分析需要批量处理大量数据文件，Shell脚本是自动化必备技能",
                real_scenario: "一个RNA-seq项目有50个样本，需要批量质控。手动处理需要数天，脚本只需几小时",
                industry_standard: "所有生信公司要求分析流程脚本化"
            },
            cognitive_levels: {
                remember: ["记住grep、awk、sed的基本语法"],
                understand: ["理解管道符和重定向的原理"],
                apply: ["用grep筛选FASTQ文件中的序列", "用awk统计数据"],
                analyze: ["比较grep和awk的使用场景", "分析复杂命令的执行顺序"],
                evaluate: ["评估脚本的效率和可读性"],
                create: ["编写批量处理FASTQ文件的脚本"]
            },
            scenario: {
                title: "批量质控任务",
                background: "收到50个样本的测序数据，需要快速生成质控统计报告",
                role: "实习生",
                tasks: ["统计每个文件的reads数", "提取GC含量", "批量重命名", "生成汇总CSV"],
                time_limit: "2小时"
            },
            collaboration: {
                pair_task: "两人一组，一人写脚本一人review，处理10个文件的重命名",
                group_discussion: "分享本周遇到的Shell难题和解决方案",
                code_review_checklist: ["脚本有注释吗？", "变量命名清晰吗？", "处理了错误情况吗？"]
            },
            tasks: [
                { id: "w2t1", desc: "完成Rosalind前5题，代码提交GitHub", cognitive: "apply", time: "2小时" },
                { id: "w2t2", desc: "编写批量重命名脚本", cognitive: "create", time: "1小时" },
                { id: "w2t3", desc: "博客：《grep/awk/sed实战案例》", cognitive: "understand", time: "1.5小时" }
            ],
            resources: [
                { name: "Shell脚本编程入门", url: "https://www.runoob.com/linux/linux-shell.html" },
                { name: "Rosalind练习", url: "http://rosalind.info/problems/locations/" }
            ],
            reflection: [
                "我能独立写出for循环处理多个文件吗？",
                "遇到复杂文本处理，我知道选择哪个工具吗？",
                "我的脚本有错误处理吗？"
            ]
        },
        {
            week: 3, phase: 1, title: "R语言基础",
            difficulty: "★★☆☆☆",
            learning_hours: 12, practice_hours: 6,
            topics: ["安装R和RStudio", "学习变量类型、向量、矩阵、数据框"],
            biological_context: {
                why: "R语言是生信分析的统计编程主力语言，Bioconductor生态丰富",
                real_scenario: "用R进行差异表达分析、数据可视化、统计分析",
                industry_standard: "R是生信岗位必备技能，要求熟练使用tidyverse和ggplot2"
            },
            cognitive_levels: {
                remember: ["记住R的基本数据类型"],
                understand: ["理解向量化操作的优势"],
                apply: ["使用dplyr处理数据框"],
                analyze: ["分析不同数据结构的适用场景"],
                evaluate: ["评估代码的效率和可读性"],
                create: ["编写数据处理脚本"]
            },
            scenario: {
                title: "数据清洗任务",
                background: "拿到一份表达矩阵，需要进行数据清洗和基本统计",
                role: "实习生",
                tasks: ["读取数据文件", "处理缺失值", "计算基本统计量", "输出清洗后的数据"],
                time_limit: "1小时"
            },
            collaboration: {
                pair_task: "结对编程：一人写代码一人review",
                group_discussion: "讨论R和其他语言的区别",
                code_review_checklist: ["代码能复现吗？", "有必要的注释吗？", "变量命名规范吗？"]
            },
            tasks: [
                { id: "w3t1", desc: "安装R和RStudio", cognitive: "apply", time: "30分钟" },
                { id: "w3t2", desc: "完成10个R基础练习题", cognitive: "apply", time: "2小时" },
                { id: "w3t3", desc: "代码提交GitHub", cognitive: "apply", time: "15分钟" },
                { id: "w3t4", desc: "博客：《R语言数据结构详解》", cognitive: "understand", time: "1小时" }
            ],
            resources: [
                { name: "R语言实战视频", url: "https://www.bilibili.com/video/av31349855/" }
            ],
            reflection: [
                "我理解R的向量化操作了吗？",
                "能独立完成基本的数据处理吗？",
                "知道遇到问题去哪里查资料吗？"
            ]
        },
        {
            week: 4, phase: 1, title: "R语言数据处理 + ggplot2",
            difficulty: "★★★☆☆",
            learning_hours: 12, practice_hours: 6,
            topics: ["学习tidyverse全家桶", "学习数据重塑", "学习可视化"],
            biological_context: {
                why: "生信分析结果需要专业图表展示，ggplot2是发表论文的标准工具",
                real_scenario: "绘制火山图、热图、PCA图、箱线图等发表级图表",
                industry_standard: "论文图表要求使用ggplot2绘制"
            },
            cognitive_levels: {
                remember: ["记住ggplot2的语法结构"],
                understand: ["理解图形语法概念"],
                apply: ["使用ggplot2绑定常用图表"],
                analyze: ["分析不同图表的适用场景"],
                evaluate: ["评估图表是否清晰表达信息"],
                create: ["设计专业级的生信图表"]
            },
            scenario: {
                title: "论文图表制作",
                background: "需要为论文准备RNA-seq分析结果图表",
                role: "初级分析师",
                tasks: ["绘制火山图展示差异基因", "绘制热图展示表达模式", "绘制PCA展示样本关系"],
                time_limit: "3小时"
            },
            collaboration: {
                pair_task: "互评图表：点评同学的作品",
                group_discussion: "分享图表美化技巧",
                code_review_checklist: ["图表有标题和标签吗？", "配色专业吗？", "图例清晰吗？"]
            },
            tasks: [
                { id: "w4t1", desc: "学习dplyr数据处理", cognitive: "apply", time: "2小时" },
                { id: "w4t2", desc: "完成5个数据可视化作品", cognitive: "create", time: "3小时" },
                { id: "w4t3", desc: "博客：《ggplot2常用图表代码模板》", cognitive: "create", time: "1.5小时" }
            ],
            resources: [],
            reflection: [
                "能独立绘制常见生信图表吗？",
                "理解图形语法的核心概念了吗？",
                "图表能达到发表标准吗？"
            ]
        },
        {
            week: 5, phase: 1, title: "Python基础",
            difficulty: "★★☆☆☆",
            learning_hours: 12, practice_hours: 6,
            topics: ["安装Anaconda或Miniconda", "学习变量、列表、字典、函数"],
            biological_context: {
                why: "Python适合开发自动化流程和工具，是生信第二主力语言",
                real_scenario: "用Python开发生信分析流程、处理大规模数据",
                industry_standard: "生信岗位通常要求R和Python双技能"
            },
            cognitive_levels: {
                remember: ["记住Python基本语法"],
                understand: ["理解面向对象编程概念"],
                apply: ["使用Python处理文件和数据"],
                analyze: ["比较Python和R的适用场景"],
                evaluate: ["评估代码质量和效率"],
                create: ["开发生信工具脚本"]
            },
            scenario: {
                title: "FASTQ解析工具",
                background: "需要开发一个工具解析FASTQ文件并统计基本信息",
                role: "实习生",
                tasks: ["读取FASTQ文件", "统计reads数量和长度", "计算GC含量", "输出统计报告"],
                time_limit: "2小时"
            },
            collaboration: {
                pair_task: "结对编程完成Rosalind题目",
                group_discussion: "讨论Python vs R的选择",
                code_review_checklist: ["代码符合PEP8规范吗？", "有docstring吗？", "处理了异常吗？"]
            },
            tasks: [
                { id: "w5t1", desc: "安装Miniconda", cognitive: "apply", time: "20分钟" },
                { id: "w5t2", desc: "完成Rosalind Python题目（5题）", cognitive: "apply", time: "2小时" },
                { id: "w5t3", desc: "编写FASTA/FASTQ解析工具", cognitive: "create", time: "2小时" }
            ],
            resources: [
                { name: "廖雪峰Python教程", url: "https://www.liaoxuefeng.com/wiki/1016959663602400" }
            ],
            reflection: [
                "能独立完成基本Python编程吗？",
                "理解Python和R各自的优势吗？",
                "知道如何组织代码项目吗？"
            ]
        },
        {
            week: 6, phase: 1, title: "Python数据分析",
            difficulty: "★★☆☆☆",
            learning_hours: 12, practice_hours: 6,
            topics: ["学习Pandas", "学习Numpy"],
            biological_context: {
                why: "Pandas是Python数据分析核心库，适合处理表格型生信数据",
                real_scenario: "用Pandas处理表达矩阵、样本信息表等",
                industry_standard: "数据清洗和预处理使用Pandas"
            },
            cognitive_levels: {
                remember: ["记住Pandas基本操作"],
                understand: ["理解DataFrame的结构"],
                apply: ["使用Pandas清洗和分析数据"],
                analyze: ["分析数据质量和异常值"],
                evaluate: ["评估数据处理流程的正确性"],
                create: ["设计数据处理流程"]
            },
            scenario: {
                title: "表达矩阵分析",
                background: "需要分析一份基因表达矩阵，找出高表达基因",
                role: "初级分析师",
                tasks: ["读取表达矩阵", "数据标准化", "筛选高表达基因", "保存结果"],
                time_limit: "1.5小时"
            },
            collaboration: {
                pair_task: "分享各自的数据处理技巧",
                group_discussion: "讨论Pandas vs dplyr",
                code_review_checklist: ["代码高效吗？", "处理了边界情况吗？", "结果正确吗？"]
            },
            tasks: [
                { id: "w6t1", desc: "学习Pandas基础操作", cognitive: "apply", time: "2小时" },
                { id: "w6t2", desc: "完成5个数据处理案例", cognitive: "apply", time: "2.5小时" },
                { id: "w6t3", desc: "博客：《Pandas处理生信数据实战》", cognitive: "create", time: "1.5小时" }
            ],
            resources: [],
            reflection: [
                "能熟练使用Pandas处理数据吗？",
                "理解DataFrame的核心操作了吗？",
                "能写出高效的代码吗？"
            ]
        },
        {
            week: 7, phase: 1, title: "Conda环境管理",
            difficulty: "★☆☆☆☆",
            learning_hours: 8, practice_hours: 8,
            topics: ["学习Conda/Mamba环境管理", "学习Bioconda"],
            biological_context: {
                why: "生信工具依赖复杂，Conda可以解决环境配置和依赖问题",
                real_scenario: "服务器上配置分析环境，安装各种生信软件",
                industry_standard: "使用Conda管理生信环境是标准做法"
            },
            cognitive_levels: {
                remember: ["记住Conda基本命令"],
                understand: ["理解环境隔离的原理"],
                apply: ["创建和管理虚拟环境"],
                analyze: ["分析依赖冲突的原因"],
                evaluate: ["评估环境配置的正确性"],
                create: ["设计完整的环境配置文件"]
            },
            scenario: {
                title: "新项目环境配置",
                background: "接到新项目，需要配置完整的RNA-seq分析环境",
                role: "初级分析师",
                tasks: ["创建新环境", "安装FastQC、HISAT2、featureCounts", "编写environment.yml", "测试环境"],
                time_limit: "1小时"
            },
            collaboration: {
                pair_task: "互相检查环境配置",
                group_discussion: "分享安装工具遇到的坑",
                code_review_checklist: ["environment.yml完整吗？", "版本号锁定了吗？", "能复现吗？"]
            },
            tasks: [
                { id: "w7t1", desc: "创建生信环境", cognitive: "apply", time: "30分钟" },
                { id: "w7t2", desc: "安装基础生信工具", cognitive: "apply", time: "1小时" },
                { id: "w7t3", desc: "编写environment.yml", cognitive: "create", time: "30分钟" },
                { id: "w7t4", desc: "博客：《Conda配置生信环境指南》", cognitive: "create", time: "1小时" }
            ],
            resources: [
                { name: "Bioconda", url: "https://bioconda.github.io/" }
            ],
            reflection: [
                "理解虚拟环境的作用了吗？",
                "能独立配置分析环境吗？",
                "知道如何解决依赖冲突吗？"
            ]
        },
        {
            week: 8, phase: 1, title: "项目1 - RNA-seq质控与比对",
            difficulty: "★★★★☆",
            learning_hours: 6, practice_hours: 12,
            topics: ["学习FASTQ/FASTA格式", "学习测序质量体系", "学习序列比对原理"],
            biological_context: {
                why: "RNA-seq是转录组研究核心技术，质控和比对是分析第一步",
                real_scenario: "处理真实的RNA-seq数据，完成从原始数据到表达矩阵",
                industry_standard: "使用FastQC+HISAT2/STAR+featureCounts标准流程"
            },
            cognitive_levels: {
                remember: ["记住FASTQ格式结构"],
                understand: ["理解测序原理和质控指标"],
                apply: ["运行标准分析流程"],
                analyze: ["分析质控结果判断数据质量"],
                evaluate: ["评估比对结果的质量"],
                create: ["设计自动化分析流程"]
            },
            scenario: {
                title: "RNA-seq分析项目",
                background: "收到客户RNA-seq数据，需要完成质控和比对分析",
                role: "初级分析师",
                tasks: ["数据质控", "序列比对", "定量分析", "生成报告"],
                time_limit: "8小时",
                deliverable: "完整的分析报告和可复现代码"
            },
            collaboration: {
                pair_task: "两人一组完成一个小数据集的分析",
                group_discussion: "讨论质控结果和改进方案",
                code_review_checklist: ["流程能复现吗？", "报告完整吗？", "代码规范吗？"]
            },
            tasks: [
                { id: "w8t1", desc: "完成RNA-seq前处理流程", cognitive: "apply", time: "4小时" },
                { id: "w8t2", desc: "编写自动化脚本", cognitive: "create", time: "2小时" },
                { id: "w8t3", desc: "生成质控报告", cognitive: "apply", time: "1小时" },
                { id: "w8t4", desc: "GitHub项目：RNA-seq-pipeline", cognitive: "create", time: "1小时" },
                { id: "w8t5", desc: "博客：《我的第一个RNA-seq项目》", cognitive: "create", time: "1.5小时" }
            ],
            project: { name: "RNA-seq-pipeline", type: "pipeline" },
            resources: [],
            reflection: [
                "理解RNA-seq分析流程了吗？",
                "能判断数据质量好坏吗？",
                "遇到问题能独立排查吗？"
            ]
        },
        {
            week: 9, phase: 2, title: "项目2 - RNA-seq差异表达（上）",
            difficulty: "★★★★☆",
            learning_hours: 4, practice_hours: 10,
            topics: ["学习FPKM/TPM/CPM概念", "学习DESeq2原理"],
            biological_context: {
                why: "差异表达分析是RNA-seq核心分析，找出实验处理导致的基因变化",
                real_scenario: "分析药物处理vs对照组的差异表达基因",
                industry_standard: "DESeq2是差异表达分析的金标准工具"
            },
            cognitive_levels: {
                remember: ["记住FPKM/TPM/CPM的定义"],
                understand: ["理解DESeq2的统计模型"],
                apply: ["运行DESeq2差异分析"],
                analyze: ["分析差异分析结果的生物学意义"],
                evaluate: ["评估结果的可靠性"],
                create: ["设计完整的差异分析流程"]
            },
            scenario: {
                title: "药物处理分析",
                background: "研究某药物对细胞基因表达的影响，需要找出差异基因",
                role: "初级分析师",
                tasks: ["准备输入数据", "运行DESeq2", "初步结果解读"],
                time_limit: "4小时"
            },
            collaboration: {
                pair_task: "互相检查分析代码",
                group_discussion: "讨论差异基因筛选标准",
                code_review_checklist: ["参数设置正确吗？", "对照组设置合理吗？", "结果可解释吗？"]
            },
            tasks: [
                { id: "w9t1", desc: "学习差异分析原理", cognitive: "understand", time: "2小时" },
                { id: "w9t2", desc: "准备count矩阵", cognitive: "apply", time: "1小时" },
                { id: "w9t3", desc: "创建DESeq对象并运行分析", cognitive: "apply", time: "2小时" }
            ],
            resources: [],
            reflection: [
                "理解差异分析的统计原理了吗？",
                "知道如何设置实验分组吗？",
                "能解读分析结果吗？"
            ]
        },
        {
            week: 10, phase: 2, title: "项目2 - RNA-seq差异表达（下）",
            difficulty: "★★★★☆",
            learning_hours: 4, practice_hours: 10,
            topics: ["显著性筛选与可视化", "火山图、热图、PCA图"],
            biological_context: {
                why: "可视化是分析结果展示的关键，火山图和热图是发表标准",
                real_scenario: "为论文准备RNA-seq分析图表",
                industry_standard: "使用ggplot2和pheatmap绑定发表级图表"
            },
            cognitive_levels: {
                remember: ["记住常见图表类型"],
                understand: ["理解每种图表表达的信息"],
                apply: ["绑定标准可视化"],
                analyze: ["分析图表揭示的生物学规律"],
                evaluate: ["评估图表的科学性"],
                create: ["设计创新的可视化方案"]
            },
            scenario: {
                title: "论文图表准备",
                background: "论文需要RNA-seq分析结果图表，要求达到发表标准",
                role: "初级分析师",
                tasks: ["绑定火山图", "绑定热图", "绑定PCA图", "美化和标注"],
                time_limit: "4小时",
                deliverable: "符合发表标准的图表文件"
            },
            collaboration: {
                pair_task: "互相点评图表质量",
                group_discussion: "分享图表美化技巧",
                code_review_checklist: ["图表符合发表标准吗？", "标注完整吗？", "配色专业吗？"]
            },
            tasks: [
                { id: "w10t1", desc: "筛选显著差异基因", cognitive: "apply", time: "1小时" },
                { id: "w10t2", desc: "生成可视化图表", cognitive: "create", time: "3小时" },
                { id: "w10t3", desc: "GitHub项目：RNA-seq-DEG-analysis", cognitive: "create", time: "1小时" },
                { id: "w10t4", desc: "博客：《RNA-seq差异表达分析教程》", cognitive: "create", time: "2小时" }
            ],
            project: { name: "RNA-seq-DEG-analysis", type: "analysis" },
            resources: [],
            reflection: [
                "能独立完成差异分析了吗？",
                "绑定的图表达到发表标准了吗？",
                "理解整个分析流程的逻辑了吗？"
            ]
        },
        {
            week: 11, phase: 2, title: "项目3 - WES变异检测（上）",
            difficulty: "★★★★★",
            learning_hours: 5, practice_hours: 10,
            topics: ["学习GATK Best Practices", "学习VCF格式"],
            biological_context: {
                why: "WES/WGS是基因组学核心技术，用于发现遗传变异",
                real_scenario: "临床样本的变异检测，寻找致病突变",
                industry_standard: "GATK Best Practices是变异检测的金标准"
            },
            cognitive_levels: {
                remember: ["记住VCF格式结构"],
                understand: ["理解GATK流程原理"],
                apply: ["运行GATK标准流程"],
                analyze: ["分析变异检测结果"],
                evaluate: ["评估变异检测质量"],
                create: ["设计自动化变异检测流程"]
            },
            scenario: {
                title: "临床变异检测",
                background: "医院送来临床样本，需要完成变异检测",
                role: "初级分析师",
                tasks: ["数据质控", "序列比对", "变异检测"],
                time_limit: "8小时"
            },
            collaboration: {
                pair_task: "两人一组完成小数据集分析",
                group_discussion: "讨论GATK参数优化",
                code_review_checklist: ["流程符合最佳实践吗？", "参数设置合理吗？", "结果可验证吗？"]
            },
            tasks: [
                { id: "w11t1", desc: "学习GATK Best Practices", cognitive: "understand", time: "2小时" },
                { id: "w11t2", desc: "下载参考基因组和数据库", cognitive: "apply", time: "1小时" },
                { id: "w11t3", desc: "完成比对和标记重复", cognitive: "apply", time: "3小时" }
            ],
            resources: [],
            reflection: [
                "理解GATK流程的原理了吗？",
                "知道每个步骤的作用吗？",
                "能判断结果质量吗？"
            ]
        },
        {
            week: 12, phase: 2, title: "项目3 - WES变异检测（下）",
            difficulty: "★★★★★",
            learning_hours: 5, practice_hours: 10,
            topics: ["学习SnpEff/ANNOVAR注释", "变异过滤与统计"],
            biological_context: {
                why: "变异注释是理解变异生物学意义的关键步骤",
                real_scenario: "从大量变异中筛选潜在的致病突变",
                industry_standard: "使用ANNOVAR/SnpEff进行功能注释"
            },
            cognitive_levels: {
                remember: ["记住变异注释的字段含义"],
                understand: ["理解变异功能注释的原理"],
                apply: ["运行变异注释流程"],
                analyze: ["分析注释结果，筛选候选变异"],
                evaluate: ["评估变异的致病性"],
                create: ["设计变异筛选策略"]
            },
            scenario: {
                title: "临床变异解读",
                background: "从患者的变异中找出可能的致病突变",
                role: "初级分析师",
                tasks: ["过滤低质量变异", "功能注释", "致病性预测", "生成报告"],
                time_limit: "4小时"
            },
            collaboration: {
                pair_task: "互相review变异筛选标准",
                group_discussion: "讨论变异解读的难点",
                code_review_checklist: ["筛选标准合理吗？", "注释完整吗？", "报告清晰吗？"]
            },
            tasks: [
                { id: "w12t1", desc: "完成变异检测", cognitive: "apply", time: "2小时" },
                { id: "w12t2", desc: "变异过滤和注释", cognitive: "apply", time: "3小时" },
                { id: "w12t3", desc: "GitHub项目：WES-variant-calling", cognitive: "create", time: "1小时" },
                { id: "w12t4", desc: "博客：《GATK变异检测实战》", cognitive: "create", time: "2小时" }
            ],
            project: { name: "WES-variant-calling", type: "pipeline" },
            resources: [],
            reflection: [
                "能独立完成WES分析流程吗？",
                "理解变异注释的原理了吗？",
                "能筛选出有意义的变异吗？"
            ]
        },
        {
            week: 13, phase: 2, title: "项目4 - ChIP-seq分析（上）",
            difficulty: "★★★★☆",
            learning_hours: 4, practice_hours: 10,
            topics: ["学习ChIP-seq原理", "学习Peak calling"],
            biological_context: {
                why: "ChIP-seq用于研究蛋白质-DNA相互作用，是表观遗传学核心技术",
                real_scenario: "研究转录因子的基因组结合位点",
                industry_standard: "MACS2是Peak calling的标准工具"
            },
            cognitive_levels: {
                remember: ["记住ChIP-seq的基本原理"],
                understand: ["理解Peak calling算法"],
                apply: ["运行MACS2进行Peak calling"],
                analyze: ["分析Peak的分布特征"],
                evaluate: ["评估Peak calling质量"],
                create: ["设计ChIP-seq分析流程"]
            },
            scenario: {
                title: "转录因子结合位点分析",
                background: "研究某转录因子在全基因组范围内的结合位点",
                role: "初级分析师",
                tasks: ["数据质控", "序列比对", "Peak calling"],
                time_limit: "4小时"
            },
            collaboration: {
                pair_task: "讨论Peak calling参数调整",
                group_discussion: "分享ChIP-seq分析经验",
                code_review_checklist: ["Input对照使用了吗？", "参数设置合理吗？", "结果可信吗？"]
            },
            tasks: [
                { id: "w13t1", desc: "学习ChIP-seq原理", cognitive: "understand", time: "1.5小时" },
                { id: "w13t2", desc: "完成质控和比对", cognitive: "apply", time: "2小时" },
                { id: "w13t3", desc: "运行MACS2 Peak calling", cognitive: "apply", time: "2小时" }
            ],
            resources: [],
            reflection: [
                "理解ChIP-seq的原理了吗？",
                "知道如何设置Peak calling参数吗？",
                "能判断Peak质量好坏吗？"
            ]
        },
        {
            week: 14, phase: 2, title: "项目4 - ChIP-seq分析（下）",
            difficulty: "★★★★☆",
            learning_hours: 4, practice_hours: 10,
            topics: ["学习Peak注释", "学习Motif分析"],
            biological_context: {
                why: "Peak注释揭示转录因子调控的靶基因，Motif分析发现结合序列特征",
                real_scenario: "完整解读ChIP-seq数据的生物学意义",
                industry_standard: "ChIPseeker注释，HOMER做Motif分析"
            },
            cognitive_levels: {
                remember: ["记住Peak注释的要素"],
                understand: ["理解Motif分析的原理"],
                apply: ["运行Peak注释和Motif分析"],
                analyze: ["分析Peak的基因组分布"],
                evaluate: ["评估结果的生物学意义"],
                create: ["设计完整的ChIP-seq分析报告"]
            },
            scenario: {
                title: "ChIP-seq完整分析报告",
                background: "完成ChIP-seq分析并生成完整报告",
                role: "初级分析师",
                tasks: ["Peak注释", "Motif发现", "可视化", "撰写报告"],
                time_limit: "4小时",
                deliverable: "完整的分析报告PDF"
            },
            collaboration: {
                pair_task: "互相review分析报告",
                group_discussion: "讨论结果解读",
                code_review_checklist: ["图表清晰吗？", "结论合理吗？", "报告完整吗？"]
            },
            tasks: [
                { id: "w14t1", desc: "完成Peak注释", cognitive: "apply", time: "2小时" },
                { id: "w14t2", desc: "生成可视化图表", cognitive: "create", time: "2小时" },
                { id: "w14t3", desc: "GitHub项目：ChIP-seq-analysis", cognitive: "create", time: "1小时" },
                { id: "w14t4", desc: "博客：《ChIP-seq数据分析》", cognitive: "create", time: "1.5小时" }
            ],
            project: { name: "ChIP-seq-analysis", type: "analysis" },
            resources: [],
            reflection: [
                "能独立完成ChIP-seq分析吗？",
                "理解Peak注释和Motif分析的作用吗？",
                "能解读结果的生物学意义吗？"
            ]
        },
        {
            week: 15, phase: 2, title: "GEO数据挖掘",
            difficulty: "★★★☆☆",
            learning_hours: 4, practice_hours: 10,
            topics: ["学习GEO数据库", "学习GEOquery包"],
            biological_context: {
                why: "GEO是最大的公共基因表达数据库，学会挖掘可快速发表文章",
                real_scenario: "利用公开数据进行二次分析",
                industry_standard: "使用GEOquery下载数据"
            },
            cognitive_levels: {
                remember: ["记住GEO数据库结构"],
                understand: ["理解GEO数据组织方式"],
                apply: ["使用GEOquery下载数据"],
                analyze: ["分析数据质量和实验设计"],
                evaluate: ["评估数据集是否适合研究问题"],
                create: ["设计数据挖掘方案"]
            },
            scenario: {
                title: "GEO数据挖掘项目",
                background: "选择一个感兴趣的疾病，挖掘GEO数据进行分析",
                role: "中级分析师",
                tasks: ["搜索数据集", "下载数据", "预处理", "分析"],
                time_limit: "4小时"
            },
            collaboration: {
                pair_task: "分享各自发现的有价值数据集",
                group_discussion: "讨论如何选择合适的数据集",
                code_review_checklist: ["数据选择合理吗？", "处理正确吗？", "结果可靠吗？"]
            },
            tasks: [
                { id: "w15t1", desc: "学习GEO数据库使用", cognitive: "understand", time: "1小时" },
                { id: "w15t2", desc: "下载并分析GEO数据集", cognitive: "apply", time: "3小时" },
                { id: "w15t3", desc: "完成差异分析和富集分析", cognitive: "apply", time: "3小时" }
            ],
            resources: [],
            reflection: [
                "能独立挖掘GEO数据吗？",
                "知道如何选择合适的数据集吗？",
                "理解数据预处理的要点吗？"
            ]
        },
        {
            week: 16, phase: 2, title: "TCGA数据挖掘",
            difficulty: "★★★★☆",
            learning_hours: 4, practice_hours: 10,
            topics: ["学习TCGA数据下载", "学习TCGAbiolinks"],
            biological_context: {
                why: "TCGA是最大的癌症组学数据库，癌症研究必备资源",
                real_scenario: "分析癌症数据发现生物标志物",
                industry_standard: "TCGAbiolinks是标准下载工具"
            },
            cognitive_levels: {
                remember: ["记住TCGA数据类型"],
                understand: ["理解TCGA数据组织结构"],
                apply: ["下载和处理TCGA数据"],
                analyze: ["分析癌症数据的特征"],
                evaluate: ["评估分析结果的临床意义"],
                create: ["设计癌症数据分析方案"]
            },
            scenario: {
                title: "TCGA癌症数据分析",
                background: "选择一种癌症类型，分析基因表达差异",
                role: "中级分析师",
                tasks: ["下载TCGA数据", "差异分析", "生存分析", "可视化"],
                time_limit: "6小时"
            },
            collaboration: {
                pair_task: "互相分享分析思路",
                group_discussion: "讨论TCGA数据分析技巧",
                code_review_checklist: ["数据下载正确吗？", "分析流程标准吗？", "结果可解释吗？"]
            },
            tasks: [
                { id: "w16t1", desc: "学习TCGA数据下载", cognitive: "understand", time: "1小时" },
                { id: "w16t2", desc: "下载TCGA数据", cognitive: "apply", time: "2小时" },
                { id: "w16t3", desc: "完成TCGA数据分析", cognitive: "apply", time: "4小时" },
                { id: "w16t4", desc: "GitHub项目：GEO-data-mining", cognitive: "create", time: "1小时" }
            ],
            project: { name: "GEO-data-mining", type: "analysis" },
            resources: [],
            reflection: [
                "能独立下载和分析TCGA数据吗？",
                "理解癌症数据分析的要点吗？",
                "能解释结果的临床意义吗？"
            ]
        },
        {
            week: 17, phase: 3, title: "项目5 - 单细胞RNA-seq（上）",
            difficulty: "★★★★★",
            learning_hours: 5, practice_hours: 12,
            topics: ["学习单细胞测序原理", "学习Seurat包"],
            biological_context: {
                why: "单细胞测序是研究细胞异质性的核心技术，是当前热点方向",
                real_scenario: "分析组织中的细胞类型组成和状态",
                industry_standard: "Seurat是单细胞分析的标准工具"
            },
            cognitive_levels: {
                remember: ["记住单细胞测序的基本原理"],
                understand: ["理解Seurat分析流程"],
                apply: ["创建Seurat对象并进行质控"],
                analyze: ["分析质控指标判断细胞质量"],
                evaluate: ["评估数据质量"],
                create: ["设计单细胞分析流程"]
            },
            scenario: {
                title: "单细胞数据分析入门",
                background: "拿到一份单细胞数据，需要进行基础分析",
                role: "中级分析师",
                tasks: ["创建Seurat对象", "质控过滤", "标准化"],
                time_limit: "4小时"
            },
            collaboration: {
                pair_task: "讨论质控标准设置",
                group_discussion: "分享单细胞分析经验",
                code_review_checklist: ["质控标准合理吗？", "过滤参数合适吗？", "标准化正确吗？"]
            },
            tasks: [
                { id: "w17t1", desc: "学习单细胞测序原理", cognitive: "understand", time: "2小时" },
                { id: "w17t2", desc: "创建Seurat对象", cognitive: "apply", time: "1小时" },
                { id: "w17t3", desc: "完成质控和标准化", cognitive: "apply", time: "2小时" }
            ],
            resources: [],
            reflection: [
                "理解单细胞测序的原理吗？",
                "知道如何设置质控标准吗？",
                "能判断数据质量好坏吗？"
            ]
        },
        {
            week: 18, phase: 3, title: "项目5 - 单细胞RNA-seq（下）",
            difficulty: "★★★★★",
            learning_hours: 5, practice_hours: 13,
            topics: ["细胞类型注释", "降维与聚类"],
            biological_context: {
                why: "细胞类型注释是单细胞分析的核心，揭示组织细胞组成",
                real_scenario: "鉴定组织中的细胞类型和亚群",
                industry_standard: "UMAP降维，Marker基因注释"
            },
            cognitive_levels: {
                remember: ["记住常见Marker基因"],
                understand: ["理解降维和聚类原理"],
                apply: ["运行降维聚类和注释"],
                analyze: ["分析细胞类型的特征"],
                evaluate: ["评估注释的准确性"],
                create: ["设计细胞注释策略"]
            },
            scenario: {
                title: "单细胞完整分析",
                background: "完成单细胞数据的完整分析流程",
                role: "中级分析师",
                tasks: ["降维聚类", "Marker基因鉴定", "细胞注释", "可视化"],
                time_limit: "6小时",
                deliverable: "完整的分析报告和图表"
            },
            collaboration: {
                pair_task: "互相验证细胞注释结果",
                group_discussion: "讨论细胞注释的技巧",
                code_review_checklist: ["聚类合理吗？", "注释准确吗？", "图表清晰吗？"]
            },
            tasks: [
                { id: "w18t1", desc: "完成降维和聚类", cognitive: "apply", time: "2小时" },
                { id: "w18t2", desc: "Marker基因鉴定", cognitive: "apply", time: "2小时" },
                { id: "w18t3", desc: "GitHub项目：scRNA-seq-analysis", cognitive: "create", time: "1小时" },
                { id: "w18t4", desc: "博客：《单细胞RNA-seq分析流程》", cognitive: "create", time: "2小时" }
            ],
            project: { name: "scRNA-seq-analysis", type: "analysis" },
            resources: []
        },
        {
            week: 19, phase: 3, title: "项目6 - 多组学整合分析",
            learning_hours: 5, practice_hours: 15,
            difficulty: "★★★★☆",
            biological_context: {
                why: "单一组学分析难以全面理解生物系统的复杂性，多组学整合可以从多维度解析生物学问题",
                real_scenario: "一个癌症研究项目同时有RNA-seq、ChIP-seq和ATAC-seq数据，需要整合分析找关键调控因子",
                industry_standard: "高水平研究通常需要多组学验证，生信分析师必须掌握整合方法"
            },
            cognitive_dimension: {
                bloom_levels: {
                    remember: ["列出多组学整合的常用方法", "说出MOFA、mixOmics等工具的功能"],
                    understand: ["解释多组学整合的生物学意义", "理解不同组学数据的互补性"],
                    apply: ["使用R包整合RNA-seq和ChIP-seq数据", "绘制多组学关联热图"],
                    analyze: ["比较不同整合方法的优缺点", "分析组学数据间的相关性"],
                    evaluate: ["评估整合结果的生物学合理性", "判断关键调控因子的可信度"],
                    create: ["设计并完成一个多组学整合分析流程"]
                },
                learning_strategy: "项目驱动学习",
                practice_method: "选择真实公共数据集进行整合分析",
                metacognition: [
                    "我理解不同组学数据如何相互补充吗？",
                    "我能选择合适的整合方法吗？",
                    "整合结果的生物学意义我能否解释？"
                ]
            },
            collaborative_dimension: {
                peer_learning: {
                    pair_programming: "两人一组，一人负责数据预处理，一人负责整合分析，最后合并结果",
                    group_discussion: "小组讨论：不同癌症类型的多组学特征差异",
                    code_review_checklist: ["整合流程是否可复现？", "参数选择是否有依据？", "结果是否有可视化展示？"]
                },
                community: {
                    share: "在GitHub分享整合分析代码和工作流程",
                    help: "帮助同学解决多组学数据格式转换问题"
                }
            },
            contextual_dimension: {
                real_scenario: {
                    title: "场景：癌症多组学数据整合分析",
                    background: "研究所的癌症项目收集了10对肿瘤-正常样本的RNA-seq、ATAC-seq和甲基化数据",
                    deadline: "2周内完成整合分析报告",
                    role: "生信分析师",
                    tasks: [
                        {step: 1, action: "下载并预处理三组学数据", tool: "GEOquery, ChAMP"},
                        {step: 2, action: "鉴定各组学的差异特征", tool: "DESeq2, diffBind"},
                        {step: 3, action: "整合分析识别关键基因", tool: "MOFA, mixOmics"},
                        {step: 4, action: "构建调控网络", tool: "WGCNA, igraph"}
                    ],
                    deliverable: "多组学整合分析报告，包含关键调控网络图"
                },
                industry_practice: {
                    naming: "项目文件夹命名：项目名_组学类型_日期",
                    documentation: "分析流程需用R Markdown记录",
                    version_control: "代码和数据配置文件均需版本管理"
                }
            },
            topics: ["多组学数据整合", "生存分析"],
            tasks: [
                { id: "w19t1", type: "practice", cognitive_level: "apply", desc: "选择多组学整合方向", context: "选择感兴趣的癌症类型和数据集" },
                { id: "w19t2", type: "practice", cognitive_level: "apply", desc: "下载多组学数据", context: "从GEO/TCGA下载" },
                { id: "w19t3", type: "project", cognitive_level: "create", desc: "GitHub项目：multi-omics-integration", context: "完整分析流程和报告" }
            ],
            project: { name: "multi-omics-integration", type: "analysis" },
            resources: []
        },
        {
            week: 20, phase: 3, title: "作品集完善",
            learning_hours: 5, practice_hours: 15,
            difficulty: "★★☆☆☆",
            biological_context: {
                why: "作品集是展示技术能力的窗口，直接影响求职成功率",
                real_scenario: "HR在筛选简历时会查看GitHub项目，高质量的作品集能让你脱颖而出",
                industry_standard: "生信岗位要求有可展示的项目作品和技术博客"
            },
            cognitive_dimension: {
                bloom_levels: {
                    remember: ["列出作品集应包含的内容", "说出GitHub项目README的标准结构"],
                    understand: ["理解作品集如何展示专业能力", "解释项目文档的重要性"],
                    apply: ["为每个项目添加完整README", "创建个人技术主页"],
                    analyze: ["分析优秀作品集的特点", "比较不同展示方式的优劣"],
                    evaluate: ["评估自己作品的完整性", "判断哪些项目值得重点展示"],
                    create: ["制作完整的个人技术作品集"]
                },
                learning_strategy: "迭代优化",
                practice_method: "参考优秀案例，反复改进自己的作品集",
                metacognition: [
                    "我的项目展示是否足够专业？",
                    "README是否让访客快速理解项目价值？",
                    "我的技术博客是否有足够的深度？"
                ]
            },
            collaborative_dimension: {
                peer_learning: {
                    pair_programming: "两人互相review对方的GitHub项目，提出改进建议",
                    group_discussion: "小组讨论：什么样的作品集最吸引HR？",
                    code_review_checklist: ["README是否完整？", "代码是否有注释？", "是否有使用说明？"]
                },
                community: {
                    share: "在社区分享作品集，收集反馈",
                    help: "帮同学改进项目文档"
                }
            },
            contextual_dimension: {
                real_scenario: {
                    title: "场景：准备求职作品集",
                    background: "即将开始求职，需要整理GitHub项目，确保给面试官留下专业印象",
                    deadline: "1周内完成",
                    role: "求职者",
                    tasks: [
                        {step: 1, action: "整理所有GitHub项目，统一命名规范"},
                        {step: 2, action: "为每个项目补充完整README"},
                        {step: 3, action: "创建GitHub Pages个人主页"},
                        {step: 4, action: "撰写/整理技术博客至少10篇"}
                    ],
                    deliverable: "完整的GitHub作品集和个人主页"
                },
                industry_practice: {
                    readme_template: "项目名称、简介、安装、使用、示例、贡献、许可",
                    portfolio_essentials: "简介、技能、项目、博客、联系方式"
                }
            },
            topics: ["整理GitHub项目", "创建个人主页"],
            tasks: [
                { id: "w20t1", type: "output", cognitive_level: "apply", desc: "整理所有GitHub项目，添加完整README", context: "至少6个项目" },
                { id: "w20t2", type: "output", cognitive_level: "create", desc: "创建个人主页（GitHub Pages）", context: "展示个人信息和项目" },
                { id: "w20t3", type: "output", cognitive_level: "create", desc: "整理技术博客（至少10篇）", context: "涵盖学习的核心技能" },
                { id: "w20t4", type: "output", cognitive_level: "create", desc: "制作项目展示PPT", context: "用于面试讲解" }
            ],
            resources: []
        },
        {
            week: 21, phase: 4, title: "简历准备",
            learning_hours: 5, practice_hours: 10,
            difficulty: "★★☆☆☆",
            biological_context: {
                why: "简历是求职的敲门砖，好的简历能获得更多面试机会",
                real_scenario: "HR平均只花6秒浏览一份简历，必须在短时间内抓住眼球",
                industry_standard: "技术简历应突出项目经验和技能，避免空洞描述"
            },
            cognitive_dimension: {
                bloom_levels: {
                    remember: ["列出简历的基本结构", "说出技术简历的必备要素"],
                    understand: ["理解STAR法则描述项目经验", "解释简历与岗位匹配的重要性"],
                    apply: ["用STAR法则重写项目经验", "针对目标岗位调整简历"],
                    analyze: ["分析优秀简历的特点", "比较中英文简历差异"],
                    evaluate: ["评估简历与目标岗位的匹配度", "判断简历是否有冗余信息"],
                    create: ["撰写专业的中英文技术简历"]
                },
                learning_strategy: "迭代优化+反馈",
                practice_method: "写初稿→找人反馈→修改→再反馈，循环改进",
                metacognition: [
                    "我的简历是否突出了核心技能？",
                    "项目描述是否足够具体？",
                    "简历是否与目标岗位匹配？"
                ]
            },
            collaborative_dimension: {
                peer_learning: {
                    pair_programming: "两人互相审阅简历，提出修改建议",
                    group_discussion: "小组讨论：HR最看重什么？简历如何脱颖而出？",
                    code_review_checklist: ["是否有量化成果？", "技能描述是否具体？", "是否有关键词匹配？"]
                },
                community: {
                    share: "分享简历模板和撰写经验",
                    help: "帮同学修改简历"
                }
            },
            contextual_dimension: {
                real_scenario: {
                    title: "场景：撰写求职简历",
                    background: "目标申请生信分析岗位，需要准备专业简历",
                    deadline: "3天内完成初稿",
                    role: "求职者",
                    tasks: [
                        {step: 1, action: "列出所有项目经历和技能"},
                        {step: 2, action: "用STAR法则描述每个项目"},
                        {step: 3, action: "撰写中文简历"},
                        {step: 4, action: "撰写英文简历"},
                        {step: 5, action: "请导师/学长审阅修改"}
                    ],
                    deliverable: "中英文简历各一份"
                },
                industry_practice: {
                    resume_structure: "个人信息、教育背景、技能、项目经验、实习经历",
                    star_method: "Situation背景、Task任务、Action行动、Result结果",
                    quantification: "用数字量化成果，如'分析了100+样本'、'提升效率50%'"
                }
            },
            topics: ["撰写技术简历", "突出项目经验"],
            tasks: [
                { id: "w21t1", type: "output", cognitive_level: "create", desc: "撰写中文简历", context: "突出生信分析能力" },
                { id: "w21t2", type: "output", cognitive_level: "create", desc: "撰写英文简历", context: "申请外企或海外岗位" },
                { id: "w21t3", type: "output", cognitive_level: "apply", desc: "准备项目描述", context: "每个项目用STAR法则描述" }
            ],
            resources: []
        },
        {
            week: 22, phase: 4, title: "面试准备",
            learning_hours: 5, practice_hours: 10,
            difficulty: "★★★☆☆",
            biological_context: {
                why: "面试是展示能力的最终环节，充分准备才能发挥真实水平",
                real_scenario: "技术面试通常包含基础知识、项目讲解、现场编程、业务场景等环节",
                industry_standard: "生信面试常考RNA-seq流程、统计原理、编程能力、项目经验"
            },
            cognitive_dimension: {
                bloom_levels: {
                    remember: ["记住常见面试题和答案", "回顾生信核心知识点"],
                    understand: ["理解面试官问题的真正意图", "解释自己项目的技术细节"],
                    apply: ["模拟面试场景练习", "用清晰语言讲解技术方案"],
                    analyze: ["分析面试题的考察点", "拆解复杂问题为可答步骤"],
                    evaluate: ["评估自己回答的完整性", "判断何时该承认不知道"],
                    create: ["准备个人独特的项目讲解材料"]
                },
                learning_strategy: "模拟演练",
                practice_method: "每天模拟面试2次，录音回放改进",
                metacognition: [
                    "我能否清晰讲解RNA-seq流程？",
                    "遇到不会的问题我如何应对？",
                    "我的项目讲解是否足够吸引人？"
                ]
            },
            collaborative_dimension: {
                peer_learning: {
                    pair_programming: "两人一组，轮流扮演面试官和候选人",
                    group_discussion: "小组讨论：遇到的难题如何回答？",
                    code_review_checklist: ["回答是否结构化？", "是否展示了思考过程？", "态度是否积极？"]
                },
                community: {
                    share: "分享面试经验和真题",
                    help: "帮同学模拟面试"
                }
            },
            contextual_dimension: {
                real_scenario: {
                    title: "场景：技术面试模拟",
                    background: "收到某生信公司面试邀请，需要进行技术面试准备",
                    deadline: "面试前3天",
                    role: "面试候选人",
                    tasks: [
                        {step: 1, action: "整理面试常见问题（50题）"},
                        {step: 2, action: "准备自我介绍（3分钟版本）"},
                        {step: 3, action: "准备项目讲解（5-10分钟）"},
                        {step: 4, action: "模拟技术问答"},
                        {step: 5, action: "准备反问面试官的问题"}
                    ],
                    deliverable: "面试准备清单和模拟面试记录"
                },
                industry_practice: {
                    interview_types: "电话筛选、技术面试、项目答辩、HR面试",
                    common_topics: "RNA-seq流程、统计学基础、Linux命令、编程能力",
                    tips: "诚实回答、展示思考过程、不懂可以说不了解但愿意学习"
                }
            },
            topics: ["整理面试题", "准备项目讲解"],
            tasks: [
                { id: "w22t1", type: "practice", cognitive_level: "remember", desc: "整理常见面试题（50题）", context: "涵盖生信核心知识" },
                { id: "w22t2", type: "practice", cognitive_level: "apply", desc: "准备自我介绍（3分钟）", context: "突出技术背景和项目经验" },
                { id: "w22t3", type: "practice", cognitive_level: "apply", desc: "准备技术问题回答", context: "模拟练习" }
            ],
            resources: []
        },
        {
            week: 23, phase: 4, title: "投递简历",
            learning_hours: 3, practice_hours: 12,
            difficulty: "★☆☆☆☆",
            biological_context: {
                why: "简历投递是求职的关键环节，策略性投递能提高成功率",
                real_scenario: "生信岗位分布在药企、医院、科研院所、生信公司、互联网医疗等",
                industry_standard: "建议多渠道投递，每天5-10份，持续跟进"
            },
            cognitive_dimension: {
                bloom_levels: {
                    remember: ["列出主要求职渠道", "记住投递注意事项"],
                    understand: ["理解不同渠道的特点", "解释定制简历的重要性"],
                    apply: ["针对性修改简历投递", "撰写个性化求职信"],
                    analyze: ["分析目标公司的招聘需求", "比较不同岗位的要求差异"],
                    evaluate: ["评估岗位与自己的匹配度", "判断投递优先级"],
                    create: ["建立投递追踪系统"]
                },
                learning_strategy: "数据驱动",
                practice_method: "记录投递数据，分析回复率，优化策略",
                metacognition: [
                    "我的投递策略是否有效？",
                    "哪些渠道回复率最高？",
                    "我的简历是否需要针对不同岗位调整？"
                ]
            },
            collaborative_dimension: {
                peer_learning: {
                    pair_programming: "两人分享投递渠道和经验",
                    group_discussion: "小组讨论：如何提高面试转化率？",
                    code_review_checklist: ["投递记录是否完整？", "跟进是否及时？", "是否定制了简历？"]
                },
                community: {
                    share: "分享靠谱的招聘渠道和岗位信息",
                    help: "内推同学到自己的公司"
                }
            },
            contextual_dimension: {
                real_scenario: {
                    title: "场景：求职投递执行",
                    background: "简历准备完毕，开始大规模投递",
                    deadline: "持续2周",
                    role: "求职者",
                    tasks: [
                        {step: 1, action: "列出目标公司和岗位"},
                        {step: 2, action: "每天投递5-10份简历"},
                        {step: 3, action: "记录投递公司和岗位"},
                        {step: 4, action: "跟进面试邀请"},
                        {step: 5, action: "准备面试安排"}
                    ],
                    deliverable: "投递记录表和面试日程"
                },
                industry_practice: {
                    channels: "Boss直聘、智联招聘、猎聘、LinkedIn、公司官网、内推",
                    tracking: "使用Excel追踪投递公司、岗位、时间、状态、反馈",
                    tips: "工作日上午投递回复率最高"
                }
            },
            topics: ["求职渠道选择", "目标公司投递"],
            tasks: [
                { id: "w23t1", type: "practice", cognitive_level: "apply", desc: "每天投递5-10份简历", context: "多渠道投递" },
                { id: "w23t2", type: "practice", cognitive_level: "apply", desc: "记录投递公司和岗位", context: "便于跟进" },
                { id: "w23t3", type: "practice", cognitive_level: "analyze", desc: "跟进面试邀请", context: "及时回复" }
            ],
            resources: []
        },
        {
            week: 24, phase: 4, title: "面试与offer",
            learning_hours: 3, practice_hours: 12,
            difficulty: "★★★☆☆",
            biological_context: {
                why: "面试表现和offer评估决定最终去向，需要认真对待每个环节",
                real_scenario: "可能同时收到多个offer，需要综合评估薪资、发展、团队、地点等因素",
                industry_standard: "offer评估应考虑：薪资福利、职业发展、团队氛围、工作地点、公司前景"
            },
            cognitive_dimension: {
                bloom_levels: {
                    remember: ["记住面试礼仪和注意事项", "说出offer评估的关键因素"],
                    understand: ["理解不同面试形式的侧重点", "解释薪资谈判的技巧"],
                    apply: ["针对性准备每场面试", "用清单评估offer"],
                    analyze: ["分析面试表现找改进点", "比较不同offer的优劣"],
                    evaluate: ["评估offer的整体价值", "判断是否符合职业规划"],
                    create: ["制定职业决策框架"]
                },
                learning_strategy: "经验总结",
                practice_method: "每次面试后复盘，记录经验教训",
                metacognition: [
                    "我在面试中表现如何？有哪些可以改进？",
                    "这个offer符合我的职业规划吗？",
                    "我是否充分了解了这家公司？"
                ]
            },
            collaborative_dimension: {
                peer_learning: {
                    pair_programming: "两人分享面试经验和offer评估方法",
                    group_discussion: "小组讨论：如何谈判薪资？如何选择offer？",
                    code_review_checklist: ["面试准备是否充分？", "是否了解了公司信息？", "offer评估是否全面？"]
                },
                community: {
                    share: "分享面试经验和薪资行情",
                    help: "帮同学分析offer"
                }
            },
            contextual_dimension: {
                real_scenario: {
                    title: "场景：面试与offer决策",
                    background: "已收到多家公司面试邀请和offer，需要进行面试和决策",
                    deadline: "offer有效期通常1-2周",
                    role: "候选人",
                    tasks: [
                        {step: 1, action: "面试前深入了解公司业务"},
                        {step: 2, action: "准备针对性问题问面试官"},
                        {step: 3, action: "面试后总结经验教训"},
                        {step: 4, action: "用评估清单比较各offer"},
                        {step: 5, action: "做出最终选择"}
                    ],
                    deliverable: "面试总结和offer决策报告"
                },
                industry_practice: {
                    interview_tips: "研究公司业务、准备提问问题、着装得体、提前到达",
                    offer_evaluation: "基本薪资、年终奖、五险一金、股票期权、加班情况、发展空间",
                    negotiation: "了解市场行情、不要急于回复、可以礼貌议价"
                }
            },
            topics: ["面试技巧", "Offer评估"],
            tasks: [
                { id: "w24t1", type: "practice", cognitive_level: "apply", desc: "每次面试前复习该公司业务", context: "了解公司背景" },
                { id: "w24t2", type: "practice", cognitive_level: "apply", desc: "准备针对性问题", context: "展示对岗位的兴趣" },
                { id: "w24t3", type: "reflection", cognitive_level: "evaluate", desc: "面试后总结经验", context: "持续改进" },
                { id: "w24t4", type: "decision", cognitive_level: "evaluate", desc: "评估Offer", context: "综合考虑做决策" }
            ],
            resources: []
        },
        // ========== 专题课程：AI辅助生信分析 ==========
        {
            week: 25, phase: 4, title: "AI辅助生信分析专题",
            learning_hours: 8, practice_hours: 12,
            difficulty: "★★★★☆",
            biological_context: {
                why: "AI工具正在改变生物信息学的工作方式，掌握AI辅助分析能力是未来生信分析师的核心竞争力",
                real_scenario: "在分析复杂项目时，AI可以帮助理解概念、编写代码、调试错误、解释结果，大幅提升工作效率",
                industry_standard: "现代生信岗位要求能够高效利用AI工具进行辅助分析，同时保持对结果的批判性评估"
            },
            cognitive_dimension: {
                bloom_levels: {
                    remember: ["记住Claude Code的基本命令和用法", "说出AI辅助分析的适用场景"],
                    understand: ["理解Claude Skills的工作原理", "理解何时该用AI、何时需要人工判断"],
                    apply: ["使用Claude Code辅助生信分析", "配置和使用bioinfo-learning技能"],
                    analyze: ["分析AI输出的可靠性", "比较AI辅助与传统方法的优劣"],
                    evaluate: ["评估AI建议的正确性", "判断何时需要验证AI输出"],
                    create: ["构建个人的AI辅助分析工作流", "开发自定义Claude Skills"]
                },
                learning_strategy: "实践驱动学习",
                practice_method: "选择真实项目场景，用AI辅助完成分析流程",
                metacognition: [
                    "我是否理解AI给出的建议？",
                    "我能判断AI输出的正确性吗？",
                    "我知道何时需要独立思考而非依赖AI吗？"
                ]
            },
            collaborative_dimension: {
                peer_learning: {
                    pair_programming: "两人一组，一人使用AI辅助，一人传统方式，比较效率和质量",
                    group_discussion: "分享AI辅助分析的最佳实践和踩坑经验",
                    code_review_checklist: ["AI生成的代码是否经过验证？", "结果是否符合生物学意义？", "分析流程是否可复现？"]
                },
                community: {
                    share: "分享Claude Skills使用经验和自定义配置",
                    help: "帮助同学配置AI辅助分析环境"
                }
            },
            contextual_dimension: {
                real_scenario: {
                    title: "场景：AI辅助RNA-seq分析",
                    background: "收到一个新的RNA-seq项目，需要在2天内完成初步分析",
                    deadline: "2天",
                    role: "生信分析师",
                    tasks: [
                        {step: 1, action: "使用AI辅助理解实验设计", tool: "Claude Code"},
                        {step: 2, action: "AI辅助编写质控脚本", tool: "Claude Code + FastQC"},
                        {step: 3, action: "AI解释比对结果异常", tool: "Claude Code"},
                        {step: 4, action: "AI辅助差异分析和可视化", tool: "Claude Code + DESeq2"}
                    ],
                    deliverable: "完整的RNA-seq分析报告，记录AI辅助的关键步骤"
                },
                industry_practice: {
                    ai_tools: "Claude Code, ChatGPT, GitHub Copilot",
                    best_practices: "验证AI输出、理解代码逻辑、保持批判性思维",
                    documentation: "记录AI辅助过程，确保可复现"
                }
            },
            topics: [
                "AI辅助生信分析概述",
                "Claude Code安装与配置",
                "bioinfo-learning Skill使用",
                "AI辅助代码编写与调试",
                "批判性评估AI输出",
                "构建个人AI工作流"
            ],
            tasks: [
                { id: "w25t1", type: "setup", cognitive_level: "apply", desc: "安装Claude Code CLI", context: "配置API密钥和基础设置" },
                { id: "w25t2", type: "setup", cognitive_level: "apply", desc: "配置bioinfo-learning技能", context: "克隆技能仓库并配置" },
                { id: "w25t3", type: "practice", cognitive_level: "apply", desc: "AI辅助完成RNA-seq质控", context: "使用AI解释FastQC结果" },
                { id: "w25t4", type: "practice", cognitive_level: "analyze", desc: "AI辅助编写分析脚本", context: "对比AI生成代码与手写代码" },
                { id: "w25t5", type: "project", cognitive_level: "create", desc: "构建个人AI辅助工作流", context: "整合到日常分析流程" }
            ],
            resources: [
                { name: "Claude Code官方文档", url: "https://docs.anthropic.com/claude/docs/claude-code" },
                { name: "Bioinformatics-data-skills", url: "https://github.com/ShenChen-bioUtopia/Bioinformatics-data-skills" },
                { name: "claude-scientific-skills", url: "https://github.com/K-Dense-AI/claude-scientific-skills" }
            ],
            code_examples: [
                {
                    title: "Claude Code安装命令",
                    language: "bash",
                    code: "# 安装Claude Code CLI\nnpm install -g @anthropic-ai/claude-code\n\n# 配置API密钥\nclaude config set api-key YOUR_API_KEY\n\n# 启动Claude Code\nclaude"
                },
                {
                    title: "配置bioinfo-learning技能",
                    language: "bash",
                    code: "# 克隆技能仓库\ngit clone https://github.com/your-repo/bioinfo-learning-skill.git\n\n# 放置到Claude技能目录\nmkdir -p ~/.claude/skills\ncp -r bioinfo-learning-skill/.claude/skills/* ~/.claude/skills/\n\n# 重启Claude Code使技能生效"
                },
                {
                    title: "使用AI辅助分析示例",
                    language: "python",
                    code: "# 在Claude Code中请求AI辅助分析\n# 示例提示词：\n\n\"\"\"\n我有一个RNA-seq项目的count矩阵，需要：\n1. 使用DESeq2进行差异分析\n2. 条件：treatment vs control，每组3个重复\n3. 筛选标准：padj < 0.05, |log2FC| > 1\n4. 输出火山图和热图\n\n请帮我编写完整的R代码，并解释每一步。\n\"\"\""
                }
            ]
        }
    ]
};

// ============================================================================
// 论文案例库
// ============================================================================
// 每周相关的经典论文案例，包含：
//   - 论文元数据：标题、作者、期刊、年份、DOI
//   - 研究摘要和主要发现
//   - 使用的方法和工具
//   - 与本周学习内容的关联
//   - 学习要点提示

const CASE_STUDIES = {
    // 第1-2周：Linux基础和Shell脚本
    1: {
        title: "生物信息学计算环境",
        papers: [
            {
                title: "The ENCODE Project: Data Standards and Reproducibility",
                authors: "ENCODE Project Consortium",
                journal: "Nature",
                year: 2020,
                doi: "10.1038/s41586-020-2493-2",
                summary: "ENCODE项目制定了生物信息学数据处理的标准化流程，强调了可重复性和流程化的重要性。",
                key_findings: [
                    "建立了标准化的数据处理流程",
                    "所有分析代码必须在Linux环境下可重复运行",
                    "使用版本控制管理所有分析脚本"
                ],
                methods: ["Linux工作流", "Shell脚本自动化", "版本控制"],
                relevance: "展示了为什么生信工作必须掌握Linux和脚本编程，这是行业标准的起点。",
                learning_points: ["理解流程标准化的重要性", "学习如何组织分析项目", "掌握可重复性研究原则"]
            }
        ]
    },
    2: {
        title: "批量数据处理与自动化",
        papers: [
            {
                title: "Snakemake: A scalable bioinformatics workflow engine",
                authors: "Köster, J. & Rahmann, S.",
                journal: "Bioinformatics",
                year: 2012,
                doi: "10.1093/bioinformatics/bts480",
                summary: "Snakemake是一个基于Python的工作流管理系统，使用类似Make的语法自动化复杂分析流程。",
                key_findings: [
                    "自动化流程可以将数天的手工操作缩短到数小时",
                    "流程化管理提高结果可重复性",
                    "支持并行计算和集群部署"
                ],
                methods: ["工作流自动化", "Shell脚本集成", "并行计算"],
                relevance: "展示了Shell脚本在大型生信项目中的核心作用，自动化是生信工作的基础能力。",
                learning_points: ["理解工作流管理概念", "学习如何设计可复用脚本", "掌握批量处理技巧"]
            },
            {
                title: "Biostar Handbook: A Beginner's Guide to Bioinformatics Commands",
                authors: "Páll Pétursson",
                journal: "Self-published",
                year: 2018,
                doi: "",
                summary: "Biostar Handbook是生信入门经典，详细介绍了Linux命令行工具在生物数据分析中的应用。",
                key_findings: [
                    "命令行工具是生信分析的基础",
                    "grep/awk/sed是文本处理三剑客",
                    "管道操作实现复杂数据处理"
                ],
                methods: ["Linux命令行", "文本处理", "数据格式转换"],
                relevance: "直接对应本周学习内容，展示了这些基础工具如何解决实际问题。",
                learning_points: ["掌握核心命令行工具", "理解数据流处理模式", "学会查阅文档解决问题"]
            }
        ]
    },
    3: {
        title: "R语言与生物统计",
        papers: [
            {
                title: "R: A language for data analysis and graphics",
                authors: "Ihaka, R. & Gentleman, R.",
                journal: "Journal of Computational and Graphical Statistics",
                year: 1996,
                doi: "10.1080/10618600.1996.10474713",
                summary: "R语言的奠基性论文，介绍了R作为统计分析和图形展示语言的设计理念。",
                key_findings: [
                    "R专为统计分析设计，具有强大的数据处理能力",
                    "向量化操作是R的核心特性",
                    "丰富的可视化功能使数据探索更直观"
                ],
                methods: ["统计计算", "数据可视化", "向量化编程"],
                relevance: "理解R语言的设计哲学，为后续生信分析打下统计学基础。",
                learning_points: ["理解R的设计理念", "掌握基本数据结构", "学会数据可视化"]
            },
            {
                title: "ggplot2: Elegant Graphics for Data Analysis",
                authors: "Wickham, H.",
                journal: "Springer",
                year: 2016,
                doi: "10.1007/978-3-319-24277-4",
                summary: "ggplot2是基于图形语法的可视化系统，是R中最流行的绑图包。",
                key_findings: [
                    "图形语法提供统一的绑图框架",
                    "图层系统使复杂图形构建变得简单",
                    "主题系统支持出版级图形定制"
                ],
                methods: ["数据可视化", "图形语法", "主题定制"],
                relevance: "ggplot2是生信分析中最常用的可视化工具，几乎所有分析结果都需要用它绑图。",
                learning_points: ["理解图形语法", "掌握常见图表类型", "学会定制出版级图形"]
            }
        ]
    },
    4: {
        title: "数据可视化与探索性分析",
        papers: [
            {
                title: "Tidy Data",
                authors: "Wickham, H.",
                journal: "Journal of Statistical Software",
                year: 2014,
                doi: "10.18637/jss.v059.i10",
                summary: "提出了整洁数据的概念和原则，是现代数据科学的基石论文。",
                key_findings: [
                    "整洁数据三原则：每个变量一列，每个观测一行，每种类型一个表",
                    "数据清洗占分析工作80%的时间",
                    "tidyverse生态系统使数据处理更加一致和高效"
                ],
                methods: ["数据清洗", "dplyr", "tidyr"],
                relevance: "生信分析的第一步几乎都是数据清洗，理解tidy data原则至关重要。",
                learning_points: ["掌握整洁数据原则", "学会使用dplyr处理数据", "理解数据清洗的重要性"]
            }
        ]
    },
    5: {
        title: "Python编程与生物数据处理",
        papers: [
            {
                title: "Biopython: freely available Python tools for computational molecular biology",
                authors: "Cock, P.J. et al.",
                journal: "Bioinformatics",
                year: 2009,
                doi: "10.1093/bioinformatics/btp163",
                summary: "Biopython是Python生物信息学工具包，提供了处理序列、结构、注释等数据的标准接口。",
                key_findings: [
                    "Python适合处理生物信息学各种格式数据",
                    "面向对象设计使代码更易维护",
                    "丰富的解析器支持常见生物数据格式"
                ],
                methods: ["序列处理", "文件解析", "API调用"],
                relevance: "Biopython是Python生信开发的基础库，掌握它可以直接处理FASTA、FASTQ、GenBank等格式。",
                learning_points: ["学会使用Biopython处理序列", "理解Python面向对象编程", "掌握常见生物数据格式"]
            }
        ]
    },
    6: {
        title: "版本控制与协作开发",
        papers: [
            {
                title: "Git: Fast version control system",
                authors: "Torvalds, L. & Hamano, J.",
                journal: "Software: Practice and Experience",
                year: 2010,
                doi: "",
                summary: "Git是目前最流行的分布式版本控制系统，由Linus Torvalds为Linux内核开发而创建。",
                key_findings: [
                    "版本控制是软件工程的基础实践",
                    "分支功能支持并行开发和实验",
                    "分布式架构支持离线工作和协作"
                ],
                methods: ["版本控制", "分支管理", "协作开发"],
                relevance: "所有生信项目都需要版本控制，Git是行业标准，GitHub是代码分享和协作的平台。",
                learning_points: ["理解版本控制概念", "掌握Git基本操作", "学会使用GitHub协作"]
            }
        ]
    },
    7: {
        title: "Conda环境管理",
        papers: [
            {
                title: "Bioconda: A sustainable and comprehensive software distribution",
                authors: "Grüning, B. et al.",
                journal: "Nature Methods",
                year: 2018,
                doi: "10.1038/s41592-018-0046-7",
                summary: "Bioconda是专门为生物信息学软件设计的Conda频道，包含了数千个生信工具。",
                key_findings: [
                    "统一解决了生信软件安装的依赖问题",
                    "提供了超过7000个生信软件包",
                    "支持跨平台、可重复的环境配置"
                ],
                methods: ["软件管理", "环境隔离", "依赖解决"],
                relevance: "Bioconda是生信工具安装的标准方式，掌握Conda是生信工作的必备技能。",
                learning_points: ["学会使用Conda管理环境", "理解依赖管理的重要性", "掌握常见生信工具安装"]
            }
        ]
    },
    8: {
        title: "RNA-seq基础与项目实践",
        papers: [
            {
                title: "RNA-Seq: A revolutionary tool for transcriptomics",
                authors: "Wang, Z., Gerstein, M. & Snyder, M.",
                journal: "Nature Reviews Genetics",
                year: 2009,
                doi: "10.1038/nrg2484",
                summary: "RNA-seq技术综述，介绍了RNA-seq的原理、应用和分析方法。",
                key_findings: [
                    "RNA-seq相比芯片具有更宽的动态范围和更高的分辨率",
                    "可以检测新转录本和可变剪接",
                    "已成为转录组研究的主流技术"
                ],
                methods: ["RNA-seq原理", "建库测序", "数据分析流程"],
                relevance: "这是理解RNA-seq技术的必读论文，为后续实际分析提供理论基础。",
                learning_points: ["理解RNA-seq技术原理", "掌握分析流程概览", "了解常见应用场景"]
            },
            {
                title: "A survey of best practices for RNA-seq data analysis",
                authors: "Conesa, A. et al.",
                journal: "Genome Biology",
                year: 2016,
                doi: "10.1186/s13059-016-0881-8",
                summary: "RNA-seq数据分析最佳实践综述，详细介绍了每个步骤的工具选择和参数设置。",
                key_findings: [
                    "质量控制是分析的第一步且至关重要",
                    "不同比对工具各有优缺点",
                    "标准化和差异分析需要根据实验设计选择方法"
                ],
                methods: ["FastQC", "HISAT2/STAR", "DESeq2"],
                relevance: "这是RNA-seq分析的实践指南，直接指导第一个项目的实施。",
                learning_points: ["掌握标准分析流程", "理解每步工具选择", "学会解读质控结果"]
            }
        ]
    },
    9: {
        title: "序列比对原理与实践",
        papers: [
            {
                title: "STAR: Ultrafast universal RNA-seq aligner",
                authors: "Dobin, A. et al.",
                journal: "Bioinformatics",
                year: 2013,
                doi: "10.1093/bioinformatics/bts635",
                summary: "STAR是目前最快的RNA-seq比对工具，采用后缀数组算法实现高效比对。",
                key_findings: [
                    "比对速度比传统工具快50倍以上",
                    "支持跨剪接位点比对",
                    "高精度检测剪接位点"
                ],
                methods: ["后缀数组", "剪接位点检测", "大规模并行"],
                relevance: "STAR是RNA-seq比对的标准工具，理解其原理有助于正确设置参数和解读结果。",
                learning_points: ["理解比对算法原理", "掌握STAR参数设置", "学会评估比对质量"]
            },
            {
                title: "HISAT: A fast spliced aligner",
                authors: "Kim, D. et al.",
                journal: "Nature Methods",
                year: 2015,
                doi: "10.1038/nmeth.3317",
                summary: "HISAT使用FM索引和BWT算法实现高效的基因组比对，内存占用低。",
                key_findings: [
                    "内存占用仅是STAR的1/10",
                    "支持大规模人群测序分析",
                    "两步策略优化比对精度"
                ],
                methods: ["FM索引", "BWT算法", "剪接比对"],
                relevance: "HISAT2是另一种主流比对工具，在资源受限环境下是更好的选择。",
                learning_points: ["理解FM索引原理", "比较不同比对工具", "学会根据需求选择工具"]
            }
        ]
    },
    10: {
        title: "基因定量与表达分析",
        papers: [
            {
                title: "featureCounts: Efficient read summarization",
                authors: "Liao, Y., Smyth, G.K. & Shi, W.",
                journal: "Bioinformatics",
                year: 2014,
                doi: "10.1093/bioinformatics/btt656",
                summary: "featureCounts是高效的reads计数工具，用于将比对结果转换为基因表达矩阵。",
                key_findings: [
                    "计数速度比HTSeq快10倍以上",
                    "支持多种计数模式和重叠处理",
                    "内存占用低，适合大规模分析"
                ],
                methods: ["基因计数", "GTF解析", "重叠检测"],
                relevance: "featureCounts是RNA-seq定量最常用的工具，理解计数原理对后续差异分析至关重要。",
                learning_points: ["理解计数原理", "掌握参数设置", "学会处理多比对reads"]
            }
        ]
    },
    11: {
        title: "差异表达分析",
        papers: [
            {
                title: "Moderated statistical tests for assessing expression changes",
                authors: "Smyth, G.K.",
                journal: "Statistical Applications in Genetics and Molecular Biology",
                year: 2004,
                doi: "10.2202/1544-6115.1028",
                summary: "limma包的核心论文，引入了经验贝叶斯方法改进小样本差异分析。",
                key_findings: [
                    "经验贝叶斯方法借力所有基因的信息改进单个基因的估计",
                    "显著提高了小样本情况下的检验效能",
                    "成为芯片和RNA-seq分析的标准方法"
                ],
                methods: ["经验贝叶斯", "方差收缩", "线性模型"],
                relevance: "limma是差异分析的经典方法，其统计学思想影响了后续许多工具。",
                learning_points: ["理解经验贝叶斯思想", "掌握limma使用方法", "学会设计实验矩阵"]
            },
            {
                title: "DESeq2: Moderated estimation of fold change and dispersion",
                authors: "Love, M.I., Huber, W. & Anders, S.",
                journal: "Genome Biology",
                year: 2014,
                doi: "10.1186/s13059-014-0550-8",
                summary: "DESeq2是RNA-seq差异分析最常用的工具，采用负二项分布建模计数数据。",
                key_findings: [
                    "使用负二项分布建模基因计数",
                    "收缩log2 fold change减少假阳性",
                    "自动处理低表达基因过滤"
                ],
                methods: ["负二项分布", "离散度估计", "Fold change收缩"],
                relevance: "DESeq2是RNA-seq差异分析的金标准，必须掌握其使用和结果解读。",
                learning_points: ["理解负二项分布模型", "掌握DESeq2分析流程", "学会解读结果和可视化"]
            }
        ]
    },
    12: {
        title: "功能富集分析",
        papers: [
            {
                title: "clusterProfiler: An R package for comparing biological themes",
                authors: "Yu, G. et al.",
                journal: "OMICS",
                year: 2012,
                doi: "10.1089/omi.2011.0118",
                summary: "clusterProfiler是R中最流行的功能富集分析工具，支持GO、KEGG等多种注释。",
                key_findings: [
                    "提供了统一的富集分析框架",
                    "支持多种可视化方式展示结果",
                    "可以比较不同基因集的富集模式"
                ],
                methods: ["GO富集", "KEGG通路", "GSEA"],
                relevance: "clusterProfiler是差异分析后的标准工具，几乎所有RNA-seq项目都会用到。",
                learning_points: ["理解富集分析原理", "掌握clusterProfiler使用", "学会解读和可视化富集结果"]
            },
            {
                title: "Gene Set Enrichment Analysis: A knowledge-based approach",
                authors: "Subramanian, A. et al.",
                journal: "PNAS",
                year: 2005,
                doi: "10.1073/pnas.0506580102",
                summary: "GSEA方法的开创性论文，提出了基于预排序列表的基因集富集分析方法。",
                key_findings: [
                    "不需要预先设定差异基因阈值",
                    "可以检测微弱但协同的表达变化",
                    "提高了检测生物学意义的灵敏度"
                ],
                methods: ["基因集富集", "排序列表分析", "置换检验"],
                relevance: "GSEA是传统富集分析的重要补充，特别适合处理连续型表达数据。",
                learning_points: ["理解GSEA原理", "学会何时使用GSEA", "掌握结果解读"]
            }
        ]
    },
    13: {
        title: "ChIP-seq分析",
        papers: [
            {
                title: "Model-based Analysis of ChIP-Seq (MACS)",
                authors: "Zhang, Y. et al.",
                journal: "Genome Biology",
                year: 2008,
                doi: "10.1186/gb-2008-9-9-r137",
                summary: "MACS是ChIP-seq peak calling的标准工具，使用泊松分布建模reads分布。",
                key_findings: [
                    "使用局部背景校正识别显著富集区域",
                    "可以处理不同宽度的peak",
                    "支持配对样本分析"
                ],
                methods: ["Peak calling", "背景建模", "显著性检验"],
                relevance: "MACS2是ChIP-seq分析的必备工具，理解其原理对参数设置至关重要。",
                learning_points: ["理解peak calling原理", "掌握MACS2使用方法", "学会评估peak质量"]
            },
            {
                title: "ChIP-seq guidelines and practices of the ENCODE consortium",
                authors: "Landt, S.G. et al.",
                journal: "Genome Research",
                year: 2012,
                doi: "10.1101/gr.136184.111",
                summary: "ENCODE联盟制定的ChIP-seq实验和数据分析指南。",
                key_findings: [
                    "定义了ChIP-seq数据质量标准(FRiP, NSC, RSC)",
                    "推荐了标准化的分析流程",
                    "提供了结果验证和报告规范"
                ],
                methods: ["质量控制", "重复性分析", "IDR"],
                relevance: "这是ChIP-seq分析的行业标准，所有分析都需要符合这些规范。",
                learning_points: ["理解ChIP-seq质控指标", "掌握IDR分析", "学会按标准报告结果"]
            }
        ]
    },
    14: {
        title: "单细胞RNA-seq分析",
        papers: [
            {
                title: "Seurat: Spatial analysis of single-cell transcriptomics",
                authors: "Stuart, T. et al.",
                journal: "Cell",
                year: 2019,
                doi: "10.1016/j.cell.2021.04.048",
                summary: "Seurat是单细胞RNA-seq分析最流行的R包，提供了完整的分析流程。",
                key_findings: [
                    "整合分析可以处理批次效应和多个数据集",
                    "聚类和降维是单细胞分析的核心步骤",
                    "细胞类型注释需要参考数据库和专家知识"
                ],
                methods: ["标准化", "降维", "聚类", "整合"],
                relevance: "Seurat是单细胞分析的标准工具，掌握它是生信分析师的必备技能。",
                learning_points: ["理解单细胞数据特点", "掌握Seurat分析流程", "学会细胞类型注释"]
            },
            {
                title: "Comprehensive single-cell transcriptional profiling",
                authors: "Zheng, G.X. et al.",
                journal: "Nature Communications",
                year: 2017,
                doi: "10.1038/ncomms14049",
                summary: "10x Genomics单细胞平台技术论文，介绍了Drop-seq原理和数据特点。",
                key_findings: [
                    "UMI技术消除了PCR扩增偏差",
                    "高通量可以同时分析数千个细胞",
                    "细胞barcode实现多细胞混合测序"
                ],
                methods: ["Drop-seq", "UMI", "Barcode"],
                relevance: "理解单细胞测序技术原理，有助于正确处理和分析数据。",
                learning_points: ["理解UMI的作用", "掌握单细胞数据特点", "学会质控和过滤"]
            }
        ]
    },
    15: {
        title: "WES变异检测",
        papers: [
            {
                title: "The GATK Best Practices for Variant Calling",
                authors: "Van der Auwera, G.A. et al.",
                journal: "Current Protocols in Bioinformatics",
                year: 2013,
                doi: "10.1002/0471250953.bi1110s43",
                summary: "GATK最佳实践指南，是WES/WGS变异检测的行业标准。",
                key_findings: [
                    "BQSR显著提高变异检测准确性",
                    "联合基因分型提高罕见变异检出",
                    "VQSR提供统计学变异过滤"
                ],
                methods: ["BQSR", "HaplotypeCaller", "VQSR"],
                relevance: "GATK是变异检测的标准工具，所有临床和科研分析都遵循其最佳实践。",
                learning_points: ["理解GATK流程设计", "掌握参数设置原理", "学会评估变异质量"]
            },
            {
                title: "A framework for variation discovery and genotyping using next-generation DNA sequencing data",
                authors: "DePristo, M.A. et al.",
                journal: "Nature Genetics",
                year: 2011,
                doi: "10.1038/ng.806",
                summary: "GATK核心算法论文，介绍了HaplotypeCaller的局部组装原理。",
                key_findings: [
                    "局部组装可以检测复杂的INDEL",
                    "配对样本比较提高体细胞突变检测",
                    "质量控制是结果可信的前提"
                ],
                methods: ["局部组装", "配对分析", "质量控制"],
                relevance: "理解GATK算法原理，有助于正确解读变异检测结果。",
                learning_points: ["理解HaplotypeCaller原理", "掌握INDEL检测方法", "学会处理复杂变异"]
            }
        ]
    },
    16: {
        title: "ATAC-seq分析",
        papers: [
            {
                title: "ATAC-seq: A method for assaying chromatin accessibility",
                authors: "Buenrostro, J.D. et al.",
                journal: "Current Protocols in Molecular Biology",
                year: 2015,
                doi: "10.1002/0471142727.mb2129s109",
                summary: "ATAC-seq方法的开创性论文，介绍了Tn5转座酶检测开放染色质的原理。",
                key_findings: [
                    "Tn5转座酶偏好切割开放染色质",
                    "可以在单细胞水平检测染色质可及性",
                    "与ChIP-seq互补揭示调控机制"
                ],
                methods: ["Tn5转座", "开放染色质", "Peak calling"],
                relevance: "ATAC-seq是表观遗传研究的重要技术，理解原理对分析至关重要。",
                learning_points: ["理解ATAC-seq原理", "掌握数据分析流程", "学会与ChIP-seq整合"]
            }
        ]
    },
    17: {
        title: "基因组学项目实践",
        papers: [
            {
                title: "The Cancer Genome Atlas Pan-Cancer analysis project",
                authors: "Weinstein, J.N. et al.",
                journal: "Nature Genetics",
                year: 2013,
                doi: "10.1038/ng.2764",
                summary: "TCGA泛癌分析项目，展示了多组学整合分析的典范。",
                key_findings: [
                    "整合基因组、转录组、表观组揭示癌症机制",
                    "大数据量需要标准化分析流程",
                    "公共数据资源推动精准医学发展"
                ],
                methods: ["多组学整合", "癌症分型", "生物标志物"],
                relevance: "TCGA是最大的癌症多组学数据库，学习利用公共数据是生信工作的重要能力。",
                learning_points: ["理解多组学研究设计", "学会使用TCGA数据", "掌握公共数据下载和处理"]
            }
        ]
    },
    18: {
        title: "生信项目实践与总结",
        papers: [
            {
                title: "Reproducible bioinformatics research: A case study",
                authors: "Sandve, G.K. et al.",
                journal: "PLoS Computational Biology",
                year: 2013,
                doi: "10.1371/journal.pcbi.1003328",
                summary: "讨论了生信研究中可重复性的重要性，提出了五条准则。",
                key_findings: [
                    "版本控制所有代码和数据",
                    "记录所有步骤和参数",
                    "使用容器技术确保环境一致性"
                ],
                methods: ["版本控制", "文档化", "容器化"],
                relevance: "可重复性是生信研究的核心原则，所有项目都需要遵循。",
                learning_points: ["理解可重复性重要性", "学会项目文档化", "掌握最佳实践"]
            }
        ]
    },
    19: {
        title: "多组学整合分析",
        papers: [
            {
                title: "MOFA: A statistical framework for comprehensive integration of multi-omics data",
                authors: "Argelaguet, R. et al.",
                journal: "Nature Methods",
                year: 2020,
                doi: "10.1038/s41592-020-0913-3",
                summary: "MOFA是多组学整合分析的主流工具，使用因子分析识别跨组学模式。",
                key_findings: [
                    "可以整合多种组学数据类型",
                    "识别驱动生物学变异的关键因子",
                    "支持时间序列和空间转录组数据"
                ],
                methods: ["因子分析", "多组学整合", "降维"],
                relevance: "MOFA是多组学整合的标准方法，是高级分析师必须掌握的工具。",
                learning_points: ["理解多组学整合原理", "掌握MOFA分析流程", "学会解读潜在因子"]
            },
            {
                title: "mixOmics: An R package for omics data integration",
                authors: "Rohart, F. et al.",
                journal: "Bioinformatics",
                year: 2017,
                doi: "10.1093/bioinformatics/btx684",
                summary: "mixOmics提供了多种多组学整合方法，特别适合生物标志物发现。",
                key_findings: [
                    "PLS方法适合小样本高维度数据",
                    "稀疏方法可以进行特征选择",
                    "可视化工具帮助解读整合结果"
                ],
                methods: ["PLS", "sPLS", "DIABLO"],
                relevance: "mixOmics是另一个重要的多组学整合工具，与MOFA互补使用。",
                learning_points: ["理解PLS原理", "掌握特征选择方法", "学会多组学可视化"]
            }
        ]
    },
    20: {
        title: "作品集与技术写作",
        papers: [
            {
                title: "Ten simple rules for making a bioinformatics portfolio",
                authors: "Pavelin, K. et al.",
                journal: "PLoS Computational Biology",
                year: 2012,
                doi: "10.1371/journal.pcbi.1002371",
                summary: "介绍了如何构建专业的生物信息学作品集，提高求职竞争力。",
                key_findings: [
                    "作品集是展示技术能力的最佳方式",
                    "项目README要清晰完整",
                    "技术博客展示学习能力和沟通能力"
                ],
                methods: ["项目展示", "技术写作", "GitHub使用"],
                relevance: "直接指导本周的作品集完善工作。",
                learning_points: ["理解作品集重要性", "学会写好README", "掌握技术博客写作"]
            }
        ]
    },
    21: {
        title: "简历与求职",
        papers: [
            {
                title: "Bioinformatics careers: A perspective from industry and academia",
                authors: "Luscombe, N.M. et al.",
                journal: "PLoS Computational Biology",
                year: 2011,
                doi: "10.1371/journal.pcbi.1002249",
                summary: "讨论了生物信息学职业发展的多种路径和所需技能。",
                key_findings: [
                    "生信人才需求持续增长",
                    "核心技能包括编程、统计、领域知识",
                    "项目经验比学历更重要"
                ],
                methods: ["职业规划", "技能发展", "面试准备"],
                relevance: "帮助理解生信岗位要求，指导简历撰写和面试准备。",
                learning_points: ["了解行业需求", "评估自身技能", "规划职业发展"]
            }
        ]
    },
    22: {
        title: "面试准备",
        papers: [
            {
                title: "Ten simple rules for graduate students to collaborate with industry",
                authors: "Huang, D.W. et al.",
                journal: "PLoS Computational Biology",
                year: 2021,
                doi: "10.1371/journal.pcbi.1008454",
                summary: "讨论了学术界与工业界合作的经验，对面试也有参考价值。",
                key_findings: [
                    "工业界更关注实际问题和可交付成果",
                    "沟通能力和团队合作很重要",
                    "了解公司业务是面试加分项"
                ],
                methods: ["面试准备", "技术展示", "职业沟通"],
                relevance: "帮助理解工业界期望，指导面试准备。",
                learning_points: ["理解工业界需求", "学会展示项目经验", "准备技术面试"]
            }
        ]
    }
};

// ============================================================================
// 论文案例引用格式
// ============================================================================
// 定义论文分类及其显示颜色

const PAPER_CATEGORIES = {
    methods: { name: "方法学", color: "#3498db" },
    review: { name: "综述", color: "#2ecc71" },
    application: { name: "应用研究", color: "#e67e22" },
    database: { name: "数据库/工具", color: "#9b59b6" }
};

// ============================================================================
// 面试题库
// ============================================================================
// 生物信息学面试准备题库，包含7个分类：
//   - RNA-seq      : RNA测序分析相关问题
//   - WES/变异检测 : 全外显子测序和变异检测
//   - ChIP-seq     : 染色质免疫测序
//   - 单细胞测序   : 单细胞RNA-seq分析
//   - 编程与工具   : 编程语言和工具使用
//   - 场景题       : 实际问题处理场景
//   - 编程题       : 编程挑战题目
//   - 统计概念     : 统计学基础知识

const INTERVIEW_DATA = {
    categories: [
        {
            name: "RNA-seq",
            icon: "fas fa-dna",
            questions: [
                {
                    question: "解释RNA-seq分析流程",
                    answer: "RNA-seq标准分析流程包括：\n1. 质量控制（FastQC）\n2. 去接头和质量过滤（Trimmomatic/cutadapt）\n3. 序列比对（HISAT2/STAR）\n4. 定量（featureCounts/HTSeq）\n5. 差异分析（DESeq2/edgeR）\n6. 功能富集分析"
                },
                {
                    question: "FPKM和TPM的区别是什么？",
                    answer: "FPKM (Fragments Per Kilobase Million):\n- 先除以基因长度，再除以测序深度\n- 同一样本内可比，但样本间不可直接比较\n\nTPM (Transcripts Per Million):\n- 先除以测序深度，再除以基因长度，最后标准化到百万\n- 样本内和样本间都可比较\n- TPM更适合跨样本比较"
                },
                {
                    question: "什么是FDR？为什么要进行多重检验校正？",
                    answer: "FDR (False Discovery Rate) 是假发现率，指在所有显著结果中假阳性的预期比例。\n\n多重检验校正原因：\n- 差异分析通常检测上万个基因\n- 如果p=0.05，即使没有真实差异基因，也会约500个假阳性\n- FDR控制整体假阳性率在可接受范围内\n\n常用方法：Benjamini-Hochberg (BH) 校正"
                },
                {
                    question: "如何评估RNA-seq数据质量？",
                    answer: "1. FastQC报告：\n   - Per base quality score (>Q30)\n   - GC含量分布\n   - 序列重复水平\n   - 接头含量\n\n2. 比对质量：\n   - 比对率 (>70%)\n   - 唯一比对率\n   - rRNA比例\n\n3. 样本质控：\n   - 基因检出数\n   - 样本相关性\n   - PCA聚类分析"
                },
                {
                    question: "DESeq2和edgeR的区别是什么？",
                    answer: "DESeq2:\n- 使用负二项分布建模\n- 中位数比率法标准化\n- 更适合中等样本量\n- 默认使用Wald检验\n\nedgeR:\n- 也是负二项分布\n- TMM标准化\n- 更适合小样本量\n- 使用似然比检验或准似然F检验\n\n选择建议：样本量>5用DESeq2，样本量<5用edgeR"
                }
            ]
        },
        {
            name: "WES/变异检测",
            icon: "fas fa-microscope",
            questions: [
                {
                    question: "简述GATK Best Practices流程",
                    answer: "GATK Best Practices for Germline Variant Calling:\n\n1. 数据预处理：\n   - 比对（BWA-MEM）\n   - 标记重复（MarkDuplicates）\n   - BQSR（碱基质量分数重校正）\n\n2. 变异检测：\n   - HaplotypeCaller（单样本GVCF模式）\n   - GenotypeGVCFs（联合基因分型）\n\n3. 变异过滤：\n   - VQSR或硬过滤\n\n4. 注释：\n   - SnpEff/ANNOVAR/VEP"
                },
                {
                    question: "SNP和INDEL的区别是什么？",
                    answer: "SNP (Single Nucleotide Polymorphism):\n- 单核苷酸多态性\n- 单个碱基的替换\n- 分为转换(A↔G, C↔T)和颠换\n\nINDEL (Insertion/Deletion):\n- 插入或缺失变异\n- 涉及一个或多个碱基\n- 检测难度更高\n\n区别：\n- SNP检测准确率更高\n- INDEL在编码区可能导致移码突变\n- GATK对两者使用不同模型检测"
                },
                {
                    question: "什么是BQSR？为什么需要BQSR？",
                    answer: "BQSR (Base Quality Score Recalibration):\n碱基质量分数重校正\n\n为什么需要：\n- 测序仪报告的质量分数存在系统偏差\n- 某些位置的碱基质量被高估或低估\n- 影响变异检测准确性\n\nBQSR步骤：\n1. BaseRecalibrator: 构建校正模型\n2. ApplyBQSR: 应用校正\n\n原理：利用已知变异位点建立模型，校正其他位点的质量分数"
                },
                {
                    question: "VCF文件包含哪些主要信息？",
                    answer: "VCF (Variant Call Format) 主要字段：\n\n必须字段：\n- CHROM: 染色体\n- POS: 位置\n- ID: 变异ID（rs号）\n- REF: 参考等位基因\n- ALT: 替代等位基因\n- QUAL: 质量分数\n- FILTER: 过滤状态\n- INFO: 详细信息\n- FORMAT: 样本格式\n\nINFO常用标签：\n- DP: 测序深度\n- AF: 等位基因频率\n- AN: 等位基因总数\n- AC: 等位基因计数"
                }
            ]
        },
        {
            name: "ChIP-seq",
            icon: "fas fa-chart-area",
            questions: [
                {
                    question: "Peak calling的原理是什么？",
                    answer: "Peak calling原理：\n\n1. MACS2算法核心：\n   - 建模reads分布（泊松/负二项分布）\n   - 比较ChIP样本与背景（Input/Control）\n   - 识别显著富集区域\n\n2. 关键步骤：\n   - 读段偏移校正（shift size）\n   - 局部背景估计\n   - 统计显著性检验\n   - FDR校正\n\n3. 输出：\n   - narrowPeak: 窄峰（转录因子）\n   - broadPeak: 宽峰（组蛋白修饰）"
                },
                {
                    question: "ChIP-seq和ATAC-seq的区别是什么？",
                    answer: "ChIP-seq:\n- 检测蛋白质-DNA结合位点\n- 需要特异性抗体\n- 用于转录因子和组蛋白修饰\n- Peak代表结合位置\n\nATAC-seq:\n- 检测开放染色质区域\n- 使用Tn5转座酶\n- 不需要抗体\n- Peak代表开放区域\n\n联系：\n- 都是测序技术\n- ATAC-seq可以发现潜在调控区域\n- ChIP-seq可以验证特定因子结合"
                },
                {
                    question: "如何评估ChIP-seq数据质量？",
                    answer: "1. 测序质量：\n   - FastQC常规指标\n   - 去重后reads数\n\n2. Peak质量：\n   - Peak总数（合理范围）\n   - FRiP (Fraction of reads in peaks) > 1%\n   - Peak形状（转录因子应为窄峰）\n\n3. 信噪比：\n   - NSC (Normalized Strand Cross-correlation)\n   - RSC (Relative Strand Cross-correlation)\n   - ENCODE标准：NSC > 1.05, RSC > 0.8\n\n4. 可重复性：\n   - IDR分析"
                }
            ]
        },
        {
            name: "单细胞测序",
            icon: "fas fa-circle-nodes",
            questions: [
                {
                    question: "Seurat分析流程是什么？",
                    answer: "Seurat标准流程：\n\n1. 数据导入和质控：\n   - CreateSeuratObject\n   - 过滤低质量细胞\n\n2. 标准化：\n   - NormalizeData\n   - FindVariableFeatures\n   - ScaleData\n\n3. 降维：\n   - RunPCA\n   - RunUMAP/RunTSNE\n\n4. 聚类：\n   - FindNeighbors\n   - FindClusters\n\n5. 注释：\n   - FindAllMarkers\n   - 细胞类型注释"
                },
                {
                    question: "如何选择PC数量？",
                    answer: "选择PC数量的方法：\n\n1. ElbowPlot:\n   - 观察标准差下降曲线\n   - 选择拐点位置\n\n2. JackStraw:\n   - 统计检验PC显著性\n   - 保留显著PC\n\n3. 经验法则：\n   - 通常选择前20-50个PC\n   - 可通过下游聚类质量验证\n\n注意事项：\n- PC太少会丢失信息\n- PC太多可能引入噪音\n- 建议多尝试不同数量"
                },
                {
                    question: "如何处理批次效应？",
                    answer: "批次效应处理方法：\n\n1. 整合方法：\n   - Seurat Integration (CCA/RPCA)\n   - Harmony\n   - Scanorama\n   - LIGER\n\n2. Seurat整合流程：\n   - FindIntegrationAnchors\n   - IntegrateData\n\n3. Harmony使用：\n   - RunHarmony(group.by.vars = \"batch\")\n\n选择建议：\n- 批次差异小：Harmony（快速）\n- 批次差异大：Seurat Integration\n- 大规模数据：FastMNN"
                }
            ]
        },
        {
            name: "编程与工具",
            icon: "fas fa-code",
            questions: [
                {
                    question: "Linux常用命令有哪些？",
                    answer: "文件操作：\n- ls, cd, pwd: 目录导航\n- mkdir, rm, cp, mv: 文件管理\n- cat, head, tail, less: 查看文件\n\n文本处理：\n- grep: 模式搜索\n- awk: 列处理\n- sed: 流编辑\n- sort, uniq: 排序去重\n\n进程管理：\n- top, htop: 系统监控\n- ps, kill: 进程管理\n- nohup, &: 后台运行\n\n生信常用：\n- wc -l: 统计行数\n- zcat: 查看压缩文件"
                },
                {
                    question: "Python和R的优缺点是什么？",
                    answer: "Python优点：\n- 通用编程语言，生态丰富\n- 适合大规模数据处理\n- 深度学习支持好\n\nPython缺点：\n- 生信专用包较少\n- 可视化不如R\n\nR优点：\n- 统计分析原生支持\n- Bioconductor生态丰富\n- ggplot2可视化强大\n\nR缺点：\n- 大数据处理性能差\n- 学习曲线陡峭\n\n建议：\n- 生信分析主要用R\n- 流程开发用Python/Shell"
                },
                {
                    question: "如何优化代码性能？",
                    answer: "R语言优化：\n1. 使用向量化操作代替循环\n2. data.table代替data.frame\n3. 并行计算（parallel, foreach）\n4. 内存管理（rm(), gc()）\n\nPython优化：\n1. 使用NumPy向量化\n2. Pandas优化（避免迭代）\n3. 多进程（multiprocessing）\n4. 使用Cython/Numba加速\n\n通用原则：\n- 先分析瓶颈（profiling）\n- 避免重复计算\n- 使用合适的数据结构"
                }
            ]
        },
        {
            name: "场景题",
            icon: "fas fa-lightbulb",
            questions: [
                {
                    question: "遇到过什么技术难题？如何解决的？",
                    answer: "回答框架（STAR法则）：\n\n1. 描述问题：\n   - Situation: 项目背景\n   - Task: 需要完成的任务\n   - Action: 采取的行动\n   - Result: 最终结果\n\n2. 示例回答：\n   \"在做RNA-seq分析时，发现样本PCA聚类异常，\n   通过检查发现是批次效应导致的。\n   我使用ComBat进行了批次校正，\n   最终聚类结果符合预期。\"\n\n3. 展示的技能：\n   - 问题诊断能力\n   - 解决方案的思考过程\n   - 技术实现能力"
                },
                {
                    question: "项目中遇到bug如何解决？",
                    answer: "Debug方法论：\n\n1. 复现问题：\n   - 确认bug可稳定复现\n   - 记录错误信息和环境\n\n2. 定位问题：\n   - 查看错误日志\n   - 逐步缩小范围\n   - 检查输入数据和参数\n\n3. 解决问题：\n   - 查阅文档和社区\n   - 最小化复现\n   - 验证修复\n\n4. 预防措施：\n   - 添加单元测试\n   - 改进错误处理\n\n常用工具：\n- R: traceback(), browser(), debug()\n- Python: pdb, print调试"
                },
                {
                    question: "测序质量分数低怎么办？",
                    answer: "排查步骤：\n\n1. 检查是否是特定循环问题（reads末端）\n2. 检查是否是特定样本问题\n3. 应用适当的修剪策略\n4. 考虑移除问题样本\n5. 记录问题并报告\n\n具体操作：\n- FastQC查看具体问题\n- Trimmomatic/fastp修剪低质量碱基\n- 重新评估质量"
                },
                {
                    question: "发现RNA-seq数据有批次效应怎么处理？",
                    answer: "批次效应处理流程：\n\n1. 识别批次变量\n   - 实验日期\n   - 测序批次\n   - 文库制备批次\n\n2. 统计建模方法：\n   - DESeq2: design = ~ batch + condition\n   - limma: removeBatchEffect()\n\n3. 校正方法：\n   - ComBat (sva包)\n   - ComBat-seq (计数数据)\n\n4. 验证：\n   - PCA检查校正效果\n   - 用替代方法验证结果"
                },
                {
                    question: "比对率只有60%，可能的原因？",
                    answer: "可能原因排查：\n\n1. 污染问题：\n   - 样本被其他物种污染\n   - 使用Kraken检测污染\n\n2. 参考基因组问题：\n   - 使用了错误的参考基因组\n   - 版本不匹配\n\n3. 样本质量问题：\n   - 样本降解\n   - 低质量reads过多\n\n4. 接头问题：\n   - 接头未去除\n   - 使用FastQC检查\n\n5. 文库类型错误：\n   - RNA-seq数据用了DNA比对工具"
                }
            ]
        },
        {
            name: "编程题",
            icon: "fas fa-code",
            questions: [
                {
                    question: "写一个计算反向互补序列的函数",
                    answer: "Python实现：\n\ndef reverse_complement(seq):\n    complement = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G',\n                  'a': 't', 't': 'a', 'g': 'c', 'c': 'g',\n                  'N': 'N', 'n': 'n'}\n    return ''.join(complement.get(base, 'N') for base in reversed(seq))\n\n# 测试\n>>> reverse_complement('ATCG')\n'CGAT'"
                },
                {
                    question: "计算contig的N50值",
                    answer: "Python实现：\n\ndef calculate_n50(lengths):\n    sorted_lengths = sorted(lengths, reverse=True)\n    total = sum(sorted_lengths)\n    cumsum = 0\n    for length in sorted_lengths:\n        cumsum += length\n        if cumsum >= total / 2:\n            return length\n    return 0\n\n# N50定义：将contigs按长度降序排列，累加长度达到总长50%时的contig长度"
                },
                {
                    question: "解析GTF文件提取基因坐标",
                    answer: "Python实现：\n\ndef parse_gtf(gtf_file):\n    genes = {}\n    with open(gtf_file) as f:\n        for line in f:\n            if line.startswith('#'):\n                continue\n            fields = line.strip().split('\\t')\n            chrom, source, feature, start, end = fields[:5]\n            attributes = fields[8]\n            \n            if feature == 'gene':\n                gene_id = attributes.split('gene_id \"')[1].split('\"')[0]\n                genes[gene_id] = {\n                    'chrom': chrom,\n                    'start': int(start),\n                    'end': int(end)\n                }\n    return genes"
                },
                {
                    question: "统计FASTQ文件的reads数量",
                    answer: "Shell方法：\n\n# 方法1：wc统计行数除以4\nwc -l file.fastq\n# reads数 = 行数 / 4\n\n# 方法2：直接计算\necho $(( $(wc -l < file.fastq) / 4 ))\n\n# 方法3：awk\nawk 'END{print NR/4}' file.fastq\n\n# 压缩文件\nzcat file.fastq.gz | wc -l\n# 或\nzcat file.fastq.gz | awk 'END{print NR/4}'"
                },
                {
                    question: "提取FASTQ中的唯一序列",
                    answer: "Shell实现：\n\n# 提取序列（每4行的第2行）\nawk 'NR%4==2' file.fastq | sort | uniq > unique_seqs.txt\n\n# 统计唯一序列数量\nawk 'NR%4==2' file.fastq | sort | uniq | wc -l\n\n# 统计每个序列出现次数\nawk 'NR%4==2' file.fastq | sort | uniq -c | sort -rn > seq_counts.txt"
                },
                {
                    question: "解析VCF文件提取高质量变异",
                    answer: "Python实现：\n\ndef parse_vcf(vcf_file, min_qual=30):\n    \"\"\"提取QUAL >= min_qual的变异\"\"\"\n    variants = []\n    with open(vcf_file) as f:\n        for line in f:\n            if line.startswith('#'):\n                continue\n            fields = line.strip().split('\\t')\n            chrom, pos, id_, ref, alt, qual = fields[:6]\n            if qual != '.' and float(qual) >= min_qual:\n                variants.append({\n                    'chrom': chrom,\n                    'pos': int(pos),\n                    'id': id_,\n                    'ref': ref,\n                    'alt': alt,\n                    'qual': float(qual)\n                })\n    return variants"
                },
                {
                    question: "计算FASTA文件的GC含量",
                    answer: "Python实现：\n\nfrom Bio import SeqIO\n\ndef gc_content(seq):\n    return (seq.count('G') + seq.count('C')) / len(seq) * 100\n\nfor record in SeqIO.parse('sequences.fasta', 'fasta'):\n    gc = gc_content(str(record.seq))\n    print(f'{record.id}: {gc:.2f}%')\n\n# 单行版本\nseq = 'ATGCGCGATCG'\ngc = (seq.count('G') + seq.count('C')) / len(seq) * 100"
                }
            ]
        },
        {
            name: "统计概念",
            icon: "fas fa-chart-line",
            questions: [
                {
                    question: "什么是多重检验校正？为什么需要？",
                    answer: "问题背景：\n当同时检验大量假设时（如检测2万个基因的差异表达），假阳性率会急剧上升。\n\n示例：\n- 设p=0.05为阈值\n- 检验2万个基因\n- 即使没有真实差异基因，也会有约1000个假阳性\n\n常用校正方法：\n1. Bonferroni：p_adj = p × n（最保守）\n2. Benjamini-Hochberg (FDR)：控制假发现率\n3. Storey's q-value\n\n生信中常用FDR < 0.05作为阈值"
                },
                {
                    question: "参数检验和非参数检验的区别？",
                    answer: "参数检验：\n- 假设数据符合特定分布（通常是正态分布）\n- t检验、ANOVA\n- 检验力更高（假设满足时）\n\n非参数检验：\n- 不假设数据分布\n- Mann-Whitney U、Kruskal-Wallis\n- 对异常值更稳健\n\n选择依据：\n1. 样本量小且分布未知 → 非参数\n2. 样本量大且近似正态 → 参数检验\n3. 数据有明显异常值 → 非参数\n\n注意：大样本时，t检验对正态性假设较稳健"
                },
                {
                    question: "解释p值和置信区间的关系",
                    answer: "P值：\n- 在零假设为真时，观察到当前结果或更极端结果的概率\n- p < 0.05 表示结果具有统计显著性\n\n置信区间：\n- 参数真值的可能范围\n- 95% CI: 重复抽样95%的区间会包含真值\n\n关系：\n- 如果95% CI不包含零（或等效值），则p < 0.05\n- CI提供了效应大小和精度的信息\n\n示例：\n如果log2FC的95% CI为[0.5, 1.5]，不包含0，则p < 0.05"
                },
                {
                    question: "什么是效应量？为什么要报告效应量？",
                    answer: "效应量定义：\n衡量处理效果大小的标准化指标，不受样本量影响。\n\n常用效应量：\n1. Cohen's d：两组均值差/标准差\n   - d=0.2 小效应\n   - d=0.5 中效应\n   - d=0.8 大效应\n\n2. log2FC：表达量倍数变化\n   - |log2FC| > 1 两倍变化\n\n为什么重要：\n- p值只说明是否有差异，不说明差异大小\n- 大样本下极小差异也可显著\n- 效应量反映生物学意义"
                }
            ]
        }
    ]
};

// ========== 概念速查数据 ==========
const REFERENCE_DATA = {
    concepts: [
        {
            name: "FPKM",
            full_name: "Fragments Per Kilobase Million",
            definition: "每百万reads中，每千碱基长度的片段数",
            formula: "FPKM = (fragments mapped to gene) / (gene length in kb × total fragments in millions)",
            usage: "样本内比较基因表达量",
            note: "不适合跨样本比较，因为不同样本的总fragments数不同"
        },
        {
            name: "TPM",
            full_name: "Transcripts Per Million",
            definition: "每百万reads中，每个转录本的reads数",
            formula: "TPM = (reads per kilobase) / (sum of all reads per kilobase) × 1,000,000",
            usage: "样本内和样本间都可以比较，推荐使用",
            note: "TPM总和恒为100万，更适合跨样本比较"
        },
        {
            name: "FDR",
            full_name: "False Discovery Rate",
            definition: "假发现率，在所有显著结果中假阳性的预期比例",
            usage: "多重检验校正，通常 padj < 0.05",
            note: "检测2万个基因时，p<0.05会有约1000个假阳性，必须校正"
        },
        {
            name: "log2FC",
            full_name: "Log2 Fold Change",
            definition: "两个条件间表达量变化的对数值",
            formula: "log2FC = log2(expression_B / expression_A)",
            usage: "|log2FC| > 1 表示两倍变化",
            note: "log2FC=1表示上调2倍，log2FC=-1表示下调2倍"
        },
        {
            name: "Phred Score",
            full_name: "Phred Quality Score",
            definition: "碱基测序质量的度量",
            formula: "Q = -10 × log10(P_error)",
            usage: "Q30 表示错误率 0.001，即 99.9% 准确率",
            table: [
                { score: "Q10", accuracy: "90%", error: "1/10" },
                { score: "Q20", accuracy: "99%", error: "1/100" },
                { score: "Q30", accuracy: "99.9%", error: "1/1000" },
                { score: "Q40", accuracy: "99.99%", error: "1/10000" }
            ]
        },
        {
            name: "FASTQ",
            full_name: "FASTQ Format",
            definition: "存储测序序列和质量分数的文本格式",
            usage: "测序数据的原始格式",
            structure: "@SEQ_ID                    # 序列标识\nGATTTGGGGTTCAAAGCAGT...   # 序列\n+                         # 分隔符\n!''*((((***+))%%%++)...   # 质量分数(ASCII编码)"
        },
        {
            name: "VCF",
            full_name: "Variant Call Format",
            definition: "变异信息的标准文件格式",
            usage: "存储SNP、INDEL等变异信息",
            fields: "CHROM(染色体), POS(位置), ID(rs号), REF(参考), ALT(变异), QUAL(质量), FILTER(过滤), INFO(详情)"
        },
        {
            name: "BAM",
            full_name: "Binary Alignment Map",
            definition: "序列比对结果的二进制格式",
            usage: "存储reads与参考基因组的比对结果",
            note: "需要索引文件(.bai)，可用samtools查看和操作"
        },
        {
            name: "GTF",
            full_name: "Gene Transfer Format",
            definition: "基因注释文件格式",
            usage: "存储基因结构信息（外显子、内含子、UTR等）",
            note: "featureCounts、HTSeq等定量工具需要GTF注释"
        },
        {
            name: "PCA",
            full_name: "Principal Component Analysis",
            definition: "主成分分析，一种线性降维方法",
            usage: "样本聚类、批次效应检测、质量控制",
            note: "RNA-seq常用PC1和PC2展示样本关系"
        },
        {
            name: "UMAP",
            full_name: "Uniform Manifold Approximation and Projection",
            definition: "一种非线性降维方法",
            usage: "单细胞数据可视化",
            note: "比t-SNE更快，更适合大规模数据"
        },
        {
            name: "GC Content",
            full_name: "GC Content",
            definition: "序列中G和C碱基所占比例",
            formula: "GC% = (G + C) / (A + T + G + C) × 100",
            usage: "质控指标、物种特征分析",
            code: "def gc_content(seq):\n    return (seq.count('G') + seq.count('C')) / len(seq) * 100"
        }
    ],
    tools: [
        {
            name: "FastQC",
            category: "质量控制",
            purpose: "测序数据质量评估",
            input: "FASTQ文件",
            output: "HTML质量报告",
            install: "conda install -c bioconda fastqc",
            usage: "fastqc sample.fastq.gz -o qc_results/"
        },
        {
            name: "MultiQC",
            category: "质量控制",
            purpose: "汇总多个QC报告",
            input: "多个FastQC结果",
            output: "汇总HTML报告",
            install: "conda install -c bioconda multiqc",
            usage: "multiqc ./qc_results/ -o multiqc_report/"
        },
        {
            name: "Trimmomatic",
            category: "数据预处理",
            purpose: "去接头和质量过滤",
            input: "FASTQ文件",
            output: "修剪后的FASTQ",
            install: "conda install -c bioconda trimmomatic"
        },
        {
            name: "fastp",
            category: "数据预处理",
            purpose: "一站式质控和过滤",
            input: "FASTQ文件",
            output: "过滤后的FASTQ + HTML报告",
            install: "conda install -c bioconda fastp",
            note: "比Trimmomatic更快，自带QC报告"
        },
        {
            name: "HISAT2",
            category: "序列比对",
            purpose: "RNA-seq序列比对",
            input: "FASTQ + 基因组索引",
            output: "SAM文件",
            install: "conda install -c bioconda hisat2",
            usage: "hisat2 -x genome_index -1 R1.fq -2 R2.fq -S aligned.sam"
        },
        {
            name: "STAR",
            category: "序列比对",
            purpose: "RNA-seq序列比对（高速）",
            input: "FASTQ + 基因组索引",
            output: "SAM/BAM文件",
            install: "conda install -c bioconda star",
            note: "比对速度最快，适合大规模数据"
        },
        {
            name: "BWA",
            category: "序列比对",
            purpose: "基因组序列比对",
            input: "FASTQ + 基因组索引",
            output: "SAM文件",
            install: "conda install -c bioconda bwa",
            usage: "bwa mem genome.fa reads.fq > aligned.sam"
        },
        {
            name: "SAMtools",
            category: "文件处理",
            purpose: "SAM/BAM文件操作",
            input: "SAM/BAM文件",
            output: "排序/索引后的BAM",
            install: "conda install -c bioconda samtools",
            usage: "samtools sort -o sorted.bam input.bam"
        },
        {
            name: "featureCounts",
            category: "表达定量",
            purpose: "基因表达定量",
            input: "BAM + GTF注释",
            output: "基因计数矩阵",
            install: "conda install -c bioconda subread",
            usage: "featureCounts -a genes.gtf -o counts.txt *.bam"
        },
        {
            name: "HTSeq",
            category: "表达定量",
            purpose: "基因表达定量",
            input: "BAM + GTF注释",
            output: "基因计数",
            install: "pip install htseq"
        },
        {
            name: "DESeq2",
            category: "差异分析",
            purpose: "RNA-seq差异表达分析",
            input: "count矩阵 + metadata",
            output: "差异基因列表",
            install: "BiocManager::install('DESeq2')",
            code: "library(DESeq2)\ndds <- DESeqDataSetFromMatrix(counts, coldata, ~condition)\ndds <- DESeq(dds)\nres <- results(dds)"
        },
        {
            name: "edgeR",
            category: "差异分析",
            purpose: "RNA-seq差异分析（小样本）",
            input: "count矩阵",
            output: "差异基因列表",
            install: "BiocManager::install('edgeR')",
            note: "更适合小样本量（n<5）"
        },
        {
            name: "GATK",
            category: "变异检测",
            purpose: "变异检测和分析",
            input: "BAM文件",
            output: "VCF文件",
            install: "conda install -c bioconda gatk4",
            note: "行业标准变异检测工具"
        },
        {
            name: "BCFtools",
            category: "变异检测",
            purpose: "VCF/BCF文件操作和变异检测",
            input: "BAM/VCF文件",
            output: "VCF文件",
            install: "conda install -c bioconda bcftools",
            usage: "bcftools mpileup -f ref.fa input.bam | bcftools call -mv -o variants.vcf"
        },
        {
            name: "SnpEff",
            category: "变异注释",
            purpose: "变异功能注释",
            input: "VCF文件",
            output: "注释后的VCF",
            install: "conda install -c bioconda snpeff",
            usage: "snpEff -v GRCh38.99 input.vcf > annotated.vcf"
        },
        {
            name: "VEP",
            category: "变异注释",
            purpose: "Ensembl变异注释工具",
            input: "VCF文件",
            output: "注释结果",
            install: "conda install -c bioconda ensembl-vep"
        },
        {
            name: "MACS2",
            category: "ChIP-seq",
            purpose: "ChIP-seq Peak calling",
            input: "ChIP BAM + Input BAM",
            output: "Peak文件",
            install: "conda install -c bioconda macs2",
            usage: "macs2 callpeak -t chip.bam -c input.bam -f BAM -g hs -n output"
        },
        {
            name: "Seurat",
            category: "单细胞分析",
            purpose: "单细胞RNA-seq分析",
            input: "count矩阵",
            output: "聚类结果、可视化",
            install: "install.packages('Seurat')",
            note: "单细胞分析标准工具"
        },
        {
            name: "Salmon",
            category: "定量工具",
            purpose: "无比对定量",
            input: "FASTQ + 转录本索引",
            output: "表达定量",
            install: "conda install -c bioconda salmon",
            note: "速度快，内存占用低"
        },
        {
            name: "Kallisto",
            category: "定量工具",
            purpose: "无比对定量",
            input: "FASTQ + 转录本索引",
            output: "表达定量",
            install: "conda install -c bioconda kallisto"
        }
    ],
    databases: [
        {
            name: "GEO",
            category: "表达数据库",
            url: "https://www.ncbi.nlm.nih.gov/geo/",
            usage: "基因表达数据库",
            description: "NCBI公共功能基因组数据存储库",
            data_types: "芯片数据、RNA-seq、ChIP-seq、甲基化",
            code: "library(GEOquery)\ngse <- getGEO('GSE12345', GSEMatrix=TRUE)"
        },
        {
            name: "TCGA",
            category: "癌症数据",
            url: "https://portal.gdc.cancer.gov/",
            usage: "癌症基因组数据",
            description: "NCI癌症基因组图谱，33种癌症的多组学数据",
            data_types: "RNA-seq、甲基化、CNV、突变、临床数据",
            code: "library(TCGAbiolinks)\nquery <- GDCquery(project='TCGA-BRCA', data.category='Transcriptome Profiling')"
        },
        {
            name: "Ensembl",
            category: "基因组注释",
            url: "https://www.ensembl.org/",
            usage: "参考基因组和注释",
            description: "基因组注释数据库和浏览器",
            data_types: "基因组序列、基因注释、变异信息、调控元件",
            code: "library(biomaRt)\nmart <- useMart('ensembl', dataset='hsapiens_gene_ensembl')"
        },
        {
            name: "UCSC Genome Browser",
            category: "基因组浏览器",
            url: "https://genome.ucsc.edu/",
            usage: "基因组可视化和数据下载",
            description: "交互式基因组可视化工具",
            data_types: "多物种基因组、注释轨道、Table Browser批量下载"
        },
        {
            name: "gnomAD",
            category: "人群频率",
            url: "https://gnomad.broadinstitute.org/",
            usage: "人群频率数据库",
            description: "大规模人群基因组变异数据库",
            data_types: "SNP、INDEL、CNV的人群频率",
            note: "包含14万+外显子组和15万+基因组"
        },
        {
            name: "ClinVar",
            category: "临床变异",
            url: "https://www.ncbi.nlm.nih.gov/clinvar/",
            usage: "临床相关变异数据库",
            description: "变异与表型关联数据库",
            data_types: "致病性变异、临床意义注释"
        },
        {
            name: "dbSNP",
            category: "变异数据库",
            url: "https://www.ncbi.nlm.nih.gov/snp/",
            usage: "SNP数据库",
            description: "NCBI单核苷酸多态性数据库",
            data_types: "SNP、小片段INDEL"
        },
        {
            name: "Bioconductor",
            category: "软件仓库",
            url: "https://bioconductor.org/",
            usage: "R语言生信包仓库",
            description: "生物信息学R包集合",
            data_types: "差异分析、富集分析、可视化等包",
            code: "if (!require('BiocManager'))\n    install.packages('BiocManager')\nBiocManager::install('DESeq2')"
        },
        {
            name: "ArrayExpress",
            category: "表达数据库",
            url: "https://www.ebi.ac.uk/arrayexpress/",
            usage: "EMBL-EBI功能基因组数据库",
            description: "标准化功能基因组数据存储库",
            data_types: "芯片、RNA-seq数据"
        },
        {
            name: "SRA",
            category: "测序数据",
            url: "https://www.ncbi.nlm.nih.gov/sra/",
            usage: "原始测序数据存储库",
            description: "NCBI序列读取存档",
            data_types: "原始FASTQ数据",
            code: "# 使用prefetch下载\nprefetch SRR123456\n# 使用fastq-dump转换\nfastq-dump --split-files SRR123456"
        },
        {
            name: "UniProt",
            category: "蛋白质数据库",
            url: "https://www.uniprot.org/",
            usage: "蛋白质序列和功能信息",
            description: "蛋白质序列和功能注释数据库",
            data_types: "蛋白质序列、功能注释、结构信息"
        },
        {
            name: "PDB",
            category: "结构数据库",
            url: "https://www.rcsb.org/",
            usage: "蛋白质三维结构数据库",
            description: "蛋白质数据库，存储生物大分子3D结构",
            data_types: "蛋白质、DNA、RNA的三维结构"
        },
        {
            name: "KEGG",
            category: "通路数据库",
            url: "https://www.genome.jp/kegg/",
            usage: "代谢和信号通路数据库",
            description: "京都基因与基因组百科全书",
            data_types: "代谢通路、信号通路、疾病通路",
            code: "library(clusterProfiler)\nkegg <- enrichKEGG(gene_list, organism='hsa')"
        },
        {
            name: "GO",
            category: "功能注释",
            url: "http://geneontology.org/",
            usage: "基因本体论数据库",
            description: "基因功能标准化术语体系",
            data_types: "生物学过程、细胞组分、分子功能",
            code: "library(clusterProfiler)\ngo <- enrichGO(gene_list, OrgDb=org.Hs.eg.db)"
        }
    ],
    formats: [
        {
            name: "FASTQ",
            extension: ".fastq, .fq, .fastq.gz",
            usage: "存储测序原始数据",
            description: "包含序列和质量分数的文本格式",
            structure: "@SEQ_ID\n序列\n+\n质量分数",
            tools: "FastQC, Trimmomatic, HISAT2, STAR"
        },
        {
            name: "FASTA",
            extension: ".fasta, .fa, .fna, .faa",
            usage: "存储序列数据（基因组、蛋白等）",
            description: "简单的序列文本格式",
            structure: ">sequence_id description\nATCGATCG...",
            tools: "BLAST, BWA, bowtie2"
        },
        {
            name: "BAM/CRAM",
            extension: ".bam, .cram",
            usage: "存储比对结果",
            description: "SAM的二进制格式，需要索引文件(.bai)",
            tools: "SAMtools, IGV, featureCounts",
            code: "# 转换和排序\nsamtools view -bS input.sam > output.bam\nsamtools sort -o sorted.bam input.bam\nsamtools index sorted.bam"
        },
        {
            name: "SAM",
            extension: ".sam",
            usage: "存储比对结果（文本格式）",
            description: "序列比对/图谱格式，人类可读",
            tools: "SAMtools, Picard"
        },
        {
            name: "GTF/GFF",
            extension: ".gtf, .gff, .gff3",
            usage: "基因注释文件",
            description: "基因组特征注释格式",
            fields: "seqname, source, feature, start, end, score, strand, frame, attributes",
            tools: "featureCounts, HTSeq, StringTie"
        },
        {
            name: "VCF",
            extension: ".vcf, .vcf.gz",
            usage: "存储变异检测结果",
            description: "变异调用格式",
            fields: "CHROM, POS, ID, REF, ALT, QUAL, FILTER, INFO, FORMAT, SAMPLE",
            tools: "GATK, BCFtools, SnpEff, VEP",
            code: "# 压缩和索引\nbgzip input.vcf\ntabix -p vcf input.vcf.gz"
        },
        {
            name: "BED",
            extension: ".bed",
            usage: "存储基因组区间",
            description: "浏览器扩展数据格式，存储基因组坐标",
            fields: "chrom, start, end, name, score, strand...",
            tools: "bedtools, IGV, UCSC Genome Browser"
        },
        {
            name: "BEDPE",
            extension: ".bedpe",
            usage: "存储成对基因组区间",
            description: "用于存储结构变异、Hi-C互作等",
            tools: "bedtools, HiC-Pro"
        }
    ]
};

// ============================================================================
// 项目模板
// ============================================================================
// 预定义的项目模板，用于快速创建分析项目
// 包含项目类型、图标、所需技能列表

const PROJECT_TEMPLATES = [
    { id: "rna_seq", name: "RNA-seq分析", icon: "fas fa-dna", skills: ["FastQC", "HISAT2", "featureCounts"] },
    { id: "deg", name: "差异表达分析", icon: "fas fa-chart-bar", skills: ["DESeq2", "ggplot2", "clusterProfiler"] },
    { id: "wes", name: "WES变异检测", icon: "fas fa-microscope", skills: ["GATK", "BWA", "SnpEff"] },
    { id: "scrna", name: "单细胞分析", icon: "fas fa-circle-nodes", skills: ["Seurat", "Harmony", "UMAP"] },
    { id: "geo", name: "GEO数据挖掘", icon: "fas fa-database", skills: ["GEOquery", "limma", "clusterProfiler"] },
    { id: "chip", name: "ChIP-seq分析", icon: "fas fa-chart-area", skills: ["MACS2", "Bowtie2", "ChIPseeker"] }
];

// ============================================================================
// 任务详细步骤
// ============================================================================
// 每个任务的详细操作步骤指南，帮助学习者逐步完成任务
//
// 数据结构:
//   - steps : 步骤列表，每步包含step(序号)和content(内容)
//   - tips  : 实用提示列表
//   - code_example : 代码示例（可选）
//
// 任务ID格式: w{周数}t{任务序号}，如 w1t1 表示第1周第1个任务

const TASK_STEPS = {
    "w1t1": {
        steps: [
            {step: 1, content: "访问 GitHub 官网: https://github.com"},
            {step: 2, content: "点击右上角 \"Sign up\" 注册按钮"},
            {step: 3, content: "填写用户名、邮箱、密码"},
            {step: 4, content: "完成邮箱验证"},
            {step: 5, content: "点击右上角 \"+\" → \"New repository\""},
            {step: 6, content: "仓库名填写: bioinfo-learning"},
            {step: 7, content: "选择 Public，勾选 Add a README file"},
            {step: 8, content: "点击 \"Create repository\" 完成创建"}
        ],
        tips: ["用户名建议使用真实姓名或常用ID", "密码要足够复杂，建议使用密码管理器"]
    },
    "w1t2": {
        steps: [
            {step: 1, content: "访问 Gitee 官网: https://gitee.com"},
            {step: 2, content: "点击 \"注册\" 按钮"},
            {step: 3, content: "填写手机号、邮箱等信息"},
            {step: 4, content: "完成手机验证"},
            {step: 5, content: "设置个人空间地址"}
        ],
        tips: ["Gitee是国内平台，访问速度更快", "可以作为GitHub的备份"]
    },
    "w1t3": {
        steps: [
            {step: 1, content: "打开终端（Terminal/PowerShell/WSL）"},
            {step: 2, content: "执行命令: cd ~ 进入用户主目录"},
            {step: 3, content: "执行命令: mkdir -p bioinfo/{data,scripts,results,notes}"},
            {step: 4, content: "执行命令: ls -la bioinfo 查看创建的目录"},
            {step: 5, content: "执行命令: tree bioinfo 或 ls -R bioinfo 查看完整结构"}
        ],
        code_example: "mkdir -p ~/bioinfo/{data,scripts,results,notes}",
        tips: ["~ 代表用户主目录", "-p 参数可以创建多级目录", "{} 可以一次性创建多个子目录"]
    },
    "w1t4": {
        steps: [
            {step: 1, content: "在 notes 目录创建文件: touch notes/linux_commands.md"},
            {step: 2, content: "用编辑器打开: vim notes/linux_commands.md 或 code notes/linux_commands.md"},
            {step: 3, content: "记录今天学习的命令及用法"},
            {step: 4, content: "包含: 命令名称、语法、常用参数、示例"},
            {step: 5, content: "保存文件"}
        ]
    },
    "w1t5": {
        steps: [
            {step: 1, content: "在 bioinfo-learning 仓库页面，点击 \"Add file\" → \"Upload files\""},
            {step: 2, content: "将 notes/linux_commands.md 拖拽到上传区域"},
            {step: 3, content: "在 Commit changes 填写提交信息"},
            {step: 4, content: "点击 \"Commit changes\" 提交"}
        ],
        tips: ["提交信息要清晰描述本次修改", "也可以用 git 命令行提交"]
    },
    "w2t1": {
        steps: [
            {step: 1, content: "访问 Rosalind: http://rosalind.info/problems/locations/"},
            {step: 2, content: "注册账号并登录"},
            {step: 3, content: "完成 DNA 计数题 (Counting DNA Nucleotides)"},
            {step: 4, content: "完成 RNA 转录题 (Transcribing DNA into RNA)"},
            {step: 5, content: "完成 DNA 互补链题 (Complementing a Strand of DNA)"},
            {step: 6, content: "完成 GC含量计算题 (Computing GC Content)"},
            {step: 7, content: "完成 Hamming距离题 (Counting Point Mutations)"},
            {step: 8, content: "将代码保存到 scripts/rosalind/ 目录"}
        ],
        tips: ["每道题可以多次提交直到正确", "注意阅读题目要求和示例"]
    },
    "w2t2": {
        steps: [
            {step: 1, content: "创建脚本: touch scripts/batch_rename.sh"},
            {step: 2, content: "编写批量重命名逻辑，使用 for 循环"},
            {step: 3, content: "添加 mv 命令实现重命名"},
            {step: 4, content: "测试脚本（先用 echo 验证）"},
            {step: 5, content: "添加执行权限: chmod +x scripts/batch_rename.sh"}
        ],
        code_example: "#!/bin/bash\nfor file in *.txt; do\n    mv \"$file\" \"new_${file}\"\ndone"
    },
    "w3t1": {
        steps: [
            {step: 1, content: "下载 R: https://cran.r-project.org/"},
            {step: 2, content: "选择对应操作系统的安装包"},
            {step: 3, content: "运行安装程序，按提示安装"},
            {step: 4, content: "下载 RStudio: https://posit.co/download/rstudio-desktop/"},
            {step: 5, content: "运行 RStudio 安装程序"},
            {step: 6, content: "打开 RStudio，检查 R 版本: version"}
        ],
        tips: ["建议安装最新版 R (4.3.x)", "RStudio 是 R 的 IDE，强烈推荐"]
    },
    "w3t2": {
        steps: [
            {step: 1, content: "在 RStudio 中创建新脚本: File → New File → R Script"},
            {step: 2, content: "练习向量创建: x <- c(1, 2, 3, 4, 5)"},
            {step: 3, content: "练习矩阵: m <- matrix(1:9, nrow=3)"},
            {step: 4, content: "练习数据框: df <- data.frame(name=c('A','B'), value=c(1,2))"},
            {step: 5, content: "练习列表: lst <- list(a=1, b='text', c=c(1,2,3))"},
            {step: 6, content: "完成10个练习并保存到 R-basics/practice.R"}
        ],
        code_example: "# 向量操作\nx <- c(1, 2, 3, 4, 5)\nmean(x)\nsum(x)\n\n# 数据框操作\ndf <- data.frame(\n  gene = c('TP53', 'BRCA1', 'EGFR'),\n  expression = c(100, 200, 150)\n)\n\n# 筛选\ndf[df$expression > 120, ]"
    },
    "w4t2": {
        steps: [
            {step: 1, content: "安装 tidyverse: install.packages('tidyverse')"},
            {step: 2, content: "加载库: library(tidyverse)"},
            {step: 3, content: "创建散点图展示两组变量关系"},
            {step: 4, content: "创建箱线图比较不同组分布"},
            {step: 5, content: "创建柱状图展示计数或汇总"},
            {step: 6, content: "创建热图展示矩阵数据"},
            {step: 7, content: "创建折线图展示趋势变化"}
        ],
        code_example: "# ggplot2 基础语法\nggplot(data, aes(x, y)) +\n  geom_point() +\n  labs(title='标题', x='X轴', y='Y轴') +\n  theme_bw()\n\n# 箱线图\nggplot(data, aes(group, value, fill=group)) +\n  geom_boxplot()"
    },
    "w5t1": {
        steps: [
            {step: 1, content: "下载 Miniconda: https://docs.conda.io/en/latest/miniconda.html"},
            {step: 2, content: "选择 Python 3.x 版本"},
            {step: 3, content: "运行安装程序，勾选 'Add to PATH'"},
            {step: 4, content: "打开新终端，验证: conda --version"},
            {step: 5, content: "验证 Python: python --version"}
        ],
        tips: ["Miniconda 比 Anaconda 更轻量", "记得勾选添加到PATH"]
    },
    "w7t1": {
        steps: [
            {step: 1, content: "打开终端，执行: conda create -n bioinfo python=3.11 -y"},
            {step: 2, content: "激活环境: conda activate bioinfo"},
            {step: 3, content: "验证环境: conda info --envs"},
            {step: 4, content: "查看已安装包: conda list"}
        ],
        code_example: "conda create -n bioinfo python=3.11 -y\nconda activate bioinfo",
        tips: ["每个项目建议创建独立环境", "-n 指定环境名称"]
    },
    "w7t2": {
        steps: [
            {step: 1, content: "配置 bioconda 频道（如果未配置）"},
            {step: 2, content: "安装 FastQC: conda install -c bioconda fastqc -y"},
            {step: 3, content: "安装 Trimmomatic: conda install -c bioconda trimmomatic -y"},
            {step: 4, content: "安装 BWA: conda install -c bioconda bwa -y"},
            {step: 5, content: "安装 SAMtools: conda install -c bioconda samtools -y"},
            {step: 6, content: "安装 HISAT2: conda install -c bioconda hisat2 -y"},
            {step: 7, content: "验证安装: fastqc --version, samtools --version"}
        ],
        code_example: "# 一次性安装多个工具\nconda install -c bioconda -y \\\n    fastqc \\\n    trimmomatic \\\n    bwa \\\n    samtools \\\n    bcftools \\\n    hisat2 \\\n    bedtools"
    },
    // ========== 第25周：AI辅助生信分析 ==========
    "w25t1": {
        steps: [
            {step: 1, content: "访问 Claude Code 官网获取安装指南"},
            {step: 2, content: "确保已安装 Node.js (v18+)"},
            {step: 3, content: "运行安装命令: npm install -g @anthropic-ai/claude-code"},
            {step: 4, content: "获取 Anthropic API Key: https://console.anthropic.com/"},
            {step: 5, content: "配置API密钥: claude config set api-key YOUR_KEY"},
            {step: 6, content: "启动Claude Code: claude"},
            {step: 7, content: "测试基本功能，输入: '你好，请介绍一下你自己'"}
        ],
        tips: [
            "API Key需要付费订阅，建议从基础套餐开始",
            "Windows用户建议使用WSL2获得更好体验",
            "首次使用会有引导教程"
        ]
    },
    "w25t2": {
        steps: [
            {step: 1, content: "克隆技能仓库: git clone [bioinfo-learning-skill仓库地址]"},
            {step: 2, content: "创建Claude技能目录: mkdir -p ~/.claude/skills"},
            {step: 3, content: "复制技能文件: cp -r bioinfo-learning-skill/.claude/skills/* ~/.claude/skills/"},
            {step: 4, content: "重启Claude Code使技能生效"},
            {step: 5, content: "测试技能: 在Claude Code中输入 '/bioinfo-learning'"},
            {step: 6, content: "查看技能文档: 阅读 SKILL.md 了解功能"}
        ],
        code_example: "# Claude技能目录结构\n~/.claude/skills/\n└── bioinfo-learning/\n    ├── SKILL.md           # 技能定义\n    ├── references/        # 参考文档\n    │   ├── curriculum_overview.md\n    │   ├── concepts_reference.md\n    │   └── ...\n    └── scripts/           # 辅助脚本",
        tips: [
            "技能目录必须放在 ~/.claude/skills/ 下才能被识别",
            "修改技能后需要重启Claude Code"
        ]
    },
    "w25t3": {
        steps: [
            {step: 1, content: "准备一个FASTQ文件用于测试"},
            {step: 2, content: "在Claude Code中请求AI帮助解释FastQC结果"},
            {step: 3, content: "示例提示词: '我有FastQC报告，请帮我解释每个指标的含义'"},
            {step: 4, content: "让AI建议下一步的质控策略"},
            {step: 5, content: "对比AI建议与自己的理解，记录差异"}
        ],
        code_example: "# 示例提示词\n\"\"\"\n我正在分析一个RNA-seq样本的FastQC报告：\n1. Per base quality 显示末端质量下降\n2. GC content分布异常，有两个峰\n3. Sequence Duplication Levels 较高\n\n请帮我分析这些问题可能的原因，并建议下一步的处理策略。\n\"\"\"",
        tips: [
            "AI输出仅供参考，需要结合自己的知识判断",
            "好的提示词能得到更准确的回答",
            "可以要求AI解释分析步骤的原理"
        ]
    },
    "w25t4": {
        steps: [
            {step: 1, content: "选择一个需要编写的分析脚本任务"},
            {step: 2, content: "向AI描述需求，让其生成代码"},
            {step: 3, content: "对比AI生成代码与自己编写的代码"},
            {step: 4, content: "分析两者的优缺点"},
            {step: 5, content: "测试AI生成代码的正确性"},
            {step: 6, content: "根据测试结果优化代码"}
        ],
        code_example: "# 示例：请求AI生成DESeq2分析代码\n\"\"\"\n请帮我编写一个R脚本：\n1. 读取count矩阵和metadata\n2. 使用DESeq2进行差异分析\n3. 条件: treatment vs control\n4. 筛选: padj < 0.05, |log2FC| > 1\n5. 输出: 差异基因表、火山图、热图\n\n请解释每一步的参数选择原因。\n\"\"\"",
        tips: [
            "AI生成的代码通常需要微调",
            "要求AI添加详细注释便于理解",
            "对于复杂分析，可以分步请求"
        ]
    },
    "w25t5": {
        steps: [
            {step: 1, content: "总结本周使用AI辅助的经验"},
            {step: 2, content: "记录哪些场景AI表现好，哪些需要人工干预"},
            {step: 3, content: "整理常用的提示词模板"},
            {step: 4, content: "制定个人的AI使用规范"},
            {step: 5, content: "将AI整合到日常分析流程中"}
        ],
        code_example: "# 个人AI辅助工作流模板\n\n## 分析前\n1. 使用AI了解分析方法的原理和适用场景\n2. 让AI推荐工具和参数设置\n\n## 分析中\n1. AI辅助编写和调试代码\n2. AI解释报错信息和解决方案\n3. AI帮助解读中间结果\n\n## 分析后\n1. AI辅助结果解读和可视化\n2. AI帮助撰写方法部分\n3. 人工审核所有AI输出"
    }
};
