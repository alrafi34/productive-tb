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
    title: "Latency Calculator – Network Delay, Ping & RTT",
    description: "Estimate network latency, round-trip time, transmission and propagation delay for networking, gaming, cloud and DevOps work.",
    keywords: "latency calculator, network latency calculator, ping calculator, RTT calculator, transmission delay calculator, network delay estimator, gaming ping calculator",
    og: {
      title: "Latency Calculator – Network Delay, Ping & RTT",
      description: "Estimate network latency, round-trip time, transmission and propagation delay for networking, gaming, cloud and DevOps work.",
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
