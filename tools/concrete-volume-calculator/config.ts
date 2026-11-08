export const concreteVolumeCalculatorConfig = {
  name: "Concrete Volume Calculator",
  slug: "concrete-volume-calculator",
  description: "Calculate concrete for rectangular, round, triangular and L-shaped slabs, footings, beams and columns in cubic yards and m³, with an optional cost estimate.",
  category: "architecture",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Concrete Calculator – Slab Cubic Yards, m³ & Cost",
    description: "Concrete for any slab shape, footings, beams and columns in cubic yards and m³, with cost at your price, plus cement, sand and gravel for site mixing.",
    keywords: [
      "concrete calculator",
      "concrete volume calculator",
      "slab concrete calculator",
      "concrete slab calculator",
      "how much concrete do i need",
      "cubic yards of concrete calculator",
      "concrete cost calculator",
      "slab volume calculator",
      "footing volume calculator",
      "column volume formula",
      "beam volume calculator",
      "cement calculation tool"
    ],
    openGraph: {
      title: "Concrete Calculator – Slab Cubic Yards, m³ & Cost",
      description: "Concrete for rectangular, round, triangular and L-shaped slabs, footings, beams and columns, with cost and site-mix materials.",
      type: "website",
      url: "/tools/architecture/concrete-volume-calculator"
    },
    howToSteps: [
      { name: "Pick the shape", text: "Choose a rectangular, round, triangular or L-shaped slab, a footing, a beam or a round column." },
      { name: "Choose the unit and enter dimensions", text: "Select feet or meters. Slab thickness is entered in inches or centimeters, or pick a preset such as 4 in, 6 in, 10 cm or 15 cm." },
      { name: "Set the quantity", text: "Enter how many identical pieces there are, and add different pieces to a batch for a total." },
      { name: "Add the price or materials", text: "Optionally enter your price per cubic yard or m³ and currency for a cost, or tick cement and sand for site-mixed concrete." },
      { name: "Read the volume", text: "See the total in cubic yards, cubic feet and m³; add 5–10% when ordering." },
    ],
    faq: [
      { q: "How much concrete do I need for a slab?", a: "Length × width × thickness. A 20 × 20 ft slab 4 in thick is 20 × 20 × 0.333 = 133 cu ft, which is 4.94 cubic yards; order about 5.5 yd³ with 10% extra. In metric, a 6 × 6 m slab 10 cm thick is 3.6 m³." },
      { q: "How much concrete do I need for a 10 × 10 slab?", a: "A 10 × 10 ft slab 4 in thick is 33.3 cu ft, or 1.23 cubic yards; order about 1.4 yd³. In metric, a 3 × 3 m slab 10 cm thick is 0.9 m³." },
      { q: "How thick should a concrete slab be?", a: "4 in (10 cm) for patios, walkways and house floors on grade, 5–6 in (12–15 cm) for driveways and garages, and 6 in or more with reinforcement for heavy vehicles. Local codes and the soil can require more." },
      { q: "How do I calculate an L-shaped or round slab?", a: "Split an L-shape into two rectangles that do not overlap and add them. For a round slab, area = π × radius²; a 12 ft diameter circle 4 in thick is π × 6² × 0.333 = 37.7 cu ft, or 1.4 yd³. A triangle is ½ × base × height × thickness." },
      { q: "How do I convert cubic feet to cubic yards?", a: "Divide by 27. 1 cubic yard = 27 cu ft = 0.765 m³, and 1 m³ = 1.308 cubic yards." },
      { q: "How much concrete does a round column need?", a: "π × radius² × height. A 12 in (0.3 m) diameter column 10 ft tall is π × 0.5² × 10 = 7.85 cu ft, or 0.29 yd³." },
      { q: "How much does concrete cost?", a: "In the US, ready-mix is typically about $150–$200 per cubic yard delivered in 2024, plus short-load and pumping fees; in the UK and Europe roughly £100–£150 or €110–€160 per m³. Enter your local quote for an accurate total." },
      { q: "How many bags of premix do I need?", a: "Divide the volume by the bag yield: an 80 lb bag makes about 0.6 cu ft and a 60 lb bag 0.45 cu ft, so one cubic yard takes about 45 bags of 80 lb. For more than about 1 yd³, ready-mix is usually cheaper." },
      { q: "How much extra concrete should I order?", a: "5–10% more than the calculated volume, to cover uneven subgrade, formwork movement and spillage. Running short means a cold joint, which is worse than a little left over. Suppliers often charge a short-load fee under 3–4 yd³." },
    ],
  },
  features: [
    "Rectangular, round, triangular and L-shaped slabs",
    "Footings, beams and round columns",
    "Slab thickness in inches or centimeters, with presets",
    "Cubic yards, cubic feet and m³",
    "Cost at your price per yard or m³",
    "Cement, sand and gravel for site-mixed concrete",
    "Batch totals, history and CSV export"
  ]
};
