// Animated starfield background
let STAR_COUNT = 500; // 초기 별 개수 500개로 변경
const STAR_COLORS = [
  // 부드러운 파스텔 계열 + 약간의 푸른빛
  'rgba(255,255,255,1)',
  'rgba(180,184,255,1)',
  'rgba(162,155,254,1)',
  'rgba(255,230,250,1)',
  'rgba(199,210,254,1)',
  'rgba(120,180,255,1)',
  'rgba(200,255,255,1)'
];
const STAR_SIZE = [0.7, 1.1, 1.5, 2.2, 2.8];
const STAR_SPEED = [0.015, 0.025, 0.035, 0.045, 0.06];

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
    this.y = Math.random() * h * 0.4;
    this.length = randomBetween(320, 520);
    this.speed = randomBetween(10, 16);
    this.angle = randomBetween(Math.PI * 0.72, Math.PI * 1.08);
    this.opacity = randomBetween(0.93, 1.08);
    this.width = randomBetween(2.7, 4.2);
    this.life = randomBetween(1.7, 2.5);
    this.age = 0;
    this.colorStops = [
      { stop: 0, color: '#fff' },
      { stop: 0.25, color: '#e0aaff' },
      { stop: 0.7, color: '#a29bfe' },
      { stop: 1, color: 'rgba(162,155,254,0)' }
    ];
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.age += 0.012;
    this.opacity -= 0.004 + Math.random() * 0.003;
    this.life -= 0.008;
    return this.opacity > 0 && this.life > 0 && this.x > -100 && this.y > -100 && this.x < w + 100 && this.y < h + 100;
  }

  draw() {
    // 선형 그라데이션 glow 트레일
    const tx = this.x - Math.cos(this.angle) * this.length;
    const ty = this.y - Math.sin(this.angle) * this.length;
    const grad = ctx.createLinearGradient(this.x, this.y, tx, ty);
    this.colorStops.forEach(cs => grad.addColorStop(cs.stop, cs.color));
    ctx.save();
    ctx.globalAlpha = Math.min(1, this.opacity * 1.1);
    ctx.strokeStyle = grad;
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 24;
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(tx, ty);
    ctx.stroke();
    ctx.restore();
    // 머리 glow 강조
    ctx.save();
    ctx.globalAlpha = Math.min(1, this.opacity * 1.2);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width * 1.18, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 36;
    ctx.fill();
    ctx.restore();
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

function makeStar() {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: STAR_SIZE[Math.floor(Math.random() * STAR_SIZE.length)],
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    speed: STAR_SPEED[Math.floor(Math.random() * STAR_SPEED.length)],
    twinkle: Math.random() * Math.PI * 2,
    alpha: 0,
    state: 'fadein', // 'fadein', 'normal', 'fadeout'
    baseAlpha: randomBetween(0.5, 1),
    glow: randomBetween(8, 24)
  };
}

function resetStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    let s = makeStar();
    s.alpha = 1; // 리셋 시에는 바로 보이게
    s.state = 'normal';
    stars.push(s);
  }
  shootingStars = [];
  largeStars = Array.from({ length: LARGE_STAR_COUNT }, () => new LargeStar());
}

function setStarCount(newCount) {
  STAR_COUNT = newCount;
  // 별 개수 맞추기
  if (stars.length < STAR_COUNT) {
    for (let i = stars.length; i < STAR_COUNT; i++) {
      let s = makeStar();
      s.alpha = 0;
      s.state = 'fadein';
      stars.push(s);
    }
  } else if (stars.length > STAR_COUNT) {
    stars.length = STAR_COUNT;
  }
}

function spawnShootingStar() {
  shootingStars.push(new ShootingStar());
}

function drawStars() {
  ctx.clearRect(0, 0, w, h);

  // 별 상태 업데이트 및 그리기
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    if (star.state === 'fadein') {
      star.alpha += 0.03;
      if (star.alpha >= 1) {
        star.alpha = 1;
        star.state = 'normal';
      }
    } else if (star.state === 'fadeout') {
      star.alpha -= 0.05;
      if (star.alpha <= 0) {
        stars[i] = makeStar();
        continue;
      }
    }
    const tw = star.baseAlpha * (0.7 + 0.3 * Math.sin(star.twinkle)) * 1.3;
    ctx.save();
    ctx.globalAlpha = tw * star.alpha;
    ctx.shadowColor = star.color;
    ctx.shadowBlur = star.glow;
    const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 2.5);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(0.3, star.color);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r * randomBetween(0.9, 1.2), 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    star.x += star.speed;
    if (star.x > w + 5 && star.state !== 'fadeout') {
      star.state = 'fadeout';
    }
    star.twinkle += 0.03 + Math.random() * 0.02;
  }

  // 슈팅스타
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    s.draw();
    if (!s.update()) shootingStars.splice(i, 1);
  }

  // Draw large stars
  for (const star of largeStars) {
    star.update();
    star.draw();
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

// 슈팅스타 자동 생성
setInterval(() => {
  if (shootingStars.length < 4 && Math.random() < 0.85) spawnShootingStar();
}, 1400);

// 마우스 클릭 시 슈팅스타
canvas.addEventListener('click', e => {
  const angle = randomBetween(Math.PI * 0.6, Math.PI * 1.2);
  shootingStars.push(new ShootingStar());
});

resetStars();
drawStars();

// Expose for external use
window.setStarCount = setStarCount;
window.STAR_COLORS = STAR_COLORS;
window.resetStars = resetStars;

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
        toast.innerHTML = '✅&nbsp;' + message;
        toast.style.display = 'block';
        toast.classList.remove('toast-hide');
        toast.classList.add('toast-show');
        setTimeout(() => {
            toast.classList.remove('toast-show');
            toast.classList.add('toast-hide');
            setTimeout(() => {
                toast.style.display = 'none';
            }, 600);
        }, 1800);
    }

    // Star slider 연동
    const starSlider = document.getElementById('star-slider');
    const starSliderValue = document.getElementById('star-slider-value');
    if (starSlider && starSliderValue) {
        starSlider.addEventListener('input', function() {
            setStarCount(Number(starSlider.value));
            starSliderValue.textContent = starSlider.value;
        });
    }

    document.querySelectorAll('.music-btn, .social-btn').forEach(btn => {
        btn.addEventListener('click', addRippleEffect);
    });

    // 드래그/텍스트 선택 방지
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('selectstart', e => {
      if (e.target.closest('.music-btn, .social-btn, .card, .profile-title, .profile-desc, .music-title, .music-artist')) {
        e.preventDefault();
      }
    });
});

function addRippleEffect(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
} 