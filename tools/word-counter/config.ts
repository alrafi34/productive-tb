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
    title: "Word Counter & Character Counter — Free Online Tool | Productive Toolbox",
    description: "Count words and characters instantly — free online word count counter. Works for essays, PDFs, and Google Docs. Paragraph counter included. No sign-up.",
    keywords: [
      // 500K/mo — primary
      "word counter",
      "character counter",
      "word count counter",
      "count words",
      // 50K/mo — high volume
      "word counter tool",
      "word count checker",
      "word counter google docs",
      "word counter for google docs",
      "google doc word counter",
      "word count tool",
      // 5K/mo — strong secondary
      "word counter online",
      "word counter online free",
      "free word counter",
      "word count calculator",
      "word counter pdf",
      "paragraph counter",
      "word counter website",
      "count words and characters",
      "word and characters counter",
      "character count tool",
      "character count in text",
      "character limit counter",
      "character count online",
      "essay word counter",
      "frequency word counter",
      // 500/mo — intent clusters
      "word counter for essays",
      "word counter for speech",
      "speech word counter",
      "personal statement word counter",
      "copy and paste word counter",
      "count words in pdf online",
      "pdf online word count",
      "character count with spaces",
      "character count including spaces",
      "character counter google docs",
      "sentence counter",
      "unique word counter",
      "seo word counter",
      "word and page counter",
      // Long-tail
      "letter counter online",
      "letter counter",
      "words to pages converter",
      "how many pages is 1000 words",
      "how to count words in google docs",
      "free word counter no sign up",
      "count words in text",
      "online word count",
    ],
    openGraph: {
      title: "Word Counter & Character Counter — Free Online Tool",
      description: "Count words and characters instantly — free online word count counter. Works for essays, PDFs, and Google Docs. Paragraph counter included. No sign-up.",
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
        q: "Can this tool work as a character counter and letter counter?",
        a: "Yes. In addition to word count, this tool displays a full character counter — showing total characters both with and without spaces — making it a free letter counter online as well. Use the with-spaces count for platform character limits like Twitter (280), LinkedIn (3,000), and SMS (160). Use the without-spaces count for programming character fields and database constraints where whitespace is excluded from the limit.",
      },
      {
        q: "How do I count words in Google Docs?",
        a: "In Google Docs, go to Tools > Word count (or press Ctrl+Shift+C on Windows / Cmd+Shift+C on Mac) to see word, character, and page counts for the full document or a selected range. For text outside Google Docs — copied from web pages, emails, PDFs, or other sources — paste it into this word counter for an instant count without opening Docs. You can also enable 'Display word count while typing' in the same menu to keep a live count visible in the corner of your document.",
      },
      {
        q: "How many pages is 1,000 words?",
        a: "At standard formatting (12pt Times New Roman or Arial, double-spaced, 1-inch margins), 1,000 words equals approximately 4 pages. Single-spaced, the same 1,000 words produces about 2 pages. 500 words is roughly 1 page double-spaced; 250 words fills about half a page. These are estimates — actual page count depends on font size, line spacing, margin width, and paragraph spacing. For academic submissions, always verify using your institution's formatting requirements.",
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
      {
        q: "How do I use this as a paragraph counter?",
        a: "This tool counts paragraphs automatically alongside words, characters, and sentences — no extra steps needed. Paste your text and the paragraph count appears in the metrics panel immediately. A paragraph is counted as any block of text separated by one or more blank lines. This is useful for checking article structure, verifying section length balance, and ensuring long-form content is broken up for readability.",
      },
      {
        q: "How many words should a speech or presentation be?",
        a: "For public speaking, the average adult speaks at 125–150 words per minute. A 5-minute speech needs approximately 625–750 words. A 10-minute presentation runs 1,250–1,500 words. A 20-minute keynote is around 2,500–3,000 words. Paste your speech script into this word counter, check the word count, and divide by your speaking pace to estimate delivery time. The reading time estimate (at 200 wpm) will also give a rough lower bound.",
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
