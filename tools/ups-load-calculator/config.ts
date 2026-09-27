import { siteConfig } from "@/config/site";

export const upsLoadCalculatorConfig = {
  name: "UPS Load Calculator",
  description: "Calculate required UPS capacity based on connected devices. Estimate total power load, convert watts to VA, and get instant UPS sizing recommendations with safety margins.",
  icon: "🔋",
  category: "electrical",
  slug: "ups-load-calculator",
  seo: {
    title: "UPS Size Calculator – VA Rating for Your Load",
    description: "Add up your devices' watts, add a safety margin and convert to VA with the power factor to find the UPS size you need.",
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
      title: "UPS Size Calculator – VA Rating for Your Load",
      description: "Add up your devices' watts, add a safety margin and convert to VA with the power factor to find the UPS size you need.",
      url: `${siteConfig.url}/tools/electrical/ups-load-calculator`,
    },
    howToSteps: [
      { name: "Add your devices", text: "Enter each device's name, power in watts and quantity, or pick a preset." },
      { name: "Set the safety margin", text: "Choose 20–30% headroom for startup surges and future equipment." },
      { name: "Set the power factor", text: "Use your UPS's power factor, usually 0.8–0.9, or 1.0 for some newer units." },
      { name: "Read the recommendation", text: "See the total and adjusted load, the VA required and the next standard UPS size, and export the report." },
    ],
    faq: [
      { q: "How do I size a UPS?", a: "Add up the watts of everything it will power, add a safety margin, then divide by the power factor to get VA. 400 W plus 25% is 500 W; at a power factor of 0.8 that is 625 VA, so a 650 VA UPS or larger." },
      { q: "What is the difference between watts and VA?", a: "Watts are the real power your devices use; VA is apparent power, volts × amps. A UPS has both ratings, and the load must stay under both: W = VA × power factor." },
      { q: "How much safety margin should I add?", a: "20–30% is typical. It covers startup surges and added equipment, and a UPS that is not run near its limit gives longer runtime." },
      { q: "Can I plug a laser printer into a UPS?", a: "Usually not. Laser printers draw large surges when heating, which can overload a small UPS. Plug them into a surge-only outlet." },
      { q: "How long will the UPS run?", a: "Runtime depends on the battery capacity and the load, not the VA rating. Use the UPS backup time calculator, or the manufacturer's runtime chart, to estimate it." },
    ],
  },
};
