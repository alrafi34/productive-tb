import { siteConfig } from "@/config/site";

export const springForceCalculatorConfig = {
  name: "Spring Force Calculator",
  slug: "spring-force-calculator",
  description: "Calculate spring force instantly using Hooke's Law (F = k × x). Enter spring constant and displacement to compute force with unit conversion, step-by-step explanation, and real-time results.",
  category: "mechanical",
  icon: "🌀",
  free: true,
  seo: {
    title: "Spring Force Calculator – Hooke's Law (F = kx)",
    description: "Calculate spring force from the spring constant and displacement with Hooke's law, with step-by-step working and unit conversion.",
    keywords: [
      "spring force calculator",
      "Hooke's law calculator",
      "spring constant calculator",
      "force calculator physics",
      "mechanical engineering calculator",
      "physics spring force formula",
      "compression spring calculator",
      "F=kx calculator",
      "spring displacement calculator",
      "elastic force calculator",
      "spring stiffness calculator",
      "Hooke law online",
    ],
    og: {
      title: "Spring Force Calculator – Hooke's Law (F = kx)",
      description: "Calculate spring force from the spring constant and displacement with Hooke's law, with step-by-step working and unit conversion.",
      url: `${siteConfig.url}/tools/mechanical/spring-force-calculator`,
    },
  },
  relatedTools: [
    "force-calculator",
    "torque-calculator",
    "kinetic-energy-calculator",
    "elastic-potential-energy-calculator",
    "natural-frequency-calculator",
    "stress-calculator",
  ],
};
