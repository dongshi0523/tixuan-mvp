/* ===== 替你选 — Vercel Serverless 代理 ===== */
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { lat, lng, keyword } = req.query;

  try {
    const url = `https://h5.waimai.meituan.com/waimai/mindex/searchshop?lat=${lat || '30.5928'}&lng=${lng || '114.3055'}&keyword=${encodeURIComponent(keyword || '')}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    return res.json({ shops: parseShops(data), fallback: false });
  } catch (error) {
    console.log('美团接口不可用，返回 Mock 数据:', error.message);
    return res.json({ shops: getMockShops(), fallback: true });
  }
};

function parseShops(data) {
  try {
    const list = data?.data?.shopList || data?.data?.poiList || [];
    return list.slice(0, 20).map(shop => ({
      id: shop.poi_id || shop.wm_poi_id || Math.random(),
      name: shop.name || shop.poi_name || '',
      category: shop.category_name || '快餐',
      emoji: getCategoryEmoji(shop.category_name || ''),
      avg_price: parseInt(shop.avg_price || shop.average_price_tip || 0) || 20,
      rating: parseFloat(shop.wm_poi_score || shop.score || 4.0),
      monthly_sales: parseInt(shop.month_sale_num || shop.month_sales || 1000),
      distance: (parseFloat(shop.distance || 1000) / 1000).toFixed(1),
      tags: (shop.tag || shop.tags || []).slice(0, 3),
      meituan_url: `https://h5.waimai.meituan.com/waimai/mindex/search?keyword=${encodeURIComponent(shop.name || '')}`
    }));
  } catch (e) {
    return getMockShops();
  }
}

function getCategoryEmoji(cat) {
  const map = { '面食': '🍜', '汉堡': '🍔', '烧烤': '🍖', '川菜': '🥘', '粤菜': '🥟', '日料': '🍣', '韩餐': '🥩', '甜品': '🍰', '快餐': '🍱', '饮品': '🧋' };
  return map[cat] || '🍽️';
}

function getMockShops() {
  return [
    { id: 1, name: '老陕一碗面', category: '面食', emoji: '🍜', avg_price: 16, rating: 4.5, monthly_sales: 3200, distance: 0.8, tags: ['面食', '西北风味'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E9%9D%A2%E9%A3%9F' },
    { id: 2, name: '汉堡王', category: '汉堡', emoji: '🍔', avg_price: 28, rating: 4.3, monthly_sales: 5600, distance: 1.2, tags: ['汉堡', '快餐'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%B1%89%E5%A0%A1' },
    { id: 3, name: '炭火烧烤', category: '烧烤', emoji: '🍖', avg_price: 42, rating: 4.7, monthly_sales: 1800, distance: 2.1, tags: ['烧烤', '夜宵'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E7%83%A7%E7%83%A4' },
    { id: 4, name: '蜀味轩川菜馆', category: '川菜', emoji: '🥘', avg_price: 35, rating: 4.4, monthly_sales: 2400, distance: 2.8, tags: ['川菜', '麻辣'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E5%B7%9D%E8%8F%9C' },
    { id: 5, name: '粤点轩', category: '粤菜', emoji: '🥟', avg_price: 30, rating: 4.6, monthly_sales: 2100, distance: 1.5, tags: ['粤菜', '点心'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E7%B2%A4%E8%8F%9C' },
    { id: 6, name: '樱花寿司屋', category: '日料', emoji: '🍣', avg_price: 38, rating: 4.5, monthly_sales: 1900, distance: 3.0, tags: ['日料', '寿司'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%97%A5%E6%96%99' },
    { id: 7, name: '首尔炸鸡', category: '韩餐', emoji: '🥩', avg_price: 22, rating: 4.2, monthly_sales: 4800, distance: 0.6, tags: ['韩餐', '炸鸡'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E9%9F%A9%E9%A4%90' },
    { id: 8, name: '半糖甜品屋', category: '甜品', emoji: '🍰', avg_price: 25, rating: 4.8, monthly_sales: 1500, distance: 1.8, tags: ['甜品', '蛋糕'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E7%94%9C%E5%93%81' },
    { id: 9, name: '一碗好饭', category: '快餐', emoji: '🍱', avg_price: 15, rating: 4.1, monthly_sales: 6800, distance: 0.4, tags: ['快餐', '米饭'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E5%BF%AB%E9%A4%90' },
    { id: 10, name: '茶百道', category: '饮品', emoji: '🧋', avg_price: 13, rating: 4.4, monthly_sales: 9200, distance: 0.3, tags: ['饮品', '奶茶'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E9%A5%AE%E5%93%81' },
    { id: 11, name: '武汉热干面大王', category: '面食', emoji: '🍝', avg_price: 10, rating: 4.6, monthly_sales: 5100, distance: 0.5, tags: ['面食', '热干面'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E7%83%AD%E5%B9%B2%E9%9D%A2' },
    { id: 12, name: '乡村基', category: '快餐', emoji: '🍛', avg_price: 18, rating: 4.0, monthly_sales: 7500, distance: 0.7, tags: ['快餐', '中式'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E4%B9%A1%E6%9D%91%E5%9F%BA' },
    { id: 13, name: '木屋烧烤', category: '烧烤', emoji: '🔥', avg_price: 38, rating: 4.5, monthly_sales: 2200, distance: 1.9, tags: ['烧烤', '烤串'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%9C%A8%E5%B1%8B%E7%83%A7%E7%83%A4' },
    { id: 14, name: '龙抄手', category: '面食', emoji: '🥟', avg_price: 14, rating: 4.3, monthly_sales: 2900, distance: 1.1, tags: ['面食', '抄手'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%8A%84%E6%89%8B' },
    { id: 15, name: '味千拉面', category: '日料', emoji: '🍜', avg_price: 32, rating: 4.2, monthly_sales: 1700, distance: 2.4, tags: ['日料', '拉面'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%8B%89%E9%9D%A2' },
  ];
}
