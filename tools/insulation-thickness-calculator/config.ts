export const insulationThicknessCalculatorConfig = {
  name: "Insulation Thickness Calculator",
  slug: "insulation-thickness-calculator",
  category: "architecture",
  description: "Calculate required insulation thickness for pipes, walls, and surfaces using thermal conductivity, U-values, or heat loss. Fast, accurate, and free online tool.",
  icon: "🧱",
  color: "#058554",
  featured: false,
  keywords: [
    "insulation thickness calculator",
    "thermal insulation calculator",
    "U value calculator",
    "heat loss insulation",
    "pipe insulation thickness",
    "wall insulation calculator",
    "thermal conductivity calculator"
  ],
  seo: {
    title: "Insulation Thickness Calculator – Pipes, Walls & U-Value",
    description: "Find the insulation thickness for a pipe or flat surface from a target surface temperature, heat loss limit or U-value. Results in mm and inches.",
    keywords: "insulation thickness calculator, thermal insulation calculator, U value calculator, heat loss insulation, pipe insulation thickness",
    og: {
      title: "Insulation Thickness Calculator – Free Thermal Insulation Tool",
      description: "Calculate insulation thickness instantly with multiple calculation modes and material presets.",
      type: "website",
      url: "/tools/architecture/insulation-thickness-calculator"
    },
    howToSteps: [
      { name: "Choose the method", text: "Pick Surface Temperature, Heat Loss Limit or U-Value (flat surface)." },
      { name: "Pick the insulation", text: "Enter the thermal conductivity (k) or choose a material such as mineral wool, PIR or EPS." },
      { name: "Enter the conditions", text: "Type the ambient and fluid temperatures, the pipe diameter where asked, and the target value." },
      { name: "Read the thickness", text: "See the required thickness in mm or inches, the nearest standard thickness and the heat loss it gives." },
    ],
    faq: [
      { q: "How is insulation thickness calculated from a U-value?", a: "For a flat layer, thickness = k ÷ U. Reaching U = 0.25 W/m²·K with mineral wool (k = 0.038 W/m·K) needs 0.038 ÷ 0.25 = 0.152 m, or 152 mm (6 in). This ignores the other layers of the wall, so a full wall build-up needs slightly less." },
      { q: "What is thermal conductivity (k or λ)?", a: "The rate at which heat passes through 1 m of a material for each degree of temperature difference, in W/m·K. Lower is better: PIR and PUR foam are about 0.022–0.025, mineral wool 0.035–0.040, EPS 0.032–0.038." },
      { q: "How do R-value and U-value relate?", a: "R-value is thermal resistance and U-value is its inverse (U = 1/R) for a whole element. In the US, R-values are quoted in ft²·°F·h/BTU; multiply by 0.176 for metric m²·K/W. R-19 is about R 3.35 metric, or U ≈ 0.30 W/m²·K." },
      { q: "How thick should pipe insulation be?", a: "It depends on the fluid temperature and the goal. For hot water pipes, 25–50 mm (1–2 in) is typical; steam and process pipes often need more to keep the surface below about 50–60 °C for burn protection. Codes such as ASHRAE 90.1 and the UK Domestic Building Services Compliance Guide set minimums." },
      { q: "Why does a pipe need less insulation than a flat wall for the same effect?", a: "Heat flows outward through an ever larger circumference, so each extra millimetre of insulation on a pipe covers more area. The calculator uses the logarithmic (cylindrical) formula for pipes and the flat-layer formula otherwise." },
    ],
  },
  relatedTools: [
    "heat-loss-calculator-building",
    "hvac-load-calculator",
    "cooling-load-calculator-architecture"
  ]
};