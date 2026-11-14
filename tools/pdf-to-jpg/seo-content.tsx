import ToolFaq from "@/components/ToolFaq";
import { pdfToJpgConfig } from "./config";

export default function PdfToJpgSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = pdfToJpgConfig.seo;
  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  // Pixel sizes for a full page at each resolution (8.5 × 11 in; 210 × 297 mm)
  const sizes: [string, string, string, string][] = [
    ["72 DPI", "612 × 792", "595 × 842", "Previews, quick sharing"],
    ["150 DPI", "1,275 × 1,650", "1,240 × 1,754", "Screens, email, upload forms"],
    ["300 DPI", "2,550 × 3,300", "2,480 × 3,508", "Printing, fine detail"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Convert PDF Pages to Images</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Post a slide on social media, paste a page into a presentation, attach a signed form where only images are
            accepted, or send a page that opens instantly on any phone. This tool turns <strong>each page of a PDF
            into a JPG or PNG image</strong>, or only the pages you choose, at the resolution you need.
          </p>
          <p>
            Pages are rendered the way a PDF viewer shows them, with their fonts, drawings and photos, on a white
            background. You see a preview of every image before you download it. We do not collect or store your files.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Image Size by Resolution</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Resolution</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">US Letter page</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">A4 page</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Good for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizes.map(([r, l, a, u]) => (
                <tr key={r} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium text-gray-900">{r}</td>
                  <td className="py-2 px-3 text-gray-700">{l} px</td>
                  <td className="py-2 px-3 text-gray-700">{a} px</td>
                  <td className="py-2 px-3 text-gray-700">{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Convert a PDF to JPG</h2>
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
