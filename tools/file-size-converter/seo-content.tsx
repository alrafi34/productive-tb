import ToolFaq from "@/components/ToolFaq";
import { fileSizeConverterConfig } from "./config";

const H2 = "text-2xl font-semibold text-gray-900";
const HEADING = { fontFamily: "var(--font-heading)" };
const SECTION = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";

const UNIT_ROWS = [
  { unit: "Kilobyte", decimal: "KB = 1,000 B", binary: "KiB = 1,024 B" },
  { unit: "Megabyte", decimal: "MB = 1,000,000 B", binary: "MiB = 1,048,576 B" },
  { unit: "Gigabyte", decimal: "GB = 1,000,000,000 B", binary: "GiB = 1,073,741,824 B" },
  { unit: "Terabyte", decimal: "TB = 10¹² B", binary: "TiB = 1,099,511,627,776 B" },
  { unit: "Petabyte", decimal: "PB = 10¹⁵ B", binary: "PiB ≈ 1.126 × 10¹⁵ B" },
];

/* Rough sizes from common bitrates and formats, to give the units a scale.
   Real files vary with resolution, compression and length. */
const SIZES: [string, string][] = [
  ["A page of plain text", "about 2–4 KB"],
  ["A 12-megapixel JPEG photo", "about 3–5 MB"],
  ["A 4-minute song at 256 kbps", "about 7.7 MB"],
  ["One hour of HD streaming at 5 Mbps", "about 2.25 GB"],
  ["A modern video game", "50–150 GB"],
];

export default function FileSizeConverterSEO() {
  const { howToSteps, faq } = fileSizeConverterConfig.seo;

  return (
    <>
      <section className={`mt-12 ${SECTION.replace("mt-8 ", "")}`}>
        <h2 className={`${H2} mb-4`} style={HEADING}>What This File Size Converter Does</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter a size and the converter shows it in <strong>bytes, KB, MB, GB, TB and PB</strong> at once,
            in either <strong>binary</strong> units (1 KB = 1,024 bytes) or <strong>decimal</strong> units
            (1 KB = 1,000 bytes). It also shows how the same size appears in <strong>Windows and macOS</strong>,
            which use different units, and how long the file takes to <strong>download or upload</strong> at
            your connection speed.
          </p>
          <p>
            That difference is why a new 1 TB drive shows up as 931 GB in Windows, and why a file can look
            larger on a Mac than on a PC: the bytes are identical, only the unit changes.
          </p>
        </div>
      </section>

      <section className={SECTION}>
        <h2 className={`${H2} mb-6`} style={HEADING}>How to Use the File Size Converter</h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name: title, text: desc }, i) => (
            <li key={i} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{title}:</strong> {desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={SECTION}>
        <h2 className={`${H2} mb-6`} style={HEADING}>Binary and Decimal Units, and Typical Sizes</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Unit</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Decimal</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Binary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {UNIT_ROWS.map((r) => (
                  <tr key={r.unit}>
                    <td className="py-2 px-3 text-gray-800">{r.unit}</td>
                    <td className="py-2 px-3 font-mono text-xs text-gray-600">{r.decimal}</td>
                    <td className="py-2 px-3 font-mono text-xs text-gray-600">{r.binary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Item</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Rough size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SIZES.map(([item, size]) => (
                  <tr key={item}>
                    <td className="py-2 px-3 text-gray-800">{item}</td>
                    <td className="py-2 px-3 font-mono text-xs text-gray-600">{size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-3">Approximate; real files vary with resolution, compression and length.</p>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
