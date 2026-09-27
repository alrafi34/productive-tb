export const emergencyExitWidthCalculatorConfig = {
  name: "Emergency Exit Width Calculator",
  slug: "emergency-exit-width-calculator",
  category: "architecture",
  description: "Calculate required emergency exit width based on occupant load and safety standards. Fast, accurate, and free online evacuation calculator for architects and engineers.",
  icon: "🚪",
  color: "#058554",
  featured: false,
  keywords: [
    "emergency exit calculator",
    "exit width calculator",
    "evacuation calculation tool",
    "building safety calculator",
    "occupant load exit width",
    "egress width calculator",
    "fire exit calculator"
  ],
  seo: {
    title: "Exit Width Calculator – Egress Capacity (IBC)",
    description: "Work out the required exit width from occupant load with the IBC egress factors: 0.3 in per person for stairs, 0.2 in for doors, 0.15 in if sprinklered.",
    keywords: "emergency exit calculator, exit width calculator, evacuation calculation tool, building safety calculator, occupant load exit width",
    og: {
      title: "Emergency Exit Width Calculator – Building Safety Tool",
      description: "Calculate minimum required exit width for safe evacuation based on occupancy load and building codes.",
      type: "website",
      url: "/tools/architecture/emergency-exit-width-calculator"
    },
    howToSteps: [
      { name: "Enter the occupant load", text: "Type the number of people the space is designed for, or pick an occupancy preset." },
      { name: "Choose the width factor", text: "0.3 in per person for stairways, 0.2 in for doors, corridors and ramps, or 0.15 in for doors in a sprinklered building with a voice alarm." },
      { name: "Enter the number of exits", text: "Type how many exits share the load." },
      { name: "Read the widths", text: "See the total required width, the width per exit and notes on code minimums." },
    ],
    faq: [
      { q: "How is required exit width calculated?", a: "Required width = occupant load × width factor. Under IBC 1005.3, 200 people need 200 × 0.2 = 40 in of door width, or 200 × 0.3 = 60 in of stair width. The larger of this and the code minimum widths applies." },
      { q: "Why do stairs need more width per person than doors?", a: "People move more slowly down stairs than across a floor, so IBC 1005.3.1 uses 0.3 in per occupant for stairways and 1005.3.2 uses 0.2 in for doors, corridors and ramps. In sprinklered buildings with an emergency voice/alarm system these drop to 0.2 in and 0.15 in." },
      { q: "What are the minimum exit widths?", a: "Exit doors need at least 32 in of clear width, corridors generally 44 in (36 in for fewer than 50 occupants) and stairways 44 in (36 in for fewer than 50), under the IBC." },
      { q: "How is the occupant load worked out?", a: "Floor area ÷ the occupant load factor for the use in IBC Table 1004.5: for example 150 sq ft per person gross for offices, 15 sq ft net for tables and chairs, 7 sq ft net for chairs only, 5 sq ft net for standing space and 60 sq ft for retail sales floors." },
      { q: "When is one exit enough?", a: "The IBC (Section 1006.3) allows a single exit from a story only for small occupant loads, generally up to 49 people in business and assembly uses, with limits on travel distance. Above that, at least two exits are needed, three from 501 people and four from 1,001." },
    ],
  },
  relatedTools: [
    "fire-safety-load-calculator",
    "staircase-calculator",
    "room-area-calculator"
  ]
};
