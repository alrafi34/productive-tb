export const plotAreaCalculatorConfig = {
  name: "Plot Area Calculator",
  slug: "plot-area-calculator",
  description: "Compute total land or plot area.",
  category: "architecture",
  icon: "📏",
  free: true,
  seo: {
    title: "Plot Area Calculator – Land Size in Sq Ft, m² & Acres",
    description: "Calculate the area of a plot of land from its shape: rectangle, square, triangle or trapezoid. Enter feet, yards or meters; results include acres.",
    keywords: [
      "plot area calculator",
      "land area calculator",
      "calculate plot size",
      "land measurement calculator",
      "square meter calculator",
      "plot size calculator",
      "land size calculator",
      "property area calculator",
      "real estate calculator",
      "surveying calculator"
    ],
    openGraph: {
      title: "Plot Area Calculator – Calculate Land or Plot Size Instantly",
      description: "Free online plot area calculator for land measurement. Calculate land size using rectangle, triangle, square, or trapezoid formulas.",
      type: "website",
      url: "/tools/architecture/plot-area-calculator"
    },
    howToSteps: [
      { name: "Pick the shape", text: "Choose rectangle, square, triangle or trapezoid." },
      { name: "Choose the unit", text: "Select feet, yards or meters." },
      { name: "Enter the dimensions", text: "Type the lengths the shape needs, such as base and height for a triangle." },
      { name: "Read the area", text: "See the area in square feet, square meters and acres, and save it to your history." },
    ],
    faq: [
      { q: "How do I calculate the area of a plot of land?", a: "Multiply length by width for a rectangle. For a triangle use ½ × base × height, and for a trapezoid ½ × (top + bottom) × height. A 100 ft × 150 ft lot is 15,000 sq ft, or 0.34 acres." },
      { q: "How do I measure an irregular plot?", a: "Split it into triangles and rectangles, work out each area and add them up. For a plot defined by survey coordinates, a surveyor's or GIS area is more accurate." },
      { q: "How many square feet are in an acre?", a: "43,560 sq ft, which is 4,046.9 m² or 0.4047 hectares. A hectare is 10,000 m², about 2.471 acres." },
      { q: "What is a typical residential lot size?", a: "In the US the median new single-family lot is around 8,000–9,000 sq ft (about 0.2 acres). In the UK and much of Europe, suburban plots are often 200–500 m²." },
      { q: "What is the difference between plot area and built-up area?", a: "Plot area is the whole piece of land. Built-up (or footprint) area is the part covered by buildings, which zoning rules often limit as lot coverage or floor area ratio." },
    ],
  },
  features: [
    "Multiple shape support",
    "Real-time calculations",
    "Unit conversion (m², ft², yd²)",
    "Visual shape preview",
    "Calculation history",
    "Export to text",
    "Copy to clipboard",
    "Mobile responsive"
  ]
};
