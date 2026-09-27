export const energyEfficiencyCalculatorBuildingConfig = {
  name: "Energy Efficiency Calculator (Building)",
  slug: "energy-efficiency-calculator-building",
  category: "architecture",
  description: "Calculate building energy efficiency instantly. Find Energy Use Intensity (EUI), compare performance, and improve sustainability with this free online calculator.",
  icon: "⚡",
  color: "#058554",
  featured: false,
  keywords: [
    "energy efficiency calculator",
    "building energy calculator",
    "EUI calculator",
    "energy use intensity",
    "sustainable building tools",
    "building performance calculator"
  ],
  seo: {
    title: "Building Energy Calculator – EUI & Efficiency Rating",
    description: "Calculate a building's energy use intensity (EUI) in kWh per sq ft or m² from its annual energy use, rate its efficiency and get improvement ideas.",
    keywords: "energy efficiency calculator, building energy calculator, EUI calculator, energy use intensity, sustainable building tools",
    og: {
      title: "Energy Efficiency Calculator – Building Performance Analysis Tool",
      description: "Calculate Energy Use Intensity (EUI) and assess building energy efficiency with instant analysis and recommendations.",
      type: "website",
      url: "/tools/architecture/energy-efficiency-calculator-building"
    },
    howToSteps: [
      { name: "Enter the area", text: "Type the floor area in square feet or square meters." },
      { name: "Enter the energy use", text: "Add up 12 months of utility bills in kWh; convert gas with 1 therm = 29.3 kWh." },
      { name: "Describe the building", text: "Choose residential, commercial or industrial and a cold, moderate or hot climate, and optionally the number of occupants." },
      { name: "Read the rating", text: "See the EUI, the energy per person, an efficiency rating and suggestions." },
    ],
    faq: [
      { q: "What is energy use intensity (EUI)?", a: "Annual energy use divided by floor area, so buildings of different sizes can be compared. The calculator reports kWh per sq ft per year; multiply by 3.412 for kBtu/sq ft, the unit ENERGY STAR Portfolio Manager uses, or by 10.764 for kWh/m²." },
      { q: "What is a good EUI?", a: "ENERGY STAR's US national median site EUI is about 53 kBtu/sq ft (15.5 kWh/sq ft) for offices and about 60 kBtu/sq ft for multifamily housing. For homes, the calculator rates below 8 kWh/sq ft as excellent, 8–15 as good, 15–22.5 as fair and above that as poor, with higher limits for commercial and industrial buildings and for cold or hot climates." },
      { q: "How do I include gas and other fuels?", a: "Convert them to kWh and add them: 1 therm of natural gas = 29.3 kWh, 1 US gallon of heating oil ≈ 40.6 kWh, 1 m³ of natural gas ≈ 10.5 kWh." },
      { q: "Why does climate matter?", a: "Cold climates need more heating and hot climates more cooling, so the same building uses different amounts of energy in different places. The calculator relaxes the thresholds for cold and hot climates." },
      { q: "What improves EUI the most?", a: "Usually air sealing and insulation, efficient heat pumps, LED lighting with controls, and fixing schedules and setpoints. An energy audit ranks the options for your building." },
    ],
  },
  relatedTools: [
    "hvac-load-calculator",
    "cooling-load-calculator-architecture",
    "insulation-thickness-calculator"
  ]
};
