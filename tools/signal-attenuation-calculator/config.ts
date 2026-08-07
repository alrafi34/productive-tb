export const signalAttenuationCalculatorConfig = {
  name: "Signal Attenuation Calculator",
  slug: "signal-attenuation-calculator",
  category: "electrical",
  description: "Calculate signal loss (attenuation) in dB using power, voltage, or distance-based methods. Free online calculator for RF, audio, and communication systems.",
  icon: "📡",
  color: "#058554",
  featured: false,
  keywords: [
    "signal attenuation calculator",
    "dB loss calculator",
    "power attenuation formula",
    "voltage attenuation",
    "signal loss calculator",
    "cable loss calculator",
    "RF attenuation calculator",
    "decibel calculator",
    "transmission line loss"
  ],
  seo: {
    title: "Signal Attenuation Calculator — Free dB Loss Calculator",
    description: "Calculate signal attenuation in dB using power, voltage, or distance. Get instant dB loss and signal loss percentage. Free, browser-based, no signup.",
    keywords: [
      "signal attenuation calculator",
      "db loss calculator",
      "signal loss calculator",
      "power attenuation calculator",
      "voltage attenuation calculator",
      "cable loss calculator",
      "rf attenuation calculator",
      "decibel loss calculator",
      "transmission line loss calculator",
      "attenuation formula calculator",
      "10log10 calculator",
      "20log10 calculator",
      "dbm attenuation calculator",
      "fiber optic loss calculator",
      "coaxial cable loss calculator",
      "signal attenuation db calculator",
      "attenuation vs gain calculator",
      "insertion loss calculator",
      "cable attenuation per meter calculator",
      "rf signal loss calculator online",
      "free signal attenuation calculator",
      "telecom signal loss calculator",
    ],
    og: {
      title: "Signal Attenuation Calculator — Free dB Loss Calculator",
      description: "Calculate signal attenuation in dB using power, voltage, or distance. Get instant dB loss and signal loss percentage. Free, browser-based, no signup.",
      type: "website",
      url: "/tools/electrical/signal-attenuation-calculator"
    },
    howToSteps: [
      {
        name: "Choose a Calculation Mode",
        text: "Select Power, Voltage, or Distance depending on what data is available. Power and voltage modes compare an input and output level directly; distance mode multiplies a known loss rate by cable length.",
      },
      {
        name: "Enter Input and Output Values",
        text: "For power or voltage mode, type the input level and output level with their units. For distance mode, enter the loss-per-unit rate and the total distance.",
      },
      {
        name: "Select the Correct Units",
        text: "Match the unit dropdowns to how the measurements were taken. Mixing up W and mW, or m and km, is the most common source of an incorrect result.",
      },
      {
        name: "Read the Attenuation Result",
        text: "The calculator returns the loss in dB, flags whether it is a loss or a gain, and for power or voltage modes shows the percentage of signal strength lost.",
      },
      {
        name: "Review the Calculation Steps",
        text: "Every result includes the full formula substitution showing the exact numbers used in the 10 log or 20 log calculation, useful for verifying the math.",
      },
    ],
    faq: [
      {
        q: "What is a signal attenuation calculator?",
        a: "A signal attenuation calculator computes how much a signal weakens in decibels as it passes through a cable, component, or system. It supports three input methods, power levels, voltage levels, or a distance-based cable loss rate, and returns the attenuation in dB along with the percentage of signal lost.",
      },
      {
        q: "How is power-based attenuation calculated?",
        a: "Power attenuation uses the formula dB equals 10 times the base-10 logarithm of P1 divided by P2, where P1 is input power and P2 is output power, both converted to watts internally. A signal entering at 100 watts and leaving at 50 watts has an attenuation of approximately 3.01 dB, the classic half power point.",
      },
      {
        q: "How is voltage-based attenuation calculated?",
        a: "Voltage attenuation uses dB equals 20 times the base-10 logarithm of V1 divided by V2, with the factor of 20 instead of 10 because power is proportional to voltage squared. A signal dropping from 10 volts to 5 volts has an attenuation of approximately 6.02 dB, twice the dB value of an equivalent power halving.",
      },
      {
        q: "How is distance-based attenuation calculated?",
        a: "Distance-based attenuation multiplies a known loss rate by the cable or path length: Total Loss in dB equals loss per unit multiplied by distance. RG-58 coaxial cable rated at 0.2 dB per meter run for 50 meters produces a total loss of 10 dB.",
      },
      {
        q: "Why does the calculator use 10 for power and 20 for voltage?",
        a: "Because power is proportional to voltage squared, converting a voltage ratio into an equivalent power-based dB figure requires doubling the multiplier. Using 10 for power and 20 for voltage keeps both calculations consistent, so a doubling of voltage and a quadrupling of power both produce the same dB value.",
      },
      {
        q: "What is the difference between attenuation and gain?",
        a: "Attenuation means the output is weaker than the input, a positive loss in dB. If the output value entered is larger than the input, the calculation produces a negative dB figure, which the calculator flags as gain rather than attenuation, since the signal was amplified rather than weakened.",
      },
      {
        q: "What is a typical attenuation value for common cables?",
        a: "RG-58 coaxial cable loses about 0.2 dB per meter at 100 MHz, Cat6 Ethernet cable loses about 0.05 dB per meter at 100 MHz, and single-mode fiber optic cable loses roughly 0.2 to 0.3 dB per kilometer. These are starting reference values since actual loss depends on frequency, cable quality, and connector count.",
      },
      {
        q: "What does dBm mean in the power attenuation mode?",
        a: "dBm is a power unit referenced to 1 milliwatt. It is the standard unit for RF signal strength because it compresses a huge dynamic range into manageable numbers, where 0 dBm equals 1 milliwatt and 30 dBm equals 1 watt. The calculator accepts dBm directly and converts it to watts internally before computing attenuation.",
      },
      {
        q: "How accurate is distance-based attenuation for real cable runs?",
        a: "Distance-based attenuation gives an estimate based on the loss-per-unit figure supplied, which itself depends on frequency, cable quality, and temperature. It does not automatically include connector or splice losses, which should be added separately, typically 0.1 to 0.5 dB per connector on RF systems.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your power, voltage, and distance values, along with your calculation history, are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "decibel-db-calculator",
    "frequency-calculator",
    "wavelength-calculator",
    "impedance-calculator",
    "amplifier-gain-calculator",
    "power-factor-calculator",
  ]
};

export const toolConfig = signalAttenuationCalculatorConfig;
