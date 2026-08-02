import { siteConfig } from "@/config/site";

export const abTestCalculatorConfig = {
  slug: "a-b-test-calculator",
  name: "A/B Test Calculator",
  description: "Analyze A/B test results instantly with a two-proportion z-test. Calculate conversion rates, lift, Z-scores, p-values, confidence intervals, and statistical significance — free and browser-based.",
  category: "data-analytics",
  icon: "🧪",
  free: true,
  relatedTools: [
    "sample-size-calculator",
    "p-value-calculator",
    "chi-square-calculator",
    "confidence-interval-calculator",
    "standard-deviation-calculator",
    "z-score-calculator",
  ],
  seo: {
    title: "Free A/B Test Calculator – Statistical Significance & Conversion Analysis",
    description: "Analyze A/B test results instantly with this free online A/B test calculator. Calculate conversion rates, lift, p-values, Z-scores, and confidence intervals directly in your browser.",
    keywords: [
      "a/b test calculator",
      "ab testing calculator",
      "statistical significance calculator",
      "conversion rate calculator",
      "split test calculator",
      "p-value calculator",
      "z test calculator",
      "conversion lift calculator",
      "experiment analysis tool",
      "online ab test tool",
      "two proportion z test calculator",
      "ab test significance calculator",
      "free ab test calculator",
      "marketing experiment calculator",
    ],
    openGraph: {
      title: "Free A/B Test Calculator Online",
      description: "Calculate conversion rates, lift, Z-scores, p-values, and statistical significance for A/B tests instantly, all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/a-b-test-calculator`,
    },
    og: {
      title: "Free A/B Test Calculator Online",
      description: "Calculate conversion rates, lift, Z-scores, p-values, and statistical significance for A/B tests instantly, all in your browser.",
      url: `${siteConfig.url}/tools/data-analytics/a-b-test-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Variant A Data",
        text: "Type the total visitors and conversions for your control variant (Variant A).",
      },
      {
        name: "Enter Variant B Data",
        text: "Type the total visitors and conversions for your challenger variant (Variant B).",
      },
      {
        name: "Choose a Confidence Level",
        text: "Select 90%, 95%, or 99% — 95% is the standard used by most A/B testing tools.",
      },
      {
        name: "Select a Test Type",
        text: "Use two-tailed to detect a difference in either direction, or one-tailed if you only care whether B beats A specifically.",
      },
      {
        name: "Read the Live Results and Export",
        text: "Conversion rates, lift, Z-score, p-value, and the significance verdict update instantly. Copy, download as CSV, TXT, or JSON, print, or share a URL with your inputs encoded.",
      },
    ],
    faq: [
      {
        q: "What is an A/B test calculator?",
        a: "An A/B test calculator is a free browser-based tool that determines whether the difference in conversion rate between two variants is statistically significant. It uses a two-proportion z-test to compute conversion rates, lift, a Z-score, a p-value, and a confidence interval from your visitor and conversion counts.",
      },
      {
        q: "How is statistical significance calculated in an A/B test?",
        a: "The calculator computes a pooled conversion rate across both variants, derives a standard error from that pooled rate, and divides the observed difference in conversion rates by the standard error to get a Z-score. That Z-score is converted to a p-value, and if the p-value is below your significance threshold, the result is statistically significant.",
      },
      {
        q: "What is a good p-value for an A/B test?",
        a: "The most common threshold is p less than 0.05, corresponding to 95% confidence, meaning there is less than a 5% chance the observed difference happened purely by chance. Some teams use a stricter p less than 0.01 threshold for high-stakes decisions.",
      },
      {
        q: "What is the difference between a one-tailed and two-tailed test?",
        a: "A two-tailed test checks whether Variant B is either better or worse than Variant A, and is the standard, more conservative choice. A one-tailed test only checks whether B is better, or only worse, than A in one specific direction, which requires less evidence to reach significance for that direction.",
      },
      {
        q: "What does lift mean in A/B testing?",
        a: "Lift is the relative percentage change in conversion rate between the two variants, calculated as the difference in rates divided by Variant A's rate, times 100. A lift of plus 19% means Variant B's conversion rate is 19% higher than Variant A's, relatively speaking.",
      },
      {
        q: "Why did my test show 'not statistically significant'?",
        a: "This usually means either the true difference between variants is small or nonexistent, or your sample size is too small to detect the difference reliably. Use a sample size calculator before running your next test to determine how many visitors you need.",
      },
      {
        q: "Can I use this calculator for more than website conversion rates?",
        a: "Yes. The two-proportion z-test works for any comparison of two binary outcome rates between independent groups, including email open rates, app install rates, sign-up rates, or click-through rates.",
      },
      {
        q: "What does the confidence interval of the difference tell me?",
        a: "It shows the range of values the true difference in conversion rates is likely to fall within, at your chosen confidence level. If the interval does not include zero, that supports a statistically significant difference between variants.",
      },
      {
        q: "How large does my sample size need to be for reliable results?",
        a: "It depends on your baseline conversion rate and the minimum lift you want to detect, since smaller expected effects require larger samples. Use a dedicated sample size calculator before launching your test to plan an appropriate visitor count per variant.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your visitor and conversion numbers are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
