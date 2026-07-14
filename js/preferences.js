/* ===== 替你选 — 个性化偏好逻辑 ===== */

document.addEventListener('DOMContentLoaded', function() {
  const prefs = loadPreferences();

  // ---- 避雷库管理 ----
  const tabooList = document.getElementById('tabooList');
  
  function renderTaboos() {
    tabooList.innerHTML = '';
    if (prefs.taboos.length === 0) {
      tabooList.innerHTML = '<p class="text-sm text-on-surface-variant">暂无忌口，点击添加</p>';
      return;
    }
    prefs.taboos.forEach(taboo => {
      const tag = document.createElement('span');
      tag.className = 'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-surface-container-lowest text-on-surface shadow-ambient font-medium';
      tag.innerHTML = `
        🚫 ${taboo}
        <button class="btn-press ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-low transition-colors" data-taboo="${taboo}">
          <span class="material-symbols-outlined text-[14px] text-on-surface-variant">close</span>
        </button>
      `;
      tag.querySelector('button').addEventListener('click', function() {
        const t = this.getAttribute('data-taboo');
        prefs.taboos = prefs.taboos.filter(x => x !== t);
        renderTaboos();
      });
      tabooList.appendChild(tag);
    });
  }
  renderTaboos();

  // 添加弹窗
  const dialog = document.getElementById('addTabooDialog');
  const input = document.getElementById('tabooInput');
  
  document.getElementById('btnAddTaboo').addEventListener('click', function() {
    dialog.classList.remove('hidden');
    input.value = '';
    setTimeout(() => input.focus(), 100);
  });
  
  document.getElementById('btnCancelAdd').addEventListener('click', function() {
    dialog.classList.add('hidden');
  });
  
  document.getElementById('btnConfirmAdd').addEventListener('click', function() {
    const val = input.value.trim();
    if (val) {
      if (!prefs.taboos.includes(val)) {
        prefs.taboos.push(val);
        renderTaboos();
      }
      dialog.classList.add('hidden');
    }
  });

  // 点击遮罩关闭
  dialog.addEventListener('click', function(e) {
    if (e.target === dialog) dialog.classList.add('hidden');
  });

  // ---- 滑块绑定 ----
  const portionSlider = document.getElementById('portionSlider');
  const portionLabel = document.getElementById('portionLabel');
  const speedSlider = document.getElementById('speedSlider');
  const speedLabel = document.getElementById('speedLabel');
  const priceSlider = document.getElementById('priceSlider');
  const priceLabel = document.getElementById('priceLabel');

  function getLabel(val, low, high) {
    if (val <= 25) return low;
    if (val >= 75) return high;
    return '适中';
  }

  // 初始值
  portionSlider.value = prefs.meal_preference.portion;
  speedSlider.value = prefs.meal_preference.delivery_speed;
  priceSlider.value = prefs.meal_preference.price_sensitivity;

  portionLabel.textContent = getLabel(portionSlider.value, '轻食', '饱腹');
  speedLabel.textContent = getLabel(speedSlider.value, '不急', '极速');
  priceLabel.textContent = getLabel(priceSlider.value, '性价比', '高品质');

  portionSlider.addEventListener('input', function() {
    portionLabel.textContent = getLabel(this.value, '轻食', '饱腹');
  });
  speedSlider.addEventListener('input', function() {
    speedLabel.textContent = getLabel(this.value, '不急', '极速');
  });
  priceSlider.addEventListener('input', function() {
    priceLabel.textContent = getLabel(this.value, '性价比', '高品质');
  });

  // ---- 开关绑定 ----
  document.getElementById('vegetarianToggle').checked = prefs.diet_habits.vegetarian;
  document.getElementById('lowCarbToggle').checked = prefs.diet_habits.low_carb;
  document.getElementById('sugarToggle').checked = prefs.diet_habits.sugar_control;

  // ---- 保存 ----
  document.getElementById('btnSave').addEventListener('click', function() {
    prefs.meal_preference.portion = parseInt(portionSlider.value);
    prefs.meal_preference.delivery_speed = parseInt(speedSlider.value);
    prefs.meal_preference.price_sensitivity = parseInt(priceSlider.value);
    prefs.diet_habits.vegetarian = document.getElementById('vegetarianToggle').checked;
    prefs.diet_habits.low_carb = document.getElementById('lowCarbToggle').checked;
    prefs.diet_habits.sugar_control = document.getElementById('sugarToggle').checked;

    if (savePreferences(prefs)) {
      showToast('设置已保存');
      setTimeout(() => history.back(), 800);
    }
  });
});
