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
    faq: [
      { q: "How accurate is the token estimate?", a: "For standard English text, the Fast Estimate is typically within 5–10% of the actual token count used by OpenAI models. Code prompts are best estimated with the Code-Heavy mode. For critical applications, use OpenAI's Tiktoken library for exact counts." },
      { q: "What happens if my prompt exceeds the context window?", a: "The API will return an error. For OpenAI models this is a 400 error with a context_length_exceeded message. You need to either shorten your prompt, truncate conversation history, or switch to a model with a larger context window." },
      { q: "Why do output tokens cost more than input tokens?", a: "Generating tokens requires significantly more GPU compute than processing input tokens. The model must run a full forward pass for each generated token, while input tokens are processed in parallel." },
      { q: "How can I reduce my token usage?", a: "Common strategies: shorten system prompts, remove redundant context, use structured formats instead of prose instructions, implement prompt caching for repeated prefixes, and truncate conversation history to a rolling window." },
      { q: "Does this tool work for non-English text?", a: "Yes. Switch to Multilingual Estimate mode for better accuracy with CJK, Arabic, Hebrew, or other non-Latin scripts. These languages tokenize differently — each CJK character is often a single token while Latin text averages 4 characters per token." },
    ],
  },
  relatedTools: [
    "ai-token-cost-calculator",
    "download-time-calculator",
    "time-complexity-calculator",
    "latency-calculator",
  ],
};

export const toolConfig = aiPromptLengthCalculatorConfig;
