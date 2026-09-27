export const footingSizeCalculatorConfig = {
  name: "Footing Size Calculator",
  slug: "footing-size-calculator",
  category: "architecture",
  description: "Calculate required footing dimensions based on load and soil bearing capacity. Free online footing size calculator for structural engineers.",
  icon: "📐",
  color: "#058554",
  featured: false,
  keywords: [
    "footing size calculator",
    "foundation calculator",
    "soil bearing capacity calculator",
    "structural footing design",
    "civil engineering calculator",
    "footing dimensions",
    "foundation design tool",
    "footing area calculator"
  ],
  seo: {
    title: "Footing Size Calculator – Spread Footing Dimensions",
    description: "Size a square or rectangular spread footing from the column load and soil bearing capacity, in kN and kPa or pounds and psf, with a factor of safety.",
    keywords: "footing size calculator, foundation calculator, soil bearing capacity calculator, structural footing design, civil engineering calculator",
    og: {
      title: "Footing Size Calculator – Free Online Tool",
      description: "Calculate required footing dimensions with instant results and accurate engineering formulas.",
      type: "website",
      url: "/tools/architecture/footing-size-calculator"
    },
    howToSteps: [
      { name: "Choose the units", text: "Select metric (kN, kN/m², m) or imperial (lb, psf, ft)." },
      { name: "Choose the footing shape", text: "Pick square, or rectangular with a length-to-width ratio." },
      { name: "Enter the load and soil capacity", text: "Type the total load on the footing and the soil bearing capacity." },
      { name: "Set the factor of safety", text: "Use 1.0 with an allowable bearing pressure from a soils report, or 2.5–3.0 with an ultimate capacity." },
      { name: "Read the size", text: "See the required area and the footing length and width, with warnings for very small or large footings." },
    ],
    faq: [
      { q: "How is footing size calculated?", a: "Required area = load × factor of safety ÷ bearing capacity, and for a square footing the side is the square root of the area. A 400 kN column load on soil with an allowable bearing pressure of 150 kN/m² needs 2.67 m², so a 1.63 m (5 ft 4 in) square footing." },
      { q: "What factor of safety should I use?", a: "It depends on the bearing value you enter. An allowable (safe) bearing pressure from a geotechnical report already includes a factor of safety of about 3, so use 1.0. An ultimate bearing capacity needs a factor of 2.5–3.0." },
      { q: "What are typical allowable bearing pressures?", a: "Where there is no soils report, IBC Table 1806.2 presumes 1,500 psf (72 kPa) for clay and silt, 2,000 psf (96 kPa) for sand and silty or clayey sand, 3,000 psf (144 kPa) for gravel and sandy gravel, and 12,000 psf (575 kPa) for crystalline bedrock." },
      { q: "Should the footing's own weight be included?", a: "Yes. Add the weight of the footing and the soil above it to the column load, or deduct it from the bearing pressure. A 0.5 m (20 in) thick concrete footing adds about 12 kN/m² (250 psf)." },
      { q: "Does this design the reinforcement and thickness?", a: "No. It sizes the footing in plan only. Thickness, punching shear and reinforcement must be designed to ACI 318 or Eurocode 2, and frost depth and settlement must be checked." },
    ],
  },
  relatedTools: [
    "foundation-depth-calculator",
    "concrete-volume-calculator",
    "slab-concrete-calculator"
  ]
};
