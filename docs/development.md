# Development Guide

## 项目设置

```bash
git clone <repo-url>
cd bioinfo-learning-skill
```

## 目录结构约定

```
bioinfo-learning-skill/
├── .claude/skills/bioinfo-learning/   # Skill 定义（SKILL.md + 脚本 + 引用）
├── data/                              # 课程数据 JSON
├── dashboard/                         # 可视化面板（纯前端）
├── docs/                              # 架构/数据/开发文档
├── logs/                              # 操作日志
├── .github/workflows/                 # CI 配置
├── tests/                             # 测试文件
└── templates/                         # 项目模板
```

## 数据修改

1. 编辑 `data/` 下的 JSON 文件
2. 确保 JSON 格式有效（可运行 `python -m json.tool` 验证）
3. 若修改 `curriculum.json`，同步检查 `docs/data-schema.md` 是否需要更新

## 测试

```bash
python -m pytest tests/ -v
```

## Skill 修改

1. 编辑 `.claude/skills/bioinfo-learning/SKILL.md`
2. 若新增引用文件，在 SKILL.md 的 "References To Load On Demand" 章节注册
3. 若新增 CLI 命令，在 `docs/commands.md` 和 DESIGN_SPEC.md 同步更新

## 贡献 PR 流程

1. Fork 仓库并创建功能分支
2. 提交前运行测试
3. 确保 CI 通过（GitHub Actions）
4. 提交 PR 描述变更内容
