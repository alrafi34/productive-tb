import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "keyword-density-checker",
  name: "Keyword Density Checker",
  description: "Analyze your text to measure keyword frequency and density percentages. Track target keywords, filter stop words, flag overused terms, and export results for SEO content optimization.",
  category: "writing",
  icon: "🔍",
  free: true,
  backend: false,
  seo: {
    title: "Keyword Density Checker Tool — Free SEO Analyzer Online | Productive Toolbox",
    description: "Check keyword density instantly. Analyze word frequency, track target keywords, and flag overused terms. Free SEO tool — browser-based, no signup.",
    keywords: [
      "keyword density checker",
      "keyword density tool",
      "keyword density checker tool",
      "keyword density analyzer",
      "check keyword density",
      "keyword density analysis",
      "keyword density analysis tool",
      "analyze keyword density",
      "word density checker",
      "word frequency counter",
      "keyword density calculator",
      "keyword frequency checker",
      "keyword density percentage",
      "keyword density report",
      "measure keyword density",
      "calculating keyword density",
      "seo keyword density tool",
      "keyword density checker free",
      "keyword density checker online",
      "online keyword density checker",
      "best keyword density checker",
      "how to check keyword density",
      "keyword stuffing checker",
      "keyword density seo",
      "free keyword density tool no signup",
    ],
    openGraph: {
      title: "Keyword Density Checker Tool — Free SEO Analyzer Online",
      description: "Check keyword density instantly. Analyze word frequency, track target keywords, flag overused terms, and export results. Browser-based, no signup.",
      type: "website",
      url: `${siteConfig.url}/tools/writing/keyword-density-checker`,
    },
    howToSteps: [
      {
        name: "Paste Your Content",
        text: "Copy and paste your article, blog post, landing page copy, or any draft text into the editor. The analysis begins automatically as you type or paste — no submit button required.",
      },
      {
        name: "Configure Analysis Options",
        text: "Choose your settings: toggle stop-word filtering to remove common filler words, enable case-sensitive mode if capitalization matters for your content, and set a minimum word length to exclude short words from the results.",
      },
      {
        name: "Add Target Keywords",
        text: "Enter any specific keywords you want to track in the Target Keywords field, separated by commas. The tool highlights these terms in the results table so you can verify they appear with the right frequency.",
      },
      {
        name: "Review the Results Table",
        text: "The table displays every word with its count, density percentage, and an overuse flag for terms above 5%. Sort by count or density to prioritize your review — highest-frequency terms first reveals your content's topical weight.",
      },
      {
        name: "Adjust Content and Re-analyze",
        text: "Make edits in your writing tool based on the findings, then re-paste to verify the changes. Repeat until keyword distribution matches your SEO strategy and the text reads naturally.",
      },
      {
        name: "Export Results",
        text: "Click Export CSV or Export JSON to download the full analysis for reporting, client handoff, or archiving in a content audit workflow.",
      },
    ],
    faq: [
      {
        q: "What is a keyword density checker?",
        a: "A keyword density checker is a text analysis tool that measures how frequently each word appears in a piece of content and expresses it as a percentage of the total word count. For example, if the word 'SEO' appears 8 times in a 400-word article, its keyword density is 2%. This tells you whether a term is used proportionally — enough for topical clarity, but not so often that it reads as forced repetition.",
      },
      {
        q: "How is keyword density calculated?",
        a: "Keyword density is calculated by dividing the number of times a keyword appears by the total number of words in the text, then multiplying by 100. The formula is: Density (%) = (Keyword Count / Total Word Count) x 100. This tool applies that formula to every word in your text simultaneously and displays the results ranked by frequency.",
      },
      {
        q: "What is a good keyword density for SEO?",
        a: "There is no universally accepted ideal percentage, and Google has confirmed that keyword density is not a direct ranking factor. Most SEO practitioners treat 1-3% as a natural range for a primary keyword — dense enough to signal topical relevance, light enough to read naturally. This tool flags any term above 5% as potentially overused so you can review it, but whether to reduce it depends on context and readability, not a hard rule.",
      },
      {
        q: "What is the difference between keyword density and keyword frequency?",
        a: "Keyword frequency is the raw count of how many times a word appears — for example, 12 occurrences. Keyword density is that count expressed as a proportion of the total word count — for example, 12 occurrences in a 600-word article equals a 2% density. Frequency tells you the absolute count; density tells you the weight of that word relative to everything else in the text. Both metrics are shown in this tool's results table.",
      },
      {
        q: "Should I use stop-word filtering when analyzing content?",
        a: "For SEO keyword analysis, yes — enabling stop-word filtering almost always produces more useful results. Without it, common words like 'the,' 'is,' 'and,' and 'of' will dominate the results table, making it harder to see the meaningful keywords underneath. Turn filtering on to surface the content terms that actually contribute to topical relevance. Turn it off only when you specifically need to audit the full word distribution, such as checking readability or writing style.",
      },
      {
        q: "Can I track specific target keywords?",
        a: "Yes. Add one or more target keywords in the Target Keywords field and the tool highlights those terms in the results table, showing their count and density alongside the full word analysis. This is useful when you know which keywords you are trying to rank for and want to verify they appear with appropriate frequency before publishing.",
      },
      {
        q: "What does the overuse highlight mean?",
        a: "Any word with a density above 5% is flagged in the results table as potentially overused. This threshold is a review trigger, not a penalty indicator — it means the word appears frequently enough that you should read the surrounding sentences and judge whether the repetition sounds natural. If it reads fine, no change is needed. If it sounds mechanical, consider synonyms or restructuring a few sentences.",
      },
      {
        q: "Can I export keyword density results?",
        a: "Yes. Results can be exported as CSV for spreadsheet analysis and reporting, or as JSON for integration with content workflows and developer tools. The export includes each word, its count, and its density percentage — ready for client reports, content audits, or bulk comparisons across multiple pages.",
      },
      {
        q: "Does case-sensitive mode change the analysis?",
        a: "Yes, meaningfully. In default (case-insensitive) mode, 'SEO,' 'seo,' and 'Seo' are all counted as the same word. In case-sensitive mode, each variation is counted separately. This matters when your content contains proper nouns, brand names, or acronyms where capitalization carries distinct meaning.",
      },
      {
        q: "Is my text private when using this tool?",
        a: "Yes. All analysis runs entirely in your browser using JavaScript. Your text is never transmitted to any server, stored in any database, or accessible to anyone other than you. This means you can safely paste unpublished drafts, client content, or proprietary documents without any data leaving your device.",
      },
    ],
  },
  features: [
    "Real-time keyword density analysis",
    "Word frequency counting with density percentages",
    "Stop-word filtering",
    "Case-sensitive analysis mode",
    "Minimum word length control",
    "Target keyword tracking and highlighting",
    "Overuse flags for terms above 5% density",
    "Visual bar chart of top keywords",
    "Sortable results table",
    "Export to CSV and JSON",
    "No registration required",
    "100% browser-based",
  ],
  relatedTools: [
    "word-counter",
    "reading-time-calculator",
    "seo-score-calculator",
    "text-case-converter",
    "character-counter",
    "keyword-density-calculator-seo",
  ],
};
