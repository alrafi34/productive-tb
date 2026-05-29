import React from "react";

export default function BendingMomentCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Bending Moment Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Bending Moment Calculator</strong> is a structural engineering tool that computes the
            internal bending moment at any cross-section of a beam subjected to external loads. Bending moment
            is the algebraic sum of moments of all forces acting on one side of a section, and it determines
            how much a beam will bend under load.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports four beam configurations — simply supported, cantilever, fixed (both ends),
            and overhanging — combined with point loads, uniformly distributed loads (UDL), and multiple point
            loads. Results are displayed in Nm, kNm, lb-ft, lb-in, and kip-ft simultaneously.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The tool renders real-time bending moment diagrams (BMD) and shear force diagrams (SFD) using SVG,
            making it easy to visualize beam behavior without specialized software.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Bending Moment Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the beam type (simply supported, cantilever, fixed, or overhanging)",
                "Choose the load type — point load, UDL, or multiple point loads",
                "Enter the beam length and select the length unit",
                "Enter the load magnitude and select the force unit",
                "For point loads at any position, use the slider to set the load location",
                "View the maximum bending moment, reactions, and diagrams instantly",
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
                "4 beam types — simply supported, cantilever, fixed, overhanging",
                "4 load types — center point, any position, UDL, multiple loads",
                "Interactive load position slider",
                "Live bending moment and shear force diagrams (SVG)",
                "Multi-unit output — Nm, kNm, lb-ft, lb-in, kip-ft",
                "Reaction force display (R_A and R_B)",
                "Calculation history with localStorage persistence",
                "Export results as TXT file",
                "Quick presets for common engineering scenarios",
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
          Bending Moment Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Beam Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Load Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Simply Supported", "Center Point Load", "M = (F × L) / 4", "At center"],
                ["Simply Supported", "Point Load at 'a'", "M = F·a·b / L", "At load point"],
                ["Simply Supported", "UDL (w N/m)", "M = (w × L²) / 8", "At center"],
                ["Cantilever", "End Point Load", "M = F × L", "At fixed end"],
                ["Cantilever", "UDL (w N/m)", "M = (w × L²) / 2", "At fixed end"],
                ["Fixed (Both Ends)", "Center Point Load", "M = (F × L) / 8", "At supports"],
                ["Fixed (Both Ends)", "UDL (w N/m)", "M = (w × L²) / 12", "At supports"],
              ].map(([beam, load, formula, loc]) => (
                <tr key={formula} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{beam}</td>
                  <td className="py-3 px-4 text-gray-600">{load}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{formula}</td>
                  <td className="py-3 px-4 text-gray-500">{loc}</td>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Beam</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Load</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Length</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Max Moment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Simply Supported", "1000 N (center)", "4 m", "1000 Nm"],
                ["Cantilever", "500 N (end)", "2 m", "1000 Nm"],
                ["Simply Supported", "200 N/m (UDL)", "6 m", "900 Nm"],
                ["Fixed", "2000 N (center)", "8 m", "2000 Nm"],
                ["Cantilever", "100 N/m (UDL)", "3 m", "450 Nm"],
                ["Simply Supported", "5 kip (center)", "20 ft", "25 kip-ft"],
              ].map(([beam, load, len, moment]) => (
                <tr key={beam + load} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{beam}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{load}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{len}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{moment}</td>
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
            { icon: "🏗️", title: "Structural Beams", color: "blue", desc: "Calculate bending moments in floor beams, roof beams, and bridge girders to ensure structural integrity." },
            { icon: "🏢", title: "Building Design", color: "green", desc: "Architects and structural engineers use bending moment calculations to size beams in buildings and frames." },
            { icon: "⚙️", title: "Machine Design", color: "purple", desc: "Shafts, axles, and machine frames experience bending loads that must be analyzed for safe operation." },
            { icon: "🌉", title: "Bridge Engineering", color: "orange", desc: "Bridge beams and girders are designed based on maximum bending moments from traffic and dead loads." },
            { icon: "🎓", title: "Engineering Education", color: "red", desc: "Bending moment is a core topic in mechanics of materials and structural analysis courses." },
            { icon: "🔩", title: "Manufacturing", color: "gray", desc: "Press frames, crane booms, and conveyor structures all require bending moment analysis." },
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
              q: "What is bending moment?",
              a: "Bending moment at a cross-section of a beam is the algebraic sum of moments of all forces acting on one side of that section. It represents the internal resistance of the beam to bending. The SI unit is Newton-meter (Nm).",
            },
            {
              q: "What is the difference between bending moment and shear force?",
              a: "Shear force is the algebraic sum of all transverse forces acting on one side of a section, while bending moment is the sum of moments of those forces. Shear force causes sliding failure; bending moment causes bending failure. The bending moment diagram is the integral of the shear force diagram.",
            },
            {
              q: "Where does maximum bending moment occur?",
              a: "For a simply supported beam with a center point load, maximum moment occurs at the center. For a cantilever, it occurs at the fixed support. For UDL on a simply supported beam, it occurs at the midspan. In general, maximum moment occurs where shear force is zero.",
            },
            {
              q: "What is UDL in beam analysis?",
              a: "UDL stands for Uniformly Distributed Load — a load spread evenly along the entire length of the beam, measured in N/m or kN/m. Examples include the self-weight of a beam, floor loads, and snow loads on roofs.",
            },
            {
              q: "How does a fixed beam differ from a simply supported beam?",
              a: "A simply supported beam has pin and roller supports that allow rotation at both ends. A fixed beam has both ends rigidly connected, preventing rotation. Fixed beams develop end moments (hogging) and have lower maximum bending moments than simply supported beams for the same load.",
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
