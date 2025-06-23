// music-player.js
// 외부 songs.json을 fetch해서 음악 플레이어 UI를 제어

const SONGS_URL = "https://raw.githubusercontent.com/pigeo-on2/lolipigeon/refs/heads/main/songs.json"; // 외부 URL로 변경
let songs = [];
let current = 0;
let ytPlayer;
let ytApiLoaded = false;
let isPlayerReady = false;
let progressUpdater = null;

const musicTitle = document.getElementById('music-title');
const musicArtist = document.getElementById('music-artist');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const musicYt = document.getElementById('music-yt');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const playlistPopup = document.getElementById('playlist-popup');
const volumeSlider = document.getElementById('volume-slider');

const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

function getCurrentVideoId() {
    return songs[current].url.replace('youtu.be/', '');
}

function updateNowPlaying() {
    musicTitle.textContent = songs.length ? songs[current].title : 'No songs';
}

function setPlayerControls(enabled) {
    playBtn.disabled = !enabled;
    prevBtn.disabled = !enabled;
    nextBtn.disabled = !enabled;
}

function formatTime(sec) {
    sec = Math.floor(sec);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateProgressUI() {
    if (!ytPlayer || !isPlayerReady) return;
    const current = ytPlayer.getCurrentTime();
    const total = ytPlayer.getDuration();
    currentTimeEl.textContent = formatTime(current);
    totalTimeEl.textContent = isNaN(total) ? '0:00' : formatTime(total);
    // 진행바
    if (!isNaN(total) && total > 0) {
        const percent = (current / total) * 100;
        progressBar.style.width = percent + '%';
    } else {
        progressBar.style.width = '0%';
    }
}

function startProgressUpdater() {
    if (progressUpdater) clearInterval(progressUpdater);
    progressUpdater = setInterval(updateProgressUI, 500);
}
function stopProgressUpdater() {
    if (progressUpdater) clearInterval(progressUpdater);
    progressUpdater = null;
}

function onYouTubeIframeAPIReady() {
    ytApiLoaded = true;
    if (songs.length) {
        ytPlayer = new YT.Player('music-yt', {
            height: '0',
            width: '0',
            videoId: getCurrentVideoId(),
            events: {
                'onReady': (event) => {
                    isPlayerReady = true;
                    setPlayerControls(true);
                    updateNowPlaying();
                    volumeSlider.value = event.target.getVolume();
                    console.log('Player is ready');
                    event.target.playVideo(); // 자동 재생 시도
                },
                'onStateChange': (event) => {
                    if (event.data === YT.PlayerState.PLAYING) {
                        playIcon.style.display = 'none';
                        pauseIcon.style.display = 'block';
                        startProgressUpdater();
                    } else if (
                        event.data === YT.PlayerState.PAUSED ||
                        event.data === YT.PlayerState.ENDED
                    ) {
                        playIcon.style.display = 'block';
                        pauseIcon.style.display = 'none';
                        stopProgressUpdater();
                    }
                    if (event.data === YT.PlayerState.ENDED) {
                        nextSong();
                    }
                }
            }
        });
    }
}

function togglePlayPause() {
    if (!ytPlayer || !isPlayerReady) return;
    const state = ytPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    if (ytPlayer && isPlayerReady) {
        ytPlayer.playVideo();
        console.log('Play pressed');
    }
}

function pauseSong() {
    if (ytPlayer && isPlayerReady) {
        ytPlayer.pauseVideo();
        console.log('Pause pressed');
    }
}

function nextSong() {
    if (!songs.length) return;
    current = (current + 1) % songs.length;
    if (ytPlayer && isPlayerReady) {
        ytPlayer.loadVideoById(getCurrentVideoId());
        updateNowPlaying();
        ytPlayer.playVideo(); // 자동 재생
        console.log('Next song, auto play');
    }
}

function prevSong() {
    if (!songs.length) return;
    current = (current - 1 + songs.length) % songs.length;
    if (ytPlayer && isPlayerReady) {
        ytPlayer.loadVideoById(getCurrentVideoId());
        updateNowPlaying();
        ytPlayer.playVideo(); // 자동 재생
        console.log('Prev song, auto play');
    }
}

playBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
volumeSlider.addEventListener('input', (e) => {
    if (ytPlayer && isPlayerReady) {
        ytPlayer.setVolume(e.target.value);
    }
});

function loadSongs() {
    fetch(SONGS_URL)
        .then(res => res.json())
        .then(list => {
            songs = list;
            if (songs.length > 0) {
                current = 0;
                updateNowPlaying();
                setPlayerControls(false);
                if (ytApiLoaded && !ytPlayer) {
                    onYouTubeIframeAPIReady();
                }
            } else {
                musicTitle.textContent = "No songs";
                setPlayerControls(false);
            }
        });
}

// YouTube IFrame API script load
if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
}
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
window.addEventListener('DOMContentLoaded', () => {
    // music-yt div 강제 display:block
    const ytDiv = document.getElementById('music-yt');
    if (ytDiv) ytDiv.style.display = 'block';
    loadSongs();
});

function showPlaylistPopup() {
    if (!songs.length) return;
    let html = '<div style="max-height:220px;overflow-y:auto;">';
    songs.forEach((song, idx) => {
        html += `<div class="playlist-item" data-idx="${idx}" style="padding:0.4em 0.7em;cursor:pointer;color:${idx===current?'#ff70a6':'#a29bfe'};font-weight:${idx===current?'700':'500'};background:${idx===current?'rgba(255,112,166,0.08)':'none'};border-radius:8px;margin-bottom:2px;">${song.title}</div>`;
    });
    html += '</div>';
    playlistPopup.innerHTML = html;
    playlistPopup.style.display = 'block';
}

function hidePlaylistPopup() {
    playlistPopup.style.display = 'none';
}

musicTitle.addEventListener('mouseenter', showPlaylistPopup);
musicTitle.addEventListener('mouseleave', (e) => {
    setTimeout(() => {
        if (!playlistPopup.matches(':hover')) hidePlaylistPopup();
    }, 100);
});
playlistPopup.addEventListener('mouseleave', hidePlaylistPopup);
playlistPopup.addEventListener('mouseenter', showPlaylistPopup);

playlistPopup.addEventListener('click', (e) => {
    const item = e.target.closest('.playlist-item');
    if (item) {
        const idx = parseInt(item.getAttribute('data-idx'));
        if (!isNaN(idx)) {
            current = idx;
            if (ytPlayer && isPlayerReady) {
                ytPlayer.loadVideoById(getCurrentVideoId());
                updateNowPlaying();
                ytPlayer.playVideo(); // 자동 재생
                console.log('Playlist select, auto play');
            }
            hidePlaylistPopup();
        }
    }
}); 