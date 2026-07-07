import { siteConfig } from "@/config/site";

export const upsBackupCalculatorConfig = {
  name: "UPS Backup Calculator",
  description: "Calculate how long your UPS will run based on battery capacity and load power.",
  icon: "⏱️",
  category: "electrical",
  slug: "ups-backup-calculator",
  seo: {
    title: "UPS Backup Calculator – Calculate Battery Backup Time Instantly | Free Tool",
    description: "Free UPS backup calculator to estimate battery runtime based on load, voltage, and capacity. Instantly calculate backup time for home, office, or server UPS systems.",
    keywords: [
      "ups backup calculator",
      "battery backup time calculator",
      "ups runtime calculator",
      "how long ups lasts",
      "power backup calculator",
      "ups battery calculator",
      "backup time estimator",
      "ups duration calculator",
      "battery runtime calculator",
      "ups capacity calculator"
    ],
    og: {
      title: "UPS Backup Calculator – Calculate Battery Backup Time",
      description: "Estimate how long your UPS will run based on battery capacity and connected load. Free online calculator with instant results.",
      url: `${siteConfig.url}/tools/electrical/ups-backup-calculator`,
    },
  },
};
