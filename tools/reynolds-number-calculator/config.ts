import { siteConfig } from "@/config/site";

export const reynoldsNumberCalculatorConfig = {
  name: "Reynolds Number Calculator",
  slug: "reynolds-number-calculator",
  description:
    "Calculate Reynolds Number instantly to determine fluid flow regime — laminar, transitional, or turbulent. Supports metric and imperial units with real-time results.",
  category: "mechanical",
  icon: "💧",
  free: true,
  seo: {
    title: "Reynolds Number Calculator – Laminar or Turbulent Flow",
    description:
      "Calculate the Reynolds number from velocity, density, viscosity and diameter, and see whether flow is laminar, transitional or turbulent.",
    keywords: [
      "reynolds number calculator",
      "fluid flow calculator",
      "laminar turbulent calculator",
      "flow regime calculator",
      "pipe flow reynolds number",
      "fluid mechanics calculator",
      "mechanical engineering calculator",
      "reynolds number formula",
      "viscosity calculator",
      "pipe flow analysis",
      "HVAC reynolds number",
      "dimensionless number calculator",
    ],
    og: {
      title: "Reynolds Number Calculator – Laminar or Turbulent Flow",
      description:
        "Calculate the Reynolds number from velocity, density, viscosity and diameter, and see whether flow is laminar, transitional or turbulent.",
      url: `${siteConfig.url}/tools/mechanical/reynolds-number-calculator`,
    },
  },
  relatedTools: [
    "flow-rate-calculator",
    "pressure-drop-calculator",
    "bernoulli-equation-calculator",
    "pipe-velocity-calculator",
    "viscosity-calculator",
    "drag-force-calculator",
  ],
};
