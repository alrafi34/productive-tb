import { siteConfig } from "@/config/site";

export const customerLifetimeValueCalculatorConfig = {
  slug: "customer-lifetime-value-calculator",
  name: "Customer Lifetime Value (CLV) Calculator",
  description:
    "Calculate Customer Lifetime Value (CLV) instantly using multiple formulas — Basic, Margin-Adjusted, Subscription, and SaaS. Free online CLV calculator for ecommerce, SaaS, and digital marketing.",
  category: "marketing",
  icon: "👥",
  free: true,
  seo: {
    title:
      "Free Customer Lifetime Value (CLV) Calculator Online | Calculate CLV Instantly",
    description:
      "Calculate Customer Lifetime Value (CLV) instantly using our free online calculator. Supports Basic, Margin-Adjusted, Subscription, and SaaS formulas. Mobile-friendly and 100% browser-based.",
    keywords: [
      "customer lifetime value calculator",
      "CLV calculator",
      "customer value calculator",
      "lifetime value calculator",
      "SaaS CLV calculator",
      "ecommerce CLV calculator",
      "marketing calculator",
      "customer profitability calculator",
      "LTV calculator",
      "business calculator",
      "free CLV calculator",
      "calculate customer lifetime value",
      "subscription lifetime value",
      "churn rate CLV",
    ],
    openGraph: {
      title:
        "Free CLV Calculator – Calculate Customer Lifetime Value Instantly",
      description:
        "Instantly calculate Customer Lifetime Value using four proven formulas. Works in the browser with no signup required.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/customer-lifetime-value-calculator`,
    },
    howToSteps: [
      { name: "Choose a Calculation Method", text: "Select Basic, Margin-Adjusted, Subscription, or SaaS. Pick the one that matches how your customers generate revenue." },
      { name: "Enter Your Business Inputs", text: "For Basic/Margin: enter Average Order Value, Purchase Frequency per year, and Customer Lifespan in years. For Subscription: monthly revenue and lifetime in months. For SaaS: ARPU and Monthly Churn Rate." },
      { name: "Add Gross Margin", text: "Enter your gross margin percentage to calculate profit-adjusted CLV rather than revenue CLV — the figure that matters for profitability decisions." },
      { name: "Add CAC (Optional)", text: "Enter your Customer Acquisition Cost to unlock Net CLV and CAC Payback Period — showing how much each customer is worth after acquisition cost and how many months to recover it." },
      { name: "Read and Export Results", text: "CLV, Net CLV, annual value, monthly value, and payback period update in real time. Export as CSV or TXT, copy to clipboard, or share via the permanent URL." },
    ],
    faq: [
      { q: "What is Customer Lifetime Value (CLV)?", a: "Customer Lifetime Value (CLV) is the total revenue or profit a business expects from a single customer over their entire relationship. It is the foundational metric for acquisition budgeting — setting the upper limit on how much you can spend to acquire a customer while remaining profitable." },
      { q: "What is the difference between CLV and LTV?", a: "CLV and LTV are used interchangeably in most business contexts. Both describe the total predicted value of a customer relationship. The underlying formulas are identical." },
      { q: "What is a good CLV:CAC ratio?", a: "A CLV:CAC ratio of 3:1 or higher is the standard benchmark — each customer generates at least three times what it cost to acquire them. Ratios above 5:1 are excellent. Ratios below 1:1 mean the business loses money on every customer acquired." },
      { q: "How does churn rate affect CLV in SaaS?", a: "Churn rate is the most powerful variable in SaaS CLV. Because CLV is divided by churn rate, small reductions produce large CLV increases. Reducing monthly churn from 5% to 3% increases CLV by 67% — this is why customer success investment has exceptional ROI in SaaS." },
      { q: "What is Net CLV?", a: "Net CLV is CLV minus Customer Acquisition Cost — the profit value of a customer relationship after deducting acquisition cost. A CLV of $1,200 and a CAC of $300 produces a Net CLV of $900." },
      { q: "What is CAC Payback Period?", a: "CAC Payback Period is the number of months to recover the Customer Acquisition Cost from monthly customer value. A 12-month payback means you are cash-flow negative on each new customer for one year before they become profitable." },
      { q: "What are the four CLV formulas?", a: "Basic CLV: AOV × Frequency × Lifespan. Margin-Adjusted: AOV × Frequency × Lifespan × Gross Margin. Subscription: Monthly Revenue × Lifetime (months) × Gross Margin. SaaS/Predictive: (ARPU × Gross Margin) ÷ Monthly Churn Rate." },
      { q: "How can I increase CLV?", a: "Increase Average Order Value through upsells and bundles. Increase Purchase Frequency through email and loyalty programs. Extend Customer Lifespan through better onboarding and retention. Improve Gross Margin through pricing optimisation. For SaaS, reducing churn is almost always the highest-leverage improvement." },
      { q: "Should I use revenue CLV or margin-adjusted CLV?", a: "Always use Margin-Adjusted CLV for profitability decisions. Basic CLV is revenue — it tells you how much a customer spends. Margin-adjusted CLV is profit — it tells you how much you keep. These can differ by 50–80%, and using the wrong one leads to drastically overstated acquisition budgets." },
      { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser. Your AOV, churn rate, ARPU, and CAC figures are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
    ],
  },
};
