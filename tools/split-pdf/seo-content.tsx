import ToolFaq from "@/components/ToolFaq";
import { splitPdfConfig } from "./config";

export default function SplitPdfSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = splitPdfConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const examples: [string, string, string][] = [
    ["Split by ranges", "1-3, 4-6, 7-", "Three PDFs: pages 1–3, 4–6 and 7 to the end"],
    ["Split every N pages", "N = 1", "One PDF per page"],
    ["Split every N pages", "N = 2", "Pages 1–2, 3–4, 5–6 …"],
    ["Extract pages", "2, 5-7", "One PDF with pages 2, 5, 6 and 7"],
    ["Delete pages", "1, 10-", "One PDF without page 1 and without page 10 onwards"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Split, Extract or Delete PDF Pages</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Send only the signed page of a contract, break a scanned batch into separate documents, or drop blank and
            unneeded pages before emailing a report. This tool <strong>splits a PDF by page ranges</strong> or into
            equal parts, <strong>extracts pages</strong> into a new file or <strong>deletes pages</strong>, in a few
            clicks.
          </p>
          <p>Pages are copied unchanged. We do not collect or store your files.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Examples</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Mode</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">You type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">You get</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {examples.map(([m, t, r]) => (
                <tr key={m + t} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{m}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-700">{t}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Split a PDF</h2>
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
