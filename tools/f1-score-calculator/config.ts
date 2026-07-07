import { siteConfig } from "@/config/site";

export const f1ScoreCalculatorConfig = {
  slug: "f1-score-calculator",
  name: "F1 Score Calculator",
  description: "Calculate F1 score instantly using confusion matrix or precision and recall values. Free online F1 score calculator for AI, machine learning, classification, and data science.",
  category: "computer-science",
  icon: "🧮",
  color: "#058554",
  featured: true,
  keywords: [
    "f1 score calculator",
    "precision recall calculator",
    "machine learning metrics",
    "ai evaluation calculator",
    "classification metrics",
    "confusion matrix calculator",
    "f1 formula calculator",
  ],
  seo: {
    title: "Free F1 Score Calculator – Calculate Precision, Recall & F1 Score Online",
    description: "Calculate F1 Score instantly using confusion matrix or precision and recall. Free online F1 score calculator for AI, machine learning, classification, and data science.",
    keywords: "f1 score calculator, precision recall calculator, machine learning metrics, ai evaluation calculator, classification metrics, confusion matrix calculator, f1 formula calculator",
    og: {
      title: "Free F1 Score Calculator – Calculate Precision, Recall & F1 Score Online",
      description: "Calculate F1 score from confusion matrix or precision/recall values instantly. Free online ML evaluation tool.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/f1-score-calculator`,
    },
  },
  relatedTools: [
    "precision-recall-calculator",
    "model-accuracy-calculator",
    "ai-token-cost-calculator",
    "time-complexity-calculator",
  ],
};

export const toolConfig = f1ScoreCalculatorConfig;
