export const toolConfig = {
  slug: "exponent-calculator",
  name: "Exponent Calculator",
  description: "Calculate powers (x^y) instantly with support for negative and fractional exponents.",
  category: "math",
  icon: "🔢",
  free: true,
  backend: false,
  seo: {
    title: "Exponent Calculator – Negative & Fractional Powers",
    description: "Calculate x^y for any base and exponent, including negative and fractional exponents such as (−8)^(1/3) = −2, with steps and scientific notation.",
    keywords: [
      "exponent calculator",
      "power calculator",
      "x to the power y calculator",
      "x^y calculator",
      "calculate x to the y",
      "online exponent calculator",
      "power of a number calculator",
      "negative exponent calculator",
      "fractional exponent calculator",
      "scientific notation calculator",
      "math exponent rules",
      "free power calculator"
    ],
    openGraph: {
      title: "Exponent Calculator Online - Fast x^y Power Calculations",
      description: "Calculate positive, negative, and fractional exponents instantly with steps, precision settings, and scientific notation.",
      type: "website",
      url: "/tools/exponent-calculator"
    },
    howToSteps: [
      { name: "Enter your base value in the Base", text: "Enter your base value in the Base (x) input." },
      { name: "Enter the exponent value in the Exponent", text: "Enter the exponent value in the Exponent (y) input, or adjust it with the slider." },
      { name: "Review the instant result in the output panel", text: "Review the instant result in the output panel." },
      { name: "Enable Show Steps to see multiplication expansion for positive integer exponents", text: "Enable Show Steps to see multiplication expansion for positive integer exponents." },
      { name: "Set decimal precision or enable scientific notation to format output as needed", text: "Set decimal precision or enable scientific notation to format output as needed." },
      { name: "Copy the result or save it to local history for later reference", text: "Copy the result or save it to local history for later reference." },
    ],
    faq: [
      { q: "What does an exponent calculator do?", a: "An exponent calculator raises a base number to a chosen power, such as 2^5 or 10^-3, and returns the result instantly. This tool also supports fractional exponents and optional scientific notation for very large or very small results." },
      { q: "How do negative exponents work?", a: "A negative exponent means reciprocal power. For example, 2^-3 equals 1/(2^3), which is 1/8 or 0.125. The calculator applies this rule automatically." },
      { q: "How do fractional exponents work?", a: "Fractional exponents represent roots. For example, x^(1/2) is the square root of x, and x^(1/3) is the cube root of x. The calculator supports decimal inputs so you can evaluate these forms directly." },
      { q: "Is 0^0 valid in this calculator?", a: "Most programming environments evaluate 0^0 as 1 by convention, and this calculator follows that behavior. In pure mathematics, 0^0 can be treated as indeterminate depending on context." },
      { q: "Can I use this tool on mobile and desktop?", a: "Yes. The interface is responsive and works on phones, tablets, and desktop browsers, making it useful for quick checks in class, at work, or while studying." },
      { q: "Are my calculations private?", a: "Yes. We do not collect or store what you enter. Any history the tool keeps is visible only to you. No account is required." },
    ],
  },
  features: [
    "Instant real-time power calculations",
    "Support for negative and fractional exponents",
    "Step-by-step calculation expansion",
    "Scientific notation support for large results",
    "Precision control for decimal output",
    "Calculation history",
    "Interactive exponent range slider",
    "Nothing to install"
  ]
};
