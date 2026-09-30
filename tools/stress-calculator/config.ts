import { siteConfig } from "@/config/site";

export const stressCalculatorConfig = {
  name: "Stress Calculator",
  slug: "stress-calculator",
  description: "Calculate mechanical stress instantly using force and cross-sectional area (σ = F / A). Supports N, kN, lbf, kgf and m², cm², mm², in², ft² with real-time results.",
  category: "mechanical",
  icon: "🔩",
  free: true,
  seo: {
    title: "Stress Calculator – Force per Area in MPa, psi & ksi",
    description: "Calculate mechanical stress from force and area, with unit conversion between Pa, MPa, psi, ksi and more.",
    keywords: [
      "stress calculator",
      "mechanical stress calculator",
      "stress formula calculator",
      "force and area calculator",
      "engineering stress calculator",
      "MPa calculator",
      "psi stress calculator",
      "normal stress calculator",
      "sigma calculator",
      "stress in materials",
      "structural stress calculator",
      "online stress calculator",
    ],
    og: {
      title: "Stress Calculator – Force per Area in MPa, psi & ksi",
      description: "Calculate mechanical stress from force and area, with unit conversion between Pa, MPa, psi, ksi and more.",
      url: `${siteConfig.url}/tools/mechanical/stress-calculator`,
    },
  },
  relatedTools: [
    "torque-calculator",
    "force-calculator",
    "beam-deflection-calculator",
    "spring-force-calculator",
    "young-modulus-calculator",
    "factor-of-safety-calculator",
  ],
};
