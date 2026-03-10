import { GlassmorphismConfig, RGBColor } from "./types";

export type { GlassmorphismConfig } from "./types";

export const defaultConfig: GlassmorphismConfig = {
  blur: 10,
  opacity: 0.2,
  color: "#ffffff",
  borderRadius: 16,
  borderWidth: 1,
  borderOpacity: 0.3,
  shadowX: 0,
  shadowY: 8,
  shadowBlur: 32,
  shadowOpacity: 0.2,
  width: 300,
  height: 200
};

export function hexToRgb(hex: string): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function generateGlassmorphismCSS(config: GlassmorphismConfig): string {
  const rgb = hexToRgb(config.color);
  if (!rgb) return "";

  const background = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${config.opacity})`;
  const borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${config.borderOpacity})`;
  const shadowColor = `rgba(0, 0, 0, ${config.shadowOpacity})`;

  return `background: ${background};
backdrop-filter: blur(${config.blur}px);
-webkit-backdrop-filter: blur(${config.blur}px);
border-radius: ${config.borderRadius}px;
border: ${config.borderWidth}px solid ${borderColor};
box-shadow: ${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px ${shadowColor};`;
}

export function generateTailwindCSS(config: GlassmorphismConfig): string {
  const blurMap: { [key: number]: string } = {
    0: "backdrop-blur-none",
    4: "backdrop-blur-sm",
    8: "backdrop-blur",
    12: "backdrop-blur-md",
    16: "backdrop-blur-lg",
    24: "backdrop-blur-xl",
    40: "backdrop-blur-3xl"
  };
  
  const closestBlur = Object.keys(blurMap)
    .map(Number)
    .reduce((prev, curr) => 
      Math.abs(curr - config.blur) < Math.abs(prev - config.blur) ? curr : prev
    );

  const opacityPercent = Math.round(config.opacity * 100);
  const radiusMap: { [key: number]: string } = {
    0: "rounded-none",
    4: "rounded",
    8: "rounded-lg",
    12: "rounded-xl",
    16: "rounded-2xl",
    24: "rounded-3xl"
  };
  
  const closestRadius = Object.keys(radiusMap)
    .map(Number)
    .reduce((prev, curr) => 
      Math.abs(curr - config.borderRadius) < Math.abs(prev - config.borderRadius) ? curr : prev
    );

  return `${blurMap[closestBlur]} bg-white/${opacityPercent} border border-white/30 ${radiusMap[closestRadius]}`;
}

export const presets = {
  "Soft Glass": {
    blur: 10,
    opacity: 0.15,
    color: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderOpacity: 0.2,
    shadowX: 0,
    shadowY: 8,
    shadowBlur: 32,
    shadowOpacity: 0.1,
    width: 300,
    height: 200
  },
  "Strong Frost": {
    blur: 20,
    opacity: 0.3,
    color: "#ffffff",
    borderRadius: 12,
    borderWidth: 2,
    borderOpacity: 0.4,
    shadowX: 0,
    shadowY: 12,
    shadowBlur: 40,
    shadowOpacity: 0.25,
    width: 300,
    height: 200
  },
  "Dark Glass": {
    blur: 15,
    opacity: 0.25,
    color: "#000000",
    borderRadius: 20,
    borderWidth: 1,
    borderOpacity: 0.3,
    shadowX: 0,
    shadowY: 10,
    shadowBlur: 35,
    shadowOpacity: 0.3,
    width: 300,
    height: 200
  },
  "Colored Glass": {
    blur: 12,
    opacity: 0.2,
    color: "#3b82f6",
    borderRadius: 18,
    borderWidth: 1,
    borderOpacity: 0.35,
    shadowX: 0,
    shadowY: 8,
    shadowBlur: 30,
    shadowOpacity: 0.2,
    width: 300,
    height: 200
  },
  "Neon Glass": {
    blur: 8,
    opacity: 0.1,
    color: "#10b981",
    borderRadius: 24,
    borderWidth: 2,
    borderOpacity: 0.6,
    shadowX: 0,
    shadowY: 0,
    shadowBlur: 20,
    shadowOpacity: 0.4,
    width: 300,
    height: 200
  }
};

export const backgroundPresets = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
];