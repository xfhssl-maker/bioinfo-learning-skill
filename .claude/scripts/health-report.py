#!/usr/bin/env python3
"""
Health report generator for bioinfo-learning-skill.

Checks:
- Lint rules validity
- Data JSON integrity
- Test pass rate
- Reference file completeness
- Docs completeness
Outputs a markdown report to reports/health/
"""

import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
SKILL_DIR = ROOT / ".claude" / "skills" / "bioinfo-learning"
DATA_DIR = ROOT / "data"
DOCS_DIR = ROOT / "docs"
TESTS_DIR = ROOT / "tests"
REPORTS_DIR = ROOT / "reports" / "health"

REQUIRED_REFS = [
    "references/curriculum_overview.md",
    "references/concepts_reference.md",
    "references/tools_reference.md",
    "references/databases_reference.md",
    "references/interview_questions.md",
    "references/data_skills_methodology.md",
]
REQUIRED_DOCS = [
    "architecture.md",
    "data-schema.md",
    "commands.md",
    "development.md",
]
REQUIRED_JSON_FILES = [
    "curriculum.json",
    "quick_reference.json",
    "interview_qa.json",
]


def check_lint():
    results = {}
    lint_dir = ROOT / ".claude" / "lint"

    fp = lint_dir / "forbidden-patterns.json"
    if fp.exists():
        try:
            with open(fp) as f:
                data = json.load(f)
            results["forbidden_patterns"] = {
                "status": "pass",
                "detail": f"{len(data.get('forbidden', []))} rules"
            }
        except Exception as e:
            results["forbidden_patterns"] = {"status": "fail", "detail": str(e)}
    else:
        results["forbidden_patterns"] = {"status": "missing", "detail": "file not found"}

    sr = lint_dir / "structure-rules.json"
    if sr.exists():
        try:
            with open(sr) as f:
                data = json.load(f)
            results["structure_rules"] = {
                "status": "pass",
                "detail": f"{len(data.get('rules', []))} rules, {len(data.get('required_files', []))} required files"
            }
        except Exception as e:
            results["structure_rules"] = {"status": "fail", "detail": str(e)}
    else:
        results["structure_rules"] = {"status": "missing", "detail": "file not found"}

    return results


def check_data_integrity():
    results = {}
    for name in REQUIRED_JSON_FILES:
        path = DATA_DIR / name
        if not path.exists():
            results[name] = {"status": "missing", "detail": "file not found"}
            continue
        try:
            with open(path, encoding="utf-8") as f:
                json.load(f)
            size = len(path.read_text(encoding="utf-8"))
            results[name] = {"status": "pass", "detail": f"{size} bytes"}
        except json.JSONDecodeError as e:
            results[name] = {"status": "fail", "detail": str(e)}
    return results


def check_tests():
    results = {}
    if not TESTS_DIR.exists():
        return {"tests": {"status": "missing", "detail": "tests/ directory not found"}}

    try:
        result = subprocess.run(
            [sys.executable, "-m", "pytest", "tests/", "-q", "--tb=short"],
            capture_output=True, text=True, timeout=30, cwd=str(ROOT)
        )
        results["pytest"] = {
            "status": "pass" if result.returncode == 0 else "fail",
            "detail": result.stdout.strip().split("\n")[-1] if result.stdout else "no output"
        }
        if result.returncode != 0:
            results["pytest"]["stderr"] = result.stderr.strip()
    except subprocess.TimeoutExpired:
        results["pytest"] = {"status": "timeout", "detail": "test execution > 30s"}
    except FileNotFoundError:
        results["pytest"] = {"status": "error", "detail": "pytest not installed"}

    return results


def check_references():
    results = {}
    for ref in REQUIRED_REFS:
        path = SKILL_DIR / ref
        if not path.exists():
            results[ref] = {"status": "missing", "detail": "file not found"}
        else:
            text = path.read_text(encoding="utf-8")
            results[ref] = {
                "status": "pass",
                "detail": f"{len(text)} chars"
            }
    return results


def check_docs():
    results = {}
    for doc in REQUIRED_DOCS:
        path = DOCS_DIR / doc
        if not path.exists():
            results[doc] = {"status": "missing", "detail": "file not found"}
        else:
            text = path.read_text(encoding="utf-8")
            results[doc] = {
                "status": "pass",
                "detail": f"{len(text)} chars"
            }
    return results


def generate_report():
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)

    sections = {
        "lint": check_lint(),
        "data_integrity": check_data_integrity(),
        "tests": check_tests(),
        "references": check_references(),
        "docs": check_docs(),
    }

    total = 0
    passed = 0
    failed = 0
    missing = 0

    lines = []
    lines.append("# Health Report")
    lines.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append(f"Project: bioinfo-learning-skill")
    lines.append("")

    for section_name, items in sections.items():
        lines.append(f"## {section_name.replace('_', ' ').title()}")
        lines.append("")
        lines.append("| Check | Status | Detail |")
        lines.append("|-------|--------|--------|")
        for key, value in items.items():
            status = value.get("status", "unknown")
            detail = value.get("detail", "")
            icon = {"pass": "✅", "fail": "❌", "missing": "⚠️", "timeout": "⏱️", "error": "❌"}.get(status, "❓")
            lines.append(f"| {key} | {icon} {status} | {detail} |")
            total += 1
            if status == "pass":
                passed += 1
            elif status in ("fail", "error"):
                failed += 1
            elif status == "missing":
                missing += 1
        lines.append("")

    lines.append("## Summary")
    lines.append("")
    lines.append(f"- **Total checks**: {total}")
    lines.append(f"- **Passed**: {passed}")
    lines.append(f"- **Failed**: {failed}")
    lines.append(f"- **Missing**: {missing}")
    health_score = (passed / total * 100) if total > 0 else 0
    lines.append(f"- **Health Score**: {health_score:.0f}%")
    lines.append("")

    if health_score >= 80:
        lines.append("**Overall: Healthy** 🟢")
    elif health_score >= 50:
        lines.append("**Overall: Degraded** 🟡")
    else:
        lines.append("**Overall: Critical** 🔴")

    report = "\n".join(lines)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    report_path = REPORTS_DIR / f"health_{timestamp}.md"
    report_path.write_text(report, encoding="utf-8")

    print(report)
    print(f"\nReport saved: {report_path}")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(generate_report())
