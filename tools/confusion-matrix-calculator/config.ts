import { siteConfig } from "@/config/site";

export const confusionMatrixCalculatorConfig = {
  slug: "confusion-matrix-calculator",
  name: "Confusion Matrix Calculator",
  description: "Calculate confusion matrix metrics instantly online. Get accuracy, precision, recall, specificity, F1 score, MCC, and more for machine learning classification models.",
  category: "computer-science",
  icon: "🧩",
  color: "#058554",
  featured: true,
  keywords: [
    "confusion matrix calculator",
    "precision recall calculator",
    "machine learning metrics calculator",
    "accuracy precision recall tool",
    "AI model evaluation",
    "classification metrics calculator",
    "F1 score calculator",
    "MCC calculator",
    "specificity calculator",
  ],
  seo: {
    title: "Free Confusion Matrix Calculator – Accuracy, Precision, Recall & F1 Score",
    description: "Calculate confusion matrix metrics instantly online. Get accuracy, precision, recall, specificity, F1 score, MCC, and more for machine learning classification models.",
    keywords: "confusion matrix calculator, precision recall calculator, machine learning metrics calculator, accuracy precision recall tool, AI model evaluation, classification metrics calculator, F1 score calculator",
    og: {
      title: "Free Confusion Matrix Calculator – Calculate Accuracy, Precision & Recall",
      description: "Instantly calculate all confusion matrix metrics: accuracy, precision, recall, F1 score, MCC, and more. Free online ML evaluation tool.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/confusion-matrix-calculator`,
    },
  },
  relatedTools: [
    "precision-recall-calculator",
    "f1-score-calculator",
    "model-accuracy-calculator",
    "ai-token-cost-calculator",
    "time-complexity-calculator",
  ],
};

export const toolConfig = confusionMatrixCalculatorConfig;
