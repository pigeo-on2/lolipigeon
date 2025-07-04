// effects.js - 간단한 마우스 파티클 + 슈팅스타 + 커스텀 커서
const particles = [];
const shootingStars = [];

const canvas = document.createElement('canvas');
canvas.id = 'effects-canvas';
canvas.style.position = 'fixed';
canvas.style.left = 0;
canvas.style.top = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 20;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

// 간단한 마우스 파티클
window.addEventListener('mousemove', e => {
  particles.push({
    x: e.clientX,
    y: e.clientY,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    life: 1,
    size: 2 + Math.random() * 2
  });
});

// 슈팅스타 생성
function spawnShootingStar() {
  const x = Math.random() * w * 0.8 + w * 0.1;
  const y = Math.random() * h * 0.2 + h * 0.05;
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
  ctx.clearRect(0, 0, w, h);
  
  // 마우스 파티클
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.02;
    
    ctx.save();
    ctx.globalAlpha = p.life;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.restore();
    
    if (p.life <= 0) particles.splice(i, 1);
  }
  
  // 슈팅스타
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    const dx = Math.cos(s.angle) * s.len;
    const dy = Math.sin(s.angle) * s.len;
    
    ctx.save();
    ctx.globalAlpha = s.life;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + dx, s.y + dy);
    ctx.stroke();
    ctx.restore();
    
    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.life -= 0.015;
    
    if (s.life <= 0) shootingStars.splice(i, 1);
  }
  
  requestAnimationFrame(animate);
}

animate(); 