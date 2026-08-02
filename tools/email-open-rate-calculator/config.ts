import { siteConfig } from "@/config/site";

export const emailOpenRateCalculatorConfig = {
  slug: "email-open-rate-calculator",
  name: "Email Open Rate Calculator",
  description: "Calculate your email open rate instantly from delivered emails and unique opens. Free browser-based calculator with industry benchmark comparison, exportable reports, and calculation history.",
  category: "marketing",
  icon: "📧",
  free: true,
  seo: {
    title: "Free Email Open Rate Calculator – Calculate Email Campaign Open Rate Online",
    description: "Calculate your email open rate instantly using our free Email Open Rate Calculator. Measure campaign performance, compare industry benchmarks, copy results, and export reports directly from your browser.",
    keywords: [
      "email open rate calculator",
      "open rate calculator",
      "email marketing calculator",
      "campaign open rate",
      "email campaign metrics",
      "calculate email open rate",
      "email analytics calculator",
      "marketing kpi calculator",
    ],
    openGraph: {
      title: "Free Email Open Rate Calculator",
      description: "Calculate email open rate instantly with real-time results, benchmarks, export options, and a modern browser-based interface.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/email-open-rate-calculator`,
    },
  },
};
