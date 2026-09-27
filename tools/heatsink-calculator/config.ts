import { siteConfig } from "@/config/site";

export const heatsinkCalculatorConfig = {
  name: "Heatsink Calculator",
  description: "Calculate heatsink thermal resistance and cooling requirements for electronic components. Estimate required heatsink size and verify thermal design for CPUs, MOSFETs, and power electronics.",
  icon: "🌡️",
  category: "electrical",
  slug: "heatsink-calculator",
  seo: {
    title: "Heatsink Calculator – Thermal Resistance °C/W",
    description: "Find the heatsink thermal resistance you need from power, ambient and maximum junction temperature, or check a heatsink's junction temperature.",
    keywords: [
      "heatsink calculator",
      "thermal resistance calculator",
      "electronics cooling calculator",
      "CPU heatsink calculator",
      "MOSFET thermal design tool",
      "thermal management calculator",
      "heat sink sizing calculator",
      "junction temperature calculator",
      "cooling system calculator",
      "thermal design calculator"
    ],
    og: {
      title: "Heatsink Calculator – Thermal Resistance °C/W",
      description: "Find the heatsink thermal resistance you need from power, ambient and maximum junction temperature, or check a heatsink's junction temperature.",
      url: `${siteConfig.url}/tools/electrical/heatsink-calculator`,
    },
    howToSteps: [
      { name: "Choose the mode", text: "Select required thermal resistance to size a heatsink, or temperature check to test one you have." },
      { name: "Enter the power", text: "Type the power the component dissipates in watts." },
      { name: "Enter the temperatures", text: "Type the ambient temperature and the component's maximum junction temperature in °C." },
      { name: "Enter junction-to-sink resistance", text: "Type θjc from the datasheet plus the thermal pad or paste (θcs)." },
      { name: "Enter the heatsink rating", text: "In temperature check mode, type the heatsink's thermal resistance from its datasheet." },
      { name: "Read the result", text: "See the heatsink rating you need or the junction temperature, with the safety margin and a cooling suggestion." },
    ],
    faq: [
      { q: "How do I calculate the heatsink I need?", a: "θsa = (Tj max − Ta) ÷ P − θjc − θcs. A 10 W part with Tj max 125 °C, 40 °C ambient, θjc 1.5 °C/W and 0.5 °C/W of paste needs 85 ÷ 10 − 2 = 6.5 °C/W or lower." },
      { q: "How do I find the junction temperature?", a: "Tj = Ta + P × (θjc + θcs + θsa). The same part on a 4 °C/W heatsink runs at 40 + 10 × 6 = 100 °C." },
      { q: "What does °C/W mean?", a: "How many degrees the temperature rises for each watt of heat. Lower is better: a large finned heatsink might be 1–2 °C/W, a small clip-on one 10–20 °C/W, and forced air cuts it further." },
      { q: "What if the required value is negative?", a: "The component's own junction-to-case resistance already uses up the temperature margin, so no heatsink can keep it cool enough. Reduce the power, lower the ambient temperature or choose a part with lower θjc." },
      { q: "What junction temperature should I design for?", a: "Stay well below the datasheet maximum; many designers keep 20–25 °C of margin, because lifetime falls quickly at high temperature. Use °F × 5/9 for temperature differences if you work in Fahrenheit." },
    ],
  },
};