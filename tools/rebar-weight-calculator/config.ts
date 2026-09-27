export const rebarWeightCalculatorConfig = {
  name: "Rebar Weight Calculator",
  slug: "rebar-weight-calculator",
  category: "architecture",
  description: "Calculate weight of reinforcement steel bars (rebar) based on diameter, length, and quantity. Free online rebar weight calculator for construction and engineering.",
  icon: "⚖️",
  color: "#058554",
  featured: false,
  keywords: [
    "rebar weight calculator",
    "steel weight calculator",
    "bar weight formula",
    "construction calculator",
    "rebar kg per meter",
    "reinforcement steel calculator",
    "steel bar weight",
    "rebar calculation"
  ],
  seo: {
    title: "Rebar Weight Calculator – kg/m & lb/ft by Bar Size",
    description: "Work out the weight of steel reinforcing bars from diameter, length and quantity in kg or lb, with the D²/162 formula and batch totals for a bar list.",
    keywords: "rebar weight calculator, steel weight calculator, bar weight formula, construction calculator, rebar kg per meter",
    og: {
      title: "Rebar Weight Calculator – Free Online Tool",
      description: "Calculate reinforcement steel bar weight with instant results and accurate formulas.",
      type: "website",
      url: "/tools/architecture/rebar-weight-calculator"
    },
    howToSteps: [
      { name: "Choose the units", text: "Select metric (mm, m, kg) or imperial (in, ft, lb)." },
      { name: "Pick the bar size", text: "Choose a standard diameter from 6 to 40 mm, or enter a custom diameter." },
      { name: "Enter length and quantity", text: "Type the length of each bar and the number of bars." },
      { name: "Read and add up", text: "See the weight per meter or foot and the total, and add each size to the batch for a full bar list." },
    ],
    faq: [
      { q: "What is the formula for rebar weight?", a: "Weight (kg/m) = D² ÷ 162, with D the bar diameter in mm. The 162 comes from 4 ÷ (π × 7,850 kg/m³) × 10⁶, the density of steel. A 16 mm bar weighs 256 ÷ 162 = 1.58 kg/m, so twelve 6 m bars weigh 114 kg." },
      { q: "How much do US rebar sizes weigh?", a: "From ASTM A615: #3 0.376 lb/ft, #4 0.668, #5 1.043, #6 1.502, #7 2.044, #8 2.670, #9 3.400, #10 4.303 and #11 5.313 lb/ft. The bar number is the diameter in eighths of an inch." },
      { q: "What are common metric bar sizes?", a: "In Europe and elsewhere, 8, 10, 12, 16, 20, 25, 32 and 40 mm bars (EN 10080 / BS 4449). A 12 mm bar weighs 0.888 kg/m and a 20 mm bar 2.47 kg/m." },
      { q: "How do I convert kg/m to lb/ft?", a: "Multiply by 0.672. A 1.58 kg/m bar is 1.06 lb/ft, close to a US #5 bar." },
      { q: "Should I add extra for laps and waste?", a: "Yes. Add the lap lengths shown on the drawings and about 3–5% for cutting waste when ordering, or use the bar bending schedule, which lists exact cut lengths." },
    ],
  },
  relatedTools: [
    "steel-quantity-calculator",
    "concrete-volume-calculator",
    "cement-calculator"
  ]
};
