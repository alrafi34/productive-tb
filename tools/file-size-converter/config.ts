import { siteConfig } from "@/config/site";

export const fileSizeConverterConfig = {
  slug: "file-size-converter",
  name: "File Size Converter",
  description: "Convert file sizes instantly between Bytes, KB, MB, GB, TB, and PB using binary (1024) or decimal (1000) standards.",
  category: "computer-science",
  icon: "💾",
  free: true,
  seo: {
    faq: [
      { q: "Why does my 1 TB hard drive show 931 GB on Windows?", a: "Hard drive manufacturers use decimal units (1 TB = 1,000,000,000,000 bytes). Windows uses binary units (1 GiB = 1,073,741,824 bytes). So 1,000,000,000,000 ÷ 1,073,741,824 ≈ 931 GiB, which Windows displays as 931 GB." },
      { q: "What is the difference between MB and MiB?", a: "MB (Megabyte) in decimal standard = 1,000,000 bytes. MiB (Mebibyte) in binary standard = 1,048,576 bytes. The IEC introduced the binary prefixes (KiB, MiB, GiB) to eliminate the ambiguity, but both terms are used interchangeably in everyday usage." },
      { q: "Which standard should I use?", a: "Use Binary (1024) when working with operating systems, file systems, RAM, or programming. Use Decimal (1000) when dealing with hard drive specs, SSD marketing, or internet/cloud storage providers." },
      { q: "Can this tool handle very large file sizes like PB?", a: "Yes. The tool uses JavaScript's floating-point arithmetic which handles up to approximately 10^308. Petabyte values and beyond are supported with full precision display." },
      { q: "Is my data sent anywhere when I use this tool?", a: "No. All conversions happen entirely in your browser using JavaScript. No data is sent to any server, logged, or stored externally. Conversion history is saved only in your browser's localStorage." },
    ],
    title: "File Size Converter – Bytes, KB, MB, GB, TB",
    description: "Convert file sizes between bytes, KB, MB, GB, TB and PB in decimal (1000) or binary (1024) units, and see the difference between MB and MiB.",
    keywords: [
      "file size converter",
      "KB to MB converter",
      "MB to GB converter",
      "GB to TB converter",
      "storage unit converter",
      "byte converter",
      "convert file size online",
      "binary vs decimal file size",
      "KiB MiB GiB converter",
      "digital storage converter",
      "file size calculator",
      "data size converter",
    ],
    openGraph: {
      title: "Free File Size Converter – Convert KB, MB, GB, TB Online",
      description: "Instantly convert file sizes between Bytes, KB, MB, GB, TB, and PB. Binary and decimal standards supported.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/file-size-converter`,
    },
  },
};
