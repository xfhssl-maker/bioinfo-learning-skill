/**
 * ============================================================================
 * 生物信息学学习系统 - 应用主模块
 * ============================================================================
 *
 * @description  实现24周生物信息学学习课程的可视化面板核心功能，包括：
 *               - 页面导航与路由
 *               - 数据持久化存储
 *               - 番茄钟计时器
 *               - 学习进度跟踪
 *               - 技能系统与热力图
 *               - 面试准备模块
 *               - 资源中心渲染
 *
 * @author       Bioinfo Learning Team
 * @version      2.0.0
 * @lastUpdate   2026-04-01
 *
 * @dependencies
 *   - data.js    : 课程数据和资源数据
 *   - localStorage: 浏览器本地存储
 *
 * @structure
 *   1. AppState      : 全局状态管理
 *   2. 初始化函数    : initNavigation, initDashboard, initPomodoro等
 *   3. 渲染函数      : renderWeeks, renderSkills, renderConcepts等
 *   4. 事件处理      : 按钮点击、表单提交、键盘快捷键
 *   5. 数据持久化    : loadState, saveState
 *
 * ============================================================================
 */

// ============================================================================
// 应用状态
// ============================================================================
// 全局状态对象，存储用户的所有学习进度和设置
// 通过 localStorage 实现数据持久化

const AppState = {
    currentPage: 'dashboard',
    currentPhase: 1,
    currentWeek: 1,
    totalHours: 0,
    completedTasks: [],
    completedProjects: [],
    weeklyHours: {},
    streakDays: 0,
    interviewState: {
        category: null,
        index: 0
    },
    // 番茄钟状态
    pomodoro: {
        isRunning: false,
        isPaused: false,
        totalSeconds: 25 * 60,
        remainingSeconds: 25 * 60,
        intervalId: null,
        todayCount: 0,
        todayMinutes: 0
    },
    // 学习类型统计（视频、阅读、实践、项目、练习、复习）
    learningTypes: {
        video: { hours: 0, sessions: 0 },
        reading: { hours: 0, sessions: 0 },
        practice: { hours: 0, sessions: 0 },
        project: { hours: 0, sessions: 0 },
        exercise: { hours: 0, sessions: 0 },
        review: { hours: 0, sessions: 0 }
    }
};

// RPG技能系统实例（用于技能热力图和进度展示）
let skillSystem = null;

// ============================================================================
// 初始化入口
// ============================================================================
// 页面加载完成后依次初始化各个模块

document.addEventListener('DOMContentLoaded', () => {
    loadState();              // 加载本地存储的状态
    initSkillSystem();        // 初始化技能系统
    initNavigation();         // 初始化页面导航
    initDashboard();          // 初始化仪表盘
    initPomodoro();           // 初始化番茄钟
    initCurriculum();         // 初始化课程模块
    initInterview();          // 初始化面试模块
    initReference();          // 初始化资源中心
    initSkillsPage();         // 初始化技能页面
    initAIHelper();           // 初始化AI助手
    initAISettings();         // 初始化AI设置
    initSyncButtons();        // 初始化同步按钮
    initProgressPage();       // 初始化进度页面
    checkFirstTimeUser();     // 检查首次访问用户
    initKeyboardShortcuts();  // 初始化键盘快捷键
    updateUI();               // 更新UI显示
});

// ========== 键盘快捷键 ==========
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // 忽略输入框中的按键
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // Ctrl/Cmd + S 保存
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveArchive();
        }

        // 数字键快速切换页面
        if (e.key >= '1' && e.key <= '6') {
            const pages = ['dashboard', 'skills', 'curriculum', 'progress', 'interview', 'reference'];
            const pageIndex = parseInt(e.key) - 1;
            if (pages[pageIndex]) {
                e.preventDefault();
                switchPage(pages[pageIndex]);
            }
        }

        // P 键开始/暂停番茄钟
        if (e.key === 'p' || e.key === 'P') {
            if (AppState.pomodoro.isRunning) {
                pausePomodoro();
            } else {
                startPomodoro();
            }
        }

        // ? 显示帮助
        if (e.key === '?') {
            showHelpModal();
        }
    });
}

// ========== 帮助模态框 ==========
function showHelpModal() {
    let modal = document.getElementById('help-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'help-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-keyboard"></i> 快捷键帮助</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="help-section">
                        <h3>导航快捷键</h3>
                        <div class="shortcut-list">
                            <div class="shortcut-item"><kbd>1-8</kbd> 快速切换页面</div>
                            <div class="shortcut-item"><kbd>P</kbd> 开始/暂停番茄钟</div>
                            <div class="shortcut-item"><kbd>Ctrl+S</kbd> 保存数据</div>
                            <div class="shortcut-item"><kbd>?</kbd> 显示帮助</div>
                        </div>
                    </div>
                    <div class="help-section">
                        <h3>页面说明</h3>
                        <div class="page-list">
                            <div class="page-item"><span class="num">1</span> 仪表盘</div>
                            <div class="page-item"><span class="num">2</span> 技能面板</div>
                            <div class="page-item"><span class="num">3</span> 学习计划与进度</div>
                            <div class="page-item"><span class="num">4</span> 面试准备</div>
                            <div class="page-item"><span class="num">5</span> 资源中心</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
        modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
    }

    modal.classList.add('active');
}

// ========== AI设置 ==========
function initAISettings() {
    // 打开设置模态框
    document.getElementById('btn-open-settings')?.addEventListener('click', () => {
        const modal = document.getElementById('ai-settings-modal');
        if (!modal) return;

        // 加载当前设置
        const providerEl = document.getElementById('ai-provider');
        if (providerEl) providerEl.value = aiHelper.config.provider || 'anthropic';

        const apiKeyEl = document.getElementById('ai-api-key');
        if (apiKeyEl) apiKeyEl.value = aiHelper.config.apiKey || '';

        const baseUrlEl = document.getElementById('ai-base-url');
        if (baseUrlEl) baseUrlEl.value = aiHelper.config.baseUrl || '';

        const modelEl = document.getElementById('ai-model');
        if (modelEl) modelEl.value = aiHelper.config.model || 'claude-sonnet-4-20250514';

        const enabledEl = document.getElementById('ai-enabled');
        if (enabledEl) enabledEl.checked = aiHelper.config.enabled || false;

        // 显示/隐藏自定义URL
        toggleCustomUrl();

        modal.classList.add('active');
    });

    // 保存设置
    document.getElementById('btn-save-ai-settings')?.addEventListener('click', () => {
        const providerEl = document.getElementById('ai-provider');
        const apiKeyEl = document.getElementById('ai-api-key');
        const baseUrlEl = document.getElementById('ai-base-url');
        const modelEl = document.getElementById('ai-model');
        const enabledEl = document.getElementById('ai-enabled');

        const config = {
            provider: providerEl ? providerEl.value : 'anthropic',
            apiKey: apiKeyEl ? apiKeyEl.value : '',
            baseUrl: baseUrlEl ? baseUrlEl.value : '',
            model: modelEl ? modelEl.value : 'claude-sonnet-4-20250514',
            enabled: enabledEl ? enabledEl.checked : false
        };

        aiHelper.saveConfig(config);

        const modal = document.getElementById('ai-settings-modal');
        if (modal) modal.classList.remove('active');
        showToast('AI设置已保存', 'success');
    });

    // 服务商切换
    document.getElementById('ai-provider')?.addEventListener('change', toggleCustomUrl);

    // 关闭模态框
    document.querySelectorAll('#ai-settings-modal .modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.getElementById('ai-settings-modal');
            if (modal) modal.classList.remove('active');
        });
    });

    document.getElementById('ai-settings-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'ai-settings-modal') {
            e.target.classList.remove('active');
        }
    });
}

function toggleCustomUrl() {
    const provider = document.getElementById('ai-provider')?.value;
    const customGroup = document.getElementById('custom-url-group');
    if (customGroup) {
        customGroup.style.display = provider === 'custom' ? 'block' : 'none';
    }
}

// ========== 数据同步功能 ==========
let fileHandle = null; // 保存文件句柄用于自动保存

function initSyncButtons() {
    // 存档按钮
    document.getElementById('btn-save-archive')?.addEventListener('click', () => {
        saveArchive();
    });

    // 读档按钮
    document.getElementById('btn-load-archive')?.addEventListener('click', () => {
        loadArchive();
    });

    // 动态添加导出报告按钮
    const settingsBtn = document.getElementById('btn-open-settings');
    if (settingsBtn && !document.getElementById('btn-export-report')) {
        const exportBtn = document.createElement('button');
        exportBtn.className = 'btn btn-secondary btn-sm';
        exportBtn.id = 'btn-export-report';
        exportBtn.style.cssText = 'width: 100%; margin-top: 8px;';
        exportBtn.innerHTML = '<i class="fas fa-file-export"></i> 导出报告';
        exportBtn.addEventListener('click', exportLearningReport);
        settingsBtn.after(exportBtn);
    }

    // 更新上次存档时间
    updateLastSyncTime();
}

