"""Test that the skill directory structure is valid."""

from pathlib import Path
import yaml  # available via PyYAML

SKILL_DIR = Path(__file__).resolve().parent.parent / ".claude" / "skills" / "bioinfo-learning"
SKILL_MD = SKILL_DIR / "SKILL.md"
REQUIRED_REFS = [
    "references/curriculum_overview.md",
    "references/concepts_reference.md",
    "references/tools_reference.md",
    "references/databases_reference.md",
    "references/interview_questions.md",
    "references/data_skills_methodology.md",
]
REQUIRED_SCRIPTS = ["scripts/bioinfo.py"]
REQUIRED_ASSETS = [
    "assets/templates/learning_note_template.md",
    "assets/templates/project_readme_template.md",
    "assets/examples/rnaseq_workflow_example.md",
]


def test_skill_md_exists():
    assert SKILL_MD.exists(), f"Missing: {SKILL_MD}"


def test_skill_md_frontmatter():
    content = SKILL_MD.read_text(encoding="utf-8")
    assert content.startswith("---"), "SKILL.md must start with YAML frontmatter"
    parts = content.split("---", 2)
    assert len(parts) >= 3, "SKILL.md must have closing ---"


def test_skill_md_has_name():
    content = SKILL_MD.read_text(encoding="utf-8")
    assert "name:" in content, "SKILL.md frontmatter must have name field"


def test_skill_md_has_description():
    content = SKILL_MD.read_text(encoding="utf-8")
    assert "description:" in content, "SKILL.md frontmatter must have description"


def test_skill_md_has_allowed_tools():
    content = SKILL_MD.read_text(encoding="utf-8")
    assert "allowed-tools" in content, "SKILL.md frontmatter must have allowed-tools"


def test_reference_files_exist():
    for ref in REQUIRED_REFS:
        path = SKILL_DIR / ref
        assert path.exists(), f"Missing reference: {ref}"


def test_reference_files_nonempty():
    for ref in REQUIRED_REFS:
        path = SKILL_DIR / ref
        text = path.read_text(encoding="utf-8")
        assert len(text.strip()) > 0, f"Empty reference: {ref}"


def test_scripts_exist():
    for script in REQUIRED_SCRIPTS:
        path = SKILL_DIR / script
        assert path.exists(), f"Missing script: {script}"


def test_assets_exist():
    for asset in REQUIRED_ASSETS:
        path = SKILL_DIR / asset
        assert path.exists(), f"Missing asset: {asset}"
