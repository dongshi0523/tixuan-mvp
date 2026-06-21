# 替你选 - 今天吃什么？

帮你解决"今天吃什么"的选择困难症！设置忌口偏好，转盘抽奖随机推荐附近外卖店铺。

## 功能

- 🎰 8 品类大转盘抽奖（面食、汉堡、烧烤、川菜、粤菜、日料、韩餐、甜品）
- ⚙️ 6 种忌口设置（不吃辣、不吃香菜、不吃海鲜、不吃内脏、不吃牛肉、不吃甜）
- 📋 80 条真实感外卖店铺数据
- 🔄 同品类"换一个"重新推荐
- 📱 移动端优先响应式设计
- 💾 localStorage 记住忌口偏好

## 使用方式

直接用浏览器打开 `index.html` 即可使用，无需服务器。

```
open index.html
```

## 项目结构

```
tinxuan/
├── index.html       主页面
├── css/
│   └── style.css    样式
├── js/
│   ├── app.js       主逻辑（筛选、转盘控制）
│   ├── wheel.js     大转盘动画引擎
│   └── data.js      80条餐厅数据
├── assets/
│   └── favicon.png  图标
└── README.md
```

## 技术栈

- HTML5 + CSS3 + Vanilla JavaScript
- Canvas 绘制转盘
- CSS Transform 旋转动画
- 纯前端，零依赖
