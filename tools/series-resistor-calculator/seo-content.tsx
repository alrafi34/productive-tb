export default function SeriesResistorCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a series resistor calculator?",
      a: "A series resistor calculator is a free online tool that adds together any number of resistors connected end-to-end in a single loop to find the total resistance. Enter each resistor's value in ohms, kilohms, or megohms, and the calculator sums them and displays the total in all three unit scales.",
    },
    {
      q: "What is the formula for resistors in series?",
      a: "R_total = R1 + R2 + R3 + ... + Rn. Resistance simply adds when resistors are connected in a single chain with no branching, because the same current flows through each one and each contributes its full resistance to opposing that current. For example, three resistors of 100Ω, 220Ω, and 330Ω in series give a total of 100 + 220 + 330 = 650Ω.",
    },
    {
      q: "Why does resistance add in series but not in parallel?",
      a: "In a series circuit, the same current must pass through every resistor in the chain, so each one's resistance adds directly to the total opposition to that current. In a parallel circuit, current can take multiple paths simultaneously, so more resistors in parallel create more paths and lower the total resistance instead of raising it — the two configurations use entirely different formulas.",
    },
    {
      q: "How do I combine resistors to get a value not available off the shelf?",
      a: "Add two or more standard E12 or E24 series resistors in series until their sum is close to your target. For example, if you need 150Ω exactly and don't have one in stock, a 100Ω and a 47Ω resistor in series give 147Ω, close enough for most non-critical applications.",
    },
    {
      q: "Does the order of resistors in a series chain matter?",
      a: "No. Addition is commutative, so R1 + R2 + R3 gives the same total regardless of which physical position each resistor occupies in the chain. Order can matter for other reasons in a real circuit, such as heat distribution or where a voltage-divider tap point is needed, but it never changes the total resistance value.",
    },
    {
      q: "How do I calculate voltage drop across each resistor in a series chain?",
      a: "Since the same current flows through every resistor in series, use Ohm's Law (V = I × R) for each one individually once you know the total current. First find total current as I = V_source ÷ R_total, then multiply that current by each individual resistor's value to get its share of the voltage drop.",
    },
    {
      q: "What happens if one resistor fails open in a series circuit?",
      a: "If any single resistor in a series chain fails open (goes to infinite resistance), the entire circuit is broken and no current flows through any part of the chain — this is the same principle behind why old-style series-wired string lights go completely dark when one bulb burns out.",
    },
    {
      q: "Can I add resistors with different tolerances together?",
      a: "Yes, but the combined tolerance is a weighted average based on each resistor's contribution to the total, not simply the tolerance of the largest resistor. For close estimates, a 100Ω ±5% resistor in series with a 1kΩ ±1% resistor produces a combined tolerance dominated by the 1kΩ resistor's contribution, since it makes up most of the total resistance.",
    },
    {
      q: "How many resistors can I add with this calculator?",
      a: "There's no fixed limit — add resistors one at a time or paste a bulk list of comma- or newline-separated values to calculate the total for a large chain at once. The calculator sums however many valid, nonzero values you provide.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your resistor values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Add your first resistor", "Enter a resistance value and select its unit — Ω, kΩ, or MΩ. Add as many resistors as your series chain contains."],
    ["Use bulk input for long chains (optional)", "Paste a comma- or newline-separated list of values to add many resistors at once instead of entering them one by one."],
    ["Select common E12 values (optional)", "Pick from the built-in list of standard resistor values (10Ω through 1MΩ) if you're working with off-the-shelf components."],
    ["Read the total resistance", "The result updates instantly, showing the sum of all entered resistors in your chosen output unit."],
    ["Check the unit conversions", "View the same total automatically converted across Ω, kΩ, and MΩ so you can read it in whichever scale is most convenient."],
    ["Save or export the result", "Save the calculation to history, or export the full list of resistors and total as a text file for documentation."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Series Resistor Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>series resistor calculator</strong> adds together any number of resistors connected
            end-to-end in a single chain to find the total resistance. Enter each resistor's value in ohms,
            kilohms, or megohms, and the calculator sums them instantly and displays the total across all
            three unit scales.
          </p>
          <p>
            The math is straightforward addition, but real circuits rarely use a tidy two or three resistors
            — a chain of a dozen mismatched values in mixed units (some in Ω, some in kΩ) is where manual
            addition becomes tedious and error-prone. This tool converts everything to a common base unit
            before summing, so mixed-unit chains never produce a wrong total, and a bulk-paste option handles
            long lists in one step.
          </p>
          <p>
            Built for <strong>electronics students verifying homework, hobbyists building circuits with
            standard E12 resistor values, and electricians and technicians</strong> who need a fast total
            resistance figure without reaching for a calculator app and doing unit conversion by hand.
            Supports unlimited resistors, bulk input, common value presets, and text export — free and
            entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Series Resistance Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">R_total</span> = R1 + R2 + R3 + ... + Rn</p>
              <p className="text-gray-500 text-xs mt-2">Example: 100Ω + 220Ω + 330Ω</p>
              <p className="text-gray-500 text-xs">R_total = <span className="text-green-600 font-semibold">650Ω</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Series connection</strong> — resistors joined end-to-end in a single loop, sharing the same current</li>
            <li><strong>Total resistance always increases</strong> — adding any resistor to a series chain raises R_total</li>
            <li><strong>Order-independent</strong> — the sum is the same regardless of the physical arrangement of resistors in the chain</li>
            <li>This calculator handles the series case only — for resistors in parallel, use the parallel resistor calculator instead (see related tools)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Series Resistor Calculator
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
                "Unlimited resistors per chain",
                "Bulk input via comma or newline-separated list",
                "Built-in E12 standard resistor value presets",
                "Automatic Ω, kΩ, MΩ unit conversion",
                "Calculation history (saved locally)",
                "Export result as a text file",
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
              title: "Building a Non-Standard Resistance Value",
              scenario: "A hobbyist needs exactly 150Ω but only has E12 series resistors on hand. Entering 100Ω and 47Ω into the calculator returns a total of 147Ω — close enough for their LED current-limiting application, avoiding a special order for a single non-standard part.",
            },
            {
              title: "LED Series Resistor Combination Check",
              scenario: "An electronics student is adding a series resistor to protect an LED but wants to confirm the combined resistance of an existing 220Ω resistor plus a new 100Ω resistor they're adding. The calculator returns 320Ω total, which they use with Ohm's Law to verify the LED's current stays within its rated 20mA limit at 12V.",
            },
            {
              title: "Homework Verification for a Series Circuit",
              scenario: "A student solving a textbook problem with five resistors (220Ω, 470Ω, 1kΩ, 2.2kΩ, 4.7kΩ) in series enters all five values into the calculator, which returns 8.39kΩ — matching their hand-calculated answer and confirming they added the mixed units correctly.",
            },
            {
              title: "Potentiometer Wiper Range Extension",
              scenario: "A circuit designer wants to limit a 10kΩ potentiometer's minimum resistance to avoid a dead short at one extreme. Adding a fixed 470Ω resistor in series with the pot, the calculator confirms the total resistance range becomes 470Ω to 10.47kΩ instead of 0Ω to 10kΩ.",
            },
            {
              title: "Bulk Resistor Bank Verification",
              scenario: "A technician testing a resistor bank pastes 12 measured values (from a multimeter) into the bulk input field — ranging from 98Ω to 105Ω — and the calculator returns a total of 1.224kΩ, which they compare against the bank's rated 1.2kΩ ±5% total to confirm it's within tolerance.",
            },
            {
              title: "Speaker Crossover Resistor Chain",
              scenario: "An audio hobbyist building a passive speaker attenuator combines a 10Ω and a 3.3Ω resistor in series ahead of a tweeter. The calculator confirms the total series resistance of 13.3Ω, which they use alongside the tweeter's impedance to calculate the expected attenuation in dB.",
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
                "Use the bulk input option when working from a spreadsheet or multimeter log of measured values — pasting a comma- or newline-separated list is far faster than adding rows one at a time.",
                "When you need a specific non-standard resistance, try combining two E12 values first before ordering a custom part. Many odd target values can be hit within a few percent using two off-the-shelf resistors in series.",
                "Remember that combined tolerance is dominated by whichever resistor contributes the largest share of the total resistance — pairing a tight-tolerance resistor with a much larger loose-tolerance one doesn't meaningfully tighten the overall result.",
                "Add a small series resistor in front of a potentiometer if you need to guarantee a non-zero minimum resistance at one end of its travel — this calculator confirms the new floor and ceiling of the adjustable range.",
                "Export the calculation to text whenever you're documenting a build, so the exact resistor values and total are on record if you need to replicate or troubleshoot the circuit later.",
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
                "Applying the series formula to resistors that are actually wired in parallel. Series resistance always adds and increases the total; parallel resistance uses a reciprocal formula and always decreases the total — mixing these up gives a wildly wrong answer.",
                "Entering a value in the wrong unit column, such as typing \"470\" intending kΩ but leaving the unit set to Ω. This produces a total that's off by a factor of 1,000 and is easy to miss if you don't check the unit dropdown for each entry.",
                "Forgetting that one failed-open resistor breaks the entire series chain. If a circuit built from this calculator's total suddenly reads infinite resistance or has no current flow, check each individual resistor rather than assuming a design error.",
                "Assuming combined tolerance is simply the tolerance of the tightest resistor in the chain. The combined percentage tolerance is weighted by each resistor's share of the total resistance, not just the label on the most precise part.",
                "Ignoring power rating when combining resistors for a high-current application. Adding resistance in series does spread out the power dissipation, but each individual resistor still needs to handle its own share of I²R heating.",
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
          Common E12 Resistor Value Combinations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Target</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Combination</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Actual Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["150Ω", "100Ω + 47Ω", "147Ω"],
                ["1kΩ", "470Ω + 470Ω + 47Ω", "987Ω"],
                ["2kΩ", "1kΩ + 1kΩ", "2kΩ"],
                ["3.3kΩ", "2.2kΩ + 1kΩ + 100Ω", "3.3kΩ"],
                ["10kΩ", "4.7kΩ + 4.7kΩ + 470Ω + 100Ω", "9.97kΩ"],
                ["100kΩ", "47kΩ + 47kΩ + 4.7kΩ + 1kΩ", "99.7kΩ"],
              ].map(([target, combo, total]) => (
                <tr key={target} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{target}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{combo}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Combinations use standard E12 series values. Actual measured resistance will vary within each resistor's tolerance band.</p>
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
          Who Uses This Series Resistor Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Electronics Students", desc: "Verify homework and lab problems involving multiple resistors in series without manual unit conversion errors." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Combine standard E12 resistor values to hit a non-standard target resistance without ordering a custom part." },
            { icon: "🔧", title: "Technicians", desc: "Verify measured resistor bank totals against rated specifications during testing and quality checks." },
            { icon: "⚡", title: "Electrical Engineers", desc: "Quickly total resistor chains during circuit design and prototyping without switching to a separate calculator." },
            { icon: "🎛️", title: "Audio Hobbyists", desc: "Calculate series resistance for passive attenuators, crossovers, and speaker impedance matching networks." },
            { icon: "🏭", title: "Quality Control Teams", desc: "Bulk-check resistor bank measurements against design tolerance using the multi-value input option." },
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
