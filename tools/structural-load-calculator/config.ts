export const structuralLoadCalculatorConfig = {
  name: "Structural Load Calculator",
  slug: "structural-load-calculator",
  category: "architecture",
  description: "Calculate structural loads for beams and slabs. Free online tool to estimate dead load, live load, and total load with instant results.",
  icon: "⚖️",
  color: "#058554",
  featured: false,
  keywords: [
    "structural load calculator",
    "beam load calculator",
    "dead load live load calculator",
    "engineering calculator",
    "construction load calculator",
    "floor load calculator",
    "slab load calculator",
    "load estimation tool"
  ],
  seo: {
    title: "Structural Load Calculator – Dead & Live Loads",
    description: "Add up dead, live and extra loads on a floor, slab or beam in kN/m² or psf. Get the total load in kN or pounds, with presets for homes and offices.",
    keywords: "structural load calculator, beam load calculator, dead load live load calculator, engineering calculator, construction load calculator",
    og: {
      title: "Structural Load Calculator – Free Online Tool",
      description: "Calculate structural loads for beams and slabs with instant results and load breakdown.",
      type: "website",
      url: "/tools/architecture/structural-load-calculator"
    },
    howToSteps: [
      { name: "Choose the load case", text: "Select Area Load for a floor or slab, or Beam Load for a load per unit length." },
      { name: "Pick the units", text: "Metric uses m², kN/m² and kN/m; imperial uses sq ft, psf and lb/ft." },
      { name: "Enter the loads", text: "Type the area, dead load, live load and any additional load, or pick a preset." },
      { name: "Read the totals", text: "See the total load per unit area, the total force and the share from each load type." },
    ],
    faq: [
      { q: "What is the difference between dead load and live load?", a: "Dead load is the permanent weight of the structure and fixed finishes: slabs, beams, floor screeds, ceilings and services. Live load is the variable weight of people, furniture and stored goods, set by codes according to how the space is used." },
      { q: "What live load should I use for a house or an office?", a: "In the US, ASCE 7 specifies 40 psf (1.92 kN/m²) for residential floors and 50 psf (2.4 kN/m²) for offices. In Europe, EN 1991-1-1 recommends 1.5–2.0 kN/m² for homes and 2.0–3.0 kN/m² for offices; check your national annex." },
      { q: "Does the calculator apply safety factors?", a: "No. It adds up unfactored (service) loads. For design, codes multiply them by load factors, for example 1.2 D + 1.6 L in ASCE 7 and 1.35 G + 1.5 Q in Eurocode, so use the results as input to a design, not as the design itself." },
      { q: "How do I convert kN/m² to psf?", a: "1 kN/m² = 20.885 psf, and 1 psf = 0.0479 kN/m². A 2.0 kN/m² live load is about 42 psf." },
      { q: "How is a beam load calculated from a floor load?", a: "Multiply the floor load by the width of floor the beam carries (its tributary width). A beam carrying a 3 m (10 ft) strip of a 5 kN/m² floor takes 15 kN/m; over a 6 m span that is 90 kN in total." },
    ],
  },
  relatedTools: [
    "beam-load-calculator",
    "slab-load-calculator",
    "column-load-calculator"
  ]
};
