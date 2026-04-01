# Bioinformatics Tools Reference

**Last Updated**: 2024

---

## Quality Control Tools

### FastQC
**Purpose**: Quality control for sequencing data

**Installation**:
```bash
conda install -c bioconda fastqc
```

**Basic Usage**:
```bash
fastqc sample.fastq.gz
fastqc *.fastq.gz -o qc_results/
```

**Output**:
- HTML report with quality metrics
- Per-base quality scores
- GC content distribution
- Adapter content detection
- Sequence duplication levels

**Key Metrics to Check**:
- Per base sequence quality
- Per sequence GC content
- Sequence length distribution
- Adapter content
- Overrepresented sequences

---

### MultiQC
**Purpose**: Aggregate multiple QC reports

**Installation**:
```bash
conda install -c bioconda multiqc
```

**Usage**:
```bash
multiqc ./qc_results/ -o multiqc_report/
```

**Output**:
- Single HTML report
- Summary of all samples
- Easy comparison across samples

---

### Trimmomatic
**Purpose**: Read trimming and filtering

**Installation**:
```bash
conda install -c bioconda trimmomatic
```

**Usage**:
```bash
trimmomatic PE -phred33 \
  input_R1.fq.gz input_R2.fq.gz \
  output_R1_paired.fq.gz output_R1_unpaired.fq.gz \
  output_R2_paired.fq.gz output_R2_unpaired.fq.gz \
  ILLUMINACLIP:adapters.fa:2:30:10 \
  LEADING:3 TRAILING:3 \
  SLIDINGWINDOW:4:15 \
  MINLEN:36
```

**Common Parameters**:
| Parameter | Description |
|-----------|-------------|
| ILLUMINACLIP | Remove adapters |
| LEADING | Remove low quality bases from start |
| TRAILING | Remove low quality bases from end |
| SLIDINGWINDOW | Scan and trim with window |
| MINLEN | Minimum read length |

---

### fastp
**Purpose**: All-in-one preprocessing

**Installation**:
```bash
conda install -c bioconda fastp
```

**Usage**:
```bash
fastp -i input_R1.fq.gz -I input_R2.fq.gz \
  -o output_R1.fq.gz -O output_R2.fq.gz \
  --detect_adapter_for_pe \
  --cut_front --cut_tail \
  --qualified_quality_phred 20 \
  --length_required 50
```

**Advantages**:
- Faster than Trimmomatic
- Built-in QC report
- Automatic adapter detection

---

## Alignment Tools

### HISAT2
**Purpose**: Splice-aware aligner for RNA-seq

**Installation**:
```bash
conda install -c bioconda hisat2
```

**Index Building**:
```bash
hisat2-build genome.fa genome_index
```

**Alignment**:
```bash
hisat2 -x genome_index \
  -1 reads_R1.fq.gz -2 reads_R2.fq.gz \
  -S aligned.sam \
  -p 8
```

**Key Parameters**:
| Parameter | Description |
|-----------|-------------|
| -x | Index prefix |
| -1/-2 | Paired-end reads |
| -U | Single-end reads |
| -p | Number of threads |
| --rna-strandness | Strand-specific library |

---

### STAR
**Purpose**: Ultrafast RNA-seq aligner

**Installation**:
```bash
conda install -c bioconda star
```

**Index Building**:
```bash
STAR --runThreadN 8 \
  --runMode genomeGenerate \
  --genomeDir star_index/ \
  --genomeFastaFiles genome.fa \
  --sjdbGTFfile genes.gtf \
  --sjdbOverhang 100
```

**Alignment**:
```bash
STAR --runThreadN 8 \
  --genomeDir star_index/ \
  --readFilesIn reads_R1.fq.gz reads_R2.fq.gz \
  --readFilesCommand zcat \
  --outFileNamePrefix sample_
```

---

### BWA
**Purpose**: DNA sequence alignment

**Installation**:
```bash
conda install -c bioconda bwa
```

**Index Building**:
```bash
bwa index genome.fa
```

**Alignment**:
```bash
# For short reads (<100bp)
bwa aln genome.fa reads.fq.gz | bwa samse genome.fa - reads.fq.gz > aligned.sam

# For longer reads
bwa mem genome.fa reads_R1.fq.gz reads_R2.fq.gz > aligned.sam
```

