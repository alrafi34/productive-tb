export const skirtingMaterialCalculatorConfig = {
  name: "Skirting Material Calculator",
  slug: "skirting-material-calculator",
  category: "architecture",
  description: "Easily calculate skirting board requirements for rooms. Enter dimensions, doors, and units to get instant skirting length and cost estimates online.",
  icon: "📏",
  color: "#058554",
  featured: false,
  keywords: [
    "skirting calculator",
    "skirting material calculator",
    "baseboard calculator",
    "room perimeter calculator",
    "construction material estimator",
    "skirting board calculator"
  ],
  seo: {
    title: "Baseboard Calculator – Skirting Length & Cost",
    description: "Work out the length of baseboard (skirting board) for one or more rooms, minus door openings, and the cost at your price per foot or meter.",
    keywords: "skirting calculator, skirting material calculator, baseboard calculator, room perimeter calculator, construction material estimator",
    og: {
      title: "Skirting Material Calculator – Baseboard Estimation Tool",
      description: "Calculate skirting board requirements instantly for single or multiple rooms with cost estimation.",
      type: "website",
      url: "/tools/architecture/skirting-material-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Add the rooms", text: "Enter each room's length and width, the number of doors and the door width." },
      { name: "Add the price", text: "Optionally turn on cost estimation and enter the price per foot or meter and your currency." },
      { name: "Read the total", text: "See the baseboard needed for each room and in total, and export the list." },
    ],
    faq: [
      { q: "How do I calculate how much baseboard I need?", a: "Perimeter minus door openings: 2 × (length + width) − doors × door width. A 12 × 14 ft room with one 3 ft door needs 2 × 26 − 3 = 49 ft." },
      { q: "How much extra should I buy?", a: "Add about 10% for miter cuts and waste, or 15% for rooms with many corners. Baseboard is sold in lengths, commonly 8, 12 or 16 ft in the US and 2.4–5.4 m elsewhere, so round up to whole lengths." },
      { q: "Do I subtract windows?", a: "No. Baseboard runs along the floor, so only door openings, built-in cabinets and other floor-level interruptions are deducted." },
      { q: "What is the difference between baseboard and skirting board?", a: "They are the same trim: baseboard is the usual US term, skirting board the UK and Australian one." },
      { q: "What is a standard door width?", a: "Interior doors in the US are usually 28–36 in (32 in most common), and in the UK and Europe 686–838 mm or 800–900 mm. Measure the opening including the casing." },
    ],
  },
  relatedTools: [
    "room-area-calculator",
    "floor-finish-calculator",
    "paint-required-calculator"
  ]
};
