import React from "react";

export default function PressureDropCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is Pressure Drop in Pipes?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Pressure drop</strong> (ΔP) is the reduction in fluid pressure as it flows through a pipe due to friction between the fluid and the pipe wall. It is one of the most critical parameters in piping system design, directly affecting pump sizing, energy consumption, and system performance.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator uses the <strong>Darcy–Weisbach equation</strong> — the most accurate and widely accepted method for calculating pipe friction losses. The formula is: <strong>ΔP = f × (L/D) × (ρv²/2)</strong>, where f is the Darcy friction factor, L is pipe length, D is diameter, ρ is fluid density, and v is flow velocity.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The friction factor is determined by the Reynolds number and pipe roughness. For laminar flow (Re &lt; 2,300), f = 64/Re. For turbulent flow (Re &gt; 4,000), the <strong>Swamee–Jain approximation</strong> of the Colebrook–White equation is used.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Pressure Drop Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select unit system: Metric (SI) or Imperial (US)",
                "Choose fluid type — Water, Air, Oil, Steam, or Custom",
                "Enter fluid temperature for automatic property estimation",
                "Enter pipe length and diameter",
                "Select pipe material (sets roughness automatically)",
                "Choose flow input: Flow Rate or Velocity",
                "Enter flow rate (L/s, m³/h, or GPM) or velocity (m/s)",
                "View pressure drop, Reynolds number, and flow regime instantly",
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
                "Metric and Imperial unit support",
                "Automatic fluid property estimation by temperature",
                "Pipe material roughness presets",
                "Flow regime detection (laminar/transitional/turbulent)",
                "Visual flow regime indicator bar",
                "Darcy–Weisbach with Swamee–Jain friction factor",
                "Calculation history with localStorage",
                "Export results as TXT report",
                "Shareable URL with encoded parameters",
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
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Length</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Diameter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Flow</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Fluid</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">ΔP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["30 m",   "25 mm", "2 L/s",  "Water", "≈ 7.4 kPa"],
                ["100 ft", "2 in",  "40 GPM", "Water", "≈ 2.8 psi"],
                ["50 m",   "50 mm", "5 L/s",  "Water", "≈ 3.1 kPa"],
                ["200 m",  "100 mm","20 L/s", "Water", "≈ 5.8 kPa"],
                ["30 m",   "25 mm", "1.8 m/s","Oil",   "≈ 12.4 kPa"],
              ].map(([len, dia, flow, fluid, dp]) => (
                <tr key={len + dia} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{len}</td>
                  <td className="py-3 px-4 font-mono">{dia}</td>
                  <td className="py-3 px-4 font-mono">{flow}</td>
                  <td className="py-3 px-4">{fluid}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{dp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Pipe Material Roughness Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Material</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Roughness ε (mm)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["PVC",       "0.0015", "Water supply, drainage, HVAC"],
                ["Steel",     "0.046",  "Industrial piping, oil & gas"],
                ["Copper",    "0.0015", "Plumbing, HVAC, refrigeration"],
                ["Concrete",  "0.3",    "Sewers, large water mains"],
                ["Cast Iron", "0.26",   "Water mains, drainage"],
                ["HDPE",      "0.0015", "Water supply, gas distribution"],
              ].map(([mat, rough, use]) => (
                <tr key={mat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{mat}</td>
                  <td className="py-3 px-4 font-mono">{rough}</td>
                  <td className="py-3 px-4 text-gray-600">{use}</td>
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
            { icon: "🌡️", title: "HVAC Systems",          color: "blue",   desc: "Size ductwork and chilled water pipes to ensure adequate flow with acceptable pressure loss." },
            { icon: "🔧", title: "Industrial Piping",      color: "green",  desc: "Design process piping for chemical plants, refineries, and manufacturing facilities." },
            { icon: "🏠", title: "Residential Plumbing",   color: "purple", desc: "Verify water pressure at fixtures and size supply lines for adequate flow." },
            { icon: "🚒", title: "Fire Protection",        color: "red",    desc: "Calculate sprinkler system pressure requirements to meet NFPA standards." },
            { icon: "⚙️", title: "Pump Selection",         color: "orange", desc: "Determine total dynamic head to select the correct pump for a system." },
            { icon: "🎓", title: "Engineering Education",  color: "gray",   desc: "Darcy–Weisbach is a core topic in fluid mechanics and hydraulics courses." },
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
              q: "What is the Darcy–Weisbach equation?",
              a: "ΔP = f × (L/D) × (ρv²/2), where ΔP is pressure drop (Pa), f is the Darcy friction factor (dimensionless), L is pipe length (m), D is pipe diameter (m), ρ is fluid density (kg/m³), and v is flow velocity (m/s).",
            },
            {
              q: "How is the friction factor calculated?",
              a: "For laminar flow (Re < 2,300), f = 64/Re. For turbulent flow (Re > 4,000), this calculator uses the Swamee–Jain approximation: f = 0.25 / [log₁₀(ε/3.7D + 5.74/Re⁰·⁹)]², which is accurate to within 3% of the Colebrook–White equation.",
            },
            {
              q: "Why does pipe diameter have such a large effect on pressure drop?",
              a: "Pressure drop is proportional to 1/D⁵ when flow rate is held constant (combining the L/D term with the velocity squared term). Halving the pipe diameter increases pressure drop by a factor of 32. This is why pipe sizing is critical in system design.",
            },
            {
              q: "What units does this calculator support?",
              a: "Metric (SI): pipe length in meters, diameter in mm, flow rate in L/s or m³/h. Imperial (US): pipe length in feet, diameter in inches, flow rate in GPM. Results are shown in kPa, bar, and psi.",
            },
            {
              q: "Does this calculator account for minor losses (fittings, valves)?",
              a: "No — this calculator computes major (friction) losses only, using the Darcy–Weisbach equation for straight pipe runs. Minor losses from fittings, bends, and valves require additional K-factor or equivalent length calculations.",
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
