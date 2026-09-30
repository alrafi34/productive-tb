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
    howToSteps: [
      { name: "Select a calculation mode", text: "Select a calculation mode — Pressure, Force, Area, or Diameter" },
      { name: "Enter the known values", text: "Enter the known values (force, area, or pressure)" },
      { name: "Select the appropriate units for each input", text: "Select the appropriate units for each input" },
      { name: "View the result instantly in all common engineering units", text: "View the result instantly in all common engineering units" },
      { name: "Use Quick Presets for common hydraulic scenarios", text: "Use Quick Presets for common hydraulic scenarios" },
      { name: "Copy, save, or export the result as needed", text: "Copy, save, or export the result as needed" },
    ],
    faq: [
      { q: "What is Pascal's Law?", a: "Pascal's Law states that pressure applied to a confined, incompressible fluid is transmitted equally in all directions. Mathematically: P = F / A. This principle is the foundation of all hydraulic systems, from car brakes to industrial presses." },
      { q: "What is the difference between bar and PSI?", a: "Both are units of pressure. 1 bar = 14.504 PSI. Bar is the metric standard used in Europe and most industrial applications. PSI (pounds per square inch) is the US customary unit. This calculator converts between all pressure units automatically." },
      { q: "How do I calculate piston diameter from force and pressure?", a: "First calculate the required area: A = F / P. Then derive the diameter using d = √(4A / π). For example, to achieve 10,000 N at 100 bar (10 MPa): A = 10,000 / 10,000,000 = 0.001 m² = 10 cm², giving d = √(4 × 0.001 / π) ≈ 35.7 mm." },
      { q: "What pressure units does this calculator support?", a: "Pascal (Pa), Kilopascal (kPa), Megapascal (MPa), bar, and PSI. All inputs are converted to Pascals internally before calculation. Results are shown in all five units simultaneously." },
      { q: "Is this calculator accurate for engineering design?", a: "Yes. The calculator uses exact conversion factors and IEEE 754 double-precision arithmetic. For safety-critical hydraulic system design, always verify calculations with a licensed mechanical or hydraulic engineer and account for system losses, safety factors, and dynamic loads." },
    ],
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
