import { siteConfig } from "@/config/site";

export const emailClickRateCalculatorConfig = {
  slug: "email-click-rate-calculator",
  name: "Email Click Rate Calculator",
  description: "Calculate your email click rate (CTR) instantly from unique clicks and delivered emails. Free browser-based calculator with industry benchmark comparison, exportable reports, and calculation history.",
  category: "marketing",
  icon: "📧",
  free: true,
  seo: {
    title: "Free Email Click Rate Calculator (CTR) – Calculate Email Click Rate Instantly",
    description: "Calculate your email click rate (CTR) instantly using our free Email Click Rate Calculator. Measure campaign performance, compare industry benchmarks, and improve email marketing results with real-time calculations.",
    keywords: [
      "email click rate calculator",
      "email ctr calculator",
      "calculate email click rate",
      "email campaign calculator",
      "email marketing ctr",
      "click rate calculator",
      "email analytics",
      "email performance calculator",
      "email campaign metrics",
      "marketing calculator",
    ],
    openGraph: {
      title: "Free Email Click Rate Calculator",
      description: "Calculate email click rate instantly, compare performance against industry benchmarks, and improve your email marketing campaigns.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/email-click-rate-calculator`,
    },
  },
};
