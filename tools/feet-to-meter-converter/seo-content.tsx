import ToolFaq from "@/components/ToolFaq";
import { feetToMeterConverterConfig } from "./config";

export default function ToolSEOContent() {
  const { howToSteps, faq } = feetToMeterConverterConfig.seo;
  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Convert Feet to Meters
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>The United States measures height, rooms and distances in feet, while most of the world uses meters. This converter works both ways and also turns a height in feet and inches into meters and centimeters.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>m = ft × 0.3048</p>
              <p>ft = m ÷ 0.3048 ≈ m × 3.28084</p>
              <p>height: m = (ft × 12 + in) × 0.0254</p>
            </div>
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Conversions
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Feet</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Meters</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr key="1 ft" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1 ft</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">0.3048 m</td></tr>
                <tr key="3 ft (1 yard)" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">3 ft (1 yard)</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">0.9144 m</td></tr>
                <tr key="5 ft" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">5 ft</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">1.524 m</td></tr>
                <tr key="6 ft" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">6 ft</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">1.8288 m</td></tr>
                <tr key="10 ft" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">10 ft</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">3.048 m</td></tr>
                <tr key="100 ft" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">100 ft</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">30.48 m</td></tr>
                <tr key="1 mile (5,280 ft)" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1 mile (5,280 ft)</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">1,609.344 m</td></tr>
            </tbody>
          </table>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Height in feet and inches</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Height</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Meters</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Centimeters</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr key="5 ft 0 in" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">5 ft 0 in</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">1.524 m</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">152.4 cm</td></tr>
                <tr key="5 ft 4 in" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">5 ft 4 in</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">1.626 m</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">162.56 cm</td></tr>
                <tr key="5 ft 7 in" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">5 ft 7 in</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">1.702 m</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">170.18 cm</td></tr>
                <tr key="5 ft 10 in" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">5 ft 10 in</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">1.778 m</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">177.8 cm</td></tr>
                <tr key="6 ft 0 in" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">6 ft 0 in</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">1.829 m</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">182.88 cm</td></tr>
                <tr key="6 ft 2 in" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">6 ft 2 in</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">1.880 m</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">187.96 cm</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Converter
        </h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed">
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
