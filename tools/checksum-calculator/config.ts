import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "checksum-calculator",
  name: "Checksum Calculator",
  description: "Generate MD5, SHA-1, SHA-256, SHA-512, CRC32, and more checksums for text or files instantly in your browser.",
  category: "computer-science",
  icon: "✅",
  free: true,
  seo: {
    title: "Checksum Calculator – MD5, SHA-256, SHA-512 & CRC32",
    description: "Calculate MD5, SHA-1, SHA-256, SHA-384, SHA-512, CRC32 and Adler-32 checksums for text or files to verify downloads, in your browser.",
    keywords: [
      "checksum calculator",
      "sha256 generator",
      "md5 checksum tool",
      "file checksum validator",
      "online hash generator",
      "verify file integrity",
      "sha512 hash calculator",
      "sha1 generator",
      "crc32 calculator",
      "adler32 checksum",
      "free checksum calculator",
      "file hash generator",
      "text hash calculator",
      "compare checksum online",
    ],
    openGraph: {
      title: "Checksum Calculator – MD5, SHA-256, SHA-512 & CRC32",
      description: "Calculate MD5, SHA-1, SHA-256, SHA-384, SHA-512, CRC32 and Adler-32 checksums for text or files to verify downloads, in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/checksum-calculator`,
    },
    faq: [
      { q: "What is a checksum and why do I need it?", a: "A checksum is a fixed-length value derived from data using a hash algorithm. It acts as a unique fingerprint — if the data changes even slightly, the checksum changes entirely. It is used to verify file integrity, detect corruption, and validate downloads." },
      { q: "Is this tool safe to use with sensitive files?", a: "Yes. We do not collect or store what you enter." },
      { q: "Which algorithm should I use?", a: "Use SHA-256 for general file integrity checks and security verification. Use MD5 or CRC32 only for quick non-security checks. Avoid SHA-1 and MD5 for cryptographic or security-critical use cases." },
      { q: "Can I process multiple files at once?", a: "Yes. Drag and drop multiple files into the upload zone simultaneously and each will be processed with a live progress indicator." },
      { q: "How do I verify a downloaded file?", a: "Upload the downloaded file, select the same algorithm listed on the software's download page (usually SHA-256), then paste the official checksum into the Compare panel. A match means the file is authentic and unaltered." },
    ],
  },
};
