/**
 * 大转盘动画引擎
 * 使用 Canvas 绘制扇区，CSS transform 控制旋转动画
 * 神秘风格：扇区只显示 emoji 图标，不暴露品类名称
 */

const Wheel = (() => {
  // 8 种扇区颜色
  const COLORS = [
    '#FF6B35', '#FFC107', '#E53935', '#4CAF50',
    '#2196F3', '#9C27B0', '#FF9800', '#00BCD4'
  ];

  // 品类 → 神秘 emoji 映射（不显示品类文字，只用图标制造悬念）
  const MYSTERY_ICONS = ['🍜', '🍔', '🍖', '🥘', '🥟', '🍣', '🥩', '🍰'];

  let canvas = null;
  let ctx = null;
  let categories = [];        // 当前品类列表 [{name, count, available}]
  let currentRotation = 0;   // 当前旋转角度 (deg)
  let spinning = false;

  /**
   * 初始化转盘
   * @param {Array} categoryList - [{name: '面食', count: 10, available: true}, ...]
   */
  function init(categoryList) {
    canvas = document.getElementById('wheelCanvas');
    if (!canvas) {
      console.error('找不到 wheelCanvas 元素');
      return;
    }
    ctx = canvas.getContext('2d');
    categories = categoryList;
    currentRotation = 0;
    spinning = false;
    canvas.style.transform = `rotate(0deg)`;
    draw();
  }

  /**
   * 绘制转盘扇区 - 神秘风格：只显示大号 emoji 图标
   */
  function draw() {
    if (!ctx || !canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = w / 2 - 2;

    ctx.clearRect(0, 0, w, h);

    // 所有扇区等分 (固定8个品类扇区)
    const totalSlices = categories.length || 8;
    const sliceAngle = (2 * Math.PI) / totalSlices;

    for (let i = 0; i < totalSlices; i++) {
      const cat = categories[i] || { name: '---', available: false };
      const startAngle = i * sliceAngle - Math.PI / 2; // 从顶部开始
      const endAngle = startAngle + sliceAngle;

      // 绘制扇区
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();

      // 颜色：不可用用灰色，可用用对应颜色
      const color = cat.available ? COLORS[i % COLORS.length] : '#CCCCCC';
      ctx.fillStyle = color;
      ctx.fill();

      // 扇区边框 - 用半透明白线分隔
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 绘制神秘 emoji 图标（大号，居中在扇区）
      ctx.save();
      ctx.translate(cx, cy);
      const textAngle = startAngle + sliceAngle / 2;
      ctx.rotate(textAngle);

      // 可用扇区显示对应 emoji，不可用显示 ❌
      const icon = cat.available ? MYSTERY_ICONS[i % MYSTERY_ICONS.length] : '🚫';
      ctx.font = '40px -apple-system, "PingFang SC", "Apple Color Emoji", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, radius * 0.5, 0);

      ctx.restore();
    }

    // 中心装饰圆 - 更大更显眼
    const centerGrad = ctx.createRadialGradient(cx, cy, 8, cx, cy, 36);
    centerGrad.addColorStop(0, '#FFFFFF');
    centerGrad.addColorStop(1, '#FFE0D0');
    ctx.beginPath();
    ctx.arc(cx, cy, 34, 0, 2 * Math.PI);
    ctx.fillStyle = centerGrad;
    ctx.fill();
    ctx.strokeStyle = '#FF6B35';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 中心文字
    ctx.font = 'bold 16px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#FF6B35';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GO', cx, cy);
  }

  /**
   * 更新品类数据并重绘
   */
  function updateCategories(categoryList) {
    categories = categoryList;
    draw();
  }

  /**
   * 旋转转盘到目标索引
   * @param {number} targetIndex - 目标品类在 categories 中的索引
   * @returns {Promise} 动画完成后 resolve
   */
  function spin(targetIndex) {
    return new Promise((resolve) => {
      if (spinning || !canvas) {
        resolve();
        return;
      }

      spinning = true;
      canvas.classList.add('spinning');

      const totalSlices = categories.length || 8;
      const sliceAngle = 360 / totalSlices;

      // 目标扇区中心角度：从顶部（0度）顺时针计算
      const targetSliceCenter = targetIndex * sliceAngle + sliceAngle / 2;

      // 随机偏移在扇区内的位置 (-30% ~ +30% 扇区宽度)
      const jitter = (Math.random() - 0.5) * sliceAngle * 0.6;

      // 计算目标旋转角度：先多转几圈（5-8圈），再加目标偏移
      const extraSpins = (5 + Math.floor(Math.random() * 4)) * 360; // 5-8 圈
      const targetAngle = extraSpins + (360 - targetSliceCenter - jitter);

      // 当前已是旋转状态，所以加上当前角度
      const finalAngle = currentRotation + targetAngle;

      // 设置新旋转
      currentRotation = finalAngle;
      canvas.style.transform = `rotate(${finalAngle}deg)`;

      // 动画结束后恢复
      const onTransitionEnd = () => {
        canvas.removeEventListener('transitionend', onTransitionEnd);
        canvas.classList.remove('spinning');
        spinning = false;
        resolve();
      };

      canvas.addEventListener('transitionend', onTransitionEnd);

      // 兜底：5秒后强制结束
      setTimeout(() => {
        if (spinning) {
          canvas.removeEventListener('transitionend', onTransitionEnd);
          canvas.classList.remove('spinning');
          spinning = false;
          resolve();
        }
      }, 5000);
    });
  }

  /**
   * 重置转盘到初始位置
   */
  function reset() {
    currentRotation = 0;
    spinning = false;
    if (canvas) {
      canvas.style.transition = 'none';
      canvas.style.transform = 'rotate(0deg)';
      // 强制回流
      canvas.offsetHeight;
      canvas.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    }
  }

  /**
   * 检查是否正在旋转
   */
  function isSpinning() {
    return spinning;
  }

  return {
    init,
    spin,
    reset,
    updateCategories,
    draw,
    isSpinning,
    COLORS
  };
})();
