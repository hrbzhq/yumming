import { StarInfo, PresetArchetype } from "./types";

export const CELEB_STARS: StarInfo[] = [
  {
    id: "hepburn",
    name: "赫本 (Audrey Hepburn)",
    englishName: "Audrey Hepburn",
    featureTitle: "精灵小鹿眼与极致骨相比例",
    featureDesc: "拥有深邃、纯真如幼鹿般的经典面部折角，高颅顶与立体的面部轮廓，代表不凋谢的高贵优雅。",
    signatureStars: "眉眼与颅顶骨相",
    rarityScore: 99
  },
  {
    id: "gongli",
    name: "巩俐 (Gong Li)",
    englishName: "Gong Li",
    featureTitle: "尊贵大气的地母之尊与力量感骨相",
    featureDesc: "东方极致宽阔温润的端庄面部。下颌骨支撑力极强，饱满平整的中庭，气场深厚、不怒自威。",
    signatureStars: "下颌与中面部",
    rarityScore: 98
  },
  {
    id: "zhangziyi",
    name: "章子怡 (Zhang Ziyi)",
    englishName: "Zhang Ziyi",
    featureTitle: "神级电影对称脸与轻量皮相",
    featureDesc: "完美的四高三低与对称度，极薄的皮相裹着完美的头骨，经得起任何最严苛的大银幕光影考验。",
    signatureStars: "面部高低对称性",
    rarityScore: 99
  },
  {
    id: "liuyifei",
    name: "刘亦菲 (Liu Yifei)",
    englishName: "Liu Yifei",
    featureTitle: "含蓄玉净的驼峰鼻与极致温润仙气",
    featureDesc: "独特微带驼峰的仙气挺鼻，丹凤眼结合古典鹅蛋圆润下巴，流露出遗世独立、玉洁冰清的东方式出尘意境。",
    signatureStars: "古典秀鼻与鹅蛋脸",
    rarityScore: 97
  },
  {
    id: "bellucci",
    name: "贝鲁奇 (Monica Bellucci)",
    englishName: "Monica Bellucci",
    featureTitle: "极致妩媚的微垂唇形与地中海雕塑感",
    featureDesc: "拥有西方极致性感厚实的唇线，嘴角带着微微的冷艳疏离。饱满的眶骨与希腊神殿雕塑般的轮廓。",
    signatureStars: "微垂冷玫瑰双唇",
    rarityScore: 98
  },
  {
    id: "songhyekyo",
    name: "宋慧乔 (Song Hye-kyo)",
    englishName: "Song Hye-kyo",
    featureTitle: "温婉亲和的柔雾眼波与饱满幼态感",
    featureDesc: "饱满莹润的苹果肌与圆融内敛的内外眼角，给人极致温柔舒适、不锋利但极致耐看的古典治愈美感。",
    signatureStars: "柔雾卧蚕眼与饱满皮相",
    rarityScore: 95
  },
  {
    id: "satomi",
    name: "石原里美 (Ishihara Satomi)",
    englishName: "Ishihara Satomi",
    featureTitle: "元气饱满的俏皮含笑唇角",
    featureDesc: "标志性的微张饱满娇嫩嘴唇，具有极佳的元气和亲近感，笑起来卧蚕饱满，五官线条灵跃灵动。",
    signatureStars: "微翘果冻饱满双唇",
    rarityScore: 94
  },
  {
    id: "hathaway",
    name: "安妮·海瑟薇 (Anne Hathaway)",
    englishName: "Anne Hathaway",
    featureTitle: "极致璀璨的芭比明眸与雪肤骨骼",
    featureDesc: "完美的欧式巨目，笑开时明艳动人、光芒万丈；完美的下巴转折，兼具欧洲皇室高贵与现代美式的大气靓丽。",
    signatureStars: "璀璨深邃大眼",
    rarityScore: 96
  }
];

