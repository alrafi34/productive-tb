import { siteConfig } from "@/config/site";

export const conversionRateCalculatorConfig = {
  slug: "conversion-rate-calculator",
  name: "Conversion Rate Calculator",
  description: "Calculate conversion rates instantly from visitors and conversions. Free online conversion rate calculator for ecommerce, PPC, SaaS, email marketing, and landing pages.",
  category: "marketing",
  icon: "📈",
  free: true,
  relatedTools: [
    "ctr-calculator",
    "cost-per-click-cpc-calculator",
    "cost-per-acquisition-cpa-calculator",
    "profit-margin-calculator-marketing",
    "break-even-calculator",
  ],
  seo: {
    title: "Conversion Rate Calculator — Free CVR Calculator Online | Productive Toolbox",
    description: "Calculate conversion rate instantly from visitors and conversions. Free CVR calculator for ecommerce, Google Ads, SaaS, email, and landing pages. Benchmarks by industry included.",
    keywords: [
      "conversion rate calculator",
      "calculate conversion rate",
      "cvr calculator",
      "website conversion rate calculator",
      "ecommerce conversion rate calculator",
      "landing page conversion rate calculator",
      "conversion rate formula",
      "what is a good conversion rate",
      "good conversion rate ecommerce",
      "conversion rate optimization calculator",
      "sales conversion rate calculator",
      "marketing conversion calculator",
      "conversion rate by industry",
      "google ads conversion rate calculator",
      "ppc conversion rate calculator",
      "email conversion rate calculator",
      "conversion rate benchmarks",
      "free conversion rate calculator",
      "online conversion rate calculator",
      "cro calculator",
      "visitor to conversion calculator",
      "conversion rate vs ctr",
    ],
    openGraph: {
      title: "Conversion Rate Calculator — Free CVR Calculator Online",
      description: "Calculate conversion rate instantly from visitors and conversions. Industry benchmarks for ecommerce, Google Ads, SaaS, and email included.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/conversion-rate-calculator`,
    },
    og: {
      title: "Conversion Rate Calculator — Free CVR Calculator Online",
      description: "Calculate conversion rate instantly from visitors and conversions. Industry benchmarks for ecommerce, Google Ads, SaaS, and email included.",
      url: `${siteConfig.url}/tools/marketing/conversion-rate-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Visitors",
        text: "Type the total number of visitors, sessions, or impressions for the period you are measuring. Pull this from Google Analytics, your ad platform, or your email dashboard. Make sure the time period matches your conversion data exactly.",
      },
      {
        name: "Enter Your Conversions",
        text: "Type the number of desired actions completed — purchases, sign-ups, downloads, or form submissions. Use the same source and date range as your visitor count.",
      },
      {
        name: "Read the Rate and Performance Badge",
        text: "Conversion rate appears instantly alongside a performance badge (Exceptional, Excellent, Good, Average, or Low) contextualized against general benchmarks. Refer to the industry benchmark table for channel-specific targets.",
      },
      {
        name: "Try Reverse Calculation Modes",
        text: "Use Visitors Needed mode to find what traffic volume is required to hit a conversion goal, or Conversions Needed mode to calculate conversions required for a target rate.",
      },
      {
        name: "Export or Share",
        text: "Click Copy to send the result to clipboard, or Download to save as TXT or CSV. The shareable URL encodes your inputs so you can share the exact calculation with a colleague.",
      },
    ],
    faq: [
      {
        q: "What is a conversion rate?",
        a: "A conversion rate is the percentage of visitors who complete a desired action — a purchase, sign-up, download, or form submission — out of the total number who visited a page or were exposed to a campaign. It is the most direct measure of how effectively marketing and user experience turns traffic into outcomes.",
      },
      {
        q: "How is conversion rate calculated?",
        a: "Conversion rate equals conversions divided by visitors, multiplied by 100. For example, 175 purchases divided by 5,000 visitors times 100 equals 3.50% CVR. The formula is consistent across all channels — only what counts as a conversion and what counts as a visitor changes by context.",
      },
      {
        q: "What is a good conversion rate?",
        a: "A good conversion rate depends on the channel. For ecommerce, 1 to 3 percent is typical with 3 to 5 percent being strong. For lead generation pages, 5 to 15 percent is average. For Google Search Ads, 3 to 6 percent is typical. The most useful benchmark is your own historical rate — improving that by 10 to 20 percent is more actionable than chasing an industry average.",
      },
      {
        q: "What is a good ecommerce conversion rate?",
        a: "For ecommerce, the average conversion rate is 1 to 3 percent across most product categories. Above 3.5 percent is considered strong and above 5 percent is excellent. Email and branded search traffic consistently converts 2 to 5 times better than cold display or social traffic from the same store.",
      },
      {
        q: "What is the difference between conversion rate and CTR?",
        a: "CTR measures the percentage of people who clicked an ad or link out of everyone who saw it. Conversion rate measures the percentage of those who visited who then completed a goal. CTR is a top-of-funnel metric measuring ad appeal. Conversion rate is further down the funnel, measuring how well your landing page and offer close the deal.",
      },
      {
        q: "What is the relationship between conversion rate and CPA?",
        a: "Cost Per Acquisition equals CPC divided by conversion rate. At a $2.00 CPC and 4 percent CVR, CPA is $50. Doubling CVR from 4 to 8 percent cuts CPA in half from $50 to $25 without changing spend. This is why conversion rate optimization is often the highest-ROI marketing investment — improvements compound across all traffic sources simultaneously.",
      },
      {
        q: "How do I improve my conversion rate?",
        a: "The highest-leverage improvements are: improving page speed (1 second faster can lift CVR 7 percent), clarifying the value proposition above the fold, adding social proof and trust signals, simplifying forms (each extra field reduces submissions 10 to 15 percent), improving traffic quality, and A/B testing headlines and CTAs systematically.",
      },
      {
        q: "What is micro vs macro conversion rate?",
        a: "A macro conversion is your primary goal such as a purchase or subscription. A micro conversion is an intermediate step like an email opt-in or add to cart. Tracking micro conversions helps identify which funnel stage is the bottleneck — a high add-to-cart rate with a low cart-to-purchase rate points to a checkout problem, not a traffic problem.",
      },
      {
        q: "Can conversion rate be higher than 100%?",
        a: "Technically yes if a single visitor triggers multiple conversions, such as placing two orders in one session. If you see a CVR above 100 percent it almost always indicates a tracking misconfiguration, mismatched time periods between visitor and conversion data, or a definition mismatch between sessions and conversions.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your visitor counts, conversion figures, and any campaign data you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
