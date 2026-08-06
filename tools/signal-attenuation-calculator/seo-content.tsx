export default function SignalAttenuationCalculatorSEO() {
  const faqItems = [
    { q: "What is a signal attenuation calculator?", a: "A signal attenuation calculator computes how much a signal weakens in decibels (dB) as it passes through a cable, component, or system. It supports three input methods — power levels, voltage levels, or a distance-based cable loss rate — and returns the attenuation in dB along with the percentage of signal lost." },
    { q: "How is power-based attenuation calculated?", a: "Power attenuation uses the formula dB = 10 × log₁₀(P₁ / P₂), where P₁ is input power and P₂ is output power, both converted to watts internally. For example, a signal entering at 100 W and leaving at 50 W has an attenuation of 10 × log₁₀(100/50) = 10 × log₁₀(2) ≈ 3.01 dB — the classic 'half power' point." },
    { q: "How is voltage-based attenuation calculated?", a: "Voltage attenuation uses dB = 20 × log₁₀(V₁ / V₂), with the factor of 20 instead of 10 because power is proportional to voltage squared. A signal dropping from 10 V to 5 V has an attenuation of 20 × log₁₀(10/5) = 20 × log₁₀(2) ≈ 6.02 dB — twice the dB value of an equivalent power halving." },
    { q: "How is distance-based attenuation calculated?", a: "Distance-based attenuation multiplies a known loss rate by the cable or path length: Total Loss (dB) = Loss per unit × Distance. For example, RG-58 coaxial cable rated at 0.2 dB per meter run for 50 meters produces a total loss of 0.2 × 50 = 10 dB." },
    { q: "Why does the calculator use 10 for power and 20 for voltage?", a: "Because power is proportional to voltage squared (P = V²/R), converting a voltage ratio into an equivalent power-based dB figure requires doubling the multiplier. Using 10 for power and 20 for voltage keeps both calculations consistent — a doubling of voltage (20 × log₁₀2 ≈ 6.02 dB) corresponds to a quadrupling of power (10 × log₁₀4 ≈ 6.02 dB), the same dB value." },
    { q: "What is the difference between attenuation and gain?", a: "Attenuation means the output is weaker than the input — a positive loss in dB. If the output value you enter is larger than the input, the calculation produces a negative dB figure, which the calculator flags as gain rather than attenuation, since the signal was amplified rather than weakened." },
    { q: "What is a typical attenuation value for common cables?", a: "RG-58 coaxial cable loses about 0.2 dB per meter at 100 MHz, Cat6 Ethernet cable loses about 0.05 dB per meter at 100 MHz, and single-mode fiber optic cable loses roughly 0.2 to 0.3 dB per kilometer. These are starting reference values — actual loss depends on frequency, cable quality, and connector count." },
    { q: "What does dBm mean in the power attenuation mode?", a: "dBm is a power unit referenced to 1 milliwatt, calculated as dBm = 10 × log₁₀(P in mW / 1 mW). It's the standard unit for RF signal strength because it compresses a huge dynamic range into manageable numbers — 0 dBm equals 1 mW, and 30 dBm equals 1 watt. The calculator accepts dBm directly and converts it to watts internally before computing attenuation." },
    { q: "How accurate is distance-based attenuation for real cable runs?", a: "Distance-based attenuation gives an estimate based on the loss-per-unit figure you supply, which itself depends on frequency, cable quality, and temperature. It does not automatically include connector losses, splice losses, or bends, which should be added separately — a common rule of thumb is 0.1 to 0.5 dB per connector on RF systems." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your power, voltage, and distance values, along with your calculation history, are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Choose a calculation mode", "Select Power, Voltage, or Distance depending on what data you have. Power and voltage modes compare an input and output level directly; distance mode multiplies a known loss rate by cable length."],
    ["Enter your input and output values", "For power or voltage mode, type the input level and output level with their units (W, mW, dBm for power; V, mV for voltage). For distance mode, enter the loss-per-unit rate and the total distance."],
    ["Select the correct units", "Match the unit dropdowns to how your measurements were taken — mixing up W and mW, or m and km, is the most common source of a wildly wrong result."],
    ["Read the attenuation result", "The calculator returns the loss in dB, flags whether it's a loss or a gain, and for power/voltage modes shows the percentage of signal strength lost."],
    ["Review the calculation steps", "Every result includes the full formula substitution — the exact numbers plugged into 10log₁₀ or 20log₁₀ — so you can verify the math or show your work."],
    ["Save, copy, or export", "Save the result to your calculation history, copy it to your clipboard, or export a full text report for project documentation."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Signal Attenuation Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>signal attenuation calculator</strong> is a free online tool that measures how much a
            signal weakens as it passes through a cable, connector, or system, expressed in decibels (dB).
            It answers the question every RF, telecom, or audio project runs into: <em>if the signal entering
            a cable is this strong and the signal coming out is that strong, exactly how much did I lose?</em>
          </p>
          <p>
            Attenuation shows up in three common forms, and this <strong>dB loss calculator</strong> handles
            all three directly: comparing two power readings (10 × log₁₀(P₁/P₂)), comparing two voltage
            readings (20 × log₁₀(V₁/V₂) — note the doubled multiplier, since power scales with voltage
            squared), or multiplying a cable's known loss-per-unit rating by its length. Getting the wrong
            multiplier or mixing up units is the single most common source of attenuation calculation errors.
          </p>
          <p>
            This tool is built for <strong>RF engineers analyzing transmission line and antenna loss,
            telecom and network engineers planning fiber and copper cable runs, audio engineers tracking
            signal loss through cables and equipment, and electronics students learning the power-vs-voltage
            dB relationship</strong>. Every mode shows full step-by-step working, supports W/mW/dBm and V/mV
            unit conversions, and runs entirely in your browser — free, with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Signal Attenuation Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Power mode</span>: dB = 10 × log₁₀(P₁ ÷ P₂)</p>
              <p><span className="font-semibold">Voltage mode</span>: dB = 20 × log₁₀(V₁ ÷ V₂)</p>
              <p><span className="font-semibold">Distance mode</span>: Total Loss (dB) = Loss per unit × Distance</p>
              <p className="text-gray-500 text-xs mt-2">P₁/V₁ = input · P₂/V₂ = output · all values normalized to base units before calculation</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Power units:</strong> watts (W), milliwatts (mW), and dBm are all accepted and normalized to watts internally</li>
            <li><strong>Voltage units:</strong> volts (V) and millivolts (mV) are accepted and normalized to volts</li>
            <li><strong>Distance units:</strong> meters (m), kilometers (km), and feet (ft) for the distance mode's loss-per-unit calculation</li>
            <li><strong>Gain detection:</strong> if the output level exceeds the input level, the result is negative and the calculator reports it as a gain, not a loss</li>
            <li><strong>Signal loss percentage:</strong> power and voltage modes also compute the percentage of the original signal lost, calculated as (input − output) ÷ input × 100</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Signal Attenuation Calculator
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
                "Three modes — power, voltage, and distance based",
                "W, mW, and dBm power unit support",
                "V and mV voltage unit support",
                "m, km, and ft distance unit support",
                "Automatic gain vs loss detection",
                "Signal loss percentage alongside dB result",
                "Full step-by-step calculation breakdown",
                "Built-in presets for each mode",
                "Calculation history (last 20 entries)",
                "Export results as a text report",
                "100% browser-based — no data sent to a server",
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
              title: "Coaxial Cable Run for a Radio Antenna",
              scenario: "An amateur radio operator is running 50 meters of RG-58 coaxial cable from a transmitter to an antenna, rated at 0.2 dB per meter. Using Distance mode with 0.2 dB/m and 50 m, the calculator returns a total loss of 10 dB — meaning the antenna receives only 10% of the transmitter's output power, prompting the operator to switch to lower-loss LMR-400 cable instead.",
            },
            {
              title: "RF Amplifier Power Check",
              scenario: "An RF technician measures 100 W entering a lossy connector and 85 W coming out the other side. Using Power mode with 100 W input and 85 W output, the calculator returns 0.71 dB attenuation and a 15% signal loss — within the connector's rated tolerance, so the technician approves it for continued use.",
            },
            {
              title: "Audio Cable Voltage Drop",
              scenario: "An audio engineer measures a 1000 mV (1 V) signal entering a long cable run and only 500 mV at the receiving end. Using Voltage mode with 1000 mV input and 500 mV output, the calculator returns 6.02 dB attenuation — a much larger dB figure than an equivalent power halving (3.01 dB) because voltage attenuation uses the ×20 multiplier.",
            },
            {
              title: "Fiber Optic Long-Haul Link Budget",
              scenario: "A telecom engineer is planning a 100 km single-mode fiber run rated at 0.3 dB per km. Using Distance mode with 0.3 dB/km and 100 km, the calculator returns 30 dB of total loss, which the engineer compares against the receiver's minimum sensitivity to confirm the link will close without needing a repeater.",
            },
            {
              title: "Identifying an Amplifier Gain Stage",
              scenario: "An engineer measures 5 mW entering an amplifier stage and 50 mW at the output. Using Power mode with 5 mW input and 50 mW output, the calculator returns 10 dB — but flags it as gain rather than attenuation, since the output power is ten times larger than the input, confirming the stage is amplifying rather than attenuating the signal.",
            },
            {
              title: "Cat6 Ethernet Cable Loss Estimate",
              scenario: "A network installer is running 100 meters of Cat6 cable at 100 MHz, rated at approximately 0.05 dB per meter. Using Distance mode with 0.05 dB/m and 100 m, the calculator returns 5 dB of insertion loss — well within the TIA/EIA-568 standard's maximum allowable channel loss for a 100-meter run.",
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
                "Memorize the key reference points: 3 dB loss means half power, 6 dB loss means half voltage (or quarter power), and 10 dB loss means one-tenth power. These let you sanity-check the calculator's output mentally before trusting a result.",
                "When you only have a cable's dB/100ft or dB/100m rating from a datasheet, convert it to a per-unit figure first (divide by 100) before entering it into Distance mode, since the calculator expects loss per single unit, not per hundred units.",
                "Add connector and splice losses separately from the cable's rated attenuation. A typical RF connector adds 0.1 to 0.5 dB, and each fiber splice adds roughly 0.1 to 0.3 dB — these aren't included in a cable's per-meter or per-km rating.",
                "For RF link budgets, work in dBm throughout rather than converting back and forth to watts, since dBm inputs and outputs can be subtracted directly for a quick gain/loss estimate without running the full logarithmic calculation each time.",
                "Use the signal loss percentage figure, not just the dB value, when explaining results to a non-technical audience — '85% of the signal was lost' communicates more clearly than '8.2 dB attenuation' to someone without an RF background.",
                "Save each stage of a multi-component signal chain (cable, connector, splitter) to history so you can add up the individual dB losses into a total system budget instead of recalculating the whole chain from scratch.",
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
                "Don't use the power formula (×10) on voltage readings or the voltage formula (×20) on power readings. Using the wrong multiplier doubles or halves your dB result — a common error when switching between measurement types mid-project.",
                "Don't mix W and mW, or V and mV, without checking the unit dropdowns. Entering '100' intending 100 mW while the field is set to W changes your result by a factor of a thousand in the underlying power values.",
                "Don't forget that distance-based attenuation is a straight-line multiplication and does not account for frequency-dependent loss. Cable attenuation ratings are frequency-specific — a rating given at 100 MHz will understate the loss at 1 GHz.",
                "Don't treat the loss-per-unit figure as universal across cable batches or manufacturers. Always use the specific rating from your cable's datasheet at the frequency you're operating at, not a generic rule-of-thumb value.",
                "Don't ignore a negative attenuation result. A negative dB figure means the calculator detected the output as larger than the input — this is a gain condition, not an error, and usually means you've entered an active amplifier stage rather than a passive lossy element.",
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
          dB Loss Reference Table
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>dB Value vs Power and Voltage Ratio</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">dB Loss</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Power Remaining</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Voltage Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1 dB", "79.4%", "89.1%"],
                    ["3 dB", "50.1%", "70.8%"],
                    ["6 dB", "25.1%", "50.1%"],
                    ["10 dB", "10.0%", "31.6%"],
                    ["20 dB", "1.0%", "10.0%"],
                    ["30 dB", "0.1%", "3.16%"],
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
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Typical Cable Attenuation Values</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Cable Type</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Loss</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Common Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["RG-58 Coaxial", "0.2 dB/m @ 100 MHz", "Amateur radio, RF"],
                    ["RG-6 Coaxial", "0.1 dB/m @ 100 MHz", "Cable TV, satellite"],
                    ["Cat6 Ethernet", "0.05 dB/m @ 100 MHz", "Networking"],
                    ["Single-mode Fiber", "0.2-0.3 dB/km", "Long-distance telecom"],
                    ["Multimode Fiber", "2-3 dB/km", "Short-distance / LAN"],
                  ].map(([cable, loss, use]) => (
                    <tr key={cable} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{cable}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 text-xs">{loss}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Benchmarks are approximate. Actual attenuation varies by frequency, manufacturer, temperature, and connector quality.</p>
          </div>
        </div>
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
          Who Uses This Signal Attenuation Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📡", title: "RF Engineers", desc: "Calculate transmission line and connector loss when designing antenna feed systems, verifying that enough power reaches the radiating element." },
            { icon: "🌐", title: "Telecom & Network Engineers", desc: "Estimate fiber and copper cable loss over long distances to confirm a link budget closes before installation." },
            { icon: "🎚️", title: "Audio Engineers", desc: "Track voltage signal loss through long cable runs and patch bays to diagnose weak or noisy signal paths." },
            { icon: "📻", title: "Radio Hobbyists", desc: "Compare coaxial cable options for antenna feedlines, balancing cost against acceptable transmit and receive signal loss." },
            { icon: "🎓", title: "Electronics Students", desc: "Practice the power (×10) versus voltage (×20) dB formulas and build intuition for how attenuation compounds over distance." },
            { icon: "🔧", title: "Installation Technicians", desc: "Verify that a completed cable run meets its specified loss budget before signing off on a network or broadcast installation." },
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
