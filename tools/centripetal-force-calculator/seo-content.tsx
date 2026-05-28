import React from "react";

export default function CentripetalForceSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Centripetal Force Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Centripetal Force Calculator</strong> is a physics tool that computes the inward force
            required to keep an object moving along a circular path. Without this force, the object would
            travel in a straight line — centripetal force is what continuously redirects it toward the center.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The primary formula is <strong>F = mv² / r</strong>, where F is the centripetal force in Newtons,
            m is mass in kilograms, v is velocity in meters per second, and r is the radius of the circular
            path in meters. An alternative form using angular velocity is <strong>F = mrω²</strong>, where ω
            is angular velocity in radians per second.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports both formulas with full unit conversion for mass (kg, g, lb, metric ton),
            velocity (m/s, km/h, mph), and radius (m, cm, ft), making it useful for students, engineers,
            and researchers across different unit systems.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Centripetal Force Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the calculation method — velocity formula or angular velocity formula",
                "Enter the mass value and select the unit (kg, g, lb, or metric ton)",
                "Enter velocity (m/s, km/h, mph) or angular velocity (rad/s)",
                "Enter the radius of the circular path and select the unit",
                "View the centripetal force result instantly in N, kN, and lbf",
                "Use the step-by-step breakdown to understand the calculation",
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
                "Two formula modes — velocity and angular velocity",
                "Multi-unit support — metric and imperial",
                "Step-by-step calculation breakdown",
                "Live formula display with your actual values",
                "Unit conversion breakdown (N, kN, lbf)",
                "Calculation history with localStorage persistence",
                "Export results as a TXT file",
                "Quick presets for common scenarios",
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
          Centripetal Force Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Velocity Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                F = mv² / r
              </div>
              <p className="text-sm text-gray-600">
                Use this when you know the linear speed of the object. Velocity is squared, so doubling
                speed quadruples the required force. This is the most common form used in physics education.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Angular Velocity Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                F = mrω²
              </div>
              <p className="text-sm text-gray-600">
                Use this when you know the rotational speed in radians per second. Common in engineering
                applications involving motors, rotating machinery, and orbital mechanics.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Relationship between formulas:</strong> Since v = rω, substituting into F = mv²/r gives
            F = m(rω)²/r = mrω². Both formulas are equivalent — choose based on which input you have available.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Velocity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Radius</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Force</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Scenario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10 kg",    "5 m/s",   "2 m",   "125 N",      "Physics example"],
                ["1,500 kg", "20 m/s",  "50 m",  "12,000 N",   "Car turning"],
                ["80 kg",    "25 m/s",  "15 m",  "3,333 N",    "Roller coaster"],
                ["0.5 kg",   "—",       "1.5 m", "75 N",       "ω = 10 rad/s"],
                ["5,000 kg", "7,800 m/s","6,371 km","~9,800 N", "Orbital motion"],
              ].map(([mass, vel, rad, force, scenario]) => (
                <tr key={mass + vel} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{mass}</td>
                  <td className="py-3 px-4 font-mono">{vel}</td>
                  <td className="py-3 px-4 font-mono">{rad}</td>
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
          Real-World Applications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🎓", title: "Physics Education",      color: "blue",   desc: "F = mv²/r is a core formula in classical mechanics, taught in high school and university physics courses worldwide." },
            { icon: "🚗", title: "Vehicle Dynamics",       color: "green",  desc: "Engineers calculate centripetal force to design safe road curves, determine maximum cornering speeds, and size tires." },
            { icon: "🎢", title: "Roller Coaster Design",  color: "purple", desc: "Loop and curve radii are calculated to ensure riders experience safe g-forces while maintaining structural integrity." },
            { icon: "🚀", title: "Orbital Mechanics",      color: "orange", desc: "Satellites stay in orbit because gravity provides the centripetal force needed to maintain circular motion." },
            { icon: "⚙️", title: "Rotating Machinery",    color: "red",    desc: "Centrifuges, turbines, and motors require centripetal force analysis to prevent component failure at high RPM." },
            { icon: "✈️", title: "Aerospace Engineering", color: "gray",   desc: "Aircraft banking in turns and spacecraft trajectory calculations both rely on centripetal force principles." },
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
              q: "What is centripetal force?",
              a: "Centripetal force is the net inward force that keeps an object moving in a circular path. It always points toward the center of the circle. Without it, the object would move in a straight line (Newton's First Law). It is not a separate type of force — it can be provided by gravity, tension, friction, or a normal force depending on the scenario.",
            },
            {
              q: "What is the difference between centripetal and centrifugal force?",
              a: "Centripetal force is a real inward force that acts on the object. Centrifugal force is a fictitious outward force that appears in a rotating reference frame. In an inertial (non-rotating) frame, only centripetal force exists. The 'feeling of being pushed outward' in a turning car is actually your body's inertia resisting the centripetal acceleration.",
            },
            {
              q: "Why does velocity appear squared in the formula?",
              a: "Because both the rate of direction change and the speed itself increase with velocity. Doubling speed means the object covers twice the arc in the same time AND changes direction twice as fast — both effects double the required force, resulting in a squared relationship. This is why high-speed turns require dramatically more force.",
            },
            {
              q: "What happens if the centripetal force is removed?",
              a: "The object immediately moves in a straight line tangent to the circle at the point where the force was removed. This is why a ball on a string flies off tangentially when released, and why cars skid outward when they exceed the friction limit on a curve.",
            },
            {
              q: "Is this calculator accurate for engineering use?",
              a: "Yes. The calculator uses exact SI conversion factors and IEEE 754 double-precision arithmetic. Results are accurate to the selected decimal precision. For safety-critical applications such as structural design or vehicle dynamics, always verify with a licensed engineer.",
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
