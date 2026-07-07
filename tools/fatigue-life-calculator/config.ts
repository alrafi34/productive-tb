import { siteConfig } from "@/config/site";

export const fatigueLifeCalculatorConfig = {
  name: "Fatigue Life Calculator",
  slug: "fatigue-life-calculator",
  description:
    "Estimate fatigue life and cycles to failure using the Basquin equation, S-N curve method, and Miner's Rule for cumulative damage analysis.",
  category: "mechanical",
  icon: "⚙️",
  free: true,
  seo: {
    title: "Fatigue Life Calculator – Estimate Cycles to Failure Online",
    description:
      "Free fatigue life calculator for engineers. Estimate cycles to failure using S-N curves, Basquin equation, and Miner's Rule fatigue stress analysis instantly online.",
    keywords: [
      "fatigue life calculator",
      "cycles to failure calculator",
      "mechanical fatigue calculator",
      "S-N curve calculator",
      "Basquin equation calculator",
      "fatigue analysis tool",
      "Miner's rule calculator",
      "engineering fatigue calculator",
      "fatigue stress analysis",
      "fatigue strength calculator",
      "cyclic loading calculator",
      "endurance limit calculator",
    ],
    og: {
      title: "Fatigue Life Calculator – Estimate Cycles to Failure Online",
      description:
        "Free fatigue life calculator for engineers. Estimate cycles to failure using S-N curves, Basquin equation, and fatigue stress analysis instantly online.",
      url: `${siteConfig.url}/tools/mechanical/fatigue-life-calculator`,
    },
  },
  relatedTools: [
    "stress-calculator",
    "factor-of-safety-calculator",
    "beam-deflection-calculator",
    "spring-force-calculator",
    "moment-of-inertia-calculator",
    "natural-frequency-calculator",
  ],
};
