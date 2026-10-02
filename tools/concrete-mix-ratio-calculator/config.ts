export const concreteMixRatioCalculatorConfig = {
  name: "Concrete Mix Ratio Calculator",
  slug: "concrete-mix-ratio-calculator",
  description: "Calculate exact proportions of cement, sand, and aggregate required for concrete. Get instant results with accurate construction formulas.",
  category: "architecture",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Concrete Mix Ratio Calculator – Cement, Sand & Gravel",
    description: "Work out cement bags, sand and gravel for any concrete mix ratio such as 1:2:4 or 1:1.5:3. Volumes in cubic meters or cubic feet; bag size is your choice.",
    keywords: [
      "concrete mix calculator",
      "cement sand aggregate ratio",
      "concrete calculation tool",
      "mix ratio calculator",
      "construction calculator",
      "concrete proportions calculator",
      "cement calculator",
      "building materials calculator",
      "concrete volume calculator",
      "construction material estimator"
    ],
    openGraph: {
      title: "Concrete Mix Ratio Calculator – Cement, Sand & Gravel",
      description: "Work out cement bags, sand and gravel for any concrete mix ratio such as 1:2:4 or 1:1.5:3. Volumes in cubic meters or cubic feet; bag size is your choice.",
      type: "website",
      url: "/tools/architecture/concrete-mix-ratio-calculator"
    },
    howToSteps: [
      { name: "Enter the volume", text: "Type the volume in cubic meters, cubic feet or cubic yards, or fill in the slab length, width and thickness and the volume is worked out for you. A 10 ft × 10 ft × 4 in slab is 33.3 ft³, or 1.23 yd³." },
      { name: "Set the mix ratio", text: "Enter cement : sand : gravel, for example 1:2:4, or pick a preset." },
      { name: "Check the dry volume factor", text: "1.54 is the usual allowance for the voids that disappear when dry materials are mixed with water." },
      { name: "Choose the bag size", text: "Select the cement bag size sold where you buy, then read the number of bags and the sand and gravel volumes; the result also shows how many 40, 60 or 80 lb premix bags the same volume needs." },
    ],
    faq: [
      { q: "What does a 1:2:4 concrete mix mean?", a: "One part cement, two parts sand and four parts gravel (coarse aggregate) by volume. It is a general-purpose mix for footings, slabs and paths, giving about 15 MPa (roughly 2,200 psi) when well made." },
      { q: "Why multiply the volume by 1.54?", a: "Dry cement, sand and gravel have air gaps between the particles. Once water is added they settle into a smaller volume, so about 1.54 m³ of dry material makes 1 m³ of concrete. The factor already includes a small allowance for waste." },
      { q: "How many bags of cement are in a cubic meter of 1:2:4 concrete?", a: "About 317 kg of cement (1.54 ÷ 7 × 1,440 kg/m³): 6.3 bags of 50 kg, 12.7 bags of 25 kg or 7.4 US bags of 94 lb. A cubic yard needs about 5.7 US bags." },
      { q: "Which mix should I use?", a: "1:3:6 for blinding and mass fill, 1:2:4 for general slabs and footings, and 1:1.5:3 for reinforced beams, columns and suspended slabs. Structural concrete in the US (ACI 318) and Europe (EN 206) is specified by strength class, so follow the engineer's specification where there is one." },
      { q: "Can I use this for ready-mix or bagged premix?", a: "Ready-mix is ordered by volume (usually cubic yards in the US, cubic meters elsewhere) and strength from the supplier, so you only need the volume. For bagged premix, the result shows how many 40, 60 and 80 lb bags you need, using typical yields of 0.30, 0.45 and 0.60 ft³ per bag; check the yield printed on your bag." },
      { q: "How many cubic yards of concrete do I need for a slab?", a: "Multiply length × width in feet by the thickness in inches ÷ 12 to get cubic feet, then divide by 27. A 20 × 12 ft slab 4 in thick is 80 ft³, or 2.96 yd³; most suppliers suggest ordering about 10% extra." },
    ],
  },
  features: [
    "Real-time calculations",
    "Mix ratio presets from 1:5:10 to 1:0.75:1.5",
    "Unit conversion (ft³ ↔ m³)",
    "Adjustable dry volume factor",
    "Cement bag sizes: 94 lb, 25 kg, 40 kg, 50 kg",
    "Calculation history",
    "Export functionality",
    "Mobile responsive"
  ]
};
