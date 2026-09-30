import { siteConfig } from "@/config/site";

export const plotDivisionCalculatorConfig = {
  name: "Plot Division Calculator",
  slug: "plot-division-calculator",
  description: "Divide land into equal plots instantly. Calculate plot sizes, dimensions, and optimal layouts with road spacing support.",
  category: "land",
  icon: "📐",
  free: true,
  seo: {
    title: "Plot Division Calculator – Divide Land Into Equal Plots",
    description: "Divide land into equal plots: enter the total area, number of plots and road allowance to get each plot's size, dimensions and grid layout, in any unit.",
    keywords: [
      "plot division calculator",
      "land division calculator",
      "divide land into plots",
      "plot planning tool",
      "land subdivision calculator",
      "equal land division calculator",
      "plot size calculator",
      "land layout planner",
      "property subdivision tool",
      "plot area calculator",
    ],
    og: {
      title: "Plot Division Calculator – Divide Land Into Equal Plots",
      description: "Divide land into equal plots: enter the total area, number of plots and road allowance to get each plot's size, dimensions and grid layout, in any unit.",
      url: `${siteConfig.url}/tools/land/plot-division-calculator`,
    },
    howToSteps: [
      { name: "Enter the land size", text: "Type the total area and choose its unit: square feet, square meters, acres or hectares (Decimal, Katha and Bigha are also available)." },
      { name: "Enter the number of plots", text: "Type how many plots you want, up to the calculator's limit." },
      { name: "Choose how to divide", text: "Pick equal area, equal width, equal length or a custom grid of rows and columns." },
      { name: "Add dimensions and roads", text: "Optionally enter the land's width and length for a layout, and a road width to set aside for access roads between plots." },
      { name: "Read the plots", text: "See the size of each plot, the area lost to roads and a suggested grid you can save or export." },
    ],
    faq: [
      { q: "How is plot size calculated?", a: "Plot size = (total land − road area) ÷ number of plots. 5 acres (217,800 sq ft) divided into 10 plots with no roads gives 21,780 sq ft (0.5 acre) each; if roads take 15% of the land, each plot is 18,513 sq ft." },
      { q: "How much land do roads take in a subdivision?", a: "Typically 15–25% of the gross area for residential subdivisions once streets, sidewalks and utility strips are included; more with cul-de-sacs and open-space requirements." },
      { q: "What is the minimum lot size?", a: "It is set by the zoning district: from about 5,000 sq ft (0.11 acre) in dense US suburbs to 1 acre or more in rural zones, plus minimum frontage and setbacks. Check your county or city zoning code before planning the layout." },
      { q: "How does the suggested grid work?", a: "The calculator picks the rows × columns arrangement closest to square plots for the land's shape, for example 3 × 4 or 2 × 6 for 12 plots. Choose Custom Grid to set rows and columns yourself." },
      { q: "Do I need approval to divide land?", a: "Almost always. In the US a subdivision plat must be prepared by a licensed surveyor and approved by the local planning authority; in England and Wales new plots for building usually need planning permission." },
    ],
  },
};
