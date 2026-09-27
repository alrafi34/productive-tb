export const volumeCalculatorArchitectureConfig = {
  name: "3D Volume Calculator (Architecture)",
  slug: "3d-volume-calculator-architecture",
  category: "architecture",
  description: "Easily calculate 3D volume for rooms, buildings, cylinders, and more. Fast, accurate, and free online architecture volume calculator with real-time results.",
  icon: "📦",
  color: "#058554",
  featured: false,
  keywords: [
    "volume calculator",
    "3D volume calculator",
    "architecture calculator",
    "building volume calculation",
    "room volume calculator",
    "cylinder volume",
    "sphere volume",
    "cone volume"
  ],
  seo: {
    title: "3D Volume Calculator – Rooms, Tanks & Solids",
    description: "Calculate the volume of a box, cylinder, sphere or cone in cubic meters or cubic feet, with liters and gallons. For rooms, tanks, silos and concrete.",
    keywords: "volume calculator, 3D volume calculator, architecture calculator, building volume calculation, room volume calculator",
    og: {
      title: "3D Volume Calculator for Architecture – Building Volume Tool",
      description: "Calculate 3D volume for architectural structures instantly. Support for rooms, cylinders, spheres, and cones.",
      type: "website",
      url: "/tools/architecture/3d-volume-calculator-architecture"
    },
    howToSteps: [
      { name: "Pick the shape", text: "Choose rectangular prism, cylinder, sphere or cone." },
      { name: "Choose the unit", text: "Select meters or feet." },
      { name: "Enter the dimensions", text: "Type the length, width and height, or the radius and height, as the shape needs." },
      { name: "Read the volume", text: "See the volume in cubic meters or feet with conversions, and save it to your history." },
    ],
    faq: [
      { q: "How do I calculate volume for each shape?", a: "Box: length × width × height. Cylinder: π r² h. Sphere: 4/3 π r³. Cone: 1/3 π r² h. A cylinder tank 2 m across and 3 m high holds π × 1² × 3 = 9.42 m³." },
      { q: "How do I convert cubic meters to liters or gallons?", a: "1 m³ = 1,000 liters = 264.2 US gallons = 220 UK gallons. 1 cubic foot = 28.32 liters = 7.48 US gallons." },
      { q: "How much concrete do I need for a slab?", a: "Length × width × thickness, plus 5–10% for waste. A 20 ft × 12 ft slab 4 in thick is 20 × 12 × 0.333 = 80 cu ft, or about 3 cubic yards; order about 3.25 yd³." },
      { q: "How do I measure an irregular space?", a: "Split it into boxes, cylinders and cones, calculate each and add them up. For a room with a sloped ceiling, use the average ceiling height." },
      { q: "Why does room volume matter?", a: "Heating, cooling and ventilation depend on it: air changes per hour are volume based, and acoustic reverberation time rises with volume." },
    ],
  },
  relatedTools: [
    "room-volume-calculator",
    "concrete-volume-calculator",
    "room-area-calculator"
  ]
};
