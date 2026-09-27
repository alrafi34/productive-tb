import { transistorBiasCalculatorConfig } from "./config";
export default function TransistorBiasCalculatorSEO() {
  const faqItems = transistorBiasCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = transistorBiasCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Transistor Bias Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>transistor bias calculator</strong> is a free electronics tool that finds the DC
            operating point — the Q-point — of a bipolar junction transistor (BJT) circuit. It solves for
            base voltage, emitter voltage, collector voltage, collector-emitter voltage (Vce), and the base,
            collector, and emitter currents, then tells you whether the transistor sits in the active,
            saturation, or cutoff region. It answers the core question every BJT designer faces:{" "}
            <em>will this transistor bias correctly with the resistor values I've chosen?</em>
          </p>
          <p>
            Getting the bias point wrong is the single most common reason a hand-built amplifier stage
            distorts, clips, or fails to turn on at all. A Q-point pushed too close to Vcc clips the top of
            the signal in saturation; a Q-point too close to ground clips the bottom in cutoff. Solving the
            simultaneous voltage and current equations by hand is tedious and easy to get wrong — this
            calculator does it instantly for three real bias topologies.
          </p>
          <p>
            This <strong>BJT bias calculator</strong> is built for <strong>electronics students learning
            transistor theory, hobbyists building amplifier and switching circuits, circuit designers
            prototyping analog stages, and engineers verifying a bias network before committing it to a
            PCB</strong>. It supports voltage divider, fixed, and emitter bias, includes four built-in
            presets, saves your last 10 calculations, and runs entirely in your browser — free, with no
            signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Transistor Bias Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas by Bias Type</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Voltage Divider:</span> Vb = Vcc × R2 ÷ (R1 + R2) · Ve = Vb − Vbe · Ie = Ve ÷ Re · Ic ≈ Ie</p>
              <p><span className="font-semibold">Fixed Bias:</span> Ib = (Vcc − Vbe) ÷ Rb · Ic = β × Ib</p>
              <p><span className="font-semibold">Emitter Bias:</span> Ib = (Vcc − Vbe) ÷ (Rb + (β + 1) × Re)</p>
              <p className="text-gray-500 text-xs mt-2">All modes finish with Vc = Vcc − Ic × Rc and Vce = Vc − Ve</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Active region:</strong> the transistor amplifies linearly — reported whenever Ic ≥ 0.01 mA and Vce is above Vbe</li>
            <li><strong>Saturation:</strong> reported when Vce drops below Vbe — the transistor behaves like a closed switch and can no longer amplify</li>
            <li><strong>Cutoff:</strong> reported when Ic falls below 0.01 mA — essentially no current flows and the transistor behaves like an open switch</li>
            <li><strong>β (beta / hFE):</strong> the transistor's current gain, Ic ÷ Ib — voltage divider and emitter bias are designed to stay stable even when the real β differs from the datasheet typical</li>
            <li><strong>Vbe:</strong> the base-emitter forward voltage drop, typically 0.7V for silicon transistors and 0.3V for germanium</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Transistor Bias Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Tool Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time Q-point calculation as you type",
                "Voltage divider, fixed, and emitter bias modes",
                "4 built-in presets for common circuits",
                "Full step-by-step formula breakdown",
                "Active / saturation / cutoff region detection",
                "Calculation history (last 10 entries saved)",
                "Export results as a text report",
                "Copy result to clipboard",
                "100% browser-based — no data sent to a server",
                "No registration required",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Audio Pre-Amp Stage",
              scenario: "A hobbyist is designing a common-emitter pre-amp with Vcc = 12V, R1 = 10 kΩ, R2 = 5 kΩ, Rc = 1 kΩ, Re = 500Ω, and β = 100. The calculator returns Vb = 4V, Ve = 3.3V, Ic = 6.6 mA, Ib = 66 µA, and Vce = 2.1V — safely in the active region with headroom for a symmetrical AC swing.",
            },
            {
              title: "9V Battery-Powered Preamp",
              scenario: "An engineer sizing a portable, battery-driven mic preamp enters Vcc = 9V, R1 = 22 kΩ, R2 = 10 kΩ, Rc = 2.2 kΩ, Re = 1 kΩ, β = 150. The result is Vb = 2.81V, Ve = 2.11V, Ic = 2.11 mA, and Vce = 2.24V — a low-current design that extends 9V battery life while staying comfortably active.",
            },
            {
              title: "Breadboard Fixed-Bias Prototype",
              scenario: "An electronics student building a first single-transistor amplifier on a breadboard enters fixed bias with Vcc = 9V, Rb = 470 kΩ, Rc = 2.2 kΩ, β = 150. The calculator shows Ib = 17.66 µA, Ic = 2.65 mA, and Vce = 3.17V. Swapping in a different transistor with β = 100 instead of 150 would shift Ic to 1.77 mA — illustrating exactly why fixed bias is not used in production designs.",
            },
            {
              title: "Temperature-Stable Sensor Amplifier",
              scenario: "A circuit designer building an outdoor sensor amplifier that must stay stable across a wide temperature range chooses emitter bias with Vcc = 15V, Rb = 220 kΩ, Rc = 1 kΩ, Re = 470Ω, β = 100. The calculator returns Ib = 53.5 µA, Ic = 5.35 mA, Ve = 2.54V, and Vce = 7.12V — the emitter resistor's negative feedback keeps this point stable as β drifts with outdoor temperature swings.",
            },
            {
              title: "Relay Driver Switching Circuit",
              scenario: "A maker driving a 12V, 400Ω relay coil from a transistor switch enters fixed bias with Vcc = 12V, Rb = 39 kΩ, Rc = 400Ω, β = 100. The calculator returns Ic = 28.97 mA and Vce = 0.41V — below Vbe, so it correctly flags saturation, confirming the transistor is fully ON and switching the relay like a closed contact rather than amplifying.",
            },
            {
              title: "Verifying Beta Independence",
              scenario: "An engineering student compares two transistors from the same batch — one measuring β = 50, the other β = 300 — in the same voltage divider circuit (Vcc = 12V, R1 = 10 kΩ, R2 = 5 kΩ, Rc = 1 kΩ, Re = 500Ω). Both runs return the identical Ic = 6.6 mA and Vce = 2.1V; only Ib changes (132 µA vs 22 µA) — a hands-on demonstration of why voltage divider bias is the standard for production amplifiers.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "For voltage divider bias, keep the divider current at least 10 times your expected base current. If R1 and R2 are too large relative to β × Re, the base draws enough current to pull Vb down from the value the simple divider formula predicts, and the calculator's result will diverge from the real circuit.",
                "Design for Vce near Vcc / 2 when you need maximum symmetrical output swing before clipping. If Vce sits close to Vcc, the signal clips in cutoff first; if it sits close to 0, it clips in saturation first.",
                "Run the same resistor values through the calculator twice — once with β at the datasheet minimum and once at the maximum. If Ic and Vce barely move between the two runs, your bias network is stable. If they swing wildly, switch from fixed to voltage divider or emitter bias.",
                "For emitter bias, watch for the special case where Rb equals β × Rc — the math reduces to Vce ≈ Vbe almost regardless of Re, pinning the transistor right at the edge of saturation. Change Rb or Rc slightly to move away from this coincidence if you want more headroom.",
                "Use the built-in presets as calibration references before trusting your own numbers. Load 'Voltage Divider - Standard' and confirm you get Vce = 2.1V and Ic = 6.6mA — if your custom values produce wildly different currents for a similar-looking circuit, double check your resistor units.",
                "When designing a switch (not an amplifier), deliberately aim for a low or negative computed Vce. A result well below Vbe confirms the transistor will fully saturate and behave as a low-resistance closed switch under real load.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't use fixed bias for a linear amplifier you intend to mass-produce. Ic is directly proportional to β in this topology, and β can vary 2–3x between individual transistors of the same part number, so every unit built will have a different Q-point.",
                "Don't forget that Ic ≈ Ie is an approximation valid because β >> 1. For very low-β devices (β under 10, uncommon but possible with power transistors), the difference between Ic and Ie becomes significant and this simplification introduces meaningful error.",
                "Don't enter resistor values in the wrong units. Entering '10' when you mean 10 kΩ instead of 10Ω produces a base or collector current a thousand times too high, and the calculator will report cutoff or a nonsensical saturation result that has nothing to do with your real circuit.",
                "Don't ignore a saturation or cutoff result when you intended an amplifier. A negative or near-zero Vce means your resistor values are wrong for linear operation — increase Rc, decrease Rb, or revisit your divider ratio rather than assuming the calculator made an error.",
                "Don't assume Vbe is always 0.7V. Germanium transistors use roughly 0.3V, and 0.7V itself is only a typical figure — real silicon Vbe ranges from about 0.6V to 0.75V depending on current level and temperature, which matters most in low-voltage, low-current designs.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Bias Comparison Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Bias Configuration Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Bias Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Key Formula</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">β Sensitivity</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Components</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Voltage Divider", "Vb = Vcc × R2/(R1+R2)", "Low — β independent", "R1, R2, Rc, Re", "Production amplifiers, audio stages"],
                ["Fixed Bias", "Ib = (Vcc−Vbe)/Rb", "High — Ic ∝ β directly", "Rb, Rc", "Simple prototypes, switching circuits"],
                ["Emitter Bias", "Ib = (Vcc−Vbe)/(Rb+(β+1)Re)", "Medium — improved by Re", "Rb, Rc, Re", "Dual-supply designs needing stability"],
              ].map(([type, formula, sens, comp, use]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{type}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{formula}</td>
                  <td className="py-1.5 px-3 text-gray-600 text-xs">{sens}</td>
                  <td className="py-1.5 px-3 text-gray-600 text-xs">{comp}</td>
                  <td className="py-1.5 px-3 text-gray-500 text-xs">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Voltage divider bias is the industry-standard choice for discrete BJT amplifiers because Ic depends only on Vcc, R1, R2, and Re — not on β.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Transistor Bias Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Electronics Students", desc: "Work through BJT biasing exercises from textbooks and coursework, checking Q-point calculations by hand against the calculator before an exam or lab report deadline." },
            { icon: "🔧", title: "Electronics Hobbyists", desc: "Design and troubleshoot amplifier and switching stages on the breadboard, using presets and instant feedback to understand why a transistor isn't behaving as expected." },
            { icon: "🏗️", title: "Circuit Designers", desc: "Prototype analog front-end stages and verify a bias network's stability across β variation before committing resistor values to a PCB layout." },
            { icon: "⚙️", title: "Electrical Engineers", desc: "Cross-check hand calculations or SPICE simulation results for discrete transistor stages during design review, catching sign or unit errors quickly." },
            { icon: "🎸", title: "Audio DIY Builders", desc: "Bias discrete-transistor preamp and buffer stages for guitar pedals and audio gear, tuning Vce for maximum clean headroom or intentional soft clipping." },
            { icon: "🤖", title: "Maker & Robotics Hobbyists", desc: "Size transistor switches that drive relays, motors, and LED arrays from microcontroller outputs, confirming the design lands solidly in saturation." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
