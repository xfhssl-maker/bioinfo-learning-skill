// ========== RPG技能系统 ==========

const SKILL_SYSTEM = {
    // 技能定义
    skills: {
        // 基础技能
        linux: {
            name: "Linux 命令",
            icon: "fab fa-linux",
            color: "#f97316",
            category: "基础",
            description: "掌握Linux操作系统和命令行",
            maxLevel: 10,
            expPerLevel: [0, 100, 250, 500, 1000, 2000, 4000, 8000, 15000, 30000],
            relatedWeeks: [1, 2, 7], // 相关课程周数
            abilities: [
                { level: 1, name: "新手探索者", desc: "掌握基本文件操作命令" },
                { level: 3, name: "脚本学徒", desc: "能编写简单Shell脚本" },
                { level: 5, name: "命令行猎人", desc: "熟练使用grep/awk/sed" },
                { level: 7, name: "系统掌控者", desc: "掌握进程管理和环境配置" },
                { level: 10, name: "Linux 大师", desc: "精通系统管理和自动化" }
            ]
        },
        shell: {
            name: "Shell 脚本",
            icon: "fas fa-terminal",
            color: "#22c55e",
            category: "基础",
            description: "Shell脚本编程和自动化",
            maxLevel: 10,
            expPerLevel: [0, 100, 250, 500, 1000, 2000, 4000, 8000, 15000, 30000],
            relatedWeeks: [2, 7, 8],
            abilities: [
                { level: 1, name: "脚本入门", desc: "能编写简单脚本" },
                { level: 3, name: "流程控制", desc: "掌握循环和条件判断" },
                { level: 5, name: "文本处理专家", desc: "熟练处理各种文本格式" },
                { level: 7, name: "自动化工程师", desc: "能编写复杂分析流程" },
                { level: 10, name: "脚本大师", desc: "精通各种高级技巧" }
            ]
        },
        r_lang: {
            name: "R 语言",
            icon: "fab fa-r-project",
            color: "#3b82f6",
            category: "核心",
            description: "R语言数据分析与可视化",
            maxLevel: 10,
            expPerLevel: [0, 150, 400, 800, 1500, 3000, 6000, 12000, 25000, 50000],
            relatedWeeks: [3, 4, 12, 13, 14, 15, 16],
            abilities: [
                { level: 1, name: "R 初学者", desc: "掌握基本数据类型" },
                { level: 3, name: "数据操盘手", desc: "熟练使用tidyverse" },
                { level: 5, name: "可视化大师", desc: "精通ggplot2绑定" },
                { level: 7, name: "生信分析师", desc: "掌握DESeq2等分析包" },
                { level: 10, name: "R 语言宗师", desc: "精通所有生信分析" }
            ]
        },
        python: {
            name: "Python",
            icon: "fab fa-python",
            color: "#eab308",
            category: "核心",
            description: "Python数据处理与脚本开发",
            maxLevel: 10,
            expPerLevel: [0, 150, 400, 800, 1500, 3000, 6000, 12000, 25000, 50000],
            relatedWeeks: [5, 6, 18],
            abilities: [
                { level: 1, name: "Python 入门", desc: "掌握基本语法" },
                { level: 3, name: "数据处理者", desc: "熟练使用Pandas" },
                { level: 5, name: "脚本开发者", desc: "能开发生信工具" },
                { level: 7, name: "流程工程师", desc: "构建分析流程" },
                { level: 10, name: "Python 大师", desc: "精通各类应用开发" }
            ]
        },
        rna_seq: {
            name: "RNA-seq 分析",
            icon: "fas fa-dna",
            color: "#ec4899",
            category: "分析",
            description: "转录组测序数据分析",
            maxLevel: 10,
            expPerLevel: [0, 200, 500, 1000, 2000, 4000, 8000, 16000, 32000, 60000],
            relatedWeeks: [10, 11, 12, 13],
            abilities: [
                { level: 1, name: "RNA-seq 入门", desc: "了解分析流程" },
                { level: 3, name: "质控专家", desc: "掌握质控和比对" },
                { level: 5, name: "差异分析达人", desc: "精通DESeq2分析" },
                { level: 7, name: "高级分析师", desc: "能处理复杂实验设计" },
                { level: 10, name: "RNA-seq 宗师", desc: "精通所有分析方法" }
            ]
        },
        wes: {
            name: "WES/WGS 分析",
            icon: "fas fa-microscope",
            color: "#8b5cf6",
            category: "分析",
            description: "全外显子/全基因组测序分析",
            maxLevel: 10,
            expPerLevel: [0, 200, 500, 1000, 2000, 4000, 8000, 16000, 32000, 60000],
            relatedWeeks: [14, 15, 16],
            abilities: [
                { level: 1, name: "变异检测入门", desc: "了解GATK流程" },
                { level: 3, name: "变异猎人", desc: "能完成基本变异检测" },
                { level: 5, name: "注释专家", desc: "熟练进行变异注释" },
                { level: 7, name: "临床分析师", desc: "能进行临床解读" },
                { level: 10, name: "基因组学大师", desc: "精通各类变异分析" }
            ]
        },
        chip_seq: {
            name: "ChIP-seq 分析",
            icon: "fas fa-chart-area",
            color: "#14b8a6",
            category: "分析",
            description: "染色质免疫共沉淀测序分析",
            maxLevel: 10,
            expPerLevel: [0, 200, 500, 1000, 2000, 4000, 8000, 16000, 32000, 60000],
            relatedWeeks: [17],
            abilities: [
                { level: 1, name: "Peak 入门", desc: "了解Peak calling" },
                { level: 3, name: "Peak 猎人", desc: "掌握MACS2使用" },
                { level: 5, name: "注释大师", desc: "熟练Peak注释分析" },
                { level: 7, name: "表观专家", desc: "精通表观遗传分析" },
                { level: 10, name: "ChIP-seq 宗师", desc: "精通各类表观分析" }
            ]
        },
        scrna: {
            name: "单细胞分析",
            icon: "fas fa-circle-nodes",
            color: "#f43f5e",
            category: "进阶",
            description: "单细胞RNA测序数据分析",
            maxLevel: 10,
            expPerLevel: [0, 300, 750, 1500, 3000, 6000, 12000, 24000, 48000, 80000],
            relatedWeeks: [18],
            abilities: [
                { level: 1, name: "单细胞入门", desc: "了解Seurat流程" },
                { level: 3, name: "聚类专家", desc: "掌握降维聚类" },
                { level: 5, name: "注释大师", desc: "熟练细胞类型注释" },
                { level: 7, name: "轨迹分析师", desc: "掌握拟时序分析" },
                { level: 10, name: "单细胞宗师", desc: "精通所有分析方法" }
            ]
        },
        data_mining: {
            name: "数据挖掘",
            icon: "fas fa-database",
            color: "#06b6d4",
            category: "进阶",
            description: "公共数据库挖掘与分析",
            maxLevel: 10,
            expPerLevel: [0, 200, 500, 1000, 2000, 4000, 8000, 16000, 32000, 60000],
            relatedWeeks: [9, 19],
            abilities: [
                { level: 1, name: "数据挖掘入门", desc: "了解GEO/TCGA" },
                { level: 3, name: "数据采集者", desc: "熟练下载公共数据" },
                { level: 5, name: "分析达人", desc: "掌握差异富集分析" },
                { level: 7, name: "多组学专家", desc: "能进行整合分析" },
                { level: 10, name: "数据挖掘大师", desc: "精通各类数据挖掘" }
            ]
        },
        ai_assisted: {
            name: "AI辅助分析",
            icon: "fas fa-robot",
            color: "#818cf8",
            category: "未来技能",
            description: "利用AI工具提升生信分析效率",
            maxLevel: 10,
            expPerLevel: [0, 150, 400, 800, 1500, 3000, 6000, 12000, 25000, 50000],
            relatedWeeks: [25],
            abilities: [
                { level: 1, name: "AI探索者", desc: "了解AI辅助分析的可能性" },
                { level: 3, name: "提示词工程师", desc: "能编写有效的AI提示词" },
                { level: 5, name: "AI协作专家", desc: "熟练使用Claude Code辅助分析" },
                { level: 7, name: "技能开发者", desc: "能开发自定义Claude Skills" },
                { level: 10, name: "AI增强分析师", desc: "完美融合AI与传统技能" }
            ]
        }
    },

    // 成就系统
    achievements: [
        { id: "first_day", name: "初出茅庐", icon: "🌟", desc: "完成第一次学习记录", condition: { type: "hours", value: 1 } },
        { id: "week_1", name: "第一周勇士", icon: "⚔️", desc: "完成第一周所有任务", condition: { type: "week_complete", value: 1 } },
        { id: "hours_10", name: "勤奋学徒", icon: "📚", desc: "累计学习10小时", condition: { type: "hours", value: 10 } },
        { id: "hours_50", name: "刻苦修行", icon: "🔥", desc: "累计学习50小时", condition: { type: "hours", value: 50 } },
        { id: "hours_100", name: "百小时大师", icon: "💎", desc: "累计学习100小时", condition: { type: "hours", value: 100 } },
        { id: "hours_200", name: "学习狂人", icon: "👑", desc: "累计学习200小时", condition: { type: "hours", value: 200 } },
        { id: "skill_5", name: "技能大师", icon: "🏅", desc: "任意技能达到5级", condition: { type: "skill_level", value: 5 } },
        { id: "skill_10", name: "技能宗师", icon: "🏆", desc: "任意技能达到10级", condition: { type: "skill_level", value: 10 } },
        { id: "project_1", name: "项目先锋", icon: "🚀", desc: "完成第一个项目", condition: { type: "projects", value: 1 } },
        { id: "project_3", name: "项目达人", icon: "🎯", desc: "完成3个项目", condition: { type: "projects", value: 3 } },
        { id: "project_6", name: "项目大师", icon: "🎖️", desc: "完成全部6个核心项目", condition: { type: "projects", value: 6 } },
        { id: "streak_7", name: "周连胜", icon: "🔥", desc: "连续学习7天", condition: { type: "streak", value: 7 } },
        { id: "streak_30", name: "月度冠军", icon: "👑", desc: "连续学习30天", condition: { type: "streak", value: 30 } },
        { id: "interview_10", name: "面试准备者", icon: "📋", desc: "练习10道面试题", condition: { type: "interview", value: 10 } },
        { id: "interview_50", name: "面试达人", icon: "🎤", desc: "练习50道面试题", condition: { type: "interview", value: 50 } },
        { id: "blog_5", name: "博客写手", icon: "✍️", desc: "发布5篇技术博客", condition: { type: "blog", value: 5 } },
        { id: "all_skills_3", name: "全能学习者", icon: "🌟", desc: "所有技能达到3级", condition: { type: "all_skills", value: 3 } },
        { id: "phase_1", name: "基础达人", icon: "📖", desc: "完成第一阶段", condition: { type: "phase", value: 1 } },
        { id: "phase_2", name: "核心专家", icon: "🔬", desc: "完成第二阶段", condition: { type: "phase", value: 2 } },
        { id: "phase_3", name: "进阶大师", icon: "🧬", desc: "完成第三阶段", condition: { type: "phase", value: 3 } },
        { id: "graduated", name: "毕业生", icon: "🎓", desc: "完成24周学习计划", condition: { type: "week_complete", value: 24 } }
    ],

    // 称号系统
    titles: [
        { name: "生信小白", condition: { hours: 0 } },
        { name: "生信学徒", condition: { hours: 20 } },
        { name: "生信猎人", condition: { hours: 50, projects: 1 } },
        { name: "生信分析师", condition: { hours: 100, projects: 3 } },
        { name: "生信专家", condition: { hours: 150, projects: 5, skill_level: 5 } },
        { name: "生信大师", condition: { hours: 200, projects: 6, skill_level: 7 } },
        { name: "生信宗师", condition: { hours: 300, projects: 6, skill_level: 10 } }
    ],

    // 经验获取规则
    expRules: {
        learning_hour: 50,        // 每学习1小时获得50经验
        task_complete: 30,        // 每完成一个任务获得30经验
        project_complete: 200,    // 每完成一个项目获得200经验
        blog_post: 100,           // 每发布一篇博客获得100经验
        interview_practice: 20,   // 每练习一道面试题获得20经验
        streak_bonus: 10          // 连续学习每天额外获得10经验
    }
};

