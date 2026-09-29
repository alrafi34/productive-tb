import ToolFaq from "@/components/ToolFaq";
import { colorPaletteContrastGridConfig } from "./config";

const LEVELS: [string, string, string][] = [
  ["Normal text", "4.5:1", "7:1"],
  ["Large text (≥ 24px, or ≥ 18.7px bold)", "3:1", "4.5:1"],
  ["UI components and graphics", "3:1", "–"],
];

// Ratios computed with this tool; text color on white (#FFFFFF)
const EXAMPLES: [string, string, string, string][] = [
  ["#595959", "Dark gray", "7.00", "AAA"],
  ["#767676", "Mid gray", "4.54", "AA"],
  ["#777777", "One step lighter", "4.47", "AA large text only"],
  ["#1A73E8", "Google blue", "4.50", "AA"],
  ["#34A853", "Google green", "3.05", "AA large text only"],
  ["#FF0000", "Pure red", "3.99", "AA large text only"],
];

export default function ColorPaletteContrastGridSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = colorPaletteContrastGridConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const th = "text-left py-2 px-3 font-semibold text-gray-700";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>WCAG Contrast Requirements</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>The Web Content Accessibility Guidelines set minimum contrast ratios so that text stays readable for people with low vision or color blindness, and for everyone on a phone in bright sunlight. Most accessibility laws and policies, including the ADA in the US and the European Accessibility Act, point to WCAG level AA.</p>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className={th}>Content</th><th className={th}>Level AA</th><th className={th}>Level AAA</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {LEVELS.map(([what, aa, aaa]) => (
                <tr key={what} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-xs text-gray-900">{what}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{aa}</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{aaa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2 mt-6">
          <p>contrast = (L<sub>lighter</sub> + 0.05) ÷ (L<sub>darker</sub> + 0.05)</p>
          <p>L = 0.2126 R + 0.7152 G + 0.0722 B&nbsp;&nbsp;(linearised sRGB)</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Common Colors on White</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className={th}>Text color</th><th className={th}>Sample</th><th className={th}>Ratio</th><th className={th}>Result</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {EXAMPLES.map(([hex, name, ratio, result]) => (
                <tr key={hex} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{hex} <span className="font-sans text-gray-500">{name}</span></td>
                  <td className="py-1.5 px-3 text-sm font-semibold" style={{ color: hex }}>Sample text</td>
                  <td className="py-1.5 px-3 font-mono text-xs text-gray-700">{ratio}:1</td>
                  <td className="py-1.5 px-3 text-xs text-gray-600">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Ratios are rounded down, so a pair shown at 4.50:1 really passes 4.5:1.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Contrast Grid</h2>
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
