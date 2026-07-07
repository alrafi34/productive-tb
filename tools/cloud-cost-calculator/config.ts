import { siteConfig } from "@/config/site";

export const cloudCostCalculatorConfig = {
  slug: "cloud-cost-calculator",
  name: "Cloud Cost Calculator",
  description: "Estimate cloud infrastructure costs instantly across AWS, Google Cloud, Azure, DigitalOcean, Vercel, Railway, Fly.io, and more. Real-time pricing breakdowns with provider comparisons.",
  category: "computer-science",
  icon: "☁️",
  color: "#058554",
  featured: true,
  keywords: [
    "cloud cost calculator",
    "AWS pricing calculator",
    "GCP cost estimator",
    "Azure pricing calculator",
    "cloud pricing tool",
    "server cost calculator",
    "hosting cost estimator",
    "DevOps calculator",
    "DigitalOcean pricing",
    "cloud infrastructure cost",
  ],
  seo: {
    title: "Free Cloud Cost Calculator – Estimate AWS, GCP & Azure Pricing",
    description: "Estimate cloud infrastructure costs instantly. Compare AWS, Google Cloud, Azure, DigitalOcean, Vercel, Railway, and more with real-time pricing breakdowns.",
    keywords: "cloud cost calculator, AWS pricing calculator, GCP cost estimator, Azure pricing calculator, cloud pricing tool, server cost calculator, hosting cost estimator, DevOps calculator",
    og: {
      title: "Free Cloud Cost Calculator – Estimate AWS, GCP & Azure Pricing",
      description: "Estimate cloud infrastructure costs instantly with real-time breakdowns. Compare AWS, Google Cloud, Azure, DigitalOcean, Vercel, and more.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/cloud-cost-calculator`,
    },
  },
  relatedTools: [
    "ai-token-cost-calculator",
    "download-time-calculator",
    "latency-calculator",
    "bandwidth-calculator",
    "data-transfer-calculator",
    "time-complexity-calculator",
  ],
};

export const toolConfig = cloudCostCalculatorConfig;
