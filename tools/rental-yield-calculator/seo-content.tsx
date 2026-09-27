import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { rentalYieldCalculatorConfig } from "./config";

export default function RentalYieldCalculatorSEO() {
  const { howToSteps, faq } = rentalYieldCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Rental Yield Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Rental Yield Calculator</strong> measures the annual return on a rental property as a percentage of its purchase price. It is one of the most important metrics for property investors, helping them compare investment opportunities and assess whether a property generates sufficient income relative to its cost.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator computes both <strong>gross rental yield</strong> (based on rent alone) and <strong>net rental yield</strong> (after deducting property tax, insurance, maintenance, management fees, and HOA costs). It also applies a vacancy rate adjustment to account for periods when the property is unoccupied.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Optional mortgage inputs enable monthly cash flow analysis — showing whether the property generates positive or negative cash flow after all expenses and debt service. The cash-on-cash return metric shows the annual return relative to your actual cash invested (down payment).
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Rental Yield Calculator
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
          Rental Yield Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Metric</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Gross Yield",        "(Annual Rent ÷ Price) × 100",                    "($21,600 ÷ $200,000) × 100 = 10.8%"],
                ["Net Yield",          "((Annual Rent − Expenses) ÷ Price) × 100",       "($21,600 − $6,000) ÷ $300,000 = 5.2%"],
                ["Vacancy-Adj. Rent",  "Annual Rent × (1 − Vacancy Rate)",               "$24,000 × 0.95 = $22,800"],
                ["Monthly Cash Flow",  "Monthly Rent − Monthly Expenses − Mortgage",     "$1,800 − $500 − $760 = +$540"],
                ["Cash-on-Cash ROI",   "(Annual Cash Flow ÷ Down Payment) × 100",        "($6,480 ÷ $50,000) × 100 = 13%"],
              ].map(([metric, formula, ex]) => (
                <tr key={metric} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{metric}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{formula}</td>
                  <td className="py-3 px-4 font-mono text-xs">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Rental Yield Benchmarks
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Net Yield</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["9%+",    "Excellent",     "Outstanding return — verify expenses and vacancy assumptions"],
                ["7–9%",   "Strong",        "Above-average return — good investment candidate"],
                ["5–7%",   "Average",       "Typical for most residential markets"],
                ["3–5%",   "Below Average", "Low return — consider appreciation potential"],
                ["< 3%",   "Poor",          "Negative or minimal cash flow — high risk"],
              ].map(([yield_, rating, interp]) => (
                <tr key={yield_} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{yield_}</td>
                  <td className="py-3 px-4 font-medium">{rating}</td>
                  <td className="py-3 px-4 text-gray-600">{interp}</td>
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
            { icon: "🏠", title: "Property Investors",  desc: "Compare rental yields across multiple properties to identify the best investment." },
            { icon: "🏘️", title: "Landlords",           desc: "Assess whether current rent covers expenses and generates positive cash flow." },
            { icon: "💼", title: "Real Estate Buyers",  desc: "Evaluate rental income potential before purchasing an investment property." },
            { icon: "📊", title: "Financial Planners",  desc: "Model rental property returns for clients building passive income portfolios." },
            { icon: "🏦", title: "Mortgage Researchers",desc: "Analyze whether rental income covers mortgage payments and operating costs." },
            { icon: "🎓", title: "First-Time Investors",desc: "Understand rental yield metrics before making a first investment property purchase." },
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
