export const septicTankSizeCalculatorConfig = {
  name: "Septic Tank Size Calculator",
  slug: "septic-tank-size-calculator",
  category: "architecture",
  description: "Calculate septic tank size based on household size, water usage, and retention time. Get accurate tank capacity instantly with this free online calculator.",
  icon: "🚽",
  color: "#058554",
  featured: false,
  keywords: [
    "septic tank size calculator",
    "septic tank capacity calculator",
    "how to size septic tank",
    "septic tank volume formula",
    "wastewater tank calculator",
    "septic system sizing",
    "sewage tank calculator"
  ],
  seo: {
    title: "Septic Tank Size Calculator – Gallons & Liters",
    description: "Estimate septic tank capacity from the number of people, daily wastewater per person, retention time and sludge allowance, in liters, m³ and gallons.",
    keywords: "septic tank size calculator, septic tank capacity calculator, how to size septic tank, septic tank volume formula, wastewater tank calculator",
    og: {
      title: "Septic Tank Size Calculator – Free Wastewater System Tool",
      description: "Calculate required septic tank capacity for your home or building. Instant results with retention time and sludge factor calculations.",
      type: "website",
      url: "/tools/architecture/septic-tank-size-calculator"
    },
    howToSteps: [
      { name: "Enter the number of users", text: "Type how many people will use the system, or pick a building preset." },
      { name: "Set the water use", text: "Enter wastewater per person per day: about 200 liters (53 US gallons) for US homes, 150 liters in Europe." },
      { name: "Choose the retention time", text: "2 days is standard for homes, letting solids settle." },
      { name: "Add a sludge allowance", text: "30% is typical; it adds room for sludge between pump-outs." },
      { name: "Read the size", text: "See the tank capacity in liters, cubic meters and gallons, with suggested dimensions." },
    ],
    faq: [
      { q: "How is septic tank size calculated?", a: "Capacity = users × daily flow per person × retention days × (1 + sludge allowance). Five people at 200 L/day with 2 days' retention and 30% for sludge need 5 × 200 × 2 × 1.3 = 2,600 liters, about 690 US gallons." },
      { q: "What size septic tank does a 3-bedroom house need?", a: "US codes size by bedrooms rather than people: most states require at least 1,000 gallons (3,785 L) for 3 bedrooms and 1,250 gallons for 4. Check your state or county health department, which sets the minimum." },
      { q: "What are the UK rules?", a: "Approved Document H2 asks for a septic tank of at least 2,700 liters for up to 4 users, plus 180 liters for each additional user, and discharges must meet the General Binding Rules or an environmental permit." },
      { q: "How often should a septic tank be pumped?", a: "Every 3–5 years for a typical household (US EPA guidance), sooner for small tanks or large households. Have the sludge and scum layers checked during inspections." },
      { q: "Why is retention time important?", a: "Solids need time to settle and scum to float. With too short a retention time, solids reach the drain field and clog it, which is expensive to repair." },
    ],
  },
  relatedTools: [
    "drainage-flow-calculator",
    "excavation-volume-calculator",
    "concrete-volume-calculator"
  ]
};
