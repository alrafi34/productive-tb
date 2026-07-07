import { siteConfig } from "@/config/site";

export const precisionRecallCalculatorConfig = {
  slug: "precision-recall-calculator",
  name: "Precision Recall Calculator",
  description: "Calculate precision, recall, F1 score, accuracy, and specificity from confusion matrix values. Free online machine learning evaluation metrics calculator.",
  category: "computer-science",
  icon: "📊",
  color: "#058554",
  featured: true,
  keywords: [
    "precision recall calculator",
    "F1 score calculator",
    "confusion matrix calculator",
    "machine learning metrics calculator",
    "AI evaluation metrics",
    "classification metrics calculator",
    "recall precision F1",
  ],
  seo: {
    title: "Precision Recall Calculator – Free ML Metrics Calculator Online",
    description: "Calculate precision, recall, F1 score, accuracy, specificity, and confusion matrix metrics instantly. Free online machine learning evaluation calculator.",
    keywords: "precision recall calculator, F1 score calculator, confusion matrix calculator, machine learning metrics calculator, AI evaluation metrics, classification metrics calculator",
    og: {
      title: "Precision Recall Calculator – Free ML Metrics Calculator Online",
      description: "Instantly calculate precision, recall, F1 score, accuracy, and specificity from TP, FP, FN, TN values.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/precision-recall-calculator`,
    },
  },
  relatedTools: [
    "model-accuracy-calculator",
    "ai-token-cost-calculator",
    "ai-prompt-length-calculator",
    "time-complexity-calculator",
  ],
};

export const toolConfig = precisionRecallCalculatorConfig;
