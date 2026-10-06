import { capacitorChargeTimeCalculatorConfig } from "./config";
export default function CapacitorChargeTimeCalculatorSEO() {
  const faqItems = capacitorChargeTimeCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = capacitorChargeTimeCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Capacitor Charge Time Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>capacitor charge time calculator</strong> computes how long an RC (resistor-capacitor)
            circuit takes to charge a capacitor to a target percentage of the supply voltage. Enter
            resistance and capacitance, choose a target percentage, and the calculator returns the exact
            charge time along with the circuit's time constant (τ) and the standard ~5τ full-charge time.
          </p>
          <p>
            The underlying exponential charging curve means the capacitor approaches full voltage
            asymptotically rather than reaching it at a fixed point, so "how long until it's charged"
            depends entirely on how close to 100% you actually need — 63%, 90%, and 99% all correspond to
            very different real time values for the same R and C. This tool computes the exact time for any
            target percentage using the natural logarithm formula, rather than relying on the 63% rule of
            thumb alone.
          </p>
          <p>
            Built for <strong>electronics students learning RC circuit theory, hobbyists designing 555
            timer and debounce circuits, and engineers</strong> sizing timing components for filters and
            pulse circuits. Includes four built-in presets, full step-by-step derivation, and text export
            — free.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The RC Charging Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Time constant (τ)</span> = R × C</p>
              <p><span className="font-semibold">Charge time (t)</span> = -RC × ln(1 - p)</p>
              <p><span className="font-semibold">Full charge (~99.3%)</span> ≈ 5τ</p>
              <p className="text-gray-500 text-xs mt-2">Example: R = 10kΩ, C = 10µF, target = 63%</p>
              <p className="text-gray-500 text-xs">τ = 0.1s, t = <span className="text-green-600 font-semibold">≈ 100ms</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>τ (tau)</strong> — the time constant, R × C, in seconds; the natural timescale of the circuit</li>
            <li><strong>p</strong> — target charge fraction (e.g. 0.9 for 90%) used inside the natural log term</li>
            <li><strong>ln(1 - p)</strong> — the natural log multiplier that scales with how close to full charge you're targeting</li>
            <li>Charge time depends only on R and C — supply voltage doesn't affect how long it takes to reach a given percentage</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Capacitor Charge Time Calculator
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
                "Time constant (τ) calculation",
                "Charge time for 50%, 63%, 90%, 95%, or 99% targets",
                "Standard ~5τ full-charge time",
                "Full step-by-step formula derivation",
                "Automatic time unit conversion (µs, ms, s, min, hr)",
                "Four built-in RC circuit presets",
                "Calculation history",
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
              title: "555 Timer Pulse Width Design",
              scenario: "A hobbyist designing a 555 monostable circuit needs a 100ms output pulse. Using R = 10kΩ and C = 10µF at the 63% target (which corresponds to one time constant in 555 timing), the calculator confirms τ = 100ms — matching the standard 555 monostable formula of t = 1.1 × R × C, giving them confidence in the component values.",
            },
            {
              title: "Debounce Circuit Timing Verification",
              scenario: "An engineer building a mechanical switch debounce filter wants the RC circuit to settle to 99% within 5ms to avoid false triggers from contact bounce. Using the 99% target with C = 100nF, the calculator shows they need R ≈ 10.9kΩ to hit that window, guiding their resistor selection.",
            },
            {
              title: "Audio Filter Cutoff Timing Check",
              scenario: "An audio hobbyist verifying an RC low-pass filter's step response uses R = 1kΩ and C = 100nF at a 99% target. The calculator returns a charge time of about 460µs, confirming the filter settles fast enough for their intended audio bandwidth application.",
            },
            {
              title: "Power Supply Soft-Start Circuit",
              scenario: "A power electronics designer wants an inrush-limiting soft-start circuit to reach 95% of full voltage within 500ms using a 1,000µF capacitor. Using the 95% target, the calculator shows a required resistance of approximately 167Ω to hit the target window given τ = R × C.",
            },
            {
              title: "LED Fade Timing Circuit",
              scenario: "A hobbyist building an LED fade-in effect wants roughly a 2-second fade using a 1MΩ resistor and a 1µF capacitor. Using the 63% target, the calculator confirms τ = 1 second, and checking the 99% target shows the LED reaches near-full brightness at about 4.6 seconds — informing them to adjust the resistor down if a faster fade is wanted.",
            },
            {
              title: "Camera Flash Recharge Time Estimate",
              scenario: "A hardware technician troubleshoots a camera flash that recharges slower than spec. Using the flash's known 68µF capacitor and measuring an effective charging resistance of 2.2kΩ, the calculator's 99% target returns roughly 690ms — comparing this against the manufacturer's rated 1-second recharge time helps confirm the circuit is performing within spec.",
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
                "Memorize the key multipliers: 63% ≈ 1τ, 90% ≈ 2.3τ, 95% ≈ 3τ, 99% ≈ 4.6τ, and full charge ≈ 5τ. These let you estimate charge time mentally without running the full calculation for quick design checks.",
                "For 555 timer designs, work with the 63% (one time constant) target first, since most 555 monostable and astable formulas are built directly around multiples of τ rather than arbitrary percentages.",
                "When a circuit needs to settle quickly (like a debounce filter or ADC sample-and-hold), target 99% rather than 95% — the extra 4% of settling accuracy only costs about 1.6τ of additional time, which is often negligible.",
                "Use the built-in presets as starting points for common circuit types, then adjust R or C incrementally and watch how the charge time changes — it's faster than recalculating from scratch each time.",
                "Remember that resistance and capacitance both scale the time constant linearly — so halving either R or C halves the charge time, which makes tuning a timing circuit fairly predictable once you have a working reference point.",
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
                "Assuming 5 time constants means \"exactly fully charged.\" It's approximately 99.3%, close enough for nearly every application, but the capacitor never mathematically reaches exactly 100% under the ideal exponential model.",
                "Forgetting that supply voltage has no effect on charge time. Doubling the voltage doesn't charge the capacitor to 90% any faster — only resistance and capacitance determine the time constant.",
                "Using the wrong target percentage for a 555 timer calculation. Standard 555 formulas are built around the 63% (one τ) reference point — using 90% or 99% in that context gives a timing figure that doesn't match the actual IC behavior.",
                "Ignoring the resistor's power rating and the capacitor's inrush current tolerance for low-resistance, high-capacitance combinations. A very low R with a large C charges quickly but draws a large initial current spike that some components can't safely handle.",
                "Mixing up charge time and discharge time formulas when reasoning about a circuit. This calculator computes charging behavior; a capacitor discharging through a resistor follows a mirrored but distinct formula (V = V₀ × e^(-t/RC)) for the voltage remaining rather than the fraction charged.",
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
          Charge Percentage to Time Constant Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Target Charge</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Multiplier (× τ)</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Time at τ = 100ms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["50%", "0.693τ", "69.3ms"],
                ["63.2%", "1.0τ", "100ms"],
                ["90%", "2.303τ", "230.3ms"],
                ["95%", "2.996τ", "299.6ms"],
                ["99%", "4.605τ", "460.5ms"],
                ["99.3% (full charge)", "~5τ", "500ms"],
              ].map(([pct, mult, time]) => (
                <tr key={pct} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{pct}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{mult}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Multipliers are derived from t = -τ × ln(1 - p) and apply to any R and C combination.</p>
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
          Who Uses This Capacitor Charge Time Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⏱️", title: "555 Timer Circuit Designers", desc: "Calculate precise timing for astable and monostable 555 circuits based on the RC time constant." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn and verify RC circuit charging behavior and the exponential charging curve formula." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Design debounce filters, LED fade circuits, and timing delays with predictable charge behavior." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Size soft-start and inrush-limiting circuits to reach a target voltage within a specified time window." },
            { icon: "🎛️", title: "Audio Circuit Designers", desc: "Verify RC filter step response and settling time for audio signal conditioning circuits." },
            { icon: "🔧", title: "Technicians", desc: "Diagnose slow-charging capacitor circuits by comparing measured behavior against the expected time constant." },
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
