import { siteConfig } from "@/config/site";

export const fanPowerConsumptionCalculatorConfig = {
  name: "Fan Power Consumption Calculator",
  description: "Calculate electricity consumption and cost for fans. Estimate daily, monthly, and yearly energy usage with instant results.",
  icon: "🌀",
  category: "electrical",
  slug: "fan-power-consumption-calculator",
  seo: {
    title: "Fan Power Consumption Calculator — Free Electricity Cost | Productive Toolbox",
    description: "Calculate fan electricity use and cost instantly. Enter wattage, usage hours, and tariff for daily, monthly, and yearly kWh and cost. Free, browser-based.",
    keywords: [
      "fan power consumption calculator",
      "fan power calculator",
      "electricity consumption calculator",
      "fan electricity cost calculator",
      "kwh calculator",
      "energy usage calculator online",
      "ceiling fan power consumption",
      "table fan electricity cost",
      "fan energy calculator",
      "electric bill calculator fan",
      "fan wattage calculator",
      "monthly electricity cost fan",
      "fan running cost calculator",
      "power consumption calculator",
      "fan energy usage calculator",
      "electricity cost estimator",
      "how much electricity does a fan use",
      "ceiling fan electricity cost per month",
      "bldc fan power consumption",
      "exhaust fan power consumption",
      "fan vs ac electricity cost",
      "fan current draw calculator",
      "free fan power calculator",
      "industrial fan power consumption",
    ],
    openGraph: {
      title: "Fan Power Consumption Calculator — Free Electricity Cost Tool",
      description: "Calculate fan electricity use and cost instantly. Enter wattage, usage hours, and tariff for daily, monthly, and yearly kWh and cost.",
      type: "website",
      url: `${siteConfig.url}/tools/electrical/fan-power-consumption-calculator`,
    },
    og: {
      title: "Fan Power Consumption Calculator — Free Electricity Cost Tool",
      description: "Calculate fan electricity use and cost instantly. Enter wattage, usage hours, and tariff for daily, monthly, and yearly kWh and cost.",
      url: `${siteConfig.url}/tools/electrical/fan-power-consumption-calculator`
    },
    howToSteps: [
      {
        name: "Enter Fan Power in Watts",
        text: "Type the fan's wattage from its label or manual. Use the actual draw at your normal speed setting, not the maximum printed on the box, for the most accurate cost.",
      },
      {
        name: "Set Usage Hours per Day",
        text: "Enter how many hours per day the fan runs, from 0 to 24. This is the biggest driver of monthly cost, so use a realistic average.",
      },
      {
        name: "Set Days per Month",
        text: "Enter the number of days in your billing cycle, typically 30. Adjust to 28, 29, or 31 to match a specific calendar month.",
      },
      {
        name: "Enter Your Electricity Tariff",
        text: "Type your cost per kWh from your electricity bill. This is multiplied by the calculated energy use to produce cost figures.",
      },
      {
        name: "Apply a Fan Preset",
        text: "Choose from built-in presets for ceiling, table, pedestal, tower, exhaust, and industrial fans to auto-fill typical wattage and usage hours.",
      },
      {
        name: "Read the Results and Export",
        text: "Review daily, monthly, and yearly energy and cost, plus estimated current draw. Save to history, copy a summary, or export a text or CSV report.",
      },
    ],
    faq: [
      {
        q: "What is a fan power consumption calculator?",
        a: "A fan power consumption calculator converts a fan's wattage, daily usage hours, and your electricity tariff into daily, monthly, and yearly energy use in kWh and the exact cost. It also estimates the current draw the fan places on a circuit, and is used to budget electricity bills and compare fan types before buying.",
      },
      {
        q: "How is fan electricity cost calculated?",
        a: "The calculator first finds daily energy: Daily Energy (kWh) equals Power in watts times Hours per Day, divided by 1000. Monthly energy multiplies that by your days-per-month setting, and yearly energy multiplies it by 365. Each energy figure is then multiplied by your electricity tariff (cost per kWh) to get daily, monthly, and yearly cost.",
      },
      {
        q: "How much electricity does a ceiling fan use?",
        a: "A standard induction-motor ceiling fan rated at 75W run 8 hours a day uses 0.6 kWh daily, 18 kWh a month, and 219 kWh a year. At $0.12 per kWh that is $2.16 a month and roughly $26.28 a year. An energy-efficient BLDC ceiling fan rated at 50W under the same usage uses only 12 kWh a month, which is $1.44, a 33 percent reduction.",
      },
      {
        q: "Is it cheaper to run a fan or an air conditioner?",
        a: "Fans are dramatically cheaper to run. A 75W ceiling fan running 8 hours a day costs about $2.16 a month at $0.12 per kWh, while a 1.5-ton air conditioner running the same 8 hours a day typically costs $40 to $55 a month depending on its EER rating, roughly 20 to 25 times more. Comparing this calculator's output against an AC power calculator shows whether a fan can substitute for cooling in mild weather.",
      },
      {
        q: "How much can I save by switching to a BLDC or inverter fan?",
        a: "Replacing a 75W standard ceiling fan with a 50W BLDC model at 8 hours a day, 30 days a month, and $0.12 per kWh saves 6 kWh a month, which is $0.72 a month or $8.64 a year per fan. Across a home with five ceiling fans, that is roughly $43 a year, and BLDC fans typically pay back their price premium within two to three years of daily use.",
      },
      {
        q: "Does fan speed affect the power consumption calculation?",
        a: "Yes, but you must account for it manually. The calculator uses whatever wattage you enter, which should reflect the fan's actual draw at the speed you run it, not the maximum wattage printed on the box. Many fans draw 30 to 50 percent less power at medium speed than at high speed, so check the spec sheet or measure with a plug-in power meter for an exact figure.",
      },
      {
        q: "How do I find my fan's wattage if it isn't labeled?",
        a: "Check the motor housing, base, or a rating plate for a wattage or amperage figure, since most fans list wattage directly. If only voltage and current are given, calculate Power (W) equals Voltage (V) times Current (A). If no rating is available, a plug-in power meter plugged between the fan and outlet gives the most accurate real-world reading.",
      },
      {
        q: "What voltage does the current calculation use?",
        a: "This calculator estimates current draw using a fixed 230V supply: Current (A) equals Power (W) divided by 230. This matches most of the world outside North America. If your system runs on 110 to 120V, the displayed current figure will be inaccurate for your circuit, so recalculate manually using Power divided by your actual supply voltage.",
      },
      {
        q: "Should I leave a fan running in an empty room?",
        a: "No. Fans cool people through moving air across skin, known as the wind-chill effect, not by lowering the room's air temperature. A fan running in an empty room provides no cooling benefit to anyone while still drawing its full rated wattage continuously, so turning it off when you leave is pure savings with no downside.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your fan wattage, usage hours, and electricity tariff are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "air-conditioner-power-calculator",
    "energy-consumption-calculator",
    "electric-bill-calculator",
    "power-consumption-calculator",
    "electric-motor-power-calculator",
    "room-lighting-calculator",
  ],
};
