import { siteConfig } from "@/config/site";

export const surveyAreaCalculatorConfig = {
  name: "Survey Area Calculator",
  slug: "survey-area-calculator",
  description: "Calculate surveyed land area instantly. Supports rectangle, triangle, and polygon plots with real-time unit conversions.",
  category: "land",
  icon: "🗺️",
  free: true,
  seo: {
    title: "Survey Area Calculator – Land Area from Measurements",
    description: "Calculate land area from a rectangle, a triangle's three sides or polygon corner coordinates, in sq ft, m², acres or hectares, with a full conversion table.",
    keywords: [
      "survey area calculator",
      "land area calculator",
      "plot area calculator",
      "survey land measurement",
      "acre calculator",
      "land measurement tool",
      "area conversion calculator",
      "polygon area calculator",
      "triangle land area",
      "rectangle plot calculator",
    ],
    og: {
      title: "Survey Area Calculator – Land Area from Measurements",
      description: "Calculate land area from a rectangle, a triangle's three sides or polygon corner coordinates, in sq ft, m², acres or hectares, with a full conversion table.",
      url: `${siteConfig.url}/tools/land/survey-area-calculator`,
    },
    howToSteps: [
      { name: "Pick the plot type", text: "Choose rectangle, triangle (three sides) or polygon (coordinates)." },
      { name: "Choose the units", text: "Select the input unit and the main output unit." },
      { name: "Enter the measurements", text: "Type the length and width, the three sides, or one x y coordinate pair per line." },
      { name: "Read the area", text: "See the area in the chosen unit with a conversion table, and copy or export it." },
    ],
    faq: [
      { q: "How is land area calculated from coordinates?", a: "With the shoelace (surveyor's) formula: Area = ½ |Σ (xᵢ yᵢ₊₁ − xᵢ₊₁ yᵢ)| over the corners in order. Corners at (0, 0), (100, 0), (100, 50), (0, 50) in feet give 5,000 sq ft." },
      { q: "How do I find the area of a triangular plot from its sides?", a: "Heron's formula: s = (a + b + c) ÷ 2 and Area = √(s(s − a)(s − b)(s − c)). Sides of 300, 400 and 500 ft give 60,000 sq ft (1.38 acres)." },
      { q: "Where do I get the coordinates?", a: "From a survey plat, a GPS survey or GIS software. Enter them in order around the boundary, clockwise or counterclockwise, in the same unit." },
      { q: "How accurate is the result?", a: "As accurate as the measurements. For legal descriptions and sales, use the area on a licensed surveyor's plat; tape and GPS measurements can be off by a few percent." },
      { q: "How do I convert square feet to acres or hectares?", a: "1 acre = 43,560 sq ft; 1 hectare = 107,639 sq ft = 2.471 acres." },
    ],
  },
};
