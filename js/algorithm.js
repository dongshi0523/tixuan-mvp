/* ===== 替你选 — 推荐算法（四阶段） ===== */

// 第一阶段：硬性过滤
function hardFilter(shops, taboos, filters) {
  return shops.filter(shop => {
    for (const taboo of taboos) {
      if (shop.tags.some(t => t.includes(taboo))) return false;
    }
    if (filters.budget && shop.avg_price > filters.budget) return false;
    if (filters.distance && shop.distance > filters.distance) return false;
    if (filters.category && shop.category !== filters.category) return false;
    return true;
  });
}

// 第二阶段：条件放宽
function fallbackFilter(shops, taboos) {
  if (shops.length >= 3) return shops;
  // 逐步放宽：不限预算
  const noBudget = shops.filter(shop => {
    for (const taboo of taboos) {
      if (shop.tags.some(t => t.includes(taboo))) return false;
    }
    return true;
  });
  // 再放宽：不限距离
  const all = shops.filter(shop => {
    for (const taboo of taboos) {
      if (shop.tags.some(t => t.includes(taboo))) return false;
    }
    return true;
  });
  return all.length >= 1 ? all : shops;
}

// 第三阶段：时段热门权重
function calcWeight(shop) {
  let score = 50;
  const hour = new Date().getHours();

  if (hour >= 7 && hour <= 9 && ['面食','快餐'].includes(shop.category)) score += 20;
  if (hour >= 11 && hour <= 13 && ['快餐','面食','米饭'].includes(shop.category)) score += 20;
  if (hour >= 17 && hour <= 19 && ['烧烤','火锅','炒菜'].includes(shop.category)) score += 20;
  if (hour >= 22 || hour <= 1) {
    if (['烧烤','炸鸡','夜宵'].includes(shop.category)) score += 20;
  }
  
  score += (shop.rating - 4.0) * 10;
  score += Math.min(shop.monthly_sales / 500, 10);
  return score;
}

// 第四阶段：加权随机
function weightedRandom(shops) {
  const weights = shops.map(calcWeight);
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < shops.length; i++) {
    r -= weights[i];
    if (r <= 0) return shops[i];
  }
  return shops[shops.length - 1];
}

// 主函数：根据筛选条件返回推荐
function recommend(shops, options = {}) {
  const prefs = loadPreferences();
  const taboos = options.taboos || prefs.taboos || [];
  const filters = {
    category: options.category || '',
    budget: options.budget ? parseInt(options.budget) : 0,
    distance: options.distance ? parseInt(options.distance) : 0
  };

  // 排除已用商家
  const available = shops.filter(s => !(window._usedShopIds || new Set()).has(s.id));

  // 第一阶段
  let candidates = hardFilter(available, taboos, filters);
  
  // 第二阶段
  candidates = fallbackFilter(candidates, taboos);

  if (candidates.length === 0) {
    // 全部放宽
    candidates = hardFilter(available, taboos, { category: '', budget: 0, distance: 0 });
    candidates = fallbackFilter(candidates, taboos);
  }
  if (candidates.length === 0) return null;

  // 第四阶段
  return weightedRandom(candidates);
}
