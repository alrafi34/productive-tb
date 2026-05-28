import React from "react";

export default function ForceCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Force Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Force Calculator</strong> is a physics tool that computes the net force acting on an
            object using Newton&apos;s Second Law of Motion. Force is the product of an object&apos;s mass and its
            acceleration — the fundamental relationship that governs all motion in classical mechanics.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard formula is <strong>F = m × a</strong>, where F is force in Newtons, m is mass in
            kilograms, and a is acceleration in meters per second squared. This calculator supports both
            metric (kg, g, metric ton, m/s²) and imperial (lb, ft/s²) unit systems, automatically converting
            all inputs to SI units before computing.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Results are displayed in Newtons (N), Kilonewtons (kN), and Pound-force (lbf) simultaneously,
            making it useful for students, engineers, and researchers working across different unit systems.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Force Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the mass value (e.g. 10)",
                "Select the mass unit — kg, g, lb, or metric ton",
                "Enter the acceleration value (e.g. 9.8)",
                "Select the acceleration unit — m/s² or ft/s²",
                "View the force result instantly in N, kN, and lbf",
                "Use presets for common physics scenarios",
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
                "Live formula display with your actual values",
                "Educational explanation with each result",
                "Unit conversion breakdown (N, kN, lbf)",
                "Calculation history with localStorage persistence",
                "Export results as a TXT file",
                "Quick presets for common physics scenarios",
                "Supports negative acceleration (deceleration)",
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
          Newton&apos;s Second Law Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">The Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                F = m × a
              </div>
              <p className="text-sm text-gray-600">
                Force equals mass multiplied by acceleration. Doubling the mass doubles the force for the
                same acceleration. Doubling the acceleration also doubles the force for the same mass.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Negative Acceleration</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                F = m × (−a)
              </div>
              <p className="text-sm text-gray-600">
                Negative acceleration (deceleration) produces a negative force, meaning the force acts
                opposite to the direction of motion. This is common in braking and collision scenarios.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> 1 Newton is defined as the force required to accelerate a 1 kg
            mass at 1 m/s². Earth&apos;s gravity accelerates objects at 9.8 m/s², so a 1 kg object weighs
            approximately 9.8 N.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Mass</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acceleration</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Force</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Scenario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10 kg",    "5 m/s²",   "50 N",      "Physics example"],
                ["1,200 kg", "3 m/s²",   "3,600 N",   "Car accelerating"],
                ["0.5 kg",   "9.8 m/s²", "4.9 N",     "Object falling"],
                ["500 kg",   "30 m/s²",  "15,000 N",  "Rocket launch"],
                ["70 kg",    "9.8 m/s²", "686 N",     "Human body weight"],
                ["5,000 kg", "2 m/s²",   "10,000 N",  "Truck acceleration"],
              ].map(([mass, accel, force, scenario]) => (
                <tr key={mass + accel} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{mass}</td>
                  <td className="py-3 px-4 font-mono">{accel}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{force}</td>
                  <td className="py-3 px-4 text-gray-500">{scenario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          N vs lbf: Unit Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Newtons (N)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Kilonewtons (kN)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Pound-force (lbf)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1",       "0.001",  "0.2248"],
                ["10",      "0.01",   "2.248"],
                ["100",     "0.1",    "22.48"],
                ["1,000",   "1",      "224.8"],
                ["10,000",  "10",     "2,248"],
              ].map(([n, kn, lbf]) => (
                <tr key={n} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{n}</td>
                  <td className="py-3 px-4 font-mono">{kn}</td>
                  <td className="py-3 px-4 font-mono">{lbf}</td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={3} className="py-3 px-4 text-blue-800 font-medium">1 lbf = 4.44822 N</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications of Force
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🎓", title: "Physics Education",    color: "blue",   desc: "F = ma is one of the most fundamental equations in classical mechanics, taught in every physics curriculum worldwide." },
            { icon: "🚗", title: "Automotive Engineering", color: "green", desc: "Engine force calculations determine acceleration performance. Braking force analysis ensures safe stopping distances." },
            { icon: "🚀", title: "Aerospace",            color: "purple", desc: "Rocket thrust calculations use F = ma to determine the force needed to accelerate a spacecraft against gravity." },
            { icon: "🏗️", title: "Structural Engineering", color: "orange", desc: "Load analysis on beams, columns, and foundations relies on force calculations to ensure structural integrity." },
            { icon: "🤖", title: "Robotics",             color: "red",    desc: "Motor selection for robotic joints requires calculating the force needed to move a given mass at a target acceleration." },
            { icon: "⚙️", title: "Mechanical Design",   color: "gray",   desc: "Component sizing, fastener selection, and material stress analysis all begin with accurate force calculations." },
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
              q: "What is Newton's Second Law of Motion?",
              a: "Newton's Second Law states that the net force acting on an object equals the product of its mass and acceleration: F = ma. It means that a larger force produces greater acceleration, and a heavier object requires more force to achieve the same acceleration.",
            },
            {
              q: "What is a Newton (N)?",
              a: "A Newton is the SI unit of force. It is defined as the force required to accelerate a 1 kilogram mass at 1 meter per second squared. 1 N = 1 kg·m/s². In everyday terms, a medium apple weighs approximately 1 Newton.",
            },
            {
              q: "Can acceleration be negative?",
              a: "Yes. Negative acceleration (deceleration) means the object is slowing down. The resulting force will also be negative, indicating it acts in the opposite direction to motion. This is common in braking, air resistance, and collision scenarios.",
            },
            {
              q: "What is the difference between mass and weight?",
              a: "Mass is the amount of matter in an object (measured in kg) and does not change with location. Weight is the force of gravity acting on that mass (measured in N). Weight = mass × gravitational acceleration (9.8 m/s² on Earth).",
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
