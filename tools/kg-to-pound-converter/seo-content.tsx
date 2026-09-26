import ToolFaq from "@/components/ToolFaq";
import { kgToPoundConverterConfig } from "./config";

export default function ToolSEOContent() {
  const { howToSteps, faq } = kgToPoundConverterConfig.seo;
  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Convert Kilograms to Pounds
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Kilograms are the world's standard unit of mass; pounds are used for body weight, groceries and luggage in the United States and alongside kilograms in the UK. Convert either way, and see UK stones and pounds for body weight.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>lb = kg × 2.20462</p>
              <p>kg = lb × 0.45359237</p>
              <p>stone = lb ÷ 14</p>
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
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Kilograms</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Pounds</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr key="1 kg" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1 kg</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">2.2 lb</td></tr>
                <tr key="5 kg" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">5 kg</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">11.02 lb</td></tr>
                <tr key="10 kg" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">10 kg</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">22.05 lb</td></tr>
                <tr key="23 kg" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">23 kg</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">50.71 lb</td></tr>
                <tr key="50 kg" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">50 kg</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">110.23 lb</td></tr>
                <tr key="70 kg" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">70 kg</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">154.32 lb</td></tr>
                <tr key="100 kg" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">100 kg</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">220.46 lb</td></tr>
            </tbody>
          </table>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Pounds to kilograms</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Pounds</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Kilograms</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr key="1 lb" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1 lb</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">0.45 kg</td></tr>
                <tr key="10 lb" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">10 lb</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">4.54 kg</td></tr>
                <tr key="100 lb" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">100 lb</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">45.36 kg</td></tr>
                <tr key="150 lb" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">150 lb</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">68.04 kg</td></tr>
                <tr key="200 lb" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">200 lb</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">90.72 kg</td></tr>
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
