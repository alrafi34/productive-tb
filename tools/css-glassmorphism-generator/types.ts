export interface GlassmorphismConfig {
  blur: number;
  opacity: number;
  color: string;
  borderRadius: number;
  borderWidth: number;
  borderOpacity: number;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowOpacity: number;
  width: number;
  height: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export type OutputFormat = "css" | "tailwind";

export type PresetName = "Soft Glass" | "Strong Frost" | "Dark Glass" | "Colored Glass" | "Neon Glass";