// ========== 导出学习报告 ==========
function exportLearningReport() {
    const report = generateReport();

    // 创建下载
    const blob = new Blob([report], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `生信学习报告_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('报告已导出！', 'success');
}

function generateReport() {
    const userName = localStorage.getItem('bioinfo_user_name') || '学习者';
    const startDate = localStorage.getItem('bioinfo_start_date');
    const streak = calculateStreak();

    // 计算统计数据
    const totalHours = AppState.totalHours;
    const completedTasks = AppState.completedTasks.length;
    const completedProjects = AppState.completedProjects.length;

    // 技能数据
    const skillData = skillSystem ? Object.entries(SKILL_SYSTEM.skills).map(([id, skill]) => {
        const progress = skillSystem.getSkillProgress(id);
        return {
            name: skill.name,
            level: progress?.level || 1,
            exp: progress?.currentExp || 0
        };
    }) : [];

    // 成就数据
    const achievements = skillSystem?.unlockedAchievements || [];
    const title = skillSystem?.currentTitle || '生信小白';

    // 最近学习记录
    const recentDates = Object.keys(AppState.weeklyHours).sort().reverse().slice(0, 14);
    const recentLogs = recentDates.map(date => ({
        date,
        hours: AppState.weeklyHours[date]
    }));

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>生信学习报告 - ${userName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; color: #333; line-height: 1.6; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; padding: 40px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border-radius: 16px; margin-bottom: 32px; }
        .header h1 { font-size: 2rem; margin-bottom: 8px; }
        .header .subtitle { opacity: 0.9; }
        .header .date { font-size: 0.875rem; opacity: 0.7; margin-top: 16px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .stat-card { background: white; padding: 24px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .stat-value { font-size: 2rem; font-weight: 700; color: #6366f1; }
        .stat-label { font-size: 0.875rem; color: #666; margin-top: 4px; }
        .section { background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .section h2 { font-size: 1.25rem; margin-bottom: 16px; color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 8px; }
        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .skill-item { padding: 16px; background: #f8f9fa; border-radius: 8px; }
        .skill-name { font-weight: 600; margin-bottom: 4px; }
        .skill-level { color: #6366f1; font-size: 0.875rem; }
        .skill-bar { height: 6px; background: #e0e0e0; border-radius: 3px; margin-top: 8px; }
        .skill-fill { height: 100%; background: #6366f1; border-radius: 3px; }
        .achievements { display: flex; flex-wrap: wrap; gap: 12px; }
        .achievement { padding: 12px 16px; background: #fef3c7; border-radius: 8px; display: flex; align-items: center; gap: 8px; }
        .achievement-icon { font-size: 1.5rem; }
        .logs-table { width: 100%; border-collapse: collapse; }
        .logs-table th, .logs-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        .logs-table th { background: #f8f9fa; font-weight: 600; }
        .footer { text-align: center; padding: 24px; color: #666; font-size: 0.875rem; }
        @media print { body { background: white; } .section { box-shadow: none; border: 1px solid #eee; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧬 生信学习报告</h1>
            <div class="subtitle">${userName} · ${title}</div>
            <div class="date">生成时间：${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${totalHours.toFixed(1)}h</div>
                <div class="stat-label">总学习时长</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${completedTasks}</div>
                <div class="stat-label">完成任务</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${completedProjects}</div>
                <div class="stat-label">完成项目</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${streak}天</div>
                <div class="stat-label">连续学习</div>
            </div>
        </div>

        <div class="section">
            <h2>⚔️ 技能等级</h2>
            <div class="skills-grid">
                ${skillData.map(skill => `
                    <div class="skill-item">
                        <div class="skill-name">${skill.name}</div>
                        <div class="skill-level">Lv.${skill.level} · ${skill.exp} EXP</div>
                        <div class="skill-bar"><div class="skill-fill" style="width: ${(skill.exp % 500) / 5}%"></div></div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>🏆 已解锁成就 (${achievements.length}/${SKILL_SYSTEM?.achievements?.length || 20})</h2>
            <div class="achievements">
                ${achievements.length > 0 ? achievements.map(achId => {
                    const ach = SKILL_SYSTEM?.achievements?.find(a => a.id === achId);
                    return ach ? `<div class="achievement"><span class="achievement-icon">${ach.icon}</span><span>${ach.name}</span></div>` : '';
                }).join('') : '<div style="color: #666;">暂无解锁成就，继续努力！</div>'}
            </div>
        </div>

        <div class="section">
            <h2>📊 最近学习记录</h2>
            <table class="logs-table">
                <thead><tr><th>日期</th><th>学习时长</th></tr></thead>
                <tbody>
                    ${recentLogs.map(log => `
                        <tr><td>${log.date}</td><td>${log.hours.toFixed(1)} 小时</td></tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="footer">
            由生信学习助手自动生成 | Powered by Claude Code
        </div>
    </div>
</body>
</html>`;
}

function updateLastSyncTime() {
    const lastSync = localStorage.getItem('bioinfo_last_sync');
    const timeSpan = document.getElementById('last-sync-time');
    if (timeSpan) {
        if (lastSync) {
            const date = new Date(lastSync);
            timeSpan.textContent = `上次存档: ${date.toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
        } else {
            timeSpan.textContent = '未存档';
        }
    }
}

// 存档到文件
async function saveArchive() {
    const data = exportAllData();
    const jsonString = JSON.stringify(data, null, 2);

    try {
        // 尝试使用 File System Access API
        if ('showSaveFilePicker' in window) {
            // 如果已有文件句柄，直接写入
            if (fileHandle) {
                const writable = await fileHandle.createWritable();
                await writable.write(jsonString);
                await writable.close();
                const now = new Date().toISOString();
                localStorage.setItem('bioinfo_last_sync', now);
                updateLastSyncTime();
                showToast('✅ 存档成功！', 'success');
                return;
            }

            // 否则让用户选择保存位置
            const options = {
                suggestedName: 'dashboard_data.json',
                types: [{
                    description: 'JSON 文件',
                    accept: { 'application/json': ['.json'] }
                }],
                startIn: 'documents'
            };

            fileHandle = await window.showSaveFilePicker(options);
            const writable = await fileHandle.createWritable();
            await writable.write(jsonString);
            await writable.close();

            const now = new Date().toISOString();
            localStorage.setItem('bioinfo_last_sync', now);
            updateLastSyncTime();
            showToast('✅ 存档成功！', 'success');
        } else {
            // 回退方案：下载文件
            downloadFile(jsonString, 'dashboard_data.json');
            showToast('✅ 存档已下载！请移动到 data 目录', 'success');
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Save error:', err);
            // 回退方案
            downloadFile(jsonString, 'dashboard_data.json');
            showToast('存档已下载，请保存到 data 目录', 'info');
        }
    }
}

// 读档从文件
async function loadArchive() {
    try {
        // 尝试使用 File System Access API
        if ('showOpenFilePicker' in window) {
            const options = {
                types: [{
                    description: 'JSON 文件',
                    accept: { 'application/json': ['.json'] }
                }],
                multiple: false
            };

            const [handle] = await window.showOpenFilePicker(options);
            fileHandle = handle; // 保存句柄用于后续自动保存

            const file = await handle.getFile();
            const text = await file.text();
            const data = JSON.parse(text);

            if (importAllData(data)) {
                const now = new Date().toISOString();
                localStorage.setItem('bioinfo_last_sync', now);
                updateLastSyncTime();
                showToast('✅ 读档成功！', 'success');
                updateUI();
                loadTodayTasks();
                updateProgressRing();
                updatePomodoroStats();
            }
        } else {
            // 回退方案：文件上传
            showFileUploadDialog();
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Load error:', err);
            showToast('读档失败: ' + err.message, 'error');
        }
    }
}

// 下载文件（回退方案）
function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const now = new Date().toISOString();
    localStorage.setItem('bioinfo_last_sync', now);
    updateLastSyncTime();
}

// 文件上传对话框（回退方案）
function showFileUploadDialog() {
    let modal = document.getElementById('import-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'import-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>📂 读档</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="upload-area" id="upload-area" style="border: 2px dashed #ccc; padding: 40px; text-align: center; border-radius: 8px; cursor: pointer;">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 48px; color: #999;"></i>
                        <p style="margin-top: 16px;">点击选择文件或拖拽到此处</p>
                        <input type="file" id="file-input" accept=".json" style="display: none;">
                    </div>
                    <div id="manual-paste" style="margin-top: 16px;">
                        <p style="color: #666; font-size: 13px;">或者粘贴JSON内容：</p>
                        <textarea id="import-textarea" style="width:100%;height:200px;font-family:monospace;font-size:12px;margin-top:8px;" placeholder="粘贴JSON数据..."></textarea>
                        <button id="btn-do-import" class="btn btn-primary" style="margin-top:12px;width:100%;">确认读档</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // 文件选择
        const uploadArea = modal.querySelector('#upload-area');
        const fileInput = modal.querySelector('#file-input');

        uploadArea.onclick = () => fileInput.click();

        uploadArea.ondragover = (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#4f46e5';
            uploadArea.style.background = '#f0f0ff';
        };

        uploadArea.ondragleave = () => {
            uploadArea.style.borderColor = '#ccc';
            uploadArea.style.background = '';
        };

        uploadArea.ondrop = async (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#ccc';
            uploadArea.style.background = '';
            const file = e.dataTransfer.files[0];
            if (file) {
                await handleFileSelect(file, modal);
            }
        };

        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                await handleFileSelect(file, modal);
            }
        };

        // 粘贴导入
        modal.querySelector('#btn-do-import').onclick = () => {
            try {
                const jsonStr = document.getElementById('import-textarea').value;
                const data = JSON.parse(jsonStr);
                if (importAllData(data)) {
                    const now = new Date().toISOString();
                    localStorage.setItem('bioinfo_last_sync', now);
                    updateLastSyncTime();
                    showToast('读档成功！', 'success');
                    modal.classList.remove('active');
                    updateUI();
                    loadTodayTasks();
                }
            } catch (e) {
                showToast('数据格式错误：' + e.message, 'error');
            }
        };

        modal.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
    }

    modal.classList.add('active');
}

async function handleFileSelect(file, modal) {
    try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (importAllData(data)) {
            const now = new Date().toISOString();
            localStorage.setItem('bioinfo_last_sync', now);
            updateLastSyncTime();
            showToast('读档成功！', 'success');
            modal.classList.remove('active');
            updateUI();
            loadTodayTasks();
            updateProgressRing();
            updatePomodoroStats();
        }
    } catch (e) {
        showToast('文件读取失败：' + e.message, 'error');
    }
}

// ========== 技能系统初始化 ==========
function initSkillSystem() {
    skillSystem = new SkillSystem();

    // 从localStorage加载技能数据
    const savedSkills = localStorage.getItem('bioinfo_skills');
    if (savedSkills) {
        skillSystem.import(JSON.parse(savedSkills));
    }
}

function saveSkillSystem() {
    localStorage.setItem('bioinfo_skills', JSON.stringify(skillSystem.export()));
}

// ========== 状态管理 ==========
const DATA_FILE = 'dashboard_data.json';

function loadState() {
    // 首先尝试从URL参数获取数据（由skill注入）
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');

    if (dataParam) {
        try {
            const decodedData = JSON.parse(decodeURIComponent(atob(dataParam)));
            importAllData(decodedData);
            console.log('从URL参数加载数据成功');
            return;
        } catch (e) {
            console.warn('URL参数解析失败，使用本地存储');
        }
    }

    // 尝试从localStorage加载
    const saved = localStorage.getItem('bioinfo_learning_state');
    if (saved) {
        const state = JSON.parse(saved);
        Object.assign(AppState, state);
    }

    // 检查是否是新的一天，重置今日番茄钟统计
    const today = new Date().toISOString().split('T')[0];
    const lastDate = localStorage.getItem('bioinfo_last_date');
    if (lastDate !== today) {
        AppState.pomodoro.todayCount = 0;
        AppState.pomodoro.todayMinutes = 0;
        localStorage.setItem('bioinfo_last_date', today);
    }

    // 加载学习类型统计
    const savedTypes = localStorage.getItem('bioinfo_learning_types');
    if (savedTypes) {
        AppState.learningTypes = JSON.parse(savedTypes);
    }

    // 加载番茄钟历史
    const savedPomo = localStorage.getItem('bioinfo_pomodoro_history');
    if (savedPomo) {
        AppState.pomodoroHistory = JSON.parse(savedPomo);
    }
}

function saveState() {
    localStorage.setItem('bioinfo_learning_state', JSON.stringify(AppState));
    localStorage.setItem('bioinfo_learning_types', JSON.stringify(AppState.learningTypes));

    // 触发自动保存到剪贴板（供skill读取）
    triggerAutoSave();
}

// 导出所有数据（用于同步到文件）
function exportAllData() {
    const data = {
        _meta: {
            version: "1.0",
            last_updated: new Date().toISOString(),
            description: "生信学习助手数据存储 - 自动同步"
        },
        user: {
            name: localStorage.getItem('bioinfo_user_name') || '',
            github: localStorage.getItem('bioinfo_user_github') || '',
            blog: localStorage.getItem('bioinfo_user_blog') || '',
            start_date: localStorage.getItem('bioinfo_start_date') || null,
            current_week: AppState.currentWeek,
            current_phase: AppState.currentPhase
        },
        settings: {
            daily_hours_target: parseFloat(localStorage.getItem('bioinfo_daily_target') || '2.5'),
            weekly_hours_target: parseFloat(localStorage.getItem('bioinfo_weekly_target') || '15'),
            remind_time: localStorage.getItem('bioinfo_remind_time') || '20:00',
            pomodoro_minutes: AppState.pomodoro.totalSeconds / 60
        },
        progress: {
            total_hours: AppState.totalHours,
            total_exp: calculateTotalExp(),
            completed_tasks: AppState.completedTasks,
            completed_projects: AppState.completedProjects,
            blog_posts: JSON.parse(localStorage.getItem('bioinfo_blog_posts') || '[]'),
            interview_practiced: parseInt(localStorage.getItem('bioinfo_interview_count') || '0')
        },
        daily_log: AppState.weeklyHours,
        learning_types: AppState.learningTypes,
        pomodoro: {
            today_count: AppState.pomodoro.todayCount,
            today_minutes: AppState.pomodoro.todayMinutes,
            total_count: parseInt(localStorage.getItem('bioinfo_pomo_total') || '0'),
            total_minutes: parseInt(localStorage.getItem('bioinfo_pomo_total_min') || '0'),
            last_date: localStorage.getItem('bioinfo_last_date'),
            history: JSON.parse(localStorage.getItem('bioinfo_pomodoro_history') || '{}')
        },
        skills: skillSystem ? skillSystem.export() : {},
        achievements: {
            unlocked: skillSystem ? skillSystem.unlockedAchievements : [],
            current_title: skillSystem ? skillSystem.currentTitle : '生信小白',
            progress: {}
        },
        ai_settings: {
            enabled: aiHelper?.config?.enabled || false,
            provider: aiHelper?.config?.provider || 'anthropic',
            api_key: '', // 安全考虑不导出API密钥
            base_url: aiHelper?.config?.baseUrl || '',
            model: aiHelper?.config?.model || 'claude-sonnet-4-20250514'
        },
        notes: JSON.parse(localStorage.getItem('bioinfo_notes') || '[]'),
        activity_log: JSON.parse(localStorage.getItem('bioinfo_activity_log') || '[]')
    };

    return data;
}

// 导入所有数据（从文件同步）
function importAllData(data) {
    if (!data || !data._meta) {
        console.warn('无效的数据格式');
        return false;
    }

    // 恢复用户信息
    if (data.user) {
        localStorage.setItem('bioinfo_user_name', data.user.name || '');
        localStorage.setItem('bioinfo_user_github', data.user.github || '');
        localStorage.setItem('bioinfo_user_blog', data.user.blog || '');
        localStorage.setItem('bioinfo_start_date', data.user.start_date || '');
        AppState.currentWeek = data.user.current_week || 1;
        AppState.currentPhase = data.user.current_phase || 1;
    }

    // 恢复设置
    if (data.settings) {
        localStorage.setItem('bioinfo_daily_target', data.settings.daily_hours_target || 2.5);
        localStorage.setItem('bioinfo_weekly_target', data.settings.weekly_hours_target || 15);
        localStorage.setItem('bioinfo_remind_time', data.settings.remind_time || '20:00');
        AppState.pomodoro.totalSeconds = (data.settings.pomodoro_minutes || 25) * 60;
        AppState.pomodoro.remainingSeconds = AppState.pomodoro.totalSeconds;
    }

    // 恢复进度
    if (data.progress) {
        AppState.totalHours = data.progress.total_hours || 0;
        AppState.completedTasks = data.progress.completed_tasks || [];
        AppState.completedProjects = data.progress.completed_projects || [];
        localStorage.setItem('bioinfo_blog_posts', JSON.stringify(data.progress.blog_posts || []));
        localStorage.setItem('bioinfo_interview_count', data.progress.interview_practiced || 0);
    }

    // 恢复每日记录
    if (data.daily_log) {
        AppState.weeklyHours = data.daily_log;
    }

    // 恢复学习类型
    if (data.learning_types) {
        AppState.learningTypes = data.learning_types;
        localStorage.setItem('bioinfo_learning_types', JSON.stringify(data.learning_types));
    }

    // 恢复番茄钟数据
    if (data.pomodoro) {
        AppState.pomodoro.todayCount = data.pomodoro.today_count || 0;
        AppState.pomodoro.todayMinutes = data.pomodoro.today_minutes || 0;
        localStorage.setItem('bioinfo_pomo_total', data.pomodoro.total_count || 0);
        localStorage.setItem('bioinfo_pomo_total_min', data.pomodoro.total_minutes || 0);
        localStorage.setItem('bioinfo_last_date', data.pomodoro.last_date || '');
        localStorage.setItem('bioinfo_pomodoro_history', JSON.stringify(data.pomodoro.history || {}));
    }

    // 恢复技能数据
    if (data.skills && skillSystem) {
        skillSystem.import(data.skills);
        saveSkillSystem();
    }

    // 恢复成就数据
    if (data.achievements && skillSystem) {
        skillSystem.unlockedAchievements = data.achievements.unlocked || [];
        skillSystem.currentTitle = data.achievements.current_title || '生信小白';
    }

    // 恢复笔记和活动日志
    if (data.notes) {
        localStorage.setItem('bioinfo_notes', JSON.stringify(data.notes));
    }
    if (data.activity_log) {
        localStorage.setItem('bioinfo_activity_log', JSON.stringify(data.activity_log));
    }

    // 保存状态
    saveState();
    return true;
}

// 触发自动保存（将数据写入隐藏的textarea供skill读取）
function triggerAutoSave() {
    const data = exportAllData();
    const jsonString = JSON.stringify(data, null, 2);

    // 更新隐藏的导出区域
    let exportArea = document.getElementById('data-export-area');
    if (!exportArea) {
        exportArea = document.createElement('textarea');
        exportArea.id = 'data-export-area';
        exportArea.style.cssText = 'position:fixed;left:-9999px;opacity:0;';
        document.body.appendChild(exportArea);
    }
    exportArea.value = jsonString;

    // 存储到localStorage以便skill读取
    localStorage.setItem('bioinfo_export_data', jsonString);
}

function calculateTotalExp() {
    if (!skillSystem) return 0;
    return Object.values(skillSystem.skills).reduce((sum, skill) => sum + (skill.currentExp || 0), 0);
}

// ========== 导航 ==========
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            switchPage(page);
        });
    });
}

function switchPage(pageName) {
    // 更新导航状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });

    // 切换页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page-${pageName}`).classList.add('active');

    // 更新标题
    const titles = {
        dashboard: '仪表盘',
        curriculum: '学习计划与进度',
        interview: '面试准备',
        reference: '资源中心',
        skills: '技能面板'
    };
    document.getElementById('page-title').textContent = titles[pageName] || pageName;

    AppState.currentPage = pageName;
}

// ========== 仪表盘 ==========
function initDashboard() {
    // 设置今日日期
    const today = new Date();
    const todayDateEl = document.getElementById('today-date');
    if (todayDateEl) {
        todayDateEl.textContent = today.toLocaleDateString('zh-CN', {
            year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
        });
    }

    // 记录学习时长按钮
    const logHoursBtn = document.getElementById('btn-log-hours');
    if (logHoursBtn) {
        logHoursBtn.addEventListener('click', logHours);
    }

    // 加载今日任务
    loadTodayTasks();

    // 更新进度环
    updateProgressRing();

    // 更新番茄钟统计
    updatePomodoroStats();
}

// ========== 番茄钟 ==========
function initPomodoro() {
    // 开始按钮
    const startBtn = document.getElementById('btn-start-pomodoro');
    if (startBtn) startBtn.addEventListener('click', startPomodoro);

    // 暂停按钮
    const pauseBtn = document.getElementById('btn-pause-pomodoro');
    if (pauseBtn) pauseBtn.addEventListener('click', pausePomodoro);

    // 重置按钮
    const resetBtn = document.getElementById('btn-reset-pomodoro');
    if (resetBtn) resetBtn.addEventListener('click', resetPomodoro);

    // 时间预设按钮
    document.querySelectorAll('.time-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            if (AppState.pomodoro.isRunning) return; // 运行中不能切换

            document.querySelectorAll('.time-preset').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const minutes = parseInt(btn.dataset.minutes);
            AppState.pomodoro.totalSeconds = minutes * 60;
            AppState.pomodoro.remainingSeconds = minutes * 60;
            updateTimerDisplay();
        });
    });

    updateTimerDisplay();
}

function startPomodoro() {
    const pomo = AppState.pomodoro;

    if (pomo.isPaused) {
        // 从暂停恢复
        pomo.isPaused = false;
    } else {
        // 新开始
        pomo.isRunning = true;
        pomo.remainingSeconds = pomo.totalSeconds;
    }

    pomo.isRunning = true;

    // 更新按钮状态
    document.getElementById('btn-start-pomodoro').disabled = true;
    document.getElementById('btn-pause-pomodoro').disabled = false;
    document.getElementById('timer-minutes').parentElement.classList.add('running');

    // 禁用时间预设
    document.querySelectorAll('.time-preset').forEach(btn => btn.disabled = true);

    // 开始计时
    pomo.intervalId = setInterval(() => {
        pomo.remainingSeconds--;
        updateTimerDisplay();

        if (pomo.remainingSeconds <= 0) {
            completePomodoro();
        }
    }, 1000);

    saveState();
}

function pausePomodoro() {
    const pomo = AppState.pomodoro;
    pomo.isPaused = true;
    pomo.isRunning = false;

    clearInterval(pomo.intervalId);

    document.getElementById('btn-start-pomodoro').disabled = false;
    document.getElementById('btn-start-pomodoro').innerHTML = '<i class="fas fa-play"></i> 继续';
    document.getElementById('btn-pause-pomodoro').disabled = true;
    document.getElementById('timer-minutes').parentElement.classList.remove('running');

    saveState();
}

function resetPomodoro() {
    const pomo = AppState.pomodoro;

    clearInterval(pomo.intervalId);
    pomo.isRunning = false;
    pomo.isPaused = false;
    pomo.remainingSeconds = pomo.totalSeconds;

    document.getElementById('btn-start-pomodoro').disabled = false;
    document.getElementById('btn-start-pomodoro').innerHTML = '<i class="fas fa-play"></i> 开始';
    document.getElementById('btn-pause-pomodoro').disabled = true;
    document.getElementById('timer-minutes').parentElement.classList.remove('running');

    // 启用时间预设
    document.querySelectorAll('.time-preset').forEach(btn => btn.disabled = false);

    updateTimerDisplay();
    saveState();
}

function completePomodoro() {
    const pomo = AppState.pomodoro;

    clearInterval(pomo.intervalId);
    pomo.isRunning = false;
    pomo.isPaused = false;

    // 计算完成的时长（分钟）
    const minutes = pomo.totalSeconds / 60;
    const hours = minutes / 60;

    // 更新今日统计
    pomo.todayCount++;
    pomo.todayMinutes += minutes;

    // 记录学习时长
    const today = new Date().toISOString().split('T')[0];
    if (!AppState.weeklyHours[today]) {
        AppState.weeklyHours[today] = 0;
    }
    AppState.weeklyHours[today] += hours;
    AppState.totalHours += hours;

    // 获得经验
    const exp = Math.round(minutes * SKILL_SYSTEM.expRules.learning_hour / 60);
    const skillSelect = document.getElementById('log-skill');
    const selectedSkill = skillSelect.value;

    if (selectedSkill) {
        addExpToSkill(selectedSkill, exp);
    } else {
        // 默认加到当前周对应的技能
        const skillMap = {
            1: 'linux', 2: 'shell', 3: 'r_lang', 4: 'r_lang', 5: 'python', 6: 'python', 7: 'linux',
            8: 'rna_seq', 9: 'rna_seq', 10: 'rna_seq',
            11: 'wes', 12: 'wes',
            13: 'chip_seq', 14: 'chip_seq',
            15: 'data_mining', 16: 'data_mining',
            17: 'scrna', 18: 'scrna',
            19: 'data_mining', 20: 'r_lang'
        };
        const mainSkill = skillMap[AppState.currentWeek] || 'r_lang';
        addExpToSkill(mainSkill, exp);
    }

    // 播放提示音和通知
    playNotification();
    showToast(`🍅 番茄钟完成！+${exp} EXP`, 'success');

    // 重置计时器
    pomo.remainingSeconds = pomo.totalSeconds;

    document.getElementById('btn-start-pomodoro').disabled = false;
    document.getElementById('btn-start-pomodoro').innerHTML = '<i class="fas fa-play"></i> 开始';
    document.getElementById('btn-pause-pomodoro').disabled = true;
    document.getElementById('timer-minutes').parentElement.classList.remove('running');
    document.querySelectorAll('.time-preset').forEach(btn => btn.disabled = false);

    updateTimerDisplay();
    updatePomodoroStats();
    updateUI();
    saveState();
    checkAndUnlockAchievements();
}

function updateTimerDisplay() {
    const pomo = AppState.pomodoro;
    const minutes = Math.floor(pomo.remainingSeconds / 60);
    const seconds = pomo.remainingSeconds % 60;

    document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('timer-seconds').textContent = String(seconds).padStart(2, '0');
}

function updatePomodoroStats() {
    const todayPomodorosEl = document.getElementById('today-pomodoros');
    if (todayPomodorosEl) todayPomodorosEl.textContent = AppState.pomodoro.todayCount;

    const todayPomoHoursEl = document.getElementById('today-pomo-hours');
    if (todayPomoHoursEl) todayPomoHoursEl.textContent = (AppState.pomodoro.todayMinutes / 60).toFixed(1) + 'h';
}

function playNotification() {
    // 创建简单的提示音
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;

        oscillator.start();
        setTimeout(() => oscillator.stop(), 200);
    } catch (e) {
        console.log('Audio not supported');
    }
}

