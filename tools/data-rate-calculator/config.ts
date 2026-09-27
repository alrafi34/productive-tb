import { siteConfig } from "@/config/site";

export const dataRateCalculatorConfig = {
  name: "Data Rate Calculator",
  description: "Calculate data transmission rate, transfer speed, and bandwidth for networks and communication systems. Instant results with unit conversion.",
  icon: "📊",
  category: "electrical",
  slug: "data-rate-calculator",
  seo: {
    title: "Data Rate Calculator – Download Time & Speed",
    description: "Calculate data rate, transfer size or download time in bytes or bits: MB/s, GB/s, Mbps and Gbps, for downloads, backups and networks.",
    keywords: [
      "data rate calculator",
      "network speed calculator",
      "bandwidth calculator",
      "data transfer rate",
      "transmission speed calculator",
      "MB per second calculator",
      "network performance tool",
      "internet speed calculator",
      "communication systems calculator",
      "data transmission calculator"
    ],
    og: {
      title: "Data Rate Calculator – Download Time & Speed",
      description: "Calculate data rate, transfer size or download time in bytes or bits: MB/s, GB/s, Mbps and Gbps, for downloads, backups and networks.",
      url: `${siteConfig.url}/tools/electrical/data-rate-calculator`,
    },
    howToSteps: [
      { name: "Choose the mode", text: "Select data and time to rate, rate and time to data, or rate and data to time." },
      { name: "Enter the data size", text: "Type the amount of data and choose bytes, KB, MB, GB or TB." },
      { name: "Enter the rate or time", text: "Type the speed in B/s, KB/s, MB/s, GB/s, kbps, Mbps or Gbps, or the time in seconds, minutes or hours." },
      { name: "Read the result", text: "See the rate, amount of data or time, with the steps, or start from a preset." },
    ],
    faq: [
      { q: "What is the difference between MB/s and Mbps?", a: "MB/s is megabytes per second; Mbps is megabits per second, the unit internet providers use. There are 8 bits in a byte, so 100 Mbps is 12.5 MB/s." },
      { q: "How long does a download take?", a: "Time = size ÷ speed. A 5 GB file at 100 Mbps takes about 7 minutes; at 1 Gbps, well under a minute." },
      { q: "Why is my real download slower?", a: "Protocol overhead, Wi-Fi signal, network congestion and the server's own speed. Expect roughly 80–95% of the plan speed on a good wired connection." },
      { q: "Does the calculator use 1,000 or 1,024?", a: "File sizes (KB, MB, GB) use 1,024, as operating systems show them; network speeds in kbps, Mbps and Gbps use 1,000, as providers quote them." },
      { q: "Can I use this for network planning?", a: "Yes. Use it to estimate backup windows, upload times and how much bandwidth a transfer needs." },
    ],
  },
};
