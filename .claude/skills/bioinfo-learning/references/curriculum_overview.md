# Bioinformatics Learning Curriculum Overview

**Last Updated**: 2024

---

## Program Structure

### Total Duration: 24 Weeks

| Phase | Weeks | Focus | Role Target | Output |
|-------|-------|-------|-------------|--------|
| 1. Foundation | 1-8 | Basic skills + First project | Intern | Personal learning repo |
| 2. Core Skills | 9-16 | Core bioinfo + Standard project | Junior Analyst | Analysis projects |
| 3. Advanced | 17-20 | Advanced project + Portfolio | Mid-level Analyst | Portfolio pieces |
| 4. Job Prep | 21-24 | Interview prep + Career | Job Seeker | Interview-ready profile |

---

## Phase 1: Foundation (Weeks 1-8)

### Week 1: Environment Setup + Linux Basics
**Difficulty**: ★☆☆☆☆ | **Learning Hours**: 10 | **Practice Hours**: 5

**Topics**:
- Install Linux system (WSL2 or Virtual Machine)
- Learn basic commands: ls, cd, mkdir, cp, mv, rm, cat, head, tail

**Biological Context**:
- Why: Bioinformatics analysis runs on Linux servers
- Real Scenario: Company servers are all Linux systems
- Industry Standard: All bioinfo positions require Linux proficiency

**Cognitive Levels**:
- Remember: Memorize 10 basic Linux commands
- Understand: Comprehend file system structure
- Apply: Operate files and directories in terminal
- Analyze: Compare different command use cases
- Evaluate: Assess command execution correctness
- Create: Design reasonable project directory structure

**Scenario**: "First Day at Work"
- Background: First day, mentor asks you to login to server
- Role: Intern
- Tasks: SSH login, check server config, create workspace
- Time Limit: 30 minutes

**Tasks**:
| ID | Description | Cognitive | Time |
|----|-------------|-----------|------|
| w1t1 | Register GitHub account, create repo bioinfo-learning | apply | 15 min |
| w1t2 | Register Gitee account (domestic backup) | apply | 10 min |
| w1t3 | Create project directory structure | create | 30 min |
| w1t4 | Write first learning note | understand | 30 min |
| w1t5 | Commit to GitHub | apply | 20 min |

---

### Week 2: Linux Advanced + Shell Scripting
**Difficulty**: ★★☆☆☆ | **Learning Hours**: 10 | **Practice Hours**: 5

**Topics**:
- Text processing trio: grep, awk, sed
- Pipes and redirection
- Loops and conditionals

**Biological Context**:
- Why: Batch processing large data files requires automation
- Real Scenario: 50 samples need QC - manual takes days, script takes hours
- Industry Standard: All analysis pipelines must be scripted

**Scenario**: "Batch QC Task"
- Background: Received 50 sample sequencing files, need QC reports
- Tasks: Count reads per file, extract GC content, batch rename, generate summary CSV
- Time Limit: 2 hours

**Tasks**:
| ID | Description | Cognitive | Time |
|----|-------------|-----------|------|
| w2t1 | Complete Rosalind first 5 problems | apply | 2 hours |
| w2t2 | Write batch rename script | create | 1 hour |
| w2t3 | Blog: grep/awk/sed practical cases | understand | 1.5 hours |

---

### Week 3: R Basics
**Difficulty**: ★★☆☆☆ | **Learning Hours**: 12 | **Practice Hours**: 6

**Topics**:
- Install R and RStudio
- Learn variable types, vectors, matrices, data frames

**Biological Context**:
- Why: R is the primary statistical programming language in bioinformatics
- Real Scenario: Differential expression analysis, visualization, statistics
- Industry Standard: R is mandatory for bioinfo positions

**Scenario**: "Data Cleaning Task"
- Background: Received expression matrix, need data cleaning
- Tasks: Read data, handle missing values, calculate statistics, output cleaned data
- Time Limit: 1 hour

---

### Week 4: R Data Processing + ggplot2
**Difficulty**: ★★★☆☆ | **Learning Hours**: 12 | **Practice Hours**: 6

**Topics**:
- tidyverse suite
- Data reshaping
- Visualization

**Scenario**: "Paper Figure Preparation"
- Background: Need figures for RNA-seq paper
- Tasks: Volcano plot, heatmap, PCA plot
- Time Limit: 3 hours

---

### Week 5: Python Basics
**Difficulty**: ★★☆☆☆ | **Learning Hours**: 12 | **Practice Hours**: 6

**Topics**:
- Install Anaconda/Miniconda
- Variables, lists, dictionaries, functions

**Biological Context**:
- Why: Python for developing automated pipelines and tools
- Real Scenario: Develop analysis workflows, process large-scale data
- Industry Standard: R + Python dual skill requirement

---

### Week 6: Python Advanced
**Difficulty**: ★★★☆☆ | **Learning Hours**: 12 | **Practice Hours**: 6

**Topics**:
- Object-oriented programming
- File I/O
- Common libraries (numpy, pandas)

---

### Week 7: Git + Version Control
**Difficulty**: ★★☆☆☆ | **Learning Hours**: 8 | **Practice Hours**: 4

**Topics**:
- Git basics
- Branching and merging
- Collaboration workflows

---

### Week 8: Statistics Fundamentals
**Difficulty**: ★★★☆☆ | **Learning Hours**: 12 | **Practice Hours**: 6

