import { siteConfig } from "@/config/site";

export const landPriceCalculatorConfig = {
  name: "Land Price Calculator",
  slug: "land-price-calculator",
  description: "Calculate total land cost instantly using area size and rate per unit. Supports acre, decimal, katha, bigha, square feet, hectare, and more with multi-currency support.",
  category: "land",
  icon: "💰",
  free: true,
  seo: {
    title: "Land Price Calculator – Calculate Property Cost Instantly",
    description: "Calculate total land cost instantly using area size and rate per unit. Supports acre, decimal, katha, bigha, square feet, hectare, and more. Free online land valuation calculator.",
    keywords: [
      "land price calculator",
      "property price calculator",
      "land valuation calculator",
      "real estate calculator",
      "land cost estimator",
      "acre to decimal calculator",
      "land price per square feet",
      "property cost calculator",
      "land rate calculator",
      "katha price calculator",
      "bigha price calculator",
      "decimal land price",
    ],
    og: {
      title: "Land Price Calculator – Calculate Property Cost Instantly",
      description: "Calculate total land cost instantly using area size and rate per unit. Supports acre, decimal, katha, bigha, square feet, and more.",
      url: `${siteConfig.url}/tools/land/land-price-calculator`,
    },
  },
};
