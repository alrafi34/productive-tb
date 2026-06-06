import React from "react";

export default function LatheSpeedCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Lathe Speed Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Lathe Speed Calculator</strong> is a machining utility that computes the optimal
            spindle speed (RPM) for lathe turning operations. It uses the workpiece diameter and the
            recommended cutting speed for the material to determine how fast the lathe spindle should
            rotate for safe, efficient, and accurate machining.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The metric formula is <strong>RPM = (1000 × Cutting Speed) ÷ (π × Diameter)</strong>, where
            cutting speed is in m/min and diameter is in mm. For imperial units, the formula becomes{" "}
            <strong>RPM = (12 × SFM) ÷ (π × Diameter)</strong>, where SFM is surface feet per minute
            and diameter is in inches.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Running a lathe at the correct spindle speed prevents tool overheating, reduces tool wear,
            improves surface finish quality, and ensures dimensional accuracy — all critical factors in
            professional and hobby metalworking.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Lathe Speed Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select your unit system — Metric (mm, m/min) or Imperial (in, SFM)",
                "Choose the workpiece material from the dropdown",
                "The cutting speed auto-fills with the recommended value for that material",
                "Enter the workpiece diameter",
                "View the recommended spindle RPM instantly",
                "Check the RPM range and speed status indicator",
                "Copy the result or export a printable report",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Real-time RPM calculation as you type",
                "Metric and imperial unit support",
                "Material presets with auto-filled cutting speeds",
                "Recommended RPM range display",
                "Speed status indicator (Optimal / Low / High)",
                "Safety messages and machining hints",
                "Calculation history with localStorage",
                "Copy result to clipboard",
                "Export printable TXT report",
                "Decimal precision control",
              ].map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Lathe Speed Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Metric Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                RPM = (1000 × Vc) ÷ (π × D)
              </div>
              <p className="text-sm text-gray-600">
                Vc = cutting speed (m/min), D = workpiece diameter (mm). Multiplying by 1000 converts
                m/min to mm/min for dimensional consistency.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Imperial Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                RPM = (12 × SFM) ÷ (π × D)
              </div>
              <p className="text-sm text-gray-600">
                SFM = surface feet per minute, D = workpiece diameter (inches). Multiplying by 12
                converts feet to inches for dimensional consistency.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Unit conversion:</strong> 1 m/min = 3.28084 SFM. To convert between systems:
            SFM = m/min × 3.28084. Both formulas produce the same RPM result for equivalent inputs.
          </div>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Material</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Diameter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Cutting Speed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Spindle RPM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Mild Steel",       "50 mm",  "30 m/min",  "≈ 191 RPM"],
                ["Aluminum",         "25 mm",  "90 m/min",  "≈ 1,146 RPM"],
                ["Stainless Steel",  "75 mm",  "20 m/min",  "≈ 85 RPM"],
                ["Brass",            "30 mm",  "100 m/min", "≈ 1,061 RPM"],
                ["Cast Iron",        "60 mm",  "25 m/min",  "≈ 133 RPM"],
                ["Titanium",         "40 mm",  "15 m/min",  "≈ 119 RPM"],
              ].map(([mat, diam, vc, rpm]) => (
                <tr key={mat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{mat}</td>
                  <td className="py-3 px-4 font-mono">{diam}</td>
                  <td className="py-3 px-4 font-mono">{vc}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{rpm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Correct Lathe Speed Matters
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🔧", title: "Tool Life",       color: "blue",   desc: "Running at the correct RPM maximizes cutting tool life. Too fast causes rapid wear; too slow leads to chatter and poor chip formation." },
            { icon: "✨", title: "Surface Finish",  color: "green",  desc: "Optimal spindle speed produces the best surface finish. Incorrect speeds result in rough surfaces, chatter marks, or poor dimensional accuracy." },
            { icon: "🌡️", title: "Heat Control",   color: "orange", desc: "Excessive RPM generates heat that softens the tool and workpiece. Correct speed keeps temperatures in the safe machining range." },
            { icon: "⚡", title: "Productivity",    color: "purple", desc: "Correct speeds reduce cycle time and increase output. Balancing RPM with tool life is key to cost-effective lathe operations." },
            { icon: "🛡️", title: "Safety",         color: "red",    desc: "Overspeeding a lathe can cause workpiece ejection or tool breakage. Correct RPM keeps operations within safe mechanical limits." },
            { icon: "🎓", title: "CNC Programming", color: "gray",   desc: "CNC lathe programmers use this formula to set the S (spindle speed) value in G-code. Correct RPM is fundamental to any turning program." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${color}-800`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is lathe spindle speed (RPM)?",
              a: "Spindle speed is the number of revolutions per minute (RPM) the lathe chuck makes. It determines how fast the workpiece rotates relative to the cutting tool. The correct RPM depends on the workpiece diameter and the recommended cutting speed for the material being machined.",
            },
            {
              q: "What is cutting speed (surface speed)?",
              a: "Cutting speed — also called surface speed — is the speed at which the workpiece surface moves past the cutting tool. It is measured in m/min (metric) or SFM — surface feet per minute (imperial). Each material has a recommended cutting speed range for optimal tool life and surface finish.",
            },
            {
              q: "Why does diameter affect spindle RPM?",
              a: "A larger diameter workpiece has a greater circumference. To maintain the same surface cutting speed, a larger workpiece must rotate more slowly. Conversely, a smaller diameter workpiece needs higher RPM to achieve the same cutting speed. This is why RPM and diameter are inversely proportional.",
            },
            {
              q: "What cutting speed should I use for mild steel?",
              a: "For mild steel with HSS (high-speed steel) tools, the recommended cutting speed is typically 25–35 m/min (82–115 SFM). For carbide tools, speeds can be 3–5× higher. Always start at the lower end of the range and increase if the tool and finish allow.",
            },
            {
              q: "What is the difference between metric and imperial lathe speed formulas?",
              a: "The metric formula is RPM = (1000 × Vc) ÷ (π × D), where Vc is in m/min and D is in mm. The imperial formula is RPM = (12 × SFM) ÷ (π × D), where SFM is surface feet per minute and D is in inches. Both formulas produce the same RPM result for equivalent inputs — the constants 1000 and 12 handle the unit conversions.",
            },
            {
              q: "Can I use this calculator for CNC lathes?",
              a: "Yes. The RPM formula is identical for manual and CNC lathes. For CNC programming, the calculated RPM is used as the S value in G-code (e.g., S191 for 191 RPM). Many CNC controllers also accept direct surface speed input using G96 (constant surface speed) mode, which automatically adjusts RPM as the diameter changes.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