// ========== 技能系统管理类 ==========
class SkillSystem {
    constructor() {
        this.skills = JSON.parse(JSON.stringify(SKILL_SYSTEM.skills));
        this.achievements = [...SKILL_SYSTEM.achievements];
        this.unlockedAchievements = [];
        this.currentTitle = "生信小白";
    }

    // 获取技能经验
    getSkillExp(skillId, hours, activity = 'learning') {
        const skill = this.skills[skillId];
        if (!skill) return 0;

        let exp = 0;
        switch(activity) {
            case 'learning':
                exp = hours * SKILL_SYSTEM.expRules.learning_hour;
                break;
            case 'task':
                exp = SKILL_SYSTEM.expRules.task_complete;
                break;
            case 'project':
                exp = SKILL_SYSTEM.expRules.project_complete;
                break;
        }
        return exp;
    }

    // 添加经验到技能
    addExpToSkill(skillId, exp) {
        const skill = this.skills[skillId];
        if (!skill) return null;

        if (!skill.currentExp) skill.currentExp = 0;
        if (!skill.level) skill.level = 1;

        skill.currentExp += exp;

        // 检查升级
        const oldLevel = skill.level;
        while (skill.level < skill.maxLevel &&
               skill.currentExp >= skill.expPerLevel[skill.level]) {
            skill.level++;
        }

        return {
            leveledUp: skill.level > oldLevel,
            oldLevel: oldLevel,
            newLevel: skill.level,
            skill: skill
        };
    }

