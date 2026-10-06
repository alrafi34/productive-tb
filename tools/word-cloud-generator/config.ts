export const toolConfig = {
  slug: "word-cloud-generator",
  name: "Word Cloud Generator",
  description: "Create visual word clouds from text instantly. Customize colors, fonts, and layout.",
  category: "visualization",
  icon: "☁️",
  free: true,
  backend: false,
  seo: {
    title: "Free Word Cloud Generator - Create Visual Word Clouds Online",
    description: "Generate beautiful word clouds from any text instantly. Customize fonts, colors, rotation, and export as PNG or SVG. 100% browser-based, no backend required.",
    keywords: [
      "word cloud generator",
      "word cloud maker",
      "text visualization",
      "word frequency cloud",
      "free word cloud",
      "online word cloud",
      "word cloud creator",
      "text analysis tool",
      "keyword visualization",
      "word cloud download",
      "word cloud PNG",
      "word cloud SVG",
      "word cloud customization",
      "word frequency analyzer",
      "visual text analysis"
    ],
    openGraph: {
      title: "Free Word Cloud Generator - Visualize Text Instantly",
      description: "Create stunning word clouds from your text. Customize colors, fonts, and export as PNG or SVG. Perfect for presentations, analysis, and content creation.",
      type: "website",
      url: "/word-cloud-generator"
    },
    faq: [
      { q: "How does a word cloud decide word sizes?", a: "It counts how often each word appears in your text and draws more frequent words larger. Common filler words such as the, and and of are left out by default so they do not dominate." },
      { q: "Can I keep stop words in the cloud?", a: "Yes. Turn off stop-word filtering to count every word, which is useful for analysing short phrases or song lyrics." },
      { q: "Which export formats are available?", a: "PNG and SVG images of the cloud, plus CSV or JSON with each word and its count for further analysis." },
      { q: "Why is the layout different each time?", a: "Words are placed with a random starting position so they fit together; regenerating gives a new arrangement of the same words and sizes." },
      { q: "What is a word cloud good for?", a: "Spotting the main themes in survey answers, reviews, speeches or articles at a glance. For exact comparisons use the word counts, since size differences are hard to judge by eye." },
    ],
  },
  features: [
    "Real-time word cloud generation",
    "Customizable fonts and colors",
    "Multiple color schemes (Random, Monochrome, Gradient)",
    "Adjustable word rotation",
    "Stop words filtering",
    "Max words limit control",
    "Export as PNG or SVG",
    "Download word frequency data",
    "Responsive design for all devices",
    "Nothing to install"
  ]
};
