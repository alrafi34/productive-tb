import { siteConfig } from "@/config/site";

export const toolConfig = {
  name: "Pump Efficiency Calculator",
  description:
    "Calculate pump efficiency from flow rate, head, and input power. Supports metric and imperial units with instant hydraulic power analysis.",
  icon: "💧",
  category: "mechanical",
  slug: "pump-efficiency-calculator",
  seo: {
    title:
      "Pump Efficiency Calculator – Hydraulic Power & Efficiency",
    description:
      "Calculate hydraulic power and pump efficiency from flow rate, head, input power and fluid density, in metric or imperial units.",
    keywords: [
      "pump efficiency calculator",
      "pump performance calculator",
      "hydraulic power calculator",
      "pump power formula",
      "industrial pump efficiency",
      "centrifugal pump calculator",
      "pump engineering calculator",
      "pump efficiency formula",
      "calculate pump efficiency",
      "pump head calculator",
      "water pump efficiency",
      "pump flow rate calculator",
      "pump efficiency percentage",
      "hydraulic efficiency calculator",
      "pump system calculator",
    ],
    og: {
      title:
        "Pump Efficiency Calculator – Hydraulic Power & Efficiency",
      description:
        "Calculate hydraulic power and pump efficiency from flow rate, head, input power and fluid density, in metric or imperial units.",
      url: `${siteConfig.url}/tools/mechanical/pump-efficiency-calculator`,
    },
    howToSteps: [
      { name: "Choose the unit system", text: "Pick metric (m³/h, meters, kW) or imperial (GPM, feet, horsepower)." },
      { name: "Enter flow rate and head", text: "Type the pump's flow rate, choose its unit, and enter the total head it delivers." },
      { name: "Enter the input power", text: "Type the shaft or motor input power the pump draws at that duty point." },
      { name: "Set the fluid density", text: "Use a preset such as water at 20°C (998 kg/m³) or sea water (1,025 kg/m³), or type your own." },
      { name: "Read the efficiency", text: "See the hydraulic power and pump efficiency; efficiency = hydraulic power ÷ input power." },
    ],
    faq: [
      { q: "What is a good pump efficiency?", a: "For centrifugal pumps, 70–85% is considered good efficiency. Large, well-designed pumps can reach 88–92%. Small pumps (below 5 kW) typically achieve 50–70%. Efficiency above 80% is excellent for most industrial applications." },
      { q: "How do I improve pump efficiency?", a: "Operate the pump near its Best Efficiency Point (BEP), trim or replace worn impellers, reduce unnecessary pipe fittings and bends, use variable speed drives (VFDs) to match flow demand, and ensure proper alignment and lubrication." },
      { q: "What is the difference between pump efficiency and motor efficiency?", a: "Pump efficiency measures how well the pump converts shaft power to hydraulic power. Motor efficiency measures how well the motor converts electrical power to shaft power. Overall system efficiency = pump efficiency × motor efficiency." },
      { q: "Why does pump efficiency matter for energy costs?", a: "A pump running at 60% efficiency instead of 80% consumes 33% more energy for the same output. For a 50 kW pump running 8,000 hours/year at $0.12/kWh, that difference costs over $8,000 annually." },
      { q: "What units does this calculator support?", a: "The calculator supports both metric (m³/s, m³/h, L/s, L/min, meters, kW) and imperial (GPM, ft³/s, feet, horsepower) unit systems. All conversions are handled automatically." },
    ],
  },
};
