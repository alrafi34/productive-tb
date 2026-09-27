import { siteConfig } from "@/config/site";

export const solarBatteryCalculatorConfig = {
  name: "Solar Battery Calculator",
  description: "Calculate required battery capacity for solar systems. Estimate battery size based on daily load, backup days, and system specifications.",
  icon: "🔋",
  category: "electrical",
  slug: "solar-battery-calculator",
  seo: {
    title: "Solar Battery Calculator – Battery Bank Size in Ah",
    description: "Size a solar battery bank from daily energy use, days of autonomy, system voltage, efficiency and depth of discharge, in Ah and kWh.",
    keywords: [
      "solar battery calculator",
      "battery sizing calculator",
      "solar system battery size",
      "off grid battery calculator",
      "solar battery capacity calculator",
      "battery bank calculator",
      "solar storage calculator",
      "battery Ah calculator",
      "solar battery sizing tool",
      "depth of discharge calculator",
      "solar battery backup calculator",
      "battery capacity estimator",
      "solar energy storage calculator",
      "battery bank sizing",
      "solar power battery calculator"
    ],
    og: {
      title: "Solar Battery Calculator – Battery Bank Size in Ah",
      description: "Size a solar battery bank from daily energy use, days of autonomy, system voltage, efficiency and depth of discharge, in Ah and kWh.",
      url: `${siteConfig.url}/tools/electrical/solar-battery-calculator`
    },
    howToSteps: [
      { name: "Enter the daily load", text: "Type how many kWh you use per day on battery, from your bills or an appliance list." },
      { name: "Set the backup days", text: "Type how many days the batteries must cover without sun." },
      { name: "Choose the system voltage", text: "Select 12 V, 24 V or 48 V." },
      { name: "Set efficiency and depth of discharge", text: "Use the sliders, or pick a battery type preset such as lithium or lead-acid." },
      { name: "Read the bank size", text: "See the capacity in Ah and kWh, a suggested bank configuration and the calculation steps." },
    ],
    faq: [
      { q: "How do I calculate solar battery size?", a: "Capacity (Ah) = daily kWh × 1,000 × backup days ÷ efficiency ÷ depth of discharge ÷ system voltage. 5 kWh a day for 2 days at 24 V, with 85% efficiency and 80% DoD, is 10,000 ÷ 0.85 ÷ 0.8 ÷ 24 = 613 Ah (14.7 kWh)." },
      { q: "What depth of discharge should I use?", a: "Around 80–90% for lithium iron phosphate (LiFePO₄) and about 50% for lead-acid, which wears out quickly if drained deeper. A lower DoD needs a bigger bank but makes it last longer." },
      { q: "Should I choose 12 V, 24 V or 48 V?", a: "12 V suits small systems up to about 1–2 kWh a day, such as RVs and cabins; 24 V medium systems; and 48 V whole-home systems. A higher voltage means less current, thinner cables and lower losses." },
      { q: "What is the difference between Ah and kWh?", a: "Ah is charge at a given voltage; kWh is energy. kWh = Ah × V ÷ 1,000, so 200 Ah is 2.4 kWh at 12 V but 9.6 kWh at 48 V. Always compare batteries in kWh or at the same voltage." },
      { q: "Can I use car batteries?", a: "No. Starter batteries are built for short bursts and fail quickly when deep-cycled. Use deep-cycle AGM or gel, or lithium batteries made for energy storage." },
      { q: "How long do solar batteries last?", a: "Lithium iron phosphate typically lasts 3,000–6,000 cycles (10+ years); AGM and gel about 500–1,000 cycles at 50% DoD. Heat and deep discharges shorten life." },
    ],
  }
};
