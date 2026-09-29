import ToolFaq from "@/components/ToolFaq";
import { salesTaxCalculatorConfig } from "./config";
import { US_STATE_RATES, STATE_RATES_SOURCE } from "./logic";

export default function SalesTaxCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = salesTaxCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Sales Tax Formulas</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            US sales tax is added at the register as a percentage of the price. This calculator works it out in all three
            directions: the tax on a price, the price hidden inside a total, and the rate you were charged.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Tax</span> = Price × Rate ÷ 100</p>
            <p><span className="font-semibold">Total</span> = Price × (1 + Rate ÷ 100)</p>
            <p><span className="font-semibold">Price before tax</span> = Total ÷ (1 + Rate ÷ 100)</p>
            <p><span className="font-semibold">Rate</span> = (Total − Price) ÷ Price × 100</p>
          </div>
          <p className="text-sm">
            Example: a $250 item at a combined 7.5% rate has $18.75 of tax, for a total of $268.75.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>State Sales Tax Rates</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">State</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">State rate</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">State</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">State rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: Math.ceil(US_STATE_RATES.length / 2) }, (_, i) => {
                const a = US_STATE_RATES[i];
                const b = US_STATE_RATES[i + Math.ceil(US_STATE_RATES.length / 2)];
                return (
                  <tr key={a.code} className="hover:bg-gray-50">
                    <td className="py-1.5 px-3 text-xs text-gray-900">{a.state}</td>
                    <td className="py-1.5 px-3 text-right font-mono text-xs text-gray-700">{a.rate}%</td>
                    <td className="py-1.5 px-3 text-xs text-gray-900">{b?.state}</td>
                    <td className="py-1.5 px-3 text-right font-mono text-xs text-gray-700">{b ? `${b.rate}%` : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          {STATE_RATES_SOURCE}. Local rates are not included; many items such as groceries and prescription drugs are
          exempt or taxed at a lower rate.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Sales Tax Calculator</h2>
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
