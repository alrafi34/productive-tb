import { siteConfig } from "@/config/site";

export const pageRankEstimatorConfig = {
  slug: "page-rank-estimator",
  name: "Page Rank Estimator",
  description: "Estimate a webpage's Google ranking potential using a weighted SEO scoring model covering on-page, content, technical, UX, and authority signals. Get a score, grade, strengths, weaknesses, and prioritized recommendations. Free browser-based SEO estimator — does not use Google's actual ranking algorithm.",
  category: "marketing",
  icon: "📈",
  free: true,
  relatedTools: [
    "seo-score-calculator",
    "serp-ctr-estimator",
    "domain-authority-estimator",
    "keyword-density-calculator-seo",
    "backlink-ratio-calculator",
    "traffic-growth-calculator",
  ],
  seo: {
    title: "Page Rank Estimator — Free SEO Ranking Potential Tool Online",
    description: "Estimate your page's Google ranking potential with a weighted SEO score. Analyze on-page, content, technical SEO, UX, and authority signals, and get prioritized recommendations. Free, browser-based.",
    keywords: [
      "page rank estimator",
      "seo score checker",
      "ranking estimator",
      "google ranking estimator",
      "seo analyzer",
      "website ranking tool",
      "technical seo checker",
      "content optimization tool",
      "on page seo analyzer",
      "seo audit tool",
      "seo score calculator",
      "page seo checker",
      "seo grader",
      "seo checklist tool",
      "website seo score",
      "core web vitals checker",
      "seo recommendations tool",
      "free seo analyzer",
      "seo ranking potential",
      "google seo score tool",
    ],
    openGraph: {
      title: "Page Rank Estimator — Free SEO Ranking Potential Tool",
      description: "Estimate your page's Google ranking potential with a weighted SEO score covering on-page, content, technical, UX, and authority signals — free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/page-rank-estimator`,
    },
    og: {
      title: "Page Rank Estimator — Free SEO Ranking Potential Tool",
      description: "Estimate your page's Google ranking potential with a weighted SEO score covering on-page, content, technical, UX, and authority signals — free and browser-based.",
      url: `${siteConfig.url}/tools/marketing/page-rank-estimator`,
    },
    howToSteps: [
      {
        name: "Load an Example or Start Fresh",
        text: "Click Load Example to instantly populate the form with a sample page (Excellent, Poor, or Balanced), or start entering your own page's SEO data section by section.",
      },
      {
        name: "Fill In the Collapsible Sections",
        text: "Expand Basic SEO, Content Quality, Images, Internal SEO, Technical SEO, User Experience, and Authority, and enter the values that describe your page — title length, content length, HTTPS status, Core Web Vitals, backlinks, and more.",
      },
      {
        name: "Review Your Score Dashboard",
        text: "Watch the animated circular gauge update in real time as you type, showing your overall SEO score out of 100, letter grade, and ranking potential label.",
      },
      {
        name: "Expand the Category Breakdown",
        text: "Click any of the 7 category cards — On-Page, Content, Images, Internal SEO, Technical, UX, and Authority — to see the individual factor scores that make up that category's result.",
      },
      {
        name: "Review Strengths, Weaknesses, and Recommendations",
        text: "Check the Strengths and Weaknesses lists for a quick summary, then work through the Top Recommendations panel, which is sorted by the highest-impact improvements first.",
      },
      {
        name: "Save, Compare, or Export",
        text: "Save the report to history, compare it against a previously saved report side by side, or export the results as CSV, JSON, a printed report, or a full copied summary.",
      },
    ],
    faq: [
      {
        q: "What is a Page Rank Estimator?",
        a: "A Page Rank Estimator is a free browser-based tool that scores a webpage's SEO ranking potential using a weighted model built on widely accepted SEO best practices — covering on-page factors, content quality, technical SEO, user experience, and authority signals. It is not connected to Google and does not use or reproduce Google's actual ranking algorithm.",
      },
      {
        q: "Does this tool predict my actual Google ranking?",
        a: "No. This tool estimates ranking potential based on SEO best-practice signals, not your actual position in Google search results. Google's real ranking algorithm considers hundreds of signals, many of which (like proprietary quality and relevance models) cannot be replicated by a client-side tool. Use this score as a checklist and prioritization guide, not a ranking prediction.",
      },
      {
        q: "How is the overall SEO score calculated?",
        a: "The score is a weighted average across 7 categories — On-Page SEO (15%), Content Quality (20%), Images (6%), Internal SEO (8%), Technical SEO (25%), User Experience (10%), and Authority (16%) — each made up of individual factors like title length, HTTPS, Core Web Vitals, and backlinks, scored 0-100 and combined using the category weight.",
      },
      {
        q: "What is a good Page Rank Estimator score?",
        a: "Scores of 85 and above indicate Excellent ranking potential, 70-84 is Good, 55-69 is Average, 40-54 is Poor, and below 40 is Very Poor. These map to letter grades from A+ down to F, mirroring the kind of scoring scale used by common SEO auditing tools.",
      },
      {
        q: "Why does Technical SEO have the highest category weight?",
        a: "Technical SEO (25%) includes foundational, binary requirements like HTTPS, mobile-friendliness, and a correct robots meta tag — issues here can block a page from ranking entirely regardless of how good the content is, which is why the model weights them heavily alongside Content Quality (20%).",
      },
      {
        q: "How are the Top Recommendations sorted?",
        a: "Recommendations are generated for every factor scoring below 75 out of 100, then sorted so the factors with the largest combination of low score and high category impact appear first — meaning fixing the top recommendation moves your overall score the most.",
      },
      {
        q: "Can I compare two different SEO reports?",
        a: "Yes. Save a report to history, then click Compare next to any saved entry to see a side-by-side breakdown of the overall score and every category score against your current inputs — useful for tracking improvement after making changes to a page.",
      },
      {
        q: "What do the Strengths and Weaknesses lists mean?",
        a: "Strengths lists any factor scoring 85 or above, representing signals your page already handles well. Weaknesses lists any factor scoring below 50, representing the areas most likely to be holding your ranking potential back and worth addressing first.",
      },
      {
        q: "Can I use this tool for a page that hasn't been published yet?",
        a: "Yes. Because every input is manually entered rather than pulled from a live URL, you can use this tool during the content-planning or pre-publish stage to check title length, content depth, and technical requirements before a page goes live.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your page's SEO data, scores, and any saved reports are never transmitted to any server, stored in any database, or accessible to anyone other than you. Report history is stored only in your browser's local storage.",
      },
    ],
  },
};
