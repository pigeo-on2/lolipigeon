// effects.js - 별 효과 및 기타 기능들
document.addEventListener('DOMContentLoaded', function() {
    // 별 효과 초기화
    initStars();
    
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

    // 애니메이션 함수
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    // 애니메이션 시작
    animate();

    // 화면 크기 변경 시 별 위치 재조정
    window.addEventListener('resize', () => {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;
        resizeCanvas();
        stars.forEach(star => {
            star.reposition(canvas.width, canvas.height);
        });
    });
}
