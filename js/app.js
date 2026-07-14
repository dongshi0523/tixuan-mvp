/* ===== 替你选 — 全局逻辑 ===== */

// ---------- Toast 组件 ----------
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  container.appendChild(toast);
  
  toast.addEventListener('animationend', function(e) {
    if (e.animationName === 'toastOut') {
      toast.remove();
    }
  });
}

// ---------- localStorage 工具 ----------
const STORAGE_KEY = 'tixuan_preferences';

function getDefaultPrefs() {
  return {
    lat: 30.5928,
    lng: 114.3055,
    taboos: ['香菜', '辣', '海鲜'],
    meal_preference: {
      portion: 50,
      delivery_speed: 50,
      price_sensitivity: 50
    },
    diet_habits: {
      vegetarian: false,
      low_carb: false,
      sugar_control: false
    }
  };
}

function loadPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return getDefaultPrefs();
}

function savePreferences(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    return true;
  } catch (e) {
    showToast('保存失败，存储空间不足');
    return false;
  }
}

// ---------- 定位 ----------
function initGeolocation() {
  if (!navigator.geolocation) {
    showToast('浏览器不支持定位，使用默认位置');
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    function(pos) {
      const prefs = loadPreferences();
      prefs.lat = pos.coords.latitude;
      prefs.lng = pos.coords.longitude;
      savePreferences(prefs);
    },
    function() {
      showToast('定位失败，使用默认位置');
    }
  );
}

// ---------- URL 参数解析 ----------
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get('category') || '',
    budget: params.get('budget') || '',
    distance: params.get('distance') || ''
  };
}
