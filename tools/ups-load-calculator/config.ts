import { siteConfig } from "@/config/site";

export const upsLoadCalculatorConfig = {
  name: "UPS Load Calculator",
  description: "Calculate required UPS capacity based on connected devices. Estimate total power load, convert watts to VA, and get instant UPS sizing recommendations with safety margins.",
  icon: "🔋",
  category: "electrical",
  slug: "ups-load-calculator",
  seo: {
    title: "UPS Load & Backup Time Calculator",
    description: "Size a UPS for your load and estimate runtime from battery capacity. Enter appliance wattage, battery Ah and voltage to get backup hours.",
    keywords: [
      "ups load calculator",
      "ups size calculator",
      "ups capacity calculator",
      "power load calculator",
      "ups wattage calculator",
      "ups va calculator",
      "uninterruptible power supply calculator",
      "ups sizing tool",
      "backup power calculator",
      "electrical load calculator"
    ],
    og: {
      title: "UPS Load Calculator – Calculate Required UPS Capacity",
      description: "Calculate total power load and get instant UPS sizing recommendations. Free online tool with device presets and safety margins.",
      url: `${siteConfig.url}/tools/electrical/ups-load-calculator`,
    },
  },
};
