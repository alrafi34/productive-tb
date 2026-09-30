import { siteConfig } from "@/config/site";

export const heatTransferCalculatorConfig = {
  name: "Heat Transfer Calculator",
  slug: "heat-transfer-calculator",
  description:
    "Calculate heat transfer rate instantly using conduction, convection, or radiation formulas. Supports SI and imperial units with real-time results and formula breakdowns.",
  category: "mechanical",
  icon: "🌡️",
  free: true,
  seo: {
    title: "Heat Transfer Calculator – Conduction, Convection, Radiation",
    description:
      "Calculate heat transfer rate by conduction, convection or radiation, with the formulas, unit conversion and a step-by-step breakdown.",
    keywords: [
      "heat transfer calculator",
      "thermal calculator",
      "conduction calculator",
      "convection calculator",
      "radiation heat transfer calculator",
      "engineering heat calculator",
      "heat transfer equation",
      "Fourier law calculator",
      "Newton cooling calculator",
      "Stefan Boltzmann calculator",
      "HVAC heat calculator",
      "thermal engineering tool",
    ],
    og: {
      title: "Heat Transfer Calculator – Conduction, Convection, Radiation",
      description:
        "Calculate heat transfer rate by conduction, convection or radiation, with the formulas, unit conversion and a step-by-step breakdown.",
      url: `${siteConfig.url}/tools/mechanical/heat-transfer-calculator`,
    },
    howToSteps: [
      { name: "Select the transfer mode", text: "Select the transfer mode: Conduction, Convection, or Radiation" },
      { name: "Enter the required inputs for the selected mode", text: "Enter the required inputs for the selected mode" },
      { name: "Choose your preferred unit system", text: "Choose your preferred unit system (SI or Imperial)" },
      { name: "For conduction, use material presets to auto-fill conductivity", text: "For conduction, use material presets to auto-fill conductivity" },
      { name: "View the heat transfer rate instantly in all units", text: "View the heat transfer rate instantly in all units" },
      { name: "Save results to history or export as a TXT report", text: "Save results to history or export as a TXT report" },
    ],
    faq: [
      { q: "What is heat transfer?", a: "Heat transfer is the movement of thermal energy from a hotter region to a cooler one. It occurs through three mechanisms: conduction (through solids), convection (through fluids), and radiation (through electromagnetic waves)." },
      { q: "What is the Stefan-Boltzmann constant?", a: "The Stefan-Boltzmann constant (σ) equals 5.67×10⁻⁸ W/m²·K⁴. It appears in the radiation formula and relates the heat radiated by a blackbody to the fourth power of its absolute temperature." },
      { q: "Why must radiation temperatures be in Kelvin?", a: "The Stefan-Boltzmann Law uses absolute temperatures raised to the fourth power. Celsius and Fahrenheit scales have arbitrary zero points, so they cannot be used directly. The calculator automatically converts °C and °F to Kelvin." },
      { q: "What is emissivity?", a: "Emissivity (ε) is a dimensionless value between 0 and 1 that describes how efficiently a surface emits thermal radiation compared to a perfect blackbody (ε = 1). Polished metals have low emissivity (~0.05), while painted surfaces and most non-metals have high emissivity (~0.9)." },
      { q: "What is the difference between conduction and convection?", a: "Conduction transfers heat through direct molecular contact within a solid material. Convection transfers heat between a solid surface and a moving fluid (liquid or gas). Convection is generally faster than conduction in fluids because fluid motion carries heat away." },
    ],
  },
  relatedTools: [
    "thermal-stress-calculator",
    "thermal-expansion-calculator",
    "specific-heat-calculator",
    "thermal-efficiency-calculator",
    "reynolds-number-calculator",
    "ideal-gas-law-calculator",
  ],
};
