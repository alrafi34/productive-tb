import { rcTimeConstantCalculatorConfig } from "./config";
export default function RCTimeConstantCalculatorSEO() {
  const faqItems = rcTimeConstantCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = rcTimeConstantCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an RC Time Constant Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>RC time constant calculator</strong> is a free electronics tool that computes tau (τ),
            the characteristic time of a resistor-capacitor circuit, using the formula τ = R × C. It answers
            the question every circuit designer eventually asks: <em>how long will this resistor and
            capacitor take to charge or discharge?</em>
          </p>
          <p>
            The math itself is simple multiplication, but getting the units right is where mistakes creep
            in — mixing up microfarads with millifarads, or kilohms with megohms, can throw a result off by
            orders of magnitude. This tool handles all the unit conversion automatically, converting any
            resistance and capacitance combination into a time constant expressed in seconds, milliseconds,
            microseconds, or nanoseconds, and it maps that time constant onto the standard 63.2% charging
            curve used throughout electronics.
          </p>
          <p>
            This <strong>RC circuit calculator</strong> is built for <strong>electronics students learning
            transient response, hobbyists prototyping timing and debounce circuits, filter and audio
            circuit designers, and engineers verifying power supply and coupling capacitor values</strong>.
            It includes six common presets, calculation history, text export, and real-time results —
            entirely browser-based, free, and with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the RC Time Constant Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">τ</span> = R × C</p>
              <p><span className="font-semibold">Charging</span>: V(t) = V₀ × (1 − e<sup>−t/τ</sup>)</p>
              <p><span className="font-semibold">Discharging</span>: V(t) = V₀ × e<sup>−t/τ</sup></p>
              <p className="text-gray-500 text-xs mt-2">τ = time constant (s) · R = resistance (Ω) · C = capacitance (F) · V₀ = supply/initial voltage</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Unit conversion:</strong> resistance is converted to ohms (Ω, kΩ ×10³, MΩ ×10⁶) and capacitance to farads (F, mF ×10⁻³, µF ×10⁻⁶, nF ×10⁻⁹, pF ×10⁻¹²) before multiplying</li>
            <li><strong>63.2% rule:</strong> after exactly 1τ, a charging capacitor reaches 63.2% of the supply voltage; a discharging capacitor falls to 36.8% of its starting voltage</li>
            <li><strong>5τ rule:</strong> after 5 time constants, the capacitor is considered fully charged (99.3%) or fully discharged (0.7%) — the practical standard used in circuit design</li>
            <li><strong>Multiple time units:</strong> the calculator returns τ simultaneously in seconds, milliseconds, microseconds, and nanoseconds so you can read whichever scale fits your circuit</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the RC Time Constant Calculator
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
                "Real-time τ = R × C calculation as you type",
                "Resistance units: Ω, kΩ, MΩ",
                "Capacitance units: F, mF, µF, nF, pF",
                "Charging/discharging breakdown at 1τ through 5τ",
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
              title: "Switch Debounce Circuit",
              scenario: "A hobbyist is debouncing a mechanical pushbutton feeding a microcontroller GPIO pin. They pair a 10 kΩ pull-up resistor with a 100 nF capacitor, entering 10 kΩ and 100 nF into the calculator. The result is τ = 1 ms, meaning the input settles (5τ ≈ 5 ms) well within a typical 10–20 ms debounce window, filtering out mechanical contact bounce without noticeably delaying the button press.",
            },
            {
              title: "Audio Coupling Capacitor",
              scenario: "An audio designer is AC-coupling a preamp stage with a 10 kΩ input impedance and needs the high-pass corner below 20 Hz to avoid bass roll-off. Using the Audio Coupling preset of 10 kΩ and 1 µF, the calculator shows τ = 10 ms. Cross-checking with f = 1/(2πτ) confirms a −3 dB point near 16 Hz, safely below the audible bass range.",
            },
            {
              title: "Power Supply Ripple Filter",
              scenario: "An engineer is smoothing ripple on a linear power supply rail using a 100 Ω series resistor and a 1000 µF reservoir capacitor. Entering 100 Ω and 1000 µF returns τ = 100 ms. They confirm that at the 100 Hz ripple frequency (10 ms period) the filter's time constant is ten times longer than one ripple cycle, giving strong attenuation of the ripple component.",
            },
            {
              title: "Camera Flash Charging Time",
              scenario: "A student is estimating how long a disposable camera flash capacitor takes to charge through its internal charging resistor. With a 1 kΩ charging path and a 220 µF flash capacitor, the calculator gives τ = 220 ms, so full charge (5τ) takes about 1.1 seconds — matching the several-second wait users experience once battery internal resistance and circuit losses are factored in.",
            },
            {
              title: "555 Timer Astable Delay Stage",
              scenario: "A maker is prototyping a power-on delay using an RC network ahead of a 555 timer's trigger pin, targeting roughly a 2-second delay. Testing a 220 kΩ resistor with a 10 µF capacitor, the calculator returns τ = 2.2 s, and since 555 trigger circuits typically fire near 1τ to 1.1τ, this combination lands close to the desired 2-second delay before adjusting for exact threshold voltage.",
            },
            {
              title: "RF Snubber Time Constant Check",
              scenario: "An engineer is verifying a small-signal RC snubber across a switching node, using a 1 kΩ resistor and a 100 pF capacitor common on fast digital lines. Entering these values returns τ = 100 ns, confirming the snubber's response is fast enough to damp ringing on a signal edge that occurs in the low tens of nanoseconds, without materially slowing the intended switching transition.",
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
                "Use the 5τ rule as your design target for 'fully charged' or 'fully discharged.' If you need a circuit to settle within 100 ms, choose R and C so that τ ≈ 20 ms — five time constants then equal your 100 ms budget.",
                "For high-pass RC filters, the −3 dB cutoff frequency relates to the time constant as f = 1/(2πτ). A 10 ms time constant corresponds to roughly 16 Hz — useful for quickly cross-checking a filter's frequency response from the time constant alone.",
                "When a preset or calculated value looks off by a factor of 1,000, double-check whether you meant µF instead of mF, or kΩ instead of Ω. These are the two most common unit mix-ups in RC calculations and they compound multiplicatively.",
                "Electrolytic capacitors have wide tolerance, often ±20%, and their capacitance can drift with age and temperature. For time-critical circuits, use film or ceramic capacitors with tighter tolerance, or add trimming resistance to compensate.",
                "Save frequently-used R and C combinations to your calculation history so you can quickly compare alternative component values without re-entering them, especially useful when iterating on a filter or timing design.",
                "Remember that a discharging capacitor follows the same τ = R × C as charging — only the curve direction differs. Don't assume discharge is faster just because the capacitor 'already has charge to lose.'",
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
                "Don't confuse the time constant with the total charge time. τ is only the time to reach 63.2%, not full charge. Designers who use τ as if it were '100% charged' will find their circuit hasn't actually settled and can misbehave.",
                "Don't ignore the source resistance and load impedance around the RC network. A calculator only knows the R and C you enter — if your signal source has significant output impedance, the effective time constant in the real circuit will be larger than calculated.",
                "Don't mix up series and parallel capacitor or resistor combinations before entering values. Two 10 µF capacitors in parallel total 20 µF, while two in series total 5 µF — entering the wrong combined value silently doubles or halves your time constant.",
                "Don't assume every capacitor's printed value is exact. A ceramic capacitor marked '104' is 100 nF (0.1 µF) nominal, but with ±10-20% tolerance out of the box — always allow margin in timing-critical designs rather than relying on a razor-thin calculated τ.",
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
          Charging &amp; Discharging Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Time Elapsed</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Charging (% of V₀)</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Discharging (% of V₀)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1τ", "R × C × 1", "63.2%", "36.8%"],
                ["2τ", "R × C × 2", "86.5%", "13.5%"],
                ["3τ", "R × C × 3", "95.0%", "5.0%"],
                ["4τ", "R × C × 4", "98.2%", "1.8%"],
                ["5τ", "R × C × 5", "99.3%", "0.7%"],
              ].map(([t, formula, chg, dis]) => (
                <tr key={t} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{t}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{formula}</td>
                  <td className="py-1.5 px-3 font-mono text-green-600 text-xs">{chg}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-600 text-xs">{dis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Percentages are exact values derived from the exponential charge/discharge curve V(t) = V₀(1 − e⁻ᵗ/τ) and V(t) = V₀e⁻ᵗ/τ. Actual circuit behavior may vary slightly with source and load impedance.</p>
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
          Who Uses This RC Time Constant Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Electronics Students", desc: "Work through transient response homework, verify textbook RC charging curve problems, and build intuition for how resistance and capacitance interact to set circuit timing." },
            { icon: "🔧", title: "Hobbyists & Makers", desc: "Design debounce circuits, power-on delays, and simple timing stages for Arduino and 555 timer projects, checking presets against real component values before breadboarding." },
            { icon: "🎚️", title: "Audio & Filter Designers", desc: "Size coupling and decoupling capacitors for preamps and audio stages, converting the time constant to a cutoff frequency to keep bass response and noise filtering where they want it." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Verify power supply ripple filter time constants, snubber networks, and signal conditioning RC stages during design review before committing to a board layout." },
            { icon: "🏭", title: "Test & Repair Technicians", desc: "Back-calculate expected charge and discharge times when diagnosing faulty timing circuits or verifying that replacement capacitors match original circuit behavior." },
            { icon: "📻", title: "RF & Signal Hobbyists", desc: "Check snubber and filter time constants in the nanosecond and microsecond range for fast digital and RF circuits, where unit mix-ups are easy to make and costly to debug." },
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
