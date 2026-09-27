import { siteConfig } from "@/config/site";

export const triangleLandAreaCalculatorConfig = {
  name: "Triangle Land Area Calculator",
  slug: "triangle-land-area-calculator",
  description: "Calculate triangular plot area using base & height, Heron's formula, or coordinates. Instant unit conversions included.",
  category: "land",
  icon: "📐",
  free: true,
  seo: {
    title: "Triangle Land Area Calculator – 3 Sides or Base",
    description: "Calculate the area of a triangular plot from base and height, from its three sides (Heron's formula) or from coordinates, in sq ft, m², acres or hectares.",
    keywords: [
      "triangle land area calculator",
      "triangle area calculator",
      "triangular plot calculator",
      "land area calculator",
      "triangle plot measurement",
      "heron formula calculator",
      "triangle measurement tool",
      "triangular land calculator",
      "base height area calculator",
      "three sides area calculator",
    ],
    og: {
      title: "Triangle Land Area Calculator – 3 Sides or Base",
      description: "Calculate the area of a triangular plot from base and height, from its three sides (Heron's formula) or from coordinates, in sq ft, m², acres or hectares.",
      url: `${siteConfig.url}/tools/land/triangle-land-area-calculator`,
    },
    howToSteps: [
      { name: "Pick the method", text: "Choose base × height, three sides (Heron's formula) or corner coordinates." },
      { name: "Choose the units", text: "Select the input unit and the main output unit." },
      { name: "Enter the measurements", text: "Type the base and height, the three side lengths, or the three corner coordinates." },
      { name: "Read the area", text: "See the area with conversions to sq ft, m², acres and hectares and a step-by-step breakdown." },
    ],
    faq: [
      { q: "How do I find the area of a triangular plot?", a: "With base and perpendicular height: Area = ½ × base × height. A lot with a 200 ft base and 150 ft height is 15,000 sq ft (0.34 acre)." },
      { q: "What if I only know the three sides?", a: "Use Heron's formula: s = (a + b + c) ÷ 2, Area = √(s(s − a)(s − b)(s − c)). Sides of 300, 400 and 500 ft give 60,000 sq ft (1.38 acres)." },
      { q: "What is the triangle inequality?", a: "Any two sides together must be longer than the third. If not, the lengths cannot form a triangle and the calculator shows an error; recheck the measurements." },
      { q: "How do I use coordinates?", a: "Enter the x and y of each corner in feet or meters (for example from a site plan). The area is ½ |x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)|." },
      { q: "How do I convert to acres or hectares?", a: "Divide square feet by 43,560 for acres, or square meters by 10,000 for hectares." },
    ],
  },
};
