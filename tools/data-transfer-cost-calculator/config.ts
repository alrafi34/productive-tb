import { siteConfig } from "@/config/site";

export const dataTransferCostCalculatorConfig = {
  slug: "data-transfer-cost-calculator",
  name: "Data Transfer Cost Calculator",
  description: "Estimate cloud data transfer, bandwidth, and egress costs instantly. Calculate transfer pricing for GB, TB, PB, binary or decimal units, monthly usage, and multiple currencies. Free browser-based tool.",
  category: "data-analytics",
  icon: "💰",
  free: true,
  relatedTools: [
    "storage-requirement-calculator",
    "cloud-cost-calculator",
    "download-time-calculator",
    "session-duration-calculator",
    "page-speed-score-calculator",
    "click-heatmap-density-calculator",
  ],
  seo: {
    title: "Data Transfer Cost Calculator — Estimate Cloud Bandwidth & Egress Costs | Productive Toolbox",
    description: "Estimate cloud data transfer, bandwidth, and egress costs instantly. Calculate transfer pricing for GB, TB, PB, binary or decimal units, monthly usage, and multiple currencies using this free online Data Transfer Cost Calculator.",
    keywords: [
      "data transfer cost calculator",
      "bandwidth cost calculator",
      "cloud egress cost calculator",
      "network transfer calculator",
      "data transfer pricing calculator",
      "cloud cost estimator",
      "cdn cost calculator",
      "aws data transfer calculator",
      "azure bandwidth calculator",
      "google cloud egress calculator",
      "transfer cost estimator",
      "internet bandwidth cost calculator",
      "egress fee calculator",
      "gib vs gb calculator",
      "binary decimal storage calculator",
      "cloud bandwidth pricing tool",
      "free data transfer calculator",
      "monthly bandwidth cost calculator",
      "object storage transfer calculator",
      "vps bandwidth calculator",
    ],
    openGraph: {
      title: "Data Transfer Cost Calculator — Estimate Cloud Bandwidth & Egress Costs",
      description: "Estimate cloud data transfer, bandwidth, and egress costs instantly across GB, TB, PB, binary or decimal units, and multiple currencies. Free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/data-transfer-cost-calculator`,
    },
    og: {
      title: "Data Transfer Cost Calculator — Estimate Cloud Bandwidth & Egress Costs",
      description: "Estimate cloud data transfer, bandwidth, and egress costs instantly across GB, TB, PB, binary or decimal units, and multiple currencies. Free and browser-based.",
      url: `${siteConfig.url}/tools/data-analytics/data-transfer-cost-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Data Size",
        text: "Type the amount of data being transferred and choose its unit — MB, MiB, GB, GiB, TB, TiB, PB, or PiB.",
      },
      {
        name: "Enter Your Transfer Price",
        text: "Type the price your provider charges and select the matching price unit — Per GB, Per GiB, Per TB, or Per TiB.",
      },
      {
        name: "Choose a Billing Period and Conversion Standard",
        text: "Select One-Time, Daily, Weekly, Monthly, Quarterly, or Yearly billing, and choose Decimal or Binary unit conversion.",
      },
      {
        name: "Read the Live Cost Estimate",
        text: "The estimated cost, normalized data size, and normalized price update instantly, along with monthly and yearly projections.",
      },
      {
        name: "Compare, Export, or Share",
        text: "Check the Decimal vs. Binary comparison table, then copy the result, export as CSV or JSON, print a report, or share the calculation via URL.",
      },
    ],
    faq: [
      {
        q: "What is a Data Transfer Cost Calculator?",
        a: "A Data Transfer Cost Calculator is a free browser-based tool that estimates the cost of transferring data between cloud providers, CDNs, VPS servers, object storage services, or APIs. You enter a data size, a price per unit, and a billing period, and it instantly calculates the estimated cost.",
      },
      {
        q: "How is the transfer cost calculated?",
        a: "Total Cost = Normalized Data Size × Normalized Unit Price. The calculator first converts your entered data size and price into a common base unit, then multiplies them together, applying your transfer count and billing period.",
      },
      {
        q: "What is the difference between GB and GiB?",
        a: "GB (gigabyte) traditionally means 1000 megabytes in the decimal system, while GiB (gibibyte) always means exactly 1024 mebibytes in the binary system. Many cloud providers historically used \"GB\" to mean what is technically a GiB, which is why this calculator includes a Decimal vs. Binary toggle.",
      },
      {
        q: "What does the Conversion Standard toggle actually change?",
        a: "MiB, GiB, TiB, and PiB are always calculated using 1024-based binary math, since that's their defined meaning. The Decimal vs. Binary toggle only changes how the ambiguous MB, GB, TB, and PB units are interpreted — Decimal mode uses 1000-based math, while Binary mode treats them the same as their binary counterparts.",
      },
      {
        q: "Why did my 8 TB transfer cost more when I selected Binary mode?",
        a: "Under Binary mode, 8 TB is treated as 8 × 1024 = 8,192 GB rather than 8 × 1000 = 8,000 GB, since many providers bill using binary-equivalent units labeled as decimal ones. At $0.05/GB, that's $409.60 instead of $400.00 — a real difference worth checking against your provider's actual billing documentation.",
      },
      {
        q: "What is the Transfer Count field for?",
        a: "Transfer Count lets you model repeated transfers within a single billing period — for example, 120 API calls per month each transferring the same data size — by multiplying the single-transfer cost by the count before projecting monthly and yearly totals.",
      },
      {
        q: "How are Monthly and Yearly costs projected?",
        a: "Based on your selected billing period, the calculator scales your period cost using standard period-to-month and period-to-year multipliers (for example, a weekly cost is multiplied by roughly 4.345 for a monthly estimate and by 52 for a yearly estimate).",
      },
      {
        q: "Does this calculator support cloud egress fees?",
        a: "Yes. Enter your cloud provider's published egress or bandwidth price per GB (or GiB), your expected transfer volume, and the calculator gives you an instant cost estimate — useful for AWS, Azure, Google Cloud, and CDN pricing comparisons.",
      },
      {
        q: "Can I calculate costs in currencies other than USD?",
        a: "Yes. The calculator supports USD, EUR, GBP, CAD, AUD, SGD, INR, BDT, and JPY. Select your currency and enter the price in that currency — the calculator does not perform currency conversion, only formatting.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your data size, pricing, and billing details are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
