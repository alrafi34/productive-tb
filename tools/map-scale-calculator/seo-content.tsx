import React from "react";
import ToolFaq from "@/components/ToolFaq";
import { mapScaleCalculatorConfig } from "./config";

export default function MapScaleCalculatorSEO() {
  const { howToSteps, faq } = mapScaleCalculatorConfig.seo;
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Map Scale Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Map Scale Calculator</strong> is a browser-based tool that converts distances measured
            on a map into real-world distances using a map scale ratio. It also works in reverse — given a
            known real-world distance, it calculates the corresponding measurement on the map.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Map scales are expressed as ratios such as <strong>1:25,000</strong>, meaning one unit on the
            map equals 25,000 of the same units in reality. A measurement of 4 cm on a 1:25,000 map
            therefore represents 1,000 meters (1 km) on the ground.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This tool supports all common distance units — millimeters, centimeters, meters, kilometers,
            inches, feet, and miles — and automatically selects the most readable output unit. All
            calculations run entirely in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Map Scale Calculator
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Scale</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Map Distance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Real Distance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1:1,000",   "5 cm",  "50 m"],
                ["1:5,000",   "2 cm",  "100 m"],
                ["1:25,000",  "4 cm",  "1 km"],
                ["1:50,000",  "2 cm",  "1 km"],
                ["1:100,000", "3 cm",  "3 km"],
                ["1:250,000", "4 cm",  "10 km"],
              ].map(([scale, map, real]) => (
                <tr key={scale} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{scale}</td>
                  <td className="py-3 px-4 font-mono">{map}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{real}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Map Scale Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Scale</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">1 cm = (meters)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">1 inch = (feet)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1:500",     "5 m",     "41.7 ft",    "Site plans, floor plans"],
                ["1:1,000",   "10 m",    "83.3 ft",    "Urban planning, large sites"],
                ["1:2,500",   "25 m",    "208 ft",     "Town maps, cadastral surveys"],
                ["1:5,000",   "50 m",    "417 ft",     "City maps, engineering surveys"],
                ["1:10,000",  "100 m",   "833 ft",     "Topographic maps"],
                ["1:24,000",  "240 m",   "2,000 ft",   "USGS 7.5-minute topographic maps (US)"],
                ["1:25,000",  "250 m",   "2,083 ft",   "Hiking maps, Ordnance Survey Explorer (UK)"],
                ["1:50,000",  "500 m",   "4,167 ft",   "Regional maps"],
                ["1:63,360",  "633.6 m", "1 mile",     "Classic “inch to the mile” maps"],
                ["1:100,000", "1 km",    "8,333 ft",   "Road maps, atlas maps"],
              ].map(([scale, cm, inch, use]) => (
                <tr key={scale} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-medium">{scale}</td>
                  <td className="py-3 px-4 font-mono">{cm}</td>
                  <td className="py-3 px-4 font-mono">{inch}</td>
                  <td className="py-3 px-4 text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Drawing Scales Written in Inches and Feet
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          US site plans and architectural drawings state the scale as a length equation rather than a ratio. Convert both sides to the same unit to get the ratio: 1 in = 20 ft is 1 in = 240 in, so 1:240. Enter that ratio in the calculator.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Written scale</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Ratio</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1/4 in = 1 ft", "1:48", "House floor plans"],
                ["1/8 in = 1 ft", "1:96", "Larger building plans"],
                ["1 in = 20 ft", "1:240", "Site and plot plans"],
                ["1 in = 50 ft", "1:600", "Subdivision plats"],
                ["1 in = 100 ft", "1:1,200", "Large subdivisions, master plans"],
              ].map(([written, ratio, use]) => (
                <tr key={written} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{written}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{ratio}</td>
                  <td className="py-3 px-4 text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Metric drawings use ratios directly: 1:100 or 1:50 for building plans and 1:200 to 1:500 for site plans.</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "📐", title: "Land Surveyors", desc: "Convert field measurements to map distances and verify survey accuracy." },
            { icon: "🏗️", title: "Civil Engineers", desc: "Scale engineering drawings and calculate real-world dimensions from plans." },
            { icon: "🗺️", title: "Cartographers", desc: "Design and verify map scales for accurate geographic representation." },
            { icon: "🎓", title: "Students", desc: "Learn map reading and scale conversion for geography and GIS courses." },
            { icon: "🌍", title: "GIS Professionals", desc: "Validate spatial data and convert between map and ground coordinates." },
            { icon: "🏛️", title: "Urban Planners", desc: "Analyze site plans and calculate distances for development projects." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <ToolFaq items={faq} />

    </div>
  );
}
