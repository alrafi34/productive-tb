import { siteConfig } from "@/config/site";

export const recallCalculatorConfig = {
  slug: "recall-calculator",
  name: "Recall Calculator",
  description: "Calculate the Recall (Sensitivity / True Positive Rate) metric from True Positive and False Negative counts instantly, with confusion matrix mode, percentage conversion, performance rating, and downloadable reports. Free and browser-based.",
  category: "data-analytics",
  icon: "🎯",
  free: true,
  relatedTools: [
    "precision-calculator",
    "f1-score-calculator-analytics",
    "roc-auc-calculator",
    "confusion-matrix-analyzer",
    "chi-square-calculator",
    "a-b-test-calculator",
  ],
  seo: {
    title: "Recall Calculator — Free Machine Learning Recall (Sensitivity) Tool",
    description: "Calculate Recall (Sensitivity) instantly using True Positives and False Negatives. Includes formula, step-by-step breakdown, confusion matrix mode, percentage conversion, and downloadable results. Free and browser-based.",
    keywords: [
      "recall calculator",
      "machine learning recall calculator",
      "recall formula",
      "sensitivity calculator",
      "true positive rate calculator",
      "recall metric",
      "ml metrics calculator",
      "confusion matrix calculator",
      "ai evaluation tool",
      "classification metrics calculator",
      "precision vs recall calculator",
      "recall percentage calculator",
      "model evaluation metric",
      "free recall calculator",
      "online recall calculator",
      "data science calculator",
      "fraud detection recall calculator",
      "disease screening sensitivity calculator",
      "recall score calculator",
      "statistics calculator",
    ],
    openGraph: {
      title: "Free Recall Calculator Online",
      description: "Calculate the Recall (Sensitivity) metric instantly from True Positive and False Negative counts, with confusion matrix mode, percentage conversion, and formula breakdown.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/recall-calculator`,
    },
    og: {
      title: "Free Recall Calculator Online",
      description: "Calculate the Recall (Sensitivity) metric instantly from True Positive and False Negative counts, with confusion matrix mode, percentage conversion, and formula breakdown.",
      url: `${siteConfig.url}/tools/data-analytics/recall-calculator`,
    },
    howToSteps: [
      {
        name: "Choose an Input Mode",
        text: "Use TP / FN for a quick calculation, or switch to Confusion Matrix mode to also enter False Positive and True Negative counts.",
      },
      {
        name: "Enter True Positive Count",
        text: "Type the number of actual positive cases your model correctly identified.",
      },
      {
        name: "Enter False Negative Count",
        text: "Type the number of actual positive cases your model missed and predicted as negative.",
      },
      {
        name: "Choose an Output Format",
        text: "Select Decimal, Percentage, or Both to control how the result is displayed.",
      },
      {
        name: "Read the Live Result",
        text: "Recall, its percentage, the circular progress indicator, rating, and full breakdown update instantly as you type.",
      },
      {
        name: "Export or Share",
        text: "Copy the result, download it as CSV, TXT, or JSON, print it, or share a URL with your inputs encoded.",
      },
    ],
    faq: [
      {
        q: "What is a recall calculator?",
        a: "A recall calculator is a free browser-based tool that computes the Recall metric, also called Sensitivity or True Positive Rate, used to evaluate classification models. It measures the proportion of actual positive cases that were correctly identified, from your True Positive and False Negative counts.",
      },
      {
        q: "How is recall calculated?",
        a: "Recall equals True Positive divided by the sum of True Positive and False Negative: Recall = TP divided by (TP plus FN). For example, with TP = 80 and FN = 20, recall is 80 divided by 100, which equals 0.80, or 80%.",
      },
      {
        q: "What is a good recall score?",
        a: "It depends on your application: 90% and above is generally considered excellent, 75 to 89% good, 50 to 74% moderate, and below 50% poor. High-stakes applications like disease screening or fraud detection typically demand recall above 90%, since missing a true positive is costly.",
      },
      {
        q: "What is the difference between recall and precision?",
        a: "Recall measures how many of the actual positive cases your model successfully found, focused on avoiding missed detections. Precision measures how many of your model's positive predictions were actually correct, focused on avoiding false alarms. A model can have high recall but low precision, or vice versa.",
      },
      {
        q: "What happens if TP and FN are both zero?",
        a: "The calculator can't divide by zero, so it displays a message explaining that recall cannot be calculated because TP plus FN equals zero, which happens when there were no actual positive cases in your evaluation set at all.",
      },
      {
        q: "When should I prioritize recall over precision?",
        a: "Prioritize recall when missing a true positive is the bigger risk, for example failing to detect a disease, a genuine fraud case, or a security threat. Prioritize precision instead when false positives are costly, such as a spam filter wrongly flagging important emails.",
      },
      {
        q: "What does Confusion Matrix mode add?",
        a: "Confusion Matrix mode lets you enter False Positive and True Negative counts alongside TP and FN, displaying the full confusion matrix and adding precision and accuracy as bonus context alongside your recall result.",
      },
      {
        q: "How do I interpret a recall of 0.80 or 80%?",
        a: "A recall of 80% means that out of every 100 actual positive cases, your model correctly identified 80 and missed 20. Whether that is acceptable depends entirely on the cost of a missed positive in your specific application.",
      },
      {
        q: "Can recall be used outside of machine learning?",
        a: "Yes. The same formula applies anywhere you are evaluating how completely a detection system finds actual positive cases, including medical screening, search relevance, quality control, and information retrieval.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your input values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
