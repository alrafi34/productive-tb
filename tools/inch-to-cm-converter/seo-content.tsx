import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const INCHES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 20, 24, 30, 36, 48, 60];
const FRACTIONS: [string, number][] = [["1/16", 1 / 16], ["1/8", 1 / 8], ["1/4", 1 / 4], ["3/8", 3 / 8], ["1/2", 1 / 2], ["5/8", 5 / 8], ["3/4", 3 / 4], ["7/8", 7 / 8]];
const HEIGHTS: [string, number][] = [["5′ 0″", 60], ["5′ 3″", 63], ["5′ 6″", 66], ["5′ 8″", 68], ["5′ 10″", 70], ["6′ 0″", 72], ["6′ 2″", 74], ["6′ 4″", 76]];
const EVERYDAY: [string, string, string][] = [
  ["24″ monitor (diagonal)", "24 in", "60.96 cm"],
  ["55″ TV (diagonal)", "55 in", "139.7 cm"],
  ["65″ TV (diagonal)", "65 in", "165.1 cm"],
  ["US Letter paper", "8.5 × 11 in", "21.59 × 27.94 cm"],
  ["A4 paper", "8.27 × 11.69 in", "21 × 29.7 cm"],
  ["Standard door height (US)", "80 in", "203.2 cm"],
];

// 2 decimals, trailing zeros dropped: 2.54, 30.48, 139.7
const cm = (inches: number) => String(Math.round(inches * 2.54 * 100) / 100);

export default function ToolSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const th = "text-left py-2 px-3 font-semibold text-gray-700";
  const td = "py-1.5 px-3 font-mono text-xs text-gray-700";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Inches to Centimeters: the Formula</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Since 1959 the inch has been defined as exactly 25.4 millimeters, so the conversion never needs rounding:</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>cm = inches × 2.54</p>
            <p>inches = cm ÷ 2.54</p>
            <p>feet and inches → inches: feet × 12 + inches</p>
          </div>
          <p>Example: a person 5′ 10″ tall is 5 × 12 + 10 = 70 inches, and 70 × 2.54 = 177.8 cm.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Inches to cm Chart</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b-2 border-gray-200"><th className={th}>Inches</th><th className={th}>cm</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {INCHES.map((i) => <tr key={i} className="hover:bg-gray-50"><td className={td}>{i} in</td><td className={td}>{cm(i)}</td></tr>)}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b-2 border-gray-200"><th className={th}>Fraction</th><th className={th}>cm</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {FRACTIONS.map(([f, v]) => <tr key={f} className="hover:bg-gray-50"><td className={td}>{f} in</td><td className={td}>{String(Math.round(v * 2.54 * 1000) / 1000)}</td></tr>)}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b-2 border-gray-200"><th className={th}>Height</th><th className={th}>cm</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {HEIGHTS.map(([h, v]) => <tr key={h} className="hover:bg-gray-50"><td className={td}>{h}</td><td className={td}>{cm(v)}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Everyday Sizes in Inches and cm</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b-2 border-gray-200"><th className={th}>Item</th><th className={th}>Inches</th><th className={th}>Centimeters</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {EVERYDAY.map(([item, i, c]) => <tr key={item} className="hover:bg-gray-50"><td className="py-1.5 px-3 text-xs text-gray-900">{item}</td><td className={td}>{i}</td><td className={td}>{c}</td></tr>)}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Screen sizes are measured corner to corner, not across the width.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Convert Inches to cm</h2>
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
