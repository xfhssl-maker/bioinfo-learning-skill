---
name: bioinfo-learning
description: A comprehensive 24-week bioinformatics learning curriculum with 4C framework integration (Content, Cognitive, Collaborative, Contextual). Provides structured learning paths, real-world scenarios, practice tasks, and skill tracking for aspiring bioinformaticians.
allowed-tools: Read Write Edit Bash Glob Grep
license: MIT license
metadata:
    skill-author: Bioinfo Learning Team
---

# Bioinformatics Learning Skill

## Overview

This skill provides a comprehensive 24-week bioinformatics learning curriculum designed for aspiring bioinformaticians. The curriculum integrates the 4C learning framework (Content, Cognitive, Collaborative, Contextual) to ensure deep understanding and practical skill development.

Use this skill when:
- Planning and tracking bioinformatics learning progress
- Looking up concepts, tools, and databases used in bioinformatics
- Preparing for bioinformatics interviews
- Setting up practice scenarios and tasks
- Finding relevant learning resources and case studies

## When to Use This Skill

This skill should be used when:
- Starting a bioinformatics learning journey
- Planning weekly learning activities
- Looking up bioinformatics concepts and their applications
- Preparing for job interviews in bioinformatics
- Setting up practice environments
- Finding relevant papers and case studies
- Tracking skill development progress

## Core Capabilities

### 1. Structured Curriculum (25 Weeks)

A complete learning path organized into 5 phases:

**Phase 1: Foundation (Weeks 1-8)**
- Linux basics and Shell scripting
- R and Python programming
- Version control with Git
- Basic statistics and algorithms

**Phase 2: Core Bioinformatics (Weeks 9-16)**
- Sequence analysis and alignment
- RNA-seq data analysis
- Variant calling and annotation
- Database searching and annotation

**Phase 3: Advanced Projects (Weeks 17-20)**
- Multi-omics integration
- Machine learning applications
- Pipeline development
- Research project execution

**Phase 4: Job Preparation (Weeks 21-24)**
- Interview preparation
- Portfolio building
- Resume and cover letter
- Career planning

**Phase 5: AI-Assisted Analysis (Week 25)**
- AI tools for bioinformatics
- Claude Code setup and usage
- Integrating AI into analysis workflows
- Critical evaluation of AI outputs

### 2. 4C Framework Integration

Each week's content is structured around four dimensions:

**Content (内容)**
- Biological background and context
- Why this topic matters
- Real-world scenarios and industry standards

**Cognitive (认知)**
- Bloom's taxonomy levels
- From remembering to creating
- Progressive skill development

**Collaborative (协作)**
- Pair programming exercises
- Group discussions
- Code review checklists

**Contextual (情境)**
- Real-world scenario simulations
- Role-based tasks
- Professional deliverables

### 3. Resource Center

Comprehensive collection of learning resources:

**Core Concepts**
- FPKM, TPM, FDR, log2FC
- Phred score, VCF, BAM formats
- PCA, UMAP, t-SNE

**Tools & Software**
- FastQC, HISAT2, STAR
- featureCounts, DESeq2, edgeR
- GATK, SnpEff, VEP
- SAMtools, BCFtools

**Public Databases**
- GEO, TCGA, ENCODE
- Ensembl, UCSC Genome Browser
- gnomAD, ClinVar, dbSNP
- Bioconductor, CRAN

**File Formats**
- FASTQ, FASTA
- BAM/CRAM, SAM
- GTF/GFF, BED
- VCF, BCF

### 4. Case Studies Library

Weekly case studies linking to real research papers:
- Paper metadata (title, authors, journal, DOI)
- Research summary and key findings
- Methods and tools used
- Learning connections to weekly topics
- Key takeaways for students

### 5. Interview Preparation

Structured interview prep materials:
- Common technical questions
- Coding challenges
- Scenario-based questions
- Behavioral questions
- Mock interview scripts

## Workflow: Using This Skill

### Step 1: Access Learning Dashboard

Open the interactive dashboard:

```bash
# Open dashboard in browser
open dashboard/index.html
```

The dashboard provides:
- Weekly learning progress
- Task management
- Pomodoro timer
- Skill heatmap
- Quick notes

