import { siteConfig } from "@/config/site";

export const leadConversionFunnelCalculatorConfig = {
  slug: "lead-conversion-funnel-calculator",
  name: "Lead Conversion Funnel Calculator",
  description: "Analyze your marketing and sales funnel with stage-by-stage conversion rates, drop-off percentages, overall conversion, and a funnel efficiency score. Build 2-10 custom stages, visualize an interactive SVG funnel, detect bottlenecks automatically, and export reports. Free browser-based funnel calculator.",
  category: "marketing",
  icon: "🔄",
  free: true,
  relatedTools: [
    "conversion-rate-calculator",
    "cost-per-acquisition-cpa-calculator",
    "customer-lifetime-value-calculator",
    "bounce-rate-calculator",
    "marketing-roi-calculator",
    "roi-calculator-marketing",
  ],
  seo: {
    title: "Lead Conversion Funnel Calculator — Free Funnel Analyzer Online | Productive Toolbox",
    description: "Calculate lead conversion rates, drop-off percentages, and overall funnel efficiency. Build a custom funnel, visualize it live, detect bottlenecks, and export reports — free and browser-based.",
    keywords: [
      "lead conversion funnel calculator",
      "conversion funnel calculator",
      "sales funnel calculator",
      "marketing funnel calculator",
      "lead conversion rate calculator",
      "conversion analysis tool",
      "sales conversion calculator",
      "lead funnel calculator",
      "marketing analytics calculator",
      "conversion optimization tool",
      "crm funnel calculator",
      "customer acquisition funnel calculator",
      "funnel drop off calculator",
      "funnel efficiency score",
      "funnel bottleneck detector",
      "free funnel calculator",
      "funnel visualization tool",
      "b2b sales funnel calculator",
      "saas funnel calculator",
      "funnel conversion rate analyzer",
    ],
    openGraph: {
      title: "Lead Conversion Funnel Calculator — Free Funnel Analyzer",
      description: "Calculate stage-by-stage conversion rates, drop-off percentages, and overall funnel efficiency with a live visual funnel and bottleneck detection — free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/lead-conversion-funnel-calculator`,
    },
    og: {
      title: "Lead Conversion Funnel Calculator — Free Funnel Analyzer",
      description: "Calculate stage-by-stage conversion rates, drop-off percentages, and overall funnel efficiency with a live visual funnel and bottleneck detection — free and browser-based.",
      url: `${siteConfig.url}/tools/marketing/lead-conversion-funnel-calculator`,
    },
    howToSteps: [
      {
        name: "Build Your Funnel Stages",
        text: "Start from the default 5-stage funnel or click Load Sample Data, then rename stages and enter the numeric value for each — anywhere from 2 to 10 stages are supported.",
      },
      {
        name: "Enter Values for Each Stage",
        text: "Type the number of visitors, leads, or customers at each stage. Values update the funnel and all metrics instantly with a short debounce.",
      },
      {
        name: "Reorder or Add/Remove Stages",
        text: "Drag a stage by its handle to reorder it, use the up/down arrows as an alternative, or use Add Stage and the remove (✕) button to change how many stages your funnel has.",
      },
      {
        name: "Review the Visual Funnel and Metrics",
        text: "Check the interactive SVG funnel diagram, the overall conversion rate, funnel efficiency score, and the automatically highlighted biggest drop-off stage.",
      },
      {
        name: "Read the Insights and Fix Bottlenecks",
        text: "Review the auto-generated insights identifying your best and worst-performing transitions, then adjust stage values to model potential improvements.",
      },
      {
        name: "Save, Compare, or Export",
        text: "Save the funnel to history, compare your current funnel against a previously saved one, or export the results as CSV, JSON, PNG, SVG, or a printed report.",
      },
    ],
    faq: [
      {
        q: "What is a lead conversion funnel calculator?",
        a: "A lead conversion funnel calculator is a free browser-based tool that measures how effectively leads or visitors move through each stage of a marketing or sales process, from initial awareness (like website visitors) down to a final outcome (like paying customers). It calculates the conversion rate and drop-off percentage between every stage as well as the overall funnel conversion rate.",
      },
      {
        q: "How is conversion rate calculated between two stages?",
        a: "Conversion rate between two stages is calculated as (Current Stage ÷ Previous Stage) × 100. For example, if 1,500 people become leads out of 12,000 visitors, the conversion rate is (1,500 ÷ 12,000) × 100 = 12.5%.",
      },
      {
        q: "How is overall funnel conversion calculated?",
        a: "Overall funnel conversion is calculated as (Final Stage ÷ First Stage) × 100. For example, if 120 customers come from an original 12,000 visitors, the overall conversion rate is (120 ÷ 12,000) × 100 = 1%.",
      },
      {
        q: "What is the funnel efficiency score?",
        a: "The funnel efficiency score is the geometric mean of every stage-to-stage conversion rate, expressed out of 100. Because the product of all individual conversion rates equals the overall conversion rate, this score represents the equivalent conversion rate each stage would need if every stage converted equally well — making it a fairer comparison across funnels with different numbers of stages.",
      },
      {
        q: "How does the calculator detect the biggest bottleneck?",
        a: "The calculator compares the drop-off percentage between every pair of adjacent stages and automatically flags the transition with the highest drop-off as the biggest bottleneck, both in the stage table and directly on the visual funnel diagram, along with a written insight explaining where the leak is happening.",
      },
      {
        q: "Can I use more or fewer than 5 stages?",
        a: "Yes. The calculator supports between 2 and 10 stages. Use Add Stage to insert a new stage, the ✕ button to remove one, and drag-and-drop or the up/down arrows to reorder stages to match your actual funnel structure.",
      },
      {
        q: "What does the strict validation toggle do?",
        a: "When Strict Validation is enabled (the default), a stage cannot have a higher value than the stage directly before it, since that would represent an impossible conversion rate over 100%. Disabling it allows values to exceed the previous stage — useful for exploratory or hypothetical scenarios — but the calculator will still display a clear warning when a conversion rate exceeds 100%.",
      },
      {
        q: "Can I compare two different funnels?",
        a: "Yes. Save a funnel to history, then click Compare next to any saved entry to see a Current vs. Previous Funnel comparison showing overall conversion rate and efficiency score side by side — useful for measuring the impact of funnel optimization changes over time.",
      },
      {
        q: "What's the difference between conversion rate and drop-off rate?",
        a: "Conversion rate is the percentage of people from one stage who successfully move to the next stage. Drop-off rate is the percentage who do not — the two always add up to 100% for any given stage transition. A 65% conversion rate between two stages means a 35% drop-off rate at that same transition.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your funnel stage names, values, and any saved history are never transmitted to any server, stored in any database, or accessible to anyone other than you. History is stored only in your browser's local storage.",
      },
    ],
  },
};
