/* ===== 替你选 — 筛选页逻辑 ===== */

document.addEventListener('DOMContentLoaded', function() {
  // 品类选项
  const categories = ['面食', '汉堡', '烧烤', '川菜', '粤菜', '日料', '韩餐', '甜品', '快餐', '饮品'];
  const budgetValues = [
    { label: '15以下', value: 15 },
    { label: '15-25', value: 25 },
    { label: '25-35', value: 35 },
    { label: '35以上', value: 99 }
  ];
  const distanceValues = [
    { label: '1km', value: 1 },
    { label: '2km', value: 2 },
    { label: '3km', value: 3 },
    { label: '5km', value: 5 }
  ];

  // 状态
  let selectedCategories = [];
  let selectedBudget = '';
  let selectedDistance = '';
  let currentResultShop = null;
  let usedShopIds = new Set();

  // ---- 渲染品类 Chip ----
  const categoryChips = document.getElementById('categoryChips');
  categories.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = 'btn-press px-4 py-2 rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant transition-colors';
    chip.textContent = cat;
    chip.addEventListener('click', function() {
      if (selectedCategories.includes(cat)) {
        selectedCategories = selectedCategories.filter(c => c !== cat);
        chip.className = 'btn-press px-4 py-2 rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant transition-colors';
      } else {
        selectedCategories.push(cat);
        chip.className = 'btn-press px-4 py-2 rounded-full text-sm font-semibold bg-primary text-white transition-colors';
      }
    });
    categoryChips.appendChild(chip);
  });

  // ---- 渲染预算选项 ----
  const budgetOptions = document.getElementById('budgetOptions');
  budgetValues.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'btn-press flex-1 px-3 py-3 rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant transition-colors';
    btn.textContent = b.label;
    btn.addEventListener('click', function() {
      selectedBudget = b.value;
      document.querySelectorAll('#budgetOptions button').forEach(el => {
        el.className = 'btn-press flex-1 px-3 py-3 rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant transition-colors';
      });
      btn.className = 'btn-press flex-1 px-3 py-3 rounded-full text-sm font-semibold bg-primary text-white transition-colors';
    });
    budgetOptions.appendChild(btn);
  });

  // ---- 渲染距离选项 ----
  const distanceOptions = document.getElementById('distanceOptions');
  distanceValues.forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'btn-press flex-1 px-3 py-3 rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant transition-colors';
    btn.textContent = d.label;
    btn.addEventListener('click', function() {
      selectedDistance = d.value;
      document.querySelectorAll('#distanceOptions button').forEach(el => {
        el.className = 'btn-press flex-1 px-3 py-3 rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant transition-colors';
      });
      btn.className = 'btn-press flex-1 px-3 py-3 rounded-full text-sm font-semibold bg-primary text-white transition-colors';
    });
    distanceOptions.appendChild(btn);
  });

  // ---- 渲染忌口标签 ----
  const tabooTags = document.getElementById('tabooTags');
  const prefs = loadPreferences();
  if (prefs.taboos && prefs.taboos.length > 0) {
    tabooTags.innerHTML = '';
    prefs.taboos.forEach(taboo => {
      const tag = document.createElement('span');
      tag.className = 'px-3 py-1.5 rounded-full text-sm bg-surface-container-lowest text-on-surface shadow-ambient font-medium';
      tag.textContent = '🚫 ' + taboo;
      tabooTags.appendChild(tag);
    });
  }

  // ============ 开始抽取 ============
  document.getElementById('btnStart').addEventListener('click', function() {
    startLottery();
  });

  // ============ 弹窗按钮 ============
  document.getElementById('btnModalReroll').addEventListener('click', function() {
    closeResultModal();
    if (currentResultShop) usedShopIds.add(currentResultShop.id);
    setTimeout(() => startLottery(), 300);
  });

  document.getElementById('btnModalConfirm').addEventListener('click', function() {
    if (currentResultShop && currentResultShop.meituan_url) {
      window.open(currentResultShop.meituan_url, '_blank');
    } else {
      showToast('暂无跳转链接');
    }
  });

  // ============ 抽奖流程 ============
  function startLottery() {
    // 显示过渡动画
    const overlay = document.getElementById('lotteryOverlay');
    overlay.classList.remove('hidden');

    // 品类 emoji 快速轮换
    const emojis = ['🍜', '🍔', '🍖', '🥘', '🥟', '🍣', '🥩', '🍰', '🍱', '🧋'];
    const emojiEl = document.getElementById('lotteryEmoji');
    const textEl = document.getElementById('lotteryText');
    let count = 0;
    const interval = setInterval(() => {
      emojiEl.textContent = emojis[count % emojis.length];
      count++;
    }, 120);

    // 文字阶段切换
    const texts = ['正在为你挑选美食...', '计算口味匹配中...', '匹配预算与距离...', '即将揭晓！'];
    let textIdx = 0;
    const textInterval = setInterval(() => {
      textIdx++;
      if (textIdx < texts.length) {
        textEl.textContent = texts[textIdx];
      }
    }, 800);

    // 2.5秒后显示结果
    setTimeout(() => {
      clearInterval(interval);
      clearInterval(textInterval);
      overlay.classList.add('hidden');

      // 调用推荐算法
      const allShops = MOCK_SHOPS.filter(s => !usedShopIds.has(s.id));
      const category = selectedCategories.length > 0
        ? selectedCategories[Math.floor(Math.random() * selectedCategories.length)]
        : '';
      const recommended = recommend(allShops, {
        category: category,
        budget: selectedBudget,
        distance: selectedDistance,
        taboos: prefs.taboos
      });

      if (recommended) {
        showResultModal(recommended);
      } else if (allShops.length > 0) {
        // 放宽条件重试
        const fallback = recommend(allShops, { category: '', budget: '0', distance: '0', taboos: prefs.taboos });
        if (fallback) {
          showResultModal(fallback);
        } else {
          showToast('附近符合条件的商家都看过了，换个条件试试~');
        }
      } else {
        showToast('所有商家都推荐过了，刷新试试~');
      }
    }, 2500);
  }

  function showResultModal(shop) {
    currentResultShop = shop;

    document.getElementById('modalName').textContent = shop.name;
    document.getElementById('modalCategory').textContent = shop.category;
    document.getElementById('modalEmoji').textContent = shop.emoji || '🍽️';
    document.getElementById('modalPrice').textContent = '¥' + shop.avg_price;
    document.getElementById('modalRating').textContent = shop.rating;
    document.getElementById('modalDistance').textContent = shop.distance + 'km';

    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = '';
    (shop.tags || []).forEach(tag => {
      const t = document.createElement('span');
      t.className = 'px-3 py-1 rounded-full text-xs bg-surface-container-low text-on-surface-variant font-medium';
      t.textContent = tag;
      tagsEl.appendChild(t);
    });

    document.getElementById('resultOverlay').classList.remove('hidden');
  }

  function closeResultModal(e) {
    if (e && e.target !== document.getElementById('resultOverlay')) return;
    document.getElementById('resultOverlay').classList.add('hidden');
  }
});

// 暴露给 HTML onclick
function closeResultModal(event) {
  if (event && event.target === document.getElementById('resultOverlay')) {
    document.getElementById('resultOverlay').classList.add('hidden');
  }
}
