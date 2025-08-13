// effects.js - 간단한 효과들
document.addEventListener('DOMContentLoaded', function() {
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

    // 카드 호버 효과 개선
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 부드러운 스크롤
    const smoothScroll = (target, duration) => {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
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