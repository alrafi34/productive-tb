import { siteConfig } from "@/config/site";

export const aiPromptLengthCalculatorConfig = {
  slug: "ai-prompt-length-calculator",
  name: "AI Prompt Length Calculator",
  description: "Calculate AI prompt length instantly. Count tokens, words, characters, sentences, and estimate context window usage for ChatGPT, Claude, Gemini, and other AI models.",
  category: "computer-science",
  icon: "📏",
  color: "#058554",
  featured: true,
  keywords: [
    "AI prompt calculator",
    "token calculator",
    "prompt token counter",
    "ChatGPT token estimator",
    "AI prompt length calculator",
    "LLM token counter",
    "prompt analyzer",
    "GPT token count",
  ],
  seo: {
    title: "AI Prompt Length Calculator – Count Tokens & Words",
    description: "Count tokens, words, characters and sentences in a prompt and estimate how much of a model's context window it uses.",
    keywords: "AI prompt calculator, token calculator, prompt token counter, ChatGPT token estimator, AI prompt length calculator, LLM token counter, prompt analyzer, GPT token count",
    og: {
      title: "AI Prompt Length Calculator – Count Tokens & Words",
      description: "Count tokens, words, characters and sentences in a prompt and estimate how much of a model's context window it uses.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/ai-prompt-length-calculator`,
    },
  },
  relatedTools: [
    "ai-token-cost-calculator",
    "download-time-calculator",
    "time-complexity-calculator",
    "latency-calculator",
  ],
};

export const toolConfig = aiPromptLengthCalculatorConfig;
