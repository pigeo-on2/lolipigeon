// Animated starfield background
let STAR_COUNT = 500;
const STAR_COLORS = ['#fff', '#b3b8ff', '#a29bfe', '#ffe6fa', '#c7d2fe'];
const STAR_SIZE = [0.7, 1.2, 1.7];
const STAR_SPEED = [0.02, 0.04, 0.07];

// New effects
const SHOOTING_STAR_CHANCE = 0.0005; // Increased chance of shooting star appearing per frame
const LARGE_STAR_COUNT = 10; // Number of large glowing stars

const canvas = document.createElement('canvas');
canvas.id = 'galaxy-stars';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 0;
document.body.prepend(canvas);

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
  resetStars();
});

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

// Shooting star class
class ShootingStar {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h * 0.2;
    this.length = randomBetween(150, 300); // Increased length
    this.speed = randomBetween(15, 25);
    this.angle = randomBetween(Math.PI * 0.2, Math.PI * 0.8);
    this.opacity = 1;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.opacity -= 0.01;
    return this.opacity > 0;
  }

  draw() {
    // Draw glow effect
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
    ctx.lineWidth = 8;
    ctx.stroke();

    // Draw main line
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 4;
    ctx.stroke();
  }
}

// Large star class
class LargeStar {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = randomBetween(2, 4);
    this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    this.pulse = Math.random() * Math.PI * 2;
  }

  update() {
    this.pulse += 0.02;
  }

  draw() {
    const glow = 0.7 + 0.3 * Math.sin(this.pulse);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15 * glow;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

let stars = [];
let shootingStars = [];
let largeStars = [];

function createStars(count) {
  return Array.from({ length: count }, () => {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: STAR_SIZE[Math.floor(Math.random() * STAR_SIZE.length)],
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      speed: STAR_SPEED[Math.floor(Math.random() * STAR_SPEED.length)],
      twinkle: Math.random() * Math.PI * 2,
    };
  });
}

function resetStars() {
  stars = createStars(STAR_COUNT);
  shootingStars = [];
  largeStars = Array.from({ length: LARGE_STAR_COUNT }, () => new LargeStar());
}

function setStarCount(newCount) {
  STAR_COUNT = newCount;
  resetStars();
}

function drawStars() {
  ctx.clearRect(0, 0, w, h);

  // Draw regular stars
  for (const star of stars) {
    const tw = 0.7 + 0.3 * Math.sin(star.twinkle);
    ctx.globalAlpha = tw;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.shadowColor = star.color;
    ctx.shadowBlur = 8 * tw;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
    star.x += star.speed;
    if (star.x > w + 5) star.x = -5;
    star.twinkle += 0.03 + Math.random() * 0.02;
  }

  // Draw large stars
  for (const star of largeStars) {
    star.update();
    star.draw();
  }

  // Handle shooting stars
  if (Math.random() < SHOOTING_STAR_CHANCE) {
    shootingStars.push(new ShootingStar());
  }
  
  shootingStars = shootingStars.filter(star => {
    star.draw();
    return star.update();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

resetStars();
drawStars();

// Expose for external use
window.setStarCount = setStarCount;

// Discord 복사 및 토스트 메시지
window.addEventListener('DOMContentLoaded', function() {
    const discordBtn = document.getElementById('discord-copy-btn');
    const toast = document.getElementById('toast');
    if (discordBtn && toast) {
        discordBtn.addEventListener('click', function() {
            const discordId = discordBtn.getAttribute('data-discord-id') || 'pigeon#1234';
            navigator.clipboard.writeText(discordId).then(() => {
                showToast('Discord ID copied!');
            });
        });
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('toast-hide');
        toast.classList.add('toast-show');
        setTimeout(() => {
            toast.classList.remove('toast-show');
            toast.classList.add('toast-hide');
        }, 1800);
    }
}); 