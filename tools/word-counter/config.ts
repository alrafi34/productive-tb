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
    title: "Word Counter & Character Counter — Free Online Tool",
    description: "Count words, characters, sentences and pages as you type, with reading and speaking time, a word goal and character limits for X, SMS and meta tags.",
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
      description: "Count words, characters, sentences and pages as you type, with reading and speaking time, a word goal and character limits for X, SMS and meta tags.",
      type: "website",
      url: `${siteConfig.url}/tools/writing/word-counter`,
    },
    howToSteps: [
      {
        name: "Paste or type your text",
        text: "Click into the editor and paste (Ctrl+V or Cmd+V) or start typing. Every count updates as you type, with no button to press.",
      },
      {
        name: "Read the counts",
        text: "The tiles show words, characters with and without spaces, sentences, paragraphs and reading time. Below them you get speaking time, single- and double-spaced pages, unique words and average sentence length.",
      },
      {
        name: "Set a word goal",
        text: "Type the length you need into Word goal, for example 1500. The bar fills as you write and shows how many words are left or how far over you are.",
      },
      {
        name: "Check character limits",
        text: "The Character limits panel compares your text with a title tag, meta description, SMS, X post, Instagram caption and LinkedIn post, and turns red when you go over.",
      },
      {
        name: "Spot repeated words",
        text: "Most used words lists the ten words you use most, with common words like \"the\" skipped by default, so you can vary overused terms.",
      },
      {
        name: "Copy or clear",
        text: "Copy Results copies every count to the clipboard. Your draft and goal stay saved in this browser until you press Reset.",
      },
    ],
    faq: [
      {
        q: "What does this word counter count?",
        a: "Words, characters with and without spaces, sentences, paragraphs, reading time and speaking time, plus single- and double-spaced pages, unique words, average sentence length and your most used words. All of it updates as you type.",
      },
      {
        q: "How many pages is 1,000 words?",
        a: "About 2 pages single-spaced or 4 pages double-spaced, assuming 12 pt type and 1-inch margins. As a rule of thumb, a single-spaced page holds about 500 words and a double-spaced page about 250. Font, headings and paragraph breaks move the real number up or down.",
      },
      {
        q: "How is reading time calculated?",
        a: "Word count divided by 200 words per minute, a typical adult silent-reading pace. A 1,000-word article takes about 5 minutes. The tile rounds up to the next minute; the detail panel shows minutes and seconds.",
      },
      {
        q: "How long does it take to say my speech?",
        a: "The speaking time uses 130 words per minute, a comfortable presentation pace; most people speak at 125–150. A 5-minute talk needs roughly 600–750 words and a 10-minute talk 1,250–1,500. Rehearse once with a timer to find your own pace.",
      },
      {
        q: "What is the difference between characters with and without spaces?",
        a: "With spaces counts everything, including spaces and line breaks. Without spaces counts only letters, digits, punctuation and symbols. Social networks, SMS and meta descriptions limit characters with spaces; some forms and translation quotes use the count without spaces.",
      },
      {
        q: "Does an emoji count as one character?",
        a: "Here, yes: each emoji or accented letter counts as one character. Some platforms weigh them differently. X counts most emoji as two characters, and a single emoji switches an SMS to a format that allows 70 characters per segment instead of 160.",
      },
      {
        q: "How does the word goal work?",
        a: "Enter the number of words you need. The progress bar fills as you write and shows how many words remain, or how many you are over once you pass the goal. The goal is remembered in this browser.",
      },
      {
        q: "What does the most used words list show?",
        a: "The ten words that appear most often, with how many times and what share of all words. Common words such as \"the\", \"and\" and \"of\" are skipped unless you untick Skip common words. Use it to catch a term you repeat too often.",
      },
      {
        q: "How do I count words in Google Docs or Word?",
        a: "In Google Docs use Tools > Word count (Ctrl+Shift+C, or Cmd+Shift+C on a Mac). In Microsoft Word the count is in the status bar, or under Review > Word Count. For text from anywhere else, such as an email, web page or PDF, paste it here.",
      },
      {
        q: "How do I count words in a PDF?",
        a: "Open the PDF, select all text (Ctrl+A or Cmd+A), copy it and paste it into the editor. Scanned PDFs contain images rather than text, so they need OCR first; the image to text tool on this site can extract it.",
      },
      {
        q: "What word count should an essay be?",
        a: "Follow the assignment. As typical ranges, high school essays run 500–1,000 words, undergraduate essays 1,500–3,000, and the Common App personal statement allows 250–650. Set the required length as your word goal to track it while you write.",
      },
      {
        q: "Is my text stored or sent anywhere?",
        a: "We do not collect or store what you enter. Any history the tool keeps is visible only to you.",
      },
    ],
  },
  features: [
    "Real-time word counting as you type",
    "Character count with and without spaces",
    "Sentence and paragraph counting",
    "Reading time estimation (200 wpm baseline)",
    "Speaking time (130 wpm) and single/double-spaced page count",
    "Word goal with progress bar",
    "Character limits for titles, meta descriptions, SMS, X, Instagram and LinkedIn",
    "Most used words, with or without common words",
    "Draft and goal saved",
    "No registration required",
    "Private: your inputs are not collected or stored",
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
