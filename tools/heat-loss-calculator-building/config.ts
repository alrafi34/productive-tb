export const heatLossCalculatorBuildingConfig = {
  name: "Heat Loss Calculator",
  slug: "heat-loss-calculator-building",
  category: "architecture",
  description: "Calculate building heat loss using area, U-values, and temperature difference. Free online heat loss calculator for HVAC sizing, insulation planning, and energy efficiency.",
  icon: "🌡️",
  color: "#058554",
  featured: false,
  keywords: [
    "heat loss calculator",
    "building heat loss",
    "U value calculator",
    "HVAC heat loss estimation",
    "thermal loss calculator",
    "insulation calculator",
    "energy efficiency calculator"
  ],
  seo: {
    title: "Heat Loss Calculator – Building Heat Loss in W & BTU",
    description: "Estimate a building's heat loss through walls, windows, roof and floor from areas, U-values and the inside-outside temperature difference, in W and BTU/hr.",
    keywords: "heat loss calculator, building heat loss, U value calculator, HVAC heat loss estimation, thermal loss calculator",
    og: {
      title: "Heat Loss Calculator – Free Building Energy Loss Tool",
      description: "Calculate heat loss instantly with detailed breakdown and insulation recommendations.",
      type: "website",
      url: "/tools/architecture/heat-loss-calculator-building"
    },
    howToSteps: [
      { name: "Choose the mode", text: "Simple mode uses one total area and average U-value; detailed mode takes each element separately." },
      { name: "Enter the temperatures", text: "Type the inside and design outside temperatures in °C or °F." },
      { name: "Enter areas and U-values", text: "Type each element's area in m² and U-value in W/m²·K, or use the presets and U-value library." },
      { name: "Read the heat loss", text: "See the total heat loss in watts and BTU/hr with a breakdown by element." },
    ],
    faq: [
      { q: "How is heat loss calculated?", a: "Heat loss = U-value × area × temperature difference for each element, added together. A 100 m² wall at U = 0.3 W/m²·K with 21 °C inside and −4 °C outside loses 0.3 × 100 × 25 = 750 W." },
      { q: "How do I convert U-values and R-values?", a: "In US units, U = 1 ÷ R (Btu/h·ft²·°F). To convert a US R-value to a metric U-value, U (W/m²·K) = 5.678 ÷ R. R-13 insulation on its own is about 0.44 W/m²·K and R-49 about 0.12." },
      { q: "What outside temperature should I use?", a: "The design heating temperature for your location: the ASHRAE 99% heating design temperature in the US, or the national design temperature in EN 12831 in Europe. It is well below the average winter temperature." },
      { q: "Does this include air leakage?", a: "No. It covers conduction through the fabric. Ventilation and infiltration can add 20–40% or more; for a full load use ACCA Manual J (US) or EN 12831 (Europe)." },
      { q: "How do I convert watts to BTU/hr?", a: "Multiply by 3.412. 750 W is about 2,560 BTU/hr." },
    ],
  },
  relatedTools: [
    "hvac-load-calculator",
    "cooling-load-calculator-architecture",
    "ventilation-calculator"
  ]
};