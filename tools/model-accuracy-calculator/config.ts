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
    title: "Model Accuracy Calculator – Free ML Accuracy Checker Online",
    description: "Calculate machine learning model accuracy instantly. Compare actual vs predicted labels, evaluate AI performance, upload CSV data, and get instant results online for free.",
    keywords: "model accuracy calculator, machine learning accuracy calculator, classification accuracy calculator, AI model evaluation, prediction accuracy checker, ML accuracy tool",
    og: {
      title: "Model Accuracy Calculator – Free ML Accuracy Checker Online",
      description: "Calculate machine learning model accuracy instantly. Compare actual vs predicted labels and evaluate AI classification performance.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/model-accuracy-calculator`,
    },
  },
  relatedTools: [
    "ai-token-cost-calculator",
    "ai-prompt-length-calculator",
    "time-complexity-calculator",
    "latency-calculator",
  ],
};

export const toolConfig = modelAccuracyCalculatorConfig;
