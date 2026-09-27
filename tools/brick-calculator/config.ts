export const brickCalculatorConfig = {
  name: "Brick Calculator",
  slug: "brick-calculator",
  description: "Calculate how many bricks you need for your wall instantly. Enter wall dimensions, brick size, and get accurate results with wastage included.",
  category: "architecture",
  icon: "🧱",
  free: true,
  seo: {
    title: "Brick Calculator – How Many Bricks for a Wall?",
    description: "Work out how many bricks a wall needs from its size, brick size, mortar joint and wythes, less openings, plus waste. US modular, UK/EU and other sizes.",
    keywords: [
      "brick calculator",
      "how many bricks needed",
      "wall brick estimator",
      "construction calculator",
      "brick quantity calculator",
      "brick estimation tool",
      "masonry calculator",
      "building brick calculator",
      "brick wall calculator",
      "construction material calculator"
    ],
    openGraph: {
      title: "Brick Calculator – Estimate Bricks for Wall Construction",
      description: "Calculate exact number of bricks needed for wall construction with wastage adjustment.",
      type: "website",
      url: "/tools/architecture/brick-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet or meters for the wall." },
      { name: "Enter the wall", text: "Type the wall length and height, and the area of any doors and windows to leave out." },
      { name: "Pick the brick and wall type", text: "Choose a brick size, such as US modular or UK/EU standard, and single or double wythe." },
      { name: "Set the joint and waste", text: "Enter the mortar joint (⅜ in or 10 mm is standard) and the waste allowance, then read the brick count." },
    ],
    faq: [
      { q: "How many bricks are in a square foot?", a: "About 6.75 US modular bricks (7⅝ × 2¼ in face) per sq ft of single-wythe wall with ⅜ in joints; the calculator gets 6.86 with the exact face of 8 × 2⅝ in. In metric, about 60 UK/EU bricks (215 × 65 mm face) per m² with 10 mm joints." },
      { q: "How do I calculate bricks for a wall?", a: "Bricks = wall area ÷ (brick length + joint) × (brick height + joint) × number of wythes. A 10 × 8 ft single-wythe wall of modular brick needs 80 × 144 ÷ 21 = 549 bricks, or 577 with 5% waste." },
      { q: "What is a wythe?", a: "One vertical layer of brick, one brick thick. Brick veneer on a framed house and each leaf of a UK cavity wall is a single wythe; solid load-bearing and garden walls are often two wythes bonded together." },
      { q: "How much waste should I allow?", a: "About 5% for straightforward walls laid by experienced masons, 10% for most jobs, and 15% or more for walls with many openings, corners or decorative bonds." },
      { q: "How much mortar do I need?", a: "One 80 lb bag of premixed mortar lays roughly 30–40 US modular bricks, so 549 bricks need about 14–18 bags. In metric, allow about 0.02–0.03 m³ of mortar per m² of single-wythe wall." },
    ],
  },
  features: [
    "Real-time calculations",
    "Multiple unit support",
    "Brick size presets",
    "Wastage adjustment",
    "Openings deduction",
    "Mortar thickness",
    "Calculation history",
    "Export functionality"
  ]
};
