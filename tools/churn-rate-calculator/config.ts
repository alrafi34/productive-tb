import { siteConfig } from "@/config/site";

export const churnRateCalculatorConfig = {
  slug: "churn-rate-calculator",
  name: "Churn Rate Calculator",
  description: "Calculate customer churn rate, revenue churn, net revenue churn, and monthly/quarterly/annual churn instantly. Free browser-based churn calculator with retention benchmarks, LTV, and health scoring for SaaS and subscription businesses.",
  category: "marketing",
  icon: "📉",
  free: true,
  seo: {
    title: "Free Churn Rate Calculator | Customer Churn Percentage Calculator Online",
    description: "Calculate customer churn rate instantly with this free online churn rate calculator. Measure customer retention, compare industry benchmarks, analyze revenue churn, and improve business growth.",
    keywords: [
      "churn rate calculator",
      "customer churn calculator",
      "customer retention calculator",
      "revenue churn calculator",
      "subscription churn calculator",
      "monthly churn calculator",
      "annual churn calculator",
      "saas churn calculator",
      "net revenue churn",
      "customer retention metrics",
    ],
    openGraph: {
      title: "Free Churn Rate Calculator",
      description: "Calculate customer churn, revenue churn, and retention rate instantly — with industry benchmarks, LTV, and exportable reports, all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/churn-rate-calculator`,
    },
  },
};
