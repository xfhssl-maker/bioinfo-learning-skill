#!/usr/bin/env python3
"""
Query Content Script
Search and retrieve curriculum content by week, topic, or skill level.

Usage:
    python query_content.py --week 5
    python query_content.py --topic "RNA-seq"
    python query_content.py --level beginner
    python query_content.py --week 5 --tasks-only
"""

import argparse
import json
import os
from pathlib import Path

# Curriculum data
CURRICULUM = {
    "phases": [
        {"id": 1, "name": "Foundation", "weeks": "1-8", "goal": "Basic skills + First project", "role": "Intern"},
        {"id": 2, "name": "Core Bioinformatics", "weeks": "9-16", "goal": "Core skills + Standard project", "role": "Junior Analyst"},
        {"id": 3, "name": "Advanced", "weeks": "17-20", "goal": "Advanced project + Portfolio", "role": "Mid-level Analyst"},
        {"id": 4, "name": "Job Prep", "weeks": "21-24", "goal": "Interview prep + Career", "role": "Job Seeker"}
    ],
    "weeks": {
        1: {
            "title": "Environment Setup + Linux Basics",
            "difficulty": "★☆☆☆☆",
            "learning_hours": 10,
            "practice_hours": 5,
            "topics": ["Install Linux/WSL2", "Basic commands: ls, cd, mkdir, cp, mv, rm, cat, head, tail"],
            "phase": 1,
            "cognitive_levels": {
                "remember": ["Memorize 10 basic Linux commands"],
                "understand": ["Understand file system structure"],
                "apply": ["Operate files and directories in terminal"],
                "analyze": ["Compare different command use cases"],
                "evaluate": ["Assess command execution correctness"],
                "create": ["Design project directory structure"]
            },
            "scenario": {
                "title": "First Day at Work",
                "background": "First day, mentor asks you to login to server",
                "role": "Intern",
                "tasks": ["SSH login", "Check server config", "Create workspace"],
                "time_limit": "30 minutes"
            },
            "tasks": [
                {"id": "w1t1", "desc": "Register GitHub account, create bioinfo-learning repo", "cognitive": "apply", "time": "15 min"},
                {"id": "w1t2", "desc": "Register Gitee account", "cognitive": "apply", "time": "10 min"},
                {"id": "w1t3", "desc": "Create project directory structure", "cognitive": "create", "time": "30 min"},
                {"id": "w1t4", "desc": "Write first learning note", "cognitive": "understand", "time": "30 min"},
                {"id": "w1t5", "desc": "Commit to GitHub", "cognitive": "apply", "time": "20 min"}
            ]
        },
        2: {
            "title": "Linux Advanced + Shell Scripting",
            "difficulty": "★★☆☆☆",
            "learning_hours": 10,
            "practice_hours": 5,
            "topics": ["Text processing: grep, awk, sed", "Pipes and redirection", "Loops and conditionals"],
            "phase": 1,
            "cognitive_levels": {
                "remember": ["Memorize grep, awk, sed basic syntax"],
                "understand": ["Understand pipes and redirection"],
                "apply": ["Use grep to filter FASTQ sequences"],
                "analyze": ["Compare grep vs awk use cases"],
                "evaluate": ["Assess script efficiency and readability"],
                "create": ["Write batch FASTQ processing script"]
            },
            "scenario": {
                "title": "Batch QC Task",
                "background": "Received 50 samples, need QC reports",
                "role": "Intern",
                "tasks": ["Count reads per file", "Extract GC content", "Batch rename", "Generate summary CSV"],
                "time_limit": "2 hours"
            }
        },
        3: {
            "title": "R Basics",
            "difficulty": "★★☆☆☆",
            "learning_hours": 12,
            "practice_hours": 6,
            "topics": ["Install R and RStudio", "Variables, vectors, matrices, data frames"],
            "phase": 1
        },
        4: {
            "title": "R Data Processing + ggplot2",
            "difficulty": "★★★☆☆",
            "learning_hours": 12,
            "practice_hours": 6,
            "topics": ["tidyverse suite", "Data reshaping", "Visualization"],
            "phase": 1
        },
        5: {
            "title": "Python Basics",
            "difficulty": "★★☆☆☆",
            "learning_hours": 12,
            "practice_hours": 6,
            "topics": ["Install Anaconda/Miniconda", "Variables, lists, dictionaries, functions"],
            "phase": 1
        },
        6: {
            "title": "Python Advanced",
            "difficulty": "★★★☆☆",
            "learning_hours": 12,
            "practice_hours": 6,
            "topics": ["OOP", "File I/O", "numpy, pandas"],
            "phase": 1
        },
        7: {
            "title": "Git + Version Control",
            "difficulty": "★★☆☆☆",
            "learning_hours": 8,
            "practice_hours": 4,
            "topics": ["Git basics", "Branching and merging", "Collaboration"],
            "phase": 1
        },
        8: {
            "title": "Statistics Fundamentals",
            "difficulty": "★★★☆☆",
            "learning_hours": 12,
            "practice_hours": 6,
            "topics": ["Descriptive statistics", "Hypothesis testing", "Multiple testing correction"],
            "phase": 1
        },
        9: {
            "title": "Sequence Basics + BLAST",
            "difficulty": "★★★☆☆",
            "learning_hours": 10,
            "practice_hours": 5,
            "topics": ["FASTA/FASTQ formats", "Sequence manipulation", "BLAST searching"],
            "phase": 2
        },
        10: {
            "title": "RNA-seq Raw Data Processing",
            "difficulty": "★★★☆☆",
            "learning_hours": 12,
            "practice_hours": 8,
            "topics": ["FASTQ QC", "FastQC", "Trimming (Trimmomatic/fastp)"],
            "phase": 2
        },
        11: {
            "title": "RNA-seq Alignment + Quantification",
            "difficulty": "★★★★☆",
            "learning_hours": 12,
            "practice_hours": 8,
            "topics": ["HISAT2/STAR alignment", "featureCounts/HTSeq", "Quality assessment"],
            "phase": 2
        },
        12: {
            "title": "Differential Expression Analysis",
            "difficulty": "★★★★☆",
            "learning_hours": 12,
            "practice_hours": 8,
            "topics": ["DESeq2 workflow", "Normalization", "Result interpretation"],
            "phase": 2
        },
        13: {
            "title": "Variant Calling Basics",
            "difficulty": "★★★★☆",
            "learning_hours": 12,
            "practice_hours": 8,
            "topics": ["VCF format", "GATK best practices", "Variant annotation"],
            "phase": 2
        },
        14: {
            "title": "Variant Analysis + Annotation",
            "difficulty": "★★★★☆",
            "learning_hours": 12,
            "practice_hours": 8,
            "topics": ["SnpEff/VEP annotation", "Variant filtering", "Functional interpretation"],
            "phase": 2
        },
        15: {
            "title": "Database Resources",
            "difficulty": "★★★☆☆",
            "learning_hours": 10,
            "practice_hours": 6,
            "topics": ["GEO database", "TCGA data", "Ensembl/UCSC Genome Browser"],
            "phase": 2
        },
        16: {
            "title": "Project Week",
            "difficulty": "★★★★☆",
            "learning_hours": 8,
            "practice_hours": 16,
            "topics": ["Complete RNA-seq analysis"],
            "phase": 2
        },
        17: {
            "title": "Multi-omics Integration",
            "difficulty": "★★★★★",
            "learning_hours": 10,
            "practice_hours": 10,
            "topics": ["Multi-omics data types", "Integration methods"],
            "phase": 3
        },
        18: {
            "title": "Machine Learning Applications",
            "difficulty": "★★★★★",
            "learning_hours": 12,
            "practice_hours": 8,
            "topics": ["Classification and clustering", "Feature selection"],
            "phase": 3
        },
        19: {
            "title": "Pipeline Development",
            "difficulty": "★★★★★",
            "learning_hours": 10,
            "practice_hours": 10,
            "topics": ["Snakemake/Nextflow", "Docker containerization"],
            "phase": 3
        },
        20: {
            "title": "Research Project",
            "difficulty": "★★★★★",
            "learning_hours": 8,
            "practice_hours": 16,
            "topics": ["Independent research project"],
            "phase": 3
        },
        21: {
            "title": "Portfolio Building",
            "difficulty": "★★★☆☆",
            "learning_hours": 8,
            "practice_hours": 12,
            "topics": ["GitHub portfolio", "Project documentation"],
            "phase": 4
        },
        22: {
            "title": "Resume + Cover Letter",
            "difficulty": "★★☆☆☆",
            "learning_hours": 8,
            "practice_hours": 8,
            "topics": ["Resume writing", "Cover letter crafting"],
            "phase": 4
        },
        23: {
            "title": "Technical Interview Prep",
            "difficulty": "★★★★☆",
            "learning_hours": 10,
            "practice_hours": 10,
            "topics": ["Technical questions", "Coding challenges"],
            "phase": 4
        },
        24: {
            "title": "Mock Interviews + Career Planning",
            "difficulty": "★★★☆☆",
            "learning_hours": 8,
            "practice_hours": 12,
            "topics": ["Mock interviews", "Salary negotiation"],
            "phase": 4
        }
    }
}

