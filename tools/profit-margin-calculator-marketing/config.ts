import { siteConfig } from "@/config/site";

export const profitMarginCalculatorMarketingConfig = {
  slug: "profit-margin-calculator-marketing",
  name: "Profit Margin Calculator",
  description:
    "Calculate profit margin, markup, selling price, cost price, and profit instantly. Free online profit margin calculator for ecommerce, retail, and business — 100% browser-based.",
  category: "marketing",
  icon: "💰",
  free: true,
  seo: {
    title:
      "Profit Margin Calculator – Free Online Margin, Profit & Markup Calculator",
    description:
      "Calculate profit margin, markup, selling price, cost price, and profit instantly using this free online Profit Margin Calculator. Fast, accurate, mobile-friendly, and completely browser-based.",
    keywords: [
      "profit margin calculator",
      "margin calculator",
      "markup calculator",
      "profit calculator",
      "selling price calculator",
      "cost price calculator",
      "gross profit calculator",
      "retail margin calculator",
      "ecommerce profit calculator",
      "online profit calculator",
      "profit percentage calculator",
      "business profit calculator",
    ],
    openGraph: {
      title: "Free Profit Margin Calculator – Calculate Margin & Markup Instantly",
      description:
        "Calculate profit margin, markup, and selling price instantly. Supports multiple modes and currencies. No signup required.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/profit-margin-calculator-marketing`,
    },
    howToSteps: [
      { name: "Choose a Calculation Mode", text: "Select Profit Margin, Markup, Find Selling Price, Find Cost Price, or Revenue & Total Cost depending on what you know and what you need to find out." },
      { name: "Enter Your Numbers", text: "Fill in cost price, selling price, or revenue depending on the selected mode. The calculator validates inputs in real time and flags errors before calculating." },
      { name: "Select a Currency", text: "Choose from 12 supported currencies. Currency applies to display formatting only — no conversion is performed." },
      { name: "Read the Results", text: "Profit, margin %, markup %, and a profitability badge (Excellent/Good/Average/Low/Loss) update instantly as you type, with a plain-language interpretation." },
      { name: "Review the Formula Breakdown", text: "The step-by-step calculation shows exactly how each number was derived — useful for double-checking inputs or explaining results to stakeholders." },
      { name: "Export or Share", text: "Copy the result to clipboard, export as CSV or TXT, or use the shareable URL to send the exact calculation with all inputs pre-filled." },
    ],
    faq: [
      { q: "What is profit margin?", a: "Profit margin is the percentage of revenue that remains as profit after costs are deducted. It is the most important financial metric for evaluating whether a business model is viable. A higher margin means more profit is retained per dollar of revenue." },
      { q: "What is the difference between margin and markup?", a: "Margin is calculated as a percentage of selling price: ((Selling − Cost) ÷ Selling) × 100. Markup is calculated as a percentage of cost: ((Selling − Cost) ÷ Cost) × 100. For the same product, markup is always a larger number than margin. A 50% markup equals a 33.33% margin." },
      { q: "What is a good profit margin?", a: "A good margin depends on the industry. Digital products achieve 60–85%. SaaS targets 20–40%. Ecommerce typically lands at 10–20%. Restaurants operate at 3–9%. The key is whether your margin covers fixed costs, sustains growth, and rewards investors." },
      { q: "How do I calculate selling price from a target margin?", a: "Use: Selling Price = Cost Price ÷ (1 − Target Margin %). For example, $50 cost ÷ (1 − 0.40) = $83.33. The common mistake is multiplying cost by (1 + margin%) — that calculates markup, not margin." },
      { q: "What is gross margin vs net margin?", a: "Gross margin deducts only cost of goods sold from revenue. Net margin deducts all expenses including operating costs, salaries, interest, and taxes. Gross margin measures production efficiency; net margin measures overall business profitability." },
      { q: "How do I increase profit margin?", a: "Raise selling price — even 5% improvement dramatically improves margin. Reduce COGS through supplier negotiation. Eliminate low-margin products. Increase average order value through upsells. Price increases are generally the fastest and most impactful lever." },
      { q: "What is the margin on a 50% markup?", a: "A 50% markup equals a 33.33% margin. If a product costs $60 and you mark it up 50%, the selling price is $90. Profit is $30. Margin = $30 ÷ $90 = 33.33%. Markup is always a larger percentage than margin for the same transaction." },
      { q: "How does promotional pricing affect margin?", a: "A product with a 30% regular margin sold at a 20% discount has a net margin of only 12.5% — less than half the regular margin. The discount comes entirely from profit. Always calculate margin at the promotional price before approving campaigns." },
      { q: "Can this calculator be used for service businesses?", a: "Yes. Set cost to zero or to direct labour and tool costs per engagement. Your selling price is your fee. For Revenue & Total Cost mode, enter total billings as revenue and total operating costs as total cost." },
      { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser. Your cost prices, selling prices, and margin targets are never transmitted to any server or stored in any database." },
    ],
  },
};
