export const toolConfig = {
  slug: "email-obfuscator",
  name: "Email Obfuscator",
  description: "Protect email addresses from spam bots by encoding them into HTML character codes",
  category: "security",
  icon: "📧",
  free: true,
  backend: false,
  seo: {
    title: "Free Email Obfuscator - Protect Emails from Spam Bots",
    description: "Encode email addresses into HTML character codes to prevent spam scraping. Generate obfuscated email snippets instantly with multiple encoding methods.",
    keywords: [
      "email obfuscator",
      "protect email from spam",
      "email encoder",
      "html character codes",
      "prevent email scraping",
      "email spam protection",
      "obfuscate email address",
      "encode email html",
      "mailto link generator",
      "email bot protection",
      "anti spam email",
      "email privacy tool",
      "hide email from bots",
      "email security tool",
      "free email obfuscator"
    ],
    openGraph: {
      title: "Free Email Obfuscator - Protect Your Email from Spam Bots",
      description: "Encode email addresses instantly to prevent spam scraping. Multiple encoding methods available.",
      type: "website",
      url: "/email-obfuscator"
    },
    faq: [
      { q: "Does email obfuscation really work?", a: "Yes, it significantly reduces spam by making it harder for basic bots to harvest emails. However, sophisticated scrapers may still detect them, so combine with other methods like contact forms." },
      { q: "Will obfuscated emails work in all browsers?", a: "Yes, HTML character entities are supported by all modern browsers and have been for decades. They render correctly and remain clickable." },
      { q: "Does obfuscation affect SEO?", a: "No, search engines can read HTML entities correctly. Your content remains indexable and SEO-friendly." },
      { q: "Which encoding method is best?", a: "Mixed encoding provides the best protection as it's harder for bots to detect patterns. JavaScript obfuscation is also very effective but requires JavaScript to be enabled." },
      { q: "Can I decode obfuscated emails?", a: "Yes, use the Decode tab in this tool to convert obfuscated emails back to plain text." },
      { q: "Is this tool free to use?", a: "Yes, completely free for personal and commercial use." },
      { q: "Do I need to install anything?", a: "No. No installation or registration required." },
    ],
  },
  features: [
    "HTML character code encoding",
    "Hexadecimal encoding",
    "JavaScript obfuscation",
    "Mixed encoding mode",
    "Mailto link generator",
    "Batch email encoding",
    "Live preview panel"
  ]
};