function loadTodayTasks() {
    const weekData = CURRICULUM_DATA.weeks.find(w => w.week === AppState.currentWeek);
    if (!weekData) return;

    const tasksList = document.getElementById('today-tasks-list');
    if (!tasksList) return;

    const completedCount = weekData.tasks.filter(t => AppState.completedTasks.includes(t.id)).length;
    const totalCount = weekData.tasks.length;

    // 更新任务计数
    const taskCountEl = document.getElementById('task-count');
    if (taskCountEl) {
        taskCountEl.textContent = `${completedCount}/${totalCount}`;
    }

    tasksList.innerHTML = weekData.tasks.map(task => {
        const isCompleted = AppState.completedTasks.includes(task.id);
        return `
            <div class="task-item ${isCompleted ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-checkbox ${isCompleted ? 'checked' : ''}"
                     onclick="toggleTask('${task.id}')">
                    ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <span class="task-text ${isCompleted ? 'completed' : ''}">${task.desc}</span>
                <span class="task-exp">+30 EXP</span>
            </div>
        `;
    }).join('');

    // 如果所有任务完成，显示庆祝效果
    if (completedCount === totalCount && totalCount > 0) {
        tasksList.innerHTML += `
            <div class="week-complete-banner">
                <i class="fas fa-trophy"></i>
                <span>恭喜！本周任务全部完成！</span>
            </div>
        `;
    }
}

function toggleTask(taskId) {
    const index = AppState.completedTasks.indexOf(taskId);
    if (index > -1) {
        AppState.completedTasks.splice(index, 1);
    } else {
        AppState.completedTasks.push(taskId);
        showToast('任务完成！', 'success');

        // 完成任务获得经验
        const weekNum = parseInt(taskId.match(/w(\d+)/)?.[1] || AppState.currentWeek);
        const skillMap = {
            1: 'linux', 2: 'shell', 3: 'r_lang', 4: 'r_lang', 5: 'python', 6: 'python', 7: 'linux',
            8: 'rna_seq', 9: 'rna_seq', 10: 'rna_seq',
            11: 'wes', 12: 'wes',
            13: 'chip_seq', 14: 'chip_seq',
            15: 'data_mining', 16: 'data_mining',
            17: 'scrna', 18: 'scrna',
            19: 'data_mining', 20: 'r_lang'
        };
        const mainSkill = skillMap[weekNum] || 'r_lang';
        addExpToSkill(mainSkill, SKILL_SYSTEM.expRules.task_complete);

        // 检查成就
        checkAndUnlockAchievements();
    }
    saveState();
    loadTodayTasks();
    updateUI();
    updateCharacterInfo();
}

