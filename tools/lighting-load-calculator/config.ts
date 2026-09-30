export const lightingLoadCalculatorConfig = {
  name: "Lighting Load Calculator",
  slug: "lighting-load-calculator",
  category: "architecture",
  description: "Calculate lighting power requirements for rooms and buildings. Estimate watts, energy consumption, and optimize lighting design instantly.",
  icon: "💡",
  color: "#058554",
  featured: false,
  keywords: [
    "lighting load calculator",
    "lux to watts calculator",
    "room lighting calculation",
    "electrical load calculator",
    "lighting power estimation",
    "energy consumption calculator",
    "lighting design tool"
  ],
  seo: {
    title: "Lighting Load Calculator – Watts, Lumens & kWh",
    description: "Work out the lumens and watts a room needs from its area and target lux, for LED, CFL or incandescent lights, plus monthly kWh and cost in your currency.",
    keywords: "lighting load calculator, lux to watts calculator, room lighting calculation, electrical load calculator, lighting power estimation",
    og: {
      title: "Lighting Load Calculator – Free Power Estimation Tool",
      description: "Calculate lighting power requirements instantly with multiple unit support.",
      type: "website",
      url: "/tools/architecture/lighting-load-calculator"
    },
    howToSteps: [
      { name: "Enter the room area", text: "Type the area in square feet or square meters." },
      { name: "Choose the room type", text: "Pick a room such as office, kitchen or bedroom to set the recommended light level in lux, or enter your own." },
      { name: "Choose the lighting", text: "Select LED, CFL or incandescent and adjust the efficiency factor for fittings and room surfaces." },
      { name: "Add your electricity price", text: "Optionally enter the price per kWh and currency to see the monthly cost." },
      { name: "Read the load", text: "See the lumens needed, total watts, monthly kWh and a suggested number of fixtures." },
    ],
    faq: [
      { q: "How do you calculate lighting load?", a: "Lumens needed = area (m²) × target lux; watts = lumens ÷ lamp efficacy (lm/W) ÷ efficiency factor. An office of 20 m² at 500 lux needs 10,000 lumens: with LEDs at 100 lm/W and a factor of 0.8 that is 125 W." },
      { q: "How many lux does a room need?", a: "Typical targets are 100–150 lux for living rooms and bedrooms, 300–500 lux for kitchens and offices, and 500–750 lux for detailed work. The IES Lighting Handbook (US) and EN 12464-1 (Europe) give values by task." },
      { q: "What is the difference between lux and foot-candles?", a: "Both measure light falling on a surface. 1 foot-candle = 1 lumen per square foot = 10.76 lux, so 500 lux is about 46 foot-candles." },
      { q: "How much energy do LEDs save?", a: "LEDs give about 100 lm/W against 60 for CFLs and 15 for incandescent bulbs, so the same light uses about 85% less power than incandescent. A 60 W incandescent bulb is replaced by an LED of about 8–10 W." },
      { q: "How is the monthly cost worked out?", a: "Monthly kWh = watts × hours per day × 30 ÷ 1,000, assuming 8 hours a day, times your price per kWh. 125 W for 8 hours a day uses 30 kWh a month, which is $5.10 at $0.17/kWh." },
    ],
  },
  relatedTools: [
    "electrical-load-calculator-building",
    "energy-consumption-calculator",
    "energy-efficiency-calculator-building"
  ]
};