def get_skill_path():
    """Get the path to the bioinfo-learning skill directory."""
    script_dir = Path(__file__).parent
    skill_dir = script_dir.parent
    return skill_dir

def get_week_content(week_num):
    """Get content for a specific week."""
    if week_num not in CURRICULUM["weeks"]:
        return None

    week_data = CURRICULUM["weeks"][week_num]

    # Get phase info
    phase_id = week_data.get("phase", 1)
    phase_info = next((p for p in CURRICULUM["phases"] if p["id"] == phase_id), None)

    return {
        "week": week_num,
        "phase": phase_info,
        "content": week_data
    }

def search_by_topic(topic):
    """Search weeks by topic keyword."""
    topic_lower = topic.lower()
    results = []

    for week_num, week_data in CURRICULUM["weeks"].items():
        # Search in topics
        topics_text = " ".join(week_data.get("topics", [])).lower()
        title_text = week_data.get("title", "").lower()

        if topic_lower in topics_text or topic_lower in title_text:
            results.append({
                "week": week_num,
                "title": week_data.get("title"),
                "relevance": "high" if topic_lower in title_text else "medium"
            })

    return results

def get_by_level(level):
    """Get weeks by difficulty level."""
    level_map = {
        "beginner": ["★☆☆☆☆", "★★☆☆☆"],
        "intermediate": ["★★★☆☆", "★★★★☆"],
        "advanced": ["★★★★★"]
    }

    target_difficulties = level_map.get(level.lower(), [])
    results = []

    for week_num, week_data in CURRICULUM["weeks"].items():
        if week_data.get("difficulty") in target_difficulties:
            results.append({
                "week": week_num,
                "title": week_data.get("title"),
                "difficulty": week_data.get("difficulty")
            })

    return results