function logHours() {
    const input = document.getElementById('log-hours');
    const typeSelect = document.getElementById('log-type');
    const skillSelect = document.getElementById('log-skill');

    const hours = parseFloat(input.value);
    if (!hours || hours <= 0) {
        showToast('请输入有效时长', 'error');
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!AppState.weeklyHours[today]) {
        AppState.weeklyHours[today] = 0;
    }
    AppState.weeklyHours[today] += hours;
    AppState.totalHours += hours;

    // 记录学习类型
    const learningType = typeSelect.value;
    if (AppState.learningTypes[learningType]) {
        AppState.learningTypes[learningType].hours += hours;
        AppState.learningTypes[learningType].sessions++;
    }

    // 计算经验
    const exp = Math.round(hours * SKILL_SYSTEM.expRules.learning_hour);
    const selectedSkill = skillSelect.value;

    if (selectedSkill) {
        addExpToSkill(selectedSkill, exp);
    } else {
        // 根据当前周确定应该增加经验的技能
        const skillMap = {
            1: 'linux', 2: 'shell', 3: 'r_lang', 4: 'r_lang', 5: 'python', 6: 'python', 7: 'linux',
            8: 'rna_seq', 9: 'rna_seq', 10: 'rna_seq',
            11: 'wes', 12: 'wes',
            13: 'chip_seq', 14: 'chip_seq',
            15: 'data_mining', 16: 'data_mining',
            17: 'scrna', 18: 'scrna',
            19: 'data_mining', 20: 'r_lang'
        };
        const mainSkill = skillMap[AppState.currentWeek] || 'r_lang';
        addExpToSkill(mainSkill, exp);
    }

    // 清空表单
    input.value = '';
    saveState();
    updateUI();
    showToast(`已记录 ${hours} 小时 (+${exp} EXP)`, 'success');
    updateCharacterInfo();
    checkAndUnlockAchievements();
}

function updateProgressRing() {
    const weekData = CURRICULUM_DATA.weeks.find(w => w.week === AppState.currentWeek);
    if (!weekData) return;

    const totalTasks = weekData.tasks.length;
    const completedTasks = weekData.tasks.filter(t => AppState.completedTasks.includes(t.id)).length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // 使用仪表盘中的gauge元素
    const gaugePercent = document.getElementById('gauge-percent');
    const gaugeFill = document.getElementById('gauge-fill');
    const gaugeStatus = document.getElementById('gauge-status');

    if (gaugePercent) {
        gaugePercent.textContent = Math.round(progress) + '%';
    }
    if (gaugeFill) {
        gaugeFill.style.width = progress + '%';
    }
    if (gaugeStatus) {
        if (progress === 100) {
            gaugeStatus.textContent = '完美完成！';
        } else if (progress >= 75) {
            gaugeStatus.textContent = '即将完成！';
        } else if (progress >= 50) {
            gaugeStatus.textContent = '进展顺利！';
        } else if (progress > 0) {
            gaugeStatus.textContent = '继续努力！';
        } else {
            gaugeStatus.textContent = '开始本周任务吧！';
        }
    }

    // 计算本周时长
    const weekStart = getWeekStart(new Date());
    let weekHours = 0;
    Object.entries(AppState.weeklyHours).forEach(([date, hours]) => {
        if (new Date(date) >= weekStart) {
            weekHours += hours;
        }
    });
    const weeklyHoursEl = document.getElementById('weekly-hours');
    if (weeklyHoursEl) {
        weeklyHoursEl.textContent = weekHours.toFixed(1) + 'h';
    }
}

function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

// ========== 学习计划 ==========
function initCurriculum() {
    // 阶段切换
    const phaseTabs = document.querySelectorAll('.phase-tab');
    phaseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            phaseTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            AppState.currentPhase = parseInt(tab.dataset.phase);
            renderWeeks();
        });
    });

    renderWeeks();
}

function renderWeeks() {
    const weeksList = document.getElementById('weeks-list');
    if (!weeksList) return;

    const weeks = CURRICULUM_DATA.weeks.filter(w => w.phase === AppState.currentPhase);

    weeksList.innerHTML = weeks.map(week => {
        const isCurrent = week.week === AppState.currentWeek;
        const isCompleted = week.tasks.every(t => AppState.completedTasks.includes(t.id));

        return `
            <div class="week-card ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}"
                 onclick="showWeekDetail(${week.week})">
                <div class="week-number">第 ${week.week} 周</div>
                <div class="week-title">${week.title}</div>
                <div class="week-status">
                    <span><i class="fas fa-book"></i> ${week.learning_hours}h</span>
                    <span><i class="fas fa-code"></i> ${week.practice_hours}h</span>
                </div>
            </div>
        `;
    }).join('');
}

function showWeekDetail(weekNum) {
    const weekData = CURRICULUM_DATA.weeks.find(w => w.week === weekNum);
    if (!weekData) return;

    const modal = document.getElementById('week-detail-modal');
    document.getElementById('modal-week-title').textContent = `第 ${weekNum} 周：${weekData.title}`;

    // 难度显示
    const difficultyDiv = document.getElementById('modal-difficulty');
    if (weekData.difficulty) {
        difficultyDiv.innerHTML = `<span class="difficulty-stars">${weekData.difficulty}</span>`;
        difficultyDiv.style.display = 'inline-flex';
    } else {
        difficultyDiv.style.display = 'none';
    }

    // 概览栏信息
    const phaseNames = ['', '基础技能', '核心生信技能', '进阶项目', '求职准备'];
    document.getElementById('modal-hours').innerHTML = `<strong>${weekData.learning_hours}</strong>h 学习 · <strong>${weekData.practice_hours}</strong>h 实践`;
    document.getElementById('modal-phase').textContent = `阶段${weekData.phase}：${phaseNames[weekData.phase]}`;
    document.getElementById('modal-topics-preview').textContent = weekData.topics.slice(0, 2).join(' / ') + (weekData.topics.length > 2 ? ' ...' : '');

    // 初始化标签页切换
    initDetailTabs();

    // === 4C维度展示 ===
    renderBiologicalContext(weekData);
    renderCognitiveDimension(weekData);
    renderScenarioContext(weekData);
    renderCollaboration(weekData);
    renderMetacognition(weekData);
    renderCaseStudies(weekNum);

    // 学习内容
    const topicsDiv = document.getElementById('modal-topics');
    topicsDiv.innerHTML = weekData.topics.map(t => `
        <div class="topic-tag">
            <i class="fas fa-check-circle"></i>
            <span>${t}</span>
        </div>
    `).join('');

    // 学习资源
    const resourcesDiv = document.getElementById('modal-resources');
    resourcesDiv.innerHTML = weekData.resources && weekData.resources.length > 0
        ? weekData.resources.map(r => `
            <a href="${r.url}" target="_blank" class="resource-card">
                <i class="fas fa-external-link-alt"></i>
                <span>${r.name}</span>
            </a>
        `).join('')
        : '<div class="empty-state"><i class="fas fa-folder-open"></i><p>暂无特定资源</p></div>';

    // 详细任务步骤
    const tasksDiv = document.getElementById('modal-tasks-detail');
    const taskCountBadge = document.getElementById('task-count-badge');
    const completedCount = weekData.tasks.filter(t => AppState.completedTasks.includes(t.id)).length;
    taskCountBadge.textContent = `${completedCount}/${weekData.tasks.length} 个任务已完成`;

    tasksDiv.innerHTML = weekData.tasks.map(task => {
        const isCompleted = AppState.completedTasks.includes(task.id);
        const taskSteps = TASK_STEPS[task.id];

        let stepsHTML = '';
        if (taskSteps && taskSteps.steps) {
            stepsHTML = `
                <div class="task-detail-steps">
                    ${taskSteps.steps.map(s => `
                        <div class="step-item">
                            <div class="step-number">${s.step}</div>
                            <div class="step-content">${s.content}</div>
                        </div>
                    `).join('')}
                    ${taskSteps.tips ? `
                        <div class="task-tips">
                            <i class="fas fa-lightbulb"></i>
                            <ul>${taskSteps.tips.map(t => `<li>${t}</li>`).join('')}</ul>
                        </div>
                    ` : ''}
                    ${taskSteps.code_example ? `
                        <div class="task-code-example">
                            <pre><code>${taskSteps.code_example}</code></pre>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        const cognitiveBadge = task.cognitive_level ? `<span class="cognitive-badge ${task.cognitive_level}">${getCognitiveLabel(task.cognitive_level)}</span>` : '';
        const typeIcon = task.type === 'project' ? 'fa-project-diagram' : task.type === 'output' ? 'fa-file-alt' : 'fa-code';

        return `
            <div class="task-card-v2 ${isCompleted ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-card-header" onclick="toggleTaskDetail('${task.id}')">
                    <div class="task-checkbox-v2 ${isCompleted ? 'checked' : ''}" onclick="event.stopPropagation(); toggleTask('${task.id}')">
                        ${isCompleted ? '<i class="fas fa-check"></i>' : '<i class="far fa-circle"></i>'}
                    </div>
                    <div class="task-info-v2">
                        <span class="task-title-v2">${task.desc}</span>
                        <div class="task-meta-v2">
                            <span class="task-type"><i class="fas ${typeIcon}"></i> ${task.type || 'practice'}</span>
                            ${task.time ? `<span class="task-time"><i class="fas fa-clock"></i> ${task.time}</span>` : ''}
                        </div>
                    </div>
                    ${cognitiveBadge}
                    <i class="fas fa-chevron-down task-toggle-icon"></i>
                </div>
                ${stepsHTML}
            </div>
        `;
    }).join('');

    // 代码示例
    const codeDiv = document.getElementById('modal-code-examples');
    if (weekData.code_examples && weekData.code_examples.length > 0) {
        codeDiv.innerHTML = weekData.code_examples.map(ex => `
            <div class="code-block-v2">
                <div class="code-header">
                    <span class="code-title">${ex.title}</span>
                    <span class="code-lang">${ex.language}</span>
                </div>
                <pre><code class="language-${ex.language}">${ex.code}</code></pre>
            </div>
        `).join('');
    } else {
        codeDiv.innerHTML = '<div class="empty-state small"><i class="fas fa-code"></i><p>本周无特定代码示例</p></div>';
    }

    // 清空AI聊天记录
    document.getElementById('ai-chat-messages').innerHTML = `
        <div class="ai-message assistant">
            <div class="ai-message-header"><i class="fas fa-robot"></i> AI助教</div>
            <div class="ai-message-content">你好！我是你的AI助教。你可以问我关于本周学习内容的任何问题，比如：
- "${weekData.topics[0] || '概念解释'}"
- 代码编写帮助
- 错误调试</div>
        </div>
    `;

    // 清空作业区
    document.getElementById('homework-content').value = '';
    document.getElementById('review-result').style.display = 'none';

    modal.classList.add('active');

    // 关闭模态框
    modal.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
}

// 初始化详情标签页
function initDetailTabs() {
    const tabs = document.querySelectorAll('.detail-tab-btn');
    const panels = document.querySelectorAll('.detail-tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;

            // 更新标签按钮状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 更新面板显示
            panels.forEach(p => p.classList.remove('active'));
            document.getElementById(`tab-${targetId}`).classList.add('active');
        });
    });
}

// 获取认知层级中文标签
function getCognitiveLabel(level) {
    const labels = {
        remember: '记忆',
        understand: '理解',
        apply: '应用',
        analyze: '分析',
        evaluate: '评估',
        create: '创造'
    };
    return labels[level] || level;
}

