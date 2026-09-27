import { opAmpCalculatorConfig } from "./config";
export default function OpAmpCalculatorSEO() {
  const faqItems = opAmpCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = opAmpCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Op-Amp Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>op-amp calculator</strong> is a free electronics tool that finds the voltage gain and
            output voltage of an operational amplifier circuit from its resistor values and input voltage. It
            covers the four configurations that form the foundation of analog design — inverting amplifier,
            non-inverting amplifier, voltage follower, and summing amplifier — and answers the question every
            analog designer starts with: <em>what output voltage will this resistor network and input signal
            produce?</em>
          </p>
          <p>
            Op-amp gain formulas look deceptively simple, but small mistakes are common: forgetting the sign
            flip on an inverting stage, assuming non-inverting gain can attenuate when it can only amplify, or
            mixing up resistor units between kΩ and Ω. This calculator applies the correct ideal op-amp formula
            for whichever configuration you're working with and shows every step of the math.
          </p>
          <p>
            This <strong>operational amplifier calculator</strong> is built for <strong>electronics students
            learning op-amp theory, circuit designers prototyping analog front-ends, audio engineers building
            mixer and buffer stages, and hobbyists checking a breadboard build against the expected
            output</strong>. It supports all four circuit types, includes built-in presets for each, saves
            your last 10 calculations, and runs entirely in your browser — free, with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Op-Amp Gain Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas by Configuration</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Inverting:</span> Gain = −(R2 ÷ R1) · Vout = Gain × Vin</p>
              <p><span className="font-semibold">Non-Inverting:</span> Gain = 1 + (R2 ÷ R1) · Vout = Gain × Vin</p>
              <p><span className="font-semibold">Voltage Follower:</span> Gain = 1 · Vout = Vin</p>
              <p><span className="font-semibold">Summing:</span> Vout = −Rf × (V1÷R1 + V2÷R2 + V3÷R3)</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Virtual ground:</strong> negative feedback forces the inverting input to sit at the same voltage as the non-inverting input — the assumption every one of these formulas relies on</li>
            <li><strong>Sign convention:</strong> inverting and summing configurations always flip the output's polarity; non-inverting and voltage follower configurations preserve it</li>
            <li><strong>Gain floor:</strong> non-inverting gain can never fall below 1 since the formula is always 1 plus a positive ratio; inverting gain has no such floor and can attenuate as well as amplify</li>
            <li><strong>Resistor units:</strong> each resistor can be entered independently in Ω, kΩ, or MΩ — the calculator normalizes everything to ohms before computing</li>
            <li><strong>Ideal assumptions:</strong> all formulas assume an ideal op-amp with infinite open-loop gain and infinite input impedance — real output is still limited by the supply rails</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Op-Amp Calculator
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
                "Real-time gain and Vout calculation as you type",
                "4 configurations: inverting, non-inverting, follower, summing",
                "Independent Ω / kΩ / MΩ units per resistor",
                "Up to 3 weighted inputs for summing amplifiers",
                "Full step-by-step formula breakdown",
                "Built-in presets for every configuration",
                "Calculation history (last 10 entries saved)",
                "Export results as a text report",
                "Copy result to clipboard",
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
              title: "Audio Phase-Inverting Stage",
              scenario: "An audio engineer needs to invert a 1V line-level signal by 10× for a mixing console's phase-flip channel. Using Inverting mode with R1 = 1 kΩ, R2 = 10 kΩ, Vin = 1V, the calculator returns Gain = −10 and Vout = −10V — confirming the correct polarity flip and magnitude.",
            },
            {
              title: "Weak Sensor Signal Amplification",
              scenario: "A circuit designer needs to boost a 100 mV sensor output to a usable ADC input range. Using Non-Inverting mode with R1 = 1 kΩ, R2 = 100 kΩ, Vin = 0.1V, the calculator returns Gain = 101 and Vout = 10.1V — well within a typical 0–12V ADC input range.",
            },
            {
              title: "High-Impedance Sensor Buffer",
              scenario: "A hobbyist is buffering a high-impedance photodiode output before feeding it into a low-impedance ADC input. Using Voltage Follower mode with Vin = 3.3V, the calculator confirms Gain = 1 and Vout = 3.3V — the signal passes through unchanged while gaining drive strength.",
            },
            {
              title: "2-Channel Audio Mixer",
              scenario: "An audio hobbyist is combining two 1V line-level channels into a single mix bus. Using Summing mode with Vin1 = 1V, Vin2 = 1V, Rf = 10 kΩ, Ri1 = 10 kΩ, Ri2 = 10 kΩ, the calculator returns Vout = −2V — the two signals summed and inverted equally.",
            },
            {
              title: "Weighted Summing DAC Stage",
              scenario: "An electronics student is building a simple 2-bit weighted summer where the second channel should contribute twice the weight of the first. Using Summing mode with Vin1 = 1V, Vin2 = 1V, Rf = 10 kΩ, Ri1 = 10 kΩ, Ri2 = 5 kΩ, the calculator returns Vout = −3V — channel 1 contributes −1V and channel 2 contributes −2V to the total.",
            },
            {
              title: "Unity-Gain Signal Inverter",
              scenario: "An engineer needs to flip the polarity of a 5V control signal without changing its magnitude, for a downstream circuit expecting a negative reference. Using Inverting mode with R1 = 10 kΩ, R2 = 10 kΩ, Vin = 5V, the calculator returns Gain = −1 and Vout = −5V — an exact sign flip with no attenuation or amplification.",
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
                "Remember non-inverting gain is always ≥ 1 since the formula is 1 + (R2/R1) — you can never attenuate a signal in this configuration. If you need gain below 1, switch to an inverting amplifier with R2 smaller than R1, or use a passive voltage divider instead.",
                "In the inverting configuration, R1 also sets the input impedance seen by the source (Zin ≈ R1). Choose R1 large enough not to load down a high-impedance source, but not so large that the op-amp's input bias current introduces a meaningful offset error.",
                "Use a voltage follower whenever you need to isolate a high-impedance source — like a sensor, photodiode, or piezo element — from a low-impedance load, without adding gain or inverting the signal.",
                "In a summing amplifier, each input's weight is set purely by its own resistor ratio (Rf/Rn), completely independent of the other inputs. This lets you mix multiple signals with different gains simultaneously without them interacting with each other.",
                "Check your computed Vout against your real supply rails before building the circuit. An ideal formula will happily return 15V from a design running on ±12V rails — the real op-amp will simply clip a couple volts below the rail instead of reaching that value.",
                "Prefer standard resistor values — 1k, 2.2k, 4.7k, 10k, 100k — over solving for an exact non-standard ratio. Since gain depends only on the ratio between resistors, scaling both up or down by the same factor gives the same gain with easier-to-source parts.",
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
                "Don't forget the sign on an inverting amplifier. A 'gain of 10' inverting stage produces an output 10× larger in magnitude but flipped in polarity — treating it as a same-sign gain like a non-inverting stage is one of the most common beginner mistakes.",
                "Don't assume R1 and R2 share the same unit. This calculator lets you set Ω, kΩ, or MΩ independently per resistor — entering '100' meaning 100 kΩ into a field set to Ω throws the computed gain off by a factor of 1,000.",
                "Don't leave a summing amplifier's unused input resistor at zero instead of leaving that channel unfilled — a resistor value of zero causes a divide-by-zero in the Vn/Rn term, not a channel that simply contributes nothing.",
                "Don't expect a voltage follower to provide any amplification. It exists purely to buffer and isolate — if your design needs gain, use a non-inverting configuration with an appropriate R1/R2 ratio instead.",
                "Don't treat the ideal-op-amp formulas as the final word for precision designs. Real op-amps have finite open-loop gain, input offset voltage, and bias current — for high-precision or low-gain designs, cross-check your resistor choices against the actual op-amp's datasheet specs.",
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

      {/* ── 6. Configuration Comparison Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Op-Amp Configuration Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Configuration</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Gain Formula</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Inverts Signal?</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Input Impedance</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Inverting", "−(R2 ÷ R1)", "Yes", "≈ R1", "Signal inversion, attenuation, mixing"],
                ["Non-Inverting", "1 + (R2 ÷ R1)", "No", "Very high", "Sensor & instrumentation preamps"],
                ["Voltage Follower", "1", "No", "Very high", "Buffering, impedance isolation"],
                ["Summing", "−Rf ÷ Rn per input", "Yes", "≈ Rn per input", "Audio mixers, weighted DACs"],
              ].map(([type, formula, inv, zin, use]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{type}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{formula}</td>
                  <td className="py-1.5 px-3 text-gray-600 text-xs">{inv}</td>
                  <td className="py-1.5 px-3 text-gray-600 text-xs">{zin}</td>
                  <td className="py-1.5 px-3 text-gray-500 text-xs">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* All formulas assume an ideal op-amp with infinite open-loop gain and infinite input impedance. Real output voltage is limited by the actual supply rails.</p>
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
          Who Uses This Op-Amp Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Electronics Students", desc: "Work through inverting, non-inverting, and summing amplifier problems from coursework, checking hand-solved gain and Vout values before an exam or lab report." },
            { icon: "🏗️", title: "Circuit Designers", desc: "Prototype analog front-end stages and verify resistor ratios produce the target gain before committing values to a schematic or PCB layout." },
            { icon: "🎚️", title: "Audio Engineers", desc: "Design mixer summing stages, buffer stages, and phase-inverting circuits, calculating exact resistor ratios needed for a target mix level." },
            { icon: "🔧", title: "Electronics Hobbyists", desc: "Check a breadboard op-amp build against the expected output voltage, using presets to confirm the calculator matches known reference designs first." },
            { icon: "🤖", title: "Maker & Robotics Hobbyists", desc: "Buffer sensor signals with a voltage follower or amplify weak analog readings with a non-inverting stage before feeding a microcontroller's ADC." },
            { icon: "⚙️", title: "Electrical Engineers", desc: "Cross-check hand calculations or SPICE simulation results for op-amp stages during design review, catching sign or resistor-unit errors quickly." },
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
