export const concreteVolumeCalculatorConfig = {
  name: "Concrete Volume Calculator",
  slug: "concrete-volume-calculator",
  description: "Calculate exact volume of concrete required for slabs, columns, beams, and footings. Free online calculator with batch support and unit conversion.",
  category: "architecture",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Concrete Calculator – Cubic Yards & m³ for Slabs",
    description: "Calculate concrete for slabs, footings, beams and round columns in cubic yards, cubic feet and m³, with cement, sand and gravel for site-mixed concrete.",
    keywords: [
      "concrete volume calculator",
      "cement calculation tool",
      "construction calculator",
      "slab volume calculator",
      "column volume formula",
      "concrete calculator",
      "building materials calculator",
      "footing volume calculator",
      "beam volume calculator",
      "construction volume estimator"
    ],
    openGraph: {
      title: "Concrete Volume Calculator – Slab, Column, Footing | Free Online Tool",
      description: "Calculate exact volume of concrete for construction projects with instant results.",
      type: "website",
      url: "/tools/architecture/concrete-volume-calculator"
    },
    howToSteps: [
      { name: "Pick the shape", text: "Choose slab, footing, beam or round column." },
      { name: "Choose the unit", text: "Select feet or meters and enter the dimensions; use decimal feet for inches (4 in = 0.333 ft)." },
      { name: "Set the quantity", text: "Enter how many identical pieces there are, and add different pieces to a batch for a total." },
      { name: "Add materials if mixing on site", text: "Tick cement and sand and pick a mix ratio to get cement bags, sand and gravel." },
      { name: "Read the volume", text: "See the total in m³, cubic feet and cubic yards; add 5–10% when ordering." },
    ],
    faq: [
      { q: "How much concrete do I need for a slab?", a: "Length × width × thickness. A 20 × 20 ft slab 4 in thick is 20 × 20 × 0.333 = 133 cu ft, which is 4.94 cubic yards; order about 5.5 yd³ with 10% extra. In metric, a 6 × 6 m slab 100 mm thick is 3.6 m³." },
      { q: "How do I convert cubic feet to cubic yards?", a: "Divide by 27. 1 cubic yard = 27 cu ft = 0.765 m³, and 1 m³ = 1.308 cubic yards." },
      { q: "How much concrete does a round column need?", a: "π × radius² × height. A 12 in (0.3 m) diameter column 10 ft tall is π × 0.5² × 10 = 7.85 cu ft, or 0.29 yd³." },
      { q: "How many bags of premix do I need?", a: "Divide the volume by the bag yield: an 80 lb bag makes about 0.6 cu ft and a 60 lb bag 0.45 cu ft, so one cubic yard takes about 45 bags of 80 lb. For more than about 1 yd³, ready-mix is usually cheaper." },
      { q: "How much extra concrete should I order?", a: "5–10% more than the calculated volume, to cover uneven subgrade, formwork movement and spillage. Running short means a cold joint, which is worse than a little left over." },
    ],
  },
  features: [
    "Multiple shape calculations (slab, column, beam, footing)",
    "Real-time volume calculations",
    "Unit conversion (ft ↔ m)",
    "Batch calculation support",
    "Quantity multiplier",
    "Calculation history",
    "Export to CSV and text",
    "Mobile responsive"
  ]
};
