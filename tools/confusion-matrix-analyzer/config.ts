import { siteConfig } from "@/config/site";

export const confusionMatrixAnalyzerConfig = {
  slug: "confusion-matrix-analyzer",
  name: "Confusion Matrix Analyzer",
  description: "Analyze binary and multi-class classification results — accuracy, precision, recall, F1, specificity, MCC, and per-class metrics with a live confusion matrix heatmap. Free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "precision-calculator",
    "recall-calculator",
    "f1-score-calculator-analytics",
    "roc-auc-calculator",
    "p-value-calculator",
    "correlation-coefficient-calculator",
  ],
  seo: {
    title: "Confusion Matrix Analyzer — Free Accuracy, Precision & F1 Tool",
    description: "Analyze binary and multi-class classification results with a live confusion matrix. Calculate accuracy, precision, recall, specificity, F1, and MCC instantly. Free, browser-based.",
    keywords: [
      "confusion matrix analyzer",
      "confusion matrix calculator",
      "precision recall calculator",
      "f1 score calculator",
      "machine learning metrics",
      "classification metrics calculator",
      "accuracy calculator",
      "ai evaluation tool",
      "ml confusion matrix",
      "model evaluation tool",
      "multi class confusion matrix",
      "matthews correlation coefficient calculator",
      "specificity calculator",
      "balanced accuracy calculator",
      "confusion matrix heatmap",
      "actual vs predicted calculator",
      "classification report generator",
      "free confusion matrix tool",
      "online confusion matrix calculator",
      "data science evaluation tool",
    ],
    openGraph: {
      title: "Free Confusion Matrix Analyzer Online",
      description: "Analyze binary and multi-class classification results with a live confusion matrix heatmap, per-class metrics, and macro/weighted averages.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/confusion-matrix-analyzer`,
    },
    og: {
      title: "Free Confusion Matrix Analyzer Online",
      description: "Analyze binary and multi-class classification results with a live confusion matrix heatmap, per-class metrics, and macro/weighted averages.",
      url: `${siteConfig.url}/tools/data-analytics/confusion-matrix-analyzer`,
    },
    howToSteps: [
      {
        name: "Choose an Input Mode",
        text: "Select Manual Counts to enter TP, FP, FN, and TN directly for binary classification, or Actual vs. Predicted Lists to analyze multi-class results from raw labels.",
      },
      {
        name: "Enter Your Data",
        text: "Type or paste your confusion matrix counts, or paste two lists of actual and predicted labels — you can also import a CSV file with Actual and Predicted columns.",
      },
      {
        name: "Review the Confusion Matrix",
        text: "See the interactive matrix heatmap update instantly, showing how many predictions fell into each actual-vs-predicted combination.",
      },
      {
        name: "Check the Metrics Dashboard",
        text: "Review accuracy, precision, recall, F1 score, specificity, and other metrics, plus a per-class breakdown for multi-class data.",
      },
      {
        name: "Export Your Results",
        text: "Copy the metrics, download the full report as CSV, TXT, or JSON, or print a formatted report.",
      },
    ],
    faq: [
      {
        q: "What is a confusion matrix analyzer?",
        a: "A confusion matrix analyzer is a free browser-based tool that evaluates classification model performance by comparing actual and predicted labels, computing metrics like accuracy, precision, recall, F1 score, specificity, and Matthews Correlation Coefficient for both binary and multi-class problems.",
      },
      {
        q: "What is a confusion matrix?",
        a: "A confusion matrix is a table that compares actual class labels against predicted class labels, showing exactly how many predictions of each type were correct or incorrect. For binary classification, it has four cells: True Positive, False Positive, False Negative, and True Negative.",
      },
      {
        q: "How is accuracy different from precision, recall, and F1?",
        a: "Accuracy measures the overall proportion of correct predictions across all classes, including True Negatives. Precision and Recall focus specifically on how well the model handles positive predictions, and F1 combines them into a single balanced score — accuracy can be misleading on imbalanced datasets where these other metrics tell a fuller story.",
      },
      {
        q: "What is Matthews Correlation Coefficient (MCC)?",
        a: "MCC is a single balanced metric ranging from -1 to +1 that accounts for all four confusion matrix values (TP, TN, FP, FN) simultaneously, making it more reliable than accuracy or F1 alone for imbalanced binary classification problems. A value of +1 means perfect prediction, 0 means no better than random, and -1 means total disagreement.",
      },
      {
        q: "How do I analyze multi-class classification results?",
        a: "Switch to Actual vs. Predicted Lists mode and paste your actual labels and predicted labels — one per line, matched by row order. The calculator automatically detects all unique classes, builds the full confusion matrix, and computes per-class precision, recall, and F1, along with macro and weighted averages.",
      },
      {
        q: "What is the difference between macro and weighted averages?",
        a: "Macro average computes the metric for each class independently and takes the unweighted mean, treating every class equally regardless of size. Weighted average instead weights each class's contribution by how many samples it has (its support), which better reflects overall performance on imbalanced datasets.",
      },
      {
        q: "Can I upload a CSV file instead of typing labels?",
        a: "Yes. Import a CSV file with \"Actual\" and \"Predicted\" columns (case-insensitive header names), and the calculator automatically extracts and loads both label lists for analysis.",
      },
      {
        q: "What happens if my Actual and Predicted lists have different lengths?",
        a: "The calculator detects the mismatch immediately and shows a clear error explaining exactly how many rows each list contains, since every prediction must be matched to exactly one actual label to build a valid confusion matrix.",
      },
      {
        q: "What do Specificity, NPV, FPR, and FNR mean?",
        a: "Specificity (True Negative Rate) measures how well the model identifies actual negatives correctly. Negative Predictive Value (NPV) measures how many negative predictions were actually correct. False Positive Rate (FPR) and False Negative Rate (FNR) are the complements of Specificity and Recall, showing the model's error rates for each class.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your classification data, whether typed, pasted, or uploaded as a CSV, is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
