import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "word-counter",
  name: "Word Counter",
  description: "Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter — no sign-up required, runs entirely in your browser.",
  category: "writing",
  icon: "📝",
  free: true,
  backend: false,
  seo: {
    title: "Word Counter — Free Online Word Count Tool for Essays & SEO | Productive Toolbox",
    description: "Count words, characters, sentences, and reading time instantly. Free word counter for essays, blog posts, and SEO content. No sign-up, 100% browser-based.",
    keywords: [
      "word counter",
      "word counter online",
      "word count tool",
      "word count checker",
      "count words",
      "word counter for essays",
      "essay word counter",
      "online word count",
      "count words in text",
      "word count online",
      "paragraph word count",
      "article word counter",
      "word counter for essay",
      "word frequency counter",
      "word counting tool",
      "count my words",
      "how many words is this",
      "word count for essay",
      "character counter",
      "reading time calculator",
      "free word counter no sign up",
      "word counter for seo",
      "word counter for blog posts",
      "sentence counter",
      "how many words are in this paragraph",
    ],
    openGraph: {
      title: "Word Counter — Free Online Word Count Tool for Essays & SEO",
      description: "Count words, characters, sentences, and reading time instantly. Free word counter for essays, blog posts, and SEO content. No sign-up, browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/writing/word-counter`,
    },
    howToSteps: [
      {
        name: "Paste or type your text",
        text: "Click inside the editor and paste text from your clipboard (Ctrl+V / Cmd+V) or start typing directly. The counter updates with every keystroke — no submit button needed.",
      },
      {
        name: "Read the live metric panel",
        text: "Check the word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time — all displayed at once above or beside the editor.",
      },
      {
        name: "Compare against your target",
        text: "If you have a minimum or maximum word count requirement (for an essay, SEO article, or social post), compare the displayed count against that target and adjust your content accordingly.",
      },
      {
        name: "Trim or expand as needed",
        text: "Delete or add content in the editor and watch the counts update in real time. This makes it easy to hit exact word count targets without manual counting.",
      },
      {
        name: "Copy the final content",
        text: "Once your text meets its target length and structure, copy it from the editor and paste it into your publishing destination — Google Docs, WordPress, email client, or anywhere else.",
      },
    ],
    faq: [
      {
        q: "What is a word counter?",
        a: "A word counter is an online tool that analyzes a block of text and reports key writing metrics — total words, characters (with and without spaces), sentences, paragraphs, and estimated reading time. Unlike the word count feature built into Microsoft Word or Google Docs, a browser-based word counter works on any text from any source: copied web content, draft emails, social media posts, or raw notes — without needing to open a document editor.",
      },
      {
        q: "How does word count affect SEO?",
        a: "Word count is not a direct Google ranking factor, but content length correlates strongly with rankings because longer content tends to cover a topic more thoroughly. Most pages that rank on page 1 for competitive keywords have 1,000–2,500 words. For blog posts and pillar pages, 1,500–2,500 words is the commonly recommended target. For product pages and landing pages, 300–800 words is typically enough. Use this tool to check your article length before publishing and compare it against the top-ranking pages for your target keyword.",
      },
      {
        q: "How is reading time calculated?",
        a: "Reading time is estimated by dividing the total word count by 200 — the average adult silent reading speed in words per minute. So a 1,000-word article takes approximately 5 minutes to read. This is a useful signal for email subject lines, blog post headers, newsletter planning, and YouTube script timing. The result is always rounded up to the nearest minute.",
      },
      {
        q: "What is the difference between character count with and without spaces?",
        a: "Character count with spaces includes every character in the text, including spaces, tabs, and line breaks. Character count without spaces excludes all whitespace, counting only visible characters like letters, numbers, and punctuation. Most social media platforms (Twitter/X, LinkedIn, Instagram captions) count characters with spaces. Some programming environments and file size checks use without-spaces counts. This tool provides both so you can match whichever limit applies.",
      },
      {
        q: "What word count should a blog post be?",
        a: "It depends on the topic and competition. For informational content competing in Google search, 1,500–2,500 words is a reliable target for most niches. Short-form listicles and news posts can rank at 600–900 words. Long-form guides and pillar pages often exceed 3,000 words. The best approach: search your target keyword, check the word counts of the top 3 results using this tool, and aim to match or modestly exceed them while keeping every section genuinely useful.",
      },
      {
        q: "How many words should a Twitter (X) post be?",
        a: "Twitter/X has a 280-character limit for standard accounts and 25,000 characters for X Premium (Blue) subscribers. The average tweet is around 33 characters. For maximum engagement, tweets between 71–100 characters tend to perform best. Use the character count (with spaces) display in this tool to check tweet length before posting.",
      },
      {
        q: "What word count is ideal for an essay?",
        a: "Essay length depends entirely on the assignment instructions. High school essays are typically 500–1,000 words. University undergraduate essays range from 1,500–3,000 words. Graduate and doctoral essays can run 5,000–10,000+ words. This tool handles all of these ranges — paste your full draft and the word count updates instantly so you can trim or expand to hit the exact required length.",
      },
      {
        q: "Does this word counter work offline?",
        a: "Once the page is loaded, the word counting itself runs entirely in your browser using JavaScript — no internet connection is needed for the counting to continue working. However, you do need an internet connection to initially load the page.",
      },
      {
        q: "Is my text stored or sent to a server?",
        a: "No. All analysis runs locally in your browser. The text you type or paste is never sent to any external server, stored in a database, or used for any purpose. This makes the tool safe for checking confidential drafts, client work, legal documents, or any sensitive writing.",
      },
      {
        q: "How do I count words in a PDF?",
        a: "To count words in a PDF, open the PDF in your browser or a PDF viewer, select all text (Ctrl+A or Cmd+A), copy it (Ctrl+C or Cmd+C), then paste it into this word counter. The tool will instantly report the word count, character count, and reading time for the entire document. Note that PDFs with scanned images instead of selectable text will not have copyable content — in that case you will need an OCR tool first.",
      },
    ],
  },
  features: [
    "Real-time word counting as you type",
    "Character count with and without spaces",
    "Sentence and paragraph counting",
    "Reading time estimation (200 wpm baseline)",
    "Detailed text statistics",
    "No registration required",
    "100% browser-based — your text never leaves your device",
  ],
  relatedTools: [
    "reading-time-calculator",
    "keyword-density-checker",
    "character-counter",
    "text-case-converter",
    "word-frequency-counter",
    "plagiarism-checker",
  ],
};
