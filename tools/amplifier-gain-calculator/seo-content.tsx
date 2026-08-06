export default function AmplifierGainCalculatorSEO() {
  const faqItems = [
    { q: "What is an amplifier gain calculator?", a: "An amplifier gain calculator is a tool that computes how much an electronic amplifier increases a signal's amplitude, expressed as a linear ratio and in decibels (dB). It supports four modes — voltage gain, current gain, power gain, and direct dB conversion — covering the way gain is specified across audio, RF, and general circuit design work." },
    { q: "How is amplifier gain calculated?", a: "Voltage gain is Av = Vout ÷ Vin, current gain is Ai = Iout ÷ Iin, and power gain is Ap = Pout ÷ Pin — each is simply the output value divided by the input value. To convert to decibels, voltage and current gain use dB = 20 × log₁₀(gain), while power gain uses dB = 10 × log₁₀(gain), because power is proportional to the square of voltage or current." },
    { q: "What is the difference between voltage gain, current gain, and power gain?", a: "Voltage gain compares output voltage to input voltage and is the figure most often quoted for op-amp circuits and audio preamplifiers. Current gain compares output current to input current and is the key spec for transistor stages, where it is often called beta or hFE. Power gain compares output power to input power and is what matters for RF transmitters and audio power amplifiers, where delivered wattage is the real-world result." },
    { q: "Why use decibels (dB) for amplifier gain?", a: "Decibels convert multiplication into addition. Instead of multiplying the linear gain of five cascaded amplifier stages together, you simply add their dB figures to get the total system gain. This logarithmic scale also compresses very large gain ratios — like 100,000 — into manageable numbers like 100 dB, which is why every datasheet and spec sheet in electronics quotes gain in dB." },
    { q: "What is the difference between the 20×log10 and 10×log10 dB formulas?", a: "Power is proportional to the square of voltage or current (P = V²/R), so converting a voltage or current ratio to dB uses 20 × log₁₀ to account for that squared relationship, while a power ratio — already in the right units — uses 10 × log₁₀ directly. Using the wrong formula for the wrong quantity doubles or halves your dB figure, a very common source of error." },
    { q: "What is unity gain?", a: "Unity gain means the output exactly equals the input — a linear gain of 1, or 0 dB. Unity gain buffers (voltage followers) are used for impedance matching and signal isolation between circuit stages without adding amplification, and they are one of the most common op-amp configurations in analog design." },
    { q: "Can amplifier gain be negative or less than 1?", a: "Yes. A linear gain less than 1 — corresponding to negative dB — means the output is smaller than the input, which is attenuation rather than amplification. This is the normal, expected result for passive attenuators, voltage dividers, long cable runs, and filters operating outside their passband." },
    { q: "How do I calculate total gain across multiple cascaded amplifier stages?", a: "Convert each stage's linear gain to dB using this calculator's dB Conversion mode, then add the dB figures together. For example, three stages with linear gains of 5, 8, and 20 convert to roughly 14 dB, 18 dB, and 26 dB — summing to 58 dB total, which matches multiplying the linear gains directly (5 × 8 × 20 = 800, and 20 × log₁₀(800) ≈ 58 dB)." },
    { q: "Does power gain equal voltage gain times current gain?", a: "Yes, when the same impedance applies at the input and output, Ap = Av × Ai, because power equals voltage times current. If the input and output impedances differ — common in RF and transformer-coupled stages — this identity no longer holds directly, and power gain must be calculated from actual input and output power rather than derived from voltage gain alone." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, current, power, and gain values are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Select a calculation mode", "Choose Voltage Gain, Current Gain, Power Gain, or dB Conversion depending on which quantities you know. Each mode swaps in the correct input fields and the correct dB formula automatically."],
    ["Enter your input and output values", "For voltage, current, or power mode, type the input and output readings in matching units — both in volts, both in amps, or both in watts. For dB Conversion mode, enter a single linear gain value directly."],
    ["Try a built-in preset", "Load a preset like Audio Preamp, Transistor β = 100, or 100W Power Amp to see realistic values before entering your own measurements — useful for sanity-checking that your inputs are in the right ballpark."],
    ["Read the linear and dB results", "The calculator instantly returns the linear gain ratio (Av, Ai, or Ap) alongside the equivalent decibel value, using 20×log₁₀ for voltage and current or 10×log₁₀ for power."],
    ["Review the step-by-step breakdown", "Expand the calculation steps to see exactly which formula was applied and how each number was derived — useful for homework, lab reports, or double-checking a design by hand."],
    ["Save or export your result", "Copy the result to your clipboard or export a full text report. The last 10 calculations are saved automatically so you can compare gain across different stages or designs."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Amplifier Gain Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>amplifier gain calculator</strong> is a free electronics tool that finds how much a
            circuit amplifies a signal, computed as a linear ratio and expressed in decibels (dB). It covers
            four ways gain is specified in real datasheets and spec sheets: voltage gain, current gain, power
            gain, and direct dB conversion. It answers the question every amplifier design starts with:{" "}
            <em>how many times bigger is the output than the input, and what does that look like in dB?</em>
          </p>
          <p>
            Gain calculations look simple — divide output by input — but the details trip people up: voltage
            and current gain convert to dB with a factor of 20, power gain uses a factor of 10, and cascaded
            stages need dB figures added rather than linear ratios multiplied. Getting the wrong formula gives
            a dB figure that's exactly double or half of the correct value, an error that's easy to make and
            hard to spot without a reference.
          </p>
          <p>
            This <strong>gain calculator</strong> is built for <strong>audio engineers designing preamp and
            power amp stages, RF engineers budgeting transmitter and receiver chains, electronics students
            learning gain and decibel theory, circuit designers verifying op-amp and transistor stages, and
            hobbyists checking a build against a datasheet spec</strong>. It runs every mode with instant
            results, four presets per mode, saved calculation history, and full step-by-step working — free,
            browser-based, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Amplifier Gain Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas by Mode</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Voltage Gain:</span> Av = Vout ÷ Vin · dB = 20 × log₁₀(Av)</p>
              <p><span className="font-semibold">Current Gain:</span> Ai = Iout ÷ Iin · dB = 20 × log₁₀(Ai)</p>
              <p><span className="font-semibold">Power Gain:</span> Ap = Pout ÷ Pin · dB = 10 × log₁₀(Ap)</p>
              <p><span className="font-semibold">dB Conversion:</span> dB = 20 × log₁₀(Gain) — for a known linear voltage/current gain</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Voltage &amp; current gain:</strong> use the 20×log₁₀ factor because power scales with the square of voltage or current — doubling voltage quadruples power, and the factor of 20 (instead of 10) accounts for that</li>
            <li><strong>Power gain:</strong> uses 10×log₁₀ directly since it's already a power ratio, not a voltage or current ratio</li>
            <li><strong>dB Conversion mode:</strong> takes a single linear gain figure — such as one you already calculated or read off a datasheet — and returns its dB equivalent using the 20×log₁₀ convention</li>
            <li><strong>Cascaded stages:</strong> total system gain in dB is the sum of each stage's dB gain — the logarithmic equivalent of multiplying the linear gains together</li>
            <li><strong>Attenuation:</strong> any linear gain below 1 converts to a negative dB value, correctly representing signal loss rather than amplification</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Amplifier Gain Calculator
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
                "Voltage, current, power, and dB conversion modes",
                "4 built-in presets per mode",
                "Automatic 20×log₁₀ / 10×log₁₀ formula selection",
                "Full step-by-step formula breakdown",
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
              title: "Microphone Preamp Voltage Gain",
              scenario: "An audio engineer needs to boost a 10 mV microphone signal up to a 1V line level for mixing. Using Voltage Gain mode with Vin = 0.01V and Vout = 1V, the calculator returns Av = 100 and 40 dB — confirming the preamp stage needs exactly 100× voltage amplification to hit line level.",
            },
            {
              title: "RF Transmitter Power Budget",
              scenario: "An RF engineer is budgeting a transmitter chain that must raise a 1 mW oscillator signal to a 1W final output stage. Using Power Gain mode with Pin = 0.001W and Pout = 1W, the calculator returns Ap = 1000 and 30 dB — the exact power gain figure the amplifier chain must deliver across its stages.",
            },
            {
              title: "Verifying a Transistor's Beta",
              scenario: "An electronics student measures a base current of 0.1 mA and a collector current of 10 mA on a BJT circuit. Using Current Gain mode with Iin = 0.0001A and Iout = 0.01A, the calculator returns Ai = 100 (40 dB) — confirming the measured β matches the transistor's datasheet-typical hFE of 100.",
            },
            {
              title: "Darlington Pair Output Stage",
              scenario: "A circuit designer is sizing a Darlington pair to drive a 10 mA relay coil from a 10 µA microcontroller output. Using Current Gain mode with Iin = 0.00001A and Iout = 0.01A, the calculator returns Ai = 1000 and 60 dB — confirming the Darlington configuration delivers the very high current gain the driver stage needs.",
            },
            {
              title: "Cascaded Multi-Stage Gain Budget",
              scenario: "An engineer designing a 3-stage RF receiver chain has individual stage gains of 5, 8, and 20. Converting each with dB Conversion mode gives roughly 14 dB, 18 dB, and 26 dB. Adding them gives 58 dB total system gain — matching a direct linear multiplication of 5 × 8 × 20 = 800, which also converts to about 58 dB.",
            },
            {
              title: "Attenuator Pad Verification",
              scenario: "A test technician measures 2V into a passive attenuator pad and 0.2V out. Using Voltage Gain mode with Vin = 2V and Vout = 0.2V, the calculator returns Av = 0.1 and −20 dB — confirming the pad delivers its rated 20 dB of attenuation rather than amplification.",
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
                "Keep input and output values in the same unit before entering them. Mixing millivolts and volts, or milliamps and amps, silently shifts the linear gain by a factor of 1,000 — and that error compounds into a 60 dB swing in the decibel result.",
                "When budgeting a multi-stage design, convert every stage's linear gain to dB with the dB Conversion mode and add them. Adding dB figures is far less error-prone than multiplying several linear ratios by hand, especially across five or more stages.",
                "Remember Ap = Av × Ai only holds when the input and output impedances match. In RF and transformer-coupled stages where impedance changes between ports, calculate power gain directly from measured input and output power instead of deriving it from voltage gain alone.",
                "A negative dB result is not an error — it correctly represents attenuation. Use it to verify cable loss, filter roll-off outside the passband, or an attenuator pad's rated loss against a real measurement.",
                "Use the built-in presets to sanity-check your formula choice. Loading '100W Power Amp' should return exactly 20 dB, not 40 dB — if your own power-gain numbers show double that, you've likely applied the 20×log₁₀ voltage/current formula instead of the correct 10×log₁₀ power formula.",
                "For quick mental estimates, memorize the key reference points: 6 dB ≈ doubling (voltage/current) or 3 dB ≈ doubling (power), 20 dB = 10× voltage or current gain, and 10 dB = 10× power gain.",
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
                "Don't use the 20×log₁₀ formula on a power ratio, or the 10×log₁₀ formula on a voltage or current ratio. Applying the wrong factor doubles or halves your dB figure — a 20 dB power gain incorrectly computed with the voltage formula would show as 40 dB.",
                "Don't average dB values when combining cascaded stages — add them. Averaging assumes the stages contribute equally regardless of order, but decibels are additive precisely because they represent multiplied linear ratios; averaging gives a meaningless, understated total.",
                "Don't enter a zero or negative value into dB Conversion mode. The logarithm of zero or a negative number is undefined, which is why this mode requires a positive linear gain — express attenuation as a fraction less than 1, such as 0.1, not as a negative number.",
                "Don't treat Vout = 0 as a normal calculator input for voltage gain. It's mathematically valid (a fully attenuated or shorted output) but produces −∞ dB, which the calculator displays as '∞' — that symbol signals a fully dead signal path, not a broken calculation.",
                "Don't forget gain figures from different domains aren't directly comparable without context. A 40 dB voltage gain and a 40 dB power gain represent very different linear ratios (100× vs 10,000×) — always check which formula produced the number before comparing two dB specs.",
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

      {/* ── 6. Gain Mode Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Gain Mode Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Mode</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Linear Formula</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">dB Formula</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Voltage Gain (Av)", "Vout ÷ Vin", "20 × log₁₀(Av)", "1V ÷ 10mV = 100 → 40 dB"],
                ["Current Gain (Ai)", "Iout ÷ Iin", "20 × log₁₀(Ai)", "10mA ÷ 0.1mA = 100 → 40 dB"],
                ["Power Gain (Ap)", "Pout ÷ Pin", "10 × log₁₀(Ap)", "100W ÷ 1W = 100 → 20 dB"],
                ["dB Conversion", "n/a (gain given)", "20 × log₁₀(Gain)", "Gain = 1000 → 60 dB"],
              ].map(([mode, formula, dbf, ex]) => (
                <tr key={mode} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{mode}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{formula}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{dbf}</td>
                  <td className="py-1.5 px-3 text-green-700 font-mono text-xs">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* dB Conversion mode always applies the 20×log₁₀ voltage/current convention. For a power ratio, use Power Gain mode so the correct 10×log₁₀ formula is applied.</p>
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
          Who Uses This Amplifier Gain Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎚️", title: "Audio Engineers", desc: "Size preamp and power amplifier stages, verify gain-staging across a signal chain, and convert between linear and dB specs quoted on datasheets and mixing console manuals." },
            { icon: "📡", title: "RF Engineers", desc: "Budget power gain across transmitter and receiver chains, verifying that each amplifier stage delivers its rated dB contribution to the overall link budget." },
            { icon: "🎓", title: "Electronics Students", desc: "Work through voltage, current, and power gain problems from coursework, checking hand calculations and building intuition for the 20×log₁₀ versus 10×log₁₀ distinction." },
            { icon: "🏗️", title: "Circuit Designers", desc: "Verify op-amp and transistor stage gain against design targets before committing values to a schematic, cross-checking against SPICE simulation results." },
            { icon: "🔧", title: "Electronics Hobbyists", desc: "Check a DIY amplifier build or guitar pedal circuit against its intended gain spec, using presets to confirm the calculator matches known reference values first." },
            { icon: "🧪", title: "Test & QA Technicians", desc: "Verify measured input/output readings on production units against rated gain or attenuation specs, flagging units that fall outside tolerance." },
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
