# Commands Reference

## 快速入门

```bash
/bioinfo init                # 初始化学习计划
/bioinfo open                # 打开可视化面板
```

## 课程与学习

| 命令 | 说明 | 示例 |
|------|------|------|
| `/bioinfo week [n]` | 查看第 n 周内容 | `/bioinfo week 5` |
| `/bioinfo today` | 今日学习任务 | `/bioinfo today` |
| `/bioinfo next` | 推荐下一步学习 | `/bioinfo next` |
| `/bioinfo topic [topic]` | 按主题查看课程 | `/bioinfo topic RNA-seq` |
| `/bioinfo list-weeks` | 列出所有周次概览 | `/bioinfo list-weeks` |

## 参考查询

| 命令 | 说明 | 示例 |
|------|------|------|
| `/bioinfo concept [term]` | 概念解释 | `/bioinfo concept FPKM` |
| `/bioinfo tool [name]` | 工具说明 | `/bioinfo tool FastQC` |
| `/bioinfo database [name]` | 数据库参考 | `/bioinfo database NCBI` |
| `/bioinfo search [keyword]` | 搜索参考 | `/bioinfo search variant` |
| `/bioinfo list [type]` | 列出所有参考项 | `/bioinfo list concepts` |

## 进度追踪

| 命令 | 说明 | 示例 |
|------|------|------|
| `/bioinfo progress` | 查看学习进度 | `/bioinfo progress` |
| `/bioinfo log [hours] [type] [skill]` | 记录学习时长 | `/bioinfo log 2.5 video python` |
| `/bioinfo done [task_id]` | 标记任务完成 | `/bioinfo done w1t1` |
| `/bioinfo skills` | 查看技能等级 | `/bioinfo skills` |
| `/bioinfo stats` | 学习类型统计 | `/bioinfo stats` |
| `/bioinfo achievements` | 查看成就 | `/bioinfo achievements` |

## 面试与项目

| 命令 | 说明 | 示例 |
|------|------|------|
| `/bioinfo interview [topic]` | 面试题练习 | `/bioinfo interview RNA-seq` |
| `/bioinfo project [name]` | 创建项目骨架 | `/bioinfo project RNA-seq-pipeline` |
| `/bioinfo scenario [--week n]` | 场景练习 | `/bioinfo scenario --week 3` |
| `/bioinfo resume` | 生成简历 | `/bioinfo resume` |

## 工具

| 命令 | 说明 | 示例 |
|------|------|------|
| `/bioinfo pomodoro [start/pause/reset]` | 番茄钟 | `/bioinfo pomodoro start` |
| `/bioinfo sync` | 同步数据到面板 | `/bioinfo sync` |
| `/bioinfo debug` | 代码调试帮助 | `/bioinfo debug` |
