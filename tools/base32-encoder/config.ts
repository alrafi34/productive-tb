export const base32EncoderConfig = {
  slug: "base32-encoder",
  name: "Base32 Encoder / Decoder",
  description: "Encode and decode text using Base32 — used in 2FA secrets and legacy systems.",
  category: "developer",
  icon: "🔐",
  free: true,
  backend: false,
  seo: {
    title: "Base32 Encoder & Decoder – Encode and Decode Base32",
    description: "Convert text to Base32 or decode Base32 back to text in your browser. Useful for 2FA and TOTP secrets and other developer work.",
    keywords: [
      "base32 encoder",
      "base32 decoder",
      "base32 encode",
      "base32 decode",
      "base32 converter",
      "online base32",
      "text to base32",
      "base32 to text",
      "base32 encoding",
      "base32 decoding",
      "free base32 tool",
      "2fa base32",
      "totp secret decoder",
      "base32 auto detect",
      "base32 copy clipboard",
      "base32 history"
    ],
    openGraph: {
      title: "Base32 Encoder & Decoder – Encode and Decode Base32",
      description: "Convert text to Base32 or decode Base32 back to text in your browser. Useful for 2FA and TOTP secrets and other developer work.",
      type: "website",
      url: "/tools/developer/base32-encoder"
    }
  },
  features: [
    "Encode text to Base32",
    "Decode Base32 to text",
    "Auto-detect mode (smart detection)",
    "RFC 4648 standard Base32 alphabet",
    "Crockford Base32 variant support",
    "Live real-time encoding/decoding",
    "Character counter (input & output)",
    "Uppercase/lowercase output options",
    "Add/remove padding characters",
    "Group output for readability",
    "Swap input/output",
    "Copy to clipboard with feedback",
    "Clear all button",
    "Download result as TXT file",
    "Large text support (100k+ characters)",
    "Debounced input processing",
    "Mobile responsive design",
    "100% client-side processing",
    "No backend or API required"
  ]
};