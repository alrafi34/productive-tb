export const beamLoadCalculatorConfig = {
  name: "Beam Load Calculator",
  slug: "beam-load-calculator",
  category: "architecture",
  description: "Calculate beam reactions, shear force, and bending moment for simply supported and cantilever beams. Free online structural analysis tool with diagrams.",
  icon: "📏",
  color: "#058554",
  featured: false,
  keywords: [
    "beam load calculator",
    "shear force diagram",
    "bending moment calculator",
    "structural analysis tool",
    "civil engineering calculator",
    "beam reactions calculator",
    "simply supported beam",
    "cantilever beam calculator"
  ],
  seo: {
    title: "Beam Load Calculator – Reactions, Shear & Moment",
    description: "Find support reactions, maximum shear force and bending moment for simply supported and cantilever beams under a point load or uniform load (UDL).",
    keywords: "beam load calculator, shear force diagram, bending moment calculator, structural analysis tool, civil engineering calculator",
    og: {
      title: "Beam Load Calculator – Free Online Tool",
      description: "Analyze beam reactions, shear force, and bending moment with instant visual diagrams.",
      type: "website",
      url: "/tools/architecture/beam-load-calculator"
    },
    howToSteps: [
      { name: "Choose the beam", text: "Select simply supported or cantilever." },
      { name: "Choose the load", text: "Select a point load or a uniformly distributed load (UDL)." },
      { name: "Enter the span", text: "Type the beam length in meters or feet and, for a point load on a simple beam, its distance from the left support." },
      { name: "Enter the load", text: "Type the load in kN (point) or kN/m (UDL); 1 kN = 224.8 lbf." },
      { name: "Read the results", text: "See the reactions, maximum shear and bending moment with shear and moment diagrams." },
    ],
    faq: [
      { q: "What is the maximum bending moment of a simply supported beam?", a: "Under a uniform load w over span L, M = wL²/8 at midspan; under a central point load P, M = PL/4. A 6 m beam carrying 10 kN/m has M = 10 × 6² ÷ 8 = 45 kN·m and reactions of 30 kN at each end." },
      { q: "How is a cantilever different?", a: "All the load goes to the fixed support. A point load P at the free end gives M = PL and shear P at the support; a uniform load gives M = wL²/2 and shear wL." },
      { q: "What is the difference between a point load and a UDL?", a: "A point load acts at one spot, such as a post bearing on a beam. A UDL is spread evenly along the span, such as a floor, wall or the beam's own weight, and is given per unit length (kN/m or lb/ft)." },
      { q: "How do I convert kN and kN·m to US units?", a: "1 kN = 224.8 lbf = 0.2248 kips, 1 kN/m = 68.5 lb/ft and 1 kN·m = 737.6 lb·ft. So 45 kN·m is about 33.2 kip·ft." },
      { q: "Can I size a beam with these results?", a: "The moment and shear tell you what the beam must resist. Choosing a section also needs the material's allowable stress or design strength and a deflection check, following AISC 360, ACI 318, the NDS for wood or the Eurocodes." },
    ],
  },
  relatedTools: [
    "foundation-depth-calculator",
    "concrete-volume-calculator",
    "steel-quantity-calculator"
  ]
};
