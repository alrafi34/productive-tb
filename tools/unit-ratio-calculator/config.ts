export const toolConfig = {
  slug: "unit-ratio-calculator",
  name: "Unit Ratio Calculator",
  description: "Simplify ratios instantly. Convert 100:50 to 2:1, handle decimals, multi-value ratios, and generate equivalent ratios.",
  category: "calculator",
  icon: "⚖️",
  free: true,
  backend: false,
  seo: {
    title: "Unit Ratio Calculator – Simplify Ratios & Find 1 : n",
    description: "Simplify any ratio to lowest terms and see it as a unit ratio (1 : n). Handles decimals and three or more parts, with steps, equivalents and percentages.",
    keywords: [
      "ratio calculator",
      "ratio to simplest form calculator",
      "simplify ratio",
      "ratio simplifier",
      "unit ratio calculator",
      "unit ratio simplifier",
      "simplest ratio calculator",
      "ratio converter",
      "equivalent ratios",
      "decimal ratio calculator",
      "multi value ratio",
      "proportion calculator",
      "ratio reduction tool"
    ],
    openGraph: {
      title: "Unit Ratio Calculator – Simplify Ratios & Find 1 : n",
      description: "Simplify any ratio to lowest terms and see it as a unit ratio (1 : n). Handles decimals and three or more parts, with steps, equivalents and percentages.",
      type: "website",
      url: "https://productivetoolbox.com/tools/calculator/unit-ratio-calculator"
    },
    howToSteps: [
      { name: "Enter the ratio", text: "Type the numbers separated by colons, commas or spaces, for example 30:45, 12 18 24 or 2.5, 5." },
      { name: "Read the simplified ratio", text: "The ratio in lowest terms appears with the greatest common divisor used, and the unit ratio 1 : n below it." },
      { name: "Show the steps", text: "Tick Show steps to see decimals scaled to whole numbers, the GCD and the division." },
      { name: "Use the extras", text: "See equivalent ratios (×1 to ×5), each part's share as a percentage and bars comparing the parts." },
      { name: "Copy, export or reuse", text: "Copy the result, export the equivalent ratios as CSV, or reopen one of your recent calculations kept in this browser." },
    ],
    faq: [
      { q: "How do you simplify a ratio?", a: "Divide every part by their greatest common divisor (GCD). For 75 : 125 the GCD is 25, so the ratio simplifies to 3 : 5. The same works for more parts: 48 : 64 : 80 divided by 16 is 3 : 4 : 5." },
      { q: "What is a unit ratio?", a: "A ratio written with 1 as its first term, found by dividing every part by the first. 4 : 10 becomes 1 : 2.5, meaning 2.5 of the second for every 1 of the first. Unit ratios make different ratios easy to compare, such as 1 : 2.5 against 1 : 3." },
      { q: "How are decimal ratios simplified?", a: "They are first multiplied by a power of 10 to make whole numbers, then divided by the GCD. 1.5 : 0.5 becomes 15 : 5, which simplifies to 3 : 1." },
      { q: "How do I turn a ratio into percentages?", a: "Divide each part by the total and multiply by 100. In 1 : 2 : 3 the total is 6, so the parts are 16.7%, 33.3% and 50%." },
      { q: "How do I scale a ratio up, for example for a recipe?", a: "Multiply every part by the same number. A 2 : 3 mix of flour to water becomes 4 : 6 or 6 : 9; the equivalent ratios list shows the first five multiples." },
      { q: "Is my data stored?", a: "We do not collect or store what you enter. Any history the tool keeps is visible only to you." },
    ],
  },
  features: [
    "Simplify ratios to lowest terms instantly",
    "Support for 2-10 value ratios",
    "Handle decimal ratios automatically",
    "Generate equivalent ratios",
    "Visual ratio bar representation",
    "Copy and export results"
  ]
};
