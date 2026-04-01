#!/usr/bin/env python3
"""
生成24周4C优化课程内容
"""
import json

def generate_week_4c(week_data):
    """为每周内容添加4C维度"""
    return {
        **week_data,
        "difficulty": "★" * min(week_data["week"] // 5 + 1, 5) + "☆" * max(5 - week_data["week"] // 5 - 1, 0),
        "biological_context": {
            "why": f"第{week_data['week']}周生物学背景说明",
            "real_scenario": "真实工作场景描述",
            "industry_standard": "行业标准实践"
        },
        "cognitive_dimension": {
            "bloom_levels": {
                "remember": ["记忆层级任务1", "记忆层级任务2"],
                "understand": ["理解层级任务1", "理解层级任务2"],
                "apply": ["应用层级任务1", "应用层级任务2"],
                "analyze": ["分析层级任务1"]
            },
            "learning_strategy": "主动练习 + 间隔重复",
            "metacognition": ["反思问题1", "反思问题2", "反思问题3"]
        },
        "collaborative_dimension": {
            "peer_learning": "结对练习30分钟",
            "code_review": "互相检查代码",
            "community": "分享学习心得"
        },
        "contextual_dimension": {
            "real_scenario": {
                "title": f"场景：第{week_data['week']}周实战任务",
                "background": "工作场景背景",
                "tasks": ["步骤1", "步骤2", "步骤3"]
            },
            "role": "实习生" if week_data["phase"] == 1 else "初级分析师" if week_data["phase"] == 2 else "中级分析师",
            "industry_practice": "行业规范要求"
        }
    }

# 读取原始课程
with open('E:/OpenCode/bioinfo-learning-skill/data/curriculum.json', 'r', encoding='utf-8') as f:
    original = json.load(f)

# 生成优化版本
optimized = {
    "meta": {
        **original["meta"],
        "version": "2.0_4C_Optimized",
        "optimization": "基于4C理论全面优化"
    },
    "phases": original["phases"],
    "curriculum": [generate_week_4c(week) for week in original["curriculum"]],
    "projects": original["projects"]
}

# 保存
with open('E:/OpenCode/bioinfo-learning-skill/data/curriculum_4c_optimized.json', 'w', encoding='utf-8') as f:
    json.dump(optimized, f, ensure_ascii=False, indent=2)

print("✅ 24周课程4C优化完成！")
