export interface Shadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

export function generateShadowCSS(shadow: Shadow): string {
  const rgba = hexToRgba(shadow.color, shadow.opacity);
  const inset = shadow.inset ? 'inset ' : '';
  return `${inset}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${rgba}`;
}

export function generateMultipleShadows(shadows: Shadow[]): string {
  return shadows.map(s => generateShadowCSS(s)).join(', ');
}

export function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const PRESETS = {
  soft: { x: 0, y: 4, blur: 10, spread: 0, color: '#000000', opacity: 0.1, inset: false },
  material: { x: 0, y: 2, blur: 4, spread: 0, color: '#000000', opacity: 0.2, inset: false },
  deep: { x: 0, y: 10, blur: 30, spread: 0, color: '#000000', opacity: 0.3, inset: false },
  floating: { x: 0, y: 20, blur: 40, spread: -10, color: '#000000', opacity: 0.25, inset: false },
  neumorphism: { x: 8, y: 8, blur: 16, spread: 0, color: '#000000', opacity: 0.15, inset: false }
};
