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
    title: "Precision Recall Calculator – F1, Accuracy, MCC",
    description: "Enter TP, FP, FN and TN from a confusion matrix to get precision, recall, F1 score, accuracy, specificity, NPV and MCC, with every formula shown.",
    keywords: "precision recall calculator, F1 score calculator, confusion matrix calculator, machine learning metrics calculator, AI evaluation metrics, classification metrics calculator",
    og: {
      title: "Precision Recall Calculator – F1, Accuracy, MCC",
      description: "Enter TP, FP, FN and TN from a confusion matrix to get precision, recall, F1 score, accuracy, specificity, NPV and MCC, with every formula shown.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/precision-recall-calculator`,
    },
    howToSteps: [
      { name: "Enter the confusion matrix", text: "Type the counts of true positives (TP), false positives (FP), false negatives (FN) and true negatives (TN) from your model's test results, or load a preset example." },
      { name: "Read the metrics", text: "Precision, recall, F1 score, accuracy, specificity, NPV, false positive and false negative rates and MCC update as you type." },
      { name: "Check the working", text: "Open the formula panel to see each metric calculated step by step from your numbers." },
      { name: "Export or save", text: "Export the results as text, CSV or JSON, or save them to the history in this browser to compare models." },
    ],
    faq: [
      { q: "What is the difference between precision and recall?", a: "Precision = TP ÷ (TP + FP): of everything the model flagged as positive, the share that really was. Recall = TP ÷ (TP + FN): of all the real positives, the share the model found. A cautious model has high precision and low recall; an eager one the reverse." },
      { q: "How is the F1 score calculated?", a: "F1 = 2 × precision × recall ÷ (precision + recall), the harmonic mean of the two, or equivalently 2TP ÷ (2TP + FP + FN). It is high only when both are high. Example: TP 80, FP 20, FN 10 gives precision 0.80, recall 0.889 and F1 0.842." },
      { q: "When should I use F1 instead of accuracy?", a: "When the classes are imbalanced. If 95% of emails are not spam, a model that never flags anything scores 95% accuracy yet catches no spam; its recall and F1 are 0. F1 ignores true negatives, so a large majority class cannot inflate it." },
      { q: "What is MCC (Matthews correlation coefficient)?", a: "MCC = (TP×TN − FP×FN) ÷ √((TP+FP)(TP+FN)(TN+FP)(TN+FN)). It runs from −1 (always wrong) through 0 (no better than chance) to +1 (perfect) and uses all four cells, so it stays informative on imbalanced data." },
      { q: "Should I optimise for precision or recall?", a: "It depends on which mistake costs more. Favour recall when missing a positive is costly, as in disease screening or fraud detection. Favour precision when false alarms are costly, as in spam filtering or automated account bans. Changing the decision threshold trades one for the other." },
      { q: "What are false positives and false negatives?", a: "A false positive (type I error) is a negative case predicted as positive, such as a genuine email sent to spam. A false negative (type II error) is a positive case the model missed, such as a fraudulent payment that was approved." },
      { q: "Does it work for multi-class classification?", a: "It works on one binary confusion matrix. For several classes, count TP, FP, FN and TN for each class against all the others (one-vs-rest), then average the metrics: macro-averaging treats every class equally, micro-averaging weights by the number of samples." },
    ],
  },
  relatedTools: [
    "model-accuracy-calculator",
    "ai-token-cost-calculator",
    "ai-prompt-length-calculator",
    "time-complexity-calculator",
  ],
};

export const toolConfig = precisionRecallCalculatorConfig;
