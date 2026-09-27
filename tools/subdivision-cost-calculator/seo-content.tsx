import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { subdivisionCostCalculatorConfig } from "./config";

export default function SubdivisionCostCalculatorSEO() {
  const { howToSteps, faq } = subdivisionCostCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Subdivision Cost Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Subdivision Cost Calculator</strong> estimates the total cost of dividing a parcel of land into multiple smaller plots. It aggregates all major expense categories — surveying, legal fees, permits, utility installation, road development, drainage, and miscellaneous costs — into a single project budget estimate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Land subdivision is a complex process that involves government approvals, professional services, and significant infrastructure investment. Without a clear cost estimate, developers and property owners often underestimate the true cost of a subdivision project, leading to budget overruns and project delays.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator provides an instant, real-time estimate as you enter costs. It also calculates the cost per plot and land area per plot, giving you the key metrics needed to assess project feasibility before committing to a subdivision.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Subdivision Cost Calculator
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
          Typical Subdivision Cost Ranges (US)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Cost Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Surveying",           "$500 – $5,000",    "Boundary survey, topographic mapping, plat preparation"],
                ["Legal Fees",          "$1,000 – $5,000",  "Title search, deed preparation, attorney review"],
                ["Permits & Approvals", "$500 – $10,000+",  "Varies widely by municipality and project size"],
                ["Utility Installation","$5,000 – $50,000+","Water, sewer, electricity, and internet connections"],
                ["Road Development",    "$5,000 – $100,000+","Grading, paving, curbs, and signage"],
                ["Drainage",            "$2,000 – $30,000+","Stormwater management, culverts, retention ponds"],
                ["Miscellaneous",       "$1,000 – $10,000+","Contingency, environmental studies, admin costs"],
              ].map(([cat, range, notes]) => (
                <tr key={cat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{cat}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{range}</td>
                  <td className="py-3 px-4 text-gray-600">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Ranges are approximate US averages. Actual costs vary significantly by location, project size, and local regulations.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Subdivision Cost Estimates
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Scenario</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Land / Plots</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Cost/Plot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Small residential",  "10 acres / 20 plots",  "$25,500",  "$1,275"],
                ["Medium development", "5 acres / 8 plots",    "$12,500",  "$1,563"],
                ["Large subdivision",  "50,000 sq ft / 12 plots","$21,500","$1,792"],
                ["Rural subdivision",  "50 acres / 5 plots",   "$18,000",  "$3,600"],
              ].map(([scenario, land, total, perPlot]) => (
                <tr key={scenario} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{scenario}</td>
                  <td className="py-3 px-4 text-gray-600">{land}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{total}</td>
                  <td className="py-3 px-4 font-mono text-gray-700">{perPlot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Example estimates based on typical US costs. Use the calculator above for your specific project inputs.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Property Owners",     desc: "Estimate subdivision feasibility before engaging professionals or applying for permits." },
            { icon: "💼", title: "Land Investors",      desc: "Quickly assess whether a subdivision project will be profitable before purchasing land." },
            { icon: "🏗️", title: "Land Developers",    desc: "Build detailed project budgets and track costs across all subdivision expense categories." },
            { icon: "📐", title: "Surveyors",           desc: "Provide clients with preliminary cost estimates during initial project consultations." },
            { icon: "⚙️", title: "Civil Engineers",     desc: "Estimate infrastructure costs for road, drainage, and utility installation planning." },
            { icon: "🏦", title: "Real Estate Consultants", desc: "Advise clients on subdivision costs and help structure development financing." },
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