---

### Bowtie2
**Purpose**: Fast and sensitive read alignment

**Installation**:
```bash
conda install -c bioconda bowtie2
```

**Usage**:
```bash
bowtie2-build genome.fa genome_index
bowtie2 -x genome_index \
  -1 reads_R1.fq -2 reads_R2.fq \
  -S aligned.sam \
  -p 8
```

---

## Quantification Tools

### featureCounts
**Purpose**: Count reads per gene

**Installation**:
```bash
conda install -c bioconda subread
```

**Usage**:
```bash
featureCounts -T 8 \
  -a genes.gtf \
  -o counts.txt \
  aligned.bam
```

**Key Parameters**:
| Parameter | Description |
|-----------|-------------|
| -T | Threads |
| -a | GTF annotation |
| -o | Output file |
| -p | Paired-end |
| -s | Strand-specific |

---

### HTSeq-count
**Purpose**: Count reads in features

**Installation**:
```bash
conda install -c bioconda htseq
```

**Usage**:
```bash
htseq-count -f bam -r pos \
  aligned.bam genes.gtf > counts.txt
```

---

### Salmon
**Purpose**: Alignment-free quantification

**Installation**:
```bash
conda install -c bioconda salmon
```

**Index Building**:
```bash
salmon index -t transcripts.fa -i salmon_index
```

**Quantification**:
```bash
salmon quant -i salmon_index \
  -l A \
  -1 reads_R1.fq.gz -2 reads_R2.fq.gz \
  -p 8 \
  -o quant_results/
```

---

## Differential Expression Tools

### DESeq2
**Purpose**: Differential expression analysis in R

**Installation** (R):
```r
if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")
BiocManager::install("DESeq2")
```

**Basic Workflow**:
```r
library(DESeq2)

# Create DESeqDataSet
dds <- DESeqDataSetFromMatrix(
  countData = counts,
  colData = sample_info,
  design = ~ condition
)

# Run analysis
dds <- DESeq(dds)

# Get results
res <- results(dds, contrast = c("condition", "treat", "ctrl"))

# Shrink log2 fold changes
resLFC <- lfcShrink(dds, coef = "condition_treat_vs_ctrl", type = "apeglm")
```

**Key Functions**:
| Function | Purpose |
|----------|---------|
| DESeq() | Run full analysis |
| results() | Extract results |
| lfcShrink() | Shrink fold changes |
| rlog() | Regularized log transform |
| vst() | Variance stabilizing transform |

---

### edgeR
**Purpose**: Differential expression analysis

**Installation** (R):
```r
BiocManager::install("edgeR")
```

**Basic Workflow**:
```r
library(edgeR)

# Create DGEList
y <- DGEList(counts = counts, group = group)

# Filter low counts
keep <- filterByExpr(y)
y <- y[keep, , keep.lib.sizes=FALSE]

# Normalize
y <- calcNormFactors(y)

# Estimate dispersion
y <- estimateDisp(y)

# Test
et <- exactTest(y)
topTags(et)
```

---

### limma-voom
**Purpose**: Linear models for RNA-seq

**Installation** (R):
```r
BiocManager::install("limma")
```

**Basic Workflow**:
```r
library(limma)
library(edgeR)

# Create DGEList
y <- DGEList(counts = counts)
y <- calcNormFactors(y)

# Voom transformation
v <- voom(y, design)

# Fit model
fit <- lmFit(v, design)
fit <- eBayes(fit)
topTable(fit)
```

---

## Variant Calling Tools

### GATK
**Purpose**: Best practices variant calling

**Installation**:
```bash
conda install -c bioconda gatk4
```

**Key Workflows**:
```bash
# Preprocessing
gatk MarkDuplicates -I input.bam -O dedup.bam -M metrics.txt
gatk BaseRecalibrator -I dedup.bam -R ref.fa --known-sites sites.vcf -O recal.table
gatk ApplyBQSR -I dedup.bam -R ref.fa --bqsr-recal-file recal.table -O recalibrated.bam

# Variant Calling
gatk HaplotypeCaller -R ref.fa -I recalibrated.bam -O raw_variants.vcf

# Filtering
gatk VariantFiltration -R ref.fa -V raw_variants.vcf \
  --filter-expression "QD < 2.0" --filter-name "QD2" \
  -O filtered_variants.vcf
```

