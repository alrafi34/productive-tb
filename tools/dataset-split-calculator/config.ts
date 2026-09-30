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
    faq: [
      { q: "What is the difference between validation and test sets?", a: "The validation set is used during model development — it helps you tune hyperparameters, select architectures, and stop training early. The test set is held out completely until after all tuning is done and provides a final, unbiased performance estimate." },
      { q: "Why doesn't the split always add up exactly?", a: "When the dataset size isn't perfectly divisible by the percentages, rounding produces fractional samples that must be truncated. This calculator uses the largest-remainder method: it rounds training and validation counts to the nearest integer, then assigns any remaining samples to the test set, so totals always match exactly." },
      { q: "What is stratified splitting?", a: "Stratified splitting preserves the original class distribution in each subset. If your dataset is 70% negative and 30% positive, each split will maintain that same ratio. This is especially important for imbalanced classification datasets and is available in scikit-learn via StratifiedShuffleSplit." },
      { q: "When should I use k-fold cross-validation instead?", a: "Use k-fold cross-validation when your dataset is small (under ~5,000 samples) and a single fixed split would produce highly variable results depending on which samples end up in each set. K-fold uses all samples for training and evaluation, giving a more stable estimate at the cost of extra training time." },
      { q: "Does the order of splitting matter?", a: "Yes. For time-series data, always split chronologically — use the earliest data for training and the most recent data for testing. Random splitting on time-series causes data leakage because the model effectively sees future data during training." },
      { q: "What random seed should I use?", a: "Any fixed integer works (42, 0, 1337 are popular). The exact value doesn't matter as long as you document it and use it consistently, so experiments are reproducible. Always set a random seed in your code with numpy.random.seed() or sklearn's random_state parameter." },
    ],
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
