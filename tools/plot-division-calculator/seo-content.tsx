import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { plotDivisionCalculatorConfig } from "./config";

export default function PlotDivisionCalculatorSEO() {
  const { howToSteps, faq } = plotDivisionCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Plot Division Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Plot Division Calculator</strong> is a land planning tool that helps you divide a total land area into equal plots instantly. Whether you're a real estate developer, surveyor, farmer, or property owner, this calculator simplifies the process of subdividing land by automatically calculating individual plot sizes, suggesting optimal layouts, and accounting for road spacing.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator supports all major land measurement units including Square Feet, Square Meter, Decimal, Acre, Katha, Bigha, and Hectare. It provides instant results showing plot size, suggested grid layout (rows × columns), and optional plot dimensions when land width and length are provided.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Advanced features include road width allocation, custom grid layouts, visual plot previews, and calculation history. All computations happen instantly in your browser with complete privacy.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Plot Division Calculator
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Land</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Number of Plots</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Each Plot Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10,000 sq ft", "5", "2,000 sq ft"],
                ["2 Acres", "8", "0.25 Acres"],
                ["100 × 80 ft", "4", "2,000 sq ft (50 × 40 ft)"],
                ["5 Decimal", "10", "0.5 Decimal"],
                ["1 Bigha", "20", "720 sq ft"],
                ["1 Hectare", "50", "2,152.78 sq ft"],
              ].map(([land, plots, size]) => (
                <tr key={land} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{land}</td>
                  <td className="py-3 px-4 font-mono">{plots}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Division Modes Explained
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Equal Area",
              desc: "Divides land into plots of equal area. Best for general subdivision where plot shape flexibility is acceptable.",
            },
            {
              title: "Equal Width",
              desc: "Creates plots with equal width but varying length. Useful for street-facing properties.",
            },
            {
              title: "Equal Length",
              desc: "Creates plots with equal length but varying width. Ideal for depth-consistent layouts.",
            },
            {
              title: "Custom Grid",
              desc: "Specify exact rows and columns for the layout. Perfect when you have specific subdivision requirements.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏗️", title: "Real Estate Developers", desc: "Plan residential and commercial subdivisions with accurate plot sizing." },
            { icon: "📐", title: "Surveyors", desc: "Calculate plot divisions for land survey and mapping projects." },
            { icon: "👷", title: "Civil Engineers", desc: "Design land layouts for infrastructure and development projects." },
            { icon: "🌾", title: "Farmers", desc: "Divide agricultural land into manageable plots for cultivation or sale." },
            { icon: "🏘️", title: "Property Planners", desc: "Create subdivision plans for residential housing developments." },
            { icon: "🏛️", title: "Architects", desc: "Plan site layouts with accurate plot dimensions and spacing." },
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
