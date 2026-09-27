export const buildingHeightCalculatorConfig = {
  name: "Building Height Calculator",
  slug: "building-height-calculator",
  category: "architecture",
  description: "Calculate allowable building height using FAR, plot size, floor height, and road width. Free online building height calculator for architects and engineers.",
  icon: "🏢",
  color: "#058554",
  featured: false,
  keywords: [
    "building height calculator",
    "FAR calculator",
    "zoning height calculator",
    "floor area ratio tool",
    "architecture calculator",
    "building height estimation",
    "maximum building height"
  ],
  seo: {
    title: "Building Height Calculator – FAR, Floors & Height",
    description: "Estimate the floors and height a plot allows from its area, floor area ratio (FAR) and floor-to-floor height, with an optional road-width limit.",
    keywords: "building height calculator, FAR calculator, zoning height calculator, floor area ratio tool, architecture calculator",
    og: {
      title: "Building Height Calculator – FAR & Zoning Tool",
      description: "Estimate maximum allowable building height based on FAR, plot size, and zoning regulations. Instant results for architects and planners.",
      type: "website",
      url: "/tools/architecture/building-height-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Enter the plot and FAR", text: "Type the plot area and the floor area ratio from your zoning code." },
      { name: "Set the floor height", text: "Enter the floor-to-floor height, typically 10–11 ft (3–3.3 m) for homes and 12–14 ft (3.7–4.3 m) for offices." },
      { name: "Add a road-width limit", text: "Where your code limits height by street width, enter the road width, setback and choose the mode." },
      { name: "Read the results", text: "See the buildable floor area, number of floors and height, and which rule controls." },
    ],
    faq: [
      { q: "What is floor area ratio (FAR)?", a: "Total floor area divided by lot area. An FAR of 2.0 on a 10,000 sq ft lot allows 20,000 sq ft of floor space: 2 full-lot floors, 4 floors covering half the lot, and so on. US zoning codes and many European plans use FAR (or plot ratio) to control density." },
      { q: "How is height worked out from FAR?", a: "Floors = FAR × lot area ÷ footprint; height = floors × floor-to-floor height. The calculator assumes the building covers the whole lot, so the result is the fewest floors; with setbacks and a smaller footprint you get more floors for the same FAR." },
      { q: "What is the road-width rule?", a: "Some codes limit height relative to the street, so buildings do not overshadow it: here, (road width − setback) × 1.5. New York's sky exposure planes and Paris's gabarit rules work on similar ideas. Many US zoning districts instead set a fixed maximum height or number of stories." },
      { q: "What floor-to-floor height should I use?", a: "About 10–11 ft (3.0–3.3 m) for houses and apartments, 12–14 ft (3.7–4.3 m) for offices, and 15–20 ft (4.5–6 m) for ground-floor retail." },
      { q: "Does zoning height include the roof?", a: "It depends on the code. Many US codes measure to the mean height of a pitched roof or the top of a flat roof and exclude parapets, elevator overruns and mechanical equipment within limits; check your local definitions." },
    ],
  },
  relatedTools: [
    "floor-area-calculator",
    "plot-area-calculator",
    "room-volume-calculator"
  ]
};
