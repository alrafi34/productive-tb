export const columnLoadCalculatorConfig = {
  name: "Column Load Calculator",
  slug: "column-load-calculator",
  category: "architecture",
  description: "Calculate structural column load capacity for concrete and steel columns. Free online tool with instant results and safety factor analysis.",
  icon: "🏛️",
  color: "#058554",
  featured: false,
  keywords: [
    "column load calculator",
    "axial load calculation",
    "structural column design",
    "civil engineering calculator",
    "load capacity tool",
    "concrete column calculator",
    "steel column calculator",
    "slenderness ratio calculator"
  ],
  seo: {
    title: "Column Load Calculator – Axial Capacity of Columns",
    description: "Estimate the axial load capacity of a reinforced concrete or steel column from its size, height, material strength, end condition and safety factor.",
    keywords: "column load calculator, axial load calculation, structural column design, civil engineering calculator, load capacity tool",
    og: {
      title: "Column Load Calculator – Free Online Tool",
      description: "Calculate load-bearing capacity of structural columns with instant results and safety analysis.",
      type: "website",
      url: "/tools/architecture/column-load-calculator"
    },
    howToSteps: [
      { name: "Choose the column type", text: "Select reinforced concrete or steel." },
      { name: "Enter the size", text: "Type the width and depth in millimeters or inches, and the height in meters." },
      { name: "Enter the materials", text: "For concrete, the concrete strength and the steel reinforcement percentage; for steel, the yield strength and cross-sectional area." },
      { name: "Set the end condition and safety factor", text: "Pick how the ends are held (pinned, fixed, free) and a safety factor, typically 1.5–2.0." },
      { name: "Read the capacity", text: "See the ultimate and safe load, the slenderness ratio and whether the column is short or slender." },
    ],
    faq: [
      { q: "How is the load capacity of a concrete column calculated?", a: "For a short, axially loaded column the calculator uses Pu = 0.4 fck Ac + 0.67 fy Asc, where Ac is the concrete area and Asc the steel area (the simplified formula of IS 456, with rebar fy = 415 MPa). ACI 318 gives φPn = 0.8 φ [0.85 f′c (Ag − Ast) + fy Ast] with φ = 0.65, and Eurocode 2 NRd = 0.567 fck Ac + 0.87 fyk As; all three give results of the same order for typical columns." },
      { q: "What is the slenderness ratio and why does it matter?", a: "The effective length (K × height) divided by the smallest cross-section dimension. Below about 12 a column is short and fails by crushing; above that it can buckle, so the calculator reduces the capacity by 10–40% as the ratio rises." },
      { q: "What end condition should I choose?", a: "Pinned-pinned (K = 1.0) is the usual conservative choice for building columns. Fixed-fixed (K ≈ 0.65 in practice) applies when both ends are rigidly restrained, and fixed-free (K = 2.0) to a cantilever post such as a flagpole or a column with a free top." },
      { q: "What safety factor should I use?", a: "1.5–2.0 on the calculated capacity is typical for a preliminary check. Design codes use load factors on the loads and resistance factors on the materials instead, so a final design should follow ACI 318, AISC 360 or Eurocode 2/3." },
      { q: "Can I use this to design a column?", a: "Use it for sizing and checking early options. Real columns also carry bending from eccentric loads and frame action, which this calculator does not include, so have the final design done or checked by a structural engineer." },
    ],
  },
  relatedTools: [
    "beam-load-calculator",
    "foundation-depth-calculator",
    "concrete-volume-calculator"
  ]
};
