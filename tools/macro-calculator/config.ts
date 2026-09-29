import { siteConfig } from "@/config/site";

export const macroCalculatorConfig = {
  name: "Macro Calculator",
  description: "Calculate your daily calories and grams of protein, carbs and fat for weight loss, maintenance or muscle gain.",
  icon: "🥗",
  category: "health",
  slug: "macro-calculator",
  seo: {
    title: "Macro Calculator – Protein, Carbs & Fat per Day",
    description: "Get daily calories and grams of protein, carbs and fat for your goal. Balanced, high-protein, low-carb, keto or custom split, per day and per meal. kg or lb.",
    keywords: [
      "macro calculator",
      "macronutrient calculator",
      "iifym calculator",
      "protein calculator",
      "keto macro calculator",
      "macros for weight loss",
      "how many macros do i need",
      "calorie and macro calculator",
      "carb calculator",
      "fat loss macro calculator",
    ],
    og: {
      title: "Macro Calculator – Protein, Carbs & Fat per Day",
      description: "Get daily calories and grams of protein, carbs and fat for your goal. Balanced, high-protein, low-carb, keto or custom split, per day and per meal. kg or lb.",
      url: `${siteConfig.url}/tools/health/macro-calculator`,
    },
    howToSteps: [
      { name: "Enter your details", text: "Choose your sex and units (kg and cm, or lb and feet), then enter your age, weight and height." },
      { name: "Choose your activity level", text: "Pick the level that matches your usual week, from sedentary to very active." },
      { name: "Set your goal", text: "Choose lose weight (20% below maintenance), lose slowly (10% below), maintain, or build muscle (10% above)." },
      { name: "Pick a diet split", text: "Choose balanced, high protein, low carb, keto, high carb, or enter your own percentages that add up to 100%." },
      { name: "Read your macros", text: "See your daily calories and grams of protein, carbs and fat, split into 3, 4 or 5 meals, plus your protein per kg or lb of body weight." },
    ],
    faq: [
      { q: "How are macros calculated?", a: "First your maintenance calories: basal metabolic rate from the Mifflin–St Jeor equation times an activity factor. Then the goal adjustment, and finally the split: protein and carbohydrate have 4 kcal per gram and fat 9 kcal per gram. A 30-year-old man weighing 80 kg (176 lb), 180 cm (5 ft 11 in) tall and moderately active needs about 2,760 kcal to maintain weight; a 30/40/30 split is about 207 g protein, 276 g carbs and 92 g fat." },
      { q: "Which macro split is best?", a: "For weight loss, the total calories matter most; the best split is one you can stick to. Higher protein helps you stay full and keep muscle while losing fat, low-carb and keto suit some people's appetite, and endurance athletes usually need more carbohydrate." },
      { q: "How much protein do I need?", a: "The minimum for adults is 0.8 g per kg of body weight a day. People who lift weights or are losing weight often aim for about 1.6–2.2 g per kg (0.7–1 g per lb) to support muscle. The calculator shows your protein per kg and per lb so you can check." },
      { q: "How fast will I lose weight?", a: "A 20% calorie deficit typically gives about 0.5–1% of body weight a week at first, slowing over time as your body adapts. Recalculate every few weeks as your weight changes, and avoid going far below your BMR without medical advice." },
      { q: "How accurate is the calorie estimate?", a: "Mifflin–St Jeor is the most accurate simple equation in studies, but individuals can differ by 10% or more. Track your weight for two to three weeks and adjust calories up or down by 100–200 kcal if it moves faster or slower than expected." },
      { q: "Is this suitable for everyone?", a: "It is meant for healthy adults. If you are pregnant or breastfeeding, under 18, have diabetes, kidney disease or another medical condition, or a history of eating disorders, ask a doctor or registered dietitian for targets." },
    ],
  },
};
