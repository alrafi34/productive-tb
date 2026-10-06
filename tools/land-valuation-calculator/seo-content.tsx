import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { landValuationCalculatorConfig } from "./config";

export default function LandValuationCalculatorSEO() {
  const { howToSteps, faq } = landValuationCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Land Valuation Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Land Valuation Calculator</strong> is a practical tool that estimates the total market
            value of a land or property based on its area, the price per unit, and any additional costs such
            as registration fees, legal charges, or taxes. It eliminates manual calculation errors and
            delivers an accurate property valuation in seconds.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator supports all major land measurement units used globally — Square Feet, Square
            Meter, Acre, Hectare, Decimal, Katha, Bigha, Marla, and Kanal — making it useful for users
            across South Asia, the Middle East, and international markets.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We do not collect or store what you enter.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Land Valuation Calculator
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
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Land Area</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Price Per Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Extra Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5 Katha",      "$5,000 / Katha",   "—",        "$25,000"],
                ["10 Decimal",   "$2,000 / Decimal",  "—",        "$20,000"],
                ["1 Acre",       "$50,000 / Acre",    "$5,000",   "$55,000"],
                ["2,500 Sq Ft",  "$200 / Sq Ft",      "$100,000", "$600,000"],
                ["0.5 Hectare",  "$80,000 / Hectare", "—",        "$40,000"],
                ["4 Marla",      "$10,000 / Marla",   "$2,000",   "$42,000"],
              ].map(([area, rate, extra, total]) => (
                <tr key={area} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{area}</td>
                  <td className="py-3 px-4 font-mono">{rate}</td>
                  <td className="py-3 px-4 font-mono text-gray-500">{extra}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Supported Land Units
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Square Feet</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Region / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Square Feet",  "1",           "Universal"],
                ["Square Meter", "10.7639",     "International standard"],
                ["Decimal",      "435.6",       "Bangladesh, India"],
                ["Katha",        "720",         "Bangladesh, West Bengal"],
                ["Bigha",        "14,400",      "Bangladesh, West Bengal"],
                ["Acre",         "43,560",      "Universal"],
                ["Hectare",      "107,639",     "International standard"],
                ["Marla",        "272.25",      "Pakistan, India"],
                ["Kanal",        "5,445",       "Pakistan, India"],
              ].map(([unit, sqft, region]) => (
                <tr key={unit} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{unit}</td>
                  <td className="py-3 px-4 font-mono">{sqft}</td>
                  <td className="py-3 px-4 text-gray-500">{region}</td>
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
            { icon: "🏠", title: "Property Buyers",    color: "blue",   desc: "Quickly estimate total land cost before making a purchase decision." },
            { icon: "💼", title: "Real Estate Agents", color: "green",  desc: "Calculate and present accurate property valuations to clients." },
            { icon: "📐", title: "Surveyors",          color: "purple", desc: "Compute land values accurately across different measurement systems." },
            { icon: "🌾", title: "Farmers",            color: "orange", desc: "Estimate agricultural land value for buying, selling, or leasing." },
            { icon: "🏗️", title: "Developers",         color: "red",    desc: "Plan construction budgets with accurate land cost estimates." },
            { icon: "⚖️", title: "Legal & Tax",        color: "gray",   desc: "Prepare property valuations for legal documentation and tax purposes." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${color}-800`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <ToolFaq items={faq} />

    </div>
  );
}
