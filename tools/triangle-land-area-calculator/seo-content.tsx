import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { triangleLandAreaCalculatorConfig } from "./config";

export default function TriangleLandAreaCalculatorSEO() {
  const { howToSteps, faq } = triangleLandAreaCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Triangle Land Area Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Triangle Land Area Calculator</strong> is a specialized land measurement tool that calculates the area of triangular plots of land. Many real-world land parcels are triangular or contain triangular sections — corner lots, wedge-shaped fields, and irregular plots often require triangle area calculations for accurate land measurement, pricing, and planning.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports three methods: the simple <strong>Base × Height</strong> formula when you know the base and perpendicular height, <strong>Heron&apos;s Formula</strong> when you know all three side lengths, and the <strong>Coordinate Method</strong> when you have GPS or survey coordinates for the three vertices.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Results are instantly converted to square feet, square meters, acres, hectares, square yards, and more. A step-by-step breakdown shows exactly how the area was calculated, making it useful for both professionals and students.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Triangle Land Area Calculator
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
          Triangle Area Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Base × Height", "Area = (Base × Height) ÷ 2", "Base=50ft, H=30ft → 750 ft²"],
                ["Heron's Formula", "s=(a+b+c)/2, Area=√(s(s-a)(s-b)(s-c))", "10-12-14 ft → 58.79 ft²"],
                ["Coordinates", "Area = ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|", "(0,0)(10,0)(5,8) → 40 ft²"],
              ].map(([method, formula, example]) => (
                <tr key={method} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{method}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{formula}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold text-xs">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Plot</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Inputs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Area (ft²)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Small Corner Lot",   "Base=50ft, H=30ft",       "750",      "0.0172"],
                ["Medium Plot",        "Base=120ft, H=85ft",      "5,100",    "0.117"],
                ["Large Field",        "Base=300ft, H=200ft",     "30,000",   "0.689"],
                ["Heron 10-12-14 ft",  "a=10, b=12, c=14 ft",    "58.79",    "0.00135"],
                ["Heron 30-40-50 ft",  "a=30, b=40, c=50 ft",    "600",      "0.0138"],
              ].map(([plot, inputs, sqft, acres]) => (
                <tr key={plot} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{plot}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{inputs}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{sqft}</td>
                  <td className="py-3 px-4 font-mono">{acres}</td>
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
            { icon: "🏠", title: "Land Owners",      desc: "Calculate the area of corner lots, wedge-shaped plots, and irregular triangular parcels." },
            { icon: "📐", title: "Surveyors",         desc: "Quickly compute triangular section areas from field measurements or GPS coordinates." },
            { icon: "🌾", title: "Farmers",           desc: "Measure triangular field sections for crop planning, irrigation, and yield estimation." },
            { icon: "👷", title: "Engineers",         desc: "Calculate triangular land areas for site planning, grading, and construction layouts." },
            { icon: "💼", title: "Real Estate",       desc: "Verify triangular plot sizes for accurate property valuation and listing." },
            { icon: "🎓", title: "Students",          desc: "Learn and verify triangle area formulas with step-by-step calculation breakdowns." },
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
