import { siteConfig } from "@/config/site";

export const soilVolumeCalculatorConfig = {
  name: "Soil Volume Calculator",
  slug: "soil-volume-calculator",
  description: "Calculate soil excavation and fill volume for construction, landscaping, and earthwork projects. Supports rectangular, circular, trench, and triangular shapes.",
  category: "land",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Soil Volume Calculator – Cubic Yards & m³ of Dirt",
    description: "Calculate soil volume for excavation or fill: pits, trenches, circles and slopes, in cubic yards, cubic feet and m³, with weight and cost in your currency.",
    keywords: [
      "soil volume calculator",
      "excavation calculator",
      "earthwork calculator",
      "soil excavation calculator",
      "construction volume calculator",
      "fill dirt calculator",
      "trench volume calculator",
      "cubic meter calculator",
      "excavation volume estimator",
    ],
    og: {
      title: "Soil Volume Calculator – Cubic Yards & m³ of Dirt",
      description: "Calculate soil volume for excavation or fill: pits, trenches, circles and slopes, in cubic yards, cubic feet and m³, with weight and cost in your currency.",
      url: `${siteConfig.url}/tools/land/soil-volume-calculator`,
    },
    howToSteps: [
      { name: "Choose the mode", text: "Select excavation (soil removed) or fill (soil brought in)." },
      { name: "Pick the units", text: "Choose the input unit and the output unit: cubic yards, cubic feet or cubic meters." },
      { name: "Pick the shape and size", text: "Choose rectangle, circle, triangle or a custom area and enter its dimensions and depth." },
      { name: "Add density and price", text: "Optionally enter the soil density for weight, and a price per unit with your currency." },
      { name: "Read the volume", text: "See the volume in all three units, the weight and the estimated cost." },
    ],
    faq: [
      { q: "How do I calculate soil volume?", a: "Length × width × depth for a rectangle, π × r² × depth for a circle. A 20 × 10 ft area dug 2 ft deep is 400 cu ft, or 14.8 cubic yards (11.3 m³)." },
      { q: "How much does a cubic yard of soil weigh?", a: "About 2,000–2,700 lb (0.9–1.2 US tons) depending on moisture and type; 1 m³ of soil is about 1.4–1.8 tonnes. The calculator uses 1,600 kg/m³ unless you change it." },
      { q: "Does the calculator include swell?", a: "No. It gives the in-place (bank) volume. Excavated soil bulks up by 10–40% when loose, so plan trucks and disposal for the larger loose volume." },
      { q: "How do I convert cubic meters to cubic yards?", a: "Multiply by 1.308. 100 m³ is 130.8 yd³; 1 yd³ = 0.765 m³." },
      { q: "How much does topsoil or fill cost?", a: "In the US, fill dirt often costs about $10–$30 per cubic yard and screened topsoil $20–$60, plus delivery. Enter local prices for your estimate." },
    ],
  },
};
