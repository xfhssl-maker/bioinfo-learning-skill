"""Test the bioinfo.py CLI entry point."""

import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent.parent / ".claude" / "skills" / "bioinfo-learning" / "scripts"
BIOINFO_PY = SCRIPT_DIR / "bioinfo.py"


def test_bioinfo_py_exists():
    assert BIOINFO_PY.exists(), f"Missing: {BIOINFO_PY}"


def test_bioinfo_list_weeks():
    """list-weeks should return non-empty output."""
    result = subprocess.run(
        [sys.executable, str(BIOINFO_PY), "list-weeks"],
        capture_output=True, text=True, cwd=str(SCRIPT_DIR.parent.parent.parent)
    )
    assert result.returncode == 0, f"list-weeks failed: {result.stderr}"
    assert len(result.stdout.strip()) > 0, "list-weeks returned empty output"


def test_bioinfo_week_1():
    """week 1 should succeed."""
    result = subprocess.run(
        [sys.executable, str(BIOINFO_PY), "week", "1"],
        capture_output=True, text=True, cwd=str(SCRIPT_DIR.parent.parent.parent)
    )
    assert result.returncode == 0, f"week 1 failed: {result.stderr}"


def test_bioinfo_concept_fpkm():
    """concept FPKM should return a definition."""
    result = subprocess.run(
        [sys.executable, str(BIOINFO_PY), "concept", "FPKM"],
        capture_output=True, text=True, cwd=str(SCRIPT_DIR.parent.parent.parent)
    )
    assert result.returncode == 0, f"concept FPKM failed: {result.stderr}"
    assert len(result.stdout.strip()) > 0, "concept FPKM returned empty"


def test_bioinfo_help():
    """--help should list subcommands."""
    result = subprocess.run(
        [sys.executable, str(BIOINFO_PY), "--help"],
        capture_output=True, text=True, cwd=str(SCRIPT_DIR.parent.parent.parent)
    )
    assert result.returncode == 0
    assert "usage" in result.stdout.lower() or "用法" in result.stdout
