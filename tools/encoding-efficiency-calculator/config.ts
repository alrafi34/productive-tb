import { siteConfig } from "@/config/site";

export const encodingEfficiencyCalculatorConfig = {
  slug: "encoding-efficiency-calculator",
  name: "Encoding Efficiency Calculator",
  description: "Calculate encoding overhead, expansion ratio, compression ratio, and encoding efficiency instantly. Free online calculator for Base64, Base32, Hex, UTF, and other encoding methods.",
  category: "data-analytics",
  icon: "🔢",
  free: true,
  relatedTools: [
    "data-compression-ratio-calculator",
    "storage-requirement-calculator",
    "data-transfer-cost-calculator",
    "data-growth-calculator",
    "hadoop-storage-calculator",
    "data-pipeline-latency-calculator",
  ],
  seo: {
    title: "Encoding Efficiency Calculator – Calculate Encoding Overhead & Data Expansion Online",
    description: "Calculate encoding efficiency, encoding overhead, expansion ratio, compression ratio, and storage impact instantly. Compare Base64, Base32, Hex, UTF encodings, and more using this free browser-based Encoding Efficiency Calculator.",
    keywords: [
      "encoding efficiency calculator",
      "encoding overhead calculator",
      "base64 size calculator",
      "encoding expansion ratio",
      "compression ratio calculator",
      "data encoding calculator",
      "encoding storage calculator",
      "base64 overhead",
      "binary encoding calculator",
      "data engineering tools",
      "developer calculator",
      "free encoding calculator",
      "online encoding efficiency",
      "storage overhead calculator",
      "encoding analysis tool",
    ],
    openGraph: {
      title: "Free Encoding Efficiency Calculator",
      description: "Instantly calculate encoding overhead, expansion ratio, compression ratio, and efficiency using this fast, browser-based encoding calculator.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/encoding-efficiency-calculator`,
    },
    og: {
      title: "Free Encoding Efficiency Calculator",
      description: "Instantly calculate encoding overhead, expansion ratio, compression ratio, and efficiency using this fast, browser-based encoding calculator.",
      url: `${siteConfig.url}/tools/data-analytics/encoding-efficiency-calculator`,
    },
    howToSteps: [
      {
        name: "Enter the Original Data Size",
        text: "Type the size of your data before encoding.",
      },
      {
        name: "Enter the Encoded Data Size",
        text: "Type the size of the same data after encoding.",
      },
      {
        name: "Choose a Size Unit",
        text: "Select Bytes, KB, MB, GB, TB, or Bits to match your input values.",
      },
      {
        name: "Select an Encoding Type (Optional)",
        text: "Choose Base64, Base32, Hex, UTF-8, or another method for reference and reporting.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to display, from 0 to 5.",
      },
      {
        name: "Read the Live Result",
        text: "Encoding overhead, expansion ratio, compression ratio, efficiency, and additional storage update instantly as you type.",
      },
      {
        name: "Export or Share",
        text: "Copy the results, download a CSV, TXT, or JSON report, print it, or copy a shareable URL with your inputs encoded.",
      },
    ],
    faq: [
      {
        q: "What is an encoding efficiency calculator?",
        a: "An encoding efficiency calculator is a free browser-based tool that measures how much larger data becomes after encoding by comparing the original size to the encoded size. It returns the encoding overhead, expansion ratio, compression ratio, and efficiency percentage.",
      },
      {
        q: "How is encoding overhead calculated?",
        a: "Encoding overhead equals ((Encoded Size − Original Size) ÷ Original Size) × 100. For example, 1024 bytes encoded to 1368 bytes has an overhead of 33.59%, since (1368 − 1024) ÷ 1024 × 100 = 33.59%.",
      },
      {
        q: "Why does Base64 encoding increase file size?",
        a: "Base64 represents every 3 bytes of binary data as 4 ASCII characters, so encoded data is always about 33% larger than the original — this is expected overhead, not an error.",
      },
      {
        q: "What is the difference between expansion ratio and encoding overhead?",
        a: "They describe the same growth in two formats. An expansion ratio of 1.336× means the encoded data is 1.336 times the original size, which is the same as a 33.6% overhead.",
      },
      {
        q: "What is encoding efficiency?",
        a: "Encoding efficiency is calculated as (Original Size ÷ Encoded Size) × 100. It represents what percentage of the encoded output is actual original data versus encoding overhead. Higher efficiency means less overhead.",
      },
      {
        q: "Why can't I enter an encoded size of zero?",
        a: "An encoded size of zero would make the efficiency and compression ratio mathematically undefined, since you cannot divide by zero. The calculator flags this case explicitly rather than displaying a misleading result.",
      },
      {
        q: "Which encoding method has the least overhead?",
        a: "Among common text-safe encodings, Base64 (about 33% overhead) is generally more compact than Base32 (about 60%) or Hexadecimal (100%). Binary transmission with no text encoding has 0% overhead but isn't always practical for text-based protocols.",
      },
      {
        q: "Can encoded data ever be smaller than the original?",
        a: "It's uncommon but possible with some binary-packing or compression-aware encodings. The calculator detects this case and labels it 'Reduced' instead of assuming all encoding always expands data.",
      },
      {
        q: "How is the performance rating determined?",
        a: "The rating is based on encoding efficiency: 90% and above is Highly Efficient, 75 to 89% Efficient, 60 to 74% Moderately Efficient, 40 to 59% Low Efficiency, and below 40% Poor Efficiency.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your data sizes are never transmitted to any server, and no actual file or data content is ever uploaded, since you only enter numeric sizes.",
      },
    ],
  },
};
