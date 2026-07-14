/* ===== 替你选 — Mock 商家数据 ===== */
const MOCK_SHOPS = [
  { id: 1, name: '老陕一碗面', category: '面食', emoji: '🍜', avg_price: 16, rating: 4.5, monthly_sales: 3200, distance: 0.8, tags: ['面食', '西北风味', '手工拉面'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E8%80%81%E9%99%95%E4%B8%80%E7%A2%97%E9%9D%A2' },
  { id: 2, name: '汉堡王', category: '汉堡', emoji: '🍔', avg_price: 28, rating: 4.3, monthly_sales: 5600, distance: 1.2, tags: ['汉堡', '快餐', '薯条'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%B1%89%E5%A0%A1%E7%8E%8B' },
  { id: 3, name: '炭火烧烤·深夜食堂', category: '烧烤', emoji: '🍖', avg_price: 42, rating: 4.7, monthly_sales: 1800, distance: 2.1, tags: ['烧烤', '夜宵', '炭火', '辣'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E7%82%AD%E7%81%AB%E7%83%A7%E7%83%A4' },
  { id: 4, name: '蜀味轩川菜馆', category: '川菜', emoji: '🥘', avg_price: 35, rating: 4.4, monthly_sales: 2400, distance: 2.8, tags: ['川菜', '麻辣', '水煮', '辣'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E8%9C%80%E5%91%B3%E8%BD%A9%E5%B7%9D%E8%8F%9C' },
  { id: 5, name: '粤点轩', category: '粤菜', emoji: '🥟', avg_price: 30, rating: 4.6, monthly_sales: 2100, distance: 1.5, tags: ['粤菜', '点心', '蒸品', '海鲜'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E7%B2%A4%E7%82%B9%E8%BD%A9' },
  { id: 6, name: '樱花寿司屋', category: '日料', emoji: '🍣', avg_price: 38, rating: 4.5, monthly_sales: 1900, distance: 3.0, tags: ['日料', '寿司', '刺身', '海鲜'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%A8%B1%E8%8A%B1%E5%AF%BF%E5%8F%B8' },
  { id: 7, name: '首尔炸鸡', category: '韩餐', emoji: '🥩', avg_price: 22, rating: 4.2, monthly_sales: 4800, distance: 0.6, tags: ['韩餐', '炸鸡', '年糕', '辣'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E9%A6%96%E5%B0%94%E7%82%B8%E9%B8%A1' },
  { id: 8, name: '半糖甜品屋', category: '甜品', emoji: '🍰', avg_price: 25, rating: 4.8, monthly_sales: 1500, distance: 1.8, tags: ['甜品', '蛋糕', '奶茶', '糖'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E5%8D%8A%E7%B3%96%E7%94%9C%E5%93%81' },
  { id: 9, name: '一碗好饭', category: '快餐', emoji: '🍱', avg_price: 15, rating: 4.1, monthly_sales: 6800, distance: 0.4, tags: ['快餐', '米饭', '盖浇饭'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E4%B8%80%E7%A2%97%E5%A5%BD%E9%A5%AD' },
  { id: 10, name: '茶百道', category: '饮品', emoji: '🧋', avg_price: 13, rating: 4.4, monthly_sales: 9200, distance: 0.3, tags: ['饮品', '奶茶', '果茶', '糖'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E8%8C%B6%E7%99%BE%E9%81%93' },
  { id: 11, name: '武汉热干面大王', category: '面食', emoji: '🍝', avg_price: 10, rating: 4.6, monthly_sales: 5100, distance: 0.5, tags: ['面食', '热干面', '武汉', '辣'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E7%83%AD%E5%B9%B2%E9%9D%A2' },
  { id: 12, name: '乡村基', category: '快餐', emoji: '🍛', avg_price: 18, rating: 4.0, monthly_sales: 7500, distance: 0.7, tags: ['快餐', '中式快餐', '米饭'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E4%B9%A1%E6%9D%91%E5%9F%BA' },
  { id: 13, name: '木屋烧烤', category: '烧烤', emoji: '🔥', avg_price: 38, rating: 4.5, monthly_sales: 2200, distance: 1.9, tags: ['烧烤', '烤串', '夜宵', '辣'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%9C%A8%E5%B1%8B%E7%83%A7%E7%83%A4' },
  { id: 14, name: '龙抄手', category: '面食', emoji: '🥟', avg_price: 14, rating: 4.3, monthly_sales: 2900, distance: 1.1, tags: ['面食', '抄手', '成都', '辣'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E9%BE%99%E6%8A%84%E6%89%8B' },
  { id: 15, name: '味千拉面', category: '日料', emoji: '🍜', avg_price: 32, rating: 4.2, monthly_sales: 1700, distance: 2.4, tags: ['日料', '拉面', '豚骨'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E5%91%B3%E5%8D%83%E6%8B%89%E9%9D%A2' },
  { id: 16, name: '胖哥俩肉蟹煲', category: '川菜', emoji: '🦀', avg_price: 48, rating: 4.6, monthly_sales: 1400, distance: 3.2, tags: ['川菜', '肉蟹', '煲类', '辣', '海鲜'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E8%82%89%E8%9F%B9%E7%85%B2' },
  { id: 17, name: '满记甜品', category: '甜品', emoji: '🍧', avg_price: 28, rating: 4.7, monthly_sales: 1300, distance: 2.6, tags: ['甜品', '港式甜品', '芒果', '糖'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%BB%A1%E8%AE%B0%E7%94%9C%E5%93%81' },
  { id: 18, name: '星巴克', category: '饮品', emoji: '☕', avg_price: 32, rating: 4.3, monthly_sales: 4100, distance: 0.8, tags: ['饮品', '咖啡', '星巴克'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E6%98%9F%E5%B7%B4%E5%85%8B' },
  { id: 19, name: '煌上煌酱鸭', category: '快餐', emoji: '🍗', avg_price: 20, rating: 4.1, monthly_sales: 3500, distance: 1.3, tags: ['快餐', '卤味', '酱鸭', '辣'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E7%85%8C%E4%B8%8A%E7%85%8C' },
  { id: 20, name: '避风塘', category: '粤菜', emoji: '🦐', avg_price: 36, rating: 4.4, monthly_sales: 1600, distance: 2.3, tags: ['粤菜', '港式', '海鲜'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E9%81%BF%E9%A3%8E%E5%A1%98' },
  { id: 21, name: '石锅拌饭', category: '韩餐', emoji: '🍚', avg_price: 20, rating: 4.0, monthly_sales: 2600, distance: 1.6, tags: ['韩餐', '拌饭', '石锅', '辣'], meituan_url: 'https://h5.waimai.meituan.com/waimai/mindex/search?keyword=%E7%9F%B3%E9%94%85%E6%8B%8C%E9%A5%AD' }
];

function fetchShops() {
  const prefs = loadPreferences();
  const params = getUrlParams();
  
  // 先尝试从 API 获取 (如果部署在 Vercel)
  const apiUrl = `/api/meituan?lat=${prefs.lat}&lng=${prefs.lng}&keyword=${params.category || ''}`;
  
  return fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      if (data.shops && data.shops.length > 0) return data.shops;
      return MOCK_SHOPS;
    })
    .catch(() => {
      console.log('API 不可用，使用 Mock 数据');
      return MOCK_SHOPS;
    });
}
