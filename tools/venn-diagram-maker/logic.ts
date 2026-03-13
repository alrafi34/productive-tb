export interface Circle {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  label: string;
}

export interface VennState {
  circles: Circle[];
  intersectionLabels: { [key: string]: string };
  selectedCircleId: string | null;
  history: VennState[];
  historyIndex: number;
  theme: "light" | "dark";
}

export const createCircle = (x: number, y: number, label: string): Circle => ({
  id: `circle-${Date.now()}-${Math.random()}`,
  x,
  y,
  radius: 80,
  color: "#3b82f6",
  opacity: 0.5,
  label
});

export const getCircleCenter = (circle: Circle) => ({
  x: circle.x,
  y: circle.y
});

export const isPointInCircle = (px: number, py: number, circle: Circle): boolean => {
  const dx = px - circle.x;
  const dy = py - circle.y;
  return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
};

export const getCircleIntersectionPoint = (c1: Circle, c2: Circle): { x: number; y: number } => {
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance === 0) return { x: c1.x, y: c1.y };
  
  const t = (c1.radius * c1.radius - c2.radius * c2.radius + distance * distance) / (2 * distance);
  const x = c1.x + (t * dx) / distance;
  const y = c1.y + (t * dy) / distance;
  
  return { x, y };
};

export const calculateIntersectionArea = (c1: Circle, c2: Circle): number => {
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance >= c1.radius + c2.radius) return 0;
  if (distance <= Math.abs(c1.radius - c2.radius)) {
    const r = Math.min(c1.radius, c2.radius);
    return Math.PI * r * r;
  }
  
  const r1 = c1.radius;
  const r2 = c2.radius;
  const d = distance;
  
  const part1 = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1));
  const part2 = r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2));
  const part3 = 0.5 * Math.sqrt((r1 + r2 + d) * (r1 + r2 - d) * (r1 - r2 + d) * (-r1 + r2 + d));
  
  return part1 + part2 - part3;
};

export const circlesOverlap = (c1: Circle, c2: Circle): boolean => {
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < c1.radius + c2.radius && distance > Math.abs(c1.radius - c2.radius);
};

export const exportAsJSON = (state: VennState): string => {
  return JSON.stringify({
    circles: state.circles,
    intersectionLabels: state.intersectionLabels
  }, null, 2);
};

export const importFromJSON = (json: string): { circles: Circle[]; intersectionLabels: { [key: string]: string } } | null => {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
};
