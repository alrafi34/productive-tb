export default function ParallelResistorCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a parallel resistor calculator?",
      a: "A parallel resistor calculator is a free online tool that computes the equivalent resistance of two or more resistors connected side by side across the same two nodes. Enter each resistor's value in ohms, kilohms, or megohms, and the calculator applies the reciprocal formula to return a single equivalent resistance value, always lower than the smallest individual resistor.",
    },
    {
      q: "What is the formula for resistors in parallel?",
      a: "1/R_total = 1/R1 + 1/R2 + 1/R3 + ... + 1/Rn. For exactly two resistors, this simplifies to R_total = (R1 × R2) ÷ (R1 + R2). For example, a 100Ω and a 220Ω resistor in parallel give R_total = (100 × 220) ÷ (100 + 220) = 22,000 ÷ 320 = 68.75Ω.",
    },
    {
      q: "Why is equivalent parallel resistance always lower than the smallest resistor?",
      a: "Parallel resistors give current multiple paths to flow through simultaneously, and each additional path makes it overall easier for current to get through — reducing total opposition. The equivalent resistance is always lower than the smallest individual resistor in the group, since even a single very small resistor already provides a low-resistance path that the total can't exceed.",
    },
    {
      q: "What happens when I put two equal resistors in parallel?",
      a: "Two equal resistors in parallel give exactly half the value of one: R_total = R ÷ 2. For example, two 100Ω resistors in parallel equal 50Ω. This is a common technique for halving a resistance value or doubling a resistor's effective power rating, since the power is now shared between two components.",
    },
    {
      q: "How do I calculate current split between parallel resistors?",
      a: "Current divides inversely to resistance — the branch with lower resistance carries more current. Use the current divider rule: I1 = I_total × R2 ÷ (R1 + R2) for the current through R1, where I_total is the total current entering the parallel combination and R2 is the other resistor's value.",
    },
    {
      q: "How do I combine resistors in parallel to get a value not available off the shelf?",
      a: "Try common E12 resistor pairs and check the result against your target. Two 100Ω resistors in parallel give 50Ω; a 100Ω and a 150Ω give 60Ω; three equal 300Ω resistors in parallel give 100Ω. This calculator lets you test combinations instantly rather than working out the reciprocal math by hand each time.",
    },
    {
      q: "Does adding more resistors in parallel always lower the total resistance?",
      a: "Yes. Every additional resistor added in parallel creates one more path for current, which always lowers the total, or in the theoretical limit of an infinite resistor leaves it unchanged — it never raises it. This is the opposite behavior from a series circuit, where every additional resistor always raises the total.",
    },
    {
      q: "How is parallel resistance different from series resistance?",
      a: "Series resistors share the same current and their resistances simply add together, always increasing the total. Parallel resistors share the same voltage across each branch but split the current, and their combined resistance is found using the reciprocal formula, always decreasing the total below the smallest individual value.",
    },
    {
      q: "How many resistors can I calculate in parallel at once?",
      a: "There's no fixed limit — add resistors one at a time, and the calculator sums their reciprocals as you go. You can also use shorthand notation like 4.7k or 1M when entering values, which the calculator parses automatically without a separate unit dropdown for quick entries.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your resistor values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Add your first resistor", "Enter a resistance value and select its unit — Ω, kΩ, or MΩ — or use shorthand like 4.7k or 1M."],
    ["Add additional resistors", "Add every resistor connected in parallel across the same two nodes. There's no limit on how many you can include."],
    ["Choose your output unit", "Select whether you want the equivalent resistance displayed in Ω, kΩ, or MΩ."],
    ["Read the equivalent resistance", "The result updates instantly using the reciprocal formula, always lower than the smallest resistor you entered."],
    ["Remove or edit resistors as needed", "Adjust any value or remove a resistor to instantly see how the equivalent resistance changes."],
    ["Save or review calculation history", "Save the result for later reference, or revisit past calculations saved locally in your browser."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Parallel Resistor Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>parallel resistor calculator</strong> computes the equivalent resistance of two or
            more resistors connected side by side across the same two nodes. Enter each resistor's value in
            ohms, kilohms, or megohms, and the calculator applies the reciprocal formula to return a single
            equivalent value — always lower than the smallest individual resistor in the group.
          </p>
          <p>
            The reciprocal formula (1/R_total = 1/R1 + 1/R2 + ... + 1/Rn) is more error-prone to compute by
            hand than the simple addition used for series resistors, since it requires inverting each value,
            summing the reciprocals, and inverting again — a multi-step process where a single arithmetic
            slip produces a wrong answer that isn't obviously wrong. This tool performs the full reciprocal
            calculation instantly for any number of resistors, and also accepts shorthand entry like "4.7k".
          </p>
          <p>
            Built for <strong>electronics students verifying textbook problems, hobbyists combining
            standard resistor values to hit a target, and electrical engineers</strong> checking equivalent
            resistance during circuit analysis. No signup, unlimited resistors, and instant real-time results
            — entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Parallel Resistance Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">General (any n)</span>: 1/R_total = 1/R1 + 1/R2 + ... + 1/Rn</p>
              <p><span className="font-semibold">Two resistors</span>: R_total = (R1 × R2) ÷ (R1 + R2)</p>
              <p><span className="font-semibold">n equal resistors</span>: R_total = R ÷ n</p>
              <p className="text-gray-500 text-xs mt-2">Example: 100Ω and 220Ω in parallel</p>
              <p className="text-gray-500 text-xs">R_total = (100 × 220) ÷ 320 = <span className="text-green-600 font-semibold">68.75Ω</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Parallel connection</strong> — resistors sharing the same two nodes, so each sees the same voltage</li>
            <li><strong>Total resistance always decreases</strong> — adding any resistor in parallel lowers R_total below the smallest individual value</li>
            <li><strong>Two-resistor shortcut</strong> — the product-over-sum formula avoids reciprocal math for the common two-resistor case</li>
            <li>This calculator handles the parallel case only — for resistors in series, use the series resistor calculator instead (see related tools)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Parallel Resistor Calculator
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
                "Unlimited resistors per parallel group",
                "Shorthand entry support (e.g. 4.7k, 1M)",
                "Automatic Ω, kΩ, MΩ unit conversion",
                "Reciprocal formula applied automatically for any count",
                "Calculation history (saved locally)",
                "Add, edit, or remove resistors instantly",
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
              title: "Halving a Resistance Value",
              scenario: "A hobbyist needs a 50Ω resistor but only has 100Ω in stock. Entering two 100Ω resistors into the calculator confirms the parallel combination gives exactly 50Ω, letting them build the value from parts on hand instead of ordering a new part.",
            },
            {
              title: "Doubling a Resistor's Power Rating",
              scenario: "A technician needs a 1/2-watt equivalent resistor but only has 1/4-watt 220Ω parts. Placing two 220Ω 1/4-watt resistors in parallel, the calculator confirms the combined resistance is 110Ω while the power handling doubles to roughly 1/2 watt, since the current now splits evenly between two resistors.",
            },
            {
              title: "Homework Verification for a Parallel Circuit",
              scenario: "A student solving a textbook problem with three resistors (100Ω, 220Ω, 330Ω) in parallel enters all three into the calculator, which returns 56.34Ω — matching their hand-calculated reciprocal sum and confirming they inverted and summed correctly.",
            },
            {
              title: "Speaker Impedance Matching",
              scenario: "An audio hobbyist wiring two 8Ω speakers in parallel for a single amplifier channel checks the resulting load. The calculator confirms 8Ω || 8Ω = 4Ω, which they verify is within the amplifier's rated minimum load impedance before connecting the speakers.",
            },
            {
              title: "Custom Resistance for a Sensor Bias Network",
              scenario: "An engineer needs 68.75Ω for a sensor bias resistor but doesn't have that exact value available. Testing a 100Ω and 220Ω combination in the calculator confirms it produces exactly 68.75Ω, matching the design requirement without a custom part order.",
            },
            {
              title: "Multiple Pull-Up Resistor Bank Check",
              scenario: "A hardware designer has four 10kΩ pull-up resistors accidentally wired in parallel on a shared bus line instead of one per device. Entering four 10kΩ values into the calculator returns 2.5kΩ combined — much lower than intended — helping them identify the wiring error before it causes excess current draw on the bus.",
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
                "Use the shorthand entry (like 4.7k or 1M) for quick multi-resistor comparisons — it's faster than opening a unit dropdown for every single value when you're testing several combinations rapidly.",
                "Remember that n equal resistors in parallel always give R/n — a fast mental check before relying on the full calculation, and a useful trick for both halving resistance and multiplying power handling.",
                "When paralleling resistors for higher power handling, use resistors with matched tolerance and value. Mismatched resistors in parallel don't share current equally, so the tighter-tolerance resistor ends up carrying more than its intended share.",
                "For quick two-resistor combinations, the product-over-sum shortcut R_total = (R1 × R2) ÷ (R1 + R2) is faster to compute by hand than the full reciprocal formula — use it as a sanity check against this calculator's result.",
                "If you're trying to hit an exact target resistance, test a few common E12 pairs in the calculator rather than solving the reciprocal equation algebraically — it's faster to iterate than to derive the exact pair from scratch.",
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
                "Adding resistances directly instead of using the reciprocal formula. Parallel resistors do not simply add — a 100Ω and 220Ω in parallel is 68.75Ω, not 320Ω, which is the series-circuit answer for the same two values.",
                "Forgetting that equivalent parallel resistance can never exceed the smallest individual resistor. If your hand calculation returns a value larger than the smallest resistor in the group, there's an arithmetic error somewhere in the reciprocal sum.",
                "Assuming current splits equally between parallel branches with different resistance values. Current divides inversely to resistance — the lower-resistance branch always carries more current, proportionally more as the mismatch grows.",
                "Paralleling resistors with very different power ratings expecting even heat distribution. Even with matched resistance, mismatched wattage ratings mean one resistor may be pushed near its limit while the other has headroom to spare.",
                "Confusing this calculator's parallel formula with the series formula when checking a circuit. Always confirm whether the resistors share both terminals (parallel) or are chained end-to-end (series) before picking which calculator to use.",
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
          Common Parallel Combinations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">R1</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">R2</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["100Ω", "100Ω", "50Ω"],
                ["100Ω", "220Ω", "68.75Ω"],
                ["220Ω", "330Ω", "132Ω"],
                ["1kΩ", "1kΩ", "500Ω"],
                ["4.7kΩ", "10kΩ", "3.2kΩ"],
                ["8Ω", "8Ω", "4Ω"],
              ].map(([r1, r2, eq]) => (
                <tr key={`${r1}-${r2}`} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{r1}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{r2}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{eq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* All values calculated with R_total = (R1 × R2) ÷ (R1 + R2). Add more resistors in the tool above for larger groups.</p>
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
          Who Uses This Parallel Resistor Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Electronics Students", desc: "Verify homework and lab problems involving multiple resistors in parallel using the reciprocal formula." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Combine standard resistor values to hit non-standard targets or double a resistor's effective power rating." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Quickly check equivalent resistance during circuit analysis and design without manual reciprocal math." },
            { icon: "🎛️", title: "Audio Hobbyists", desc: "Calculate combined speaker impedance when wiring multiple drivers in parallel on a single amplifier channel." },
            { icon: "🔧", title: "Technicians", desc: "Spot wiring errors where components were unintentionally paralleled instead of run independently." },
            { icon: "🏭", title: "Hardware Designers", desc: "Verify bias and pull-up resistor networks where multiple resistors share the same two nodes." },
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
