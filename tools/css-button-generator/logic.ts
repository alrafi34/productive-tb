export interface ButtonState {
  text: string;
  bgColor: string;
  textColor: string;
  fontSize: number;
  paddingY: number;
  paddingX: number;
  borderRadius: number;
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  borderColor: string;
  shadow: 'none' | 'small' | 'medium' | 'large';
  hoverBg: string;
  transition: number;
}

export const defaultState: ButtonState = {
  text: "Click Me",
  bgColor: "#3b82f6",
  textColor: "#ffffff",
  fontSize: 16,
  paddingY: 10,
  paddingX: 20,
  borderRadius: 8,
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: "#000000",
  shadow: 'medium',
  hoverBg: "#2563eb",
  transition: 200
};

export function generateCSS(state: ButtonState): string {
  const shadowValues = {
    none: 'none',
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  };

  const borderCSS = state.borderWidth > 0 
    ? `border: ${state.borderWidth}px ${state.borderStyle} ${state.borderColor};`
    : '';

  return `button {
  background: ${state.bgColor};
  color: ${state.textColor};
  font-size: ${state.fontSize}px;
  padding: ${state.paddingY}px ${state.paddingX}px;
  border-radius: ${state.borderRadius}px;
  ${borderCSS}
  box-shadow: ${shadowValues[state.shadow]};
  transition: all ${state.transition}ms ease;
  cursor: pointer;
}

button:hover {
  background: ${state.hoverBg};
}`;
}

export function generateTailwindClasses(state: ButtonState): string {
  const colorMap: Record<string, string> = {
    '#3b82f6': 'bg-blue-500',
    '#ef4444': 'bg-red-500',
    '#10b981': 'bg-emerald-500',
    '#f59e0b': 'bg-amber-500',
    '#8b5cf6': 'bg-violet-500',
    '#ec4899': 'bg-pink-500',
    '#6b7280': 'bg-gray-500',
    '#000000': 'bg-black',
    '#ffffff': 'bg-white'
  };

  const textColorMap: Record<string, string> = {
    '#ffffff': 'text-white',
    '#000000': 'text-black',
    '#374151': 'text-gray-700',
    '#6b7280': 'text-gray-500'
  };

  const paddingXMap: Record<number, string> = {
    8: 'px-2', 12: 'px-3', 16: 'px-4', 20: 'px-5', 24: 'px-6', 32: 'px-8'
  };

  const paddingYMap: Record<number, string> = {
    4: 'py-1', 8: 'py-2', 10: 'py-2.5', 12: 'py-3', 16: 'py-4'
  };

  const radiusMap: Record<number, string> = {
    0: 'rounded-none', 4: 'rounded', 6: 'rounded-md', 8: 'rounded-lg',
    12: 'rounded-xl', 16: 'rounded-2xl', 24: 'rounded-3xl', 999: 'rounded-full'
  };

  const shadowMap: Record<string, string> = {
    none: '', small: 'shadow-sm', medium: 'shadow-md', large: 'shadow-lg'
  };

  const classes = [];
  
  classes.push(colorMap[state.bgColor] || 'bg-blue-500');
  classes.push(textColorMap[state.textColor] || 'text-white');
  classes.push(paddingXMap[state.paddingX] || 'px-5');
  classes.push(paddingYMap[state.paddingY] || 'py-2');
  classes.push(radiusMap[state.borderRadius] || 'rounded-lg');
  
  if (state.shadow !== 'none') {
    classes.push(shadowMap[state.shadow]);
  }
  
  classes.push('transition');
  
  if (state.borderWidth > 0) {
    classes.push(`border-${state.borderWidth}`);
    classes.push('border-gray-300');
  }

  return classes.filter(Boolean).join(' ');
}

export function generateDarkerColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  const darkerR = Math.max(0, Math.floor(r * 0.8));
  const darkerG = Math.max(0, Math.floor(g * 0.8));
  const darkerB = Math.max(0, Math.floor(b * 0.8));
  
  return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
}

export const buttonPresets = {
  primary: {
    bgColor: "#3b82f6",
    textColor: "#ffffff",
    hoverBg: "#2563eb",
    borderRadius: 8,
    shadow: 'medium' as const
  },
  success: {
    bgColor: "#10b981",
    textColor: "#ffffff", 
    hoverBg: "#059669",
    borderRadius: 8,
    shadow: 'medium' as const
  },
  danger: {
    bgColor: "#ef4444",
    textColor: "#ffffff",
    hoverBg: "#dc2626", 
    borderRadius: 8,
    shadow: 'medium' as const
  },
  ghost: {
    bgColor: "transparent",
    textColor: "#374151",
    hoverBg: "#f3f4f6",
    borderRadius: 8,
    shadow: 'none' as const
  },
  pill: {
    bgColor: "#8b5cf6",
    textColor: "#ffffff",
    hoverBg: "#7c3aed",
    borderRadius: 999,
    shadow: 'small' as const
  }
};