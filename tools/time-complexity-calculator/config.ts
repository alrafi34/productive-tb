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
    faq: [
      { q: "What is Big-O notation?", a: "Big-O notation describes the upper bound of an algorithm's time or space complexity as input size grows. It focuses on the dominant term and ignores constants, giving a machine-independent way to compare algorithm efficiency." },
      { q: "What is the difference between best, average, and worst case?", a: "Best case (Ω) is the minimum operations, average case (Θ) is the expected operations, and worst case (O) is the maximum. Big-O typically describes worst case. For example, quicksort is O(n log n) on average but O(n²) worst case with bad pivots." },
      { q: "Why is O(log n) so efficient?", a: "Logarithmic algorithms halve the problem space at each step. For n = 1,000,000, O(log n) only needs ~20 steps, while O(n) needs 1,000,000. This is why binary search is vastly superior to linear search on sorted data." },
      { q: "When is O(n²) acceptable?", a: "Quadratic complexity is acceptable for small inputs (n < 1,000 in most cases). Bubble sort or insertion sort are fine for small arrays and have low constant factors. For large datasets, O(n log n) algorithms like merge sort are required." },
      { q: "How do I reduce exponential complexity?", a: "Dynamic programming (memoization or tabulation) eliminates redundant recursive calls. Fibonacci changes from O(2ⁿ) to O(n) with memoization. Greedy algorithms and approximations can also replace exact exponential solutions for NP-hard problems." },
    ],
  },
};
