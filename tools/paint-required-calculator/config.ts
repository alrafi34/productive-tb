export const paintRequiredCalculatorConfig = {
  name: "Paint Required Calculator",
  slug: "paint-required-calculator",
  description: "Calculate how much paint you need for your walls or rooms. Free online paint calculator with instant results, unit conversion, and accurate estimates.",
  category: "architecture",
  icon: "🎨",
  free: true,
  seo: {
    title: "Paint Calculator – Gallons or Liters for a Room",
    description: "Work out how much paint a room needs from its size or wall area, openings and number of coats: US gallons when you measure in feet, liters in meters.",
    keywords: [
      "paint calculator",
      "paint required calculator",
      "wall paint estimator",
      "paint coverage calculator",
      "room paint calculator",
      "paint estimation tool",
      "how much paint do i need",
      "paint quantity calculator",
      "painting calculator",
      "paint coverage estimator"
    ],
    openGraph: {
      title: "Paint Calculator – Estimate Wall Paint Required Online",
      description: "Calculate how much paint you need for your walls or rooms. Instant results with unit conversion and accurate estimates.",
      type: "website",
      url: "/tools/architecture/paint-required-calculator"
    },
    howToSteps: [
      { name: "Choose the mode", text: "Enter the room's length, width and height, or the total area to paint." },
      { name: "Choose the unit", text: "Feet gives the answer in US gallons; meters gives liters." },
      { name: "Set coats and coverage", text: "Pick the number of coats (usually 2) and check the coverage on the can: about 350–400 sq ft per gallon or 9–12 m² per liter." },
      { name: "Subtract openings", text: "Enter the area of doors and windows, then read the paint needed and the amount to buy." },
    ],
    faq: [
      { q: "How much paint do I need for a room?", a: "Paint = net wall area × coats ÷ coverage. A 12 × 10 ft room with 10 ft walls has 440 sq ft of wall; minus 50 sq ft of openings and with two coats that is 780 sq ft, or 2.2 gallons at 350 sq ft per gallon. Buy 3 gallons, or 2 gallons and 1 quart." },
      { q: "How much area does a gallon of paint cover?", a: "About 350–400 sq ft per US gallon (3.785 liters) for one coat on smooth, primed walls, which is about 9–10 m² per liter. Rough or porous surfaces take 20–30% more paint." },
      { q: "How many coats do I need?", a: "Two coats for most repaints and color changes. One may be enough for the same color in good condition; dark-to-light changes or new drywall usually need a primer first." },
      { q: "How much paint do I need for a ceiling?", a: "Ceiling area = length × width. A 12 × 10 ft ceiling is 120 sq ft, about one-third of a gallon per coat, so a gallon covers two coats." },
      { q: "How do I convert gallons to liters?", a: "1 US gallon = 3.785 liters and 1 UK gallon = 4.546 liters. Paint in Europe is sold in 1, 2.5, 5 and 10 liter tins; in the US in quarts, gallons and 5-gallon buckets." },
    ],
  },
  features: [
    "Room dimensions mode",
    "Custom area mode",
    "Real-time calculations",
    "Unit conversion (ft ↔ m)",
    "Multiple coats support",
    "Openings deduction",
    "Smart rounding",
    "Calculation history"
  ]
};
