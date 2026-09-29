/* One-rep max (1RM) estimates from a set of several reps. The formulas are
   most reliable up to about 10 reps; above that they drift apart. */

export const FORMULAS: { name: string; estimate: (w: number, r: number) => number }[] = [
  { name: "Epley", estimate: (w, r) => (r === 1 ? w : w * (1 + r / 30)) },
  { name: "Brzycki", estimate: (w, r) => (w * 36) / (37 - r) },
  { name: "Lander", estimate: (w, r) => (100 * w) / (101.3 - 2.67123 * r) },
  { name: "Lombardi", estimate: (w, r) => w * Math.pow(r, 0.1) },
  { name: "Mayhew", estimate: (w, r) => (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r)) },
  { name: "O'Conner", estimate: (w, r) => w * (1 + 0.025 * r) },
  { name: "Wathan", estimate: (w, r) => (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r)) },
];

export type Estimate = { name: string; value: number };

export function estimates(weight: number, reps: number): Estimate[] {
  if (!(weight > 0) || !(reps >= 1)) return [];
  if (reps === 1) return FORMULAS.map((f) => ({ name: f.name, value: weight }));
  return FORMULAS.map((f) => ({ name: f.name, value: f.estimate(weight, reps) }));
}

export function average(list: Estimate[]): number {
  return list.length ? list.reduce((s, e) => s + e.value, 0) / list.length : 0;
}

/* Reps you can expect at a percentage of 1RM, from the Epley formula
   solved for reps: r = 30 × (1RM ÷ w − 1). */
export function repsAtPercent(pct: number): number {
  return Math.max(1, Math.round(30 * (100 / pct - 1)));
}

export const PERCENTAGES = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

/* Round to the nearest loadable weight: 2.5 kg or 5 lb steps */
export function roundToPlate(value: number, unit: "kg" | "lb"): number {
  const step = unit === "kg" ? 2.5 : 5;
  return Math.round(value / step) * step;
}
