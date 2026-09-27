export const floorAreaCalculatorConfig = {
  name: "Floor Area Calculator",
  slug: "floor-area-calculator",
  description: "Calculate total built-up floor area of a building.",
  category: "architecture",
  icon: "📐",
  free: true,
  seo: {
    title: "Floor Area Calculator – Rooms & Total Square Footage",
    description: "Add up the floor area of every room and floor in square feet or square meters. Name rooms, group them by floor and export the totals as CSV.",
    keywords: [
      "floor area calculator",
      "building area calculator",
      "room size calculator",
      "square meter calculator",
      "square feet calculator",
      "construction area calculator",
      "built-up area calculator",
      "carpet area calculator",
      "floor space calculator",
      "architecture calculator"
    ],
    openGraph: {
      title: "Floor Area Calculator – Calculate Building & Room Area Online",
      description: "Calculate total floor area for buildings, rooms, and construction plans instantly. Supports multiple rooms, floors, and unit conversions.",
      type: "website",
      url: "/tools/architecture/floor-area-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet or meters as the default unit." },
      { name: "Add the rooms", text: "Add a row for each room with its name, length and width; the area appears as you type." },
      { name: "Group by floor", text: "Turn on floor grouping to see a subtotal for each level." },
      { name: "Export", text: "Read the total floor area and download the table as CSV or a text summary." },
    ],
    faq: [
      { q: "How do I calculate the floor area of a room?", a: "Multiply length by width. A 12 ft × 15 ft bedroom is 180 sq ft (16.7 m²). For an L-shaped room, split it into two rectangles and add them." },
      { q: "What counts in a home's square footage?", a: "In the US, the ANSI Z765 standard counts finished, heated space measured from the outside of exterior walls, and excludes garages, unfinished basements and space under 5 ft high. Listings and appraisals may differ, so check which method is used." },
      { q: "What is gross vs net floor area?", a: "Gross (external or internal) floor area includes walls, stairs and circulation; net or usable area counts only the space inside rooms. In the UK and Europe the RICS Code of Measuring Practice and IPMS define these measures." },
      { q: "How do I convert square feet to square meters?", a: "Divide by 10.764. A 2,000 sq ft house is 185.8 m²." },
      { q: "Can I enter decimals?", a: "Yes. Enter 12.5 ft for 12 ft 6 in, or 3.75 m. Inches convert to decimal feet by dividing by 12." },
    ],
  },
  features: [
    "Multiple room support",
    "Real-time calculations",
    "Unit conversion (m² ↔ ft²)",
    "Floor grouping",
    "Auto-save functionality",
    "Export to CSV/Text",
    "Largest room highlight",
    "Mobile responsive"
  ]
};