    // 获取技能当前等级进度
    getSkillProgress(skillId) {
        const skill = this.skills[skillId];
        if (!skill) return null;

        const currentLevel = skill.level || 1;
        const currentExp = skill.currentExp || 0;
        const expForCurrentLevel = skill.expPerLevel[currentLevel - 1] || 0;
        const expForNextLevel = skill.expPerLevel[currentLevel] || skill.expPerLevel[skill.maxLevel - 1];

        const expInLevel = currentExp - expForCurrentLevel;
        const expNeeded = expForNextLevel - expForCurrentLevel;
        const progress = Math.min(100, (expInLevel / expNeeded) * 100);

        return {
            level: currentLevel,
            currentExp: currentExp,
            expForNextLevel: expForNextLevel,
            progress: progress
        };
    }

    // 获取当前能力
    getCurrentAbility(skillId) {
        const skill = this.skills[skillId];
        if (!skill) return null;

        const level = skill.level || 1;
        let currentAbility = null;

        for (const ability of skill.abilities) {
            if (level >= ability.level) {
                currentAbility = ability;
            }
        }

        return currentAbility;
    }

    // 检查成就
    checkAchievements(stats) {
        const newAchievements = [];

        for (const achievement of this.achievements) {
            if (this.unlockedAchievements.includes(achievement.id)) continue;

            let unlocked = false;
            const cond = achievement.condition;

            switch(cond.type) {
                case 'hours':
                    unlocked = stats.totalHours >= cond.value;
                    break;
                case 'week_complete':
                    unlocked = stats.completedWeeks >= cond.value;
                    break;
                case 'projects':
                    unlocked = stats.completedProjects >= cond.value;
                    break;
                case 'skill_level':
                    unlocked = Object.values(this.skills).some(s => (s.level || 1) >= cond.value);
                    break;
                case 'streak':
                    unlocked = stats.streak >= cond.value;
                    break;
                case 'interview':
                    unlocked = stats.interviewPracticed >= cond.value;
                    break;
                case 'blog':
                    unlocked = stats.blogPosts >= cond.value;
                    break;
                case 'all_skills':
                    unlocked = Object.values(this.skills).every(s => (s.level || 1) >= cond.value);
                    break;
                case 'phase':
                    unlocked = stats.currentPhase > cond.value;
                    break;
            }

            if (unlocked) {
                this.unlockedAchievements.push(achievement.id);
                newAchievements.push(achievement);
            }
        }

        return newAchievements;
    }

