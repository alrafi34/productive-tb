export const staircaseCalculatorConfig = {
  name: "Staircase Calculator",
  slug: "staircase-calculator",
  category: "architecture",
  description: "Calculate optimal step dimensions for safe, comfortable, and regulation-compliant staircases with instant results.",
  icon: "🪜",
  color: "#058554",
  featured: false,
  keywords: [
    "staircase calculator",
    "stair calculator",
    "riser tread calculator",
    "stair dimensions calculator",
    "step height calculator",
    "construction staircase tool",
    "stair design calculator",
    "building stairs"
  ],
  seo: {
    title: "Stair Calculator – Risers, Treads & Stair Angle",
    description: "Work out the number of steps, riser height, tread depth, total run and stair angle from the floor-to-floor height. In inches, mm or cm, with a comfort check.",
    keywords: "staircase calculator, stair calculator, riser tread calculator, stair dimensions calculator, step height calculator, construction staircase tool",
    og: {
      title: "Staircase Calculator – Free Online Tool",
      description: "Calculate optimal staircase dimensions with instant results for safe and comfortable stairs.",
      type: "website",
      url: "/tools/architecture/staircase-calculator"
    },
    howToSteps: [
      { name: "Choose the unit", text: "Select inches, millimeters or centimeters." },
      { name: "Enter the total rise", text: "Type the height from finished floor to finished floor." },
      { name: "Set the limits", text: "Enter the maximum riser height allowed and the tread depth you want, and optionally the stair width." },
      { name: "Read the design", text: "See the number of risers and treads, the actual riser height, the total run, the angle and whether the 2R + T comfort rule is met." },
    ],
    faq: [
      { q: "How do I calculate the number of stairs?", a: "Divide the total rise by the maximum riser height and round up. For a 108 in (2,743 mm) floor-to-floor height and a 7.75 in maximum riser: 108 ÷ 7.75 = 13.9, so 14 risers of 7.71 in each and 13 treads." },
      { q: "What are the code limits for stairs in the US?", a: "For homes, the IRC (R311.7) allows a riser of up to 7¾ in, a tread of at least 10 in, headroom of 6 ft 8 in and a width of at least 36 in. Commercial stairs under the IBC need risers of 4–7 in and treads of at least 11 in." },
      { q: "What are the limits in the UK and Europe?", a: "In England, Approved Document K allows private stairs a rise of up to 220 mm, a going of at least 220 mm and a pitch of no more than 42°. Other European countries set similar limits in their national building rules." },
      { q: "What is the 2R + T rule?", a: "A comfort check based on stride length: twice the riser plus the tread should be about 600–650 mm (24–25½ in). A 180 mm riser with a 270 mm tread gives 630 mm." },
      { q: "What is a comfortable stair angle?", a: "About 30–37°. Steeper than 42° is uncomfortable for everyday use and not allowed by most codes; below about 20° a ramp is often better." },
    ],
  },
  relatedTools: [
    "floor-area-calculator",
    "room-volume-calculator",
    "wall-area-calculator"
  ]
};
