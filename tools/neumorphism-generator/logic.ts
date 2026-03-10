import { NeumorphismConfig, NeumorphismPreset } from "./types";

export type { NeumorphismConfig } from "./types";

export const defaultConfig: NeumorphismConfig = {
  backgroundColor: "#e0e0e0",
  shadowDistance: 8,
  blurRadius: 16,
  shadowIntensity: 20,
  borderRadius: 16,
  isPressed: false,
  lightDirection: 'top-left',
  width: 200,
  height: 200,
  isDarkMode: false
};

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const adjust = (color: number) => {
    const adjusted = Math.round(color * (1 + percent / 100));
    return Math.max(0, Math.min(255, adjusted));
  };

  const r = adjust(rgb.r).toString(16).padStart(2, '0');
  const g = adjust(rgb.g).toString(16).padStart(2, '0');
  const b = adjust(rgb.b).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

export function generateShadowColors(backgroundColor: string, intensity: number, isDarkMode: boolean): { light: string; dark: string } {
  if (isDarkMode) {
    return {
      light: adjustBrightness(backgroundColor, intensity),
      dark: adjustBrightness(backgroundColor, -intensity * 1.5)
    };
  }
  
  return {
    light: adjustBrightness(backgroundColor, intensity),
    dark: adjustBrightness(backgroundColor, -intensity)
  };
}

export function generateNeumorphismCSS(config: NeumorphismConfig): string {
  const { backgroundColor, shadowDistance, blurRadius, shadowIntensity, borderRadius, isPressed, lightDirection, isDarkMode } = config;
  
  const shadowColors = generateShadowColors(backgroundColor, shadowIntensity, isDarkMode);
  
  const getDirectionMultipliers = () => {
    switch (lightDirection) {
      case 'top-left': return { x: -1, y: -1 };
      case 'top-right': return { x: 1, y: -1 };
      case 'bottom-left': return { x: -1, y: 1 };
      case 'bottom-right': return { x: 1, y: 1 };
      default: return { x: -1, y: -1 };
    }
  };

  const { x, y } = getDirectionMultipliers();
  const inset = isPressed ? 'inset ' : '';
  
  const lightShadowX = x * shadowDistance;
  const lightShadowY = y * shadowDistance;
  const darkShadowX = -lightShadowX;
  const darkShadowY = -lightShadowY;

  return `background: ${backgroundColor};
border-radius: ${borderRadius}px;
box-shadow: 
  ${inset}${lightShadowX}px ${lightShadowY}px ${blurRadius}px ${shadowColors.light},
  ${inset}${darkShadowX}px ${darkShadowY}px ${blurRadius}px ${shadowColors.dark};`;
}

export const neumorphismPresets: NeumorphismPreset[] = [
  {
    name: "Soft Card",
    config: {
      backgroundColor: "#e0e0e0",
      shadowDistance: 8,
      blurRadius: 16,
      shadowIntensity: 20,
      borderRadius: 16,
      isPressed: false
    },
    description: "Gentle raised card effect"
  },
  {
    name: "Floating Button",
    config: {
      backgroundColor: "#f0f0f0",
      shadowDistance: 12,
      blurRadius: 24,
      shadowIntensity: 25,
      borderRadius: 50,
      isPressed: false
    },
    description: "Prominent button with strong elevation"
  },
  {
    name: "Pressed Button",
    config: {
      backgroundColor: "#e0e0e0",
      shadowDistance: 6,
      blurRadius: 12,
      shadowIntensity: 15,
      borderRadius: 12,
      isPressed: true
    },
    description: "Inset button effect"
  },
  {
    name: "Input Field",
    config: {
      backgroundColor: "#f5f5f5",
      shadowDistance: 4,
      blurRadius: 8,
      shadowIntensity: 10,
      borderRadius: 8,
      isPressed: true
    },
    description: "Subtle inset for form inputs"
  },
  {
    name: "Dark Card",
    config: {
      backgroundColor: "#2e2e2e",
      shadowDistance: 10,
      blurRadius: 20,
      shadowIntensity: 30,
      borderRadius: 20,
      isPressed: false,
      isDarkMode: true
    },
    description: "Dark theme neumorphic card"
  }
];

export function generateTailwindCSS(config: NeumorphismConfig): string {
  const shadowColors = generateShadowColors(config.backgroundColor, config.shadowIntensity, config.isDarkMode);
  
  // Simplified Tailwind approximation
  const radiusMap: { [key: number]: string } = {
    0: "rounded-none",
    4: "rounded",
    8: "rounded-lg",
    12: "rounded-xl",
    16: "rounded-2xl",
    20: "rounded-3xl",
    50: "rounded-full"
  };
  
  const closestRadius = Object.keys(radiusMap)
    .map(Number)
    .reduce((prev, curr) => 
      Math.abs(curr - config.borderRadius) < Math.abs(prev - config.borderRadius) ? curr : prev
    );

  return `${radiusMap[closestRadius]} shadow-neumorphic`;
}

export function generateSCSSVariables(config: NeumorphismConfig): string {
  const shadowColors = generateShadowColors(config.backgroundColor, config.shadowIntensity, config.isDarkMode);
  
  return `$neumorphic-bg: ${config.backgroundColor};
$neumorphic-light: ${shadowColors.light};
$neumorphic-dark: ${shadowColors.dark};
$neumorphic-distance: ${config.shadowDistance}px;
$neumorphic-blur: ${config.blurRadius}px;
$neumorphic-radius: ${config.borderRadius}px;`;
}