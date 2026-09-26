import { mortgageCalculatorConfig } from "./config";

export default function MortgageCalculatorSEO() {
  // Same questions and steps as the FAQPage / HowTo schema
  const faqItems = mortgageCalculatorConfig.seo.faq;
  const howToSteps = mortgageCalculatorConfig.seo.howToSteps;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>What This Mortgage Calculator Shows</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A lender quotes principal and interest, but the payment that leaves your account each month usually
            includes more. This <strong>mortgage calculator</strong> adds <strong>property tax, homeowners
            insurance, PMI and HOA fees</strong> to the loan payment, so you see the full monthly cost of owning the
            home, along with the total interest over the life of the loan.
          </p>
          <p>
            Compare 15, 20 and 30-year terms side by side, see how an extra monthly payment shortens the loan, and
            open the month-by-month amortization schedule. Taxes, insurance and fees differ by country, state and
            lender, so every one of them is your own input, in your own currency.
          </p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How a Mortgage Payment Is Calculated</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Principal &amp; interest</span> M = P × r(1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</p>
              <p className="text-xs text-gray-500">P = loan amount, r = annual rate ÷ 12, n = years × 12</p>
              <p><span className="font-semibold">Monthly payment</span> = M + property tax + insurance + PMI + HOA</p>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Worked example</h3>
          <ul className="space-y-2 ml-4 list-disc">
            <li>Home price $400,000 with 20% down ($80,000) leaves a <strong>$320,000</strong> loan.</li>
            <li>At 6.5% for 30 years, principal and interest are <strong>$2,022.62</strong> a month.</li>
            <li>Property tax at 1.1% a year adds $366.67 a month; insurance of $1,800 a year adds $150.</li>
            <li>The total monthly payment (PITI) is about <strong>$2,539</strong>; total interest over 30 years is $408,142.</li>
            <li>With only 10% down, the loan is $360,000, principal and interest rise to $2,275.44, and PMI at 0.5% adds $150 a month for the first 95 months.</li>
          </ul>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Mortgage Calculator</h2>
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
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>15-Year vs 30-Year Mortgage</h2>
        <p className="text-gray-600 leading-relaxed mb-4">The same $320,000 loan at 6.5%:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Term</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Monthly P&amp;I</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Total interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["15 years", "$2,787.54", "$181,758"],
                ["30 years", "$2,022.62", "$408,142"],
                ["30 years + $200/month extra", "$2,222.62", "$302,714 (paid off in 281 months)"],
              ].map(([term, pay, interest]) => (
                <tr key={term} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{term}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-700 text-xs">{pay}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-900 text-xs">{interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 leading-relaxed mt-4">
          The shorter term costs $764.92 more a month but saves $226,384 in interest. An extra payment on a 30-year
          loan sits in between and keeps the lower required payment as a safety net.
        </p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Taxes, Insurance, PMI and HOA Explained</h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-600 leading-relaxed">
          {[
            ["Property tax", "Charged by local government, usually as a percentage of the home's assessed value. U.S. effective rates range from well under 1% to over 2% a year; many other countries charge a fixed yearly amount."],
            ["Homeowners insurance", "Covers the building against fire, storms and other damage. Lenders require it, and it is often paid through an escrow account as part of the monthly payment."],
            ["PMI (private mortgage insurance)", "Protects the lender when the down payment is under 20%. It typically costs 0.3–1.5% of the loan a year and can be removed once the balance reaches 80% of the home's original value."],
            ["HOA or service charges", "Monthly fees for condos, townhouses and planned communities, or service charges and ground rent on apartments in the UK and Europe."],
          ].map(([title, text]) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Tips Before You Borrow</h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed">
          {[
            "Compare the full monthly payment, not just principal and interest: taxes and insurance can add 20–30% to it.",
            "Put 20% down if you can to avoid PMI; if not, check when your PMI can be removed.",
            "Get quotes from several lenders on the same day. A 0.5% lower rate on $320,000 over 30 years saves roughly $100 a month.",
            "Keep an emergency fund after the down payment and closing costs, which are commonly 2–5% of the price.",
            "Use the schedule to see how slowly the balance falls in the early years, and how much an extra payment speeds it up.",
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
