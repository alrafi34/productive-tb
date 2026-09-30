export const toolConfig = {
  slug: "reading-time-calculator",
  name: "Reading Time Calculator",
  description: "Estimate reading and speaking time with multi-speed profiles, custom WPM, and rich text stats.",
  category: "writing",
  icon: "⏱️",
  free: true,
  backend: false,
  seo: {
    title: "Reading Time Calculator – Words to Minutes",
    description: "Estimate how long a text takes to read or speak aloud at typical or custom words-per-minute speeds, with word, sentence and paragraph counts.",
    keywords: [
      "reading time calculator",
      "blog reading time estimator",
      "article reading time tool",
      "how long to read text",
      "calculate reading time online",
      "content reading time",
      "words per minute calculator",
      "blog post reading time",
      "article length calculator",
      "reading speed calculator",
      "content duration estimator",
      "text reading time",
      "speaking time calculator",
      "reading time badge",
      "custom wpm calculator"
    ],
    openGraph: {
      title: "Reading Time Calculator - Multi-Speed Read and Speaking Time Estimator",
      description:
        "Estimate reading duration across reader types, customize WPM, and copy publish-ready results for your content.",
      type: "website",
      url: "/tools/writing/reading-time-calculator"
    },
    howToSteps: [
      { name: "Paste or type your article", text: "Paste or type your article, post, or script text into the editor." },
      { name: "Review instant reading-time estimates across default speed profiles", text: "Review instant reading-time estimates across default speed profiles." },
      { name: "Enable custom WPM if you want audience-specific timing", text: "Enable custom WPM if you want audience-specific timing." },
      { name: "Check supporting stats like words", text: "Check supporting stats like words, sentences, paragraphs, and speaking time." },
      { name: "Copy full results or copy a minutes-read badge for publishing", text: "Copy full results or copy a minutes-read badge for publishing." },
    ],
    faq: [
      { q: "What is a reading time calculator?", a: "A reading time calculator estimates how long a reader needs to finish a piece of text based on word count and reading speed." },
      { q: "How is reading time calculated?", a: "Reading time is calculated by dividing total words by words-per-minute speed, then converting that value into minutes." },
      { q: "Can I estimate reading time for different reader types?", a: "Yes. The tool includes slow, average, fast, and speed-reader profiles with separate results." },
      { q: "Can I use my own words-per-minute value?", a: "Yes. You can enable custom reading speed and adjust WPM to match your target audience." },
      { q: "Does this tool estimate speaking time too?", a: "Yes. It includes speaking-time estimation based on average speech pace." },
      { q: "What text stats are included besides reading time?", a: "It reports words, characters, characters without spaces, sentences, paragraphs, and a length-based difficulty category." },
      { q: "Can I copy results or a reading-time badge?", a: "Yes. You can copy full summary results or copy a compact badge string such as minutes-read output." },
      { q: "Does the tool save my input text?", a: "It can keep input in local browser storage for convenience, so your draft remains available in your own browser context." },
      { q: "Is my content private while using this tool?", a: "Yes. Calculations run in the browser and do not require sending your text to external processing services." },
    ],
  },
  features: [
    "Real-time reading time calculation",
    "Multiple reading speed estimates",
    "Word and character count",
    "Paragraph and sentence count",
    "Custom WPM speed setting",
    "Copy results to clipboard",
    "Export reading time badge",
    "Speaking time estimation",
    "Large text support",
    "No registration required"
  ]
};
