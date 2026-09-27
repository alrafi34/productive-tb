import { siteConfig } from "@/config/site";

export const motorEfficiencyCalculatorConfig = {
  name: "Motor Efficiency Calculator",
  description: "Calculate electric motor efficiency from input and output power. Get instant efficiency percentage, power losses, and performance rating with real-time results.",
  icon: "⚙️",
  category: "electrical",
  slug: "motor-efficiency-calculator",
  seo: {
    title: "Motor Efficiency Calculator – Output ÷ Input Power",
    description: "Calculate electric motor efficiency from electrical input and shaft output power in W or kW, with the losses and an efficiency class rating.",
    keywords: [
      "motor efficiency calculator",
      "electric motor efficiency",
      "motor efficiency formula",
      "calculate motor efficiency",
      "motor power loss calculator",
      "motor performance calculator",
      "efficiency percentage calculator",
      "motor efficiency rating",
      "electric motor calculator",
      "motor efficiency test",
      "motor power calculator",
      "motor loss calculation",
      "motor efficiency measurement",
      "industrial motor efficiency",
      "motor energy efficiency"
    ],
    og: {
      title: "Motor Efficiency Calculator – Output ÷ Input Power",
      description: "Calculate electric motor efficiency from electrical input and shaft output power in W or kW, with the losses and an efficiency class rating.",
      url: `${siteConfig.url}/tools/electrical/motor-efficiency-calculator`
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select watts or kilowatts; 1 hp is 746 W." },
      { name: "Enter the input power", text: "Type the electrical power the motor draws, measured with a power meter." },
      { name: "Enter the output power", text: "Type the mechanical shaft power it delivers." },
      { name: "Read the efficiency", text: "See the efficiency percentage, the power lost as heat and a rating." },
    ],
    faq: [
      { q: "How is motor efficiency calculated?", a: "Efficiency = output power ÷ input power × 100. A motor drawing 7.5 kW and delivering 6.6 kW at the shaft is 88% efficient and loses 0.9 kW as heat." },
      { q: "What is good motor efficiency?", a: "It depends on size: small motors under 1 hp may be 70–85%, and large industrial motors 93–97%. Efficiency classes IE3 (Premium) and IE4 (Super Premium) under IEC 60034-30-1, and NEMA Premium in the US, set the minimums for each size." },
      { q: "Why is my motor less efficient than its nameplate?", a: "Nameplate efficiency applies near full load. At light load, with unbalanced or low voltage, in heat, or with worn bearings, efficiency drops." },
      { q: "Where do motor losses come from?", a: "Copper losses in the windings, iron losses in the core, friction and windage, and stray load losses. Together they are typically 3–20% of the input." },
      { q: "Is a premium efficiency motor worth it?", a: "Usually, for motors that run many hours a year. A few percent less loss on a motor running 4,000+ hours a year often pays back the extra cost within a few years." },
    ],
  }
};
