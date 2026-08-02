import { siteConfig } from "@/config/site";

export const pageSpeedScoreCalculatorConfig = {
  slug: "page-speed-score-calculator",
  name: "Page Speed Score Calculator",
  description: "Estimate your website's performance score from Core Web Vitals — LCP, INP, CLS, FCP, TBT, and Speed Index. Get a weighted score, letter grade, metric breakdown, and optimization recommendations. Free browser-based page speed calculator.",
  category: "data-analytics",
  icon: "⚡",
  free: true,
  relatedTools: [
    "session-duration-calculator",
    "bounce-rate-calculator",
    "conversion-rate-calculator",
    "seo-score-calculator",
    "domain-authority-estimator",
    "download-time-calculator",
  ],
  seo: {
    title: "Page Speed Score Calculator — Free Core Web Vitals Estimator | Productive Toolbox",
    description: "Estimate your website's performance score instantly using Core Web Vitals. Enter LCP, INP, CLS, TBT, FCP, and Speed Index to calculate an estimated Page Speed score with optimization recommendations.",
    keywords: [
      "page speed calculator",
      "website performance calculator",
      "core web vitals calculator",
      "lighthouse score calculator",
      "page speed score estimator",
      "website speed checker",
      "performance score calculator",
      "seo performance tool",
      "core web vitals",
      "page performance analyzer",
      "lcp calculator",
      "cls calculator",
      "inp calculator",
      "web vitals estimator",
      "free page speed tool",
      "website speed score",
      "page load performance calculator",
      "google pagespeed alternative",
      "site speed analyzer",
      "online performance calculator",
    ],
    openGraph: {
      title: "Page Speed Score Calculator — Free Core Web Vitals Estimator",
      description: "Estimate your website's performance score instantly using Core Web Vitals — LCP, INP, CLS, TBT, FCP, and Speed Index. Free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/page-speed-score-calculator`,
    },
    og: {
      title: "Page Speed Score Calculator — Free Core Web Vitals Estimator",
      description: "Estimate your website's performance score instantly using Core Web Vitals — LCP, INP, CLS, TBT, FCP, and Speed Index. Free and browser-based.",
      url: `${siteConfig.url}/tools/data-analytics/page-speed-score-calculator`,
    },
    howToSteps: [
      {
        name: "Gather Your Core Web Vitals",
        text: "Measure LCP, INP, CLS, FCP, TBT, and Speed Index using Lighthouse, Chrome DevTools, PageSpeed Insights, WebPageTest, or GTmetrix.",
      },
      {
        name: "Enter Each Metric",
        text: "Type each measured value into its field — seconds for LCP/FCP/Speed Index, milliseconds for INP/TBT, and a unitless decimal for CLS.",
      },
      {
        name: "Read the Live Score",
        text: "The estimated performance score, letter grade, and status update instantly on an animated circular gauge as you type.",
      },
      {
        name: "Review the Metric Breakdown",
        text: "Check the per-metric breakdown to see which Core Web Vitals are pulling your score down and by how much.",
      },
      {
        name: "Apply the Recommendations",
        text: "Follow the tailored optimization tips generated for any metric outside Google's recommended thresholds, then export or print the report.",
      },
    ],
    faq: [
      {
        q: "What is a Page Speed Score Calculator?",
        a: "A Page Speed Score Calculator is a free browser-based tool that estimates a website's overall performance score from manually entered Core Web Vitals — LCP, INP, CLS, FCP, TBT, and Speed Index — using a weighted formula inspired by Google Lighthouse's scoring methodology. It does not fetch live website data; you provide measurements from a tool like Lighthouse or PageSpeed Insights.",
      },
      {
        q: "How is the performance score calculated?",
        a: "Each metric is scored 0-100 based on how it compares to Google's recommended good/poor thresholds, then combined using weighted percentages: LCP 30%, INP 25%, TBT 20%, CLS 15%, FCP 5%, and Speed Index 5%. The weighted scores are summed and rounded to produce the final score out of 100.",
      },
      {
        q: "What is a good performance score?",
        a: "A score of 90-100 is rated Excellent, 70-89 is Good, 50-69 is Needs Improvement, and below 50 is Poor. These bands mirror the rating system used by Google Lighthouse and PageSpeed Insights.",
      },
      {
        q: "Why doesn't this match Google PageSpeed Insights exactly?",
        a: "This calculator uses a simplified linear approximation of Lighthouse's scoring curve since it has no access to Lighthouse's proprietary log-normal distribution data. It's designed to give a close, directionally accurate estimate when you already have your Core Web Vitals numbers, not an exact replica of PageSpeed Insights' output.",
      },
      {
        q: "What is LCP (Largest Contentful Paint)?",
        a: "LCP measures how long it takes for the largest visible element on the page — typically a hero image or heading — to finish rendering. Google considers 2.5 seconds or less to be good, and above 4 seconds to be poor.",
      },
      {
        q: "What is INP (Interaction to Next Paint)?",
        a: "INP measures how responsive a page is to user interactions like clicks, taps, and key presses, replacing First Input Delay as a Core Web Vital. A value of 200ms or less is considered good, and above 500ms is poor.",
      },
      {
        q: "What is CLS (Cumulative Layout Shift)?",
        a: "CLS measures how much visible content unexpectedly shifts during page load, often caused by images or ads without reserved space. A score of 0.1 or less is good, and above 0.25 is poor.",
      },
      {
        q: "Where do I get my LCP, INP, CLS, and other metric values?",
        a: "You can measure these in Chrome DevTools (Performance and Lighthouse panels), Google PageSpeed Insights, WebPageTest, or GTmetrix — all free tools that run a real or simulated page load and report each Core Web Vital.",
      },
      {
        q: "Does a good score guarantee good SEO rankings?",
        a: "No. Page speed and Core Web Vitals are one of many ranking factors Google considers. A strong score improves user experience and removes a potential ranking disadvantage, but content quality, relevance, and backlinks remain far more influential.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. The metric values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
