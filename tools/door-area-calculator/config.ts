export const doorAreaCalculatorConfig = {
  name: "Door Area Calculator",
  slug: "door-area-calculator",
  category: "architecture",
  description: "Calculate door opening area instantly using height and width. Perfect for material estimation, cost calculation, and construction planning.",
  icon: "🚪",
  color: "#058554",
  featured: false,
  keywords: [
    "door area calculator",
    "calculate door size",
    "door opening area",
    "construction calculator",
    "area calculator",
    "door dimensions",
    "door measurement",
    "material estimation"
  ],
  seo: {
    title: "Door Area Calculator — Sq Ft & Sq M",
    description: "Calculate door area in square feet and square metres for single, double and sliding doors. For painting, glazing and material take-offs.",
    keywords: "door area calculator, calculate door size, door opening area, construction calculator, area calculator",
    og: {
      title: "Door Area Calculator – Free Online Tool",
      description: "Calculate door opening area instantly with multiple unit support.",
      type: "website",
      url: "/tools/architecture/door-area-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet, inches, meters or centimeters." },
      { name: "Enter the door size", text: "Type the height and width of the door or pick a standard door size." },
      { name: "Add the frame if needed", text: "Tick Include Frame Margin and enter the frame thickness to get the rough opening area." },
      { name: "Read the area", text: "See the area in square feet and square meters, ready to copy or export." },
    ],
    faq: [
      { q: "How do you calculate the area of a door?", a: "Multiply height by width. A standard US interior door of 80 in × 32 in (6 ft 8 in × 2 ft 8 in) is 2,560 sq in, or 17.8 sq ft (1.65 m²)." },
      { q: "What are standard door sizes?", a: "In the US most interior and exterior doors are 80 in (6 ft 8 in) tall and 24–36 in wide, with 36 in usual for front doors. In the UK common sizes are 1,981 × 762 mm and 1,981 × 838 mm; in much of Europe 2,010 × 800–900 mm." },
      { q: "Should I include the frame?", a: "Include it when you are working out the wall opening to frame or the area to deduct from a wall. For painting or veneering the door leaf itself, use the leaf size only." },
      { q: "How do I use door area when painting a room?", a: "Subtract each door (and window) from the wall area before working out how much paint you need, then paint the door separately: both faces plus the edges is roughly 2.1 × the single-face area." },
      { q: "How do I convert square feet to square meters?", a: "Multiply square feet by 0.0929, or divide square meters by 0.0929. 17.8 sq ft is 1.65 m²." },
    ],
  },
  relatedTools: [
    "window-area-calculator",
    "floor-area-calculator",
    "wall-area-calculator"
  ]
};
