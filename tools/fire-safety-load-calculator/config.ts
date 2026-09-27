export const fireSafetyLoadCalculatorConfig = {
  name: "Fire Safety Load Calculator",
  slug: "fire-safety-load-calculator",
  category: "architecture",
  description: "Calculate fire load of buildings instantly. Estimate heat energy, fire load density, and risk level using this free online fire safety calculator.",
  icon: "🔥",
  color: "#058554",
  featured: false,
  keywords: [
    "fire load calculator",
    "fire safety calculation",
    "building fire load",
    "MJ per square meter calculator",
    "fire risk assessment tool",
    "fire load density",
    "combustible materials"
  ],
  seo: {
    title: "Fire Load Calculator – Fire Load Density (MJ/m²)",
    description: "Add up the combustible materials in a space and get the total heat energy, fire load density in MJ/m² and a risk level. For fire safety assessments.",
    keywords: "fire load calculator, fire safety calculation, building fire load, MJ per square meter calculator, fire risk assessment tool",
    og: {
      title: "Fire Safety Load Calculator – Building Fire Risk Assessment",
      description: "Calculate fire load density and assess fire risk for buildings. Instant results for fire safety engineering.",
      type: "website",
      url: "/tools/architecture/fire-safety-load-calculator"
    },
    howToSteps: [
      { name: "Enter the floor area", text: "Type the floor area of the compartment in square meters (1 m² = 10.76 sq ft)." },
      { name: "Choose the occupancy", text: "Select residential, office, commercial, industrial or warehouse." },
      { name: "List the combustibles", text: "Add each material with its mass in kg; calorific values fill in for preset materials such as wood, paper and plastics." },
      { name: "Read the results", text: "See the total heat energy in MJ, the fire load density in MJ/m² and the risk level." },
    ],
    faq: [
      { q: "What is fire load density?", a: "The total heat that all combustible contents could release if burned, divided by the floor area: q = Σ (mass × calorific value) ÷ area, in MJ/m². 500 kg of wood (about 17.5 MJ/kg) in a 20 m² room gives 437.5 MJ/m²." },
      { q: "What are typical fire load densities?", a: "Eurocode EN 1991-1-2 gives average values of about 780 MJ/m² for dwellings, 420 MJ/m² for offices, 600 MJ/m² for shops and 1,500 MJ/m² or more for libraries. Warehouses vary widely with what they store." },
      { q: "How does the calculator rate risk?", a: "Below 400 MJ/m² is low, 400–800 medium, 800–1,200 high and above 1,200 very high. These bands are a guide; codes such as NFPA 557 (US) and EN 1991-1-2 set how fire load is used in design." },
      { q: "What should be included?", a: "All movable and fixed combustibles: furniture, stored goods, paper, packaging, plastics, textiles and combustible finishes. Leave out concrete, masonry, steel and glass." },
      { q: "How does fire load affect building design?", a: "Higher fire loads need longer fire resistance for the structure, sprinklers, smaller compartments or more exits. In performance-based design the fire load density drives the design fire used to check the structure." },
    ],
  },
  relatedTools: [
    "concrete-volume-calculator",
    "construction-cost-estimator",
    "room-area-calculator"
  ]
};
