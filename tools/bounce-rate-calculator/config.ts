import { siteConfig } from "@/config/site";

export const bounceRateCalculatorConfig = {
  slug: "bounce-rate-calculator",
  name: "Bounce Rate Calculator",
  description: "Calculate website bounce rate instantly using the bounce rate formula. Free online tool for SEO, Google Analytics, web analytics, and digital marketing reporting.",
  category: "marketing",
  icon: "📉",
  free: true,
  relatedTools: [
    "conversion-rate-calculator",
    "ctr-calculator",
    "cost-per-click-cpc-calculator",
    "keyword-density-checker",
    "seo-score-calculator",
  ],
  seo: {
    title: "Bounce Rate Calculator — Free Bounce Rate Formula Tool Online | Productive Toolbox",
    description: "Calculate bounce rate instantly using the formula: (single-page sessions ÷ total sessions) × 100. Free bounce rate calculator for Google Analytics, GA4, SEO, and web analytics.",
    keywords: [
      "bounce rate calculator",
      "bounce rate formula",
      "calculate bounce rate",
      "formula for bounce rate",
      "bounce rate equation",
      "bounce rate formula google analytics",
      "bounce rate formula in google analytics",
      "calculate bounce rate google analytics",
      "google analytics bounce rate formula",
      "what is a good bounce rate",
      "bounce rate calculator online",
      "bounce calculator",
      "website bounce rate calculator",
      "bounce rate how to calculate",
      "bounce rate formula ga4",
      "bounce rate vs engagement rate",
      "bounce rate benchmarks",
      "reduce bounce rate",
      "seo bounce rate",
      "free bounce rate calculator",
      "online bounce rate calculator",
    ],
    openGraph: {
      title: "Bounce Rate Calculator — Free Bounce Rate Formula Tool Online",
      description: "Calculate bounce rate using the formula (single-page sessions ÷ total sessions) × 100. Covers Google Analytics, GA4, and industry benchmarks.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/bounce-rate-calculator`,
    },
    og: {
      title: "Bounce Rate Calculator — Free Bounce Rate Formula Tool Online",
      description: "Calculate bounce rate using the formula (single-page sessions ÷ total sessions) × 100. Covers Google Analytics, GA4, and industry benchmarks.",
      url: `${siteConfig.url}/tools/marketing/bounce-rate-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Single-Page Sessions",
        text: "Type the number of sessions where the visitor viewed only one page and left. In Universal Analytics this is the Bounces metric. In GA4 it is total sessions minus engaged sessions.",
      },
      {
        name: "Enter Total Sessions",
        text: "Type the total number of sessions for the same page and time period. Match the date range exactly to your bounce count — both numbers must come from the same Analytics report row.",
      },
      {
        name: "Read the Bounce Rate and Performance Badge",
        text: "Bounce rate calculates instantly using the formula (single-page sessions divided by total sessions) times 100. A performance badge contextualizes the result. Refer to the benchmark table for website-type-specific targets.",
      },
      {
        name: "Compare Pages or Periods",
        text: "Use the history panel to compare bounce rates for different pages or time periods side by side without re-entering values. Useful for A/B test analysis or month-over-month reporting.",
      },
      {
        name: "Export or Share",
        text: "Copy the result to clipboard or download as TXT or CSV for reports. The shareable URL encodes your inputs so you can send the exact calculation to a colleague.",
      },
    ],
    faq: [
      {
        q: "What is the bounce rate formula?",
        a: "The bounce rate formula is: Bounce Rate = (Single-Page Sessions divided by Total Sessions) times 100. A single-page session is one where the user viewed only one page before leaving. For example, 1,500 bounces out of 5,000 sessions equals (1,500 divided by 5,000) times 100 = 30 percent.",
      },
      {
        q: "What is the bounce rate formula in Google Analytics?",
        a: "In Universal Analytics, bounce rate equals single-page sessions divided by total sessions times 100 — the standard formula. In Google Analytics 4, bounce rate equals 100 minus engagement rate. GA4 defines an engaged session as one lasting more than 10 seconds, having a conversion event, or having 2 or more pageviews. GA4 typically reports higher bounce rates than UA for the same site because the engagement threshold is stricter.",
      },
      {
        q: "What is a good bounce rate?",
        a: "A good bounce rate depends on website type. As a general guide, 10 to 30 percent is excellent, 31 to 50 percent is good, 51 to 70 percent is average and acceptable for many site types, and above 70 percent warrants investigation unless the site is a blog, news site, or single-CTA landing page where higher rates are expected.",
      },
      {
        q: "What is bounce rate?",
        a: "Bounce rate is the percentage of visitors who view only one page before leaving your site. It measures content-audience fit, page load performance, and traffic quality. A high bounce rate on a conversion page usually indicates a mismatch between visitor expectations and page content.",
      },
      {
        q: "What is the difference between bounce rate and exit rate?",
        a: "Bounce rate measures sessions that consisted of exactly one page. Exit rate measures the percentage of sessions that ended on a specific page regardless of how many pages were viewed before it. A high exit rate on a confirmation page is expected and normal — a high bounce rate on a product page is not.",
      },
      {
        q: "How is bounce rate different in GA4 vs Universal Analytics?",
        a: "Universal Analytics defined a bounce as any session with one pageview and no additional interactions. GA4 redefined it as the inverse of engagement — sessions not meeting the 10-second threshold, conversion event, or 2-pageview criteria. GA4 typically shows higher bounce rates than UA for the same site. Never directly compare UA and GA4 bounce rate percentages.",
      },
      {
        q: "Does bounce rate affect SEO?",
        a: "Bounce rate is not a confirmed direct Google ranking factor. However it correlates with user experience signals that influence rankings — dwell time and pogo-sticking. A persistently high bounce rate on a key page can indirectly signal to Google that the page is not satisfying searcher intent.",
      },
      {
        q: "How do I reduce bounce rate?",
        a: "The most impactful improvements are: improve page load speed (1 second faster reduces mobile bounce by 8 to 10 percent), match landing page content to the ad or query that brought the visitor, add clear internal links to encourage exploration, improve above-the-fold content to establish relevance within 3 seconds, and fix mobile UX issues.",
      },
      {
        q: "How do I calculate bounce rate from Google Analytics data?",
        a: "In Universal Analytics go to Behavior, Site Content, All Pages and find the Bounce Rate column. To calculate manually use (Bounces divided by Sessions) times 100. In GA4 go to Reports, Engagement, Pages and Screens — engagement rate is shown directly. Bounce rate equals 100 minus engagement rate. Export the data and enter it into this calculator for a formatted result with performance context.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your session counts, bounce figures, and any other values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
