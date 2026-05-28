import React from "react";

export default function StressCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Stress Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Stress Calculator</strong> is a mechanical engineering tool that computes the internal
            force per unit area within a material when an external load is applied. Mechanical stress is a
            fundamental concept in structural analysis, machine design, and material science.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard formula is <strong>σ = F / A</strong>, where σ (sigma) is the stress, F is the
            applied force, and A is the cross-sectional area resisting that force. The SI unit of stress is
            the Pascal (Pa), though engineers commonly work in MPa or psi depending on the application.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports metric and imperial unit systems — including N, kN, lbf, kgf for force
            and m², cm², mm², in², ft² for area — and outputs results in Pa, kPa, MPa, GPa, psi, and ksi
            simultaneously.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Stress Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the applied force magnitude (e.g. 1000)",
                "Select the force unit — N, kN, lbf, or kgf",
                "Enter the cross-sectional area (e.g. 0.01)",
                "Select the area unit — m², cm², mm², in², or ft²",
                "Choose your preferred output stress unit",
                "View the stress result instantly in all units",
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
                "Full unit conversion breakdown (Pa, kPa, MPa, GPa, psi, ksi)",
                "Engineering interpretation of stress level",
                "Live formula display with your actual values",
                "Calculation history with localStorage persistence",
                "Export results as a TXT report",
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
          Stress Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Normal Stress</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                σ = F / A
              </div>
              <p className="text-sm text-gray-600">
                Normal stress acts perpendicular to the cross-section. Tensile stress pulls the material
                apart; compressive stress pushes it together. Both use the same formula.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Unit Relationships</h3>
              <div className="font-mono text-sm bg-white border border-gray-200 rounded-lg p-3 mb-3 space-y-1">
                <div>1 MPa = 1,000,000 Pa</div>
                <div>1 MPa ≈ 145.04 psi</div>
                <div>1 ksi = 6.895 MPa</div>
              </div>
              <p className="text-sm text-gray-600">
                MPa is the most common unit in structural and mechanical engineering. psi and ksi are
                standard in US engineering practice.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> Doubling the cross-sectional area halves the stress for the same
            force. This is why structural members are designed with larger cross-sections in high-load zones.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Force</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Area</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Stress (Pa)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Stress (MPa)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1,000 N",   "0.01 m²",  "100,000 Pa",       "0.1 MPa"],
                ["5,000 N",   "50 mm²",   "100,000,000 Pa",   "100 MPa"],
                ["10,000 lbf","2 in²",    "34,473,786 Pa",    "34.47 MPa"],
                ["500 kN",    "0.25 m²",  "2,000,000 Pa",     "2 MPa"],
                ["200 N",     "100 mm²",  "2,000,000 Pa",     "2 MPa"],
                ["1 kN",      "1 cm²",    "10,000,000 Pa",    "10 MPa"],
              ].map(([force, area, pa, mpa]) => (
                <tr key={force + area} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{force}</td>
                  <td className="py-3 px-4 font-mono">{area}</td>
                  <td className="py-3 px-4 font-mono">{pa}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{mpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          MPa vs psi: Unit Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">MPa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">kPa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">psi</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">ksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1",    "1,000",   "145.04",  "0.145"],
                ["10",   "10,000",  "1,450.4", "1.450"],
                ["100",  "100,000", "14,504",  "14.50"],
                ["250",  "250,000", "36,259",  "36.26"],
                ["1 psi = 0.006895 MPa", "", "", ""],
              ].map(([mpa, kpa, psi, ksi], i) => (
                i < 4 ? (
                  <tr key={mpa} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono">{mpa}</td>
                    <td className="py-3 px-4 font-mono">{kpa}</td>
                    <td className="py-3 px-4 font-mono">{psi}</td>
                    <td className="py-3 px-4 font-mono">{ksi}</td>
                  </tr>
                ) : (
                  <tr key="note" className="bg-blue-50">
                    <td colSpan={4} className="py-3 px-4 text-blue-800 font-medium">{mpa}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications of Stress Calculations
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏗️", title: "Structural Engineering",  color: "blue",   desc: "Columns, beams, and foundations are designed so stress stays below material yield strength under all load conditions." },
            { icon: "⚙️", title: "Machine Design",          color: "green",  desc: "Shafts, bolts, and brackets must withstand operational loads without permanent deformation or fatigue failure." },
            { icon: "🔩", title: "Fastener Analysis",       color: "purple", desc: "Bolt and screw stress calculations ensure joints remain secure under tensile and shear loading." },
            { icon: "🏭", title: "Manufacturing",           color: "orange", desc: "Press-fit, forming, and cutting operations require stress analysis to prevent tool or workpiece failure." },
            { icon: "✈️", title: "Aerospace",               color: "red",    desc: "Aircraft components operate under extreme stress cycles. Precise calculations are critical for safety and weight optimization." },
            { icon: "🎓", title: "Engineering Education",   color: "gray",   desc: "Stress is a core concept in mechanics of materials, taught in every mechanical and civil engineering curriculum." },
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
              q: "What is mechanical stress?",
              a: "Mechanical stress is the internal force per unit area within a material caused by an external load. It is measured in Pascals (Pa) or pounds per square inch (psi). Stress determines whether a material will deform or fail under load.",
            },
            {
              q: "What is the stress formula?",
              a: "The normal stress formula is σ = F / A, where σ is stress, F is the applied force in Newtons, and A is the cross-sectional area in square meters. The result is in Pascals (Pa).",
            },
            {
              q: "What is the difference between stress and strain?",
              a: "Stress is the force per unit area (σ = F/A), while strain is the deformation per unit length (ε = ΔL/L). They are related by Young's Modulus: E = σ / ε. Stress causes strain in elastic materials.",
            },
            {
              q: "What is a safe stress level for steel?",
              a: "Mild structural steel typically has a yield strength of 250–350 MPa. Design stress is usually kept below 60–70% of yield strength, so roughly 150–250 MPa for most structural applications. Always verify against the specific material specification.",
            },
            {
              q: "Is this calculator accurate for engineering use?",
              a: "Yes. The calculator uses exact conversion factors and IEEE 754 double-precision floating-point arithmetic. Results are accurate to the selected decimal precision. For safety-critical applications, always verify with a licensed engineer.",
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
