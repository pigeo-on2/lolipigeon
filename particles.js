// Sparkling particle effect that follows the mouse
const PARTICLE_COUNT = 50;
const PARTICLE_COLORS = ['#ffd700', '#ff69b4', '#87ceeb', '#98fb98', '#dda0dd'];
const PARTICLE_SIZE = [2, 4, 6];
const PARTICLE_SPEED = 2;
const PARTICLE_LIFETIME = 1000; // milliseconds

const canvas = document.createElement('canvas');
canvas.id = 'sparkle-particles';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 1;
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

let particles = [];
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  createParticles();
});

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticles() {
  for (let i = 0; i < 3; i++) {
    particles.push({
      x: mouseX,
      y: mouseY,
      vx: randomBetween(-PARTICLE_SPEED, PARTICLE_SPEED),
      vy: randomBetween(-PARTICLE_SPEED, PARTICLE_SPEED),
      size: PARTICLE_SIZE[Math.floor(Math.random() * PARTICLE_SIZE.length)],
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      life: PARTICLE_LIFETIME,
      maxLife: PARTICLE_LIFETIME
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 16; // Approximately 60fps

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, w, h);
  
  for (const p of particles) {
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10 * alpha;
    ctx.fill();
    ctx.closePath();
  }
  
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  
  updateParticles();
  requestAnimationFrame(drawParticles);
}

drawParticles(); 