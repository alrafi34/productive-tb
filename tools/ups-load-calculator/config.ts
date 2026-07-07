import { siteConfig } from "@/config/site";

export const upsLoadCalculatorConfig = {
  name: "UPS Load Calculator",
  description: "Calculate required UPS capacity based on connected devices. Estimate total power load, convert watts to VA, and get instant UPS sizing recommendations with safety margins.",
  icon: "🔋",
  category: "electrical",
  slug: "ups-load-calculator",
  seo: {
    title: "UPS Load Calculator – Calculate Required UPS Capacity Online | Free Tool",
    description: "Free UPS load calculator to estimate total power consumption and find the right UPS size. Calculate watts to VA instantly with smart recommendations and safety margins for office, home, and data center use.",
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
