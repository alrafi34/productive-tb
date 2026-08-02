import { siteConfig } from "@/config/site";

export const confidenceIntervalCalculatorConfig = {
  slug: "confidence-interval-calculator",
  name: "Confidence Interval Calculator",
  description: "Calculate confidence intervals for a mean or proportion, margin of error, and required sample size — with Z and t critical values, formula breakdown, and downloadable reports. Free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "z-score-calculator",
    "standard-deviation-calculator",
    "p-value-calculator",
    "sample-size-calculator",
    "correlation-coefficient-calculator",
    "mean-calculator",
  ],
  seo: {
    title: "Confidence Interval Calculator — Free Statistics Calculator Online | Productive Toolbox",
    description: "Calculate confidence intervals instantly for a mean or proportion. Enter your sample data to get margin of error, Z/t critical values, and required sample size. Free, browser-based.",
    keywords: [
      "confidence interval calculator",
      "confidence interval",
      "margin of error calculator",
      "confidence interval for mean",
      "confidence interval for proportion",
      "statistics calculator",
      "sample size calculator",
      "confidence level calculator",
      "statistical calculator",
      "online confidence interval calculator",
      "95% confidence interval calculator",
      "z score confidence interval",
      "t distribution calculator",
      "population mean confidence interval",
      "free confidence interval calculator",
      "confidence interval formula",
      "standard error calculator",
      "critical value calculator",
      "statistics tool online",
      "hypothesis testing calculator",
    ],
    openGraph: {
      title: "Free Confidence Interval Calculator Online",
      description: "Calculate confidence intervals for means and proportions instantly, with margin of error, critical values, and step-by-step formula breakdown.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/confidence-interval-calculator`,
    },
    og: {
      title: "Free Confidence Interval Calculator Online",
      description: "Calculate confidence intervals for means and proportions instantly, with margin of error, critical values, and step-by-step formula breakdown.",
      url: `${siteConfig.url}/tools/data-analytics/confidence-interval-calculator`,
    },
    howToSteps: [
      {
        name: "Choose a Calculation Type",
        text: "Select Mean (Known σ), Mean (Unknown σ), Proportion, Margin of Error, or Sample Size depending on the data you have available.",
      },
      {
        name: "Enter Your Sample Data",
        text: "Type your sample mean or proportion, standard deviation, and sample size — the form automatically shows only the fields relevant to your selected mode.",
      },
      {
        name: "Pick a Confidence Level",
        text: "Choose 80%, 85%, 90%, 95%, 98%, or 99% with one click, or enter a custom confidence level between 0 and 100.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to round results to, from 2 up to 5 places.",
      },
      {
        name: "Read the Live Results",
        text: "The confidence interval, margin of error, critical value, and standard error update instantly as you type, with the full formula substitution shown.",
      },
      {
        name: "Export or Share",
        text: "Copy the result, download it as CSV, TXT, or JSON, print a report, or copy a shareable URL with your inputs encoded.",
      },
    ],
    faq: [
      {
        q: "What is a confidence interval calculator?",
        a: "A confidence interval calculator is a free browser-based tool that estimates the range within which a population parameter — such as a mean or proportion — is likely to fall, at a chosen confidence level. It computes the interval using your sample mean or proportion, standard deviation, sample size, and confidence level.",
      },
      {
        q: "How is a confidence interval calculated?",
        a: "For a mean with known population standard deviation, the formula is x̄ ± Z × (σ ÷ √n). When the population standard deviation is unknown, the formula is x̄ ± t × (s ÷ √n), using the Student's t distribution with n − 1 degrees of freedom. For a proportion, it is p ± Z × √(p(1 − p) ÷ n).",
      },
      {
        q: "What is a good confidence level to use?",
        a: "95% is the most common choice across research, business, and quality control, balancing precision and reliability. 90% gives a narrower interval with slightly less certainty, while 99% gives a wider, more conservative interval — the right choice depends on how much risk of being wrong you can accept.",
      },
      {
        q: "What is the difference between using Z and t critical values?",
        a: "Use the Z distribution when the population standard deviation is known (or the sample is very large). Use the t distribution when only the sample standard deviation is known — it accounts for the extra uncertainty of estimating variability from a sample, and produces a wider interval, especially with small sample sizes.",
      },
      {
        q: "How do I calculate the margin of error?",
        a: "Margin of error equals the critical value (Z or t) multiplied by the standard error. Standard error is the standard deviation divided by the square root of the sample size for means, or √(p(1 − p) ÷ n) for proportions. Use the Margin of Error mode if you only need this value without a center point.",
      },
      {
        q: "How does the sample size estimator work?",
        a: "Given a target margin of error and confidence level, the calculator solves the margin of error formula for n. For proportions it uses n = (Z² × p(1 − p)) ÷ E², defaulting to p = 0.5 for the most conservative (largest) estimate when the true proportion is unknown. For means it uses n = (Z × σ ÷ E)².",
      },
      {
        q: "Why does a larger sample size produce a narrower confidence interval?",
        a: "Standard error is inversely proportional to the square root of the sample size, so as n increases, the standard error — and therefore the margin of error — shrinks. Quadrupling the sample size halves the margin of error, all else being equal.",
      },
      {
        q: "Can I enter a custom confidence level instead of the presets?",
        a: "Yes. Click the custom option and enter any confidence level between 0 and 100. The calculator computes the exact Z or t critical value for that level using an inverse normal or inverse t-distribution calculation, not a lookup table.",
      },
      {
        q: "What does it mean if my confidence interval for a proportion goes below 0 or above 1?",
        a: "The normal approximation used for proportion intervals can produce bounds slightly outside the valid 0–1 range when the sample proportion is very close to 0 or 1, or the sample size is small. In that case, treat the bound as 0 or 1 respectively, or consider a sample size large enough that np and n(1 − p) are both at least 5–10.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your sample data is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
