import { siteConfig } from "@/config/site";

export const clickHeatmapDensityCalculatorConfig = {
  slug: "click-heatmap-density-calculator",
  name: "Click Heatmap Density Calculator",
  description: "Visualize and analyze click distribution with an interactive canvas heatmap. Upload a screenshot, click to add points, import CSV/JSON coordinates, or generate random test data — then analyze density, hotspots, and cold zones. Free browser-based tool.",
  category: "data-analytics",
  icon: "🔥",
  free: true,
  relatedTools: [
    "scroll-depth-calculator",
    "session-duration-calculator",
    "page-speed-score-calculator",
    "bounce-rate-calculator",
    "conversion-rate-calculator",
    "engagement-rate-calculator",
  ],
  seo: {
    title: "Click Heatmap Density Calculator — Free Interactive Heatmap Generator",
    description: "Visualize user click distribution with this free Click Heatmap Density Calculator. Upload screenshots, import click coordinates, generate interactive heatmaps, analyze hotspots, export PNG, SVG, CSV, and JSON. Runs entirely in your browser.",
    keywords: [
      "click heatmap",
      "heatmap generator",
      "heatmap calculator",
      "click analysis",
      "ux heatmap",
      "website heatmap",
      "user interaction analysis",
      "heatmap visualization",
      "click density calculator",
      "heatmap tool online",
      "free heatmap generator",
      "click tracking tool",
      "cro heatmap tool",
      "mobile tap heatmap",
      "screenshot heatmap generator",
      "click coordinate visualizer",
      "canvas heatmap tool",
      "hotspot detection tool",
      "csv heatmap generator",
      "browser based heatmap",
    ],
    openGraph: {
      title: "Click Heatmap Density Calculator — Free Interactive Heatmap Generator",
      description: "Visualize click distribution with an interactive canvas heatmap. Upload screenshots, import coordinates, analyze hotspots, and export PNG, SVG, CSV, or JSON — free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/click-heatmap-density-calculator`,
    },
    og: {
      title: "Click Heatmap Density Calculator — Free Interactive Heatmap Generator",
      description: "Visualize click distribution with an interactive canvas heatmap. Upload screenshots, import coordinates, analyze hotspots, and export PNG, SVG, CSV, or JSON — free and browser-based.",
      url: `${siteConfig.url}/tools/data-analytics/click-heatmap-density-calculator`,
    },
    howToSteps: [
      {
        name: "Choose a Background",
        text: "Upload a screenshot, webpage mockup, or app screen, or start with a blank canvas — drag and drop an image or click to upload.",
      },
      {
        name: "Add Click Data",
        text: "Click directly on the canvas to place points, import a CSV or JSON file of coordinates, or generate random test data to explore the tool.",
      },
      {
        name: "Adjust Heatmap Settings",
        text: "Tune the heat radius, intensity, opacity, blur, and color palette to control how the density visualization looks.",
      },
      {
        name: "Analyze the Statistics",
        text: "Review live density statistics — total clicks, hotspot and cold-zone counts, coverage percentage, and the most and least active regions.",
      },
      {
        name: "Export Your Heatmap",
        text: "Download the heatmap as a PNG or SVG, export the underlying click data as CSV or JSON, or copy the statistics summary.",
      },
    ],
    faq: [
      {
        q: "What is a Click Heatmap Density Calculator?",
        a: "A Click Heatmap Density Calculator is a free browser-based tool that visualizes where clicks or taps concentrate on a webpage, image, or app screen. You can manually place click points, import coordinates from a CSV or JSON file, or generate random test data, and the tool renders an interactive density heatmap using a Gaussian-style accumulation algorithm.",
      },
      {
        q: "How does the heatmap algorithm work?",
        a: "Each click point contributes a soft radial gradient of intensity to the canvas, and overlapping points accumulate additively, so areas with more clicks appear hotter. The accumulated density is then mapped to a color gradient (like the Classic blue-to-red palette) to produce the final visualization.",
      },
      {
        q: "What CSV and JSON formats does the tool accept?",
        a: "CSV files should contain one \"x,y\" coordinate pair per line, with the delimiter (comma, semicolon, or tab) auto-detected. JSON files should contain an array of objects in the form { \"x\": number, \"y\": number }.",
      },
      {
        q: "Can I use this without uploading an image?",
        a: "Yes. You can generate a heatmap on a blank canvas using manually placed points, imported coordinates, or randomly generated test data — no background image is required.",
      },
      {
        q: "How many clicks can the tool handle?",
        a: "The tool is designed to handle datasets from a handful of points up to tens of thousands efficiently, using cached rendering stamps and grid-based statistics so the browser stays responsive even with large datasets.",
      },
      {
        q: "What do Hotspot Count and Cold Zone Count mean?",
        a: "Hotspot Count is the number of distinct high-density regions (clusters of cells above 65% of peak density) on the canvas. Cold Zone Count is the number of distinct low-but-nonzero density regions (below 20% of peak density), indicating areas that receive some but very little interaction.",
      },
      {
        q: "What is the difference between PNG and SVG export?",
        a: "PNG export downloads a pixel-based snapshot of the rendered canvas heatmap, including the background image and grid if enabled. SVG export generates a scalable vector version using radial gradients at each click point, useful for further editing in vector design tools.",
      },
      {
        q: "Can I undo a mistake?",
        a: "Yes. Every point addition, deletion, import, or random-generation action is tracked in an undo/redo history, accessible via the Undo/Redo buttons or the Ctrl+Z / Ctrl+Shift+Z keyboard shortcuts.",
      },
      {
        q: "Does the tool save my work automatically?",
        a: "Your click points and heatmap settings are automatically saved to your browser's local storage and restored the next time you visit. Uploaded background images are not persisted across sessions due to their size.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All rendering, statistics, and file parsing happen entirely in your browser using JavaScript. No image, coordinate, or click data is ever uploaded to a server or stored in a database.",
      },
    ],
  },
};
