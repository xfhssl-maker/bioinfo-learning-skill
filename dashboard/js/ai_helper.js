// ========== AI 助教系统 ==========
const AI_CONFIG = {
    // API配置 - 用户需要在这里设置自己的API
    enabled: false,
    provider: 'anthropic', // anthropic, openai, custom
    apiKey: '',
    baseUrl: '',
    model: 'claude-sonnet-4-20250514'
};

// 提示词模板
const PROMPT_TEMPLATES = {
    concept: `你是一位生物信息学助教。请用简洁易懂的方式解释以下概念，适合初学者理解。

概念: {question}

请包含：
1. 简洁的定义
2. 在生信分析中的作用
3. 一个简单的示例或类比
4. 相关概念（如果有）

回答控制在300字以内。`,

    code: `你是一位生物信息学编程助教。用户正在学习生信分析，需要代码帮助。

问题: {question}
当前学习周次: {week}
相关技能: {skill}

请提供：
1. 解决方案思路
2. 完整可运行的代码
3. 代码注释说明
4. 可能的注意事项

如果问题不够清晰，请先询问具体需求。`,

    debug: `你是一位代码调试专家。用户遇到了代码错误，请帮助分析和修复。

代码/错误信息:
{question}

请分析：
1. 错误原因
2. 修复建议
3. 修正后的代码
4. 如何避免类似错误

如果信息不足，请说明需要哪些额外信息。`,

    resource: `你是一位生信学习资源推荐专家。用户需要学习资源推荐。

需求: {question}

请推荐：
1. 最适合的教程/文档（附链接）
2. 推荐的学习顺序
3. 练习建议
4. 注意事项`,

    homework: `你是一位生信作业批改助教。请仔细检查学生的作业。

作业类型: {type}
作业内容:
{content}

请从以下方面评价：
1. **正确性** (0-100分)：代码/答案是否正确
2. **规范性** (0-100分)：代码风格、命名规范
3. **完整性** (0-100分)：是否完成所有要求
4. **改进建议**：具体指出问题和改进方法

请给出详细的批改意见。`
};

// AI服务类
class AIHelper {
    constructor() {
        this.config = this.loadConfig();
    }

    loadConfig() {
        const saved = localStorage.getItem('bioinfo_ai_config');
        if (saved) {
            return JSON.parse(saved);
        }
        return { ...AI_CONFIG };
    }

    saveConfig(config) {
        this.config = { ...this.config, ...config };
        localStorage.setItem('bioinfo_ai_config', JSON.stringify(this.config));
    }

    isConfigured() {
        return this.config.enabled && this.config.apiKey;
    }

    // 调用AI API
    async callAPI(prompt, systemPrompt = '') {
        if (!this.isConfigured()) {
            return {
                success: false,
                error: '请先配置API密钥。点击设置按钮进行配置。'
            };
        }

        try {
            let response;

            if (this.config.provider === 'anthropic') {
                response = await this.callAnthropic(prompt, systemPrompt);
            } else if (this.config.provider === 'openai') {
                response = await this.callOpenAI(prompt, systemPrompt);
            } else {
                response = await this.callCustomAPI(prompt, systemPrompt);
            }

            return { success: true, content: response };
        } catch (error) {
            console.error('AI API Error:', error);
            return {
                success: false,
                error: `API调用失败: ${error.message}`
            };
        }
    }

    async callAnthropic(prompt, systemPrompt) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.config.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: this.config.model,
                max_tokens: 2000,
                system: systemPrompt,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return data.content[0].text;
    }

    async callOpenAI(prompt, systemPrompt) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                model: this.config.model || 'gpt-4',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callCustomAPI(prompt, systemPrompt) {
        const response = await fetch(this.config.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || data.response || data.content;
    }

    // 提问
    async askQuestion(question, type, context = {}) {
        const template = PROMPT_TEMPLATES[type] || PROMPT_TEMPLATES.concept;
        let prompt = template.replace('{question}', question);

        if (context.week) {
            prompt = prompt.replace('{week}', context.week);
        }
        if (context.skill) {
            prompt = prompt.replace('{skill}', context.skill);
        }

        const systemPrompt = '你是一位专业的生物信息学助教，帮助学生学习和掌握生信分析技能。';

        return await this.callAPI(prompt, systemPrompt);
    }

    // 批改作业
    async reviewHomework(content, type) {
        const template = PROMPT_TEMPLATES.homework;
        const prompt = template
            .replace('{content}', content)
            .replace('{type}', type);

        const systemPrompt = '你是一位专业的生物信息学作业批改助教，负责检查学生的代码和分析报告。';

        return await this.callAPI(prompt, systemPrompt);
    }
}

