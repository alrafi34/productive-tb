import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "percentage-calculator",
  name: "Percentage Calculator",
  description: "Calculate percent of a number, what percentage X is of Y, percentage increase/decrease, reverse percentage, multi-step compounding, and batch calculations with CSV export.",
  category: "calculator",
  icon: "📈",
  free: true,
  backend: false,
  seo: {
    title: "Percentage Calculator — Free Online Percentage Calculator | Productive Toolbox",
    description: "Solve any percentage problem instantly. Find X% of Y, what % X is of Y, increase/decrease by %, reverse percentage, multi-step, and batch with CSV export. Free, browser-based.",
    keywords: [
      "percentage calculator",
      "percentage calculator online",
      "free percentage calculator",
      "calculate percentage online",
      "what is x percent of y",
      "x is what percent of y",
      "percentage of a number calculator",
      "how to calculate percentage",
      "percentage increase calculator",
      "percentage decrease calculator",
      "reverse percentage calculator",
      "find original value before percentage",
      "percentage calculator with steps",
      "multi step percentage calculator",
      "batch percentage calculator",
      "percentage calculator no signup",
      "tip calculator percentage",
      "discount percentage calculator",
      "tax percentage calculator",
      "percentage calculator for students",
      "percentage formula calculator",
      "percentage calculator with csv export",
      "how to work out a percentage",
      "percentage math calculator",
      "online percent calculator",
    ],
    openGraph: {
      title: "Percentage Calculator — Free Online Percentage Calculator",
      description: "Solve any percentage problem: X% of Y, what % is X of Y, increase/decrease, reverse, multi-step, batch. Free and 100% browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/calculator/percentage-calculator`,
    },
    howToSteps: [
      {
        name: "Select your formula",
        text: "Choose from four Basic mode formulas: What is X% of Y, X is what % of Y, Increase a value by %, or Decrease a value by %. Pick the one that matches your question.",
      },
      {
        name: "Enter your values",
        text: "Type the number and the percentage into the input fields. The calculator accepts whole numbers, decimals, and comma-formatted numbers. Results update instantly as you type.",
      },
      {
        name: "Read the result",
        text: "The answer appears immediately with the formula used shown for reference. For increase and decrease modes, the absolute change is also shown alongside the percentage result.",
      },
      {
        name: "Use Reverse mode to find the original value",
        text: "Switch to Reverse mode when you know the final value and the percentage but need to recover the original. Enter the final value, the percentage, and select whether it was an increase or decrease.",
      },
      {
        name: "Apply Multi-Step changes",
        text: "Switch to Multi-Step mode for scenarios where a value passes through several percentage changes in sequence. Add each step and the calculator tracks the running value after every stage plus the cumulative net change.",
      },
      {
        name: "Process a list with Batch mode",
        text: "Switch to Batch mode, paste numbers one per line, select your formula and percentage, and every number is processed simultaneously. Click Export CSV to download the full output.",
      },
    ],
    faq: [
      {
        q: "What is a percentage calculator and what problems does it solve?",
        a: "A percentage calculator solves the four core percentage problems: finding X% of a number, finding what percentage one number is of another, calculating a result after a percentage increase or decrease, and recovering the original value before a percentage change. Each uses a different formula, and this tool handles all four in one place.",
      },
      {
        q: "How do I calculate what percentage X is of Y?",
        a: "Divide X by Y and multiply by 100. For example, 45 is what percent of 180? 45 divided by 180 times 100 equals 25%. In Basic mode, select the X is what percent of Y formula, enter 45 and 180, and the calculator returns 25 instantly.",
      },
      {
        q: "How do I calculate X% of a number?",
        a: "Multiply the number by the percentage divided by 100. To find 18% of $250: 250 times (18 divided by 100) equals $45. In Basic mode, select What is X% of Y, enter 18 and 250, and the result is $45. This formula is used for tips, tax amounts, discounts, commissions, and portion sizes.",
      },
      {
        q: "How do I increase or decrease a number by a percentage?",
        a: "To increase: multiply the value by (1 plus percent divided by 100). To decrease: multiply by (1 minus percent divided by 100). A $340 product with 8% VAT becomes 340 times 1.08 which equals $367.20. The same product at a 15% discount becomes 340 times 0.85 which equals $289.",
      },
      {
        q: "How do I find the original value before a percentage was added or removed?",
        a: "Use Reverse mode. For an increase: original equals final divided by (1 plus percent divided by 100). For a decrease: original equals final divided by (1 minus percent divided by 100). If a price including 20% VAT is $144, the pre-tax price is $144 divided by 1.20 which equals $120.",
      },
      {
        q: "What is the difference between this calculator and the percentage increase/decrease calculator?",
        a: "This calculator covers all four percentage formula types. The percentage increase/decrease calculator specialises in change analysis between two values and adds batch mode for processing lists and multi-step compounding. Use this tool when your question is what is 15% of 200. Use the change calculator when your question is by how much did this value change between two points.",
      },
      {
        q: "What does Multi-Step mode do?",
        a: "Multi-Step mode applies a sequence of percentage increases and decreases to a starting value and shows the running total after each step. A value that receives a 12% increase, a 5% discount, and an 8% surcharge can be traced step by step. The final value and net percentage change from the original are shown at the end.",
      },
      {
        q: "How does Batch mode work?",
        a: "Batch mode applies a single percentage formula to an entire list of numbers at once. Paste one number per line, select your formula and percentage, and every row is processed simultaneously. You can export the output as a CSV file for use in spreadsheets without manual entry.",
      },
      {
        q: "Can I use this calculator for tax, tip, and discount calculations?",
        a: "Yes. For a tip, use What is X% of Y with your bill total and tip percentage. For adding tax, use Increase by % with your pre-tax amount and the tax rate. For finding the pre-tax price from a tax-inclusive total, use Reverse mode. For a discount, use Decrease by % for the discounted price.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. The values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. The CSV export in Batch mode generates the file locally on your device without any server-side processing.",
      },
    ],
  },
  features: [
    "Four formula modes: % of number, what % is X of Y, increase by %, decrease by %",
    "Absolute change shown alongside the percentage result",
    "Formula displayed with each result for reference",
    "Reverse mode — find original value before a % was applied",
    "Multi-Step mode — chain increases and decreases sequentially",
    "Running value and net change shown after every step",
    "Batch mode — apply any formula to a full list at once",
    "CSV export of batch results",
    "Results update instantly as you type",
    "100% browser-based — no server, no signup required",
  ],
  relatedTools: [
    "percentage-increase-decrease-calculator",
    "discount-calculator",
    "gst-vat-calculator",
    "tip-calculator",
    "profit-margin-calculator",
  ],
};