### Step 2: Query Learning Content

Access specific week content:

```bash
# Query specific week's content
python scripts/query_content.py --week 5

# Query by topic
python scripts/query_content.py --topic "RNA-seq"

# Query by skill level
python scripts/query_content.py --level beginner
```

### Step 3: Access Resources

Browse the resource center:

```bash
# List all concepts
python scripts/query_resources.py --type concepts

# List all tools
python scripts/query_resources.py --type tools

# List all databases
python scripts/query_resources.py --type databases

# Search by keyword
python scripts/query_resources.py --search "alignment"
```

### Step 4: Practice Scenarios

Set up practice scenarios:

```bash
# Get scenario for specific week
python scripts/get_scenario.py --week 3

# Get all scenarios by type
python scripts/get_scenario.py --type "data-cleaning"
```

### Step 5: Track Progress

Update and track progress:

```bash
# Mark task complete
python scripts/track_progress.py --task w1t1 --complete

# Get progress report
python scripts/track_progress.py --report
```

## Integration with Other Skills

This skill works well with:

### Scientific Writing
- Use for writing learning notes
- Blog post templates
- Technical documentation

### Literature Review
- Find relevant papers for case studies
- Understand research methods
- Learn from published analyses

### Code Development
- Practice coding exercises
- Develop analysis pipelines
- Build portfolio projects

## Resource Categories

### By Learning Phase

| Phase | Duration | Focus | Role |
|-------|----------|-------|------|
| **Foundation** | Weeks 1-8 | Basic skills + First project | Intern |
| **Core** | Weeks 9-16 | Core bioinfo + Standard project | Junior Analyst |
| **Advanced** | Weeks 17-20 | Advanced project + Portfolio | Mid-level Analyst |
| **Job Prep** | Weeks 21-24 | Interview prep + Career | Job Seeker |
| **AI Integration** | Week 25 | AI tools + Future skills | AI-Enhanced Analyst |

### By Skill Area

| Area | Topics | Tools |
|------|--------|-------|
| **Programming** | Linux, R, Python, Git | Bash, RStudio, VSCode |
| **Statistics** | Basic stats, Multiple testing, Regression | R, Python |
| **Sequence Analysis** | Alignment, BLAST, Assembly | BLAST, BWA, HISAT2 |
| **RNA-seq** | QC, Alignment, Quantification, DEG | FastQC, STAR, DESeq2 |
| **Variant Calling** | SNPs, Indels, SVs | GATK, FreeBayes |
| **Databases** | GEO, TCGA, Ensembl | R/Bioconductor |
| **Visualization** | ggplot2, heatmaps, PCA | R, Python |
| **AI Tools** | Claude Code, Skills, AI-assisted analysis | Claude Code, GitHub Copilot |

## Helper Scripts

### query_content.py

Search and retrieve curriculum content:

```bash
# Get specific week content
python scripts/query_content.py --week 5

# Get all tasks for a week
python scripts/query_content.py --week 5 --tasks-only

# Get cognitive levels for a week
python scripts/query_content.py --week 5 --cognitive

# Get scenario for a week
python scripts/query_content.py --week 5 --scenario
```

### query_resources.py

Search the resource database:

```bash
# List all concepts
python scripts/query_resources.py --type concepts

# Get detailed concept info
python scripts/query_resources.py --concept "FPKM"

# List tools by category
python scripts/query_resources.py --tools --category "alignment"

# Search all resources
python scripts/query_resources.py --search "variant"
```

### track_progress.py

Track learning progress:

```bash
# Mark task complete
python scripts/track_progress.py --task w1t1 --complete

# Mark task in progress
python scripts/track_progress.py --task w1t2 --start

# Get weekly progress
python scripts/track_progress.py --week 1

# Get overall progress report
python scripts/track_progress.py --report
```

### get_scenario.py

Get practice scenarios:

```bash
# Get scenario for specific week
python scripts/get_scenario.py --week 3

# Get all scenarios of a type
python scripts/get_scenario.py --type "rnaseq"

# Get scenario with solution hints
python scripts/get_scenario.py --week 3 --hints
```

## Best Practices

