export const toolConfig = {
  slug: "daily-calorie-calculator",
  name: "Daily Calorie Calculator",
  description: "Calculate daily calorie needs for maintenance, weight loss, or weight gain based on your activity level.",
  category: "calculator",
  icon: "🍎",
  free: true,
  backend: false,
  seo: {
    title: "Calorie Calculator – Daily Calories to Lose or Gain Weight",
    description: "Calculate how many calories you need each day to maintain, lose or gain weight, based on your age, sex, height, weight and activity level.",
    keywords: [
      "daily calorie calculator",
      "calorie needs calculator",
      "tdee calculator",
      "weight loss calories",
      "maintenance calories",
      "calorie deficit calculator",
      "daily energy expenditure",
      "calorie requirements"
    ],
    openGraph: {
      title: "Daily Calorie Calculator - Calculate Your Calorie Needs",
      description: "Calculate your daily calorie requirements for weight maintenance, loss, or gain with personalized recommendations.",
      type: "website",
      url: "/tools/daily-calorie-calculator"
    },
    faq: [
      { q: "What is a daily calorie calculator?", a: "It is a tool that estimates your daily calorie needs for goals like fat loss, maintenance, or weight gain based on your profile and activity level." },
      { q: "What is the difference between BMR and TDEE?", a: "BMR reflects calories needed at complete rest. TDEE includes your total daily activity and is more useful for setting calorie intake." },
      { q: "How many calories should I cut to lose weight?", a: "A deficit of about 250 to 500 calories per day is common for steady progress. Aggressive deficits can work short-term but may be harder to sustain." },
      { q: "Does this tool also estimate macros?", a: "Yes. It calculates protein, carbs, and fats in both calories and grams to make your nutrition target easier to execute." },
      { q: "Is my data private?", a: "Calculations run in-browser. Saved history is kept in local storage on your device and can be cleared at any time." },
      { q: "Is this tool enough for medical nutrition planning?", a: "No. Use it as a baseline estimator. For medical or therapeutic plans, work with a licensed professional." },
    ],
  },
  features: [
    "Calculate Total Daily Energy Expenditure (TDEE) using Mifflin-St Jeor equation",
    "Personalized calorie recommendations for weight loss, maintenance, and gain",
    "Multiple activity level options from sedentary to very active",
    "Visual breakdown of calorie distribution and macronutrient suggestions",
    "Goal-based calorie adjustments with safe deficit/surplus recommendations",
    "Save and track your calorie calculations with local history"
  ]
};