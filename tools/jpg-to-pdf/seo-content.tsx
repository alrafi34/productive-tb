import ToolFaq from "@/components/ToolFaq";
import { jpgToPdfConfig } from "./config";

export default function JpgToPdfSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = jpgToPdfConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const sizes: [string, string, string, string][] = [
    ["A4", "210 × 297 mm", "8.27 × 11.69 in", "Europe and most of the world"],
    ["US Letter", "216 × 279 mm", "8.5 × 11 in", "United States, Canada, Mexico"],
    ["US Legal", "216 × 356 mm", "8.5 × 14 in", "Legal documents in the US and Canada"],
    ["A5", "148 × 210 mm", "5.83 × 8.27 in", "Booklets, flyers, notebooks"],
    ["A3", "297 × 420 mm", "11.69 × 16.54 in", "Posters, drawings, large charts"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Turn Photos and Scans into a PDF</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Photographed a signed form, receipts or pages of notes? This converter puts <strong>JPG, PNG, WebP and
            HEIC images into a single PDF</strong>, one image per page, in the order you choose. Pick a standard paper
            size so the file prints properly, or keep each page the exact size of its image.
          </p>
          <p>
            The PDF is created instantly. We do not collect or store your images, which matters for IDs, contracts and
            medical or financial paperwork.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Paper Sizes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Size</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Millimeters</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Inches</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Used for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizes.map(([s, mm, inch, use]) => (
                <tr key={s} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{s}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{mm}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{inch}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          ISO 216 (A sizes) and ANSI/ASME Y14.1 (Letter and Legal). Images are scaled to fit inside the margins without
          being stretched or cropped.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Convert JPG to PDF</h2>
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
