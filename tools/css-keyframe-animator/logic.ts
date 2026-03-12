import { Animation, Keyframe, KeyframeProperties, AnimationPreset } from './types';

// Generate unique ID
export function generateId(): string {
  return `kf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Default animation
export const DEFAULT_ANIMATION: Animation = {
  name: 'myAnimation',
  keyframes: [
    {
      id: generateId(),
      percent: 0,
      properties: { translateX: 0, translateY: 0, scale: 1, rotate: 0, opacity: 1 }
    },
    {
      id: generateId(),
      percent: 100,
      properties: { translateX: 0, translateY: 0, scale: 1, rotate: 0, opacity: 1 }
    }
  ],
  duration: 2,
  delay: 0,
  iterationCount: 'infinite',
  direction: 'normal',
  fillMode: 'none',
  timingFunction: 'ease'
};

// Animation presets
export const ANIMATION_PRESETS: AnimationPreset[] = [
  {
    id: 'fadeIn',
    name: 'Fade In',
    description: 'Smooth fade in effect',
    icon: '👁️',
    keyframes: [
      { id: generateId(), percent: 0, properties: { opacity: 0 } },
      { id: generateId(), percent: 100, properties: { opacity: 1 } }
    ]
  },
  {
    id: 'slideUp',
    name: 'Slide Up',
    description: 'Slide from bottom',
    icon: '⬆️',
    keyframes: [
      { id: generateId(), percent: 0, properties: { translateY: 50, opacity: 0 } },
      { id: generateId(), percent: 100, properties: { translateY: 0, opacity: 1 } }
    ]
  },
  {
    id: 'slideLeft',
    name: 'Slide Left',
    description: 'Slide from right',
    icon: '⬅️',
    keyframes: [
      { id: generateId(), percent: 0, properties: { translateX: 100, opacity: 0 } },
      { id: generateId(), percent: 100, properties: { translateX: 0, opacity: 1 } }
    ]
  },
  {
    id: 'bounce',
    name: 'Bounce',
    description: 'Bouncing effect',
    icon: '🏀',
    keyframes: [
      { id: generateId(), percent: 0, properties: { translateY: 0 } },
      { id: generateId(), percent: 25, properties: { translateY: -30 } },
      { id: generateId(), percent: 50, properties: { translateY: 0 } },
      { id: generateId(), percent: 75, properties: { translateY: -15 } },
      { id: generateId(), percent: 100, properties: { translateY: 0 } }
    ]
  },
  {
    id: 'rotate',
    name: 'Rotate',
    description: 'Full rotation',
    icon: '🔄',
    keyframes: [
      { id: generateId(), percent: 0, properties: { rotate: 0 } },
      { id: generateId(), percent: 100, properties: { rotate: 360 } }
    ]
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Scale pulse effect',
    icon: '💓',
    keyframes: [
      { id: generateId(), percent: 0, properties: { scale: 1 } },
      { id: generateId(), percent: 50, properties: { scale: 1.1 } },
      { id: generateId(), percent: 100, properties: { scale: 1 } }
    ]
  },
  {
    id: 'shake',
    name: 'Shake',
    description: 'Horizontal shake',
    icon: '📳',
    keyframes: [
      { id: generateId(), percent: 0, properties: { translateX: 0 } },
      { id: generateId(), percent: 25, properties: { translateX: -10 } },
      { id: generateId(), percent: 50, properties: { translateX: 10 } },
      { id: generateId(), percent: 75, properties: { translateX: -10 } },
      { id: generateId(), percent: 100, properties: { translateX: 0 } }
    ]
  },
  {
    id: 'swing',
    name: 'Swing',
    description: 'Pendulum swing',
    icon: '🎪',
    keyframes: [
      { id: generateId(), percent: 0, properties: { rotate: 0 } },
      { id: generateId(), percent: 20, properties: { rotate: 15 } },
      { id: generateId(), percent: 40, properties: { rotate: -10 } },
      { id: generateId(), percent: 60, properties: { rotate: 5 } },
      { id: generateId(), percent: 80, properties: { rotate: -5 } },
      { id: generateId(), percent: 100, properties: { rotate: 0 } }
    ]
  }
];

// Generate transform string from properties
export function generateTransform(props: KeyframeProperties): string {
  const transforms: string[] = [];
  
  if (props.translateX !== undefined) {
    transforms.push(`translateX(${props.translateX}px)`);
  }
  if (props.translateY !== undefined) {
    transforms.push(`translateY(${props.translateY}px)`);
  }
  if (props.scale !== undefined) {
    transforms.push(`scale(${props.scale})`);
  }
  if (props.rotate !== undefined) {
    transforms.push(`rotate(${props.rotate}deg)`);
  }
  
  return transforms.length > 0 ? transforms.join(' ') : 'none';
}

// Generate CSS for a single keyframe
export function generateKeyframeCSS(keyframe: Keyframe): string {
  const props: string[] = [];
  const { properties } = keyframe;
  
  // Transform properties
  const transform = generateTransform(properties);
  if (transform !== 'none') {
    props.push(`transform: ${transform}`);
  }
  
  // Other properties
  if (properties.opacity !== undefined) {
    props.push(`opacity: ${properties.opacity}`);
  }
  if (properties.backgroundColor) {
    props.push(`background-color: ${properties.backgroundColor}`);
  }
  if (properties.borderRadius !== undefined) {
    props.push(`border-radius: ${properties.borderRadius}px`);
  }
  if (properties.width !== undefined) {
    props.push(`width: ${properties.width}px`);
  }
  if (properties.height !== undefined) {
    props.push(`height: ${properties.height}px`);
  }
  
  return props.join('; ');
}

// Generate complete @keyframes CSS
export function generateKeyframesCSS(animation: Animation): string {
  const sortedKeyframes = [...animation.keyframes].sort((a, b) => a.percent - b.percent);
  
  let css = `@keyframes ${animation.name} {\n`;
  
  sortedKeyframes.forEach(keyframe => {
    const properties = generateKeyframeCSS(keyframe);
    if (properties) {
      css += `  ${keyframe.percent}% { ${properties}; }\n`;
    }
  });
  
  css += `}`;
  
  return css;
}

// Generate animation shorthand CSS
export function generateAnimationCSS(animation: Animation, selector: string = '.animated-element'): string {
  const iteration = animation.iterationCount === 'infinite' ? 'infinite' : animation.iterationCount;
  
  let css = `${selector} {\n`;
  css += `  animation-name: ${animation.name};\n`;
  css += `  animation-duration: ${animation.duration}s;\n`;
  
  if (animation.delay > 0) {
    css += `  animation-delay: ${animation.delay}s;\n`;
  }
  
  css += `  animation-timing-function: ${animation.timingFunction};\n`;
  css += `  animation-iteration-count: ${iteration};\n`;
  css += `  animation-direction: ${animation.direction};\n`;
  css += `  animation-fill-mode: ${animation.fillMode};\n`;
  css += `}`;
  
  return css;
}

// Generate complete CSS (keyframes + animation)
export function generateCompleteCSS(animation: Animation, selector: string = '.animated-element'): string {
  return generateKeyframesCSS(animation) + '\n\n' + generateAnimationCSS(animation, selector);
}

// Generate animation shorthand (single line)
export function generateAnimationShorthand(animation: Animation): string {
  const iteration = animation.iterationCount === 'infinite' ? 'infinite' : animation.iterationCount;
  return `animation: ${animation.name} ${animation.duration}s ${animation.timingFunction} ${animation.delay}s ${iteration} ${animation.direction} ${animation.fillMode};`;
}

// Generate SCSS mixin
export function generateSCSSMixin(animation: Animation): string {
  const keyframesCSS = generateKeyframesCSS(animation);
  const iteration = animation.iterationCount === 'infinite' ? 'infinite' : animation.iterationCount;
  
  let scss = `@mixin ${animation.name}($duration: ${animation.duration}s, $delay: ${animation.delay}s) {\n`;
  scss += `  animation-name: ${animation.name};\n`;
  scss += `  animation-duration: $duration;\n`;
  scss += `  animation-delay: $delay;\n`;
  scss += `  animation-timing-function: ${animation.timingFunction};\n`;
  scss += `  animation-iteration-count: ${iteration};\n`;
  scss += `  animation-direction: ${animation.direction};\n`;
  scss += `  animation-fill-mode: ${animation.fillMode};\n`;
  scss += `}\n\n`;
  scss += keyframesCSS;
  
  return scss;
}

// Export as JSON
export function exportAsJSON(animation: Animation): string {
  return JSON.stringify(animation, null, 2);
}

// Import from JSON
export function importFromJSON(json: string): Animation | null {
  try {
    const data = JSON.parse(json);
    // Validate structure
    if (data.name && Array.isArray(data.keyframes)) {
      return data as Animation;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Download file
export function downloadFile(content: string, filename: string, type: string = 'text/css'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Interpolate between two keyframes
export function interpolateKeyframes(kf1: Keyframe, kf2: Keyframe, percent: number): KeyframeProperties {
  const t = (percent - kf1.percent) / (kf2.percent - kf1.percent);
  const props: KeyframeProperties = {};
  
  const keys = new Set([
    ...Object.keys(kf1.properties),
    ...Object.keys(kf2.properties)
  ]) as Set<keyof KeyframeProperties>;
  
  keys.forEach(key => {
    const val1 = kf1.properties[key];
    const val2 = kf2.properties[key];
    
    if (typeof val1 === 'number' && typeof val2 === 'number') {
      props[key] = val1 + (val2 - val1) * t as any;
    } else if (val2 !== undefined) {
      props[key] = val2 as any;
    } else if (val1 !== undefined) {
      props[key] = val1 as any;
    }
  });
  
  return props;
}

// Get properties at specific percent
export function getPropertiesAtPercent(animation: Animation, percent: number): KeyframeProperties {
  const sorted = [...animation.keyframes].sort((a, b) => a.percent - b.percent);
  
  // Find surrounding keyframes
  let before: Keyframe | null = null;
  let after: Keyframe | null = null;
  
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].percent <= percent) {
      before = sorted[i];
    }
    if (sorted[i].percent >= percent && !after) {
      after = sorted[i];
    }
  }
  
  if (!before) return after?.properties || {};
  if (!after) return before.properties;
  if (before.percent === percent) return before.properties;
  if (after.percent === percent) return after.properties;
  
  return interpolateKeyframes(before, after, percent);
}

// Snap to grid
export function snapToGrid(value: number, gridSize: number = 5): number {
  return Math.round(value / gridSize) * gridSize;
}

// History management
const HISTORY_KEY = 'css-keyframe-animator-history';
const MAX_HISTORY = 10;

export function saveToHistory(animation: Animation): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getHistory();
    history.unshift({ animation, timestamp: Date.now() });
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

export function getHistory(): Array<{ animation: Animation; timestamp: number }> {
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
