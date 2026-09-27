export const rebarSpacingCalculatorConfig = {
  name: "Rebar Spacing Calculator",
  slug: "rebar-spacing-calculator",
  category: "architecture",
  description: "Calculate rebar spacing or the number of bars for a slab, wall or beam — in inches or mm, with #3–#8 bar sizes and ACI 318 minimum and maximum spacing checks.",
  icon: "📏",
  color: "#058554",
  featured: false,
  keywords: [
    "rebar spacing calculator",
    "reinforcement bar spacing",
    "civil engineering calculator",
    "bar spacing formula",
    "construction calculator",
    "rebar distribution",
    "structural spacing",
    "bar count calculator"
  ],
  seo: {
    title: "Rebar Spacing Calculator – Bar Spacing & Count",
    description: "Free rebar spacing calculator in inches or mm. Find bar spacing or bar count, pick #3–#8 bars, and check clear spacing against ACI 318 limits.",
    keywords: "rebar spacing calculator, reinforcement bar spacing, civil engineering calculator, bar spacing formula, construction calculator",
    og: {
      title: "Rebar Spacing Calculator – Free Online Tool",
      description: "Calculate reinforcement bar spacing with instant results and accurate formulas.",
      type: "website",
      url: "/tools/architecture/rebar-spacing-calculator"
    },
    howToSteps: [
      { name: "Pick a unit", text: "Choose inches or millimeters; values already typed are converted." },
      { name: "Select a mode", text: "Calculate Spacing from a bar count, or Calculate Number of Bars from a maximum spacing." },
      { name: "Enter the element", text: "Type the width of the slab, wall or beam and the clear cover on each side." },
      { name: "Choose the bar", text: "Tap #3–#8 (or a metric size) or type a diameter, and optionally the maximum aggregate size." },
      { name: "Read the result", text: "See the center-to-center and clear spacing, with any ACI 318 warning." },
    ],
    faq: [
      { q: "How do you calculate rebar spacing?", a: "Spacing = (width − 2 × cover − bar diameter) ÷ (number of bars − 1), center to center. For a 36 in wide footing with 3 in cover and five #5 bars (0.625 in): (36 − 6 − 0.625) ÷ 4 = 7.34 in." },
      { q: "What is the minimum clear spacing between bars?", a: "ACI 318 (25.2.1) requires the larger of 1 in, one bar diameter, and 4/3 of the maximum aggregate size. With ¾ in aggregate that is 1 in for bars up to #8." },
      { q: "What is the maximum rebar spacing in a slab?", a: "ACI 318 limits main flexural reinforcement in slabs to the smaller of 3 × slab thickness and 18 in, and shrinkage and temperature steel to the smaller of 5 × thickness and 18 in." },
      { q: "What sizes are #3 to #8 bars?", a: "US bar numbers are the diameter in eighths of an inch: #3 = 0.375 in (10 mm), #4 = 0.5 in (13 mm), #5 = 0.625 in (16 mm), #6 = 0.75 in (19 mm), #8 = 1.0 in (25 mm)." },
      { q: "How much concrete cover do I need?", a: "ACI 318 gives 3 in for concrete cast against earth, 1½–2 in for concrete exposed to weather, and ¾ in for slabs not exposed to weather. Eurocode 2 sets cover by exposure class, typically 25–50 mm." },
    ],
  },
  relatedTools: [
    "rebar-weight-calculator",
    "concrete-volume-calculator",
    "steel-quantity-calculator"
  ]
};
