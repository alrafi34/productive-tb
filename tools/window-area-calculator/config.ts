export const windowAreaCalculatorConfig = {
  name: "Window Area Calculator",
  slug: "window-area-calculator",
  category: "architecture",
  description: "Calculate total window area for multiple windows with instant results. Perfect for material estimation, cost calculation, and construction planning.",
  icon: "🪟",
  color: "#058554",
  featured: false,
  keywords: [
    "window area calculator",
    "calculate window size",
    "glass area calculator",
    "architecture calculator",
    "construction area tool",
    "window dimensions",
    "window measurement",
    "glazing calculator"
  ],
  seo: {
    title: "Window Area Calculator – Total Window Sq Ft & m²",
    description: "Add up the area of every window in a room or house in square feet or square meters. Enter each width and height, then export the list as CSV.",
    keywords: "window area calculator, calculate window size, glass area calculator, architecture calculator, construction area tool",
    og: {
      title: "Window Area Calculator – Free Online Tool",
      description: "Calculate total window area instantly for multiple windows with unit conversion.",
      type: "website",
      url: "/tools/architecture/window-area-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select millimeters, centimeters, meters, inches or feet." },
      { name: "Enter each window", text: "Type the width and height; the area of each window appears as you type." },
      { name: "Add more windows", text: "Click Add Window for every window in the room or house." },
      { name: "Read the total", text: "See the total window area and export the list as text or CSV." },
    ],
    faq: [
      { q: "How do I calculate window area?", a: "Multiply width by height. A 36 in × 48 in window is 1,728 sq in, or 12 sq ft (1.11 m²). Measure the glass for glazing and film, or the full frame for wall deductions." },
      { q: "How much window area does a room need?", a: "US codes (IRC R303) require glazing of at least 8% of the floor area in habitable rooms, with half of that openable for ventilation. A 150 sq ft bedroom needs 12 sq ft of glass, 6 sq ft of it openable." },
      { q: "What is window-to-wall ratio?", a: "Total window area divided by gross exterior wall area. Energy codes such as ASHRAE 90.1 and the IECC use about 30–40% as a limit for simple compliance routes; above that, better glass or a full energy model is needed." },
      { q: "Should I subtract windows when painting or siding?", a: "Yes. Subtract each window and door from the wall area, then add 5–10% for waste. Small windows under about 1 m² (10 sq ft) are sometimes left in to cover waste." },
      { q: "How do I convert square inches to square feet?", a: "Divide by 144. To convert square feet to square meters, multiply by 0.0929." },
    ],
  },
  relatedTools: [
    "floor-area-calculator",
    "wall-area-calculator",
    "room-area-calculator"
  ]
};
