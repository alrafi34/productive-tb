export const textEncryptDecryptConfig = {
  slug: "text-encrypt-decrypt",
  name: "Text Encrypt/Decrypt",
  description: "Encrypt or decrypt text instantly using ROT13, Base64, and more with live preview and history",
  category: "security",
  icon: "🔐",
  free: true,
  backend: false,
  seo: {
    title: "Text Encrypt & Decrypt Tool – ROT13 & Base64 Online",
    description: "Encode or decode text with ROT13, Base64, Base32 and binary, with a live preview, copy buttons and history. Runs entirely in your browser.",
    keywords: [
      "text encrypt",
      "text decrypt",
      "rot13",
      "base64 encode",
      "base64 decode",
      "text encryption tool",
      "online encryption",
      "text obfuscation",
      "base32 encoder",
      "binary converter",
      "url safe base64",
      "free encryption tool",
      "online text encoder",
      "text transformation"
    ],
    openGraph: {
      title: "Text Encrypt & Decrypt Tool – ROT13 & Base64 Online",
      description: "Encode or decode text with ROT13, Base64, Base32 and binary, with a live preview, copy buttons and history. Runs entirely in your browser.",
      type: "website",
      url: "/text-encrypt-decrypt"
    },
    faq: [
      { q: "Is this real encryption?", a: "No. ROT13, Base64, Base32 and binary are encodings: anyone can reverse them without a key. Use them to obscure spoilers or to move text between systems, not to protect secrets. For real protection use an encryption tool such as AES with a strong password." },
      { q: "What is ROT13?", a: "A letter substitution that shifts each letter 13 places in the alphabet, so A becomes N and N becomes A. Applying ROT13 twice returns the original text, which is why the same button both encodes and decodes." },
      { q: "What is the difference between Base64 and Base64URL?", a: "Base64URL replaces + and / with - and _ and usually drops the = padding, so the result can be used safely in URLs and file names. JWTs use Base64URL." },
      { q: "Why does Base64 make text longer?", a: "Base64 turns every 3 bytes into 4 characters, so the output is about 33% longer than the input. Base32 is longer still, about 60%." },
      { q: "Is my text sent to a server?", a: "No. Encoding and decoding run in your browser, and the history is stored only on your device." },
    ],
  },
  features: [
    "ROT13 cipher (symmetric)",
    "Base64 encoding/decoding",
    "URL-safe Base64",
    "Base32 encoding/decoding",
    "Binary representation",
    "Live dual-panel preview",
    "Instant transformation",
    "Large text optimization (100k+ chars)",
    "Debounced input processing",
    "Transformation history (last 10)",
    "Swap input/output",
    "Copy to clipboard",
    "Export as TXT or JSON",
    "Keyboard shortcuts",
    "100% client-side processing"
  ]
};
