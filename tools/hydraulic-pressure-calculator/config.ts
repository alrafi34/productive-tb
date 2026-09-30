import { siteConfig } from "@/config/site";

export const hydraulicPressureCalculatorConfig = {
  name: "Hydraulic Pressure Calculator",
  slug: "hydraulic-pressure-calculator",
  description:
    "Calculate hydraulic pressure, force, piston area, and diameter using Pascal's Law (P = F / A). Supports Pa, kPa, MPa, bar, PSI, Newtons, lbf, and more with real-time unit conversion.",
  category: "mechanical",
  icon: "🔩",
  free: true,
  seo: {
    title: "Hydraulic Pressure Calculator – Pressure, Force & Area",
    description:
      "Calculate hydraulic pressure, force, piston area or diameter, with conversions between psi, bar, Pa and MPa.",
    keywords: [
      "hydraulic pressure calculator",
      "pressure calculator",
      "hydraulic force calculator",
      "pascal law calculator",
      "hydraulic piston calculator",
      "pressure PSI calculator",
      "bar to PSI hydraulic calculator",
      "hydraulic cylinder force calculator",
      "piston area calculator",
      "hydraulic system calculator",
      "P = F/A calculator",
      "fluid power calculator",
    ],
    og: {
      title: "Hydraulic Pressure Calculator – Pressure, Force & Area",
      description:
        "Calculate hydraulic pressure, force, piston area or diameter, with conversions between psi, bar, Pa and MPa.",
      url: `${siteConfig.url}/tools/mechanical/hydraulic-pressure-calculator`,
    },
  },
  relatedTools: [
    "pressure-drop-calculator",
    "flow-rate-calculator",
    "pump-efficiency-calculator",
    "force-calculator",
    "stress-calculator",
    "bernoulli-equation-calculator",
  ],
};
