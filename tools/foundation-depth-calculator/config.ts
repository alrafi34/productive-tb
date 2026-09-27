export const foundationDepthCalculatorConfig = {
  name: "Foundation Depth Calculator",
  slug: "foundation-depth-calculator",
  category: "architecture",
  description: "Find how deep a footing must go (frost line or the 12 in IRC minimum) and how wide it must be for its load, using IRC presumptive soil bearing values or your soils report.",
  icon: "⬇️",
  color: "#058554",
  featured: false,
  keywords: [
    "foundation depth calculator",
    "soil bearing capacity calculator",
    "foundation design tool",
    "civil engineering calculator",
    "footing depth calculation",
    "frost depth calculator",
    "foundation engineering",
    "geotechnical calculator"
  ],
  seo: {
    title: "Foundation Depth Calculator – Frost Line & Footings",
    description: "Free foundation depth calculator: minimum footing depth from frost depth and the IRC 12 in rule, plus footing width from wall or column load and soil bearing.",
    keywords: "foundation depth calculator, soil bearing capacity calculator, foundation design tool, civil engineering calculator, footing depth calculation",
    og: {
      title: "Foundation Depth Calculator – Free Online Tool",
      description: "Calculate required foundation depth with instant results and accurate engineering formulas.",
      type: "website",
      url: "/tools/architecture/foundation-depth-calculator"
    },
    howToSteps: [
      { name: "Choose the units", text: "Select US (in, psf, lb) or metric (mm, kPa, kN)." },
      { name: "Pick the footing type", text: "Choose a wall (strip) footing or a column (pad) footing." },
      { name: "Enter the frost depth", text: "Type your local frost depth from the building department, or 0 where there is no frost." },
      { name: "Add load and soil for sizing", text: "Optionally enter the wall load per length or the column load, and the allowable bearing pressure or a soil type." },
      { name: "Read the results", text: "See the minimum footing depth and, with a load, the required footing width or size." },
    ],
    faq: [
      { q: "How deep should a foundation be?", a: "Below the local frost line and at least 12 in (305 mm) below undisturbed ground, under IRC R403.1.4. Frost depths range from 0 in much of the southern US to 48 in or more in the northern states and Canada; your building department publishes the local figure." },
      { q: "Why must footings go below the frost line?", a: "Water in soil above the frost line freezes and expands, lifting shallow footings (frost heave) and cracking walls. Footings below it rest on soil that does not freeze." },
      { q: "How is footing width calculated?", a: "Width = load per unit length ÷ allowable bearing pressure. A wall carrying 2,000 lb per ft on soil with 1,500 psf capacity needs a footing 1.33 ft (16 in) wide; the IRC also sets minimum widths by the number of stories." },
      { q: "What bearing pressure should I use?", a: "From a soils report if there is one. Otherwise IRC Table R401.4.1 presumes 1,500 psf for clay and silt, 2,000 psf for sand and 3,000 psf for sandy gravel." },
      { q: "What about frost-protected shallow foundations?", a: "In cold climates a shallow footing can be protected with rigid insulation instead of digging below the frost line, following IRC R403.3 and ASCE 32. It needs careful insulation design." },
    ],
  },
  relatedTools: [
    "footing-size-calculator",
    "concrete-volume-calculator",
    "slab-concrete-calculator"
  ]
};
