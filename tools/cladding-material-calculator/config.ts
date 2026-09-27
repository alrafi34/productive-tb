export const claddingMaterialCalculatorConfig = {
  name: "Cladding Material Calculator",
  slug: "cladding-material-calculator",
  category: "architecture",
  description: "Calculate cladding materials instantly. Estimate panels, surface area, wastage, and cost for facade projects using this free online cladding calculator.",
  icon: "🏗️",
  color: "#058554",
  featured: false,
  keywords: [
    "cladding calculator",
    "facade material calculator",
    "panel estimator",
    "construction calculator",
    "building materials estimator",
    "cladding panel calculator",
    "exterior cladding calculator"
  ],
  seo: {
    title: "Cladding Calculator – Panels, Siding & Waste",
    description: "Work out how many cladding panels or siding boards a facade needs: add each wall, set the panel coverage and waste, and get the count and cost.",
    keywords: "cladding calculator, facade material calculator, panel estimator, construction calculator, building materials estimator",
    og: {
      title: "Cladding Material Calculator – Panel & Material Estimator",
      description: "Calculate cladding materials instantly. Estimate panels, surface area, wastage, and cost for facade projects.",
      type: "website",
      url: "/tools/architecture/cladding-material-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Add the walls", text: "Enter the width and height of each wall section; add as many as you need." },
      { name: "Enter the panel size", text: "Type the coverage width and height of one panel or board, not its overall size." },
      { name: "Set waste and cost", text: "Set the waste allowance and, optionally, the price per panel and currency." },
      { name: "Read the order", text: "See the total area, panels needed including waste and the total cost, then export it." },
    ],
    faq: [
      { q: "How many cladding panels do I need?", a: "Panels = wall area ÷ area covered by one panel, plus waste, rounded up. 400 sq ft of wall with 12 in × 12 ft boards (12 sq ft each) needs 33.3 boards; with 10% waste, 37." },
      { q: "How much waste should I allow?", a: "About 10% for plain rectangular walls, 15–20% for walls with many openings, gables and corners, and up to 25% for stone veneer or patterns that must line up." },
      { q: "Should I subtract windows and doors?", a: "Subtract large openings. Keep the waste allowance on the higher side to cover the cuts around them; openings under about 10 sq ft (1 m²) can simply be left in." },
      { q: "What is coverage width?", a: "The width a board covers once installed, after overlaps or tongue-and-groove joints. A lap siding board sold as 8¼ in wide may cover only 7 in, so always use the coverage from the manufacturer." },
      { q: "Does the cost include installation?", a: "No. It is panels × price per panel. Add trims, fasteners, membranes, battens and labor separately." },
    ],
  },
  relatedTools: [
    "facade-area-calculator",
    "wall-area-calculator",
    "paint-required-calculator"
  ]
};
