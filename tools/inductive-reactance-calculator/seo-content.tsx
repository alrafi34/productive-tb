import { inductiveReactanceCalculatorConfig } from "./config";
export default function InductiveReactanceCalculatorSEO() {
  const faqItems = inductiveReactanceCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = inductiveReactanceCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Inductive Reactance Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>inductive reactance calculator</strong> computes the opposition an inductor presents
            to alternating current using the formula XL = 2πfL. Enter frequency and inductance, and the
            calculator returns reactance in ohms with a full step-by-step derivation — no need to look up
            the 2π constant or convert units by hand.
          </p>
          <p>
            Unlike plain resistance, inductive reactance depends directly on frequency, so the same inductor
            behaves completely differently at 60Hz mains frequency versus 1MHz RF — a distinction that's
            easy to compute wrong when switching between unit prefixes for frequency (Hz, kHz, MHz) and
            inductance (H, mH, µH, nH) in the same calculation. This tool handles all unit conversion
            automatically and shows every step of the derivation.
          </p>
          <p>
            Built for <strong>electrical engineers designing filters and chokes, RF and radio hobbyists,
            electronics students learning AC circuit theory, and power electronics designers</strong>
            checking impedance at a specific operating frequency. Includes six built-in frequency/inductance
            presets, full step-by-step working, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Inductive Reactance Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Inductive Reactance (XL)</span> = 2π × f × L</p>
              <p className="text-gray-500 text-xs mt-2">Example: 10mH inductor at 60Hz</p>
              <p className="text-gray-500 text-xs">XL = 2π × 60 × 0.01 = <span className="text-green-600 font-semibold">3.77Ω</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>f</strong> — signal frequency in hertz; reactance scales linearly with frequency</li>
            <li><strong>L</strong> — inductance in henries; reactance scales linearly with inductance too</li>
            <li><strong>2π ≈ 6.2832</strong> — the constant converting frequency (cycles/second) into angular frequency (radians/second)</li>
            <li>XL is zero at DC (f = 0) and increases without bound as frequency rises — the defining behavior of an inductor in an AC circuit</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Inductive Reactance Calculator
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
                "Full unit support: Hz/kHz/MHz, H/mH/µH/nH",
                "Complete step-by-step derivation",
                "Six built-in presets (50Hz to 1MHz)",
                "Calculation history (saved locally)",
                "Export calculation as a text file",
                "100% browser-based — no data sent to server",
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
              title: "Mains Frequency Choke Sizing",
              scenario: "An engineer designing a power-line filter needs a choke with at least 3Ω of reactance at 60Hz. Testing a 10mH inductor, the calculator returns XL = 3.77Ω — meeting the requirement — confirming the part before adding it to the filter design.",
            },
            {
              title: "RF Choke Verification at 1MHz",
              scenario: "An RF hobbyist wants to confirm a 10µH inductor provides enough isolation at 1MHz for a bias tee circuit. Using f = 1MHz and L = 10µH, the calculator returns XL = 62.8Ω — enough to isolate the RF signal from the DC bias supply for their intended application.",
            },
            {
              title: "Audio Crossover Reactance Check",
              scenario: "An audio hobbyist calculating a crossover inductor's behavior at a 2kHz crossover point tests a 2.5mH inductor. The calculator returns XL = 31.4Ω at 2kHz, which they compare against the speaker's impedance to estimate the crossover's -3dB point.",
            },
            {
              title: "Current Draw Estimate for an Inductive Load",
              scenario: "A technician wants to estimate current through a 100mH inductor connected across a 120V, 60Hz supply, ignoring winding resistance. The calculator returns XL = 37.7Ω, and dividing 120V by 37.7Ω gives an estimated current of 3.18A for this idealized reactive-only case.",
            },
            {
              title: "LC Resonance Frequency Search",
              scenario: "A student searching for the resonant frequency of an LC tank circuit with L = 100µH tests several candidate frequencies against a known 100pF capacitor's reactance. At 1.6MHz, XL for the 100µH inductor comes out close to the capacitor's XC at the same frequency, confirming they're near the circuit's resonant point.",
            },
            {
              title: "Comparing Reactance Across Frequency Bands",
              scenario: "An engineer wants to visualize how a fixed 1mH inductor behaves from mains frequency to RF. Testing 60Hz, 1kHz, 100kHz, and 1MHz in sequence, the calculator returns 0.377Ω, 6.28Ω, 628Ω, and 6,283Ω respectively — a span of four orders of magnitude that illustrates why the same component serves very different roles depending on operating frequency.",
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
                "Remember that reactance scales linearly with both frequency and inductance — doubling either one doubles XL, unlike inductance itself, which scales with turns squared in the underlying coil.",
                "Use the built-in presets to quickly get a feel for typical XL magnitudes across frequency bands — mains chokes, audio crossovers, and RF chokes all operate in very different reactance ranges for very different component values.",
                "When comparing an inductor's reactance to a capacitor's reactance for a filter or resonance calculation, always compute both at the same frequency — reactance is meaningless to compare unless the frequency is held constant.",
                "For a quick real-world impedance check, remember that a real inductor's total impedance also includes its winding resistance (DCR) — XL alone describes only the ideal reactive component, not the full impedance magnitude.",
                "When sizing a choke for a switching power supply, calculate XL at the actual switching frequency, not at the AC mains frequency — inductors intended for high-frequency ripple filtering behave very differently than 50/60Hz mains chokes.",
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
                "Forgetting the 2π factor and using XL = fL instead of XL = 2πfL. This understates reactance by a factor of roughly 6.28, a common shortcut error when working quickly by hand.",
                "Mixing up frequency unit prefixes, especially Hz and kHz. Entering 60 intending Hz but leaving the unit on kHz overstates reactance by a factor of 1,000 — always confirm the unit dropdown matches your intended frequency.",
                "Assuming XL alone represents a real inductor's total impedance. Real components also have winding resistance and, at high frequencies, parasitic capacitance — XL is only the ideal reactive component of a more complete impedance model.",
                "Treating inductive reactance as if it behaved like resistance in terms of power dissipation. An ideal inductor's reactance opposes current without dissipating real power as heat — power is only dissipated in the winding's actual resistance, not in the reactance itself.",
                "Using the wrong inductance value when a coil's inductance changes with frequency, as happens with ferrite-core inductors near saturation or self-resonance. This formula assumes a fixed, ideal inductance — real component datasheets often specify inductance at a particular test frequency for this reason.",
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
          Reactance by Frequency and Inductance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Frequency</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Inductance</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Reactance (XL)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["50 Hz", "0.1 H", "31.4 Ω"],
                ["60 Hz", "0.05 H", "18.85 Ω"],
                ["1 kHz", "10 mH", "62.8 Ω"],
                ["10 kHz", "1 mH", "62.8 Ω"],
                ["100 kHz", "100 µH", "62.8 Ω"],
                ["1 MHz", "10 µH", "62.8 Ω"],
              ].map(([freq, ind, xl]) => (
                <tr key={freq} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{freq}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{ind}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{xl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Calculated using XL = 2πfL. Note how the last four rows give equal reactance despite spanning three orders of magnitude in frequency and inductance.</p>
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
          Who Uses This Inductive Reactance Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Verify choke and filter inductor reactance at mains and switching frequencies during power electronics design." },
            { icon: "📻", title: "RF & Radio Hobbyists", desc: "Calculate RF choke reactance and check isolation performance at radio frequencies." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn how inductive reactance depends on frequency and verify AC circuit theory homework problems." },
            { icon: "🎛️", title: "Audio Circuit Designers", desc: "Calculate crossover inductor reactance at target crossover frequencies for speaker networks." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Estimate current-limiting behavior of inductive loads across different AC frequencies." },
            { icon: "🛡️", title: "EMI/EMC Engineers", desc: "Confirm inductive filter components provide sufficient reactance at target noise frequencies." },
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
