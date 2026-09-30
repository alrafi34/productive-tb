import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const METERS = [1, 10, 50, 100, 250, 500, 750, 1000, 1500, 2000, 5000, 10000];
const RACES: [string, number][] = [
  ["100 m sprint", 100],
  ["400 m (one track lap)", 400],
  ["1 mile", 1609.344],
  ["5K", 5000],
  ["10K", 10000],
  ["Half marathon", 21097.5],
  ["Marathon", 42195],
];

const fmt = (n: number, d: number) => Number(n.toFixed(d)).toLocaleString("en-US", { maximumFractionDigits: d });

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
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Meters to Kilometers: the Formula</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>The metric prefix <em>kilo</em> means one thousand, so a kilometer is exactly 1,000 meters. Converting between them only moves the decimal point three places.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>km = m ÷ 1,000&nbsp;&nbsp;&nbsp;&nbsp;(2,500 m = 2.5 km)</p>
            <p>m = km × 1,000&nbsp;&nbsp;&nbsp;&nbsp;(0.75 km = 750 m)</p>
            <p>miles = m ÷ 1,609.344</p>
          </div>
          <p>The meter itself is defined by the speed of light: the distance light travels in a vacuum in 1/299,792,458 of a second.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Meters to km Chart</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b-2 border-gray-200"><th className={th}>Meters</th><th className={th}>Kilometers</th><th className={th}>Miles</th><th className={th}>Feet</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {METERS.map((m) => (
                <tr key={m} className="hover:bg-gray-50">
                  <td className={td}>{fmt(m, 0)} m</td>
                  <td className={td}>{fmt(m / 1000, 3)} km</td>
                  <td className={td}>{fmt(m / 1609.344, 3)} mi</td>
                  <td className={td}>{fmt(m / 0.3048, 1)} ft</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Running and Race Distances</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b-2 border-gray-200"><th className={th}>Distance</th><th className={th}>Meters</th><th className={th}>Kilometers</th><th className={th}>Miles</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {RACES.map(([name, m]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 text-xs text-gray-900">{name}</td>
                  <td className={td}>{fmt(m, 3)}</td>
                  <td className={td}>{fmt(m / 1000, 4)}</td>
                  <td className={td}>{fmt(m / 1609.344, 3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">The marathon distance of 42.195 km dates from the 1908 London Olympics and became the official standard in 1921.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Convert Meters to Kilometers</h2>
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
