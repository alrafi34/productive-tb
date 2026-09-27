export const sunlightExposureCalculatorConfig = {
  name: "Sunlight Exposure Calculator",
  slug: "sunlight-exposure-calculator",
  category: "architecture",
  description: "Simulate sunlight exposure on buildings with this free online tool. Visualize sun position, shadow length, and optimize architecture or solar panel placement instantly.",
  icon: "☀️",
  color: "#058554",
  featured: false,
  keywords: [
    "sunlight calculator",
    "shadow analysis tool",
    "sun exposure building",
    "solar angle calculator",
    "architecture sunlight simulation",
    "sun path calculator",
    "solar position calculator"
  ],
  seo: {
    title: "Sunlight Exposure Calculator – Sun Path & Shadows",
    description: "See the sun's position, sunrise, sunset and the shadow a building casts for any place and date. Useful for daylighting, solar panels and site planning.",
    keywords: "sunlight calculator, shadow analysis tool, sun exposure building, solar angle calculator, architecture sunlight simulation",
    og: {
      title: "Sunlight Exposure Calculator – Sun Position & Shadow Analysis",
      description: "Visualize sun position, shadow length, and sunlight exposure for buildings. Free online tool for architects and solar planners.",
      type: "website",
      url: "/tools/architecture/sunlight-exposure-calculator"
    },
    howToSteps: [
      { name: "Set the location", text: "Enter latitude and longitude or pick a city; the time zone fills in with daylight saving." },
      { name: "Choose the date", text: "Pick the day to analyze, such as the summer or winter solstice." },
      { name: "Set the time", text: "Move the time slider or press play to watch the sun move from sunrise to sunset." },
      { name: "Describe the building", text: "Enter the building height, the direction the surface faces and whether it is a wall, roof or ground." },
      { name: "Read the results", text: "See the sun's altitude and azimuth, the shadow length and the direct sunlight on the surface." },
    ],
    faq: [
      { q: "How accurate are the sun positions?", a: "The calculator uses standard solar geometry with the equation of time, which is accurate to within about 1° for planning. It does not model atmospheric refraction near the horizon, clouds, terrain or surrounding buildings." },
      { q: "Which way should solar panels face?", a: "In the Northern Hemisphere, due south (180°) with a tilt close to the latitude gives the most energy over a year; in the Southern Hemisphere, due north. East- or west-facing panels produce about 10–20% less but shift output to the morning or evening." },
      { q: "How long is a building's shadow?", a: "Shadow length = height ÷ tan(sun altitude). In New York at noon on the winter solstice the sun is about 26° high, so a 10 m (33 ft) building casts a shadow about 20 m (67 ft) long." },
      { q: "How do I use this for passive solar design?", a: "Check the low winter sun to place windows that let in heat, and the high summer sun to size overhangs that shade them. At 40° N the noon sun is about 73° high at the summer solstice and 26° at the winter solstice." },
      { q: "Does it account for daylight saving time?", a: "Yes. For preset cities the UTC offset follows the local rules for the chosen date, and you can set any offset by hand for other places." },
    ],
  },
  relatedTools: [
    "building-height-calculator",
    "room-area-calculator",
    "plot-area-calculator"
  ]
};
