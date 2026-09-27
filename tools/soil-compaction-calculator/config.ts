export const soilCompactionCalculatorConfig = {
  name: "Soil Compaction Calculator",
  slug: "soil-compaction-calculator",
  category: "architecture",
  description: "Quickly calculate soil compaction percentage using field and maximum dry density. Free online tool for civil engineers, construction, and site analysis.",
  icon: "🏗️",
  color: "#058554",
  featured: false,
  keywords: [
    "soil compaction calculator",
    "compaction percentage",
    "dry density calculator",
    "civil engineering tools",
    "proctor test calculation",
    "field density calculator",
    "soil testing calculator"
  ],
  seo: {
    title: "Soil Compaction Calculator – Relative Compaction %",
    description: "Work out relative compaction from field dry density and Proctor maximum dry density, and check it against 90%, 95%, 98% or 100% specifications.",
    keywords: "soil compaction calculator, compaction percentage, dry density calculator, civil engineering tools, proctor test calculation",
    og: {
      title: "Soil Compaction Calculator – Free Soil Testing Tool",
      description: "Calculate soil compaction percentage instantly. Compare field density with maximum dry density for quality control.",
      type: "website",
      url: "/tools/architecture/soil-compaction-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select g/cm³ or kN/m³ for density." },
      { name: "Enter the field density", text: "Type the dry density measured on site with a nuclear gauge, sand cone or core." },
      { name: "Enter the maximum dry density", text: "Type the maximum dry density from the laboratory Proctor test for the same soil." },
      { name: "Pick the specification", text: "Choose 90%, 95%, 98% or 100%, then read the relative compaction and the pass or fail result." },
    ],
    faq: [
      { q: "How is relative compaction calculated?", a: "Relative compaction = field dry density ÷ maximum dry density × 100. A field density of 1.82 g/cm³ against a Proctor maximum of 1.90 g/cm³ is 95.8%." },
      { q: "What compaction is usually required?", a: "Specifications commonly ask for 95% of standard Proctor (ASTM D698) under slabs and footings, 90–95% of modified Proctor (ASTM D1557) under pavements, and 90% for general fill and landscaping. Follow the project's geotechnical report." },
      { q: "What is the difference between standard and modified Proctor?", a: "Both compact soil in a mold to find its maximum dry density at the optimum moisture content. Modified Proctor uses about 4.5 times more compaction energy, so its maximum density is higher and 95% of it is a stricter target than 95% of standard Proctor." },
      { q: "Why is the result over 100%?", a: "Field compaction can exceed the laboratory maximum when heavy rollers put in more energy than the test, or when the Proctor sample did not match the soil tested. Check that the right test result was used." },
      { q: "How often should compaction be tested?", a: "Typically one test per lift for each 2,500–5,000 sq ft (250–500 m²) of fill under buildings, and more often in trenches and around structures. Project specifications and local codes set the exact frequency." },
    ],
  },
  relatedTools: [
    "soil-bearing-capacity-calculator",
    "foundation-depth-calculator",
    "excavation-volume-calculator"
  ]
};
