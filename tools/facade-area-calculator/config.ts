export const facadeAreaCalculatorConfig = {
  name: "Facade Area Calculator",
  slug: "facade-area-calculator",
  category: "architecture",
  description: "Calculate building facade area instantly. Add walls, subtract windows and doors, and get accurate exterior surface area for construction, painting, and materials.",
  icon: "🏛️",
  color: "#058554",
  featured: false,
  keywords: [
    "facade area calculator",
    "wall area calculator",
    "building surface calculator",
    "paint area calculator",
    "construction area tool",
    "exterior wall calculator",
    "cladding area calculator"
  ],
  seo: {
    title: "Facade Area Calculator – Calculate Exterior Wall Area Online",
    description: "Work out the net facade area: add each wall, subtract windows and doors, and get the exterior surface for cladding, paint or insulation in m² or ft².",
    keywords: "facade area calculator, wall area calculator, building surface calculator, paint area calculator, construction area tool",
    og: {
      title: "Facade Area Calculator – Building Surface Area Tool",
      description: "Calculate exterior wall area for construction, painting, and materials. Add multiple walls and subtract openings instantly.",
      type: "website",
      url: "/tools/architecture/facade-area-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select meters (m²) or feet (ft²)." },
      { name: "Add the walls", text: "Add each wall section with its width and height." },
      { name: "Subtract the openings", text: "Add windows, doors and other openings with their size and quantity." },
      { name: "Read the net area", text: "See the gross wall area, the openings area and the net facade area, then export it as CSV or text." },
    ],
    faq: [
      { q: "How do I calculate facade area for irregular walls?", a: "Break the wall into rectangles and triangles, add each rectangle as a wall section, and add a gable triangle as half its base × height. The calculator totals the sections for you." },
      { q: "Should window frames be included in the opening size?", a: "Yes. Measure the full opening including the frame; that is the area that will not be clad or painted." },
      { q: "How much extra material should I order?", a: "Add about 5–10% for paint, 10–15% for siding and cladding, and 15–20% for complex patterns, many openings or irregular surfaces, to cover cuts and waste." },
      { q: "How do I measure a curved wall?", a: "Measure the length along the curve (the arc length) and multiply it by the height. For a segment of a circle, arc length = radius × angle in radians." },
      { q: "How do I convert square meters to square feet?", a: "1 m² = 10.764 ft² and 1 ft² = 0.0929 m². A 120 m² facade is about 1,292 ft²." },
    ],
  },
  relatedTools: [
    "wall-area-calculator",
    "paint-required-calculator",
    "room-area-calculator"
  ]
};
