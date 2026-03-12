export interface BmiResult {
  bmi: number;
  category: string;
  colorClass: string;
  progressPercent: number;
}

export interface WeightRange {
  min: number;
  max: number;
}

export interface IdealWeight {
  robinson: number;
  devine: number;
}

export interface HistoryRecord {
  id: string;
  dateStr: string;
  timestamp: number;
  heightRaw: string;
  weightRaw: string;
  bmi: number;
  category: string;
  unit: 'metric' | 'imperial';
}

const CATEGORIES = [
  { max: 18.5, name: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-500' },
  { max: 25.0, name: 'Normal Weight', color: 'text-green-500', bg: 'bg-green-500' },
  { max: 30.0, name: 'Overweight', color: 'text-yellow-500', bg: 'bg-yellow-500' },
  { max: Infinity, name: 'Obese', color: 'text-red-500', bg: 'bg-red-500' }
];

// Returns calculated BMI using metric units 
export function calculateBmiValue(weightKg: number, heightM: number): number {
  if (heightM <= 0 || weightKg <= 0) return 0;
  return weightKg / (heightM * heightM);
}

// Converts generic BMI number into object with details
export function getBmiDetails(bmi: number): BmiResult {
  if (bmi <= 0) return { bmi: 0, category: "-", colorClass: "text-gray-500", progressPercent: 0 };
  
  let match = CATEGORIES[CATEGORIES.length - 1]; // fallback to Obese
  for (const cat of CATEGORIES) {
    if (bmi < cat.max) {
      match = cat;
      break;
    }
  }

  // Calculate generic progress percentage for the bar (cap at BMI 45 for visual scale)
  const maxVisualBmi = 45;
  const progressPercent = Math.min(100, Math.max(0, (bmi / maxVisualBmi) * 100));

  return {
    bmi: parseFloat(bmi.toFixed(2)),
    category: match.name,
    colorClass: match.color,
    progressPercent
  };
}

export function getHealthyWeightRange(heightM: number): WeightRange {
  if (heightM <= 0) return { min: 0, max: 0 };
  // Healthy BMI range: 18.5 to 24.9
  return {
    min: parseFloat((18.5 * (heightM * heightM)).toFixed(1)),
    max: parseFloat((24.9 * (heightM * heightM)).toFixed(1))
  };
}

// Height is strictly in Inches for these standard medical formulas
export function calculateIdealWeight(heightInches: number, gender: 'male' | 'female'): IdealWeight {
  if (heightInches < 60) return { robinson: 0, devine: 0 }; // Formulas apply basically to height >= 5 feet (60 inches)

  const inchesOver5Ft = heightInches - 60;
  
  // Devine formula
  const devineMale = 50.0 + 2.3 * inchesOver5Ft;
  const devineFemale = 45.5 + 2.3 * inchesOver5Ft;
  
  // Robinson formula
  const robinsonMale = 52.0 + 1.9 * inchesOver5Ft;
  const robinsonFemale = 49.0 + 1.7 * inchesOver5Ft;

  return {
    devine: parseFloat((gender === 'male' ? devineMale : devineFemale).toFixed(1)),
    robinson: parseFloat((gender === 'male' ? robinsonMale : robinsonFemale).toFixed(1))
  };
}

export function kgToLb(kg: number): number {
  return kg * 2.20462;
}

export function lbToKg(lb: number): number {
  return lb / 2.20462;
}

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}
