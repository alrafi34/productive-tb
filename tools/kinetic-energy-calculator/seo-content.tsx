import React from "react";

export default function KineticEnergyCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Kinetic Energy Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Kinetic Energy Calculator</strong> is a physics tool that computes the energy an object
            possesses due to its motion. Any object with mass that is moving has kinetic energy — from a
            baseball in flight to a car on the highway to a spacecraft in orbit.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard formula is <strong>KE = ½ × m × v²</strong>, where KE is kinetic energy in Joules,
            m is mass in kilograms, and v is velocity in meters per second. This calculator supports both
            metric (kg, g, metric ton, m/s, km/h) and imperial (lb, mph, ft/s) unit systems, automatically
            converting all inputs to SI units before computing.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Results are displayed in Joules (J), Kilojoules (kJ), Megajoules (MJ), Calories (cal), and
            Kilowatt-hours (kWh) simultaneously, making it useful for students, engineers, and researchers
            working across different energy unit systems.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Kinetic Energy Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the mass value (e.g. 10)",
                "Select the mass unit — kg, g, lb, or metric ton",
                "Enter the velocity value (e.g. 5)",
                "Select the velocity unit — m/s, km/h, mph, or ft/s",
                "View the kinetic energy result instantly in all units",
                "Use presets for common real-world objects",
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
                "Step-by-step calculation breakdown",
                "Unit conversion table (J, kJ, MJ, cal, kWh)",
                "Calculation history with localStorage persistence",
                "Export results as a TXT file",
                "Quick presets for baseball, car, bicycle, train",
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
          The Kinetic Energy Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Standard Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                KE = ½ × m × v²
              </div>
              <p className="text-sm text-gray-600">
                Kinetic energy is proportional to mass and to the square of velocity. A heavier object or a
                faster object carries more kinetic energy. Doubling mass doubles KE; doubling velocity
                quadruples KE.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Why Velocity is Squared</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                KE ∝ v²
              </div>
              <p className="text-sm text-gray-600">
                The v² relationship means kinetic energy grows much faster than speed. A car at 60 mph has
                four times the kinetic energy of the same car at 30 mph — not twice. This is why speed
                limits have such a large impact on crash severity.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> 1 Joule is the kinetic energy of a 2 kg object moving at 1 m/s.
            A 70 kg person walking at 1.4 m/s (typical walking speed) has about 69 Joules of kinetic energy.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Object</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Mass</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Velocity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Kinetic Energy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Physics example",  "10 kg",    "5 m/s",    "125 J"],
                ["Baseball pitch",   "0.145 kg", "40 m/s",   "116 J"],
                ["Car at 60 mph",    "1,500 kg", "26.8 m/s", "539,460 J"],
                ["Bicycle + rider",  "90 kg",    "6.7 m/s",  "2,021 J"],
                ["Freight train",    "50,000 kg","26.8 m/s", "17.9 MJ"],
                ["Person walking",   "70 kg",    "1.4 m/s",  "68.6 J"],
              ].map(([obj, mass, vel, ke]) => (
                <tr key={obj} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{obj}</td>
                  <td className="py-3 px-4 font-mono">{mass}</td>
                  <td className="py-3 px-4 font-mono">{vel}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{ke}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Energy Unit Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Joules (J)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Kilojoules (kJ)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Calories (cal)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">kWh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1",         "0.001",    "0.239",    "2.78 × 10⁻⁷"],
                ["100",       "0.1",      "23.9",     "2.78 × 10⁻⁵"],
                ["1,000",     "1",        "239",      "0.000278"],
                ["3,600,000", "3,600",    "860,421",  "1"],
              ].map(([j, kj, cal, kwh]) => (
                <tr key={j} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{j}</td>
                  <td className="py-3 px-4 font-mono">{kj}</td>
                  <td className="py-3 px-4 font-mono">{cal}</td>
                  <td className="py-3 px-4 font-mono">{kwh}</td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={4} className="py-3 px-4 text-blue-800 font-medium">1 kWh = 3,600,000 J &nbsp;|&nbsp; 1 cal = 4.184 J</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications of Kinetic Energy
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🎓", title: "Physics Education",    color: "blue",   desc: "KE = ½mv² is a core concept in classical mechanics, taught in every high school and university physics course." },
            { icon: "🚗", title: "Automotive Safety",    color: "green",  desc: "Crash energy analysis uses kinetic energy to design crumple zones, airbags, and safety ratings for vehicles." },
            { icon: "🚀", title: "Aerospace",            color: "purple", desc: "Orbital mechanics and re-entry calculations rely on kinetic energy to determine heat shielding requirements." },
            { icon: "⚽", title: "Sports Science",       color: "orange", desc: "Ball impact energy, athlete performance, and equipment design all involve kinetic energy calculations." },
            { icon: "🏗️", title: "Structural Engineering", color: "red",  desc: "Impact loads on structures — from wind to vehicle collisions — are analyzed using kinetic energy principles." },
            { icon: "⚡", title: "Energy Storage",       color: "gray",   desc: "Flywheel energy storage systems store kinetic energy mechanically, used in power grids and regenerative braking." },
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
              q: "What is kinetic energy?",
              a: "Kinetic energy is the energy an object possesses due to its motion. Any object with mass that is moving has kinetic energy. The faster it moves or the heavier it is, the more kinetic energy it has. The SI unit is the Joule (J).",
            },
            {
              q: "What is the kinetic energy formula?",
              a: "KE = ½ × m × v², where KE is kinetic energy in Joules, m is mass in kilograms, and v is velocity in meters per second. The ½ factor comes from the derivation of the work-energy theorem in classical mechanics.",
            },
            {
              q: "Why does kinetic energy use v² instead of v?",
              a: "Because kinetic energy is derived from the work done to accelerate an object from rest. The integration of force over distance (work = F × d) with Newton's second law yields the v² relationship. This means doubling speed quadruples kinetic energy.",
            },
            {
              q: "What is the difference between kinetic and potential energy?",
              a: "Kinetic energy is energy of motion (KE = ½mv²). Potential energy is stored energy due to position or configuration — for example, gravitational potential energy (PE = mgh). Together they form the total mechanical energy of a system.",
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