---

### FreeBayes
**Purpose**: Haplotype-based variant caller

**Installation**:
```bash
conda install -c bioconda freebayes
```

**Usage**:
```bash
freebayes -f reference.fa aligned.bam > variants.vcf
```

---

### BCFtools
**Purpose**: Manipulate VCF/BCF files

**Installation**:
```bash
conda install -c bioconda bcftools
```

**Common Commands**:
```bash
# View VCF
bcftools view variants.vcf

# Filter VCF
bcftools filter -i 'QUAL>30 && DP>10' variants.vcf -o filtered.vcf

# Merge VCFs
bcftools merge sample1.vcf sample2.vcf -o merged.vcf

# Stats
bcftools stats variants.vcf > stats.txt
```

---

## Variant Annotation Tools

### SnpEff
**Purpose**: Variant annotation and effect prediction

**Installation**:
```bash
conda install -c bioconda snpeff
```

**Usage**:
```bash
# Build database (if needed)
snpEff build -gff3 -v organism_name

# Annotate
snpEff organism_name variants.vcf > annotated.vcf
```

**Output**:
- Gene and transcript information
- Effect impact (HIGH, MODERATE, LOW)
- Amino acid changes
- Functional predictions

---

### VEP (Variant Effect Predictor)
**Purpose**: Comprehensive variant annotation

**Installation**:
```bash
conda install -c bioconda ensembl-vep
```

**Usage**:
```bash
vep -i variants.vcf -o annotated.vcf --cache --species homo_sapiens
```

---

## SAMtools

**Purpose**: Manipulate alignment files

**Installation**:
```bash
conda install -c bioconda samtools
```

**Common Commands**:
```bash
# Convert SAM to BAM
samtools view -Sb aligned.sam > aligned.bam

# Sort BAM
samtools sort aligned.bam -o sorted.bam

# Index BAM
samtools index sorted.bam

# Get statistics
samtools flagstat sorted.bam
samtools idxstats sorted.bam
samtools depth sorted.bam > depth.txt

# Extract region
samtools view sorted.bam chr1:1000-2000 -o region.bam

# Merge BAMs
samtools merge merged.bam sample1.bam sample2.bam
```

---

## Visualization Tools

### IGV
**Purpose**: Genome browser visualization

**Installation**: Download from https://igv.org/

**Features**:
- View alignments, variants, annotations
- Multiple file formats supported
- Interactive exploration

---

### Integrative Genomics Viewer Commands

```bash
# Generate index files for visualization
samtools index aligned.bam
tabix -p vcf variants.vcf.gz
```

---

## Workflow Managers

### Snakemake
**Purpose**: Workflow management system

**Installation**:
```bash
conda install -c bioconda snakemake
```

**Example Snakefile**:
```python
rule all:
    input:
        "results/aligned.bam"

rule align:
    input:
        reads = "data/{sample}.fastq.gz",
        index = "genome/index"
    output:
        "results/{sample}.bam"
    shell:
        "hisat2 -x {input.index} -U {input.reads} -S {output}"
```

---

### Nextflow
**Purpose**: Scalable workflow framework

**Installation**:
```bash
conda install -c bioconda nextflow
```

---

## Quick Reference

| Task | Tool | Command |
|------|------|---------|
| QC | FastQC | `fastqc sample.fq.gz` |
| Trimming | fastp | `fastp -i in.fq -o out.fq` |
| RNA-seq Align | STAR/HISAT2 | `hisat2 -x idx -1 R1 -2 R2` |
| DNA Align | BWA | `bwa mem ref.fa R1 R2` |
| Quantification | featureCounts | `featureCounts -a gtf -o out bam` |
| DEG | DESeq2 | R package |
| Variant Call | GATK | `gatk HaplotypeCaller` |
| Annotation | SnpEff | `snpEff db vcf` |
| BAM Tools | SAMtools | `samtools view/sort/index` |
