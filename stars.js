// Animated starfield background
let STAR_COUNT = 350;
const STAR_COLORS = ['#fff', '#b3b8ff', '#a29bfe', '#ffe6fa', '#c7d2fe'];
const STAR_SIZE = [0.7, 1.2, 1.7];
const STAR_SPEED = [0.02, 0.04, 0.07];

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

let stars = [];
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
}

function setStarCount(newCount) {
  STAR_COUNT = newCount;
  resetStars();
}

function drawStars() {
  ctx.clearRect(0, 0, w, h);
  for (const star of stars) {
    // Twinkle effect
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
    // Move star
    star.x += star.speed;
    if (star.x > w + 5) star.x = -5;
    star.twinkle += 0.03 + Math.random() * 0.02;
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

resetStars();
drawStars();

// Expose for external use
window.setStarCount = setStarCount; 