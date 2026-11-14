import ToolFaq from "@/components/ToolFaq";
import { markdownToTextConfig } from "./config";

export default function MarkdownToTextSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = markdownToTextConfig.seo;
  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const rows: [string, string, string][] = [
    ["**bold** or __bold__", "Bold", "bold"],
    ["*italic* or _italic_", "Italic", "italic"],
    ["## Heading", "Heading", "Heading"],
    ["- item or * item", "Bullet list", "• item"],
    ["1. item", "Numbered list", "1. item"],
    ["[text](https://…)", "Link", "text"],
    ["`code`", "Inline code", "code"],
    ["> quote", "Quote", "quote"],
    ["| a | b |", "Table", "a ⇥ b"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Clean Up Text From ChatGPT and Other AI Tools</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            You copy an answer from an AI chat into an email, a form or a document, and it arrives full of{" "}
            <code className="bg-gray-100 px-1 rounded">**</code>, <code className="bg-gray-100 px-1 rounded">##</code> and
            hyphens. That is <strong>Markdown</strong>, the formatting language AI chat apps write in. This tool turns
            it into clean, readable plain text, or copies it with real bold, headings and lists for Word and Google Docs.
          </p>
          <p>
            It reads the Markdown structure rather than deleting every asterisk, so a <em>5 * 3</em> in a sentence and
            the symbols inside code blocks stay as they are, nested lists keep their indentation, and numbered lists keep
            their numbers.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What Gets Removed</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Markdown</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Means</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Plain text</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map(([m, means, out]) => (
                <tr key={m} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono text-xs text-gray-900">{m}</td>
                  <td className="py-2 px-3 text-gray-700">{means}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-900">{out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Remove Markdown</h2>
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
