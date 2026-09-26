export const toolConfig = {
  slug: "random-number-generator",
  name: "Random Number Generator",
  description: "Generate random numbers, pick items from list, and generate secure random values instantly.",
  category: "utility",
  icon: "🎲",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "What is the difference between Standard and Secure random?", a: "Standard random uses `Math.random()`, which is fast but pseudorandom and potentially predictable. Secure mode uses `window.crypto.getRandomValues()`, which connects to hardware-level entropy for true cryptographic security." },
      { q: "How many numbers can I generate at once?", a: "Our tool is optimized for performance and can generate thousands of numbers in milliseconds. We've capped the UI display for smoothness, but you can export large batches via CSV." },
    ],
    title: "Random Number Generator – Generate Numbers Instantly",
    description: "Generate random numbers within a custom range instantly. Supports unique numbers, decimals, secure randomness, random picker, and multiple results.",
    keywords: [
      "random number generator",
      "secure random number",
      "random decimal generator",
      "unique random numbers",
      "random color generator",
      "random picker",
      "lottery number generator",
      "online rng"
    ],
    openGraph: {
      title: "Random Number Generator - Instant & Secure RNG",
      description: "Fast, developer-friendly random number generator with secure crypto support, unique mode, and list pickers.",
      type: "website",
      url: "/tools/random-number-generator"
    }
  },
  features: [
    "Standard & Cryptographically Secure (Crypto API) modes",
    "Generate unique numbers to prevent duplicates",
    "Random decimal generation with custom precision",
    "Interactive Random Picker for selecting items from lists",
    "Animated slot-machine style generation experience",
    "Local history tracking and CSV export functionality"
  ]
};
