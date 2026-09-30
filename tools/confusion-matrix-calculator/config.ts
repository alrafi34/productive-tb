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
    title: "Confusion Matrix Calculator – Precision, Recall & F1",
    description: "Enter TP, FP, FN and TN to get accuracy, precision, recall, specificity, F1 score, MCC and more for a classification model.",
    keywords: "confusion matrix calculator, precision recall calculator, machine learning metrics calculator, accuracy precision recall tool, AI model evaluation, classification metrics calculator, F1 score calculator",
    og: {
      title: "Confusion Matrix Calculator – Precision, Recall & F1",
      description: "Enter TP, FP, FN and TN to get accuracy, precision, recall, specificity, F1 score, MCC and more for a classification model.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/confusion-matrix-calculator`,
    },
    faq: [
      { q: "What does a confusion matrix tell you?", a: "It breaks down all prediction outcomes into four categories — TP, TN, FP, FN — letting you see exactly where your model succeeds and where it fails. From these you can calculate every classification metric without needing the raw predictions." },
      { q: "What is a good accuracy for a classification model?", a: "It depends heavily on the dataset. For balanced datasets, 90%+ is typically good. For heavily imbalanced datasets, accuracy can be misleading — a model predicting the majority class 100% of the time could score 99% accuracy while being completely useless." },
      { q: "What is the difference between sensitivity and specificity?", a: "Sensitivity (recall) measures how well the model finds actual positives. Specificity measures how well it correctly identifies actual negatives. A good diagnostic test aims for high values of both." },
      { q: "Why is MCC considered a better metric than F1?", a: "MCC (Matthews Correlation Coefficient) uses all four values of the confusion matrix and is not inflated by class imbalance. F1 ignores true negatives entirely. For datasets where TN is large (common in fraud detection), MCC gives a more balanced assessment." },
      { q: "Can I upload predictions directly?", a: "Yes. Use the CSV Upload mode and provide a two-column CSV with columns 'actual' and 'predicted'. The calculator parses binary values (1/0) or string labels (positive/negative, yes/no) and builds the confusion matrix automatically." },
    ],
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
