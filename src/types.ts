export interface StarInfo {
  id: string;
  name: string;
  englishName: string;
  featureTitle: string;
  featureDesc: string;
  signatureStars: string; // The specific region (e.g. "Eyes", "Nose", "Bone Structure")
  rarityScore: number;
}

export interface PresetArchetype {
  id: string;
  name: string;
  englishName: string;
  subtitle: string;
  ratios: Record<string, number>;
  imagePath: string;
  aestheticTitle: string;
  aestheticIntro: string;
  makeup: string;
  lighting: string;
  background: string;
  camera: string;
}

export interface SynthesisOptions {
  makeup: string;
  lighting: string;
  background: string;
  camera: string;
  age: string;
}

export interface FeatureDetail {
  part: string;
  insight: string;
}

export interface AnalysisResult {
  chineseTitle: string;
  aestheticDescription: string;
  featuresBreakdown: FeatureDetail[];
  harmonyScore: number;
  artisticPrompt: string;
}

export interface MakeupGuideStep {
  step: string;
  title: string;
  detail: string;
}

export interface SuggestedColor {
  name: string;
  hex: string;
  part: string;
}

export interface MakeupCloneResult {
  compatibilityRate: number;
  aestheticVibe: string;
  faceAnalysis: string;
  makeupGuide: MakeupGuideStep[];
  simulatedEffect: string;
  suggestedColors: SuggestedColor[];
}

