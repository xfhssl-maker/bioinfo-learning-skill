# 简历模板 - 生物信息分析师

---

## 个人信息

- **姓名**: {{NAME}}
- **学历**: {{UNIVERSITY}} {{MAJOR}} {{DEGREE}}
- **联系电话**: {{PHONE}}
- **邮箱**: {{EMAIL}}
- **GitHub**: https://github.com/{{GITHUB}}
- **技术博客**: {{BLOG}}

---

## 求职意向

- **期望职位**: 生物信息分析师 / 生信工程师
- **期望城市**: {{CITY}}
- **到岗时间**: {{AVAILABILITY}}

---

## 技能清单

### 编程语言
- **Python** (熟练): NumPy, Pandas, Biopython, Matplotlib
- **R** (熟练): tidyverse, ggplot2, DESeq2, Seurat, clusterProfiler
- **Shell** (熟练): Linux命令行, Shell脚本编写

### 生信分析
- **转录组分析**: RNA-seq差异表达, 功能富集分析
- **基因组分析**: WES/WGS变异检测, GATK流程
- **表观遗传**: ChIP-seq, ATAC-seq分析
- **单细胞分析**: Seurat分析流程, 细胞注释

### 生信工具
- **比对工具**: HISAT2, STAR, BWA, Bowtie2
- **分析工具**: GATK, SAMtools, MACS2, featureCounts
- **可视化**: ggplot2, pheatmap, ComplexHeatmap

### 数据库与资源
- **公共数据库**: GEO, TCGA, SRA, Ensembl
- **R包管理**: Bioconductor

---

## 项目经验

### 1. RNA-seq差异表达分析
**项目描述**: 完成肿瘤vs正常组织的转录组差异表达分析

**技术栈**: R, DESeq2, ggplot2, clusterProfiler

**分析流程**:
- 质量控制(FastQC) → 比对(HISAT2) → 定量(featureCounts) → 差异分析(DESeq2) → 富集分析

**主要结果**:
- 筛选出500+差异基因 (|log2FC| > 1, padj < 0.05)
- KEGG富集发现与癌症相关通路显著富集
- 生成火山图、热图、PCA图等可视化结果

**GitHub**: [RNA-seq-DEG-analysis]({{GITHUB_URL_1}})

---

### 2. WES变异检测
**项目描述**: 全外显子组测序变异检测与注释

**技术栈**: GATK, Python, SnpEff, bcftools

**分析流程**:
- 比对(BWA) → 标记重复 → BQSR → 变异检测(HaplotypeCaller) → 过滤 → 注释

**主要结果**:
- 检测到50,000+ SNPs和5,000+ INDELs
- 过滤后得到PASS变异并完成功能注释
- 编写自动化Pipeline脚本

**GitHub**: [WES-variant-calling]({{GITHUB_URL_2}})

---

### 3. 单细胞RNA-seq分析
**项目描述**: PBMC单细胞测序数据完整分析

**技术栈**: Seurat, Harmony, SingleR, ggplot2

**分析流程**:
- 质控过滤 → 标准化 → 降维聚类 → Marker鉴定 → 细胞注释

**主要结果**:
- 分析10,000+细胞，注释10种主要细胞类型
- 识别各细胞类型的特征Marker基因
- 生成UMAP、热图、小提琴图等可视化

**GitHub**: [scRNA-seq-analysis]({{GITHUB_URL_3}})

---

### 4. GEO公共数据挖掘
**项目描述**: GEO数据库表达谱数据挖掘与差异分析

**技术栈**: R, GEOquery, limma, clusterProfiler

**分析流程**:
- 数据下载 → 质控 → 差异分析 → 富集分析

**主要结果**:
- 完成2个GEO数据集的差异分析
- 识别关键差异基因和通路
- 建立可复用的分析流程

**GitHub**: [GEO-data-mining]({{GITHUB_URL_4}})

---

### 5. ChIP-seq分析
**项目描述**: 转录因子ChIP-seq数据分析

**技术栈**: MACS2, Bowtie2, ChIPseeker, HOMER

**分析流程**:
- 比对 → Peak calling → Peak注释 → Motif分析

**主要结果**:
- 识别转录因子结合位点
- 完成Peak基因组注释和Motif发现
- 生成Peak分布图和注释饼图

**GitHub**: [ChIP-seq-analysis]({{GITHUB_URL_5}})

---

## 教育背景

| 时间 | 学校 | 专业 | 学位 |
|------|------|------|------|
| {{TIME_1}} | {{UNIVERSITY_1}} | {{MAJOR_1}} | {{DEGREE_1}} |
| {{TIME_2}} | {{UNIVERSITY_2}} | {{MAJOR_2}} | {{DEGREE_2}} |

---

## 奖项证书

- {{AWARD_1}}
- {{AWARD_2}}
- {{CERTIFICATE_1}}

---

## 自我评价

- 热爱生物信息学，具备扎实的生信分析能力
- 熟练掌握RNA-seq、WES、单细胞等多种分析流程
- 具备良好的编程能力和数据分析能力
- 善于学习和应用新技术，有较强的解决问题能力
- 工作认真负责，注重代码质量和分析可重复性

---

## 附加信息

- **英语水平**: {{ENGLISH_LEVEL}}
- **开源贡献**: GitHub上有多个完整分析项目
- **技术博客**: 持续分享生信学习笔记和分析经验
