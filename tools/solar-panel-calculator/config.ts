import { siteConfig } from "@/config/site";

export const solarPanelCalculatorConfig = {
  name: "Solar Panel Calculator",
  description: "Calculate solar system size, number of panels needed, and energy production. Estimate requirements based on electricity usage and location.",
  icon: "☀️",
  category: "electrical",
  slug: "solar-panel-calculator",
  seo: {
    title: "Solar Panel Calculator – How Many Panels Do I Need?",
    description: "Size a solar PV system from monthly kWh use, peak sun hours, panel wattage and system losses, with panel count, kW size, output and savings.",
    keywords: [
      "solar panel calculator",
      "solar system size calculator",
      "how many solar panels do I need",
      "solar energy calculator",
      "solar kW calculator",
      "solar panel estimator",
      "solar power calculator",
      "solar system calculator",
      "solar panel sizing calculator",
      "solar installation calculator",
      "solar panel cost calculator",
      "solar energy system calculator",
      "residential solar calculator",
      "solar panel requirements calculator",
      "solar panel system design"
    ],
    og: {
      title: "Solar Panel Calculator – How Many Panels Do I Need?",
      description: "Size a solar PV system from monthly kWh use, peak sun hours, panel wattage and system losses, with panel count, kW size, output and savings.",
      url: `${siteConfig.url}/tools/electrical/solar-panel-calculator`
    },
    howToSteps: [
      { name: "Enter your usage", text: "Type your monthly electricity use in kWh from your bills, or pick a home size preset." },
      { name: "Set the sun hours", text: "Use the slider for your average peak sun hours per day, from PVWatts in the US or PVGIS in Europe." },
      { name: "Choose the panel", text: "Select the panel wattage you plan to install." },
      { name: "Set the system efficiency", text: "Keep about 75–85% to allow for inverter, wiring, heat and dirt losses." },
      { name: "Add your rate", text: "Optionally enter your electricity rate and currency to see the savings." },
      { name: "Read the results", text: "See the number of panels, system size, yearly production, offset and savings." },
    ],
    faq: [
      { q: "How many solar panels do I need?", a: "System size (kW) = daily kWh ÷ (sun hours × efficiency). 900 kWh a month is 30 kWh a day; with 5 sun hours and 80% efficiency that is 7.5 kW, or 19 panels of 400 W. In the UK, 300 kWh a month with 2.7 sun hours needs about 4.6 kW, or 12 panels." },
      { q: "What are peak sun hours?", a: "The daily solar energy at your site expressed as hours of full 1,000 W/m² sunshine. They are about 5–6.5 in the US Southwest, 4–5 in southern Europe and 2.5–3 in the UK and Germany as a yearly average." },
      { q: "What is the difference between kW and kWh?", a: "kW is the size of the system (its power); kWh is the energy it produces over time. A 5 kW system producing for the equivalent of 4 full-sun hours makes 20 kWh." },
      { q: "Do solar panels work on cloudy days?", a: "Yes, at a reduced output, often 10–25% of rated power. Sun-hour averages already include cloudy days and winter." },
      { q: "How long do solar panels last?", a: "Typically 25–30 years; most panel warranties guarantee around 80–90% of the original output after 25 years. Inverters usually need replacing after 10–15 years." },
      { q: "What is net metering?", a: "A billing arrangement where power you export earns credit against power you import. Rules vary: many US states have net metering or net billing, and the UK has the Smart Export Guarantee." },
    ],
  }
};
