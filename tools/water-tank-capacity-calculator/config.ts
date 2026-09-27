export const waterTankCapacityCalculatorConfig = {
  name: "Water Tank Capacity Calculator",
  slug: "water-tank-capacity-calculator",
  category: "architecture",
  description: "Calculate water tank capacity easily for cylindrical, rectangular, or custom tanks. Get instant volume, liters, and gallon results online for free.",
  icon: "💧",
  color: "#058554",
  featured: false,
  keywords: [
    "water tank capacity calculator",
    "tank volume calculator",
    "calculate water storage",
    "cylinder volume calculator",
    "rectangular tank volume",
    "water storage calculator",
    "tank size calculator"
  ],
  seo: {
    title: "Water Tank Capacity Calculator – Liters & Gallons",
    description: "Work out how much water a rectangular or cylindrical tank holds, standing or lying down, in liters, US gallons, cubic meters and cubic feet.",
    keywords: "water tank capacity calculator, tank volume calculator, calculate water storage, cylinder volume calculator, rectangular tank volume",
    og: {
      title: "Water Tank Capacity Calculator – Free Volume & Storage Tool",
      description: "Calculate water tank volume and capacity instantly. Support for cylindrical and rectangular tanks with multiple unit options.",
      type: "website",
      url: "/tools/architecture/water-tank-capacity-calculator"
    },
    howToSteps: [
      { name: "Pick the tank shape", text: "Choose rectangular, vertical cylinder or horizontal cylinder." },
      { name: "Choose the unit", text: "Select meters, centimeters, feet or inches." },
      { name: "Enter the dimensions", text: "Type length, width and height, or radius and height (length for a horizontal tank)." },
      { name: "Read the capacity", text: "See the capacity in liters and US gallons and the volume in cubic meters and cubic feet." },
    ],
    faq: [
      { q: "How do I calculate water tank capacity?", a: "Rectangular: length × width × height. Cylinder: π × radius² × height. A round tank 1.2 m across and 1.5 m tall holds π × 0.6² × 1.5 = 1.70 m³, or 1,696 liters (448 US gallons)." },
      { q: "How do I convert cubic meters or feet to gallons?", a: "1 m³ = 1,000 liters = 264.2 US gallons = 220 UK gallons. 1 cubic foot = 7.48 US gallons = 28.3 liters." },
      { q: "How much does a full tank weigh?", a: "Water weighs 1 kg per liter (8.34 lb per US gallon), so 1,000 liters weighs 1 tonne and 500 US gallons about 4,170 lb, plus the tank itself. Check that the base or roof can carry it." },
      { q: "What size tank does a household need?", a: "Americans use about 80–100 US gallons (300–380 liters) of water per person per day at home (US EPA WaterSense); Europeans about 120–150 liters. Multiply by the number of people and the days of storage you want." },
      { q: "Is the usable volume the same as the capacity?", a: "No. Outlets sit above the floor of the tank and an overflow sits below the top, so usable water is typically 85–95% of the full geometric capacity." },
    ],
  },
  relatedTools: [
    "rainwater-harvesting-calculator",
    "concrete-volume-calculator",
    "excavation-volume-calculator"
  ]
};
