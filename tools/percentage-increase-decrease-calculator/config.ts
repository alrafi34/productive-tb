import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "percentage-increase-decrease",
  name: "Percentage Increase/Decrease Calculator",
  description: "Calculate percentage increase or decrease between two values with instant formulas, reverse lookup, multi-step simulation, batch analysis, and CSV export.",
  category: "calculator",
  icon: "📊",
  free: true,
  backend: false,
  seo: {
    title: "Percentage Increase/Decrease Calculator — Free Online | Productive Toolbox",
    description: "Calculate percent change between two numbers instantly. Includes reverse percentage, multi-step compounding simulation, batch list analysis, and CSV export. Free, browser-based.",
    keywords: [
      "percentage increase calculator",
      "percentage decrease calculator",
      "percent change calculator",
      "percentage change calculator",
      "percentage change between two numbers",
      "percentage increase decrease calculator",
      "percent increase formula",
      "percent decrease formula",
      "how to calculate percentage change",
      "reverse percentage calculator",
      "find original value from percentage",
      "compounded percentage change",
      "multi step percentage calculator",
      "batch percentage calculator",
      "price increase percentage calculator",
      "salary increase percentage",
      "year over year percentage change",
      "month over month percentage change",
      "percentage change online free",
      "percent change tool",
      "calculate percent increase online",
      "percentage change with csv export",
      "growth rate calculator",
      "percentage decline calculator",
      "net percentage change calculator",
    ],
    openGraph: {
      title: "Percentage Increase/Decrease Calculator — Free Online",
      description: "Calculate percent change between two numbers. Reverse lookup, multi-step simulation, batch analysis, CSV export. 100% browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/calculator/percentage-increase-decrease`,
    },
    howToSteps: [
      {
        name: "Enter the old and new values",
        text: "Type your starting value in the Old Value field and your ending value in the New Value field. The calculator instantly returns the percentage change, absolute difference, and direction.",
      },
      {
        name: "Read the percent change result",
        text: "The result shows percentage change to two decimal places, the absolute difference, and a direction label. Green means increase; red means decrease.",
      },
      {
        name: "Use Reverse mode to find the original value",
        text: "Switch to Reverse mode when you know the final value and the percentage change but need the starting value. Enter both and select increase or decrease.",
      },
      {
        name: "Simulate multi-step changes",
        text: "Switch to Multi-Step mode, enter a base value, and add increase or decrease steps. Each step applies to the running value from the previous step, showing compounding clearly.",
      },
      {
        name: "Run batch analysis on a list",
        text: "Switch to Batch mode and paste numbers one per line. The calculator returns percentage change for every consecutive pair, with absolute change and direction per row.",
      },
      {
        name: "Export results to CSV",
        text: "After running a batch calculation, click Export CSV to download results as a spreadsheet-ready file with from-value, to-value, change, percentage, and direction columns.",
      },
    ],
    faq: [
      {
        q: "What is percentage change and how is it calculated?",
        a: "Percentage change measures how much a value has grown or shrunk relative to its original amount. The formula is ((new value minus old value) divided by the absolute value of old value) times 100. A positive result means an increase; a negative result means a decrease. For example, a price rising from $80 to $100 is a 25% increase.",
      },
      {
        q: "Why is a 20% increase followed by a 10% decrease not a net 10% increase?",
        a: "Because each percentage is applied to a different base value. Starting at 100, a 20% increase brings you to 120. Then a 10% decrease is applied to 120, removing 12 and landing at 108. The net change from 100 to 108 is only +8%, not +10%. This is why you must use Multi-Step mode rather than adding percentages together.",
      },
      {
        q: "How do I find the original value from a final value and a percentage change?",
        a: "Use the reverse percentage formula: original equals final divided by (1 plus percent divided by 100) for an increase, or final divided by (1 minus percent divided by 100) for a decrease. If a price after a 25% increase is $125, the original is $125 divided by 1.25 which equals $100. The Reverse mode handles both directions automatically.",
      },
      {
        q: "What is the difference between percentage change and percentage difference?",
        a: "Percentage change measures a directional change from a specific starting point and uses that starting point as the denominator. Percentage difference compares two values without implying direction and uses their average as the denominator. Use percentage change when one value is clearly the before and one is the after.",
      },
      {
        q: "What happens when the old value is zero?",
        a: "Percentage change from zero is mathematically undefined — division by zero produces no meaningful result. This calculator detects a zero old value and reports the result as undefined rather than returning infinity. Express the change as an absolute difference instead.",
      },
      {
        q: "How does the batch percentage calculator work?",
        a: "Batch mode accepts a list of numbers, one per line, and calculates the percentage change between each consecutive pair. Five monthly revenue figures produce four transitions. Each row shows the from-value, to-value, absolute change, percentage change, and direction. The full output can be exported as CSV.",
      },
      {
        q: "Can I simulate multiple price increases and decreases in sequence?",
        a: "Yes. Multi-Step mode lets you add any number of increase or decrease steps and applies each one to the running value from the previous step. This is useful for modelling costs that receive a supplier increase, a seasonal discount, and a markup in sequence. The tool shows the value after each stage and the cumulative net percentage from the original.",
      },
      {
        q: "What is the difference between this tool and the percentage calculator?",
        a: "This tool specialises in change analysis: comparing an old value to a new value to measure growth or decline. The percentage calculator is broader, solving four formula types including what is X percent of Y, X is what percent of Y, and change calculations. Use this tool when your question is specifically about how much something changed between two points.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. The values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. The CSV export generates the file locally on your device without any server-side processing.",
      },
    ],
  },
  features: [
    "Percentage change — increase or decrease — to 2 decimal places",
    "Absolute difference with directional indicator",
    "Reverse mode — recover original value from final + percent",
    "Multi-step simulation with running value after each stage",
    "Net percentage change across all steps combined",
    "Batch mode — process a full list of values at once",
    "CSV export of full batch results",
    "Accepts comma-formatted numbers and decimals",
    "100% browser-based — no data sent to any server",
  ],
  relatedTools: [
    "percentage-calculator",
    "discount-calculator",
    "profit-margin-calculator",
    "compound-interest-calculator",
    "revenue-growth-calculator",
  ],
};
