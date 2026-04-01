# Bioinformatics Databases Reference

**Last Updated**: 2024

---

## Gene Expression Databases

### GEO (Gene Expression Omnibus)
**URL**: https://www.ncbi.nlm.nih.gov/geo/

**Description**: Public functional genomics data repository at NCBI

**Data Types**:
- Microarray data
- RNA-seq data
- ChIP-seq data
- Methylation data

**Access Methods**:
```r
# Using GEOquery in R
library(GEOquery)

# Download a dataset
gse <- getGEO("GSE12345", GSEMatrix = TRUE)

# Access expression data
exprs(gse[[1]])
```

**Common Use Cases**:
- Find published datasets for reanalysis
- Download processed expression matrices
- Access raw data for meta-analysis

---

### TCGA (The Cancer Genome Atlas)
**URL**: https://gdc.cancer.gov/

**Description**: Comprehensive cancer genomic data from NCI

**Data Types**:
- RNA-seq expression
- DNA methylation
- Copy number variation
- Somatic mutations
- Clinical data

**Access Methods**:
```r
# Using TCGAbiolinks
library(TCGAbiolinks)

# Query and download
query <- GDCquery(
    project = "TCGA-BRCA",
    data.category = "Transcriptome Profiling",
    data.type = "Gene Expression Quantification"
)
GDCdownload(query)
data <- GDCprepare(query)
```

**Cancer Types**: 33 different cancer types with multi-omics data

---

### ArrayExpress
**URL**: https://www.ebi.ac.uk/arrayexpress/

**Description**: EMBL-EBI's functional genomics database

**Features**:
- Standardized metadata
- MIAME compliance
- Direct download links

---

## Genomic Databases

### Ensembl
**URL**: https://www.ensembl.org/

**Description**: Genome annotation database and browser

**Features**:
- Gene annotations
- Variant information
- Comparative genomics
- Regulatory elements

**Access Methods**:
```r
# Using biomaRt
library(biomaRt)

mart <- useMart("ensembl", dataset = "hsapiens_gene_ensembl")

# Get gene information
genes <- getBM(
    attributes = c("hgnc_symbol", "entrezgene_id", "chromosome_name"),
    filters = "hgnc_symbol",
    values = c("TP53", "BRCA1"),
    mart = mart
)
```

**Key Resources**:
- Genome sequences (FASTA)
- Gene annotations (GTF)
- Variant data (VEP)

---

### UCSC Genome Browser
**URL**: https://genome.ucsc.edu/

**Description**: Interactive genome visualization tool

**Features**:
- Multiple genome assemblies
- Track hub support
- Table browser for bulk download

**Access Methods**:
```r
# Using rtracklayer
library(rtracklayer)

session <- browserSession()
genome(session) <- "hg38"
track <- track(session, "knownGene")
```

---

### NCBI RefSeq
**URL**: https://www.ncbi.nlm.nih.gov/refseq/

**Description**: Curated reference sequences

**Data Types**:
- Genomic DNA
- mRNA sequences
- Protein sequences

---

## Variant Databases

### gnomAD (Genome Aggregation Database)
**URL**: https://gnomad.broadinstitute.org/

**Description**: Population variant frequencies from large-scale sequencing

**Key Features**:
- 76,156 genomes
- 125,748 exomes
- Population-specific frequencies
- Constraint metrics (pLI, LOEUF)

**Use Cases**:
- Check variant frequency
- Filter common variants
- Assess gene constraint

---

### ClinVar
**URL**: https://www.ncbi.nlm.nih.gov/clinvar/

**Description**: Clinical significance of variants

**Information**:
- Pathogenicity classifications
- Supporting evidence
- Submitting laboratories

**Use Cases**:
- Clinical variant interpretation
- Disease association lookup

---

### dbSNP
**URL**: https://www.ncbi.nlm.nih.gov/snp/

**Description**: Database of single nucleotide polymorphisms

**Features**:
- SNP identifiers (rs numbers)
- Population frequencies
- Variant annotations

---

### ClinGen
**URL**: https://www.clinicalgenome.org/

**Description**: Clinical genomic resource

**Features**:
- Gene-disease validity
- Dosage sensitivity
- Actionability assessments

---

## Protein Databases

### UniProt
**URL**: https://www.uniprot.org/

**Description**: Universal protein resource

**Features**:
- Protein sequences
- Functional annotations
- Post-translational modifications
- Subcellular localization

---

### PDB (Protein Data Bank)
**URL**: https://www.rcsb.org/

**Description**: 3D structure database

**Features**:
- Protein structures
- Nucleic acid structures
- Complex structures

---

## Pathway Databases

### KEGG (Kyoto Encyclopedia of Genes and Genomes)
**URL**: https://www.genome.jp/kegg/

**Description**: Pathway and functional information

**Features**:
- Metabolic pathways
- Signaling pathways
- Disease pathways
- Drug information

**Access Methods**:
```r
# Using clusterProfiler
library(clusterProfiler)

kegg_enrich <- enrichKEGG(
    gene = gene_list,
    organism = "hsa"
)
```

---

### Reactome
**URL**: https://reactome.org/

**Description**: Biological pathway database

**Features**:
- Curated pathways
- Literature-based
- Cross-references

---

### GO (Gene Ontology)
**URL**: http://geneontology.org/

**Description**: Functional annotation system

**Categories**:
- Biological Process (BP)
- Molecular Function (MF)
- Cellular Component (CC)

---

## Specialized Databases

### Bioconductor
**URL**: https://www.bioconductor.org/

**Description**: R packages for bioinformatics

**Features**:
- 2,200+ packages
- Annotation packages
- Experiment data packages

**Common Packages**:
| Category | Packages |
|----------|----------|
| DEG | DESeq2, edgeR, limma |
| Annotation | biomaRt, AnnotationDbi |
| Visualization | ggplot2, pheatmap |
| Pathway | clusterProfiler, ReactomePA |

---

### SRA (Sequence Read Archive)
**URL**: https://www.ncbi.nlm.nih.gov/sra

**Description**: Raw sequencing data repository

**Access Methods**:
```bash
# Using SRA Toolkit
prefetch SRR123456
fastq-dump --split-files SRR123456

# Or fasterq-dump
fasterq-dump SRR123456 --split-files
```

---

### ENCODE
**URL**: https://www.encodeproject.org/

**Description**: Encyclopedia of DNA Elements

**Data Types**:
- ChIP-seq
- DNase-seq
- ATAC-seq
- RNA-seq
- DNA methylation

---

## Quick Reference

| Database | Data Type | Primary Use |
|----------|-----------|-------------|
| GEO | Expression | Published datasets |
| TCGA | Cancer | Multi-omics cancer data |
| Ensembl | Genome | Annotations, sequences |
| gnomAD | Variants | Population frequencies |
| ClinVar | Clinical | Pathogenicity |
| UniProt | Protein | Sequences, function |
| KEGG | Pathway | Enrichment analysis |
| SRA | Sequencing | Raw data download |
| Bioconductor | Software | R packages |

---

## Data Access Best Practices

1. **Check usage policies**: Some databases have restrictions
2. **Cite properly**: Include accession numbers and database citations
3. **Use API access**: More reliable than manual downloads
4. **Cache locally**: Store frequently used data locally
5. **Version control**: Note database version used