def print_week_info(week_data, tasks_only=False, cognitive=False, scenario=False):
    """Print formatted week information."""
    content = week_data["content"]

    print(f"\n{'='*60}")
    print(f"Week {week_data['week']}: {content.get('title', 'N/A')}")
    print(f"{'='*60}")

    if content.get("phase"):
        phase_info = week_data.get("phase")
        if phase_info:
            print(f"Phase: {phase_info['name']} (Role: {phase_info['role']})")

    print(f"Difficulty: {content.get('difficulty', 'N/A')}")
    print(f"Time: {content.get('learning_hours', 0)}h learning + {content.get('practice_hours', 0)}h practice")

    if not tasks_only:
        print(f"\nTopics:")
        for topic in content.get("topics", []):
            print(f"  • {topic}")

    if cognitive and "cognitive_levels" in content:
        print(f"\nCognitive Levels:")
        for level, items in content["cognitive_levels"].items():
            print(f"  {level.capitalize()}:")
            for item in items:
                print(f"    - {item}")

    if scenario and "scenario" in content:
        s = content["scenario"]
        print(f"\nScenario: {s.get('title', 'N/A')}")
        print(f"  Background: {s.get('background', 'N/A')}")
        print(f"  Role: {s.get('role', 'N/A')}")
        print(f"  Tasks: {', '.join(s.get('tasks', []))}")
        print(f"  Time Limit: {s.get('time_limit', 'N/A')}")

    if "tasks" in content:
        print(f"\nTasks:")
        for task in content["tasks"]:
            print(f"  [{task.get('cognitive', '?')}] {task.get('desc')} ({task.get('time', '?')})")

def print_all_weeks():
    """Print overview of all weeks."""
    print("\n" + "="*60)
    print("24-WEEK BIOINFORMATICS CURRICULUM")
    print("="*60)

    for phase in CURRICULUM["phases"]:
        print(f"\nPhase {phase['id']}: {phase['name']}")
        print(f"  Goal: {phase['goal']}")
        print(f"  Role: {phase['role']}")
        print(f"  Weeks: {phase['weeks']}")

        # Get weeks for this phase
        start, end = map(int, phase['weeks'].split('-'))
        for w in range(start, end + 1):
            if w in CURRICULUM["weeks"]:
                week_data = CURRICULUM["weeks"][w]
                print(f"    Week {w}: {week_data.get('title')} {week_data.get('difficulty', '')}")

def main():
    parser = argparse.ArgumentParser(
        description="Query bioinformatics curriculum content",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --week 5
  %(prog)s --topic "RNA-seq"
  %(prog)s --level beginner
  %(prog)s --week 5 --tasks-only --cognitive
  %(prog)s --list-all
        """
    )

    parser.add_argument('--week', type=int, choices=range(1, 25), help='Week number (1-24)')
    parser.add_argument('--topic', type=str, help='Search by topic keyword')
    parser.add_argument('--level', type=str, choices=['beginner', 'intermediate', 'advanced'],
                       help='Filter by difficulty level')
    parser.add_argument('--tasks-only', action='store_true', help='Show only tasks')
    parser.add_argument('--cognitive', action='store_true', help='Show cognitive levels')
    parser.add_argument('--scenario', action='store_true', help='Show scenario')
    parser.add_argument('--list-all', action='store_true', help='List all weeks overview')

    args = parser.parse_args()

    if args.list_all:
        print_all_weeks()
        return

    if args.week:
        week_data = get_week_content(args.week)
        if week_data:
            print_week_info(week_data, args.tasks_only, args.cognitive, args.scenario)
        else:
            print(f"No content found for week {args.week}")
        return

    if args.topic:
        results = search_by_topic(args.topic)
        if results:
            print(f"\nFound {len(results)} week(s) matching '{args.topic}':")
            for r in sorted(results, key=lambda x: x["week"]):
                print(f"  Week {r['week']}: {r['title']}")
        else:
            print(f"No weeks found matching '{args.topic}'")
        return

    if args.level:
        results = get_by_level(args.level)
        if results:
            print(f"\nWeeks at {args.level} level:")
            for r in sorted(results, key=lambda x: x["week"]):
                print(f"  Week {r['week']}: {r['title']} ({r['difficulty']})")
        else:
            print(f"No weeks found at {args.level} level")
        return

    parser.print_help()

if __name__ == "__main__":
    main()
