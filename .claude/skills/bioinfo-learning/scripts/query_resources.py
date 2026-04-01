#!/usr/bin/env python3
"""
Query Resources Script
Search the bioinformatics resources database (concepts, tools, databases).

Usage:
    python query_resources.py --type concepts
    python query_resources.py --concept "FPKM"
    python query_resources.py --tools --category "alignment"
    python query_resources.py --search "variant"
"""

import argparse
from pathlib import Path

# Resource databases
CONCEPTS = {
    "fpkm": {
        "name": "FPKM",
        "full_name": "Fragments Per Kilobase Million",
        "category": "RNA-seq",
        "definition": "Normalized expression measure for RNA-seq",
        "formula": "FPKM = (fragments mapped) / (gene length in kb × total fragments in millions)",
        "use_case": "Within-sample expression normalization",
        "related": ["TPM", "RPKM", "normalization"]
    },
    "tpm": {
        "name": "TPM",
        "full_name": "Transcripts Per Million",
        "category": "RNA-seq",
        "definition": "Normalized expression measure, comparable across samples",
        "formula": "TPM = (reads per kb) / (sum of all reads per kb) × 1,000,000",
        "use_case": "Cross-sample expression comparison",
        "related": ["FPKM", "normalization"]
    },
    "fdr": {
        "name": "FDR",
        "full_name": "False Discovery Rate",
        "category": "Statistics",
        "definition": "Expected proportion of false positives among significant results",
        "formula": "FDR = (false positives) / (significant results)",
        "use_case": "Multiple testing correction in RNA-seq, GWAS",
        "related": ["p-value", "multiple testing", "Benjamini-Hochberg"]
    },
    "log2fc": {
        "name": "log2FC",
        "full_name": "log2 Fold Change",
        "category": "RNA-seq",
        "definition": "Logarithm of expression ratio between conditions",
        "formula": "log2FC = log2(expression_B / expression_A)",
        "use_case": "Differential expression analysis",
        "related": ["differential expression", "DESeq2"]
    },
    "phred": {
        "name": "Phred Score",
        "full_name": "Phred Quality Score",
        "category": "Sequencing",
        "definition": "Quality score for each base in sequencing data",
        "formula": "Q = -10 × log10(P), where P is error probability",
        "use_case": "Sequencing quality assessment",
        "related": ["FASTQ", "quality control"]
    },
    "vcf": {
        "name": "VCF",
        "full_name": "Variant Call Format",
        "category": "Variant Analysis",
        "definition": "Standard format for storing genetic variants",
        "fields": ["CHROM", "POS", "ID", "REF", "ALT", "QUAL", "FILTER", "INFO"],
        "use_case": "Variant storage and exchange",
        "related": ["variant calling", "GATK", "BCFtools"]
    },
    "bam": {
        "name": "BAM",
        "full_name": "Binary Alignment Map",
        "category": "File Formats",
        "definition": "Binary format for sequence alignment data",
        "use_case": "Storing aligned reads",
        "tools": ["SAMtools", "IGV"],
        "related": ["SAM", "CRAM", "alignment"]
    },
    "pca": {
        "name": "PCA",
        "full_name": "Principal Component Analysis",
        "category": "Statistics",
        "definition": "Dimensionality reduction technique",
        "use_case": "Sample QC, batch effect detection, population structure",
        "related": ["clustering", "visualization"]
    },
    "umap": {
        "name": "UMAP",
        "full_name": "Uniform Manifold Approximation and Projection",
        "category": "Statistics",
        "definition": "Non-linear dimensionality reduction",
        "use_case": "Single-cell analysis, visualization",
        "related": ["PCA", "t-SNE", "single-cell"]
    }
}

