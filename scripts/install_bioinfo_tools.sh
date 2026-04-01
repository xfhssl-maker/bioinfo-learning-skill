#!/bin/bash
# 生信工具一键安装脚本 - Week 7

echo "=========================================="
echo "生信工具一键安装脚本"
echo "=========================================="

# 检查conda是否安装
if ! command -v conda &> /dev/null; then
    echo "❌ Conda未安装，请先安装Miniconda"
    echo "下载地址: https://docs.conda.io/en/latest/miniconda.html"
    exit 1
fi

echo "✅ Conda已安装"

# 创建生信环境
echo ""
echo "📦 创建生信环境 bioinfo..."
conda create -n bioinfo python=3.11 -y

# 激活环境
echo ""
echo "🔄 激活环境..."
source $(conda info --base)/etc/profile.d/conda.sh
conda activate bioinfo

# 添加bioconda频道
echo ""
echo "📡 配置Bioconda频道..."
conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict

# 安装基础工具
echo ""
echo "⚙️ 安装基础生信工具..."
conda install -y \
    fastqc \
    multiqc \
    trimmomatic \
    bwa \
    samtools \
    bcftools \
    hisat2 \
    star \
    subread \
    salmon

echo ""
echo "⚙️ 安装R和生信包..."
conda install -y \
    r-base=4.3 \
    r-tidyverse \
    r-ggplot2 \
    bioconductor-deseq2 \
    bioconductor-edger

echo ""
echo "✅ 安装完成！"
echo ""
echo "=========================================="
echo "已安装工具列表："
echo "=========================================="
fastqc --version
samtools --version | head -1
hisat2 --version | head -1
echo ""
echo "使用方法："
echo "  conda activate bioinfo  # 激活环境"
echo "  conda deactivate        # 退出环境"
