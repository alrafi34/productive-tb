import { siteConfig } from "@/config/site";

export const mapScaleCalculatorConfig = {
  name: "Map Scale Calculator",
  slug: "map-scale-calculator",
  description: "Convert map measurements to real-world distances using map scale ratios. Supports 1:1000, 1:50000, and all common survey scales with multi-unit conversion.",
  category: "land",
  icon: "🗺️",
  free: true,
  seo: {
    title: "Map Scale Calculator – Convert Map Distance to Real Distance",
    description: "Convert map distance to real-world distance, or real distance to map distance, for any scale such as 1:24,000 or 1:50,000. Metric and imperial units.",
    keywords: [
      "map scale calculator",
      "map distance calculator",
      "real distance calculator",
      "land survey calculator",
      "survey scale calculator",
      "map ratio calculator",
      "convert map scale",
      "distance scale converter",
      "map measurement tool",
      "cartography calculator",
      "GIS distance calculator",
      "topographic map scale",
    ],
    og: {
      title: "Map Scale Calculator – Convert Map Distance to Real Distance",
      description: "Convert map distance to real-world distance, or real distance to map distance, for any scale such as 1:24,000 or 1:50,000. Metric and imperial units.",
      url: `${siteConfig.url}/tools/land/map-scale-calculator`,
    },
    howToSteps: [
      { name: "Choose the direction", text: "Convert map distance to real distance, or real distance to map distance." },
      { name: "Enter the scale", text: "Type the scale as 1:24000, 1/24000 or just 24000." },
      { name: "Enter the distance", text: "Type the measured distance and choose its unit." },
      { name: "Read the result", text: "See the converted distance in the unit you choose, or let the calculator pick the most readable one." },
    ],
    faq: [
      { q: "How do I convert map distance to real distance?", a: "Real distance = map distance × scale denominator. On a 1:24,000 US Geological Survey topo map, 1 inch = 24,000 in = 2,000 ft; on a 1:50,000 map, 1 cm = 50,000 cm = 500 m." },
      { q: "How do I find a map distance from a real distance?", a: "Divide the real distance by the scale denominator, in the same unit. 3 km at 1:25,000 is 300,000 cm ÷ 25,000 = 12 cm on the map." },
      { q: "What are common map scales?", a: "1:24,000 for USGS 7.5-minute topographic maps, 1:25,000 and 1:50,000 for Ordnance Survey and most European topographic maps, and 1:1,000 to 1:2,500 for site and cadastral plans." },
      { q: "What does a large-scale map mean?", a: "A large scale (small denominator such as 1:1,000) shows a small area in great detail; a small scale (1:1,000,000) shows a large area with less detail." },
      { q: "What scale formats can I enter?", a: "1:25000, 1/25000 or 25000; commas are ignored, so 1:25,000 works too." },
    ],
  },
};
