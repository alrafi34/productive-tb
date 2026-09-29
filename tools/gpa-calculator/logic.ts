/* US 4.0 grade point average. Letter grades map to grade points; the GPA is
   the credit-weighted average. Weighted GPA adds a bonus for honors and
   AP/IB classes, as many US high schools do. */

export const GRADES: { letter: string; points: number }[] = [
  { letter: "A+", points: 4.0 },
  { letter: "A", points: 4.0 },
  { letter: "A-", points: 3.7 },
  { letter: "B+", points: 3.3 },
  { letter: "B", points: 3.0 },
  { letter: "B-", points: 2.7 },
  { letter: "C+", points: 2.3 },
  { letter: "C", points: 2.0 },
  { letter: "C-", points: 1.7 },
  { letter: "D+", points: 1.3 },
  { letter: "D", points: 1.0 },
  { letter: "D-", points: 0.7 },
  { letter: "F", points: 0 },
];

export const LEVELS = {
  regular: { label: "Regular", bonus: 0 },
  honors: { label: "Honors", bonus: 0.5 },
  ap: { label: "AP / IB / college", bonus: 1.0 },
} as const;
export type Level = keyof typeof LEVELS;

export type Course = { name: string; grade: string; credits: number; level: Level };

export function gradePoints(letter: string, aPlusIs43 = false): number | null {
  if (letter === "A+" && aPlusIs43) return 4.3;
  return GRADES.find((g) => g.letter === letter)?.points ?? null;
}

export type GpaResult = { unweighted: number; weighted: number; credits: number; qualityPoints: number };

/* Courses without a grade or credits are ignored. F counts with 0 points. */
export function calculateGpa(courses: Course[], aPlusIs43 = false): GpaResult | null {
  let credits = 0;
  let quality = 0;
  let weightedQuality = 0;
  for (const c of courses) {
    const p = gradePoints(c.grade, aPlusIs43);
    if (p === null || !(c.credits > 0)) continue;
    credits += c.credits;
    quality += p * c.credits;
    // No bonus on an F
    weightedQuality += (p > 0 ? p + LEVELS[c.level].bonus : 0) * c.credits;
  }
  if (credits === 0) return null;
  return { unweighted: quality / credits, weighted: weightedQuality / credits, credits, qualityPoints: quality };
}

/* New cumulative GPA after this term, from the GPA and credits so far. */
export function cumulativeGpa(priorGpa: number, priorCredits: number, term: GpaResult): number {
  const total = priorCredits + term.credits;
  return total > 0 ? (priorGpa * priorCredits + term.qualityPoints) / total : 0;
}
