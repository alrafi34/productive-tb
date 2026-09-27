import { siteConfig } from "@/config/site";

export const powerSupplyCalculatorConfig = {
  name: "Power Supply Calculator",
  description: "Calculate recommended PSU wattage for PC builds based on components. Get accurate power consumption estimates for gaming and workstation systems.",
  icon: "🔌",
  category: "electrical",
  slug: "power-supply-calculator",
  seo: {
    title: "PC Power Supply Calculator – PSU Wattage for a Build",
    description: "Estimate a PC's power draw from CPU, GPU, RAM, storage, cooling and peripherals, add headroom and get the recommended PSU wattage.",
    keywords: [
      "PSU calculator",
      "power supply calculator", 
      "PC wattage calculator",
      "recommended PSU size",
      "gaming PC power calculator",
      "computer power consumption",
      "PSU wattage estimator",
      "PC build power requirements",
      "system power calculator",
      "PSU sizing tool"
    ],
    og: {
      title: "PC Power Supply Calculator – PSU Wattage for a Build",
      description: "Estimate a PC's power draw from CPU, GPU, RAM, storage, cooling and peripherals, add headroom and get the recommended PSU wattage.",
      url: `${siteConfig.url}/tools/electrical/power-supply-calculator`,
    },
    howToSteps: [
      { name: "Choose the CPU and GPU", text: "Select your processor and graphics card, or integrated graphics." },
      { name: "Add memory and storage", text: "Select the RAM size and add each SSD, NVMe or hard drive." },
      { name: "Choose cooling and extras", text: "Select the cooler and add fans, RGB lighting and USB peripherals." },
      { name: "Set overclocking and headroom", text: "Tick overclocking if you plan it, and choose a safety margin of 15–30%." },
      { name: "Read the recommendation", text: "See the estimated load, the recommended PSU size and the load percentage." },
    ],
    faq: [
      { q: "How much PSU wattage do I need?", a: "Add up the power of every component, add 20–30% headroom, and round up to the next PSU size. A build drawing about 450 W at full load with 20% margin needs 540 W, so a 550 W or 650 W unit." },
      { q: "Why add a safety margin?", a: "It covers short power spikes from modern graphics cards, component ageing and future upgrades, and keeps the PSU in its quiet, efficient range." },
      { q: "What load percentage is best?", a: "PSUs are usually most efficient at about 40–60% load and still good up to 80%. Running close to 100% continuously makes them hot and noisy." },
      { q: "Should I account for overclocking?", a: "Yes. Overclocking can raise CPU and GPU power by 15–25%; the calculator adds 20% to the CPU and 15% to the GPU when it is on." },
      { q: "Do monitors count toward PSU wattage?", a: "No. Monitors have their own power supplies. Only internal components and USB-powered devices draw from the PSU." },
      { q: "Is a bigger PSU harmful?", a: "No. The computer draws only what it needs. A much larger unit costs more and can be slightly less efficient at idle, but it is safe." },
    ],
  },
};