#!/usr/bin/env python3
"""
Unified CLI for the bioinfo-learning skill helpers.

Examples:
    python scripts/bioinfo.py week 5
    python scripts/bioinfo.py topic RNA-seq
    python scripts/bioinfo.py concept FPKM
    python scripts/bioinfo.py tool FastQC
    python scripts/bioinfo.py database NCBI
    python scripts/bioinfo.py progress --report
    python scripts/bioinfo.py progress --task w1t1 --complete
    python scripts/bioinfo.py scenario --week 8
"""

import argparse
import subprocess
import sys
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
PYTHON = sys.executable


def run(script_name: str, args: list[str]) -> int:
    script_path = SCRIPT_DIR / script_name
    cmd = [PYTHON, str(script_path), *args]
    completed = subprocess.run(cmd, check=False)
    return completed.returncode


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Unified CLI for bioinfo-learning helpers")
    subparsers = parser.add_subparsers(dest="command")

    week_parser = subparsers.add_parser("week", help="Show a specific week")
    week_parser.add_argument("week", type=int)
    week_parser.add_argument("--tasks-only", action="store_true")

    topic_parser = subparsers.add_parser("topic", help="Search curriculum by topic")
    topic_parser.add_argument("topic", type=str)

    level_parser = subparsers.add_parser("level", help="Filter weeks by difficulty bucket")
    level_parser.add_argument("level", choices=["beginner", "intermediate", "advanced"])

    subparsers.add_parser("list-weeks", help="List all weeks")

    concept_parser = subparsers.add_parser("concept", help="Look up a concept")
    concept_parser.add_argument("concept", type=str)

    tool_parser = subparsers.add_parser("tool", help="Look up a tool")
    tool_parser.add_argument("tool", type=str)

    database_parser = subparsers.add_parser("database", help="Look up a database")
    database_parser.add_argument("database", type=str)

    search_parser = subparsers.add_parser("search", help="Search the reference database")
    search_parser.add_argument("query", type=str)

    type_parser = subparsers.add_parser("list", help="List a reference section")
    type_parser.add_argument("section", choices=["concepts", "tools", "databases", "file_formats"])

    scenario_parser = subparsers.add_parser("scenario", help="Get a week or topic scenario")
    scenario_group = scenario_parser.add_mutually_exclusive_group(required=True)
    scenario_group.add_argument("--week", type=int)
    scenario_group.add_argument("--topic", type=str)

    progress_parser = subparsers.add_parser("progress", help="Inspect or update progress")
    progress_parser.add_argument("--report", action="store_true")
    progress_parser.add_argument("--week", type=int)
    progress_parser.add_argument("--task", type=str)
    progress_mode = progress_parser.add_mutually_exclusive_group()
    progress_mode.add_argument("--start", action="store_true")
    progress_mode.add_argument("--complete", action="store_true")

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    if args.command == "week":
        forwarded = ["--week", str(args.week)]
        if args.tasks_only:
            forwarded.append("--tasks-only")
        return run("query_content.py", forwarded)

    if args.command == "topic":
        return run("query_content.py", ["--topic", args.topic])

    if args.command == "level":
        return run("query_content.py", ["--level", args.level])

    if args.command == "list-weeks":
        return run("query_content.py", ["--list-all"])

    if args.command == "concept":
        return run("query_resources.py", ["--concept", args.concept])

    if args.command == "tool":
        return run("query_resources.py", ["--tool", args.tool])

    if args.command == "database":
        return run("query_resources.py", ["--database", args.database])

    if args.command == "search":
        return run("query_resources.py", ["--search", args.query])

    if args.command == "list":
        return run("query_resources.py", ["--type", args.section])

    if args.command == "scenario":
        if args.week is not None:
            return run("get_scenario.py", ["--week", str(args.week)])
        return run("get_scenario.py", ["--topic", args.topic])

    if args.command == "progress":
        forwarded: list[str] = []
        if args.report:
            forwarded.append("--report")
        if args.week is not None:
            forwarded.extend(["--week", str(args.week)])
        if args.task:
            forwarded.extend(["--task", args.task])
        if args.start:
            forwarded.append("--start")
        if args.complete:
            forwarded.append("--complete")
        if not forwarded:
            parser.error("progress requires one of --report, --week, or task action flags")
        return run("track_progress.py", forwarded)

    parser.print_help()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
