import ToolFaq from "@/components/ToolFaq";
import { hexToRgbaConverterConfig } from "./config";

const OPACITIES = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0];
const alphaHex = (pct: number) => Math.round((pct / 100) * 255).toString(16).padStart(2, "0").toUpperCase();

export default function HexToRgbaConverterSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = hexToRgbaConverterConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const th = "text-left py-2 px-3 font-semibold text-gray-700";
  const td = "py-1.5 px-3 font-mono text-xs text-gray-700";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>HEX, RGBA and the Alpha Channel</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>RGBA is RGB plus a fourth value, alpha, which sets how opaque the color is: 1 is solid, 0 is invisible and 0.5 lets half of the background show through. The same transparency can be written several ways, depending on where the color is used:</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>rgba(52, 152, 219, 0.5)&nbsp;&nbsp;&nbsp;&nbsp;CSS, all browsers</p>
            <p>rgb(52 152 219 / 50%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modern CSS</p>
            <p>#3498DB80&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CSS, Figma (#RRGGBBAA)</p>
            <p>#803498DB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Android, .NET (#AARRGGBB)</p>
          </div>
          <p>Only the color itself becomes transparent. Text inside an element with an rgba() background stays fully solid, unlike the CSS <code>opacity</code> property, which fades everything in the element.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Opacity to HEX Alpha Chart</h2>
        <p className="text-gray-600 leading-relaxed mb-4">Add these two digits after a six-digit HEX code (or before it on Android). Each is the opacity × 255, rounded and written in hex.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b-2 border-gray-200"><th className={th}>Opacity</th><th className={th}>Alpha (0–1)</th><th className={th}>HEX digits</th><th className={th}>Example (CSS)</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {OPACITIES.map((pct) => (
                <tr key={pct} className="hover:bg-gray-50">
                  <td className={td}>{pct}%</td>
                  <td className={td}>{pct / 100}</td>
                  <td className={td}>{alphaHex(pct)}</td>
                  <td className={td}>#3498DB{alphaHex(pct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>The Solid Color Behind a Transparent One</h2>
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>A transparent color looks different on every background. Over a solid background, each channel mixes as:</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900">
            result = alpha × color + (1 − alpha) × background
          </div>
          <p>For rgba(52, 152, 219, 0.5) over white, red is 0.5 × 52 + 0.5 × 255 ≈ 154, which gives #9ACCED. The converter shows this solid equivalent for white and black backgrounds, which is useful for email templates, PDFs and design tools that flatten transparency.</p>
          <p>For plain HEX to RGB without transparency, with the working shown, use the <a href="/tools/design/hex-to-rgb-converter" className="text-primary underline">HEX to RGB converter</a>; for HSV, CMYK or CSS color names, the <a href="/tools/design/color-format-converter" className="text-primary underline">color format converter</a>.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the HEX to RGBA Converter</h2>
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
