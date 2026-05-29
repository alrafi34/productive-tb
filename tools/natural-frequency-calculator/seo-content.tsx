import React from "react";

export default function NaturalFrequencySEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Natural Frequency Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Natural Frequency Calculator</strong> is a mechanical engineering tool that computes
            the frequency at which a system oscillates when disturbed from equilibrium without external
            forcing or damping. This is called the <strong>natural frequency</strong> or resonant frequency.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports four common mechanical models: the <strong>spring-mass system</strong>
            (f = (1/2π)√(k/m)), the <strong>simple pendulum</strong> (f = (1/2π)√(g/L)), the
            <strong> simply supported beam</strong> (first bending mode), and the <strong>torsional system</strong>
            (f = (1/2π)√(kₜ/J)). All inputs are automatically converted to SI units before calculation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Results include natural frequency in Hz, angular frequency in rad/s, and period in seconds —
            with a full step-by-step breakdown of each calculation.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Natural Frequency Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the mechanical system type (spring-mass, pendulum, beam, or torsional)",
                "Enter the required parameters for the selected system",
                "Choose appropriate units for each input",
                "View the natural frequency result instantly in Hz",
                "Check angular frequency (rad/s) and period (s) in the results table",
                "Expand the step-by-step panel to see the full calculation",
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
                "Four mechanical system models",
                "Multi-unit support — metric and imperial",
                "Angular frequency and period output",
                "Step-by-step calculation breakdown",
                "Quick presets for common scenarios",
                "Calculation history with localStorage",
                "Export results as TXT file",
                "Copy result to clipboard",
                "Precision control (2–8 decimal places)",
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
          Natural Frequency Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Spring-Mass System</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                f = (1 / 2π) × √(k / m)
              </div>
              <p className="text-sm text-gray-600">
                The most fundamental vibration model. A mass m attached to a spring with stiffness k
                oscillates at a frequency determined by the ratio k/m. Stiffer springs or lighter masses
                produce higher natural frequencies.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Simple Pendulum</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                f = (1 / 2π) × √(g / L)
              </div>
              <p className="text-sm text-gray-600">
                A pendulum of length L swings at a frequency governed by gravity g and length alone —
                independent of mass. Longer pendulums swing more slowly. Valid for small angles (&lt;15°).
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Simply Supported Beam</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                f = (π² / 2πL²) × √(EI / ρA)
              </div>
              <p className="text-sm text-gray-600">
                First bending mode of a simply supported beam. E is Young&apos;s modulus, I is the second
                moment of area, ρ is density, and A is cross-section area. Longer or heavier beams
                have lower natural frequencies.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Torsional System</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                f = (1 / 2π) × √(kₜ / J)
              </div>
              <p className="text-sm text-gray-600">
                Analogous to the spring-mass system but for rotational motion. kₜ is torsional stiffness
                (N·m/rad) and J is the mass moment of inertia (kg·m²). Used in shaft and rotor design.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Relationship:</strong> Angular frequency ω = 2π × f (rad/s). Period T = 1/f (seconds).
            These three quantities are interchangeable — knowing one gives you all three.
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">System</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Inputs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">f (Hz)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">ω (rad/s)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Spring-Mass", "m=10 kg, k=1000 N/m",    "1.59",  "10.00"],
                ["Spring-Mass", "m=50 kg, k=5000 N/m",    "1.59",  "10.00"],
                ["Spring-Mass", "m=1500 kg, k=25000 N/m", "0.65",  "4.08"],
                ["Pendulum",    "L=1 m",                  "0.50",  "3.13"],
                ["Pendulum",    "L=2 m",                  "0.35",  "2.21"],
                ["Pendulum",    "L=0.994 m (clock)",      "0.50",  "3.14"],
              ].map(([sys, inp, hz, rad]) => (
                <tr key={sys + inp} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{sys}</td>
                  <td className="py-3 px-4 font-mono text-xs">{inp}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{hz} Hz</td>
                  <td className="py-3 px-4 font-mono">{rad} rad/s</td>
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
            { icon: "🚗", title: "Automotive Engineering",  color: "blue",   desc: "Suspension systems are tuned to avoid resonance with road inputs. Natural frequency analysis prevents uncomfortable vibrations and structural fatigue." },
            { icon: "🏗️", title: "Structural Engineering",  color: "green",  desc: "Buildings and bridges must have natural frequencies far from wind and seismic excitation frequencies to prevent resonance-induced collapse." },
            { icon: "⚙️", title: "Rotating Machinery",      color: "purple", desc: "Shafts, rotors, and turbines are designed so their operating speed avoids critical speeds where torsional or lateral resonance occurs." },
            { icon: "🎓", title: "Physics Education",       color: "orange", desc: "Spring-mass and pendulum systems are foundational examples in vibration theory, demonstrating SHM and the relationship between stiffness and frequency." },
            { icon: "🏭", title: "HVAC & Industrial",       color: "red",    desc: "Fans, compressors, and pumps generate vibrations. Natural frequency analysis ensures mounting structures don't amplify these vibrations." },
            { icon: "🤖", title: "Robotics & Mechatronics", color: "gray",   desc: "Robot arms and actuators have natural frequencies that affect control bandwidth. Engineers tune stiffness and inertia to achieve desired dynamic response." },
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
              q: "What is natural frequency?",
              a: "Natural frequency is the frequency at which a mechanical system oscillates when disturbed from equilibrium without any external forcing or damping. Every physical system has one or more natural frequencies determined by its mass and stiffness properties.",
            },
            {
              q: "What is the difference between natural frequency and resonance?",
              a: "Natural frequency is an intrinsic property of the system. Resonance occurs when an external periodic force is applied at or near the natural frequency, causing the amplitude of oscillation to grow dramatically. Avoiding resonance is a key goal in mechanical design.",
            },
            {
              q: "What is angular frequency and how does it relate to Hz?",
              a: "Angular frequency ω (rad/s) = 2π × f (Hz). It represents the rate of oscillation in radians per second rather than cycles per second. Both describe the same oscillation — ω is more convenient in mathematical analysis while Hz is more intuitive for practical use.",
            },
            {
              q: "Why does the pendulum formula not include mass?",
              a: "For a simple pendulum, the restoring force and the inertia both scale with mass, so mass cancels out. The natural frequency depends only on the pendulum length and gravitational acceleration. This is why all pendulums of the same length swing at the same rate regardless of their bob mass.",
            },
            {
              q: "What units does this calculator support?",
              a: "Spring-Mass: mass in kg/g/lb, spring constant in N/m, kN/m, lb/in. Pendulum: length in m, cm, ft, in. Beam: length in m/cm/ft/in, Young's modulus in GPa/MPa/psi, moment of inertia in m⁴/cm⁴/in⁴, density in kg/m³ or lb/ft³. Torsional: stiffness in N·m/rad or lb·in/rad, inertia in kg·m² or lb·in².",
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
