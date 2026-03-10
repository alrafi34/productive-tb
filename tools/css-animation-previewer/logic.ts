import { AnimationSettings, CubicBezierPoints, AnimationPreset } from './types';

export const defaultSettings: AnimationSettings = {
  timingFunction: 'ease',
  duration: 1,
  delay: 0,
  iterationCount: 'infinite',
  direction: 'normal',
  animationType: 'translate'
};

export const defaultCubicBezier: CubicBezierPoints = {
  x1: 0.25,
  y1: 0.1,
  x2: 0.25,
  y2: 1
};

export const timingFunctions = [
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'cubic-bezier'
];

export const animationTypes = [
  { value: 'translate', label: 'Translate (Move)' },
  { value: 'scale', label: 'Scale' },
  { value: 'rotate', label: 'Rotate' },
  { value: 'fade', label: 'Fade' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'slide', label: 'Slide' }
];

export const animationPresets: AnimationPreset[] = [
  {
    name: 'Ease In Strong',
    timingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    description: 'Strong ease-in effect'
  },
  {
    name: 'Ease Out Strong',
    timingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    description: 'Strong ease-out effect'
  },
  {
    name: 'Bounce',
    timingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    description: 'Bouncy animation'
  },
  {
    name: 'Elastic',
    timingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    description: 'Elastic effect'
  },
  {
    name: 'Material Design',
    timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    description: 'Material Design standard'
  },
  {
    name: 'Smooth Entrance',
    timingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    description: 'Smooth entrance animation'
  }
];

export const generateAnimationCSS = (settings: AnimationSettings, cubicBezier: CubicBezierPoints): string => {
  const timingFunction = settings.timingFunction === 'cubic-bezier' 
    ? `cubic-bezier(${cubicBezier.x1}, ${cubicBezier.y1}, ${cubicBezier.x2}, ${cubicBezier.y2})`
    : settings.timingFunction;

  const animationName = `animate${settings.animationType.charAt(0).toUpperCase() + settings.animationType.slice(1)}`;
  
  return `animation: ${animationName} ${settings.duration}s ${timingFunction} ${settings.delay}s ${settings.iterationCount} ${settings.direction};

@keyframes ${animationName} {
  ${generateKeyframes(settings.animationType)}
}`;
};

export const generateKeyframes = (animationType: string): string => {
  switch (animationType) {
    case 'translate':
      return `from { transform: translateX(0); }
  to { transform: translateX(300px); }`;
    case 'scale':
      return `from { transform: scale(1); }
  to { transform: scale(1.5); }`;
    case 'rotate':
      return `from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }`;
    case 'fade':
      return `from { opacity: 1; }
  to { opacity: 0.3; }`;
    case 'bounce':
      return `0% { transform: translateY(0); }
  50% { transform: translateY(-50px); }
  100% { transform: translateY(0); }`;
    case 'slide':
      return `from { transform: translateX(-100px); }
  to { transform: translateX(100px); }`;
    default:
      return `from { transform: translateX(0); }
  to { transform: translateX(300px); }`;
  }
};

export const parseCubicBezier = (timingFunction: string): CubicBezierPoints | null => {
  const match = timingFunction.match(/cubic-bezier\(([^)]+)\)/);
  if (match) {
    const values = match[1].split(',').map(v => parseFloat(v.trim()));
    if (values.length === 4) {
      return {
        x1: values[0],
        y1: values[1],
        x2: values[2],
        y2: values[3]
      };
    }
  }
  return null;
};

export const generateCurvePoints = (cubicBezier: CubicBezierPoints, steps: number = 100): Array<{x: number, y: number}> => {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = 3 * (1 - t) * (1 - t) * t * cubicBezier.x1 + 3 * (1 - t) * t * t * cubicBezier.x2 + t * t * t;
    const y = 3 * (1 - t) * (1 - t) * t * cubicBezier.y1 + 3 * (1 - t) * t * t * cubicBezier.y2 + t * t * t;
    points.push({ x, y });
  }
  return points;
};