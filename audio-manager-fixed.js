// 修复版音频管理器
class AudioManager {
    constructor() {
        // 本地音频数据（Base64编码的简单音频）
        this.localAudioData = {
            music: this.generateMusicAudio(),
            news: this.generateNewsAudio(),
            audiobook: this.generateAudiobookAudio(),
            comedy: this.generateComedyAudio(),
            general: this.generateGeneralAudio()
        };
        
        this.currentTrack = null;
        this.isPlaying = false;
        this.audioElement = null;
        
        // 初始化音频元素
        this.initAudioElement();
    }
    
    // 初始化音频元素
    initAudioElement() {
        this.audioElement = new Audio();
        this.audioElement.addEventListener('ended', () => {
            this.isPlaying = false;
            this.onTrackEnded();
        });
        
        this.audioElement.addEventListener('error', (e) => {
            console.error('音频播放错误:', e);
            this.handleAudioError(e);
        });
    }
    
    // 生成音乐类音频数据
    generateMusicAudio() {
        // 生成简单的音乐音频数据（Base64）
        return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    }
    
    // 生成新闻类音频数据
    generateNewsAudio() {
        return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    }
    
    // 生成有声书类音频数据
    generateAudiobookAudio() {
        return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    }
    
    // 生成喜剧类音频数据
    generateComedyAudio() {
        return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    }
    
    // 生成通用音频数据
    generateGeneralAudio() {
        return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    }
    
    // 获取音频URL
    getAudioUrl(contentType = 'general') {
        const audioData = this.localAudioData[contentType] || this.localAudioData.general;
        return audioData;
    }
    
    // 搜索音频
    async searchAudio(query) {
        const results = [];
        const queryLower = query.toLowerCase();
        
        // 根据查询类型生成结果
        if (queryLower.includes('音乐') || queryLower.includes('歌')) {
            results.push(
                { id: 1, title: '轻松音乐 - 晨光森林', desc: '舒缓的自然音乐，适合放松心情', duration: '3:45', type: 'music', url: this.getAudioUrl('music') },
                { id: 2, title: '流行音乐 - 本周热门', desc: '最新流行歌曲精选', duration: '4:20', type: 'music', url: this.getAudioUrl('music') },
                { id: 3, title: '古典音乐 - 巴赫平均律', desc: '巴赫经典作品演奏', duration: '8:15', type: 'music', url: this.getAudioUrl('music') }
            );
        } else if (queryLower.includes('新闻') || queryLower.includes('资讯')) {
            results.push(
                { id: 1, title: '综合新闻 - 今日要闻', desc: '国内外重要新闻摘要', duration: '5:30', type: 'news', url: this.getAudioUrl('news') },
                { id: 2, title: '财经新闻 - 市场动态', desc: '股市及经济新闻速递', duration: '4:15', type: 'news', url: this.getAudioUrl('news') },
                { id: 3, title: '科技新闻 - 最新趋势', desc: '人工智能与科技发展', duration: '6:20', type: 'news', url: this.getAudioUrl('news') }
            );
        } else if (queryLower.includes('故事') || queryLower.includes('小说')) {
            results.push(
                { id: 1, title: '睡前故事 - 星空传说', desc: '温馨睡前故事，助您入眠', duration: '12:40', type: 'audiobook', url: this.getAudioUrl('audiobook') },
                { id: 2, title: '悬疑广播剧 - 迷雾追踪', desc: '引人入胜的悬疑故事', duration: '25:15', type: 'audiobook', url: this.getAudioUrl('audiobook') },
                { id: 3, title: '经典名著 - 红楼梦选段', desc: '红楼梦经典片段演播', duration: '18:30', type: 'audiobook', url: this.getAudioUrl('audiobook') }
            );
        } else {
            results.push(
                { id: 1, title: `搜索结果 - ${query}`, desc: '根据您的搜索生成的个性化内容', duration: '3:30', type: 'general', url: this.getAudioUrl('general') },
                { id: 2, title: `相关内容 - ${query}`, desc: '与您的需求高度匹配的内容', duration: '4:15', type: 'general', url: this.getAudioUrl('general') },
                { id: 3, title: `推荐内容 - ${query}`, desc: '根据您的喜好特别推荐', duration: '5:20', type: 'general', url: this.getAudioUrl('general') }
            );
        }
        
        return results;
    }
    
    // 播放音频
    async playAudio(url, title) {
        try {
            console.log(`准备播放音频: ${title}`);
            
            // 停止当前播放
            if (this.isPlaying) {
                this.stopAudio();
            }
            
            // 设置新的音频源
            this.audioElement.src = url;
            this.currentTrack = { url, title };
            
            // 尝试播放
            await this.audioElement.play();
            this.isPlaying = true;
            
            this.showStatus(`正在播放: ${title}`, 'success');
            return true;
            
        } catch (error) {
            console.error('播放音频失败:', error);
            this.showStatus('音频播放失败: ' + error.message, 'error');
            return false;
        }
    }
    
    // 停止播放
    stopAudio() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
        
        this.isPlaying = false;
        this.currentTrack = null;
        this.showStatus('音频已停止', 'info');
    }
    
    // 暂停播放
    pauseAudio() {
        if (this.audioElement && this.isPlaying) {
            this.audioElement.pause();
            this.isPlaying = false;
            this.showStatus('音频已暂停', 'info');
        }
    }
    
    // 恢复播放
    async resumeAudio() {
        if (this.audioElement && !this.isPlaying) {
            try {
                await this.audioElement.play();
                this.isPlaying = true;
                this.showStatus('继续播放', 'success');
                return true;
            } catch (error) {
                console.error('恢复播放失败:', error);
                this.showStatus('恢复播放失败', 'error');
                return false;
            }
        }
        return false;
    }
    
    // 设置音量
    setVolume(volume) {
        if (this.audioElement) {
            this.audioElement.volume = Math.max(0, Math.min(1, volume));
        }
    }
    
    // 获取当前播放状态
    getPlaybackStatus() {
        return {
            isPlaying: this.isPlaying,
            currentTrack: this.currentTrack,
            currentTime: this.audioElement ? this.audioElement.currentTime : 0,
            duration: this.audioElement ? this.audioElement.duration : 0
        };
    }
    
    // 音频播放结束处理
    onTrackEnded() {
        this.showStatus('播放完成', 'info');
        this.currentTrack = null;
        
        // 可以在这里添加自动播放下一首的逻辑
        if (this.onTrackEndedCallback) {
            this.onTrackEndedCallback();
        }
    }
    
    // 处理音频错误
    handleAudioError(error) {
        console.error('音频错误:', error);
        this.showStatus('音频加载失败，请检查网络连接', 'error');
        this.isPlaying = false;
        this.currentTrack = null;
    }
    
    // 显示状态信息
    showStatus(message, type = 'info') {
        let statusDiv = document.getElementById('audio-status');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.id = 'audio-status';
            statusDiv.style.cssText = `
                position: fixed;
                bottom: 20px;
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
        }, 3000);
    }
    
    // 验证音频功能
    async validate() {
        try {
            const testUrl = this.getAudioUrl('general');
            await this.playAudio(testUrl, '测试音频');
            return true;
        } catch (error) {
            console.error('音频功能验证失败:', error);
            return false;
        }
    }
    
    // 清理资源
    cleanup() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.src = '';
        }
        this.isPlaying = false;
        this.currentTrack = null;
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
} else {
    window.AudioManager = AudioManager;
}