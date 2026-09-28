import { siteConfig } from "@/config/site";

export const seoScoreCalculatorConfig = {
  slug: "seo-score-calculator",
  name: "SEO Score Calculator",
  description:
    "Check your page's on-page SEO score instantly. Analyze title, meta description, keyword density, content length, ALT text, internal links, and technical SEO signals — free, browser-based, no signup.",
  category: "marketing",
  icon: "📊",
  free: true,
  seo: {
    title: "SEO Score Calculator – On-Page SEO Checklist (0–100)",
    description:
      "Score a page out of 100 on 13 on-page SEO factors: title, meta description, keyword use, content length, H1, URL, image ALT text, links and technical basics.",
    keywords: [
      // Primary
      "seo score calculator",
      // Secondary
      "on page seo checker",
      "seo analyzer free",
      "website seo score",
      // Long-tail
      "free seo score checker online",
      "on page seo score tool",
      "seo checker no signup",
      "check seo score of a page",
      "seo audit tool free online",
      "meta description length checker",
      "title tag length checker seo",
      "keyword density checker free",
      "on-page seo optimizer",
      "seo score checker for website",
      "technical seo checker online",
    ],
    openGraph: {
      title: "SEO Score Calculator – On-Page SEO Checklist (0–100)",
      description:
        "Score a page out of 100 on 13 on-page SEO factors: title, meta description, keyword use, content length, H1, URL, image ALT text, links and technical basics.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/seo-score-calculator`,
    },
    howToSteps: [
      { name: "Enter the page details", text: "Type the page title, meta description, target keyword and URL slug. Together these four fields are worth 40 of the 100 points." },
      { name: "Add the content figures", text: "Enter the word count, the H1 text, the number of images and how many have ALT text, and the internal and external link counts, from your CMS or the published page." },
      { name: "Set the technical checks", text: "Tick HTTPS, mobile-friendly and canonical tag if they apply, and set the robots meta tag to index unless the page should stay out of search." },
      { name: "Read the score", text: "The score from 0 to 100, a grade from F to A+ and a list of fixes, highest-value first, update as you type. Load the sample to see a worked example." },
      { name: "Copy the report", text: "Copy the report to paste into an audit document or ticket, and compare it after your changes." },
    ],
    faq: [
      { q: "How is the SEO score calculated?", a: "Thirteen factors add up to 100 points: title 10, meta description 10, keyword usage 10, content length 15, H1 10, URL 10, image ALT text 10, internal links 5, external links 5, HTTPS 5, mobile-friendly 5, canonical tag 3 and robots meta 2. Grades run from A+ (90 and above) to F (below 40)." },
      { q: "Does Google use an SEO score?", a: "No. Google does not publish or use any single SEO score. This one is a checklist of widely recommended on-page practices; a high score means the basics are in place, not that the page will rank. Relevance, content quality, links from other sites and user experience matter more." },
      { q: "How long should a title tag be?", a: "About 50–60 characters. Google cuts titles at roughly 600 pixels on desktop, so longer ones end in an ellipsis. Put the main keyword near the start and keep each page's title unique; Google may rewrite titles that do not describe the page well." },
      { q: "How long should a meta description be?", a: "About 140–160 characters, which fits on most desktop results; mobile shows a little less. Meta descriptions are not a ranking factor, but a clear summary that includes the search term can raise the click-through rate. Google often replaces them with text from the page." },
      { q: "How many words does a page need?", a: "There is no minimum. The calculator gives full marks from 1,500 words because in-depth pages tend to answer more of the questions behind a search, but a short page that fully answers a simple question can rank well. Aim to be more useful than the pages already ranking, not to hit a number." },
      { q: "What keyword density should I aim for?", a: "Do not target a density. Use the main keyword in the title, H1, URL and early in the text, then write naturally with related terms and synonyms. Repeating a phrase unnaturally reads badly and can count as keyword stuffing under Google's spam policies." },
      { q: "Is my page data saved or sent anywhere?", a: "No. The score is calculated in your browser and nothing you type is sent to a server." },
    ],
  },
};
