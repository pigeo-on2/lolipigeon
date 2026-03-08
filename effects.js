// effects.js - 별 효과 및 기타 기능들
document.addEventListener('DOMContentLoaded', function() {
    // 별 효과 초기화
    initStars();
    
    // 시계 위젯 초기화
    initClock();
    
    // 명언 위젯 초기화
    initQuotes();
    
    // 깃허브 통계 초기화
    initGithubStats();
    
    // Discord ID 복사 기능
    const discordBtn = document.getElementById('discord-copy-btn');
    if (discordBtn) {
        discordBtn.addEventListener('click', function() {
            const discordId = this.getAttribute('data-discord-id');
            navigator.clipboard.writeText(discordId).then(function() {
                showToast('Discord ID가 복사되었습니다!');
            }).catch(function() {
                showToast('복사에 실패했습니다.');
            });
        });
    }

    // 토스트 메시지 표시 함수
    window.showToast = function(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    };

    // 페이지 로드 애니메이션
    const animateOnLoad = () => {
        const elements = document.querySelectorAll('.card');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };

    // 초기 애니메이션 설정
    const cardsToAnimate = document.querySelectorAll('.card');
    cardsToAnimate.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // 페이지 로드 후 애니메이션 시작
    setTimeout(animateOnLoad, 100);
});

// 별 효과 구현
function initStars() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId;

    // 캔버스 크기 설정
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 별 클래스
    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // 다양한 크기의 별 (1-3px)
            this.size = Math.random() < 0.7 ? Math.random() * 1.5 + 0.5 : Math.random() * 1.5 + 1.5;
            // 밝기 (작은 별은 더 어둡게, 큰 별은 더 밝게)
            this.baseBrightness = this.size < 1 ? 0.3 : this.size < 2 ? 0.6 : 0.9;
            this.brightness = this.baseBrightness;
            // 반짝임 속도 (각 별마다 다른 속도)
            this.twinkleSpeed = Math.random() * 0.02 + 0.005;
            // 반짝임 방향
            this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
        }

        update() {
            // 밝기 변화 (부드러운 반짝임)
            this.brightness += this.twinkleSpeed * this.twinkleDirection;
            
            // 밝기 범위 제한
            if (this.brightness >= 1) {
                this.brightness = 1;
                this.twinkleDirection = -1;
            } else if (this.brightness <= this.baseBrightness) {
                this.brightness = this.baseBrightness;
                this.twinkleDirection = 1;
            }
        }

        draw() {
            ctx.beginPath();
            const alpha = this.brightness;
            // 별 색상 (흰색에서 약간 파란색으로)
            const color = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillStyle = color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            // 큰 별은 반짝임 효과 추가
            if (this.size > 1.5) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.5})`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // 화면 크기 변경 시 위치 재조정
        reposition(newWidth, newHeight) {
            this.x = (this.x / canvas.width) * newWidth;
            this.y = (this.y / canvas.height) * newHeight;
        }
    }

    // 별 생성 (100-150개)
    const starCount = Math.floor(Math.random() * 50) + 100;
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    // 마우스 이동 이벤트 추가 (Parallax 효과)
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    
    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // 애니메이션 함수
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 부드러운 패럴랙스 (목표 위치로 서서히 이동)
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;
        
        // 화면 중심점 변위 계산 (-1 ~ 1)
        const dx = (mouseX - canvas.width / 2) / (canvas.width / 2);
        const dy = (mouseY - canvas.height / 2) / (canvas.height / 2);
        
        stars.forEach(star => {
            star.update();
            
            // 임시 위치에 그려 패럴랙스 적용 (깊이(크기)에 따라 다르게)
            const offsetX = dx * star.size * 10;
            const offsetY = dy * star.size * 10;
            
            ctx.beginPath();
            const alpha = star.brightness;
            const color = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillStyle = color;
            ctx.arc(star.x - offsetX, star.y - offsetY, star.size, 0, Math.PI * 2);
            ctx.fill();

            if (star.size > 1.5) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.5})`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        });

        animationId = requestAnimationFrame(animate);
    }

    // 애니메이션 시작
    animate();

    // 화면 크기 변경 시 별 위치 재조정
    window.addEventListener('resize', () => {
        resizeCanvas();
        stars.forEach(star => {
            star.reposition(canvas.width, canvas.height);
        });
    });
}

// ============== 추가 기능 구현 ==============

// 시계 위젯
function initClock() {
    const timeEl = document.getElementById('clock-time');
    const dateEl = document.getElementById('clock-date');
    
    if (!timeEl || !dateEl) return;

    function updateTime() {
        const now = new Date();
        const optionsTime = { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const optionsDate = { timeZone: 'Asia/Seoul', year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' };
        
        timeEl.textContent = now.toLocaleTimeString('en-US', optionsTime);
        dateEl.textContent = now.toLocaleDateString('en-US', optionsDate);
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// 명언 위젯
function initQuotes() {
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    const btn = document.getElementById('quote-refresh-btn');
    
    if (!textEl || !authorEl || !btn) return;

    const quotes = [
        { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
        { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
        { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
        { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupery" },
        { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
        { text: "Fix the cause, not the symptom.", author: "Steve Maguire" }
    ];

    function showRandomQuote() {
        textEl.style.opacity = '0';
        authorEl.style.opacity = '0';
        
        setTimeout(() => {
            const random = quotes[Math.floor(Math.random() * quotes.length)];
            textEl.textContent = `"${random.text}"`;
            authorEl.textContent = `- ${random.author}`;
            
            textEl.style.opacity = '1';
            authorEl.style.opacity = '1';
        }, 300);
    }

    showRandomQuote();
    
    btn.addEventListener('click', showRandomQuote);
}

// 깃허브 통계 연동
async function initGithubStats() {
    const repoCountEl = document.getElementById('repo-count');
    const followersCountEl = document.getElementById('followers-count');
    
    if (!repoCountEl || !followersCountEl) return;

    try {
        // github username is 'pigeo_on' according to link, but username on Github is likely 'pigeo_on' or 'pigeo-on'.
        // the provided link is https://github.com/pigeo_on
        const response = await fetch('https://api.github.com/users/pigeo_on');
        
        if (!response.ok) {
            // fallback if pigeo_on fails due to Github limits or rules
            const fallbackResponse = await fetch('https://api.github.com/users/pigeo-on');
            if (!fallbackResponse.ok) throw new Error('Cannot fetch user');
            
            const data = await fallbackResponse.json();
            animateValue(repoCountEl, 0, data.public_repos, 1500);
            animateValue(followersCountEl, 0, data.followers, 1500);
            return;
        }

        const data = await response.json();
        
        // 숫자 카운트업 애니메이션 적용
        animateValue(repoCountEl, 0, data.public_repos, 1500);
        animateValue(followersCountEl, 0, data.followers, 1500);
        
    } catch (e) {
        console.error('Failed to fetch Github stats:', e);
        repoCountEl.textContent = 'N/A';
        followersCountEl.textContent = 'N/A';
    }
}

// 숫자 부드럽게 증가하는 애니메이션 유틸리티
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        obj.textContent = Math.floor(ease * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
}
