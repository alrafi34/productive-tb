export interface BodyFatResult {
  percentage: number;
  category: string;
  colorClass: string;
  progressPercent: number;
}

export interface HistoryRecord {
  id: string;
  dateStr: string;
  timestamp: number;
  gender: 'male' | 'female';
  method: 'navy' | 'bmi';
  measurements: string;
  percentage: number;
  category: string;
  unit: 'metric' | 'imperial';
}

/* Body fat categories from the American Council on Exercise (ACE) chart:
   men essential 2–5%, athletes 6–13%, fitness 14–17%, average 18–24%,
   obese 25% and over; women 10–13%, 14–20%, 21–24%, 25–31%, 32% and over.
   Each range runs up to the next one's start, so 13.6% counts as athletes. */
export const BODY_FAT_SOURCE = "American Council on Exercise (ACE) body fat chart";

export const CATEGORIES = [
  {
    male: { min: 0, max: 6 },
    female: { min: 0, max: 14 },
    name: 'Essential fat',
    color: 'text-blue-500',
    bg: 'bg-blue-500'
  },
  {
    male: { min: 6, max: 14 },
    female: { min: 14, max: 21 },
    name: 'Athletes',
    color: 'text-teal-500',
    bg: 'bg-teal-500'
  },
  {
    male: { min: 14, max: 18 },
    female: { min: 21, max: 25 },
    name: 'Fitness',
    color: 'text-green-500',
    bg: 'bg-green-500'
  },
  {
    male: { min: 18, max: 25 },
    female: { min: 25, max: 32 },
    name: 'Average',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500'
  },
  {
    male: { min: 25, max: Infinity },
    female: { min: 32, max: Infinity },
    name: 'Obese',
    color: 'text-red-500',
    bg: 'bg-red-500'
  }
];

// US Navy Method - Male
export function calculateNavyMale(waistInches: number, neckInches: number, heightInches: number): number {
  if (waistInches <= 0 || neckInches <= 0 || heightInches <= 0) return 0;
  if (waistInches <= neckInches) return 0;
  
  const bodyFat = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76;
  if (!Number.isFinite(bodyFat)) return 0;
  return Math.max(0, Math.min(50, bodyFat)); // Cap between 0-50%
}

// US Navy Method - Female
export function calculateNavyFemale(waistInches: number, neckInches: number, hipInches: number, heightInches: number): number {
  if (waistInches <= 0 || neckInches <= 0 || hipInches <= 0 || heightInches <= 0) return 0;
  if ((waistInches + hipInches) <= neckInches) return 0;
  
  const bodyFat = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInches) - 78.387;
  if (!Number.isFinite(bodyFat)) return 0;
  return Math.max(0, Math.min(50, bodyFat)); // Cap between 0-50%
}

// BMI Method
export function calculateBMIBodyFat(bmi: number, age: number, gender: 'male' | 'female'): number {
  if (bmi <= 0 || age <= 0) return 0;
  
  const genderFactor = gender === 'male' ? 1 : 0;
  const bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * genderFactor) - 5.4;
  if (!Number.isFinite(bodyFat)) return 0;
  return Math.max(0, Math.min(50, bodyFat)); // Cap between 0-50%
}

// Get body fat category and styling
export function getBodyFatDetails(percentage: number, gender: 'male' | 'female'): BodyFatResult {
  if (percentage <= 0) return { 
    percentage: 0, 
    category: "-", 
    colorClass: "text-gray-500", 
    progressPercent: 0 
  };
  
  let match = CATEGORIES[CATEGORIES.length - 1]; // fallback to Obese
  for (const cat of CATEGORIES) {
    const range = cat[gender];
    if (percentage >= range.min && percentage < range.max) {
      match = cat;
      break;
    }
  }

  // Calculate progress percentage for visual bar (cap at 50% for scale)
  const maxVisualPercent = 50;
  const progressPercent = Math.min(100, Math.max(0, (percentage / maxVisualPercent) * 100));

  return {
    percentage: parseFloat(percentage.toFixed(1)),
    category: match.name,
    colorClass: match.color,
    progressPercent
  };
}

// Unit conversions
export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function calculateBMI(weightKg: number, heightM: number): number {
  if (heightM <= 0 || weightKg <= 0) return 0;
  return weightKg / (heightM * heightM);
}

export function lbToKg(lb: number): number {
  return lb / 2.20462;
}

export function kgToLb(kg: number): number {
  return kg * 2.20462;
}
