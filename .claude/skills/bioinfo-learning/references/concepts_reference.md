# Bioinformatics Concepts Reference

**Last Updated**: 2024

---

## Sequence Analysis

### Phred Score
**Definition**: Quality score for each base in sequencing data

**Formula**: Q = -10 × log10(P)
- Q: Quality score
- P: Probability of incorrect base call

**Common Values**:
| Score | Accuracy | Error Rate |
|-------|----------|------------|
| Q10 | 90% | 1 in 10 |
| Q20 | 99% | 1 in 100 |
| Q30 | 99.9% | 1 in 1,000 |
| Q40 | 99.99% | 1 in 10,000 |

**Application**: Used in FASTQ files to assess sequencing quality

---

### FASTQ Format
**Definition**: Text-based format for sequences with quality scores

**Structure**:
```
@SEQ_ID                    # Line 1: Sequence identifier
GATTTGGGGTTCAAAGCAGT...   # Line 2: Sequence
+                         # Line 3: Separator (optional ID)
!''*((((***+))%%%++)...   # Line 4: Quality scores (ASCII)
```

**Quality Encoding**:
- Phred+33 (Illumina 1.8+): ASCII 33-126
- Phred+64 (older Illumina): ASCII 64-126

---

### FASTA Format
**Definition**: Simple text format for sequences

**Structure**:
```
>sequence_id description
ATCGATCGATCGATCG
ATCGATCGATCGATCG
```

**Use Cases**:
- Reference genomes
- Protein sequences
- Multiple sequence alignment

---

## RNA-seq Concepts

### FPKM (Fragments Per Kilobase Million)
**Definition**: Normalized expression measure for RNA-seq

**Formula**:
```
FPKM = (fragments mapped to gene) / (gene length in kb × total fragments in millions)
```

**Characteristics**:
- Accounts for gene length and sequencing depth
- Not directly comparable between samples
- Commonly used in older studies

---

### TPM (Transcripts Per Million)
**Definition**: Normalized expression measure, comparable across samples

**Formula**:
```
TPM = (reads per kilobase) / (sum of all reads per kilobase) × 1,000,000
```

**Advantages over FPKM**:
- Sum of TPMs is constant across samples
- Better for cross-sample comparison
- Preferred in most modern analyses

---

### log2FC (log2 Fold Change)
**Definition**: Logarithm of expression ratio between conditions

**Formula**:
```
log2FC = log2(expression_condition_B / expression_condition_A)
```

**Interpretation**:
| log2FC | Fold Change | Meaning |
|--------|-------------|---------|
| +1 | 2x | Up-regulated |
| +2 | 4x | Strongly up |
| -1 | 0.5x | Down-regulated |
| -2 | 0.25x | Strongly down |

**Note**: Typically requires corresponding p-value/FDR for significance

---

### FDR (False Discovery Rate)
**Definition**: Expected proportion of false positives among significant results

**Common Method**: Benjamini-Hochberg correction

**Formula**:
```
FDR = (number of false positives) / (number of significant results)
```

**Interpretation**:
- FDR < 0.05: 5% chance result is false positive
- Also called "adjusted p-value" or "q-value"

**When to Use**:
- Multiple testing scenarios (thousands of genes)
- RNA-seq differential expression
- Genome-wide association studies

---

## Variant Analysis

### VCF (Variant Call Format)
**Definition**: Standard format for storing genetic variants

**Structure**:
```
##fileformat=VCFv4.2
#CHROM  POS     ID        REF  ALT  QUAL  FILTER  INFO
chr1    10000   rs12345   A    G    50    PASS    DP=100
```

**Key Fields**:
| Field | Description |
|-------|-------------|
| CHROM | Chromosome name |
| POS | 1-based position |
| ID | Variant identifier (rs number) |
| REF | Reference allele |
| ALT | Alternate allele(s) |
| QUAL | Quality score |
| FILTER | Filter status |
| INFO | Additional information |

---

### Variant Types

| Type | Description | Example |
|------|-------------|---------|
| **SNP** | Single nucleotide change | A → G |
| **Indel** | Insertion or deletion | AT → A (deletion) |
| **SV** | Structural variant | >50bp changes |
| **CNV** | Copy number variation | Gene duplication |

---

