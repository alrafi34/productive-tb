export const toolConfig = {
  slug: "bcrypt-hash-verifier",
  name: "Bcrypt Hash Verifier",
  description: "Check if a password matches a Bcrypt hash locally in your browser",
  category: "security",
  icon: "🔐",
  free: true,
  backend: false,
  seo: {
    title: "Bcrypt Hash Verifier – Check a Password Against a Hash",
    description: "Check whether a password matches a bcrypt hash and see the hash's cost and salt. Verification runs in your browser; nothing is sent to a server.",
    keywords: [
      "bcrypt verifier",
      "bcrypt hash checker",
      "password verification",
      "bcrypt compare",
      "hash verification tool",
      "bcrypt validator",
      "password hash checker",
      "bcrypt online",
      "verify bcrypt hash",
      "bcrypt password check",
      "bcrypt hash analyzer",
      "free bcrypt tool",
      "bcrypt hash generator",
      "password hash verifier",
      "bcrypt cost factor"
    ],
    openGraph: {
      title: "Bcrypt Hash Verifier – Check a Password Against a Hash",
      description: "Check whether a password matches a bcrypt hash and see the hash's cost and salt. Verification runs in your browser; nothing is sent to a server.",
      type: "website",
      url: "/bcrypt-hash-verifier"
    },
    faq: [
      { q: "Is this tool secure for production use?", a: "This tool is designed for development and testing. For production systems, always verify passwords on the server-side to prevent exposing hashes to clients." },
      { q: "Are my passwords sent to a server?", a: "No. All verification happens locally in your browser using bcryptjs. No data is transmitted to any server." },
      { q: "What cost factor should I use?", a: "Cost factor 10 is recommended for most applications. Use 12 or higher for sensitive data. The higher the cost, the more secure but slower." },
      { q: "Can I verify hashes from different Bcrypt versions?", a: "Yes, this tool supports $2a$, $2b$, and $2y$ versions of Bcrypt hashes." },
      { q: "Why is verification slow?", a: "Bcrypt is intentionally slow to prevent brute-force attacks. Higher cost factors take longer to verify." },
      { q: "Can I use this to crack passwords?", a: "No. This tool only verifies if a known password matches a hash. It cannot reverse or crack hashes." },
    ],
  },
  features: [
    "Verify passwords against Bcrypt hashes",
    "Extract hash metadata (version, cost, salt)",
    "Generate Bcrypt hashes for testing",
    "Real-time verification",
    "Batch password verification",
    "Hash strength indicator",
    "100% client-side processing"
  ]
};
