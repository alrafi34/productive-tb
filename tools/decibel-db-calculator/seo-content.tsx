export default function DecibelCalculatorSEO() {
  const faqItems = [
    { q: "What is a decibel (dB) calculator?", a: "A decibel calculator converts between a power or voltage ratio and its equivalent value in decibels (dB), the logarithmic unit used throughout electronics, audio, and RF engineering to express gain and loss. This calculator supports four modes: power ratio to dB, voltage/current ratio to dB, dB to power ratio, and dB to voltage/current ratio." },
    { q: "How is a power ratio converted to decibels?", a: "Power ratio to dB uses the formula dB = 10 × log₁₀(ratio). For example, an amplifier that increases power from 1 W to 10 W has a power ratio of 10, giving 10 × log₁₀(10) = 10 × 1 = 10 dB of gain. This tool takes the ratio directly (P₂/P₁), not the two raw power values separately." },
    { q: "How is a voltage or current ratio converted to decibels?", a: "Voltage/current ratio to dB uses dB = 20 × log₁₀(ratio) — a factor of 20 instead of 10, because power is proportional to voltage squared. Doubling voltage (ratio = 2) gives 20 × log₁₀(2) ≈ 6.02 dB, while doubling power alone only gives 3.01 dB." },
    { q: "How do I convert decibels back to a ratio?", a: "For power, use Ratio = 10^(dB/10). For voltage or current, use Ratio = 10^(dB/20). Entering -3 dB in the dB-to-power mode returns a ratio of approximately 0.501 — confirming that -3 dB is the well-known 'half power point.' Entering -3 dB in the dB-to-voltage mode instead returns about 0.708." },
    { q: "Why does the calculator use 10× for power but 20× for voltage?", a: "Power (P = V²/R) is proportional to the square of voltage. A logarithm of a squared quantity doubles when pulled out front (log(x²) = 2 log(x)), so converting a voltage ratio to an equivalent power-based dB scale requires the extra factor of 2 — turning 10 into 20. This keeps a given dB value meaning the same thing whether you arrived at it through power or voltage." },
    { q: "Why is -3 dB called the half-power point?", a: "Because 10^(-3/10) ≈ 0.501, meaning a -3 dB power ratio leaves just over half the original power. This threshold is used constantly in filter design and frequency response analysis to define the edges of a passband — the '3 dB bandwidth' or '3 dB cutoff frequency.'" },
    { q: "Can I add decibel values together?", a: "Yes, and this is one of the main reasons dB is used industry-wide. Because dB is logarithmic, cascaded gains and losses along a signal chain add instead of multiply. A +10 dB amplifier stage followed by a -4 dB cable loss and another +6 dB stage totals +12 dB overall, without needing to multiply any raw ratios together." },
    { q: "What is the difference between dB, dBm, and dBW?", a: "dB is a relative unit comparing two values — it has no meaning on its own without a reference point. dBm is an absolute power unit referenced to 1 milliwatt (0 dBm = 1 mW), and dBW is referenced to 1 watt (0 dBW = 1 W). This calculator computes relative dB from ratios; it does not convert absolute power values in watts directly into dBm or dBW." },
    { q: "What does a negative dB value mean?", a: "A negative dB value indicates attenuation or loss rather than gain. In ratio-to-dB modes, entering a ratio less than 1 (meaning the output is smaller than the input) always produces a negative dB result. In dB-to-ratio modes, entering a negative dB value always returns a ratio less than 1." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your ratio and dB values, along with your calculation history, are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Choose a calculation mode", "Select Power Ratio to dB, Voltage/Current Ratio to dB, dB to Power Ratio, or dB to Voltage/Current Ratio depending on the direction of conversion you need."],
    ["Enter your value", "Type the ratio (for ratio-to-dB modes) or the dB figure (for dB-to-ratio modes) into the input box. Ratio values must be greater than zero for the logarithmic modes."],
    ["Let the calculator convert instantly", "The result updates in real time as you type, applying the correct 10× or 20× multiplier automatically based on the mode you selected."],
    ["Review the formula and steps", "Each result shows the exact formula used and a full breakdown of the logarithm calculation, useful for checking your work or learning the math."],
    ["Use a preset for common scenarios", "Pick from built-in presets like 2x power gain, 0.5x power loss, +3 dB, or -20 dB to quickly see standard reference values without typing them manually."],
    ["Save, copy, or export", "Save the calculation to your history, copy the result to your clipboard, or export a full text report for documentation."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Decibel (dB) Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>decibel (dB) calculator</strong> is a free online tool that converts between a power or
            voltage ratio and its equivalent decibel value. It answers the two questions every electronics,
            audio, and RF project runs into: <em>what does this gain or loss ratio equal in dB, and what
            ratio does this dB figure actually represent?</em>
          </p>
          <p>
            The decibel is a logarithmic unit, which makes it possible to work with enormous ranges — from a
            microphone's tiny voltage output to a radio transmitter's kilowatt power level — using compact,
            addable numbers instead of huge multiplied ratios. But the math has a catch: power ratios use a
            10× multiplier while voltage and current ratios use 20×, because power is proportional to voltage
            squared. This <strong>dB calculator</strong> applies the correct formula automatically so you
            never have to remember which multiplier goes with which quantity.
          </p>
          <p>
            This tool is built for <strong>audio engineers measuring amplifier gain and sound pressure
            levels, RF and electronics engineers working with attenuation and antenna gain, network and
            telecom technicians analyzing signal loss, and electronics students learning the power-versus-voltage
            dB relationship</strong>. All four conversion directions run instantly in your browser with
            full step-by-step working shown — free, with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Decibel Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Power ratio → dB</span>: dB = 10 × log₁₀(ratio)</p>
              <p><span className="font-semibold">Voltage ratio → dB</span>: dB = 20 × log₁₀(ratio)</p>
              <p><span className="font-semibold">dB → power ratio</span>: ratio = 10^(dB ÷ 10)</p>
              <p><span className="font-semibold">dB → voltage ratio</span>: ratio = 10^(dB ÷ 20)</p>
              <p className="text-gray-500 text-xs mt-2">ratio = P₂/P₁ or V₂/V₁ · a ratio above 1 is gain, below 1 is loss</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Four calculation modes:</strong> power ratio to dB, voltage/current ratio to dB, dB to power ratio, and dB to voltage/current ratio</li>
            <li><strong>Why 10× for power:</strong> dB is fundamentally defined as a power ratio, so power conversions use the log₁₀ result directly, scaled by 10</li>
            <li><strong>Why 20× for voltage:</strong> since power is proportional to voltage squared, a voltage ratio's logarithm must be doubled (multiplied by 20 instead of 10) to express the same dB scale as an equivalent power change</li>
            <li><strong>Gain vs loss:</strong> a positive dB result or a ratio greater than 1 means gain; a negative dB result or a ratio less than 1 means attenuation</li>
            <li><strong>Additive property:</strong> because dB is logarithmic, cascaded gains and losses in a signal chain can be added directly instead of multiplied</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Decibel Calculator
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
                "Real-time calculation as you type",
                "Four conversion modes covering both directions",
                "Correct 10× / 20× multiplier applied automatically",
                "Adjustable precision (2 to 6 decimal places)",
                "Full step-by-step calculation breakdown",
                "Built-in presets for common gain/loss scenarios",
                "Calculation history (last 20 entries)",
                "Export results as a text report",
                "Copy result to clipboard",
                "Remembers your last used mode",
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
              title: "Rating an Amplifier's Power Gain",
              scenario: "An electronics engineer measures an RF amplifier boosting power from 1 W to 10 W — a power ratio of 10. Using Power Ratio to dB mode with a value of 10, the calculator returns 10 dB of gain, matching the amplifier's advertised specification and confirming it meets its datasheet claim.",
            },
            {
              title: "Checking a Microphone Preamp's Voltage Gain",
              scenario: "An audio engineer measures a preamp doubling a microphone's output voltage — a ratio of 2. Using Voltage/Current Ratio to dB mode with a value of 2, the calculator returns 6.02 dB, the standard reference value audio engineers use to describe a voltage doubling.",
            },
            {
              title: "Finding the Half-Power Bandwidth of a Filter",
              scenario: "A filter designer needs to find where a lowpass filter's output has dropped to half power, the standard -3 dB cutoff definition. Using dB to Power Ratio mode with -3 dB, the calculator returns a ratio of 0.501 — confirming the filter's -3 dB point corresponds to just over half the input power, as expected.",
            },
            {
              title: "Calculating Total Cascaded System Gain",
              scenario: "A systems engineer has three stages: a +12 dB amplifier, a -4 dB cable loss, and a +8 dB second amplifier. Rather than multiplying three separate ratios, they simply add the dB values: 12 - 4 + 8 = 16 dB total system gain, then use dB to Power Ratio mode on 16 dB to confirm this equals approximately 39.8x overall power gain.",
            },
            {
              title: "Interpreting a Cable's -20 dB Attenuation Spec",
              scenario: "A network technician reads a cable datasheet listing -20 dB attenuation at a given frequency and wants to know what fraction of the signal actually survives. Using dB to Power Ratio mode with -20 dB, the calculator returns a ratio of 0.01 — meaning only 1% of the original signal power reaches the far end.",
            },
            {
              title: "Comparing Speaker Efficiency Ratings",
              scenario: "An audio engineer is comparing two speakers with a rated efficiency difference of 6 dB SPL at the same input power. Using dB to Voltage Ratio mode is not the right approach here since SPL follows the power-based scale — using dB to Power Ratio mode with 6 dB instead returns a ratio of about 3.98, meaning the more efficient speaker produces roughly four times the acoustic power for the same electrical input.",
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
                "Memorize a handful of reference points and you'll rarely need the calculator for quick estimates: +3 dB ≈ 2x power, +6 dB ≈ 2x voltage (4x power), +10 dB = 10x power, +20 dB = 10x voltage (100x power).",
                "When adding cascaded gains and losses in a signal chain, work entirely in dB and only convert to a ratio at the very end. Adding dB values directly avoids compounding rounding errors from repeated multiplication of ratios.",
                "If a datasheet gives you two raw values (like input power and output power) rather than a ratio, divide them yourself first (P₂ ÷ P₁), then enter that single ratio number into this calculator's ratio-to-dB mode.",
                "Remember that dB is always relative — it describes a change between two values, not an absolute quantity. If you need an absolute power level, you're looking for dBm (referenced to 1 mW) or dBW (referenced to 1 W), which this ratio-based calculator does not compute directly.",
                "For sound pressure level (SPL) and acoustic power comparisons, use the power-based (10×) formulas, not the voltage-based (20×) ones — acoustic intensity follows the power convention even though it isn't electrical.",
                "Use the built-in presets to sanity-check your intuition before trusting a manual calculation — if your hand-calculated answer doesn't roughly match the '2x power gain' or '+10 dB' presets, double-check which mode and multiplier you used.",
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
                "Don't use the 20× voltage formula on a power ratio, or the 10× power formula on a voltage ratio. Using the wrong multiplier doubles or halves your dB result — the single most common decibel calculation error.",
                "Don't confuse this ratio-based dB calculator with an absolute power converter. It computes relative gain/loss from a ratio you supply — it does not convert a raw watt or milliwatt value directly into dBm or dBW.",
                "Don't enter zero or a negative number into the ratio-to-dB modes. A logarithm is undefined for zero or negative inputs, since no ratio of two positive quantities can be zero or negative — the calculator will reject these values.",
                "Don't average dB values when combining parallel (not cascaded) signal paths. Adding is only valid for gains and losses in series along one signal chain; combining power from multiple independent sources requires converting back to ratios, summing, and converting the sum back to dB.",
                "Don't forget that a small dB difference can represent a large ratio difference. A jump from 20 dB to 40 dB isn't 'twice as much' — it's a 100x larger power ratio, since the scale is logarithmic, not linear.",
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
          Common dB Value Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">dB Value</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Power Ratio</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Voltage Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["+20 dB", "100x", "10x"],
                ["+10 dB", "10x", "3.162x"],
                ["+6 dB", "3.981x", "2x"],
                ["+3 dB", "1.995x (≈2x)", "1.413x"],
                ["0 dB", "1x", "1x"],
                ["-3 dB", "0.501x (≈half)", "0.708x"],
                ["-6 dB", "0.251x", "0.5x"],
                ["-10 dB", "0.1x", "0.316x"],
                ["-20 dB", "0.01x", "0.1x"],
              ].map(([db, p, v]) => (
                <tr key={db} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{db}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-900 text-xs">{p}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Power ratio uses 10 × log₁₀; voltage ratio uses 20 × log₁₀. Values rounded to 3 decimal places.</p>
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
          Who Uses This Decibel Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎚️", title: "Audio Engineers", desc: "Convert amplifier gain, microphone sensitivity, and sound pressure level specifications between raw ratios and dB for mixing and equipment comparisons." },
            { icon: "📡", title: "RF & Electronics Engineers", desc: "Calculate antenna gain, amplifier specifications, and signal attenuation across cascaded stages using additive dB values." },
            { icon: "🌐", title: "Network & Telecom Technicians", desc: "Interpret cable and connector loss specifications given in dB, converting them to power ratios to estimate actual signal strength at the far end." },
            { icon: "🎓", title: "Electronics Students", desc: "Practice the 10x versus 20x multiplier rule and work through gain/loss exercises with instant step-by-step verification." },
            { icon: "🔊", title: "Acoustics Professionals", desc: "Convert sound pressure level differences and noise reduction ratings between dB and power ratios for room and hearing-safety analysis." },
            { icon: "🔧", title: "System Design Engineers", desc: "Sum cascaded gain and loss stages across a signal chain quickly, verifying total system performance meets a target dB budget." },
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
