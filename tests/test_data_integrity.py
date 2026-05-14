"""Test data JSON integrity."""

import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
REQUIRED_JSON = [
    "curriculum.json",
    "quick_reference.json",
    "interview_qa.json",
]


def _load_json(name):
    path = DATA_DIR / name
    assert path.exists(), f"Missing: {name}"
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def test_curriculum_structure():
    data = _load_json("curriculum.json")
    weeks = data.get("weeks", [])
    assert len(weeks) > 0, "curriculum.json has no weeks"
    for w in weeks:
        assert "week" in w, f"Week missing 'week' field: {w.get('title', '?')}"
        assert "tasks" in w, f"Week {w['week']} missing tasks"
        assert len(w["tasks"]) > 0, f"Week {w['week']} has empty tasks"


def test_curriculum_weeks_ascending():
    data = _load_json("curriculum.json")
    week_nums = [w["week"] for w in data.get("weeks", [])]
    assert week_nums == sorted(week_nums), "Weeks are not in ascending order"


def test_quick_reference_sections():
    data = _load_json("quick_reference.json")
    for section in ["concepts", "tools", "databases", "file_formats"]:
        assert section in data, f"quick_reference.json missing '{section}'"
        assert isinstance(data[section], list), f"'{section}' should be a list"


def test_interview_qa_structure():
    data = _load_json("interview_qa.json")
    categories = data.get("categories", [])
    assert len(categories) > 0, "interview_qa.json has no categories"
    for cat in categories:
        assert "name" in cat, "Category missing name"
        assert "questions" in cat, f"Category '{cat.get('name', '?')}' missing questions"
        assert len(cat["questions"]) > 0, f"Category '{cat['name']}' has empty questions"


def test_all_json_valid():
    """All JSON files in data/ must be parseable."""
    for json_file in DATA_DIR.glob("*.json"):
        with open(json_file, encoding="utf-8") as f:
            try:
                json.load(f)
            except json.JSONDecodeError as e:
                assert False, f"Invalid JSON in {json_file.name}: {e}"
