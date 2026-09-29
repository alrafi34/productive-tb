import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

// [element, Markdown, notes]
const CHEAT_SHEET: [string, string, string][] = [
  ["Heading 1–6", "# Title\n## Section\n### Subsection", "One # per level, followed by a space"],
  ["Bold", "**bold** or __bold__", ""],
  ["Italic", "*italic* or _italic_", "Underscores inside words are ignored: snake_case"],
  ["Strikethrough", "~~deleted~~", "GFM"],
  ["Link", "[text](https://example.com)", "Bare URLs become links in GFM"],
  ["Image", "![alt text](image.png)", "Alt text describes the image"],
  ["Bulleted list", "- item\n- item\n  - nested item", "Indent two spaces to nest; * and + also work"],
  ["Numbered list", "1. first\n2. second", "The first number sets the start"],
  ["Task list", "- [ ] to do\n- [x] done", "GFM"],
  ["Blockquote", "> quoted text", "Add > to each line, or just the first"],
  ["Inline code", "`code`", ""],
  ["Code block", "```js\nconsole.log(1)\n```", "The language name enables highlighting on most sites"],
  ["Table", "| A | B |\n| --- | ---: |\n| 1 | 2 |", "Colons set alignment (GFM)"],
  ["Horizontal rule", "---", "On its own line, with a blank line above"],
  ["Line break", "line one\\\nline two", "Backslash or two trailing spaces"],
  ["Escape a symbol", "\\*not italic\\*", "A backslash shows the character literally"],
];

export default function MarkdownPreviewerSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Markdown in a Nutshell</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p><strong>Markdown</strong> lets you format text with a few plain characters that stay readable even before they are rendered. It is the standard for README files on GitHub and GitLab, documentation sites, and notes apps such as Obsidian and Notion, and it is understood by Reddit, Discord and Stack Overflow.</p>
          <p>There are several dialects. <strong>CommonMark</strong> is the precise, standardised core; <strong>GitHub Flavored Markdown</strong> (GFM) adds tables, task lists, strikethrough and automatic links. This previewer uses a CommonMark-compliant parser with GFM, and removes scripts from any HTML you include.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Markdown Cheat Sheet</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Element</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Markdown</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CHEAT_SHEET.map(([el, md, note]) => (
                <tr key={el} className="hover:bg-gray-50 align-top">
                  <td className="py-1.5 px-3 text-xs text-gray-900 whitespace-nowrap">{el}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700 whitespace-pre">{md}</td>
                  <td className="py-1.5 px-3 text-xs text-gray-600">{note || "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Markdown Previewer</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
