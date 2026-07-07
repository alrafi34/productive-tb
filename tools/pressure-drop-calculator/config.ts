import { siteConfig } from "@/config/site";

export const pressureDropCalculatorConfig = {
  name: "Pressure Drop Calculator",
  slug: "pressure-drop-calculator",
  description:
    "Calculate pressure loss in pipes using the Darcy–Weisbach equation. Supports water, air, oil, and custom fluids with metric and imperial units.",
  category: "mechanical",
  icon: "🔧",
  free: true,
  seo: {
    title: "Pressure Drop Calculator – Pipe Pressure Loss Calculator Online",
    description:
      "Calculate pressure drop in pipes instantly using pipe length, diameter, flow rate, fluid type, and material. Free online pressure loss calculator for HVAC, plumbing, and engineering.",
    keywords: [
      "pressure drop calculator",
      "pipe pressure loss calculator",
      "darcy weisbach calculator",
      "fluid pressure drop",
      "pipe flow calculator",
      "engineering calculator",
      "HVAC pressure loss calculator",
      "pressure loss in pipes",
      "pipe friction loss",
      "hydraulic pressure drop",
      "flow resistance calculator",
      "mechanical engineering calculator",
      "pipe sizing calculator",
      "reynolds number pipe flow",
      "friction factor calculator",
    ],
    og: {
      title: "Pressure Drop Calculator – Pipe Pressure Loss Calculator Online",
      description:
        "Calculate pressure drop in pipes instantly using pipe length, diameter, flow rate, fluid type, and material. Free online pressure loss calculator for HVAC, plumbing, and engineering.",
      url: `${siteConfig.url}/tools/mechanical/pressure-drop-calculator`,
    },
  },
  relatedTools: [
    "reynolds-number-calculator",
    "flow-rate-calculator",
    "pipe-velocity-calculator",
    "bernoulli-equation-calculator",
    "hydraulic-pressure-calculator",
    "viscosity-calculator",
  ],
};
