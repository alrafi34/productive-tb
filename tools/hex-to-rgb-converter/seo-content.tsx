import Link from "next/link";
import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

// Common colors with their CSS names; RGB values are computed from the HEX code
const COLORS: [string, string][] = [
  ["White", "#FFFFFF"],
  ["Black", "#000000"],
  ["Red", "#FF0000"],
  ["Lime (pure green)", "#00FF00"],
  ["Blue", "#0000FF"],
  ["Yellow", "#FFFF00"],
  ["Cyan / Aqua", "#00FFFF"],
  ["Magenta / Fuchsia", "#FF00FF"],
  ["Silver", "#C0C0C0"],
  ["Gray", "#808080"],
  ["Orange", "#FFA500"],
  ["Tomato", "#FF6347"],
  ["Navy", "#000080"],
  ["Teal", "#008080"],
  ["Rebecca Purple", "#663399"],
];

const DIGITS = "0123456789ABCDEF".split("");

const rgbOf = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ");

export default function HexToRgbSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const th = "text-left py-2 px-3 font-semibold text-gray-700";
  const td = "py-1.5 px-3 font-mono text-xs text-gray-700";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How HEX Color Codes Work</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>A HEX color code is an RGB color written in base 16. The six digits after the # form three pairs, one each for red, green and blue, and each pair runs from 00 (none of that light) to FF (full intensity, 255). That gives 256 × 256 × 256 = 16,777,216 possible colors.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>#RRGGBB → rgb(RR, GG, BB)</p>
            <p>value = first digit × 16 + second digit&nbsp;&nbsp;(A=10 … F=15)</p>
            <p>#FF5733 → FF = 255, 57 = 87, 33 = 51 → rgb(255, 87, 51)</p>
          </div>
          <p>Hex digits run 0–9 and then A–F:</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {DIGITS.map((d, i) => (
              <div key={d} className="font-mono text-xs text-gray-700 bg-gray-50 border border-gray-100 rounded px-2 py-1 text-center">{d} = {i}</div>
            ))}
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Common Colors: HEX to RGB Chart</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b-2 border-gray-200"><th className={th}>Color</th><th className={th}>HEX</th><th className={th}>RGB</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {COLORS.map(([name, hex]) => (
                <tr key={hex} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-xs text-gray-900">
                    <span className="inline-block w-3 h-3 rounded-sm border border-gray-300 mr-2 align-middle" style={{ backgroundColor: hex }} />
                    {name}
                  </td>
                  <td className={td}>{hex}</td>
                  <td className={td}>rgb({rgbOf(hex)})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">In CSS, “green” is #008000; the pure green channel #00FF00 is named “lime”.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Converting RGB Back to HEX</h2>
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>Divide each channel by 16: the whole-number part is the first hex digit and the remainder is the second. For rgb(52, 152, 219):</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-1">
            <p>52 ÷ 16 = 3 remainder 4 → 34</p>
            <p>152 ÷ 16 = 9 remainder 8 → 98</p>
            <p>219 ÷ 16 = 13 remainder 11 → DB</p>
            <p>→ #3498DB</p>
          </div>
          <p>Transparency is not part of RGB. To add it, use the <Link href="/tools/design/hex-to-rgba-converter" className="text-primary underline">HEX to RGBA converter</Link>; for HSV, CMYK or CSS color names, use the <Link href="/tools/design/color-format-converter" className="text-primary underline">color format converter</Link>.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the HEX to RGB Converter</h2>
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