TOOLS = {
    "fastqc": {
        "name": "FastQC",
        "category": "Quality Control",
        "purpose": "Quality control for sequencing data",
        "input": "FASTQ files",
        "output": "HTML quality report",
        "installation": "conda install -c bioconda fastqc",
        "use_case": "Pre-alignment quality assessment"
    },
    "hisat2": {
        "name": "HISAT2",
        "category": "Alignment",
        "purpose": "Splice-aware aligner for RNA-seq",
        "input": "FASTQ files, genome index",
        "output": "SAM/BAM alignment",
        "installation": "conda install -c bioconda hisat2",
        "use_case": "RNA-seq alignment"
    },
    "star": {
        "name": "STAR",
        "category": "Alignment",
        "purpose": "Ultrafast RNA-seq aligner",
        "input": "FASTQ files, genome index",
        "output": "SAM/BAM alignment",
        "installation": "conda install -c bioconda star",
        "use_case": "Large-scale RNA-seq alignment"
    },
    "bwa": {
        "name": "BWA",
        "category": "Alignment",
        "purpose": "DNA sequence alignment",
        "input": "FASTQ files, genome index",
        "output": "SAM/BAM alignment",
        "installation": "conda install -c bioconda bwa",
        "use_case": "Whole genome, exome alignment"
    },
    "featurecounts": {
        "name": "featureCounts",
        "category": "Quantification",
        "purpose": "Count reads per gene",
        "input": "BAM files, GTF annotation",
        "output": "Count matrix",
        "installation": "conda install -c bioconda subread",
        "use_case": "RNA-seq quantification"
    },
    "deseq2": {
        "name": "DESeq2",
        "category": "Differential Expression",
        "purpose": "Differential expression analysis",
        "input": "Count matrix, sample info",
        "output": "DEG results",
        "installation": "BiocManager::install('DESeq2')",
        "use_case": "RNA-seq differential expression"
    },
    "gatk": {
        "name": "GATK",
        "category": "Variant Calling",
        "purpose": "Best practices variant calling",
        "input": "BAM files, reference genome",
        "output": "VCF files",
        "installation": "conda install -c bioconda gatk4",
        "use_case": "SNP/indel calling"
    },
    "samtools": {
        "name": "SAMtools",
        "category": "Utilities",
        "purpose": "Manipulate alignment files",
        "input": "SAM/BAM files",
        "output": "Various (sorted, indexed BAM)",
        "installation": "conda install -c bioconda samtools",
        "use_case": "BAM file operations"
    },
    "snpeff": {
        "name": "SnpEff",
        "category": "Annotation",
        "purpose": "Variant annotation and effect prediction",
        "input": "VCF files",
        "output": "Annotated VCF",
        "installation": "conda install -c bioconda snpeff",
        "use_case": "Variant functional annotation"
    },
    "salmon": {
        "name": "Salmon",
        "category": "Quantification",
        "purpose": "Alignment-free quantification",
        "input": "FASTQ files, transcriptome index",
        "output": "Expression estimates",
        "installation": "conda install -c bioconda salmon",
        "use_case": "Fast RNA-seq quantification"
    }
}

DATABASES = {
    "geo": {
        "name": "GEO",
        "full_name": "Gene Expression Omnibus",
        "type": "Expression Database",
        "url": "https://www.ncbi.nlm.nih.gov/geo/",
        "description": "Public functional genomics data repository",
        "use_case": "Find published expression datasets"
    },
    "tcga": {
        "name": "TCGA",
        "full_name": "The Cancer Genome Atlas",
        "type": "Cancer Genomics",
        "url": "https://gdc.cancer.gov/",
        "description": "Comprehensive cancer genomic data",
        "use_case": "Cancer research datasets"
    },
    "ensembl": {
        "name": "Ensembl",
        "full_name": "Ensembl Genome Browser",
        "type": "Genome Browser",
        "url": "https://www.ensembl.org/",
        "description": "Genome annotation and browser",
        "use_case": "Gene annotation, variants, comparative genomics"
    },
    "gnomad": {
        "name": "gnomAD",
        "full_name": "Genome Aggregation Database",
        "type": "Variant Database",
        "url": "https://gnomad.broadinstitute.org/",
        "description": "Population variant frequencies",
        "use_case": "Variant frequency lookup"
    },
    "clinvar": {
        "name": "ClinVar",
        "full_name": "ClinVar Database",
        "type": "Clinical Database",
        "url": "https://www.ncbi.nlm.nih.gov/clinvar/",
        "description": "Clinical significance of variants",
        "use_case": "Clinical variant interpretation"
    },
    "bioconductor": {
        "name": "Bioconductor",
        "full_name": "Bioconductor Project",
        "type": "Software Repository",
        "url": "https://www.bioconductor.org/",
        "description": "R packages for bioinformatics",
        "use_case": "Find R analysis packages"
    }
}

def print_concept(concept_key):
    """Print detailed concept information."""
    if concept_key not in CONCEPTS:
        print(f"Concept '{concept_key}' not found.")
        return

    c = CONCEPTS[concept_key]
    print(f"\n{'='*60}")
    print(f"{c['name']}: {c['full_name']}")
    print(f"{'='*60}")
    print(f"Category: {c['category']}")
    print(f"Definition: {c['definition']}")
    if 'formula' in c:
        print(f"Formula: {c['formula']}")
    print(f"Use Case: {c['use_case']}")
    if 'related' in c:
        print(f"Related: {', '.join(c['related'])}")

