export const roofPitchCalculatorConfig = {
  name: "Roof Pitch Calculator",
  slug: "roof-pitch-calculator",
  category: "architecture",
  description: "Calculate roof slope, angle, and pitch ratio using rise and run. Free online tool with instant results for architects and builders.",
  icon: "📐",
  color: "#058554",
  featured: false,
  keywords: [
    "roof pitch calculator",
    "roof slope calculator",
    "pitch angle calculator",
    "rise run calculator",
    "roof angle tool",
    "roofing pitch",
    "slope calculator",
    "roof gradient"
  ],
  seo: {
    title: "Roof Pitch Calculator – Rise/Run, Angle & Slope %",
    description: "Convert between roof pitch (x/12), angle in degrees and slope percentage from rise and run, a pitch ratio or an angle, with a diagram. Inches, feet or meters.",
    keywords: "roof pitch calculator, roof slope calculator, pitch angle calculator, rise run calculator, roof angle tool",
    og: {
      title: "Roof Pitch Calculator – Free Online Tool",
      description: "Calculate roof pitch, slope, and angle with instant results and visual diagrams.",
      type: "website",
      url: "/tools/architecture/roof-pitch-calculator"
    },
    howToSteps: [
      { name: "Choose the input", text: "Pick rise and run, pitch ratio or angle." },
      { name: "Choose the unit", text: "Select inches, feet or meters for rise and run." },
      { name: "Enter the values", text: "Type the rise and run, the pitch such as 6 in 12, or the angle." },
      { name: "Read the pitch", text: "See the pitch as x/12, the angle, the slope percentage and a diagram, or pick a common pitch." },
    ],
    faq: [
      { q: "What does a 6/12 roof pitch mean?", a: "The roof rises 6 inches for every 12 inches of horizontal run. That is an angle of 26.6° and a slope of 50%." },
      { q: "How do I convert pitch to an angle?", a: "Angle = arctan(rise ÷ run). For 6/12, arctan(0.5) = 26.57°. Going back, rise per 12 = 12 × tan(angle)." },
      { q: "What is the minimum pitch for shingles?", a: "Asphalt shingles need at least 2/12, with a double underlayment between 2/12 and 4/12 (IRC R905.2.2). Below 2/12, use a low-slope membrane such as EPDM, TPO or modified bitumen." },
      { q: "What is a common roof pitch?", a: "4/12 to 9/12 on most US houses. In the UK and Europe, pitches are given in degrees; 30–45° is common for tiled roofs, and plain clay tiles need at least 35°." },
      { q: "How do I measure pitch on an existing roof?", a: "Hold a level horizontally against the rafter or roof surface, measure 12 in along it and measure straight down (or up) to the roof: that distance is the rise. Or measure the angle with a phone inclinometer and convert it here." },
    ],
  },
  relatedTools: [
    "roof-area-calculator",
    "floor-area-calculator",
    "wall-area-calculator"
  ]
};
