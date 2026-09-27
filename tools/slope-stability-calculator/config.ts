export const slopeStabilityCalculatorConfig = {
  name: "Slope Stability Calculator",
  slug: "slope-stability-calculator",
  category: "architecture",
  description: "Analyze slope stability instantly with this free online calculator. Calculate Factor of Safety (FoS) using soil properties, slope angle, and water conditions. Fast, accurate, and browser-based.",
  icon: "⛰️",
  color: "#058554",
  featured: false,
  keywords: [
    "slope stability calculator",
    "factor of safety calculator",
    "geotechnical slope analysis",
    "soil stability tool",
    "civil engineering calculator",
    "slope failure analysis",
    "FoS calculator"
  ],
  seo: {
    title: "Slope Stability Calculator – Factor of Safety",
    description: "Estimate a slope's factor of safety from its angle and height, soil cohesion, friction angle, unit weight and pore water pressure. Metric or imperial.",
    keywords: "slope stability calculator, factor of safety calculator, geotechnical slope analysis, soil stability tool, civil engineering calculator",
    og: {
      title: "Slope Stability Calculator – Free Geotechnical Analysis Tool",
      description: "Calculate Factor of Safety for slopes instantly. Analyze stability with soil properties and water conditions.",
      type: "website",
      url: "/tools/architecture/slope-stability-calculator"
    },
    howToSteps: [
      { name: "Choose the units", text: "Select metric (m, kPa, kN/m³) or imperial (ft, psf, pcf)." },
      { name: "Enter the slope", text: "Type the slope angle in degrees and the slope height." },
      { name: "Enter the soil", text: "Type the cohesion, friction angle and unit weight, or pick a soil preset." },
      { name: "Set the water condition", text: "Enter the pore pressure ratio ru, from 0 for dry to about 0.5 for a saturated slope." },
      { name: "Read the result", text: "See the factor of safety, whether the slope is stable, marginal or unstable, and notes." },
    ],
    faq: [
      { q: "How does the calculator work out the factor of safety?", a: "It uses the infinite slope method with the slip surface at half the slope height: FoS = [c′ + γ z cos²β tan φ′ (1 − ru)] ÷ (γ z sin β cos β). It suits long, shallow slides; for rotational failures in cuts and embankments, engineers use Bishop's or Spencer's method." },
      { q: "What factor of safety is acceptable?", a: "Around 1.5 for permanent slopes under long-term conditions and 1.3 for temporary works is common practice (for example US Army Corps of Engineers EM 1110-2-1902). The calculator rates 1.3 and above as stable, 1.0–1.3 as marginal and below 1.0 as unstable." },
      { q: "How does water affect a slope?", a: "Pore water pressure pushes soil grains apart and cuts the friction that holds the slope. Going from dry (ru = 0) to ru = 0.5 can almost halve the frictional strength, which is why many slides happen after heavy rain." },
      { q: "What slope angles are safe?", a: "It depends on the soil. Dry clean sand stands at up to its friction angle, about 30–35°; clays are often limited to 1V:2H to 1V:3H (18–27°) in the long term. OSHA's excavation rules require 1½H:1V (34°) for Type C soil in trenches." },
      { q: "Can I use this for final design?", a: "No. It is a first check. Real slopes need a site investigation, laboratory strength tests and analysis by a geotechnical engineer, especially where people or structures are at risk." },
    ],
  },
  relatedTools: [
    "soil-bearing-capacity-calculator",
    "retaining-wall-calculator",
    "foundation-depth-calculator"
  ]
};
