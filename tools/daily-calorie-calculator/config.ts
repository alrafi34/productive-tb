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
    howToSteps: [
      { name: "Choose metric or imperial units", text: "Choose metric or imperial units." },
      { name: "Enter your age", text: "Enter your age, sex, weight, and height." },
      { name: "Select the activity level that matches your weekly movement", text: "Select the activity level that matches your weekly movement." },
      { name: "Pick your goal", text: "Pick your goal: loss, maintenance, or gain." },
      { name: "Review your target daily calories plus BMR and TDEE", text: "Review your target daily calories plus BMR and TDEE." },
      { name: "Use macro grams to plan meals and track consistency", text: "Use macro grams to plan meals and track consistency." },
      { name: "Save results in local history and compare over time", text: "Save results in local history and compare over time." },
    ],
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