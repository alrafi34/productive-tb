import { siteConfig } from "@/config/site";

export const earthingResistanceCalculatorConfig = {
  name: "Earthing Resistance Calculator",
  description: "Calculate grounding resistance based on soil resistivity, electrode configuration, and installation parameters. Ensure electrical safety compliance.",
  icon: "🔌",
  category: "electrical",
  slug: "earthing-resistance-calculator",
  seo: {
    title: "Earthing Resistance Calculator — Free Ground Rod Resistance Tool | Productive Toolbox",
    description: "Calculate earthing resistance from soil resistivity, rod length, and diameter with full step-by-step formulas. Free, browser-based, no signup required.",
    keywords: [
      "earthing resistance calculator",
      "ground resistance calculator",
      "earthing resistance calculator online",
      "soil resistivity calculator",
      "electrical grounding tool",
      "earthing formula calculator",
      "grounding system calculator",
      "earth electrode resistance calculator",
      "ground rod resistance calculator",
      "electrical safety calculator",
      "earthing design calculator",
      "ground resistance formula",
      "soil resistivity measurement tool",
      "grounding electrode calculator",
      "earth pit resistance calculator",
      "electrical earthing calculator",
      "single rod earthing resistance",
      "multiple ground rods calculator",
      "earth rod spacing calculator",
      "free earthing resistance calculator",
      "IEEE 80 earthing calculator",
      "ground fault protection resistance",
    ],
    og: {
      title: "Earthing Resistance Calculator — Free Ground Rod Resistance Tool",
      description: "Calculate earthing resistance from soil resistivity, rod length, and diameter with full step-by-step formulas. Free, browser-based, no signup required.",
      url: `${siteConfig.url}/tools/electrical/earthing-resistance-calculator`
    },
    howToSteps: [
      {
        name: "Enter Soil Resistivity",
        text: "Type the soil resistivity value in ohm-meters, ideally from an on-site four-point Wenner test. Use the built-in soil type reference as an estimate if no measured value is available.",
      },
      {
        name: "Enter Rod Length and Diameter",
        text: "Enter the vertical rod length in meters and its diameter in meters. Rod length has the largest effect on resistance, so prioritize getting this input right.",
      },
      {
        name: "Set the Number of Rods",
        text: "Enter 1 for a single rod calculation, or more than 1 to switch to the multiple-rod formula, which accounts for spacing efficiency between electrodes.",
      },
      {
        name: "Enter Spacing for Multiple Rods",
        text: "If using more than one rod, enter the center-to-center spacing. Spacing at least twice the rod length gives the best efficiency factor and lowest combined resistance.",
      },
      {
        name: "Read the Resistance and Status",
        text: "The calculator returns the resistance in ohms with a status label of excellent, good, acceptable, or poor, along with every calculation step.",
      },
      {
        name: "Apply Recommendations if Resistance Is High",
        text: "If the result is poor, the calculator suggests specific improvements such as longer rods, additional parallel rods, or soil treatment based on your inputs.",
      },
    ],
    faq: [
      {
        q: "What is an earthing resistance calculator?",
        a: "An earthing resistance calculator is a tool that computes the resistance-to-ground of a driven rod electrode using soil resistivity, rod length, and rod diameter, or for multiple rods, the combined resistance adjusted for spacing efficiency. It answers the core question every electrical installer and engineer needs before signing off a grounding system: will this earth electrode meet the target resistance, and how do I get there if it does not.",
      },
      {
        q: "How is single rod earthing resistance calculated?",
        a: "The calculator uses the standard vertical rod formula R equals (rho divided by 2 pi L) times [ln(4L/d) minus 1], where rho is soil resistivity in ohm-meters, L is rod length in meters, and d is rod diameter in meters. The tool computes 4L/d, takes its natural logarithm, subtracts 1, multiplies by rho divided by 2 pi L, and shows every intermediate step.",
      },
      {
        q: "How does the calculator handle multiple rods?",
        a: "For more than one rod, the calculator first computes the single-rod resistance, then divides by the number of rods and again by an efficiency factor between 0.4 and 1.0 that depends on the spacing-to-length ratio. Rods placed closer together interfere with each other's current dissipation field, so the combined resistance is always higher than a simple division by rod count would suggest.",
      },
      {
        q: "What is a good earthing resistance value?",
        a: "Under 1 ohm is excellent and typically reserved for data centers, telecommunications, and sensitive electronic equipment. 1 to 5 ohms is good and meets most residential and commercial code requirements. 5 to 10 ohms is acceptable but worth improving, and above 10 ohms is considered poor and generally requires remediation, though acceptable thresholds vary by local electrical code.",
      },
      {
        q: "What soil resistivity value should I use?",
        a: "Soil resistivity should ideally be measured on-site with a four-point Wenner method tester, since values vary enormously by soil type, from around 10 ohm-meters for wet organic soil to over 10,000 ohm-meters for solid rock. If a site test is not available, use the calculator's built-in soil type reference as a starting estimate, but treat it as approximate.",
      },
      {
        q: "Why does rod length matter more than rod diameter?",
        a: "Because diameter appears only inside the logarithm term ln(4L/d) while length appears both inside the logarithm and as a direct divisor in rho over 2 pi L, doubling rod length has a far larger effect on resistance than doubling diameter. This is why the calculator's improvement recommendations prioritize longer rods over thicker ones when resistance is too high.",
      },
      {
        q: "What does the efficiency factor mean for multiple rods?",
        a: "The efficiency factor represents how much overlap exists between adjacent rods' current dissipation zones in the soil. When rods are spaced at least twice their length apart, the calculator returns an efficiency close to 1.0, meaning the rods work almost independently. Closer spacing drops the efficiency factor toward 0.4, meaning the rods partially compete for the same conductive soil volume.",
      },
      {
        q: "Does this calculator work for plate or strip electrodes?",
        a: "No. This calculator is built specifically for vertical rod electrodes and applies the rod-specific formula. Plate and horizontal strip electrodes use different geometry-dependent formulas based on plate area or strip length and burial depth, and are not covered by this tool.",
      },
      {
        q: "How can I lower a high earthing resistance reading?",
        a: "The calculator's built-in recommendation engine suggests, in order of typical effectiveness: increasing rod length to 3 meters or more, adding parallel rods spaced at least twice the rod length apart, and treating the soil around the electrode with salt, bentonite, or a chemical earthing compound. Rod diameter increases help only marginally due to the logarithmic relationship.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your soil resistivity, rod dimensions, and configuration inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "wire-size-calculator",
    "voltage-drop-calculator",
    "cable-length-calculator",
    "house-wiring-load-calculator",
    "ground-fault-current-calculator",
    "electrical-load-calculator-building"
  ]
};
