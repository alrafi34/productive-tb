export const hvacLoadCalculatorConfig = {
  name: "HVAC Load Calculator",
  slug: "hvac-load-calculator",
  category: "architecture",
  description: "Calculate HVAC load requirements instantly. Estimate cooling and heating capacity (BTU, kW, Ton) based on room size, insulation, and climate.",
  icon: "❄️",
  color: "#058554",
  featured: false,
  keywords: [
    "hvac load calculator",
    "cooling load calculator",
    "btu calculator room",
    "ac tonnage calculator",
    "heating load estimate",
    "air conditioning calculator",
    "hvac sizing tool"
  ],
  seo: {
    title: "HVAC Load Calculator – BTU & AC Tonnage",
    description: "Estimate a room's cooling load in BTU/hr, kW and tons from its size, climate, insulation, windows, sun, people and equipment, with an AC size.",
    keywords: "hvac load calculator, cooling load calculator, btu calculator room, ac tonnage calculator, heating load estimate",
    og: {
      title: "HVAC Load Calculator – Free Cooling Load Tool",
      description: "Calculate HVAC requirements instantly with detailed load breakdown.",
      type: "website",
      url: "/tools/architecture/hvac-load-calculator"
    },
    howToSteps: [
      { name: "Enter the room size", text: "Type the length, width and height in feet or meters, or pick a room preset." },
      { name: "Describe the room", text: "Choose the climate, insulation quality, number of windows, sun exposure and equipment." },
      { name: "Add the occupants", text: "Enter how many people normally use the room." },
      { name: "Read the load", text: "See the cooling load in BTU/hr, kW and tons, the breakdown by source and a recommended AC size." },
    ],
    faq: [
      { q: "How many BTUs do I need per square foot?", a: "About 20 BTU/hr per square foot is a common starting point (ENERGY STAR sizing guide), before adjustments. A 300 sq ft room needs about 6,000–7,000 BTU/hr. ENERGY STAR adds 600 BTU/hr for each person beyond two and 10% for a very sunny room; this calculator adds 600 BTU/hr for every occupant, which is slightly more conservative." },
      { q: "How do I convert BTU/hr to tons and kW?", a: "1 ton of cooling = 12,000 BTU/hr = 3.517 kW. So 24,000 BTU/hr is a 2-ton unit or about 7 kW." },
      { q: "Is this a Manual J calculation?", a: "No. It is a quick rule-of-thumb estimate. In the US, ACCA Manual J (required for new systems by many codes) models walls, windows, air leakage and local design temperatures; in Europe, EN 12831 covers heating loads." },
      { q: "What happens if the AC is oversized?", a: "An oversized unit cools the air quickly and switches off before removing enough moisture, so rooms feel clammy, it cycles more and wears faster. Choose the size closest to the load rather than going well above it." },
      { q: "Does the climate setting matter much?", a: "Yes. The calculator raises the load by 10% for moderate and 20% for hot climates. For exact design conditions, use ASHRAE climatic design data for your city." },
    ],
  },
  relatedTools: [
    "ventilation-calculator",
    "air-change-rate-calculator",
    "cooling-load-calculator-architecture"
  ]
};
