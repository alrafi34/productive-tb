import React from "react";

export default function MomentumCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Momentum Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Momentum Calculator</strong> is a physics tool that computes the linear momentum of a
            moving object using its mass and velocity. Momentum is one of the most fundamental quantities in
            classical mechanics — it describes the quantity of motion an object carries and plays a central
            role in Newton's laws, collision analysis, and conservation principles.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The formula is <strong>p = m × v</strong>, where p is momentum in kg·m/s (the SI unit), m is
            mass in kilograms, and v is velocity in meters per second. This calculator supports both metric
            (kg, g, mg, m/s, km/h) and US customary (lb, mph, ft/s) unit systems, automatically converting
            all inputs to SI before computing.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Unlike kinetic energy, momentum is a <strong>vector quantity</strong> — it has both magnitude
            and direction. A negative velocity input produces negative momentum, correctly representing
            motion in the opposite direction. This makes the calculator suitable for collision studies,
            impulse analysis, and sports science applications.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Momentum Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the mass value (e.g. 1500 for a car)",
                "Select the mass unit — kg, g, mg, or lb",
                "Enter the velocity value (negative for reverse direction)",
                "Select the velocity unit — m/s, km/h, mph, or ft/s",
                "View the momentum result instantly in all units",
                "Use presets for common real-world scenarios",
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
                "Multi-unit support — metric and US customary",
                "Negative velocity support for direction-aware results",
                "Live formula display with your actual values",
                "Step-by-step calculation breakdown",
                "Unit conversion table (kg·m/s, g·m/s, lb·ft/s)",
                "Calculation history with localStorage persistence",
                "Export results as a TXT file",
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
          The Momentum Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Standard Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                p = m × v
              </div>
              <p className="text-sm text-gray-600">
                Momentum is directly proportional to both mass and velocity. Doubling either the mass or
                the velocity doubles the momentum. This linear relationship makes momentum easier to work
                with than kinetic energy in collision problems.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Conservation of Momentum</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                p₁ + p₂ = p₁′ + p₂′
              </div>
              <p className="text-sm text-gray-600">
                In a closed system with no external forces, total momentum is conserved. This principle
                governs all collisions — elastic, inelastic, and perfectly inelastic — and is one of the
                most powerful tools in physics problem solving.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> Momentum and impulse are related by J = Δp = F × Δt. A large
            force applied briefly (like a bat hitting a ball) or a small force applied for a long time
            can produce the same change in momentum.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Momentum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Physics example",  "10 kg",      "5 m/s",    "50 kg·m/s"],
                ["Baseball pitch",   "0.145 kg",   "40 m/s",   "5.8 kg·m/s"],
                ["Car at 20 m/s",    "1,500 kg",   "20 m/s",   "30,000 kg·m/s"],
                ["Sprinter",         "80 kg",      "10 m/s",   "800 kg·m/s"],
                ["Freight train",    "50,000 kg",  "26.8 m/s", "1,340,000 kg·m/s"],
                ["Person walking",   "70 kg",      "1.4 m/s",  "98 kg·m/s"],
              ].map(([obj, mass, vel, p]) => (
                <tr key={obj} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{obj}</td>
                  <td className="py-3 px-4 font-mono">{mass}</td>
                  <td className="py-3 px-4 font-mono">{vel}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications of Momentum
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🎓", title: "Physics Education",    color: "blue",   desc: "p = mv is a core concept in classical mechanics, taught in every high school and university physics course alongside Newton's laws." },
            { icon: "🚗", title: "Automotive Safety",    color: "green",  desc: "Crash analysis uses momentum to design crumple zones and airbags. Higher momentum means more force needed to stop a vehicle." },
            { icon: "⚽", title: "Sports Science",       color: "orange", desc: "Ball impact, tackle force, and athlete performance analysis all rely on momentum calculations for training and equipment design." },
            { icon: "🚀", title: "Aerospace",            color: "purple", desc: "Rocket propulsion uses conservation of momentum — exhaust gases expelled backward push the rocket forward." },
            { icon: "🏗️", title: "Structural Engineering", color: "red",  desc: "Impact loads from vehicles, wind, and seismic events are analyzed using momentum and impulse principles." },
            { icon: "🔬", title: "Particle Physics",     color: "gray",   desc: "Momentum conservation governs particle collisions in accelerators, helping physicists discover new particles and forces." },
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
              q: "What is momentum in physics?",
              a: "Momentum is the product of an object's mass and velocity (p = m × v). It is a vector quantity — it has both magnitude and direction. The SI unit is kg·m/s. Momentum describes how difficult it is to stop a moving object.",
            },
            {
              q: "What is the momentum formula?",
              a: "p = m × v, where p is momentum in kg·m/s, m is mass in kilograms, and v is velocity in meters per second. This calculator automatically converts any supported unit to SI before computing.",
            },
            {
              q: "What is the difference between momentum and kinetic energy?",
              a: "Momentum (p = mv) is a vector and grows linearly with velocity. Kinetic energy (KE = ½mv²) is a scalar and grows with the square of velocity. Both are conserved in elastic collisions, but only momentum is conserved in all collisions.",
            },
            {
              q: "Can momentum be negative?",
              a: "Yes. Momentum is a vector, so its sign indicates direction. If velocity is negative (object moving in the opposite direction), momentum is also negative. This is important in collision problems where objects move toward each other.",
            },
            {
              q: "What is conservation of momentum?",
              a: "In a closed system with no external forces, the total momentum before a collision equals the total momentum after. This law holds for all types of collisions and is one of the most fundamental principles in physics.",
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
