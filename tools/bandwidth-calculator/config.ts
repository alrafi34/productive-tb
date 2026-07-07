import { siteConfig } from "@/config/site";

export const bandwidthCalculatorConfig = {
  slug: "bandwidth-calculator",
  name: "Bandwidth Calculator",
  description: "Estimate internet bandwidth usage, file transfer time, monthly website traffic, streaming data consumption, and multi-user bandwidth requirements instantly in your browser.",
  category: "computer-science",
  icon: "📡",
  free: true,
  seo: {
    title: "Bandwidth Calculator – Estimate Internet Usage, Speed & Data Transfer",
    description: "Free online bandwidth calculator to estimate internet usage, transfer speed, monthly traffic, streaming data consumption, and bandwidth requirements instantly.",
    keywords: [
      "bandwidth calculator",
      "internet bandwidth calculator",
      "transfer time calculator",
      "monthly bandwidth estimator",
      "network bandwidth calculator",
      "data usage calculator",
      "internet speed calculator",
      "streaming bandwidth calculator",
      "website traffic bandwidth",
      "file transfer time calculator",
      "data transfer calculator",
      "bandwidth estimator",
    ],
    openGraph: {
      title: "Bandwidth Calculator – Estimate Internet Usage, Speed & Data Transfer",
      description: "Free online bandwidth calculator to estimate internet usage, transfer speed, monthly traffic, streaming data consumption, and bandwidth requirements instantly.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/bandwidth-calculator`,
    },
  },
};
