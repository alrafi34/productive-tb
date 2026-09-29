/* Daily calorie and macronutrient targets. Energy needs use the
   Mifflin–St Jeor equation times an activity factor; the macro split is a
   percentage of calories: protein and carbohydrate 4 kcal/g, fat 9 kcal/g. */

export type Sex = "male" | "female";

export const ACTIVITY = {
  sedentary: { label: "Sedentary (desk job, little exercise)", factor: 1.2 },
  light: { label: "Light (exercise 1–3 days a week)", factor: 1.375 },
  moderate: { label: "Moderate (exercise 3–5 days a week)", factor: 1.55 },
  active: { label: "Active (hard exercise 6–7 days a week)", factor: 1.725 },
  veryActive: { label: "Very active (physical job or twice a day)", factor: 1.9 },
} as const;
export type Activity = keyof typeof ACTIVITY;

export const GOALS = {
  lose: { label: "Lose weight (−20%)", adjust: -0.2 },
  mildLose: { label: "Lose slowly (−10%)", adjust: -0.1 },
  maintain: { label: "Maintain weight", adjust: 0 },
  gain: { label: "Build muscle (+10%)", adjust: 0.1 },
} as const;
export type Goal = keyof typeof GOALS;

/* Share of calories from protein / carbohydrate / fat, % */
export const SPLITS = {
  balanced: { label: "Balanced", protein: 30, carbs: 40, fat: 30 },
  highProtein: { label: "High protein", protein: 40, carbs: 30, fat: 30 },
  lowCarb: { label: "Low carb", protein: 40, carbs: 20, fat: 40 },
  keto: { label: "Keto", protein: 25, carbs: 5, fat: 70 },
  highCarb: { label: "High carb (endurance)", protein: 20, carbs: 55, fat: 25 },
} as const;
export type Split = keyof typeof SPLITS | "custom";

export function bmrMifflin(sex: Sex, kg: number, cm: number, age: number): number {
  return 10 * kg + 6.25 * cm - 5 * age + (sex === "male" ? 5 : -161);
}

export type Macros = {
  bmr: number;
  tdee: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  proteinPerKg: number;
};

export function macros(
  sex: Sex,
  kg: number,
  cm: number,
  age: number,
  activity: Activity,
  goal: Goal,
  pct: { protein: number; carbs: number; fat: number },
): Macros {
  const bmr = bmrMifflin(sex, kg, cm, age);
  const tdee = bmr * ACTIVITY[activity].factor;
  const calories = tdee * (1 + GOALS[goal].adjust);
  const proteinG = (calories * pct.protein) / 100 / 4;
  return {
    bmr,
    tdee,
    calories,
    proteinG,
    carbsG: (calories * pct.carbs) / 100 / 4,
    fatG: (calories * pct.fat) / 100 / 9,
    proteinPerKg: kg > 0 ? proteinG / kg : 0,
  };
}

export const LB_PER_KG = 2.20462;
export const CM_PER_IN = 2.54;