### Learning Approach
1. **Follow the sequence**: Weeks are designed to build upon each other
2. **Complete all tasks**: Each task has a specific learning purpose
3. **Write reflections**: Self-assessment is crucial for growth
4. **Build in public**: Blog about your learning journey
5. **Practice daily**: Consistency beats intensity

### Using the Dashboard
1. **Track time**: Use the Pomodoro timer for focused learning
2. **Update progress**: Mark tasks as complete when done
3. **Take notes**: Use the quick notes feature
4. **Review heatmap**: Visualize your learning patterns

### Preparing for Interviews
1. **Review fundamentals**: Core concepts appear in most interviews
2. **Practice coding**: Be ready for live coding challenges
3. **Know your projects**: Be able to explain every detail
4. **Prepare questions**: Show genuine interest in the role

## Learning Philosophy

### The 4C Framework

**Content (内容)**: What you learn
- Biological context provides the "why"
- Real scenarios show practical application
- Industry standards prepare for the workplace

**Cognitive (认知)**: How deeply you learn
- Progressive difficulty through Bloom's taxonomy
- From remembering facts to creating solutions
- Each level builds on the previous

**Collaborative (协作)**: Learning with others
- Pair programming develops teamwork skills
- Code reviews teach quality standards
- Discussions broaden perspectives

**Contextual (情境)**: Learning in realistic settings
- Scenario simulations prepare for real work
- Role-based tasks develop professional identity
- Deliverables mirror workplace expectations

### Skill Development Path

```
Week 1-8: Foundation
    └── Goal: Basic skills + First project
    └── Role: Intern
    └── Output: Personal learning repo

Week 9-16: Core Skills
    └── Goal: Standard analysis pipelines
    └── Role: Junior Analyst
    └── Output: Analysis projects

Week 17-20: Advanced
    └── Goal: Complex multi-omics projects
    └── Role: Mid-level Analyst
    └── Output: Portfolio pieces

Week 21-24: Job Prep
    └── Goal: Land first bioinfo job
    └── Role: Job Seeker
    └── Output: Interview-ready profile

Week 25: AI Integration
    └── Goal: Master AI-assisted analysis
    └── Role: AI-Enhanced Analyst
    └── Output: Personal AI workflow
```

---

## Resources

### Bundled Resources

**Learning References** (in `references/`):
- `curriculum_overview.md`: Full 24-week curriculum details
- `concepts_reference.md`: Bioinformatics concepts dictionary
- `tools_reference.md`: Tools and software guide
- `databases_reference.md`: Public databases guide
- `interview_questions.md`: Interview preparation materials
- `data_skills_methodology.md`: Data skills learning methodology
- `skill_development_guide.md`: How to create Claude skill repositories

**Learning Examples** (in `assets/examples/`):
- `linux_basics_examples.md`: Linux command examples
- `r_analysis_examples.md`: R analysis code examples
- `python_pipeline_examples.md`: Python pipeline examples
- `rnaseq_workflow_example.md`: Complete RNA-seq workflow
- `variant_calling_example.md`: Variant calling pipeline

**Templates** (in `assets/templates/`):
- `learning_note_template.md`: Template for learning notes
- `project_readme_template.md`: Template for project READMEs
- `analysis_report_template.md`: Template for analysis reports
- `blog_post_template.md`: Template for blog posts

**Scripts** (in `scripts/`):
- `query_content.py`: Query curriculum content
- `query_resources.py`: Query resources database
- `track_progress.py`: Track learning progress
- `get_scenario.py`: Get practice scenarios

### External Resources

**Learning Platforms**:
- Biostars: https://www.biostars.org/
- Rosalind: http://rosalind.info/
- DataCamp: https://www.datacamp.com/
- Coursera Bioinformatics: https://www.coursera.org/specializations/bioinformatics

**Documentation**:
- Bioconductor: https://www.bioconductor.org/
- GATK Best Practices: https://gatk.broadinstitute.org/hc/en-us
- Ensembl Help: https://www.ensembl.org/info/index.html

**Community**:
- Biostars Forum: https://www.biostars.org/
- Bioinformatics Stack Exchange: https://bioinformatics.stackexchange.com/
- Reddit r/bioinformatics: https://www.reddit.com/r/bioinformatics/

## Example Usage

### Example 1: Starting Week 1

