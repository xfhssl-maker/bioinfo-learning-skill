# Bioinformatics Interview Questions

**Last Updated**: 2024

---

## Technical Questions

### Linux & Shell Scripting

**Q1: How would you count the number of lines in a FASTQ file?**
```bash
# Count lines
wc -l file.fastq

# Count reads (divide by 4)
echo $(( $(wc -l < file.fastq) / 4 ))

# Using awk
awk 'END{print NR/4}' file.fastq
```

**Q2: How would you extract unique sequences from a FASTQ file?**
```bash
# Extract sequences (every 2nd line of 4)
awk 'NR%4==2' file.fastq | sort | uniq > unique_seqs.txt

# Count unique sequences
awk 'NR%4==2' file.fastq | sort | uniq | wc -l
```

**Q3: Write a script to batch rename files.**
```bash
#!/bin/bash
# Rename .fq to .fastq
for f in *.fq; do
    mv "$f" "${f%.fq}.fastq"
done

# Or using rename command
rename 's/\.fq$/.fastq/' *.fq
```

---

### R & Bioconductor

**Q4: How do you perform differential expression analysis with DESeq2?**
```r
library(DESeq2)

# Load count matrix and sample info
dds <- DESeqDataSetFromMatrix(
    countData = counts,
    colData = coldata,
    design = ~ condition
)

# Filter low counts
dds <- dds[rowSums(counts(dds)) > 10, ]

# Run analysis
dds <- DESeq(dds)
res <- results(dds)

# Get significant genes
sig <- res[which(res$padj < 0.05 & abs(res$log2FoldChange) > 1), ]
```

**Q5: Explain the difference between FPKM and TPM.**

| Metric | Normalization | Comparable |
|--------|--------------|------------|
| FPKM | Gene length + library size | Within sample |
| TPM | Gene length + library size | Across samples |

Key difference: TPM sums to the same value across samples, making it better for cross-sample comparison.

**Q6: How would you handle batch effects in RNA-seq?**
```r
# Include batch in design formula
design(dds) <- ~ batch + condition
dds <- DESeq(dds)

# Or use ComBat from sva package
library(sva)
combat_counts <- ComBat_seq(counts(dds), batch = batch_info)
```

---

### Python

**Q7: Calculate GC content of a FASTA file.**
```python
from Bio import SeqIO

def gc_content(seq):
    return (seq.count('G') + seq.count('C')) / len(seq) * 100

for record in SeqIO.parse("sequences.fasta", "fasta"):
    gc = gc_content(str(record.seq))
    print(f"{record.id}: {gc:.2f}%")
```

**Q8: Parse a VCF file and extract variants by quality.**
```python
def parse_vcf(vcf_file, min_qual=30):
    with open(vcf_file) as f:
        for line in f:
            if line.startswith('#'):
                continue
            fields = line.strip().split('\t')
            chrom, pos, id_, ref, alt, qual = fields[:6]
            if qual != '.' and float(qual) >= min_qual:
                yield (chrom, pos, id_, ref, alt, qual)
```

---

### Statistics

**Q9: What is multiple testing correction and why is it needed?**

When testing thousands of hypotheses (e.g., differential expression of 20,000 genes), the chance of false positives increases dramatically.

- Without correction: 5% false positive rate × 20,000 genes = 1,000 expected false positives
- With FDR correction: Control the expected proportion of false discoveries

Common methods:
- Benjamini-Hochberg (FDR)
- Bonferroni (more conservative)

**Q10: Explain the difference between parametric and non-parametric tests.**

| Parametric | Non-parametric |
|------------|----------------|
| Assumes normal distribution | No distribution assumption |
| t-test | Mann-Whitney U |
| ANOVA | Kruskal-Wallis |
| More power when assumptions met | Robust to outliers |

---

### RNA-seq Analysis

**Q11: Walk me through an RNA-seq analysis pipeline.**

1. **Quality Control**
   - FastQC for raw reads
   - MultiQC for summary
   - fastp/Trimmomatic for trimming

2. **Alignment**
   - Build genome index (HISAT2/STAR)
   - Align reads to genome
   - Check alignment rate

3. **Quantification**
   - featureCounts/HTSeq for gene counts
   - Or Salmon for transcript quantification

4. **Differential Expression**
   - DESeq2/edgeR/limma
   - Quality assessment (PCA, sample clustering)
   - Identify DEGs

5. **Functional Analysis**
   - GO enrichment
   - Pathway analysis (KEGG, Reactome)

**Q12: How do you validate RNA-seq results?**

