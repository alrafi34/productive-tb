import { siteConfig } from "@/config/site";

export const timeComplexityCalculatorConfig = {
  slug: "time-complexity-calculator",
  name: "Time Complexity Calculator",
  description: "Estimate algorithm time complexity using Big-O notation. Analyze loop patterns, recursion, and algorithm presets with interactive growth visualizations and educational explanations.",
  category: "computer-science",
  icon: "📊",
  free: true,
  seo: {
    title: "Free Time Complexity Calculator – Estimate Big-O Growth Online",
    description: "Analyze and estimate algorithm time complexity instantly. Learn Big-O notation with visual graphs, comparisons, and real-world examples for coding interviews and computer science learning.",
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
      title: "Free Time Complexity Calculator – Estimate Big-O Growth Online",
      description: "Analyze and estimate algorithm time complexity instantly. Learn Big-O notation with visual graphs, comparisons, and real-world examples.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/time-complexity-calculator`,
    },
  },
};
