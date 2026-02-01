// 音频管理器
class AudioManager {
    constructor() {
        this.currentTrack = null;
        this.playlist = [
            {
                title: '治愈系钢琴曲',
                artist: 'AI Composer',
                url: 'https://example.com/track1.mp3',
                duration: '3:45'
            },
            {
                title: '自然之声',
                artist: 'Nature AI',
                url: 'https://example.com/track2.mp3',
                duration: '4:20'
            },
            {
                title: '冥想音乐',
                artist: 'Meditation AI',
                url: 'https://example.com/track3.mp3',
                duration: '5:10'
            }
        ];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.audioPlayer = document.getElementById('audioPlayer');
        this.initializeEventListeners();
        this.loadCurrentTrack();
    }

    initializeEventListeners() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (playBtn) {
            playBtn.addEventListener('click', () => this.play());
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pause());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }

        // 音频播放器事件
        if (this.audioPlayer) {
            this.audioPlayer.addEventListener('ended', () => {
                this.next();
            });
            
            this.audioPlayer.addEventListener('error', (e) => {
                console.error('音频播放错误:', e);
                this.handleAudioError();
            });
        }
    }

    async play() {
        if (this.audioPlayer && this.currentTrack) {
            try {
                await this.audioPlayer.play();
                this.isPlaying = true;
                this.updatePlayButton();
                console.log('开始播放:', this.currentTrack.title);
            } catch (error) {
                console.error('播放失败:', error);
                this.handleAudioError();
            }
        }
    }

    pause() {
        if (this.audioPlayer) {
            this.audioPlayer.pause();
            this.isPlaying = false;
            this.updatePlayButton();
            console.log('暂停播放');
        }
    }

    next() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.loadCurrentTrack();
        
        if (this.isPlaying) {
            setTimeout(() => this.play(), 100);
        }
        
        console.log('切换到下一首:', this.getCurrentTrack().title);
    }

    previous() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadCurrentTrack();
        
        if (this.isPlaying) {
            setTimeout(() => this.play(), 100);
        }
        
        console.log('切换到上一首:', this.getCurrentTrack().title);
    }

    loadCurrentTrack() {
        this.currentTrack = this.getCurrentTrack();
        
        if (this.audioPlayer && this.currentTrack) {
            // 由于是示例，我们使用一个模拟的音频URL
            this.audioPlayer.src = this.generateDemoAudio();
            this.audioPlayer.load();
            this.updateTrackInfo();
        }
    }

    getCurrentTrack() {
        return this.playlist[this.currentTrackIndex];
    }

    generateDemoAudio() {
        // 生成一个简单的音频数据URL用于演示
        // 实际使用时应该使用真实的音频文件URL
        return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    }

    updatePlayButton() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (playBtn && pauseBtn) {
            if (this.isPlaying) {
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
            } else {
                playBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
            }
        }
    }

    updateTrackInfo() {
        // 更新曲目信息显示
        const trackInfo = document.querySelector('.current-track');
        if (trackInfo && this.currentTrack) {
            trackInfo.innerHTML = `
                <div class="track-title">${this.currentTrack.title}</div>
                <div class="track-artist">${this.currentTrack.artist}</div>
            `;
        }
    }

    handleAudioError() {
        console.log('音频加载失败，使用模拟播放');
        // 这里可以添加错误处理逻辑，比如显示错误消息
        this.showError('音频加载失败，请检查网络连接');
    }

    showError(message) {
        // 创建错误提示
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 107, 107, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 20px;
            z-index: 1000;
            font-size: 14px;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (document.body.contains(errorDiv)) {
                document.body.removeChild(errorDiv);
            }
        }, 3000);
    }

    // 添加音量控制
    setVolume(volume) {
        if (this.audioPlayer) {
            this.audioPlayer.volume = Math.max(0, Math.min(1, volume));
        }
    }

    // 获取当前播放时间
    getCurrentTime() {
        return this.audioPlayer ? this.audioPlayer.currentTime : 0;
    }

    // 获取音频总时长
    getDuration() {
        return this.audioPlayer ? this.audioPlayer.duration : 0;
    }

    // 跳转到指定时间
    seekTo(time) {
        if (this.audioPlayer) {
            this.audioPlayer.currentTime = time;
        }
    }
}

// 初始化音频管理器
const audioManager = new AudioManager();

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            if (audioManager.isPlaying) {
                audioManager.pause();
            } else {
                audioManager.play();
            }
            break;
        case 'ArrowRight':
            audioManager.next();
            break;
        case 'ArrowLeft':
            audioManager.previous();
            break;
    }
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('Radio AI Healing - 音频管理器已初始化');
    console.log('播放列表:', audioManager.playlist.map((track, index) => `${index + 1}. ${track.title}`).join('\n'));
});