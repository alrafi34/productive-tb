export const rainwaterHarvestingCalculatorConfig = {
  name: "Rainwater Harvesting Calculator",
  slug: "rainwater-harvesting-calculator",
  category: "architecture",
  description: "Estimate how much rainwater you can collect using our free rainwater harvesting calculator. Calculate roof water capacity instantly with accurate results.",
  icon: "🌧️",
  color: "#058554",
  featured: false,
  keywords: [
    "rainwater harvesting calculator",
    "water collection calculator",
    "roof water calculation",
    "rainwater tank size calculator",
    "sustainable water tools",
    "water conservation calculator",
    "rain barrel calculator"
  ],
  seo: {
    title: "Rainwater Harvesting Calculator – Gallons & Liters",
    description: "Work out how much rainwater a roof can collect from its area, the annual rainfall and the runoff coefficient, in liters or gallons per year, month and day.",
    keywords: "rainwater harvesting calculator, water collection calculator, roof water calculation, rainwater tank size calculator, sustainable water tools",
    og: {
      title: "Rainwater Harvesting Calculator – Free Water Collection Tool",
      description: "Calculate rainwater collection potential from your roof. Get instant estimates for tank sizing and water savings.",
      type: "website",
      url: "/tools/architecture/rainwater-harvesting-calculator"
    },
    howToSteps: [
      { name: "Choose the units", text: "Metric uses m² and mm and gives liters; imperial uses sq ft and inches and gives gallons." },
      { name: "Enter the roof area", text: "Type the roof's footprint, its horizontal projection, not the sloped area." },
      { name: "Enter the rainfall", text: "Type the average annual rainfall for your location." },
      { name: "Set the runoff coefficient", text: "Use about 0.8–0.9 for metal and tile roofs and 0.75–0.85 for asphalt shingles." },
      { name: "Read the harvest", text: "See the water collected per year, month and day and a suggested tank size." },
    ],
    faq: [
      { q: "How much rainwater can I collect from my roof?", a: "Metric: liters = roof area (m²) × rainfall (mm) × runoff coefficient. Imperial: gallons = roof area (sq ft) × rainfall (in) × 0.623 × coefficient. A 1,500 sq ft roof with 40 in of rain a year and a coefficient of 0.85 collects about 31,800 US gallons." },
      { q: "What runoff coefficient should I use?", a: "About 0.9 for metal, 0.8–0.9 for clay and concrete tiles, 0.75–0.85 for asphalt shingles and 0.5 or less for green roofs. The coefficient also covers first-flush diversion and gutter losses." },
      { q: "Where do I find rainfall data?", a: "From your national weather service: NOAA climate normals in the US, the Met Office in the UK or national meteorological services elsewhere. Use the 30-year average annual rainfall." },
      { q: "How big should the tank be?", a: "Enough to carry you through dry spells; the calculator suggests one to two months of the average harvest. For garden watering only, 50–100 gallons (200–400 liters) per 1,000 sq ft of roof is a practical start." },
      { q: "Is rainwater harvesting legal?", a: "Yes, almost everywhere in the US and Europe, and several US states offer rebates. Colorado limits households to two barrels totaling 110 gallons, and drinking-water use normally needs treatment and approval." },
    ],
  },
  relatedTools: [
    "excavation-volume-calculator",
    "drainage-flow-calculator",
    "concrete-volume-calculator"
  ]
};
