export const excavationVolumeCalculatorConfig = {
  name: "Excavation Volume Calculator",
  slug: "excavation-volume-calculator",
  category: "architecture",
  description: "Calculate excavation volume for rectangular, trench, and circular pits instantly. Free online tool for engineers, contractors, and construction planning.",
  icon: "⛏️",
  color: "#058554",
  featured: false,
  keywords: [
    "excavation volume calculator",
    "earthwork calculator",
    "construction volume calculator",
    "soil excavation calculator",
    "civil engineering tools",
    "trench volume calculator",
    "foundation excavation calculator"
  ],
  seo: {
    title: "Excavation Calculator – Cubic Yards & m³ of Dirt",
    description: "Calculate excavation volume for rectangular pits, trenches and round holes in cubic yards, cubic feet and m³, with an estimate of truck loads.",
    keywords: "excavation volume calculator, earthwork calculator, construction volume calculator, soil excavation calculator, civil engineering tools",
    og: {
      title: "Excavation Volume Calculator – Free Earthwork Volume Tool",
      description: "Calculate excavation volume for foundations, trenches, and pits. Instant results with unit conversion.",
      type: "website",
      url: "/tools/architecture/excavation-volume-calculator"
    },
    howToSteps: [
      { name: "Pick the shape", text: "Choose a rectangular pit, a trench or a circular pit." },
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Enter the dimensions", text: "Type the length, width and depth, or the radius and depth, or pick a preset." },
      { name: "Read the volume", text: "See the bank volume in m³, cubic feet and cubic yards and an estimate of truck loads." },
    ],
    faq: [
      { q: "How do I calculate excavation volume?", a: "Length × width × depth for a pit or trench, π × radius² × depth for a round hole. A basement dig of 40 × 30 ft to 8 ft deep is 9,600 cu ft, or 356 cubic yards (272 m³)." },
      { q: "What is swell factor?", a: "Dug soil loosens and takes up more space than in the ground: about 10–15% more for sand, 25–30% for common earth and 30–40% for clay and rock. 356 yd³ of common earth hauls as roughly 450 loose yd³." },
      { q: "How many truck loads will I need?", a: "Divide the loose volume by the truck capacity. The calculator uses 10 m³ (about 13 yd³) per load; a US tandem dump truck carries about 10–14 yd³ and a tri-axle 16–18 yd³." },
      { q: "Do trenches need sloping or shoring?", a: "In the US, OSHA 29 CFR 1926 Subpart P requires protection for trenches 5 ft (1.5 m) deep or more: sloping, benching, shoring or a trench box. Sloped sides add to the volume dug." },
      { q: "How do I convert cubic feet to cubic yards?", a: "Divide by 27. 1 cubic yard = 0.765 m³, and 1 m³ = 1.308 cubic yards." },
    ],
  },
  relatedTools: [
    "concrete-volume-calculator",
    "construction-cost-estimator",
    "material-cost-calculator"
  ]
};