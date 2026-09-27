export const steelQuantityCalculatorConfig = {
  name: "Steel Quantity Calculator",
  slug: "steel-quantity-calculator",
  category: "architecture",
  description: "Calculate steel quantity for slabs, beams, columns, and footings. Free online steel estimation calculator for construction projects.",
  icon: "🏗️",
  color: "#058554",
  featured: false,
  keywords: [
    "steel quantity calculator",
    "construction steel calculator",
    "rebar calculator",
    "steel estimation tool",
    "civil engineering calculator",
    "steel weight calculator",
    "reinforcement calculator",
    "construction material calculator"
  ],
  seo: {
    title: "Steel Quantity Calculator – Rebar for Slabs & Beams",
    description: "Estimate reinforcing steel for slabs, beams, columns and footings from rule-of-thumb steel factors, in kg and tons, with metric or imperial inputs.",
    keywords: "steel quantity calculator, construction steel calculator, rebar calculator, steel estimation tool, civil engineering calculator",
    og: {
      title: "Steel Quantity Calculator – Free Online Tool",
      description: "Estimate steel requirements for construction elements with instant results.",
      type: "website",
      url: "/tools/architecture/steel-quantity-calculator"
    },
    howToSteps: [
      { name: "Choose the element", text: "Select slab, beam, column or footing." },
      { name: "Choose the units", text: "Select metric or imperial." },
      { name: "Enter the size and steel factor", text: "Type the slab area, beam length or number of columns or footings, and the steel per unit, or pick a preset." },
      { name: "Read the quantity", text: "See the total steel in kg and metric tons, then export it as text or CSV." },
    ],
    faq: [
      { q: "How is steel quantity estimated?", a: "Quantity = size × steel factor: slab area × kg per unit area, beam length × kg per meter, or number of columns or footings × kg each. A 100 m² slab at 32 kg/m² (about 3 kg/sq ft) needs 3,200 kg, or 3.2 t." },
      { q: "Are these factors accurate enough to order steel?", a: "No. Rule-of-thumb factors are for early budgets. Orders are made from a bar bending schedule, or a rebar take-off, based on the structural drawings." },
      { q: "How much does rebar weigh?", a: "Weight per meter = d² ÷ 162 kg for a bar of d mm. A 12 mm bar weighs 0.89 kg/m and a 16 mm bar 1.58 kg/m. US bars weigh 0.376 lb/ft (#3), 0.668 lb/ft (#4) and 1.043 lb/ft (#5)." },
      { q: "How much steel does a typical slab need?", a: "Roughly 0.5–1% of the concrete volume, which for a 150–200 mm (6–8 in) slab is about 20–40 kg/m² (2–4 kg/sq ft). Heavily loaded or long-span slabs need more." },
      { q: "Should I add waste for laps and cutting?", a: "Yes. Add about 3–5% for cutting waste, plus the extra length of laps, which can add another 5–10% on long runs of bars." },
    ],
  },
  relatedTools: [
    "rebar-weight-calculator",
    "rebar-spacing-calculator",
    "concrete-volume-calculator"
  ]
};
