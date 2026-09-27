export const soilBearingCapacityCalculatorConfig = {
  name: "Soil Bearing Capacity Calculator",
  slug: "soil-bearing-capacity-calculator",
  category: "architecture",
  description: "Calculate soil bearing capacity instantly using Terzaghi's formula. Free online tool for engineers, architects, and students with real-time results.",
  icon: "🏗️",
  color: "#058554",
  featured: false,
  keywords: [
    "soil bearing capacity calculator",
    "foundation load calculator",
    "terzaghi bearing capacity",
    "soil strength calculator",
    "civil engineering tools",
    "geotechnical calculator",
    "foundation design calculator"
  ],
  seo: {
    title: "Soil Bearing Capacity Calculator – Terzaghi Method",
    description: "Estimate the ultimate and safe bearing capacity of a shallow foundation from its width and depth and the soil's cohesion, friction angle and unit weight.",
    keywords: "soil bearing capacity calculator, foundation load calculator, terzaghi bearing capacity, soil strength calculator, civil engineering tools",
    og: {
      title: "Soil Bearing Capacity Calculator – Free Foundation Design Tool",
      description: "Calculate ultimate and safe bearing capacity for foundations. Instant results with Terzaghi's formula.",
      type: "website",
      url: "/tools/architecture/soil-bearing-capacity-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select meters or feet for the foundation size." },
      { name: "Enter the foundation", text: "Type the foundation width B and depth Df." },
      { name: "Enter the soil", text: "Type the unit weight γ, cohesion c and friction angle φ, or pick a soil type." },
      { name: "Set safety and water", text: "Choose the factor of safety (usually 2.5–3) and where the water table sits." },
      { name: "Read the capacity", text: "See the bearing capacity factors, the ultimate and safe bearing capacity and notes." },
    ],
    faq: [
      { q: "What is Terzaghi's bearing capacity equation?", a: "For a strip footing, qu = c Nc + q Nq + 0.5 γ B Nγ, where q = γ Df is the overburden pressure and Nc, Nq, Nγ depend on the friction angle. The safe bearing capacity is qu divided by the factor of safety." },
      { q: "What factor of safety should I use?", a: "2.5–3.0 on the ultimate bearing capacity is standard for foundations. The result is then comparable with the allowable bearing pressures in codes such as IBC Table 1806.2." },
      { q: "How does the water table affect bearing capacity?", a: "Submerged soil weighs about half as much, which reduces the overburden and width terms. The calculator reduces capacity by 10% with water at foundation level and 20% above it, a simplification of the full correction." },
      { q: "What are typical soil properties?", a: "Loose sand: φ ≈ 28–30°, γ ≈ 17 kN/m³ (108 pcf). Dense sand: φ ≈ 35–40°, γ ≈ 19–20 kN/m³. Soft clay: c ≈ 10–25 kPa; stiff clay: c ≈ 50–100 kPa, with φ ≈ 0 in the short term." },
      { q: "Can I use this for a real foundation?", a: "Only for preliminary sizing. Bearing capacity must come from a site investigation, and settlement often governs before shear failure, especially on clay." },
    ],
  },
  relatedTools: [
    "foundation-depth-calculator",
    "footing-size-calculator",
    "structural-load-calculator"
  ]
};
