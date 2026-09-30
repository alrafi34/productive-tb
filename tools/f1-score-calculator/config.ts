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
    title: "F1 Score Calculator – From Precision & Recall",
    description: "Calculate the F1 score from precision and recall or from confusion matrix counts, for machine learning and data science.",
    keywords: "f1 score calculator, precision recall calculator, machine learning metrics, ai evaluation calculator, classification metrics, confusion matrix calculator, f1 formula calculator",
    og: {
      title: "F1 Score Calculator – From Precision & Recall",
      description: "Calculate the F1 score from precision and recall or from confusion matrix counts, for machine learning and data science.",
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
