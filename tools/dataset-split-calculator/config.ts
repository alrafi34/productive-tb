import { siteConfig } from "@/config/site";

export const datasetSplitCalculatorConfig = {
  slug: "dataset-split-calculator",
  name: "Dataset Split Calculator",
  description: "Calculate train, validation, and test dataset splits instantly online. Split datasets for machine learning using custom ratios or percentages with real-time visualization.",
  category: "computer-science",
  icon: "✂️",
  color: "#058554",
  featured: true,
  keywords: [
    "dataset split calculator",
    "train test split calculator",
    "machine learning dataset split",
    "validation split calculator",
    "AI dataset tool",
    "ML train validation test split",
    "dataset ratio calculator",
    "train test validation split",
    "data split tool",
  ],
  seo: {
    title: "Dataset Split Calculator – Train, Validation & Test",
    description: "Work out how many rows go into training, validation and test sets for a machine learning dataset using custom ratios or percentages.",
    keywords: "dataset split calculator, train test split calculator, machine learning dataset split, validation split calculator, AI dataset tool, ML train validation test split, dataset ratio calculator",
    og: {
      title: "Dataset Split Calculator – Train, Validation & Test",
      description: "Work out how many rows go into training, validation and test sets for a machine learning dataset using custom ratios or percentages.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/dataset-split-calculator`,
    },
  },
  relatedTools: [
    "model-accuracy-calculator",
    "confusion-matrix-calculator",
    "f1-score-calculator",
    "precision-recall-calculator",
    "ai-token-cost-calculator",
    "time-complexity-calculator",
  ],
};

export const toolConfig = datasetSplitCalculatorConfig;
