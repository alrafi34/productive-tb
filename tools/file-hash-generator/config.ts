export const toolConfig = {
  slug: "file-hash-generator",
  name: "File Hash Generator",
  description: "Generate SHA-256 fingerprints of files locally in your browser without uploading",
  category: "security",
  icon: "🔑",
  free: true,
  backend: false,
  seo: {
    title: "Free File Hash Generator - SHA-256 Checksum Calculator",
    description: "Generate SHA-256, SHA-1, SHA-512 fingerprints of files instantly in your browser. Verify file integrity without uploading anything. 100% client-side processing.",
    keywords: [
      "file hash generator",
      "sha256 calculator",
      "checksum generator",
      "file integrity checker",
      "sha256 hash",
      "file fingerprint",
      "verify file integrity",
      "hash calculator",
      "sha1 generator",
      "sha512 hash",
      "file verification tool",
      "checksum calculator",
      "cryptographic hash",
      "file hash online",
      "free hash generator"
    ],
    openGraph: {
      title: "Free File Hash Generator - Verify File Integrity",
      description: "Generate cryptographic hashes of files locally in your browser. No uploads required.",
      type: "website",
      url: "/file-hash-generator"
    },
    faq: [
      { q: "Is my data private?", a: "Yes. We do not collect or store your files." },
      { q: "Can I hash large files?", a: "Yes, the tool supports files of any size. Large files are processed with a progress indicator to show the hashing status." },
      { q: "Which algorithm should I use?", a: "SHA-256 is recommended for most use cases. Use SHA-384 or SHA-512 for higher security requirements. SHA-1 is only for legacy compatibility." },
      { q: "What if the hashes don't match?", a: "If hashes don't match, the file may be corrupted, modified, or tampered with. Do not use the file and download it again from a trusted source." },
      { q: "Can I hash multiple files at once?", a: "Currently, the tool processes one file at a time. You can hash multiple files sequentially by selecting them one after another." },
      { q: "Is this tool free?", a: "Yes, completely free for personal and commercial use. No registration or payment required." },
      { q: "How accurate is the hash?", a: "The tool uses standard cryptographic hash algorithms. The results are identical to command-line tools like sha256sum." },
    ],
  },
  features: [
    "SHA-256, SHA-1, SHA-384, SHA-512 support",
    "Private: your files are not collected or stored",
    "Large file support with progress",
    "Hash comparison tool",
    "Drag and drop interface",
    "Export fingerprints (TXT, JSON, CSV)"
  ]
};
