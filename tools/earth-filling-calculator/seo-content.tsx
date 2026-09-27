import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { earthFillingCalculatorConfig } from "./config";

export default function EarthFillingCalculatorSEO() {
  const { howToSteps, faq } = earthFillingCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is an Earth Filling Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            An <strong>Earth Filling Calculator</strong> estimates the volume of fill material needed to raise, level, or fill a land area for construction, landscaping, road building, pond filling, or foundation preparation. Accurate fill estimation prevents costly over-ordering or project delays from under-ordering material.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports five fill shapes — rectangle, square, triangle, circular, and custom area — and applies a compaction factor to account for soil settling after placement. Results are shown in cubic feet, cubic meters, and cubic yards, with optional truckload estimation and project cost calculation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The compaction factor is critical: loose soil placed as fill typically settles 10–30% after compaction, meaning you need to order more material than the raw volume suggests. This calculator automatically adjusts for that with three compaction presets.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Earth Filling Calculator
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
          Fill Volume Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Shape</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Raw Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">With Compaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rectangle", "L × W × D",        "L × W × D × CF"],
                ["Square",    "S² × D",            "S² × D × CF"],
                ["Triangle",  "0.5 × B × H × D",  "0.5 × B × H × D × CF"],
                ["Circular",  "π × r² × D",        "π × r² × D × CF"],
                ["Custom",    "Area × D",          "Area × D × CF"],
              ].map(([shape, raw, comp]) => (
                <tr key={shape} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{shape}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{raw}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold text-xs">{comp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">CF = Compaction Factor (1.10 loose / 1.20 moderate / 1.30 heavy)</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Estimates
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Dimensions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Adjusted Volume</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Trucks (8 m³)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Road base",       "50×30×2 ft, heavy CF",   "3,600 ft³ / 102 m³",  "13"],
                ["Foundation pad",  "100×40×1.5 ft, mod CF",  "7,200 ft³ / 204 m³",  "26"],
                ["Pond fill",       "20×15×3 ft, loose CF",   "990 ft³ / 28 m³",     "4"],
                ["Circular area",   "Ø30×2 ft, mod CF",       "1,696 ft³ / 48 m³",   "6"],
                ["Land leveling",   "2000 ft² × 1 ft, mod",   "2,400 ft³ / 68 m³",   "9"],
              ].map(([project, dims, vol, trucks]) => (
                <tr key={project} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{project}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{dims}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold text-xs">{vol}</td>
                  <td className="py-3 px-4 font-mono">{trucks}</td>
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
            { icon: "👷", title: "Contractors",      desc: "Estimate fill material quantities for accurate project bidding and scheduling." },
            { icon: "🏗️", title: "Civil Engineers",  desc: "Calculate earthwork fill volumes for roads, embankments, and site grading." },
            { icon: "🌿", title: "Landscapers",      desc: "Estimate topsoil and fill needed for garden beds, berms, and yard leveling." },
            { icon: "🏠", title: "Homeowners",       desc: "Plan fill requirements for yard grading, raised beds, and drainage projects." },
            { icon: "🌾", title: "Farmers",          desc: "Calculate fill for irrigation channels, pond construction, and land leveling." },
            { icon: "📐", title: "Site Managers",    desc: "Verify fill material orders and track earthwork progress on construction sites." },
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
