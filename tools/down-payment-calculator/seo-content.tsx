import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { downPaymentCalculatorConfig } from "./config";

export default function DownPaymentCalculatorSEO() {
  const { howToSteps, faq } = downPaymentCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Down Payment Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Down Payment Calculator</strong> helps you determine how much money you need upfront when purchasing a property, land, vehicle, or any high-value asset. The down payment is the portion of the purchase price you pay out of pocket — the remainder is financed through a loan or mortgage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports two modes: percentage-based (e.g., 20% of the purchase price) and fixed amount (e.g., $60,000 flat). It instantly shows the down payment amount, remaining loan amount, and — when you enter an interest rate — an estimated monthly payment for the financed portion.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The scenario comparison table lets you see how different down payment percentages (5%, 10%, 15%, 20%, 25%, 30%) affect your loan amount and monthly payment side by side, helping you choose the right balance between upfront cost and ongoing payments.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Down Payment Calculator
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
          Down Payment Examples
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Purchase Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Down %</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Down Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Remaining Loan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$300,000", "20%", "$60,000",  "$240,000"],
                ["$300,000", "10%", "$30,000",  "$270,000"],
                ["$500,000", "20%", "$100,000", "$400,000"],
                ["$80,000",  "15%", "$12,000",  "$68,000"],
                ["$1,000,000","25%","$250,000", "$750,000"],
              ].map(([price, pct, down, loan]) => (
                <tr key={price + pct} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-medium">{price}</td>
                  <td className="py-3 px-4 font-mono">{pct}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{down}</td>
                  <td className="py-3 px-4 font-mono">{loan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How Down Payment Affects Monthly Payments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Down Payment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Loan Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Monthly EMI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5%  ($15,000)",  "$285,000", "$1,805", "$364,800"],
                ["10% ($30,000)",  "$270,000", "$1,709", "$345,240"],
                ["20% ($60,000)",  "$240,000", "$1,519", "$306,840"],
                ["30% ($90,000)",  "$210,000", "$1,329", "$268,440"],
              ].map(([down, loan, emi, interest]) => (
                <tr key={down} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{down}</td>
                  <td className="py-3 px-4 font-mono">{loan}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{emi}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Based on $300,000 purchase price, 6.5% interest rate, 30-year term.</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Home Buyers",        desc: "Calculate how much cash you need upfront before applying for a mortgage." },
            { icon: "🌾", title: "Land Investors",     desc: "Determine the upfront payment needed to secure a land purchase with financing." },
            { icon: "🚗", title: "Vehicle Buyers",     desc: "Calculate down payment for car loans and see how it affects monthly payments." },
            { icon: "💼", title: "Real Estate Agents", desc: "Show clients how different down payment amounts affect their loan and monthly cost." },
            { icon: "📊", title: "Financial Planners", desc: "Model down payment scenarios to help clients plan their savings goals." },
            { icon: "🏦", title: "Mortgage Applicants",desc: "Understand minimum down payment requirements and their impact on loan terms." },
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
