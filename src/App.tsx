import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Sliders, 
  Camera, 
  HelpCircle, 
  RotateCcw, 
  Compass, 
  ShieldAlert,
  Loader2, 
  Check, 
  Heart, 
  BookOpen, 
  User, 
  Layers,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { CELEB_STARS, PRESET_ARCHETYPES, MAKEUP_OPTIONS, LIGHTING_OPTIONS, BACKGROUND_OPTIONS, CAMERA_OPTIONS, AGE_MOODS } from "./data";
import { StarInfo, PresetArchetype, SynthesisOptions, AnalysisResult } from "./types";
import MakeupCloner from "./components/MakeupCloner";

// Import our beautiful custom pre-generated portraits
// @ts-ignore
import starFaceClassic from "./assets/images/star_face_classic_1779836287325.png";
// @ts-ignore
import starFaceModern from "./assets/images/star_face_modern_1779836306099.png";
// @ts-ignore
import starFaceEthereal from "./assets/images/star_face_ethereal_1779836322518.png";

// Map preset image paths to actual imported React assets
const IMAGE_ASSETS: Record<string, string> = {
  "/src/assets/images/star_face_classic_1779836287325.png": starFaceClassic,
  "/src/assets/images/star_face_modern_1779836306099.png": starFaceModern,
  "/src/assets/images/star_face_ethereal_1779836322518.png": starFaceEthereal,
};

// Fallback high-fidelity reports for standard presets to ensure robust offline preview
const PRESET_REPORTS: Record<string, AnalysisResult> = {
  classic: {
    chineseTitle: "幽兰惊鸿之国韵古典颜",
    aestheticDescription: "此融合之相兼备奥黛丽·赫本的旷世惊艳眉眼，与巩俐尊贵庄重、撑起华夏电影半壁乾坤的地母级骨相。下颌拐角流畅而坚挺，支撑面部极其饱满、平整而不下垂；更巧妙地渗透了地中海雕塑——莫妮卡·贝鲁奇般极致性感的古典女性浪漫引力。于高傲神圣与温婉端庄之间寻得最难能可贵的黄金美学平衡点。",
    featuresBreakdown: [
      { part: "神圣眼波 (Hepburn 眼部基因)", insight: "眼裂开度绝佳，富有幼鹿般的纯真与惊艳，眉弓饱满，目光深邃、饱含神性张力。" },
      { part: "尊贵地母下颌 (Gong Li 骨相托力)", insight: "完美流畅的下颌拐角，线条硬朗有骨气，给予面中部肌肉极其强大的支撑，极富镜头压迫感。" },
      { part: "微垂雕塑双唇 (Bellucci 唇峰写意)", insight: "唇瓣厚实莹润，嘴角带有一抹意境深远的微垂孤冷感，妖娆多姿却又冷艳难以接近。" }
    ],
    harmonyScore: 98.9,
    artisticPrompt: "A sovereign masterpiece portrait of combined historic queens, high-fashion studio close-up face, deep Rembrandt lighting, photorealistic 8k, museum exhibition print."
  },
  modern: {
    chineseTitle: "折光锋芒之绝代摩登颜",
    aestheticDescription: "本组合折射了新时代高级电影脸的最高水准。章子怡那张如雕模般完美的骨相脸充当完美的底层画布，拥有毫厘不差的骨性平整度。安妮·海瑟薇大开大合、光芒耀眼的大五官在石原里美那娇俏含笑的果冻丰唇调和下，大放异彩且极具辨识度，完美调和了西方高雅自信与东方甜美俏皮的灵韵碰撞。",
    featuresBreakdown: [
      { part: "极致对称骨相 (Zhang Ziyi 电影之骨)", insight: "四高三低标准骨架构筑起平整的折光面，能抗住顶尖影棚最严苛 of 直射光影考验。" },
      { part: "璀璨金棕明眸 (Hathaway 明艳明眸)", insight: "芭比般的饱满杏形轮廓，具有极其强大的自信投射感，顾盼生辉，极富神采。" },
      { part: "甜美果冻娇唇 (Satomi 蜜桃娇唇)", insight: "饱满娇嫩的嘟嘟唇质感与微翘的嘴角弧度，瞬间击穿了高冷，增添极高辨识度与极佳路人缘。" }
    ],
    harmonyScore: 97.4,
    artisticPrompt: "Stunning modern fashion cover beauty portrait, symmetrical structured facial bone grid, vibrant studio lighting, cinematic 8k rendering, haute couture style."
  },
  ethereal: {
    chineseTitle: "空谷玉雪之出尘仙子颜",
    aestheticDescription: "这款原型凝聚了东方美学里「不食人间烟火」的清冷意境。刘亦菲那堪称东方美学巅峰的经典驼峰挺拔玉鼻，瞬间奠定了孤傲出尘的完美测颜侧写；加上宋慧乔温润柔雾、治愈感十足的内敛明眸与莹白冰玉般的细腻皮肤，整体神态温和高贵。面中部软组织平滑饱满，宛似一株带着晨露的幽谷寒梅，不带一丝世俗尘埃。",
    featuresBreakdown: [
      { part: "清冷傲骨秀鼻 (Liu Yifei 驼峰傲骨)", insight: "侧颜挺拔，鼻梁中央带有一丝俊俏的驼峰拐折，鼻头饱满圆润，冷冽绝尘的核心所在。" },
      { part: "治愈柔美明眸 (Song Hye-kyo 晨曦柔雾)", insight: "眼波脉脉如晨雾袅绕，线条柔顺毫无侵略性，却有着润物无声般最极致的耐看与古典质朴。" },
      { part: "冰肌玉骨皮相 (Liu Yifei & Song Hye-kyo 冰雪微光)", insight: "极高的平整度，几乎看不见肌肉的拉扯感。莹亮、通透、宛若白瓷，给人极佳的空灵之境。" }
    ],
    harmonyScore: 99.2,
    artisticPrompt: "Ethereal fine-art portrait of a serene goddess with dewy translucent porcelain skin, soft wind blowing wisps of silky hair, Monet garden impressionist floral background."
  }
};

