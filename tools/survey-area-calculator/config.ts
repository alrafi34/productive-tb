import { siteConfig } from "@/config/site";

export const surveyAreaCalculatorConfig = {
  name: "Survey Area Calculator",
  slug: "survey-area-calculator",
  description: "Calculate surveyed land area instantly. Supports rectangle, triangle, and polygon plots with real-time unit conversions.",
  category: "land",
  icon: "🗺️",
  free: true,
  seo: {
    title: "Free Survey Area Calculator – Calculate Land Area Online",
    description: "Calculate surveyed land area instantly online. Supports square feet, meters, acres, hectares, polygon coordinates, and multiple plot types with real-time conversions.",
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
      title: "Free Survey Area Calculator – Calculate Land Area Online",
      description: "Calculate surveyed land area instantly online. Supports square feet, meters, acres, hectares, polygon coordinates, and multiple plot types with real-time conversions.",
      url: `${siteConfig.url}/tools/land/survey-area-calculator`,
    },
  },
};