// 渲染生物学背景
function renderBiologicalContext(weekData) {
    const container = document.getElementById('modal-biological-context');
    const section = document.getElementById('biological-context-section');

    if (weekData.biological_context) {
        section.style.display = 'block';
        const ctx = weekData.biological_context;
        container.innerHTML = `
            <div class="bio-context-grid">
                <div class="bio-context-item">
                    <div class="bio-context-icon"><i class="fas fa-question-circle"></i></div>
                    <div class="bio-context-content">
                        <h4>为什么学</h4>
                        <p>${ctx.why}</p>
                    </div>
                </div>
                <div class="bio-context-item">
                    <div class="bio-context-icon"><i class="fas fa-flask"></i></div>
                    <div class="bio-context-content">
                        <h4>真实场景</h4>
                        <p>${ctx.real_scenario}</p>
                    </div>
                </div>
                <div class="bio-context-item">
                    <div class="bio-context-icon"><i class="fas fa-building"></i></div>
                    <div class="bio-context-content">
                        <h4>行业标准</h4>
                        <p>${ctx.industry_standard}</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        section.style.display = 'none';
    }
}

// 渲染认知维度
function renderCognitiveDimension(weekData) {
    const container = document.getElementById('modal-cognitive-levels');
    const section = document.getElementById('cognitive-dimension-section');

    if (weekData.cognitive_dimension && weekData.cognitive_dimension.bloom_levels) {
        section.style.display = 'block';
        const levels = weekData.cognitive_dimension.bloom_levels;
        const levelOrder = ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'];
        const levelColors = {
            remember: '#3498db',
            understand: '#2ecc71',
            apply: '#f1c40f',
            analyze: '#e67e22',
            evaluate: '#e74c3c',
            create: '#9b59b6'
        };

        container.innerHTML = `
            <div class="cognitive-pyramid">
                ${levelOrder.slice().reverse().map((level, idx) => {
                    const items = levels[level] || [];
                    const width = 40 + (5 - idx) * 12;
                    return `
                        <div class="cognitive-level-row" style="background: ${levelColors[level]}20; border-left: 4px solid ${levelColors[level]}">
                            <div class="cognitive-level-name" style="color: ${levelColors[level]}">${getCognitiveLabel(level)}</div>
                            <div class="cognitive-level-items">
                                ${items.map(item => `<span class="cognitive-item">${item}</span>`).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            ${weekData.cognitive_dimension.learning_strategy ? `
                <div class="learning-strategy">
                    <strong>学习策略：</strong>${weekData.cognitive_dimension.learning_strategy}
                </div>
            ` : ''}
            ${weekData.cognitive_dimension.practice_method ? `
                <div class="practice-method">
                    <strong>练习方法：</strong>${weekData.cognitive_dimension.practice_method}
                </div>
            ` : ''}
        `;
    } else {
        section.style.display = 'none';
    }
}

// 渲染情境模拟
function renderScenarioContext(weekData) {
    const container = document.getElementById('modal-scenario');
    const section = document.getElementById('scenario-section');

    if (weekData.contextual_dimension && weekData.contextual_dimension.real_scenario) {
        section.style.display = 'block';
        const scenario = weekData.contextual_dimension.real_scenario;

        container.innerHTML = `
            <div class="scenario-card">
                <div class="scenario-header">
                    <h4>${scenario.title}</h4>
                    <div class="scenario-meta">
                        <span class="scenario-role"><i class="fas fa-user"></i> 角色：${scenario.role}</span>
                        ${scenario.deadline ? `<span class="scenario-deadline"><i class="fas fa-clock"></i> 时限：${scenario.deadline}</span>` : ''}
                    </div>
                </div>
                <div class="scenario-background">
                    <p>${scenario.background}</p>
                </div>
                ${scenario.tasks && scenario.tasks.length > 0 ? `
                    <div class="scenario-tasks">
                        <h5>任务步骤</h5>
                        <div class="scenario-tasks-list">
                            ${scenario.tasks.map(task => `
                                <div class="scenario-task-item">
                                    <div class="scenario-task-step">${task.step}</div>
                                    <div class="scenario-task-content">
                                        <span class="scenario-task-action">${task.action}</span>
                                        ${task.tool ? `<span class="scenario-task-tool"><i class="fas fa-wrench"></i> ${task.tool}</span>` : ''}
                                        ${task.command ? `<code class="scenario-task-command">${task.command}</code>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                ${scenario.deliverable ? `
                    <div class="scenario-deliverable">
                        <strong>交付物：</strong>${scenario.deliverable}
                    </div>
                ` : ''}
                ${weekData.contextual_dimension.industry_practice ? `
                    <div class="industry-practice">
                        <h5>行业实践</h5>
                        ${weekData.contextual_dimension.industry_practice.naming ? `<p><strong>命名规范：</strong>${weekData.contextual_dimension.industry_practice.naming}</p>` : ''}
                        ${weekData.contextual_dimension.industry_practice.structure ? `<p><strong>结构要求：</strong>${weekData.contextual_dimension.industry_practice.structure}</p>` : ''}
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        section.style.display = 'none';
    }
}

// 渲染协作学习
function renderCollaboration(weekData) {
    const container = document.getElementById('modal-collaboration');
    const section = document.getElementById('collaboration-section');

    if (weekData.collaborative_dimension && weekData.collaborative_dimension.peer_learning) {
        section.style.display = 'block';
        const collab = weekData.collaborative_dimension;

        container.innerHTML = `
            <div class="collaboration-grid">
                ${collab.peer_learning.pair_programming ? `
                    <div class="collab-item">
                        <div class="collab-icon"><i class="fas fa-user-friends"></i></div>
                        <h4>结对编程</h4>
                        <p>${collab.peer_learning.pair_programming}</p>
                    </div>
                ` : ''}
                ${collab.peer_learning.group_discussion ? `
                    <div class="collab-item">
                        <div class="collab-icon"><i class="fas fa-comments"></i></div>
                        <h4>小组讨论</h4>
                        <p>${collab.peer_learning.group_discussion}</p>
                    </div>
                ` : ''}
                ${collab.peer_learning.code_review_checklist ? `
                    <div class="collab-item">
                        <div class="collab-icon"><i class="fas fa-clipboard-check"></i></div>
                        <h4>Code Review 清单</h4>
                        <ul>
                            ${collab.peer_learning.code_review_checklist.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
            ${collab.community ? `
                <div class="community-actions">
                    <h4>社区参与</h4>
                    <div class="community-items">
                        ${collab.community.share ? `<div class="community-item"><i class="fas fa-share-alt"></i> ${collab.community.share}</div>` : ''}
                        ${collab.community.help ? `<div class="community-item"><i class="fas fa-hands-helping"></i> ${collab.community.help}</div>` : ''}
                    </div>
                </div>
            ` : ''}
        `;
    } else {
        section.style.display = 'none';
    }
}

// 渲染元认知反思
function renderMetacognition(weekData) {
    const container = document.getElementById('modal-metacognition');
    const section = document.getElementById('metacognition-section');

    if (weekData.cognitive_dimension && weekData.cognitive_dimension.metacognition) {
        section.style.display = 'block';
        const questions = weekData.cognitive_dimension.metacognition;

        container.innerHTML = `
            <div class="metacognition-questions">
                ${questions.map((q, idx) => `
                    <div class="metacognition-item">
                        <div class="meta-number">${idx + 1}</div>
                        <div class="meta-question">${q}</div>
                        <div class="meta-check">
                            <input type="checkbox" id="meta-check-${idx}">
                            <label for="meta-check-${idx}">我已思考</label>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        section.style.display = 'none';
    }
}

// 渲染论文案例
function renderCaseStudies(weekNum) {
    const container = document.getElementById('modal-case-studies');
    const section = document.getElementById('case-studies-section');

    const caseData = CASE_STUDIES[weekNum];

    if (caseData && caseData.papers && caseData.papers.length > 0) {
        section.style.display = 'block';

        container.innerHTML = `
            <div class="case-studies-header">
                <div class="case-theme">${caseData.title}</div>
            </div>
            <div class="papers-list">
                ${caseData.papers.map((paper, idx) => `
                    <div class="paper-card">
                        <div class="paper-header">
                            <div class="paper-number">Paper ${idx + 1}</div>
                            <div class="paper-meta">
                                <span class="paper-journal">${paper.journal}</span>
                                <span class="paper-year">${paper.year}</span>
                            </div>
                        </div>
                        <div class="paper-title">${paper.title}</div>
                        <div class="paper-authors">
                            <i class="fas fa-users"></i> ${paper.authors}
                        </div>
                        ${paper.doi ? `
                            <div class="paper-doi">
                                <a href="https://doi.org/${paper.doi}" target="_blank">
                                    <i class="fas fa-external-link-alt"></i> DOI: ${paper.doi}
                                </a>
                            </div>
                        ` : ''}
                        <div class="paper-summary">
                            <h5><i class="fas fa-file-alt"></i> 研究摘要</h5>
                            <p>${paper.summary}</p>
                        </div>
                        <div class="paper-findings">
                            <h5><i class="fas fa-lightbulb"></i> 主要发现</h5>
                            <ul>
                                ${paper.key_findings.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="paper-methods">
                            <h5><i class="fas fa-tools"></i> 相关方法/工具</h5>
                            <div class="method-tags">
                                ${paper.methods.map(m => `<span class="method-tag">${m}</span>`).join('')}
                            </div>
                        </div>
                        <div class="paper-relevance">
                            <h5><i class="fas fa-link"></i> 与本周学习关联</h5>
                            <p>${paper.relevance}</p>
                        </div>
                        <div class="paper-learning">
                            <h5><i class="fas fa-graduation-cap"></i> 学习要点</h5>
                            <ul>
                                ${paper.learning_points.map(p => `<li>${p}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        section.style.display = 'none';
    }
}

// 切换任务详情展开/收起
function toggleTaskDetail(taskId) {
    const card = document.querySelector(`.task-card-v2[data-task-id="${taskId}"]`);
    if (card) {
        card.classList.toggle('expanded');
    }
}

// ========== 面试准备 ==========
function initInterview() {
    const categoriesList = document.getElementById('interview-categories');
    if (!categoriesList) return;

    categoriesList.innerHTML = INTERVIEW_DATA.categories.map((cat, index) => `
        <div class="category-item ${index === 0 ? 'active' : ''}" data-category="${cat.name}">
            <span><i class="${cat.icon}"></i> ${cat.name}</span>
            <span class="count">${cat.questions.length}</span>
        </div>
    `).join('');

    // 点击分类
    categoriesList.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            categoriesList.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            AppState.interviewState.category = item.dataset.category;
            AppState.interviewState.index = 0;
            showQuestion();
        });
    });

    // 显示答案按钮
    document.getElementById('btn-show-answer').addEventListener('click', showAnswer);
    document.getElementById('btn-next-question').addEventListener('click', nextQuestion);

    // 默认显示第一个分类
    if (INTERVIEW_DATA.categories.length > 0) {
        AppState.interviewState.category = INTERVIEW_DATA.categories[0].name;
    }
}

function showQuestion() {
    const category = INTERVIEW_DATA.categories.find(c => c.name === AppState.interviewState.category);
    if (!category) return;

    const question = category.questions[AppState.interviewState.index];
    if (!question) return;

    document.getElementById('q-category').textContent = category.name;
    document.getElementById('q-progress').textContent = `${AppState.interviewState.index + 1}/${category.questions.length}`;
    document.getElementById('q-text').textContent = question.question;

    // 隐藏答案
    document.querySelector('.answer-hidden').style.display = 'block';
    document.querySelector('.answer-visible').style.display = 'none';
}

function showAnswer() {
    const category = INTERVIEW_DATA.categories.find(c => c.name === AppState.interviewState.category);
    if (!category) return;

    const question = category.questions[AppState.interviewState.index];
    if (!question) return;

    document.getElementById('a-text').textContent = question.answer;
    document.querySelector('.answer-hidden').style.display = 'none';
    document.querySelector('.answer-visible').style.display = 'block';
}

function nextQuestion() {
    const category = INTERVIEW_DATA.categories.find(c => c.name === AppState.interviewState.category);
    if (!category) return;

    AppState.interviewState.index = (AppState.interviewState.index + 1) % category.questions.length;
    showQuestion();
}

// ========== 资源中心 ==========
function initReference() {
    // 初始化搜索
    const searchInput = document.getElementById('resource-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterAllResources(query);
        });
    }

    // 初始化分类卡片点击
    const categoryCards = document.querySelectorAll('.resource-category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            scrollToSection(type);
        });
    });

    // 初始化展开按钮
    const expandBtns = document.querySelectorAll('.expand-btn');
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            toggleSectionExpand(section);
        });
    });

    // 初始化过滤器
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
        });
    });

    // 渲染所有资源
    renderAllResources();
    updateResourceCounts();
}

function renderAllResources() {
    renderConcepts();
    renderTools();
    renderDatabases();
    renderFormats();
}

function updateResourceCounts() {
    document.getElementById('concepts-count').textContent = `${REFERENCE_DATA.concepts.length} 个`;
    document.getElementById('tools-count').textContent = `${REFERENCE_DATA.tools.length} 个`;
    document.getElementById('databases-count').textContent = `${REFERENCE_DATA.databases.length} 个`;
    document.getElementById('formats-count').textContent = `${REFERENCE_DATA.formats.length} 个`;
}

function renderConcepts(query = '') {
    const container = document.getElementById('concepts-list');
    let data = REFERENCE_DATA.concepts || [];

    if (query) {
        data = data.filter(item =>
            item.name.toLowerCase().includes(query) ||
            (item.full_name && item.full_name.toLowerCase().includes(query)) ||
            (item.definition && item.definition.toLowerCase().includes(query))
        );
    }

    container.innerHTML = data.map(item => `
        <div class="resource-card-v2 concept-card">
            <div class="card-v2-header">
                <span class="card-v2-name">${item.name}</span>
                ${item.full_name ? `<span class="card-v2-fullname">${item.full_name}</span>` : ''}
            </div>
            <div class="card-v2-body">
                <p class="card-v2-definition">${item.definition}</p>
                ${item.formula ? `<p class="card-v2-formula"><i class="fas fa-square-root-alt"></i> <code>${item.formula}</code></p>` : ''}
                <p class="card-v2-usage"><i class="fas fa-info-circle"></i> ${item.usage}</p>
                ${item.note ? `<p class="card-v2-note"><i class="fas fa-lightbulb"></i> ${item.note}</p>` : ''}
                ${item.code ? `<pre class="card-v2-code"><code>${item.code}</code></pre>` : ''}
            </div>
        </div>
    `).join('');
}

function renderTools(query = '') {
    const container = document.getElementById('tools-list');
    let data = REFERENCE_DATA.tools || [];

    if (query) {
        data = data.filter(item =>
            item.name.toLowerCase().includes(query) ||
            (item.purpose && item.purpose.toLowerCase().includes(query)) ||
            (item.category && item.category.toLowerCase().includes(query))
        );
    }

    container.innerHTML = data.map(item => `
        <div class="resource-card-v2 tool-card">
            <div class="card-v2-header">
                <span class="card-v2-name">${item.name}</span>
                ${item.category ? `<span class="card-v2-badge">${item.category}</span>` : '<span class="card-v2-badge">工具</span>'}
            </div>
            <div class="card-v2-body">
                <p class="card-v2-purpose"><i class="fas fa-cog"></i> ${item.purpose}</p>
                <div class="card-v2-io">
                    <span class="io-item"><i class="fas fa-sign-in-alt"></i> ${item.input}</span>
                    <span class="io-item"><i class="fas fa-sign-out-alt"></i> ${item.output}</span>
                </div>
                ${item.install ? `<p class="card-v2-install"><i class="fas fa-download"></i> <code>${item.install}</code></p>` : ''}
                ${item.usage ? `<p class="card-v2-usage"><i class="fas fa-terminal"></i> ${item.usage}</p>` : ''}
                ${item.code ? `<pre class="card-v2-code"><code>${item.code}</code></pre>` : ''}
                ${item.note ? `<p class="card-v2-note"><i class="fas fa-lightbulb"></i> ${item.note}</p>` : ''}
            </div>
        </div>
    `).join('');
}

function renderDatabases(query = '') {
    const container = document.getElementById('databases-list');
    let data = REFERENCE_DATA.databases || [];

    if (query) {
        data = data.filter(item =>
            item.name.toLowerCase().includes(query) ||
            (item.usage && item.usage.toLowerCase().includes(query)) ||
            (item.category && item.category.toLowerCase().includes(query))
        );
    }

    container.innerHTML = data.map(item => `
        <div class="resource-card-v2 database-card">
            <div class="card-v2-header">
                <span class="card-v2-name">${item.name}</span>
                ${item.category ? `<span class="card-v2-badge">${item.category}</span>` : ''}
                <a href="${item.url}" target="_blank" class="card-v2-link"><i class="fas fa-external-link-alt"></i></a>
            </div>
            <div class="card-v2-body">
                ${item.description ? `<p class="card-v2-desc">${item.description}</p>` : ''}
                <p class="card-v2-usage"><i class="fas fa-database"></i> ${item.usage}</p>
                ${item.data_types ? `<p class="card-v2-types"><i class="fas fa-list"></i> ${item.data_types}</p>` : ''}
                ${item.code ? `<pre class="card-v2-code"><code>${item.code}</code></pre>` : ''}
            </div>
        </div>
    `).join('');
}

function renderFormats(query = '') {
    const container = document.getElementById('formats-list');
    let data = REFERENCE_DATA.formats || [];

    if (query) {
        data = data.filter(item =>
            item.name.toLowerCase().includes(query) ||
            (item.extension && item.extension.toLowerCase().includes(query)) ||
            (item.usage && item.usage.toLowerCase().includes(query))
        );
    }

    container.innerHTML = data.map(item => `
        <div class="resource-card-v2 format-card">
            <div class="card-v2-header">
                <span class="card-v2-name">${item.name}</span>
                <code class="card-v2-ext">${item.extension}</code>
            </div>
            <div class="card-v2-body">
                ${item.description ? `<p class="card-v2-desc">${item.description}</p>` : ''}
                <p class="card-v2-usage"><i class="fas fa-file"></i> ${item.usage}</p>
                ${item.fields ? `<p class="card-v2-fields"><i class="fas fa-columns"></i> ${item.fields}</p>` : ''}
                ${item.tools ? `<p class="card-v2-tools"><i class="fas fa-tools"></i> ${item.tools}</p>` : ''}
                ${item.code ? `<pre class="card-v2-code"><code>${item.code}</code></pre>` : ''}
            </div>
        </div>
    `).join('');
}

function filterAllResources(query) {
    renderConcepts(query);
    renderTools(query);
    renderDatabases(query);
    renderFormats(query);
}

function scrollToSection(type) {
    const section = document.getElementById(`${type}-section`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function toggleSectionExpand(section) {
    const container = document.getElementById(`${section}-list`);
    const btn = document.querySelector(`.expand-btn[data-section="${section}"]`);

    if (container && btn) {
        container.classList.toggle('expanded');
        btn.classList.toggle('active');

        const icon = btn.querySelector('i');
        if (container.classList.contains('expanded')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
            btn.innerHTML = '收起 <i class="fas fa-chevron-up"></i>';
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
            btn.innerHTML = '展开全部 <i class="fas fa-chevron-down"></i>';
        }
    }
}

function applyFilter(filter) {
    // 根据过滤器类型应用不同的显示逻辑
    const sections = document.querySelectorAll('.resource-section');
    sections.forEach(section => {
        if (filter === 'all') {
            section.style.display = 'block';
        } else if (filter === 'common') {
            // 显示常用的前5个
            const cards = section.querySelectorAll('.resource-card-v2');
            cards.forEach((card, idx) => {
                card.style.display = idx < 5 ? 'flex' : 'none';
            });
        } else if (filter === 'recent') {
            // 这里可以根据使用记录显示最近使用的
            section.style.display = 'block';
        }
    });
}

// ========== UI 更新 ==========
function updateUI() {
    // 更新统计数字
    const totalHoursEl = document.getElementById('total-hours');
    if (totalHoursEl) totalHoursEl.textContent = AppState.totalHours.toFixed(1);

    const completedTasksEl = document.getElementById('completed-tasks');
    if (completedTasksEl) completedTasksEl.textContent = AppState.completedTasks.length;

    const completedProjectsEl = document.getElementById('completed-projects');
    if (completedProjectsEl) completedProjectsEl.textContent = AppState.completedProjects.length;

    const currentWeekEl = document.getElementById('current-week');
    if (currentWeekEl) currentWeekEl.textContent = AppState.currentWeek;

    // 更新用户名显示
    const userName = localStorage.getItem('bioinfo_user_name');
    if (userName) {
        const userNameEl = document.getElementById('user-name');
        if (userNameEl) userNameEl.textContent = userName;
        const charName = document.getElementById('char-name');
        if (charName) charName.textContent = userName;
    }

    // 更新阶段指示器
    const phaseNames = ['第一阶段', '第二阶段', '第三阶段', '第四阶段'];
    const phaseEl = document.getElementById('current-phase');
    if (phaseEl) phaseEl.textContent = phaseNames[AppState.currentPhase - 1];

    // 更新连续学习天数
    const streak = calculateStreak();
    const streakEl = document.getElementById('streak-days');
    if (streakEl) {
        streakEl.innerHTML = `<i class="fas fa-fire"></i> ${streak}天`;
        if (streak >= 7) {
            streakEl.classList.add('hot');
        } else {
            streakEl.classList.remove('hot');
        }
    }

    // 更新进度环
    updateProgressRing();

    // 更新学习类型统计
    updateLearningTypesUI();

    // 更新RPG系统
    if (skillSystem) {
        renderSkills('all');
        updateCharacterInfo();
    }

    // 更新可视化图表
    renderSkillsRadar();
    renderWeeklyGauge();
    renderLearningHeatmap();
}

function updateLearningTypesUI() {
    const types = AppState.learningTypes;
    const totalHours = Object.values(types).reduce((sum, t) => sum + t.hours, 0);
    const typeItems = document.querySelectorAll('.type-item');

    const typeKeys = ['video', 'reading', 'practice', 'project', 'exercise', 'review'];

    typeItems.forEach((item, index) => {
        const key = typeKeys[index];
        const typeData = types[key];

        if (typeData) {
            const percent = totalHours > 0 ? (typeData.hours / totalHours * 100) : 0;
            const fill = item.querySelector('.type-fill');
            const hoursSpan = item.querySelector('.type-hours');
            const sessionsSpan = item.querySelector('.type-sessions');

            if (fill) fill.style.width = percent + '%';
            if (hoursSpan) hoursSpan.textContent = typeData.hours.toFixed(1) + 'h';
            if (sessionsSpan) sessionsSpan.textContent = typeData.sessions + '次';
        }
    });
}

function calculateStreak() {
    const dates = Object.keys(AppState.weeklyHours).sort().reverse();
    if (dates.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (AppState.weeklyHours[dateStr] > 0) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (i === 0) {
            // 今天还没记录，检查昨天
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

// ========== Toast 通知 ==========
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========== 全局函数 ==========
window.toggleTask = toggleTask;
window.showWeekDetail = showWeekDetail;
window.toggleTaskDetail = toggleTaskDetail;
window.exportAllData = exportAllData;
window.importAllData = importAllData;
window.saveArchive = saveArchive;
window.loadArchive = loadArchive;

// ========== 技能面板页面 ==========
function initSkillsPage() {
    // 分类切换
    const catBtns = document.querySelectorAll('.skill-cat-btn');
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSkills(btn.dataset.category);
        });
    });

    renderSkills('all');
}

function renderSkills(category = 'all') {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    const skills = Object.entries(SKILL_SYSTEM.skills);

    const filteredSkills = category === 'all'
        ? skills
        : skills.filter(([id, skill]) => skill.category === category);

    grid.innerHTML = filteredSkills.map(([id, skill]) => {
        const progress = skillSystem.getSkillProgress(id);
        const ability = skillSystem.getCurrentAbility(id);
        const level = progress?.level || 1;
        const progressPercent = progress?.progress || 0;
        const relatedWeeks = skill.relatedWeeks || [];

        return `
            <div class="skill-card clickable" style="--skill-color: ${skill.color}" onclick="showSkillCourses('${id}')">
                <div class="skill-header">
                    <div class="skill-icon" style="color: ${skill.color}">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div class="skill-info">
                        <div class="skill-name">${skill.name}</div>
                        <div class="skill-category">${skill.category}</div>
                    </div>
                    <div class="skill-level-badge">
                        <i class="fas fa-star"></i> Lv.${level}
                    </div>
                </div>
                <div class="skill-description">${skill.description}</div>
                <div class="skill-progress">
                    <div class="skill-exp-bar">
                        <div class="skill-exp-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="skill-exp-text">
                        <span>${progress?.currentExp || 0} EXP</span>
                        <span>下一级: ${progress?.expForNextLevel || 0} EXP</span>
                    </div>
                </div>
                <div class="skill-ability">
                    <div class="ability-name">${ability?.name || '未解锁'}</div>
                    <div class="ability-desc">${ability?.desc || '继续学习以解锁能力'}</div>
                </div>
                ${relatedWeeks.length > 0 ? `
                    <div class="skill-courses-hint">
                        <i class="fas fa-book-open"></i> 点击查看相关课程 (第${relatedWeeks.join(',')}周)
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// 显示技能相关课程
function showSkillCourses(skillId) {
    const skill = SKILL_SYSTEM.skills[skillId];
    if (!skill) return;

    const relatedWeeks = skill.relatedWeeks || [];
    if (relatedWeeks.length === 0) {
        showToast('该技能暂无关联课程', 'info');
        return;
    }

    // 获取相关周的详细数据
    const weeksData = relatedWeeks.map(weekNum => {
        return CURRICULUM_DATA.weeks.find(w => w.week === weekNum);
    }).filter(w => w);

    // 构建模态框内容
    const modal = document.getElementById('skill-courses-modal');
    const titleEl = document.getElementById('skill-courses-title');
    const contentEl = document.getElementById('skill-courses-content');

    titleEl.innerHTML = `
        <i class="${skill.icon}" style="color: ${skill.color}"></i>
        ${skill.name} - 相关课程
    `;

    contentEl.innerHTML = weeksData.map(week => {
        const completedTasks = week.tasks.filter(t => AppState.completedTasks.includes(t.id)).length;
        const totalTasks = week.tasks.length;
        const progressPercent = totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0;

        return `
            <div class="skill-course-card" onclick="navigateToWeek(${week.week})">
                <div class="course-card-header">
                    <div class="course-week-badge">第${week.week}周</div>
                    <div class="course-title">${week.title}</div>
                    <div class="course-difficulty">${week.difficulty}</div>
                </div>
                <div class="course-card-body">
                    <div class="course-topics">
                        ${week.topics.slice(0, 3).map(t => `<span class="topic-tag-small">${t}</span>`).join('')}
                    </div>
                    <div class="course-progress-bar">
                        <div class="course-progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${week.learning_hours}h学习</span>
                        <span><i class="fas fa-tasks"></i> ${completedTasks}/${totalTasks}任务</span>
                        <span class="click-hint"><i class="fas fa-arrow-right"></i> 点击查看详情</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // 添加学习建议
    const progress = skillSystem.getSkillProgress(skillId);
    const level = progress?.level || 1;

    contentEl.innerHTML += `
        <div class="skill-learning-tips">
            <h4><i class="fas fa-lightbulb"></i> 学习建议</h4>
            <p>当前技能等级: <strong>Lv.${level}</strong></p>
            <p>建议学习路径: 按周次顺序逐步完成课程，每完成一个任务可获得 <strong>30 EXP</strong>。</p>
            ${level < 5 ? `<p class="tip">💡 完成以上课程可将 ${skill.name} 提升至 Lv.${Math.min(level + 2, 5)}</p>` : ''}
        </div>
    `;

    // 设置关闭事件
    modal.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };

    modal.classList.add('active');
}

// 导航到指定周
function navigateToWeek(weekNum) {
    // 关闭技能课程模态框
    document.getElementById('skill-courses-modal').classList.remove('active');

    // 切换到学习计划页面
    switchPage('curriculum');

    // 显示周详情
    setTimeout(() => {
        showWeekDetail(weekNum);
    }, 300);
}

// 暴露全局函数
window.showSkillCourses = showSkillCourses;
window.navigateToWeek = navigateToWeek;

// ========== 成就页面 ==========
function initAchievementsPage() {
    const tabs = document.querySelectorAll('.ach-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderAchievements(tab.dataset.type);
        });
    });

    renderAchievements('all');
}

function renderAchievements(type = 'all') {
    const grid = document.getElementById('achievements-grid');
    const achievements = SKILL_SYSTEM.achievements;

    const filteredAchievements = achievements.filter(ach => {
        const unlocked = skillSystem.unlockedAchievements.includes(ach.id);
        if (type === 'unlocked') return unlocked;
        if (type === 'locked') return !unlocked;
        return true;
    });

    // 更新统计
    const unlockedCount = skillSystem.unlockedAchievements.length;
    const totalCount = achievements.length;
    const achUnlockedEl = document.getElementById('ach-unlocked');
    if (achUnlockedEl) achUnlockedEl.textContent = unlockedCount;

    const achLockedEl = document.getElementById('ach-locked');
    if (achLockedEl) achLockedEl.textContent = totalCount - unlockedCount;

    const achPercentEl = document.getElementById('ach-percent');
    if (achPercentEl) achPercentEl.textContent = Math.round((unlockedCount / totalCount) * 100) + '%';

    grid.innerHTML = filteredAchievements.map(ach => {
        const unlocked = skillSystem.unlockedAchievements.includes(ach.id);
        return `
            <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
                <div class="ach-badge">${ach.icon}</div>
                <div class="ach-content">
                    <div class="ach-name">${ach.name}</div>
                    <div class="ach-desc">${ach.desc}</div>
                    <div class="ach-status">${unlocked ? '✓ 已解锁' : '🔒 未解锁'}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ========== 检查成就和解锁 ==========
function checkAndUnlockAchievements() {
    const stats = {
        totalHours: AppState.totalHours,
        completedWeeks: calculateCompletedWeeks(),
        completedProjects: AppState.completedProjects.length,
        streak: calculateStreak(),
        interviewPracticed: 0, // TODO: 实现面试练习计数
        blogPosts: 0,
        currentPhase: AppState.currentPhase
    };

    const newAchievements = skillSystem.checkAchievements(stats);

    if (newAchievements.length > 0) {
        // 显示解锁通知
        newAchievements.forEach(ach => {
            showAchievementUnlock(ach);
        });
        saveSkillSystem();
    }

    // 更新称号
    const newTitle = skillSystem.updateTitle(stats);
    if (newTitle) {
        showToast(`🎉 获得新称号: ${newTitle.name}`, 'success');
    }

    // 更新角色信息
    updateCharacterInfo();
}

function showAchievementUnlock(achievement) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast success achievement-unlock-animation';
    toast.innerHTML = `
        <span style="font-size: 1.5rem; margin-right: 12px;">${achievement.icon}</span>
        <div>
            <div style="font-weight: 700;">成就解锁!</div>
            <div>${achievement.name}</div>
        </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

function updateCharacterInfo() {
    // 更新角色称号
    document.getElementById('char-title').textContent = skillSystem.currentTitle;

    // 计算总等级
    const totalExp = Object.values(skillSystem.skills).reduce((sum, skill) => sum + (skill.currentExp || 0), 0);
    const avgLevel = Object.values(skillSystem.skills).reduce((sum, skill) => sum + (skill.level || 1), 0) / Object.keys(skillSystem.skills).length;

    document.getElementById('char-level').textContent = `Lv.${Math.round(avgLevel)}`;

    // 更新经验条
    const expForLevel = avgLevel * 500;
    const expPercent = Math.min(100, (totalExp % expForLevel) / expForLevel * 100);
    document.getElementById('total-exp-fill').style.width = expPercent + '%';
    document.getElementById('total-exp-text').textContent = `${totalExp} / ${expForLevel} EXP`;

    // 更新统计
    document.getElementById('stat-hours').textContent = AppState.totalHours + 'h';
    document.getElementById('stat-tasks').textContent = AppState.completedTasks.length;
    document.getElementById('stat-projects').textContent = AppState.completedProjects.length;
}

function calculateCompletedWeeks() {
    let completedWeeks = 0;
    for (let week = 1; week <= 24; week++) {
        const weekData = CURRICULUM_DATA.weeks.find(w => w.week === week);
        if (weekData && weekData.tasks.every(t => AppState.completedTasks.includes(t.id))) {
            completedWeeks++;
        }
    }
    return completedWeeks;
}

// ========== 添加经验到技能 ==========
function addExpToSkill(skillId, exp) {
    const result = skillSystem.addExpToSkill(skillId, exp);

    if (result && result.leveledUp) {
        const skill = SKILL_SYSTEM.skills[skillId];
        showToast(`🎉 ${skill.name} 升级到 Lv.${result.newLevel}!`, 'success');
        createLevelUpParticles();
    }

    saveSkillSystem();
    checkAndUnlockAchievements();
}

function createLevelUpParticles() {
    const container = document.createElement('div');
    container.className = 'particle-container';
    document.body.appendChild(container);

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.background = ['#fbbf24', '#22c55e', '#6366f1', '#ec4899'][Math.floor(Math.random() * 4)];
            container.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }, i * 50);
    }

    setTimeout(() => container.remove(), 2000);
}

// ========== 技能雷达图 ==========
function renderSkillsRadar() {
    const container = document.getElementById('skills-chart');
    if (!container || !skillSystem) return;

    const skills = SKILL_SYSTEM.skills;
    const skillIds = Object.keys(skills);
    const labels = skillIds.map(id => skills[id].name);
    const data = skillIds.map(id => {
        const progress = skillSystem.getSkillProgress(id);
        return progress ? progress.level : 1;
    });

    // 使用SVG绘制六边形雷达图
    const size = 280;
    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = 110;
    const levels = 10;
    const sides = skillIds.length;

    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="radar-svg">`;

    // 定义渐变
    svg += `
        <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.6" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
    `;

    // 绘制背景网格
    for (let level = 1; level <= 5; level++) {
        const radius = (maxRadius / 5) * level;
        const points = [];
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            points.push(`${x},${y}`);
        }
        svg += `<polygon points="${points.join(' ')}" fill="none" stroke="#334155" stroke-width="1" opacity="${0.3 + level * 0.1}"/>`;
    }

    // 绘制轴线
    for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
        const x = centerX + maxRadius * Math.cos(angle);
        const y = centerY + maxRadius * Math.sin(angle);
        svg += `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#334155" stroke-width="1" opacity="0.5"/>`;
    }

    // 绘制数据区域
    const dataPoints = [];
    for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
        const value = data[i] / levels;
        const radius = maxRadius * value;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        dataPoints.push(`${x},${y}`);
    }

    svg += `<polygon points="${dataPoints.join(' ')}" fill="url(#radarGradient)" stroke="#6366f1" stroke-width="2" filter="url(#glow)" class="radar-area"/>`;

    // 绘制数据点
    for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
        const value = data[i] / levels;
        const radius = maxRadius * value;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const color = skills[skillIds[i]].color || '#6366f1';
        svg += `<circle cx="${x}" cy="${y}" r="5" fill="${color}" stroke="white" stroke-width="2" class="radar-point"/>`;
    }

    // 绘制标签
    for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
        const labelRadius = maxRadius + 25;
        const x = centerX + labelRadius * Math.cos(angle);
        const y = centerY + labelRadius * Math.sin(angle);

        const level = data[i];
        const color = skills[skillIds[i]].color || '#6366f1';

        svg += `
            <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="${color}" font-size="11" font-weight="600">
                Lv.${level}
            </text>
        `;
    }

    svg += '</svg>';

    container.innerHTML = svg;

    // 添加图例
    const legend = document.createElement('div');
    legend.className = 'radar-legend';
    legend.innerHTML = skillIds.slice(0, 4).map(id => {
        const skill = skills[id];
        const progress = skillSystem.getSkillProgress(id);
        return `<span class="legend-item" style="color: ${skill.color}">${skill.name} Lv.${progress?.level || 1}</span>`;
    }).join(' · ');

    if (container.nextSibling?.className !== 'radar-legend') {
        container.after(legend);
    }
}

// ========== 学习时长柱状图 ==========
function renderHoursBarChart() {
    const container = document.getElementById('hours-bar-chart');
    if (!container) return;

    const today = new Date();
    const days = [];
    const values = [];

    // 获取最近14天的数据
    for (let i = 13; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('zh-CN', { weekday: 'short' });
        const dayNum = date.getDate();

        days.push(i === 0 ? '今天' : dayNum + '日');
        values.push(AppState.weeklyHours[dateStr] || 0);
    }

    const maxValue = Math.max(...values, 1);
    const chartHeight = 200;
    const barWidth = 28;
    const gap = 8;
    const totalWidth = days.length * (barWidth + gap);

    let html = `
        <div class="bar-chart-container">
            <div class="bar-chart" style="height: ${chartHeight}px;">
                <div class="y-axis">
                    <span>${maxValue.toFixed(1)}h</span>
                    <span>${(maxValue/2).toFixed(1)}h</span>
                    <span>0h</span>
                </div>
                <div class="grid-lines">
                    <div class="grid-line" style="top: 0"></div>
                    <div class="grid-line" style="top: 50%"></div>
                    <div class="grid-line" style="top: 100%"></div>
                </div>
                <div class="bars-container">
    `;

    days.forEach((day, i) => {
        const value = values[i];
        const height = (value / maxValue) * (chartHeight - 40);
        const isToday = i === days.length - 1;
        const hasValue = value > 0;

        html += `
            <div class="bar-wrapper">
                <div class="bar ${isToday ? 'today' : ''} ${hasValue ? '' : 'empty'}"
                     style="height: ${height}px"
                     data-value="${value}">
                    ${hasValue ? `<span class="bar-value">${value.toFixed(1)}h</span>` : ''}
                </div>
                <span class="bar-label">${day}</span>
            </div>
        `;
    });

    html += `
                </div>
            </div>
            <div class="chart-summary">
                <span class="summary-item">
                    <i class="fas fa-calendar-day"></i>
                    今日: <strong>${values[values.length - 1].toFixed(1)}h</strong>
                </span>
                <span class="summary-item">
                    <i class="fas fa-calendar-week"></i>
                    7天: <strong>${values.slice(-7).reduce((a,b) => a+b, 0).toFixed(1)}h</strong>
                </span>
                <span class="summary-item">
                    <i class="fas fa-chart-line"></i>
                    14天: <strong>${values.reduce((a,b) => a+b, 0).toFixed(1)}h</strong>
                </span>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// ========== 学习旅程时间线 ==========
function initProgressPage() {
    renderJourneyTimeline();
    renderHoursBarChart();
    renderTaskTree();
    renderTaskLog();
}

function renderJourneyTimeline() {
    const container = document.getElementById('journey-timeline');
    if (!container) return;

    const phases = CURRICULUM_DATA.phases;

    let html = '';
    phases.forEach((phase, index) => {
        const isCompleted = AppState.currentPhase > phase.id;
        const isCurrent = AppState.currentPhase === phase.id;
        const startWeek = (phase.id - 1) * 8 + 1;
        const endWeek = phase.id === 4 ? 24 : phase.id * 8;

        // 计算该阶段完成的周数
        let completedWeeksInPhase = 0;
        for (let w = startWeek; w <= endWeek; w++) {
            const weekData = CURRICULUM_DATA.weeks.find(week => week.week === w);
            if (weekData && weekData.tasks.every(t => AppState.completedTasks.includes(t.id))) {
                completedWeeksInPhase++;
            }
        }
        const totalWeeksInPhase = endWeek - startWeek + 1;
        const progress = (completedWeeksInPhase / totalWeeksInPhase) * 100;

        html += `
            <div class="timeline-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                <div class="timeline-date">第 ${startWeek}-${endWeek} 周</div>
                <div class="timeline-title">
                    <span class="phase-badge phase-${phase.id}">${phase.name}</span>
                </div>
                <div class="timeline-desc">${phase.goal}</div>
                <div class="timeline-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">${completedWeeksInPhase}/${totalWeeksInPhase} 周</span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ========== 任务树渲染 ==========
function renderTaskTree() {
    const container = document.getElementById('task-list-full');
    if (!container) return;

    const currentPhase = AppState.currentPhase;
    const weeks = CURRICULUM_DATA.weeks.filter(w => w.phase === currentPhase);

    let html = '<div class="task-tree-container">';
    weeks.forEach(week => {
        const isCurrentWeek = week.week === AppState.currentWeek;
        const completedTasks = week.tasks.filter(t => AppState.completedTasks.includes(t.id)).length;
        const totalTasks = week.tasks.length;
        const allCompleted = completedTasks === totalTasks;

        html += `
            <div class="task-week-group ${isCurrentWeek ? 'current' : ''} ${allCompleted ? 'completed' : ''}">
                <div class="task-week-header">
                    <span class="week-indicator ${allCompleted ? 'done' : ''}">
                        ${allCompleted ? '<i class="fas fa-check"></i>' : week.week}
                    </span>
                    <span class="week-name">第${week.week}周: ${week.title}</span>
                    <span class="week-progress">${completedTasks}/${totalTasks}</span>
                </div>
                <div class="task-week-tasks">
                    ${week.tasks.map(task => {
                        const isCompleted = AppState.completedTasks.includes(task.id);
                        return `
                            <div class="task-tree-item ${isCompleted ? 'completed' : ''}">
                                <span class="task-check ${isCompleted ? 'checked' : ''}" onclick="toggleTask('${task.id}')">
                                    ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                                </span>
                                <span class="task-desc">${task.desc}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    });
    html += '</div>';

    container.innerHTML = html;
}

// ========== 任务日志渲染 ==========
function renderTaskLog() {
    const container = document.getElementById('task-log-list');
    if (!container) return;

    // 获取最近的日志条目
    const logEntries = [];

    // 添加最近完成的任务
    const recentTasks = AppState.completedTasks.slice(-5).reverse();
    recentTasks.forEach(taskId => {
        const weekNum = parseInt(taskId.match(/w(\d+)/)?.[1] || 1);
        const weekData = CURRICULUM_DATA.weeks.find(w => w.week === weekNum);
        const task = weekData?.tasks.find(t => t.id === taskId);
        if (task) {
            logEntries.push({
                type: 'quest',
                icon: '✓',
                title: `完成任务: ${task.desc}`,
                meta: `第${weekNum}周`,
                reward: '+30 EXP'
            });
        }
    });

    // 添加最近的学习记录
    const recentDates = Object.keys(AppState.weeklyHours).sort().reverse().slice(0, 3);
    recentDates.forEach(date => {
        const hours = AppState.weeklyHours[date];
        if (hours > 0) {
            const dateObj = new Date(date);
            const dateStr = dateObj.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
            logEntries.push({
                type: 'skill',
                icon: '📚',
                title: `学习记录: ${hours.toFixed(1)} 小时`,
                meta: dateStr,
                reward: `+${Math.round(hours * 50)} EXP`
            });
        }
    });

    // 添加番茄钟记录
    if (AppState.pomodoro.todayCount > 0) {
        logEntries.push({
            type: 'challenge',
            icon: '🍅',
            title: `今日番茄钟: ${AppState.pomodoro.todayCount} 个`,
            meta: '专注学习',
            reward: `+${AppState.pomodoro.todayMinutes} 分钟`
        });
    }

    // 如果没有记录，显示空状态
    if (logEntries.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-scroll"></i>
                <p>还没有任务记录</p>
                <p class="hint">开始学习并记录你的进度吧！</p>
            </div>
        `;
        return;
    }

    container.innerHTML = logEntries.map(entry => `
        <div class="log-entry ${entry.type}">
            <div class="log-icon">${entry.icon}</div>
            <div class="log-content">
                <div class="log-title">${entry.title}</div>
                <div class="log-meta">${entry.meta}</div>
            </div>
            <div class="log-reward ${entry.type === 'skill' ? 'exp' : ''}">${entry.reward}</div>
        </div>
    `).join('');
}

// ========== 首次用户检测 ==========
function checkFirstTimeUser() {
    const hasVisited = localStorage.getItem('bioinfo_has_visited');
    const userName = localStorage.getItem('bioinfo_user_name');

    if (!hasVisited || !userName) {
        showWelcomeModal();
    }
}

function showWelcomeModal() {
    // 创建欢迎模态框
    const modal = document.createElement('div');
    modal.id = 'welcome-modal';
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content welcome-modal">
            <div class="welcome-header">
                <div class="welcome-icon">🧬</div>
                <h2>欢迎来到生信学习助手</h2>
                <p class="welcome-subtitle">24周生物信息学就业导向学习计划</p>
            </div>
            <div class="welcome-body">
                <div class="welcome-features">
                    <div class="feature-item">
                        <i class="fas fa-chart-line"></i>
                        <span>可视化追踪学习进度</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-shield-halved"></i>
                        <span>RPG风格技能升级系统</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-trophy"></i>
                        <span>成就解锁激励学习</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-robot"></i>
                        <span>AI助教在线答疑</span>
                    </div>
                </div>
                <div class="welcome-form">
                    <div class="form-group">
                        <label><i class="fas fa-user"></i> 你的名字</label>
                        <input type="text" id="welcome-name" placeholder="请输入你的名字">
                    </div>
                    <div class="form-group">
                        <label><i class="fab fa-github"></i> GitHub 用户名（可选）</label>
                        <input type="text" id="welcome-github" placeholder="your-username">
                    </div>
                </div>
                <div class="welcome-tips">
                    <p><i class="fas fa-lightbulb"></i> 建议：每天学习2-3小时，周末加强练习</p>
                </div>
            </div>
            <div class="welcome-footer">
                <button class="btn btn-primary btn-lg" id="btn-start-journey">
                    <i class="fas fa-rocket"></i> 开始学习之旅
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 绑定开始按钮
    document.getElementById('btn-start-journey').addEventListener('click', () => {
        const name = document.getElementById('welcome-name').value.trim();
        const github = document.getElementById('welcome-github').value.trim();

        if (!name) {
            showToast('请输入你的名字', 'error');
            return;
        }

        // 保存用户信息
        localStorage.setItem('bioinfo_has_visited', 'true');
        localStorage.setItem('bioinfo_user_name', name);
        if (github) {
            localStorage.setItem('bioinfo_user_github', github);
        }
        localStorage.setItem('bioinfo_start_date', new Date().toISOString());

        // 更新显示
        document.getElementById('user-name').textContent = name;
        document.getElementById('char-name').textContent = name;

        // 关闭模态框
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);

        showToast(`欢迎，${name}！让我们开始吧！`, 'success');

        // 显示第一阶段内容
        updateUI();
    });
}

// ========== 页面切换时更新图表 ==========
const originalSwitchPage = switchPage;
switchPage = function(pageName) {
    originalSwitchPage(pageName);

    // 切换到仪表盘时更新雷达图
    if (pageName === 'dashboard') {
        setTimeout(() => {
            renderSkillsRadar();
            updateProgressRing();
            renderWeeklyGauge();
            renderLearningHeatmap();
        }, 100);
    }

    // 切换到进度页面时更新图表
    if (pageName === 'progress') {
        setTimeout(() => {
            renderJourneyTimeline();
            renderHoursBarChart();
            renderTaskTree();
            renderAchievementProgress();
        }, 100);
    }

    // 切换到技能页面时更新任务日志
    if (pageName === 'skills') {
        setTimeout(() => {
            renderTaskLog();
        }, 100);
    }
};

// ========== 学习热力图 ==========
function renderLearningHeatmap() {
    const container = document.getElementById('learning-heatmap');
    if (!container) return;

    const today = new Date();
    const weeks = 12;
    const daysPerWeek = 7;

    let html = '';

    // 生成12周的热力图
    for (let week = 0; week < weeks; week++) {
        html += '<div class="heatmap-week">';
        for (let day = 0; day < daysPerWeek; day++) {
            const date = new Date(today);
            date.setDate(date.getDate() - ((weeks - 1 - week) * 7 + (daysPerWeek - 1 - day)));

            const dateStr = date.toISOString().split('T')[0];
            const hours = AppState.weeklyHours[dateStr] || 0;

            // 计算热力等级
            let level = 0;
            if (hours > 0) level = 1;
            if (hours >= 1) level = 2;
            if (hours >= 2) level = 3;
            if (hours >= 3) level = 4;

            const isToday = dateStr === today.toISOString().split('T')[0];
            const dayName = date.toLocaleDateString('zh-CN', { weekday: 'short' });
            const dateDisplay = date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });

            html += `<div class="heatmap-day level-${level} ${isToday ? 'today' : ''}"
                         title="${dateDisplay} ${dayName}: ${hours.toFixed(1)}小时"
                         data-date="${dateStr}"
                         data-hours="${hours}"></div>`;
        }
        html += '</div>';
    }

    container.innerHTML = html;

    // 添加鼠标悬停提示
    container.querySelectorAll('.heatmap-day').forEach(day => {
        day.addEventListener('mouseenter', (e) => {
            const date = e.target.dataset.date;
            const hours = parseFloat(e.target.dataset.hours);
            showHeatmapTooltip(e, date, hours);
        });
        day.addEventListener('mouseleave', hideHeatmapTooltip);
    });
}

function showHeatmapTooltip(e, date, hours) {
    let tooltip = document.getElementById('heatmap-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'heatmap-tooltip';
        tooltip.className = 'heatmap-tooltip';
        document.body.appendChild(tooltip);
    }

    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

    tooltip.innerHTML = `
        <div class="tooltip-date">${dateStr}</div>
        <div class="tooltip-hours">${hours > 0 ? hours.toFixed(1) + ' 小时' : '无学习记录'}</div>
    `;

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 60 + 'px';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.opacity = '1';
}

function hideHeatmapTooltip() {
    const tooltip = document.getElementById('heatmap-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
    }
}

// ========== 周目标仪表 ==========
function renderWeeklyGauge() {
    const gaugeFill = document.getElementById('gauge-fill');
    const gaugePercent = document.getElementById('gauge-percent');
    const gaugeStatus = document.getElementById('gauge-status');

    if (!gaugeFill) return;

    // 计算本周学习时长
    const today = new Date();
    const weekStart = getWeekStart(today);
    let weekHours = 0;

    Object.entries(AppState.weeklyHours).forEach(([date, hours]) => {
        if (new Date(date) >= weekStart) {
            weekHours += hours;
        }
    });

    const targetHours = 15; // 每周目标15小时
    const percent = Math.min(100, (weekHours / targetHours) * 100);

    gaugeFill.style.width = percent + '%';
    gaugePercent.textContent = percent.toFixed(0) + '%';

    // 更新状态文本
    if (percent >= 100) {
        gaugeStatus.textContent = '🎉 目标达成！太棒了！';
        gaugeStatus.classList.add('achieved');
        gaugeFill.classList.remove('warning', 'danger');
    } else if (percent >= 70) {
        gaugeStatus.textContent = '💪 即将达成，继续加油！';
        gaugeStatus.classList.remove('achieved');
        gaugeFill.classList.remove('warning', 'danger');
    } else if (percent >= 40) {
        gaugeStatus.textContent = '📚 进展顺利，保持节奏';
        gaugeStatus.classList.remove('achieved');
        gaugeFill.classList.add('warning');
        gaugeFill.classList.remove('danger');
    } else {
        gaugeStatus.textContent = '🚀 需要加速了！';
        gaugeStatus.classList.remove('achieved');
        gaugeFill.classList.add('danger');
        gaugeFill.classList.remove('warning');
    }
}

// ========== 成就进度展示 ==========
function renderAchievementProgress() {
    const container = document.getElementById('achievement-progress-list');
    if (!container || !skillSystem) return;

    const achievements = SKILL_SYSTEM.achievements;
    const unlockedIds = skillSystem.unlockedAchievements || [];

    // 获取接下来最容易解锁的成就
    const progressAchievements = achievements.map(ach => {
        let progress = 0;
        let current = 0;
        let target = ach.condition.value;

        switch (ach.condition.type) {
            case 'hours':
                current = AppState.totalHours;
                target = ach.condition.value;
                progress = Math.min(100, (current / target) * 100);
                break;
            case 'projects':
                current = AppState.completedProjects.length;
                target = ach.condition.value;
                progress = Math.min(100, (current / target) * 100);
                break;
            case 'streak':
                current = calculateStreak();
                target = ach.condition.value;
                progress = Math.min(100, (current / target) * 100);
                break;
            case 'skill_level':
                current = Math.max(...Object.values(skillSystem.skills).map(s => s.level || 1));
                target = ach.condition.value;
                progress = Math.min(100, (current / target) * 100);
                break;
            default:
                progress = unlockedIds.includes(ach.id) ? 100 : 0;
        }

        return {
            ...ach,
            progress,
            current,
            target,
            unlocked: unlockedIds.includes(ach.id)
        };
    });

    // 按进度排序，已解锁的放前面，然后按进度降序
    progressAchievements.sort((a, b) => {
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        return b.progress - a.progress;
    });

    // 只显示前6个
    const displayAchievements = progressAchievements.slice(0, 6);

    container.innerHTML = displayAchievements.map(ach => `
        <div class="ach-progress-item ${ach.unlocked ? 'unlocked' : ''}">
            <div class="ach-progress-icon">${ach.icon}</div>
            <div class="ach-progress-info">
                <div class="ach-progress-name">${ach.name}</div>
                <div class="ach-progress-desc">${ach.desc}</div>
                <div class="ach-progress-bar">
                    <div class="ach-progress-fill" style="width: ${ach.progress}%"></div>
                </div>
                <div class="ach-progress-status">
                    ${ach.unlocked ? '✓ 已解锁' : `${ach.current}/${ach.target} (${ach.progress.toFixed(0)}%)`}
                </div>
            </div>
        </div>
    `).join('');
}

// ========== 更新进度环（已在前面定义）==========
