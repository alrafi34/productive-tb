export default function RLCResonanceCalculatorSEO() {
  const faqItems = [
    { q: "What is an RLC resonance calculator?", a: "An RLC resonance calculator is a free electronics tool that computes the resonant frequency (f₀), quality factor (Q), impedance, and bandwidth of a resistor-inductor-capacitor circuit, using the formula f₀ = 1 / (2π√LC). It converts resistance, inductance, and capacitance from any common unit into a resonant frequency shown in Hz, kHz, or MHz, along with the circuit's selectivity and impedance at that frequency." },
    { q: "How is the RLC resonant frequency calculated?", a: "The calculator converts your inductance to henries and capacitance to farads, multiplies them to get LC, takes the square root, multiplies by 2π, and inverts the result: f₀ = 1 / (2π√LC). For example, L = 10 mH and C = 100 µF gives LC = 0.000001, √LC = 0.001, 2π√LC ≈ 0.00628, and f₀ ≈ 159.15 Hz." },
    { q: "What is a good quality factor (Q) for a resonant circuit?", a: "It depends entirely on the application. A high Q above 10 gives a sharp, narrow resonance peak, ideal for radio tuning and selective bandpass filters where you want to isolate one frequency. A low Q below 1 gives a broad, damped response, useful for wideband filters or snubber networks. This calculator computes Q = (1/R) × √(L/C) for a series RLC circuit, so lower resistance produces a higher Q." },
    { q: "What is the difference between series and parallel RLC resonance?", a: "Both series and parallel RLC circuits share the same resonant frequency formula, f₀ = 1 / (2π√LC), because resonance depends only on L and C. The difference is impedance behavior: at resonance, a series RLC circuit has minimum impedance (Z = R) and maximum current, while a parallel RLC circuit has maximum impedance and minimum current. This calculator computes series-circuit values — impedance at resonance equals R, and Q = (1/R)√(L/C)." },
    { q: "How do I use this calculator to design a tuned or bandpass circuit?", a: "Enter your target resonant frequency's known inductance and adjust capacitance, or vice versa, while watching f₀ update in real time. Then check the Q and bandwidth results — a higher resistance lowers Q and widens the passband, while a lower resistance sharpens the resonance for more selective tuning." },
    { q: "Why does resistance not change the resonant frequency?", a: "The resonant frequency depends only on the energy-storage elements, L and C — the point where inductive reactance and capacitive reactance are equal in magnitude and cancel. Resistance dissipates energy but doesn't store it, so it has no effect on f₀. What resistance does change is the quality factor and bandwidth: more resistance means a broader, less selective resonance peak." },
    { q: "What is the relationship between bandwidth and quality factor?", a: "Bandwidth (BW) is the range of frequencies around resonance where the circuit still responds effectively, and it relates to Q as BW = f₀ / Q. A circuit with f₀ = 1 MHz and Q = 50 has a bandwidth of 20 kHz — a fairly narrow, selective response. Increasing R lowers Q, which widens the bandwidth for the same resonant frequency." },
    { q: "Can I use this calculator for parallel RLC circuits?", a: "The resonant frequency result, f₀ = 1 / (2π√LC), is identical whether your circuit is series or parallel, since resonance depends only on L and C. However, the Q, impedance, and bandwidth values this calculator returns use the series RLC formulas — for a parallel RLC circuit, impedance is maximum (not equal to R) at resonance and the Q formula is different, so treat those specific values as series-circuit reference points only." },
    { q: "Why does my resonant frequency look extremely high or use scientific notation?", a: "This happens with very small inductance and capacitance values, common in RF tank circuits. An RF Circuit preset with L = 10 µH and C = 1 nF resonates at roughly 1.59 MHz — correct for a high-frequency application, but easy to misjudge if you expect a value in the hundreds of hertz. Always check the unit shown next to the result, not just the raw number." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your resistance, inductance, and capacitance values are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter the resistance value", "Type the circuit resistance into the Resistance field and select its unit — Ω, kΩ, or MΩ. In a series RLC circuit this is the total series resistance, including any coil winding resistance."],
    ["Enter the inductance value", "Type the inductor value into the Inductance field and select its unit — H, mH, or µH. This is the inductance of the coil or winding forming the resonant tank."],
    ["Enter the capacitance value", "Type the capacitor value into the Capacitance field and select its unit — F, mF, µF, nF, or pF. This is the tuning or filter capacitor paired with the inductor."],
    ["Read the resonant frequency result", "The calculator instantly computes f₀ = 1 / (2π√LC) and displays it in the clearest unit — Hz, kHz, or MHz — along with the raw value converted into all three frequency units for reference."],
    ["Review Q, bandwidth, and impedance", "Check the quality factor (Q), bandwidth (BW = f₀ / Q), and impedance at resonance (Z = R) to understand how sharp or broad the resonance peak is and how the circuit will behave near f₀."],
    ["Save, copy, or export your result", "Save the calculation to your local history for later comparison, copy the f₀ value to your clipboard, or export a full text report of the formula, steps, and circuit characteristics for your project documentation."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an RLC Resonance Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>RLC resonance calculator</strong> is a free electronics tool that computes the
            resonant frequency (f₀), quality factor (Q), bandwidth, and impedance of a resistor-inductor-
            capacitor circuit. It answers the core question behind every tuned filter and oscillator design:
            <em> at what frequency will this LC combination resonate, and how sharp will that resonance be?</em>
          </p>
          <p>
            At resonance, inductive reactance and capacitive reactance are equal in magnitude and cancel
            each other, leaving only resistance to oppose current flow — the frequency at which this
            happens is set entirely by L and C, using f₀ = 1 / (2π√LC). But knowing f₀ alone isn't enough
            to design a usable circuit: you also need the quality factor to know how selective the
            resonance is, and the bandwidth to know how wide a frequency range the circuit will respond to.
            This tool computes all three together, along with automatic unit conversion across ohms,
            henries, and farads down to their smallest common prefixes.
          </p>
          <p>
            This <strong>resonant frequency calculator</strong> is built for <strong>electronics students
            studying resonance and filter theory, RF and radio hobbyists tuning LC tank circuits, filter
            and oscillator designers, and engineers analyzing impedance matching and power factor
            correction networks</strong>. It includes six common presets, calculation history, text export,
            and real-time results — entirely browser-based, free, and with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How RLC Resonance Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">f₀</span> = 1 ÷ (2π√(L × C))</p>
              <p><span className="font-semibold">Q</span> = (1 ÷ R) × √(L ÷ C)</p>
              <p><span className="font-semibold">Bandwidth</span> = f₀ ÷ Q</p>
              <p><span className="font-semibold">Impedance at resonance (series)</span> = R</p>
              <p className="text-gray-500 text-xs mt-2">f₀ = resonant frequency (Hz) · L = inductance (H) · C = capacitance (F) · R = resistance (Ω)</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Resonance condition:</strong> resonance occurs when inductive reactance (X<sub>L</sub> = 2πfL) equals capacitive reactance (X<sub>C</sub> = 1/2πfC), and the two cancel, leaving a purely resistive impedance</li>
            <li><strong>Series RLC at resonance:</strong> this calculator models a series circuit, where impedance drops to its minimum value (Z = R) and current is at its maximum for a given supply voltage</li>
            <li><strong>Quality factor (Q):</strong> a dimensionless number describing how sharp or damped the resonance is — lower resistance produces a higher Q and a narrower, more selective resonance peak</li>
            <li><strong>Bandwidth:</strong> the range of frequencies around f₀ where the circuit still responds effectively, calculated as BW = f₀ / Q — a higher Q gives a narrower bandwidth</li>
            <li><strong>R doesn't shift f₀:</strong> resistance affects Q and bandwidth but never the resonant frequency itself, since f₀ depends only on the energy-storing L and C elements</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the RLC Resonance Calculator
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
                "Real-time f₀ = 1/(2π√LC) calculation as you type",
                "Resistance, inductance, and capacitance unit conversion",
                "Quality factor (Q) and bandwidth (BW) results",
                "Impedance at resonance for series RLC",
                "Frequency shown in Hz, kHz, and MHz",
                "Six built-in circuit presets",
                "Calculation history (last 20 entries)",
                "Export results as a text report",
                "Copy result to clipboard",
                "Shareable, bookmarkable tool URL",
                "100% browser-based — no data sent to server",
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
              title: "AM Radio Tuning Circuit",
              scenario: "A hobbyist is building a crystal radio tuner and needs to resonate near the middle of the AM band, around 1 MHz. Using a 220 µH loop antenna coil and testing a 100 pF variable capacitor with 10 Ω of coil resistance, the calculator returns f₀ ≈ 1.07 MHz with Q ≈ 148 — a sharp resonance that selects one station while rejecting adjacent frequencies.",
            },
            {
              title: "Audio Notch Filter (159 Hz)",
              scenario: "An audio engineer wants to attenuate a 159 Hz hum picked up from a nearby transformer using a notch filter. Loading the Audio Filter preset — 10 Ω, 10 mH, 100 µF — the calculator confirms f₀ = 159.15 Hz with Q ≈ 1.0, a moderately broad notch wide enough to catch minor frequency drift in the hum without cutting into adjacent audio content.",
            },
            {
              title: "RF Tank Circuit for Oscillator Design",
              scenario: "An RF designer is building a Colpitts oscillator targeting 1.59 MHz and tests the High Frequency preset — 50 Ω, 10 µH, 1 nF. The calculator returns f₀ ≈ 1.59 MHz with Q ≈ 2.0 — a fairly damped resonance at 50 Ω — so the designer lowers resistance to 5 Ω to raise Q to about 20, tightening the bandwidth (f₀/Q) from roughly 796 kHz down to 79.6 kHz for more stable oscillation.",
            },
            {
              title: "LC Tank for Impedance Matching",
              scenario: "An antenna engineer needs a matching network resonant near 500 kHz and tries the LC Tank preset — 10 Ω, 100 µH, 1 nF. The calculator returns f₀ ≈ 503.3 kHz with Q ≈ 31.6, confirming the network is selective enough to reject out-of-band interference while passing the target frequency with minimal loss.",
            },
            {
              title: "Power Factor Correction Network",
              scenario: "An electrical engineer is checking an LC filter meant to resonate away from the 50/60 Hz power line frequency to avoid unwanted resonance in a power factor correction circuit. Testing the Power Supply preset — 50 Ω, 500 mH, 10 µF — the calculator returns f₀ ≈ 71.2 Hz, confirming the network's resonance sits safely above the mains frequency and won't amplify line-frequency ripple.",
            },
            {
              title: "Bandpass Filter Selectivity Check",
              scenario: "A student is comparing two resistor values for a bandpass filter using the Tuned Circuit preset base values of 1 mH and 1 nF. At R = 100 Ω, the calculator gives f₀ ≈ 159.2 kHz with Q ≈ 10 and BW ≈ 15.9 kHz. Lowering R to 20 Ω raises Q to about 50 and narrows the bandwidth to roughly 3.2 kHz — demonstrating how resistance alone controls selectivity without moving the center frequency.",
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
                "To raise the resonant frequency, decrease L or C — either one shrinks f₀ = 1/(2π√LC). To lower resistance's impact on Q without changing f₀, keep the L/C ratio fixed while scaling both down or up together.",
                "For selective filters like radio tuners, aim for the lowest practical circuit resistance to maximize Q. Real inductors have internal winding resistance that sets a hard limit on Q, which is why high-Q RF designs use air-core or low-loss ferrite inductors.",
                "Use the bandwidth result (BW = f₀/Q) to check whether your filter is too narrow or too broad for the signal you're filtering. A notch filter meant to remove a fixed-frequency hum can be narrow and high-Q, while a general noise filter usually wants a wider, lower-Q response.",
                "Remember the L/C ratio, not just the LC product, determines Q at a fixed R. Two component pairs can give the same f₀ but very different Q values — a larger L with a smaller C (same LC) raises Q, since Q = (1/R)√(L/C).",
                "When designing oscillator tank circuits, check that your resonant frequency falls well clear of any expected harmonics or interference sources, and use the Q value to estimate how far those neighboring frequencies need to be to avoid unwanted excitation.",
                "Save presets and calculated values to history when iterating on a filter design — comparing f₀, Q, and bandwidth side by side across a few R/L/C combinations quickly shows the tradeoffs of each choice.",
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
                "Don't assume changing resistance will shift the resonant frequency — it won't. f₀ depends only on L and C. If your circuit is resonating at the wrong frequency, the fix is always to adjust inductance or capacitance, never resistance.",
                "Don't treat this calculator's Q, impedance, and bandwidth results as valid for a parallel RLC circuit without adjustment. They are computed using series RLC formulas (Z = R, Q = (1/R)√(L/C)); a parallel circuit has maximum impedance at resonance and a different Q relationship.",
                "Don't ignore the inductor's parasitic resistance and the capacitor's equivalent series resistance (ESR) when estimating real-world Q. A calculator using ideal R, L, and C values will overestimate Q compared to a physical circuit with lossy components.",
                "Don't forget that stray and parasitic capacitance matters more at high frequencies. A tank circuit calculated to resonate at several megahertz can shift noticeably once PCB trace capacitance and component lead inductance are added — always verify high-frequency designs on the bench.",
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

      {/* ── 6. Formula Reference ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          RLC Formula &amp; Series vs Parallel Reference
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Key Output Formulas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Output</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Formula</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Resonant frequency", "f₀ = 1 ÷ (2π√(L×C))", "10 mH, 100 µF → 159.15 Hz"],
                    ["Quality factor", "Q = (1÷R) × √(L÷C)", "R=10Ω, L=10mH, C=100µF → Q ≈ 1.0"],
                    ["Bandwidth", "BW = f₀ ÷ Q", "159.15 Hz ÷ 1.0 ≈ 159.15 Hz"],
                    ["Impedance at resonance", "Z = R (series RLC)", "R = 10 Ω → Z = 10 Ω"],
                  ].map(([name, formula, example]) => (
                    <tr key={name} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-semibold text-primary text-xs uppercase tracking-wide">{name}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{formula}</td>
                      <td className="py-1.5 px-3 font-mono text-green-600 text-xs">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Series vs Parallel RLC at Resonance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Characteristic</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Series RLC</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Parallel RLC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Resonant frequency", "f₀ = 1/(2π√LC)", "f₀ = 1/(2π√LC) — same"],
                    ["Impedance at resonance", "Minimum (Z = R)", "Maximum"],
                    ["Current at resonance", "Maximum", "Minimum"],
                    ["Phase angle", "0° (in phase)", "0° (in phase)"],
                  ].map(([characteristic, series, parallel]) => (
                    <tr key={characteristic} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 text-gray-700 text-xs">{characteristic}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 text-xs">{series}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-600 text-xs">{parallel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* This calculator computes series RLC values (impedance = R, Q = (1/R)√(L/C)). The resonant frequency is identical for both topologies since it depends only on L and C.</p>
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
          Who Uses This RLC Resonance Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Electronics Students", desc: "Work through resonance and filter theory homework, verify textbook f₀, Q, and bandwidth calculations, and build intuition for how R, L, and C interact in a tuned circuit." },
            { icon: "📻", title: "RF & Radio Hobbyists", desc: "Tune LC tank circuits for crystal radios, antenna matching networks, and simple RF oscillators, checking presets against real coil and capacitor values before building." },
            { icon: "🎚️", title: "Filter & Audio Designers", desc: "Design notch and bandpass filters for audio and signal processing, using Q and bandwidth results to balance selectivity against how wide a frequency range needs to pass." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Verify power factor correction network resonance, impedance matching designs, and oscillator tank circuits during design review before board layout and prototyping." },
            { icon: "🔧", title: "Hobbyist Circuit Builders", desc: "Prototype tuned circuits and resonant filters on breadboards, using the six built-in presets as a fast starting point before fine-tuning component values." },
            { icon: "🏭", title: "Test & Repair Technicians", desc: "Back-calculate expected resonant frequency and Q when diagnosing tuned circuits or verifying that replacement inductors and capacitors match original design specs." },
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
