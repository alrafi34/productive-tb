import React from "react";

export default function TorqueCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Torque Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Torque Calculator</strong> is a mechanical engineering tool that computes the rotational
            force — or moment of force — applied around a pivot point. Torque is the product of force and the
            perpendicular distance from the axis of rotation to the line of action of the force.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard formula is <strong>τ = F × r</strong>, where τ is torque, F is the applied force,
            and r is the lever arm length. When the force is not perpendicular to the lever arm, the formula
            extends to <strong>τ = F × r × sin(θ)</strong>, where θ is the angle between the force vector
            and the lever arm.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports both metric (N, kN, m, cm, mm) and imperial (lbf, ft, in) unit systems,
            automatically converting all inputs to SI units before computing. Results are displayed in Nm,
            kNm, lb-ft, lb-in, and oz-in simultaneously.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Torque Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the force magnitude (e.g. 100)",
                "Select the force unit — Newton, Kilonewton, or Pound-force",
                "Enter the lever arm distance (e.g. 1)",
                "Select the distance unit — mm, cm, m, in, or ft",
                "Optionally enable angle correction and set the angle θ",
                "View the torque result instantly in all units",
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
                "Angle correction toggle for non-perpendicular forces",
                "Live formula display with your actual values",
                "Unit conversion breakdown table (Nm, kNm, lb-ft, lb-in, oz-in)",
                "Calculation history with localStorage persistence",
                "Export results as a TXT file",
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
          Torque Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Perpendicular Force (θ = 90°)</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                τ = F × r
              </div>
              <p className="text-sm text-gray-600">
                When force is applied perpendicular to the lever arm, sin(90°) = 1, so the formula simplifies
                to the product of force and distance. This gives maximum torque for a given force and distance.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Angled Force (θ ≠ 90°)</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                τ = F × r × sin(θ)
              </div>
              <p className="text-sm text-gray-600">
                When force is applied at an angle, only the perpendicular component contributes to rotation.
                At θ = 0° or 180°, torque is zero. At θ = 90°, torque is maximum.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> Doubling the lever arm length doubles the torque for the same force.
            This is why longer wrenches make it easier to loosen tight bolts — more torque with the same effort.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Distance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Angle</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Torque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["50 N",   "2 m",    "90°", "100 Nm"],
                ["25 lbf", "3 ft",   "90°", "75 lb-ft"],
                ["100 N",  "0.5 m",  "90°", "50 Nm"],
                ["80 N",   "2 m",    "45°", "113.14 Nm"],
                ["200 N",  "30 cm",  "90°", "60 Nm"],
                ["10 kN",  "1.5 m",  "90°", "15,000 Nm"],
              ].map(([force, dist, angle, torque]) => (
                <tr key={force + dist} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{force}</td>
                  <td className="py-3 px-4 font-mono">{dist}</td>
                  <td className="py-3 px-4 font-mono">{angle}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{torque}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Nm vs lb-ft: Unit Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Nm</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">kNm</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">lb-ft</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">lb-in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1",     "0.001",  "0.7376",  "8.851"],
                ["10",    "0.01",   "7.376",   "88.51"],
                ["100",   "0.1",    "73.76",   "885.1"],
                ["1,000", "1",      "737.6",   "8,851"],
                ["1 lb-ft = 1.356 Nm", "", "", ""],
              ].map(([nm, knm, lbft, lbin], i) => (
                i < 4 ? (
                  <tr key={nm} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono">{nm}</td>
                    <td className="py-3 px-4 font-mono">{knm}</td>
                    <td className="py-3 px-4 font-mono">{lbft}</td>
                    <td className="py-3 px-4 font-mono">{lbin}</td>
                  </tr>
                ) : (
                  <tr key="note" className="bg-blue-50">
                    <td colSpan={4} className="py-3 px-4 text-blue-800 font-medium">{nm}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications of Torque
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🔩", title: "Bolt Tightening",    color: "blue",   desc: "Torque wrenches ensure bolts are tightened to exact specifications to prevent loosening or stripping." },
            { icon: "🚗", title: "Automotive",         color: "green",  desc: "Engine torque determines acceleration. Wheel torque specs prevent over-tightening lug nuts." },
            { icon: "🤖", title: "Robotics",           color: "purple", desc: "Servo motors are rated in oz-in or Nm. Torque calculations ensure joints can handle required loads." },
            { icon: "⚙️", title: "Gear Systems",       color: "orange", desc: "Gear ratios amplify or reduce torque. Understanding input torque is essential for gear design." },
            { icon: "🏗️", title: "Structural Engineering", color: "red", desc: "Moment calculations in beams and columns rely on the same torque principles." },
            { icon: "🎓", title: "Physics Education",  color: "gray",   desc: "Torque is a fundamental concept in rotational mechanics, taught in high school and university physics." },
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
              q: "What is torque?",
              a: "Torque is the rotational equivalent of linear force. It measures how much a force causes an object to rotate around an axis. The SI unit is Newton-meter (Nm), and the US customary unit is pound-foot (lb-ft).",
            },
            {
              q: "What is the torque formula?",
              a: "For perpendicular force: τ = F × r. For angled force: τ = F × r × sin(θ). Where τ is torque, F is force, r is the lever arm distance, and θ is the angle between the force and lever arm.",
            },
            {
              q: "When should I use angle correction?",
              a: "Enable angle correction when the applied force is not perpendicular (90°) to the lever arm. For example, if you push a wrench at a 45° angle instead of straight down, the effective torque is reduced by sin(45°) ≈ 0.707.",
            },
            {
              q: "What is the difference between Nm and lb-ft?",
              a: "Both measure torque but in different unit systems. 1 lb-ft = 1.35582 Nm. Nm is the SI standard used globally in engineering, while lb-ft is common in the United States for automotive and mechanical applications.",
            },
            {
              q: "Is this calculator accurate for engineering use?",
              a: "Yes. The calculator uses exact conversion factors and IEEE 754 double-precision floating-point arithmetic. Results are accurate to the selected decimal precision. For critical applications, always verify with a licensed engineer.",
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
