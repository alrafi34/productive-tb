import { siteConfig } from "@/config/site";

export const rocAucCalculatorConfig = {
  slug: "roc-auc-calculator",
  name: "ROC AUC Calculator",
  description: "Calculate the ROC curve and AUC (Area Under the Curve) score from binary classification results instantly. Includes an interactive curve with hover tooltips, a threshold explorer, and CSV upload. Free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "precision-recall-calculator",
    "f1-score-calculator",
    "confusion-matrix-calculator",
    "chi-square-calculator",
    "a-b-test-calculator",
  ],
  seo: {
    title: "Free ROC AUC Calculator Online – ROC Curve & AUC Score",
    description: "Calculate ROC AUC scores instantly online using your binary classification results. Upload a CSV, visualize the ROC curve, explore thresholds, and export results — all in your browser with no signup required.",
    keywords: [
      "roc auc calculator",
      "roc curve calculator",
      "auc calculator",
      "receiver operating characteristic",
      "machine learning calculator",
      "binary classification evaluation",
      "roc analysis online",
      "auc score tool",
      "ai evaluation tool",
      "ml performance metrics",
      "classifier evaluation",
      "roc visualization",
      "csv roc calculator",
      "model performance analyzer",
      "free roc auc calculator",
    ],
    openGraph: {
      title: "Free ROC AUC Calculator Online",
      description: "Calculate ROC curve and AUC score instantly from binary classification results, with an interactive curve, threshold explorer, and CSV upload, all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/roc-auc-calculator`,
    },
    og: {
      title: "Free ROC AUC Calculator Online",
      description: "Calculate ROC curve and AUC score instantly from binary classification results, with an interactive curve, threshold explorer, and CSV upload, all in your browser.",
      url: `${siteConfig.url}/tools/data-analytics/roc-auc-calculator`,
    },
    howToSteps: [
      {
        name: "Add Your Dataset",
        text: "Paste rows of actual label (0 or 1) and predicted probability (0–1), or drag and drop a CSV file with those two columns.",
      },
      {
        name: "Review Dataset Stats",
        text: "Check the total sample count and the positive/negative split shown automatically below the input.",
      },
      {
        name: "Read the AUC Score",
        text: "The AUC score, rating, and full ROC curve update instantly as you edit your data.",
      },
      {
        name: "Explore the Curve",
        text: "Hover anywhere on the ROC curve to see the exact threshold, TPR, and FPR at that point.",
      },
      {
        name: "Pick a Threshold",
        text: "Drag the Threshold Explorer slider to see the confusion matrix and derived metrics at any specific cutoff.",
      },
      {
        name: "Export or Copy",
        text: "Copy the AUC score or full metrics report, or download the ROC curve data as CSV, TXT, or JSON.",
      },
    ],
    faq: [
      {
        q: "What is a ROC AUC calculator?",
        a: "A ROC AUC calculator is a free browser-based tool that computes the Receiver Operating Characteristic curve and its Area Under the Curve from binary classification results, evaluating how well a model separates positive from negative cases across every threshold.",
      },
      {
        q: "How is ROC AUC calculated?",
        a: "The calculator sorts all samples by predicted probability, sweeps the decision threshold from highest to lowest score, computes the true positive rate and false positive rate at each threshold, and integrates the area under the resulting curve using the trapezoidal rule.",
      },
      {
        q: "What is a good AUC score?",
        a: "0.90 and above is generally considered excellent, 0.80 to 0.90 good, 0.70 to 0.80 fair, 0.60 to 0.70 poor, and 0.50 represents a classifier with no better performance than random guessing.",
      },
      {
        q: "What is the difference between ROC AUC and accuracy?",
        a: "Accuracy measures performance at a single fixed threshold, usually 0.5, and can be misleading on imbalanced datasets. ROC AUC evaluates performance across every possible threshold at once, making it threshold-independent and generally more informative for comparing classifiers.",
      },
      {
        q: "What does an AUC of exactly 0.5 mean?",
        a: "An AUC of 0.5 means the model performs no better than random guessing, since its ROC curve sits directly on the diagonal reference line, with no ability to distinguish positive from negative cases.",
      },
      {
        q: "Can AUC be below 0.5?",
        a: "Yes, though it is uncommon. An AUC below 0.5 usually means the model's predictions are inversely related to the actual outcome, in which case using one minus the predicted probability as your score would produce an AUC above 0.5.",
      },
      {
        q: "What does the Threshold Explorer do?",
        a: "It lets you drag a slider across every possible probability cutoff and instantly see the resulting confusion matrix, along with accuracy, precision, recall, specificity, and F1 score at that specific threshold.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator computes the exact ROC curve and AUC on your full dataset using an efficient single sorted pass, comfortably handling tens of thousands of rows, while the chart automatically downsamples for smooth rendering without affecting the calculated AUC value.",
      },
      {
        q: "Do I need equal numbers of positive and negative examples?",
        a: "No. ROC AUC works with any class balance and only requires at least one positive and one negative example in your dataset to be defined.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your labels and predicted probabilities are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
