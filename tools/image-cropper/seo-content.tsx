import ToolFaq from "@/components/ToolFaq";
import { imageCropperConfig } from "./config";

export default function ImageCropperSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = imageCropperConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const ratios: [string, string, string][] = [
    ["1:1", "Profile pictures, square posts, product photos", "1080 × 1080"],
    ["4:5", "Portrait feed posts on Instagram and Facebook", "1080 × 1350"],
    ["16:9", "YouTube thumbnails, link previews, presentations, HD video", "1920 × 1080"],
    ["9:16", "Stories, Reels, Shorts, TikTok, phone wallpapers", "1080 × 1920"],
    ["4:3", "Most phone and compact camera photos, tablets", "1600 × 1200"],
    ["3:2", "DSLR and mirrorless photos, 6 × 4 in (15 × 10 cm) prints", "1800 × 1200"],
    ["2:3", "Pinterest pins, portrait prints, posters", "1000 × 1500"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Crop Images to Any Shape or Size</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            This free image cropper trims photos to a fixed <strong>aspect ratio</strong> such as 1:1, 4:5 or 16:9, or
            to an exact size in <strong>pixels</strong>. Drag the crop box, type the numbers, rotate sideways photos and
            make round profile pictures with transparent corners.
          </p>
          <p>
            We do not collect or store your files.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Common Aspect Ratios</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Ratio</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical use</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Example size (px)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ratios.map(([r, use, size]) => (
                <tr key={r} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-xs font-semibold text-gray-900">{r}</td>
                  <td className="py-2 px-3 text-xs text-gray-700">{use}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs text-gray-700">{size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Example sizes are widely used defaults, not platform requirements; social networks revise their
          recommended sizes from time to time.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Crop an Image</h2>
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
