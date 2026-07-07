import { siteConfig } from "@/config/site";

export const costPerAcquisitionCpaCalculatorConfig = {
  slug: "cost-per-acquisition-cpa-calculator",
  name: "Cost Per Acquisition (CPA) Calculator",
  description:
    "Calculate Cost Per Acquisition (CPA) instantly from marketing spend and total conversions. Free online CPA calculator for Google Ads, Facebook Ads, PPC campaigns, and digital marketing.",
  category: "marketing",
  icon: "🎯",
  free: true,
  seo: {
    title:
      "Free Cost Per Acquisition (CPA) Calculator Online | Calculate CPA Instantly",
    description:
      "Calculate Cost Per Acquisition (CPA) instantly using our free online calculator. Enter your marketing spend and total acquisitions to get accurate CPA metrics in real time. Fast, mobile-friendly, and 100% browser-based.",
    keywords: [
      "cost per acquisition calculator",
      "CPA calculator",
      "customer acquisition cost calculator",
      "marketing CPA calculator",
      "advertising CPA calculator",
      "calculate CPA online",
      "cost per conversion calculator",
      "Google Ads CPA calculator",
      "Facebook Ads CPA calculator",
      "digital marketing calculator",
      "free CPA tool",
      "marketing calculator",
      "acquisition cost calculator",
      "PPC CPA calculator",
    ],
    openGraph: {
      title: "Free CPA Calculator – Calculate Cost Per Acquisition Instantly",
      description:
        "Quickly calculate your marketing Cost Per Acquisition (CPA) using this free online calculator. Works instantly with no signup required.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/cost-per-acquisition-cpa-calculator`,
    },
    howToSteps: [
      { name: "Enter Total Marketing Spend", text: "Type the total amount spent on your campaign for the period — gross spend from your ad platform billing summary, including all costs attributable to acquisition." },
      { name: "Enter Total Acquisitions", text: "Type the number of customers, conversions, or leads acquired during the same period. Ensure the conversion count matches the same date window as your spend." },
      { name: "Select Your Currency", text: "Choose from 10 supported currencies. Currency applies to display formatting only — no conversion is performed." },
      { name: "Use Industry Presets (Optional)", text: "Click a preset to load a typical spend and acquisition scenario for your industry — useful for benchmarking your current CPA." },
      { name: "Read the Performance Badge", text: "Your CPA appears instantly with a badge — Excellent, Good, Average, High, or Very High — and a plain-language interpretation." },
      { name: "Export or Share", text: "Copy to clipboard, export as CSV or TXT, or use the shareable URL to send the exact calculation to a colleague, client, or investor." },
    ],
    faq: [
      { q: "What is Cost Per Acquisition (CPA)?", a: "Cost Per Acquisition (CPA) is the average amount spent in marketing to acquire one customer, lead, or conversion. It is calculated by dividing total marketing spend by the number of acquisitions in the same period. CPA is the most direct measure of paid acquisition efficiency." },
      { q: "How is CPA calculated?", a: "CPA is calculated by dividing total marketing spend by the number of acquisitions. For example, if you spent $4,500 and acquired 90 customers, your CPA is $4,500 ÷ 90 = $50." },
      { q: "What is a good CPA?", a: "A good CPA is one below your maximum viable CPA — calculated as average order value × gross margin percentage. Any CPA below that threshold means each acquisition contributes positively to profit. There is no universal good CPA; it is always relative to what an acquired customer is worth." },
      { q: "What is the difference between CPA and CPC?", a: "CPC measures the cost of each click on your ad. CPA measures the cost of each conversion. CPA = CPC ÷ Conversion Rate. A low CPC does not guarantee a low CPA — landing page conversion rate is the bridge between the two." },
      { q: "What is Target CPA (tCPA) in Google Ads?", a: "Target CPA is a Smart Bidding strategy where Google automatically sets bids to try to achieve your specified CPA goal on average. It requires at least 30–50 conversions per month per campaign to perform well." },
      { q: "What is the difference between CPA and CAC?", a: "CPA refers to a specific campaign or channel metric — the direct media cost of one conversion. CAC is a broader business metric including all sales and marketing expenses divided by all new customers. CAC is always higher than channel CPA." },
      { q: "How do I reduce my CPA?", a: "Improve landing page conversion rate, tighten audience targeting, improve ad creative to increase CTR, add negative keywords, and improve the post-click experience. Reducing CPC alone rarely produces sustained CPA improvements without also addressing conversion rate." },
      { q: "What is a good CPA:LTV ratio?", a: "A CPA:LTV ratio of 1:3 or better is the standard benchmark — each customer generates at least three times what it cost to acquire them. Ratios above 1:5 suggest underinvestment in growth. Ratios below 1:1 mean the business loses money on every customer." },
      { q: "How does attribution model affect CPA?", a: "Last-click attribution assigns 100% of credit to the final touchpoint — understating top-of-funnel channel contribution and overstating their CPA. Data-driven attribution distributes credit across touchpoints for more accurate per-channel CPAs." },
      { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser. Your marketing spend figures and acquisition counts are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
    ],
  },
};
