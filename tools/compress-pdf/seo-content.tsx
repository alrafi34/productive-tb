import ToolFaq from "@/components/ToolFaq";
import { compressPdfConfig } from "./config";

export default function CompressPdfSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = compressPdfConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const levels: [string, string, string, string][] = [
    ["Light", "2,200 px", "High", "Photo portfolios, brochures, anything you will print"],
    ["Recommended", "1,600 px", "Good", "Most documents: reports, scans, forms, slides"],
    ["Strong", "1,100 px", "Lower", "Email attachments and upload limits of 1–2 MB"],
  ];

  const sizes: [string, string][] = [
    ["2 MB", "Job applications, résumé uploads, many school and university portals"],
    ["1 MB", "Many visa, passport and government forms"],
    ["500 KB", "Online forms with tight limits, scanned ID documents"],
    ["200 KB / 100 KB", "Very strict portals; best for one or two scanned pages"],
  ];

  const limits: [string, string][] = [
    ["Gmail / Yahoo Mail attachment", "25 MB"],
    ["Outlook.com attachment", "20 MB"],
    ["Many job and visa application forms", "1–5 MB per file"],
    ["Many university and government portals", "2–10 MB per file"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Reduce PDF File Size</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An upload form that stops at 2 MB, an email that bounces because the attachment is too big, a scanned
            contract that takes ages to open: in almost every case the weight of a PDF is its <strong>photos and
            scanned pages</strong>, not its text. This tool shrinks those images and re-saves them as JPEG, so the
            file gets much smaller while the text stays crisp.
          </p>
          <p>
            Text, fonts, tables and vector drawings are left exactly as they are, so you can still select, copy and
            search the text in the compressed file. An image is only replaced when the new version is actually
            smaller, and if nothing in the file can be made smaller you get the original back. No watermark is added.
            We do not collect or store your files.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Compress a PDF to 100 KB, 200 KB, 500 KB or 1 MB</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Upload forms rarely ask for &quot;smaller&quot;; they ask for <strong>under 200 KB</strong> or{" "}
            <strong>under 2 MB</strong>. Choose <em>To a file size</em>, type the limit or tap a preset, and the tool
            tries several quality settings and keeps the sharpest version that fits. You do not have to guess a level
            and try again.
          </p>
          <p>
            If even the smallest version is over the limit, which happens with long scanned documents, click{" "}
            <em>Split into parts</em>. The PDF is cut into page ranges that each fit, ready to upload one by one or to
            download together as a ZIP.
          </p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Target</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Often asked for by</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizes.map(([t, w]) => (
                <tr key={t} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium text-gray-900 whitespace-nowrap">{t}</td>
                  <td className="py-2 px-3 text-gray-700">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Compression Levels</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Level</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Longest image side</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Image quality</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Good for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {levels.map(([l, px, q, use]) => (
                <tr key={l} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium text-gray-900">{l}</td>
                  <td className="py-2 px-3 text-gray-700">{px}</td>
                  <td className="py-2 px-3 text-gray-700">{q}</td>
                  <td className="py-2 px-3 text-gray-700">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          A letter-size or A4 page shown at 1,600 pixels tall is about 145 dpi, which reads comfortably on screen and
          prints cleanly on an office printer. Images that are already smaller than the limit keep their size and are
          only re-encoded.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Common Size Limits</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Where you send it</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {limits.map(([w, l]) => (
                <tr key={w} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-700">{w}</td>
                  <td className="py-2 px-3 text-gray-900 font-medium">{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Limits change and differ between forms, so check the one you are using. Email limits apply to the whole
          message, so keep attachments a little under them.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Compress a PDF</h2>
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
