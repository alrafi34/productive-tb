import { siteConfig } from "@/config/site";

export const oneRepMaxCalculatorConfig = {
  name: "One Rep Max Calculator",
  description: "Estimate your one-rep max from any set of reps with seven formulas, and get training weights from 50% to 95% of your 1RM.",
  icon: "🏋️",
  category: "health",
  slug: "one-rep-max-calculator",
  seo: {
    title: "One Rep Max Calculator – Estimate Your 1RM (kg or lb)",
    description: "Estimate your one-rep max for squat, bench press or deadlift from the weight and reps you lifted, with Epley, Brzycki and five more formulas plus a % chart.",
    keywords: [
      "one rep max calculator",
      "1rm calculator",
      "max rep calculator",
      "bench press max calculator",
      "squat max calculator",
      "deadlift max calculator",
      "epley formula",
      "brzycki formula",
      "1rm percentage chart",
      "strength calculator",
    ],
    og: {
      title: "One Rep Max Calculator – Estimate Your 1RM (kg or lb)",
      description: "Estimate your one-rep max for squat, bench press or deadlift from the weight and reps you lifted, with Epley, Brzycki and five more formulas plus a % chart.",
      url: `${siteConfig.url}/tools/health/one-rep-max-calculator`,
    },
    howToSteps: [
      { name: "Choose kg or lb", text: "Pick the unit your weights are in." },
      { name: "Enter your set", text: "Type the weight you lifted and how many clean reps you completed; sets of 2 to 10 reps give the most reliable estimate." },
      { name: "Read your 1RM", text: "See the average estimate and the result from each of the seven formulas." },
      { name: "Plan your training", text: "Use the percentage chart for training loads from 50% to 95% of your 1RM, rounded to loadable weights, with the reps you can expect at each." },
    ],
    faq: [
      { q: "How is a one-rep max estimated?", a: "From a set taken close to failure, using formulas fitted to strength data. The Epley formula is 1RM = weight × (1 + reps ÷ 30) and the Brzycki formula is 1RM = weight × 36 ÷ (37 − reps). For 100 kg lifted for 5 reps, they give 116.7 kg and 112.5 kg; the average of all seven formulas here is about 115.5 kg." },
      { q: "Which 1RM formula is most accurate?", a: "None is best for everyone. Brzycki tends to be closer at low reps and Epley at slightly higher reps, and results depend on the lift and your training. Averaging several formulas smooths out their differences." },
      { q: "How many reps should I use?", a: "Between about 2 and 10. Above 10–12 reps, endurance plays a bigger part and the formulas diverge; a set of 3 to 5 heavy reps gives the closest estimate of a true single." },
      { q: "Is it safer to estimate than to test a 1RM?", a: "Usually, yes. Testing a true maximum needs a proper warm-up, good technique and a spotter or safety bars, and carries a higher injury risk, especially for beginners. Estimating from a submaximal set lets you track strength without maxing out." },
      { q: "How do I use percentages of 1RM in training?", a: "Strength work is often done at 80–90% of 1RM for 3–6 reps, muscle-building at 65–80% for 6–12 reps, and technique or speed work below 65%. The chart rounds each load to 2.5 kg or 5 lb so you can load the bar." },
    ],
  },
};
