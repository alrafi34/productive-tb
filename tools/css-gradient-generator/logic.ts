export interface ColorStop {
  color: string;
  position: number;
}

export function generateLinearGradient(angle: number, stops: ColorStop[]): string {
  const stopsStr = stops.map(s => `${s.color} ${s.position}%`).join(', ');
  return `linear-gradient(${angle}deg, ${stopsStr})`;
}

export function generateRadialGradient(shape: string, stops: ColorStop[]): string {
  const stopsStr = stops.map(s => `${s.color} ${s.position}%`).join(', ');
  return `radial-gradient(${shape}, ${stopsStr})`;
}

export function reverseStops(stops: ColorStop[]): ColorStop[] {
  return stops.map(s => ({ ...s, position: 100 - s.position })).reverse();
}

export function generateRandomGradient(): ColorStop[] {
  const count = Math.floor(Math.random() * 3) + 2;
  return Array.from({ length: count }, (_, i) => ({
    color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
    position: (i / (count - 1)) * 100
  }));
}

export const PRESETS = {
  sunset: [{ color: '#FF512F', position: 0 }, { color: '#F09819', position: 100 }],
  ocean: [{ color: '#2E3192', position: 0 }, { color: '#1BFFFF', position: 100 }],
  purple: [{ color: '#C33764', position: 0 }, { color: '#1D2671', position: 100 }],
  fire: [{ color: '#F00000', position: 0 }, { color: '#DC281E', position: 100 }],
  pastel: [{ color: '#FFE6FA', position: 0 }, { color: '#C5E1FF', position: 100 }]
};
