import React from "react";

export default function HomeLoanEmiCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Home Loan EMI Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Home Loan EMI Calculator</strong> computes your Equated Monthly Installment — the fixed amount you pay every month to repay a property loan. Each EMI covers both a principal portion (reducing your outstanding balance) and an interest portion (the cost of borrowing). Early in the loan, most of the EMI goes toward interest; later, more goes toward principal.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator uses the standard amortization formula to give you an instant, accurate EMI figure along with the total interest payable and total repayment amount. Interactive sliders let you quickly explore how changing the loan amount, interest rate, or tenure affects your monthly obligation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The scenario comparison feature lets you place two loan options side by side — for example, comparing a 20-year loan at 7.5% against a 15-year loan at 6.8% — so you can make an informed decision before committing to a mortgage.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Home Loan EMI Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the loan amount (or use the slider)",
                "Enter the annual interest rate offered by your lender",
                "Set the loan tenure in years or months",
                "Optionally enter a down payment to reduce the principal",
                "View the instant EMI, total interest, and payoff date",
                "Check the pie chart and balance chart for visual insight",
                "Use Scenario Comparison to compare two loan options",
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
                "Real-time EMI calculation with interactive sliders",
                "Pie chart: principal vs interest breakdown",
                "Loan balance chart over time",
                "Full amortization schedule (monthly and yearly)",
                "Scenario comparison: two loans side by side",
                "Down payment support to reduce principal",
                "CSV export of full repayment schedule",
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
          EMI Formula Explained
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
                ["EMI", "Equated Monthly Installment",       "$4,028"],
                ["P",   "Principal loan amount",             "$500,000"],
                ["r",   "Monthly rate = annual rate ÷ 12 ÷ 100", "7.5% ÷ 12 ÷ 100 = 0.00625"],
                ["n",   "Total months = years × 12",         "20 × 12 = 240"],
                ["Formula", "EMI = P × r(1+r)ⁿ / ((1+r)ⁿ−1)", "Standard amortization"],
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
          Example EMI Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Loan Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Tenure</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Monthly EMI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$500,000",   "7.5%", "20 yr", "$4,028",  "$466,720"],
                ["$300,000",   "6.5%", "30 yr", "$1,896",  "$382,633"],
                ["$250,000",   "5.5%", "10 yr", "$2,714",  "$75,680"],
                ["$1,200,000", "8.0%", "30 yr", "$8,806",  "$1,970,160"],
                ["$150,000",   "6.0%", "15 yr", "$1,266",  "$77,880"],
              ].map(([loan, rate, term, emi, interest]) => (
                <tr key={loan + rate} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-medium">{loan}</td>
                  <td className="py-3 px-4 font-mono">{rate}</td>
                  <td className="py-3 px-4 font-mono">{term}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{emi}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How Tenure Affects EMI and Total Interest
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Tenure</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Monthly EMI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Interest</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10 years", "$5,818",  "$198,160",  "$698,160"],
                ["15 years", "$4,644",  "$335,920",  "$835,920"],
                ["20 years", "$4,028",  "$466,720",  "$966,720"],
                ["25 years", "$3,680",  "$604,000",  "$1,104,000"],
                ["30 years", "$3,497",  "$758,920",  "$1,258,920"],
              ].map(([tenure, emi, interest, total]) => (
                <tr key={tenure} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{tenure}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{emi}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{interest}</td>
                  <td className="py-3 px-4 font-mono">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Based on $500,000 loan at 7.5% interest rate.</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Home Buyers",        desc: "Estimate monthly EMI before applying for a home loan and plan your budget." },
            { icon: "🏗️", title: "Property Investors", desc: "Calculate debt service for investment properties and assess cash flow viability." },
            { icon: "🏦", title: "Mortgage Seekers",   desc: "Compare loan offers from different lenders using the scenario comparison feature." },
            { icon: "📊", title: "Financial Planners", desc: "Model home loan scenarios for clients and demonstrate the impact of tenure choices." },
            { icon: "💼", title: "Real Estate Agents", desc: "Show buyers accurate EMI estimates for properties at different price points." },
            { icon: "🎓", title: "First-Time Buyers",  desc: "Understand how interest rates and loan tenure affect long-term housing costs." },
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
              q: "What is EMI and how is it different from a mortgage payment?",
              a: "EMI (Equated Monthly Installment) is the term commonly used in South Asia for a fixed monthly loan payment. In the US and UK, the same concept is called a mortgage payment or monthly installment. Both use the same amortization formula and cover principal plus interest each month.",
            },
            {
              q: "Does a longer tenure always mean lower EMI?",
              a: "Yes — a longer tenure reduces the monthly EMI because the principal is spread over more payments. However, you pay significantly more total interest over the life of the loan. The tenure comparison table above shows this trade-off clearly for a $500,000 loan at 7.5%.",
            },
            {
              q: "How does a down payment affect my EMI?",
              a: "A larger down payment reduces the loan principal, which directly reduces your EMI and total interest paid. For example, a $100,000 down payment on a $600,000 home reduces the principal to $500,000, lowering both the monthly EMI and the total interest over the loan term.",
            },
            {
              q: "What is an amortization schedule?",
              a: "An amortization schedule shows every payment over the life of the loan, broken down into principal and interest. Early payments are mostly interest; later payments are mostly principal. This calculator shows both monthly and yearly views, and you can export the full schedule as a CSV file.",
            },
            {
              q: "How do I use the scenario comparison feature?",
              a: "Click Show on the Scenario Comparison panel, then enter a different interest rate and tenure for Scenario B. The table will show your current loan vs the alternative side by side, including the difference in monthly EMI, total interest, and total payment.",
            },
            {
              q: "Is this calculator accurate for all countries?",
              a: "The EMI formula is the same worldwide. The calculator supports USD, EUR, GBP, INR, and BDT currencies. For country-specific calculations involving government subsidies, tax deductions, or variable rate loans, consult a local financial advisor.",
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
