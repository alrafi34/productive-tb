import { siteConfig } from "@/config/site";

export const roiCalculatorMarketingConfig = {
  slug: "roi-calculator-marketing",
  name: "ROI Calculator",
  description: "Calculate ROI instantly using the return on investment formula. Free online ROI calculator for marketing campaigns, Google Ads, SEO, email, and business investments.",
  category: "marketing",
  icon: "💰",
  free: true,
  relatedTools: [
    "cost-per-click-cpc-calculator",
    "cost-per-acquisition-cpa-calculator",
    "conversion-rate-calculator",
    "profit-margin-calculator-marketing",
    "break-even-calculator",
  ],
  seo: {
    title: "ROI Calculator — Free Return on Investment Formula Calculator | Productive Toolbox",
    description: "Calculate ROI instantly using the formula ((Revenue − Investment) ÷ Investment) × 100. Free ROI calculator for marketing campaigns, Google Ads, email, and business investments.",
    keywords: [
      "roi calculator",
      "return on investment calculator",
      "roi formula",
      "return on investment formula",
      "roi equation",
      "roi calculation formula",
      "marketing roi calculator",
      "marketing roi formula",
      "roi calculate",
      "calculate roi",
      "investment roi calculator",
      "roi return on investment",
      "simple roi calculator",
      "roi percentage calculator",
      "advertising roi calculator",
      "digital marketing roi calculator",
      "ad spend roi calculator",
      "online roi calculator",
      "free roi calculator",
      "roi calculator for marketing",
      "rate of return calculator",
      "find roi",
      "roi analysis",
      "roi example",
      "roi calculation example",
      "roas vs roi",
      "marketing roi formula",
    ],
    openGraph: {
      title: "ROI Calculator — Free Return on Investment Formula Calculator",
      description: "Calculate ROI instantly using the formula ((Revenue − Investment) ÷ Investment) × 100. Marketing benchmarks and formula reference included.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/roi-calculator-marketing`,
    },
    og: {
      title: "ROI Calculator — Free Return on Investment Formula Calculator",
      description: "Calculate ROI instantly using the formula ((Revenue − Investment) ÷ Investment) × 100. Marketing benchmarks and formula reference included.",
      url: `${siteConfig.url}/tools/marketing/roi-calculator-marketing`,
    },
    howToSteps: [
      {
        name: "Enter Your Investment",
        text: "Type the total amount invested — for marketing campaigns include ad spend, agency fees, creative production, and tool costs. Understating investment inflates ROI. Use total cost, not just ad spend.",
      },
      {
        name: "Enter Your Revenue",
        text: "Type the total revenue or return generated directly from this investment. For marketing use attributed revenue from your analytics platform. For ecommerce, use gross margin dollars for true profitability.",
      },
      {
        name: "Select Your Currency",
        text: "Choose from 9 supported currencies including USD, EUR, GBP, INR, and AED. Currency formatting is applied to the output only — no conversion is performed.",
      },
      {
        name: "Read ROI, Profit, and Performance Badge",
        text: "Results update instantly showing ROI percentage, net profit or loss, revenue multiplier, and a performance badge. The plain-language interpretation explains what the number means in context.",
      },
      {
        name: "Export or Share",
        text: "Copy to clipboard, download as CSV or TXT, or use the shareable URL to send the exact calculation with all inputs pre-filled to a client or colleague.",
      },
    ],
    faq: [
      {
        q: "What is the ROI formula?",
        a: "The ROI formula is: ROI = ((Revenue minus Investment) divided by Investment) times 100. If you invested $5,000 and generated $12,500 in revenue, your ROI is (($12,500 minus $5,000) divided by $5,000) times 100 = 150 percent. Above 0 percent means profit, below 0 percent means loss, exactly 0 percent is break-even.",
      },
      {
        q: "What is a good ROI for marketing?",
        a: "A marketing ROI of 5 to 1 (500 percent) is considered strong and 10 to 1 (1,000 percent) is exceptional. Google Ads typically delivers 100 to 200 percent ROI. Email marketing can exceed 3,600 percent. SEO compounds to 200 to 400 percent over time. The best benchmark is your own historical average — improving that by 20 percent is more actionable than chasing an industry figure.",
      },
      {
        q: "What is the marketing ROI formula?",
        a: "The marketing ROI formula is the standard ROI formula applied to marketing spend: ((Revenue Attributed to Campaign minus Marketing Cost) divided by Marketing Cost) times 100. The critical variable is attributed revenue — use your analytics attribution model, not total revenue during the campaign period.",
      },
      {
        q: "What is the difference between ROI and ROAS?",
        a: "ROAS (Return on Ad Spend) equals revenue divided by ad spend only — it excludes all other costs. ROI uses total investment including COGS, fulfillment, and overhead. A 400 percent ROAS sounds strong but may be a negative ROI once all costs are included. Always calculate ROI using full cost, not just ad spend, when evaluating true profitability.",
      },
      {
        q: "Can ROI be negative?",
        a: "Yes. A negative ROI means the investment cost more than it returned. A $10,000 investment generating $8,000 in revenue has a negative 20 percent ROI. Negative ROI is common in early-stage campaigns before optimization, brand awareness investments with deferred returns, and market-entry strategies.",
      },
      {
        q: "What is the ROI equation for real estate?",
        a: "For rental property, ROI is typically annual net income divided by total investment times 100. Annual net income equals rental revenue minus all operating expenses. Total investment equals the down payment plus closing costs and renovation costs. This is also expressed as cap rate or cash-on-cash return depending on the context.",
      },
      {
        q: "What is the difference between ROI and rate of return?",
        a: "ROI is a simple profit-to-cost percentage for a specific investment with no time dimension. Rate of return typically refers to the annualized return, incorporating how quickly the investment paid back. A 50 percent ROI over 2 years equals approximately 22.5 percent annualized rate of return. For long-term investments, annualized rate of return is more meaningful.",
      },
      {
        q: "How do I calculate ROI for a Google Ads campaign?",
        a: "Pull total campaign cost including any agency fees and total attributed revenue from Google Ads conversion tracking for the same date range. For ecommerce, use gross margin dollars as revenue rather than gross sales. A 4x ROAS with 40 percent margin equals 60 percent ROI. A 4x ROAS with 20 percent margin is a negative 20 percent ROI.",
      },
      {
        q: "What is break-even ROI?",
        a: "Break-even ROI is 0 percent — revenue exactly equals investment with neither profit nor loss. Break-even analysis sets minimum performance targets before a campaign launches. If break-even requires conditions you cannot realistically achieve, the campaign economics are unworkable at current pricing.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your investment figures, revenue amounts, and any campaign data you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
