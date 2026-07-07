import { siteConfig } from "@/config/site";

export const aiTokenCostCalculatorConfig = {
  slug: "ai-token-cost-calculator",
  name: "AI Token Cost Calculator",
  description: "Estimate AI API token costs for OpenAI, Claude, Gemini, and custom models. Calculate prompt and completion token expenses, compare models, and forecast monthly and yearly costs.",
  category: "computer-science",
  icon: "🤖",
  color: "#058554",
  featured: true,
  keywords: [
    "AI token calculator",
    "OpenAI token cost calculator",
    "GPT API pricing calculator",
    "Claude token pricing",
    "Gemini token cost",
    "LLM pricing calculator",
    "AI API cost estimator",
    "prompt token calculator",
  ],
  seo: {
    title: "AI Token Cost Calculator – Estimate OpenAI, Claude & Gemini API Costs",
    description: "Calculate AI API token costs instantly. Estimate OpenAI, Claude, Gemini, and custom model pricing using prompt and completion tokens. Free token cost calculator online.",
    keywords: "AI token calculator, OpenAI token cost calculator, GPT API pricing calculator, Claude token pricing, Gemini token cost, LLM pricing calculator, AI API cost estimator, prompt token calculator",
    og: {
      title: "AI Token Cost Calculator – Estimate OpenAI, Claude & Gemini API Costs",
      description: "Calculate AI API token costs instantly for OpenAI, Claude, Gemini, and custom models. Free online token cost estimator.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/ai-token-cost-calculator`,
    },
  },
  relatedTools: [
    "ai-prompt-length-calculator",
    "download-time-calculator",
    "data-transfer-calculator",
    "time-complexity-calculator",
  ],
};

export const toolConfig = aiTokenCostCalculatorConfig;
