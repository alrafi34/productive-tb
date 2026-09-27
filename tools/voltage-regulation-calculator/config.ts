import { siteConfig } from "@/config/site";

export const voltageRegulationCalculatorConfig = {
  name: "Voltage Regulation Calculator",
  description: "Calculate voltage regulation of electrical systems (transformers and power distribution lines) using standard engineering formulas.",
  icon: "⚡",
  category: "electrical",
  slug: "voltage-regulation-calculator",
  seo: {
    title: "Voltage Regulation Calculator – No-Load vs Full-Load",
    description: "Calculate percentage voltage regulation from no-load and full-load voltage for transformers, lines and supplies, with a rating of the result.",
    keywords: [
      "voltage regulation calculator",
      "electrical calculator online",
      "transformer voltage regulation",
      "power system calculator",
      "engineering voltage tool",
      "voltage drop calculator",
      "electrical engineering calculator",
      "power distribution calculator",
      "transmission line calculator",
      "voltage stability calculator"
    ],
    og: {
      title: "Voltage Regulation Calculator – No-Load vs Full-Load",
      description: "Calculate percentage voltage regulation from no-load and full-load voltage for transformers, lines and supplies, with a rating of the result.",
      url: `${siteConfig.url}/tools/electrical/voltage-regulation-calculator`,
    },
    howToSteps: [
      { name: "Enter the no-load voltage", text: "Type the voltage with no load connected, in V or kV." },
      { name: "Enter the full-load voltage", text: "Type the voltage at rated load." },
      { name: "Choose the system type", text: "Select transformer, transmission line or general system." },
      { name: "Read the regulation", text: "See the percentage regulation, the voltage drop, a rating and the calculation steps." },
    ],
    faq: [
      { q: "How is voltage regulation calculated?", a: "Regulation (%) = (V no-load − V full-load) ÷ V full-load × 100. A transformer that gives 240 V at no load and 230 V at full load has (240 − 230) ÷ 230 = 4.35% regulation." },
      { q: "What is good voltage regulation?", a: "Lower is better. Distribution transformers are typically 2–5%; above about 10% equipment may see low voltage at full load." },
      { q: "Why does voltage regulation matter?", a: "Low voltage at full load makes motors run hot, lights dim and electronics reset, while high voltage at light load stresses insulation. Supply standards such as ANSI C84.1 (±5% at the service in the US) and EN 50160 (±10% in Europe) set the limits." },
      { q: "How can I improve voltage regulation?", a: "Use larger conductors or a larger transformer, adjust transformer taps, add capacitor banks or voltage regulators, or shorten long runs." },
      { q: "Is voltage regulation the same as voltage drop?", a: "Related but not the same. Voltage drop is the difference in volts along a circuit; regulation expresses the change from no load to full load as a percentage of the full-load voltage." },
    ],
  },
};