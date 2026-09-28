import ToolFaq from "@/components/ToolFaq";
import { imageConverterConfig } from "./config";

export default function ImageConverterSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = imageConverterConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const formats: [string, string, string, string, string][] = [
    ["JPG / JPEG", "Lossy", "No", "Photos, email, printing, any website", "Universal"],
    ["PNG", "Lossless", "Yes", "Screenshots, logos, text, graphics", "Universal"],
    ["WebP", "Lossy or lossless", "Yes", "Web pages: 25–35% smaller than JPG", "All current browsers"],
    ["HEIC / HEIF", "Lossy", "Yes", "iPhone and iPad camera photos", "Apple devices; limited elsewhere"],
    ["AVIF", "Lossy or lossless", "Yes", "Web pages: smallest files", "Current browsers"],
    ["GIF", "Lossless, 256 colors", "1-bit", "Simple animations", "Universal"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Convert Images Between JPG, PNG, WebP and HEIC</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            This image converter changes the file format of your pictures without uploading them anywhere. Turn
            <strong> HEIC photos from an iPhone into JPG</strong> so they open on Windows and Android, save
            <strong> WebP images as JPG or PNG</strong> for software that cannot read WebP, or convert JPG and PNG to
            WebP to make a website load faster.
          </p>
          <p>
            Add as many files as you like; each is converted at its original width and height and can be downloaded on
            its own or together as a ZIP file.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Which Image Format to Use</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Format</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Compression</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Transparency</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Best for</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {formats.map(([f, c, t, use, support]) => (
                <tr key={f} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{f}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{c}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{t}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{use}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          HEIC, GIF, BMP and AVIF can be read; files are saved as JPG, PNG or WebP. AVIF input needs a browser that
          displays AVIF, which all current versions of Chrome, Edge, Firefox and Safari do.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Convert an Image</h2>
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
