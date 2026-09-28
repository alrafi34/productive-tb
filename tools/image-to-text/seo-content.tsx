import ToolFaq from "@/components/ToolFaq";
import { imageToTextConfig } from "./config";

export default function ImageToTextSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = imageToTextConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const quality: [string, string, string][] = [
    ["Screenshot of a web page or document", "Excellent", "Sharp, straight, high contrast"],
    ["Flatbed scan at 300 dpi", "Excellent", "The resolution OCR engines are tuned for"],
    ["Phone photo of a printed page", "Good", "Shoot straight on in even light, no shadows"],
    ["Receipt or faded print", "Fair", "Low contrast; crop tightly around the text"],
    ["Text on a busy photo, sign or product", "Fair to poor", "Crop to the text only"],
    ["Handwriting", "Poor", "Printed-text engine; neat block letters work best"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Extract Text from Images with OCR</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Optical character recognition (OCR) turns the letters in a picture into text you can copy, edit and
            search. Use it to grab a quote from a screenshot, copy the details from a photographed document, or
            digitise a printed page instead of retyping it.
          </p>
          <p>
            This tool runs <strong>Tesseract</strong>, the widely used open-source OCR engine, inside your browser.
            It reads 23 languages, including accented European languages, Greek, Cyrillic, Arabic, Chinese, Japanese
            and Korean, and your image is never uploaded.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What to Expect from Different Images</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Image</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical result</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Why / tip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quality.map(([img, r, tip]) => (
                <tr key={img} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{img}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{r}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{tip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Convert an Image to Text</h2>
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
