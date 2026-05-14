# Architecture

## 系统架构

```
┌───────────────────────────────────────────────────────────┐
│                    Bioinfo Learning Skill                   │
├───────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Claude Skill  │  │  Data Layer  │  │  Dashboard    │     │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤     │
│  │ • SKILL.md   │  │ curriculum   │  │ index.html   │     │
│  │ • scripts/   │  │ concepts     │  │ css/         │     │
│  │ • references │  │ exercises    │  │ js/          │     │
│  │ • assets/    │  │ interviews   │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                 │             │
│         └─────────────────┼─────────────────┘             │
│                           │                               │
│                    ┌──────┴──────┐                        │
│                    │   bioinfo   │                        │
│                    │   .py CLI   │                        │
│                    └─────────────┘                        │
└───────────────────────────────────────────────────────────┘
```

## 三层职责

### Claude Skill 层（`.claude/skills/bioinfo-learning/`）
- SKILL.md：Agent 运行时指令，定义触发词、工作流、引用加载
- scripts/：bioinfo.py 统一 CLI 入口，路由到各子命令
- references/：按需加载的扩展背景材料
- assets/：笔记模板、项目模板、示例

### 数据层（`data/`）
- 课程 JSON（curriculum.json、weeks_4c/）
- 概念速查（concepts.json、quick_reference.json）
- 面试题库（interview_qa.json）
- 练习题库（exercises.json）
- 用户进度（progress.json，实际状态由浏览器 localStorage 持久化）

### 展示层（`dashboard/`）
- 纯前端 HTML/CSS/JS 应用
- 通过 `data/` 目录 JSON 初始化课程数据
- 用户进度存储于浏览器 localStorage
- 可选 UI，非权威数据源
