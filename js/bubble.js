/* ===== 替你选 — 泡泡池动画引擎 ===== */

window._usedShopIds = new Set();

let allShops = [];
let currentShop = null;
let bubbleShops = [];
const BUBBLE_COUNT = 9;

// ---------- 星空粒子 ----------
function initStars() {
  const canvas = document.getElementById('starsCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  const STAR_COUNT = 80;
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * 0.001;
    stars.forEach(star => {
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * star.twinkleSpeed + star.twinkleOffset));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ---------- 生成气泡 ----------
function createBubbles() {
  const layer = document.getElementById('bubbleLayer');
  layer.innerHTML = '';

  const layerW = layer.clientWidth;
  const layerH = layer.clientHeight;

  // 随机选 N 个商家作为气泡
  const shuffled = [...allShops].sort(() => Math.random() - 0.5);
  bubbleShops = shuffled.slice(0, Math.min(BUBBLE_COUNT, shuffled.length));

  const animations = ['float', 'float-delay-1', 'float-delay-2', 'float-delay-3'];
  const bubbleColors = [
    { size: 75, color: 'rgba(140, 74, 0, 0.25)', glow: 'rgba(253, 139, 0, 0.4)' },
    { size: 85, color: 'rgba(254, 203, 0, 0.25)', glow: 'rgba(254, 203, 0, 0.5)' },
    { size: 70, color: 'rgba(0, 107, 27, 0.20)', glow: 'rgba(0, 107, 27, 0.35)' },
    { size: 90, color: 'rgba(253, 139, 0, 0.22)', glow: 'rgba(253, 139, 0, 0.45)' },
    { size: 80, color: 'rgba(140, 74, 0, 0.20)', glow: 'rgba(140, 74, 0, 0.38)' },
    { size: 88, color: 'rgba(254, 203, 0, 0.22)', glow: 'rgba(254, 203, 0, 0.42)' },
    { size: 78, color: 'rgba(0, 107, 27, 0.23)', glow: 'rgba(0, 107, 27, 0.40)' },
    { size: 92, color: 'rgba(253, 139, 0, 0.20)', glow: 'rgba(253, 139, 0, 0.38)' },
    { size: 82, color: 'rgba(140, 74, 0, 0.22)', glow: 'rgba(140, 74, 0, 0.42)' }
  ];

  // 生成不重叠的位置
  const positions = [
    { x: 0.12, y: 0.10 }, { x: 0.48, y: 0.08 }, { x: 0.82, y: 0.14 },
    { x: 0.28, y: 0.35 }, { x: 0.62, y: 0.30 }, { x: 0.88, y: 0.48 },
    { x: 0.15, y: 0.60 }, { x: 0.52, y: 0.62 }, { x: 0.78, y: 0.70 }
  ];

  bubbleShops.forEach((shop, i) => {
    const bubble = document.createElement('div');
    const cfg = bubbleColors[i] || bubbleColors[0];
    const size = cfg.size;
    const pos = positions[i] || { x: 0.5, y: 0.5 };

    bubble.className = 'bubble';
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = (pos.x * layerW - size / 2) + 'px';
    bubble.style.top = (pos.y * layerH - size / 2) + 'px';
    bubble.style.background = `radial-gradient(circle at 35% 35%, ${cfg.glow}, ${cfg.color})`;
    bubble.style.boxShadow = `0 0 30px ${cfg.glow}, inset 0 0 30px rgba(255,255,255,0.08)`;
    bubble.setAttribute('data-shop-id', shop.id);

    const inner = document.createElement('div');
    inner.className = 'bubble-inner';
    inner.style.background = 'transparent';
    inner.style.border = 'none';
    inner.style.boxShadow = 'none';

    bubble.appendChild(inner);
    bubble.addEventListener('click', () => onBubbleClick(bubble, shop));
    layer.appendChild(bubble);
  });

  // 启动气泡随机游动
  startBubbleDrift();
}

// ---------- 气泡点击：爆裂 ----------
function onBubbleClick(bubbleEl, shop) {
  // 禁用所有气泡点击
  document.querySelectorAll('.bubble').forEach(b => b.style.pointerEvents = 'none');

  // 爆裂粒子
  const rect = bubbleEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const PARTICLE_COUNT = 16;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = cx + 'px';
    particle.style.top = cy + 'px';
    const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
    const dist = 40 + Math.random() * 60;
    particle.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    particle.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }

  // 气泡爆裂
  bubbleEl.classList.add('bubble-bursting');

  // 其余气泡淡出
  setTimeout(() => {
    document.querySelectorAll('.bubble').forEach(b => {
      if (b !== bubbleEl) b.classList.add('bubble-fading');
    });
  }, 200);

  // 显示结果
  setTimeout(() => {
    console.log('Burst shop:', shop.name);
    const recommended = recommend(allShops, {
      category: shop.category,
      budget: 0,
      distance: 0,
      taboos: loadPreferences().taboos
    });
    showResult(recommended || shop);
  }, 600);
}

// ---------- 显示结果卡片 ----------
function showResult(shop) {
  currentShop = shop;

  document.getElementById('resultName').textContent = shop.name;
  document.getElementById('resultCategory').textContent = shop.category;
  document.getElementById('resultPrice').textContent = '¥' + shop.avg_price;
  document.getElementById('resultRating').textContent = shop.rating;
  document.getElementById('resultDistance').textContent = shop.distance + 'km';

  const tagsEl = document.getElementById('resultTags');
  tagsEl.innerHTML = '';
  (shop.tags || []).forEach(tag => {
    const t = document.createElement('span');
    t.className = 'px-3 py-1 rounded-full text-xs bg-surface-container-low text-on-surface-variant font-medium';
    t.textContent = tag;
    tagsEl.appendChild(t);
  });

  document.getElementById('overlay').classList.add('show');
  document.getElementById('resultCard').classList.add('show');
}

// ---------- 关闭结果（恢复气泡） ----------
function closeResult() {
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('resultCard').classList.remove('show');
  // 恢复气泡
  restoreBubbles();
}

function restoreBubbles() {
  document.querySelectorAll('.bubble').forEach(b => {
    b.classList.remove('bubble-bursting', 'bubble-fading');
    b.style.pointerEvents = 'auto';
    b.style.opacity = '1';
  });
  // 重新启动飘动引擎
  startBubbleDrift();
}

// ---------- 换一个（气泡自动选择流程） ----------
function reroll() {
  if (currentShop) {
    window._usedShopIds.add(currentShop.id);
  }
  // 关闭弹窗
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('resultCard').classList.remove('show');

  // 恢复气泡并重新飘动
  restoreBubbles();

  // 延迟后自动选一个气泡爆裂
  setTimeout(() => {
    const bubbles = document.querySelectorAll('.bubble:not(.bubble-bursting):not(.bubble-fading)');
    if (bubbles.length === 0) {
      showToast('没有可用的气泡了，换个条件试试~');
      return;
    }
    // 随机选一个气泡
    const target = bubbles[Math.floor(Math.random() * bubbles.length)];
    const shopId = parseInt(target.getAttribute('data-shop-id'));
    const shop = allShops.find(s => s.id === shopId);

    if (shop) {
      // 触发自动爆裂
      autoBurstBubble(target, shop);
    }
  }, 800);
}

// 自动爆裂气泡（静默选择，不放粒子）
function autoBurstBubble(bubbleEl, shop) {
  document.querySelectorAll('.bubble').forEach(b => b.style.pointerEvents = 'none');

  bubbleEl.classList.add('bubble-bursting');

  setTimeout(() => {
    document.querySelectorAll('.bubble').forEach(b => {
      if (b !== bubbleEl) b.classList.add('bubble-fading');
    });
  }, 200);

  setTimeout(() => {
    const params = getUrlParams();
    const recommended = recommend(allShops, {
      category: params.category,
      budget: params.budget,
      distance: params.distance,
      taboos: loadPreferences().taboos
    });
    if (recommended) {
      showResult(recommended);
    } else {
      showToast('附近的商家都看过了，换个条件试试吧~');
    }
  }, 600);
}

// ---------- 就选这个 ----------
function confirmPick() {
  if (currentShop && currentShop.meituan_url) {
    window.open(currentShop.meituan_url, '_blank');
  } else {
    showToast('暂无跳转链接');
  }
}

// ---------- 初始化 ----------
document.addEventListener('DOMContentLoaded', function() {
  initStars();

  fetchShops().then(shops => {
    allShops = shops;
    createBubbles();
  });

  document.getElementById('btnReroll').addEventListener('click', reroll);
  document.getElementById('btnConfirm').addEventListener('click', confirmPick);
});

// ---------- 气泡随机飘动引擎 ----------
let driftBubbles = [];

function startBubbleDrift() {
  driftBubbles = [];
  document.querySelectorAll('.bubble').forEach(el => {
    const layer = document.getElementById('bubbleLayer');
    const lW = layer.clientWidth;
    const lH = layer.clientHeight;
    const size = parseFloat(el.style.width);
    const startX = parseFloat(el.style.left);
    const startY = parseFloat(el.style.top);

    driftBubbles.push({
      el,
      size,
      lW,
      lH,
      x: startX + size / 2,
      y: startY + size / 2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.5,
      amplitude: 0.4 + Math.random() * 0.6
    });
  });
  requestAnimationFrame(driftLoop);
}

let driftRunning = false;
function driftLoop() {
  if (driftBubbles.length === 0) { driftRunning = false; return; }
  driftRunning = true;

  const t = performance.now() * 0.001;
  driftBubbles.forEach(b => {
    const r = b.size / 2;
    const margin = r + 10;

    // 布朗运动 + 正弦漂移
    b.vx += (Math.random() - 0.5) * 0.08;
    b.vy += (Math.random() - 0.5) * 0.08;

    // 正弦扰动
    b.vx += Math.sin(t * b.speed + b.phase) * b.amplitude * 0.015;
    b.vy += Math.cos(t * b.speed * 1.3 + b.phase) * b.amplitude * 0.015;

    // 阻尼
    b.vx *= 0.995;
    b.vy *= 0.995;

    // 限速
    const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    if (spd > 1.5) {
      b.vx = (b.vx / spd) * 1.5;
      b.vy = (b.vy / spd) * 1.5;
    }

    b.x += b.vx;
    b.y += b.vy;

    // 边界反弹
    if (b.x - r < margin) { b.x = margin + r; b.vx *= -0.6; }
    if (b.x + r > b.lW - margin) { b.x = b.lW - margin - r; b.vx *= -0.6; }
    if (b.y - r < margin) { b.y = margin + r; b.vy *= -0.6; }
    if (b.y + r > b.lH - margin) { b.y = b.lH - margin - r; b.vy *= -0.6; }

    b.el.style.left = (b.x - r) + 'px';
    b.el.style.top = (b.y - r) + 'px';
  });

  requestAnimationFrame(driftLoop);
}

// 窗口大小变化时更新边界
window.addEventListener('resize', () => {
  const layer = document.getElementById('bubbleLayer');
  if (!layer) return;
  const lW = layer.clientWidth;
  const lH = layer.clientHeight;
  driftBubbles.forEach(b => {
    b.lW = lW;
    b.lH = lH;
    b.x = Math.min(Math.max(b.x, b.size / 2 + 10), lW - b.size / 2 - 10);
    b.y = Math.min(Math.max(b.y, b.size / 2 + 10), lH - b.size / 2 - 10);
  });
});
