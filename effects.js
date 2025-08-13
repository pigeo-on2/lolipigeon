// effects.js - 간단한 마우스 파티클 + 슈팅스타 + 커스텀 커서
const particles = [];
const shootingStars = [];

// 커스텀 커서 요소들
const customCursor = document.createElement('div');
customCursor.id = 'custom-cursor';
customCursor.style.cssText = `
  position: fixed;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #a29bfe 0%, rgba(162, 155, 254, 0.3) 100%);
  border: 2px solid #a29bfe;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  mix-blend-mode: difference;
`;

const cursorTrail = document.createElement('div');
cursorTrail.id = 'cursor-trail';
cursorTrail.style.cssText = `
  position: fixed;
  width: 8px;
  height: 8px;
  background: rgba(162, 155, 254, 0.6);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transition: all 0.3s ease;
`;

document.body.appendChild(customCursor);
document.body.appendChild(cursorTrail);

// 커서 위치 추적
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // 커서가 링크나 버튼 위에 있을 때 크기 변경
  const target = e.target;
  if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
    customCursor.style.transform = 'scale(1.5)';
    customCursor.style.background = 'radial-gradient(circle, #ff70a6 0%, rgba(255, 112, 166, 0.3) 100%)';
    customCursor.style.borderColor = '#ff70a6';
  } else {
    customCursor.style.transform = 'scale(1)';
    customCursor.style.background = 'radial-gradient(circle, #a29bfe 0%, rgba(162, 155, 254, 0.3) 100%)';
    customCursor.style.borderColor = '#a29bfe';
  }
  
  // 파티클 생성 (기존 코드)
  particles.push({
    x: e.clientX,
    y: e.clientY,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    life: 1,
    size: 2 + Math.random() * 2
  });
});

// 커서 애니메이션
function updateCursor() {
  // 메인 커서 부드럽게 따라가기
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  
  // 트레일 커서 더 부드럽게 따라가기
  trailX += (mouseX - trailX) * 0.08;
  trailY += (mouseY - trailY) * 0.08;
  
  customCursor.style.left = cursorX - 10 + 'px';
  customCursor.style.top = cursorY - 10 + 'px';
  
  cursorTrail.style.left = trailX - 4 + 'px';
  cursorTrail.style.top = trailY - 4 + 'px';
}

// 슈팅스타 생성
function spawnShootingStar() {
  const x = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
  const y = Math.random() * window.innerHeight * 0.2 + window.innerHeight * 0.05;
  const len = 150 + Math.random() * 100;
  const angle = Math.PI / 3 + (Math.random() - 0.5) * 0.3;
  shootingStars.push({
    x, y, len, angle,
    speed: 6 + Math.random() * 4,
    life: 1
  });
}

setInterval(() => {
  if (shootingStars.length < 2) spawnShootingStar();
}, 1500);

// 애니메이션
function animate() {
  // 커서 업데이트
  updateCursor();
  
  // 슈팅스타만 렌더링 (파티클은 제거)
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    const dx = Math.cos(s.angle) * s.len;
    const dy = Math.sin(s.angle) * s.len;
    
    // 슈팅스타를 DOM 요소로 렌더링
    if (!s.element) {
      s.element = document.createElement('div');
      s.element.style.cssText = `
        position: fixed;
        width: 2px;
        height: ${s.len}px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
        transform-origin: 0 0;
        pointer-events: none;
        z-index: 1;
        box-shadow: 0 0 10px rgba(255,255,255,0.5);
      `;
      document.body.appendChild(s.element);
    }
    
    s.element.style.left = s.x + 'px';
    s.element.style.top = s.y + 'px';
    s.element.style.transform = `rotate(${s.angle}rad)`;
    s.element.style.opacity = s.life;
    
    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.life -= 0.015;
    
    if (s.life <= 0) {
      if (s.element) {
        document.body.removeChild(s.element);
      }
      shootingStars.splice(i, 1);
    }
  }
  
  // 파티클 제거 (기존 파티클 시스템은 제거)
  particles.length = 0;
  
  requestAnimationFrame(animate);
}

// 윈도우 리사이즈 처리
window.addEventListener('resize', () => {
  // 슈팅스타 위치 재조정
  shootingStars.forEach(star => {
    if (star.x > window.innerWidth) star.x = 0;
    if (star.y > window.innerHeight) star.y = 0;
  });
});

// 애니메이션 시작
animate();

// 페이지 로드 시 커서 숨기기
window.addEventListener('load', () => {
  document.body.style.cursor = 'none';
});

// 모바일에서는 커스텀 커서 비활성화
if ('ontouchstart' in window) {
  customCursor.style.display = 'none';
  cursorTrail.style.display = 'none';
  document.body.style.cursor = 'auto';
} 