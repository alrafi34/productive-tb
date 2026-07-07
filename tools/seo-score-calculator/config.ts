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
    title: "SEO Score Calculator — Free On-Page SEO Checker Online",
    description:
      "Check your page's on-page SEO score instantly. Analyze title, meta description, keyword density, content length, ALT text, internal links, and technical SEO signals — free, browser-based, no signup.",
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
      title: "SEO Score Calculator — Free On-Page SEO Checker Online",
      description:
        "Instantly score your page's on-page SEO across 13 factors — title, meta, content, keywords, images, links, and technical signals. Free, browser-based, no account required.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/seo-score-calculator`,
    },
  },
};
