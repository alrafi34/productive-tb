import { siteConfig } from "@/config/site";

export const flowRateCalculatorConfig = {
  name: "Flow Rate Calculator",
  slug: "flow-rate-calculator",
  description:
    "Calculate volumetric and mass flow rate instantly using engineering formulas. Supports pipe flow, fluid velocity, unit conversion, and real-time calculations online.",
  category: "mechanical",
  icon: "🌊",
  free: true,
  seo: {
    title: "Flow Rate Calculator – Volumetric & Mass Flow Rate",
    description:
      "Calculate volumetric and mass flow rate from pipe size and fluid velocity, with unit conversion between common flow units.",
    keywords: [
      "flow rate calculator",
      "volumetric flow calculator",
      "mass flow rate calculator",
      "pipe flow calculator",
      "fluid flow calculator",
      "engineering calculator",
      "flow velocity calculator",
      "Q = V/t calculator",
      "pipe diameter flow calculator",
      "HVAC flow calculator",
      "hydraulic flow calculator",
      "fluid mechanics calculator",
    ],
    og: {
      title: "Flow Rate Calculator – Volumetric & Mass Flow Rate",
      description:
        "Calculate volumetric and mass flow rate from pipe size and fluid velocity, with unit conversion between common flow units.",
      url: `${siteConfig.url}/tools/mechanical/flow-rate-calculator`,
    },
    howToSteps: [
      { name: "Select a calculation mode from the top selector", text: "Select a calculation mode from the top selector" },
      { name: "Enter the required values for your chosen mode", text: "Enter the required values for your chosen mode" },
      { name: "Select the appropriate units for each input", text: "Select the appropriate units for each input" },
      { name: "Results update instantly as you type", text: "Results update instantly as you type" },
      { name: "View the full conversion table below the result", text: "View the full conversion table below the result" },
      { name: "Copy, save, or export your calculation", text: "Copy, save, or export your calculation" },
    ],
    faq: [
      { q: "What is the difference between volumetric and mass flow rate?", a: "Volumetric flow rate (Q) measures the volume of fluid per unit time (m³/s, L/min). Mass flow rate (ṁ) measures the mass per unit time (kg/s). They are related by ṁ = ρ × Q, where ρ is fluid density. Mass flow rate is preferred in thermodynamics and chemical engineering because it is conserved regardless of temperature and pressure changes." },
      { q: "What is the formula for flow rate in a pipe?", a: "For a circular pipe: Q = (π × d²/4) × v, where d is the internal pipe diameter and v is the average fluid velocity. This comes from Q = A × v, where A = π × d²/4 is the cross-sectional area of the pipe." },
      { q: "How do I convert L/min to m³/s?", a: "Divide by 60,000. For example, 50 L/min ÷ 60,000 = 0.000833 m³/s. Alternatively, 1 L/min = 1.667 × 10⁻⁵ m³/s. This calculator handles all unit conversions automatically." },
      { q: "What is GPM (gallons per minute)?", a: "GPM stands for US gallons per minute, a common flow rate unit in American plumbing and HVAC. 1 GPM = 0.0000630902 m³/s = 3.785 L/min. This calculator supports GPM as both an input and output unit." },
      { q: "What is CFM in flow rate?", a: "CFM stands for Cubic Feet per Minute, widely used in HVAC and ventilation engineering in the US. 1 CFM = 0.000471947 m³/s = 28.317 L/min. It is equivalent to ft³/min." },
    ],
  },
  relatedTools: [
    "reynolds-number-calculator",
    "pipe-velocity-calculator",
    "pressure-drop-calculator",
    "bernoulli-equation-calculator",
    "water-flow-rate-calculator",
    "drainage-flow-calculator",
  ],
};

export const toolConfig = flowRateCalculatorConfig;
