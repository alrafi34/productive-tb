export const transistorBiasCalculatorConfig = {
  name: "Transistor Bias Calculator",
  slug: "transistor-bias-calculator",
  category: "electrical",
  description: "Calculate BJT transistor biasing parameters including Q-point, currents, and voltages. Free online calculator for voltage divider, fixed, and emitter bias configurations.",
  icon: "🔧",
  color: "#058554",
  featured: true,
  keywords: [
    "transistor bias calculator",
    "BJT calculator",
    "voltage divider bias calculator",
    "Q point calculator",
    "transistor biasing",
    "electronics calculator",
    "amplifier design"
  ],
  seo: {
    title: "Transistor Bias Calculator — Free BJT Q-Point Tool | Productive Toolbox",
    description: "Calculate BJT transistor bias instantly. Enter Vcc and resistors to get Vce, Ic, Ib, and operating region. Free, browser-based, no signup.",
    keywords: [
      "transistor bias calculator",
      "bjt bias calculator",
      "bjt calculator",
      "transistor q point calculator",
      "voltage divider bias calculator",
      "fixed bias calculator",
      "emitter bias calculator",
      "transistor biasing calculator",
      "bjt operating point calculator",
      "transistor dc bias calculator",
      "collector emitter voltage calculator",
      "base current calculator transistor",
      "npn transistor bias calculator",
      "common emitter bias calculator",
      "transistor active region calculator",
      "transistor saturation calculator",
      "transistor cutoff calculator",
      "free transistor bias calculator",
      "electronics calculator transistor",
      "amplifier bias calculator",
      "vce calculator",
      "ic ib calculator transistor",
      "beta hfe calculator",
      "transistor circuit design calculator",
    ],
    og: {
      title: "Transistor Bias Calculator — Free BJT Q-Point Calculator",
      description: "Calculate BJT transistor Q-point instantly. Enter Vcc and resistor values to get Vce, Ic, Ib, and operating region for voltage divider, fixed, or emitter bias.",
      type: "website",
      url: "/tools/electrical/transistor-bias-calculator"
    },
    howToSteps: [
      {
        name: "Select a Bias Configuration",
        text: "Choose voltage divider, fixed, or emitter bias from the mode selector. The input fields update automatically based on which resistors that configuration requires.",
      },
      {
        name: "Enter the Supply Voltage",
        text: "Type Vcc, the DC supply rail for the circuit, typically 5V, 9V, or 12V for small-signal amplifier stages.",
      },
      {
        name: "Enter Your Resistor Values",
        text: "Input R1/R2 for voltage divider bias, or Rb for fixed and emitter bias, plus Rc and Re where applicable. Try a built-in preset first to see realistic values.",
      },
      {
        name: "Set Beta and Vbe",
        text: "Enter the transistor's beta (hFE), typically 100 to 300, and Vbe, typically 0.7V for silicon transistors. These directly affect the current calculations.",
      },
      {
        name: "Read the Q-Point Results",
        text: "The calculator returns base, emitter, and collector voltages and currents instantly, plus the operating region and a full step-by-step formula breakdown.",
      },
      {
        name: "Export or Save Your Calculation",
        text: "Copy the result to your clipboard or export a text report. The last 10 calculations are saved automatically so you can compare different bias designs.",
      },
    ],
    faq: [
      {
        q: "What is a transistor bias calculator?",
        a: "A transistor bias calculator is a tool that finds the DC operating point, or Q-point, of a bipolar junction transistor circuit. It supports voltage divider, fixed, and emitter bias configurations, and reports whether the resulting Q-point falls in the active, saturation, or cutoff region.",
      },
      {
        q: "How is the Q-point calculated?",
        a: "For voltage divider bias: Vb equals Vcc times R2 divided by the sum of R1 and R2, then Ve equals Vb minus Vbe, Ie equals Ve divided by Re, Ic is approximately equal to Ie, Ib equals Ic divided by beta, Vc equals Vcc minus Ic times Rc, and Vce equals Vc minus Ve. Fixed bias uses Ib equals Vcc minus Vbe divided by Rb, then Ic equals beta times Ib directly. Emitter bias solves for base current using the full loop equation including the emitter resistor, then derives the remaining voltages and currents from that.",
      },
      {
        q: "What is the difference between voltage divider, fixed, and emitter bias?",
        a: "Voltage divider bias uses two resistors to set a stable base voltage independent of beta, making it the most temperature-stable and the standard choice for amplifier design. Fixed bias uses a single resistor from Vcc to the base, which is simple but makes collector current directly proportional to beta, so it drifts heavily between individual transistors. Emitter bias uses a base resistor plus an emitter resistor for good stability with fewer parts than voltage divider bias, but typically needs a dual supply.",
      },
      {
        q: "What does it mean when the calculator shows saturation?",
        a: "The calculator flags saturation when the computed Vce drops below Vbe. Physically this means the transistor no longer amplifies and behaves like a closed switch with a low, roughly constant Vce. This is the desired state for switching circuits like relay drivers, but an accident to avoid in linear amplifier stages.",
      },
      {
        q: "What does cutoff mean in this calculator?",
        a: "Cutoff is reported when the computed collector current falls below 0.01 mA, meaning essentially no current flows through the transistor. In this state the transistor behaves like an open switch, which is normal in digital switching circuits but means an amplifier stage is not conducting.",
      },
      {
        q: "What value of beta (hFE) should I use?",
        a: "Use the typical hFE value from your transistor's datasheet, commonly 100 to 300 for small-signal NPN devices. Because beta varies significantly between individual transistors of the same part number, a well-designed bias circuit, especially voltage divider bias, should keep the Q-point stable even if the real beta differs substantially from the value you entered.",
      },
      {
        q: "Why did the calculator give a negative or unrealistic Vce?",
        a: "The formulas used are linear DC approximations and do not clamp the result at the real saturation voltage of roughly 0.1 to 0.3V. If your resistor values push the computed Ic times Rc above Vcc, the calculator shows a very low or negative Vce, which is a strong signal that the transistor is being driven into hard saturation rather than a literal measurable voltage.",
      },
      {
        q: "How do I choose resistor values for voltage divider bias?",
        a: "A common design rule sets the base voltage to roughly 10 to 20 percent of Vcc, chooses Re so the emitter voltage is about 1 to 2V, picks collector current for the target gain, and sets Rc so Vce sits near half of Vcc for maximum symmetrical output swing. R1 and R2 should be small enough that base current does not meaningfully load the divider.",
      },
      {
        q: "Can I use this calculator for PNP transistors?",
        a: "The formulas assume an NPN transistor with conventional current flowing into the collector and base. For a PNP transistor the same equations apply in magnitude, with all voltages referenced with reversed polarity, so enter magnitudes as positive numbers and mentally flip the voltage signs when translating results to your PNP schematic.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your resistor values, supply voltage, beta, and any saved calculation history are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "op-amp-calculator",
    "amplifier-gain-calculator",
    "ohms-law-calculator",
    "voltage-divider-calculator",
    "led-resistor-calculator",
    "power-calculator-electrical"
  ]
};

export const toolConfig = transistorBiasCalculatorConfig;
