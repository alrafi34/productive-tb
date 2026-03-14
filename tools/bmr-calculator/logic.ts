export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
export type UnitSystem = 'metric' | 'imperial';

export interface BMRResult {
  bmr: number;
  tdee: number;
  activityFactor: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  unitSystem: UnitSystem;
  bmr: number;
  tdee: number;
}

const ACTIVITY_FACTORS = {
  sedentary: 1.2,      // Little/no exercise
  light: 1.375,        // 1-3 days/week
  moderate: 1.55,      // 3-5 days/week
  active: 1.725,       // 6-7 days/week
  'very-active': 1.9   // Intense daily exercise
};

export const ACTIVITY_DESCRIPTIONS = {
  sedentary: 'Little/no exercise',
  light: '1-3 days/week',
  moderate: '3-5 days/week',
  active: '6-7 days/week',
  'very-active': 'Intense daily exercise'
};

// Mifflin-St Jeor Equation
export function calculateBMR(
  weight: number, // kg for metric, lbs for imperial
  height: number, // cm for metric, inches for imperial
  age: number,
  gender: Gender,
  unitSystem: UnitSystem
): number {
  let weightKg = weight;
  let heightCm = height;

  // Convert to metric if imperial
  if (unitSystem === 'imperial') {
    weightKg = weight * 0.453592; // lbs to kg
    heightCm = height * 2.54;     // inches to cm
  }

  // Mifflin-St Jeor equation
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  return Math.round(bmr);
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const factor = ACTIVITY_FACTORS[activityLevel];
  return Math.round(bmr * factor);
}

export function calculateBMRAndTDEE(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel,
  unitSystem: UnitSystem
): BMRResult {
  const bmr = calculateBMR(weight, height, age, gender, unitSystem);
  const tdee = calculateTDEE(bmr, activityLevel);
  const activityFactor = ACTIVITY_FACTORS[activityLevel];

  return { bmr, tdee, activityFactor };
}

// Unit conversion helpers
export function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

export function kgToLbs(kg: number): number {
  return kg / 0.453592;
}

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

// History management
const HISTORY_KEY = 'bmr-calculator-history';
const MAX_HISTORY = 10;

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: HistoryEntry): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const newHistory = [entry, ...history.slice(0, MAX_HISTORY - 1)];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch {
    // Ignore storage errors
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function deleteHistoryEntry(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const filtered = history.filter(entry => entry.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  } catch {
    // Ignore storage errors
  }
}

// Format results for display
export function formatResult(value: number): string {
  return value.toLocaleString();
}

// Generate copy text
export function generateCopyText(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel,
  unitSystem: UnitSystem,
  result: BMRResult
): string {
  const weightUnit = unitSystem === 'metric' ? 'kg' : 'lbs';
  const heightUnit = unitSystem === 'metric' ? 'cm' : 'inches';
  
  return `BMR Calculator Results:
Weight: ${weight} ${weightUnit}
Height: ${height} ${heightUnit}
Age: ${age} years
Gender: ${gender}
Activity Level: ${activityLevel} (${ACTIVITY_DESCRIPTIONS[activityLevel]})

BMR: ${formatResult(result.bmr)} kcal/day
TDEE: ${formatResult(result.tdee)} kcal/day
Activity Factor: ${result.activityFactor}x`;
}