```markdown
User: "I'm starting the bioinformatics learning journey. What should I do for Week 1?"

Response:
1. Load Week 1 content (references/curriculum_overview.md)
2. Key topics:
   - Environment setup (Linux/WSL2)
   - Basic Linux commands
   - Git and GitHub setup
3. Tasks to complete:
   - Register GitHub account
   - Create learning repository
   - Set up project structure
   - Write first learning note
4. Scenario: "First Day at Work"
   - Role: Intern
   - Task: Login to server, check config, create workspace
5. Resources:
   - 生信技能树 Linux视频
   - Shell scripting tutorial
```

### Example 2: Learning RNA-seq Analysis

```markdown
User: "I want to learn RNA-seq analysis. Which weeks cover this?"

Response:
From curriculum:
- Week 10: RNA-seq raw data processing
- Week 11: RNA-seq alignment and quantification
- Week 12: Differential expression analysis

For Week 10, you'll learn:
- FASTQ format and quality control
- Using FastQC for QC
- Trimming with Trimmomatic/fastp
- Running first alignment

Key concepts:
- FPKM vs TPM normalization
- Quality metrics (Phred scores)
- Adapter contamination

Tools covered:
- FastQC, MultiQC
- HISAT2/STAR
- featureCounts
```

### Example 3: Preparing for Interview

```markdown
User: "I have a bioinformatics interview next week. How should I prepare?"

Response:
From references/interview_questions.md:

1. Technical Questions (review these areas):
   - Linux commands and scripting
   - R and Python basics
   - Statistics concepts
   - RNA-seq pipeline steps
   - Variant calling workflow

2. Coding Practice:
   - Rosalind problems
   - LeetCode easy/medium
   - Bioinformatics-specific challenges

3. Scenario Questions:
   - "How would you handle a batch effect?"
   - "Walk me through an RNA-seq analysis"
   - "How do you validate your results?"

4. Questions to Ask:
   - What analysis pipelines do you use?
   - What's the team structure?
   - What technologies are in your stack?
```

## Updates and Maintenance

**Content Currency**:
- Curriculum reviewed quarterly
- Tools and databases updated as needed
- Case studies added monthly

**Reporting Issues**:
- Broken resource links
- Outdated tool versions
- Content suggestions
- Bug reports

## Summary

The bioinfo-learning skill provides:

1. **24-week structured curriculum** with progressive skill development
2. **4C framework integration** for deep learning
3. **Comprehensive resource library** of concepts, tools, and databases
4. **Case study library** linking to real research papers
5. **Interview preparation** materials and practice questions
6. **Interactive dashboard** for tracking progress
7. **Helper scripts** for content discovery and progress tracking

Use this skill whenever you need guidance on bioinformatics learning, concept explanations, or interview preparation.

---

## Acknowledgments

This skill repository was developed with reference to the following resources:

### Skill Structure Reference
- **[claude-scientific-skills/venue-templates](https://github.com/K-Dense-AI/claude-scientific-skills/tree/main/scientific-skills/venue-templates)**: Provided the standard structure for Claude skill repository development, including SKILL.md format, directory organization, and helper scripts pattern.

### Learning Methodology Reference
- **[ShenChen-bioUtopia/Bioinformatics-data-skills](https://github.com/ShenChen-bioUtopia/Bioinformatics-data-skills)**: Chinese translation of "Bioinformatics Data Skills" by Vince Buffalo. This resource provides the foundational methodology for learning bioinformatics through data skills development, emphasizing:
  - Command line proficiency
  - Scripting and automation
  - Version control with Git
  - Understanding data formats
  - Critical evaluation of tool outputs
  - Reproducible research practices

### Key Concepts Adopted

From **Bioinformatics-data-skills**:
- Data skills are transferable; tools change but skills persist
- Learn to critically evaluate bioinformatics program outputs
- Robust and reproducible research practices
- Project structure and documentation standards

From **claude-scientific-skills**:
- Standardized SKILL.md format with YAML metadata
- References/Scripts/Assets directory structure
- Helper scripts for content querying
- Integration patterns with other skills

---

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to:
- Add new learning resources
- Update tool references
- Improve documentation
- Report bugs in scripts