export const PRESET_ARCHETYPES: PresetArchetype[] = [
  {
    id: "classic",
    name: "古典优雅型 (Classical Elegance)",
    englishName: "Classical Elegance",
    subtitle: "赫本幽兰、巩皇端庄、贝鲁奇性感雕塑的永恒共振",
    imagePath: "/src/assets/images/star_face_classic_1779836287325.png",
    ratios: {
      hepburn: 40,
      gongli: 30,
      bellucci: 30,
      zhangziyi: 0,
      liuyifei: 0,
      songhyekyo: 0,
      satomi: 0,
      hathaway: 0
    },
    aestheticTitle: "古典神圣风采",
    aestheticIntro: "该原型以完美的对称头骨与永恒的高贵气质作为内核。眉眼深邃、神色宁静，下颌线条清晰挺括，展现出经典电影黄金时代的高端质感、深邃眼眸与沉稳雕塑般立体的神圣魅力。",
    makeup: "复古红唇与深邃小猫睫毛",
    lighting: "古典肖像柔影(Chiaroscuro)",
    background: "极简纯粹烟灰色油画幕墙",
    camera: "哈苏中画幅 85mm 镜头"
  },
  {
    id: "modern",
    name: "现代摩登型 (Modern Chic & Glamour)",
    englishName: "Modern Chic & Glamour",
    subtitle: "章子怡神级硬骨、海瑟薇璀璨大眼、里美蜜唇的先锋碰撞",
    imagePath: "/src/assets/images/star_face_modern_1779836306099.png",
    ratios: {
      hepburn: 0,
      gongli: 0,
      bellucci: 0,
      zhangziyi: 40,
      hathaway: 30,
      satomi: 30,
      liuyifei: 0,
      songhyekyo: 0
    },
    aestheticTitle: "先锋时尚封面",
    aestheticIntro: "这款原型主打绝对骨相与大气的五官量感。完美对称的电影骨相撑起极其折光的高级脸，而饱满、具有笑意元气的唇峰和深邃璀璨的眼睛，展现了极强的镜头渲染力与高级时尚杂志封面的自信神采。",
    makeup: "高定裸妆与冷咖啡烟熏眼影",
    lighting: "顶尖高调时尚影棚明亮灯光",
    background: "都会摩登极简冷灰底色",
    camera: "徕卡M11极高分辨率 50mm 黄金焦段"
  },
  {
    id: "ethereal",
    name: "清冷仙气型 (Ethereal Grace)",
    englishName: "Ethereal Grace",
    subtitle: "刘亦菲冰肌玉骨、林徽因式内敛、宋慧乔温润柔雾的灵魂写意",
    imagePath: "/src/assets/images/star_face_ethereal_1779836322518.png",
    ratios: {
      hepburn: 0,
      gongli: 0,
      bellucci: 0,
      zhangziyi: 20,
      liuyifei: 50,
      songhyekyo: 30,
      satomi: 0,
      hathaway: 0
    },
    aestheticTitle: "无瑕玉石仙风",
    aestheticIntro: "代表不食人间烟火的静谧与灵动。高挺傲骨驼峰鼻撑起挺拔侧颜，清澈悠远的内眦褶凤眼，搭配温柔内敛、饱满圆润的下庭。皮肤质地如冰雪一般清透，散发着出尘脱俗的一股国韵墨香。",
    makeup: "无感莹亮玻璃肌透明伪素颜",
    lighting: "晨曦森林薄雾自然逆柔光",
    background: "清雅淡彩写意山水古风竹影",
    camera: "蔡司超解析大光圈肖像定焦"
  }
];

export const MAKEUP_OPTIONS = [
  "无感透亮玻璃肌 (Invisible Glass Dew)",
  "复古正红哑光大唇 (Retro Velvet Matte Red)",
  "高定低饱和咖啡烟熏 (Muted Coffee Couture)",
  "日系微醺蜜桃腮红妆 (Sun-Kissed Peach Blossom)"
];

export const LIGHTING_OPTIONS = [
  "古典伦勃朗柔和半影 (Rembrandt Chiaroscuro)",
  "明暗质感舞台逆光 (Dynamic Stage Backlight)",
  "室外晨曦柔和薄雾自然光 (Morning Mist Golden Hour)",
  "高对比极简摄影白棚曝光 (High-Contrast Editorial Studio)"
];

export const BACKGROUND_OPTIONS = [
  "极致内敛抽象油画纹理 (Abstrct Textured Fine-Art Studio)",
  "东方写意水墨淡竹影 (Ethereal Oriental Ink & Bamboo)",
  "极奢都会暗夜天际线 (Urban Elite Deep Night Sky)",
  "莫奈睡莲印象派繁花 (Monet Garden Impressionist Floral)"
];

export const CAMERA_OPTIONS = [
  "Hasselblad 100MP 中画幅摄影系统 (85mm Classic Portrait)",
  "Leica M 系列高饱和典雅色调相机 (50mm Noctilux)",
  "Arri Alexa 电影级宽银幕镜头 (Anamorphic Cinematic Lens)"
];

export const AGE_MOODS = [
  "元气灵动 (Youthful Charm - Age mood 20s)",
  "优雅从容 (Timeless Sophistication - Age mood 30s)",
  "至尊旷世 (Grand Divine Presence - Ageless Masterpiece)"
];
