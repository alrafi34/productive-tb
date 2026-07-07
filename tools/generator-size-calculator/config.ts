import { siteConfig } from "@/config/site";

export const generatorSizeCalculatorConfig = {
  name: "Generator Size Calculator",
  description: "Calculate appropriate generator capacity (kVA/kW) for electrical loads. Estimate generator size based on appliances, safety margin, and power factor with instant results.",
  icon: "⚡",
  category: "electrical",
  slug: "generator-size-calculator",
  seo: {
    title: "Generator Size Calculator – Calculate kVA & kW Capacity Instantly | Free Tool",
    description: "Free online generator size calculator. Calculate required generator capacity in kVA and kW based on appliances, total load, safety margin, and power factor. Get instant generator sizing recommendations.",
    keywords: [
      "generator size calculator",
      "kVA calculator",
      "generator capacity calculator",
      "electrical load calculator",
      "generator sizing tool",
      "home generator calculator",
      "kW to kVA calculator",
      "generator wattage calculator",
      "backup generator sizing",
      "standby generator calculator",
      "generator load calculator",
      "power generator calculator",
      "generator selection calculator",
      "electrical generator sizing",
      "generator capacity estimator"
    ],
    og: {
      title: "Generator Size Calculator – Calculate kVA & kW Capacity Instantly",
      description: "Free online generator size calculator. Calculate required generator capacity for your electrical loads.",
      url: `${siteConfig.url}/tools/electrical/generator-size-calculator`
    }
  }
};
