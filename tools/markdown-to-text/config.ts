import { siteConfig } from "@/config/site";

export const markdownToTextConfig = {
  name: "Markdown to Text",
  description: "Remove Markdown symbols such as ** and ## from ChatGPT and other AI answers, and copy clean text or formatted text for Word and email.",
  icon: "🧹",
  category: "writing",
  slug: "markdown-to-text",
  seo: {
    title: "Markdown to Text – Remove ** and ## From ChatGPT Text",
    description: "Paste text from ChatGPT or any Markdown and get clean plain text without **, ## or hyphen bullets, or copy it formatted for Word and Google Docs. Free.",
    keywords: [
      "markdown to text",
      "remove markdown",
      "markdown to plain text",
      "remove asterisks from chatgpt text",
      "chatgpt text cleaner",
      "remove markdown formatting",
      "chatgpt to word",
      "convert markdown to plain text",
      "strip markdown",
      "copy chatgpt without formatting",
      "remove em dashes",
      "ai text formatter",
    ],
    og: {
      title: "Markdown to Text – Remove ** and ## From ChatGPT Text",
      description: "Turn Markdown from ChatGPT and other AI answers into clean plain text, or copy it formatted for Word, Google Docs and email.",
      url: `${siteConfig.url}/tools/writing/markdown-to-text`,
    },
    howToSteps: [
      { name: "Paste your text", text: "Paste an answer from ChatGPT, Claude, Gemini or any text written in Markdown into the left box." },
      { name: "Choose the clean-up", text: "Pick how list bullets look, whether to replace em dashes, keep link addresses, straighten quotes, or remove emoji and reference numbers." },
      { name: "Check the result", text: "The clean text appears on the right as you type, with the word and character count." },
      { name: "Copy or download", text: "Copy plain text for forms and messages, Copy for Word / Google Docs to keep bold, headings and lists, or download a .txt file." },
    ],
    faq: [
      { q: "Why does text from ChatGPT have ** and ## in it?", a: "AI chat apps write their answers in Markdown, where **text** means bold, ## starts a heading and a hyphen starts a list item. The chat window shows the formatting, but some copy buttons, apps and forms paste the raw symbols instead." },
      { q: "How do I remove the asterisks from ChatGPT text?", a: "Paste the text in the left box. The ** and * around bold and italic words are removed, along with heading marks, list hyphens, backticks and quote markers, and the clean text appears on the right." },
      { q: "How do I paste ChatGPT text into Word without the symbols?", a: "Paste it here and click Copy for Word / Google Docs. Then paste into Word, Google Docs, Outlook or Gmail: headings, bold, italics and lists come through as real formatting, with no Markdown symbols." },
      { q: "Can it remove em dashes?", a: "Yes. Set Em dashes to Replace with - or Replace with a comma. Keep leaves them as they are." },
      { q: "What happens to links, tables and code?", a: "Links keep their text, and their address too if you tick Keep link addresses. Tables become rows with tab-separated columns, which paste into a spreadsheet as columns. Code blocks are kept exactly as written, including any * or _ inside them." },
      { q: "Is my text sent anywhere?", a: "No. We do not collect or store your text." },
    ],
  },
};
