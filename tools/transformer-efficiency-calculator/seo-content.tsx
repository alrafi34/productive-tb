export default function TransformerEfficiencyCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a transformer efficiency calculator?",
      a: "A transformer efficiency calculator is a free online tool that computes how much of the power fed into a transformer actually reaches the output, expressed as a percentage. It supports three calculation paths: from input and output power directly, from voltage, current, and power factor plus output power, or from output power and known losses.",
    },
    {
      q: "What is the formula for transformer efficiency?",
      a: "Efficiency (η) = (Output Power ÷ Input Power) × 100. For example, a transformer with 1,000W input and 950W output has efficiency η = (950 ÷ 1,000) × 100 = 95%. The remaining 5% (50W) is lost as heat in the windings and core.",
    },
    {
      q: "How do I calculate transformer losses?",
      a: "Losses = Input Power − Output Power. A transformer with 1,000W input and 950W output has losses of 50W. Alternatively, if you know output power and losses directly, Input Power = Output Power + Losses.",
    },
    {
      q: "What is a good transformer efficiency?",
      a: "98% or above is excellent (typical of modern high-efficiency distribution transformers), 95-97% is very good, 90-94% is good, 85-89% is fair, 80-84% is poor, and below 80% is very poor and likely due for replacement. Even small percentage differences matter at scale — a large distribution transformer running continuously at 95% versus 98% efficiency wastes significantly more energy as heat over a year.",
    },
    {
      q: "What causes power losses in a transformer?",
      a: "Two main types: copper losses (I²R heating in the winding resistance, which scale with the square of load current) and core losses (hysteresis and eddy current losses in the iron core, which are roughly constant regardless of load). Copper losses dominate at high load; core losses dominate at light load, which is why transformer efficiency typically peaks somewhere in the middle of the rated load range, not at maximum load.",
    },
    {
      q: "How do I calculate input power from voltage, current, and power factor?",
      a: "Input Power = Voltage × Current × Power Factor. For a transformer measured at 230V, 5A, with a power factor of 0.95: Input Power = 230 × 5 × 0.95 = 1,092.5W. Combined with a known output power, this lets you find efficiency without measuring input power directly.",
    },
    {
      q: "Why does transformer efficiency vary with load?",
      a: "At light load, core losses (which are roughly constant) make up a larger share of the smaller total power, lowering efficiency. At very heavy load, copper losses (which scale with current squared) grow disproportionately, also lowering efficiency. Peak efficiency typically occurs somewhere around 50-75% of rated load, where the two loss types roughly balance.",
    },
    {
      q: "Why do utilities care about distribution transformer efficiency?",
      a: "Distribution transformers run continuously, 24 hours a day, often for decades — so even a small efficiency improvement compounds into substantial energy savings over the transformer's lifetime. This is why utilities increasingly specify high-efficiency (amorphous core or low-loss silicon steel) transformers for new grid installations despite a higher upfront cost.",
    },
    {
      q: "Can transformer efficiency exceed 100%?",
      a: "No. A transformer cannot output more power than it receives — doing so would violate conservation of energy. If a calculation returns efficiency above 100%, it indicates a measurement error, incorrect input values, or output power mistakenly entered as larger than input power.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your power, voltage, current, and loss values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select a calculation mode", "Choose to calculate from input and output power directly, from voltage/current/power factor plus output power, or from output power and known losses."],
    ["Enter your known values", "Depending on the mode, enter input power and output power in watts, or voltage, current, and power factor, or output power and losses."],
    ["Read the efficiency result", "The calculator returns efficiency as a percentage, calculated using η = (Output Power ÷ Input Power) × 100."],
    ["Review calculated losses", "See the power lost as heat, calculated as Input Power − Output Power, in watts."],
    ["Check the efficiency rating", "View a rating from Excellent to Very Poor based on standard transformer efficiency benchmarks."],
    ["Apply a preset or export results", "Use a built-in preset spanning high-efficiency to aging transformers, or export the full calculation as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Transformer Efficiency Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>transformer efficiency calculator</strong> computes how much of the power fed into a
            transformer actually reaches the output, expressed as a percentage. Efficiency is calculated as
            η = (Output Power ÷ Input Power) × 100 — the remainder is lost as heat in the windings (copper
            losses) and core (iron losses), which is why transformers, like all real electrical equipment,
            never reach exactly 100% efficiency.
          </p>
          <p>
            Transformer efficiency questions come in different forms depending on what data you actually
            have available — sometimes you have direct input and output power readings, sometimes you only
            have a voltage and current measurement on the primary side plus a known output rating, and
            sometimes you know the manufacturer's rated losses figure rather than measured power. This tool
            handles all three starting points and derives efficiency, input power, and losses consistently
            regardless of which data set you begin with.
          </p>
          <p>
            Built for <strong>electrical engineers evaluating transformer performance, utility engineers
            comparing distribution transformer options, and facility managers</strong> assessing whether an
            aging transformer needs replacement. Includes six built-in presets from high-efficiency modern
            units to older transformers needing replacement, full step-by-step derivation, and text export
            — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Transformer Efficiency Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Efficiency (η)</span> = (Output Power ÷ Input Power) × 100</p>
              <p><span className="font-semibold">Losses</span> = Input Power − Output Power</p>
              <p><span className="font-semibold">Input Power (from V/I)</span> = Voltage × Current × PF</p>
              <p className="text-gray-500 text-xs mt-2">Example: 1,000W input, 950W output</p>
              <p className="text-gray-500 text-xs">η = (950 ÷ 1,000) × 100 = <span className="text-green-600 font-semibold">95%</span>, losses = 50W</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Copper losses</strong> — I²R heating in windings, scales with current squared, dominates at high load</li>
            <li><strong>Core (iron) losses</strong> — hysteresis and eddy currents, roughly constant regardless of load</li>
            <li><strong>Peak efficiency</strong> — typically occurs around 50-75% of rated load, where loss types balance</li>
            <li>Efficiency can never exceed 100% — output power can never exceed input power</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Transformer Efficiency Calculator
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
                "Three calculation modes for different known data",
                "Efficiency percentage and power losses in watts",
                "Automatic efficiency rating (Excellent to Very Poor)",
                "Full step-by-step derivation",
                "Six built-in presets across efficiency levels",
                "Calculation history (saved locally)",
                "Export calculation as a text file",
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
              title: "Direct Power Measurement Efficiency Check",
              scenario: "An engineer measures a transformer with 1,000W input power and 950W output power using bench meters. The calculator returns η = 95% and losses of 50W, rated 'Very Good' — confirming the unit performs within its nameplate specification before installation.",
            },
            {
              title: "Efficiency from Primary-Side Measurements",
              scenario: "A technician can only measure the primary side of an installed transformer at 230V, 5A, with a power factor of 0.95, knowing the load draws 1,000W. Using Voltage-Current mode, the calculator computes input power of 1,092.5W, giving an efficiency of 91.5% — useful when a direct input power meter isn't available.",
            },
            {
              title: "Manufacturer Loss Specification Verification",
              scenario: "An engineer verifying a transformer datasheet listing 4,850W output and 150W rated losses uses Output-Losses mode to confirm input power of 5,000W and efficiency of 97% — matching the manufacturer's claimed distribution transformer efficiency rating.",
            },
            {
              title: "Old Transformer Replacement Justification",
              scenario: "A facility manager evaluates an aging 1,000W-rated transformer measured at 850W output, giving 150W losses and 85% efficiency — rated 'Fair' by the calculator, well below the 95%+ typical of modern units, supporting a business case for replacement based on ongoing energy waste.",
            },
            {
              title: "Industrial Transformer Load Efficiency",
              scenario: "An engineer checking a 10,000W industrial transformer measures 9,600W output, for 400W losses and 96% efficiency — rated 'Very Good', confirming the unit is operating efficiently at its current load point before scaling up facility demand.",
            },
            {
              title: "Efficiency Comparison for Procurement Decision",
              scenario: "A procurement team compares two transformer quotes: one rated 1,000W in/980W out (98% efficiency, 'Excellent') versus another rated 1,000W in/950W out (95%, 'Very Good'). The calculator's loss figures (20W versus 50W) quantify the annual energy cost difference to justify the higher-efficiency unit's premium price.",
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
                "Measure efficiency at the transformer's typical operating load, not just at full rated load — efficiency varies with load level, and peak efficiency usually sits around 50-75% of rated capacity, not at maximum.",
                "For continuous-duty transformers like utility distribution units, small efficiency differences (even 1-2%) matter enormously over a multi-decade service life — factor lifetime energy cost, not just purchase price, into procurement decisions.",
                "When direct input power measurement isn't available, use the voltage-current-power factor mode as a reliable substitute, since it only requires accessible primary-side measurements.",
                "Compare a transformer's rated losses (from its datasheet) against your own measured or calculated losses periodically — a growing gap over time can indicate insulation degradation or core issues worth investigating.",
                "Remember that copper losses scale with current squared while core losses stay roughly constant — a transformer running well below its rated capacity most of the time will have most of its losses coming from the core, not the windings.",
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
                "Entering output power greater than input power. This is physically impossible for a passive transformer and always indicates a measurement or unit error rather than an unusually efficient unit.",
                "Forgetting power factor when calculating input power from voltage and current. Using just V × I (apparent power) instead of V × I × PF (real power) overstates input power for any load with a power factor below 1.0.",
                "Assuming a transformer's efficiency is the same at every load level. Efficiency measured at 20% load can differ meaningfully from efficiency at 100% load — always note the load condition alongside any efficiency figure you report.",
                "Comparing efficiency ratings across transformers of very different power ratings without context. A tiny transformer's percentage efficiency is often naturally lower than a large one's, since fixed core losses represent a larger share of a smaller total power.",
                "Ignoring efficiency degradation over a transformer's service life. Insulation aging, core lamination issues, and loose connections can gradually reduce efficiency below the original nameplate rating — periodic re-measurement catches this drift.",
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
          Transformer Efficiency Rating Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Efficiency</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["≥98%", "Excellent", "Modern amorphous-core distribution transformer"],
                ["95-97%", "Very Good", "Standard modern power transformer"],
                ["90-94%", "Good", "Typical industrial-duty transformer"],
                ["85-89%", "Fair", "Small or older transformer design"],
                ["80-84%", "Poor", "Aging transformer, efficiency degrading"],
                ["<80%", "Very Poor", "Likely candidate for replacement"],
              ].map(([eff, rating, example]) => (
                <tr key={eff} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{eff}</td>
                  <td className="py-2 px-3 font-semibold text-green-600 text-xs">{rating}</td>
                  <td className="py-2 px-3 text-gray-600 text-xs">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Ratings are general guidelines — always compare against the specific transformer class and its own rated specifications.</p>
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
          Who Uses This Transformer Efficiency Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Evaluate transformer performance during design, testing, and commissioning of power systems." },
            { icon: "🏭", title: "Utility Engineers", desc: "Compare distribution transformer efficiency options to minimize lifetime energy losses across the grid." },
            { icon: "🏢", title: "Facility Managers", desc: "Assess whether aging transformers justify replacement based on quantified energy loss and efficiency decline." },
            { icon: "🔧", title: "Maintenance Technicians", desc: "Verify transformer performance against nameplate ratings during periodic testing and inspection." },
            { icon: "📊", title: "Energy Auditors", desc: "Quantify transformer losses as part of facility-wide energy efficiency assessments." },
            { icon: "🎓", title: "Electrical Engineering Students", desc: "Learn transformer loss mechanisms and verify efficiency calculation homework problems." },
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
