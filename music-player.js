// music-player.js
// 외부 songs.json을 fetch해서 음악 플레이어 UI를 제어

const SONGS_URL = "https://raw.githubusercontent.com/pigeo-on2/lolipigeon/refs/heads/main/songs.json"; // 외부 URL로 변경
let songs = [];
let current = 0;
let ytPlayer;
let ytApiLoaded = false;

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

function onYouTubeIframeAPIReady() {
    ytApiLoaded = true;
    initYTPlayer();
}

function initYTPlayer() {
    if (!songs.length) return;
    ytPlayer = new YT.Player('music-yt', {
        height: '0',
        width: '0',
        videoId: getCurrentVideoId(),
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function getCurrentVideoId() {
    return songs[current].url.replace('youtu.be/', '');
}

function onPlayerReady() {
    updateNowPlaying();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        nextSong();
    }
}

function playSong() {
    if (ytPlayer) ytPlayer.playVideo();
}

function pauseSong() {
    if (ytPlayer) ytPlayer.pauseVideo();
}

function nextSong() {
    if (!songs.length) return;
    current = (current + 1) % songs.length;
    ytPlayer.loadVideoById(getCurrentVideoId());
    updateNowPlaying();
}

function updateNowPlaying() {
    musicTitle.textContent = songs[current].title;
}

function loadSongs() {
    fetch(SONGS_URL)
        .then(res => res.json())
        .then(list => {
            songs = list;
            if (songs.length > 0) {
                current = 0;
                if (ytApiLoaded) {
                    initYTPlayer();
                }
                playBtn.disabled = false;
                prevBtn.disabled = false;
                nextBtn.disabled = false;
                updateNowPlaying();
            } else {
                musicTitle.textContent = "No songs";
            }
        });
}

// YouTube IFrame API 스크립트 동적 삽입
if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

window.addEventListener('DOMContentLoaded', loadSongs);

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
    // 0.1초 딜레이로 팝업에 마우스 올릴 시간 줌
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
            loadSong(current);
            hidePlaylistPopup();
        }
    }
}); 