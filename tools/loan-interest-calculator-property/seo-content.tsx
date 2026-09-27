import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { loanInterestCalculatorPropertyConfig } from "./config";

export default function LoanInterestCalculatorPropertySEO() {
  const { howToSteps, faq } = loanInterestCalculatorPropertyConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Property Loan Interest Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Property Loan Interest Calculator</strong> helps you estimate the total interest, periodic payment, and repayment schedule for a land or real estate loan. Unlike a simple mortgage calculator, this tool supports three calculation methods — amortized (standard mortgage), simple interest, and compound interest — giving you flexibility for different loan structures.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The amortized method is the standard for most home and property loans: each payment covers both interest and principal, with the interest portion decreasing over time. Simple interest calculates a flat interest charge on the original principal. Compound interest calculates interest on the growing balance, commonly used for savings and some investment loans.
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
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
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
                ["Amortized / Mortgage","P × r(1+r)ⁿ / ((1+r)ⁿ−1)",  "Standard home & property loans"],
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Monthly Payment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$100,000", "7% / 10 yr",  "$1,161",  "$39,330"],
                ["$250,000", "5.5% / 20 yr","$1,720",  "$162,732"],
                ["$500,000", "6.5% / 30 yr","$3,160",  "$637,722"],
                ["$80,000",  "6% / 15 yr",  "$675",    "$41,515"],
                ["$150,000", "8% / 25 yr",  "$1,158",  "$197,317"],
              ].map(([loan, rateterm, payment, interest]) => (
                <tr key={loan + rateterm} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-medium">{loan}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{rateterm}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{payment}</td>
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

      <ToolFaq items={faq} />

    </div>
  );
}
