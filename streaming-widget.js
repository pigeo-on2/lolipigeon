// streaming-widget.js - 실시간 스트리밍 위젯
class StreamingWidget {
    constructor() {
        this.streams = [];
        this.isLoading = false;
        this.youtubeChannelId = 'UCpigeo_on'; // pigeon_on 채널 ID
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadStreams();
        
        // 2분마다 자동 새로고침 (생방송 상태 확인)
        setInterval(() => {
            this.loadStreams();
        }, 2 * 60 * 1000);
    }
    
    bindEvents() {
        // 새로고침 버튼
        document.getElementById('refresh-streams').addEventListener('click', () => {
            this.loadStreams();
        });
    }
    
    async loadStreams() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            await this.loadYouTubeLiveStream();
        } catch (error) {
            console.error('Failed to load streams:', error);
            this.showNoStreams();
        } finally {
            this.isLoading = false;
        }
    }
    
    async loadYouTubeLiveStream() {
        try {
            // YouTube Data API v3를 사용하여 생방송 상태 확인
            // 실제 구현시에는 API 키가 필요합니다
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.youtubeChannelId}&type=video&eventType=live&key=YOUR_API_KEY`);
            
            if (response.ok) {
                const data = await response.json();
                
                if (data.items && data.items.length > 0) {
                    // 생방송 중인 경우
                    const liveStream = data.items[0];
                    this.streams = [{
                        id: liveStream.id.videoId,
                        title: liveStream.snippet.title,
                        streamer: 'pigeo_on',
                        game: '리듬게임',
                        viewers: 'LIVE',
                        thumbnail: liveStream.snippet.thumbnails.high.url,
                        avatar: 'https://yt3.googleusercontent.com/your-avatar-url',
                        isLive: true,
                        channelUrl: `https://www.youtube.com/@pigeo_on`
                    }];
                    this.renderStreams();
                } else {
                    // 생방송 중이 아닌 경우
                    this.showNoStreams();
                }
            } else {
                throw new Error('YouTube API request failed');
            }
        } catch (error) {
            console.log('YouTube API not available, using fallback check');
            // API 키가 없는 경우 간단한 상태 확인
            await this.checkYouTubeLiveStatus();
        }
    }
    
    async checkYouTubeLiveStatus() {
        // 간단한 방법으로 생방송 상태 확인 (API 키 없이)
        try {
            // 채널 페이지에서 생방송 상태 확인
            const channelResponse = await fetch(`https://www.youtube.com/@pigeo_on`);
            const channelText = await channelResponse.text();
            
            // 생방송 중인지 확인하는 간단한 방법
            if (channelText.includes('LIVE') || channelText.includes('생방송')) {
                // 생방송 중인 경우 더미 데이터 표시
                this.streams = [{
                    id: 'live-stream',
                    title: '리듬게임 생방송 중! 🎮',
                    streamer: 'pigeo_on',
                    game: '리듬게임',
                    viewers: 'LIVE',
                    thumbnail: 'https://via.placeholder.com/320x180/ff4757/ffffff?text=LIVE+STREAM',
                    avatar: 'https://via.placeholder.com/40x40/ff4757/ffffff?text=P',
                    isLive: true,
                    channelUrl: 'https://www.youtube.com/@pigeo_on'
                }];
                this.renderStreams();
            } else {
                this.showNoStreams();
            }
        } catch (error) {
            // 모든 방법이 실패한 경우 생방송 중이 아님으로 간주
            this.showNoStreams();
        }
    }
    

    
    renderStreams() {
        const widget = document.getElementById('streaming-widget');
        
        if (this.streams.length === 0) {
            this.showNoStreams();
            return;
        }
        
        const streamsHTML = this.streams.map(stream => this.createStreamCard(stream)).join('');
        widget.innerHTML = streamsHTML;
        
        // 스트림 카드 클릭 이벤트
        widget.querySelectorAll('.stream-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openStream(this.streams[index]);
            });
        });
    }
    
    createStreamCard(stream) {
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
                ${stream.isLive ? `<div class="stream-viewers">🔴 LIVE NOW</div>` : ''}
            </div>
        `;
    }
    
    openStream(stream) {
        if (stream.channelUrl) {
            window.open(stream.channelUrl, '_blank');
        }
    }
    
    showLoading() {
        const widget = document.getElementById('streaming-widget');
        widget.innerHTML = `
            <div class="streaming-loading">
                <div class="streaming-spinner"></div>
                <span>Checking live status...</span>
            </div>
        `;
    }
    
    showNoStreams() {
        const widget = document.getElementById('streaming-widget');
        widget.innerHTML = `
            <div class="no-streams">
                <div class="icon">📺</div>
                <p>there is no livestream</p>
                <small>YouTube 채널을 구독하고 알림을 받아보세요!</small>
                <a href="https://www.youtube.com/@pigeo_on" target="_blank" class="youtube-link">
                    <span>🟥</span> YouTube 채널 바로가기
                </a>
            </div>
        `;
    }
}

// 페이지 로드 시 위젯 초기화
let streamingWidget;
document.addEventListener('DOMContentLoaded', () => {
    streamingWidget = new StreamingWidget();
});

// 전역 함수로 노출
window.streamingWidget = streamingWidget;
