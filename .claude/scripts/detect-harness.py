#!/usr/bin/env python3
"""
Harness 改造检测脚本
用法：
  python3 detect-harness.py             # 完整检测
  python3 detect-harness.py --item docs # 检测单项
  python3 detect-harness.py --phase 1   # 检测阶段
  python3 detect-harness.py --format json  # JSON 输出
"""

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
SKILL_DIR = ROOT / ".claude" / "skills" / "bioinfo-learning"


def detect_docs():
    return (ROOT / "docs").is_dir()


def detect_docs_files():
    docs = ROOT / "docs"
    if not docs.is_dir():
        return 0
    return len(list(docs.glob("*.md")))


def detect_lint_rules():
    return (ROOT / ".claude" / "lint" / "forbidden-patterns.json").exists()


def detect_lint_rules_valid():
    if not detect_lint_rules():
        return False
    try:
        with open(ROOT / ".claude" / "lint" / "forbidden-patterns.json") as f:
            data = json.load(f)
            return len(data.get("forbidden", [])) > 0
    except Exception:
        return False


def detect_structure_rules():
    return (ROOT / ".claude" / "lint" / "structure-rules.json").exists()


def detect_ci():
    return (ROOT / ".github" / "workflows").is_dir()


def detect_ci_valid():
    if not detect_ci():
        return False
    yml_files = list((ROOT / ".github" / "workflows").glob("*.yml"))
    return len(yml_files) > 0


def detect_tests():
    return (ROOT / "tests").is_dir()


def detect_tests_passing():
    if not detect_tests():
        return False
    try:
        result = subprocess.run(
            [sys.executable, "-m", "pytest", "tests/", "-q"],
            capture_output=True, timeout=30, cwd=str(ROOT)
        )
        return result.returncode == 0
    except Exception:
        return False


def detect_logs():
    return (ROOT / "logs").is_dir()


def detect_auto_fix():
    return (ROOT / ".claude" / "scripts" / "auto-fix-data.py").exists()


def detect_health_report():
    return (ROOT / ".claude" / "scripts" / "health-report.py").exists()


def detect_harness_script():
    return (ROOT / ".claude" / "scripts" / "detect-harness.py").exists()


def detect_reports_health():
    return (ROOT / "reports" / "health").is_dir()


def detect_session():
    return (ROOT / "logs" / "harness-session.json").exists()


def calculate_stage(results):
    stage1 = (
        results["docs_exists"]
        and results["lint_rules_valid"]
        and results["ci_valid"]
        and results["harness_script_exists"]
    )
    stage2 = stage1 and results["tests_exists"] and results["auto_fix_exists"]
    stage3 = stage2 and results["health_report_exists"] and results["reports_health_exists"]

    if stage3:
        return 3
    elif stage2:
        return 2
    elif stage1:
        return 1
    return 0


def detect_all():
    return {
        "docs_exists": detect_docs(),
        "docs_files": detect_docs_files(),
        "lint_rules_exists": detect_lint_rules(),
        "lint_rules_valid": detect_lint_rules_valid(),
        "structure_rules_exists": detect_structure_rules(),
        "ci_exists": detect_ci(),
        "ci_valid": detect_ci_valid(),
        "harness_script_exists": detect_harness_script(),
        "tests_exists": detect_tests(),
        "tests_passing": detect_tests_passing(),
        "logs_exists": detect_logs(),
        "auto_fix_exists": detect_auto_fix(),
        "health_report_exists": detect_health_report(),
        "reports_health_exists": detect_reports_health(),
        "session_exists": detect_session(),
    }


def print_report(results):
    stage = calculate_stage(results)
    print("=" * 50)
    print("  Harness 检测结果")
    print("=" * 50)
    print()
    print("阶段一（最小 Harness）：")
    print(f"  {'✓' if results['docs_exists'] else '✗'} docs/ 目录  ({results['docs_files']} 个文件)")
    print(f"  {'✓' if results['lint_rules_valid'] else '✗'} Lint 规则  ({'有效' if results['lint_rules_valid'] else '缺失'})")
    print(f"  {'✓' if results['ci_valid'] else '✗'} CI 配置    ({'存在' if results['ci_valid'] else '缺失'})")
    print(f"  {'✓' if results['harness_script_exists'] else '✗'} 检测脚本  ({'存在' if results['harness_script_exists'] else '缺失'})")
    print()
    print("阶段二（可观测闭环）：")
    print(f"  {'✓' if results['tests_exists'] else '✗'} 测试体系  ({'存在' if results['tests_exists'] else '缺失'})")
    print(f"  {'✓' if results['logs_exists'] else '✗'} 日志目录  ({'存在' if results['logs_exists'] else '缺失'})")
    print(f"  {'✓' if results['auto_fix_exists'] else '✗'} 自动修复  ({'存在' if results['auto_fix_exists'] else '缺失'})")
    print()
    print("阶段三（熵治理）：")
    print(f"  {'✓' if results['health_report_exists'] else '✗'} 健康度报告 ({'存在' if results['health_report_exists'] else '缺失'})")
    print(f"  {'✓' if results['reports_health_exists'] else '✗'} reports/   ({'存在' if results['reports_health_exists'] else '缺失'})")
    print()
    print(f"当前 Harness 阶段: {stage}")
    print("=" * 50)


if __name__ == "__main__":
    results = detect_all()

    if "--format" in sys.argv and "json" in sys.argv:
        print(json.dumps(results, indent=2))
    elif "--item" in sys.argv:
        idx = sys.argv.index("--item")
        if idx + 1 < len(sys.argv):
            key = sys.argv[idx + 1]
            print(json.dumps({key: results.get(key, "unknown")}))
    elif "--phase" in sys.argv:
        idx = sys.argv.index("--phase")
        if idx + 1 < len(sys.argv):
            phase = int(sys.argv[idx + 1])
            stage = calculate_stage(results)
            print(f"Harness stage: {stage}")
            print(f"Target phase: {phase}")
            print(f"{'Met' if stage >= phase else 'Not met'}")
    else:
        print_report(results)
