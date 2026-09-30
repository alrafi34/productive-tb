import { siteConfig } from "@/config/site";

export const timeComplexityCalculatorConfig = {
  slug: "time-complexity-calculator",
  name: "Time Complexity Calculator",
  description: "Estimate algorithm time complexity using Big-O notation. Analyze loop patterns, recursion, and algorithm presets with interactive growth visualizations and educational explanations.",
  category: "computer-science",
  icon: "📊",
  free: true,
  seo: {
    title: "Time Complexity Calculator – Estimate Big-O Growth",
    description: "Compare how O(1), O(log n), O(n), O(n²) and other complexities grow with input size, with graphs and examples for coding interviews.",
    keywords: [
      "time complexity calculator",
      "big o calculator",
      "algorithm complexity checker",
      "big o notation tool",
      "complexity visualizer",
      "coding interview preparation",
      "algorithm growth calculator",
      "O(n) O(log n) O(n2) calculator",
      "big o notation explained",
      "algorithm analysis tool",
      "time complexity visualizer",
      "computer science learning tool",
    ],
    openGraph: {
      title: "Time Complexity Calculator – Estimate Big-O Growth",
      description: "Compare how O(1), O(log n), O(n), O(n²) and other complexities grow with input size, with graphs and examples for coding interviews.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/time-complexity-calculator`,
    },
  },
};
