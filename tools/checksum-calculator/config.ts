import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "checksum-calculator",
  name: "Checksum Calculator",
  description: "Generate MD5, SHA-1, SHA-256, SHA-512, CRC32, and more checksums for text or files instantly in your browser.",
  category: "computer-science",
  icon: "✅",
  free: true,
  seo: {
    title: "Free Checksum Calculator Online – MD5, SHA-256, SHA-512 Hash Generator",
    description: "Calculate checksums instantly online using MD5, SHA-1, SHA-256, SHA-384, SHA-512, CRC32, and Adler-32. Verify files, validate downloads, and generate secure hashes in your browser.",
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
      title: "Free Checksum Calculator Online – MD5, SHA-256, SHA-512 Hash Generator",
      description: "Calculate checksums for text or files using MD5, SHA-1, SHA-256, SHA-512, CRC32, Adler-32. 100% browser-based, no uploads.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/checksum-calculator`,
    },
  },
};
