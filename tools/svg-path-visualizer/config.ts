import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "svg-path-visualizer",
  name: "SVG Path Visualizer",
  description: "Paste an SVG path d attribute to see it drawn on a grid, with every command explained, a fit-to-path viewBox and copy-ready SVG code.",
  category: "design",
  icon: "✏️",
  seo: {
    title: "SVG Path Visualizer – Preview & Explain Path d Data",
    description: "Paste SVG path data (the d attribute) to see it drawn on a grid, with each M, L, C, Q and A command explained. Fit the viewBox and copy the SVG.",
    keywords: [
      "svg path visualizer",
      "svg path viewer",
      "svg path editor",
      "svg path d attribute",
      "svg path commands",
      "svg path preview",
      "svg arc command",
      "svg bezier curve",
      "svg viewbox",
      "svg path tester",
    ],
    og: {
      title: "SVG Path Visualizer – Preview & Explain Path d Data",
      description: "Paste SVG path data (the d attribute) to see it drawn on a grid, with each M, L, C, Q and A command explained. Fit the viewBox and copy the SVG.",
      url: `${siteConfig.url}/tools/design/svg-path-visualizer`,
    },
    howToSteps: [
      { name: "Paste the path data", text: "Paste the value of a path's d attribute, pick a sample shape, or upload an SVG file to pull out its paths." },
      { name: "Check the drawing", text: "See the path on a grid; errors such as a missing starting M or a command without enough numbers are pointed out." },
      { name: "Read the commands", text: "The command list explains each step in plain words, with relative coordinates converted to absolute positions." },
      { name: "Fit and export", text: "Set the stroke, fill and viewBox or fit the viewBox to the path, then copy the complete SVG code." },
    ],
    faq: [
      { q: "What is the d attribute of an SVG path?", a: "The d (data) attribute holds a list of drawing commands, each a letter followed by numbers. M 10 10 moves the pen to (10, 10), L 90 90 draws a straight line to (90, 90) and Z closes the shape. Everything from icons to logos is built from these commands." },
      { q: "What is the difference between upper- and lowercase commands?", a: "Uppercase commands use absolute coordinates measured from the origin of the viewBox; lowercase commands are relative to the current point. M10 10 L20 20 and M10 10 l10 10 draw the same line." },
      { q: "How does the SVG arc command work?", a: "A rx ry rotation large-arc sweep x y draws part of an ellipse with radii rx and ry to the point (x, y). Because two ellipses and two directions can connect two points, large-arc (1 or 0) picks the longer or shorter arc and sweep (1 or 0) picks clockwise or counter-clockwise." },
      { q: "Why is my path cut off or not visible?", a: "Usually the viewBox does not cover the path's coordinates, the fill and stroke are both none, or the stroke width is tiny compared with the viewBox. Use Fit to path to set the viewBox from the path's real bounds, curves included." },
      { q: "How do I make a circle with a path?", a: "Use two arcs, because one arc cannot start and end at the same point: M10 50 A40 40 0 1 0 90 50 A40 40 0 1 0 10 50 Z draws a circle of radius 40 centred at (50, 50). In plain SVG the <circle> element is simpler." },
      { q: "Is my SVG uploaded anywhere?", a: "No. We do not collect or store your files." },
    ],
  },
};
