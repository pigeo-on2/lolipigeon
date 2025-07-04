// parallax-scroll.js
class ParallaxScroll {
    constructor() {
        this.cards = [];
        this.stars = [];
        this.scrollY = 0;
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupCards();
        this.setupStars();
        this.update();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
            this.update();
        });

        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
            this.update();
        });
    }

    setupCards() {
        const cardElements = document.querySelectorAll('.card');
        cardElements.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05); // 각 카드마다 다른 속도
            const direction = index % 2 === 0 ? 1 : -1; // 번갈아가며 반대 방향
            
            // 카드의 초기 위치 저장
            const rect = card.getBoundingClientRect();
            
            this.cards.push({
                element: card,
                speed: speed * direction,
                originalY: rect.top + window.pageYOffset,
                originalX: rect.left + window.pageXOffset
            });
        });
    }

    setupStars() {
        // 별들이 스크롤에 반응하도록 설정
        const starCanvas = document.getElementById('galaxy-stars');
        if (starCanvas) {
            this.stars = {
                canvas: starCanvas,
                speed: 0.3
            };
        }
    }

    update() {
        this.updateCards();
        this.updateStars();
    }

    updateCards() {
        this.cards.forEach(card => {
            const yOffset = this.scrollY * card.speed;
            const xOffset = this.scrollY * card.speed * 0.3;
            
            // 카드가 화면에 들어올 때 애니메이션
            const rect = card.element.getBoundingClientRect();
            const isVisible = rect.top < this.windowHeight && rect.bottom > 0;
            
            if (isVisible) {
                card.element.style.opacity = '1';
                card.element.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1)`;
            } else {
                card.element.style.opacity = '0.7';
                card.element.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(0.95)`;
            }
        });
    }

    updateStars() {
        if (this.stars && window.setStarCount) {
            // 스크롤 위치에 따라 별의 움직임 속도 조절
            const scrollPercent = this.scrollY / (document.body.scrollHeight - this.windowHeight);
            const starSpeed = 500 + (scrollPercent * 1000);
            
            // 별 수를 동적으로 조절 (스크롤이 많을수록 더 많은 별)
            const starCount = Math.floor(500 + (scrollPercent * 500));
            window.setStarCount(starCount);
        }
    }
}

// 페이지 로드 시 패럴랙스 시작
document.addEventListener('DOMContentLoaded', () => {
    window.parallaxScroll = new ParallaxScroll();
}); 