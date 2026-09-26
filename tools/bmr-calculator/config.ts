export const toolConfig = {
  slug: "bmr-calculator",
  name: "BMR Calculator",
  description: "Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) instantly.",
  category: "health",
  icon: "🔥",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "Is BMR the same as RMR?", a: "BMR (Basal Metabolic Rate) and RMR (Resting Metabolic Rate) are similar but not identical. BMR is measured under strict conditions, while RMR is more practical and typically 10-20% higher." },
      { q: "How accurate is the Mifflin-St Jeor equation?", a: "The Mifflin-St Jeor equation is considered the most accurate predictive equation, with about 90% accuracy for healthy individuals. However, individual variations can occur due to genetics, body composition, and health conditions." },
      { q: "Should I eat exactly my BMR calories?", a: "No, you should eat according to your TDEE, not BMR. BMR only accounts for basic functions, while TDEE includes all daily activities. Eating only BMR calories would be too restrictive for most people." },
    ],
    title: "BMR Calculator – Basal Metabolic Rate & Daily Calories",
    description: "Calculate your basal metabolic rate (BMR) and daily energy needs (TDEE) from age, sex, height, weight and activity, in metric or imperial units.",
    keywords: [
      "bmr calculator",
      "basal metabolic rate",
      "tdee calculator",
      "daily calorie needs",
      "metabolism calculator",
      "calorie calculator",
      "bmr formula",
      "mifflin st jeor equation",
      "daily energy expenditure",
      "caloric needs calculator"
    ],
    openGraph: {
      title: "BMR Calculator - Calculate Basal Metabolic Rate Online",
      description: "Calculate your BMR and TDEE instantly. Free online tool with unit conversion and activity level adjustment.",
      type: "website",
      url: "/tools/health/bmr-calculator"
    }
  },
  features: [
    "Calculate BMR using Mifflin-St Jeor equation",
    "Estimate Total Daily Energy Expenditure (TDEE)",
    "Support for metric and imperial units",
    "Activity level adjustment for accurate calorie needs",
    "Real-time calculation as you type",
    "Copy results to clipboard",
    "Save calculation history locally"
  ]
};