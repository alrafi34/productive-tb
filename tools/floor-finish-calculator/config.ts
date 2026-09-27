export const floorFinishCalculatorConfig = {
  name: "Floor Finish Calculator",
  slug: "floor-finish-calculator",
  category: "architecture",
  description: "Calculate floor finishing materials easily. Estimate tiles, wood, laminate, and more with accurate wastage calculation. Free online floor calculator tool.",
  icon: "🏗️",
  color: "#058554",
  featured: false,
  keywords: [
    "floor calculator",
    "tile calculator",
    "floor finish estimator",
    "material calculator",
    "tile estimation tool",
    "flooring calculator",
    "wood flooring calculator"
  ],
  seo: {
    title: "Flooring Calculator – Tiles, Planks & Laminate",
    description: "Work out how many tiles, wood planks or laminate boards a floor needs from the room size and piece size, with a waste allowance. In feet or meters.",
    keywords: "floor calculator, tile calculator, floor finish estimator, material calculator, tile estimation tool",
    og: {
      title: "Floor Finish Calculator – Material Estimation Tool",
      description: "Estimate floor finishing materials instantly with accurate wastage calculation for tiles, wood, and laminate.",
      type: "website",
      url: "/tools/architecture/floor-finish-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Pick the material", text: "Choose tile, wood plank, laminate, marble or a custom material, or start from a preset size." },
      { name: "Enter the room and piece sizes", text: "Type the room length and width and the length and width of one tile or board." },
      { name: "Set the waste", text: "Set the waste allowance for cuts and breakage, then read the number of pieces needed." },
    ],
    faq: [
      { q: "How do I calculate flooring for a room?", a: "Pieces = room area ÷ area of one piece, plus waste, rounded up. A 12 × 15 ft room (180 sq ft) with 12 × 12 in tiles needs 180 tiles, or 198 with 10% waste." },
      { q: "How much waste should I add?", a: "About 5–10% for straight-laid tiles and planks, 10–15% for laminate and wood with many cuts, and 15–20% for diagonal or herringbone patterns." },
      { q: "How do I enter tile sizes in inches?", a: "Divide by 12 to get feet: a 12 × 24 in tile is 1 × 2 ft and a 6 × 36 in plank is 0.5 × 3 ft. For metric, a 60 × 60 cm tile is 0.6 × 0.6 m." },
      { q: "How many boxes do I need?", a: "Divide the number of pieces by the pieces per box, or the area with waste by the coverage per box printed on the carton, and round up. Buy all boxes from the same batch so the color matches." },
      { q: "Should closets be included?", a: "Yes, if they get the same flooring. Measure them separately and add them to the room area." },
    ],
  },
  relatedTools: [
    "tile-quantity-calculator",
    "room-area-calculator",
    "paint-required-calculator"
  ]
};
