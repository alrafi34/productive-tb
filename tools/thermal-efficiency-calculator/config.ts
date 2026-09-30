import { siteConfig } from "@/config/site";

export const thermalEfficiencyCalculatorConfig = {
  name: "Thermal Efficiency Calculator",
  description: "Calculate thermal efficiency of engines, heat engines, turbines, and thermodynamic systems. Supports Carnot efficiency, basic thermal efficiency, and power-based calculations.",
  icon: "🔥",
  category: "mechanical",
  slug: "thermal-efficiency-calculator",
  seo: {
    title: "Thermal Efficiency Calculator – Engines & Carnot Limit",
    description: "Calculate the thermal efficiency of engines, turbines and other heat engines, compare it with the Carnot limit and see the working.",
    keywords: [
      "thermal efficiency calculator",
      "engine efficiency calculator",
      "heat engine efficiency",
      "Carnot efficiency calculator",
      "thermodynamics calculator",
      "mechanical engineering calculator",
      "thermal energy efficiency",
      "power plant efficiency",
      "turbine efficiency calculator",
      "boiler efficiency calculator",
    ],
    og: {
      title: "Thermal Efficiency Calculator – Engines & Carnot Limit",
      description: "Calculate the thermal efficiency of engines, turbines and other heat engines, compare it with the Carnot limit and see the working.",
      url: `${siteConfig.url}/tools/mechanical/thermal-efficiency-calculator`,
    },
    howToSteps: [
      { name: "Choose a mode", text: "Pick basic thermal efficiency (work out ÷ heat in), Carnot efficiency, or engine efficiency." },
      { name: "Enter the values", text: "For basic mode enter useful output and heat input; for Carnot, the hot and cold temperatures; for an engine, power output and fuel energy input." },
      { name: "Pick the units", text: "Choose J, kJ or MJ for energy, W, kW or MW for power, and °C or K for temperatures." },
      { name: "Read the result", text: "See the efficiency as a percentage with the formula worked step by step." },
    ],
    faq: [
      { q: "What is thermal efficiency?", a: "Thermal efficiency measures how well a heat engine converts thermal energy into useful work. It is expressed as a percentage — a 40% efficient engine converts 40% of its heat input into work and rejects the remaining 60% as waste heat." },
      { q: "Why can't thermal efficiency reach 100%?", a: "The second law of thermodynamics prohibits 100% efficiency. All real heat engines must reject some heat to a cold reservoir. The Carnot efficiency sets the theoretical upper limit for any engine operating between two given temperatures." },
      { q: "What is Carnot efficiency?", a: "Carnot efficiency is the maximum possible efficiency for a heat engine operating between a hot reservoir at temperature Th and a cold reservoir at Tc (both in Kelvin): η = (1 − Tc/Th) × 100. Real engines always fall below this limit due to irreversibilities." },
      { q: "What units should I use for Carnot calculations?", a: "Temperatures must be in absolute units (Kelvin) for the Carnot formula to work correctly. This calculator automatically converts Celsius to Kelvin when you select the °C option." },
      { q: "How do I improve thermal efficiency?", a: "Increase the hot reservoir temperature, decrease the cold reservoir temperature, reduce friction and heat losses, use regenerative heat exchangers, and optimize the thermodynamic cycle design." },
    ],
  },
};
