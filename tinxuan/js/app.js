/**
 * 替你选 - 主逻辑
 */

(function () {
  'use strict';

  const LS_KEY = 'tinxuan_preferences';
  const ALL_CATEGORIES = ['面食', '汉堡', '烧烤', '川菜', '粤菜', '日料', '韩餐', '甜品'];

  const TABOO_MAP = {
    '辣': '辣', '香菜': '香菜', '海鲜': '海鲜', '内脏': '内脏', '牛肉': '牛肉', '甜': '甜'
  };

  let shops = [];
  let filteredShops = [];
  let categoryStats = [];
  let activeTaboos = [];
  let currentCategory = null;
  let usedShopIds = new Set();

  const btnPreferences = document.getElementById('btnPreferences');
  const btnSpin = document.getElementById('btnSpin');
  const preferencesPanel = document.getElementById('preferencesPanel');
  const panelOverlay = document.getElementById('panelOverlay');
  const btnSavePreferences = document.getElementById('btnSavePreferences');
  const checkboxGroup = document.getElementById('checkboxGroup');
  const resultModal = document.getElementById('resultModal');
  const btnReroll = document.getElementById('btnReroll');
  const btnConfirm = document.getElementById('btnConfirm');
  const btnHelp = document.getElementById('btnHelp');
  const helpModal = document.getElementById('helpModal');
  const btnCloseHelp = document.getElementById('btnCloseHelp');

  function init() { loadData(); loadPreferences(); bindEvents(); }

  function loadData() {
    if (typeof SHOPS_DATA !== 'undefined' && SHOPS_DATA.shops) {
      shops = SHOPS_DATA.shops;
    } else {
      shops = [];
    }
    applyFilters();
  }

  function loadPreferences() {
    try {
      const saved = localStorage.getItem(LS_KEY);
      activeTaboos = saved ? JSON.parse(saved) : [];
    } catch (e) { activeTaboos = []; }
    const cbs = checkboxGroup.querySelectorAll('input[type="checkbox"]');
    cbs.forEach(cb => { cb.checked = activeTaboos.includes(cb.value); });
  }

  function savePreferences() {
    const cbs = checkboxGroup.querySelectorAll('input[type="checkbox"]');
    activeTaboos = [];
    cbs.forEach(cb => { if (cb.checked) activeTaboos.push(cb.value); });
    try { localStorage.setItem(LS_KEY, JSON.stringify(activeTaboos)); } catch (e) {}
  }

  function bindEvents() {
    btnPreferences.addEventListener('click', openPreferences);
    panelOverlay.addEventListener('click', closePreferences);
    btnSavePreferences.addEventListener('click', () => {
      savePreferences(); applyFilters();
      Wheel.updateCategories(categoryStats); closePreferences();
    });
    btnSpin.addEventListener('click', startLottery);
    btnReroll.addEventListener('click', reroll);
    btnConfirm.addEventListener('click', confirmChoice);
    resultModal.addEventListener('click', e => { if (e.target === resultModal) closeResult(); });

    btnHelp.addEventListener('click', () => { helpModal.classList.add('open'); });
    btnCloseHelp.addEventListener('click', () => { helpModal.classList.remove('open'); });
    helpModal.addEventListener('click', e => { if (e.target === helpModal) helpModal.classList.remove('open'); });
  }

  function openPreferences() { if (!Wheel.isSpinning()) preferencesPanel.classList.add('open'); }
  function closePreferences() { preferencesPanel.classList.remove('open'); }

  function applyFilters() {
    if (!shops.length) return;
    filteredShops = shops.filter(shop => {
      for (const taboo of activeTaboos) {
        const kw = TABOO_MAP[taboo];
        if (!kw) continue;
        if (kw === '辣') {
          if (shop.tags.includes('不辣')) continue;
          if (shop.tags.some(t => t.includes('辣'))) return false;
        } else if (kw === '甜') {
          if (shop.tags.includes('甜')) return false;
        } else {
          if (shop.tags.includes(kw)) return false;
        }
      }
      return true;
    });

    categoryStats = ALL_CATEGORIES.map(catName => {
      const catShops = filteredShops.filter(s => s.category === catName);
      return { name: catName, count: catShops.length, shops: catShops, available: catShops.length > 0 };
    });

    Wheel.init(categoryStats);
    const any = categoryStats.some(c => c.available);
    btnSpin.disabled = !any;
    btnSpin.textContent = any ? '开始抽奖' : '无可选品类';
  }

  async function startLottery() {
    if (Wheel.isSpinning()) return;
    const available = categoryStats.filter(c => c.available);
    if (!available.length) { alert('暂无可选品类，请调整忌口设置'); return; }

    usedShopIds = new Set(); currentCategory = null;
    const total = available.reduce((s, c) => s + c.count, 0);
    let r = Math.random() * total;
    let targetCat = null;
    for (const cat of available) { r -= cat.count; if (r <= 0) { targetCat = cat; break; } }
    if (!targetCat) targetCat = available[available.length - 1];
    currentCategory = targetCat;
    const idx = categoryStats.indexOf(targetCat);

    btnSpin.disabled = true; btnSpin.textContent = '抽奖中...'; btnPreferences.disabled = true;
    await Wheel.spin(idx);
    btnSpin.disabled = false; btnSpin.textContent = '开始抽奖'; btnPreferences.disabled = false;
    showResult(targetCat);
  }

  function showResult(cat) {
    if (!cat || !cat.shops.length) return;
    const available = cat.shops.filter(s => !usedShopIds.has(s.id));
    if (!available.length) { usedShopIds = new Set(); return showResult(cat); }
    const shop = available[Math.floor(Math.random() * available.length)];
    usedShopIds.add(shop.id);

    document.getElementById('resultShopName').textContent = shop.name;
    document.getElementById('resultCategory').textContent = cat.name;
    document.getElementById('resultPrice').textContent = `人均 ¥${shop.avg_price}`;
    document.getElementById('resultRating').textContent = `${shop.rating} 分`;
    document.getElementById('resultDistance').textContent = `${shop.distance}km`;

    const tc = document.getElementById('resultTags'); tc.innerHTML = '';
    shop.tags.forEach(t => { const s = document.createElement('span'); s.className = 'result-tag'; s.textContent = t; tc.appendChild(s); });
    window._currentShop = shop;
    resultModal.classList.add('open');
  }

  function closeResult() { resultModal.classList.remove('open'); }
  function reroll() { if (currentCategory) showResult(currentCategory); }
  function confirmChoice() {
    const shop = window._currentShop;
    if (shop && shop.link) { closeResult(); window.open(shop.link, '_blank'); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