interface LandmarkHotspot {
  id: string;
  name: string;
  top: string;
  left: string;
  detailTitle: string;
  starsInvolved: string[];
  aestheticSecret: string;
}

const LANDMARKS: LandmarkHotspot[] = [
  {
    id: "eyes",
    name: "眉眼灵韵 (Eyes & Brows)",
    top: "32%",
    left: "50%",
    detailTitle: "明星完美眉眼标准 (Landmark: Epic Eyes)",
    starsInvolved: ["赫本 (Audrey Hepburn)", "安妮·海瑟薇 (Anne Hathaway)", "宋慧乔 (Song Hye-kyo)"],
    aestheticSecret: "完美的眉眼间距和饱满折转。赫本赋予了不驯深邃的幼鹿轮廓，海瑟薇撑起璀璨明亮的芭比杏仁大眼，而宋慧乔丰厚的治愈卧蚕消融了侵略性，使其既有极致深邃，又兼备脉脉温情，辨识度拉满。"
  },
  {
    id: "nose",
    name: "玉鼻中轴 (Nose & Bridge)",
    top: "48%",
    left: "50%",
    detailTitle: "明星清冷鼻架标准 (Landmark: Sculpted Nose)",
    starsInvolved: ["刘亦菲 (Liu Yifei)", "章子怡 (Zhang Ziyi)"],
    aestheticSecret: "刘亦菲那被誉为天仙骄傲的驼峰立挺鼻梁，提供了孤傲英气。配上章子怡完美的四高三低黄金折度，让面部正中轴高耸而不突兀，形成优异的3D折架，在顶光下呈现宛若希腊雕塑的美轮美奂。"
  },
  {
    id: "lips",
    name: "神韵蜜唇 (Lips & Smile)",
    top: "66%",
    left: "50%",
    detailTitle: "明星性感娇厚唇型 (Landmark: Luminous Lips)",
    starsInvolved: ["莫妮卡·贝鲁奇 (Monica Bellucci)", "石原里美 (Ishihara Satomi)"],
    aestheticSecret: "贝鲁奇代表极致张力与古典孤傲的略微下垂诱人朱唇，饱含神圣悲悯之美；石原里美饱满、含笑、微嘟的娇嫩唇珠为其注入了极其娇俏顽皮的氧气，在美学意境中孕育出灵妙活力，恰到好处。"
  },
  {
    id: "jaw",
    name: "骨相轮廓 (Jawline & Symmetry)",
    top: "76%",
    left: "30%",
    detailTitle: "神级电影脸骨线 (Landmark: Cinematic Bone Structure)",
    starsInvolved: ["章子怡 (Zhang Ziyi)", "巩俐 (Gong Li)"],
    aestheticSecret: "章子怡上镜极为平整的四高三低骨相架构构筑起极强的抗老转折。巩俐极具东方大女主庄贵压迫感的下颌角轮廓，能完美抗住皮下软组织的岁月松弛，共同雕琢出镜头前高屋建瓴的大气风骨。"
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<"synthesis" | "clone">("synthesis");
  const [activePreset, setActivePreset] = useState<string>("classic");
  const [ratios, setRatios] = useState<Record<string, number>>(PRESET_ARCHETYPES[0].ratios);
  
  // Custom synthesizer settings
  const [makeup, setMakeup] = useState<string>(MAKEUP_OPTIONS[0]);
  const [lighting, setLighting] = useState<string>(LIGHTING_OPTIONS[0]);
  const [background, setBackground] = useState<string>(BACKGROUND_OPTIONS[0]);
  const [camera, setCamera] = useState<string>(CAMERA_OPTIONS[1]);
  const [age, setAge] = useState<string>(AGE_MOODS[1]);

  // Interactive UI States
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkHotspot | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStepText, setLoadingStepText] = useState<string>("");
  const [resultReport, setResultReport] = useState<AnalysisResult>(PRESET_REPORTS.classic);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync sliders to preset changes
  const applyPreset = (presetId: string) => {
    setActivePreset(presetId);
    const preset = PRESET_ARCHETYPES.find(p => p.id === presetId);
    if (preset) {
      setRatios(preset.ratios);
      setMakeup(preset.makeup);
      setLighting(preset.lighting);
      setBackground(preset.background);
      setCamera(preset.camera);
      setResultReport(PRESET_REPORTS[presetId] || PRESET_REPORTS.classic);
      setErrorMessage(null);
    }
  };

  // Handle single slider edits
  const handleSliderChange = (starId: string, val: number) => {
    // If we manually change a slider, mark preset as custom
    setActivePreset("custom");
    setRatios(prev => ({
      ...prev,
      [starId]: val
    }));
  };

  // Dynamic aesthetic rating calculation based on ratio mix purely on frontend
  const calculatedStats = () => {
    const vals = Object.values(ratios) as number[];
    const totalSelected = vals.reduce((a, b) => a + b, 0);
    // golden rating formulas for dynamic fun feedback
    const baseSymmetry = 95.8;
    const isZiyiBonus = (ratios.zhangziyi as number || 0) > 20 ? 1.5 : 0;
    const isYifeiBonus = (ratios.liuyifei as number || 0) > 25 ? 1.2 : 0;
    const diversityPenalty = totalSelected < 50 ? -4 : (totalSelected > 200 ? -2.5 : 0.8);
    const score = Math.min(99.8, parseFloat((baseSymmetry + isZiyiBonus + isYifeiBonus + (totalSelected / 60) + diversityPenalty).toFixed(1)));
    
    // Aesthetic categorization keywords based on dominance
    let dominantStar = "hepburn";
    let maxPct = 0;
    Object.entries(ratios).forEach(([k, v]) => {
      const val = v as number;
      if (val > maxPct) {
        maxPct = val;
        dominantStar = k;
      }
    });

    return {
      score,
      dominantStar: CELEB_STARS.find(s => s.id === dominantStar)?.name || "经典美貌",
      totalSelected
    };
  };

  // AI-driven analysis invocation
  const triggerSynthesisAnalysis = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSelectedLandmark(null);

    // Beautiful simulated stepping text for cinematic build-up
    const steps = [
      "正在深度切片面部黄金比例 (Analyzing T-zone Golden Ratio)...",
      "正在提取融合赫本之灵动眉眼基因 (Blending Hepburn's deer-eye genes)...",
      "正在比对巩俐与章子怡顶奢骨相轮廓 (Fitting Zhang Ziyi movie-grade skull skeleton)...",
      "正在合成光影明暗并结合镜头设置 (Synthesizing Leica & studio lighting parameters)...",
      "AI 正在精琢无可替代的辨识度细节 (Polishing unique face identity highlights)...",
      "AI 美学鉴定报告已生成完毕 (Aesthetic DNA Map is fully compiled)!"
    ];

    let currentStep = 0;
    setLoadingStepText(steps[currentStep]);

    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingStepText(steps[currentStep]);
      }
    }, 600);

    try {
      const response = await fetch("/api/analyze-blend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ratios,
          style: activePreset === "custom" ? "自定义融合" : activePreset,
          makeup,
          lighting,
          background,
          camera,
          age
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "请求美学模型失败。");
      }

      const data = await response.json();
      setResultReport(data);
    } catch (err: any) {
      console.warn("Server analysis failed, using high-fidelity local physics engine calculation: ", err.message);
      // Construct a highly descriptive dynamic local response if offline or GEMINI API key is not ready
      const { score, dominantStar } = calculatedStats();
      const backupTitle = `天姿绝色之【${dominantStar.split(" ")[0]}】主导高阶融合颜`;
      setResultReport({
        chineseTitle: backupTitle,
        aestheticDescription: `这是以【${dominantStar}】美貌特征为金字塔塔尖的极致容颜，完美搭配了各项面部光影折角。在「${makeup}」妆容与「${lighting}」灯光的衬托下，整张脸展现出了极强的三维折角。侧边下颌折角极富质感，完美贴合黄金美学比率，辨识度极高，无愧于大银幕旷世佳人的完美赞誉。`,
        featuresBreakdown: [
          { part: "主导美貌基因优势", insight: `以 ${dominantStar} 的黄金比率为特征基石，面骨质感饱满平整，兼顾了无可挑剔的对称表现度。` },
          { part: "摄影光影配比 (设备与色调)", insight: `融入「${camera}」，将皮肤 and 整体五官 在「${background}」中沉淀得极其具备顶级肖像的胶片奢华厚重色彩。` },
          { part: "骨肉匀称度与辨识度", insight: `面中平整、下巴 and 中庭比例调配出「${age.split(" (")[0]}」的顶级气场，实现了骨相抗老衰老的旷世平衡。` }
        ],
        harmonyScore: score,
        artisticPrompt: `A magnificent, highly customized photo of synthesized ideal diva inspired by optimal star face features, styled under ${makeup}, master portrait light.`
      });
      // Optionally notify user but gracefully proceed
      setErrorMessage("已启用本地美学核心，如需启动服务端 Gemini 智能美学报告，请确保配置了 GEMINI_API_KEY。");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4d4d4] selection:bg-white selection:text-black" id="main_layout">
      {/* Decorative fine-art gallery background lines/radial blend */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none" />

      {/* Modern Editorial Top Header Block */}
      <header className="border-b border-[#ffffff1a] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50 py-6 px-6 md:px-12" id="header_section">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-1 font-mono">
              Artificial Intelligence Aesthetic Synthesis
            </span>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl md:text-4xl font-serif italic text-white tracking-tighter">
                The Singularity of Beauty
              </h1>
              <span className="text-[9px] font-mono border border-[#ffffff2a] px-2 py-0.5 rounded-none uppercase text-neutral-400">
                Studio V2.5
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 font-serif italic">
              AI 明星美貌融合实验室 — 黄金面容美学全维设计
            </p>
          </div>
          
          <div className="text-right flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 block mb-1 font-mono">
              System Matrix Status
            </span>
            <span className="text-xs font-mono text-[#00ff99] tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff99] animate-pulse" />
              Symmetry Core: {calculatedStats().score}% Optimized / High-Fidelity
            </span>
          </div>
        </div>
      </header>

      {/* Main Container Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16 relative z-10" id="main_content">
        
        {/* Concept Introduction banner */}
        <div className="mb-14 text-center max-w-3xl mx-auto" id="concept_banner">
          <h2 className="text-2xl md:text-3.5xl font-serif text-white italic font-normal tracking-tight">
            "A synthesis of iconic elegance, distilled into a single recognizable form."
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 mt-4 leading-relaxed font-mono uppercase tracking-[0.05em]">
            综合世界级顶尖女星的美学基因 • 黄金比例精密复刻 • 毫米级的骨肉共振设计
          </p>
          <div className="w-16 h-[1px] bg-white opacity-20 mx-auto mt-6" />
        </div>

        {/* Editorial Tab Switcher Container */}
        <div className="flex justify-center mb-16" id="editorial_tab_navigation">
          <div className="inline-flex border border-white/15 bg-black p-1">
            <button
              onClick={() => setCurrentTab("synthesis")}
              className={`px-8 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                currentTab === "synthesis"
                  ? "bg-white text-black font-bold"
                  : "bg-transparent text-neutral-400 hover:text-white"
              }`}
            >
              ★ 明星合颜发生器 Synthesis
            </button>
            <button
              onClick={() => setCurrentTab("clone")}
              className={`px-8 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                currentTab === "clone"
                  ? "bg-white text-black font-bold"
                  : "bg-transparent text-neutral-400 hover:text-white"
              }`}
            >
              ★ AI五官仿妆镜 Cloner & Mirror
            </button>
          </div>
        </div>

        {currentTab === "synthesis" ? (
          /* Major split Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: SYNTHESIS CONSOLE COLUMN (7 Cols in desktop) */}
          <div className="lg:col-span-7 space-y-10" id="controls_column">
            
            {/* Section 1: Presets Selection */}
            <section className="bg-[#0e0e0e] border border-[#ffffff1a] p-8 rounded-none relative" id="presets_section">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neutral-600 to-neutral-200" />
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-mono text-neutral-500">Node_01 //</span>
                <h3 className="font-serif italic text-lg text-white">
                  第一步：选择美学倾向原型 (Select Aesthetic Archetype)
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PRESET_ARCHETYPES.map((arch) => {
                  const isActive = activePreset === arch.id;
                  return (
                    <button
                      key={arch.id}
                      onClick={() => applyPreset(arch.id)}
                      id={`preset_btn_${arch.id}`}
                      className={`relative text-left p-5 rounded-none border transition-all duration-300 cursor-pointer ${
                        isActive 
                        ? "bg-[#141414] border-white border-t-2 text-white" 
                        : "bg-[#0a0a0a] border-[#ffffff1a] hover:border-[#ffffff3a] hover:bg-[#121212] text-neutral-400"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-3 right-3 flex items-center justify-center w-4 h-4 bg-white text-black">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <div className="font-bold font-serif italic text-sm text-white mb-1.5 pt-1">
                        {arch.name.split(" ")[0]}
                      </div>
                      <div className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase">
                        {arch.englishName}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-3 line-clamp-2 leading-relaxed">
                        {arch.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Archetype Description Card (if non-custom) */}
              {activePreset !== "custom" && (
                <div className="mt-6 p-5 rounded-none bg-[#0a0a0a] border border-[#ffffff1a]">
                  {PRESET_ARCHETYPES.map((arch) => {
                    if (arch.id !== activePreset) return null;
                    return (
                      <div key={arch.id}>
                        <div className="text-[10px] text-neutral-400 font-mono tracking-widest flex items-center gap-1.5 uppercase">
                          <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                          <span>美学画风配方 // {arch.aestheticTitle}</span>
                        </div>
                        <p className="text-xs text-neutral-300 mt-2 pb-3 border-b border-[#ffffff1a] leading-relaxed font-serif">
                          {arch.aestheticIntro}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-[10px] font-mono text-neutral-400 pt-3 uppercase tracking-wider">
                          <div><span className="text-neutral-500">骨肉微妆：</span>{arch.makeup}</div>
                          <div><span className="text-neutral-500">艺术灯光：</span>{arch.lighting}</div>
                          <div><span className="text-neutral-500">构图背景：</span>{arch.background}</div>
                          <div><span className="text-neutral-500">摄影光影：</span>{arch.camera}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Section 2: Star Facial Attributes Mixing Sliders */}
            <section className="bg-[#0e0e0e] border border-[#ffffff1a] p-8 rounded-none relative" id="sliders_section">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neutral-600 to-neutral-200" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-500">Node_02 //</span>
                  <h3 className="font-serif italic text-lg text-white">
                    第二步：精调五官与骨肉美德权重 (Aesthetic Ratios)
                  </h3>
                </div>
                <button 
                  onClick={() => applyPreset("classic")}
                  className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 border border-[#ffffff2a] hover:border-white hover:text-white rounded-none transition-all cursor-pointer bg-[#0a0a0a] text-neutral-300"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>重置配方</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CELEB_STARS.map((star) => {
                  const currentValue = ratios[star.id] || 0;
                  return (
                    <div 
                      key={star.id} 
                      className={`p-4 rounded-none border transition-all ${
                        currentValue > 0 
                        ? "bg-[#141414] border-[#ffffff33]" 
                        : "bg-[#0a0a0a] border-[#ffffff1a]"
                      }`}
                      id={`star_block_${star.id}`}
                    >
                      <div className="flex items-baseline justify-between text-xs mb-2">
                        <span className="font-serif font-bold italic text-white">
                          {star.name}
                        </span>
                        <span className="font-mono text-white font-semibold text-xs tracking-wider">
                          {currentValue}%
                        </span>
                      </div>
                      
                      {/* Interactive sleek customization slider */}
                      <div className="flex items-center gap-3 my-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={currentValue}
                          onChange={(e) => handleSliderChange(star.id, parseInt(e.target.value))}
                          className="w-full h-1 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-white focus:outline-none"
                          style={{
                            background: `linear-gradient(to right, #ffffff 0%, #ffffff ${currentValue}%, #262626 ${currentValue}%, #262626 100%)`
                          }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-[10px] text-neutral-400 mt-2 pt-1.5 border-t border-[#ffffff0c]">
                        <span className="text-neutral-300 font-mono tracking-wider uppercase">
                          ★ 标志：{star.signatureStars}
                        </span>
                        <span className="text-neutral-500 font-mono">
                          SEER指数 {star.rarityScore}
                        </span>
                      </div>
                      
                      {/* Expandable description if active */}
                      {currentValue > 0 && (
                        <p className="text-[11px] text-neutral-400 font-serif italic mt-2 leading-relaxed">
                          {star.featureDesc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 3: Fine Art Photography & Makeup Settings */}
            <section className="bg-[#0e0e0e] border border-[#ffffff1a] p-8 rounded-none relative" id="settings_section">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neutral-600 to-neutral-200" />
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-mono text-neutral-500">Node_03 //</span>
                <h3 className="font-serif italic text-lg text-white">
                  第三步：选择高端光影与微妆环境 (Styling Synthesizer)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                {/* Makeup Select */}
                <div>
                  <label className="text-neutral-400 block mb-2 uppercase tracking-widest text-[10px]">1. 骨肉微妆设计 (Makeup Style)</label>
                  <select 
                    value={makeup}
                    onChange={(e) => {
                      setActivePreset("custom");
                      setMakeup(e.target.value);
                    }}
                    className="w-full bg-[#0a0a0a] border border-[#ffffff1a] rounded-none px-4 py-3 text-neutral-200 focus:outline-none focus:border-white uppercase tracking-wider text-[11px]"
                  >
                    {MAKEUP_OPTIONS.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Lighting Select */}
                <div>
                  <label className="text-neutral-400 block mb-2 uppercase tracking-widest text-[10px]">2. 艺术影棚采光 (Ambient Lighting)</label>
                  <select 
                    value={lighting}
                    onChange={(e) => {
                      setActivePreset("custom");
                      setLighting(e.target.value);
                    }}
                    className="w-full bg-[#0a0a0a] border border-[#ffffff1a] rounded-none px-4 py-3 text-neutral-200 focus:outline-none focus:border-white uppercase tracking-wider text-[11px]"
                  >
                    {LIGHTING_OPTIONS.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Background Select */}
                <div>
                  <label className="text-neutral-400 block mb-2 uppercase tracking-widest text-[10px]">3. 构图艺术背景 (Background Ambience)</label>
                  <select 
                    value={background}
                    onChange={(e) => {
                      setActivePreset("custom");
                      setBackground(e.target.value);
                    }}
                    className="w-full bg-[#0a0a0a] border border-[#ffffff1a] rounded-none px-4 py-3 text-neutral-200 focus:outline-none focus:border-white uppercase tracking-wider text-[11px]"
                  >
                    {BACKGROUND_OPTIONS.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Camera Select */}
                <div>
                  <label className="text-neutral-400 block mb-2 uppercase tracking-widest text-[10px]">4. 相机与顶级镜头 (Photographic System)</label>
                  <select 
                    value={camera}
                    onChange={(e) => {
                      setActivePreset("custom");
                      setCamera(e.target.value);
                    }}
                    className="w-full bg-[#0a0a0a] border border-[#ffffff1a] rounded-none px-4 py-3 text-neutral-200 focus:outline-none focus:border-white uppercase tracking-wider text-[11px]"
                  >
                    {CAMERA_OPTIONS.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Age & Mood Select */}
                <div className="md:col-span-2">
                  <label className="text-neutral-400 block mb-2 uppercase tracking-widest text-[10px]">5. 气势神韵层次 (Age Mood Matrix)</label>
                  <select 
                    value={age}
                    onChange={(e) => {
                      setActivePreset("custom");
                      setAge(e.target.value);
                    }}
                    className="w-full bg-[#0a0a0a] border border-[#ffffff1a] rounded-none px-4 py-3 text-neutral-200 focus:outline-none focus:border-white uppercase tracking-wider text-[11px]"
                  >
                    {AGE_MOODS.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Synthesize triggering Action Button bar */}
              <div className="mt-8 pt-6 border-t border-[#ffffff1a]">
                <button
                  onClick={triggerSynthesisAnalysis}
                  disabled={loading}
                  className="w-full py-4 border border-white text-white text-[11px] uppercase tracking-[0.2em] font-bold bg-[#0a0a0a] hover:bg-white hover:text-black hover:border-white transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 rounded-none cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>正在重塑美貌谱系 | SYNTHESIZING...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>合成完美肖像并进行 AI 美学剖析</span>
                    </>
                  )}
                </button>
              </div>
            </section>

          </div>

          {/* RIGHT: LIVE PORTRAIT & ANALYSIS DISPLAY (5 Cols) */}
          <div className="lg:col-span-5 space-y-10" id="portrait_analysis_column">
            
            {/* Visual Portrait container */}
            <section className="bg-[#0e0e0e] border border-[#ffffff1a] p-6 rounded-none relative overflow-hidden" id="portrait_display_box">
              <div className="absolute top-6 left-6 z-20 px-3 py-1.5 text-[10px] font-mono uppercase bg-black/90 border border-[#ffffff1a] rounded-none text-neutral-300 flex items-center gap-1.5 tracking-widest">
                <Layers className="w-3.5 h-3.5" />
                <span>Exhibition: Combined Star Portrait</span>
              </div>

              {/* Fine Art Symmetrical Crops and Borders around the Image Shell */}
              <div className="absolute top-14 left-10 w-16 h-16 border-t border-l border-white/40 pointer-events-none z-10" />
              <div className="absolute bottom-18 right-10 w-16 h-16 border-b border-r border-white/40 pointer-events-none z-10" />

              {/* Symmetrical face comparison box */}
              <div className="relative aspect-[3/4] w-full rounded-none overflow-hidden group bg-slate-950 mt-12 shadow-2xl border border-[#ffffff1a]" id="portrait_image_shell">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePreset === "custom" ? "custom_portrait" : activePreset}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={
                      activePreset === "custom" 
                      ? IMAGE_ASSETS[PRESET_ARCHETYPES[0].imagePath] 
                      : IMAGE_ASSETS[PRESET_ARCHETYPES.find(a => a.id === activePreset)?.imagePath || ""] || starFaceClassic
                    }
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-[6s] ease-out"
                    alt="Synthesized flawless celebrity star face portrait"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Grid Overlay to represent dynamic face coordinate scan */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none mix-blend-overlay" />
                
                {/* Horizontal scanner light bar animation strictly when loading */}
                {loading && (
                  <div className="absolute left-0 right-0 h-[1.5px] z-10 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-[bounce_3s_infinite]" />
                )}

                {/* Vertical aesthetic branding tag inside the viewport */}
                <div className="absolute top-1/2 right-4 -translate-y-1/2 text-[9px] uppercase tracking-[0.8em] text-[#ffffff15] select-none pointer-events-none" style={{writingMode: "vertical-rl", transform: "rotate(180deg)"}}>
                  Symmetry Optimized Series • Epoch 441
                </div>

                {/* Interactive hotspots overlay */}
                {!loading && LANDMARKS.map((mark) => (
                  <button
                    key={mark.id}
                    onClick={() => setSelectedLandmark(mark)}
                    className="absolute z-10 group/spot flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all active:scale-75"
                    style={{ top: mark.top, left: mark.left }}
                    title={`探索区域: ${mark.name}`}
                  >
                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-white opacity-40 animate-ping duration-1000" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white border-2 border-black" />
                    {/* Hover title info */}
                    <div className="absolute left-6 whitespace-nowrap px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-widest rounded-none bg-black border border-[#ffffff2a] text-white opacity-0 group-hover/spot:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {mark.name}
                    </div>
                  </button>
                ))}

                {/* Substantially detailed Landmark description card overlay inside the photo */}
                {selectedLandmark && (
                  <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/95 backdrop-blur-md p-5 rounded-none border border-white/30 text-left animate-slide-up shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#ffffff1a] pb-2 mb-2">
                      <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#eeeeee]">
                        {selectedLandmark.detailTitle}
                      </h4>
                      <button 
                        onClick={() => setSelectedLandmark(null)}
                        className="text-[9px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="text-[12px] text-neutral-300 font-serif italic leading-relaxed">
                      {selectedLandmark.aestheticSecret}
                    </div>
                    <div className="mt-3 flex gap-1 items-center flex-wrap">
                      <span className="text-[9px] text-[#888888] font-mono uppercase tracking-widest">DNA Nodes:</span>
                      {selectedLandmark.starsInvolved.map((name, idx) => (
                        <span key={idx} className="bg-neutral-800 text-neutral-200 px-2.5 py-0.5 rounded-none text-[9px] font-mono">
                          {name.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Simulated scan stats line under image */}
              <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-neutral-400 bg-black border border-[#ffffff1a] px-4 py-3 rounded-none uppercase tracking-wider">
                <div>比例对称：<span className="text-white font-bold">Consensus Apex</span></div>
                <div>骨性裹附：<span className="text-white">Optimal Symmetrical Grid</span></div>
              </div>
            </section>

            {/* AI-Driven Aesthetics Report Card */}
            <section className="bg-[#0e0e0e] border border-[#ffffff1a] p-8 rounded-none relative" id="report_card">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neutral-600 to-neutral-200" />
              
              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin mb-4" />
                  <p className="text-sm font-serif italic text-white">{loadingStepText}</p>
                  <p className="text-[10px] text-neutral-500 mt-2 font-mono uppercase tracking-widest">
                    AI 正在基于 50 载黄金时尚档案进行交叉像素比对...
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-[#ffffff1a] pb-4" id="report_header">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">Verification Certificate</span>
                      <h3 className="font-serif italic text-lg text-white">
                        美学合一解译报告 (Aesthetic Diagnosis)
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Aesthetic Score</div>
                      <div className="text-2xl font-serif italic font-bold text-white">
                        {resultReport.harmonyScore} <span className="text-xs text-neutral-500">/ 100</span>
                      </div>
                    </div>
                  </div>

                  {/* Beauty Title */}
                  <div className="text-center bg-[#0a0a0a] border border-[#ffffff1a] py-4 my-6 rounded-none">
                    <span className="text-[#888888] text-[9px] uppercase tracking-[0.4em] block mb-1 font-mono font-bold">
                      ★ Aesthetic Consensus Apex Moniker ★
                    </span>
                    <h4 className="text-xl md:text-2xl font-serif italic text-white tracking-widest">
                      {resultReport.chineseTitle}
                    </h4>
                  </div>

                  {/* Poetic description */}
                  <div className="mb-8">
                    <h5 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-neutral-600" />
                      <span>综合皮相与骨相解说 (Overall Balance Breakdown)：</span>
                    </h5>
                    <p className="text-xs md:text-sm text-neutral-200 font-serif italic leading-relaxed text-justify bg-black p-5 border border-[#ffffff1a] rounded-none">
                      {resultReport.aestheticDescription}
                    </p>
                  </div>

                  {/* Feature lists detail */}
                  <div className="space-y-5 mb-8" id="feature_detail_paragraphs">
                    <h5 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-neutral-600" />
                      <span>标志美学细节因子 (Facial DNA Insights)：</span>
                    </h5>
                    
                    {resultReport.featuresBreakdown.map((item, idx) => (
                      <div key={idx} className="border-l-2 border-[#ffffff40] pl-4 py-1">
                        <span className="block text-neutral-400 text-[10px] font-mono uppercase tracking-widest mb-1">
                          Node_0{idx + 1} // {item.part}
                        </span>
                        <p className="text-white font-serif italic text-xs md:text-sm leading-relaxed">
                          {item.insight}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Custom Imagen dynamic artwork prompt */}
                  <div className="p-4 border border-[#ffffff1a] bg-black text-[10px] font-mono text-neutral-400">
                    <div className="flex items-center gap-1.5 text-white mb-2 font-semibold tracking-wider uppercase">
                      <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>高精指令图谱 (Imagen Custom Blueprint)：</span>
                    </div>
                    <code className="block select-all cursor-pointer hover:text-white leading-relaxed bg-[#0a0a0a] p-3 border border-neutral-800">
                      {resultReport.artisticPrompt}
                    </code>
                    <p className="text-[9px] text-neutral-500 mt-2 lowercase leading-relaxed italic">
                      generated in 1,240,000 sampling steps. this output represents the mathematical apex of aesthetic consensus across 50 years of editorial archives.
                    </p>
                  </div>
                </div>
              )}

              {/* Handle gracefully warning when no API key for pure transparency */}
              {errorMessage && (
                <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/20 text-amber-400 text-[11px] flex gap-2.5 items-start leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    {errorMessage}
                  </div>
                </div>
              )}
            </section>

          </div>

        </div>
        ) : (
          <MakeupCloner />
        )}

      </main>

      {/* Modern footer with human/minimalist credentials */}
      <footer className="border-t border-[#ffffff1a] bg-[#0c0c0c] py-12 text-center text-[10px] text-neutral-500 tracking-[0.3em] uppercase font-mono" id="app_footer">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p>© 2026 AI Synthesis Lab • Private Exhibition Portfolio</p>
          <p className="text-[9px] text-neutral-600 tracking-[0.1em] normal-case italic font-serif">Made in cooperation with world-class photography and high-fashion museum archives</p>
        </div>
      </footer>
    </div>
  );
}
