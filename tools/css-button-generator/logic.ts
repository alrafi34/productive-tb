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
}

button:focus-visible {
  outline: 2px solid ${state.bgColor === 'transparent' ? state.textColor : state.bgColor};
  outline-offset: 2px;
}`;
}

/* Tailwind classes matching the CSS above exactly, using arbitrary values
   ([#hex], [px]) wherever there is no built-in utility. */
export function generateTailwindClasses(state: ButtonState): string {
  const color = (c: string) => (c === 'transparent' ? 'transparent' : `[${c}]`);
  const shadowMap: Record<ButtonState['shadow'], string> = {
    none: 'shadow-none', small: 'shadow-sm', medium: 'shadow-md', large: 'shadow-lg',
  };
  const classes = [
    `bg-${color(state.bgColor)}`,
    `text-${color(state.textColor)}`,
    `text-[${state.fontSize}px]`,
    `py-[${state.paddingY}px]`,
    `px-[${state.paddingX}px]`,
    state.borderRadius >= 999 ? 'rounded-full' : `rounded-[${state.borderRadius}px]`,
    shadowMap[state.shadow],
    `hover:bg-${color(state.hoverBg)}`,
    'transition-all',
    `duration-[${state.transition}ms]`,
    'cursor-pointer',
    `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color(state.bgColor === 'transparent' ? state.textColor : state.bgColor)}`,
  ];
  if (state.borderWidth > 0 && state.borderStyle !== 'none') {
    classes.push(`border-[${state.borderWidth}px]`, `border-${state.borderStyle}`, `border-${color(state.borderColor)}`);
  }
  return classes.join(' ');
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