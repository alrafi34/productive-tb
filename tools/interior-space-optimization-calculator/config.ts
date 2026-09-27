export const interiorSpaceOptimizationCalculatorConfig = {
  name: "Interior Space Optimization Calculator",
  slug: "interior-space-optimization-calculator",
  category: "architecture",
  description: "Optimize your room layout with this free interior space calculator. Plan furniture placement, improve space efficiency, and visualize layouts instantly online.",
  icon: "📐",
  color: "#058554",
  featured: false,
  keywords: [
    "room layout planner",
    "space optimization tool",
    "interior design calculator",
    "furniture layout planner",
    "room efficiency calculator",
    "space planning tool"
  ],
  seo: {
    title: "Room Space Planner – Furniture Fit & Efficiency",
    description: "Check whether your furniture fits a room with enough walking space. Enter the room and furniture sizes and get an efficiency score and suggested layout.",
    keywords: "room layout planner, space optimization tool, interior design calculator, furniture layout planner, room efficiency calculator",
    og: {
      title: "Interior Space Optimization Calculator – Room Layout Planning Tool",
      description: "Calculate and optimize interior space efficiency. Plan furniture placement and visualize room layouts instantly.",
      type: "website",
      url: "/tools/architecture/interior-space-optimization-calculator"
    },
    howToSteps: [
      { name: "Enter the room", text: "Type the room width and length in feet or meters, or pick a room template." },
      { name: "Add the furniture", text: "Add items from the presets or enter a name, width and length for each." },
      { name: "Set the constraints", text: "Choose the minimum walking space and whether items may rotate or must line up with the walls." },
      { name: "Read the results", text: "See which items fit, the space efficiency score, a suggested layout and tips to improve it." },
    ],
    faq: [
      { q: "What is a good space efficiency score?", a: "About 40–60% of the floor covered by furniture is comfortable for homes. Offices and shops often run at 50–70%, depending on how much storage and circulation they need." },
      { q: "How much walking space should I leave?", a: "At least 2 ft (60 cm) in tight spots, about 3 ft (90 cm) for main routes at home, and 36 in (915 mm) along accessible routes, the minimum width in the ADA Standards and similar to Approved Document M in England." },
      { q: "What if my furniture does not fit?", a: "The results list the items that could not be placed. Allow rotation, reduce the walking space slightly, or remove or resize an item and try again." },
      { q: "How does the layout algorithm work?", a: "It places items on a grid one by one, checking the walls and the walking space around each piece so nothing overlaps. It is a starting point; adjust for doors, windows and outlets." },
      { q: "Can I plan an office or shop?", a: "Yes. For workplaces and public spaces, also check local codes for exit widths and accessible routes before finalizing the layout." },
    ],
  },
  relatedTools: [
    "room-area-calculator",
    "floor-area-calculator",
    "furniture-layout-calculator"
  ]
};
