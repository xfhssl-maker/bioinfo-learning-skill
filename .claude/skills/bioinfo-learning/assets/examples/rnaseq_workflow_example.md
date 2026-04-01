# RNA-seq Analysis Workflow Example

**Last Updated**: 2024

---

## Complete Workflow: From Raw Data to DEG Results

This example demonstrates a complete RNA-seq differential expression analysis pipeline.

---

## 1. Project Setup

```bash
# Create project directory structure
mkdir -p rnaseq_project/{data,results,scripts,logs}
cd rnaseq_project

# Create subdirectories
mkdir -p data/{raw,trimmed,alignment,counts}
mkdir -p results/{qc,deg,figures}
```

---

## 2. Quality Control

### 2.1 Run FastQC

```bash
# Run FastQC on all samples
fastqc data/raw/*.fastq.gz -o results/qc/fastqc/

# Generate MultiQC report
multiqc results/qc/fastqc/ -o results/qc/
```

### 2.2 Trimming with fastp

```bash
#!/bin/bash
# trim.sh - Batch trimming script

for sample in data/raw/*_R1.fastq.gz; do
    base=$(basename "$sample" _R1.fastq.gz)
    
    fastp \
        -i "data/raw/${base}_R1.fastq.gz" \
        -I "data/raw/${base}_R2.fastq.gz" \
        -o "data/trimmed/${base}_R1_trimmed.fq.gz" \
        -O "data/trimmed/${base}_R2_trimmed.fq.gz" \
        --detect_adapter_for_pe \
        --cut_front --cut_tail \
        --qualified_quality_phred 20 \
        --length_required 50 \
        --thread 4 \
        --json "results/qc/${base}_fastp.json" \
        --html "results/qc/${base}_fastp.html"
done
```

---

## 3. Alignment

### 3.1 Build Genome Index (HISAT2)

```bash
# Download reference genome and annotation
wget -P data/ https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_44/GRCh38.p14.genome.fa.gz
wget -P data/ https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_44/gencode.v44.annotation.gtf.gz

# Build HISAT2 index
hisat2-build data/GRCh38.p14.genome.fa data/hisat2_index/genome
```

### 3.2 Align Reads

```bash
#!/bin/bash
# align.sh - Batch alignment script

INDEX="data/hisat2_index/genome"

for sample in data/trimmed/*_R1_trimmed.fq.gz; do
    base=$(basename "$sample" _R1_trimmed.fq.gz)
    
    hisat2 \
        -x "$INDEX" \
        -1 "data/trimmed/${base}_R1_trimmed.fq.gz" \
        -2 "data/trimmed/${base}_R2_trimmed.fq.gz" \
        -S "data/alignment/${base}.sam" \
        -p 8 \
        --summary-file "logs/${base}_hisat2_summary.txt"
    
    # Convert SAM to BAM, sort, and index
    samtools view -Sb "data/alignment/${base}.sam" | \
        samtools sort -o "data/alignment/${base}.sorted.bam"
    samtools index "data/alignment/${base}.sorted.bam"
    
    # Remove intermediate SAM file
    rm "data/alignment/${base}.sam"
done
```

---

## 4. Quantification

### 4.1 Count Reads with featureCounts

```bash
#!/bin/bash
# count.sh - Read counting script

# Generate list of BAM files
BAMS=$(ls data/alignment/*.sorted.bam | tr '\n' ' ')

# Run featureCounts
featureCounts \
    -T 8 \
    -p \
    -a data/gencode.v44.annotation.gtf \
    -o data/counts/gene_counts.txt \
    $BAMS

# The output includes:
# - gene_counts.txt: Main count file
# - gene_counts.txt.summary: Summary statistics
```

---

## 5. Differential Expression Analysis (R)

### 5.1 Prepare Sample Information

```r
# Create sample information table
samples <- data.frame(
    sample_id = c("ctrl_1", "ctrl_2", "ctrl_3", "treat_1", "treat_2", "treat_3"),
    condition = c("control", "control", "control", "treatment", "treatment", "treatment"),
    batch = c("B1", "B1", "B2", "B1", "B2", "B2")
)

write.csv(samples, "data/sample_info.csv", row.names = FALSE)
```

