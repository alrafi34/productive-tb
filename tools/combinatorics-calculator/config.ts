import { siteConfig } from "@/config/site";

export const combinatoricsCalculatorConfig = {
  slug: "combinatorics-calculator",
  name: "Combinatorics Calculator",
  description: "Calculate permutations, combinations, factorials, circular arrangements, and more instantly online. Includes formulas, step-by-step explanations, and educational breakdowns.",
  category: "computer-science",
  icon: "🔢",
  color: "#058554",
  featured: true,
  keywords: [
    "combinatorics calculator",
    "permutation calculator",
    "combination calculator",
    "nCr calculator",
    "nPr calculator",
    "factorial calculator",
    "probability calculator",
    "math calculator online",
    "circular permutation calculator",
    "multiset permutation calculator",
  ],
  seo: {
    title: "Combinatorics Calculator – Permutations & Combinations",
    description: "Calculate permutations, combinations, factorials and circular arrangements, with the formulas and step-by-step explanations.",
    keywords: "combinatorics calculator, permutation calculator, combination calculator, nCr calculator, nPr calculator, factorial calculator, probability calculator, math calculator online",
    og: {
      title: "Combinatorics Calculator – Permutations & Combinations",
      description: "Calculate permutations, combinations, factorials and circular arrangements, with the formulas and step-by-step explanations.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/combinatorics-calculator`,
    },
  },
  relatedTools: [
    "model-accuracy-calculator",
    "dataset-split-calculator",
    "f1-score-calculator",
    "time-complexity-calculator",
    "standard-deviation-calculator",
    "percentage-calculator",
  ],
};

export const toolConfig = combinatoricsCalculatorConfig;
