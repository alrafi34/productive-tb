export const roomAreaCalculatorConfig = {
  name: "Room Area Calculator",
  slug: "room-area-calculator",
  description: "Calculate area of a room from dimensions.",
  category: "architecture",
  icon: "🏠",
  free: true,
  seo: {
    title: "Room Area Calculator – Square Feet & Square Meters",
    description: "Room area from length and width in ft, m, yd or in, with extra sections for L-shaped or several rooms, every unit, and tile and paint estimates.",
    keywords: [
      "room area calculator",
      "calculate room size",
      "square feet calculator",
      "room dimensions calculator",
      "floor area calculator",
      "room size calculator",
      "flooring calculator",
      "tile calculator",
      "paint calculator",
      "interior design calculator"
    ],
    openGraph: {
      title: "Room Area Calculator – Calculate Room Size in Square Feet or Meters",
      description: "Free online room area calculator. Enter length and width to instantly calculate room area in square feet, square meters, and more.",
      type: "website",
      url: "/tools/architecture/room-area-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet, meters, yards or inches." },
      { name: "Enter the size", text: "Type the room's length and width; the area appears as you type." },
      { name: "Add sections for L-shaped or several rooms", text: "Press Add a section for each extra rectangle, such as the short leg of an L-shaped room or a second room. The total area adds them all up." },
      { name: "Check the conversions", text: "See the total in square feet, square meters, square yards and square inches." },
      { name: "Use the extras", text: "Optionally estimate tiles from the tile size and waste, or gallons of paint from the coverage per gallon." },
    ],
    faq: [
      { q: "How do I calculate the area of a room?", a: "Multiply length by width. A 12 ft × 14 ft room is 168 sq ft, or 15.6 m². For an L-shaped room, split it into two rectangles that do not overlap and add them; the Add a section button does this for you." },
      { q: "How do I convert square feet to square meters?", a: "Divide square feet by 10.764 (or multiply by 0.0929). 168 sq ft = 15.6 m². Square yards are square feet ÷ 9, which is how carpet is often sold in the US." },
      { q: "How many tiles do I need?", a: "Tiles = room area ÷ area of one tile, plus waste, rounded up. 168 sq ft with 12 in × 12 in tiles is 168 tiles; with 10% waste, 185. Use 15% for diagonal layouts." },
      { q: "How much paint do I need for a room?", a: "One US gallon covers about 350–400 sq ft per coat. Note that the extra here works from floor area; for walls, work out the wall area (perimeter × height, minus doors and windows) and use two coats." },
      { q: "Should closets be included?", a: "Include them for flooring and painting, since they need material too. Leave them out if you are comparing living space or planning furniture." },
      { q: "How do I measure an L-shaped room?", a: "Divide the floor into two rectangles that do not overlap. For example, a 20 × 12 ft main area plus an 8 × 6 ft alcove is 240 + 48 = 288 sq ft. Enter the first rectangle as the main room and the second with Add a section." },
    ],
  },
  features: [
    "Real-time calculations",
    "Multiple unit support",
    "Automatic conversions",
    "Calculation history",
    "Export to text",
    "Copy to clipboard",
    "Tile estimation",
    "Paint coverage",
    "Mobile responsive"
  ]
};
