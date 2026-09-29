/* Final exam maths. With the course grade so far g (%), the final's weight w
   (as a share of the whole course) and a final exam score f:
   course grade = g × (1 − w) + f × w. */

export function requiredFinal(current: number, weightPct: number, target: number): number | null {
  const w = weightPct / 100;
  if (!(w > 0) || w > 1) return null;
  return (target - current * (1 - w)) / w;
}

export function gradeWithFinal(current: number, weightPct: number, finalScore: number): number {
  const w = weightPct / 100;
  return current * (1 - w) + finalScore * w;
}

/* Common US letter-grade cut-offs; schools vary. */
export const LETTER_CUTOFFS: { letter: string; min: number }[] = [
  { letter: "A", min: 90 },
  { letter: "B", min: 80 },
  { letter: "C", min: 70 },
  { letter: "D", min: 60 },
];

export function letterFor(pct: number): string {
  return LETTER_CUTOFFS.find((c) => pct >= c.min)?.letter ?? "F";
}
