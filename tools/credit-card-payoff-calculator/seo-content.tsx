import ToolFaq from "@/components/ToolFaq";
import { creditCardPayoffCalculatorConfig } from "./config";

export default function CreditCardPayoffSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = creditCardPayoffCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Credit Card Interest Adds Up</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Credit cards charge interest on the balance you carry from month to month. The higher the APR and the smaller
            your payment, the more of each payment goes to interest instead of the balance, which is why the same debt can
            take three years or twenty years to clear.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Monthly interest</span> = Balance × APR ÷ 12</p>
            <p><span className="font-semibold">Months to pay off</span> = −ln(1 − r × B ÷ P) ÷ ln(1 + r)</p>
            <p><span className="font-semibold">Payment for n months</span> = B × r ÷ (1 − (1 + r)<sup>−n</sup>)</p>
          </div>
          <p className="text-sm">B is the balance, P the monthly payment and r the APR ÷ 12 as a decimal.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Credit Card Payoff Calculator</h2>
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