**Topics**:
- Descriptive statistics
- Hypothesis testing
- Multiple testing correction

---

## Phase 2: Core Bioinformatics (Weeks 9-16)

### Week 9: Sequence Basics + BLAST
**Difficulty**: ★★★☆☆ | **Learning Hours**: 10 | **Practice Hours**: 5

**Topics**:
- FASTA/FASTQ formats
- Sequence manipulation
- BLAST and database searching

**Biological Context**:
- Why: Sequence data is the foundation of bioinformatics
- Real Scenario: Identify unknown sequences, find homologs
- Industry Standard: Proficiency in sequence analysis is expected

---

### Week 10: RNA-seq Raw Data Processing
**Difficulty**: ★★★☆☆ | **Learning Hours**: 12 | **Practice Hours**: 8

**Topics**:
- FASTQ format and QC
- FastQC usage
- Trimming with Trimmomatic/fastp

**Key Concepts**: Phred score, adapter contamination, quality metrics

---

### Week 11: RNA-seq Alignment + Quantification
**Difficulty**: ★★★★☆ | **Learning Hours**: 12 | **Practice Hours**: 8

**Topics**:
- Alignment tools (HISAT2, STAR)
- Quantification (featureCounts, HTSeq)
- Quality assessment

**Key Concepts**: Splice-aware alignment, gene counting, normalization

---

### Week 12: Differential Expression Analysis
**Difficulty**: ★★★★☆ | **Learning Hours**: 12 | **Practice Hours**: 8

**Topics**:
- DESeq2 workflow
- Normalization methods
- Result interpretation

**Key Concepts**: FPKM, TPM, FDR, log2FC

---

### Week 13: Variant Calling Basics
**Difficulty**: ★★★★☆ | **Learning Hours**: 12 | **Practice Hours**: 8

**Topics**:
- VCF format
- GATK best practices
- Variant annotation

---

### Week 14: Variant Analysis + Annotation
**Difficulty**: ★★★★☆ | **Learning Hours**: 12 | **Practice Hours**: 8

**Topics**:
- SnpEff/VEP annotation
- Variant filtering
- Functional interpretation

---

### Week 15: Database Resources
**Difficulty**: ★★★☆☆ | **Learning Hours**: 10 | **Practice Hours**: 6

**Topics**:
- GEO database
- TCGA data access
- Ensembl/UCSC Genome Browser

---

### Week 16: Project Week
**Difficulty**: ★★★★☆ | **Learning Hours**: 8 | **Practice Hours**: 16

**Project**: Complete RNA-seq analysis from raw data to results

---

## Phase 3: Advanced Projects (Weeks 17-20)

### Week 17: Multi-omics Integration
**Difficulty**: ★★★★★ | **Learning Hours**: 10 | **Practice Hours**: 10

**Topics**:
- Multi-omics data types
- Integration methods
- Visualization

---

### Week 18: Machine Learning Applications
**Difficulty**: ★★★★★ | **Learning Hours**: 12 | **Practice Hours**: 8

**Topics**:
- Classification and clustering
- Feature selection
- Model evaluation

---

### Week 19: Pipeline Development
**Difficulty**: ★★★★★ | **Learning Hours**: 10 | **Practice Hours**: 10

**Topics**:
- Workflow managers (Snakemake, Nextflow)
- Containerization (Docker)
- Documentation

---

### Week 20: Research Project
**Difficulty**: ★★★★★ | **Learning Hours**: 8 | **Practice Hours**: 16

**Project**: Independent research project with documentation

---

## Phase 4: Job Preparation (Weeks 21-24)

### Week 21: Portfolio Building
**Difficulty**: ★★★☆☆ | **Learning Hours**: 8 | **Practice Hours**: 12

**Topics**:
- GitHub portfolio
- Project documentation
- Technical writing

---

### Week 22: Resume + Cover Letter
**Difficulty**: ★★☆☆☆ | **Learning Hours**: 8 | **Practice Hours**: 8

**Topics**:
- Resume writing
- Cover letter crafting
- LinkedIn optimization

---

### Week 23: Technical Interview Prep
**Difficulty**: ★★★★☆ | **Learning Hours**: 10 | **Practice Hours**: 10

**Topics**:
- Common technical questions
- Coding challenges
- System design questions

---

### Week 24: Mock Interviews + Career Planning
**Difficulty**: ★★★☆☆ | **Learning Hours**: 8 | **Practice Hours**: 12

**Topics**:
- Mock interviews
- Salary negotiation
- Career path planning

---

## Cognitive Level Definitions

Based on Bloom's Taxonomy:

| Level | Description | Example Activities |
|-------|-------------|-------------------|
| **Remember** | Recall facts and basic concepts | Define, list, memorize |
| **Understand** | Explain ideas or concepts | Describe, explain, summarize |
| **Apply** | Use information in new situations | Execute, implement, solve |
| **Analyze** | Draw connections among ideas | Compare, contrast, examine |
| **Evaluate** | Justify a decision or course of action | Assess, critique, recommend |
| **Create** | Produce new or original work | Design, develop, construct |

---

## Task Types

| Type | Description | Example |
|------|-------------|---------|
| **Learning** | Watch videos, read tutorials | Complete online course module |
| **Practice** | Hands-on coding exercises | Write Shell script |
| **Project** | Build complete analysis | RNA-seq pipeline |
| **Reflection** | Self-assessment and notes | Write learning blog |
| **Collaboration** | Work with others | Code review session |
