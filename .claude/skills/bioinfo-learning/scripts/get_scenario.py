#!/usr/bin/env python3
"""
Get a practical study scenario from curriculum data.

Usage:
    python get_scenario.py --week 3
    python get_scenario.py --topic RNA-seq
"""

import argparse
import json
from pathlib import Path


def project_root() -> Path:
    return Path(__file__).resolve().parents[4]


def load_curriculum() -> dict:
    path = project_root() / "data" / "curriculum.json"
    return json.loads(path.read_text(encoding="utf-8"))


def get_week(data: dict, week_num: int) -> dict | None:
    return next((item for item in data["curriculum"] if item["week"] == week_num), None)


def find_by_topic(data: dict, topic: str) -> list[dict]:
    query = topic.lower()
    results = []
    for week in data["curriculum"]:
        title = week.get("title", "").lower()
        topics = " ".join(week.get("topics", [])).lower()
        if query in title or query in topics:
            results.append(week)
    return results


def print_scenario(week: dict) -> None:
    print("\n" + "=" * 60)
    print(f"Week {week['week']}: {week.get('title', '')}")
    print("=" * 60)
    print("Scenario Pack")
    print(f"- Study focus: {', '.join(week.get('topics', []))}")
    print(f"- Expected effort: {week.get('learning_hours', 0)}h learning + {week.get('practice_hours', 0)}h practice")

    tasks = week.get("tasks", [])
    if tasks:
        print("\nTasks:")
        for task in tasks:
            print(f"- {task.get('id')}: {task.get('desc', '')} [{task.get('type', 'task')}]")

    resources = week.get("resources", [])
    if resources:
        print("\nResources:")
        for resource in resources:
            print(f"- {resource.get('name', 'Unnamed')} ({resource.get('type', 'resource')}): {resource.get('url', '')}")

    examples = week.get("code_examples", [])
    if examples:
        print("\nCode Examples:")
        for example in examples:
            print(f"- {example.get('title', 'Untitled')} [{example.get('language', 'text')}]")


def main() -> None:
    parser = argparse.ArgumentParser(description="Get week scenario or topic-based study scenario")
    parser.add_argument("--week", type=int, choices=range(1, 25), help="Week number (1-24)")
    parser.add_argument("--topic", type=str, help="Topic keyword")
    args = parser.parse_args()

    data = load_curriculum()

    if args.week:
        week = get_week(data, args.week)
        if not week:
            print(f"Week {args.week} not found.")
            return
        print_scenario(week)
        return

    if args.topic:
        results = find_by_topic(data, args.topic)
        if not results:
            print(f"No scenarios found for topic '{args.topic}'.")
            return
        print(f"\nFound {len(results)} matching week(s) for topic '{args.topic}':")
        for week in results:
            print(f"- Week {week['week']}: {week.get('title', '')}")
        print_scenario(results[0])
        return

    parser.print_help()


if __name__ == "__main__":
    main()
