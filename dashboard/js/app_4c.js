// 4C优化版 - 主应用逻辑
class BioinfoApp {
    constructor() {
        this.currentWeek = 1;
        this.data = this.loadData();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadDashboard();
    }

    loadData() {
        const stored = localStorage.getItem('bioinfo_data');
        return stored ? JSON.parse(stored) : {
            user: { name: '学习者', currentWeek: 1 },
            progress: { totalHours: 0, completedTasks: 0, completedProjects: 0 },
            streak: 0
        };
    }

    saveData() {
        localStorage.setItem('bioinfo_data', JSON.stringify(this.data));
    }

    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.switchPage(page);
            });
        });
    }

    switchPage(page) {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`).classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');

        const titles = {
            dashboard: '仪表盘',
            curriculum: '学习计划',
            skills: '技能面板',
            projects: '项目管理',
            concepts: '概念速查',
            exercises: '练习题库',
            reflection: '学习反思'
        };
        document.getElementById('page-title').textContent = titles[page];

        this[`load${page.charAt(0).toUpperCase() + page.slice(1)}`]?.();
    }

    loadDashboard() {
        // 已在HTML中静态渲染
    }

    loadCurriculum() {
        const page = document.getElementById('page-curriculum');
        page.innerHTML = `
            <div class="card">
                <div class="card-title">24周学习计划</div>
                <div id="curriculum-list"></div>
            </div>
        `;
        this.renderCurriculum();
    }

    renderCurriculum() {
        const weeks = this.getWeeksData();
        const html = weeks.map(w => `
            <div class="card" style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h3>Week ${w.week}: ${w.title}</h3>
                        <div class="difficulty">难度: ${w.difficulty}</div>
                        <div class="c4-tags">
                            <span class="c4-tag tag-content">阶段${w.phase}</span>
                            <span class="c4-tag tag-cognitive">${w.cognitive}</span>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="app.viewWeek(${w.week})">查看</button>
                </div>
            </div>
        `).join('');
        document.getElementById('curriculum-list').innerHTML = html;
    }

    getWeeksData() {
        return [
            { week: 1, title: '环境搭建 + Linux基础', difficulty: '★☆☆☆☆', phase: 1, cognitive: '记忆与理解' },
            { week: 2, title: 'Linux进阶 + Shell脚本', difficulty: '★☆☆☆☆', phase: 1, cognitive: '应用' },
            { week: 3, title: 'R语言基础', difficulty: '★★☆☆☆', phase: 1, cognitive: '理解与应用' }
        ];
    }

    viewWeek(week) {
        const page = document.getElementById('page-dashboard');
        page.innerHTML = `
            <div class="card">
                <button class="btn btn-primary" onclick="app.backToDashboard()" style="margin-bottom: 20px;">← 返回</button>
                <div class="card-title">Week ${week}: 环境搭建 + Linux基础</div>
                <div class="difficulty">难度: ★☆☆☆☆</div>
                <div class="c4-tags">
                    <span class="c4-tag tag-content">Content: 基础技能</span>
                    <span class="c4-tag tag-cognitive">Cognitive: 记忆与理解</span>
                    <span class="c4-tag tag-collaborative">Collaborative: 结对练习</span>
                    <span class="c4-tag tag-contextual">Contextual: 实习生角色</span>
                </div>

                <h3 style="margin-top: 30px;">生物学背景</h3>
                <p style="color: #555;">生信分析需要处理大量测序数据（通常几GB到几TB），Windows图形界面效率低，Linux命令行是行业标准。</p>

                <h3 style="margin-top: 20px;">真实场景</h3>
                <p style="color: #555;"><strong>场景：</strong>处理新到的测序数据</p>
                <p style="color: #555;"><strong>角色：</strong>实习生</p>
                <p style="color: #555;"><strong>任务：</strong>1小时内完成数据接收、整理和质量初检</p>

                <h3 style="margin-top: 20px;">本周任务</h3>
                <div class="card" style="margin-top: 10px;">
                    <p>✅ 安装Linux环境（WSL2或虚拟机）</p>
                    <p>✅ 完成20个基础命令练习</p>
                    <p>✅ 完成测序数据接收场景任务</p>
                    <p>✅ 写学习笔记：Linux基础命令速查表</p>
                    <p>✅ 完成本周学习反思</p>
                </div>
            </div>
        `;
    }

    backToDashboard() {
        this.switchPage('dashboard');
        this.loadDashboard();
    }

    loadConcepts() {
        const page = document.getElementById('page-concepts');
        page.innerHTML = `
            <div class="card">
                <div class="card-title">生信概念速查</div>
                <input type="text" id="concept-search" placeholder="搜索概念..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
                <div id="concepts-list"></div>
            </div>
        `;
        this.renderConcepts();
    }

    renderConcepts() {
        const concepts = [
            { term: 'FPKM', full: 'Fragments Per Kilobase Million', def: '标准化基因表达量', category: 'RNA-seq' },
            { term: 'TPM', full: 'Transcripts Per Million', def: '每百万转录本数', category: 'RNA-seq' },
            { term: 'FDR', full: 'False Discovery Rate', def: '错误发现率', category: '统计' },
            { term: 'VCF', full: 'Variant Call Format', def: '变异信息格式', category: '变异检测' },
            { term: 'UMAP', full: 'Uniform Manifold Approximation', def: '降维算法', category: '单细胞' }
        ];

        const html = concepts.map(c => `
            <div class="card" style="margin-bottom: 15px;">
                <h3>${c.term} - ${c.full}</h3>
                <span class="c4-tag tag-content">${c.category}</span>
                <p style="margin-top: 10px; color: #555;">${c.def}</p>
            </div>
        `).join('');
        document.getElementById('concepts-list').innerHTML = html;
    }

    loadExercises() {
        const page = document.getElementById('page-exercises');
        page.innerHTML = `
            <div class="card">
                <div class="card-title">练习题库</div>
                <div id="exercises-list"></div>
            </div>
        `;
        this.renderExercises();
    }

    renderExercises() {
        const exercises = [
            { id: 1, q: '如何统计FASTQ文件序列数？', difficulty: '★☆☆☆☆', category: 'Linux' },
            { id: 2, q: '提取FASTA文件序列ID', difficulty: '★☆☆☆☆', category: 'Linux' },
            { id: 3, q: '为什么用FDR而不是p-value？', difficulty: '★★★☆☆', category: 'RNA-seq' }
        ];

        const html = exercises.map(e => `
            <div class="card" style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <h3>题目 ${e.id}: ${e.q}</h3>
                        <div class="difficulty">难度: ${e.difficulty}</div>
                        <span class="c4-tag tag-content">${e.category}</span>
                    </div>
                    <button class="btn btn-primary" onclick="app.doExercise(${e.id})">开始</button>
                </div>
            </div>
        `).join('');
        document.getElementById('exercises-list').innerHTML = html;
    }

    doExercise(id) {
        const exercises = {
            1: { q: '如何统计FASTQ文件序列数？', answer: 'echo $(($(wc -l < file.fastq)/4))' },
            2: { q: '提取FASTA文件序列ID', answer: 'grep "^>" file.fasta' },
            3: { q: '为什么用FDR而不是p-value？', answer: '因为多重检验会产生大量假阳性，FDR进行校正' }
        };
        const ex = exercises[id];
        alert(`题目：${ex.q}\n\n参考答案：${ex.answer}`);
    }

    loadSkills() {
        const page = document.getElementById('page-skills');
        page.innerHTML = `
            <div class="card">
                <div class="card-title">技能等级</div>
                ${this.renderSkill('Linux', 1, 100, 100)}
                ${this.renderSkill('Shell', 1, 50, 100)}
                ${this.renderSkill('R语言', 1, 0, 100)}
                ${this.renderSkill('Python', 1, 0, 100)}
                ${this.renderSkill('RNA-seq', 1, 0, 100)}
                ${this.renderSkill('WES', 1, 0, 100)}
            </div>
        `;
    }

    renderSkill(name, level, exp, maxExp) {
        const percent = (exp / maxExp * 100).toFixed(0);
        return `
            <div style="margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span><strong>${name}</strong></span>
                    <span>Lv.${level} (${exp}/${maxExp})</span>
                </div>
                <div style="background: #ecf0f1; height: 20px; border-radius: 10px; overflow: hidden;">
                    <div style="background: #3498db; height: 100%; width: ${percent}%;"></div>
                </div>
            </div>
        `;
    }

    loadProjects() {
        const page = document.getElementById('page-projects');
        const projects = [
            { name: 'RNA-seq-pipeline', week: 8, status: '未开始' },
            { name: 'RNA-seq-DEG-analysis', week: 10, status: '未开始' },
            { name: 'WES-variant-calling', week: 12, status: '未开始' },
            { name: 'ChIP-seq-analysis', week: 14, status: '未开始' },
            { name: 'scRNA-seq-analysis', week: 18, status: '未开始' },
            { name: 'GEO-data-mining', week: 16, status: '未开始' },
            { name: 'multi-omics-integration', week: 19, status: '未开始' }
        ];

        const html = projects.map(p => `
            <div class="card" style="margin-bottom: 15px;">
                <h3>${p.name}</h3>
                <p style="color: #7f8c8d;">Week ${p.week} | 状态: ${p.status}</p>
                <button class="btn btn-primary" style="margin-top: 10px;">查看详情</button>
            </div>
        `).join('');

        page.innerHTML = `
            <div class="card">
                <div class="card-title">项目列表（7个）</div>
                ${html}
            </div>
        `;
    }

    loadReflection() {
        const page = document.getElementById('page-reflection');
        page.innerHTML = `
            <div class="card">
                <div class="card-title">本周学习反思</div>
                <div style="margin: 20px 0;">
                    <h3>1. 我学到了什么？（知识层面）</h3>
                    <textarea style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-top: 10px;"></textarea>
                </div>
                <div style="margin: 20px 0;">
                    <h3>2. 我是怎么学的？（方法层面）</h3>
                    <textarea style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-top: 10px;"></textarea>
                </div>
                <div style="margin: 20px 0;">
                    <h3>3. 哪些地方卡住了？为什么？</h3>
                    <textarea style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-top: 10px;"></textarea>
                </div>
                <div style="margin: 20px 0;">
                    <h3>4. 下周如何改进？</h3>
                    <textarea style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-top: 10px;"></textarea>
                </div>
                <button class="btn btn-primary">保存反思</button>
            </div>
        `;
    }
}

const app = new BioinfoApp();
