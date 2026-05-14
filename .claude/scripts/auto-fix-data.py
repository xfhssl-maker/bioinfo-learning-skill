#!/usr/bin/env python3
"""
Data auto-fix script for bioinfo-learning-skill.

Detects and repairs common data file issues:
- Invalid JSON syntax
- Missing required fields
- Incorrect field types
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
DATA_DIR = ROOT / "data"

REQUIRED_WEEK_FIELDS = ["week", "phase", "title", "hours", "tasks"]
REQUIRED_TASK_FIELDS = ["id", "title", "type", "hours"]


def fix_json_syntax(filepath):
    """Attempt to fix common JSON syntax issues."""
    with open(filepath, "r", encoding="utf-8") as f:
        raw = f.read()

    try:
        json.loads(raw)
        return None  # already valid
    except json.JSONDecodeError:
        pass

    fixed = raw.strip()
    # Remove trailing commas before closing braces/brackets
    import re
    fixed = re.sub(r",\s*([}\]])", r"\1", fixed)

    try:
        json.loads(fixed)
        return fixed
    except json.JSONDecodeError:
        return None


def validate_curriculum(data):
    issues = []
    for idx, week in enumerate(data.get("weeks", [])):
        for field in REQUIRED_WEEK_FIELDS:
            if field not in week:
                issues.append(f"Week {idx}: missing field '{field}'")
        for tidx, task in enumerate(week.get("tasks", [])):
            for field in REQUIRED_TASK_FIELDS:
                if field not in task:
                    issues.append(f"Week {idx} task {tidx}: missing field '{field}'")
    return issues


def main():
    fixed_count = 0
    error_count = 0

    for json_file in sorted(DATA_DIR.glob("*.json")):
        name = json_file.name

        # Fix syntax
        result = fix_json_syntax(json_file)
        if result is not None and result is not None:
            json_file.write_text(result, encoding="utf-8")
            print(f"FIXED: {name} (JSON syntax repaired)")
            fixed_count += 1
        elif result is None:
            print(f"ERROR: {name} (could not fix JSON syntax)")
            error_count += 1
            continue
        else:
            print(f"OK: {name}")

        # Validate curriculum structure
        if name == "curriculum.json":
            with open(json_file, encoding="utf-8") as f:
                data = json.load(f)
            issues = validate_curriculum(data)
            for issue in issues:
                print(f"  ISSUE: {issue}")
                error_count += 1

    print(f"\nSummary: {fixed_count} fixed, {error_count} remaining issues")
    return 0 if error_count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
