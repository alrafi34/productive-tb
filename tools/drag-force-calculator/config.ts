import { siteConfig } from "@/config/site";

export const dragForceCalculatorConfig = {
  name: "Drag Force Calculator",
  slug: "drag-force-calculator",
  description: "Calculate drag force instantly using velocity, drag coefficient, fluid density, and frontal area (F = ½ρv²CdA). Supports air and water with unit conversion.",
  category: "mechanical",
  icon: "💨",
  free: true,
  seo: {
    title: "Drag Force Calculator – Air & Fluid Resistance",
    description: "Calculate drag force from velocity, drag coefficient, fluid density and frontal area, for physics, engineering and aerodynamics.",
    keywords: [
      "drag force calculator",
      "air resistance calculator",
      "drag equation calculator",
      "fluid resistance calculator",
      "aerodynamic drag calculator",
      "mechanical engineering calculator",
      "physics drag calculator",
      "drag coefficient calculator",
      "aerodynamics calculator",
      "hydrodynamic drag calculator",
      "F = 0.5 rho v squared Cd A",
      "drag force formula online",
    ],
    og: {
      title: "Drag Force Calculator – Air & Fluid Resistance",
      description: "Calculate drag force from velocity, drag coefficient, fluid density and frontal area, for physics, engineering and aerodynamics.",
      url: `${siteConfig.url}/tools/mechanical/drag-force-calculator`,
    },
  },
  relatedTools: [
    "friction-force-calculator",
    "force-calculator",
    "reynolds-number-calculator",
    "bernoulli-equation-calculator",
    "flow-rate-calculator",
    "pressure-drop-calculator",
  ],
};
