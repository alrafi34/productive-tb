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
    title: "Keyword Density Checker — Free Word Density Tool Online",
    description: "Check keyword density for single words and 2- or 3-word phrases, track target keywords and phrases, flag overused terms and export CSV. Free.",
    keywords: [
      // Primary — 500/mo (Google Ads Keyword Planner, May 2026)
      "keyword density checker",
      "keyword density tool",
      "keyword density checker tool",
      "word density checker",
      "word density tool",
      "kw density tool",
      "check keyword density tool",
      // Secondary — 50/mo
      "keyword density checker free",
      "keyword stuffing checker",
      "check keyword stuffing",
      "keyword density analyzer",
      "keyword density calculator",
      "keyword density counter",
      "keyword density finder",
      "word density analyzer",
      "word density counter",
      "density checker",
      "keyword density checker extension",
      "online keyword density checker",
      "keyword density analyzer tool",
      // Long-tail
      "keyword density checker free tool",
      "seo keyword density tool",
      "keyword density percentage checker",
      "how to check keyword density",
      "free keyword density tool no signup",
    ],
    openGraph: {
      title: "Keyword Density Checker — Free Word Density Tool Online",
      description: "Check keyword density for single words and 2- or 3-word phrases, track target keywords and phrases, flag overused terms and export CSV. Free.",
      type: "website",
      url: `${siteConfig.url}/tools/writing/keyword-density-checker`,
    },
    howToSteps: [
      { name: "Paste your content", text: "Paste your article, page copy or draft into the editor; the analysis updates as you type." },
      { name: "Set the options", text: "Turn stop-word filtering on or off, choose case-sensitive counting and set a minimum word length." },
      { name: "Switch between words and phrases", text: "Use the tabs to see single words, two-word phrases or three-word phrases. Phrases are counted within sentences and listed when they appear at least twice." },
      { name: "Check your target keywords", text: "Add the words or phrases you want to rank for, separated by commas. Each one shows how many times it appears, its density and whether it was found at all." },
      { name: "Review the results", text: "Sort the table by count or density; anything at 5% or more is flagged so you can check whether it reads naturally." },
      { name: "Copy or export", text: "Copy the list or download it as CSV or JSON." },
    ],
    faq: [
      {
        q: "What is a keyword density checker?",
        a: "A keyword density checker is a text analysis tool that measures how frequently each word appears in a piece of content and expresses it as a percentage of the total word count. For example, if the word 'SEO' appears 8 times in a 400-word article, its keyword density is 2%. This tells you whether a term is used proportionally — enough for topical clarity, but not so often that it reads as forced repetition.",
      },
      {
        q: "What is a word density checker?",
        a: "A word density checker and a keyword density checker are the same type of tool — both measure how often each individual word appears relative to the total word count, expressed as a percentage. Word density is the broader term covering all words in the text; keyword density typically refers to the density of SEO target terms. This tool functions as both: it analyzes every word's density and lets you isolate specific target keywords for focused tracking.",
      },
      {
        q: "Can this tool detect keyword stuffing?",
        a: "Yes. The keyword stuffing checker functionality flags any word with a density above 5% as potentially overused. Keyword stuffing — repeating a term unnaturally often to manipulate search rankings — typically shows up as densities of 6 to 15% or higher. The flag is a review trigger: paste your text, look for flagged terms, read the surrounding sentences, and decide whether the repetition is natural or mechanical. Google penalizes content where keyword stuffing is detectable to a reader.",
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
        a: "Yes. Add one or more target words or phrases, such as keyword density checker, in the Target keywords field. Each target gets its own row with the number of whole-word matches, its density and a note if it was not found. Matches never span two sentences.",
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
        a: "Yes. We do not collect or store what you enter. This means you can safely paste unpublished drafts, client content, or proprietary documents.",
      },
      { q: "Does it check two- and three-word phrases?", a: "Yes. Switch to the 2-word or 3-word tab to see the phrases you repeat, such as project management or keyword density checker. With stop words ignored, phrases that start or end with a word like the, of or and are skipped, and only phrases used at least twice are listed." },
      { q: "How is phrase density calculated?", a: "The same way as for single words: the number of times the phrase appears divided by the total number of words, times 100. A three-word phrase used 4 times in an 800-word article has a density of 0.5%." },
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
    "Private: your inputs are not collected or stored",
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
