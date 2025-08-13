// typing-animation.js - 강화된 텍스트 애니메이션
class TypingAnimation {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.options = {
            speed: options.speed || 100,
            delay: options.delay || 0,
            cursor: options.cursor || '|',
            cursorBlink: options.cursorBlink !== false,
            effect: options.effect || 'typing', // typing, glitch, fade, rainbow
            glitchIntensity: options.glitchIntensity || 0.1,
            ...options
        };
        
        this.currentIndex = 0;
        this.isTyping = false;
        this.cursorVisible = true;
        this.originalText = text;
        this.init();
    }

    init() {
        this.element.textContent = '';
        this.element.style.borderRight = '2px solid #a29bfe';
        this.element.style.paddingRight = '4px';
        
        // 효과별 초기 설정
        this.setupEffect();
        
        setTimeout(() => {
            this.startTyping();
        }, this.options.delay);
    }

    setupEffect() {
        switch (this.options.effect) {
            case 'glitch':
                this.element.style.textShadow = 'none';
                this.element.style.filter = 'none';
                break;
            case 'rainbow':
                this.element.style.background = 'linear-gradient(45deg, #ff70a6, #a29bfe, #ff70a6)';
                this.element.style.backgroundSize = '200% 200%';
                this.element.style.webkitBackgroundClip = 'text';
                this.element.style.webkitTextFillColor = 'transparent';
                this.element.style.backgroundClip = 'text';
                break;
            case 'fade':
                this.element.style.opacity = '0';
                this.element.style.transform = 'translateY(20px)';
                this.element.style.transition = 'all 0.5s ease';
                break;
        }
    }

    startTyping() {
        this.isTyping = true;
        this.typeNextChar();
        
        if (this.options.cursorBlink) {
            this.startCursorBlink();
        }
    }

    typeNextChar() {
        if (this.currentIndex < this.text.length) {
            const char = this.text[this.currentIndex];
            this.element.textContent += char;
            this.currentIndex++;
            
            // 효과별 애니메이션
            this.applyCharEffect(char);
            
            setTimeout(() => {
                this.typeNextChar();
            }, this.options.speed);
        } else {
            this.isTyping = false;
            this.element.style.borderRight = 'none';
            this.finalizeEffect();
        }
    }

    applyCharEffect(char) {
        switch (this.options.effect) {
            case 'glitch':
                if (Math.random() < this.options.glitchIntensity) {
                    this.applyGlitchEffect();
                }
                break;
            case 'rainbow':
                this.element.style.backgroundPosition = `${(this.currentIndex / this.text.length) * 100}% 50%`;
                break;
            case 'fade':
                this.element.style.opacity = '1';
                this.element.style.transform = 'translateY(0)';
                break;
        }
    }

    applyGlitchEffect() {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        const originalChar = this.element.textContent[this.currentIndex - 1];
        
        // 글리치 효과 적용
        this.element.textContent = this.element.textContent.slice(0, -1) + randomChar;
        
        setTimeout(() => {
            this.element.textContent = this.element.textContent.slice(0, -1) + originalChar;
        }, 50);
        
        // 텍스트 흔들림 효과
        this.element.style.transform = `translateX(${(Math.random() - 0.5) * 4}px)`;
        setTimeout(() => {
            this.element.style.transform = 'translateX(0)';
        }, 100);
    }

    finalizeEffect() {
        switch (this.options.effect) {
            case 'rainbow':
                // 무한 애니메이션
                this.element.style.animation = 'rainbowMove 3s ease-in-out infinite';
                break;
            case 'fade':
                this.element.style.transition = 'none';
                break;
        }
    }

    startCursorBlink() {
        const blink = () => {
            this.cursorVisible = !this.cursorVisible;
            this.element.style.borderRightColor = this.cursorVisible ? '#a29bfe' : 'transparent';
            setTimeout(blink, 500);
        };
        blink();
    }

    reset() {
        this.currentIndex = 0;
        this.isTyping = false;
        this.element.textContent = '';
        this.element.style.opacity = '1';
        this.element.style.transform = 'none';
        this.element.style.animation = 'none';
        this.init();
    }
}

// 새로운 애니메이션 효과들
class TextEffects {
    static glitchText(element, text, options = {}) {
        return new TypingAnimation(element, text, { ...options, effect: 'glitch' });
    }
    
    static rainbowText(element, text, options = {}) {
        return new TypingAnimation(element, text, { ...options, effect: 'rainbow' });
    }
    
    static fadeText(element, text, options = {}) {
        return new TypingAnimation(element, text, { ...options, effect: 'fade' });
    }
    
    // 타이핑 후 글자별 애니메이션
    static typewriterEffect(element, text, options = {}) {
        const animation = new TypingAnimation(element, text, options);
        animation.onComplete = () => {
            const chars = element.textContent.split('');
            element.textContent = '';
            
            chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.3s ease ${index * 0.1}s`;
                element.appendChild(span);
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 100);
            });
        };
        return animation;
    }
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbowMove {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    .glitch-text {
        animation: glitch 0.3s ease-in-out infinite;
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;
document.head.appendChild(style);

// DOM이 로드되면 타이핑 애니메이션 시작
document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.querySelector('.profile-name-gradient');
    const profileDesc = document.querySelector('.profile-desc');
    const cardTitles = document.querySelectorAll('.card-title');
    
    if (profileName) {
        const originalText = profileName.textContent;
        TextEffects.rainbowText(profileName, originalText, {
            speed: 150,
            delay: 500
        });
    }
    
    if (profileDesc) {
        const originalText = profileDesc.textContent;
        TextEffects.glitchText(profileDesc, originalText, {
            speed: 80,
            delay: 2000,
            glitchIntensity: 0.05
        });
    }
    
    // 카드 제목들에 페이드 효과
    cardTitles.forEach((title, index) => {
        const originalText = title.textContent;
        TextEffects.fadeText(title, originalText, {
            speed: 50,
            delay: 2500 + index * 300
        });
    });
}); 