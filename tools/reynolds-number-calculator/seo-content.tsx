import React from "react";

export default function ReynoldsNumberCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is the Reynolds Number?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>Reynolds Number (Re)</strong> is a dimensionless quantity used in fluid mechanics to
            predict the flow regime of a fluid. It represents the ratio of inertial forces to viscous forces
            and determines whether a fluid flow will be laminar, transitional, or turbulent.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The formula is <strong>Re = (ρ × V × D) / μ</strong>, where ρ is fluid density, V is flow
            velocity, D is the characteristic length (pipe diameter), and μ is dynamic viscosity. All inputs
            are automatically converted to SI units before calculation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Named after Osborne Reynolds who published his findings in 1883, this number is one of the most
            fundamental parameters in fluid dynamics and is used across mechanical, civil, chemical, and
            aerospace engineering.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Reynolds Number Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the fluid velocity (e.g. 2 m/s)",
                "Select the velocity unit — m/s, ft/s, or cm/s",
                "Enter the pipe diameter or characteristic length",
                "Select the diameter unit — m, cm, mm, in, or ft",
                "Enter the fluid density (e.g. 998 for water)",
                "Enter the dynamic viscosity (e.g. 1.002 cP for water)",
                "View the Reynolds Number and flow regime instantly",
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
                "Automatic SI unit conversion",
                "Visual flow regime indicator bar",
                "Fluid presets: Water, Air, Engine Oil, Seawater",
                "Auto-detection of fluid type from inputs",
                "Calculation history with localStorage",
                "Export results as TXT file",
                "Formula substitution breakdown",
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
          Flow Regime Classification
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
            <div className="font-semibold text-green-800 mb-2">Laminar Flow (Re &lt; 2,300)</div>
            <p className="text-sm text-green-700">
              Fluid moves in smooth, parallel layers. No mixing between layers. Viscous forces dominate.
              Common in slow-moving, high-viscosity fluids like oil in narrow pipes.
            </p>
          </div>
          <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="font-semibold text-yellow-800 mb-2">Transitional Flow (2,300–4,000)</div>
            <p className="text-sm text-yellow-700">
              Flow alternates between laminar and turbulent. Behavior is unpredictable. Engineers typically
              design systems to avoid this regime due to instability.
            </p>
          </div>
          <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
            <div className="font-semibold text-red-800 mb-2">Turbulent Flow (Re &gt; 4,000)</div>
            <p className="text-sm text-red-700">
              Chaotic, irregular flow with strong mixing. Inertial forces dominate. Most industrial pipe
              flows are turbulent. Higher pressure drop but better heat and mass transfer.
            </p>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Velocity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Diameter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Fluid</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Re</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Regime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["2 m/s",    "0.05 m",  "Water",      "100,000",  "Turbulent"],
                ["0.05 m/s", "0.005 m", "Water",      "25",       "Laminar"],
                ["0.4 m/s",  "0.02 m",  "Water",      "≈ 1,597",  "Laminar"],
                ["5 m/s",    "0.1 m",   "Air",        "≈ 33,200", "Turbulent"],
                ["0.01 m/s", "0.01 m",  "Engine Oil", "≈ 1.2",    "Laminar"],
                ["3 m/s",    "0.08 m",  "Seawater",   "≈ 228,000","Turbulent"],
              ].map(([v, d, fluid, re, regime]) => (
                <tr key={v + d} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{v}</td>
                  <td className="py-3 px-4 font-mono">{d}</td>
                  <td className="py-3 px-4">{fluid}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{re}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      regime === "Laminar"   ? "bg-green-100 text-green-700" :
                      regime === "Transitional" ? "bg-yellow-100 text-yellow-700" :
                                                  "bg-red-100 text-red-700"
                    }`}>{regime}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Fluid Properties Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Fluid</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Density (kg/m³)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Viscosity (cP)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Temperature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Water",       "998",   "1.002",  "20°C"],
                ["Air",         "1.204", "0.0181", "20°C"],
                ["Engine Oil",  "876",   "74",     "40°C"],
                ["Seawater",    "1025",  "1.08",   "20°C"],
                ["Glycerin",    "1261",  "1490",   "20°C"],
                ["Mercury",     "13,546","1.526",  "20°C"],
              ].map(([fluid, rho, mu, temp]) => (
                <tr key={fluid} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{fluid}</td>
                  <td className="py-3 px-4 font-mono">{rho}</td>
                  <td className="py-3 px-4 font-mono">{mu}</td>
                  <td className="py-3 px-4 text-gray-500">{temp}</td>
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
            { icon: "🔧", title: "Pipe Flow Design",     color: "blue",   desc: "Engineers use Re to size pipes and predict pressure drop in water supply, oil, and gas systems." },
            { icon: "🌬️", title: "HVAC Systems",         color: "green",  desc: "Duct sizing and airflow analysis rely on Reynolds Number to ensure efficient ventilation." },
            { icon: "✈️", title: "Aerospace",            color: "purple", desc: "Wing and fuselage design depends on Re to predict boundary layer behavior and drag." },
            { icon: "⚗️", title: "Chemical Processing",  color: "orange", desc: "Reactor and heat exchanger design uses Re to optimize mixing and heat transfer rates." },
            { icon: "🚗", title: "Automotive",           color: "red",    desc: "Cooling system and fuel injection design use Re to ensure proper fluid behavior." },
            { icon: "🎓", title: "Education",            color: "gray",   desc: "Reynolds Number is a core concept in fluid mechanics courses at engineering universities worldwide." },
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
              q: "What is the Reynolds Number formula?",
              a: "Re = (ρ × V × D) / μ, where ρ is fluid density (kg/m³), V is velocity (m/s), D is the characteristic length or pipe diameter (m), and μ is dynamic viscosity (Pa·s).",
            },
            {
              q: "What Reynolds Number indicates turbulent flow?",
              a: "For pipe flow, Re > 4,000 indicates turbulent flow. Between 2,300 and 4,000 is transitional, and below 2,300 is laminar. These thresholds may differ for external flows.",
            },
            {
              q: "What is the difference between dynamic and kinematic viscosity?",
              a: "Dynamic viscosity (μ) measures a fluid's resistance to flow in Pa·s or cP. Kinematic viscosity (ν) is dynamic viscosity divided by density (ν = μ/ρ) in m²/s. This calculator uses dynamic viscosity.",
            },
            {
              q: "Why is Reynolds Number dimensionless?",
              a: "Because the units of ρ (kg/m³), V (m/s), D (m), and μ (kg/m·s) cancel out completely: (kg/m³ × m/s × m) / (kg/m·s) = 1. This makes Re universally applicable regardless of unit system.",
            },
            {
              q: "Can I use this calculator for non-circular pipes?",
              a: "Yes. For non-circular cross-sections, use the hydraulic diameter (D_h = 4A/P, where A is cross-sectional area and P is wetted perimeter) as the characteristic length input.",
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
