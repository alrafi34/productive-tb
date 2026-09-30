export const sriGeneratorConfig = {
  slug: 'sri-generator',
  name: 'SRI Hash Generator',
  description: 'Generate Subresource Integrity (SRI) hashes for your CDN scripts and stylesheets instantly in the browser. Copy ready-to-use HTML snippets for secure resources.',
  category: 'security',
  icon: '🔐',
  free: true,
  backend: false,
  seo: {
    title: "SRI Hash Generator – Subresource Integrity for CDN Files",
    description: "Generate Subresource Integrity (SRI) hashes for CDN scripts and stylesheets in your browser, and copy ready-to-use HTML tags.",
    keywords: ['sri generator', 'subresource integrity', 'sri hash', 'cdn security', 'script integrity', 'stylesheet integrity', 'sha384', 'sha256', 'sha512', 'web security'],
    faq: [
      { q: "Do I need SRI for all external resources?", a: "While not required, it's highly recommended for any external scripts or stylesheets, especially from third-party CDNs. It adds minimal overhead but significantly improves security by protecting against compromised CDN resources and man-in-the-middle attacks." },
      { q: "What happens if the CDN updates the file?", a: "The browser will block the resource because the hash won't match. This is intentional security behavior - you should pin specific versions in your CDN URLs and update hashes deliberately when upgrading. Avoid using \"latest\" or version ranges." },
      { q: "Which hash algorithm should I choose?", a: "SHA-384 is recommended for most use cases as it provides strong security with reasonable hash length and is the industry standard. Use SHA-512 for maximum security or SHA-256 if you need shorter hashes. You can also specify multiple algorithms for broader compatibility." },
      { q: "Is my data secure when using this tool?", a: "Absolutely! All hashing is performed locally in your browser using the Web Crypto API. No data is sent to any server or third party. Your scripts, URLs, and content remain completely private. The tool even works offline after initial page load." },
      { q: "Can I use SRI with dynamic content?", a: "SRI is designed for static resources with predictable content. It's not suitable for dynamically generated scripts or resources that change frequently. Use SRI for versioned CDN libraries, frameworks, and static assets." },
      { q: "Does SRI slow down my website?", a: "The performance impact is negligible. Browsers compute hashes very quickly using native cryptographic functions, and the security benefits far outweigh any minimal overhead. SRI actually helps prevent security incidents that could severely impact performance." },
    ],
  },
};
