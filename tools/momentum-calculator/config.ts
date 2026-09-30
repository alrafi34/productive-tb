import { siteConfig } from "@/config/site";

export const momentumCalculatorConfig = {
  name: "Momentum Calculator",
  slug: "momentum-calculator",
  description: "Calculate momentum instantly using mass and velocity (p = m × v). Supports metric and imperial units with real-time results, unit conversion, and step-by-step formula breakdown.",
  category: "mechanical",
  icon: "🏃",
  free: true,
  seo: {
    title: "Momentum Calculator – Mass × Velocity (p = mv)",
    description: "Calculate momentum from mass and velocity, with step-by-step working. Supports kg, g and lb, and m/s, km/h, mph and ft/s.",
    keywords: [
      "momentum calculator",
      "calculate momentum",
      "physics momentum formula",
      "mass velocity calculator",
      "mechanics calculator",
      "physics calculator online",
      "p = mv calculator",
      "linear momentum calculator",
      "momentum formula",
      "momentum unit converter",
      "kg m/s calculator",
      "collision momentum calculator",
    ],
    og: {
      title: "Momentum Calculator – Mass × Velocity (p = mv)",
      description: "Calculate momentum from mass and velocity, with step-by-step working. Supports kg, g and lb, and m/s, km/h, mph and ft/s.",
      url: `${siteConfig.url}/tools/mechanical/momentum-calculator`,
    },
  },
  relatedTools: [
    "kinetic-energy-calculator",
    "force-calculator",
    "velocity-calculator",
    "acceleration-calculator",
    "torque-calculator",
    "centripetal-force-calculator",
  ],
};
