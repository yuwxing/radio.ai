// Radio.AI 安全音频管理器
class AudioManager {
    constructor() {
        // 定义安全的音频分类和对应的URL
        this.audioCategories = {
            music: [
                'https://www.soundjay.com/misc/sounds/test-tone-1.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-2.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-3.mp3',
                'https://www.soundjay.com/misc/sounds/beep-01a.wav',
                'https://www.soundjay.com/misc/sounds/beep-07.wav'
            ],
            news: [
                'https://www.soundjay.com/misc/sounds/test-tone-1.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-2.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-3.mp3',
                'https://www.soundjay.com/misc/sounds/beep-01a.wav',
                'https://www.soundjay.com/misc/sounds/beep-07.wav'
            ],
            audiobook: [
                'https://www.soundjay.com/misc/sounds/test-tone-1.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-2.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-3.mp3',
                'https://www.soundjay.com/misc/sounds/beep-01a.wav',
                'https://www.soundjay.com/misc/sounds/beep-07.wav'
            ],
            comedy: [
                'https://www.soundjay.com/misc/sounds/test-tone-1.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-2.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-3.mp3',
                'https://www.soundjay.com/misc/sounds/beep-01a.wav',
                'https://www.soundjay.com/misc/sounds/beep-07.wav'
            ],
            general: [
                'https://www.soundjay.com/misc/sounds/test-tone-1.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-2.mp3',
                'https://www.soundjay.com/misc/sounds/test-tone-3.mp3',
                'https://www.soundjay.com/misc/sounds/beep-01a.wav',
                'https://www.soundjay.com/misc/sounds/beep-07.wav'
            ]
        };
        
        // 用于存储当前播放的信息
        this.currentTrack = null;
        this.isPlaying = false;
    }
    
    // 获取指定类型的音频URL
    getAudioUrl(contentType = 'general', query = '') {
        const category = this.audioCategories[contentType] || this.audioCategories.general;
        const randomIndex = Math.floor(Math.random() * category.length);
        return category[randomIndex];
    }
    
    // 模拟音频搜索功能
    async searchAudio(query) {
        // 这里可以集成真实的音频API
        // 目前返回模拟结果
        const results = [];
        
        // 根据查询类型返回相应类型的结果
        if (query.toLowerCase().includes('音乐') || query.toLowerCase().includes('歌')) {
            results.push(
                { id: 1, title: '轻松音乐 - 晨光森林', desc: '舒缓的自然音乐，适合放松心情', duration: '3:45', type: 'music', url: this.getAudioUrl('music') },
                { id: 2, title: '流行音乐 - 本周热门', desc: '最新流行歌曲精选', duration: '4:20', type: 'music', url: this.getAudioUrl('music') },
                { id: 3, title: '古典音乐 - 巴赫平均律', desc: '巴赫经典作品演奏', duration: '8:15', type: 'music', url: this.getAudioUrl('music') },
                { id: 4, title: '轻音乐 - 雨声伴眠', desc: '雨声与轻柔音乐，助您入眠', duration: '15:30', type: 'music', url: this.getAudioUrl('music') },
                { id: 5, title: '摇滚音乐 - 经典回顾', desc: '80年代经典摇滚合集', duration: '4:10', type: 'music', url: this.getAudioUrl('music') }
            );
        } else if (query.toLowerCase().includes('新闻') || query.toLowerCase().includes('资讯')) {
            results.push(
                { id: 1, title: '综合新闻 - 今日要闻', desc: '国内外重要新闻摘要', duration: '5:30', type: 'news', url: this.getAudioUrl('news') },
                { id: 2, title: '财经新闻 - 今日市场动态', desc: '股市及经济新闻速递', duration: '4:15', type: 'news', url: this.getAudioUrl('news') },
                { id: 3, title: '体育新闻 - 昨夜赛事回顾', desc: '昨夜重要体育赛事报道', duration: '3:50', type: 'news', url: this.getAudioUrl('news') },
                { id: 4, title: '科技新闻 - 最新科技趋势', desc: '人工智能与科技发展动态', duration: '6:20', type: 'news', url: this.getAudioUrl('news') },
                { id: 5, title: '健康资讯 - 养生知识', desc: '健康生活小贴士', duration: '4:45', type: 'news', url: this.getAudioUrl('news') }
            );
        } else if (query.toLowerCase().includes('广播剧') || query.toLowerCase().includes('故事') || query.toLowerCase().includes('小说')) {
            results.push(
                { id: 1, title: '睡前故事 - 星空传说', desc: '温馨睡前故事，助您安然入睡', duration: '12:40', type: 'audiobook', url: this.getAudioUrl('audiobook') },
                { id: 2, title: '悬疑广播剧 - 迷雾追踪', desc: '引人入胜的悬疑故事', duration: '25:15', type: 'audiobook', url: this.getAudioUrl('audiobook') },
                { id: 3, title: '经典名著 - 红楼梦选段', desc: '红楼梦经典片段演播', duration: '18:30', type: 'audiobook', url: this.getAudioUrl('audiobook') },
                { id: 4, title: '科幻小说 - 未来世界', desc: '精彩科幻故事演播', duration: '32:10', type: 'audiobook', url: this.getAudioUrl('audiobook') },
                { id: 5, title: '历史故事 - 古代传奇', desc: '中国古代历史故事', duration: '20:25', type: 'audiobook', url: this.getAudioUrl('audiobook') }
            );
        } else if (query.toLowerCase().includes('相声') || query.toLowerCase().includes('评书')) {
            results.push(
                { id: 1, title: '相声选段 - 经典作品', desc: '著名相声演员经典作品', duration: '15:20', type: 'comedy', url: this.getAudioUrl('comedy') },
                { id: 2, title: '评书 - 三国演义选段', desc: '传统评书艺术表演', duration: '22:45', type: 'comedy', url: this.getAudioUrl('comedy') },
                { id: 3, title: '脱口秀 - 幽默时刻', desc: '轻松幽默的脱口秀节目', duration: '18:10', type: 'comedy', url: this.getAudioUrl('comedy') }
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
            // 在实际实现中，这里会连接到真实的音频播放器
            console.log(`准备播放音频: ${title} (${url})`);
            
            // 模拟播放过程
            this.currentTrack = { url, title };
            this.isPlaying = true;
            
            return true;
        } catch (error) {
            console.error('播放音频时出错:', error);
            return false;
        }
    }
    
    // 停止播放
    stopAudio() {
        this.isPlaying = false;
        this.currentTrack = null;
    }
    
    // 检查音频URL是否有效
    async validateAudioUrl(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.warn(`无法验证音频URL: ${url}`, error);
            return false;
        }
    }
}

// 导出 AudioManager 类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
} else {
    window.AudioManager = AudioManager;
}