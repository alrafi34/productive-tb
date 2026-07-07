import { siteConfig } from "@/config/site";

export const shortCircuitCurrentCalculatorConfig = {
  name: "Short Circuit Current Calculator",
  description: "Calculate fault current levels in electrical systems for circuit breaker selection, protective relay settings, and safety analysis.",
  icon: "⚡",
  category: "electrical",
  slug: "short-circuit-current-calculator",
  seo: {
    title: "Short Circuit Current Calculator – Electrical Fault Current Tool | Free Calculator",
    description: "Calculate short circuit current instantly using voltage and impedance values. Free electrical engineering calculator for single-phase and three-phase systems with real-time results.",
    keywords: [
      "short circuit current calculator",
      "fault current calculator",
      "electrical engineering calculator",
      "three phase short circuit calculation",
      "power system fault current tool",
      "circuit breaker sizing calculator",
      "electrical fault analysis",
      "system impedance calculator",
      "protective relay calculator",
      "arc flash calculator"
    ],
    og: {
      title: "Short Circuit Current Calculator – Electrical Fault Current Tool",
      description: "Calculate short circuit current instantly using voltage and impedance values. Professional electrical engineering tool with real-time calculations.",
      url: `${siteConfig.url}/tools/electrical/short-circuit-current-calculator`,
    },
  },
};