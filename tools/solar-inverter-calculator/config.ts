import { siteConfig } from "@/config/site";

export const solarInverterCalculatorConfig = {
  name: "Solar Inverter Calculator",
  description: "Calculate appropriate inverter size (VA/kW) for solar systems. Estimate inverter capacity based on load, voltage, and efficiency with instant results.",
  icon: "⚡",
  category: "electrical",
  slug: "solar-inverter-calculator",
  seo: {
    title: "Solar Inverter Size Calculator – Watts and VA",
    description: "Size an off-grid or backup inverter from your load and a safety factor, with the battery current at 12, 24 or 48 V and the next standard size.",
    keywords: [
      "solar inverter calculator",
      "inverter size calculator",
      "solar system inverter sizing",
      "VA to kW calculator",
      "inverter capacity calculator",
      "off grid inverter calculator",
      "solar inverter sizing tool",
      "inverter wattage calculator",
      "solar power inverter calculator",
      "inverter load calculator",
      "pure sine wave inverter calculator",
      "solar inverter selection",
      "inverter sizing for solar",
      "battery inverter calculator",
      "solar system calculator"
    ],
    og: {
      title: "Solar Inverter Size Calculator – Watts and VA",
      description: "Size an off-grid or backup inverter from your load and a safety factor, with the battery current at 12, 24 or 48 V and the next standard size.",
      url: `${siteConfig.url}/tools/electrical/solar-inverter-calculator`
    },
    howToSteps: [
      { name: "Enter the load", text: "Type the total watts of the appliances that may run at the same time, or pick a preset." },
      { name: "Choose the system voltage", text: "Select the battery bank voltage: 12, 24 or 48 V." },
      { name: "Set the efficiency", text: "Use the slider for the inverter efficiency, typically 90–95% for pure sine wave models." },
      { name: "Choose the safety factor", text: "Pick 1.2× for general loads, 1.5× for motors and compressors, or 2× for future growth." },
      { name: "Read the results", text: "See the required inverter rating, the next standard size, the battery current and the utilization." },
    ],
    faq: [
      { q: "What size inverter do I need?", a: "Continuous rating ≥ total load × safety factor. A 1,000 W load with a 1.2 safety factor needs at least 1,200 VA, so a 1,200 or 1,500 VA inverter. Check that its surge rating covers motor starting too." },
      { q: "How much current does the inverter draw from the battery?", a: "DC current = load ÷ (battery voltage × efficiency). 1,000 W from a 24 V bank at 90% efficiency draws 46 A; from 12 V it would be 93 A." },
      { q: "Should I use 12 V, 24 V or 48 V?", a: "Higher voltage halves the current each step, so cables are thinner and losses lower. 12 V suits loads up to about 1–1.5 kW, 24 V up to about 3 kW, and 48 V larger systems." },
      { q: "Pure sine wave or modified sine wave?", a: "Pure sine wave. It runs every appliance, including motors, compressors and electronics with sensitive power supplies, and is now the norm for home systems." },
      { q: "What is the surge rating?", a: "The power the inverter can supply for a few seconds while motors and compressors start, often two to three times the continuous rating." },
      { q: "Does efficiency change the inverter size?", a: "No. The rating is the AC output the inverter can deliver; efficiency only raises the power drawn from the battery." },
    ],
  }
};
