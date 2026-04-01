# 生信工具一键安装脚本 - Windows版
# 使用方法：在Anaconda Prompt中运行

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "生信工具一键安装脚本 (Windows)" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 检查conda
if (!(Get-Command conda -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Conda未安装" -ForegroundColor Red
    Write-Host "请先安装Miniconda: https://docs.conda.io/en/latest/miniconda.html"
    exit 1
}

Write-Host "✅ Conda已安装" -ForegroundColor Green

# 创建环境
Write-Host "`n📦 创建生信环境 bioinfo..." -ForegroundColor Yellow
conda create -n bioinfo python=3.11 -y

# 配置频道
Write-Host "`n📡 配置Bioconda频道..." -ForegroundColor Yellow
conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict

# 激活环境
conda activate bioinfo

# 安装工具
Write-Host "`n⚙️ 安装基础生信工具..." -ForegroundColor Yellow
conda install -y fastqc multiqc trimmomatic bwa samtools bcftools hisat2 star subread salmon

Write-Host "`n⚙️ 安装R和生信包..." -ForegroundColor Yellow
conda install -y r-base=4.3 r-tidyverse r-ggplot2 bioconductor-deseq2 bioconductor-edger

Write-Host "`n✅ 安装完成！" -ForegroundColor Green
Write-Host "`n使用方法："
Write-Host "  conda activate bioinfo  # 激活环境"
Write-Host "  conda deactivate        # 退出环境"
