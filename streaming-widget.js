// streaming-widget.js - 실시간 스트리밍 위젯
class StreamingWidget {
    constructor() {
        this.currentPlatform = 'twitch';
        this.streams = [];
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadStreams();
        
        // 5분마다 자동 새로고침
        setInterval(() => {
            this.loadStreams();
        }, 5 * 60 * 1000);
    }
    
    bindEvents() {
        // 플랫폼 토글 버튼
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchPlatform(e.target.dataset.platform);
            });
        });
        
        // 새로고침 버튼
        document.getElementById('refresh-streams').addEventListener('click', () => {
            this.loadStreams();
        });
    }
    
    switchPlatform(platform) {
        this.currentPlatform = platform;
        
        // 버튼 상태 업데이트
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.platform === platform);
        });
        
        // 스트림 다시 로드
        this.loadStreams();
    }
    
    async loadStreams() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            if (this.currentPlatform === 'twitch') {
                await this.loadTwitchStreams();
            } else {
                await this.loadYouTubeStreams();
            }
        } catch (error) {
            console.error('Failed to load streams:', error);
            this.showError('스트림을 불러오는데 실패했습니다.');
        } finally {
            this.isLoading = false;
        }
    }
    
    async loadTwitchStreams() {
        // Twitch API는 인증이 필요하므로 더미 데이터 사용
        // 실제 구현시에는 Twitch API 키가 필요합니다
        const mockTwitchStreams = [
            {
                id: 'twitch1',
                title: '프로젝트 세카이 AP 도전!',
                streamer: 'pigeo_on2',
                game: '프로젝트 세카이',
                viewers: 42,
                thumbnail: 'https://via.placeholder.com/320x180/ff70a6/ffffff?text=프로젝트+세카이',
                avatar: 'https://via.placeholder.com/40x40/a29bfe/ffffff?text=P',
                isLive: true
            },
            {
                id: 'twitch2',
                title: 'CHUNITHM 레이팅 올리기',
                streamer: 'pigeo_on2',
                game: 'CHUNITHM',
                viewers: 28,
                thumbnail: 'https://via.placeholder.com/320x180/a29bfe/ffffff?text=CHUNITHM',
                avatar: 'https://via.placeholder.com/40x40/a29bfe/ffffff?text=P',
                isLive: true
            }
        ];
        
        this.streams = mockTwitchStreams;
        this.renderStreams();
    }
    
    async loadYouTubeStreams() {
        // YouTube API는 인증이 필요하므로 더미 데이터 사용
        const mockYouTubeStreams = [
            {
                id: 'yt1',
                title: '리듬게임 하이라이트',
                streamer: 'pigeo_on2',
                game: '리듬게임',
                viewers: 35,
                thumbnail: 'https://via.placeholder.com/320x180/ff4757/ffffff?text=리듬게임',
                avatar: 'https://via.placeholder.com/40x40/ff4757/ffffff?text=P',
                isLive: true
            }
        ];
        
        this.streams = mockYouTubeStreams;
        this.renderStreams();
    }
    
    renderStreams() {
        const widget = document.getElementById('streaming-widget');
        
        if (this.streams.length === 0) {
            widget.innerHTML = `
                <div class="no-streams">
                    <div class="icon">📺</div>
                    <p>현재 라이브 스트림이 없습니다</p>
                    <small>${this.currentPlatform === 'twitch' ? 'Twitch' : 'YouTube'}에서 스트리밍을 확인해보세요</small>
                </div>
            `;
            return;
        }
        
        const streamsHTML = this.streams.map(stream => this.createStreamCard(stream)).join('');
        widget.innerHTML = streamsHTML;
        
        // 스트림 카드 클릭 이벤트
        widget.querySelectorAll('.stream-card').forEach(card => {
            card.addEventListener('click', () => {
                this.openStream(stream);
            });
        });
    }
    
    createStreamCard(stream) {
        const platformIcon = this.currentPlatform === 'twitch' ? '🟣' : '🔴';
        const statusClass = stream.isLive ? 'live' : 'offline';
        const statusText = stream.isLive ? 'LIVE' : 'OFFLINE';
        
        return `
            <div class="stream-card" data-stream-id="${stream.id}">
                <div class="stream-header">
                    <img src="${stream.avatar}" alt="${stream.streamer}" class="stream-avatar">
                    <div class="stream-info">
                        <h4>${stream.title}</h4>
                        <p>${stream.streamer} • ${stream.game}</p>
                    </div>
                    <div class="stream-status ${statusClass}">
                        <span class="status-dot"></span>
                        ${statusText}
                    </div>
                </div>
                <img src="${stream.thumbnail}" alt="${stream.title}" class="stream-thumbnail">
                ${stream.isLive ? `<div class="stream-viewers">👥 ${stream.viewers}명 시청</div>` : ''}
            </div>
        `;
    }
    
    openStream(stream) {
        let url;
        if (this.currentPlatform === 'twitch') {
            url = `https://www.twitch.tv/${stream.streamer}`;
        } else {
            url = `https://www.youtube.com/channel/${stream.id}`;
        }
        window.open(url, '_blank');
    }
    
    showLoading() {
        const widget = document.getElementById('streaming-widget');
        widget.innerHTML = `
            <div class="streaming-loading">
                <div class="streaming-spinner"></div>
                <span>Loading ${this.currentPlatform === 'twitch' ? 'Twitch' : 'YouTube'} streams...</span>
            </div>
        `;
    }
    
    showError(message) {
        const widget = document.getElementById('streaming-widget');
        widget.innerHTML = `
            <div class="no-streams">
                <div class="icon">❌</div>
                <p>${message}</p>
                <button class="streaming-btn" onclick="streamingWidget.loadStreams()">
                    <span>🔄</span> 다시 시도
                </button>
            </div>
        `;
    }
}

// 실제 Twitch API 연동 (선택사항)
class TwitchAPI {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.accessToken = null;
    }
    
    async authenticate() {
        const response = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'client_credentials'
            })
        });
        
        const data = await response.json();
        this.accessToken = data.access_token;
        return this.accessToken;
    }
    
    async getStreams(userIds) {
        if (!this.accessToken) {
            await this.authenticate();
        }
        
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userIds.join('&user_id=')}`, {
            headers: {
                'Client-ID': this.clientId,
                'Authorization': `Bearer ${this.accessToken}`
            }
        });
        
        return await response.json();
    }
}

// 실제 YouTube API 연동 (선택사항)
class YouTubeAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    
    async getLiveStreams(channelIds) {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelIds.join(',')}&type=video&eventType=live&key=${this.apiKey}`
        );
        
        return await response.json();
    }
}

// 페이지 로드 시 위젯 초기화
let streamingWidget;
document.addEventListener('DOMContentLoaded', () => {
    streamingWidget = new StreamingWidget();
});

// 전역 함수로 노출 (HTML에서 직접 호출 가능)
window.streamingWidget = streamingWidget;
