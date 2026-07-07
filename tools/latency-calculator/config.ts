import { siteConfig } from "@/config/site";

export const latencyCalculatorConfig = {
  slug: "latency-calculator",
  name: "Latency Calculator",
  description: "Estimate network latency, propagation delay, transmission delay, round-trip time (RTT), and gaming ping. Free online latency calculator for networking, gaming, cloud, and DevOps.",
  category: "computer-science",
  icon: "⏱️",
  color: "#058554",
  featured: true,
  keywords: [
    "latency calculator",
    "network latency calculator",
    "ping calculator",
    "RTT calculator",
    "transmission delay calculator",
    "network delay estimator",
    "gaming ping calculator",
    "propagation delay calculator",
  ],
  seo: {
    title: "Free Latency Calculator – Estimate Network Delay & Ping Online",
    description: "Calculate network latency, ping, RTT, transmission delay, and propagation delay instantly. Free online latency calculator for networking, gaming, cloud, and DevOps.",
    keywords: "latency calculator, network latency calculator, ping calculator, RTT calculator, transmission delay calculator, network delay estimator, gaming ping calculator",
    og: {
      title: "Free Latency Calculator – Estimate Network Delay & Ping Online",
      description: "Calculate network latency, ping, RTT, transmission delay, and propagation delay instantly. Free online tool for networking, gaming, cloud, and DevOps.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/latency-calculator`,
    },
  },
  relatedTools: [
    "download-time-calculator",
    "data-transfer-calculator",
    "bandwidth-calculator",
    "subnet-calculator",
  ],
};

export const toolConfig = latencyCalculatorConfig;
