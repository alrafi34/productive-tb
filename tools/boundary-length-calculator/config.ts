import { siteConfig } from "@/config/site";

export const boundaryLengthCalculatorConfig = {
  name: "Boundary Length Calculator",
  slug: "boundary-length-calculator",
  description: "Calculate total boundary length or perimeter instantly for plots, land, rooms, or property boundaries with support for multiple shapes.",
  category: "land",
  icon: "📏",
  free: true,
  seo: {
    title: "Boundary Length Calculator – Plot Perimeter",
    description: "Calculate the perimeter of a plot, yard or room: add any number of sides or use rectangle, square and triangle modes. Meters, feet, km, cm or inches.",
    keywords: [
      "boundary length calculator",
      "plot perimeter calculator",
      "land boundary calculator",
      "perimeter calculator",
      "property boundary calculator",
      "plot planning tool",
      "boundary measurement calculator",
      "fence length calculator",
      "property perimeter tool",
    ],
    og: {
      title: "Free Boundary Length Calculator – Calculate Plot Perimeter Online",
      description: "Calculate total boundary length or perimeter instantly for plots, land, rooms, or property boundaries. Fast and accurate.",
      url: `${siteConfig.url}/tools/land/boundary-length-calculator`,
    },
    howToSteps: [
      { name: "Pick the shape", text: "Choose manual sides, rectangle, square or triangle." },
      { name: "Choose the unit", text: "Select meters, feet, kilometers, centimeters or inches." },
      { name: "Enter the sides", text: "Type each side length, adding as many sides as the boundary has." },
      { name: "Read the perimeter", text: "See the total boundary length, then save or export it." },
    ],
    faq: [
      { q: "How is boundary length calculated?", a: "Add up the length of every side. A rectangle's perimeter is 2 × (length + width), so a 100 × 60 ft lot has 320 ft of boundary." },
      { q: "How much fencing do I need for my yard?", a: "The boundary length minus any gate openings and sides that do not need fencing, such as the house wall. Add about 5–10% for cuts, corners and slopes." },
      { q: "How do I measure an irregular lot?", a: "Enter each side from your survey or plat in manual mode; the calculator adds as many sides as you need." },
      { q: "How do I convert meters to feet?", a: "Multiply by 3.281; 1 ft = 0.3048 m. A 250 m boundary is 820 ft." },
      { q: "Can I get the area too?", a: "The perimeter alone does not fix the area. Use the land area or polygon area calculator for that." },
    ],
  },
};
