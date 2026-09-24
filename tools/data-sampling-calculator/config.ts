import { siteConfig } from "@/config/site";

export const dataSamplingCalculatorConfig = {
  slug: "data-sampling-calculator",
  name: "Data Sampling Calculator",
  description: "Calculate the required sample size for surveys, research studies, and A/B tests using confidence level, margin of error, population size, and expected proportion — with finite population correction.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "confidence-interval-calculator",
    "p-value-calculator",
    "correlation-coefficient-calculator",
    "data-normalization-calculator",
    "confusion-matrix-calculator",
    "time-series-forecast-calculator",
  ],
  seo: {
    title: "Data Sampling Calculator – Free Sample Size Calculator for Surveys & Research",
    description: "Calculate the ideal sample size for surveys, research, market studies, A/B testing, and statistical analysis. Free online data sampling calculator with confidence level, margin of error, and population size support.",
    keywords: [
      "data sampling calculator",
      "sample size calculator",
      "survey sample calculator",
      "research sample size",
      "statistics calculator",
      "confidence level calculator",
      "margin of error calculator",
      "population sampling calculator",
      "online sampling calculator",
      "free sample size tool",
      "cochran sample size formula",
      "market research sample calculator",
      "A/B test sample size calculator",
      "quality assurance sampling calculator",
      "finite population correction calculator",
      "expected proportion calculator",
      "poll sample size calculator",
      "statistically valid sample size",
      "z-score sample calculator",
      "sample size formula calculator",
    ],
    openGraph: {
      title: "Data Sampling Calculator – Free Sample Size Calculator for Surveys & Research",
      description: "Calculate statistically valid sample sizes for surveys, research, and A/B testing using confidence level, margin of error, and population size.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/data-sampling-calculator`,
    },
    og: {
      title: "Data Sampling Calculator – Free Sample Size Calculator for Surveys & Research",
      description: "Calculate statistically valid sample sizes for surveys, research, and A/B testing using confidence level, margin of error, and population size.",
      url: `${siteConfig.url}/tools/data-analytics/data-sampling-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Population Size",
        text: "Type your population size, or check Infinite Population if the population is unknown or very large.",
      },
      {
        name: "Choose a Confidence Level",
        text: "Select 90%, 95%, or 99% confidence, mapped internally to the corresponding Z-score.",
      },
      {
        name: "Set Margin of Error",
        text: "Enter your acceptable margin of error as a percentage, from 0.1% to 20%.",
      },
      {
        name: "Set Expected Proportion",
        text: "Use the slider or number field to set the expected response distribution — 50% is the most conservative default.",
      },
      {
        name: "Review the Required Sample Size",
        text: "Check the calculated sample size, formula breakdown, and sensitivity chart, then copy, download, or share your result.",
      },
    ],
    faq: [
      {
        q: "What is a data sampling calculator?",
        a: "A data sampling calculator is a free browser-based tool that calculates the required sample size for surveys, research studies, experiments, polls, market research, and A/B testing using standard statistical formulas based on confidence level, margin of error, population size, and expected proportion.",
      },
      {
        q: "How is sample size calculated?",
        a: "The calculator uses Cochran's formula: n₀ = (Z² × p × q) ÷ e², where Z is the Z-score for your confidence level, p is the expected proportion, q is 1 − p, and e is the margin of error. For a finite population, this is corrected: n = n₀ ÷ (1 + ((n₀ − 1) ÷ N)).",
      },
      {
        q: "What Z-scores are used for each confidence level?",
        a: "90% confidence uses a Z-score of 1.645, 95% confidence uses 1.96, and 99% confidence uses 2.576 — the standard values from the normal distribution for two-tailed confidence intervals.",
      },
      {
        q: "What does Infinite Population mean?",
        a: "Infinite Population is used when the population is unknown or very large relative to the sample (for example, general public opinion polling). It skips the finite population correction and uses n₀ directly.",
      },
      {
        q: "What is Expected Proportion and why does 50% matter?",
        a: "Expected Proportion is your best estimate of how the population splits on the question you're measuring. 50% is the most conservative choice because p × q is maximized at p = 0.5, producing the largest (safest) required sample size when you don't have prior data.",
      },
      {
        q: "What is finite population correction?",
        a: "Finite population correction reduces the required sample size when your population is small relative to the initial calculated sample size, since sampling a larger fraction of a small population yields more precision than the same absolute sample size would in a large population.",
      },
      {
        q: "How does margin of error affect sample size?",
        a: "A smaller margin of error requires a larger sample size — the relationship is roughly proportional to 1 ÷ e², so halving your margin of error roughly quadruples the required sample size. The sensitivity chart in this calculator visualizes that relationship.",
      },
      {
        q: "Can I share my calculation with someone else?",
        a: "Yes. Click Share URL to copy a link that encodes your population, confidence level, margin of error, and expected proportion as query parameters.",
      },
      {
        q: "Does this calculator handle A/B testing sample sizes?",
        a: "Yes, for the basic sample size needed to estimate a proportion with a given confidence and margin of error. For comparing two variants' conversion rates specifically, a dedicated A/B test significance calculator accounts for the comparison between two proportions.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
