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
    faq: [
      { q: "Why is 0! = 1?", a: "By convention and mathematical consistency. The number of ways to arrange zero objects is exactly one — the empty arrangement. This also makes the permutation and combination formulas work correctly at edge cases like C(n, 0) = 1." },
      { q: "What is the difference between permutation with and without repetition?", a: "Without repetition (standard nPr): once an item is selected it cannot be selected again. With repetition: each selection is independent and any item can appear multiple times. Example — a 4-digit PIN from digits 0–9 with repetition = 10^4 = 10,000. Without repetition = P(10,4) = 5,040." },
      { q: "When do I use combination with repetition?", a: "Use it when selecting from a set of types where you can pick the same type multiple times and order doesn't matter. Classic example: choosing 3 ice cream scoops from 5 flavors (you can repeat flavors). Answer: C(5+3−1, 3) = C(7,3) = 35." },
      { q: "How large can n be before results become unreliable?", a: "This calculator uses JavaScript BigInt for exact integer arithmetic, so results are mathematically precise for any n up to 1000. Beyond that, numbers have hundreds or thousands of digits and are displayed in scientific notation." },
      { q: "What is a multiset permutation?", a: "A multiset permutation counts arrangements of a collection where some objects are identical. For example, the word MISSISSIPPI has 11 letters with repetitions: M×1, I×4, S×4, P×2. Distinct arrangements = 11! ÷ (1! × 4! × 4! × 2!) = 34,650." },
      { q: "What is the relationship between nCr and nPr?", a: "nPr = nCr × r! — a permutation is a combination with the r selected items then arranged in all possible orders. Equivalently, nCr = nPr ÷ r!, dividing by r! removes the order." },
    ],
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
