export const randomIDGeneratorConfig = {
  slug: "random-id-generator",
  name: "UUID / CUID Generator",
  description: "Generate UUIDs (v1, v4), CUIDs, and NanoIDs for testing. Copy single or bulk output.",
  category: "developer",
  icon: "🆔",
  free: true,
  backend: false,
  seo: {
    title: "UUID / CUID Generator — Generate Unique IDs Online",
    description: "Generate UUIDs (v1, v4), CUIDs, and NanoIDs instantly in your browser. Bulk generation up to 10,000 IDs with multiple output formats (JSON, SQL, CSV).",
    keywords: [
      "uuid generator",
      "uuid v4 generator",
      "cuid generator",
      "nanoid generator",
      "generate unique id",
      "bulk uuid generator",
      "id generator online",
      "random id generator",
      "guid generator",
      "unique identifier",
      "collision resistant id",
      "short id generator",
      "database id generator",
      "api id generator",
      "test data generator"
    ],
    openGraph: {
      title: "UUID / CUID Generator — Generate Unique IDs Online",
      description: "Generate UUIDs, CUIDs, and NanoIDs instantly with bulk generation and multiple output formats.",
      type: "website",
      url: "/random-id-generator"
    },
    faq: [
      { q: "Which ID should I use?", a: "UUID v4 for general unique IDs in databases and APIs; NanoID when you want a shorter, URL-safe ID (21 characters by default); UUID v1 when you want IDs that include a timestamp. The CUID-style option is for readable IDs, not for secrets." },
      { q: "How unique is a UUID v4?", a: "It has 122 random bits, about 5.3 × 10³⁶ possible values. Even generating a billion UUIDs, the chance of any two matching is vanishingly small." },
      { q: "Are the IDs secure enough for tokens?", a: "UUID v4 and NanoID here use a cryptographically secure random generator. The CUID-style IDs use a standard pseudo-random generator and should not be used as secrets such as session tokens or password reset codes." },
      { q: "What is the difference between UUID v1 and v4?", a: "v1 is built from the time of creation plus a node value, so IDs sort roughly by time; v4 is entirely random. v4 reveals nothing about when or where it was made." },
      { q: "Can I generate many IDs at once?", a: "Yes. Choose how many you need and copy them all, or export them as JSON or CSV." },
    ],
  },
  features: [
    "UUID v1 (time-based) generation",
    "UUID v4 (random) generation",
    "CUID generation",
    "NanoID generation with custom length",
    "Bulk generation up to 10,000 IDs",
    "Multiple output formats (Plain, JSON, SQL, CSV)",
    "One-click copy all",
    "Individual ID copy buttons",
    "Download as TXT or JSON",
    "SQL INSERT statement generation",
    "Privacy-first (browser-only)",
    "Zero server communication",
    "Instant generation",
    "No login required"
  ]
};
