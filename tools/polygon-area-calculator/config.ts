import { siteConfig } from "@/config/site";

export const polygonAreaCalculatorConfig = {
  name: "Polygon Area Calculator",
  slug: "polygon-area-calculator",
  description: "Calculate the area of irregular polygon shapes using coordinates or interactive canvas plotting. Supports multiple units with real-time results.",
  category: "land",
  icon: "📐",
  free: true,
  seo: {
    title: "Polygon Area Calculator – Irregular Lot Area",
    description: "Find the area and perimeter of an irregular lot or field from its corner coordinates or by drawing it, in sq ft, m², acres or hectares.",
    keywords: [
      "polygon area calculator",
      "land area calculator",
      "irregular land area calculator",
      "field area calculator",
      "property measurement tool",
      "polygon measurement online",
      "land measurement calculator",
      "shoelace formula calculator",
      "coordinate area calculator",
      "irregular polygon calculator",
    ],
    og: {
      title: "Polygon Area Calculator – Irregular Lot Area",
      description: "Find the area and perimeter of an irregular lot or field from its corner coordinates or by drawing it, in sq ft, m², acres or hectares.",
      url: `${siteConfig.url}/tools/land/polygon-area-calculator`,
    },
    howToSteps: [
      { name: "Draw or enter the shape", text: "Click on the canvas to place each corner in order, or switch to text mode and enter one x, y pair per line." },
      { name: "Adjust the points", text: "Drag a point to move it, and use undo and redo to fix mistakes." },
      { name: "Set the scale", text: "Type how far one grid unit is and choose feet, meters, yards, kilometers or miles." },
      { name: "Choose the output unit", text: "Select square feet, square meters, acres, hectares, square yards, square kilometers or square miles." },
      { name: "Read the area", text: "See the area, perimeter and every unit conversion, and export the result as CSV, JSON, text or an image." },
    ],
    faq: [
      { q: "What is the shoelace formula?", a: "The surveyor's formula for the area of a polygon from its corners: Area = ½ × |Σ(xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|. It works for any simple polygon, convex or concave, as long as the corners are listed in order around the edge." },
      { q: "How do I get real-world area?", a: "Set the scale to the distance one grid unit represents. A 10 × 10 square with 1 unit = 1 ft is 100 sq ft (9.29 m²); with 1 unit = 1 m it is 100 m² (1,076 sq ft)." },
      { q: "Can I use GPS coordinates?", a: "Not as latitude and longitude, because degrees are not a length. Convert the points to a projected grid in meters or feet first, such as UTM or a State Plane or national grid, then enter those x, y values." },
      { q: "What if the edges cross?", a: "A self-crossing shape gives a wrong area, because parts of it cancel out. List the corners in order, clockwise or counterclockwise, so no edges cross." },
      { q: "What is snap to grid?", a: "When it is on, points you place snap to the nearest grid intersection, which makes clean shapes easier to draw." },
    ],
  },
};
