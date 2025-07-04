// typing-animation.js
class TypingAnimation {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.options = {
            speed: options.speed || 100,
            delay: options.delay || 0,
            cursor: options.cursor || '|',
            cursorBlink: options.cursorBlink !== false,
            ...options
        };
        
        this.currentIndex = 0;
        this.isTyping = false;
        this.cursorVisible = true;
        this.init();
    }

    init() {
        this.element.textContent = '';
        this.element.style.borderRight = '2px solid #a29bfe';
        this.element.style.paddingRight = '4px';
        
        setTimeout(() => {
            this.startTyping();
        }, this.options.delay);
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
            this.element.textContent += this.text[this.currentIndex];
            this.currentIndex++;
            
            setTimeout(() => {
                this.typeNextChar();
            }, this.options.speed);
        } else {
            this.isTyping = false;
            this.element.style.borderRight = 'none';
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
        this.init();
    }
}

// DOM이 로드되면 타이핑 애니메이션 시작
document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.querySelector('.profile-name-gradient');
    const profileDesc = document.querySelector('.profile-desc');
    
    if (profileName) {
        const originalText = profileName.textContent;
        new TypingAnimation(profileName, originalText, {
            speed: 150,
            delay: 500
        });
    }
    
    if (profileDesc) {
        const originalText = profileDesc.textContent;
        new TypingAnimation(profileDesc, originalText, {
            speed: 80,
            delay: 2000
        });
    }
}); 