### 5.2 DESeq2 Analysis

```r
# deg_analysis.R

library(DESeq2)
library(ggplot2)
library(pheatmap)
library(EnhancedVolcano)

# Load count data
counts <- read.table("data/counts/gene_counts.txt", 
                     header = TRUE, 
                     row.names = 1, 
                     comment.char = "#",
                     check.names = FALSE)

# Remove extra columns from featureCounts output
count_matrix <- counts[, 6:ncol(counts)]

# Load sample information
sample_info <- read.csv("data/sample_info.csv")
rownames(sample_info) <- sample_info$sample_id

# Ensure column order matches sample_info
count_matrix <- count_matrix[, sample_info$sample_id]

# Create DESeq2 dataset
dds <- DESeqDataSetFromMatrix(
    countData = count_matrix,
    colData = sample_info,
    design = ~ batch + condition  # Include batch if needed
)

# Pre-filtering (remove low counts)
keep <- rowSums(counts(dds) >= 10) >= 3
dds <- dds[keep, ]

# Run DESeq2
dds <- DESeq(dds)

# Get results
res <- results(dds, 
               contrast = c("condition", "treatment", "control"),
               alpha = 0.05)

# Shrink log2 fold changes
resLFC <- lfcShrink(dds, 
                    coef = "condition_treatment_vs_control", 
                    type = "apeglm")

# Summary of results
summary(res)

# Save results
write.csv(as.data.frame(resLFC), 
          "results/deg/deseq2_results.csv")
```

### 5.3 Quality Assessment Plots

```r
# QC plots

# Variance stabilizing transformation
vsd <- vst(dds, blind = FALSE)

# PCA plot
pcaData <- plotPCA(vsd, intgroup = c("condition", "batch"), returnData = TRUE)
percentVar <- round(100 * attr(pcaData, "percentVar"))

ggplot(pcaData, aes(PC1, PC2, color = condition, shape = batch)) +
    geom_point(size = 3) +
    labs(
        x = paste0("PC1: ", percentVar[1], "% variance"),
        y = paste0("PC2: ", percentVar[2], "% variance"),
        title = "PCA of Samples"
    ) +
    theme_bw()

ggsave("results/figures/pca_plot.pdf", width = 8, height = 6)

# Sample distance heatmap
sampleDists <- dist(t(assay(vsd)))
sampleDistMatrix <- as.matrix(sampleDists)
rownames(sampleDistMatrix) <- colnames(sampleDistMatrix) <- colnames(vsd)

pheatmap(sampleDistMatrix,
         clustering_distance_rows = sampleDists,
         clustering_distance_cols = sampleDists,
         main = "Sample Distance Heatmap")

# Save heatmap
pdf("results/figures/sample_distance_heatmap.pdf")
pheatmap(sampleDistMatrix,
         clustering_distance_rows = sampleDists,
         clustering_distance_cols = sampleDists,
         main = "Sample Distance Heatmap")
dev.off()
```

### 5.4 Volcano Plot

```r
# Volcano plot with EnhancedVolcano
EnhancedVolcano(resLFC,
    lab = rownames(resLFC),
    x = 'log2FoldChange',
    y = 'pvalue',
    title = 'Differential Expression: Treatment vs Control',
    pCutoff = 0.05,
    FCcutoff = 1,
    pointSize = 2.0,
    labSize = 3.0,
    col = c('grey30', 'forestgreen', 'royalblue', 'red2'),
    subtitle = NULL,
    caption = NULL
)

ggsave("results/figures/volcano_plot.pdf", width = 10, height = 8)
```

### 5.5 Extract Significant Genes

