import { siteConfig } from "@/config/site";

export const pValueCalculatorConfig = {
  slug: "p-value-calculator",
  name: "P-Value Calculator",
  description: "Calculate p-values and statistical significance for Z-tests, T-tests, Chi-Square tests, F-tests, and correlation tests instantly, with hypothesis testing decisions. Free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "confidence-interval-calculator",
    "z-score-calculator",
    "correlation-coefficient-calculator",
    "standard-deviation-calculator",
    "chi-square-calculator",
    "sample-size-calculator",
  ],
  seo: {
    title: "P-Value Calculator — Free Statistical Significance Calculator | Productive Toolbox",
    description: "Calculate p-values online for Z-tests, T-tests, Chi-Square, F-tests, and correlation. Get instant statistical significance, hypothesis decisions, and interpretation. Free, browser-based.",
    keywords: [
      "p value calculator",
      "statistical significance calculator",
      "hypothesis testing calculator",
      "z test calculator",
      "t test calculator",
      "chi square calculator",
      "f test calculator",
      "correlation test calculator",
      "statistics calculator",
      "online p value calculator",
      "free statistics calculator",
      "research statistics tool",
      "p value from t statistic",
      "p value from z score",
      "significance level calculator",
      "reject null hypothesis calculator",
      "two tailed test calculator",
      "one tailed test calculator",
      "statistical test calculator",
      "p value formula",
    ],
    openGraph: {
      title: "Free P-Value Calculator Online",
      description: "Calculate statistical significance instantly for Z-tests, T-tests, Chi-Square tests, F-tests, and correlation tests, with a clear hypothesis testing decision.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/p-value-calculator`,
    },
    og: {
      title: "Free P-Value Calculator Online",
      description: "Calculate statistical significance instantly for Z-tests, T-tests, Chi-Square tests, F-tests, and correlation tests, with a clear hypothesis testing decision.",
      url: `${siteConfig.url}/tools/data-analytics/p-value-calculator`,
    },
    howToSteps: [
      {
        name: "Select a Statistical Test",
        text: "Choose Z-Test, One Sample T-Test, Two Sample T-Test, Paired T-Test, Chi-Square Test, Correlation Test, or F-Test depending on your analysis.",
      },
      {
        name: "Choose a Tail Type",
        text: "Select Left-Tailed, Right-Tailed, or Two-Tailed — Chi-Square and F-tests are automatically fixed to right-tailed since their statistics can't be negative.",
      },
      {
        name: "Enter Your Test Statistic",
        text: "Type your calculated Z, t, chi-square, or F value, plus degrees of freedom where required, or enter a correlation coefficient and sample size for a correlation test.",
      },
      {
        name: "Set Your Significance Level",
        text: "Choose 0.10, 0.05, or 0.01 with one click, or enter a custom alpha value between 0 and 1.",
      },
      {
        name: "Read the Result",
        text: "The p-value, significance decision, and plain-language interpretation update instantly as you type.",
      },
      {
        name: "Export or Share",
        text: "Copy the result, download it as CSV, TXT, or JSON, print it, or copy a shareable URL with your inputs encoded.",
      },
    ],
    faq: [
      {
        q: "What is a p-value calculator?",
        a: "A p-value calculator is a free browser-based tool that computes the probability of observing a test statistic as extreme as yours, assuming the null hypothesis is true. It supports Z-tests, T-tests, Chi-Square tests, F-tests, and correlation tests, and tells you whether your result is statistically significant at a chosen significance level.",
      },
      {
        q: "How is a p-value calculated?",
        a: "The calculator converts your test statistic into a cumulative probability using the relevant distribution — the standard normal distribution for Z-tests, the Student's t distribution for T-tests and correlation tests, the chi-square distribution for Chi-Square tests, or the F distribution for F-tests — then adjusts for whether you selected a one-tailed or two-tailed test.",
      },
      {
        q: "What is a good p-value?",
        a: "There's no universally \"good\" p-value — it depends on your chosen significance level (α), most commonly 0.05. A p-value at or below α is considered statistically significant, meaning the result is unlikely to have occurred by random chance alone; a p-value above α means the evidence isn't strong enough to reject the null hypothesis.",
      },
      {
        q: "What is the difference between a one-tailed and two-tailed test?",
        a: "A two-tailed test checks whether your statistic differs from the expected value in either direction and is the more conservative, commonly used default. A one-tailed test (left or right) only checks for a difference in one specific direction, which produces a smaller p-value for the same statistic but requires that direction to be specified before collecting data.",
      },
      {
        q: "How do I use this calculator for a T-test?",
        a: "Select the T-test variant matching your study design — One Sample, Two Sample, or Paired — then enter your calculated t statistic and degrees of freedom. All three T-test variants use the same Student's t distribution once you have the t statistic and degrees of freedom, since the difference lies in how those two numbers were derived from your raw data.",
      },
      {
        q: "Why are Chi-Square and F-tests always right-tailed?",
        a: "Chi-square and F statistics are based on squared or ratio quantities and can never be negative, so extreme, unlikely values only occur in the right tail of their distributions. The calculator automatically fixes the tail type to right-tailed for these two tests and hides the tail selector.",
      },
      {
        q: "How does the correlation test work?",
        a: "Enter your sample correlation coefficient (r, between -1 and 1) and sample size (n). The calculator converts these into a t statistic using t = r√(n − 2) ÷ √(1 − r²) with n − 2 degrees of freedom, then computes the p-value exactly like a standard t-test.",
      },
      {
        q: "What does \"Reject Null Hypothesis\" mean?",
        a: "It means your p-value is less than or equal to your chosen significance level, so the observed result is unlikely to have occurred if the null hypothesis (no effect or no difference) were true — providing statistical evidence in favor of your alternative hypothesis. It does not prove the alternative hypothesis is true, only that the data is inconsistent with the null.",
      },
      {
        q: "Can I use a custom significance level instead of 0.05?",
        a: "Yes. Select the custom option and enter any alpha value between 0 and 1. Common alternatives are 0.10 for exploratory research where false positives are less costly, and 0.01 for high-stakes decisions where you want stronger evidence before rejecting the null hypothesis.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your test statistics and inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
