import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const SQUARES = Array.from({ length: 25 }, (_, i) => i + 1);
const NON_PERFECT = [2, 3, 5, 6, 7, 8, 10, 12];
const SIMPLIFY: [number, string, string][] = [
  [8, "4 × 2", "2√2"],
  [12, "4 × 3", "2√3"],
  [18, "9 × 2", "3√2"],
  [20, "4 × 5", "2√5"],
  [32, "16 × 2", "4√2"],
  [48, "16 × 3", "4√3"],
  [50, "25 × 2", "5√2"],
  [72, "36 × 2", "6√2"],
  [75, "25 × 3", "5√3"],
  [98, "49 × 2", "7√2"],
];

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
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What Is a Square Root?</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>The square root of a number <em>x</em> is the number that gives <em>x</em> when multiplied by itself. It is written √x, so √49 = 7 because 7 × 7 = 49. Every positive number has two square roots, one positive and one negative (7 and −7); the √ sign means the positive one.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>y = √x&nbsp;&nbsp;⇔&nbsp;&nbsp;y × y = x, y ≥ 0</p>
            <p>√(a × b) = √a × √b&nbsp;&nbsp;&nbsp;&nbsp;(used to simplify)</p>
            <p>√x = x<sup>1/2</sup>, ∛x = x<sup>1/3</sup></p>
          </div>
          <p>Square roots turn up whenever an area has to become a length: a square room of 400 sq ft is √400 = 20 ft on each side, and a 36 m² plot is 6 m square. They are also at the heart of the Pythagorean theorem, c = √(a² + b²), so a 3 by 4 rectangle has a diagonal of √25 = 5.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Perfect Squares Chart (1–25)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {SQUARES.map((n) => (
            <div key={n} className="font-mono text-xs text-gray-700 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              √{n * n} = {n}
            </div>
          ))}
        </div>
        <h3 className="font-semibold text-gray-900 mt-6 mb-3">Common non-perfect squares</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {NON_PERFECT.map((n) => (
            <div key={n} className="font-mono text-xs text-gray-700 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              √{n} ≈ {Math.sqrt(n).toFixed(4)}
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Simplifying Square Roots</h2>
        <p className="text-gray-600 leading-relaxed mb-4">A square root is in simplest radical form when the number under the √ has no perfect square factor other than 1. Find the largest perfect square that divides the number, take its root out in front, and leave the rest under the sign.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b-2 border-gray-200"><th className={th}>Root</th><th className={th}>Factor</th><th className={th}>Simplified</th><th className={th}>Decimal</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {SIMPLIFY.map(([n, factor, simple]) => (
                <tr key={n} className="hover:bg-gray-50">
                  <td className={td}>√{n}</td>
                  <td className={td}>{factor}</td>
                  <td className={td}>{simple}</td>
                  <td className={td}>{Math.sqrt(n).toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Cube Roots and Other Roots</h2>
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>A cube root is the number that gives <em>x</em> when used three times: ∛27 = 3 and ∛1000 = 10. The calculator shows the cube root under every square root. In general, the <em>n</em>th root of <em>x</em> is x<sup>1/n</sup>; the fourth root of 81 is 3 because 3⁴ = 81.</p>
          <p>Even roots (square, fourth …) of negative numbers are not real, but odd roots are: ∛−125 = −5. For negative inputs the calculator gives the square root in terms of the imaginary unit <em>i</em>, as in √−9 = 3i.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Square Root Calculator</h2>
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