```r
# Get significant DEGs
sig_genes <- resLFC[which(resLFC$padj < 0.05 & abs(resLFC$log2FoldChange) > 1), ]

# Order by adjusted p-value
sig_genes <- sig_genes[order(sig_genes$padj), ]

# Save significant genes
write.csv(as.data.frame(sig_genes), 
          "results/deg/significant_degs.csv")

# Up-regulated genes
up_genes <- sig_genes[which(sig_genes$log2FoldChange > 1), ]

# Down-regulated genes
down_genes <- sig_genes[which(sig_genes$log2FoldChange < -1), ]

cat("Total significant DEGs:", nrow(sig_genes), "\n")
cat("Up-regulated:", nrow(up_genes), "\n")
cat("Down-regulated:", nrow(down_genes), "\n")
```

---

## 6. Functional Enrichment Analysis

```r
# enrichment_analysis.R

library(clusterProfiler)
library(org.Hs.eg.db)
library(enrichplot)

# Convert gene symbols to Entrez IDs
gene_symbols <- rownames(sig_genes)
entrez_ids <- bitr(gene_symbols, 
                   fromType = "SYMBOL", 
                   toType = "ENTREZID", 
                   OrgDb = org.Hs.eg.db)

# GO enrichment
go_enrich <- enrichGO(
    gene = entrez_ids$ENTREZID,
    OrgDb = org.Hs.eg.db,
    ont = "BP",
    pAdjustMethod = "BH",
    pvalueCutoff = 0.05,
    qvalueCutoff = 0.05,
    readable = TRUE
)

# KEGG pathway enrichment
kegg_enrich <- enrichKEGG(
    gene = entrez_ids$ENTREZID,
    organism = 'hsa',
    pvalueCutoff = 0.05
)

# Plot results
dotplot(go_enrich, showCategory = 20) + 
    ggtitle("GO Biological Process Enrichment")
ggsave("results/figures/go_enrichment.pdf", width = 10, height = 8)

dotplot(kegg_enrich, showCategory = 20) + 
    ggtitle("KEGG Pathway Enrichment")
ggsave("results/figures/kegg_enrichment.pdf", width = 10, height = 8)
```

---

## 7. Summary Report

### Expected Output Files

```
rnaseq_project/
├── data/
│   ├── raw/                    # Raw FASTQ files
│   ├── trimmed/                # Trimmed FASTQ files
│   ├── alignment/              # BAM files
│   └── counts/                 # Count matrix
├── results/
│   ├── qc/
│   │   ├── fastqc/             # FastQC reports
│   │   ├── multiqc_report.html # Combined QC report
│   │   └── *_fastp.html        # fastp reports
│   ├── deg/
│   │   ├── deseq2_results.csv  # Full results
│   │   └── significant_degs.csv # Significant genes
│   └── figures/
│       ├── pca_plot.pdf
│       ├── sample_distance_heatmap.pdf
│       ├── volcano_plot.pdf
│       ├── go_enrichment.pdf
│       └── kegg_enrichment.pdf
└── logs/
    └── *_hisat2_summary.txt    # Alignment summaries
```

### Key Metrics to Report

| Metric | Description |
|--------|-------------|
| Total reads | Input reads per sample |
| Trimmed reads | Reads after trimming |
| Alignment rate | % reads aligned to genome |
| Uniquely mapped | % uniquely mapped reads |
| Total genes detected | Genes with counts > 0 |
| Significant DEGs | Genes with padj < 0.05, |log2FC| > 1 |

---

## Quick Reference Commands

```bash
# Run full pipeline
bash scripts/trim.sh
bash scripts/align.sh
bash scripts/count.sh
Rscript scripts/deg_analysis.R
Rscript scripts/enrichment_analysis.R

# Check alignment rate
grep "overall alignment rate" logs/*.txt

# Count total reads
for f in data/raw/*.fastq.gz; do
    echo "$f: $(zcat $f | wc -l | awk '{print $1/4}')"
done

# Check BAM file stats
samtools flagstat data/alignment/*.sorted.bam
```

---

## Troubleshooting

### Low Alignment Rate
- Check reference genome version
- Verify sample quality (FastQC)
- Check for contamination
- Consider using different aligner

### Few DEGs
- Check sample grouping in PCA
- Verify batch effects
- Consider relaxing thresholds
- Check biological replicates

### Memory Issues
- Use `--keep-largest` in HISAT2
- Process samples sequentially
- Increase system memory
- Use sparse matrices for large datasets
