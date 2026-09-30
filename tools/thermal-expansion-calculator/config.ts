import { siteConfig } from "@/config/site";

export const thermalExpansionCalculatorConfig = {
  name: "Thermal Expansion Calculator",
  slug: "thermal-expansion-calculator",
  description:
    "Calculate linear, area, and volumetric thermal expansion for steel, aluminum, copper, concrete, and more. Supports metric and imperial units with real-time results.",
  category: "mechanical",
  icon: "🌡️",
  free: true,
  seo: {
    title: "Thermal Expansion Calculator – Steel, Aluminum & More",
    description:
      "Calculate how much steel, aluminum, copper, concrete and other materials expand with temperature, with the formula and unit conversion.",
    keywords: [
      "thermal expansion calculator",
      "heat expansion calculator",
      "linear expansion calculator",
      "thermal coefficient calculator",
      "engineering calculator",
      "material expansion calculator",
      "temperature expansion tool",
      "coefficient of thermal expansion",
      "volumetric expansion calculator",
      "area expansion calculator",
      "steel thermal expansion",
      "aluminum thermal expansion",
    ],
    og: {
      title: "Thermal Expansion Calculator – Steel, Aluminum & More",
      description:
        "Calculate how much steel, aluminum, copper, concrete and other materials expand with temperature, with the formula and unit conversion.",
      url: `${siteConfig.url}/tools/mechanical/thermal-expansion-calculator`,
    },
    howToSteps: [
      { name: "Select the expansion type", text: "Select the expansion type: Linear, Area, or Volume" },
      { name: "Choose a material from the searchable dropdown", text: "Choose a material from the searchable dropdown (auto-fills α)" },
      { name: "Or enter a custom coefficient of thermal expansion", text: "Or enter a custom coefficient of thermal expansion" },
      { name: "Enter the initial dimension", text: "Enter the initial dimension (length, area, or volume)" },
      { name: "Select the dimension unit", text: "Select the dimension unit (m, cm, mm, ft, in)" },
      { name: "Enter initial and final temperatures", text: "Enter initial and final temperatures" },
      { name: "Select the temperature unit", text: "Select the temperature unit (°C, °F, or K)" },
      { name: "View instant results with formula breakdown", text: "View instant results with formula breakdown" },
    ],
    faq: [
      { q: "What is the coefficient of thermal expansion?", a: "The coefficient of thermal expansion (α) measures how much a material's dimensions change per unit length (or area/volume) per degree of temperature change. It is expressed in units of per °C (or per K). A higher α means the material expands more for the same temperature change." },
      { q: "What is the difference between linear, area, and volumetric expansion?", a: "Linear expansion (ΔL = α·L₀·ΔT) applies to one-dimensional changes like the length of a rod or pipe. Area expansion (ΔA = 2α·A₀·ΔT) applies to two-dimensional surfaces like plates. Volumetric expansion (ΔV = 3α·V₀·ΔT) applies to three-dimensional objects like tanks or blocks." },
      { q: "Why does the area formula use 2α and volume use 3α?", a: "Because expansion occurs in all dimensions simultaneously. A plate expands in both length and width, so the area coefficient is approximately 2α. A solid expands in length, width, and height, so the volumetric coefficient is approximately 3α. These are first-order approximations valid for small expansions." },
      { q: "Can I enter the coefficient in scientific notation?", a: "Yes. The calculator accepts standard decimal notation (0.000012) and scientific notation (1.2e-5). Both formats are equivalent and will produce the same result." },
      { q: "Why is thermal expansion important in engineering?", a: "Unaccounted thermal expansion can cause structural failure, pipe bursts, rail buckling, and precision errors in machinery. Engineers design expansion joints, flexible couplings, and clearances to safely accommodate dimensional changes across operating temperature ranges." },
    ],
  },
  relatedTools: [
    "heat-transfer-calculator",
    "thermal-stress-calculator",
    "specific-heat-calculator",
    "stress-calculator",
    "young's-modulus-calculator",
    "reynolds-number-calculator",
  ],
};
