import React from "react";

export default function AngularVelocitySEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is Angular Velocity?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Angular velocity</strong> (ω) is the rate at which an object rotates around an axis. It describes how fast the angular position changes over time and is the rotational equivalent of linear velocity in circular motion.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard SI unit is <strong>radians per second (rad/s)</strong>. Other common units include degrees per second (deg/s), revolutions per second (rev/s), and revolutions per minute (RPM). This calculator supports all five input methods — displacement, linear velocity, RPM, frequency, and period — and converts results across all output units instantly.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Angular velocity is fundamental to mechanical engineering, robotics, automotive design, electrical machinery, and physics education. Any rotating system — from electric motors to planetary orbits — is characterized by its angular velocity.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Angular Velocity Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select a formula mode from the dropdown (e.g. RPM Conversion)",
                "Enter the required input value(s) with appropriate units",
                "The angular velocity updates instantly in rad/s, deg/s, rev/s, and RPM",
                "Change the primary output unit in Settings to match your need",
                "Use presets to quickly load common engineering scenarios",
                "Click Copy Result or Export TXT to share or record your calculation",
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
                "5 formula modes — displacement, linear, RPM, frequency, period",
                "Real-time calculation as you type",
                "Instant unit conversion to all 4 output units",
                "Step-by-step calculation breakdown",
                "Live formula display with your actual values",
                "Calculation history with localStorage persistence",
                "Export results as a TXT file",
                "Quick presets for common engineering scenarios",
                "Selectable decimal precision (2–8 places)",
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
          Angular Velocity Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Formula 1: Displacement ÷ Time</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">ω = θ / t</div>
              <p className="text-sm text-gray-600">Direct definition of angular velocity. Divide total angle swept (converted to radians) by time elapsed (in seconds).</p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Formula 2: Linear Velocity ÷ Radius</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">ω = v / r</div>
              <p className="text-sm text-gray-600">Relates linear and angular motion. A point on a rotating body at radius r moves at linear speed v = ω × r.</p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Formula 3: RPM Conversion</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">ω = (2π × RPM) / 60</div>
              <p className="text-sm text-gray-600">Converts RPM to rad/s. One revolution = 2π radians. Divide by 60 to convert per-minute to per-second.</p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Formula 4: Frequency</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">ω = 2πf</div>
              <p className="text-sm text-gray-600">Converts frequency (Hz) to angular velocity. Each cycle is 2π radians, so multiply frequency by 2π.</p>
            </div>
          </div>
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Formula 5: Period Conversion</h3>
            <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">ω = 2π / T</div>
            <p className="text-sm text-gray-600">Converts period (time for one full rotation) to angular velocity. Period T is the reciprocal of frequency (T = 1/f).</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key relationship:</strong> All five formulas are mathematically equivalent — they just use different input quantities to reach the same result. Choose the one that matches your known values.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Input</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Result (rad/s)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">RPM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Displacement", "360° in 2 s", "π ≈ 3.14", "30"],
                ["Linear", "v = 20 m/s, r = 5 m", "4.00", "38.20"],
                ["RPM", "1200 RPM", "125.66", "1200"],
                ["Frequency", "60 Hz", "376.99", "3600"],
                ["Period", "T = 0.5 s", "12.57", "120"],
              ].map(([method, input, rads, rpm]) => (
                <tr key={method + input} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{method}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{input}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{rads}</td>
                  <td className="py-3 px-4 font-mono">{rpm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          RPM to rad/s Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">RPM</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">rad/s</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">deg/s</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">rev/s</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1",     "0.1047",  "6.0",    "0.0167"],
                ["60",    "6.2832",  "360",    "1.0"],
                ["120",   "12.566",  "720",    "2.0"],
                ["600",   "62.832",  "3,600",  "10.0"],
                ["1200",  "125.66",  "7,200",  "20.0"],
                ["3000",  "314.16",  "18,000", "50.0"],
                ["3600",  "376.99",  "21,600", "60.0"],
              ].map(([rpm, rads, degs, revs]) => (
                <tr key={rpm} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{rpm}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{rads}</td>
                  <td className="py-3 px-4 font-mono">{degs}</td>
                  <td className="py-3 px-4 font-mono">{revs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Conversion factor: 1 RPM = π/30 rad/s ≈ 0.10472 rad/s</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "⚙️", title: "Electric Motors",         color: "blue",   desc: "Motor nameplate RPM is converted to rad/s for control system design and torque calculations." },
            { icon: "🚗", title: "Automotive Engineering",   color: "green",  desc: "Engine crankshaft and wheel angular velocity are key to transmission and driveline design." },
            { icon: "🤖", title: "Robotics",                 color: "purple", desc: "Servo and stepper motor angular velocity determines joint speed and precision in robotic arms." },
            { icon: "🔬", title: "Physics Education",        color: "orange", desc: "Angular velocity is a core concept in rotational kinematics for high school and university physics." },
            { icon: "🌀", title: "Centrifuges",              color: "red",    desc: "Lab centrifuges operate at high RPM. Angular velocity determines centripetal force on samples." },
            { icon: "💡", title: "AC Generators",            color: "gray",   desc: "Power grid generators spin at 3600 RPM (60 Hz) or 3000 RPM (50 Hz) to produce AC electricity." },
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
              q: "What is angular velocity?",
              a: "Angular velocity (ω) is the rate of change of angular position of a rotating body. It tells you how fast something is spinning. The SI unit is rad/s. It differs from angular speed in that angular velocity is a vector quantity with a direction along the axis of rotation.",
            },
            {
              q: "How do I convert RPM to rad/s?",
              a: "Multiply RPM by π/30. For example, 1200 RPM × (π/30) = 125.66 rad/s. This is because one revolution = 2π radians, and one minute = 60 seconds, so the factor is 2π/60 = π/30 ≈ 0.10472.",
            },
            {
              q: "What is the difference between angular velocity and angular frequency?",
              a: "In many contexts they are the same (both equal ω = 2πf). Angular frequency is used in oscillation and wave physics, while angular velocity refers to the rotation of a rigid body. Both have units of rad/s.",
            },
            {
              q: "How is angular velocity related to linear velocity?",
              a: "v = ω × r, where v is linear velocity, ω is angular velocity, and r is the radius from the axis of rotation. A point farther from the center moves faster in a straight-line sense even though all points rotate at the same angular velocity.",
            },
            {
              q: "What is the period of rotation?",
              a: "The period T is the time for one complete rotation. T = 2π / ω = 1 / f. For a motor at 1200 RPM: T = 60/1200 = 0.05 seconds per revolution.",
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
