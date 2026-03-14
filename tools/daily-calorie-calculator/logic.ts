export interface CalorieResult {
  bmr: number;
  tdee: number;
  maintenance: number;
  weightLoss: {
    mild: number;
    moderate: number;
    aggressive: number;
  };
  weightGain: {
    mild: number;
    moderate: number;
  };
}

export interface MacroBreakdown {
  protein: { grams: number; calories: number; percentage: number };
  carbs: { grams: number; calories: number; percentage: number };
  fats: { grams: number; calories: number; percentage: number };
}

export interface HistoryRecord {
  id: string;
  dateStr: string;
  timestamp: number;
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  calories: number;
  unit: 'metric' | 'imperial';
}

export const ACTIVITY_LEVELS = [
  { value: 1.2, label: 'Sedentary', description: 'Little or no exercise' },
  { value: 1.375, label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
  { value: 1.55, label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
  { value: 1.725, label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
  { value: 1.9, label: 'Extremely Active', description: 'Very hard exercise, physical job' }
];

export const GOALS = [
  { value: 'loss-aggressive', label: 'Aggressive Weight Loss', description: '2 lbs/week', deficit: -1000 },
  { value: 'loss-moderate', label: 'Moderate Weight Loss', description: '1 lb/week', deficit: -500 },
  { value: 'loss-mild', label: 'Mild Weight Loss', description: '0.5 lbs/week', deficit: -250 },
  { value: 'maintenance', label: 'Maintain Weight', description: 'Stay current weight', deficit: 0 },
  { value: 'gain-mild', label: 'Mild Weight Gain', description: '0.5 lbs/week', deficit: 250 },
  { value: 'gain-moderate', label: 'Moderate Weight Gain', description: '1 lb/week', deficit: 500 }
];

// Mifflin-St Jeor Equation for BMR
export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (weight <= 0 || height <= 0 || age <= 0) return 0;
  
  // Convert to metric if needed (function expects kg and cm)
  const weightKg = weight;
  const heightCm = height;
  
  if (gender === 'male') {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }
}

// Calculate TDEE (Total Daily Energy Expenditure)
export function calculateTDEE(bmr: number, activityMultiplier: number): number {
  return bmr * activityMultiplier;
}

// Calculate all calorie recommendations
export function calculateCalorieNeeds(
  weight: number, 
  height: number, 
  age: number, 
  gender: 'male' | 'female', 
  activityMultiplier: number
): CalorieResult {
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityMultiplier);
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    maintenance: Math.round(tdee),
    weightLoss: {
      mild: Math.round(tdee - 250),
      moderate: Math.round(tdee - 500),
      aggressive: Math.round(tdee - 1000)
    },
    weightGain: {
      mild: Math.round(tdee + 250),
      moderate: Math.round(tdee + 500)
    }
  };
}

// Calculate macronutrient breakdown
export function calculateMacros(calories: number, goal: string): MacroBreakdown {
  let proteinPercent = 0.25; // 25% default
  let fatPercent = 0.25; // 25% default
  let carbPercent = 0.50; // 50% default
  
  // Adjust macros based on goal
  if (goal.includes('loss')) {
    proteinPercent = 0.30; // Higher protein for weight loss
    fatPercent = 0.25;
    carbPercent = 0.45;
  } else if (goal.includes('gain')) {
    proteinPercent = 0.25;
    fatPercent = 0.25;
    carbPercent = 0.50; // Higher carbs for weight gain
  }
  
  const proteinCalories = calories * proteinPercent;
  const fatCalories = calories * fatPercent;
  const carbCalories = calories * carbPercent;
  
  return {
    protein: {
      grams: Math.round(proteinCalories / 4), // 4 calories per gram
      calories: Math.round(proteinCalories),
      percentage: Math.round(proteinPercent * 100)
    },
    carbs: {
      grams: Math.round(carbCalories / 4), // 4 calories per gram
      calories: Math.round(carbCalories),
      percentage: Math.round(carbPercent * 100)
    },
    fats: {
      grams: Math.round(fatCalories / 9), // 9 calories per gram
      calories: Math.round(fatCalories),
      percentage: Math.round(fatPercent * 100)
    }
  };
}

// Unit conversions
export function lbToKg(lb: number): number {
  return lb / 2.20462;
}

export function kgToLb(kg: number): number {
  return kg * 2.20462;
}

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return inchesToCm((feet * 12) + inches);
}