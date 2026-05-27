import React from "react";

export default function MortgageLoanCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Mortgage Loan Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Mortgage Loan Calculator</strong> estimates your monthly mortgage payment based on the loan amount, interest rate, and loan term. It uses the standard amortization formula to show exactly how much of each payment goes toward principal and how much goes toward interest — and how that ratio shifts over the life of the loan.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator goes beyond the basic monthly payment. It generates a full amortization schedule (monthly and yearly views), compares all common loan terms side by side, simulates the impact of extra monthly payments, and includes optional property tax and insurance for a complete PITI estimate.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All calculations run entirely in your browser. No data is sent to any server. Results can be exported as a TXT summary or a full CSV amortization schedule for use in spreadsheets.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Mortgage Loan Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the total loan amount (home price minus down payment)",
                "Enter your annual interest rate (e.g. 6.5)",
                "Select the loan term (10, 15, 20, 25, or 30 years)",
                "Optionally enter a down payment to calculate the principal",
                "Add annual property tax and insurance for a full PITI estimate",
                "Enter an extra monthly payment to simulate early payoff",
                "View the amortization schedule and term comparison table",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Real-time calculation as you type",
                "Full amortization schedule (monthly and yearly)",
                "Loan balance chart over time",
                "Term comparison table (10–30 years)",
                "Extra payment simulation with interest saved",
                "Property tax and insurance (PITI) support",
                "CSV export for full amortization schedule",
              ].map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Mortgage Formula Explained
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Variable</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Meaning</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["M", "Monthly payment",                    "$1,896"],
                ["P", "Principal (loan amount)",            "$300,000"],
                ["r", "Monthly interest rate (annual ÷ 12)", "6.5% ÷ 12 = 0.5417%"],
                ["n", "Total number of payments",           "30 × 12 = 360"],
                ["Formula", "M = P × r(1+r)ⁿ / ((1+r)ⁿ−1)", "Standard amortization"],
              ].map(([v, meaning, ex]) => (
                <tr key={v} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{v}</td>
                  <td className="py-3 px-4">{meaning}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Monthly Payments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Loan Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Term</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Monthly Payment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$200,000", "6.0%", "30 yr", "$1,199",  "$231,676"],
                ["$300,000", "6.5%", "30 yr", "$1,896",  "$382,633"],
                ["$150,000", "5.0%", "15 yr", "$1,186",  "$63,480"],
                ["$400,000", "7.0%", "30 yr", "$2,661",  "$558,036"],
                ["$500,000", "7.2%", "20 yr", "$3,893",  "$434,320"],
              ].map(([loan, rate, term, monthly, interest]) => (
                <tr key={loan + rate} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-medium">{loan}</td>
                  <td className="py-3 px-4 font-mono">{rate}</td>
                  <td className="py-3 px-4 font-mono">{term}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{monthly}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Impact of Extra Monthly Payments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Extra/Month</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Months Saved</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Interest Saved</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">New Payoff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$100",   "28 months",  "$28,400",  "27.7 years"],
                ["$200",   "52 months",  "$51,200",  "25.7 years"],
                ["$500",   "96 months",  "$89,600",  "22 years"],
                ["$1,000", "144 months", "$124,000", "18 years"],
              ].map(([extra, months, saved, payoff]) => (
                <tr key={extra} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{extra}</td>
                  <td className="py-3 px-4 font-mono">{months}</td>
                  <td className="py-3 px-4 font-mono text-green-700 font-semibold">{saved}</td>
                  <td className="py-3 px-4 font-mono">{payoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Based on $300,000 loan at 6.5% for 30 years. Approximate values.</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Home Buyers",         desc: "Estimate monthly payments before making an offer and understand total loan cost." },
            { icon: "💼", title: "Real Estate Agents",  desc: "Show clients accurate payment estimates for properties at different price points." },
            { icon: "🏦", title: "Mortgage Applicants", desc: "Compare loan terms and rates to find the most affordable financing option." },
            { icon: "📊", title: "Financial Planners",  desc: "Model mortgage scenarios for clients and demonstrate the value of extra payments." },
            { icon: "🏗️", title: "Property Investors",  desc: "Calculate debt service coverage and cash flow for investment property analysis." },
            { icon: "🎓", title: "First-Time Buyers",   desc: "Understand how interest rates and loan terms affect long-term housing costs." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-blue-900 mb-2">{title}</h3>
              <p className="text-sm text-blue-800">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is included in a monthly mortgage payment?",
              a: "A standard mortgage payment covers principal (reducing your loan balance) and interest (the cost of borrowing). This is called P&I. Your total monthly housing cost (PITI) also includes property taxes and homeowner's insurance, which this calculator supports as optional inputs.",
            },
            {
              q: "How does a 15-year vs 30-year mortgage compare?",
              a: "A 15-year mortgage has higher monthly payments but significantly lower total interest — often 50–60% less than a 30-year loan. A 30-year mortgage has lower monthly payments, making it more affordable month-to-month, but you pay much more interest over the life of the loan. Use the Term Comparison table to see the exact difference for your loan.",
            },
            {
              q: "How much do extra payments save?",
              a: "Extra payments reduce your principal faster, which reduces the interest charged each month. On a $300,000 loan at 6.5%, an extra $200/month saves approximately $51,000 in interest and pays off the loan about 4 years early. Enter your extra payment amount to see the exact savings for your loan.",
            },
            {
              q: "What is an amortization schedule?",
              a: "An amortization schedule shows every payment over the life of the loan, broken down into principal and interest portions. Early payments are mostly interest; later payments are mostly principal. This calculator shows both monthly and yearly views, and you can export the full schedule as a CSV file.",
            },
            {
              q: "What is a good interest rate for a mortgage?",
              a: "Mortgage rates vary by market conditions, credit score, loan type, and lender. As of recent years, rates have ranged from 3% to 8%+ for 30-year fixed mortgages. A higher credit score (740+) typically qualifies for lower rates. Always compare offers from multiple lenders.",
            },
            {
              q: "Does this calculator include PMI?",
              a: "Private Mortgage Insurance (PMI) is not included in this calculator. PMI is typically required when your down payment is less than 20% of the home price. PMI costs roughly 0.5–1.5% of the loan amount per year. You can add it manually to the insurance field as an approximation.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
