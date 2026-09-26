import ToolFaq from "@/components/ToolFaq";
import { gramToOunceConverterConfig } from "./config";

export default function ToolSEOContent() {
  const { howToSteps, faq } = gramToOunceConverterConfig.seo;
  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Convert Grams to Ounces
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>American recipes and postage use ounces, while European recipes and kitchen scales use grams. Convert either way with the exact factor, so baking quantities stay accurate.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>oz = g ÷ 28.349523125</p>
              <p>g = oz × 28.349523125</p>
              <p>16 oz = 1 lb = 453.59 g</p>
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
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Grams</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Ounces</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr key="1 g" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1 g</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">0.035 oz</td></tr>
                <tr key="28 g" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">28 g</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">0.988 oz</td></tr>
                <tr key="100 g" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">100 g</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">3.527 oz</td></tr>
                <tr key="250 g" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">250 g</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">8.818 oz</td></tr>
                <tr key="454 g" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">454 g</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">16.014 oz</td></tr>
                <tr key="500 g" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">500 g</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">17.637 oz</td></tr>
                <tr key="1 kg" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1 kg</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">35.274 oz</td></tr>
            </tbody>
          </table>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Ounces to grams</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Ounces</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Grams</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr key="1 oz" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1 oz</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">28.35 g</td></tr>
                <tr key="4 oz" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">4 oz</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">113.4 g</td></tr>
                <tr key="8 oz" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">8 oz</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">226.8 g</td></tr>
                <tr key="16 oz (1 lb)" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">16 oz (1 lb)</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">453.59 g</td></tr>
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
