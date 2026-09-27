export const resistorColorCodeCalculatorConfig = {
  slug: "resistor-color-code-calculator",
  title: "Resistor Color Code Calculator",
  category: "electrical",
  description: "Decode resistor color bands into resistance values and tolerance. Supports 4, 5, and 6 band resistors with instant results.",
  keywords: [
    "resistor color code calculator",
    "resistor value calculator",
    "decode resistor bands",
    "electronics resistor tool",
    "ohm calculator resistor",
    "resistor band decoder",
    "4 band resistor",
    "5 band resistor",
    "6 band resistor",
    "resistor tolerance calculator"
  ],
  seo: {
    title: "Resistor Color Code Calculator – 4, 5 & 6 Band",
    description: "Decode 4, 5 and 6 band resistor color codes into resistance, tolerance and temperature coefficient, with the min and max value.",
    howToSteps: [
      { name: "Choose the band count", text: "Select 4, 5 or 6 bands to match your resistor." },
      { name: "Pick the colors", text: "Choose the color of each band from left to right, starting at the end farther from the gold or silver band." },
      { name: "Read the value", text: "See the resistance, tolerance range and, for 6 bands, the temperature coefficient." },
      { name: "Check with examples", text: "Load a common value such as 1 kΩ or 10 kΩ to see how its bands look." },
    ],
    faq: [
      { q: "How do I read a resistor color code?", a: "Read from the end opposite the tolerance band. On a 4-band resistor the first two bands are digits, the third is the multiplier and the fourth the tolerance: brown, black, red, gold is 10 × 100 = 1,000 Ω (1 kΩ) ±5%. Yellow, violet, orange, gold is 47 kΩ." },
      { q: "What do the colors stand for?", a: "Digits: black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, gray 8, white 9. Gold and silver as multipliers mean × 0.1 and × 0.01; as tolerance, ±5% and ±10%." },
      { q: "What is the difference between 4, 5 and 6 bands?", a: "5-band resistors have three digit bands for precision values, such as brown, black, black, brown, brown = 100 × 10 = 1 kΩ ±1%. 6-band resistors add a temperature coefficient band in ppm/K." },
      { q: "What does tolerance mean?", a: "How far the real value may be from the marked value. A 1 kΩ ±5% resistor measures between 950 Ω and 1,050 Ω." },
      { q: "Which way round do I read it?", a: "The tolerance band (often gold or silver) is usually set slightly apart, on the right. If you are unsure, measure the resistor with a multimeter out of circuit." },
    ],
  },
  relatedTools: [
    "ohms-law-calculator",
    "parallel-resistor-calculator",
    "voltage-divider-calculator"
  ]
};
