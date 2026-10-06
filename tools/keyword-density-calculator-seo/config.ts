import { siteConfig } from "@/config/site";

export const keywordDensityCalculatorSeoConfig = {
  slug: "keyword-density-calculator-seo",
  name: "Keyword Density Calculator",
  description:
    "Analyze keyword density, word frequency, phrase frequency, and SEO content statistics instantly. Free online keyword density calculator with CSV/JSON export and real-time analysis.",
  category: "marketing",
  icon: "🔍",
  free: true,
  seo: {
    title:
      "Keyword Density Calculator – SEO Keyword Analyzer",
    description:
      "Analyze keyword density, word and phrase frequency, reading time and character count for any text, with CSV export.",
    keywords: [
      "keyword density calculator",
      "seo keyword analyzer",
      "keyword frequency checker",
      "word frequency tool",
      "seo content analyzer",
      "content optimization tool",
      "keyword checker online",
      "on page seo tool",
      "free seo tools",
      "content keyword analyzer",
      "phrase frequency checker",
      "text analysis tool",
    ],
    openGraph: {
      title: "Keyword Density Calculator – SEO Keyword Analyzer",
      description:
        "Analyze keyword density, word and phrase frequency, reading time and character count for any text, with CSV export.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/keyword-density-calculator-seo`,
    },
    faq: [
      { q: "What is keyword density and why does it matter?", a: "Keyword density is the share of all words in a text taken up by a keyword: (keyword count ÷ total words) × 100. Google does not rank pages by a density figure, but the measure is still a quick check that a page actually covers its topic and does not repeat a phrase so often that it reads as keyword stuffing." },
      { q: "What is the ideal keyword density for SEO in 2026?", a: "There is no perfect keyword density. Google has repeatedly stated it does not use keyword density as a direct ranking factor with a specific threshold. That said, most SEO practitioners consider 0.5–2.5% a safe range for primary keywords. Below 0.5% the page may send too weak a relevance signal; above 4–5% the page risks being interpreted as keyword stuffing. The most important principle is to write naturally for the reader — density is a diagnostic check, not a target to engineer." },
      { q: "What is keyword stuffing and how does Google detect it?", a: "Keyword stuffing is the deliberate overuse of a keyword in content, meta tags, alt attributes, or hidden text to manipulate search rankings. Google's algorithms detect it through statistical analysis of term frequency relative to natural language patterns, combined with semantic understanding of the content's meaning. A page where the primary keyword appears at 8% density alongside unrelated padding content is a clear signal. Penalties range from a mild ranking demotion to complete removal from the index for egregious cases." },
      { q: "What are stop words and should I filter them?", a: "Stop words are common function words like 'the', 'a', 'is', 'of', 'and', 'to', 'in', and 'that' which carry minimal SEO meaning on their own. Most keyword density analysers — including this one — exclude them by default to focus the frequency table on meaningful content words. You should enable stop-word filtering for most SEO use cases. The only time to disable it is when analysing specific phrases that intentionally include stop words, such as 'the end of SEO' as a target phrase." },
      { q: "What is n-gram analysis and when should I use it?", a: "N-gram analysis counts sequences of words rather than individual words. Bigrams are 2-word phrases (e.g., 'keyword density'), trigrams are 3-word phrases (e.g., 'keyword density calculator'). Use bigram analysis to identify which 2-word keyphrases are prominent in your content — these often correspond to secondary keyword targets and topic cluster terms. Use trigram analysis to surface long-tail phrases, check for inadvertent exact-match repetition, and align content with conversational search queries and voice search patterns." },
      { q: "How is reading time calculated?", a: "Reading time is estimated using 238 words per minute, which is the average adult silent reading speed established by research. Speaking time uses 130 words per minute, which reflects the pace of a clear, professional spoken delivery. Both are approximations — technical content with diagrams, code blocks, or complex terminology takes longer to process than narrative text. The estimates are most accurate as planning guides for content length, not precise time predictions." },
      { q: "Should I analyse the entire page or just the body text?", a: "For the most accurate on-page analysis, paste the full page text including all headings (H1, H2, H3), the introduction, body paragraphs, and conclusion. Do not include the navigation menu, footer links, or sidebar content — these are rendered on every page and are not part of the unique content signal. Your title tag and meta description are not usually visible in the page body, so check their keyword usage separately in an SEO metadata tool." },
      { q: "Can I use this to analyse competitor content?", a: "Yes. Copy the visible text from any competitor page, paste it into the tool, and run the frequency analysis. The results reveal which keywords and phrases the competitor is optimising around, which semantic terms they use extensively, and whether their content follows a healthy density pattern. This is one of the fastest ways to build a comprehensive content brief — by identifying which keyword clusters the top-ranking page covers that your draft does not." },
      { q: "How does keyword density relate to TF-IDF?", a: "Keyword density is a simple ratio of one term to the total word count. TF-IDF (Term Frequency–Inverse Document Frequency) is a more sophisticated measure that weights a term's frequency in a document against how common that term is across all documents in a corpus. TF-IDF punishes terms that are ubiquitous everywhere (like 'the') and rewards terms that are frequent in your document but rare across the web — making it a better measure of a term's topical significance. This tool uses keyword density because it is the practical metric for most content workflows, but the underlying principle of identifying terms that distinguish your content is the same." },
      { q: "Is my content private when I use this tool?", a: "Yes. We do not collect or store what you enter. This makes the tool safe to use for client content under NDA, embargoed articles before publication, proprietary product descriptions, or any sensitive draft." },
    ],
  },
};
