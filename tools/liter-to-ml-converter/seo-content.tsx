import ToolFaq from "@/components/ToolFaq";
import { literToMlConverterConfig } from "./config";

export default function ToolSEOContent() {
  const { howToSteps, faq } = literToMlConverterConfig.seo;
  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Convert Liters to Milliliters
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Liters and milliliters are the metric units for drinks, cooking, medicine and fuel. Convert between them instantly, and see the same volume in US cups and US or UK fluid ounces for American and British recipes.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>mL = L × 1,000</p>
              <p>L = mL ÷ 1,000</p>
              <p>1 mL = 1 cm³</p>
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
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Liters</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Milliliters</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr key="0.25 L" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">0.25 L</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">250 mL</td></tr>
                <tr key="0.33 L (can)" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">0.33 L (can)</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">330 mL</td></tr>
                <tr key="0.5 L" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">0.5 L</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">500 mL</td></tr>
                <tr key="1 L" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1 L</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">1,000 mL</td></tr>
                <tr key="1.5 L" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1.5 L</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">1,500 mL</td></tr>
                <tr key="2 L" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">2 L</td><td className="py-2 px-3 text-right font-mono text-xs font-semibold text-gray-900">2,000 mL</td></tr>
            </tbody>
          </table>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Liters in cups and fluid ounces</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Volume</th><th className="text-right py-2 px-3 font-semibold text-gray-700">US cups</th><th className="text-right py-2 px-3 font-semibold text-gray-700">US fl oz</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr key="1 L" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">1 L</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">4.23 US cups</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">33.81 US fl oz</td></tr>
                <tr key="500 mL" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">500 mL</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">2.11 US cups</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">16.91 US fl oz</td></tr>
                <tr key="250 mL" className="hover:bg-gray-50"><td className="py-2 px-3 text-xs text-gray-700">250 mL</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">1.06 US cups</td><td className="py-2 px-3 text-right font-mono text-xs text-gray-900">8.45 US fl oz</td></tr>
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
