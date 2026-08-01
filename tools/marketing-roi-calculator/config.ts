import { siteConfig } from "@/config/site";

export const marketingRoiCalculatorConfig = {
  slug: "marketing-roi-calculator",
  name: "Marketing ROI Calculator",
  description: "Calculate marketing ROI, net profit, and profit ratio instantly from campaign cost and revenue. Compare multiple campaigns, track history and favorites, and visualize performance with an ROI gauge and chart. Free browser-based marketing ROI calculator.",
  category: "marketing",
  icon: "📊",
  free: true,
  relatedTools: [
    "roi-calculator-marketing",
    "cost-per-acquisition-cpa-calculator",
    "cost-per-click-cpc-calculator",
    "profit-margin-calculator-marketing",
    "break-even-calculator",
    "customer-lifetime-value-calculator",
  ],
  seo: {
    title: "Marketing ROI Calculator — Free Campaign Return on Investment Tool | Productive Toolbox",
    description: "Calculate marketing ROI instantly from campaign cost and revenue. Measure net profit, profit ratio, and performance, compare campaigns, and export reports — free and browser-based.",
    keywords: [
      "marketing roi calculator",
      "roi calculator",
      "campaign roi calculator",
      "advertising roi calculator",
      "digital marketing roi",
      "return on investment calculator",
      "marketing performance calculator",
      "ppc roi calculator",
      "google ads roi calculator",
      "facebook ads roi",
      "online roi calculator",
      "free roi calculator",
      "marketing campaign calculator",
      "net profit calculator marketing",
      "profit ratio calculator",
      "campaign profitability calculator",
      "marketing budget calculator",
      "ad spend roi calculator",
      "roi percentage calculator",
      "marketing analytics tool",
    ],
    openGraph: {
      title: "Marketing ROI Calculator — Free Campaign Return on Investment Tool",
      description: "Calculate marketing ROI, net profit, and profit ratio instantly from campaign cost and revenue. Compare campaigns and visualize performance — free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/marketing-roi-calculator`,
    },
    og: {
      title: "Marketing ROI Calculator — Free Campaign Return on Investment Tool",
      description: "Calculate marketing ROI, net profit, and profit ratio instantly from campaign cost and revenue. Compare campaigns and visualize performance — free and browser-based.",
      url: `${siteConfig.url}/tools/marketing/marketing-roi-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Campaign Details",
        text: "Optionally name your campaign, then select your currency and enter the total marketing cost and revenue generated. You can also click a quick example to load sample data.",
      },
      {
        name: "Read the Live ROI Result",
        text: "The ROI percentage, net profit, profit ratio, and performance badge update instantly as you type, with the circular gauge and status color reflecting how the campaign performed.",
      },
      {
        name: "Review the Cost vs. Revenue Chart",
        text: "Check the canvas bar chart comparing marketing cost, revenue, and net profit side by side for a quick visual read of the campaign's financial outcome.",
      },
      {
        name: "Save and Compare Campaigns",
        text: "Save the campaign to history, mark important ones as favorites with the star icon, then select up to 4 saved campaigns to compare against your current calculation in a ranked ROI chart.",
      },
      {
        name: "Export or Share Your Results",
        text: "Copy the result or full report, download as CSV or JSON, print a report, or copy a shareable URL that preserves your exact campaign inputs.",
      },
    ],
    faq: [
      {
        q: "What is marketing ROI?",
        a: "Marketing ROI (Return on Investment) measures how much profit a marketing campaign generated relative to what it cost. It is calculated as ((Revenue minus Marketing Cost) divided by Marketing Cost) times 100, expressed as a percentage. A positive ROI means the campaign generated more revenue than it cost; a negative ROI means it lost money.",
      },
      {
        q: "How is marketing ROI calculated?",
        a: "Marketing ROI is calculated using the formula ROI (%) = ((Revenue − Marketing Cost) ÷ Marketing Cost) × 100. For example, a campaign costing $1,000 that generates $3,500 in revenue has a profit of $2,500 and an ROI of 250%.",
      },
      {
        q: "What is a good marketing ROI?",
        a: "A commonly cited benchmark is a 5:1 revenue-to-cost ratio (400% ROI) as excellent, with 3:1 (200% ROI) considered good for many industries, though this varies significantly by channel, margin, and business model. A campaign with thin product margins may need a much higher ROI to be worthwhile, while a high-margin SaaS business might accept a lower ROI for long-term customer value.",
      },
      {
        q: "What is the difference between ROI and profit ratio?",
        a: "ROI expresses the return as a percentage of the cost — a 250% ROI means you earned two and a half times your cost back as profit. Profit ratio (also called ROAS in advertising) expresses total revenue as a multiple of cost — a 3.5× ratio means every $1 spent returned $3.50 in revenue. The two numbers are related: Profit Ratio = (ROI ÷ 100) + 1.",
      },
      {
        q: "What does a negative ROI mean?",
        a: "A negative ROI means the campaign generated less revenue than it cost to run, resulting in a net loss. For example, a $3,000 campaign that generates $2,400 in revenue has a $600 loss and an ROI of -20%. This doesn't necessarily mean the campaign should be abandoned immediately — it may still be building brand awareness or top-of-funnel demand that converts later.",
      },
      {
        q: "Can I compare multiple marketing campaigns at once?",
        a: "Yes. Save each campaign to history using Save to History, then use the Compare button on up to 4 saved campaigns to see them ranked side by side against your current calculation by ROI percentage, making it easy to identify your best and worst-performing channels.",
      },
      {
        q: "What counts as marketing cost in this calculator?",
        a: "Marketing cost should include all direct spend attributable to the campaign — ad spend, agency or freelancer fees, creative production costs, tools or software specific to the campaign, and any paid promotion. It typically excludes fixed overhead costs unrelated to the specific campaign being measured.",
      },
      {
        q: "Should I use gross revenue or profit-adjusted revenue in this calculator?",
        a: "This calculator's Revenue Generated field is designed for total revenue attributed to the campaign. For a more precise profitability view (accounting for product cost of goods sold), calculate ROI using gross profit instead of gross revenue as the Revenue Generated figure — the same ROI formula applies either way.",
      },
      {
        q: "Why does marketing cost need to be greater than zero?",
        a: "The ROI formula divides by marketing cost, which is mathematically undefined at zero. If a channel truly had no direct cost (e.g. pure organic traffic), ROI in the traditional sense doesn't apply — consider using a metric like revenue per visitor instead.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your campaign names, costs, revenue figures, and saved history are never transmitted to any server, stored in any database, or accessible to anyone other than you. History and favorites are stored only in your browser's local storage.",
      },
    ],
  },
};
