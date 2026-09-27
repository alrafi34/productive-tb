import { siteConfig } from "@/config/site";

export const smpsCalculatorConfig = {
  name: "SMPS Calculator",
  description: "Calculate switching power supply parameters including output power, efficiency, input current, and load analysis for power supply design.",
  icon: "🔌",
  category: "electrical",
  slug: "smps-calculator",
  seo: {
    title: "SMPS Calculator – Switching Power Supply Power",
    description: "Calculate a switching power supply's output power, input power, losses and input current from output voltage, current and efficiency.",
    keywords: [
      "SMPS calculator",
      "switch mode power supply calculator",
      "power supply efficiency calculator",
      "electrical power calculator",
      "DC power calculator",
      "switching power supply design",
      "power supply analysis tool",
      "SMPS efficiency calculator",
      "power electronics calculator",
      "voltage converter calculator"
    ],
    og: {
      title: "SMPS Calculator – Switching Power Supply Power",
      description: "Calculate a switching power supply's output power, input power, losses and input current from output voltage, current and efficiency.",
      url: `${siteConfig.url}/tools/electrical/smps-calculator`,
    },
    howToSteps: [
      { name: "Enter the output", text: "Type the output voltage and current your load needs." },
      { name: "Set the efficiency", text: "Use the slider or type the expected efficiency, typically 85–95%." },
      { name: "Enter the input voltage", text: "Optionally type the input voltage; mains defaults to 120 V or 230 V from your region and can be changed." },
      { name: "Choose the load type", text: "Select resistive, inductive or mixed load." },
      { name: "Read the results", text: "See output and input power, power loss, input current and the efficiency rating." },
    ],
    faq: [
      { q: "How do I calculate SMPS input power?", a: "Input power = output power ÷ efficiency. A 12 V, 2 A supply delivers 24 W; at 85% efficiency it draws 28.2 W and wastes 4.2 W as heat." },
      { q: "How is input current calculated?", a: "Input current = input power ÷ input voltage: 28.2 W at 120 V is 0.24 A, or 0.12 A at 230 V. For AC mains, also divide by the power factor (about 0.5–0.6 without PFC, 0.95+ with active PFC) to get the RMS current for fuse and wire sizing." },
      { q: "What is a good SMPS efficiency?", a: "Modern switching supplies usually reach 85–95%, and premium designs 96% or more. Below about 80% is poor for a switching design. Efficiency falls at very light loads." },
      { q: "Where do the losses come from?", a: "Switching and conduction losses in the MOSFETs and diodes, core and copper losses in the transformer or inductor, and the control circuit. The loss is heat you must remove." },
      { q: "When should I use an SMPS instead of a linear supply?", a: "Use a switching supply for higher power, efficiency and small size. A linear regulator is simpler and quieter, which suits low-power, noise-sensitive circuits." },
    ],
  },
};