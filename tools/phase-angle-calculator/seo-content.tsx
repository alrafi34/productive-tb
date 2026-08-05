export default function PhaseAngleCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a phase angle calculator?",
      a: "A phase angle calculator is a free online tool that computes the phase difference (φ) between voltage and current in an AC circuit. It supports three calculation modes: from real and apparent power (φ = arccos(P/S)), from resistance and reactance (φ = arctan(X/R)), or directly from a known power factor (φ = arccos(PF)).",
    },
    {
      q: "What is the formula for phase angle from power values?",
      a: "φ = arccos(P ÷ S), where P is real power in watts and S is apparent power in volt-amperes. For example, a load with 1,000W real power and 1,250VA apparent power gives φ = arccos(1000/1250) = arccos(0.8) = 36.87°.",
    },
    {
      q: "What is the formula for phase angle from resistance and reactance?",
      a: "φ = arctan(X ÷ R), where X is net reactance and R is resistance, both in ohms. For example, R = 10Ω and X = 10Ω gives φ = arctan(10/10) = arctan(1) = 45°, meaning voltage leads current by 45 degrees in this inductive circuit.",
    },
    {
      q: "How is phase angle related to power factor?",
      a: "Power factor equals the cosine of the phase angle: PF = cos(φ). A 0° phase angle gives PF = 1.0 (unity, purely resistive). A 90° phase angle gives PF = 0 (purely reactive). A 36.87° phase angle gives PF = 0.8, a common value for lightly loaded induction motors.",
    },
    {
      q: "What does a positive versus negative phase angle mean?",
      a: "A positive phase angle means voltage leads current, which happens in inductive circuits — common with motors, transformers, and any winding-based load. A negative phase angle means current leads voltage, which happens in capacitive circuits — common with power factor correction capacitors and certain electronic loads.",
    },
    {
      q: "What is the maximum possible phase angle in an AC circuit?",
      a: "The theoretical maximum is 90°, occurring in a purely reactive circuit with zero resistance — either purely inductive (+90°) or purely capacitive (-90°). Real circuits always have some resistance, so practical phase angles for typical loads range from a few degrees up to around 60-70° for heavily inductive industrial loads.",
    },
    {
      q: "How do I calculate phase angle if I only know the power factor rating on a motor nameplate?",
      a: "Use the power factor mode: enter the nameplate power factor directly (e.g. 0.85), and the calculator returns φ = arccos(0.85) = 31.79°. This is the fastest way to find phase angle when you have a rated PF but not the underlying resistance, reactance, or power values.",
    },
    {
      q: "Why does phase angle matter for electricity billing and power factor correction?",
      a: "Utilities often measure or estimate the phase angle indirectly through power factor, and many commercial and industrial tariffs include a penalty for a large phase angle (low power factor) because it means more current is drawn than the useful (real) power alone would require. Power factor correction capacitors are sized specifically to reduce phase angle back toward zero.",
    },
    {
      q: "Can phase angle be calculated for three-phase systems the same way?",
      a: "The same per-phase relationship (φ = arccos(P/S) or arctan(X/R)) applies to each phase individually in a balanced three-phase system, since each phase behaves like an equivalent single-phase circuit. Unbalanced three-phase systems require analyzing each phase separately, as the phase angle can differ between phases.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your power, impedance, and power factor values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select a calculation mode", "Choose to calculate phase angle from power (P & S), from impedance (R & X), or directly from a known power factor."],
    ["Enter your known values", "For power mode, enter real power (W) and apparent power (VA). For impedance mode, enter resistance and reactance (Ω). For power factor mode, enter a value between 0 and 1."],
    ["Read the phase angle result", "The calculator returns phase angle in both degrees and radians, plus the corresponding power factor."],
    ["Review the step-by-step derivation", "See the full calculation showing exactly how the inputs were substituted into the formula for your selected mode."],
    ["Apply a preset (optional)", "Use built-in presets covering unity power factor, typical motor loads, and common R-X combinations to explore how phase angle behaves."],
    ["Save or export the result", "Save the calculation to history, or export the full result with formula and steps as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Phase Angle Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>phase angle calculator</strong> computes the phase difference (φ) between voltage and
            current in an AC circuit. It supports three calculation paths depending on what you already
            know: from real and apparent power (φ = arccos(P/S)), from resistance and reactance
            (φ = arctan(X/R)), or directly from a known power factor (φ = arccos(PF)) — all three describe
            the same underlying angle, just derived from different starting data.
          </p>
          <p>
            Phase angle is the reason AC circuits with reactance (inductors and capacitors) draw more
            apparent power than the real, useful power they consume — the current and voltage waveforms are
            offset in time, and that offset, expressed as an angle, determines exactly how much extra
            current a supply has to deliver for the same real work done. This tool computes the exact angle
            from whichever data you have on hand, rather than requiring you to first convert everything into
            one specific form.
          </p>
          <p>
            Built for <strong>electrical engineers analyzing motor and industrial loads, power quality
            technicians investigating power factor penalties, and electronics students</strong> learning AC
            circuit theory. Includes eight built-in presets across all three modes, full step-by-step
            derivation, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Phase Angle Formulas
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">From power</span>: φ = arccos(P ÷ S)</p>
              <p><span className="font-semibold">From impedance</span>: φ = arctan(X ÷ R)</p>
              <p><span className="font-semibold">From power factor</span>: φ = arccos(PF)</p>
              <p className="text-gray-500 text-xs mt-2">Example: P = 1,000W, S = 1,250VA</p>
              <p className="text-gray-500 text-xs">φ = arccos(0.8) = <span className="text-green-600 font-semibold">36.87°</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>P</strong> — real power in watts; the actual useful work performed</li>
            <li><strong>S</strong> — apparent power in volt-amperes; the total power drawn from the supply</li>
            <li><strong>Power factor (PF)</strong> — cos(φ); a single number summarizing the phase relationship</li>
            <li>All three formulas describe the same angle — pick whichever matches the data you already have</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Phase Angle Calculator
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
                "Three calculation modes: power, impedance, power factor",
                "Results in both degrees and radians",
                "Corresponding power factor for every mode",
                "Full step-by-step derivation",
                "Eight built-in presets across all modes",
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
              title: "Industrial Motor Load Phase Angle",
              scenario: "A plant engineer measures a motor drawing 1,000W real power and 1,250VA apparent power. Using Power mode, the calculator returns φ = arccos(0.8) = 36.87° and PF = 0.8 — confirming this is a typical lightly-loaded induction motor phase angle before deciding whether power factor correction is worthwhile.",
            },
            {
              title: "Nameplate Power Factor Quick Lookup",
              scenario: "A technician has a motor nameplate listing PF = 0.85 but needs the phase angle for a power triangle diagram. Using Power Factor mode with 0.85 entered directly, the calculator returns φ = arccos(0.85) = 31.79° instantly, without needing the underlying watts and VA figures.",
            },
            {
              title: "RLC Circuit Phase Verification",
              scenario: "A student measures R = 10Ω and X = 10Ω in a lab RLC circuit and wants to verify the phase relationship. Using Impedance mode, the calculator returns φ = arctan(1) = 45°, matching their oscilloscope's measured phase shift between the voltage and current traces.",
            },
            {
              title: "Power Factor Correction Sizing Input",
              scenario: "An electrician needs the phase angle for a facility with 500W real power and 625VA apparent power before sizing correction capacitors. Using Power mode, the calculator returns φ = 36.87° and PF = 0.8, which feeds directly into a separate power factor correction capacitor sizing calculation.",
            },
            {
              title: "Comparing Two Load Types",
              scenario: "An engineer compares a mostly resistive load (R = 100Ω, X = 20Ω) against a mostly reactive load (R = 20Ω, X = 100Ω) using Impedance mode. The first returns φ = 11.31° (PF = 0.98), while the second returns φ = 78.69° (PF = 0.196) — illustrating how dramatically the R-to-X ratio affects phase behavior.",
            },
            {
              title: "Utility Billing Penalty Investigation",
              scenario: "A facility manager investigating a low power factor penalty on their utility bill uses Power Factor mode with the utility's reported PF of 0.72. The calculator returns φ = 43.95°, a large phase angle confirming a significant reactive load is present and justifying an investment in correction equipment.",
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
                "Use whichever mode matches the data you already have rather than converting first — if you have a nameplate PF, use Power Factor mode directly instead of working backward to find R and X.",
                "Remember that power factor and phase angle move in opposite directions: a phase angle closer to 0° gives a power factor closer to 1.0 (better), while a phase angle closer to 90° gives a power factor closer to 0 (worse).",
                "When investigating a utility power factor penalty, calculate the phase angle first — a large angle (above roughly 25-30°, or PF below about 0.9) is usually the threshold where correction capacitors become cost-effective.",
                "Cross-check results between modes when you have overlapping data. If you know both R/X and P/S for the same circuit, both modes should return the same phase angle — a mismatch signals a measurement or unit error somewhere.",
                "Remember the sign convention: this calculator returns the magnitude of the phase angle. Whether voltage leads current (inductive) or current leads voltage (capacitive) depends on whether the reactance is inductive or capacitive in your actual circuit.",
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
                "Confusing power factor with phase angle directly. Power factor is the cosine of the phase angle, not the angle itself — a PF of 0.8 corresponds to a phase angle of 36.87°, not 80° or 0.8°.",
                "Entering real power greater than apparent power in Power mode. Real power can never exceed apparent power in a valid AC circuit, since apparent power is always the vector sum that includes real power as one component.",
                "Mixing up resistance and reactance when using Impedance mode. Swapping R and X inverts the ratio inside the arctan function, producing the complementary angle (90° minus the correct answer) instead of the actual phase angle.",
                "Assuming phase angle is a fixed circuit property independent of load. Phase angle for a motor or transformer changes with loading — a motor at partial load typically has a larger phase angle (worse PF) than the same motor at full rated load.",
                "Treating a calculated phase angle as universally applicable across a three-phase system without checking for balance. Unbalanced loads can have different phase angles on each phase, so a single-phase calculation doesn't automatically represent the whole system.",
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
          Power Factor to Phase Angle Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Power Factor</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Phase Angle</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1.0", "0°", "Purely resistive (heaters, incandescent lighting)"],
                ["0.95", "18.19°", "Well-corrected industrial load"],
                ["0.9", "25.84°", "Good motor power factor"],
                ["0.8", "36.87°", "Typical induction motor at full load"],
                ["0.6", "53.13°", "Lightly loaded or uncorrected motor"],
                ["0.0", "90°", "Purely reactive (theoretical limit)"],
              ].map(([pf, angle, load]) => (
                <tr key={pf} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{pf}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{angle}</td>
                  <td className="py-2 px-3 text-gray-600 text-xs">{load}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Phase angle = arccos(power factor). Real-world loads vary based on operating conditions and equipment age.</p>
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
          Who Uses This Phase Angle Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Analyze motor, transformer, and industrial load phase relationships during power system design." },
            { icon: "🏭", title: "Power Quality Technicians", desc: "Investigate low power factor billing penalties and quantify the phase angle driving reactive power charges." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn how phase angle, power factor, and impedance relate and verify AC circuit homework problems." },
            { icon: "🔧", title: "Electricians", desc: "Cross-check phase angle from nameplate power factor ratings during motor and equipment installation." },
            { icon: "📊", title: "Energy Auditors", desc: "Quantify facility-wide reactive load severity before recommending power factor correction equipment." },
            { icon: "🎛️", title: "Circuit Designers", desc: "Verify phase relationships in RLC filter and resonance circuit designs against expected values." },
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
