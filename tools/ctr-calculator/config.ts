import { siteConfig } from "@/config/site";

export const ctrCalculatorConfig = {
  slug: "ctr-calculator",
  name: "CTR Calculator",
  description: "Calculate click-through rate (CTR) instantly from clicks and impressions. Free online CTR calculator for SEO, Google Ads, PPC, email, and social media campaigns.",
  category: "marketing",
  icon: "📊",
  free: true,
  relatedTools: [
    "cost-per-click-cpc-calculator",
    "cost-per-acquisition-cpa-calculator",
    "conversion-rate-calculator",
    "keyword-density-checker",
    "profit-margin-calculator-marketing",
  ],
  seo: {
    title: "CTR Calculator — Free Click Through Rate Calculator Online | Productive Toolbox",
    description: "Calculate click-through rate (CTR) instantly from clicks and impressions. Free CTR calculator for Google Ads, Facebook, SEO, email, and Amazon PPC. Benchmarks by channel included.",
    keywords: [
      "ctr calculator",
      "click through rate calculator",
      "calculate ctr",
      "ctr formula",
      "what is a good ctr",
      "ctr google ads",
      "ctr seo",
      "click rate calculator",
      "impressions to ctr calculator",
      "ctr percentage calculator",
      "google ads ctr calculator",
      "facebook ads ctr",
      "email ctr calculator",
      "organic ctr calculator",
      "amazon ppc ctr",
      "ctr benchmarks by channel",
      "ppc ctr calculator",
      "good ctr for google ads",
      "good ctr for facebook ads",
      "ctr vs conversion rate",
      "free ctr calculator",
      "online ctr calculator",
      "click through rate formula",
    ],
    openGraph: {
      title: "CTR Calculator — Free Click Through Rate Calculator Online",
      description: "Calculate click-through rate instantly from clicks and impressions. Benchmarks for Google Ads, Facebook, SEO, email, and Amazon PPC included.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/ctr-calculator`,
    },
    og: {
      title: "CTR Calculator — Free Click Through Rate Calculator Online",
      description: "Calculate click-through rate instantly from clicks and impressions. Benchmarks for Google Ads, Facebook, SEO, email, and Amazon PPC included.",
      url: `${siteConfig.url}/tools/marketing/ctr-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Clicks",
        text: "Type the total number of clicks your ad, link, or search result received during the measurement period. Use the exact figure from your ad platform — Google Ads, Facebook Ads Manager, Google Search Console, or your email marketing dashboard.",
      },
      {
        name: "Enter Your Impressions",
        text: "Type the total number of times your content was shown to users. In Google Ads and GSC this is labeled Impressions. In email platforms check whether your platform uses Delivered or Opens as the denominator.",
      },
      {
        name: "Read the CTR and Performance Badge",
        text: "CTR updates instantly as you type. A performance badge contextualizes the result against channel benchmarks. Refer to the benchmark table on the page for channel-specific context.",
      },
      {
        name: "Compare Periods or Campaigns",
        text: "Use the calculation history panel to compare multiple campaigns or time periods side by side without re-entering values. Each calculation is saved locally in your browser.",
      },
      {
        name: "Export or Share",
        text: "Click Copy to send the result and full breakdown to clipboard, or Download to save as TXT or CSV. The shareable URL encodes your current inputs so you can send the exact calculation to a colleague.",
      },
    ],
    faq: [
      {
        q: "What is CTR (click-through rate)?",
        a: "CTR (click-through rate) is the percentage of people who clicked on an ad, link, or search result out of the total number who saw it. CTR = (Clicks divided by Impressions) times 100. It is the foundational engagement metric in digital marketing, measuring how effectively your headline, ad copy, or meta description converts impressions into traffic.",
      },
      {
        q: "How is CTR calculated?",
        a: "CTR is calculated by dividing the number of clicks by the number of impressions, then multiplying by 100. For example, 150 clicks from 5,000 impressions gives (150 divided by 5,000) times 100 = 3.00% CTR. The formula is the same across all platforms — only the benchmarks differ by channel.",
      },
      {
        q: "What is a good CTR for Google Ads?",
        a: "For Google Search Ads, a CTR of 2 to 5 percent is considered typical across most industries, with 5 percent or above being strong. Branded keyword campaigns often achieve 10 to 20 percent CTR. Google Display Ads have a much lower baseline of 0.05 to 0.3 percent due to banner blindness and lower audience intent.",
      },
      {
        q: "What is a good CTR for Facebook ads?",
        a: "For Facebook and Instagram feed ads, a CTR of 0.5 to 1.5 percent is the typical range, with 2 percent or above being strong. Video and carousel ads tend to outperform single-image ads. Retargeting campaigns aimed at warm audiences generally achieve 2 to 4 times higher CTR than cold-audience prospecting.",
      },
      {
        q: "What is a good organic CTR for SEO?",
        a: "Organic CTR depends heavily on search position. Position 1 averages 25 to 30 percent CTR. Position 2 to 3 averages 10 to 15 percent. Position 4 to 5 drops to 3 to 6 percent. Position 10 averages 1 to 2 percent. Rich snippets and FAQ markup can significantly lift CTR above these averages at the same ranking position.",
      },
      {
        q: "What is the difference between CTR and conversion rate?",
        a: "CTR measures the percentage of impressions that resulted in a click. Conversion rate measures the percentage of clicks that resulted in a desired action — a purchase, form submission, or sign-up. CTR tells you whether your ad is attracting attention. Conversion rate tells you whether your landing page is convincing visitors to act. Both are needed together to evaluate full campaign efficiency.",
      },
      {
        q: "Does CTR affect Google Ads Quality Score?",
        a: "Yes. Expected CTR is one of the three components of Google Ads Quality Score alongside ad relevance and landing page experience. A higher expected CTR improves your Quality Score, raises your Ad Rank, and can lower your actual cost per click for the same bid. Improving CTR through better ad copy is one of the most direct ways to reduce CPC.",
      },
      {
        q: "Does CTR affect SEO rankings?",
        a: "Google has not officially confirmed CTR as a direct ranking factor, but optimizing title tags and meta descriptions to improve CTR directly increases organic traffic from current rankings — you get more visitors without needing to move up in position. This makes CTR optimization one of the highest-ROI SEO tasks for pages already on page 1.",
      },
      {
        q: "Can CTR be over 100%?",
        a: "In most platforms CTR cannot exceed 100 percent for standard tracking. If you see CTR above 100 percent it usually indicates a tracking configuration issue, mismatched date ranges between click and impression data, or bot traffic inflating click counts.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your clicks, impressions, and any campaign data you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
