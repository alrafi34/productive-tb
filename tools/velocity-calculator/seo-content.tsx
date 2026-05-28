import React from "react";

export default function VelocityCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Velocity Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Velocity Calculator</strong> is a physics tool that computes the rate of change of
            position of an object — how fast it moves in a specific direction. Velocity is a vector quantity,
            meaning it has both magnitude (speed) and direction.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The fundamental formula is <strong>v = d ÷ t</strong>, where v is velocity, d is displacement,
            and t is time. This calculator converts all inputs to SI base units (meters and seconds) before
            computing, then outputs results in m/s, km/h, mph, ft/s, and knots simultaneously.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you are a student solving physics problems, an engineer analyzing motion, or a sports
            analyst measuring performance, this tool delivers instant, accurate results across all common
            unit systems.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Velocity Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the displacement value (e.g. 100)",
                "Select the displacement unit — mm, cm, m, km, in, ft, yd, or mi",
                "Enter the time value (e.g. 10)",
                "Select the time unit — ms, s, min, or h",
                "View the velocity result instantly in all units",
                "Copy, save, or export the result as needed",
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
                "8 displacement units — metric and imperial",
                "4 time units — ms, s, min, h",
                "5 simultaneous output units — m/s, km/h, mph, ft/s, knots",
                "Step-by-step calculation breakdown",
                "Live formula display with your actual values",
                "Shareable URL with query parameters",
                "Calculation history with localStorage persistence",
                "Export results as a TXT file",
                "Quick presets for common scenarios",
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
          Velocity Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Basic Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                v = d ÷ t
              </div>
              <p className="text-sm text-gray-600">
                Velocity equals displacement divided by time. This gives the average velocity over the
                entire time interval. The SI unit is meters per second (m/s).
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Variable Definitions</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex gap-3">
                  <span className="font-mono font-bold text-primary w-4">v</span>
                  <span>Velocity — rate of change of position (m/s)</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono font-bold text-primary w-4">d</span>
                  <span>Displacement — change in position (m)</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono font-bold text-primary w-4">t</span>
                  <span>Time — duration of motion (s)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Speed vs Velocity:</strong> Speed is a scalar (magnitude only), while velocity is a
            vector (magnitude + direction). This calculator computes the magnitude of average velocity,
            which equals average speed when motion is in one direction.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Displacement</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Velocity (m/s)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Velocity (km/h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["100 m",   "10 s",    "10 m/s",    "36 km/h"],
                ["240 km",  "2 h",     "33.33 m/s", "120 km/h"],
                ["5 mi",    "30 min",  "4.47 m/s",  "16.09 km/h"],
                ["1,500 m", "5 min",   "5 m/s",     "18 km/h"],
                ["100 ft",  "2 s",     "15.24 m/s", "54.86 km/h"],
                ["1 km",    "1 min",   "16.67 m/s", "60 km/h"],
              ].map(([d, t, ms, kmh]) => (
                <tr key={d + t} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{d}</td>
                  <td className="py-3 px-4 font-mono">{t}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{ms}</td>
                  <td className="py-3 px-4 font-mono">{kmh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Velocity Unit Conversion Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">m/s</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">km/h</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">mph</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">ft/s</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">knots</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1",    "3.6",    "2.237",  "3.281",  "1.944"],
                ["5",    "18",     "11.18",  "16.40",  "9.72"],
                ["10",   "36",     "22.37",  "32.81",  "19.44"],
                ["30",   "108",    "67.11",  "98.43",  "58.32"],
                ["100",  "360",    "223.69", "328.08", "194.38"],
              ].map(([ms, kmh, mph, fts, kn]) => (
                <tr key={ms} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{ms}</td>
                  <td className="py-3 px-4 font-mono">{kmh}</td>
                  <td className="py-3 px-4 font-mono">{mph}</td>
                  <td className="py-3 px-4 font-mono">{fts}</td>
                  <td className="py-3 px-4 font-mono">{kn}</td>
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
            { icon: "🎓", title: "Physics Education",   color: "blue",   desc: "Solve kinematics problems involving displacement, time, and velocity for high school and university physics." },
            { icon: "🚗", title: "Automotive",          color: "green",  desc: "Calculate average vehicle speed from distance traveled and trip duration for fuel efficiency analysis." },
            { icon: "✈️", title: "Aviation",            color: "purple", desc: "Compute aircraft ground speed in knots from distance and flight time for navigation planning." },
            { icon: "🏃", title: "Sports & Athletics",  color: "orange", desc: "Measure runner or swimmer speed from race distance and finish time to track performance." },
            { icon: "🚀", title: "Aerospace",           color: "red",    desc: "Calculate spacecraft or projectile velocity from trajectory data for mission planning." },
            { icon: "⚙️", title: "Mechanical Engineering", color: "gray", desc: "Determine conveyor belt or machine component speed from displacement and cycle time." },
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
              q: "What is the difference between velocity and speed?",
              a: "Speed is a scalar quantity — it only has magnitude (e.g. 60 km/h). Velocity is a vector quantity — it has both magnitude and direction (e.g. 60 km/h north). This calculator computes the magnitude of average velocity, which equals average speed when motion is in a straight line.",
            },
            {
              q: "What is the velocity formula?",
              a: "The basic velocity formula is v = d ÷ t, where v is velocity, d is displacement (change in position), and t is time elapsed. The SI unit for velocity is meters per second (m/s).",
            },
            {
              q: "Why can't time be zero?",
              a: "Division by zero is mathematically undefined. If time equals zero, the formula v = d ÷ t has no valid result. In physics, instantaneous velocity at a single point in time requires calculus (the derivative of position with respect to time).",
            },
            {
              q: "Can displacement be negative?",
              a: "Yes. Negative displacement means the object moved in the opposite direction from the reference point. A negative velocity result indicates motion in the negative direction. This calculator supports negative displacement values.",
            },
            {
              q: "How do I convert m/s to km/h?",
              a: "Multiply m/s by 3.6 to get km/h. For example, 10 m/s × 3.6 = 36 km/h. This calculator performs all unit conversions automatically and displays results in m/s, km/h, mph, ft/s, and knots simultaneously.",
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
