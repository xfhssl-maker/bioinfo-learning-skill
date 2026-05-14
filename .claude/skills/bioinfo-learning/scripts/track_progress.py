#!/usr/bin/env python3
"""
Track learning progress in data/dashboard_data.json.

Usage:
    python track_progress.py --report
    python track_progress.py --week 3
    python track_progress.py --task w1t1 --complete
    python track_progress.py --task w1t2 --start
"""

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


def project_root() -> Path:
    return Path(__file__).resolve().parents[4]


def dashboard_path() -> Path:
    return project_root() / "data" / "dashboard_data.json"


def curriculum_path() -> Path:
    return project_root() / "data" / "curriculum.json"


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, data: dict) -> None:
    data["_meta"]["last_updated"] = datetime.now(timezone.utc).isoformat()
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def find_week_for_task(curriculum: dict, task_id: str) -> dict | None:
    for week in curriculum["curriculum"]:
        for task in week.get("tasks", []):
            if task.get("id") == task_id:
                return week
    return None


def print_report(data: dict) -> None:
    user = data.get("user", {})
    progress = data.get("progress", {})
    print("\n=== Progress Report ===\n")
    print(f"User: {user.get('name') or 'Unnamed learner'}")
    print(f"Current week: {user.get('current_week', 1)}")
    print(f"Current phase: {user.get('current_phase', 1)}")
    print(f"Total hours: {progress.get('total_hours', 0)}")
    print(f"Total EXP: {progress.get('total_exp', 0)}")
    print(f"Completed tasks: {len(progress.get('completed_tasks', []))}")
    print(f"Completed projects: {len(progress.get('completed_projects', []))}")
    print(f"Interview practiced: {progress.get('interview_practiced', 0)}")


def print_week_progress(data: dict, curriculum: dict, week_num: int) -> None:
    week = next((item for item in curriculum["curriculum"] if item["week"] == week_num), None)
    if not week:
        print(f"Week {week_num} not found.")
        return
    completed = set(data["progress"].get("completed_tasks", []))
    tasks = week.get("tasks", [])
    done_count = sum(1 for task in tasks if task.get("id") in completed)
    print(f"\n=== Week {week_num}: {week.get('title', '')} ===\n")
    print(f"Completed {done_count}/{len(tasks)} tasks")
    for task in tasks:
        mark = "x" if task.get("id") in completed else " "
        print(f"[{mark}] {task.get('id')}: {task.get('desc', '')}")


def add_activity_log(data: dict, message: str) -> None:
    activity = data.setdefault("activity_log", [])
    activity.append(
        {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "message": message,
        }
    )


def start_task(data: dict, task_id: str) -> None:
    add_activity_log(data, f"Started task {task_id}")


def complete_task(data: dict, curriculum: dict, task_id: str) -> None:
    completed = data["progress"].setdefault("completed_tasks", [])
    if task_id not in completed:
        completed.append(task_id)
        data["progress"]["total_exp"] = data["progress"].get("total_exp", 0) + 30

    week = find_week_for_task(curriculum, task_id)
    if week:
        current_week = week["week"]
        data["user"]["current_week"] = max(data["user"].get("current_week", 1), current_week)
    add_activity_log(data, f"Completed task {task_id}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Track bioinformatics learning progress")
    parser.add_argument("--task", type=str, help="Task id, such as w1t1")
    parser.add_argument("--complete", action="store_true", help="Mark task as complete")
    parser.add_argument("--start", action="store_true", help="Mark task as started")
    parser.add_argument("--week", type=int, choices=range(1, 25), help="Show week progress")
    parser.add_argument("--report", action="store_true", help="Show overall progress report")
    args = parser.parse_args()

    data_file = dashboard_path()
    curriculum_file = curriculum_path()
    data = load_json(data_file)
    curriculum = load_json(curriculum_file)

    if args.report:
        print_report(data)
        return

    if args.week:
        print_week_progress(data, curriculum, args.week)
        return

    if args.task and args.start:
        start_task(data, args.task)
        save_json(data_file, data)
        print(f"Marked task {args.task} as started.")
        return

    if args.task and args.complete:
        complete_task(data, curriculum, args.task)
        save_json(data_file, data)
        print(f"Marked task {args.task} as complete.")
        return

    parser.print_help()


if __name__ == "__main__":
    main()
