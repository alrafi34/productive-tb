export default function ApparentPowerCalculatorSEO() {
  const faqItems = [
    {
      q: "What is an apparent power calculator?",
      a: "An apparent power calculator is a free online tool that computes the total power a supply must deliver to an AC circuit, using the formula S = V × I. Apparent power, measured in volt-amperes (VA), is the vector sum of real power and reactive power, and represents the actual current-carrying capacity a supply, cable, or breaker must handle.",
    },
    {
      q: "What is the formula for apparent power?",
      a: "S = V × I, where S is apparent power in volt-amperes, V is voltage in volts, and I is current in amps. For example, a 230V circuit drawing 10A has apparent power of S = 230 × 10 = 2,300VA (2.3kVA). Unlike real power, this formula doesn't require knowing the power factor.",
    },
    {
      q: "What is the difference between apparent power (VA) and real power (W)?",
      a: "Apparent power (VA) is the total power the supply delivers, calculated simply as V × I. Real power (W) is only the useful portion that performs actual work, calculated as V × I × PF. They're equal only when power factor is 1.0 (purely resistive); for any reactive load, apparent power is greater than real power.",
    },
    {
      q: "Why is apparent power used for sizing generators, transformers, and cables?",
      a: "Generators, transformers, UPS systems, and cables must carry the full current the load draws, regardless of how much of that current does useful work — this is exactly what apparent power (S = V × I) measures. This is why these components are rated in VA or kVA rather than watts, since watts alone would understate the actual current-handling requirement for any load with a power factor below 1.0.",
    },
    {
      q: "How do I convert apparent power to real power?",
      a: "Multiply apparent power by power factor: P = S × PF. A 2,300VA apparent power circuit with a power factor of 0.8 has real power of P = 2,300 × 0.8 = 1,840W. Without knowing the power factor, apparent power alone doesn't tell you how much useful work the circuit performs.",
    },
    {
      q: "Why does apparent power matter for utility billing and demand charges?",
      a: "Many commercial and industrial utility tariffs bill demand charges based on kVA (apparent power) rather than kW (real power), specifically because the utility's infrastructure must be sized for the full current draw, not just the useful portion. A facility with poor power factor can face higher demand charges than its actual energy consumption alone would suggest.",
    },
    {
      q: "How do I calculate apparent power for a three-phase system?",
      a: "For a balanced three-phase system: S = √3 × V_line × I_line, where V_line is the line-to-line voltage and I_line is the line current. This calculator computes single-phase apparent power (S = V × I) — multiply the result by √3 (approximately 1.732) for the equivalent three-phase apparent power.",
    },
    {
      q: "What is the maximum current a device can draw for a given apparent power rating?",
      a: "Rearrange the formula: I = S ÷ V. A device rated for 1,500VA on a 120V supply draws a maximum of 1,500 ÷ 120 = 12.5A — this is the figure used for breaker and wiring sizing, regardless of the device's actual power factor.",
    },
    {
      q: "Why is apparent power always greater than or equal to real power?",
      a: "Apparent power is the hypotenuse of the power triangle (S² = P² + Q²), and a hypotenuse is always at least as long as either leg. Since power factor (P/S) can never exceed 1.0, real power can never exceed apparent power — they're only equal when reactive power is zero.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage and current values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter voltage", "Input the supply voltage in volts (V) for the circuit or load."],
    ["Enter current", "Input the current drawn by the load in amps (A), from a nameplate rating or measured value."],
    ["Read the apparent power result", "The calculator returns apparent power in VA, automatically formatted to kVA or MVA for larger values."],
    ["Review the step-by-step calculation", "See exactly how voltage and current combine using S = V × I."],
    ["Apply a preset (optional)", "Use one of six built-in presets spanning residential circuits to industrial three-phase and DC loads."],
    ["Save or export the result", "Save the calculation to history, or export the full result with steps as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Apparent Power Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>apparent power calculator</strong> computes the total power a supply must deliver to
            an AC circuit using S = V × I. Apparent power, measured in volt-amperes (VA), represents the
            actual current-carrying demand on a supply, cable, or breaker — regardless of how much of that
            power performs useful work versus circulating as reactive power.
          </p>
          <p>
            Apparent power is the simplest of the three AC power quantities to calculate, since it only
            needs voltage and current — no power factor required. That simplicity is exactly why it's the
            figure used for sizing generators, transformers, UPS systems, and cables: these components must
            handle the full current draw of a load, and apparent power is precisely what quantifies that,
            independent of the load's efficiency.
          </p>
          <p>
            Built for <strong>electrical engineers sizing supply infrastructure, electricians calculating
            breaker and cable requirements, and facility managers</strong> understanding utility demand
            charges billed in kVA. Includes six built-in presets from residential to industrial and DC
            loads, full step-by-step calculation, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Apparent Power Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Apparent Power (S)</span> = Voltage (V) × Current (I)</p>
              <p className="text-gray-500 text-xs mt-2">Example: 230V circuit drawing 10A</p>
              <p className="text-gray-500 text-xs">S = 230 × 10 = <span className="text-green-600 font-semibold">2,300 VA (2.3 kVA)</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>S</strong> — apparent power in volt-amperes (VA), the total power drawn from the supply</li>
            <li><strong>No power factor required</strong> — apparent power depends only on voltage and current</li>
            <li><strong>S ≥ P</strong> — apparent power is always greater than or equal to real power</li>
            <li>Used for sizing generators, transformers, UPS systems, cables, and breakers</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Apparent Power Calculator
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
                "Automatic VA, kVA, and MVA formatting",
                "Full step-by-step calculation breakdown",
                "Six built-in presets (residential, industrial, DC)",
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
              title: "UPS Sizing for a Server Rack",
              scenario: "A facilities engineer sizing a UPS for a server rack drawing 230V at 10A calculates apparent power of 2,300VA (2.3kVA). Since UPS units are rated in VA, they select a 3kVA unit to provide headroom above the calculated 2.3kVA load rather than sizing to the equipment's lower wattage rating.",
            },
            {
              title: "US Residential Circuit Breaker Check",
              scenario: "An electrician verifying a 120V, 15A US residential circuit calculates apparent power of 1,800VA. Since breaker and wire sizing depend on current-carrying capacity (which apparent power reflects), this confirms the circuit is within standard 15A/1,800VA branch circuit limits.",
            },
            {
              title: "Industrial Transformer Capacity Check",
              scenario: "An engineer verifying a 400V, 25A industrial circuit finds apparent power of 10,000VA (10kVA). They compare this against the facility's step-down transformer rating to confirm it has sufficient kVA capacity to supply this circuit alongside other existing loads.",
            },
            {
              title: "Small Appliance Power Draw Estimate",
              scenario: "A homeowner checking a small 230V appliance drawing 2A calculates apparent power of 460VA — useful for comparing against the appliance's nameplate VA rating to confirm the measurement matches expected specifications.",
            },
            {
              title: "Heavy Industrial Load Generator Sizing",
              scenario: "A project engineer sizing a backup generator for a 480V, 50A heavy industrial load calculates apparent power of 24,000VA (24kVA). Since generators are rated in kVA to reflect their maximum current delivery capability, they select a generator rated well above this 24kVA figure to handle starting surge current.",
            },
            {
              title: "Battery-Powered Device Load Check",
              scenario: "A hobbyist verifying a 12V DC device drawing 5A calculates apparent power of 60VA. For DC circuits, apparent power and real power are effectively the same since there's no phase relationship to create a reactive component, so this figure directly represents the device's actual power draw.",
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
                "Always use apparent power (VA), not real power (W), for sizing UPS units, generators, transformers, and breakers — these components must handle the full current draw regardless of power factor.",
                "For three-phase systems, multiply single-phase apparent power by √3 (about 1.732) when working with line-to-line voltage and line current to get the correct three-phase total.",
                "When comparing an appliance's nameplate VA rating to a calculated value, remember measurement tolerances mean small differences (a few percent) are normal and not necessarily a fault.",
                "Add headroom above the calculated apparent power when sizing supply equipment — generators and UPS systems need margin for starting surge current, which can briefly exceed steady-state apparent power significantly.",
                "Use this calculator's result alongside a known power factor to also find real power (P = S × PF) when you need to know actual useful output, not just supply capacity.",
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
                "Confusing apparent power (VA) with real power (W) when sizing equipment. Using a device's wattage rating instead of its VA rating for breaker sizing underestimates the actual current draw for any load with power factor below 1.0.",
                "Forgetting the √3 factor for three-phase apparent power calculations. Using the single-phase formula for a three-phase system understates apparent power by roughly 42%.",
                "Treating apparent power as if it directly represents useful work performed. VA and watts are only equal at unity power factor — for any other load, VA overstates the useful output.",
                "Ignoring apparent power entirely when comparing utility demand charges. Many commercial tariffs bill based on kVA demand, not kW, so a facility can face higher charges than its kWh energy bill alone suggests.",
                "Using nameplate current without accounting for starting or inrush current when sizing supply equipment. Motors and other inductive loads often draw several times their running current momentarily at startup.",
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
          Typical Circuit Apparent Power Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Circuit Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Voltage</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Current</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Apparent Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Low voltage DC device", "12V", "5A", "60 VA"],
                ["Small appliance", "230V", "2A", "460 VA"],
                ["Residential circuit (EU)", "230V", "10A", "2,300 VA"],
                ["Residential circuit (US)", "120V", "15A", "1,800 VA"],
                ["Industrial 3-phase (per line)", "400V", "25A", "10,000 VA"],
                ["Heavy industrial load", "480V", "50A", "24,000 VA"],
              ].map(([type, v, i, s]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{type}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{v}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{i}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Calculated using S = V × I. Three-phase figures shown are per-line; multiply by √3 for total three-phase apparent power.</p>
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
          Who Uses This Apparent Power Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Size generators, transformers, and UPS systems based on true current-carrying capacity requirements." },
            { icon: "🔧", title: "Electricians", desc: "Calculate breaker and cable sizing based on actual current draw rather than useful wattage alone." },
            { icon: "🏭", title: "Facility Managers", desc: "Understand utility kVA demand charges and compare them against apparent power calculations." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn the distinction between apparent, real, and reactive power through simple V×I calculations." },
            { icon: "🖥️", title: "IT & Data Center Staff", desc: "Size UPS and power distribution units for server racks and equipment based on VA ratings." },
            { icon: "🏗️", title: "Project Engineers", desc: "Verify supply infrastructure capacity during electrical system design and equipment procurement." },
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
