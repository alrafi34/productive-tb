export const elevationDesignCalculatorConfig = {
  name: "Elevation Design Calculator",
  slug: "elevation-design-calculator",
  category: "architecture",
  description: "Calculate building elevation proportions instantly. Design balanced facades using width, height, floor ratios, and golden ratio with live visual preview.",
  icon: "📐",
  color: "#058554",
  featured: false,
  keywords: [
    "elevation design calculator",
    "building elevation tool",
    "architecture proportion calculator",
    "facade design tool",
    "golden ratio building design",
    "building proportions",
    "elevation calculator"
  ],
  seo: {
    title: "Elevation Design Calculator – Facade Proportions",
    description: "Check the proportions of a building elevation: width, height, floor count and floor-to-floor height, with golden-ratio and custom-ratio modes.",
    keywords: "elevation design calculator, building elevation tool, architecture proportion calculator, facade design tool, golden ratio building design",
    og: {
      title: "Elevation Design Calculator – Building Proportion Tool",
      description: "Calculate building elevation proportions and design balanced facades with golden ratio support.",
      type: "website",
      url: "/tools/architecture/elevation-design-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Pick a design mode", text: "Choose standard proportion, golden ratio (1:1.618) or your own ratio." },
      { name: "Enter the size", text: "Type the facade width, the height where asked, and the number of floors." },
      { name: "Read the proportions", text: "See the height, ratio, floor-to-floor height, a preview of the elevation and a recommendation." },
    ],
    faq: [
      { q: "What height-to-width ratio does the calculator treat as balanced?", a: "It rates a height of about 1.5 to 1.8 times the width as balanced. This is a design rule of thumb, not a code requirement; zoning height limits, setbacks and the building type usually matter more." },
      { q: "When should I use the golden ratio?", a: "When you want classical proportions, for example on a formal facade or for sizing windows, panels and bays. The golden ratio, 1:1.618, gives a height of 16.18 m (53 ft) for a 10 m (33 ft) wide facade." },
      { q: "What is a typical floor-to-floor height?", a: "About 10–11 ft (3.0–3.3 m) for homes and apartments, with 8–9 ft ceilings, and 12–14 ft (3.7–4.3 m) for offices, which need space for ducts and raised floors. Ground-floor retail is often 15–20 ft (4.5–6 m)." },
      { q: "How do zoning rules affect elevation design?", a: "Zoning codes set a maximum height, number of stories and often setbacks or daylight planes that step the facade back as it rises. Check them before fixing the proportions." },
      { q: "Can I use this for a high-rise?", a: "Yes, for massing studies. The calculator divides the height evenly between floors; real towers often have taller ground floors, mechanical floors and a crown, so adjust the floor count to suit." },
    ],
  },
  relatedTools: [
    "facade-area-calculator",
    "building-height-calculator",
    "floor-area-calculator"
  ]
};
