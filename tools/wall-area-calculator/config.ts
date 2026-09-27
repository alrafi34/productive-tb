export const wallAreaCalculatorConfig = {
  name: "Wall Area Calculator",
  slug: "wall-area-calculator",
  description: "Calculate wall surface area for painting, construction, or renovation. Add multiple walls, subtract doors and windows, and get accurate results instantly.",
  category: "architecture",
  icon: "🧱",
  free: true,
  seo: {
    title: "Wall Area Calculator – Paintable Square Footage",
    description: "Add up wall areas and subtract doors and windows to get the net paintable area in square feet or square meters. For paint, drywall, wallpaper and tile.",
    keywords: [
      "wall area calculator",
      "paint area calculator",
      "construction calculator",
      "surface area wall",
      "room wall area calculator",
      "wall measurement",
      "painting calculator",
      "renovation calculator",
      "wall surface calculator",
      "paintable area calculator"
    ],
    openGraph: {
      title: "Wall Area Calculator – Calculate Wall Surface Area Instantly",
      description: "Calculate wall surface area for painting, construction, or renovation. Add multiple walls, subtract doors and windows for accurate net area.",
      type: "website",
      url: "/tools/architecture/wall-area-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Add the walls", text: "Add each wall with its width and height." },
      { name: "Subtract openings", text: "Add each door and window with its size." },
      { name: "Read the net area", text: "See the gross wall area, the openings and the net area, then export it as CSV or text." },
    ],
    faq: [
      { q: "How do I calculate wall area?", a: "Width × height for each wall, then add them up. For a room, perimeter × ceiling height: a 12 × 14 ft room with 8 ft ceilings has 2 × 26 × 8 = 416 sq ft of wall." },
      { q: "What size are standard doors and windows?", a: "A US interior door is about 3 × 7 ft (21 sq ft) including trim and a typical window about 3 × 5 ft (15 sq ft). Subtract 416 − 21 − 2 × 15 = 365 sq ft of paintable wall." },
      { q: "How many sheets of drywall do I need?", a: "Divide the area by the sheet area and add 10%: a 4 × 8 ft sheet covers 32 sq ft, so 365 sq ft needs 12 sheets, 13 with waste." },
      { q: "How much paint does a wall area need?", a: "About one US gallon per 350–400 sq ft per coat, or one liter per 9–10 m². 365 sq ft with two coats needs about 2 gallons." },
      { q: "How do I handle gable walls?", a: "Split them into a rectangle and a triangle: triangle area = ½ × base × height. Add both as separate walls." },
    ],
  },
  features: [
    "Multiple walls support",
    "Door & window deductions",
    "Real-time calculations",
    "Unit conversion (ft ↔ m)",
    "Auto-save functionality",
    "Export to CSV/Text",
    "Net paintable area",
    "Mobile responsive"
  ]
};
