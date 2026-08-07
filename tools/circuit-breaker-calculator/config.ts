export const circuitBreakerCalculatorConfig = {
  name: "Circuit Breaker Calculator",
  slug: "circuit-breaker-calculator",
  category: "electrical",
  description: "Calculate the correct circuit breaker size for electrical loads. Supports single-phase and three-phase systems with instant results and safety recommendations.",
  icon: "🔌",
  color: "#058554",
  featured: false,
  keywords: [
    "circuit breaker calculator",
    "breaker size calculator",
    "electrical load calculator",
    "amp calculation tool",
    "breaker sizing tool",
    "electrical safety calculator",
    "MCB calculator",
    "circuit protection calculator"
  ],
  seo: {
    title: "Circuit Breaker Calculator — Free Breaker Size Calculator",
    description: "Calculate the correct circuit breaker size from load, voltage, and phase type. Get NEC 125% continuous load sizing and wire gauge tips. Free, no signup.",
    keywords: [
      "circuit breaker calculator",
      "breaker size calculator",
      "electrical load calculator",
      "amp calculation tool",
      "breaker sizing tool",
      "electrical safety calculator",
      "MCB calculator",
      "circuit protection calculator",
      "free circuit breaker calculator",
      "breaker size for amps",
      "three phase breaker calculator",
      "single phase breaker calculator",
      "NEC breaker sizing calculator",
      "continuous load breaker calculator",
      "breaker size for motor",
      "how to size a circuit breaker",
      "breaker amperage calculator",
      "electrical panel breaker calculator",
      "MCCB sizing calculator",
      "breaker size chart",
    ],
    og: {
      title: "Circuit Breaker Calculator — Free Breaker Size Calculator",
      description: "Calculate the correct circuit breaker size from load, voltage, and phase type. Get NEC 125% continuous load sizing and wire gauge tips. Free tool.",
      type: "website",
      url: "/tools/electrical/circuit-breaker-calculator"
    },
    howToSteps: [
      {
        name: "Enter the Total Load",
        text: "Type the load in watts or kilowatts using the unit selector. Use the equipment's actual rated power, not an average, since sizing for peak load prevents nuisance tripping.",
      },
      {
        name: "Select Supply Voltage",
        text: "Choose from 120V, 230V, 240V, 400V, or 415V depending on your electrical system. US systems typically use 120V or 240V, while EU and much of Asia use 230V single-phase or 400V three-phase.",
      },
      {
        name: "Choose Single-Phase or Three-Phase",
        text: "Select the phase type matching your electrical supply. Three-phase circuits use the square root of 3 factor and draw less current than single-phase for the same power.",
      },
      {
        name: "Set Load Type",
        text: "Mark the load as continuous if it runs 3 or more hours at a time, such as lighting or HVAC, or non-continuous for intermittent loads. Continuous loads receive the NEC 125% safety factor automatically.",
      },
      {
        name: "Enter Power Factor",
        text: "Use 1.0 for resistive loads like heaters and incandescent lighting, or 0.8 to 0.9 for motors and other inductive equipment.",
      },
      {
        name: "Read the Recommended Breaker Size",
        text: "The calculator returns the calculated current, the continuous-load-adjusted current, the recommended standard breaker size, and a wire gauge suggestion for the circuit.",
      },
    ],
    faq: [
      {
        q: "What is a circuit breaker calculator?",
        a: "A circuit breaker calculator determines the correct amperage rating for a circuit breaker protecting an electrical load. It converts your load in watts or kilowatts into current using the supply voltage, phase type, and power factor, applies the NEC 125 percent continuous load factor when required, and recommends the smallest standard breaker size that safely carries that current.",
      },
      {
        q: "How is circuit breaker size calculated?",
        a: "For single-phase loads, current equals power divided by the product of voltage and power factor. For three-phase loads, current equals power divided by the product of the square root of 3, voltage, and power factor. If the load is continuous, expected to run 3 or more hours, the current is multiplied by 1.25 before the calculator selects the nearest standard breaker size at or above that adjusted value.",
      },
      {
        q: "Why is there a 125% factor for continuous loads?",
        a: "The National Electrical Code requires branch circuit breakers to be sized at 125 percent of a continuous load's current so the breaker doesn't operate at its full thermal rating for hours at a time. Continuous loads such as lighting, HVAC, water heaters, and EV chargers generate sustained heat in the breaker, and the 25 percent margin keeps the breaker within its long-term rating and prevents nuisance tripping.",
      },
      {
        q: "What power factor should I use?",
        a: "Use 1.0 for purely resistive loads such as incandescent lighting, heating elements, and electric ranges. Use 0.8 to 0.9 for inductive loads like motors, compressors, and fluorescent or HID lighting ballasts. If the equipment nameplate lists a power factor, use that value instead of an estimate.",
      },
      {
        q: "When should I use three-phase instead of single-phase?",
        a: "Use three-phase for industrial equipment, large motors above roughly 5 HP, commercial HVAC systems, and any equipment specifically built for a three-phase supply. Three-phase circuits draw less current than single-phase for the same power delivered, which is why factories and commercial buildings prefer it for heavy loads.",
      },
      {
        q: "What is the difference between a circuit breaker and a fuse?",
        a: "Both protect a circuit from overcurrent, but a circuit breaker can be reset and reused after it trips, while a fuse must be physically replaced once it blows. Breakers are standard in modern panels because they are faster to restore after a nuisance trip, while fuses remain common in older installations and some industrial or in-line applications.",
      },
      {
        q: "Does this calculator account for voltage drop?",
        a: "No, this calculator sizes the breaker to the load current alone. Voltage drop is a separate concern that depends on cable length and wire gauge, and it can require a larger wire size even when the breaker size itself is correct. Use a dedicated voltage drop calculator alongside this one for circuits with long cable runs.",
      },
      {
        q: "Can I use a larger breaker than the calculator recommends?",
        a: "No. An oversized breaker will not trip when the wire feeding it overheats, defeating the purpose of the protection. The breaker must be sized to protect the conductor, not just to accommodate the load, so always match the breaker to both the calculated current and the ampacity of the wire actually installed.",
      },
      {
        q: "Why does the calculator warn about high current loads?",
        a: "The calculator flags loads producing more than 80A of current because circuits at this level typically require larger conductors, may need three-phase distribution, and often fall under stricter code requirements for service entrance or feeder sizing. It is a prompt to double-check wire gauge and consider whether three-phase power is more appropriate for the load.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your load, voltage, phase type, and power factor values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "voltage-drop-calculator",
    "wire-size-calculator",
    "fuse-rating-calculator",
    "short-circuit-current-calculator",
    "electrical-load-calculator-building",
    "power-consumption-calculator"
  ]
};

export const toolConfig = circuitBreakerCalculatorConfig;
