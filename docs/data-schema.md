# Data Schema

## curriculum.json

```json
{
  "version": "1.0",
  "weeks": [
    {
      "week": 1,
      "phase": 1,
      "title": "课程标题",
      "hours": 10,
      "difficulty": "★★☆☆☆",
      "description": "课程描述",
      "tasks": [
        {
          "id": "w1t1",
          "title": "任务标题",
          "type": "video|practice|project|reading",
          "hours": 2,
          "details": "任务详情"
        }
      ]
    }
  ]
}
```

## quick_reference.json

```json
{
  "concepts": [
    {
      "name": "概念名",
      "category": "sequencing|genomics|transcriptomics|etc",
      "definition": "定义",
      "related": ["相关概念"],
      "week": 1
    }
  ],
  "tools": [...],
  "databases": [...],
  "file_formats": [...]
}
```

## interview_qa.json

```json
{
  "categories": [
    {
      "name": "分类名",
      "questions": [
        {
          "id": "q001",
          "question": "问题",
          "answer": "答案",
          "difficulty": "easy|medium|hard",
          "tags": ["标签"]
        }
      ]
    }
  ]
}
```

## progress.json（本地状态）

```json
{
  "tasks_completed": ["w1t1"],
  "learning_logs": [
    {
      "date": "2026-05-14",
      "hours": 2.5,
      "type": "video|practice|project|reading",
      "skill": "python",
      "note": "备注"
    }
  ],
  "pomodoro": {
    "total_sessions": 5,
    "total_minutes": 125
  }
}
```
