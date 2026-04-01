# 生信工具一键安装指南

## 📦 安装前准备

### 1. 安装Miniconda

**Windows用户：**
1. 下载：https://docs.conda.io/en/latest/miniconda.html
2. 双击安装，默认选项即可
3. 安装完成后，打开"Anaconda Prompt"

**Linux/Mac用户：**
```bash
# 下载安装脚本
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh

# 运行安装
bash Miniconda3-latest-Linux-x86_64.sh

# 重启终端
source ~/.bashrc
```

## 🚀 一键安装

### Windows用户

```powershell
# 在Anaconda Prompt中运行
cd E:\OpenCode\bioinfo-learning-skill\scripts
.\install_bioinfo_tools.ps1
```

### Linux/Mac用户

```bash
cd ~/bioinfo-learning-skill/scripts
chmod +x install_bioinfo_tools.sh
./install_bioinfo_tools.sh
```

## ✅ 验证安装

```bash
# 激活环境
conda activate bioinfo

# 测试工具
fastqc --version
samtools --version
hisat2 --version
R --version
```

## 📋 已安装工具列表

### 质控工具
- **FastQC** - 测序数据质量控制
- **MultiQC** - 汇总多个质控报告
- **Trimmomatic** - 去接头和质量过滤

### 比对工具
- **BWA** - DNA序列比对
- **HISAT2** - RNA-seq比对
- **STAR** - RNA-seq比对（速度更快）

### 文件处理
- **SAMtools** - SAM/BAM文件处理
- **BCFtools** - VCF文件处理

### 定量工具
- **Subread (featureCounts)** - 基因定量
- **Salmon** - 转录本定量

### R语言和包
- **R 4.3**
- **tidyverse** - 数据处理
- **ggplot2** - 可视化
- **DESeq2** - 差异表达分析
- **edgeR** - 差异表达分析

## 🔧 常用命令

```bash
# 激活环境
conda activate bioinfo

# 退出环境
conda deactivate

# 查看已安装的包
conda list

# 更新工具
conda update fastqc

# 安装额外工具
conda install -c bioconda macs2
```

## ❓ 常见问题

**Q: 安装速度很慢？**
A: 使用国内镜像源
```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
```

**Q: 提示包冲突？**
A: 创建新环境重新安装
```bash
conda remove -n bioinfo --all
conda create -n bioinfo python=3.11 -y
```

**Q: Windows上某些工具无法安装？**
A: 部分工具仅支持Linux，建议使用WSL2

## 📚 下一步

安装完成后，可以开始Week 8的RNA-seq分析项目！
