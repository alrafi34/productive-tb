import { siteConfig } from "@/config/site";

export const f1ScoreCalculatorAnalyticsConfig = {
  slug: "f1-score-calculator-analytics",
  name: "F1 Score Calculator",
  description: "Calculate the F1 Score from Precision and Recall, or directly from a confusion matrix (TP, FP, FN), with step-by-step breakdown and performance rating. Free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "precision-calculator",
    "recall-calculator",
    "roc-auc-calculator",
    "confusion-matrix-analyzer",
    "p-value-calculator",
    "correlation-coefficient-calculator",
  ],
  seo: {
    title: "F1 Score Calculator — Free Precision & Recall Tool",
    description: "Calculate F1 Score instantly using Precision & Recall or a Confusion Matrix (TP, FP, FN). Free online F1 Score Calculator with step-by-step calculations and rating.",
    keywords: [
      "f1 score calculator",
      "machine learning calculator",
      "precision recall calculator",
      "classification metrics calculator",
      "ai evaluation calculator",
      "confusion matrix calculator",
      "precision calculator",
      "recall calculator",
      "f1 formula calculator",
      "machine learning metrics calculator",
      "f1 score formula",
      "harmonic mean precision recall",
      "classification model evaluation",
      "free f1 score calculator",
      "online f1 score calculator",
      "data science calculator",
      "kaggle metrics calculator",
      "true positive false positive false negative calculator",
      "statistics calculator",
      "model performance calculator",
    ],
    openGraph: {
      title: "Free F1 Score Calculator Online",
      description: "Calculate F1 Score instantly from Precision & Recall, or directly from a confusion matrix, with step-by-step calculations and a performance rating.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/f1-score-calculator-analytics`,
    },
    og: {
      title: "Free F1 Score Calculator Online",
      description: "Calculate F1 Score instantly from Precision & Recall, or directly from a confusion matrix, with step-by-step calculations and a performance rating.",
      url: `${siteConfig.url}/tools/data-analytics/f1-score-calculator-analytics`,
    },
    howToSteps: [
      {
        name: "Choose an Input Mode",
        text: "Select Precision + Recall if you already have those two metrics, or Confusion Matrix to enter True Positive, False Positive, and False Negative counts directly.",
      },
      {
        name: "Enter Your Values",
        text: "Type your Precision and Recall (between 0 and 1), or your TP, FP, and FN counts — the calculator computes Precision and Recall automatically in Confusion Matrix mode.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to round the result to, from 2 up to 6 places.",
      },
      {
        name: "Read the Live Result",
        text: "The F1 Score, its performance rating, and the full calculation breakdown update instantly as you type.",
      },
      {
        name: "Export or Share",
        text: "Copy the result, download it as CSV, TXT, or JSON, print it, or copy a shareable URL with your inputs encoded.",
      },
    ],
    faq: [
      {
        q: "What is an F1 score calculator?",
        a: "An F1 score calculator is a free browser-based tool that computes the F1 Score — the harmonic mean of Precision and Recall — used to evaluate classification models in machine learning, information retrieval, and AI evaluation. It accepts either Precision and Recall directly, or a confusion matrix of True Positive, False Positive, and False Negative counts.",
      },
      {
        q: "How is the F1 score calculated?",
        a: "F1 Score = 2 × (Precision × Recall) ÷ (Precision + Recall). It's the harmonic mean of Precision and Recall, which penalizes models more heavily than a simple average when one of the two metrics is very low.",
      },
      {
        q: "What is a good F1 score?",
        a: "An F1 score of 90% or above is generally considered excellent, 75–89% good, 60–74% average, and below 60% needs improvement. What counts as acceptable depends heavily on your specific application and how balanced or imbalanced your dataset is.",
      },
      {
        q: "What is the difference between F1 score and accuracy?",
        a: "Accuracy considers all four confusion matrix outcomes (TP, TN, FP, FN) and can be misleading on imbalanced datasets. F1 Score only considers Precision and Recall, ignoring True Negatives, which makes it more informative when positive cases are rare or when false positives and false negatives matter more than correctly identified negatives.",
      },
      {
        q: "How do I calculate F1 score from a confusion matrix?",
        a: "Switch to Confusion Matrix mode and enter your True Positive, False Positive, and False Negative counts. The calculator first derives Precision = TP ÷ (TP + FP) and Recall = TP ÷ (TP + FN), then combines them into the F1 Score automatically.",
      },
      {
        q: "Why use the harmonic mean instead of a simple average for F1?",
        a: "The harmonic mean punishes extreme imbalances between Precision and Recall much more than an arithmetic average would. A model with Precision = 1.0 and Recall = 0.01 would average to 0.505 arithmetically but scores only about 0.0198 as an F1 score — correctly reflecting that the model is nearly useless despite perfect precision.",
      },
      {
        q: "What happens if both Precision and Recall are zero?",
        a: "The calculator returns an F1 score of 0 rather than attempting to divide by zero, since a model with zero precision and zero recall has no useful positive predictions at all.",
      },
      {
        q: "Can I use this calculator to compare two models?",
        a: "Yes. Calculate the F1 score for each model using its own Precision and Recall (or confusion matrix), then compare the two scores directly — the model with the higher F1 score has a better balance between avoiding false positives and catching true positives.",
      },
      {
        q: "Is F1 score always the right metric to optimize?",
        a: "Not always — F1 score assumes Precision and Recall are equally important, which isn't true for every application. If false positives are far more costly than false negatives (or vice versa), consider the Fβ score with a weighting factor, or optimize for Precision or Recall specifically instead.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your input values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
