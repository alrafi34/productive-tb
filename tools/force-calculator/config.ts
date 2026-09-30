import { siteConfig } from "@/config/site";

export const forceCalculatorConfig = {
  name: "Force Calculator",
  slug: "force-calculator",
  description: "Calculate force instantly using Newton's Second Law (F = ma). Supports metric and imperial units with real-time results, unit conversion, and step-by-step formula breakdown.",
  category: "mechanical",
  icon: "⚡",
  free: true,
  seo: {
    title: "Force Calculator (F = ma) – Calculate Force Online",
    description: "Calculate force from mass and acceleration with Newton's second law (F = ma), with unit conversion and step-by-step working.",
    keywords: [
      "force calculator",
      "F ma calculator",
      "newton force calculator",
      "physics force calculator",
      "calculate force online",
      "force formula calculator",
      "mass acceleration calculator",
      "newton second law calculator",
      "F=ma online",
      "force in newtons calculator",
    ],
    og: {
      title: "Force Calculator (F = ma) – Calculate Force Online",
      description: "Calculate force from mass and acceleration with Newton's second law (F = ma), with unit conversion and step-by-step working.",
      url: `${siteConfig.url}/tools/mechanical/force-calculator`,
    },
  },
  relatedTools: [
    "torque-calculator",
    "kinetic-energy-calculator",
    "centripetal-force-calculator",
    "momentum-calculator",
    "spring-force-calculator",
    "acceleration-calculator",
  ],
};
