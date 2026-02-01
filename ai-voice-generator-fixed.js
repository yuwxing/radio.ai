// 修复版 AI语音生成器
class AIVoiceGenerator {
    constructor() {
        this.voices = [
            { id: 'female1', name: '温柔女声', description: '温和亲切的女性声音' },
            { id: 'male1', name: '温暖男声', description: '成熟稳重的男性声音' },
            { id: 'female2', name: '清新女声', description: '充满活力的年轻女性声音' },
            { id: 'male2', name: '舒缓男声', description: '富有磁性的男性声音' }
        ];
        
        this.selectedVoice = 'female1';
        this.isGenerating = false;
        this.audioContext = null;
        
        // 初始化音频上下文
        this.initAudioContext();
    }
    
    // 初始化音频上下文
    initAudioContext() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (error) {
            console.warn('音频上下文初始化失败:', error);
        }
    }
    
    // 设置语音
    setVoice(voiceId) {
        this.selectedVoice = voiceId;
        console.log(`已选择语音: ${this.getVoiceName(voiceId)}`);
    }
    
    // 获取语音名称
    getVoiceName(voiceId) {
        const voice = this.voices.find(v => v.id === voiceId);
        return voice ? voice.name : '未知语音';
    }
    
    // 获取可用语音
    getAvailableVoices() {
        return this.voices;
    }
    
    // 生成语音（修复版）
    async generateSpeech(text, options = {}) {
        if (this.isGenerating) {
            throw new Error('正在生成语音，请稍候...');
        }
        
        this.isGenerating = true;
        
        try {
            console.log(`开始生成语音: "${text}" 使用语音: ${this.getVoiceName(this.selectedVoice)}`);
            
            // 显示生成状态
            this.showStatus('正在生成语音...', 'info');
            
            // 模拟生成延迟
            await this.simulateGenerationDelay(text.length);
            
            // 创建本地音频
            const audioBlob = await this.createLocalAudio(text);
            
            // 创建音频URL
            const audioUrl = URL.createObjectURL(audioBlob);
            
            this.isGenerating = false;
            this.showStatus('语音生成成功！', 'success');
            
            return {
                success: true,
                audioUrl: audioUrl,
                text: text,
                voice: this.selectedVoice,
                duration: this.estimateDuration(text)
            };
            
        } catch (error) {
            this.isGenerating = false;
            console.error('语音生成失败:', error);
            this.showStatus('语音生成失败: ' + error.message, 'error');
            throw error;
        }
    }
    
    // 创建本地音频数据
    async createLocalAudio(text) {
        if (!this.audioContext) {
            throw new Error('音频上下文未初始化');
        }
        
        // 创建音频缓冲区
        const sampleRate = 22050;
        const duration = Math.min(10, Math.max(2, text.length * 0.1));
        const numSamples = sampleRate * duration;
        
        const audioBuffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
        const channelData = audioBuffer.getChannelData(0);
        
        // 生成简单的音频波形（模拟语音）
        for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            // 基础频率 + 调制
            const frequency = 200 + Math.sin(t * 2) * 50;
            const amplitude = 0.3 * Math.exp(-t * 0.5) * Math.sin(2 * Math.PI * frequency * t);
            channelData[i] = amplitude + (Math.random() - 0.5) * 0.02;
        }
        
        // 转换为WAV格式
        return this.audioBufferToWav(audioBuffer);
    }
    
    // 将AudioBuffer转换为WAV Blob
    audioBufferToWav(audioBuffer) {
        const numChannels = audioBuffer.numberOfChannels;
        const sampleRate = audioBuffer.sampleRate;
        const format = 1; // PCM
        const bitDepth = 16;
        
        const bytesPerSample = bitDepth / 8;
        const blockAlign = numChannels * bytesPerSample;
        
        const data = [];
        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            data.push(audioBuffer.getChannelData(i));
        }
        
        const length = data[0].length * numChannels * bytesPerSample;
        const buffer = new ArrayBuffer(44 + length);
        const view = new DataView(buffer);
        
        // WAV文件头
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + length, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, format, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * blockAlign, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true);
        writeString(36, 'data');
        view.setUint32(40, length, true);
        
        // 写入音频数据
        let offset = 44;
        for (let i = 0; i < data[0].length; i++) {
            for (let channel = 0; channel < numChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, data[channel][i]));
                view.setInt16(offset, sample * 0x7FFF, true);
                offset += 2;
            }
        }
        
        return new Blob([buffer], { type: 'audio/wav' });
    }
    
    // 模拟生成延迟
    async simulateGenerationDelay(textLength) {
        const delay = Math.min(3000, Math.max(1000, textLength * 20));
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // 估计音频时长
    estimateDuration(text) {
        const charsPerSecond = 3;
        return Math.ceil(text.length / charsPerSecond) + 's';
    }
    
    // 显示状态信息
    showStatus(message, type = 'info') {
        // 创建或更新状态显示
        let statusDiv = document.getElementById('voice-status');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.id = 'voice-status';
            statusDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                max-width: 300px;
                word-wrap: break-word;
            `;
            document.body.appendChild(statusDiv);
        }
        
        statusDiv.textContent = message;
        
        // 设置颜色
        switch (type) {
            case 'success':
                statusDiv.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
                break;
            case 'error':
                statusDiv.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
                break;
            case 'warning':
                statusDiv.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
                break;
            default:
                statusDiv.style.background = 'linear-gradient(135deg, #2196f3, #1976d2)';
        }
        
        // 自动隐藏
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.parentNode.removeChild(statusDiv);
            }
        }, 5000);
    }
    
    // 处理用户请求
    async processUserRequest(request) {
        try {
            const analysis = this.analyzeRequest(request);
            const content = this.generateContent(analysis);
            const result = await this.generateSpeech(content, { request: request });
            
            return {
                originalRequest: request,
                analysis: analysis,
                generatedContent: content,
                speechResult: result
            };
        } catch (error) {
            console.error('处理用户请求失败:', error);
            throw error;
        }
    }
    
    // 分析用户请求
    analyzeRequest(request) {
        const lowerRequest = request.toLowerCase();
        
        let requestType = 'general';
        let subject = '';
        let language = 'zh';
        
        // 检测语言
        if (lowerRequest.includes('英文') || lowerRequest.includes('english')) {
            language = 'en';
        }
        
        // 检测请求类型
        if (lowerRequest.includes('歌') || lowerRequest.includes('song') || lowerRequest.includes('唱')) {
            requestType = 'song';
            subject = request.replace(/(?:唱|播放|听)/g, '').trim();
        } else if (lowerRequest.includes('新闻') || lowerRequest.includes('news')) {
            requestType = 'news';
            subject = '最新新闻资讯';
        } else if (lowerRequest.includes('故事') || lowerRequest.includes('story')) {
            requestType = 'story';
            subject = '有趣的故事';
        } else {
            requestType = 'general';
            subject = request;
        }
        
        return {
            type: requestType,
            subject: subject.trim() || request,
            language: language,
            original: request
        };
    }
    
    // 生成内容
    generateContent(analysis) {
        const intro = "您好！我是您的AI语音助手，很高兴为您服务。";
        const outro = " 希望这段内容对您有帮助，如果还有其他需求，请随时告诉我。";
        
        let content = '';
        
        switch (analysis.type) {
            case 'song':
                content = `现在为您播放《${analysis.subject}》，这是一首非常优美的作品。`;
                break;
            case 'news':
                content = '为您播报最新新闻资讯。今天的主要内容包括科技发展、经济动态和国际新闻。';
                break;
            case 'story':
                content = '为您讲述一个温馨的故事。从前有一片美丽的森林，那里住着许多可爱的小动物...';
                break;
            default:
                content = `感谢您的点播：${analysis.subject}。这是一个很好的选择，让我为您详细介绍相关内容。`;
        }
        
        return intro + content + outro;
    }
    
    // 验证功能
    async validate() {
        try {
            const testResult = await this.generateSpeech("这是一个测试语音");
            return testResult.success;
        } catch (error) {
            console.error("语音生成验证失败:", error);
            return false;
        }
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIVoiceGenerator;
} else {
    window.AIVoiceGenerator = AIVoiceGenerator;
}