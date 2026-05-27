import React from "react";

export default function LoanInterestCalculatorPropertySEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Property Loan Interest Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Property Loan Interest Calculator</strong> helps you estimate the total interest, periodic payment, and repayment schedule for a land or real estate loan. Unlike a simple mortgage calculator, this tool supports three calculation methods — EMI (standard amortization), simple interest, and compound interest — giving you flexibility for different loan structures.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The EMI method is the standard for most home and property loans: each payment covers both interest and principal, with the interest portion decreasing over time. Simple interest calculates a flat interest charge on the original principal. Compound interest calculates interest on the growing balance, commonly used for savings and some investment loans.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The rate comparison table lets you instantly see how different interest rates (4%–10%) affect your payment and total cost, helping you evaluate loan offers from different lenders side by side.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Property Loan Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the interest type: EMI, Simple, or Compound",
                "Choose payment frequency: Monthly, Quarterly, or Yearly",
                "Enter the loan amount and optional down payment",
                "Enter the annual interest rate",
                "Set the loan duration in years or months",
                "View the instant payment, total interest, and payoff date",
                "Click Show on Rate Comparison to compare 4%–10% rates",
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
                "3 interest methods: EMI, Simple, Compound",
                "Monthly, quarterly, and yearly payment frequency",
                "Down payment support to reduce principal",
                "Rate comparison table (4%–10%)",
                "Full repayment schedule (yearly and periodic views)",
                "CSV export of full amortization schedule",
                "Multi-currency: USD, EUR, GBP, INR, BDT",
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
          Interest Calculation Methods Compared
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["EMI / Mortgage",   "P × r(1+r)ⁿ / ((1+r)ⁿ−1)",  "Standard home & property loans"],
                ["Simple Interest",  "I = P × R × T",               "Short-term loans, land purchases"],
                ["Compound Interest","A = P(1 + r/n)^(nt)",         "Investment loans, savings analysis"],
              ].map(([method, formula, use]) => (
                <tr key={method} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{method}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{formula}</td>
                  <td className="py-3 px-4 text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Loan Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Loan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rate / Term</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Monthly EMI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$100,000", "7% / 10 yr",  "$1,161",  "$39,320"],
                ["$250,000", "5.5% / 20 yr","$1,718",  "$162,320"],
                ["$500,000", "6.5% / 30 yr","$3,160",  "$637,600"],
                ["$80,000",  "6% / 15 yr",  "$675",    "$41,500"],
                ["$150,000", "8% / 25 yr",  "$1,158",  "$197,400"],
              ].map(([loan, rateterm, emi, interest]) => (
                <tr key={loan + rateterm} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-medium">{loan}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{rateterm}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{emi}</td>
                  <td className="py-3 px-4 font-mono">{interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🌾", title: "Land Buyers",         desc: "Estimate total financing cost before purchasing agricultural or residential land." },
            { icon: "🏗️", title: "Property Developers", desc: "Calculate loan costs for development projects and assess project feasibility." },
            { icon: "🏠", title: "Home Builders",       desc: "Plan construction loan repayments and compare lender offers." },
            { icon: "💼", title: "Real Estate Investors",desc: "Analyze debt service costs and compare loan structures for investment properties." },
            { icon: "🏦", title: "Loan Applicants",     desc: "Understand total borrowing cost before applying for a property loan." },
            { icon: "📊", title: "Financial Planners",  desc: "Model loan scenarios for clients and demonstrate the impact of rate differences." },
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
              q: "What is the difference between EMI and simple interest?",
              a: "EMI (Equated Monthly Installment) uses amortization — each payment covers both principal and interest, with the interest portion decreasing over time as the balance reduces. Simple interest calculates a flat charge on the original principal for the entire loan period, resulting in equal interest payments throughout.",
            },
            {
              q: "When is compound interest used for property loans?",
              a: "Compound interest is less common for standard property loans but is used for some bridging loans, development finance, and investment structures where interest is rolled up rather than paid periodically. It results in higher total interest than simple or EMI methods for the same rate and term.",
            },
            {
              q: "How does payment frequency affect total interest?",
              a: "More frequent payments (monthly vs quarterly vs yearly) reduce the outstanding balance faster, which reduces the total interest paid over the loan term. Monthly payments typically result in slightly less total interest than quarterly or yearly payments at the same annual rate.",
            },
            {
              q: "What is the rate comparison feature?",
              a: "The rate comparison table shows how your loan would look at interest rates from 4% to 10%, with the current rate highlighted. This helps you quickly evaluate whether a lender's offer is competitive and understand the financial impact of a 1% rate difference.",
            },
            {
              q: "How do I use the down payment field?",
              a: "Enter the total property price as the loan amount and your planned down payment in the down payment field. The calculator subtracts the down payment from the loan amount to determine the actual financed principal. For example, a $100,000 property with a $20,000 down payment results in an $80,000 loan.",
            },
            {
              q: "Can I export the repayment schedule?",
              a: "Yes. Click Export CSV to download the full repayment schedule as a CSV file, which you can open in Excel or Google Sheets. The schedule includes period number, payment amount, principal portion, interest portion, and remaining balance for every payment.",
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
