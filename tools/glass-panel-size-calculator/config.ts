export const glassPanelSizeCalculatorConfig = {
  name: "Glass Panel Size Calculator",
  slug: "glass-panel-size-calculator",
  category: "architecture",
  description: "Calculate glass panel dimensions instantly for windows, doors, and partitions. Get precise width and height with clearance and multi-panel support.",
  icon: "🪟",
  color: "#058554",
  featured: false,
  keywords: [
    "glass size calculator",
    "glass panel calculator",
    "window glass measurement",
    "glass cutting size",
    "panel size calculator",
    "glass dimension calculator",
    "window glass calculator"
  ],
  seo: {
    title: "Glass Panel Size Calculator – Cut Size & Clearance",
    description: "Work out the glass size to order for a window, door or partition: opening size minus clearances, split into equal panels. Results in mm, cm or inches.",
    keywords: "glass size calculator, glass panel calculator, window glass measurement, glass cutting size, panel size calculator",
    og: {
      title: "Glass Panel Size Calculator – Precise Glass Dimensions",
      description: "Calculate accurate glass panel dimensions for windows, doors, and partitions with clearance and multi-panel support.",
      type: "website",
      url: "/tools/architecture/glass-panel-size-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select millimeters, centimeters or inches." },
      { name: "Enter the opening", text: "Type the width and height of the opening." },
      { name: "Set the clearances", text: "Enter the gap at each edge, or pick a frame type (frameless, aluminum, sliding) to fill typical values." },
      { name: "Split into panels", text: "Enter the number of panels and the gap between them." },
      { name: "Read the sizes", text: "See the width and height of each pane and the total glass area." },
    ],
    faq: [
      { q: "How much clearance should glass have in a frame?", a: "Typical edge clearances are 5–6 mm (about 1/4 in) in aluminum frames, 2–3 mm for frameless glass and 8–10 mm for sliding systems. Always follow the frame maker's details and the glazing standard (GANA in the US, BS 6262 in the UK)." },
      { q: "Can tempered glass be cut after it is made?", a: "No. Tempered (toughened) glass cannot be cut, drilled or edged after tempering; it will shatter. All sizes, holes and notches must be final before ordering." },
      { q: "What if the opening is not square?", a: "Measure the width at the top, middle and bottom and the height at both sides and the middle, and use the smallest of each. Check the diagonals too: if they differ by more than a few millimetres, square the frame first." },
      { q: "How are multiple panels sized?", a: "Width per panel = (opening width − left and right clearance − gaps between panels) ÷ number of panels. For a 2,000 mm opening with 5 mm each side, two panels and a 10 mm gap, each pane is 990 mm wide." },
      { q: "Which unit should I order in?", a: "Most glass fabricators work in millimetres, even in the US for architectural glass. Quote sizes as width × height and confirm the unit with your supplier." },
    ],
  },
  relatedTools: [
    "window-area-calculator",
    "door-area-calculator",
    "facade-area-calculator"
  ]
};
