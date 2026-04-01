# Claude 技能仓库开发指南

**参考实现**: [claude-scientific-skills/venue-templates](https://github.com/K-Dense-AI/claude-scientific-skills/tree/main/scientific-skills/venue-templates)

---

## 概述

Claude 技能仓库是一种结构化的知识组织方式，让 Claude 能够更好地理解和使用特定领域的知识。本指南将以 bioinfo-learning 技能仓库为例，讲解如何创建自己的技能仓库。

---

## 技能仓库结构

### 标准目录结构

```
.claude/skills/your-skill-name/
├── SKILL.md                    # 主技能定义文件（必需）
├── references/                 # 参考文档目录
│   ├── overview.md            # 概览文档
│   ├── concepts.md            # 核心概念
│   └── best_practices.md      # 最佳实践
├── scripts/                    # 辅助脚本目录
│   ├── query.py               # 查询脚本
│   └── validate.py            # 验证脚本
└── assets/                     # 资产文件目录
    ├── examples/              # 示例文件
    └── templates/             # 模板文件
```

---

## SKILL.md 主文件结构

### YAML 头部元数据

```yaml
---
name: skill-name                           # 技能名称（小写，连字符分隔）
description: 一句话描述技能功能              # 简洁描述
allowed-tools: Read Write Edit Bash Glob Grep  # 允许的工具
license: MIT license                       # 许可证
metadata:
    skill-author: Your Name                # 作者
---
```

### 主文档结构

```markdown
# Skill Name

## Overview
技能概述，说明这个技能做什么，什么时候使用。

## When to Use This Skill
列出具体的使用场景。

## Core Capabilities
### 1. Capability One
详细描述第一个核心能力。

### 2. Capability Two
详细描述第二个核心能力。

## Workflow: Using This Skill
### Step 1: ...
### Step 2: ...

## Integration with Other Skills
与其他技能的协作方式。

## Helper Scripts
辅助脚本的使用说明。

## Best Practices
最佳实践建议。

## Resources
### Bundled Resources
打包的资源列表。

### External Resources
外部资源链接。

## Example Usage
具体使用示例。

## Summary
总结要点。
```

---

## 参考文档编写指南

### references/ 目录内容

| 文件类型 | 内容 | 示例 |
|---------|------|------|
| 概览文档 | 整体框架、流程 | curriculum_overview.md |
| 概念词典 | 术语定义、公式 | concepts_reference.md |
| 工具指南 | 软件使用方法 | tools_reference.md |
| 最佳实践 | 行业标准、建议 | best_practices.md |
| 问题集 | 面试、FAQ | interview_questions.md |

### 文档编写原则

1. **结构清晰**: 使用标题层级组织内容
2. **表格丰富**: 用表格呈现对比信息
3. **代码示例**: 提供可运行的代码片段
4. **外部链接**: 引用权威资源

---

## 辅助脚本开发指南

### scripts/ 目录脚本

#### 查询脚本模板 (query.py)

```python
#!/usr/bin/env python3
"""
Query Script
Search and retrieve content from the skill database.

Usage:
    python query.py --topic "search-term"
    python query.py --list-all
"""

import argparse

# Data structure
DATA = {
    "items": {
        "item1": {"name": "Item 1", "description": "Description"},
        "item2": {"name": "Item 2", "description": "Description"}
    }
}

def search(query):
    """Search for items matching query."""
    results = []
    for key, item in DATA["items"].items():
        if query.lower() in item["name"].lower():
            results.append(item)
    return results

def list_all():
    """List all available items."""
    for key, item in DATA["items"].items():
        print(f"  {item['name']}: {item['description']}")

def main():
    parser = argparse.ArgumentParser(description="Query skill content")
    parser.add_argument('--topic', type=str, help='Search topic')
    parser.add_argument('--list-all', action='store_true', help='List all')
    args = parser.parse_args()
    
    if args.list_all:
        list_all()
    elif args.topic:
        results = search(args.topic)
        print(f"Found {len(results)} results")

if __name__ == "__main__":
    main()
```

---

## 资产文件组织

### assets/examples/ 示例文件

提供完整的工作流示例：
- 完整的分析流程
- 可运行的代码
- 预期的输出

### assets/templates/ 模板文件

提供可复用的模板：
- 文档模板
- 配置模板
- 报告模板

---

## 开发流程

### Step 1: 定义技能范围

明确技能的目标和边界：
- 解决什么问题？
- 服务什么用户？
- 包含什么内容？

### Step 2: 创建目录结构

```bash
mkdir -p .claude/skills/your-skill/{references,scripts,assets/{examples,templates}}
```

### Step 3: 编写 SKILL.md

按照标准结构编写主文件：
1. YAML 头部
2. 概述
3. 核心能力
4. 工作流程
5. 示例

### Step 4: 编写参考文档

为每个主题创建详细的参考文档。

### Step 5: 开发辅助脚本

编写查询、验证等辅助脚本。

### Step 6: 添加示例和模板

提供实用的工作示例和模板。

### Step 7: 测试和迭代

```bash
# 测试脚本
python scripts/query.py --list-all

# 验证结构
ls -la .claude/skills/your-skill/
```

---

## 最佳实践

### 内容组织

1. **模块化**: 每个文档专注一个主题
2. **可搜索**: 提供查询脚本
3. **可扩展**: 预留扩展空间

### 文档编写

1. **一致性**: 使用统一的格式和术语
2. **完整性**: 覆盖核心知识点
3. **实用性**: 提供可操作的示例

### 脚本开发

1. **命令行友好**: 支持 --help
2. **错误处理**: 友好的错误信息
3. **文档完整**: 函数和参数说明

---

## 参考资源

### 示例仓库

- [claude-scientific-skills/venue-templates](https://github.com/K-Dense-AI/claude-scientific-skills/tree/main/scientific-skills/venue-templates): 学术出版模板技能
- [bioinfo-learning](./): 生物信息学学习技能

### 学习资源

- [Bioinformatics Data Skills (中文版)](https://github.com/ShenChen-bioUtopia/Bioinformatics-data-skills): 数据技能学习方法论
- Claude 官方文档: 技能系统使用指南

---

## 常见问题

### Q: 技能仓库应该多大？

技能仓库应该足够完整以覆盖主题，但不要过于庞大。建议：
- SKILL.md: 15-30KB
- 每个参考文档: 10-20KB
- 总大小: < 500KB

### Q: 如何更新技能？

1. 更新 CHANGELOG 记录变更
2. 修改相应的文档
3. 更新版本日期
4. 测试脚本功能

### Q: 如何与其他技能协作？

在 SKILL.md 的 "Integration with Other Skills" 部分说明：
- 依赖的技能
- 协作方式
- 数据交换格式

---

## 总结

创建 Claude 技能仓库的关键要素：

| 组件 | 作用 | 重要性 |
|------|------|--------|
| SKILL.md | 定义技能元数据和核心功能 | 必需 |
| references/ | 提供详细的知识参考 | 重要 |
| scripts/ | 辅助查询和操作 | 推荐 |
| assets/ | 示例和模板 | 推荐 |

遵循本指南，你可以创建结构清晰、功能完整的 Claude 技能仓库。
