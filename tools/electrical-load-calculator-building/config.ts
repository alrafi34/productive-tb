export const electricalLoadCalculatorBuildingConfig = {
  name: "Electrical Load Calculator (Building)",
  slug: "electrical-load-calculator-building",
  category: "architecture",
  description: "Calculate total electrical load for residential and commercial buildings. Estimate kW, current, breaker size, and power usage instantly.",
  icon: "⚡",
  color: "#058554",
  featured: false,
  keywords: [
    "electrical load calculator",
    "building load calculation",
    "power consumption calculator",
    "breaker size calculator",
    "electrical planning tool",
    "current calculator",
    "cable size calculator"
  ],
  seo: {
    title: "Electrical Load Calculator – kW, Amps & Breaker",
    description: "Add up a building's appliances, apply a demand factor and get the load in kW, the current, a breaker size and a typical cable size at 120, 230 or 240 V.",
    keywords: "electrical load calculator, building load calculation, power consumption calculator, breaker size calculator, electrical planning tool",
    og: {
      title: "Electrical Load Calculator – Free Building Load Tool",
      description: "Calculate electrical load for buildings instantly with appliance-based estimation.",
      type: "website",
      url: "/tools/architecture/electrical-load-calculator-building"
    },
    howToSteps: [
      { name: "Set the supply", text: "Choose the voltage (120 V or 240 V in North America, 230 V in the UK, Europe and Australia), the building type and the demand factor." },
      { name: "Add the loads", text: "Enter each appliance with its quantity, power in watts and category, or use the templates." },
      { name: "Adjust the power factor", text: "Leave 0.8–0.9 for typical mixed loads, or 1.0 for purely resistive loads such as heaters." },
      { name: "Read the results", text: "See the connected and demand load in kW, the current, a standard breaker size and a typical copper cable size." },
    ],
    faq: [
      { q: "How do you calculate electrical load?", a: "Add the wattage of everything connected, multiply by a demand factor for the share running at once, then current = watts ÷ (volts × power factor). 1,800 W at 80% demand is 1,440 W; at 120 V and PF 0.8 that is 15 A, and at 230 V 7.8 A." },
      { q: "How is the breaker size chosen?", a: "The current is multiplied by 1.25, as the NEC requires for continuous loads, and rounded up to the next standard rating: 15, 20, 30, 40, 50 A… for 120/240 V, or 6, 10, 16, 20, 25, 32 A… (IEC) for 230 V. 15 A × 1.25 = 18.75 A, so a 20 A breaker." },
      { q: "What demand factor should I use?", a: "100% if everything can run at once, and 70–80% for typical homes and offices, where not every load is on together. The NEC (Article 220) and IEC 60364 give detailed demand factors for dwelling services and feeders." },
      { q: "What is power factor?", a: "The ratio of real power (W) to apparent power (VA). Heaters and incandescent lights are close to 1.0; motors, compressors and some electronics are 0.7–0.9, so they draw more current for the same wattage." },
      { q: "Can I size cables from this?", a: "Only as a first reference. Cable size also depends on run length and voltage drop, how cables are installed and grouped, and ambient temperature, under NEC Table 310.16 or IEC 60364-5-52. A licensed electrician must design and check the installation." },
    ],
  },
  relatedTools: [
    "lighting-load-calculator",
    "energy-consumption-calculator",
    "ohms-law-calculator"
  ]
};
