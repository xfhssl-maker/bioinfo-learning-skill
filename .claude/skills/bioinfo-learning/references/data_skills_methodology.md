# 数据技能学习方法论

**参考资源**: [Bioinformatics Data Skills (中文版)](https://github.com/ShenChen-bioUtopia/Bioinformatics-data-skills)

> 本文档整理自 Vince Buffalo 所著《Bioinformatics Data Skills》，由 ShenChen-bioUtopia 翻译整理。

---

## 为什么学习数据技能？

### 生物学数据的爆发式增长

- **测序成本下降**: 自2008年下一代测序技术引入后，成本呈指数级下降
- **数据量激增**: Sequence Read Archive 数据量每年翻倍，超过摩尔定律
- **工具快速迭代**: 2012年已有70+短读长比对软件

### 数据技能 vs 工具学习

| 传统方式 | 数据技能方式 |
|---------|-------------|
| 学习特定工具 | 学习通用技能 |
| 工具过时需重新学习 | 技能可迁移 |
| 依赖图形界面 | 命令行熟练 |
| 被动接受结果 | 批判性评估输出 |

---

## 核心数据技能

### 1. 命令行熟练度

**为什么重要**:
- 服务器环境只有命令行
- 批量处理必需
- 自动化脚本基础

**核心技能**:
```bash
# 文件操作
ls, cd, mkdir, cp, mv, rm, cat, head, tail

# 文本处理
grep, awk, sed, cut, sort, uniq, wc

# 管道和重定向
command1 | command2 > output.txt

# 进程管理
ps, top, kill, nohup, &
```

---

### 2. 脚本编程

**为什么重要**:
- 自动化重复任务
- 可重复研究
- 批量数据处理

**推荐语言**:
| 语言 | 适用场景 |
|------|---------|
| Bash | 系统任务、简单流程 |
| Python | 数据处理、工具开发 |
| R | 统计分析、可视化 |

---

### 3. 版本控制

**为什么重要**:
- 代码历史追踪
- 协作开发
- 实验记录

**核心操作**:
```bash
# 初始化仓库
git init

# 日常操作
git add .
git commit -m "message"
git push

# 分支管理
git branch feature
git checkout feature
git merge feature
```

---

### 4. 数据格式理解

**常见格式**:
| 格式 | 用途 | 工具 |
|------|------|------|
| FASTQ | 测序数据 | FastQC, Trimmomatic |
| FASTA | 序列数据 | BLAST, BWA |
| BAM/SAM | 比对结果 | SAMtools, IGV |
| VCF | 变异信息 | GATK, BCFtools |
| GTF/GFF | 基因注释 | featureCounts |

---

## 健壮和可重复的研究

### 可重复研究原则

1. **记录一切**: 每一步操作都有记录
2. **自动化**: 用脚本代替手动操作
3. **版本控制**: 代码和数据都有版本
4. **文档化**: README和注释完整

### 项目结构建议

```
project/
├── data/
│   ├── raw/           # 原始数据（只读）
│   └── processed/     # 处理后的数据
├── scripts/           # 分析脚本
├── results/           # 分析结果
├── docs/              # 文档
└── README.md          # 项目说明
```

---

## 批判性评估工具输出

### 评估原则

1. **不信任默认参数**: 了解工具做了什么
2. **检查中间结果**: 每一步都验证
3. **对比多个工具**: 不同工具结果对比
4. **生物学合理性**: 结果是否符合生物学知识

### 评估检查清单

- [ ] 输入数据格式正确？
- [ ] 参数设置合理？
- [ ] 中间结果合理？
- [ ] 统计检验适当？
- [ ] 生物学意义合理？

---

## 学习路径建议

### 阶段一：基础技能（4-8周）

| 周次 | 主题 | 学习内容 |
|------|------|---------|
| 1-2 | Linux基础 | 命令行操作、文件系统 |
| 3-4 | Shell脚本 | 管道、循环、条件判断 |
| 5-6 | Python/R | 编程基础、数据处理 |
| 7-8 | Git版本控制 | 仓库管理、协作流程 |

### 阶段二：生信技能（8-12周）

| 周次 | 主题 | 学习内容 |
|------|------|---------|
| 9-10 | 数据格式 | FASTQ、BAM、VCF |
| 11-12 | 质量控制 | FastQC、trimming |
| 13-14 | 比对 | BWA、HISAT2、STAR |
| 15-16 | 变异检测 | GATK、FreeBayes |
| 17-18 | RNA-seq | DESeq2、edgeR |
| 19-20 | 注释 | SnpEff、VEP |

### 阶段三：项目实践（4-8周）

- 完整的RNA-seq分析项目
- 完整的变异检测项目
- 多组学整合分析

---

## 推荐资源

### 书籍

| 书籍 | 作者 | 重点 |
|------|------|------|
| Bioinformatics Data Skills | Vince Buffalo | 数据技能方法论 |
| Bioinformatics Algorithms | Compeau & Pevzner | 算法原理 |

### 在线资源

| 资源 | 链接 | 说明 |
|------|------|------|
| Biostars | biostars.org | 生信问答社区 |
| Rosalind | rosalind.info | 编程练习平台 |
| 生信技能树 | biotrainee.cn | 中文教程 |

---

## 数据技能清单

### 基础技能（必须掌握）

- [ ] Linux命令行操作
- [ ] Shell脚本编写
- [ ] 至少一门编程语言（Python/R）
- [ ] Git版本控制
- [ ] 数据格式理解

### 进阶技能（推荐掌握）

- [ ] 并行计算
- [ ] 工作流管理（Snakemake/Nextflow）
- [ ] 容器技术（Docker/Singularity）
- [ ] 数据库操作
- [ ] 云计算平台

### 专业技能（根据方向）

- [ ] RNA-seq分析
- [ ] 变异检测
- [ ] 单细胞分析
- [ ] 宏基因组分析
- [ ] 结构变异分析

---

## 总结

**数据技能是生物信息学的核心**：
- 工具会变，但技能可迁移
- 系统性思维比工具更重要
- 可重复研究是职业责任

**学习方法**：
1. 实践为主，理论为辅
2. 从小项目开始
3. 记录学习过程
4. 参与社区交流

---

## 致谢

本文档方法论参考自：
- Vince Buffalo《Bioinformatics Data Skills》
- [ShenChen-bioUtopia/Bioinformatics-data-skills](https://github.com/ShenChen-bioUtopia/Bioinformatics-data-skills) 中文翻译项目
