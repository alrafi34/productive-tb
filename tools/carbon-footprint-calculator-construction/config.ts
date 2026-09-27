export const carbonFootprintCalculatorConstructionConfig = {
  name: "Carbon Footprint Calculator (Construction)",
  slug: "carbon-footprint-calculator-construction",
  category: "architecture",
  description: "Estimate CO2 emissions from construction materials. Calculate carbon footprint instantly with material breakdown and export options.",
  icon: "🌱",
  color: "#058554",
  featured: false,
  keywords: [
    "carbon footprint calculator construction",
    "CO2 calculator building materials",
    "cement steel emissions calculator",
    "construction sustainability tool",
    "embodied carbon calculator",
    "building materials carbon footprint",
    "construction emissions estimator"
  ],
  seo: {
    title: "Embodied Carbon Calculator – Construction CO₂",
    description: "Estimate the embodied carbon of construction materials such as concrete, cement, steel, timber and brick from quantities and emission factors, in kg and t CO₂e.",
    keywords: "carbon footprint calculator construction, CO2 calculator building materials, cement steel emissions calculator, construction sustainability tool, embodied carbon calculator",
    og: {
      title: "Construction Carbon Footprint Calculator – Free CO₂ Estimation Tool",
      description: "Estimate CO₂ emissions from construction materials instantly with detailed breakdowns and export options.",
      type: "website",
      url: "/tools/architecture/carbon-footprint-calculator-construction"
    },
    howToSteps: [
      { name: "Add the materials", text: "Pick materials from the presets or add your own." },
      { name: "Enter quantities", text: "Type the quantity of each material in its unit: kg, tonnes, m³ or pieces." },
      { name: "Check the emission factors", text: "Keep the typical factors, or enter values from the product's Environmental Product Declaration (EPD)." },
      { name: "Read the footprint", text: "See the total CO₂e, the share of each material and the biggest contributor, then export it." },
    ],
    faq: [
      { q: "How is embodied carbon calculated?", a: "Embodied carbon = quantity × emission factor, added up for all materials. 100 m³ of concrete at about 300 kg CO₂e per m³ is 30 t CO₂e; 10 t of rebar at about 1.9 kg CO₂e per kg adds 19 t." },
      { q: "Where do the emission factors come from?", a: "They are typical values from sources such as the ICE database (University of Bath / Circular Ecology) and published EPDs. Real values vary by 20–30% or more with the plant, energy mix and transport, so use product EPDs where you can." },
      { q: "Which materials contribute most?", a: "Usually concrete (because of its cement) and steel, which together often make up most of a building's embodied carbon. Aluminum, glass and insulation foams can also be significant." },
      { q: "How can I reduce embodied carbon?", a: "Use less material through efficient design, specify concrete with supplementary cementitious materials such as fly ash or slag, use recycled steel (electric arc furnace), choose timber where suitable and reuse existing structures." },
      { q: "Is embodied carbon regulated?", a: "Increasingly. Buy Clean policies in several US states and federal programs set limits for some materials, and countries such as France (RE2020), Denmark and the Netherlands set whole-building embodied carbon limits." },
    ],
  },
  relatedTools: [
    "green-building-score-calculator",
    "energy-efficiency-calculator-building",
    "sustainability-index-calculator"
  ]
};