def print_tool(tool_key):
    """Print detailed tool information."""
    if tool_key not in TOOLS:
        print(f"Tool '{tool_key}' not found.")
        return

    t = TOOLS[tool_key]
    print(f"\n{'='*60}")
    print(f"{t['name']}")
    print(f"{'='*60}")
    print(f"Category: {t['category']}")
    print(f"Purpose: {t['purpose']}")
    print(f"Input: {t['input']}")
    print(f"Output: {t['output']}")
    print(f"Installation: {t['installation']}")
    print(f"Use Case: {t['use_case']}")

def print_database(db_key):
    """Print detailed database information."""
    if db_key not in DATABASES:
        print(f"Database '{db_key}' not found.")
        return

    d = DATABASES[db_key]
    print(f"\n{'='*60}")
    print(f"{d['name']}: {d['full_name']}")
    print(f"{'='*60}")
    print(f"Type: {d['type']}")
    print(f"URL: {d['url']}")
    print(f"Description: {d['description']}")
    print(f"Use Case: {d['use_case']}")

def list_by_type(resource_type):
    """List all resources of a type."""
    if resource_type == "concepts":
        print("\n=== CONCEPTS ===\n")
        for key, c in CONCEPTS.items():
            print(f"  {c['name']}: {c['full_name']}")
            print(f"    Category: {c['category']}")
            print(f"    {c['definition']}\n")

    elif resource_type == "tools":
        print("\n=== TOOLS ===\n")
        categories = {}
        for key, t in TOOLS.items():
            cat = t['category']
            if cat not in categories:
                categories[cat] = []
            categories[cat].append(t)

        for cat, tools in sorted(categories.items()):
            print(f"  {cat}:")
            for t in tools:
                print(f"    • {t['name']}: {t['purpose']}")
            print()

    elif resource_type == "databases":
        print("\n=== DATABASES ===\n")
        for key, d in DATABASES.items():
            print(f"  {d['name']}: {d['full_name']}")
            print(f"    {d['url']}")
            print(f"    {d['description']}\n")

def search_resources(query):
    """Search all resources for a keyword."""
    query_lower = query.lower()
    results = {"concepts": [], "tools": [], "databases": []}

    for key, c in CONCEPTS.items():
        text = f"{c['name']} {c['full_name']} {c['category']} {c['definition']}".lower()
        if query_lower in text:
            results["concepts"].append(c['name'])

    for key, t in TOOLS.items():
        text = f"{t['name']} {t['category']} {t['purpose']} {t['use_case']}".lower()
        if query_lower in text:
            results["tools"].append(t['name'])

    for key, d in DATABASES.items():
        text = f"{d['name']} {d['full_name']} {d['type']} {d['description']}".lower()
        if query_lower in text:
            results["databases"].append(d['name'])

    return results

def main():
    parser = argparse.ArgumentParser(
        description="Query bioinformatics resources database",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --type concepts
  %(prog)s --concept "FPKM"
  %(prog)s --tools --category "alignment"
  %(prog)s --search "variant"
        """
    )

    parser.add_argument('--type', choices=['concepts', 'tools', 'databases'],
                       help='List all resources of this type')
    parser.add_argument('--concept', type=str, help='Get detailed info for a concept')
    parser.add_argument('--tool', type=str, help='Get detailed info for a tool')
    parser.add_argument('--database', type=str, help='Get detailed info for a database')
    parser.add_argument('--tools', action='store_true', help='List all tools')
    parser.add_argument('--category', type=str, help='Filter tools by category')
    parser.add_argument('--search', type=str, help='Search all resources')

    args = parser.parse_args()

    if args.type:
        list_by_type(args.type)
        return

    if args.concept:
        print_concept(args.concept.lower())
        return

    if args.tool:
        print_tool(args.tool.lower())
        return

    if args.database:
        print_database(args.database.lower())
        return

    if args.tools:
        if args.category:
            print(f"\nTools in category: {args.category}\n")
            for key, t in TOOLS.items():
                if t['category'].lower() == args.category.lower():
                    print(f"  {t['name']}: {t['purpose']}")
        else:
            list_by_type("tools")
        return

    if args.search:
        results = search_resources(args.search)
        print(f"\nSearch results for '{args.search}':")
        for resource_type, items in results.items():
            if items:
                print(f"\n  {resource_type.capitalize()}: {', '.join(items)}")
        if not any(results.values()):
            print(f"  No results found.")
        return

    parser.print_help()

if __name__ == "__main__":
    main()
