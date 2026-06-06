import React from "react";

export default function MachNumberCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Mach Number Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Mach Number Calculator</strong> is an aerospace and engineering tool that determines the
            ratio of an object&apos;s speed to the local speed of sound. Named after physicist Ernst Mach, the Mach
            number is a dimensionless quantity that characterizes the compressibility effects on objects traveling
            through a fluid — most commonly air.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The fundamental formula is <strong>M = v / a</strong>, where M is the Mach number, v is the object&apos;s
            speed, and a is the local speed of sound. The speed of sound itself depends on temperature and the
            medium: for dry air, <strong>a = √(γ × R × T)</strong>, where γ = 1.4, R = 287.05 J/(kg·K), and T
            is temperature in Kelvin.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports three modes — calculate Mach number, calculate speed from Mach, or calculate
            speed of sound — with multiple unit systems and medium options including dry air, helium, and hydrogen.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Mach Number Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select a calculation mode — Mach Number, Speed, or Speed of Sound",
                "Enter the object speed (Mode 1) or Mach number (Mode 2)",
                "Choose a speed unit: m/s, km/h, mph, ft/s, or knots",
                "Enter the ambient temperature and select °C, °F, or K",
                "Select the medium — Dry Air, Helium, Hydrogen, or Custom",
                "View instant results: Mach number, classification, and speed conversions",
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
                "Three calculation modes: Mach, Speed, and Speed of Sound",
                "Real-time calculation as you type",
                "5 speed units: m/s, km/h, mph, ft/s, knots",
                "3 temperature units: °C, °F, K",
                "Multiple mediums: Dry Air, Helium, Hydrogen, Custom",
                "Automatic Mach regime classification (Subsonic → Hypersonic)",
                "Visual Mach scale indicator",
                "Quick presets for real-world aircraft and speeds",
                "Calculation history with localStorage persistence",
                "Copy result and export to TXT",
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
          Mach Number Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="font-mono text-xl text-center bg-white border border-gray-200 rounded-lg p-4 mb-4">
              M = v / a &nbsp;&nbsp;&nbsp; where &nbsp;&nbsp;&nbsp; a = √(γ × R × T)
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { sym: "M",  color: "blue",   label: "Mach Number",     desc: "Dimensionless ratio of object speed to speed of sound" },
                { sym: "v",  color: "orange", label: "Object Speed",    desc: "Speed of the object through the medium in m/s" },
                { sym: "a",  color: "green",  label: "Speed of Sound",  desc: "Local speed of sound; depends on temperature and medium" },
                { sym: "T",  color: "purple", label: "Temperature (K)", desc: "Ambient temperature in Kelvin. Higher T → faster sound" },
              ].map(({ sym, color, label, desc }) => (
                <div key={sym} className={`p-3 bg-${color}-50 border border-${color}-200 rounded-lg text-center`}>
                  <div className={`font-mono text-lg font-bold text-${color}-800 mb-1`}>{sym}</div>
                  <div className={`font-semibold text-${color}-800 text-xs uppercase mb-1`}>{label}</div>
                  <div className={`text-${color}-700 text-xs`}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Temperature matters:</strong> The speed of sound in dry air is approximately
            331.3 + (0.606 × T°C) m/s. At 20°C it is ≈ 343 m/s; at −50°C it drops to ≈ 299 m/s.
            This is why aircraft at high altitude (colder air) reach Mach 1 at a lower true airspeed.
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Mach Number Classification
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Regime</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Mach Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Approx. Speed (20°C)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Subsonic",   "M &lt; 0.8",     "≤ 274 m/s / ≤ 987 km/h",  "Incompressible flow. Typical commercial airliners cruise at M 0.78–0.85."],
                ["Transonic",  "0.8 ≤ M ≤ 1.2", "274–412 m/s",             "Mixed subsonic and supersonic regions. Wave drag increases sharply."],
                ["Sonic",      "M = 1.0",        "≈ 343 m/s / ≈ 1,235 km/h","Exactly the speed of sound. A sonic boom forms at this point."],
                ["Supersonic", "1.2 ≤ M &lt; 5", "412–1,715 m/s",           "Shock waves and compressibility dominate. Military jets and concorde."],
                ["Hypersonic", "M ≥ 5",          "≥ 1,715 m/s / ≥ 6,174 km/h","Extreme aerodynamic heating. ICBMs, space re-entry vehicles, X-43A."],
              ].map(([regime, range, speed, desc]) => (
                <tr key={regime} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-800" dangerouslySetInnerHTML={{ __html: regime as string }} />
                  <td className="py-3 px-4 font-mono" dangerouslySetInnerHTML={{ __html: range as string }} />
                  <td className="py-3 px-4 font-mono text-xs">{speed}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Object</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Speed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Temperature</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Mach</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Regime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Boeing 737",      "250 m/s",   "11°C",   "~0.76",  "Subsonic"],
                ["Speed of Sound",  "343 m/s",   "20°C",   "1.00",   "Sonic"],
                ["F-15 Eagle",      "830 m/s",   "0°C",    "~2.50",  "Supersonic"],
                ["Concorde",        "600 m/s",   "-57°C",  "~2.04",  "Supersonic"],
                ["SR-71 Blackbird", "980 m/s",   "-50°C",  "~3.30",  "Supersonic"],
                ["Space Shuttle reentry", "6,500 m/s", "-50°C", "~21.8", "Hypersonic"],
              ].map(([obj, speed, temp, mach, regime]) => (
                <tr key={obj} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{obj}</td>
                  <td className="py-3 px-4 font-mono">{speed}</td>
                  <td className="py-3 px-4 font-mono">{temp}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{mach}</td>
                  <td className="py-3 px-4 text-gray-600">{regime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Applications of Mach Number
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "✈️", title: "Commercial Aviation",   color: "blue",   desc: "Airlines cruise at Mach 0.78–0.85 to balance speed and fuel efficiency. Exceeding the critical Mach number causes wave drag and buffeting." },
            { icon: "🛡️", title: "Military Aircraft",     color: "red",    desc: "Fighter jets and bombers operate at Mach 1.5–3.0. Understanding Mach number is critical for weapon deployment and avionics design." },
            { icon: "🚀", title: "Rocket & Space",        color: "purple", desc: "Launch vehicles exceed Mach 25 during ascent. Atmospheric reentry involves hypersonic speeds with extreme thermal loads." },
            { icon: "💨", title: "Wind Tunnel Testing",   color: "green",  desc: "Engineers test scale models at precise Mach numbers to measure drag, lift, and shock wave patterns before full-scale manufacture." },
            { icon: "🎓", title: "Physics Education",     color: "orange", desc: "Mach number is a core concept in compressible flow, aerodynamics, and gas dynamics. It bridges fluid mechanics and thermodynamics." },
            { icon: "🔬", title: "Gas Dynamics Research", color: "gray",   desc: "Scientists study shock wave formation, Prandtl–Meyer expansion, and oblique shocks — all governed by Mach number relationships." },
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
              q: "What is Mach number?",
              a: "Mach number is the ratio of an object's speed to the speed of sound in the surrounding medium. Mach 1 means the object travels at exactly the speed of sound (~343 m/s at 20°C in air). It is named after physicist Ernst Mach and is fundamental to aerospace engineering.",
            },
            {
              q: "Why does the speed of sound change with temperature?",
              a: "The speed of sound depends on the kinetic energy of air molecules, which increases with temperature. For dry air, the formula is a = √(γ × R × T), where T is in Kelvin. At higher temperatures, molecules move faster, so sound waves propagate more quickly. At 20°C, a ≈ 343 m/s; at −50°C, a ≈ 299 m/s.",
            },
            {
              q: "What is the difference between supersonic and hypersonic?",
              a: "Supersonic refers to speeds between Mach 1.2 and Mach 5, where shock waves form and compressibility effects dominate. Hypersonic (M > 5) involves much more extreme conditions — aerodynamic heating becomes severe, chemical reactions occur in the shock layer, and conventional aerodynamic theory breaks down.",
            },
            {
              q: "What is the transonic regime?",
              a: "The transonic regime (approximately Mach 0.8–1.2) is a transitional zone where parts of the airflow around an aircraft are subsonic while others are supersonic. This creates complex shock patterns and is the origin of the 'sound barrier' — a region of greatly increased drag and control difficulties.",
            },
            {
              q: "What medium should I use for aircraft calculations?",
              a: "Use Dry Air for almost all aircraft, rocket, and atmospheric flight calculations. The standard atmosphere assumes dry air with γ = 1.4 and R = 287.05 J/(kg·K). Helium and hydrogen are useful for laboratory nozzle flows, wind tunnel experiments, or specialized gas dynamics problems.",
            },
            {
              q: "Is this calculator accurate for engineering use?",
              a: "Yes. The calculator uses the exact thermodynamic formula a = √(γ × R × T) for all mediums, with precise unit conversions. For safety-critical applications such as aircraft design or rocket engineering, always verify with certified simulation software and consult a licensed aerospace engineer.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
