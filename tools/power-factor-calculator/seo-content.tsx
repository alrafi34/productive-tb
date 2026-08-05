export default function PowerFactorCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a power factor calculator?",
      a: "A power factor calculator is a free online tool that computes the power factor (PF) of an AC electrical system from real power (kW) and apparent power (kVA). It also returns reactive power (kVAR), phase angle, and an efficiency rating — everything needed to judge how efficiently a system uses the power it draws from the supply.",
    },
    {
      q: "What is the formula for power factor?",
      a: "PF = P ÷ S, where P is real power in kilowatts and S is apparent power in kilovolt-amperes. For example, a system with 8.5kW real power and 10kVA apparent power has PF = 8.5 ÷ 10 = 0.85, meaning 85% of the apparent power delivered actually does useful work.",
    },
    {
      q: "What is a good power factor?",
      a: "A power factor of 0.95 or above is considered excellent, 0.85–0.94 is good, 0.70–0.84 is fair, and below 0.70 is considered poor and usually warrants correction. Many utilities apply billing penalties once power factor drops below 0.90–0.95, since a lower power factor means more current — and more grid capacity — is needed to deliver the same real power.",
    },
    {
      q: "What is the difference between real power, apparent power, and reactive power?",
      a: "Real power (P, in kW) is the actual useful work performed — heat, light, or motion. Apparent power (S, in kVA) is the total power the supply must deliver, including both real and reactive components. Reactive power (Q, in kVAR) is the non-working power drawn by inductive or capacitive components and is calculated as Q = √(S² - P²).",
    },
    {
      q: "Why is power factor always between 0 and 1?",
      a: "Power factor is the ratio of real power to apparent power, and apparent power is always the larger (or equal) quantity in the power triangle relationship S² = P² + Q² — apparent power can never be smaller than real power. This means PF = P/S can never exceed 1.0, and a PF of exactly 1.0 only occurs in a purely resistive circuit with zero reactive power.",
    },
    {
      q: "How do I calculate reactive power from power factor?",
      a: "First find apparent power if needed (S = P ÷ PF), then calculate Q = √(S² - P²). For a system with P = 8.5kW and PF = 0.85: S = 8.5 ÷ 0.85 = 10kVA, so Q = √(100 - 72.25) = √27.75 ≈ 5.27kVAR.",
    },
    {
      q: "Why do utilities charge penalties for low power factor?",
      a: "A low power factor means a facility draws more current (and therefore more apparent power) from the grid than its actual useful work justifies, forcing the utility to size generation, transformers, and distribution equipment for a higher current than the real power alone would require. Many commercial and industrial tariffs include a power factor penalty clause specifically to recover this extra infrastructure cost.",
    },
    {
      q: "What causes a low power factor?",
      a: "Inductive loads are the most common cause — motors, transformers, fluorescent and HID lighting ballasts, and welding equipment all draw reactive current in addition to real power. Lightly loaded motors are particularly prone to poor power factor, since the reactive magnetizing current stays roughly constant while the real power (proportional to mechanical load) drops.",
    },
    {
      q: "How do I improve a poor power factor?",
      a: "Power factor correction capacitors are the standard fix for inductive loads — they supply reactive power locally, reducing the reactive current the utility supply has to deliver. Sizing the correction capacitor requires knowing the existing reactive power (calculated by this tool) and the target power factor, then calculating the capacitive kVAR needed to bridge the difference.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your real power, apparent power, and calculated results are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter real power (P)", "Input the real power consumed by the system in kilowatts (kW), typically found on utility bills or measured with a power meter."],
    ["Enter apparent power (S)", "Input the apparent power drawn from the supply in kilovolt-amperes (kVA), also available from utility bills or metering equipment."],
    ["Read the power factor", "The calculator instantly returns power factor as both a decimal (0 to 1) and a percentage."],
    ["Review reactive power and phase angle", "See the calculated reactive power (kVAR) and phase angle (degrees), both derived from the same P and S inputs."],
    ["Check the efficiency rating", "The result includes an Excellent, Good, Fair, or Poor rating based on standard power factor thresholds."],
    ["Apply a preset or export results", "Use a built-in preset spanning ideal to very poor systems, or export the full calculation with steps as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Power Factor Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>power factor calculator</strong> computes the power factor (PF) of an AC electrical
            system from real power and apparent power. Enter real power in kilowatts (kW) and apparent power
            in kilovolt-amperes (kVA), and the calculator returns power factor, reactive power (kVAR), phase
            angle, and an efficiency rating — everything needed to assess how effectively a system uses the
            power it draws.
          </p>
          <p>
            Power factor matters because apparent power and real power are only equal in a purely resistive
            circuit — any inductive or capacitive load (motors, transformers, ballasts) causes the system to
            draw more apparent power than the real power it actually consumes, and that gap, quantified as
            reactive power, is what utilities often penalize on commercial and industrial bills. This tool
            computes the full picture — PF, reactive power, and phase angle — from the two figures most
            commonly available on a utility bill or power meter.
          </p>
          <p>
            Built for <strong>facility managers investigating utility power factor penalties, electrical
            engineers sizing correction equipment, and electricians</strong> assessing motor and industrial
            load efficiency. Includes six built-in presets from ideal to very poor systems, full step-by-step
            derivation, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Power Factor Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Power Factor (PF)</span> = P ÷ S</p>
              <p><span className="font-semibold">Reactive Power (Q)</span> = √(S² - P²)</p>
              <p><span className="font-semibold">Phase Angle (θ)</span> = arccos(PF)</p>
              <p className="text-gray-500 text-xs mt-2">Example: P = 8.5kW, S = 10kVA</p>
              <p className="text-gray-500 text-xs">PF = <span className="text-green-600 font-semibold">0.85 (85%)</span>, Q = 5.27kVAR, θ = 31.79°</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>P (real power)</strong> — the actual useful work performed, in kW</li>
            <li><strong>S (apparent power)</strong> — total power drawn from the supply, in kVA</li>
            <li><strong>Q (reactive power)</strong> — non-working power from inductive/capacitive components, in kVAR</li>
            <li><strong>Efficiency rating</strong> — ≥0.95 Excellent, 0.85-0.94 Good, 0.70-0.84 Fair, &lt;0.70 Poor</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Power Factor Calculator
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
                "Power factor as decimal and percentage",
                "Reactive power (kVAR) calculation",
                "Phase angle in degrees",
                "Automatic efficiency rating (Excellent/Good/Fair/Poor)",
                "Full step-by-step derivation",
                "Six built-in system presets",
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
              title: "Utility Bill Penalty Investigation",
              scenario: "A facility manager sees a power factor surcharge on their utility bill and checks their meter readings of 850kW real power and 1,000kVA apparent power. The calculator returns PF = 0.85, rated 'Good' but below the utility's 0.90 penalty threshold — confirming the surcharge is legitimate and prompting a correction capacitor quote.",
            },
            {
              title: "Motor Efficiency Assessment",
              scenario: "An electrician measures a lightly loaded induction motor drawing 3kW real power and 5kVA apparent power. The calculator returns PF = 0.60, rated 'Poor', with reactive power of 4kVAR — confirming the motor is oversized for its current load and drawing excessive reactive current relative to its useful output.",
            },
            {
              title: "Power Factor Correction Capacitor Sizing Input",
              scenario: "An engineer needs the existing reactive power before sizing correction capacitors for a facility with 500kW real power and 625kVA apparent power. The calculator returns PF = 0.80 and Q = 375kVAR, which feeds directly into a capacitor bank sizing calculation to bring the facility to a target 0.95 PF.",
            },
            {
              title: "New Equipment Power Factor Comparison",
              scenario: "A plant engineer compares two candidate compressors: one rated 9.5kW real at 10kVA apparent (PF = 0.95, 'Excellent'), another rated 8.5kW real at 10kVA apparent (PF = 0.85, 'Good'). The calculator's efficiency ratings help justify selecting the higher-PF unit despite a higher upfront cost, given the lower long-term reactive power penalty.",
            },
            {
              title: "Ideal System Baseline Check",
              scenario: "A student verifying textbook power triangle relationships enters a purely resistive load with 10kW real power and 10kVA apparent power. The calculator confirms PF = 1.0 exactly, with zero reactive power and a 0° phase angle, matching the expected result for an ideal resistive system.",
            },
            {
              title: "Very Poor System Diagnostic",
              scenario: "A technician troubleshooting a heavily inductive welding load measures 5kW real power against 10kVA apparent power. The calculator returns PF = 0.50, rated 'Poor', and reactive power of 8.66kVAR — quantifying just how much of the supply capacity is being consumed by non-working reactive current in this system.",
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
                "Pull real power and apparent power directly from your utility bill or power meter rather than estimating — most commercial meters report both kW and kVA (or kWh and kVAh) specifically so power factor can be checked.",
                "Check your utility's specific power factor penalty threshold before assuming a 'Fair' or 'Good' rating is acceptable — some utilities only penalize below 0.90, while others start charging below 0.95.",
                "Use this calculator's reactive power output as a direct input to capacitor bank sizing — most power factor correction calculations start from exactly this Q figure and a target power factor.",
                "For motors, check power factor at actual operating load, not nameplate rated load — a motor's power factor typically drops significantly when run well below its rated capacity, which is common in oversized installations.",
                "Track power factor over time rather than as a single snapshot if a facility's load varies significantly by shift or season — a single reading can miss periods where PF drops well below the annual average.",
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
                "Entering real power higher than apparent power. This is physically impossible in a valid AC system — apparent power is always the larger or equal quantity, since it's the vector sum that includes real power as a component.",
                "Confusing kW and kVA when reading utility bill data. These represent different quantities (real vs. apparent power), and mixing them up produces a power factor that doesn't reflect the actual system.",
                "Assuming a single power factor reading represents the whole facility at all times. Power factor varies with load — a facility can look fine during peak hours and poor during light-load periods, or vice versa.",
                "Treating power factor correction as a one-time fix without re-checking after load changes. Adding new equipment, especially motors or lighting ballasts, can shift the facility's overall power factor and require recalculating correction capacitor sizing.",
                "Overlooking that oversized correction capacitors can cause a leading (capacitive) power factor, which some utilities also penalize. The goal of correction is usually to bring PF close to 1.0, not to overcorrect into capacitive territory.",
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
          Power Factor Efficiency Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Power Factor</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1.00", "Ideal", "Purely resistive load — heaters, incandescent lighting"],
                ["0.95 - 0.99", "Excellent", "Well-corrected industrial or commercial system"],
                ["0.85 - 0.94", "Good", "Typical commercial building with mixed loads"],
                ["0.70 - 0.84", "Fair", "Common industrial load, uncorrected motors"],
                ["Below 0.70", "Poor", "Heavily inductive load, needs correction"],
              ].map(([pf, rating, desc]) => (
                <tr key={pf} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{pf}</td>
                  <td className="py-2 px-3 font-semibold text-green-600 text-xs">{rating}</td>
                  <td className="py-2 px-3 text-gray-600 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Utility penalty thresholds vary — check your specific tariff for the exact power factor level that triggers a surcharge.</p>
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
          Who Uses This Power Factor Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏭", title: "Facility Managers", desc: "Investigate utility power factor surcharges and quantify reactive power before requesting correction quotes." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Size power factor correction capacitor banks using the calculated reactive power as a direct input." },
            { icon: "🔧", title: "Electricians", desc: "Assess motor and equipment power factor during installation and maintenance to spot inefficient loads." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn the power triangle relationship between real, apparent, and reactive power through worked examples." },
            { icon: "📊", title: "Energy Auditors", desc: "Quantify facility-wide power factor efficiency and prioritize correction recommendations by severity." },
            { icon: "🏢", title: "Building Owners", desc: "Understand utility bill line items related to power factor and evaluate the ROI of correction equipment." },
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
