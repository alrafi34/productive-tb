import { siteConfig } from "@/config/site";

export const powerDensityCalculatorConfig = {
  name: "Power Density Calculator",
  description: "Calculate power density (W/m²) from power and area inputs. Get instant results with density analysis and safety recommendations.",
  icon: "⚡",
  category: "electrical",
  slug: "power-density-calculator",
  seo: {
    title: "Power Density Calculator – W/m² and W/ft²",
    description: "Calculate power density from power and area in W, kW or MW over m², cm², mm², ft² or in², with W/ft², a density level and cooling guidance.",
    keywords: [
      "power density calculator",
      "W per square meter calculator",
      "electrical power density tool",
      "physics calculator online",
      "energy density calculator",
      "thermal analysis calculator",
      "heat dissipation calculator",
      "power per area calculator",
      "electrical engineering calculator",
      "thermal management tool"
    ],
    og: {
      title: "Power Density Calculator – W/m² and W/ft²",
      description: "Calculate power density from power and area in W, kW or MW over m², cm², mm², ft² or in², with W/ft², a density level and cooling guidance.",
      url: `${siteConfig.url}/tools/electrical/power-density-calculator`,
    },
    howToSteps: [
      { name: "Enter the power", text: "Type the power and choose W, kW or MW." },
      { name: "Enter the area", text: "Type the area and choose m², cm², mm², ft² or in²." },
      { name: "Set the precision", text: "Choose how many decimal places to show." },
      { name: "Read the density", text: "See the power density in W/m² (or kW/m², MW/m²) and W/ft², with its level and any warning." },
    ],
    faq: [
      { q: "How is power density calculated?", a: "Power density = power ÷ area. 500 W spread over 2 m² is 250 W/m², or about 23 W/ft² (1 W/m² = 0.0929 W/ft²)." },
      { q: "What power density is high?", a: "It depends on the application. Full sunlight delivers about 1,000 W/m²; a typical office has lighting and equipment loads of roughly 10–30 W/m²; electronics and heatsinks reach thousands of W/m², and chips far more." },
      { q: "Why does power density matter?", a: "Heat has to leave through the surface, so a higher density means a hotter surface or a need for better cooling: natural convection handles low densities, fans moderate ones, and liquid cooling or heat pipes the highest." },
      { q: "How do I reduce power density?", a: "Spread the power over a larger area with a bigger heatsink, spacing or more components, or reduce the power with more efficient parts." },
      { q: "How do I convert between units?", a: "1 W/cm² = 10,000 W/m²; 1 W/in² = 1,550 W/m²; 1 W/ft² = 10.764 W/m²." },
    ],
  },
};