import { siteConfig } from "@/config/site";

export const rainwaterRunoffCalculatorConfig = {
  name: "Rainwater Runoff Calculator",
  slug: "rainwater-runoff-calculator",
  category: "land",
  description: "Calculate rainwater runoff volume from rainfall, land area, and surface type. Estimate stormwater runoff, drainage needs, and rainwater collection potential online for free.",
  icon: "🌧️",
  free: true,
  seo: {
    title: "Rainwater Runoff Calculator – Stormwater Volume",
    description: "Estimate stormwater runoff from rainfall, area and surface type (roof, pavement, lawn) in gallons, liters and m³, using the runoff coefficient.",
    keywords: [
      "rainwater runoff calculator",
      "stormwater runoff calculator",
      "runoff estimation tool",
      "water runoff estimator",
      "drainage calculator",
      "rainwater harvesting calculator",
      "surface runoff calculator",
      "runoff coefficient calculator",
      "rainfall runoff calculator",
      "stormwater management tool",
    ],
    og: {
      title: "Rainwater Runoff Calculator – Stormwater Volume",
      description: "Estimate stormwater runoff from rainfall, area and surface type (roof, pavement, lawn) in gallons, liters and m³, using the runoff coefficient.",
      url: `${siteConfig.url}/tools/land/rainwater-runoff-calculator`,
    },
    howToSteps: [
      { name: "Enter the rainfall", text: "Type the rainfall depth in inches, millimeters or centimeters, for example a design storm." },
      { name: "Enter the area", text: "Type the catchment area in square feet, square meters, acres or hectares." },
      { name: "Choose the surface", text: "Pick roof, concrete, asphalt, gravel, lawn or another surface, or enter your own runoff coefficient." },
      { name: "Read the runoff", text: "See the runoff volume in gallons, liters, cubic meters and barrels, with a harvesting rating." },
    ],
    faq: [
      { q: "How is runoff volume calculated?", a: "Runoff = rainfall × area × runoff coefficient. In metric, 1 mm on 1 m² is 1 liter: 50 mm on 100 m² of concrete (C = 0.9) gives 4,500 liters. In US units, 1 in on 1 sq ft is 0.623 gallons: 1 in on 2,000 sq ft of roof (C = 0.9) gives about 1,120 gallons." },
      { q: "What is a runoff coefficient?", a: "The share of rain that runs off instead of soaking in: about 0.75–0.95 for roofs and pavement, 0.3–0.5 for gravel, and 0.05–0.35 for lawns and grass, depending on slope and soil (values from the Rational Method tables)." },
      { q: "What rainfall should I design for?", a: "Stormwater designs use a design storm, such as the 10-year or 25-year, 24-hour rainfall from NOAA Atlas 14 in the US or the Environment Agency's rainfall data in the UK. Check your local stormwater manual." },
      { q: "How is this different from peak runoff?", a: "This gives the total volume. Sizing pipes and inlets needs the peak flow rate, Q = C i A with rainfall intensity i (the Rational Method)." },
      { q: "How do I reduce runoff?", a: "Permeable paving, rain gardens, green roofs, rain barrels and cisterns all reduce runoff and flooding; many US cities offer stormwater fee credits for them." },
    ],
  },
};