- qRT-PCR for selected genes
- Biological replicates
- Compare with existing datasets
- Check for batch effects
- Visualization in IGV

---

### Variant Calling

**Q13: Describe the GATK best practices workflow.**

1. **Pre-processing**
   - Mark duplicates
   - Base quality score recalibration (BQSR)

2. **Variant Calling**
   - HaplotypeCaller in GVCF mode
   - Joint genotyping (GenotypeGVCFs)

3. **Variant Filtering**
   - Hard filtering or VQSR
   - Apply filters

4. **Annotation**
   - SnpEff/VEP for functional impact
   - Population frequencies (gnomAD)

**Q14: What metrics would you check after variant calling?**

- Total number of variants
- Ti/Tv ratio (transition/transversion)
-dbSNP overlap rate
- Heterozygous/homozygous ratio
- Comparison with known variant databases

---

## Scenario Questions

**Q15: A sequencing run has low quality scores. What do you do?**

1. Check if it's cycle-specific (end of reads)
2. Check if it's sample-specific
3. Apply appropriate trimming
4. Consider removing problematic samples
5. Document the issue

**Q16: You find a batch effect in your RNA-seq data. How do you handle it?**

1. Identify the batch variable
2. Include in statistical model
3. Use batch correction methods (ComBat)
4. Validate results with alternative approaches
5. Document the limitation

**Q17: Your alignment rate is only 60%. What could be the reasons?**

- Contamination (different species)
- Wrong reference genome
- Poor sample quality
- Adapter contamination
- Incorrect library type (e.g., using DNA aligner for RNA)

---

## Coding Challenges

**Q18: Write a function to calculate reverse complement.**
```python
def reverse_complement(seq):
    complement = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G',
                  'a': 't', 't': 'a', 'g': 'c', 'c': 'g',
                  'N': 'N', 'n': 'n'}
    return ''.join(complement.get(base, 'N') for base in reversed(seq))
```

**Q19: Calculate the N50 of a set of contig lengths.**
```python
def calculate_n50(lengths):
    sorted_lengths = sorted(lengths, reverse=True)
    total = sum(sorted_lengths)
    cumsum = 0
    for length in sorted_lengths:
        cumsum += length
        if cumsum >= total / 2:
            return length
    return 0
```

**Q20: Parse a GTF file and extract gene coordinates.**
```python
def parse_gtf(gtf_file):
    genes = {}
    with open(gtf_file) as f:
        for line in f:
            if line.startswith('#'):
                continue
            fields = line.strip().split('\t')
            chrom, source, feature, start, end = fields[:5]
            attributes = fields[8]
            
            if feature == 'gene':
                # Parse gene_id from attributes
                gene_id = attributes.split('gene_id "')[1].split('"')[0]
                genes[gene_id] = {
                    'chrom': chrom,
                    'start': int(start),
                    'end': int(end)
                }
    return genes
```

---

## Behavioral Questions

**Q21: Describe a challenging bioinformatics project you worked on.**

Structure your answer using STAR:
- **Situation**: Context of the project
- **Task**: What you needed to accomplish
- **Action**: Steps you took
- **Result**: Outcome and learnings

**Q22: How do you stay current with bioinformatics developments?**

- Follow key journals (Nature Methods, Bioinformatics)
- Attend conferences (ISMB, ASHG)
- Read blogs and forums (Biostars, Twitter/X)
- Take online courses
- Participate in open source projects

**Q23: How would you explain FDR to a non-technical collaborator?**

"When we test many genes at once, some will appear significant just by chance. FDR tells us what percentage of our 'significant' results might actually be false positives. An FDR of 0.05 means we expect 5% of our findings to be wrong."

---

## Questions to Ask the Interviewer

### About the Role
- What types of projects would I be working on?
- What's the balance between analysis and tool development?
- How does the bioinformatics team collaborate with wet lab?

### About the Team
- How large is the bioinformatics team?
- What's the mix of skills on the team?
- How do you handle code review and quality control?

### About Technology
- What's your standard analysis pipeline?
- What compute resources are available?
- What programming languages do you primarily use?

### About Growth
- What opportunities are there for learning new skills?
- How do you support conference attendance or training?
- What does career progression look like?

---

## Quick Reference

| Topic | Key Concepts |
|-------|--------------|
| RNA-seq | QC, alignment, quantification, DEG, FPKM/TPM, FDR |
| Variant Calling | GATK workflow, BQSR, filtering, annotation |
| Statistics | Multiple testing, PCA, batch effects, normalization |
| Programming | Python, R, Bash, data structures |
| Tools | FastQC, HISAT2, STAR, DESeq2, GATK, SAMtools |
