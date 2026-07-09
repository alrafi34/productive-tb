export const wireSizeCalculatorConfig = {
  name: "Wire Size Calculator",
  slug: "wire-size-calculator",
  category: "electrical",
  description: "Calculate the correct electrical wire gauge for any circuit. Enter load current, voltage, cable length, and conductor material to get the right wire size with voltage drop analysis.",
  icon: "🔌",
  color: "#058554",
  featured: false,
  seo: {
    title: "Wire Size Calculator — Free Cable Sizing Tool Online | Productive Toolbox",
    description: "Calculate wire size for any circuit. Enter current, voltage, and distance to get cable size in mm² and AWG with voltage drop analysis. Free, browser-based.",
    keywords: [
      "wire size calculator",
      "cable size calculator",
      "electrical wire gauge calculator",
      "cable sizing calculator",
      "wire size calculation",
      "electrical cable size calculator",
      "wire gauge calculator",
      "awg wire size calculator",
      "voltage drop calculator",
      "cable cross section calculator",
      "conductor size calculator",
      "electrical wire size chart",
      "wire size for 20 amp circuit",
      "cable size for motor",
      "wire size for 30 amp circuit",
      "wire gauge for circuit breaker",
      "cable size calculator mm2",
      "wire sizing tool online",
      "free wire size calculator",
      "nec wire size calculator",
      "iec cable sizing calculator",
      "three phase cable size calculator",
      "copper wire size calculator",
      "aluminum wire size calculator",
      "wire size voltage drop calculator",
    ],
    openGraph: {
      title: "Wire Size Calculator — Free Cable Sizing Tool Online",
      description: "Calculate wire size for any circuit. Enter current, voltage, and distance to get cable size in mm² and AWG with voltage drop analysis. Free, browser-based.",
      type: "website",
      url: "/tools/electrical/wire-size-calculator",
    },
    og: {
      title: "Wire Size Calculator — Free Cable Sizing Tool Online",
      description: "Calculate wire size for any circuit. Enter current, voltage, and distance to get cable size in mm² and AWG with voltage drop analysis. Free, browser-based.",
      url: "/tools/electrical/wire-size-calculator",
    },
    howToSteps: [
      {
        name: "Enter Load Current",
        text: "Type the full-load current in amperes. For motor circuits, use the nameplate FLA rating multiplied by 1.25. For general circuits, use the breaker amperage. Always size for the maximum expected load.",
      },
      {
        name: "Set Voltage and System Type",
        text: "Select your supply voltage and choose single-phase or three-phase. Three-phase systems use the square root of 3 factor in the voltage drop formula, reducing conductor requirements for the same power.",
      },
      {
        name: "Enter Cable Length",
        text: "Enter the one-way distance from the power source to the load in meters or feet. The formula accounts for both conductors automatically — do not double the distance manually.",
      },
      {
        name: "Choose Conductor Material",
        text: "Select copper or aluminum. Copper offers higher ampacity per mm² and easier termination. Aluminum requires a larger cross-section for the same current but is cost-effective for long feeder runs.",
      },
      {
        name: "Set Maximum Voltage Drop",
        text: "Enter your allowable voltage drop percentage. Use 3% for NEC branch circuits, 2% for feeders, and 1 to 2% for sensitive equipment. The calculator finds the smallest wire satisfying both ampacity and voltage drop.",
      },
      {
        name: "Read and Apply the Result",
        text: "The calculator returns the recommended wire size in mm² and AWG, actual voltage drop percentage, power loss in watts, and a conservative next-size-up alternative. Export the result for project documentation.",
      },
    ],
    faq: [
      {
        q: "What is a wire size calculator?",
        a: "A wire size calculator determines the correct electrical conductor size for a given load based on current, voltage, cable length, and conductor material. It checks two constraints simultaneously: ampacity (the wire must carry the required current without overheating) and voltage drop (the supply voltage must stay within acceptable limits at the load end — typically within 3% for branch circuits).",
      },
      {
        q: "How is wire size calculated?",
        a: "Wire sizing uses two parallel calculations. Ampacity sets the minimum size the wire must be rated to carry the load current. Voltage drop is calculated as VD = 2 × L × I × R / 1000 for single-phase, or VD = 1.732 × L × I × R / 1000 for three-phase, where L is length in meters, I is current in amperes, and R is conductor resistance in ohms per kilometer. The calculator selects the smallest size that satisfies both constraints.",
      },
      {
        q: "What wire size do I need for a 20-amp circuit?",
        a: "For a 20-amp, 120V single-phase branch circuit up to about 25 meters (80 feet), 2.5 mm² (12 AWG) copper is the standard choice. For longer runs — 40 meters or more — voltage drop pushes the requirement to 4 mm² (10 AWG). Always enter your actual cable length to get the correct size for your specific run.",
      },
      {
        q: "What is the difference between AWG and mm²?",
        a: "AWG (American Wire Gauge) is the North American sizing system where smaller numbers indicate larger conductors — 10 AWG is larger than 14 AWG. mm² (square millimeters) is the metric IEC system used internationally, directly expressing the conductor cross-sectional area. Common equivalents: 2.5 mm² is approximately 14 AWG, 4 mm² is approximately 12 AWG, 6 mm² is approximately 10 AWG, and 10 mm² is approximately 8 AWG.",
      },
      {
        q: "Should I use copper or aluminum wire?",
        a: "Copper is preferred for most residential and commercial wiring because it has better conductivity, higher ampacity per mm², and easier termination at standard lugs. Aluminum is lighter and cheaper per meter, making it cost-effective for large feeders and utility runs. Aluminum requires approximately 1.5 times the cross-section of copper for the same ampacity, and connections must use anti-oxidation compound with aluminum-rated connectors.",
      },
      {
        q: "What is an acceptable voltage drop percentage?",
        a: "NEC and IEC guidelines recommend a maximum 3% voltage drop for branch circuits and 2% for feeder circuits, with a combined total of no more than 5%. Sensitive equipment like computers, medical devices, and precision instruments should use 1 to 2% as their maximum. Exceeding 5% total can cause equipment malfunction, motor overheating, and reduced operating efficiency.",
      },
      {
        q: "How do I measure cable length for the calculator?",
        a: "Measure the one-way distance from the power source to the load — for example, from the breaker panel to the outlet or motor. Do not double it. The voltage drop formula for single-phase already multiplies by 2 to account for both conductors. For conduit runs with bends, add 10 to 15 percent extra to account for the actual routed path length.",
      },
      {
        q: "Why does the calculator recommend a larger wire than I expected?",
        a: "Long cable runs are the most common reason. A 15-amp circuit at 120V over 60 meters requires 6 mm² (10 AWG) — three sizes larger than ampacity alone would suggest — because voltage drop forces the upgrade. Other factors that push toward larger conductors include low supply voltage, aluminum instead of copper, stricter voltage drop limits for sensitive loads, and three-phase versus single-phase system type.",
      },
      {
        q: "Does the calculator account for temperature derating?",
        a: "This calculator uses standard ampacity values for typical installation conditions: 30°C ambient temperature and limited conductor bundling. For high-temperature environments, multiple cables in the same conduit, or cables buried directly in the ground, apply the NEC Table 310.15 or IEC 60364 derating factors to your current before entering it. Multiply your load current by the inverse of the derating factor to get the adjusted input value.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your current values, cable lengths, and system parameters are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "voltage-drop-calculator",
    "circuit-breaker-calculator",
    "power-consumption-calculator",
    "electric-motor-power-calculator",
    "electrical-load-calculator-building",
    "ohms-law-calculator",
  ],
};

export const toolConfig = wireSizeCalculatorConfig;