    // 更新称号
    updateTitle(stats) {
        for (let i = SKILL_SYSTEM.titles.length - 1; i >= 0; i--) {
            const title = SKILL_SYSTEM.titles[i];
            const cond = title.condition;

            let qualified = true;
            if (cond.hours && stats.totalHours < cond.hours) qualified = false;
            if (cond.projects && stats.completedProjects < cond.projects) qualified = false;
            if (cond.skill_level && !Object.values(this.skills).some(s => (s.level || 1) >= cond.skill_level)) qualified = false;

            if (qualified) {
                this.currentTitle = title.name;
                return title;
            }
        }
        return null;
    }

    // 导出数据
    export() {
        return {
            skills: Object.fromEntries(
                Object.entries(this.skills).map(([id, skill]) => [
                    id,
                    { level: skill.level || 1, currentExp: skill.currentExp || 0 }
                ])
            ),
            achievements: this.unlockedAchievements,
            title: this.currentTitle
        };
    }

    // 导入数据
    import(data) {
        if (data.skills) {
            for (const [id, skillData] of Object.entries(data.skills)) {
                if (this.skills[id]) {
                    this.skills[id].level = skillData.level || 1;
                    this.skills[id].currentExp = skillData.currentExp || 0;
                }
            }
        }
        if (data.achievements) {
            this.unlockedAchievements = data.achievements;
        }
        if (data.title) {
            this.currentTitle = data.title;
        }
    }
}

// 导出
window.SKILL_SYSTEM = SKILL_SYSTEM;
window.SkillSystem = SkillSystem;
