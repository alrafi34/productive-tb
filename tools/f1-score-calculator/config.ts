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
    faq: [
      { q: "What is a good F1 score?", a: "It depends on the problem. For most production ML systems, an F1 score ≥ 0.85 is considered good. For safety-critical domains (medical diagnosis, fraud detection), you may target ≥ 0.90 or higher. For research baselines, 0.75+ is often acceptable." },
      { q: "Can F1 score be calculated without a confusion matrix?", a: "Yes. If you already know your model's precision and recall values, you can calculate F1 directly: F1 = 2 × (Precision × Recall) ÷ (Precision + Recall). Use the Precision & Recall mode in this calculator." },
      { q: "What is macro vs micro F1 score?", a: "For multi-class problems, micro F1 aggregates TP/FP/FN across all classes before computing the metric. Macro F1 computes F1 per class then averages them. Macro F1 gives equal weight to all classes; micro F1 is influenced by larger classes." },
      { q: "When should I use F1 score over precision or recall alone?", a: "Use F1 when both false positives and false negatives carry meaningful cost. If one type of error is much more costly than the other, optimise directly for precision (if FP is costly) or recall (if FN is costly) instead." },
      { q: "What is the F-beta score?", a: "F-beta is a generalisation of F1 where you can weight precision or recall more heavily. F1 uses β=1 (equal weight). F0.5 weights precision twice as much; F2 weights recall twice as much. This calculator computes the standard F1 (β=1)." },
    ],
  },
  relatedTools: [
    "precision-recall-calculator",
    "model-accuracy-calculator",
    "ai-token-cost-calculator",
    "time-complexity-calculator",
  ],
};

export const toolConfig = f1ScoreCalculatorConfig;
