export default function TransformerCurrentCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a transformer current calculator?",
      a: "A transformer current calculator is a free online tool that computes the current a transformer's winding carries from its rated power, voltage, and power factor. It supports both single-phase (I = P ÷ (V × PF)) and three-phase (I = P ÷ (√3 × V × PF)) systems, and returns apparent power alongside the calculated current.",
    },
    {
      q: "What is the formula for single-phase transformer current?",
      a: "I = P ÷ (V × PF), where I is current in amps, P is real power in watts, V is voltage in volts, and PF is power factor. For example, a 5,000W load at 230V with power factor 0.9 draws I = 5,000 ÷ (230 × 0.9) = 5,000 ÷ 207 ≈ 24.15A.",
    },
    {
      q: "What is the formula for three-phase transformer current?",
      a: "I = P ÷ (√3 × V × PF), where √3 ≈ 1.7321 accounts for the three-phase relationship between line conductors. For example, a 10,000W load at 400V with power factor 0.85 draws I = 10,000 ÷ (1.732 × 400 × 0.85) = 10,000 ÷ 588.9 ≈ 16.98A.",
    },
    {
      q: "Why is three-phase current lower than single-phase current for the same power?",
      a: "Three-phase power is delivered across three conductors simultaneously rather than one, and the √3 factor in the denominator reflects that shared delivery — for the same total power and voltage, three-phase current per line is lower than the equivalent single-phase current would be, which is one reason three-phase distribution is more efficient for higher power loads.",
    },
    {
      q: "What is the difference between primary current and secondary current?",
      a: "Primary current flows in the winding connected to the power source; secondary current flows in the winding delivering output to the load. Their ratio is the inverse of the voltage ratio (Ip/Is = Ns/Np) — a step-down transformer has lower primary current and higher secondary current for the same power, since power is conserved across the turns ratio.",
    },
    {
      q: "How do I calculate current for a three-phase motor from its kW rating?",
      a: "Convert kW to W (multiply by 1,000), then apply I = P ÷ (√3 × V × PF). A 15kW motor at 415V with power factor 0.85 draws I = 15,000 ÷ (1.732 × 415 × 0.85) ≈ 24.55A — this full-load current figure is what's used for cable and overload relay sizing.",
    },
    {
      q: "Why does power factor affect the calculated current?",
      a: "Power factor separates real power (useful work) from apparent power (total current-carrying demand). A lower power factor means more current is needed to deliver the same real power, since PF appears in the denominator of the current formula — a load with PF 0.7 draws proportionally more current than the same wattage load at PF 0.95.",
    },
    {
      q: "How do I choose between single-phase and three-phase mode?",
      a: "Use single-phase mode for residential circuits and most household and light commercial equipment (typically 110-240V). Use three-phase mode for industrial motors, commercial buildings, and heavier equipment typically running at 380-480V line voltage across three conductors.",
    },
    {
      q: "How does this calculator's current relate to cable and breaker sizing?",
      a: "The calculated current is the continuous full-load current the winding or circuit must carry, but real-world cable and breaker sizing typically applies a safety margin (commonly 1.25× for continuous loads) on top of this base figure, and accounts for ambient temperature and installation method derating factors that this calculator doesn't include.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your power, voltage, and power factor values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select single-phase or three-phase", "Choose the system configuration matching your transformer or circuit — single-phase for most residential loads, three-phase for industrial and commercial systems."],
    ["Enter power", "Input the real power in watts (W) that the transformer or load draws."],
    ["Enter voltage", "Input the line voltage in volts (V) — line-to-neutral for single-phase, line-to-line for three-phase."],
    ["Enter power factor", "Input the load's power factor as a decimal between 0 and 1."],
    ["Read the calculated current", "View primary current, secondary current, and (for three-phase) line current, all derived from the same inputs."],
    ["Apply a preset or export results", "Use a built-in preset for common residential and industrial systems, or export the full calculation as text or JSON."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Transformer Current Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>transformer current calculator</strong> computes the current a transformer's winding
            or circuit carries from its rated power, voltage, and power factor. It supports both
            single-phase (I = P ÷ (V × PF)) and three-phase (I = P ÷ (√3 × V × PF)) systems, returning
            current alongside apparent power for cable, breaker, and protection device sizing.
          </p>
          <p>
            The formula differs meaningfully between single-phase and three-phase systems — three-phase
            introduces the √3 factor accounting for the 120-degree phase relationship between line
            conductors, and using the single-phase formula on a three-phase system produces a current figure
            that's off by that same factor. This tool applies the correct formula for whichever
            configuration you select, and shows both primary and secondary current derived from the same
            power and voltage inputs.
          </p>
          <p>
            Built for <strong>electricians sizing cables and overload protection, electrical engineers
            verifying transformer and motor current ratings, and facility managers</strong> assessing
            circuit loading. Includes six built-in presets spanning residential to heavy industrial systems,
            full step-by-step derivation, and text and JSON export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Transformer Current Formulas
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Single-phase</span>: I = P ÷ (V × PF)</p>
              <p><span className="font-semibold">Three-phase</span>: I = P ÷ (√3 × V × PF)</p>
              <p><span className="font-semibold">Apparent Power</span>: S = P ÷ PF</p>
              <p className="text-gray-500 text-xs mt-2">Example (3-phase): P = 10,000W, V = 400V, PF = 0.85</p>
              <p className="text-gray-500 text-xs">I = 10,000 ÷ (1.732 × 400 × 0.85) = <span className="text-green-600 font-semibold">≈16.98A</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>√3 ≈ 1.7321</strong> — used only for three-phase calculations, not single-phase</li>
            <li><strong>Lower PF → higher current</strong> — power factor sits in the denominator, so lower PF means more current for the same power</li>
            <li><strong>Primary vs. secondary current</strong> — related by the inverse of the transformer's voltage ratio</li>
            <li>Use single-phase mode for most residential circuits; three-phase for industrial and commercial systems</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Transformer Current Calculator
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
                "Single-phase and three-phase mode support",
                "Primary, secondary, and line current results",
                "Apparent power (VA) calculation",
                "Full step-by-step derivation",
                "Six built-in presets (residential, industrial, motor)",
                "Calculation history (saved locally)",
                "Export as text or JSON file",
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
              title: "Residential Single-Phase Circuit Sizing",
              scenario: "An electrician calculating current for a 5,000W single-phase load at 230V with power factor 0.9 uses the calculator to find I = 5,000 ÷ (230 × 0.9) ≈ 24.15A — used to confirm the circuit needs at least a 25A or 32A breaker with appropriately rated cable.",
            },
            {
              title: "US Residential Panel Load Check",
              scenario: "An electrician verifying a 2,000W load at 120V with power factor 0.9 calculates I = 2,000 ÷ (120 × 0.9) ≈ 18.5A — confirming the circuit fits within a standard 20A residential branch circuit with margin.",
            },
            {
              title: "Industrial Three-Phase Transformer Current",
              scenario: "An engineer sizing cables for a 10,000W three-phase load at 400V with power factor 0.85 calculates I = 10,000 ÷ (1.732 × 400 × 0.85) ≈ 16.98A per line, used to select appropriately rated three-phase cable and protection.",
            },
            {
              title: "Commercial Building Supply Current",
              scenario: "A facility manager verifying a 15,000W three-phase commercial supply at 415V, power factor 0.9, calculates I ≈ 23.4A per line — cross-checking this against the building's installed switchgear rating to confirm adequate capacity.",
            },
            {
              title: "Three-Phase Motor Full-Load Current",
              scenario: "An electrician sizing an overload relay for a 7,500W three-phase motor at 400V with power factor 0.8 calculates I ≈ 13.53A full-load current, setting the overload relay to approximately 104% of this figure per standard practice.",
            },
            {
              title: "Large Industrial Load Cable Selection",
              scenario: "An engineer sizing cable for a 50,000W heavy industrial load at 415V, power factor 0.85, calculates I ≈ 81.85A per line — used to select cable with sufficient ampacity plus the standard continuous-load safety margin.",
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
                "Apply the standard 1.25× continuous-load safety factor on top of this calculator's result when sizing cables and breakers for loads that run continuously for three hours or more.",
                "Use the motor's rated power factor from its nameplate, not an assumed value, for full-load current calculations used in overload relay and cable sizing — power factor varies meaningfully between motor types and sizes.",
                "For three-phase systems, always confirm whether your voltage figure is line-to-line (which this calculator expects) or line-to-neutral — using the wrong one skews the result by a factor of √3.",
                "Cross-check calculated current against a clamp meter reading when commissioning new equipment — a significant mismatch usually points to an incorrect power factor assumption or measurement error.",
                "When comparing single-phase and three-phase options for the same total power, remember three-phase draws less current per line — useful context when deciding whether to specify a three-phase supply for a large load.",
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
                "Using the single-phase formula for a three-phase system, or vice versa. This produces a current figure off by a factor of √3 (about 1.732) — always match the formula to the actual system configuration.",
                "Forgetting power factor entirely and using I = P ÷ V. This calculates the current as if power factor were 1.0, understating actual current draw for any load with a power factor below unity.",
                "Assuming this calculator's result already includes cable derating and safety margins. It computes the base continuous current from power, voltage, and power factor — additional factors for ambient temperature, grouping, and continuous-load margin need to be applied separately per applicable electrical codes.",
                "Confusing primary and secondary current when working with a transformer rather than a simple load. Primary current relates to secondary current by the inverse of the turns/voltage ratio, not by the same formula applied twice with the same voltage.",
                "Using nominal voltage when actual supply voltage differs meaningfully. Since current is inversely proportional to voltage, a 5% low supply voltage increases actual current draw by roughly 5% for the same power.",
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
          Common System Current Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">System</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Power / Voltage</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Phase / PF</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Current</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Residential (EU)", "5,000W / 230V", "1-phase / 0.9", "24.15 A"],
                ["Residential (US)", "2,000W / 120V", "1-phase / 0.9", "18.52 A"],
                ["Industrial 3-phase", "10,000W / 400V", "3-phase / 0.85", "16.98 A"],
                ["Commercial 3-phase", "15,000W / 415V", "3-phase / 0.9", "23.20 A"],
                ["3-phase motor", "7,500W / 400V", "3-phase / 0.8", "13.53 A"],
                ["Large industrial load", "50,000W / 415V", "3-phase / 0.85", "81.85 A"],
              ].map(([sys, pv, ppf, i]) => (
                <tr key={sys} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{sys}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{pv}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{ppf}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Single-phase: I = P ÷ (V × PF). Three-phase: I = P ÷ (√3 × V × PF). Add safety margins for cable/breaker sizing per applicable codes.</p>
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
          Who Uses This Transformer Current Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔧", title: "Electricians", desc: "Size cables, breakers, and overload protection devices for single-phase and three-phase circuits." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Verify transformer and motor current ratings during power distribution system design." },
            { icon: "🏭", title: "Facility Managers", desc: "Check circuit loading against installed switchgear capacity for commercial and industrial supplies." },
            { icon: "🏗️", title: "Project Engineers", desc: "Calculate expected current draw for new equipment during electrical system planning." },
            { icon: "🎓", title: "Electrical Engineering Students", desc: "Learn single-phase versus three-phase current calculations through worked examples." },
            { icon: "🔌", title: "Panel Builders", desc: "Confirm current ratings when specifying components for motor control centers and distribution panels." },
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
