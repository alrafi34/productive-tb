import ToolFaq from "@/components/ToolFaq";
import { mergePdfConfig } from "./config";

export default function MergePdfSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = mergePdfConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const examples: [string, string][] = [
    ["(empty) or all", "Every page"],
    ["1-3", "Pages 1, 2 and 3"],
    ["1, 4, 6", "Pages 1, 4 and 6"],
    ["2-", "Page 2 to the last page"],
    ["-5", "The first five pages"],
    ["5-1", "Pages 5 to 1, in reverse order"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Combine PDF Files in Your Browser</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Put a cover letter, résumé and references into one application, join monthly statements for your
            accountant, or add a signed page back into a contract. This tool <strong>merges PDF files into a single
            document</strong> in the order you set, and can take just the pages you need from each file.
          </p>
          <p>
            Pages are copied without being re-rendered, so text stays selectable and nothing is compressed. The files
            are processed on your device and are never uploaded.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Choosing Pages</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Includes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {examples.map(([t, r]) => (
                <tr key={t} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono text-xs text-gray-900">{t}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Merge PDF Files</h2>
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