### Allele Frequency
**Definition**: Frequency of an allele in a population

**Types**:
- MAF (Minor Allele Frequency): Frequency of less common allele
- GAF (Global Allele Frequency): Across all populations

**Databases**:
- gnomAD: Genome aggregation database
- 1000 Genomes: Global population frequencies
- ExAC: Exome aggregation consortium

---

## Statistical Concepts

### PCA (Principal Component Analysis)
**Definition**: Dimensionality reduction technique

**Use in Bioinformatics**:
- Sample quality control
- Batch effect detection
- Population structure analysis

**Output**:
- PC1, PC2, etc.: Principal components
- Variance explained by each PC
- Sample clustering visualization

---

### Multiple Testing Correction

**Why Needed**:
- Testing thousands of genes increases false positives
- Need to adjust p-values

**Methods**:
| Method | Description | Stringency |
|--------|-------------|------------|
| Bonferroni | p × n | Very strict |
| Benjamini-Hochberg | Controls FDR | Moderate |
| Storey's q-value | Estimates π₀ | Less strict |

---

## File Formats

### BAM/CRAM Format
**Definition**: Binary alignment map (compressed SAM)

**Contains**:
- Read sequences
- Alignment positions
- Quality scores
- Mapping information

**Tools**:
- SAMtools: Manipulation
- IGV: Visualization

---

### GTF/GFF Format
**Definition**: Gene annotation format

**Structure**:
```
chr1  source  gene  1000  2000  .  +  .  gene_id "GENE1";
chr1  source  exon  1000  1500  .  +  .  gene_id "GENE1";
```

**Key Features**:
- Chromosome coordinates
- Feature types (gene, exon, CDS)
- Strand information
- Attributes (gene_id, transcript_id)

---

### BED Format
**Definition**: Simple interval format

**Structure**:
```
chr1  1000  2000  feature1  score  +
```

**Columns**:
1. Chromosome
2. Start (0-based)
3. End
4. Name (optional)
5. Score (optional)
6. Strand (optional)

---

## Quality Metrics

### Sequencing QC Metrics

| Metric | Description | Good Value |
|--------|-------------|------------|
| **Total Reads** | Number of reads | Project dependent |
| **Read Length** | Length of each read | Platform dependent |
| **Q30+** | Bases with Q≥30 | >80% |
| **GC Content** | Guanine + Cytosine % | 40-60% (species dependent) |
| **Duplication Rate** | PCR duplicates | <20% |

---

### Alignment QC Metrics

| Metric | Description | Good Value |
|--------|-------------|------------|
| **Mapping Rate** | Reads aligned | >70% |
| **Proper Pair** | Correctly paired | >90% (paired-end) |
| **Insert Size** | Fragment length | Matches library prep |
| **Coverage** | Average depth | Project dependent |

---

## Database Resources

### Gene Expression Databases

| Database | Description | URL |
|----------|-------------|-----|
| **GEO** | Gene Expression Omnibus | ncbi.nlm.nih.gov/geo |
| **TCGA** | Cancer Genome Atlas | gdc.cancer.gov |
| **ArrayExpress** | EMBL-EBI database | ebi.ac.uk/arrayexpress |

### Genomic Databases

| Database | Description | URL |
|----------|-------------|-----|
| **Ensembl** | Genome browser | ensembl.org |
| **UCSC** | Genome browser | genome.ucsc.edu |
| **NCBI** | RefSeq genomes | ncbi.nlm.nih.gov |

### Variant Databases

| Database | Description | URL |
|----------|-------------|-----|
| **gnomAD** | Population frequencies | gnomad.broadinstitute.org |
| **ClinVar** | Clinical variants | ncbi.nlm.nih.gov/clinvar |
| **dbSNP** | SNP database | ncbi.nlm.nih.gov/snp |

---

## Quick Reference Table

| Concept | Type | Key Formula/Value |
|---------|------|-------------------|
| Phred Score | Quality | Q = -10 × log10(P) |
| FPKM | Expression | reads / (length × depth) |
| TPM | Expression | RPK / Σ(RPK) × 10⁶ |
| log2FC | Differential | log2(B/A) |
| FDR | Statistics | BH correction |
| VCF | File Format | Variant storage |
| BAM | File Format | Binary alignment |
| GTF | File Format | Gene annotation |
