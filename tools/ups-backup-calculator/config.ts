import { siteConfig } from "@/config/site";

export const upsBackupCalculatorConfig = {
  name: "UPS Backup Calculator",
  description: "Calculate how long your UPS will run based on battery capacity and load power.",
  icon: "⏱️",
  category: "electrical",
  slug: "ups-backup-calculator",
  seo: {
    title: "UPS Backup Time Calculator – Battery Runtime",
    description: "Estimate how long a UPS or inverter battery will run your load from its voltage and Ah or Wh, with efficiency and a safety buffer.",
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
      title: "UPS Backup Time Calculator – Battery Runtime",
      description: "Estimate how long a UPS or inverter battery will run your load from its voltage and Ah or Wh, with efficiency and a safety buffer.",
      url: `${siteConfig.url}/tools/electrical/ups-backup-calculator`,
    },
    howToSteps: [
      { name: "Enter the load", text: "Type the total power of the connected devices in watts, or pick a load preset." },
      { name: "Enter the battery", text: "Choose battery voltage and Ah, or the battery energy in Wh; presets cover common UPS batteries." },
      { name: "Set efficiency", text: "Use the slider for the UPS inverter efficiency, typically 85–95%." },
      { name: "Set a safety buffer", text: "Keep 20–30% in reserve for battery ageing, temperature and load changes." },
      { name: "Read the runtime", text: "See the backup time in hours and minutes with a breakdown, and save scenarios to compare." },
    ],
    faq: [
      { q: "How is UPS backup time calculated?", a: "Runtime (h) = battery Wh × efficiency × (1 − buffer) ÷ load W, where Wh = V × Ah. A 12 V 40 Ah battery (480 Wh) at 85% efficiency with a 20% buffer runs a 300 W load for about 1.1 hours." },
      { q: "Can I work out runtime from the UPS's VA rating?", a: "No. The VA rating is the most power the UPS can supply, not the energy in its battery. Runtime depends on the battery's voltage and Ah; check the battery label or the manufacturer's runtime chart." },
      { q: "Why is my actual backup time shorter?", a: "Lead-acid batteries deliver less than their rated Ah when discharged quickly, lose capacity with age and in the cold, and the load changes. The rated Ah is usually at a 20-hour rate, so allow a buffer." },
      { q: "How often should UPS batteries be replaced?", a: "Sealed lead-acid UPS batteries usually last 3–5 years. Replace them when runtime drops noticeably, the UPS reports a failed self-test or the case swells." },
      { q: "Can I add batteries for longer runtime?", a: "Only if the UPS supports external battery packs. Connect identical batteries of the same age, and never exceed the UPS's charger and voltage limits." },
    ],
  },
};
