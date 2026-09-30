import { siteConfig } from "@/config/site";

export const modelAccuracyCalculatorConfig = {
  slug: "model-accuracy-calculator",
  name: "Model Accuracy Calculator",
  description: "Calculate machine learning model accuracy instantly. Compare actual vs predicted labels, evaluate AI performance, upload CSV data, and get instant results online for free.",
  category: "computer-science",
  icon: "🎯",
  color: "#058554",
  featured: true,
  keywords: [
    "model accuracy calculator",
    "machine learning accuracy calculator",
    "classification accuracy calculator",
    "AI model evaluation",
    "prediction accuracy checker",
    "ML accuracy tool",
    "confusion matrix calculator",
  ],
  seo: {
    title: "Model Accuracy Calculator – ML Accuracy Checker Online",
    description: "Calculate a machine learning model's accuracy by comparing actual and predicted labels, typed in or uploaded as CSV.",
    keywords: "model accuracy calculator, machine learning accuracy calculator, classification accuracy calculator, AI model evaluation, prediction accuracy checker, ML accuracy tool",
    og: {
      title: "Model Accuracy Calculator – ML Accuracy Checker Online",
      description: "Calculate a machine learning model's accuracy by comparing actual and predicted labels, typed in or uploaded as CSV.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/model-accuracy-calculator`,
    },
    faq: [
      { q: "What is model accuracy in machine learning?", a: "Model accuracy is the percentage of predictions that match the true labels in a test dataset. It is calculated as (correct predictions ÷ total predictions) × 100. It is the most commonly reported metric for classification tasks." },
      { q: "What is a good accuracy for a machine learning model?", a: "It depends heavily on the problem. For balanced binary classification, 90%+ is typically excellent. For highly imbalanced datasets (e.g. fraud detection where 0.1% are fraudulent), even 99.9% accuracy can be meaningless — the model might just be predicting the majority class." },
      { q: "How do I calculate accuracy for multi-class classification?", a: "The formula is identical: count how many predictions exactly match the actual label, divide by total, and multiply by 100. This tool automatically handles multi-class labels — just paste your actual and predicted lists with matching length." },
      { q: "What is the difference between training accuracy and test accuracy?", a: "Training accuracy is measured on the data used to train the model. Test accuracy is measured on held-out data the model has never seen. Test accuracy is the meaningful metric — high training accuracy with low test accuracy indicates overfitting." },
      { q: "Does this tool support uploading CSV files?", a: "Yes. Switch to CSV mode and upload a .csv or .txt file with two columns named 'actual' and 'predicted'. The tool parses the file locally in your browser — no data is uploaded to any server." },
    ],
  },
  relatedTools: [
    "ai-token-cost-calculator",
    "ai-prompt-length-calculator",
    "time-complexity-calculator",
    "latency-calculator",
  ],
};

export const toolConfig = modelAccuracyCalculatorConfig;
