import { siteConfig } from "@/config/site";

export const roomLightingCalculatorConfig = {
  name: "Room Lighting Calculator",
  description: "Calculate the optimal number of lights needed for any room based on size, purpose, and lighting standards using lux levels.",
  icon: "💡",
  category: "electrical",
  slug: "room-lighting-calculator",
  seo: {
    title: "Room Lighting Calculator — Free Lux Calculator Online",
    description: "Calculate how many lights a room needs using lux and lumens. Enter dimensions, room type, and bulb output for accurate results. Free, browser-based.",
    keywords: [
      "room lighting calculator",
      "how many lights do i need",
      "lux to lumens calculator",
      "lighting calculator online",
      "home lighting calculator",
      "lighting design calculator",
      "room illumination calculator",
      "bulb calculator",
      "lighting requirements calculator",
      "lux level calculator",
      "lumens calculator",
      "lighting layout calculator",
      "office lighting calculator",
      "kitchen lighting calculator",
      "bedroom lighting calculator",
      "lux calculator for rooms",
      "number of lights calculator",
      "lumen method calculator",
      "led lights needed calculator",
      "lighting fixture calculator",
      "how many lumens per room",
      "free room lighting calculator",
      "recessed lighting calculator",
      "lighting design lux chart",
    ],
    openGraph: {
      title: "Room Lighting Calculator — Free Lux Calculator Online",
      description: "Calculate how many lights a room needs using lux and lumens. Enter dimensions, room type, and bulb output for accurate results.",
      type: "website",
      url: `${siteConfig.url}/tools/electrical/room-lighting-calculator`,
    },
    og: {
      title: "Room Lighting Calculator — Free Lux Calculator Online",
      description: "Calculate how many lights a room needs using lux and lumens. Enter dimensions, room type, and bulb output for accurate results.",
      url: `${siteConfig.url}/tools/electrical/room-lighting-calculator`
    },
    howToSteps: [
      {
        name: "Enter Room Dimensions",
        text: "Type the width and length of the room, measured wall to wall. The calculator multiplies these to get floor area before applying the lighting formula.",
      },
      {
        name: "Select Feet or Meters",
        text: "Choose the unit matching your measurement. Feet-based dimensions are converted to square meters internally since lux is defined as lumens per square meter.",
      },
      {
        name: "Choose the Room Type",
        text: "Pick from bedroom, living room, kitchen, office, bathroom, dining room, hallway, or garage for a standard lux level, or select Custom to enter your own target.",
      },
      {
        name: "Enter Lumens per Light",
        text: "Type the lumen output printed on your bulb's packaging, or apply a common LED, CFL, halogen, or incandescent preset from the bulb type panel.",
      },
      {
        name: "Read the Fixture Count and Status",
        text: "The calculator returns the number of lights needed, the lux actually achieved, and a status of under-lit, optimal, or over-lit.",
      },
      {
        name: "Save, Copy, or Export the Result",
        text: "Save the calculation to local history, copy a summary to the clipboard, or export a full text report for a lighting plan.",
      },
    ],
    faq: [
      {
        q: "What is a room lighting calculator?",
        a: "A room lighting calculator determines how many light fixtures a room needs by combining its floor area with the recommended illumination level, or lux, for that room's purpose. It uses the lumen method used in professional lighting design to convert room area and target lux into a required lumen total, then divides by the bulb's rated output to get a fixture count.",
      },
      {
        q: "How is the number of lights calculated?",
        a: "The calculator multiplies room area in square meters by the recommended lux level for the room type to get total lumens required, then divides by the lumen output of a single bulb and rounds up to the nearest whole fixture. The formula is Lights Needed = ceil((Width times Length in square meters times Lux Level) divided by Lumens per Light). The result is checked against the achieved lux to flag under-lit or over-lit outcomes.",
      },
      {
        q: "What is a good lux level for my room?",
        a: "It depends on the room's function. Bedrooms and hallways need only 100 lux for ambient lighting, living and dining rooms typically use 150 lux, bathrooms need 200 lux and garages 300 lux for task visibility, and kitchens and offices need 300 to 400 lux for detailed work. Specialized spaces like photography studios or retail displays often need custom lux values outside this range.",
      },
      {
        q: "What is the difference between lumens and lux?",
        a: "Lumens measure the total light output produced by a single bulb, a fixed number printed on the packaging regardless of room size. Lux measures illumination density, meaning how many lumens land on each square meter of floor or work surface. The same 800-lumen bulb produces a high lux reading in a small closet and a much lower lux reading spread across a large open room.",
      },
      {
        q: "Should I enter room dimensions in feet or meters?",
        a: "Use whichever unit matches how you measured the room, since the calculator converts automatically. If you select feet, the tool converts width and length to square meters internally before applying the lux formula, because lux is internationally defined as lumens per square meter, not per square foot.",
      },
      {
        q: "What does over-lit or under-lit mean in the results?",
        a: "Because the fixture count always rounds up to a whole number, the achieved lux after rounding rarely matches the target exactly. If achieved lux comes in more than 10 percent below target, the room is flagged under-lit. If it exceeds the target by more than 30 percent, it is flagged over-lit. Optimal means the achieved lux lands within that band.",
      },
      {
        q: "How does ceiling height affect the lighting calculation?",
        a: "The core lumen-method formula is based on floor area and does not automatically adjust for ceiling height, but height still matters in practice. Light spreads out and loses intensity over a longer throw distance, so rooms with ceilings above roughly 2.4 meters (8 feet) should add 10 to 20 percent more lumens per light, or target a higher lux level, to compensate.",
      },
      {
        q: "Can I use this calculator for a room with a custom lighting requirement?",
        a: "Yes. Selecting Custom as the room type unlocks a direct lux input field, letting you enter any illumination target instead of the built-in residential and office presets. This is useful for photography studios, retail product displays, workshops with detailed assembly work, or any room where the standard 100 to 400 lux presets don't apply.",
      },
      {
        q: "How do I compare LED, CFL, halogen, and incandescent bulbs in the calculator?",
        a: "Enter the lumen rating printed on the bulb packaging into the Lumens per Light field, or use the built-in bulb type shortcuts that fill this in automatically for common wattage-equivalent bulbs. Comparing bulbs by lumens rather than watts is essential because an LED uses roughly 85 percent less wattage than an incandescent bulb for the same light output.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your room dimensions, lux selections, and bulb specifications are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "fan-power-consumption-calculator",
    "house-wiring-load-calculator",
    "energy-consumption-calculator",
    "voltage-drop-calculator",
    "led-resistor-calculator",
    "electric-bill-calculator",
  ],
};
