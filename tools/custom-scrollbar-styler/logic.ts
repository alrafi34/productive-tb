import { ScrollbarStyles, ScrollbarPreset } from './types';

// Default scrollbar styles
export const DEFAULT_STYLES: ScrollbarStyles = {
  width: 12,
  trackBackground: '#f1f1f1',
  trackBorderRadius: 10,
  thumbBackground: '#888888',
  thumbHoverBackground: '#555555',
  thumbBorderRadius: 10,
  thumbBorder: 0,
  thumbShadow: false,
  thumbGradient: false,
  thumbInsetBorder: false,
  gradientStart: '#4facfe',
  gradientEnd: '#00f2fe'
};

// Scrollbar presets
export const SCROLLBAR_PRESETS: ScrollbarPreset[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple',
    icon: '⚪',
    styles: {
      width: 8,
      trackBackground: '#f5f5f5',
      trackBorderRadius: 0,
      thumbBackground: '#d1d5db',
      thumbHoverBackground: '#9ca3af',
      thumbBorderRadius: 0,
      thumbBorder: 0,
      thumbShadow: false,
      thumbGradient: false,
      thumbInsetBorder: false,
      gradientStart: '#4facfe',
      gradientEnd: '#00f2fe'
    }
  },
  {
    id: 'rounded',
    name: 'Rounded Modern',
    description: 'Smooth rounded edges',
    icon: '🔵',
    styles: {
      width: 12,
      trackBackground: '#e5e7eb',
      trackBorderRadius: 10,
      thumbBackground: '#3b82f6',
      thumbHoverBackground: '#2563eb',
      thumbBorderRadius: 10,
      thumbBorder: 0,
      thumbShadow: true,
      thumbGradient: false,
      thumbInsetBorder: false,
      gradientStart: '#4facfe',
      gradientEnd: '#00f2fe'
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Vibrant glow effect',
    icon: '💜',
    styles: {
      width: 14,
      trackBackground: '#1a1a2e',
      trackBorderRadius: 10,
      thumbBackground: '#a855f7',
      thumbHoverBackground: '#9333ea',
      thumbBorderRadius: 10,
      thumbBorder: 0,
      thumbShadow: true,
      thumbGradient: false,
      thumbInsetBorder: false,
      gradientStart: '#a855f7',
      gradientEnd: '#ec4899'
    }
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted glass effect',
    icon: '🔷',
    styles: {
      width: 12,
      trackBackground: 'rgba(255, 255, 255, 0.1)',
      trackBorderRadius: 10,
      thumbBackground: 'rgba(255, 255, 255, 0.3)',
      thumbHoverBackground: 'rgba(255, 255, 255, 0.5)',
      thumbBorderRadius: 10,
      thumbBorder: 1,
      thumbShadow: false,
      thumbGradient: false,
      thumbInsetBorder: true,
      gradientStart: '#4facfe',
      gradientEnd: '#00f2fe'
    }
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Colorful gradient',
    icon: '🌈',
    styles: {
      width: 12,
      trackBackground: '#f3f4f6',
      trackBorderRadius: 10,
      thumbBackground: '#4facfe',
      thumbHoverBackground: '#00f2fe',
      thumbBorderRadius: 10,
      thumbBorder: 0,
      thumbShadow: false,
      thumbGradient: true,
      thumbInsetBorder: false,
      gradientStart: '#4facfe',
      gradientEnd: '#00f2fe'
    }
  },
  {
    id: 'macos',
    name: 'macOS Style',
    description: 'Thin macOS scrollbar',
    icon: '🍎',
    styles: {
      width: 6,
      trackBackground: 'transparent',
      trackBorderRadius: 10,
      thumbBackground: 'rgba(0, 0, 0, 0.3)',
      thumbHoverBackground: 'rgba(0, 0, 0, 0.5)',
      thumbBorderRadius: 10,
      thumbBorder: 0,
      thumbShadow: false,
      thumbGradient: false,
      thumbInsetBorder: false,
      gradientStart: '#4facfe',
      gradientEnd: '#00f2fe'
    }
  }
];

// Generate WebKit scrollbar CSS
export function generateWebKitCSS(styles: ScrollbarStyles): string {
  let css = `/* Chrome / Edge / Safari */\n`;
  css += `::-webkit-scrollbar {\n`;
  css += `  width: ${styles.width}px;\n`;
  css += `}\n\n`;

  css += `::-webkit-scrollbar-track {\n`;
  css += `  background: ${styles.trackBackground};\n`;
  if (styles.trackBorderRadius > 0) {
    css += `  border-radius: ${styles.trackBorderRadius}px;\n`;
  }
  css += `}\n\n`;

  css += `::-webkit-scrollbar-thumb {\n`;
  
  if (styles.thumbGradient) {
    css += `  background: linear-gradient(180deg, ${styles.gradientStart}, ${styles.gradientEnd});\n`;
  } else {
    css += `  background: ${styles.thumbBackground};\n`;
  }
  
  if (styles.thumbBorderRadius > 0) {
    css += `  border-radius: ${styles.thumbBorderRadius}px;\n`;
  }
  
  if (styles.thumbBorder > 0) {
    css += `  border: ${styles.thumbBorder}px solid rgba(255, 255, 255, 0.3);\n`;
  }
  
  if (styles.thumbShadow) {
    css += `  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n`;
  }
  
  if (styles.thumbInsetBorder) {
    css += `  border: 1px solid rgba(255, 255, 255, 0.2);\n`;
    css += `  backdrop-filter: blur(10px);\n`;
  }
  
  css += `}\n\n`;

  css += `::-webkit-scrollbar-thumb:hover {\n`;
  css += `  background: ${styles.thumbHoverBackground};\n`;
  css += `}\n`;

  return css;
}

