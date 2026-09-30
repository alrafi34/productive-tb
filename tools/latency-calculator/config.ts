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
    faq: [
      { q: "What is propagation delay?", a: "Propagation delay is the time it takes for a signal to travel from the sender to the receiver across a physical medium. It depends purely on distance and the signal speed of the medium — not on bandwidth." },
      { q: "What is transmission delay?", a: "Transmission delay is the time required to push all bits of a packet onto the wire. It depends on packet size and bandwidth: a larger packet or a slower link increases this delay." },
      { q: "What is RTT (round-trip time)?", a: "RTT is the total time for a signal to travel from source to destination and back. It is approximately twice the one-way latency and is what tools like 'ping' measure." },
      { q: "Why is satellite latency so high?", a: "Geostationary satellites orbit at ~35,786 km above Earth. A signal must travel up to the satellite and back down, adding roughly 240 ms of propagation delay each way — before any processing or routing time." },
      { q: "What causes gaming lag?", a: "Gaming lag is caused by a combination of propagation delay (distance to server), transmission delay (packet size vs bandwidth), routing overhead (number of network hops), and server processing time. This calculator estimates the network component." },
      { q: "How does routing overhead affect latency?", a: "Real-world packets don't travel in straight lines. They pass through multiple routers, cross different ISP networks, and can experience congestion. The routing overhead slider simulates this additional delay as a percentage of propagation delay." },
    ],
  },
  relatedTools: [
    "download-time-calculator",
    "data-transfer-calculator",
    "bandwidth-calculator",
    "subnet-calculator",
  ],
};

export const toolConfig = latencyCalculatorConfig;
