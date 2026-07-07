import { siteConfig } from "@/config/site";

export const threadPitchCalculatorConfig = {
  name: "Thread Pitch Calculator",
  slug: "thread-pitch-calculator",
  description: "Calculate thread pitch, TPI, lead, and thread spacing for metric and imperial fasteners. Supports bolt identification, CNC machining, and mechanical assembly.",
  category: "mechanical",
  icon: "🔩",
  free: true,
  seo: {
    title: "Free Thread Pitch Calculator – Metric & Imperial TPI Calculator",
    description: "Calculate thread pitch instantly for metric and imperial threads. Convert TPI, measure thread spacing, calculate lead, and identify thread types online for free.",
    keywords: [
      "thread pitch calculator",
      "metric thread calculator",
      "TPI calculator",
      "bolt thread calculator",
      "thread spacing calculator",
      "imperial thread pitch calculator",
      "lead calculator",
      "thread measurement tool",
      "threads per inch calculator",
      "M10 thread pitch",
      "UNC UNF thread calculator",
      "CNC thread calculator",
      "fastener thread calculator",
      "screw thread pitch",
    ],
    og: {
      title: "Free Thread Pitch Calculator – Metric & Imperial TPI Calculator",
      description: "Calculate thread pitch instantly for metric and imperial threads. Convert TPI, measure thread spacing, calculate lead, and identify thread types online for free.",
      url: `${siteConfig.url}/tools/mechanical/thread-pitch-calculator`,
    },
  },
  relatedTools: [
    "torque-calculator",
    "bolt-load-calculator",
    "stress-calculator",
    "force-calculator",
    "gear-ratio-calculator",
    "spring-force-calculator",
  ],
};
