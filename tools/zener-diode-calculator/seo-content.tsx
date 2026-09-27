import { zenerDiodeCalculatorConfig } from "./config";
export default function ZenerDiodeCalculatorSEO() {
  const faqItems = zenerDiodeCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = zenerDiodeCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Zener Diode Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>Zener diode calculator</strong> analyzes a shunt voltage regulator circuit — a Zener
            diode, series resistor, and optional load — computing total current, load current, Zener
            current, power dissipation in both the diode and resistor, and whether the circuit achieves
            stable voltage regulation. It's the standard analysis for the simplest and most common type of
            voltage regulator circuit in electronics.
          </p>
          <p>
            A Zener regulator only works correctly within a specific operating window: the diode needs
            enough current flowing through it to stay in its breakdown region and hold its rated voltage,
            but not so much that it exceeds its power rating and overheats. Both constraints depend on the
            same set of component values and load conditions, which is why this calculator checks both
            simultaneously and reports a clear regulation status rather than just a raw current number that
            still requires manual interpretation.
          </p>
          <p>
            Built for <strong>electronics hobbyists building simple voltage reference circuits, students
            learning shunt regulator theory, and hardware designers</strong> prototyping low-current
            regulation before committing to a dedicated regulator IC. Includes four built-in presets for
            common regulator voltages, full step-by-step derivation, and text export — free and entirely
            browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Zener Regulator Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Total current</span> = (Vin − Vz) ÷ Rs</p>
              <p><span className="font-semibold">Load current</span> = Vz ÷ RL</p>
              <p><span className="font-semibold">Zener current</span> = Total current − Load current</p>
              <p><span className="font-semibold">Zener power</span> = Vz × Zener current</p>
              <p className="text-gray-500 text-xs mt-2">Example: Vin=12V, Vz=5.1V, Rs=220Ω, RL=1,000Ω</p>
              <p className="text-gray-500 text-xs">Iz ≈ <span className="text-green-600 font-semibold">26.3mA</span>, Pz ≈ 0.134W</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Minimum Zener current</strong> — commonly ~5mA, required to sustain breakdown regulation</li>
            <li><strong>Maximum Zener power</strong> — commonly 0.5W for small signal Zeners; exceeding this risks damage</li>
            <li><strong>Worst case for min current</strong> — occurs at maximum load current (Zener carries the least)</li>
            <li><strong>Worst case for max power</strong> — occurs at no load / minimum load current (Zener carries the most)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Zener Diode Calculator
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
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Calculator Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time calculation as you type",
                "Total, load, and Zener current breakdown",
                "Zener and series resistor power dissipation",
                "Automatic regulation status (stable/warning/unstable)",
                "Configurable minimum current and max power thresholds",
                "Full step-by-step derivation",
                "Four built-in regulator voltage presets",
                "Calculation history (saved locally)",
                "Export calculation as a text file",
                "No signup required",
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
              title: "12V to 5V Logic Circuit Regulator",
              scenario: "A hobbyist building a simple 5V reference from a 12V supply uses a 5.1V Zener, 220Ω series resistor, and a 1,000Ω load. The calculator returns total current ≈31.4mA, load current 5.1mA, Zener current ≈26.3mA, and Zener power ≈0.134W — confirming stable regulation well within a 0.5W-rated Zener's limits.",
            },
            {
              title: "9V to 3.3V Microcontroller Supply",
              scenario: "A hardware designer prototyping a 3.3V reference from a 9V battery uses a 3.3V Zener, 330Ω resistor, and 470Ω load. The calculator checks that Zener current stays above the 5mA minimum even at this relatively heavy load, confirming the circuit maintains stable regulation before committing to a PCB layout.",
            },
            {
              title: "24V to 12V Automotive Voltage Reference",
              scenario: "An automotive electronics hobbyist stepping a 24V truck electrical system down to a 12V reference uses a 12V Zener, 470Ω resistor, and 2,200Ω load. The calculator confirms both minimum current and maximum power constraints are satisfied, verifying the design before installation.",
            },
            {
              title: "No-Load Power Dissipation Check",
              scenario: "An engineer checking worst-case Zener power dissipation removes the load entirely (open circuit) from a 12V-to-6.2V design with a 390Ω resistor. With no load current, all series resistor current flows through the Zener, and the calculator flags whether this no-load condition exceeds the diode's power rating — the critical case to check for any shunt regulator.",
            },
            {
              title: "Regulation Failure Diagnosis",
              scenario: "A student troubleshooting a non-functional Zener regulator enters their circuit values and finds the calculator reports a negative Zener current — indicating the load resistance is too low (drawing more current than the series resistor and input voltage combination can supply), explaining why their circuit isn't regulating.",
            },
            {
              title: "Series Resistor Power Rating Selection",
              scenario: "A designer sizing the series resistor's wattage rating for a 15V-to-6.2V regulator with 390Ω calculates total current and resistor power dissipation using this tool, confirming a standard 1/2W or 1W resistor comfortably handles the calculated dissipation with safety margin.",
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
                "Always check the no-load condition (load disconnected) separately — this is when Zener current and power dissipation are at their absolute maximum, since all series resistor current flows through the Zener with nothing else to share it.",
                "Also check the maximum expected load current condition, since this is when Zener current is at its minimum — verify it stays above the diode's minimum regulation current in this worst case too.",
                "Zener regulators are inherently inefficient — the series resistor dissipates power continuously regardless of whether the load needs it, so they're best reserved for low-current reference or protection applications, not general power supply regulation.",
                "Use a higher-wattage Zener diode (1W or higher) rather than a small-signal 0.5W part if your application has variable or uncertain load conditions, giving more margin against the no-load worst case.",
                "Cross-check your calculated results against the specific Zener diode's datasheet minimum current and maximum power figures rather than relying only on this calculator's default 5mA/0.5W assumptions, since these vary by part.",
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
                "Only checking the circuit at one load condition. A Zener regulator can be stable at typical load but fail at no-load (excess power) or maximum load (insufficient Zener current) — always check both extremes.",
                "Sizing the series resistor based only on the loaded condition and forgetting the no-load case. If the load is ever disconnected (or fails open), all the resistor's current suddenly flows through the Zener, which can exceed its power rating if the resistor was sized too aggressively.",
                "Assuming a Zener regulator provides tight load regulation like a linear IC regulator. Output voltage sags somewhat as load current increases, since the Zener's dynamic resistance isn't zero — for precision regulation, use a dedicated regulator IC instead.",
                "Confusing Zener voltage rating with forward voltage drop. Zener diodes are operated in reverse breakdown for regulation purposes, at a voltage typically much higher than the ~0.7V forward drop the same diode would show if forward-biased.",
                "Forgetting that this calculator assumes a resistive load. Reactive or highly variable loads (like switching circuits) draw current in ways that don't map cleanly to a simple load resistance, requiring more careful transient analysis.",
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

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Zener Regulator Configurations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Application</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Vin → Vz</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Rs</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">RL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5V logic reference", "12V → 5.1V", "220Ω", "1,000Ω"],
                ["3.3V microcontroller", "9V → 3.3V", "330Ω", "470Ω"],
                ["12V automotive reference", "24V → 12V", "470Ω", "2,200Ω"],
                ["6V general purpose", "15V → 6.2V", "390Ω", "1,500Ω"],
              ].map(([app, vv, rs, rl]) => (
                <tr key={app} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{app}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{vv}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{rs}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{rl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Common Zener voltages: 2.4, 3.3, 3.9, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 9.1, 10, 12, 15V. Always verify against no-load and full-load conditions.</p>
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
          Who Uses This Zener Diode Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Design simple voltage reference and regulation circuits for low-current projects." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn shunt regulator theory and verify Zener circuit homework calculations." },
            { icon: "🔧", title: "Hardware Designers", desc: "Prototype low-current voltage references before committing to a dedicated regulator IC." },
            { icon: "🚗", title: "Automotive Electronics Hobbyists", desc: "Design voltage reference circuits for automotive 12V/24V system interfacing." },
            { icon: "🛡️", title: "Circuit Protection Engineers", desc: "Verify Zener-based overvoltage protection and clamping circuit designs." },
            { icon: "📊", title: "Circuit Analysis Learners", desc: "Understand the interplay between minimum current and maximum power constraints in shunt regulators." },
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
