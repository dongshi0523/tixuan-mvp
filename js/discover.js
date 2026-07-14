/* ===== 替你选 — PGC 发现页数据 (30条) ===== */
const PGC_CONTENT = [
  // ---- 种草 (15条) ----
  {
    type: 'seedling',
    title: '这家火锅店的毛肚绝了！七上八下刚刚好',
    content: '姐妹们冲啊！藏在巷子里的老火锅，毛肚新鲜到发光，下锅七上八下入口脆嫩化渣。锅底是现炒的牛油，香到隔壁桌都来问店名！',
    image: 'https://picsum.photos/seed/hotpot1/600/800',
    author: '火锅达人',
    tags: ['火锅', '毛肚', '隐藏好店']
  },
  {
    type: 'seedling',
    title: '人均30吃到撑！这家川菜馆太良心了',
    content: '水煮肉片肉量惊人，麻婆豆腐下饭神器。关键是人多也不涨价，老板是个实在人。本地人都在排队等，外地游客不一定找得到。',
    image: 'https://picsum.photos/seed/sichuan2/600/800',
    author: '吃货小分队',
    tags: ['川菜', '性价比', '本地推荐']
  },
  {
    type: 'seedling',
    title: '深夜食堂灵魂烤串，凌晨2点还排队',
    content: '烤羊肉串一绝！肥瘦相间滋滋冒油，撒上孜然那一刻我的DNA动了。老板说每天凌晨去菜场选肉，难怪这么鲜。配上冰啤酒，人间值得。',
    image: 'https://picsum.photos/seed/bbq3/600/800',
    author: '深夜饿魔',
    tags: ['烧烤', '夜宵', '排队王']
  },
  {
    type: 'seedling',
    title: '这碗拉面我喝了三碗汤！',
    content: '豚骨汤底熬了12个小时，浓到筷子能立住。叉烧肉厚切三片，溏心蛋流心完美。一口下去整个人被治愈了，打工人的快乐就这么简单。',
    image: 'https://picsum.photos/seed/ramen4/600/800',
    author: '面食爱好者',
    tags: ['日料', '拉面', '治愈系']
  },
  {
    type: 'seedling',
    title: '甜品脑袋集合！这家千层绝了',
    content: '榴莲千层料多到爆，每一层都有真实榴莲果肉。抹茶千层用的日本宇治抹茶，微苦回甘。我闺蜜说吃完想嫁老板哈哈哈。',
    image: 'https://picsum.photos/seed/dessert5/600/800',
    author: '甜品雷达',
    tags: ['甜品', '千层', '榴莲']
  },
  {
    type: 'seedling',
    title: '炸鸡配年糕，韩剧女主同款快乐',
    content: '原味炸鸡外酥里嫩，酱料炸鸡裹满甜辣酱。年糕软糯Q弹，鱼饼汤暖胃。坐在店里放K-pop，感觉自己就是韩剧女主！',
    image: 'https://picsum.photos/seed/korean6/600/800',
    author: '韩料中毒者',
    tags: ['韩餐', '炸鸡', '年糕']
  },
  {
    type: 'seedling',
    title: '武汉过早之王，热干面封神',
    content: '芝麻酱浓郁挂面，萝卜丁脆爽提味。配上蛋酒和面窝，武汉人的早晨是金色的。这家开了20年，街坊邻居从小吃到大。',
    image: 'https://picsum.photos/seed/hotdry7/600/800',
    author: '江城食客',
    tags: ['面食', '热干面', '武汉']
  },
  {
    type: 'seedling',
    title: '这家粤式点心，虾饺里有三只虾',
    content: '虾饺皮薄到透光，里面满满当当三只大虾仁。凤爪蒸得软烂脱骨，入口即化。环境也是老广茶楼风格，阿婆推车叫卖，氛围感拉满。',
    image: 'https://picsum.photos/seed/dimsum8/600/800',
    author: '饮茶先啦',
    tags: ['粤菜', '点心', '虾饺']
  },
  {
    type: 'seedling',
    title: '喝完这杯，我和奶茶和解了',
    content: '鸭屎香柠檬茶yyds！茶底是凤凰单丛，香水柠檬手打爆汁。三分糖刚好，清爽不腻。从此告别植脂末，健康奶茶新世界大门！',
    image: 'https://picsum.photos/seed/tea9/600/800',
    author: '奶茶研究员',
    tags: ['饮品', '柠檬茶', '健康']
  },
  {
    type: 'seedling',
    title: '一个人也要好好吃饭！这家中式快餐爱了',
    content: '一荤两素一汤才18块，荤菜每天不重样。红烧肉炖得软烂，糖醋里脊酸甜适中。打工人的食堂，干净又实惠，比外卖强100倍。',
    image: 'https://picsum.photos/seed/fastfood10/600/800',
    author: '打工人干饭',
    tags: ['快餐', '中式快餐', '性价比']
  },
  {
    type: 'seedling',
    title: '肉蟹煲天花板，蟹黄多到溢出来',
    content: '揭开锅盖那一刻我惊呆了，满满一层蟹黄！鸡爪炖得软糯，吸满汤汁的年糕是灵魂。两个人一锅吃到扶墙出，人均不过60。',
    image: 'https://picsum.photos/seed/crab11/600/800',
    author: '吃蟹达人',
    tags: ['川菜', '肉蟹煲', '聚餐']
  },
  {
    type: 'seedling',
    title: '石锅拌饭滋滋响，韩国阿姨的手艺',
    content: '锅底锅巴焦脆，拌饭酱是阿姨自己调的。牛肉量给得很足，蔬菜新鲜。店小小的但特别温馨，韩国阿姨还会用中文问你好不好吃。',
    image: 'https://picsum.photos/seed/bibimbap12/600/800',
    author: '碳水快乐',
    tags: ['韩餐', '拌饭', '温馨小店']
  },
  {
    type: 'seedling',
    title: '这家汉堡颠覆我对快餐的认知',
    content: '手工牛肉饼厚到你怀疑人生，汁水丰富。面包胚是每日现烤，芝麻香浓郁。搭配自制酸黄瓜，一口下去层次感爆炸。',
    image: 'https://picsum.photos/seed/burger13/600/800',
    author: '汉堡猎人',
    tags: ['汉堡', '手工', '美式']
  },
  {
    type: 'seedling',
    title: '抄手皮薄馅大，一碗不够吃',
    content: '红油抄手香辣过瘾，清汤抄手鲜美无比。皮子薄得能看到里面的肉馅，一口一个停不下来。成都老板开的，味道正宗得想哭。',
    image: 'https://picsum.photos/seed/chaoshou14/600/800',
    author: '抄手爱好者',
    tags: ['面食', '抄手', '成都风味']
  },
  {
    type: 'seedling',
    title: '生椰拿铁天花板，比瑞幸好喝十倍',
    content: '老板用的是泰国新鲜椰青，配上深烘意式浓缩。不加糖都甜丝丝的，椰香和咖啡完美融合。喝完精神一整天，打工人续命水！',
    image: 'https://picsum.photos/seed/coffee15/600/800',
    author: '咖啡续命',
    tags: ['饮品', '咖啡', '生椰拿铁']
  },
  // ---- 踩雷 (15条) ----
  {
    type: 'warning',
    title: '踩雷！人均80的日料店三文鱼居然是冷冻的',
    content: '装修好看但食物拉胯。三文鱼刺身冰渣感明显，一看就是冷冻货。鳗鱼饭的鳗鱼又干又柴，酱汁还齁甜。这价格我吃啥不好？避雷！',
    image: 'https://picsum.photos/seed/bad16/600/800',
    author: '美食侦探',
    tags: ['日料', '踩雷', '不值']
  },
  {
    type: 'warning',
    title: '网红烧烤店，除了拍照一无是处',
    content: '排队两小时，上菜半小时。串小得像牙签肉，撒料抠抠搜搜。网红氛围灯倒是挺好拍，但我是来吃饭的不是来拍照的啊喂！',
    image: 'https://picsum.photos/seed/bad17/600/800',
    author: '实话实说',
    tags: ['烧烤', '网红店', '避雷']
  },
  {
    type: 'warning',
    title: '芝士就是力量？这家韩料芝士是塑料',
    content: '芝士年糕火锅端上来芝士就薄薄一层，拉丝都拉不起来。年糕还是硬的，泡菜酸到呛嗓子。隔壁桌小姐姐边吃边皱眉，我直接跑路。',
    image: 'https://picsum.photos/seed/bad18/600/800',
    author: '芝士控翻车',
    tags: ['韩餐', '芝士', '失望']
  },
  {
    type: 'warning',
    title: '号称重庆老火锅，锅底居然不辣',
    content: '点的中辣，上来清汤寡水毫无灵魂。毛肚老得嚼不动，鸭肠有腥味。最离谱的是香油碟要另外加钱，三块钱一小碟，抠到家了。',
    image: 'https://picsum.photos/seed/bad19/600/800',
    author: '火锅警察',
    tags: ['火锅', '不正宗', '踩雷']
  },
  {
    type: 'warning',
    title: '38块的奶茶不如喝白开水',
    content: '冲着颜值去的，结果味道一言难尽。奶盖是植物奶油打的，腻到反胃。珍珠硬得像橡胶，嚼得腮帮子疼。这家店只适合拍照发朋友圈。',
    image: 'https://picsum.photos/seed/bad20/600/800',
    author: '奶茶避雷针',
    tags: ['饮品', '奶茶', '不值']
  },
  {
    type: 'warning',
    title: '粤菜馆的烧鹅居然微波炉加热',
    content: '亲眼看到服务员从微波炉里端出烧鹅，皮已经不脆了软趴趴的。白切鸡血淋淋的没熟透，跟服务员说还理直气壮说"就是这样吃的"。',
    image: 'https://picsum.photos/seed/bad21/600/800',
    author: '老广震怒',
    tags: ['粤菜', '偷工减料', '避雷']
  },
  {
    type: 'warning',
    title: '自助餐烤肉区像犯罪现场',
    content: '牛肉颜色发黑，海鲜有异味。调料台上蟑螂爬过，服务员看了一眼当没看见。吃到一半我就胃不舒服，回来拉了三天。千万别去！',
    image: 'https://picsum.photos/seed/bad22/600/800',
    author: '食品安全卫士',
    tags: ['自助餐', '卫生差', '严重踩雷']
  },
  {
    type: 'warning',
    title: '好评如潮的面馆原来是刷的',
    content: '评分4.8结果大失所望。面条坨成一团，牛肉薄得能透光。汤底明显是料包冲的，一股味精味。翻了下差评全被删了，懂的都懂。',
    image: 'https://picsum.photos/seed/bad23/600/800',
    author: '反刷评联盟',
    tags: ['面食', '刷分', '踩雷']
  },
  {
    type: 'warning',
    title: '网红甜品店一块蛋糕68，吃完流泪',
    content: '流泪不是因为好吃，是心疼钱。蛋糕只有巴掌大，奶油是植物奶油甜到发苦。摆盘倒是精致，但份量少到离谱。网红店能不能先做好产品再营销？',
    image: 'https://picsum.photos/seed/bad24/600/800',
    author: '理性消费',
    tags: ['甜品', '网红店', '不值']
  },
  {
    type: 'warning',
    title: '外卖等了2小时的炸鸡，送来已经凉透',
    content: '承诺30分钟送达，结果等了快两小时。炸鸡已经不是炸鸡了，是冷掉的油面团。年糕硬得能当砖头。打电话给客服只会说"给您添麻烦了"。',
    image: 'https://picsum.photos/seed/bad25/600/800',
    author: '外卖受害者',
    tags: ['韩餐', '外卖', '服务差']
  },
  {
    type: 'warning',
    title: '人均200的牛排馆，肉是合成的',
    content: '切开牛排那一刻我就觉得不对，纹理太均匀了。一尝果然是合成肉，口感像在嚼橡皮。服务员还嘴硬说是原切，当我没吃过牛排？',
    image: 'https://picsum.photos/seed/bad26/600/800',
    author: '牛排鉴定师',
    tags: ['西餐', '合成肉', '大坑']
  },
  {
    type: 'warning',
    title: '号称手工水饺其实是速冻的',
    content: '水饺一煮全散了，明显是机器包的。馅料少得可怜，韭菜鸡蛋里找鸡蛋跟寻宝一样。关键是还敢卖28一碗，速冻水饺超市8块钱一大袋不香吗？',
    image: 'https://picsum.photos/seed/bad27/600/800',
    author: '饺子爱好者',
    tags: ['面食', '虚假宣传', '踩雷']
  },
  {
    type: 'warning',
    title: '精致的川菜馆做的是假川菜',
    content: '水煮鱼不麻不辣，回锅肉不放豆瓣酱放番茄酱。问了才知道厨师是广东人，建议直接改名叫"粤式改良菜"不要碰瓷川菜。',
    image: 'https://picsum.photos/seed/bad28/600/800',
    author: '四川胃',
    tags: ['川菜', '不正宗', '避雷']
  },
  {
    type: 'warning',
    title: '早餐店豆浆是粉冲的还敢卖5块',
    content: '一喝就知道是豆粉冲的，一股香精味。油条反复炸到发黑，咬下去满嘴油。最离谱的是茶叶蛋居然没入味，白煮蛋染了个色就端上来了。',
    image: 'https://picsum.photos/seed/bad29/600/800',
    author: '早餐巡逻员',
    tags: ['快餐', '早餐', '踩雷']
  },
  {
    type: 'warning',
    title: '新开的海鲜大排档，上桌的虾是死的',
    content: '虾肉松散没有弹性，螃蟹壳里空空的。生蚝又小又腥，一看就不新鲜。找老板理论，他说"海鲜嘛就这样"。花了300多吃的全是冰鲜货。',
    image: 'https://picsum.photos/seed/bad30/600/800',
    author: '海鲜老饕',
    tags: ['海鲜', '不新鲜', '严重踩雷']
  }
];
