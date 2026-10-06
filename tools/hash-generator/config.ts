export const hashGeneratorConfig = {
  slug: "hash-generator",
  name: "Hash Generator",
  description: "Generate MD5, SHA-1, and SHA-256 hashes instantly in your browser",
  category: "security",
  icon: "🔐",
  free: true,
  backend: false,
  seo: {
    title: "Hash Generator — MD5, SHA-1 & SHA-256 Online Tool",
    description: "Generate MD5, SHA-1, or SHA-256 hashes instantly in your browser. Front-end-only tool with live output, file hashing, bulk processing, and copy/export options.",
    keywords: [
      "hash generator",
      "md5 generator",
      "sha1 generator",
      "sha256 generator",
      "checksum calculator",
      "file hash",
      "hash verification",
      "crypto hash",
      "hash tool",
      "online hash generator",
      "md5 hash",
      "sha hash",
      "file integrity",
      "hash calculator",
      "free hash tool"
    ],
    openGraph: {
      title: "Hash Generator — MD5, SHA-1 & SHA-256 Online Tool",
      description: "Generate MD5, SHA-1, or SHA-256 hashes instantly in your browser with file hashing, bulk processing, and verification.",
      type: "website",
      url: "/hash-generator"
    },
    faq: [
      { q: "Can I reverse a hash to get the original data?", a: "No, hash functions are one-way. You cannot reverse a hash to get the original input. This is by design for security purposes." },
      { q: "Why do I get different hashes for the same text?", a: "Check for hidden whitespace, line breaks, or case differences. Even a single character change produces a completely different hash." },
      { q: "Is this tool safe for sensitive data?", a: "Yes. We do not collect or store what you enter. Any history the tool keeps is visible only to you. However, remember that hashing is not encryption—don't share hashes of sensitive passwords." },
      { q: "Which algorithm should I use?", a: "Use SHA-256 for security-critical applications, SHA-1 for legacy compatibility, and MD5 for simple checksums and non-security purposes." },
      { q: "Can two different inputs produce the same hash?", a: "Theoretically yes (called a collision), but it's extremely rare with SHA-256. MD5 and SHA-1 have known collision vulnerabilities." },
    ],
  },
  features: [
    "MD5, SHA-1, and SHA-256 support",
    "Real-time hash generation",
    "File hashing with drag & drop",
    "Bulk hash generation",
    "Hash verification tool",
    "Uppercase/lowercase toggle",
    "Multiple hashes at once",
    "Privacy-first (browser-only)",
    "Copy to clipboard",
    "Export as TXT/JSON",
    "Input normalization options",
    "Hash history tracking",
    "Zero server communication",
    "Instant feedback"
  ]
};
