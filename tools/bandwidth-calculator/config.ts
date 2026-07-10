import { siteConfig } from "@/config/site";

export const bandwidthCalculatorConfig = {
  slug: "bandwidth-calculator",
  name: "Bandwidth Calculator",
  description: "Estimate internet bandwidth usage, file transfer time, monthly website traffic, streaming data consumption, and multi-user bandwidth requirements instantly in your browser.",
  category: "computer-science",
  icon: "📡",
  free: true,
  relatedTools: [
    "download-time-calculator",
    "latency-calculator",
    "cloud-cost-calculator",
    "data-storage-calculator",
    "network-speed-converter",
  ],
  seo: {
    title: "Bandwidth Calculator — Free Network Bandwidth & Transfer Time Calculator | Productive Toolbox",
    description: "Calculate file transfer time, monthly website bandwidth, streaming data usage, and multi-user network capacity. Free, browser-based, no signup required.",
    keywords: [
      "bandwidth calculator",
      "network bandwidth calculator",
      "calculate bandwidth",
      "file transfer time calculator",
      "download time calculator",
      "bandwidth usage estimator",
      "data bandwidth calculator",
      "business bandwidth calculator",
      "internet bandwidth calculator",
      "monthly bandwidth calculator",
      "streaming bandwidth calculator",
      "website traffic bandwidth",
      "multi-user bandwidth calculator",
      "how much bandwidth do i need",
      "data transfer calculator",
      "bandwidth estimator",
      "network capacity calculator",
      "how long to transfer file",
      "4k streaming bandwidth usage",
      "bandwidth requirements calculator",
      "mbps to mb/s calculator",
      "data usage calculator",
      "bandwidth planning tool",
    ],
    openGraph: {
      title: "Bandwidth Calculator — Free Network Bandwidth & Transfer Time Calculator",
      description: "Calculate file transfer time, monthly website bandwidth, streaming data usage, and multi-user network capacity. Free, browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/bandwidth-calculator`,
    },
    og: {
      title: "Bandwidth Calculator — Free Network Bandwidth & Transfer Time Calculator",
      description: "Calculate file transfer time, monthly website bandwidth, streaming data usage, and multi-user network capacity. Free, browser-based.",
      url: `${siteConfig.url}/tools/computer-science/bandwidth-calculator`,
    },
    howToSteps: [
      {
        name: "Select a Calculation Mode",
        text: "Choose one of the four tabs: Transfer Time, Website Traffic, Streaming Usage, or Multi-User. Each mode shows the input fields relevant to that specific calculation. You can switch modes without losing your other inputs.",
      },
      {
        name: "Enter Your Values",
        text: "Fill in the fields for your chosen mode — file size and connection speed for Transfer Time, visitor counts and page size for Website Traffic, quality and viewing hours for Streaming, or user count and per-user speed for Multi-User. Use the unit dropdowns to set KB/MB/GB or Kbps/Mbps/Gbps. The calculator converts all units automatically.",
      },
      {
        name: "Read the Results",
        text: "Results appear immediately as you type. Transfer Time shows hours, minutes, and seconds. Website Traffic shows GB or TB per month. Streaming shows monthly GB by quality tier. Multi-User shows required capacity in Mbps or Gbps.",
      },
      {
        name: "Adjust Variables to Compare Scenarios",
        text: "Change inputs to model different scenarios — increase speed to see how it cuts transfer time, raise concurrent users to find the capacity threshold, or switch streaming quality to compare data costs between 1080p and 4K.",
      },
      {
        name: "Export or Share Your Result",
        text: "Copy the result to clipboard or click Export to download a summary as TXT or JSON. The shareable URL encodes your current inputs so you can send the exact calculation to a colleague.",
      },
    ],
    faq: [
      {
        q: "What is bandwidth and how is it measured?",
        a: "Bandwidth is the maximum rate at which data can be transmitted over a network connection in a given amount of time. It is measured in bits per second — Kbps, Mbps, or Gbps. Bandwidth is often confused with speed, but it is more accurately described as capacity: a wider pipe allows more data to flow simultaneously, but does not change how fast any individual packet travels.",
      },
      {
        q: "How is file transfer time calculated?",
        a: "Transfer time equals the file size in bits divided by the connection speed in bits per second. For a 10 GB file at 100 Mbps, convert 10 GB to bits (85,899,345,920 bits), then divide by 100,000,000 bps to get 858.99 seconds, approximately 14 minutes 19 seconds. The calculator handles all unit conversions automatically. Add 20 to 30 percent to the result for real-world overhead.",
      },
      {
        q: "How do I calculate monthly website bandwidth usage?",
        a: "Monthly bandwidth equals monthly visitors multiplied by average page size in MB multiplied by average pages per session. For example, 100,000 visitors loading 5 MB per page across 3 pages each equals 1,500,000 MB or approximately 1,464 GB per month. To find your actual page size, open Chrome DevTools, go to the Network tab, disable cache, and hard-reload your page.",
      },
      {
        q: "What is the difference between Mbps and MB/s?",
        a: "Mbps (megabits per second) is the unit ISPs use for connection speed. MB/s (megabytes per second) is the unit used for file sizes and download progress. Since 1 byte equals 8 bits, 1 MB/s equals 8 Mbps. A 100 Mbps connection downloads at approximately 12.5 MB/s, not 100 MB/s. This is the most common source of confusion when estimating transfer times.",
      },
      {
        q: "How much bandwidth does 4K streaming use per month?",
        a: "4K streaming uses approximately 20 to 25 Mbps per stream, or roughly 10 to 12.5 GB per hour. At 2 hours per day for 30 days, that equals 600 to 750 GB per month per stream. A household with two simultaneous 4K streams can consume 1.2 to 1.5 TB per month from streaming alone, before accounting for web browsing, gaming, or file downloads.",
      },
      {
        q: "What is a business bandwidth calculator and how is it different from home use?",
        a: "A business bandwidth calculator accounts for concurrent users, a peak usage factor, and mixed traffic types running simultaneously. Home use is mostly sequential — one person streams, then another browses. Business use is concurrent — dozens of users are active at once — so you must multiply individual usage by concurrent user count and add headroom for traffic peaks.",
      },
      {
        q: "What is a good bandwidth for a small business?",
        a: "For a 10 to 20 person office with standard cloud applications, email, and video calls, a 100 to 200 Mbps symmetric business connection is typically sufficient. For 50 or more employees or teams running heavy file transfers, 500 Mbps to 1 Gbps is recommended. Use the Multi-User mode with your actual user count and usage patterns rather than relying on generic benchmarks.",
      },
      {
        q: "Why is my actual download speed slower than my advertised bandwidth?",
        a: "Several factors reduce real-world throughput: TCP protocol overhead consumes roughly 5 percent of bandwidth, TLS encryption adds 2 to 3 percent, ISP congestion during peak hours can reduce effective speeds by 20 to 50 percent, and Wi-Fi introduces additional latency and packet loss. Test your actual speed at fast.com or speedtest.net and use the measured result when calculating transfer times.",
      },
      {
        q: "How do I estimate bandwidth for a network with many users?",
        a: "Multiply concurrent users by per-user bandwidth, then multiply by a peak usage factor of 0.70 to 0.80 for office environments. For example, 100 users each needing 5 Mbps at 75 percent peak equals 375 Mbps. Add 20 to 30 percent headroom, giving a recommended provisioned capacity of 450 to 490 Mbps. Use the Multi-User mode to model your specific scenario.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your file sizes, connection speeds, user counts, and any other values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
