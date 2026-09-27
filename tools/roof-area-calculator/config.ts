export const roofAreaCalculatorConfig = {
  name: "Roof Area Calculator",
  slug: "roof-area-calculator",
  category: "architecture",
  description: "Calculate roof surface area for flat, gable, hip, and shed roofs. Free online tool with instant results for construction planning.",
  icon: "🏠",
  color: "#058554",
  featured: false,
  keywords: [
    "roof area calculator",
    "calculate roof size",
    "gable roof area",
    "roof measurement tool",
    "construction calculator",
    "roofing calculator",
    "roof square footage",
    "hip roof calculator"
  ],
  seo: {
    title: "Roof Area Calculator – Squares, Sq Ft & m²",
    description: "Calculate the sloped area of a flat, gable, hip or shed roof from its footprint and pitch, in square feet, roofing squares and square meters.",
    keywords: "roof area calculator, calculate roof size, gable roof area, roof measurement tool, construction calculator",
    og: {
      title: "Roof Area Calculator – Free Online Tool",
      description: "Calculate roof surface area with instant results for multiple roof types and dimensions.",
      type: "website",
      url: "/tools/architecture/roof-area-calculator"
    },
    howToSteps: [
      { name: "Choose the units", text: "Select imperial (feet) or metric (meters)." },
      { name: "Pick the roof type", text: "Choose flat, gable, hip or shed." },
      { name: "Enter the footprint", text: "Type the length and width of the roof in plan, including the overhangs." },
      { name: "Enter the pitch", text: "Type the roof angle in degrees; a 6/12 pitch is 26.6° (see the roof pitch calculator)." },
      { name: "Read the area", text: "See the roof area in sq ft, roofing squares and m², and export it." },
    ],
    faq: [
      { q: "How do I calculate roof area from the footprint?", a: "Divide the plan area by the cosine of the pitch. A 40 × 30 ft house with overhangs and a 6/12 (26.6°) pitch has 1,200 ÷ 0.894 = 1,342 sq ft of roof, whether it is a gable or a hip roof with all faces at that pitch." },
      { q: "What is a roofing square?", a: "100 sq ft of roof surface, the unit shingles and roofing are priced in across the US. 1,342 sq ft is 13.4 squares; three bundles of standard shingles cover one square." },
      { q: "How much extra material should I order?", a: "About 10% for simple gable roofs and 15% for hip roofs and roofs with valleys and dormers, plus starter strips and ridge caps." },
      { q: "How do I convert pitch to degrees?", a: "Angle = arctan(rise ÷ run). 4/12 is 18.4°, 6/12 is 26.6°, 8/12 is 33.7°, 12/12 is 45°." },
      { q: "Should I measure from the ground?", a: "Yes, that is the safe way: measure the house footprint, add the overhangs, and apply the pitch factor. Satellite roof reports and drone surveys are alternatives when the roof is complex." },
    ],
  },
  relatedTools: [
    "floor-area-calculator",
    "wall-area-calculator",
    "paint-required-calculator"
  ]
};
