export default function ReactivePowerCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a reactive power calculator?",
      a: "A reactive power calculator is a free online tool that computes the non-working power (Q) circulating in an AC circuit due to inductive or capacitive components, using voltage, current, and phase angle. It also returns apparent power, real power, and power factor from the same inputs, measured in VAR (volt-amperes reactive).",
    },
    {
      q: "What is the formula for reactive power?",
      a: "Q = V × I × sin(θ), where Q is reactive power in VAR, V is voltage, I is current, and θ is the phase angle between voltage and current in degrees. For example, a load at 230V, 10A, with a 30° phase angle gives Q = 230 × 10 × sin(30°) = 230 × 10 × 0.5 = 1,150 VAR.",
    },
    {
      q: "What is the difference between reactive power, real power, and apparent power?",
      a: "Real power (P = V×I×cos(θ), in watts) does useful work. Reactive power (Q = V×I×sin(θ), in VAR) is non-working power stored and released by inductors and capacitors, never converted to useful output. Apparent power (S = V×I, in VA) is the vector sum of both, related by S² = P² + Q².",
    },
    {
      q: "Is reactive power 'wasted' energy?",
      a: "Not exactly — reactive power isn't consumed or dissipated like real power; it's energy that oscillates back and forth between the source and the circuit's inductive or capacitive elements each cycle, without a net transfer. However, it does require the supply system (generators, transformers, cables) to be sized larger than the real power alone would require, which has real infrastructure and efficiency costs.",
    },
    {
      q: "What is the reactive power at a 0° phase angle?",
      a: "Zero. Since Q = V × I × sin(θ) and sin(0°) = 0, a purely resistive load (phase angle of 0°) has no reactive power at all — all supplied power is real power, and apparent power equals real power exactly.",
    },
    {
      q: "What is the maximum possible reactive power for given voltage and current?",
      a: "The maximum occurs at a 90° phase angle, where sin(90°) = 1, giving Q = V × I — equal to the full apparent power. At this point, real power is zero (cos(90°) = 0), meaning the circuit is purely reactive with no useful work being done at all.",
    },
    {
      q: "How do I convert reactive power from VAR to kVAR?",
      a: "Divide by 1,000: kVAR = VAR ÷ 1,000. A calculation returning 1,150 VAR is equivalently 1.15 kVAR. Reactive power for larger industrial loads is typically reported in kVAR, since VAR values for whole facilities can run into the tens or hundreds of thousands.",
    },
    {
      q: "Why is reactive power important for power factor correction?",
      a: "Power factor correction works by adding a capacitor bank that supplies reactive power locally, offsetting the reactive power drawn by inductive loads like motors. Knowing the existing reactive power (Q) — calculated by this tool — combined with a target power factor, tells you exactly how much correction capacitance (in kVAR) is needed.",
    },
    {
      q: "How does phase angle affect reactive power in practice?",
      a: "Larger phase angles indicate a more reactive (less resistive) circuit and produce proportionally more reactive power for the same voltage and current — sin(θ) grows from 0 at 0° to 1 at 90°. This is why heavily inductive loads like lightly loaded motors, which have large phase angles, contribute disproportionately more reactive power than resistive loads of similar current draw.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, current, and phase angle values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter voltage", "Input the supply voltage in volts (V) applied to the circuit."],
    ["Enter current", "Input the current flowing through the circuit in amps (A)."],
    ["Enter phase angle", "Input the phase angle between voltage and current in degrees (0-90°) — use a phase angle calculator first if you only know power factor or impedance."],
    ["Read the reactive power result", "The calculator returns reactive power in both VAR and kVAR, calculated instantly using Q = V × I × sin(θ)."],
    ["Review real and apparent power", "See the related real power (P = V×I×cos(θ)) and apparent power (S = V×I) calculated from the same inputs, plus power factor."],
    ["Check the efficiency rating and export", "View a rating based on how reactive the circuit is, and export the full calculation with steps as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Reactive Power Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>reactive power calculator</strong> computes the non-working power (Q) circulating in
            an AC circuit due to inductive or capacitive components, from voltage, current, and phase angle.
            Reactive power, measured in VAR (volt-amperes reactive), is the power that oscillates between
            the source and the circuit's reactive elements each cycle without doing useful work.
          </p>
          <p>
            Reactive power is easy to overlook because it doesn't show up as heat, light, or motion the way
            real power does — but it directly affects how much current a supply system has to deliver for a
            given amount of useful work, and it's the specific quantity that power factor correction
            capacitors are sized to offset. This tool computes Q = V × I × sin(θ) alongside real power and
            apparent power, giving the complete power triangle from a single set of measurements.
          </p>
          <p>
            Built for <strong>electrical engineers sizing power factor correction equipment, facility
            managers investigating utility reactive power charges, and students</strong> learning AC power
            theory. Includes six built-in presets from residential to industrial loads, full step-by-step
            derivation, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Reactive Power Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Reactive Power (Q)</span> = V × I × sin(θ)</p>
              <p><span className="font-semibold">Real Power (P)</span> = V × I × cos(θ)</p>
              <p><span className="font-semibold">Apparent Power (S)</span> = V × I</p>
              <p className="text-gray-500 text-xs mt-2">Example: V = 230V, I = 10A, θ = 30°</p>
              <p className="text-gray-500 text-xs">Q = 230 × 10 × 0.5 = <span className="text-green-600 font-semibold">1,150 VAR</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>θ (phase angle)</strong> — the angle between voltage and current waveforms, 0-90°</li>
            <li><strong>sin(θ)</strong> — grows from 0 at 0° to 1 at 90°, scaling reactive power with how reactive the circuit is</li>
            <li><strong>Q = 0</strong> — at 0° (purely resistive); <strong>Q = S</strong> at 90° (purely reactive)</li>
            <li>Reactive power doesn't do useful work but still requires supply capacity to deliver</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Reactive Power Calculator
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
                "Reactive power in VAR and kVAR",
                "Real power (P) and apparent power (S)",
                "Power factor calculated automatically",
                "Efficiency rating based on phase angle",
                "Full step-by-step derivation",
                "Six built-in presets",
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
              title: "Standard Load Reactive Power Check",
              scenario: "An electrician measures a 230V, 10A circuit with a 30° phase angle. The calculator returns Q = 1,150 VAR (1.15 kVAR), real power of 1,991.9W, and power factor of 0.866 — quantifying the non-working power the circuit draws alongside its useful output.",
            },
            {
              title: "Industrial Motor Reactive Load",
              scenario: "An engineer analyzing a 400V, 5A industrial motor with a measured 45° phase angle finds Q = 1,414.2 VAR — a significant reactive component relative to its 1,414.2W real power (equal at 45°, since sin(45°) = cos(45°)), highlighting the motor as a candidate for power factor correction.",
            },
            {
              title: "Heavy Load Reactive Power Assessment",
              scenario: "A facility manager evaluating a 220V, 15A heavy industrial load with a 60° phase angle calculates Q = 2,858.6 VAR against real power of only 1,650W — showing the load's apparent power (3,300VA) is dominated more by reactive than real power at this phase angle.",
            },
            {
              title: "Residential Circuit Reactive Power Estimate",
              scenario: "A homeowner's electrician checks a typical 230V, 8A residential circuit with an estimated 25° phase angle. The calculator returns Q = 778.4 VAR — modest reactive power consistent with a mix of resistive and lightly inductive household loads.",
            },
            {
              title: "Three-Phase Motor Power Triangle",
              scenario: "An engineer building a power triangle diagram for a 400V, 12A three-phase motor at 35° phase angle finds Q = 2,752.2 VAR and P = 3,930.5W per phase — used alongside apparent power (4,800VA) to illustrate the full power triangle relationship for a training presentation.",
            },
            {
              title: "Low Reactive Load Efficiency Confirmation",
              scenario: "A technician verifying a 120V, 10A near-resistive load with a 15° phase angle finds Q = 310.6 VAR against real power of 1,159.1W — confirming an 'Excellent' efficiency rating with minimal reactive power relative to the load's useful output.",
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
                "If you know power factor instead of phase angle, convert first using θ = arccos(PF) with the phase angle calculator, then use that angle here — the two tools are designed to work together.",
                "Use kVAR rather than VAR when reporting reactive power for whole facilities or large industrial loads — VAR values in the tens of thousands are harder to read and compare than the equivalent kVAR figure.",
                "When sizing power factor correction capacitors, calculate the existing reactive power at typical operating load, not at startup or peak load, since correction is usually optimized for steady-state operating conditions.",
                "Remember that reactive power scales with sin(θ) while real power scales with cos(θ) — at 45°, both are equal, but below 45° real power dominates, and above 45° reactive power dominates.",
                "Cross-check this calculator's reactive power output against a power quality meter reading when available — a significant mismatch usually indicates the assumed phase angle doesn't match actual operating conditions.",
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
                "Confusing sin(θ) and cos(θ) between reactive and real power. Reactive power uses sin(θ); real power uses cos(θ) — swapping them gives you the wrong quantity entirely, not just a slightly off number.",
                "Treating reactive power as 'wasted' or billable energy the same way as real power. Reactive power isn't converted to heat or work — it oscillates without net consumption, though it does require larger supply infrastructure.",
                "Assuming phase angle stays constant as a load's operating point changes. Motors especially show different phase angles at partial load versus full load, so a single measurement may not represent all operating conditions.",
                "Using degrees where the underlying formula expects radians, or vice versa, when working the math independently outside this calculator. This tool converts automatically, but manual calculations are a common source of errors of this type.",
                "Ignoring reactive power when sizing generators, UPS systems, or transformers. These components must be rated for apparent power (which includes the reactive component), not just the real power the load actually consumes.",
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
          Phase Angle to Reactive Power Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Phase Angle</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">sin(θ)</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Q at 230V, 10A</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["0°", "0.000", "0 VAR"],
                ["15°", "0.259", "595.7 VAR"],
                ["30°", "0.500", "1,150 VAR"],
                ["45°", "0.707", "1,626.1 VAR"],
                ["60°", "0.866", "1,991.9 VAR"],
                ["90°", "1.000", "2,300 VAR"],
              ].map(([angle, sin, q]) => (
                <tr key={angle} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{angle}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{sin}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Calculated using Q = V × I × sin(θ) at a fixed 230V, 10A for comparison across phase angles.</p>
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
          Who Uses This Reactive Power Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Size power factor correction capacitor banks using the calculated reactive power as a direct input." },
            { icon: "🏭", title: "Facility Managers", desc: "Investigate utility reactive power (kVAR) charges and quantify the non-working power a facility draws." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn the power triangle relationship between real, reactive, and apparent power through worked examples." },
            { icon: "🔧", title: "Electricians", desc: "Assess reactive power contribution of motors and inductive loads during circuit design and troubleshooting." },
            { icon: "📊", title: "Energy Auditors", desc: "Quantify facility-wide reactive power to prioritize power factor correction recommendations by impact." },
            { icon: "🏗️", title: "Power System Designers", desc: "Calculate reactive power requirements for generator, UPS, and transformer sizing decisions." },
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
