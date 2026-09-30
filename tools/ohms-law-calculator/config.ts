export const toolConfig = {
  slug: "ohms-law-calculator",
  name: "Ohm's Law Calculator",
  description: "Calculate Voltage, Current, or Resistance instantly using Ohm's Law (V = I × R).",
  category: "calculator",
  icon: "⚡",
  free: true,
  backend: false,
  seo: {
    title: "Ohm's Law Calculator Online – V = I × R",
    description: "Enter any two of voltage, current and resistance to get the third with V = I × R, in volts, amps and ohms, entirely in your browser.",
    keywords: [
      "ohms law calculator",
      "calculate voltage",
      "calculate current",
      "calculate resistance",
      "v=ir calculator",
      "electrical engineering calculator"
    ],
    openGraph: {
      title: "Ohm's Law Calculator Online – V = I × R",
      description: "Enter any two of voltage, current and resistance to get the third with V = I × R, in volts, amps and ohms, entirely in your browser.",
      type: "website",
      url: "/tools/calculator/ohms-law-calculator"
    },
    howToSteps: [
      { name: "Enter two values", text: "Type any two of voltage, current and resistance, and set each one's unit: mV, V or kV; µA, mA or A; Ω, kΩ or MΩ." },
      { name: "Read the third", text: "The calculator works out the empty field with V = I × R as you type. If all three are filled, clear one." },
      { name: "Copy or save", text: "Copy the result or save it to the history kept in your browser." },
    ],
    faq: [
      { q: "What is Ohm's law?", a: "The voltage across a resistor equals the current through it times its resistance: V = I × R. Rearranged, I = V ÷ R and R = V ÷ I. For example, 12 V across 6 Ω drives 2 A." },
      { q: "How do I calculate current from voltage and resistance?", a: "Divide voltage by resistance: I = V ÷ R. A 9 V battery across a 450 Ω resistor gives 9 ÷ 450 = 0.02 A, or 20 mA." },
      { q: "How do I pick a resistor for an LED?", a: "Subtract the LED's forward voltage from the supply and divide by the current you want: R = (V supply − V LED) ÷ I. A 2 V red LED at 20 mA on 5 V needs (5 − 2) ÷ 0.02 = 150 Ω. Enter 3 V and 20 mA here to get the same answer." },
      { q: "How do I work out power?", a: "Multiply voltage by current: P = V × I, so 12 V at 2 A is 24 W. Equivalent forms are P = I² × R and P = V² ÷ R. This calculator gives V, I and R; use the electrical power calculator for watts." },
      { q: "Does Ohm's law apply to every component?", a: "It holds for resistors and most conductors at a steady temperature. LEDs, diodes and transistors are non-linear, and a filament bulb's resistance rises as it heats up. In AC circuits with capacitors or inductors, use impedance (Z) in place of R." },
    ],
  },
  features: [
    "Calculate Voltage, Current, or Resistance",
    "Real-time instant calculation",
    "Support for multiple units (mV, V, kV, uA, mA, A, Ω, kΩ, MΩ)",
    "Copy results to clipboard",
    "Calculation history management",
    "Works entirely in the browser"
  ]
};
