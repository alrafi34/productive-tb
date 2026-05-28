import React from "react";

export default function SpringForceCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Spring Force Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Spring Force Calculator</strong> is a physics and engineering tool that computes the
            restoring force exerted by a spring using <strong>Hooke&apos;s Law</strong>. When a spring is
            compressed or stretched from its natural length, it generates a force proportional to the
            displacement — this relationship is the foundation of spring mechanics.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The formula is <strong>F = k × x</strong>, where F is the spring force in Newtons, k is the
            spring constant (stiffness) in N/m, and x is the displacement in meters. This calculator
            supports metric units (N/m, kN/m, m, cm, mm) and imperial units (lb/in, inches), automatically
            converting all inputs to SI before computing.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Results are displayed in Newtons (N), Kilonewtons (kN), and Pound-force (lbf) simultaneously,
            making it useful for students, mechanical engineers, and designers working across different
            unit systems.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Spring Force Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the spring constant (k) — e.g. 100",
                "Select the spring constant unit — N/m, lb/in, or kN/m",
                "Enter the displacement (x) — e.g. 0.2",
                "Select the displacement unit — m, cm, mm, or in",
                "Choose motion type — Compression or Extension",
                "View the spring force result instantly in N, kN, and lbf",
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
                "Multi-unit support — metric and imperial",
                "Displacement slider for interactive input",
                "Live formula display with your actual values",
                "Compression and extension mode toggle",
                "Unit conversion breakdown (N, kN, lbf)",
                "Calculation history with localStorage persistence",
                "Export results as a TXT file",
                "Quick presets for common engineering scenarios",
                "Scientific notation for very large/small values",
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
          Hooke&apos;s Law Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">The Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                F = k × x
              </div>
              <p className="text-sm text-gray-600">
                Spring force equals the spring constant multiplied by displacement. Doubling the
                displacement doubles the force. A stiffer spring (higher k) produces more force for
                the same displacement.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Elastic Limit</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                F = k × x  (within elastic range)
              </div>
              <p className="text-sm text-gray-600">
                Hooke&apos;s Law is valid only within the elastic limit of the spring. Beyond this point,
                the spring deforms permanently and the linear relationship no longer holds.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> The spring constant k (measured in N/m) represents the stiffness
            of the spring. A spring with k = 1,000 N/m requires 1,000 Newtons of force to stretch or
            compress it by 1 meter. Car suspension springs typically range from 15,000 to 30,000 N/m.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Spring Constant (k)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Displacement (x)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Force (F)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Scenario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["100 N/m",    "0.2 m",   "20 N",     "Physics example"],
                ["350 N/m",    "0.05 m",  "17.5 N",   "Compression spring"],
                ["1,200 N/m",  "0.03 m",  "36 N",     "Extension spring"],
                ["25,000 N/m", "0.05 m",  "1,250 N",  "Car suspension"],
                ["5 N/m",      "10 mm",   "0.05 N",   "Pen spring"],
                ["10 lb/in",   "3 in",    "≈ 525 N",  "Garage door spring"],
              ].map(([k, x, f, scenario]) => (
                <tr key={k + x} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{k}</td>
                  <td className="py-3 px-4 font-mono">{x}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{f}</td>
                  <td className="py-3 px-4 text-gray-500">{scenario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Spring Constant Unit Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">N/m</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">kN/m</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">lb/in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1",       "0.001",  "0.00571"],
                ["100",     "0.1",    "0.571"],
                ["175.13",  "0.175",  "1"],
                ["1,000",   "1",      "5.71"],
                ["10,000",  "10",     "57.1"],
                ["25,000",  "25",     "142.8"],
              ].map(([nm, knm, lbin]) => (
                <tr key={nm} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{nm}</td>
                  <td className="py-3 px-4 font-mono">{knm}</td>
                  <td className="py-3 px-4 font-mono">{lbin}</td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={3} className="py-3 px-4 text-blue-800 font-medium">1 lb/in = 175.1268 N/m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications of Hooke&apos;s Law
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🎓", title: "Physics Education",      color: "blue",   desc: "F = kx is one of the first spring equations taught in physics. It forms the basis for understanding oscillation, resonance, and elastic potential energy." },
            { icon: "🚗", title: "Automotive Engineering", color: "green",  desc: "Suspension spring design relies on Hooke's Law to balance ride comfort and handling. Spring constants are tuned for vehicle weight and road conditions." },
            { icon: "🏭", title: "Manufacturing",          color: "purple", desc: "Industrial springs in presses, clamps, and actuators are sized using spring force calculations to ensure correct clamping and return forces." },
            { icon: "🤖", title: "Robotics",               color: "orange", desc: "Compliant mechanisms and spring-loaded joints in robots use Hooke's Law to control force output and absorb impact loads safely." },
            { icon: "⚙️", title: "Mechanical Design",      color: "red",    desc: "Valve springs, return springs, and tension springs in machines are designed using spring force calculations to meet operational requirements." },
            { icon: "🏗️", title: "Structural Engineering", color: "gray",   desc: "Seismic isolation systems and vibration dampers use spring elements whose behavior is governed by Hooke's Law within the elastic range." },
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
              q: "What is Hooke's Law?",
              a: "Hooke's Law states that the force exerted by a spring is directly proportional to its displacement from the natural (equilibrium) position: F = k × x. The law holds as long as the spring is not stretched or compressed beyond its elastic limit.",
            },
            {
              q: "What is the spring constant (k)?",
              a: "The spring constant k (also called stiffness) measures how resistant a spring is to deformation. It is measured in N/m (Newtons per meter). A higher k means a stiffer spring that requires more force to compress or extend by the same distance.",
            },
            {
              q: "What is the difference between compression and extension?",
              a: "Compression refers to pushing the spring shorter than its natural length. Extension (or tension) refers to pulling the spring longer. Both produce a restoring force described by F = kx, but in opposite directions. The magnitude of force is the same for equal displacements.",
            },
            {
              q: "What units does this calculator support?",
              a: "Spring constant: N/m, kN/m, lb/in. Displacement: m, cm, mm, in. All inputs are automatically converted to SI units (N/m and m) before calculation. Results are shown in N, kN, and lbf.",
            },
            {
              q: "Is this calculator accurate for engineering use?",
              a: "Yes. The calculator uses exact conversion factors and IEEE 754 double-precision arithmetic. Results are accurate to the selected decimal precision. For safety-critical spring design, always verify with a licensed mechanical engineer.",
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
