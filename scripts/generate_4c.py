#!/usr/bin/env python3
"""批量生成24周4C优化课程"""
import json
import os

# 读取原始课程
with open('E:/OpenCode/bioinfo-learning-skill/data/curriculum.json', 'r', encoding='utf-8') as f:
    original = json.load(f)

# 4C优化模板
def add_4c_dimensions(week):
    phase = week['phase']
    week_num = week['week']

    # 根据阶段确定角色和认知重点
    role_map = {1: "实习生", 2: "初级分析师", 3: "中级分析师", 4: "求职者"}
    cognitive_map = {1: "记忆与理解", 2: "应用与分析", 3: "评估与创造", 4: "综合应用"}

    return {
        **week,
        "difficulty": "★" * min((week_num-1)//6 + 1, 5) + "☆" * (5 - min((week_num-1)//6 + 1, 5)),
        "biological_context": {
            "why": f"为什么学习{week['title']}？解决什么生物学问题？",
            "real_scenario": "真实工作中的应用场景",
            "industry_standard": "行业标准和最佳实践"
        },
        "cognitive_dimension": {
            "bloom_levels": {
                "remember": ["记忆任务1", "记忆任务2"],
                "understand": ["理解任务1", "理解任务2"],
                "apply": ["应用任务1", "应用任务2"],
                "analyze": ["分析任务1"],
                "evaluate": ["评估任务1"],
                "create": ["创造任务1"]
            },
            "learning_strategy": "主动练习 + 刻意练习",
            "metacognition": ["反思问题1", "反思问题2", "反思问题3"]
        },
        "collaborative_dimension": {
            "peer_learning": "结对练习或小组讨论",
            "code_review": "互相检查代码质量",
            "community": "分享学习心得到社群"
        },
        "contextual_dimension": {
            "real_scenario": {
                "title": f"场景：{week['title']}实战",
                "background": "工作场景背景描述",
                "tasks": ["步骤1", "步骤2", "步骤3"]
            },
            "role": role_map[phase],
            "cognitive_focus": cognitive_map[phase]
        }
    }

# 生成优化版本
optimized = {
    "meta": {
        **original["meta"],
        "version": "2.0_4C",
        "optimization": "基于4C理论优化：Content内容、Cognitive认知、Collaborative协作、Contextual情境"
    },
    "phases": [
        {**p, "cognitive_focus": ["记忆与理解", "应用与分析", "评估与创造", "综合应用"][p["id"]-1]}
        for p in original["phases"]
    ],
    "curriculum": [add_4c_dimensions(w) for w in original["curriculum"]],
    "projects": original["projects"]
}

# 保存
output_path = 'E:/OpenCode/bioinfo-learning-skill/data/curriculum_4c_optimized.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(optimized, f, ensure_ascii=False, indent=2)

print(f"Done: {output_path}")
print(f"Total weeks: {len(optimized['curriculum'])}")
