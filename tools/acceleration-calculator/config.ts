import { siteConfig } from "@/config/site";

export const accelerationCalculatorConfig = {
  name: "Acceleration Calculator",
  slug: "acceleration-calculator",
  category: "mechanical",
  description: "Calculate acceleration using change in velocity over time. Supports multiple modes, unit conversion, and step-by-step explanations.",
  icon: "⚡",
  color: "#058554",
  free: true,
  seo: {
    title: "Free Acceleration Calculator – Calculate Velocity Change Online",
    description: "Calculate acceleration instantly using velocity and time. Free online acceleration calculator with step-by-step formulas, unit conversion, and real-time results.",
    keywords: [
      "acceleration calculator",
      "calculate acceleration",
      "velocity calculator",
      "physics acceleration formula",
      "motion calculator",
      "free acceleration calculator online",
      "a = (v2 - v1) / t",
      "deceleration calculator",
      "final velocity calculator",
      "initial velocity calculator",
      "kinematics calculator",
      "acceleration formula",
    ],
    og: {
      title: "Free Acceleration Calculator Online",
      description: "Calculate acceleration instantly using velocity and time with automatic unit conversion and real-time results.",
      type: "website",
      url: `${siteConfig.url}/tools/mechanical/acceleration-calculator`,
    },
  },
  relatedTools: [
    "velocity-calculator",
    "force-calculator",
    "kinetic-energy-calculator",
    "torque-calculator",
    "centripetal-force-calculator",
    "projectile-motion-calculator",
  ],
};

export const toolConfig = accelerationCalculatorConfig;
