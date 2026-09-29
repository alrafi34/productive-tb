import { siteConfig } from "@/config/site";

export const colorPaletteContrastGridConfig = {
  id: "color-palette-contrast-grid",
  slug: "color-palette-contrast-grid",
  name: "Color Palette Contrast Grid",
  description: "Check the WCAG contrast of every text and background combination in a color palette at once, and see which pairs pass AA and AAA.",
  category: "design",
  icon: "🎨",
  seo: {
    title: "Color Contrast Grid – Test Every Palette Pair for WCAG",
    description: "Enter your palette and see the contrast ratio of every text and background pair in one grid, with WCAG AA and AAA results for normal and large text.",
    keywords: [
      "color contrast grid",
      "palette contrast checker",
      "wcag contrast grid",
      "accessible color palette",
      "color contrast matrix",
      "contrast ratio checker",
      "wcag aa contrast",
      "a11y color palette",
      "text background contrast",
      "color accessibility tool",
    ],
    og: {
      title: "Color Contrast Grid – Test Every Palette Pair for WCAG",
      description: "Enter your palette and see the contrast ratio of every text and background pair in one grid, with WCAG AA and AAA results for normal and large text.",
      url: `${siteConfig.url}/tools/design/color-palette-contrast-grid`,
    },
    howToSteps: [
      { name: "Enter your palette", text: "Add your brand or design colors as HEX codes, start from a preset such as Material or Tailwind, or generate a random palette." },
      { name: "Read the grid", text: "Each cell shows one color as text on another as background, with its contrast ratio and WCAG level." },
      { name: "Filter the results", text: "Show only pairs that pass AAA or AA, only failing pairs, or sort from highest to lowest contrast." },
      { name: "Export", text: "Click a pair to copy its CSS, or export the whole palette as CSS custom properties or SCSS variables." },
    ],
    faq: [
      { q: "What contrast ratio does WCAG require?", a: "WCAG 2.1 level AA asks for at least 4.5:1 between text and its background, and 3:1 for large text (18pt, about 24px, or 14pt bold, about 18.7px). Level AAA asks for 7:1 and 4.5:1. Icons, input borders and other parts of controls need 3:1 against what is next to them." },
      { q: "How is the contrast ratio calculated?", a: "From the relative luminance L of each color: (L1 + 0.05) ÷ (L2 + 0.05), with the lighter color on top. Luminance weights the linearised red, green and blue channels by 0.2126, 0.7152 and 0.0722, because our eyes are most sensitive to green. The ratio runs from 1:1 (same color) to 21:1 (black on white)." },
      { q: "Why use a grid instead of checking pairs one by one?", a: "A palette of 6 colors has 30 possible text and background pairs. The grid shows them all at once, so you can see which combinations are safe for body text, which only work for headings, and which to avoid, before they end up in a design." },
      { q: "What is the lightest gray that passes on white?", a: "#767676, at 4.54:1. One step lighter, #777777, gives 4.47:1 and fails AA for normal text. That is why this tool rounds ratios down: a value shown as 4.5:1 always passes." },
      { q: "Does passing the contrast check make a design accessible?", a: "It covers one important criterion. Also make sure color is not the only way information is shown (add labels or icons to red and green states), that focus outlines are visible, and that text can be resized." },
    ],
  },
};
