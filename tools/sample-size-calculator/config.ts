import { siteConfig } from "@/config/site";

export const sampleSizeCalculatorConfig = {
  slug: "sample-size-calculator",
  name: "Sample Size Calculator",
  description: "Calculate the minimum sample size needed for surveys, research studies, and polls. Supports finite and infinite populations, confidence levels, margin of error, design effect, and instant results — free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "confidence-interval-calculator",
    "a-b-test-calculator",
    "p-value-calculator",
    "standard-deviation-calculator",
    "mean-calculator",
    "z-score-calculator",
  ],
  seo: {
    title: "Free Sample Size Calculator Online – Calculate Survey Sample Size",
    description: "Calculate the required sample size for surveys, research studies, polls, UX testing, and medical research. Supports confidence levels, margin of error, finite populations, and instant results — free and browser-based.",
    keywords: [
      "sample size calculator",
      "survey sample size calculator",
      "research sample size",
      "statistical sample size calculator",
      "confidence level calculator",
      "margin of error calculator",
      "finite population sample size",
      "sample size formula",
      "research calculator",
      "survey calculator",
      "population sample size calculator",
      "how many survey responses do i need",
      "sample size for research study",
      "polling sample size calculator",
      "clinical trial sample size calculator",
      "free sample size calculator",
      "online sample size calculator",
    ],
    openGraph: {
      title: "Free Sample Size Calculator Online",
      description: "Calculate the minimum sample size needed for surveys, polls, and research studies with confidence level, margin of error, and finite population correction — all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/sample-size-calculator`,
    },
    og: {
      title: "Free Sample Size Calculator Online",
      description: "Calculate the minimum sample size needed for surveys, polls, and research studies with confidence level, margin of error, and finite population correction — all in your browser.",
      url: `${siteConfig.url}/tools/data-analytics/sample-size-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Population Size",
        text: "Type your total population, or check Infinite Population if you're surveying a very large or unbounded group.",
      },
      {
        name: "Choose a Confidence Level",
        text: "Select how confident you want to be that your results reflect the true population — 95% is the industry standard.",
      },
      {
        name: "Set Your Margin of Error",
        text: "Choose how much sampling error you can tolerate, from 0.1% to 20%. Lower values require larger samples.",
      },
      {
        name: "Adjust Expected Proportion",
        text: "Drag the slider to your best estimate of the response split, or leave it at 50% for the safest, most conservative result.",
      },
      {
        name: "Fine-Tune Advanced Options",
        text: "Optionally set a design effect for cluster sampling, switch between one-sided and two-sided tests, or toggle the confidence interval panel.",
      },
      {
        name: "Read the Live Result and Export",
        text: "The required sample size updates instantly as you type. Copy the result, download a CSV, TXT, or JSON report, print it, or share a URL with your inputs encoded.",
      },
    ],
    faq: [
      {
        q: "What is a sample size calculator?",
        a: "A sample size calculator is a free browser-based tool that determines the minimum number of responses needed for statistically reliable survey or research results. It uses your population size, confidence level, margin of error, and expected proportion to compute the required sample size using the standard statistical formula.",
      },
      {
        q: "How is sample size calculated?",
        a: "The calculator first computes n = (Z squared times p times (1 minus p)) divided by E squared for an infinite population, where Z is the Z-score for your confidence level, p is the expected proportion, and E is the margin of error. If you provide a finite population size, a correction formula reduces this number to account for the smaller population.",
      },
      {
        q: "What is a good sample size for a survey?",
        a: "It depends on your population, confidence level, and margin of error, so there is no universal number. A common benchmark is around 385 respondents for a large or infinite population at 95% confidence and a plus-or-minus 5% margin of error, but smaller populations or wider margins require fewer.",
      },
      {
        q: "What is the difference between confidence level and margin of error?",
        a: "Confidence level is how certain you want to be that your sample reflects the true population. Margin of error is how wide the range of uncertainty is around your result, expressed as a percentage. Both work together to define how reliable and precise your survey results are.",
      },
      {
        q: "How do I decide between finite and infinite population?",
        a: "Use a finite population whenever you know the total size of the group you are studying and it is under roughly 1,000,000, since the correction meaningfully reduces the required sample. For very large or effectively unbounded populations, such as a country's general public, check Infinite Population.",
      },
      {
        q: "What does Expected Proportion mean, and why does 50% matter?",
        a: "Expected proportion is your best guess at how responses will split, for example the percentage of people expected to answer yes. The value p times (1 minus p) is maximized at 50%, which is why 50% produces the largest, most conservative sample size when the true split is unknown.",
      },
      {
        q: "What is the Design Effect (DEFF) and when should I use it?",
        a: "Design Effect accounts for sampling designs more complex than simple random sampling, such as cluster sampling by school, clinic, or geographic region. A DEFF greater than 1 inflates the required sample size to compensate for the reduced statistical efficiency of clustered data.",
      },
      {
        q: "What's the difference between a one-sided and two-sided test?",
        a: "A two-sided test accounts for the possibility of a difference in either direction and is the standard choice for most surveys. A one-sided test only checks for a difference in one specific direction and requires a smaller Z-score, and therefore a smaller sample size, for the same confidence level.",
      },
      {
        q: "Why does a smaller margin of error require a much larger sample?",
        a: "Margin of error appears squared in the denominator of the sample size formula, so cutting it in half roughly quadruples the required sample size. Going from a plus-or-minus 10% to a plus-or-minus 5% margin of error, for instance, increases the required sample size by about four times.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
      },
    ],
  },
};
