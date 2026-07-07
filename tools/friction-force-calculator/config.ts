import { siteConfig } from "@/config/site";

export const frictionForceCalculatorConfig = {
  name: "Friction Force Calculator",
  slug: "friction-force-calculator",
  description: "Calculate frictional force instantly using coefficient of friction and normal force (F = μ × N). Supports static and kinetic friction with surface presets and unit conversion.",
  category: "mechanical",
  icon: "🔩",
  free: true,
  seo: {
    title: "Friction Force Calculator – Calculate Friction Force Online (F = μN)",
    description: "Calculate friction force instantly using coefficient of friction and normal force. Free online friction force calculator with static/kinetic modes, surface presets, formulas, and step-by-step explanations.",
    keywords: [
      "friction force calculator",
      "coefficient of friction calculator",
      "normal force calculator",
      "mechanical engineering calculator",
      "physics friction calculator",
      "friction formula calculator",
      "static friction calculator",
      "kinetic friction calculator",
      "F mu N calculator",
      "friction coefficient online",
      "surface friction calculator",
      "engineering friction tool",
    ],
    og: {
      title: "Friction Force Calculator – Calculate Friction Force Online (F = μN)",
      description: "Calculate friction force instantly using coefficient of friction and normal force. Free online friction force calculator with static/kinetic modes, surface presets, and step-by-step explanations.",
      url: `${siteConfig.url}/tools/mechanical/friction-force-calculator`,
    },
  },
  relatedTools: [
    "force-calculator",
    "torque-calculator",
    "stress-calculator",
    "spring-force-calculator",
    "centripetal-force-calculator",
    "inclined-plane-calculator",
  ],
};
