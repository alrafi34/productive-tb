import { siteConfig } from "@/config/site";

export const kineticEnergyCalculatorConfig = {
  name: "Kinetic Energy Calculator",
  slug: "kinetic-energy-calculator",
  description: "Calculate kinetic energy instantly using mass and velocity (KE = ½mv²). Supports metric and imperial units with real-time results, unit conversion, and step-by-step formula breakdown.",
  category: "mechanical",
  icon: "🚀",
  free: true,
  seo: {
    title: "Free Kinetic Energy Calculator – Calculate Motion Energy Online",
    description: "Calculate kinetic energy instantly using mass and velocity. Free online kinetic energy calculator with unit conversion, formulas, and step-by-step explanations.",
    keywords: [
      "kinetic energy calculator",
      "KE calculator",
      "motion energy calculator",
      "physics calculator",
      "kinetic energy formula calculator",
      "joules calculator",
      "half mv squared calculator",
      "moving object energy calculator",
      "KE = half mv2",
      "kinetic energy online",
    ],
    og: {
      title: "Free Kinetic Energy Calculator – Calculate Motion Energy Online",
      description: "Calculate kinetic energy instantly using mass and velocity. Free online kinetic energy calculator with unit conversion, formulas, and step-by-step explanations.",
      url: `${siteConfig.url}/tools/mechanical/kinetic-energy-calculator`,
    },
  },
  relatedTools: [
    "force-calculator",
    "momentum-calculator",
    "potential-energy-calculator",
    "velocity-calculator",
    "torque-calculator",
    "projectile-motion-calculator",
  ],
};
