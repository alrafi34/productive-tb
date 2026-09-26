import Link from "next/link";
import { toolConfig } from "./config";

export default function LoanEmiCalculatorSEO() {
  // Same questions and steps as the FAQPage / HowTo schema
  const faqItems = toolConfig.seo.faq;
  const howToSteps = toolConfig.seo.howToSteps;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  const examples: [string, string, string, string, string][] = [
    ["Car loan", "$35,000", "6.5%", "5 years", "$684.82 / $6,088.91"],
    ["Car loan, longer term", "$35,000", "6.5%", "6 years", "$588.35 / $7,361.02"],
    ["Personal loan", "$10,000", "12%", "3 years", "$332.14 / $1,957.15"],
    ["Student loan", "$30,000", "5.5%", "10 years", "$325.58 / $9,069.46"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What This Loan Calculator Does</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            This <strong>loan calculator</strong> works out the monthly payment on any fixed-rate loan with equal
            payments (a car loan, personal loan, student loan or small business loan) and shows what the loan costs
            you in interest from the first payment to the last.
          </p>
          <p>
            Put two offers side by side to see which is cheaper, open the month-by-month amortization schedule, or
            add an extra payment to see how much sooner you would be debt-free. Choose your own currency; the math is
            the same everywhere. For a home loan with property tax, insurance and PMI, use the{" "}
            <Link href="/tools/calculator/mortgage-calculator" className="text-primary font-semibold hover:underline">mortgage calculator</Link>.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How a Loan Payment Is Calculated</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Monthly payment</span> M = P × r(1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</p>
              <p className="text-xs text-gray-500">P = amount borrowed, r = annual rate ÷ 12, n = number of monthly payments</p>
              <p><span className="font-semibold">Total interest</span> = M × n − P</p>
            </div>
          </div>
          <p>
            Example: <strong>$25,000 at 7% for 5 years</strong>. r = 0.07 ÷ 12 = 0.005833 and n = 60, so the payment
            is <strong>$495.03</strong> a month. Over 60 payments you repay $29,701.80, of which $4,701.80 is interest.
          </p>
          <p>
            Early payments are mostly interest, because interest is charged on a larger balance. As the balance falls,
            more of each payment goes to principal; the schedule tab shows this month by month.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Loan Calculator</h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Typical Loan Payments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Loan</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Amount</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">APR</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Term</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Monthly / total interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {examples.map(([loan, amount, apr, term, result]) => (
                <tr key={loan} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{loan}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-600 text-xs">{amount}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-600 text-xs">{apr}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-600 text-xs">{term}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-900 text-xs font-semibold">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 leading-relaxed mt-4">
          Stretching the same car loan from 5 to 6 years lowers the payment by $96.47 a month but adds $1,272.11 of
          interest. Rates are examples only; use the APR from your own offer.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Tips to Pay Less Interest</h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed">
          {[
            "Compare offers by APR, not the headline rate: APR includes most fees.",
            "Choose the shortest term whose payment you can comfortably afford.",
            "Make extra payments toward principal when you can, after checking there is no prepayment penalty.",
            "A larger down payment or trade-in reduces the amount borrowed and every payment after it.",
            "Improving your credit score before you apply can lower the rate you are offered.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={card}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={q} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
