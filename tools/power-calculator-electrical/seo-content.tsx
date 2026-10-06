import { powerCalculatorElectricalConfig } from "./config";
export default function PowerCalculatorElectricalSEO() {
  const faqItems = powerCalculatorElectricalConfig.seo.faq;

  const howToSteps: [string, string][] = powerCalculatorElectricalConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Electrical Power Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>electrical power calculator</strong> is a free online tool that solves the power
            equation P = V × I for whichever value you don't know — power, voltage, or current. Enter any
            two of the three quantities and the calculator instantly returns the third, with support for
            volts, millivolts, kilovolts, amps, milliamps, watts, milliwatts, and kilowatts.
          </p>
          <p>
            The formula itself is simple, but real circuits span a wide range of unit scales — a battery
            indicator LED runs in milliamps and milliwatts, while a household circuit runs in amps and
            kilowatts — so getting the unit conversion right by hand is where most manual calculations go
            wrong. This tool converts every input to base units internally, computes the result, then
            converts back to whichever unit you selected, so a scale mismatch never slips through.
          </p>
          <p>
            Built for <strong>electrical engineering students, electricians, electronics hobbyists, and
            industrial technicians</strong> who need a fast, dependable way to check power, voltage, or
            current without pulling out a separate calculator and a unit-conversion chart. Every calculation
            runs instantly as you type, includes six common voltage presets, and can be copied, saved to
            history, or exported as a text file, with no signup.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Power Formula: P = V × I
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Power (W)</span> = Voltage (V) × Current (A)</p>
              <p><span className="font-semibold">Voltage (V)</span> = Power (W) ÷ Current (A)</p>
              <p><span className="font-semibold">Current (A)</span> = Power (W) ÷ Voltage (V)</p>
              <p className="text-gray-500 text-xs mt-2">Example: a heater draws 10A at 230V</p>
              <p className="text-gray-500 text-xs">Power = 230 × 10 = <span className="text-green-600 font-semibold">2,300W (2.3kW)</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Power (P)</strong> — the rate of energy transfer, measured in watts (W)</li>
            <li><strong>Voltage (V)</strong> — electrical potential difference, measured in volts (V)</li>
            <li><strong>Current (I)</strong> — rate of electron flow, measured in amperes (A)</li>
            <li>This calculator covers single-phase DC and resistive AC circuits — three-phase and power-factor-adjusted AC calculations need an additional multiplier (see FAQ)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Electrical Power Calculator
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
                "Three calculation modes: power, voltage, current",
                "Full unit support: V, mV, kV, A, mA, W, mW, kW",
                "Six built-in voltage presets",
                "Calculation history (up to 20 saved entries)",
                "Copy result to clipboard",
                "Export calculation as a text file",
                "Automatic division-by-zero protection",
                "Private: your inputs are not collected or stored",
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
              title: "LED Resistor Safety Check",
              scenario: "A hobbyist wiring a 5V USB-powered LED strip measures a forward current of 20mA. They select Power mode, enter 5V and 0.02A, and the calculator returns 0.1W (100mW). This confirms the LED and its current-limiting resistor stay safely under the 0.25W rating of a standard 1/4-watt resistor package.",
            },
            {
              title: "Space Heater Breaker Sizing",
              scenario: "A homeowner in Europe installing a 2,300W heater on a 230V circuit needs to confirm it won't overload a 10A breaker. Using Current mode with 2,300W and 230V, the calculator returns exactly 10A — right at the breaker's limit — so they move the heater to a dedicated 16A circuit instead.",
            },
            {
              title: "Headlight Wiring Diagnosis",
              scenario: "An automotive technician is diagnosing a 60W halogen headlight drawing 5A instead of its rated 4.5A. Using Voltage mode with 60W and 5A, the calculator returns 12V, confirming the vehicle's charging system supplies correct voltage — the extra draw is from a failing bulb, not a wiring fault.",
            },
            {
              title: "Small Solar Panel Load Check",
              scenario: "A DIY solar hobbyist has a 12V panel outputting 1.5A in direct sun and wants to know if it can run a 20W fan continuously. Using Power mode with 12V and 1.5A, the calculator returns 18W — just under the fan's rating — so they add a small battery buffer to cover the shortfall on cloudy days.",
            },
            {
              title: "USB Power Bank Runtime Estimate",
              scenario: "A student wants to know how long a 10,000mAh power bank can run a 5V, 500mA phone charge. Using Power mode with 5V and 0.5A, the calculator returns 2.5W. Knowing the power bank stores roughly 50Wh (5V × 10Ah), they estimate about 20 hours of runtime before accounting for conversion losses.",
            },
            {
              title: "PLC Sensor Power Budget",
              scenario: "A controls technician is verifying a 24V DC proximity sensor rated at 200mA fits within a PLC output channel's 5W budget. Using Power mode with 24V and 0.2A, the calculator returns 4.8W — under budget — so the sensor is approved for that channel.",
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
                "Match the unit prefix to the value's actual scale before comparing results. 100mW and 0.1W are the same quantity, but misreading milliwatts as watts is a 1,000× error that's easy to miss on a datasheet.",
                "Use Current mode to check breaker sizing rather than back-calculating from a Power mode result by hand. Breakers are rated in amps, so solving for current directly avoids an extra division step and rounding error.",
                "When a nameplate lists only volts and amps with no wattage figure, use Power mode — most nameplates already give you the two knowns you need without further conversion.",
                "Save recurring calculations to history if you're checking the same class of device repeatedly, such as a batch of USB chargers. It's faster than re-entering values or reaching for a separate notepad.",
                "This calculator assumes resistive, single-phase circuits. If you're working with an AC motor or another inductive load, multiply the result by the load's power factor (P = V × I × PF) — see the FAQ below for details.",
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
                "Entering current in milliamps but leaving the unit dropdown on amps, or vice versa. A 20mA LED entered as \"20 A\" returns a result 1,000× too high — always double-check the unit selector, not just the number.",
                "Using the plain P = V × I formula for AC circuits with a power factor below 1.0. Real power in reactive AC circuits is P = V × I × PF, so omitting PF overstates true power for inductive loads like motors and transformers.",
                "Trying to solve for voltage or current while the other known input is left at zero. Division by zero is mathematically undefined, so the calculator blocks it and shows a validation error rather than a false result.",
                "Assuming a household voltage preset matches your exact location. Nominal voltage varies by country — 120V in North America, 230V in the UK, Europe and Australia, and 220–240V in many other countries — and even within a region, so measure with a meter for precise calculations.",
                "Forgetting this is single-phase math. Three-phase power uses a √3 factor and a different formula entirely — applying this tool's result directly to a three-phase load underestimates power by roughly 42%.",
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

      {/* ── 6. Reference Tables ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Formula &amp; Voltage Reference
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-2">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Formula Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Output</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Formula</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Power (P)", "V × I", "230V × 10A = 2,300W"],
                    ["Voltage (V)", "P ÷ I", "2,300W ÷ 10A = 230V"],
                    ["Current (I)", "P ÷ V", "2,300W ÷ 230V = 10A"],
                    ["AC real power (PF-adjusted)", "V × I × PF", "230V × 10A × 0.9 = 2,070W"],
                  ].map(([name, formula, example]) => (
                    <tr key={name} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-primary text-xs uppercase tracking-wide">{name}</td>
                      <td className="py-2 px-3 font-mono text-gray-700 text-xs">{formula}</td>
                      <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Voltage Standards</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Standard</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Voltage</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["USB", "5V DC", "USB devices, phone charging"],
                    ["Automotive", "12V DC", "Car electrical systems"],
                    ["Industrial", "24V DC", "Industrial control systems"],
                    ["US household", "110-120V AC", "North American outlets"],
                    ["EU household", "230V AC", "European outlets"],
                    ["UK household", "230-240V AC", "UK outlets"],
                  ].map(([std, v, app]) => (
                    <tr key={std} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-primary text-xs">{std}</td>
                      <td className="py-2 px-3 font-mono text-gray-700 text-xs">{v}</td>
                      <td className="py-2 px-3 text-gray-600 text-xs">{app}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">* Nominal voltages are approximate — actual supply voltage varies by region and grid conditions.</p>
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
          Who Uses This Electrical Power Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Quickly verify power, voltage, or current values during circuit design and component selection without switching to a separate unit-conversion tool." },
            { icon: "🔧", title: "Electricians", desc: "Check breaker and wire sizing by calculating exact current draw from a device's rated voltage and wattage before running a new circuit." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Confirm LED resistor values, battery runtime, and small-project power budgets in milliwatts and milliamps without manual unit math." },
            { icon: "🎓", title: "Students", desc: "Work through homework problems on power, voltage, and current relationships and verify answers before submitting coursework." },
            { icon: "🏭", title: "Industrial Technicians", desc: "Validate sensor, actuator, and control panel power draw against per-channel power budgets on PLCs and control systems." },
            { icon: "🚗", title: "Automotive DIYers", desc: "Diagnose accessory wiring and lighting circuits by checking whether measured voltage and current match rated specifications." },
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