// Generate Firefox scrollbar CSS
export function generateFirefoxCSS(styles: ScrollbarStyles): string {
  let css = `/* Firefox */\n`;
  css += `* {\n`;
  
  const width = styles.width <= 8 ? 'thin' : styles.width <= 16 ? 'auto' : 'auto';
  css += `  scrollbar-width: ${width};\n`;
  
  const thumbColor = styles.thumbGradient ? styles.gradientStart : styles.thumbBackground;
  css += `  scrollbar-color: ${thumbColor} ${styles.trackBackground};\n`;
  
  css += `}\n`;

  return css;
}

// Generate both WebKit and Firefox CSS
export function generateBothCSS(styles: ScrollbarStyles): string {
  return generateWebKitCSS(styles) + '\n' + generateFirefoxCSS(styles);
}

// Generate CSS variables
export function generateCSSVariables(styles: ScrollbarStyles): string {
  let css = `:root {\n`;
  css += `  --scrollbar-width: ${styles.width}px;\n`;
  css += `  --scrollbar-track-bg: ${styles.trackBackground};\n`;
  css += `  --scrollbar-track-radius: ${styles.trackBorderRadius}px;\n`;
  css += `  --scrollbar-thumb-bg: ${styles.thumbBackground};\n`;
  css += `  --scrollbar-thumb-hover-bg: ${styles.thumbHoverBackground};\n`;
  css += `  --scrollbar-thumb-radius: ${styles.thumbBorderRadius}px;\n`;
  css += `}\n\n`;

  css += `::-webkit-scrollbar {\n`;
  css += `  width: var(--scrollbar-width);\n`;
  css += `}\n\n`;

  css += `::-webkit-scrollbar-track {\n`;
  css += `  background: var(--scrollbar-track-bg);\n`;
  css += `  border-radius: var(--scrollbar-track-radius);\n`;
  css += `}\n\n`;

  css += `::-webkit-scrollbar-thumb {\n`;
  css += `  background: var(--scrollbar-thumb-bg);\n`;
  css += `  border-radius: var(--scrollbar-thumb-radius);\n`;
  css += `}\n\n`;

  css += `::-webkit-scrollbar-thumb:hover {\n`;
  css += `  background: var(--scrollbar-thumb-hover-bg);\n`;
  css += `}\n`;

  return css;
}

// Generate minimal CSS (compressed)
export function generateMinimalCSS(styles: ScrollbarStyles): string {
  let css = `::-webkit-scrollbar{width:${styles.width}px}`;
  css += `::-webkit-scrollbar-track{background:${styles.trackBackground}}`;
  css += `::-webkit-scrollbar-thumb{background:${styles.thumbBackground};border-radius:${styles.thumbBorderRadius}px}`;
  css += `::-webkit-scrollbar-thumb:hover{background:${styles.thumbHoverBackground}}`;
  return css;
}

// Generate dark mode styles
export function generateDarkModeStyles(styles: ScrollbarStyles): ScrollbarStyles {
  return {
    ...styles,
    trackBackground: '#1e1e1e',
    thumbBackground: '#555555',
    thumbHoverBackground: '#777777'
  };
}

// Download CSS file
export function downloadCSS(css: string, filename: string = 'scrollbar-styles.css'): void {
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Apply styles to preview element
export function applyStylesToPreview(element: HTMLElement, styles: ScrollbarStyles): void {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'scrollbar-preview-styles';
  
  // Remove existing style if present
  const existing = document.getElementById('scrollbar-preview-styles');
  if (existing) {
    existing.remove();
  }
  
  let css = `
    #${element.id}::-webkit-scrollbar {
      width: ${styles.width}px;
    }
    
    #${element.id}::-webkit-scrollbar-track {
      background: ${styles.trackBackground};
      border-radius: ${styles.trackBorderRadius}px;
    }
    
    #${element.id}::-webkit-scrollbar-thumb {
  `;
  
  if (styles.thumbGradient) {
    css += `background: linear-gradient(180deg, ${styles.gradientStart}, ${styles.gradientEnd});`;
  } else {
    css += `background: ${styles.thumbBackground};`;
  }
  
  css += `
      border-radius: ${styles.thumbBorderRadius}px;
  `;
  
  if (styles.thumbBorder > 0) {
    css += `border: ${styles.thumbBorder}px solid rgba(255, 255, 255, 0.3);`;
  }
  
  if (styles.thumbShadow) {
    css += `box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);`;
  }
  
  if (styles.thumbInsetBorder) {
    css += `
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
    `;
  }
  
  css += `
    }
    
    #${element.id}::-webkit-scrollbar-thumb:hover {
      background: ${styles.thumbHoverBackground};
    }
  `;
  
  styleSheet.textContent = css;
  document.head.appendChild(styleSheet);
}

// History management
const HISTORY_KEY = 'custom-scrollbar-styler-history';
const MAX_HISTORY = 10;

export function saveToHistory(styles: ScrollbarStyles): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getHistory();
    history.unshift({ styles, timestamp: Date.now() });
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

export function getHistory(): Array<{ styles: ScrollbarStyles; timestamp: number }> {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}
