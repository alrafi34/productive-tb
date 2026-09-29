import ToolFaq from "@/components/ToolFaq";
import { carLoanCalculatorConfig } from "./config";

export default function CarLoanCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = carLoanCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What Goes into a Car Payment</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The amount you borrow is the car&apos;s price minus your down payment and the equity in your trade-in, plus
            sales tax and fees if you roll them into the loan. The monthly payment then depends on only two things: the
            interest rate (APR) and the number of months.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Amount financed</span> = Price − Down payment − (Trade-in value − Amount owed) + Tax + Fees</p>
            <p><span className="font-semibold">Monthly payment</span> = L × r ÷ (1 − (1 + r)<sup>−n</sup>)</p>
            <p><span className="font-semibold">Total interest</span> = Monthly payment × n − L</p>
          </div>
          <p className="text-sm">
            L is the amount financed, r the APR ÷ 12 as a decimal and n the number of monthly payments. Example: a $35,000
            car with $5,000 down, 7% sales tax and $500 of fees financed at 6.5% for 60 months comes to $32,950 financed and
            about $644.70 a month.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Car Loan Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Ways to Pay Less</h2>
        <ul className="space-y-2 text-gray-600 leading-relaxed list-disc pl-5">
          <li>Put more down: every extra dollar is a dollar you do not pay interest on.</li>
          <li>Choose the shortest term whose payment you can afford comfortably.</li>
          <li>Get preapproved by a bank or credit union so you can compare the dealer&apos;s financing offer.</li>
          <li>Negotiate the price of the car first, separately from the trade-in and the monthly payment.</li>
          <li>Pay taxes and fees upfront if you can, rather than financing them.</li>
        </ul>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
