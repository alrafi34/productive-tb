import React from "react";

export default function ToolSEOContent() {
  return (
    <div className="mt-16 space-y-16">
      {/* Overview Section */}
      <section className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-blue-600">📐</span> 
            Understanding Area Conversion
          </h2>
          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed font-medium">
            <p>
              In the global real estate, construction, and design landscapes, understanding the relationship between the <strong>Metric System</strong> (Square Meters) and the <strong>Imperial System</strong> (Square Feet) is fundamental. Whether you are analyzing property listings from different countries or calculating material requirements for a flooring project, accurate area conversion is paramount.
            </p>
            <p className="mt-4">
              Our <strong>Square Meter to Square Foot Converter</strong> provides real-time, high-precision results using scientifically verified conversion factors. Because this utility executes entirely within your browser runtime, it offers maximum performance, total data privacy, and zero latency.
            </p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 text-[10rem] font-black text-gray-50 -mb-12 -mr-8 italic pointer-events-none">
          AREA
        </div>
      </section>

      {/* Conversion Math Section */}
      <section className="bg-gray-900 rounded-3xl p-10 text-white shadow-2xl relative">
        <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
          <span className="text-blue-400">🧮</span> 
          The Mathematical Foundation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-blue-500/10 text-blue-400 p-4 rounded-2xl border border-blue-500/20 inline-block">
              Primary Formula
            </h3>
            <div className="space-y-4">
              <p className="text-gray-400 font-inter italic">To convert Square Meters (m²) to Square Feet (ft²):</p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 font-mono text-xl font-black text-blue-300">
                Area in ft² = Area in m² × 10.7639
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-indigo-500/10 text-indigo-400 p-4 rounded-2xl border border-indigo-500/20 inline-block">
              Inverse Formula
            </h3>
            <div className="space-y-4">
              <p className="text-gray-400 font-inter italic">To convert Square Feet (ft²) to Square Meters (m²):</p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 font-mono text-xl font-black text-indigo-300">
                Area in m² = Area in ft² × 0.092903
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 italic text-gray-400 text-sm">
          Note: This converter uses highly precise constants (10.7639104 and 0.09290304) for professional-grade engineering and architectural calculations.
        </div>
      </section>

      {/* Step by Step Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            step: "1",
            title: "Input Value",
            desc: "Enter your area measurement into either the m² or ft² field. The tool identifies numeric input immediately.",
            color: "blue"
          },
          {
            step: "2",
            title: "Real-Time Logic",
            desc: "The underlying JavaScript engine calculates the opposite unit while you type, requiring zero button clicks.",
            color: "indigo"
          },
          {
            step: "3",
            title: "Adjust Precision",
            desc: "Use the precision selector to round results to 2, 3, or 4 decimal places for specific engineering needs.",
            color: "purple"
          }
        ].map(item => (
          <div key={item.step} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:bg-gray-50 transition-colors">
            <div className={`w-12 h-12 rounded-2xl bg-${item.color}-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
              {item.step}
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm font-inter">
        <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-3">
          <span>💬</span> Frequently Asked Questions (FAQ)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4 p-6 hover:bg-blue-50/30 rounded-2xl transition-colors border border-transparent hover:border-blue-100">
            <h3 className="text-lg font-black text-gray-900">How many square feet are in 100 square meters?</h3>
            <p className="text-gray-600 leading-relaxed font-medium italic">There are approximately 1,076.39 square feet in 100 square meters. A general rule of thumb for quick estimation is to multiply by 11.</p>
          </div>
          <div className="space-y-4 p-6 hover:bg-indigo-50/30 rounded-2xl transition-colors border border-transparent hover:border-indigo-100">
            <h3 className="text-lg font-black text-gray-900">Can I convert larger units like acres or hectares?</h3>
            <p className="text-gray-600 leading-relaxed font-medium italic">This specific tool is optimized for refined spatial conversion (rooms, buildings, small plots). For massive land measurements, please use our dedicated land area calculator tools.</p>
          </div>
          <div className="space-y-4 p-6 hover:bg-purple-50/30 rounded-2xl transition-colors border border-transparent hover:border-purple-100">
            <h3 className="text-lg font-black text-gray-900">Is the batch mode CSV export limited?</h3>
            <p className="text-gray-600 leading-relaxed font-medium italic">No. You can paste thousands of lines of area data into the batch input area and generate a full CSV report instantly. It's designed for bulk data processing for inventory or real estate catalogs.</p>
          </div>
          <div className="space-y-4 p-6 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-200">
            <h3 className="text-lg font-black text-gray-900">Why does use locally stored history?</h3>
            <p className="text-gray-600 leading-relaxed font-medium italic">We prioritize your workflow continuity. By saving the last 5 conversions locally (in your browser's LocalStorage), you can refer back to previous calculations even if you refresh the page or close the tab accidentally.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
