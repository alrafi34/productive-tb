import { siteConfig } from "@/config/site";

export const precisionCalculatorConfig = {
  slug: "precision-calculator",
  name: "Precision Calculator",
  description: "Calculate the Precision metric from True Positive and False Positive counts instantly, with percentage conversion, performance rating, and downloadable reports. Free and browser-based.",
  category: "data-analytics",
  icon: "🎯",
  free: true,
  relatedTools: [
    "recall-calculator",
    "f1-score-calculator-analytics",
    "roc-auc-calculator",
    "confusion-matrix-analyzer",
    "p-value-calculator",
    "correlation-coefficient-calculator",
  ],
  seo: {
    title: "Precision Calculator — Free Machine Learning Precision Tool | Productive Toolbox",
    description: "Calculate Precision instantly using the standard ML formula. Enter True Positive and False Positive values for precision, percentage, and interpretation. Free, browser-based.",
    keywords: [
      "precision calculator",
      "machine learning precision calculator",
      "classification metrics calculator",
      "ai evaluation calculator",
      "precision formula",
      "true positive false positive calculator",
      "ml metrics calculator",
      "precision percentage calculator",
      "confusion matrix calculator",
      "machine learning tools",
      "precision vs recall calculator",
      "classification precision calculator",
      "model evaluation metric",
      "free precision calculator",
      "online precision calculator",
      "data science calculator",
      "fraud detection metric calculator",
      "spam filter accuracy calculator",
      "statistics calculator",
      "precision score calculator",
    ],
    openGraph: {
      title: "Free Precision Calculator Online",
      description: "Calculate the Precision metric instantly from True Positive and False Positive counts, with percentage conversion, rating, and formula breakdown.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/precision-calculator`,
    },
    og: {
      title: "Free Precision Calculator Online",
      description: "Calculate the Precision metric instantly from True Positive and False Positive counts, with percentage conversion, rating, and formula breakdown.",
      url: `${siteConfig.url}/tools/data-analytics/precision-calculator`,
    },
    howToSteps: [
      {
        name: "Enter True Positive Count",
        text: "Type the number of correct positive predictions your model made (TP).",
      },
      {
        name: "Enter False Positive Count",
        text: "Type the number of incorrect positive predictions your model made (FP).",
      },
      {
        name: "Choose an Output Format",
        text: "Select Decimal, Percentage, or Both to control how the result is displayed.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to round the result to, from 0 up to 5 places.",
      },
      {
        name: "Read the Live Result",
        text: "Precision, its percentage, the performance rating, and full formula breakdown update instantly as you type.",
      },
      {
        name: "Export or Share",
        text: "Copy the result, download it as CSV, TXT, or JSON, print it, or copy a shareable URL with your inputs encoded.",
      },
    ],
    faq: [
      {
        q: "What is a precision calculator?",
        a: "A precision calculator is a free browser-based tool that computes the Precision metric used to evaluate classification models — the proportion of predicted positive results that are actually correct — from your True Positive and False Positive counts.",
      },
      {
        q: "How is precision calculated?",
        a: "Precision equals True Positive divided by the sum of True Positive and False Positive: Precision = TP ÷ (TP + FP). For example, with TP = 90 and FP = 10, precision is 90 ÷ 100 = 0.90, or 90%.",
      },
      {
        q: "What is a good precision score?",
        a: "It depends on your application: 95% and above is generally considered excellent, 90–94% very high, 80–89% high, 70–79% good, and 60–69% moderate. High-stakes applications like medical diagnosis or fraud detection typically demand precision above 90%, while other use cases may tolerate lower scores.",
      },
      {
        q: "What is the difference between precision and recall?",
        a: "Precision measures how many of your model's positive predictions were actually correct (TP ÷ (TP + FP)), focused on avoiding false alarms. Recall measures how many of the actual positive cases your model successfully found (TP ÷ (TP + FN)), focused on avoiding missed detections. A model can have high precision but low recall, or vice versa.",
      },
      {
        q: "What happens if TP and FP are both zero?",
        a: "The calculator can't divide by zero, so it displays a message explaining that precision cannot be calculated because TP + FP equals zero — this happens when your model made no positive predictions at all.",
      },
      {
        q: "When should I prioritize precision over recall?",
        a: "Prioritize precision when false positives are costly — for example, a spam filter that wrongly flags important emails as spam, or a fraud system that blocks legitimate transactions too often. Prioritize recall instead when missing a true positive is the bigger risk, such as failing to detect a disease or a genuine fraud case.",
      },
      {
        q: "Can I use this calculator for a full confusion matrix?",
        a: "This calculator focuses specifically on Precision from TP and FP. For a complete breakdown including True Negative and False Negative, along with recall, F1 score, and accuracy, use the dedicated Confusion Matrix Analyzer tool.",
      },
      {
        q: "How do I interpret a precision of 0.75 or 75%?",
        a: "A precision of 75% means that out of every 100 positive predictions your model made, 75 were actually correct and 25 were false alarms. Whether that's acceptable depends entirely on the cost of a false positive in your specific application.",
      },
      {
        q: "Can precision be used outside of machine learning?",
        a: "Yes — the same TP ÷ (TP + FP) formula applies anywhere you're evaluating the accuracy of positive identifications, including search engine relevance, medical screening tests, quality control inspections, and information retrieval systems.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your input values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
