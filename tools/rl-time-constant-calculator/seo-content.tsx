export default function RLTimeConstantCalculatorSEO() {
  const faqItems = [
    { q: "What is an RL time constant calculator?", a: "An RL time constant calculator is a free electronics tool that computes tau (τ), the time constant of a resistor-inductor circuit, using the formula τ = L / R. It converts inductance and resistance from any common unit — henries down to microhenries, ohms up to megohms — into a single time value in seconds, milliseconds, microseconds, or nanoseconds, and shows exactly how long current takes to rise or decay to specific percentages." },
    { q: "How is the RL time constant calculated?", a: "The calculator converts your inductance to henries and your resistance to ohms, then divides: τ = L ÷ R. For example, 10 mH (0.01 H) divided by 100 Ω gives τ = 0.0001 seconds, or 0.1 ms. The result is automatically expressed in the most readable unit and broken out into current rise/decay times at 1τ through 5τ." },
    { q: "What is a good time constant for an RL circuit?", a: "There is no universal 'good' value — it depends entirely on the application. A relay or solenoid switching circuit typically has a time constant in the low milliseconds, an RF choke or tuning inductor operates in the microsecond range, and a large motor winding might have a time constant of tens or hundreds of milliseconds. Choose L and R so that τ matches the switching or response speed your circuit needs." },
    { q: "What is the difference between current rise and current decay time constants?", a: "The time constant value itself, τ = L / R, is identical for both rise and decay in the same RL circuit — only the direction of current change differs. When current is rising (inductor energizing), it reaches 63.2% of its final value after 1τ. When current is decaying (inductor de-energizing), it falls to 36.8% of its starting value after 1τ." },
    { q: "How do I use this calculator to design a switching or delay circuit?", a: "Enter your known inductance and adjust resistance, or vice versa, while watching the τ result update in real time. For relay coils and solenoids, use 5τ as your estimate for when current reaches steady state, since that is when the magnetic field and current draw stabilize at 99.3% of the final value." },
    { q: "Why is my calculated time constant important for relay and solenoid switching?", a: "When a relay coil is de-energized, the collapsing magnetic field induces a voltage spike proportional to L × (dI/dt) — the faster the current decays, the higher the spike. A short RL time constant means faster switching but a larger voltage transient, which is why relay drivers typically include a flyback diode to clamp that spike safely." },
    { q: "Can I use this calculator for RC or RLC circuits?", a: "No. This calculator is specifically built for resistor-inductor (RL) circuits using τ = L / R. Resistor-capacitor circuits use a different formula, τ = R × C, and resonant RLC circuits involve a separate resonant frequency formula, f₀ = 1 / (2π√LC). Use the dedicated RC time constant calculator or RLC resonance calculator for those circuit types." },
    { q: "How many time constants does it take for current to reach steady state?", a: "Practically, current in an RL circuit is considered to have reached steady state after 5 time constants (5τ), at which point it reaches 99.3% of its final value. Mathematically the exponential curve never reaches exactly 100%, but the remaining 0.7% is negligible for virtually every real-world switching, timing, or protection design." },
    { q: "What real component factors affect my calculated time constant?", a: "Real inductors have DC winding resistance (RDCR) in addition to any external series resistance, and this internal resistance is part of the effective R in τ = L / R — ignoring it makes your calculated τ larger than the actual circuit behavior. Also account for core saturation at high currents, which can change the effective inductance and therefore the time constant." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your inductance and resistance values are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter the inductance value", "Type the inductor value into the Inductance field and select its unit — H, mH, or µH. This is the inductance of the coil, choke, or winding in your RL circuit."],
    ["Enter the resistance value", "Type the total series resistance into the Resistance field and select its unit — Ω, kΩ, or MΩ. Include both external resistance and the inductor's own DC winding resistance for an accurate result."],
    ["Read the time constant result", "The calculator instantly computes τ = L / R and displays it in the clearest unit — seconds, milliseconds, microseconds, or nanoseconds — along with the raw value converted into all four time units for reference."],
    ["Review the current rise/decay table", "Check the breakdown of current percentages at 1τ (63.2%), 2τ (86.5%), 3τ (95.0%), 4τ (98.2%), and 5τ (99.3%) to see exactly how long your circuit takes to energize or de-energize."],
    ["Try a common preset", "Load a built-in preset — Standard RL Filter, Fast Response, Slow Response, Power Supply Choke, RF Circuit, or Motor Winding — to instantly see typical L and R combinations and their resulting time constants."],
    ["Save, copy, or export your result", "Save the calculation to your local history for later comparison, copy the τ value to your clipboard, or export a full text report of the formula, steps, and current rise/decay times for your project documentation."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an RL Time Constant Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>RL time constant calculator</strong> is a free electronics tool that computes tau (τ),
            the characteristic time of a resistor-inductor circuit, using the formula τ = L / R. It answers
            the question every circuit designer runs into when working with coils, chokes, and windings:
            <em> how fast will current rise or decay through this inductor?</em>
          </p>
          <p>
            Unlike RC circuits, where the time constant is a multiplication, RL time constants are a
            division — and getting the units wrong here is just as costly. Mixing up microhenries with
            millihenries, or ohms with kilohms, can throw the result off by three orders of magnitude. This
            tool handles all unit conversion automatically, converting any inductance and resistance
            combination into a time constant expressed in seconds, milliseconds, microseconds, or
            nanoseconds, and maps that time constant onto the standard 63.2% current rise curve used
            throughout electronics.
          </p>
          <p>
            This <strong>RL circuit calculator</strong> is built for <strong>electronics students learning
            inductive transient response, hobbyists building relay and solenoid drivers, RF and power
            circuit designers, and engineers analyzing motor windings and switching transients</strong>. It
            includes six common presets, calculation history, text export, and real-time results — entirely
            browser-based, free, and with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the RL Time Constant Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">τ</span> = L ÷ R</p>
              <p><span className="font-semibold">Current rise</span>: I(t) = I₀ × (1 − e<sup>−t/τ</sup>)</p>
              <p><span className="font-semibold">Current decay</span>: I(t) = I₀ × e<sup>−t/τ</sup></p>
              <p className="text-gray-500 text-xs mt-2">τ = time constant (s) · L = inductance (H) · R = resistance (Ω) · I₀ = final/initial current</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Unit conversion:</strong> inductance is converted to henries (H, mH ×10⁻³, µH ×10⁻⁶) and resistance to ohms (Ω, kΩ ×10³, MΩ ×10⁶) before dividing</li>
            <li><strong>63.2% rule:</strong> after exactly 1τ, current rising through an inductor reaches 63.2% of its final value; current decaying falls to 36.8% of its starting value</li>
            <li><strong>5τ rule:</strong> after 5 time constants, current is considered to have reached steady state (99.3%) or fully decayed (0.7%) — the practical standard used in circuit design</li>
            <li><strong>Inverse relationship to R:</strong> unlike RC circuits, increasing resistance in an RL circuit shortens the time constant — more resistance dissipates energy faster, so current changes more quickly</li>
            <li><strong>Multiple time units:</strong> the calculator returns τ simultaneously in seconds, milliseconds, microseconds, and nanoseconds so you can read whichever scale fits your circuit</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the RL Time Constant Calculator
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
                "Real-time τ = L / R calculation as you type",
                "Inductance units: H, mH, µH",
                "Resistance units: Ω, kΩ, MΩ",
                "Current rise/decay breakdown at 1τ through 5τ",
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
              title: "Relay Coil Switching Transient",
              scenario: "A hobbyist is driving a 12V automotive relay with a coil resistance of 100 Ω and an inductance of 10 mH, and wants to know how fast the coil energizes. Entering 10 mH and 100 Ω, the calculator returns τ = 0.1 ms, meaning the coil reaches steady-state current (5τ = 0.5 ms) almost instantly — but they add a flyback diode anyway to protect the driver transistor from the fast collapsing field on turn-off.",
            },
            {
              title: "Solenoid Valve Drive Circuit",
              scenario: "An engineer is sizing the drive resistance for a 24V solenoid valve with a 500 mH coil, targeting a controlled actuation delay of about 100 ms to reduce mechanical shock. Testing 5 Ω of total circuit resistance, the calculator gives τ = 100 ms, so the plunger reaches full pull-in force (5τ = 500 ms) — too slow. Increasing to 25 Ω drops τ to 20 ms, giving the faster, snappier actuation the application needs.",
            },
            {
              title: "Power Supply Choke Filtering",
              scenario: "A power electronics designer is filtering switching noise on a buck converter output using a 100 mH choke with 10 Ω of DC resistance and load resistance combined. Entering 100 mH and 10 Ω, the calculator returns τ = 10 ms, confirming the choke's current response is slow relative to a typical 100 kHz switching period (10 µs) — exactly the smoothing behavior wanted.",
            },
            {
              title: "RF Tuning Inductor Response",
              scenario: "An RF hobbyist is checking the transient response of a 100 µH RF choke with 50 Ω of circuit resistance used in an antenna matching network. Entering 100 µH and 50 Ω, the calculator returns τ = 2 µs, confirming the inductor settles fast enough to not distort pulsed RF signals in the low-megahertz range being tested.",
            },
            {
              title: "DC Motor Winding Analysis",
              scenario: "A technician is estimating the electrical time constant of a small DC motor's armature winding, measured at 500 mH inductance and 5 Ω winding resistance. Entering these values, the calculator gives τ = 100 ms, telling the technician that current — and therefore torque — takes about 500 ms (5τ) to reach steady state after a voltage step, relevant for tuning motor controller current-loop response.",
            },
            {
              title: "Flyback Snubber Time Constant Check",
              scenario: "A maker is verifying a snubber resistor value across an inductive load to control turn-off voltage spikes, using a 1 mH inductor and a chosen 1 kΩ snubber resistance. Entering 1 mH and 1 kΩ, the calculator returns τ = 1 µs, confirming the snubber dissipates the stored energy quickly enough to protect the switching transistor without excessively slowing the intended switching transition.",
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
                "Remember that increasing resistance shortens the RL time constant — the opposite of an RC circuit. If you need faster switching, add series resistance; if you need a slower response, reduce it or use a larger inductor.",
                "Always include the inductor's own DC winding resistance (RDCR) in your R value, not just external series resistance. A 'zero-resistance' external circuit still has a real time constant set by the coil's internal resistance, which can dominate the calculation for low-impedance coils.",
                "Use the 5τ rule as your design target for 'reached steady state' or 'fully decayed.' If a relay needs to actuate within 5 ms, choose L and R so that τ ≈ 1 ms — five time constants then equal your 5 ms budget.",
                "When switching an inductive load, always include a flyback diode (or snubber) rated for the peak current. The faster the time constant (smaller τ), the higher and more damaging the induced voltage spike when current is interrupted.",
                "For motor and transformer windings, remember that inductance is not fixed — it can change with core saturation at high current. The calculated τ is only accurate near the operating point where you measured or estimated L.",
                "Save frequently-used L and R combinations to your calculation history so you can quickly compare alternative component values without re-entering them, especially when iterating on a relay driver or filter design.",
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
                "Don't confuse the time constant with the total switching time. τ is only the time to reach 63.2% of final current, not full steady state. Designers who treat τ as 'fully energized' will find their relay or solenoid hasn't actually reached full pull-in force yet.",
                "Don't forget the inductor's DC resistance when it's the dominant resistance in the circuit. Omitting a coil's internal 5–20 Ω winding resistance from a low-external-resistance circuit can make your calculated τ several times larger than reality.",
                "Don't ignore flyback voltage protection just because the calculated time constant looks small. A short τ means current changes quickly, which produces a larger induced voltage spike (V = L × dI/dt) — small time constants need snubbing just as much as large ones, if not more.",
                "Don't mix up series and parallel inductor combinations before entering values. Two 10 mH inductors in series total 20 mH, while two in parallel total 5 mH — entering the wrong combined value doubles or halves your calculated time constant.",
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
          Current Rise &amp; Decay Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Time Elapsed</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Current Rise (% of I₀)</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Current Decay (% of I₀)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1τ", "(L ÷ R) × 1", "63.2%", "36.8%"],
                ["2τ", "(L ÷ R) × 2", "86.5%", "13.5%"],
                ["3τ", "(L ÷ R) × 3", "95.0%", "5.0%"],
                ["4τ", "(L ÷ R) × 4", "98.2%", "1.8%"],
                ["5τ", "(L ÷ R) × 5", "99.3%", "0.7%"],
              ].map(([t, formula, rise, decay]) => (
                <tr key={t} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{t}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{formula}</td>
                  <td className="py-1.5 px-3 font-mono text-green-600 text-xs">{rise}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-600 text-xs">{decay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Percentages are exact values derived from the exponential rise/decay curve I(t) = I₀(1 − e⁻ᵗ/τ) and I(t) = I₀e⁻ᵗ/τ. Actual circuit behavior may vary slightly with core saturation and stray capacitance.</p>
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
          Who Uses This RL Time Constant Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Electronics Students", desc: "Work through inductive transient response homework, verify textbook current rise/decay curve problems, and build intuition for how inductance and resistance interact to set circuit timing." },
            { icon: "🔧", title: "Hobbyists & Makers", desc: "Design relay drivers, solenoid actuators, and flyback protection circuits for Arduino and microcontroller projects, checking presets against real coil values before building." },
            { icon: "📻", title: "RF & Power Designers", desc: "Size chokes, tuning inductors, and filter networks, checking that current settling time matches the switching frequency or signal timing their circuit needs to handle." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Analyze motor winding response, snubber networks, and inductive load switching transients during design review before committing to a driver circuit or board layout." },
            { icon: "🏭", title: "Test & Repair Technicians", desc: "Back-calculate expected current rise and decay times when diagnosing relay, solenoid, or motor winding faults, or verifying replacement coils match original circuit behavior." },
            { icon: "🚗", title: "Automotive & Industrial Techs", desc: "Estimate switching times for relay coils and solenoid valves in vehicles and industrial equipment, sizing flyback protection for the induced voltage spike on turn-off." },
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
