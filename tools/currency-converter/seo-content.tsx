import ToolFaq from "@/components/ToolFaq";
import { currencyConverterConfig } from "./config";

export default function CurrencyConverterSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = currencyConverterConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Converting with Reference Rates</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            This converter uses the European Central Bank&apos;s daily euro reference rates, a free and widely trusted
            source that businesses and accountants use for invoices and reports. Every result shows the date of the rate
            it used, and you can look up past dates for travel expenses, invoices or old receipts.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Converted amount</span> = Amount × Rate</p>
            <p><span className="font-semibold">Reverse rate</span> = 1 ÷ Rate</p>
            <p><span className="font-semibold">Cross rate USD→GBP</span> = (EUR→GBP) ÷ (EUR→USD)</p>
          </div>
          <p className="text-sm">
            Reference rates are mid-market figures. What you receive from a bank or card is typically lower by the
            provider&apos;s margin and fees.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Convert Currency</h2>
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
