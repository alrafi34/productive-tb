import { siteConfig } from "@/config/site";

export const fileSizeConverterConfig = {
  slug: "file-size-converter",
  name: "File Size Converter",
  description: "Convert file sizes instantly between Bytes, KB, MB, GB, TB, and PB using binary (1024) or decimal (1000) standards.",
  category: "computer-science",
  icon: "💾",
  free: true,
  seo: {
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
