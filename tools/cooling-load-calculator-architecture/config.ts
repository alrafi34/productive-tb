export const coolingLoadCalculatorArchitectureConfig = {
  name: "Cooling Load Calculator",
  slug: "cooling-load-calculator-architecture",
  category: "architecture",
  description: "Calculate accurate cooling load for rooms and buildings. Estimate BTU, AC tonnage, and HVAC requirements instantly with this free online cooling load calculator.",
  icon: "🧊",
  color: "#058554",
  featured: false,
  keywords: [
    "cooling load calculator",
    "BTU calculator",
    "AC ton calculator",
    "HVAC load calculation",
    "room cooling requirement",
    "air conditioning calculator",
    "cooling capacity calculator"
  ],
  seo: {
    title: "Cooling Load Calculator – BTU/hr & AC Tons for a Room",
    description: "Estimate a room's cooling load in BTU/hr and tons from floor area, people, windows, sun, insulation and equipment, and get an air conditioner size.",
    keywords: "cooling load calculator, BTU calculator, AC ton calculator, HVAC load calculation, room cooling requirement",
    og: {
      title: "Cooling Load Calculator – Free AC BTU & Tonnage Tool",
      description: "Calculate cooling requirements instantly with detailed load breakdown and AC recommendations.",
      type: "website",
      url: "/tools/architecture/cooling-load-calculator-architecture"
    },
    howToSteps: [
      { name: "Enter the room size", text: "Type the length, width and height in feet or meters, or pick a room preset." },
      { name: "Add people and windows", text: "Enter how many people use the room and how many windows it has." },
      { name: "Describe the conditions", text: "Choose the sun exposure, insulation quality and equipment load." },
      { name: "Read the load", text: "See the cooling load in BTU/hr and kW, the tonnage and a suggested AC size." },
    ],
    faq: [
      { q: "How is the cooling load estimated?", a: "Floor area × 20 BTU/hr per sq ft, plus 600 BTU/hr for each person after the first, 500 BTU/hr per window and an allowance for equipment, then adjusted for sun and insulation. A 250 sq ft bedroom for two with two windows needs about 5,000 + 600 + 1,000 = 6,600 BTU/hr before adjustments." },
      { q: "How many BTU per square foot?", a: "About 20 BTU/hr per sq ft (215 BTU/hr per m²) is the usual starting point from the ENERGY STAR room air conditioner guide. Hot climates, top floors, glass walls and kitchens need more." },
      { q: "How do I convert BTU/hr to tons and kW?", a: "12,000 BTU/hr = 1 ton of refrigeration = 3.517 kW. A 6,600 BTU/hr load is 0.55 tons or 1.9 kW, so a 7,000–8,000 BTU/hr unit fits." },
      { q: "Why does insulation change the load so much?", a: "Poorly insulated walls and roofs let in more heat. The calculator adds 15% for poor insulation and takes off 10% for good insulation." },
      { q: "When do I need a full Manual J calculation?", a: "For whole-house or central systems. Many US codes require ACCA Manual J to size new equipment; it accounts for walls, windows, orientation, air leakage and local design temperatures, which this quick room estimate does not." },
    ],
  },
  relatedTools: [
    "hvac-load-calculator",
    "ventilation-calculator",
    "air-change-rate-calculator"
  ]
};