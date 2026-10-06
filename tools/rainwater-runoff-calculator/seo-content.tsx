import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { rainwaterRunoffCalculatorConfig } from "./config";

export default function RainwaterRunoffCalculatorSEO() {
  const { howToSteps, faq } = rainwaterRunoffCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Rainwater Runoff Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Rainwater Runoff Calculator</strong> is a stormwater engineering tool that estimates
            how much rainfall becomes surface runoff rather than infiltrating into the ground. It uses the
            <strong> Rational Runoff Formula</strong> — multiplying rainfall depth, catchment area, and a
            surface-specific runoff coefficient — to deliver instant volume estimates in liters, cubic meters,
            and gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The core principle is simple: 1 mm of rainfall over 1 m² of surface produces exactly 1 liter of
            potential runoff. The runoff coefficient (C) then scales this by how much of that water actually
            flows off the surface versus soaking in. Impervious surfaces like concrete and roofs have
            coefficients near 0.90–0.95, while grass and sandy soils are as low as 0.20–0.30.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We do not collect or store what you enter. The tool supports
            three rainfall units, four area units, eight preset surface types, and a custom coefficient mode
            for specialized surfaces.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Runoff Calculator
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
          Runoff Formula & Example Calculations
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Core Formula</h3>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm space-y-2">
              <div>Runoff (L) = Rainfall (mm) × Area (m²) × C</div>
              <div className="text-gray-500 text-xs mt-2 font-sans space-y-1">
                <div>Rainfall = depth of rain in millimeters</div>
                <div>Area = catchment area in square meters</div>
                <div>C = runoff coefficient (0.0 – 1.0)</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
              1 mm of rain on 1 m² = 1 liter of water
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Example Calculations</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">Concrete · 50 mm · 100 m²</div>
                <div className="font-mono text-xs space-y-0.5 text-blue-800">
                  <div>50 mm × 100 m² × 0.90 = 4,500 liters</div>
                  <div>= 4.5 m³ ≈ 24 barrels</div>
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-900 mb-1">Grass · 30 mm · 500 m²</div>
                <div className="font-mono text-xs space-y-0.5 text-green-800">
                  <div>30 mm × 500 m² × 0.30 = 4,500 liters</div>
                  <div>= 4.5 m³ ≈ 24 barrels</div>
                </div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="font-semibold text-purple-900 mb-1">Roof · 100 mm · 200 m²</div>
                <div className="font-mono text-xs space-y-0.5 text-purple-800">
                  <div>100 mm × 200 m² × 0.95 = 19,000 liters</div>
                  <div>= 19 m³ ≈ 100 barrels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Runoff Coefficients by Surface Type
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Surface Type</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Coefficient (C)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Runoff Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Roof Surface",         "0.95", "Very High", "Residential & commercial rooftops"],
                ["Concrete / Pavement",  "0.90", "Very High", "Driveways, sidewalks, plazas"],
                ["Asphalt",              "0.85", "High",      "Roads, parking lots, highways"],
                ["Clay Soil",            "0.70", "High",      "Heavy clay agricultural land"],
                ["Gravel",               "0.60", "Moderate",  "Gravel paths, driveways, parking"],
                ["Bare Soil",            "0.50", "Moderate",  "Construction sites, exposed earth"],
                ["Grass / Lawn",         "0.30", "Low",       "Lawns, parks, sports fields"],
                ["Sandy Soil",           "0.20", "Very Low",  "Sandy agricultural land, beaches"],
              ].map(([surface, c, level, use]) => (
                <tr key={surface} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{surface}</td>
                  <td className="py-3 px-4 text-center font-mono text-primary font-semibold">{c}</td>
                  <td className="py-3 px-4 text-gray-600">{level}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{use}</td>
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
            { icon: "🏗️", title: "Civil Engineers",          color: "blue",   desc: "Size drainage systems and stormwater infrastructure for development projects." },
            { icon: "🌿", title: "Environmental Engineers",  color: "green",  desc: "Assess runoff impacts on watersheds, wetlands, and water quality." },
            { icon: "👨‍🌾", title: "Farmers & Agronomists",   color: "yellow", desc: "Plan field drainage and estimate water availability for irrigation." },
            { icon: "🏙️", title: "Urban Planners",           color: "purple", desc: "Design permeable surfaces and green infrastructure to manage stormwater." },
            { icon: "🌱", title: "Landscape Designers",      color: "teal",   desc: "Calculate runoff from gardens, lawns, and hardscaped areas." },
            { icon: "🎓", title: "Students & Researchers",   color: "gray",   desc: "Learn hydrology concepts and verify runoff calculations for coursework." },
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
