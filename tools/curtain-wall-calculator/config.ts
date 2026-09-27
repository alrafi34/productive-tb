export const curtainWallCalculatorConfig = {
  name: "Curtain Wall Calculator",
  slug: "curtain-wall-calculator",
  category: "architecture",
  description: "Calculate curtain wall area, panel count, glass ratio, and material breakdown instantly. Free online curtain wall calculator for architects and engineers.",
  icon: "🏢",
  color: "#058554",
  featured: false,
  keywords: [
    "curtain wall calculator",
    "facade area calculator",
    "glass panel calculator",
    "building facade estimator",
    "construction calculator",
    "curtain wall estimator",
    "facade panel calculator"
  ],
  seo: {
    title: "Curtain Wall Calculator – Area, Panels & Glass Ratio",
    description: "Estimate curtain wall area, panel count, glass and frame areas from the facade size, panel module and glass ratio. In meters or feet, with presets.",
    keywords: "curtain wall calculator, facade area calculator, glass panel calculator, building facade estimator, construction calculator",
    og: {
      title: "Curtain Wall Calculator – Facade Area & Panel Estimator",
      description: "Calculate curtain wall dimensions, panel count, and material breakdown for building facades instantly.",
      type: "website",
      url: "/tools/architecture/curtain-wall-calculator"
    },
    howToSteps: [
      { name: "Enter the facade size", text: "Type the width and height of the curtain wall in meters or feet." },
      { name: "Set the panel module", text: "Enter the panel width and height of the system." },
      { name: "Set the glass ratio", text: "Move the slider to the share of vision glass, typically 70–90%, and optionally enter the frame thickness." },
      { name: "Read the results", text: "See the total area, the panel count and grid, and the glass and frame areas, then export them." },
    ],
    faq: [
      { q: "What is a curtain wall?", a: "A non-structural outer skin, usually glass and aluminum, hung from the building frame. It carries only its own weight and the wind load on it, and transfers them to the floor slabs or columns." },
      { q: "What glass ratio is typical?", a: "Commercial curtain walls are usually 70–90% vision glass. Energy codes push the other way: ASHRAE 90.1 and the IECC limit window-to-wall ratio to about 30–40% for prescriptive compliance, so highly glazed facades need high-performance glass or an energy model." },
      { q: "What panel sizes are common?", a: "Typical modules are 1.2–1.5 m (4–5 ft) wide and one floor high, about 3.6–4.2 m (12–14 ft). Larger panels mean fewer mullions but heavier glass and higher costs." },
      { q: "How are panels counted?", a: "The calculator rounds up both across and up the facade: a 30 m wide wall with 1.5 m panels needs 20 columns. Add 5–10% for corners, special units and spares." },
      { q: "Does the calculator check wind loads or structure?", a: "No. It estimates areas and quantities only. Mullion sizes, anchors and glass thickness must be designed for wind load (ASCE 7, EN 1991-1-4) and movement by the facade engineer." },
    ],
  },
  relatedTools: [
    "facade-area-calculator",
    "glass-panel-size-calculator",
    "cladding-material-calculator"
  ]
};
