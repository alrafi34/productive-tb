export const tileQuantityCalculatorConfig = {
  name: "Tile Quantity Calculator",
  slug: "tile-quantity-calculator",
  description: "Easily calculate how many tiles you need for your floor or wall. Enter room size, tile dimensions, and waste percentage to get accurate results instantly.",
  category: "architecture",
  icon: "🔲",
  free: true,
  seo: {
    title: "Tile Calculator – How Many Tiles Do I Need?",
    description: "Work out how many floor or wall tiles you need from the room size or area and the tile size, with a waste allowance. Feet, meters, inches or cm.",
    keywords: [
      "tile calculator",
      "tile quantity calculator",
      "floor tile calculator",
      "how many tiles do I need",
      "tile area calculator",
      "tile estimator",
      "flooring calculator",
      "wall tile calculator",
      "tile coverage calculator",
      "ceramic tile calculator"
    ],
    openGraph: {
      title: "Tile Quantity Calculator – Calculate Tiles Needed for Floor or Wall",
      description: "Calculate exact number of tiles needed for your floor or wall with waste percentage adjustment.",
      type: "website",
      url: "/tools/architecture/tile-quantity-calculator"
    },
    howToSteps: [
      { name: "Choose the input", text: "Enter the room's length and width, or the total area to tile." },
      { name: "Choose the units", text: "Select the unit for the room and, separately, for the tiles." },
      { name: "Enter the tile size", text: "Type the tile length and width, or pick a common size such as 12 × 12 in or 60 × 60 cm." },
      { name: "Set the waste", text: "Choose 10% for straight layouts and 15% for diagonal or patterned layouts." },
      { name: "Read the quantity", text: "See the number of tiles without and with waste." },
    ],
    faq: [
      { q: "How do I calculate how many tiles I need?", a: "Tiles = area ÷ area of one tile, plus waste, rounded up. A 10 × 12 ft floor (120 sq ft) with 12 × 12 in tiles needs 120 tiles, or 132 with 10% waste." },
      { q: "How much extra tile should I buy?", a: "About 10% for straight layouts, 15% for diagonal, herringbone or large-format tiles, and 20% for rooms with many corners. Keep a few spares from the same batch for future repairs." },
      { q: "Should I include grout lines?", a: "For tiles 8 in (20 cm) and larger the difference is small and the waste allowance covers it. For small mosaics or wide joints, add the joint width to the tile size." },
      { q: "How many tiles come in a box?", a: "It varies by tile, so check the square footage per box. 12 × 24 in tiles often come 8 to a box (16 sq ft); divide the area with waste by the coverage per box and round up." },
      { q: "How do I convert square feet to square meters?", a: "Multiply by 0.0929. 120 sq ft is 11.15 m²; a 60 × 60 cm tile covers 0.36 m², so you would need 31 tiles before waste." },
    ],
  },
  features: [
    "Dimension & area modes",
    "Multiple unit support",
    "Waste percentage adjustment",
    "Real-time calculations",
    "Tile size presets",
    "Calculation history",
    "Export functionality",
    "Mobile responsive"
  ]
};
