import { siteConfig } from "@/config/site";

export const powerLossCalculatorConfig = {
  name: "Power Loss Calculator",
  description: "Calculate electrical power loss using voltage, current, and resistance. Get instant results with efficiency estimation and real-time calculations for electrical systems.",
  icon: "⚡",
  category: "electrical",
  slug: "power-loss-calculator",
  seo: {
    title: "Power Loss Calculator – I²R Loss and Efficiency",
    description: "Calculate resistive power loss (I²R), circuit power (V × I × PF) and efficiency for cables, conductors and components, with the steps shown.",
    keywords: [
      "power loss calculator",
      "electrical power calculator",
      "I squared R loss calculator",
      "voltage current resistance calculator",
      "electrical efficiency calculator",
      "transmission line loss calculator",
      "ohmic loss calculator",
      "power dissipation calculator",
      "energy loss calculator",
      "electrical system efficiency"
    ],
    og: {
      title: "Power Loss Calculator – I²R Loss and Efficiency",
      description: "Calculate resistive power loss (I²R), circuit power (V × I × PF) and efficiency for cables, conductors and components, with the steps shown.",
      url: `${siteConfig.url}/tools/electrical/power-loss-calculator`,
    },
    howToSteps: [
      { name: "Choose the mode", text: "Select I²R for conductor loss, V × I for circuit power, or mixed to get both." },
      { name: "Enter the values", text: "Type the voltage, current and resistance your mode needs." },
      { name: "Add the power factor", text: "For AC circuits, optionally type the power factor (0–1)." },
      { name: "Turn on efficiency", text: "Optionally tick efficiency and type the input power to see the percentage lost." },
      { name: "Read the results", text: "See the power loss, efficiency and loss level with the calculation steps." },
    ],
    faq: [
      { q: "How is power loss calculated?", a: "Resistive loss P = I² × R. 20 A through a cable with 0.1 Ω of total resistance loses 20² × 0.1 = 40 W as heat." },
      { q: "Why does loss rise with the square of current?", a: "Because P = I²R: doubling the current quadruples the loss. That is why power is transmitted at high voltage and low current." },
      { q: "What loss is acceptable?", a: "Designers usually keep cable losses to a few percent. Voltage drop limits, such as the NEC's 3% for a branch circuit (informational note) or 3–5% in BS 7671, keep losses in the same range." },
      { q: "How does wire size affect loss?", a: "A larger conductor has lower resistance, so the loss falls in proportion. Going up one or two sizes on long, heavily loaded runs often pays for itself in saved energy." },
      { q: "How does power factor affect loss?", a: "A low power factor means more current for the same real power, and the extra current adds I²R loss. Power factor correction reduces it." },
    ],
  },
};
