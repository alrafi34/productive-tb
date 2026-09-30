export const toolConfig = {
  slug: "heatmap-grid",
  name: "Heatmap Grid",
  description: "Create interactive heatmap grids by clicking cells to visualize density with color intensity. Customize grid size, colors, and export as PNG or SVG.",
  category: "visualization",
  icon: "🔥",
  free: true,
  backend: false,
  seo: {
    title: "Heatmap Grid Generator – Visualize Density by Cell",
    description: "Click cells to build a heatmap grid with color intensity. Set the grid size and colors, then export it as PNG or SVG, all in your browser.",
    keywords: [
      "heatmap grid",
      "heatmap generator",
      "density visualization",
      "interactive heatmap",
      "click density",
      "heat map maker",
      "grid visualization",
      "data visualization",
      "frequency heatmap",
      "color intensity",
      "free heatmap tool",
      "online heatmap",
      "heatmap creator",
      "user interaction map",
      "density map"
    ],
    openGraph: {
      title: "Heatmap Grid Generator – Visualize Density by Cell",
      description: "Click cells to build a heatmap grid with color intensity. Set the grid size and colors, then export it as PNG or SVG, all in your browser.",
      type: "website",
      url: "/heatmap-grid"
    },
    faq: [
      { q: "What is a heatmap grid?", a: "A grid in which each cell's color shows a value: stronger colors for higher values. It makes patterns in a table, such as busy hours in a week or activity by day, visible at a glance." },
      { q: "How do I set cell values?", a: "Click a cell to increase its value, or drag across cells to paint several at once. Set the number of rows and columns and the color scale to fit your data." },
      { q: "What can I use a heatmap for?", a: "Weekly schedules and availability, activity or habit tracking, website click or attention maps sketched by hand, and teaching how density or intensity is shown with color." },
      { q: "Which formats can I export?", a: "PNG for slides and documents, SVG for scalable graphics, and JSON to save the grid and load it again later." },
      { q: "Is my grid saved?", a: "Yes, the current grid is stored in your browser. Export it as JSON to keep a copy or move it to another device." },
    ],
  },
  features: [
    "Customizable grid size (up to 100x100)",
    "Click cells to increase density",
    "Drag-to-paint multiple cells",
    "Right-click to decrease density",
    "Multiple color gradients",
    "Custom color picker",
    "Hover tooltips with density counts",
    "Live statistics (total, max, average)",
    "Undo/Redo functionality",
    "Export as PNG or SVG",
    "Save to browser storage",
    "Randomize grid",
    "Mobile touch support",
    "Keyboard shortcuts"
  ]
};
