import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

// [use, prefix, suffix, result for "apples / bananas"]
const RECIPES: [string, string, string, string][] = [
  ["Markdown bullet list", "- ", "", "- apples\n- bananas"],
  ["Markdown checklist", "- [ ] ", "", "- [ ] apples\n- [ ] bananas"],
  ["JSON or Python array items", "\"", "\",  (no comma on last line)", "\"apples\",\n\"bananas\""],
  ["SQL IN (...) values", "'", "',  (no comma on last line)", "'apples',\n'bananas'"],
  ["HTML list items", "<li>", "</li>", "<li>apples</li>\n<li>bananas</li>"],
  ["Email or chat quote", "> ", "", "> apples\n> bananas"],
  ["Code comments", "// ", "", "// apples\n// bananas"],
  ["Hashtags", "#", "", "#apples\n#bananas"],
  ["Full URLs from paths", "https://example.com/", "", "https://example.com/apples\nhttps://example.com/bananas"],
];

export default function SEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Formatting a List Line by Line</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Lists copied from a spreadsheet column, an email or a text file usually need the same few characters added to every line before they can be used somewhere else: a dash for a Markdown list, quotes and commas for code, or tags for HTML. Doing it by hand is slow and easy to get wrong on line 47 of 80.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>result = prefix + [number] + line + suffix</p>
          </div>
          <p>Numbering is added after the prefix, so a prefix of <code>Step </code> with numbering and a colon gives <code>Step 1: Preheat the oven</code>. Blank lines are left untouched and are not counted.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Prefix and Suffix Recipes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">To get</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Prefix</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Suffix</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RECIPES.map(([use, prefix, suffix, result]) => (
                <tr key={use} className="hover:bg-gray-50 align-top">
                  <td className="py-1.5 px-3 text-xs text-gray-900">{use}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700 whitespace-pre">{prefix}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700 whitespace-pre">{suffix || "–"}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700 whitespace-pre">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Add a Prefix or Suffix to Every Line</h2>
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
