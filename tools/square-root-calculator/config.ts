export const toolConfig = {
  slug: "square-root-calculator",
  name: "Square Root Calculator",
  description: "Instantly calculate the square root of any number with precision control and verification.",
  category: "calculator",
  icon: "√",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "How accurate is this calculator?", a: "The calculator uses IEEE 754 floating-point arithmetic. For 99.9% of engineering and educational use cases, the accuracy is more than sufficient." },
      { q: "Can I export my batch results?", a: "Yes! If you use the batch mode, an export button will appear allowing you to download a CSV file containing all your inputs and their corresponding roots." },
      { q: "What is the square root of a negative number?", a: "By default, our tool alerts you that negative numbers result in complex/imaginary numbers. Standard calculators cannot find a \"real\" number because no real number multiplied by itself can be negative." },
    ],
    title: "Square Root Calculator – Find √ of Any Number",
    description: "Calculate the square root of any number to the precision you choose, check the answer by squaring it, and work out many roots at once.",
    keywords: [
      "square root calculator",
      "square root finder",
      "calculate root",
      "math calculator",
      "batch square root",
      "sqrt calculator"
    ],
    openGraph: {
      title: "Square Root Calculator Online – Instantly Find √ of Any Number",
      description: "Fast, accurate square root calculations with decimal precision and verification tools.",
      type: "website",
      url: "/tools/square-root-calculator"
    }
  },
  features: [
    "Instant real-time square root calculation",
    "Decimal precision control (0-10 places)",
    "Square verification (Result × Result)",
    "Batch processing for multiple numbers",
    "Calculation history saved locally",
    "Random number generator for testing",
    "Export results to CSV"
  ]
};
