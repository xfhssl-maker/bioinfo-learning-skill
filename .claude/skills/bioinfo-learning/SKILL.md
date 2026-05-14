---
name: bioinfo-learning
description: Use for bioinformatics learning planning, weekly curriculum lookup, concept/tool/database reference, interview question practice, and progress tracking in this repository's learning system. Works against the repository data files and local helper scripts.
allowed-tools: Read Write Edit Bash Glob Grep
license: MIT license
metadata:
    skill-author: Bioinfo Learning Team
---

# Bioinformatics Learning Skill

Use this skill when the user wants to:
- inspect or follow the bioinformatics learning curriculum in this repository
- look up bioinformatics concepts, tools, databases, or file formats
- practice interview questions from the bundled question bank
- track learning progress in `data/dashboard_data.json`
- fetch a week's tasks, examples, or study resources

Do not pretend `/bioinfo ...` is a native command unless you are explicitly invoking one of the bundled scripts yourself.

## Working Rules

1. Treat the repository root `data/` directory as the source of truth.
2. Prefer the unified helper CLI `python scripts/bioinfo.py ...` for deterministic lookup and state updates.
3. Treat `dashboard/` as an optional UI, not as the authoritative backend.
4. Do not claim automatic dashboard synchronization beyond file-based updates to `data/dashboard_data.json`.
5. If the task only needs explanation, answer directly and cite the relevant data file or script.

## Repository Layout

- `data/curriculum.json`: 24-week curriculum
- `data/quick_reference.json`: concepts, tools, databases, file formats
- `data/interview_qa.json`: interview questions and answers
- `data/task_steps.json`: task guide details
- `data/dashboard_data.json`: learner state and progress
- `dashboard/index.html`: optional browser dashboard
- `scripts/`: helper scripts, with `bioinfo.py` as the primary CLI entrypoint
- `references/`: extended background material
- `assets/templates/`: reusable note and README templates

## Primary Workflows

### Weekly curriculum lookup

Use:

```bash
python scripts/bioinfo.py week 5
python scripts/bioinfo.py week 5 --tasks-only
python scripts/bioinfo.py topic "RNA-seq"
python scripts/bioinfo.py list-weeks
```

Use this when the user asks what to study this week, wants tasks for a topic, or wants a curriculum overview.

### Reference lookup

Use:

```bash
python scripts/bioinfo.py list concepts
python scripts/bioinfo.py concept FPKM
python scripts/bioinfo.py tool FastQC
python scripts/bioinfo.py database NCBI
python scripts/bioinfo.py search variant
```

Use this when the user asks for definitions, tool summaries, database guidance, or related references.

### Progress tracking

Use:

```bash
python scripts/bioinfo.py progress --report
python scripts/bioinfo.py progress --week 3
python scripts/bioinfo.py progress --task w1t1 --complete
python scripts/bioinfo.py progress --task w1t2 --start
```

Use this when the user wants to mark tasks, inspect completed work, or review current progress.

### Scenario and interview practice

Use:

```bash
python scripts/bioinfo.py scenario --week 3
python scripts/bioinfo.py scenario --topic RNA-seq
```

For interview questions, read `data/interview_qa.json` directly or filter it in-shell if needed.

## Dashboard

If the user explicitly wants the visual dashboard, use the local dashboard:

```bash
start "" "E:/OpenCode/bioinfo-learning-skill/dashboard/index.html"
```

On systems where `start` is not available, open `dashboard/index.html` with the platform-appropriate command.

Only present this as an optional UI. The durable state is `data/dashboard_data.json`.

## References To Load On Demand

Read only the relevant file:

- `references/curriculum_overview.md`: detailed learning path explanation
- `references/concepts_reference.md`: broader concept notes
- `references/tools_reference.md`: tool descriptions
- `references/databases_reference.md`: database notes
- `references/interview_questions.md`: interview preparation material
- `references/data_skills_methodology.md`: learning methodology

## Assets

- `assets/templates/learning_note_template.md`
- `assets/templates/project_readme_template.md`
- `assets/examples/rnaseq_workflow_example.md`

Use these only when the user asks to generate notes, project scaffolds, or study examples.
