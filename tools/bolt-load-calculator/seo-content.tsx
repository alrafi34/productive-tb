import React from "react";

export default function BoltLoadCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Bolt Load Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Bolt Load Calculator</strong> is an engineering tool that computes the forces acting on a
            fastener during assembly and service. It calculates bolt preload force, clamp load, tensile stress,
            and safety factor based on bolt geometry, material grade, and tightening specifications.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The core formula is <strong>F = A × Sy × P</strong>, where F is the preload force, A is the tensile
            stress area, Sy is the yield strength of the bolt material, and P is the tightening percentage
            (typically 70–80% of yield strength for structural applications).
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports both metric (ISO 898) and imperial (ASTM/SAE) bolt standards, automatically
            determining the tensile stress area from standard thread tables and computing all key engineering
            parameters in real time.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Bolt Load Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select your unit system — Metric (mm, MPa) or Imperial (in, psi)",
                "Enter the bolt nominal diameter (e.g. 12 mm or 0.5 in)",
                "Select the bolt grade — 8.8, 10.9, 12.9 or Grade 5, Grade 8",
                "Adjust the tightening percentage slider (default 75%)",
                "Enter any applied external tensile load (optional)",
                "Select thread type — Coarse, Fine, or Custom Pitch",
                "View preload force, clamp load, stress, and safety factor instantly",
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
                "Real-time calculation as you type",
                "Metric and imperial unit support with auto-conversion",
                "Auto-fill yield strength from bolt grade selection",
                "Interactive tightening percentage slider (50–90%)",
                "Engineering warnings for overload conditions",
                "Tensile stress area from ISO 898 / ASME B1.1 tables",
                "Export results as TXT or CSV",
                "Calculation history with localStorage persistence",
                "Quick presets for common bolt standards",
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
          Bolt Grade Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Standard</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Yield Strength</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Ultimate Strength</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["4.6",    "ISO 898",  "240 MPa",  "400 MPa",  "General purpose, low-stress"],
                ["5.8",    "ISO 898",  "400 MPa",  "500 MPa",  "Light structural, machinery"],
                ["8.8",    "ISO 898",  "640 MPa",  "800 MPa",  "Standard structural bolts"],
                ["10.9",   "ISO 898",  "900 MPa",  "1040 MPa", "High-strength structural"],
                ["12.9",   "ISO 898",  "1080 MPa", "1220 MPa", "Critical high-load joints"],
                ["Grade 2","ASTM A307","248 MPa",  "379 MPa",  "Light-duty, non-critical"],
                ["Grade 5","SAE J429", "635 MPa",  "827 MPa",  "Automotive, general structural"],
                ["Grade 8","SAE J429", "896 MPa",  "1034 MPa", "High-strength automotive/industrial"],
              ].map(([grade, std, yield_, ult, use]) => (
                <tr key={grade} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{grade}</td>
                  <td className="py-3 px-4 text-gray-600">{std}</td>
                  <td className="py-3 px-4 font-mono">{yield_}</td>
                  <td className="py-3 px-4 font-mono">{ult}</td>
                  <td className="py-3 px-4 text-gray-600">{use}</td>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Bolt</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Tightening</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Preload Force</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Clamp Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["M12",    "8.8",    "75%", "≈ 40.5 kN", "≈ 36.5 kN"],
                ["M16",    "10.9",   "75%", "≈ 89.0 kN", "≈ 80.1 kN"],
                ["M20",    "12.9",   "80%", "≈ 159 kN",  "≈ 143 kN"],
                ['1/2"',   "Grade 8","75%", "≈ 57.2 kN", "≈ 51.5 kN"],
                ["M8",     "8.8",    "70%", "≈ 16.3 kN", "≈ 14.7 kN"],
              ].map(([bolt, grade, tight, preload, clamp]) => (
                <tr key={bolt + grade} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{bolt}</td>
                  <td className="py-3 px-4 font-mono">{grade}</td>
                  <td className="py-3 px-4 font-mono">{tight}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{preload}</td>
                  <td className="py-3 px-4 font-mono">{clamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏗️", title: "Structural Engineering",  color: "blue",   desc: "Steel frame connections, bridge bolts, and column base plates require precise preload calculations to ensure joint integrity." },
            { icon: "🚗", title: "Automotive",              color: "green",  desc: "Engine head bolts, suspension components, and wheel fasteners are torqued to specific preload values for safety and performance." },
            { icon: "⚙️", title: "Industrial Machinery",    color: "orange", desc: "Flanged pipe joints, pressure vessel covers, and rotating equipment require controlled bolt preload to prevent leaks and failures." },
            { icon: "✈️", title: "Aerospace",               color: "purple", desc: "Aircraft fasteners are calculated to exact preload specifications using high-grade materials like Grade 12.9 and titanium alloys." },
            { icon: "🏭", title: "Manufacturing",           color: "red",    desc: "Assembly line tooling, fixture bolts, and machine tool spindles rely on bolt load calculations for repeatability and precision." },
            { icon: "🎓", title: "Engineering Education",   color: "gray",   desc: "Bolt load calculations are a core topic in mechanical engineering courses covering fastener design and joint analysis." },
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
              q: "What is bolt preload force?",
              a: "Bolt preload is the tension force created in a bolt when it is tightened. It clamps the joint members together and is essential for preventing joint separation, fatigue failure, and loosening under vibration.",
            },
            {
              q: "What is the tensile stress area of a bolt?",
              a: "The tensile stress area is the effective cross-sectional area of a threaded bolt used for stress calculations. It is smaller than the nominal shank area and accounts for the thread geometry. Values are standardized in ISO 898 and ASME B1.1.",
            },
            {
              q: "What tightening percentage should I use?",
              a: "For most structural applications, 70–80% of yield strength is recommended. Higher values (80–90%) are used in critical joints where maximum clamping is needed, but reduce the fatigue life margin. Lower values (50–70%) are used for soft or sensitive joint materials.",
            },
            {
              q: "What is the difference between preload and clamp load?",
              a: "Preload is the tension force in the bolt. Clamp load is the compressive force on the joint members. Due to friction losses in the threads and under the bolt head, clamp load is typically 85–95% of preload. This calculator uses 90% as a standard approximation.",
            },
            {
              q: "What safety factor should I use for bolts?",
              a: "A safety factor of 2.0 is standard for most structural applications. Critical joints may require 2.5–3.0. Joints with dynamic or fatigue loading should use higher safety factors. If the calculated safety factor falls below 1.5, the bolt is at risk of yielding.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 4 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