// 创建全局实例
const aiHelper = new AIHelper();

// UI交互函数
function initAIHelper() {
    // 提问按钮
    document.getElementById('btn-ask-ai')?.addEventListener('click', handleAskAI);

    // 作业提交按钮
    document.getElementById('btn-submit-homework')?.addEventListener('click', handleSubmitHomework);

    // 作业类型切换
    document.querySelectorAll('.hw-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.hw-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Enter发送
    document.getElementById('ai-question-input')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAskAI();
        }
    });
}

async function handleAskAI() {
    const input = document.getElementById('ai-question-input');
    const typeSelect = document.getElementById('ai-question-type');
    const messagesDiv = document.getElementById('ai-chat-messages');

    const question = input.value.trim();
    if (!question) {
        showToast('请输入问题', 'error');
        return;
    }

    // 添加用户消息
    addAIMessage('user', question);
    input.value = '';

    // 显示加载中
    const loadingId = addAIMessage('assistant', '正在思考中...', true);

    // 调用AI
    const type = typeSelect.value;
    const context = {
        week: AppState.currentWeek,
        skill: getCurrentWeekSkill()
    };

    const result = await aiHelper.askQuestion(question, type, context);

    // 移除加载消息
    removeMessage(loadingId);

    if (result.success) {
        addAIMessage('assistant', result.content);
    } else {
        addAIMessage('assistant', `❌ ${result.error}\n\n请点击右上角设置按钮配置API密钥。`);
    }
}

async function handleSubmitHomework() {
    const content = document.getElementById('homework-content').value.trim();
    const type = document.querySelector('.hw-tab.active')?.dataset.type || 'code';
    const resultDiv = document.getElementById('review-result');
    const contentDiv = document.getElementById('review-content');

    if (!content) {
        showToast('请输入作业内容', 'error');
        return;
    }

    if (!aiHelper.isConfigured()) {
        showToast('请先配置API密钥', 'error');
        return;
    }

    showToast('正在批改中...', 'info');

    const result = await aiHelper.reviewHomework(content, type);

    if (result.success) {
        resultDiv.style.display = 'block';
        contentDiv.innerHTML = formatReviewResult(result.content);
        showToast('批改完成！', 'success');
    } else {
        showToast(`批改失败: ${result.error}`, 'error');
    }
}

function addAIMessage(role, content, isLoading = false) {
    const messagesDiv = document.getElementById('ai-chat-messages');
    const messageId = 'msg-' + Date.now();

    const messageHTML = `
        <div class="ai-message ${role}" id="${messageId}">
            <div class="ai-message-header">
                <i class="fas fa-${role === 'user' ? 'user' : 'robot'}"></i>
                ${role === 'user' ? '我' : 'AI助教'}
            </div>
            <div class="ai-message-content">${isLoading ? '<i class="fas fa-spinner fa-spin"></i> ' : ''}${formatContent(content)}</div>
        </div>
    `;

    messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    return messageId;
}

function removeMessage(messageId) {
    document.getElementById(messageId)?.remove();
}

function formatContent(content) {
    // 简单的Markdown格式化
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        .replace(/\n/g, '<br>');
}

function formatReviewResult(content) {
    return formatContent(content);
}

function getCurrentWeekSkill() {
    const skillMap = {
        1: 'Linux', 2: 'Shell', 3: 'R', 4: 'R', 5: 'Python', 6: 'Python', 7: 'Linux',
        8: 'RNA-seq', 9: 'RNA-seq', 10: 'RNA-seq',
        11: 'WES', 12: 'WES',
        13: 'ChIP-seq', 14: 'ChIP-seq',
        15: 'DataMining', 16: 'DataMining',
        17: 'scRNA-seq', 18: 'scRNA-seq',
        19: 'Multi-omics', 20: 'R'
    };
    return skillMap[AppState.currentWeek] || 'General';
}

// 导出到全局
window.aiHelper = aiHelper;
window.initAIHelper = initAIHelper;
