export const slabLoadCalculatorConfig = {
  name: "Slab Load Calculator",
  slug: "slab-load-calculator",
  category: "architecture",
  description: "Calculate slab dead load, live load, and total load capacity. Free online tool for civil engineers with instant results and unit conversion.",
  icon: "📐",
  color: "#058554",
  featured: false,
  keywords: [
    "slab load calculator",
    "dead load calculation",
    "live load calculator",
    "structural load calculator",
    "civil engineering tools",
    "slab design calculator",
    "concrete slab load",
    "floor load calculator"
  ],
  seo: {
    title: "Slab Load Calculator – Dead, Live & Total Load",
    description: "Work out a concrete slab's self-weight, dead load, live load and total load per area and in total, in kN/m² or psf, from its size, thickness and use.",
    keywords: "slab load calculator, dead load calculation, live load calculator, structural load calculator, civil engineering tools",
    og: {
      title: "Slab Load Calculator – Free Online Tool",
      description: "Calculate slab loads including dead load, live load, and total capacity with instant results.",
      type: "website",
      url: "/tools/architecture/slab-load-calculator"
    },
    howToSteps: [
      { name: "Choose the units", text: "Select metric (m, kN/m³, kN/m²) or imperial (ft, pcf, psf)." },
      { name: "Enter the slab", text: "Type the length, width and thickness, or pick a preset." },
      { name: "Check the concrete density", text: "25 kN/m³ (150 pcf) is standard for reinforced concrete." },
      { name: "Add the loads", text: "Enter the live load for the use and any superimposed dead load such as finishes and partitions." },
      { name: "Read the loads", text: "See the self-weight, dead load, total load per m² or sq ft and the total load on the slab, with warnings." },
    ],
    faq: [
      { q: "How do I calculate the self-weight of a slab?", a: "Self-weight = thickness × concrete density. A 150 mm (6 in) slab at 25 kN/m³ weighs 3.75 kN/m², or 75 psf at 150 pcf." },
      { q: "What live load should I use?", a: "ASCE 7 in the US: 40 psf (1.92 kN/m²) for homes, 50 psf (2.4 kN/m²) for offices, 100 psf (4.8 kN/m²) for corridors and assembly areas. Eurocode EN 1991-1-1: 1.5–2.0 kN/m² for homes and 2.0–3.0 kN/m² for offices." },
      { q: "What is superimposed dead load?", a: "Permanent loads added to the slab: floor finishes, screeds, ceilings, services and partitions. Allow about 1.0–1.5 kN/m² (20–30 psf) for typical finishes and services, plus partitions." },
      { q: "Does the calculator factor the loads?", a: "No. It gives service (unfactored) loads. Design combines them with load factors, such as 1.2D + 1.6L in ASCE 7 or 1.35G + 1.5Q in Eurocode." },
      { q: "How do I convert kN/m² to psf?", a: "1 kN/m² = 20.885 psf; 1 psf = 0.0479 kN/m². A total of 7 kN/m² is about 146 psf." },
    ],
  },
  relatedTools: [
    "concrete-volume-calculator",
    "beam-load-calculator",
    "column-load-calculator"
  ]
};
