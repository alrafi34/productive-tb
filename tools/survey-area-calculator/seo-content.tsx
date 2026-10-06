import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { surveyAreaCalculatorConfig } from "./config";

export default function SurveyAreaCalculatorSEO() {
  const { howToSteps, faq } = surveyAreaCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Survey Area Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Survey Area Calculator</strong> is a land measurement tool that calculates the total area of a plot of land based on its shape and dimensions. It supports rectangular plots, triangular plots using Heron&apos;s formula, and irregular polygon plots using the Shoelace formula — covering the full range of real-world land shapes encountered in surveying.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator accepts measurements in feet, meters, yards, or kilometers and instantly converts the result into all major area units: square feet, square meters, acres, hectares, square yards, decimal, bigha, and katha. This makes it useful for professionals and property owners worldwide.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We do not collect or store what you enter. The tool includes preset templates for common plot sizes, a full conversion table, calculation history, and a TXT export option.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Survey Area Calculator
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
          Calculation Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Plot Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rectangle", "Area = Length × Width", "100 × 80 = 8,000 sq ft"],
                ["Triangle (Heron's)", "s = (a+b+c)/2, Area = √(s(s-a)(s-b)(s-c))", "a=10, b=12, c=14 → 58.79 sq ft"],
                ["Polygon (Shoelace)", "Area = ½|Σ(xᵢyᵢ₊₁ − yᵢxᵢ₊₁)|", "(0,0)(100,0)(100,50)(0,50) → 5,000 sq ft"],
              ].map(([type, formula, example]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{type}</td>
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
          Area Unit Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Equals (sq ft)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Common Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1 Acre",     "43,560 sq ft",  "US / UK land measurement"],
                ["1 Hectare",  "107,639 sq ft", "International / metric land"],
                ["1 Sq Meter", "10.764 sq ft",  "Metric construction"],
                ["1 Sq Yard",  "9 sq ft",       "US / UK construction"],
                ["1 Decimal",  "435.6 sq ft",   "Bangladesh / India"],
                ["1 Bigha",    "14,400 sq ft",  "South Asia (varies by region)"],
                ["1 Katha",    "720 sq ft",     "Bangladesh / India"],
              ].map(([unit, sqft, use]) => (
                <tr key={unit} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{unit}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{sqft}</td>
                  <td className="py-3 px-4 text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Area Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Plot</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Dimensions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Sq Ft</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Small Residential",  "100 × 80 ft",       "8,000",    "0.184"],
                ["Standard Lot",       "150 × 100 ft",      "15,000",   "0.344"],
                ["One Acre Plot",      "209 × 209 ft",      "43,681",   "1.003"],
                ["Commercial Plot",    "300 × 200 ft",      "60,000",   "1.377"],
                ["Triangle Plot",      "a=50, b=60, c=70 ft","1,469",   "0.034"],
              ].map(([plot, dims, sqft, acres]) => (
                <tr key={plot} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{plot}</td>
                  <td className="py-3 px-4 font-mono">{dims}</td>
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
            { icon: "📐", title: "Land Surveyors",      desc: "Quickly verify field measurements and compute plot areas from coordinate data." },
            { icon: "🏠", title: "Property Buyers",     desc: "Understand the exact size of a plot before making a purchase decision." },
            { icon: "👷", title: "Civil Engineers",     desc: "Calculate land areas for site planning, grading, and construction layouts." },
            { icon: "🌾", title: "Farmers",             desc: "Measure field and crop areas in acres, hectares, or local units like bigha." },
            { icon: "🏗️", title: "Developers",          desc: "Estimate plot sizes for residential and commercial development projects." },
            { icon: "📄", title: "Legal Professionals", desc: "Verify land dimensions for property registration and legal documentation." },
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
