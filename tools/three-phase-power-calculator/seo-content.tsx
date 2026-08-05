export default function ThreePhasePowerCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a three-phase power calculator?",
      a: "A three-phase power calculator is a free online tool that computes real power (kW), apparent power (kVA), and reactive power (kVAR) for balanced three-phase AC systems. It supports three modes: calculate power from voltage, current, and power factor; calculate current from power, voltage, and power factor; or calculate voltage from power, current, and power factor.",
    },
    {
      q: "What is the formula for three-phase power?",
      a: "Real power: P = √3 × V × I × PF ÷ 1000 (kW). Apparent power: S = √3 × V × I ÷ 1000 (kVA). Reactive power: Q = √(S² - P²) (kVAR). For example, a 415V, 10A system with power factor 0.8: P = 1.732 × 415 × 10 × 0.8 ÷ 1000 = 5.75kW.",
    },
    {
      q: "Why does three-phase power use a √3 factor instead of the single-phase formula?",
      a: "In a balanced three-phase system, the three line voltages and currents are 120 degrees apart in phase, and the vector sum of the power delivered across all three phases simplifies to √3 × V_line × I_line, rather than a simple 3× multiplier you might expect from adding three identical single-phase circuits. Using the single-phase formula (V × I) for a three-phase system without this factor underestimates power by about 42%.",
    },
    {
      q: "What is the difference between line voltage and phase voltage in a three-phase system?",
      a: "Line voltage is measured between any two of the three line conductors, while phase voltage is measured between one line conductor and neutral. In a star (wye) connection, line voltage equals phase voltage × √3 — a common 230V phase voltage corresponds to 400V line voltage. In a delta connection, line voltage equals phase voltage directly. This calculator uses line voltage and line current throughout.",
    },
    {
      q: "How do I calculate the current a three-phase motor draws from its kW rating?",
      a: "I = P × 1000 ÷ (√3 × V × PF), where P is in kW. A 15kW motor at 415V with a power factor of 0.85 draws I = 15,000 ÷ (1.732 × 415 × 0.85) = 15,000 ÷ 613.4 ≈ 24.5A. This is the full-load current used for cable and protection device sizing.",
    },
    {
      q: "How do I calculate required voltage from a known power, current, and power factor?",
      a: "V = P × 1000 ÷ (√3 × I × PF). This is useful when verifying a system's expected voltage given a known load and measured current — for example, confirming a 400V supply is delivering the expected voltage under a specific load condition.",
    },
    {
      q: "Why is power factor needed for three-phase power calculations?",
      a: "Power factor separates real power (useful work, kW) from apparent power (total supply demand, kVA) in the same way it does for single-phase circuits. Three-phase motors and transformers typically have power factors between 0.80 and 0.95 at full load, so omitting PF and using apparent power as if it were real power overstates useful output significantly.",
    },
    {
      q: "How does three-phase power calculation change between 50Hz and 60Hz systems?",
      a: "Frequency itself doesn't appear directly in the P = √3VI×PF formula — power depends on voltage, current, and power factor, not frequency. However, standard system voltages differ by region (400-415V/50Hz in Europe and much of Asia, versus 480V/60Hz in North American industrial systems), which is why this calculator includes frequency as a reference field alongside region-specific presets.",
    },
    {
      q: "How do I size a generator for a three-phase load?",
      a: "Calculate the load's apparent power (kVA) using S = √3 × V × I ÷ 1000, since generators are rated in kVA to reflect maximum current delivery capability regardless of the load's power factor. Add margin for motor starting surge current, which can be several times the running current for a brief period during startup.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage, current, power, and power factor values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select a calculation mode", "Choose to calculate Power, Current, or Voltage, depending on which value you don't already know."],
    ["Enter your known values", "For Power mode, enter line voltage, line current, and power factor. For Current mode, enter power, voltage, and power factor. For Voltage mode, enter power, current, and power factor."],
    ["Enter frequency for reference", "Input the system frequency (50Hz or 60Hz) — this doesn't affect the power calculation directly but is recorded for documentation."],
    ["Read the calculated result", "View the requested value, along with real power (kW), apparent power (kVA), and reactive power (kVAR) derived from the same inputs."],
    ["Review the step-by-step derivation", "See exactly how √3, voltage, current, and power factor combine at each stage of the calculation."],
    ["Apply a preset or export results", "Use a built-in preset for common industrial voltage systems, or export the full calculation as text or CSV."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Three-Phase Power Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>three-phase power calculator</strong> computes real power (kW), apparent power (kVA),
            and reactive power (kVAR) for balanced three-phase AC systems — the standard supply
            configuration for industrial motors, commercial buildings, and most equipment above roughly
            10kW. It solves in three directions: find power from voltage, current, and power factor; find
            required current from a known power rating; or find required voltage from a known power and
            current.
          </p>
          <p>
            Three-phase calculations introduce a factor most single-phase formulas don't need: √3
            (approximately 1.732), which accounts for the 120-degree phase relationship between the three
            line conductors. Forgetting this factor — using the single-phase P = V × I × PF formula on a
            three-phase system — is one of the most common electrical calculation errors, understating
            power by roughly 42%. This tool builds √3 into every formula so it can't be accidentally
            dropped, and shows the full derivation so the constant's role is visible at each step.
          </p>
          <p>
            Built for <strong>electrical engineers designing industrial power distribution, electricians
            sizing motor cables and protection devices, and facility managers</strong> verifying three-phase
            supply and generator capacity. Includes six built-in presets covering common industrial voltage
            systems in both 50Hz and 60Hz regions, full step-by-step derivation, and text and CSV export —
            free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Three-Phase Power Formulas
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Real Power (kW)</span> = √3 × V × I × PF ÷ 1000</p>
              <p><span className="font-semibold">Apparent Power (kVA)</span> = √3 × V × I ÷ 1000</p>
              <p><span className="font-semibold">Reactive Power (kVAR)</span> = √(S² - P²)</p>
              <p><span className="font-semibold">Required Current</span> = P × 1000 ÷ (√3 × V × PF)</p>
              <p className="text-gray-500 text-xs mt-2">Example: V = 415V, I = 10A, PF = 0.8</p>
              <p className="text-gray-500 text-xs">P = 1.732 × 415 × 10 × 0.8 ÷ 1000 = <span className="text-green-600 font-semibold">5.75 kW</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>√3 ≈ 1.7321</strong> — the three-phase constant accounting for the 120° phase relationship between lines</li>
            <li><strong>V (line voltage)</strong> — measured between any two of the three line conductors</li>
            <li><strong>I (line current)</strong> — current flowing in each line conductor (assumes a balanced load)</li>
            <li><strong>PF (power factor)</strong> — ratio of real to apparent power, typically 0.80-0.95 for motors at full load</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Three-Phase Power Calculator
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
                "Three modes: power, current, voltage",
                "Real power (kW), apparent power (kVA), reactive power (kVAR)",
                "50Hz and 60Hz system support",
                "Full step-by-step derivation with √3 shown explicitly",
                "Six built-in industrial voltage presets",
                "Calculation history (saved locally)",
                "Export as text or CSV file",
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
              title: "Small Industrial Motor Power Verification",
              scenario: "An electrician measures a three-phase motor at 415V, 10A, with a power factor of 0.8. Using Power mode, the calculator returns P = 5.75kW, S = 7.19kVA, and Q = 4.31kVAR — confirming the motor's actual power draw against its nameplate rating before commissioning.",
            },
            {
              title: "Motor Cable Sizing from kW Rating",
              scenario: "An engineer needs the full-load current for a 15kW motor at 415V with an expected power factor of 0.85 to size cables and overload protection. Using Current mode, the calculator returns I ≈ 24.55A, which they use to select an appropriately rated cable and overload relay.",
            },
            {
              title: "Generator Sizing for a Large Industrial System",
              scenario: "A project engineer sizing a backup generator for a system rated at 415V, 50A, with power factor 0.9 uses Power mode to find P = 32.35kW and S = 35.94kVA. Since generators are rated in kVA, they specify a unit rated well above 35.94kVA to accommodate the load plus starting surge margin.",
            },
            {
              title: "US Industrial System at 60Hz",
              scenario: "An engineer working on a North American installation at 480V, 15A, power factor 0.85, and 60Hz uses Power mode to find P = 10.6kW — confirming the system's real power draw matches design specifications despite the different regional voltage and frequency standard.",
            },
            {
              title: "Commercial Building Load Verification",
              scenario: "A facility manager verifying a commercial building's three-phase supply at 400V, 30A, power factor 0.85 calculates P = 17.66kW and S = 20.78kVA using Power mode — cross-checking this against the building's utility meter readings to confirm accurate billing.",
            },
            {
              title: "Required Voltage Verification for a Known Load",
              scenario: "A technician troubleshooting a system expected to deliver 20kW at 30A with power factor 0.85 uses Voltage mode to calculate the expected line voltage of approximately 452V — comparing this against a measured 415V supply to identify why the system is underperforming its rated output.",
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
                "Always confirm you're using line voltage (between two phases), not phase voltage (between phase and neutral), as the V input — this calculator's formulas expect line voltage throughout.",
                "For motor cable and protection sizing, use Current mode with the motor's rated kW and rated power factor from the nameplate, then apply the standard 1.25× continuous load factor on top of the calculated current.",
                "Use kVA (apparent power), not kW (real power), when sizing generators, transformers, or UPS systems — these components must handle the full current draw regardless of the load's power factor.",
                "When comparing calculated power against a utility meter reading, remember the meter reads real power (kW) for energy billing purposes — apparent power (kVA) is what determines demand charges on many commercial tariffs.",
                "Keep frequency-appropriate presets in mind when working across regions — 400-415V/50Hz systems are standard in Europe and much of Asia, while 480V/60Hz is standard for North American industrial systems.",
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
                "Forgetting the √3 factor and using the single-phase formula (V × I × PF) for a three-phase system. This underestimates power by roughly 42% — always confirm the √3 term is included for any three-phase calculation.",
                "Using phase voltage instead of line voltage in the formula. In a star-connected system, line voltage is √3 times phase voltage — mixing these up produces a result off by that same factor.",
                "Assuming a perfectly balanced three-phase load when the actual system is unbalanced. This calculator's formulas assume equal current in all three lines — an unbalanced load requires per-phase analysis instead.",
                "Confusing kW and kVA when specifying generator or transformer capacity. Rating equipment in kW when kVA is needed undersizes it by a factor equal to 1 divided by the power factor.",
                "Using nominal voltage (415V, 480V) when actual supply voltage differs. Real supply voltage can vary by several percent from nominal, which directly affects calculated current and power figures for precision applications.",
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
          Common Three-Phase System Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">System</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Voltage / Freq</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Current / PF</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Real Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Small industrial motor", "415V / 50Hz", "10A / 0.8", "5.75 kW"],
                ["Medium industrial load", "400V / 50Hz", "20A / 0.85", "11.78 kW"],
                ["Commercial building", "400V / 50Hz", "30A / 0.85", "17.66 kW"],
                ["Large industrial system", "415V / 50Hz", "50A / 0.9", "32.35 kW"],
                ["US industrial (60Hz)", "480V / 60Hz", "15A / 0.85", "10.60 kW"],
                ["Generator sizing example", "415V / 50Hz", "100A / 0.8", "57.50 kW"],
              ].map(([sys, vf, ip, p]) => (
                <tr key={sys} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{sys}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{vf}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{ip}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Calculated using P = √3 × V × I × PF ÷ 1000. Frequency does not affect the power calculation directly but is shown for regional reference.</p>
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
          Who Uses This Three-Phase Power Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Design three-phase power distribution systems and verify motor, transformer, and switchgear ratings." },
            { icon: "🔧", title: "Electricians", desc: "Size cables, breakers, and overload protection for three-phase motors and industrial equipment." },
            { icon: "🏭", title: "Facility Managers", desc: "Verify three-phase supply capacity and cross-check utility meter readings against calculated loads." },
            { icon: "🏗️", title: "Project Engineers", desc: "Size backup generators and UPS systems for three-phase industrial and commercial installations." },
            { icon: "🎓", title: "Electrical Engineering Students", desc: "Learn the √3 factor and three-phase power relationships through worked calculation examples." },
            { icon: "🌍", title: "International Project Teams", desc: "Convert between 50Hz/400-415V and 60Hz/480V regional standards during multi-country installations." },
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
