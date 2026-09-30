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
    howToSteps: [
      { name: "Enter the fluid velocity", text: "Enter the fluid velocity (e.g. 2 m/s)" },
      { name: "Select the velocity unit", text: "Select the velocity unit — m/s, ft/s, or cm/s" },
      { name: "Enter the pipe diameter or characteristic length", text: "Enter the pipe diameter or characteristic length" },
      { name: "Select the diameter unit", text: "Select the diameter unit — m, cm, mm, in, or ft" },
      { name: "Enter the fluid density", text: "Enter the fluid density (e.g. 998 for water)" },
      { name: "Enter the dynamic viscosity", text: "Enter the dynamic viscosity (e.g. 1.002 cP for water)" },
      { name: "View the Reynolds Number and flow regime instantly", text: "View the Reynolds Number and flow regime instantly" },
    ],
    faq: [
      { q: "What is the Reynolds Number formula?", a: "Re = (ρ × V × D) / μ, where ρ is fluid density (kg/m³), V is velocity (m/s), D is the characteristic length or pipe diameter (m), and μ is dynamic viscosity (Pa·s)." },
      { q: "What Reynolds Number indicates turbulent flow?", a: "For pipe flow, Re > 4,000 indicates turbulent flow. Between 2,300 and 4,000 is transitional, and below 2,300 is laminar. These thresholds may differ for external flows." },
      { q: "What is the difference between dynamic and kinematic viscosity?", a: "Dynamic viscosity (μ) measures a fluid's resistance to flow in Pa·s or cP. Kinematic viscosity (ν) is dynamic viscosity divided by density (ν = μ/ρ) in m²/s. This calculator uses dynamic viscosity." },
      { q: "Why is Reynolds Number dimensionless?", a: "Because the units of ρ (kg/m³), V (m/s), D (m), and μ (kg/m·s) cancel out completely: (kg/m³ × m/s × m) / (kg/m·s) = 1. This makes Re universally applicable regardless of unit system." },
      { q: "Can I use this calculator for non-circular pipes?", a: "Yes. For non-circular cross-sections, use the hydraulic diameter (D_h = 4A/P, where A is cross-sectional area and P is wetted perimeter) as the characteristic length input." },
    ],
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
