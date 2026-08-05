export default function TransformerTurnsRatioCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a transformer turns ratio calculator?",
      a: "A transformer turns ratio calculator is a free online tool that computes the relationship between a transformer's primary and secondary windings — turns ratio, voltage ratio, and current ratio. Enter any combination of primary voltage, secondary voltage, primary turns, and secondary turns, and the calculator derives the remaining values, including calculating missing turns or voltages when only some are known.",
    },
    {
      q: "What is the transformer turns ratio formula?",
      a: "Turns Ratio = Np ÷ Ns = Vp ÷ Vs = Is ÷ Ip, where Np and Ns are primary and secondary turns, Vp and Vs are primary and secondary voltages, and Ip and Is are primary and secondary currents. For example, a transformer with 1,000 primary turns and 500 secondary turns has a turns ratio of 2:1, meaning it's a step-down transformer that halves voltage.",
    },
    {
      q: "How do I calculate secondary voltage from turns ratio?",
      a: "Vs = Vp ÷ (Np ÷ Ns). For a transformer with 1,150 primary turns, 60 secondary turns, and 230V primary voltage: turns ratio = 1,150 ÷ 60 = 19.17, so Vs = 230 ÷ 19.17 ≈ 12V — a typical AC adapter transformer stepping mains voltage down to a low-voltage output.",
    },
    {
      q: "Why does current increase when voltage decreases in a step-down transformer?",
      a: "Transformers conserve power (ignoring small losses), so Vp × Ip ≈ Vs × Is. If a step-down transformer halves voltage, it must roughly double current to keep power constant on both sides — this is the current ratio being the inverse of the voltage ratio (Is/Ip = Np/Ns).",
    },
    {
      q: "What is the difference between a step-up and step-down transformer?",
      a: "A step-down transformer has more primary turns than secondary turns (Np > Ns), producing a lower secondary voltage than primary voltage — common for household and industrial voltage reduction. A step-up transformer has fewer primary turns than secondary turns (Np < Ns), producing a higher secondary voltage — common in power transmission to reduce line losses over long distances.",
    },
    {
      q: "What is a 1:1 isolation transformer used for?",
      a: "A 1:1 turns ratio transformer produces the same voltage on both sides (Vp = Vs) but provides electrical isolation between the primary and secondary circuits — no direct electrical connection exists between them, only magnetic coupling. This is used for safety isolation, noise reduction, and ground loop elimination in sensitive electronic and medical equipment.",
    },
    {
      q: "How do I calculate turns ratio if I only know two voltages?",
      a: "Turns Ratio = Vp ÷ Vs directly, since voltage ratio equals turns ratio in an ideal transformer. A transformer converting 220V to 110V has a turns ratio of 220 ÷ 110 = 2:1, without needing to know the actual number of turns on either winding.",
    },
    {
      q: "Can I calculate the number of turns needed on one winding if I know the other winding's turns and both voltages?",
      a: "Yes. If you know primary turns (Np), primary voltage (Vp), and secondary voltage (Vs), calculate turns ratio = Vp ÷ Vs, then secondary turns Ns = Np ÷ turns ratio. This calculator handles this and several other combinations of known values automatically.",
    },
    {
      q: "How is turns ratio used in power distribution transformers?",
      a: "Utility distribution transformers step high transmission voltages (like 11kV) down to usable levels (like 415V or 230V) using a large turns ratio — an 11,000V to 415V transformer has a turns ratio of roughly 26.5:1. This calculator's distribution preset demonstrates this exact scenario.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your voltage and turns values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter known voltage values", "Input primary voltage, secondary voltage, or both, depending on what you know about the transformer."],
    ["Enter known turns values", "Input primary turns, secondary turns, or both, if known from a winding specification or nameplate."],
    ["Provide at least two known values", "The calculator needs either both voltages, both turns counts, or one voltage plus both turns counts to solve for the rest."],
    ["Read the turns, voltage, and current ratios", "View all three ratios expressed as both a decimal and an x:1 or 1:x format for easy interpretation."],
    ["Check any calculated missing values", "If you provided a mix of voltages and turns, see the calculator's derived values for whichever quantity you didn't already know."],
    ["Apply a preset or export results", "Use a built-in preset for common step-up, step-down, isolation, or distribution transformers, or export the full calculation as a text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Transformer Turns Ratio Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>transformer turns ratio calculator</strong> computes the relationship between a
            transformer's primary and secondary windings — turns ratio, voltage ratio, and current ratio.
            Enter any workable combination of primary voltage, secondary voltage, primary turns, and
            secondary turns, and the calculator derives the ratios along with any missing values you didn't
            already know.
          </p>
          <p>
            The core relationship, Np/Ns = Vp/Vs = Is/Ip, is simple in principle, but real-world problems
            rarely hand you all four quantities at once — you might know both voltages from a nameplate but
            need to figure out the number of turns you'd wind on a replacement bobbin, or know one voltage
            and both turns counts and need the other voltage. This tool handles five different combinations
            of known values automatically, so you don't need to manually rearrange the formula for whichever
            data you happen to have.
          </p>
          <p>
            Built for <strong>electrical engineers designing transformers, electronics hobbyists winding
            custom transformers, and students</strong> learning transformer theory. Includes six built-in
            presets from household step-down to industrial distribution transformers, full step-by-step
            derivation, and text export — free and entirely browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Transformer Turns Ratio Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Turns Ratio</span> = Np ÷ Ns = Vp ÷ Vs = Is ÷ Ip</p>
              <p className="text-gray-500 text-xs mt-2">Example: Np = 1,150, Ns = 60, Vp = 230V</p>
              <p className="text-gray-500 text-xs">Turns ratio = 19.17, Vs = 230 ÷ 19.17 = <span className="text-green-600 font-semibold">≈12V</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Np, Ns</strong> — number of turns on the primary and secondary windings</li>
            <li><strong>Vp, Vs</strong> — primary and secondary voltage; ratio equals turns ratio in an ideal transformer</li>
            <li><strong>Ip, Is</strong> — primary and secondary current; ratio is the inverse of voltage ratio (power is conserved)</li>
            <li><strong>Turns ratio &gt; 1</strong> — step-down (Vp &gt; Vs); <strong>turns ratio &lt; 1</strong> — step-up (Vp &lt; Vs)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Transformer Turns Ratio Calculator
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
                "Solves from five different combinations of known values",
                "Turns ratio, voltage ratio, and current ratio",
                "Ratios displayed as decimal and x:1 format",
                "Calculates missing voltages or turns automatically",
                "Full step-by-step derivation",
                "Six built-in presets (step-up, step-down, isolation, more)",
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
              title: "AC Adapter Transformer Design",
              scenario: "A hobbyist designing a 230V-to-12V AC adapter transformer with 1,150 primary turns needs to know how many secondary turns to wind. The calculator computes a turns ratio of 19.17 and returns secondary turns of 60, matching a typical small transformer bobbin winding count.",
            },
            {
              title: "Household Step-Down Transformer Verification",
              scenario: "An electrician verifying a 220V-to-110V step-down transformer with 1,000 primary and 500 secondary turns confirms a turns ratio of exactly 2:1, and a current ratio of 1:2 — meaning secondary current will be double primary current, information needed for downstream cable sizing.",
            },
            {
              title: "Isolation Transformer Confirmation",
              scenario: "A technician verifying a 230V isolation transformer with 1,000 turns on both windings confirms a 1:1 turns ratio, meaning voltage stays the same (230V in, 230V out) while providing electrical isolation — as expected for this type of safety transformer.",
            },
            {
              title: "Industrial Distribution Transformer Ratio Check",
              scenario: "A utility engineer verifying an 11kV-to-415V distribution transformer with 11,000 primary and 415 secondary turns confirms a turns ratio of approximately 26.5:1, matching the expected step-down ratio for stepping transmission voltage down to usable distribution levels.",
            },
            {
              title: "US Industrial Control Transformer Check",
              scenario: "An engineer verifying a 480V-to-120V control transformer with 480 primary and 120 secondary turns confirms a 4:1 turns ratio — standard for US industrial control circuits that step down from 480V mains to 120V for control panel components.",
            },
            {
              title: "Replacement Winding Calculation",
              scenario: "A repair technician rewinding a damaged transformer with a known secondary voltage of 12V and 60 secondary turns needs to know how many primary turns to wind for a 230V primary. Using the turns ratio derived from the original 230V/12V relationship (19.17), the calculator confirms 1,150 primary turns are needed.",
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
                "Use the voltage ratio shortcut (Vp ÷ Vs) when you only need turns ratio and don't care about the actual turn counts — this avoids needing to know or measure the physical windings at all.",
                "Remember that current ratio is the inverse of voltage ratio — a step-down transformer that halves voltage will roughly double current, which matters for downstream cable and fuse sizing on the secondary side.",
                "For replacement or repair winding calculations, use the original transformer's known voltage and turns relationship to derive the turns-per-volt figure, then apply that ratio to any new winding you need to calculate.",
                "Check the calculator's ratio display format — it shows both decimal (like 2.5) and x:1 notation (like 2.5:1), which is the conventional way transformer ratios are documented on nameplates and in datasheets.",
                "For isolation transformers, verify the turns ratio comes out to exactly 1:1 as a sanity check — any deviation suggests either a winding count error or that the transformer isn't a true isolation type.",
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
                "Confusing which side is primary and which is secondary. The primary winding connects to the power source; the secondary delivers output. Swapping them inverts every ratio in the calculation.",
                "Assuming current ratio equals voltage ratio rather than its inverse. A 2:1 step-down voltage ratio corresponds to a 1:2 current ratio (secondary current is double primary current), not another 2:1.",
                "Ignoring transformer losses when working with real (non-ideal) transformers. This calculator assumes an ideal transformer with 100% efficiency — real transformers have small losses that make actual secondary voltage and current slightly different from the calculated ideal values.",
                "Treating turns ratio as fixed for all load conditions. The ratio itself is a physical property of the winding and doesn't change, but secondary voltage can sag under heavy load due to winding resistance and leakage reactance, which this ideal-transformer calculation doesn't model.",
                "Mixing up which known values to enter when you have a partial data set. If you know one voltage and both turns counts, enter exactly those three fields — entering an incorrect fourth value (like guessing the other voltage) will produce an inconsistent result.",
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
          Common Transformer Turns Ratio Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Application</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Vp / Vs</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Turns Ratio</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Household step-down", "220V / 110V", "2:1", "Step-down"],
                ["Voltage doubler", "110V / 220V", "1:2", "Step-up"],
                ["Isolation transformer", "230V / 230V", "1:1", "Isolation"],
                ["AC power adapter", "230V / 12V", "19.17:1", "Step-down"],
                ["Industrial distribution", "11,000V / 415V", "26.51:1", "Step-down"],
                ["US control circuit", "480V / 120V", "4:1", "Step-down"],
              ].map(([app, v, ratio, type]) => (
                <tr key={app} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{app}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{v}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{ratio}</td>
                  <td className="py-2 px-3 text-gray-600 text-xs">{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Turns ratio = Vp ÷ Vs for an ideal transformer. Current ratio is the inverse of voltage ratio.</p>
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
          Who Uses This Transformer Turns Ratio Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Electrical Engineers", desc: "Design and verify transformer specifications for power distribution and control circuit applications." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Wind custom transformers for AC adapters and small power supplies, calculating exact turns needed." },
            { icon: "🔧", title: "Repair Technicians", desc: "Calculate replacement winding turns when rebuilding a damaged transformer to match original specifications." },
            { icon: "🎓", title: "Electrical Engineering Students", desc: "Learn the relationship between turns, voltage, and current ratios through worked transformer problems." },
            { icon: "🏭", title: "Utility Engineers", desc: "Verify distribution transformer turns ratios for stepping transmission voltage down to usable levels." },
            { icon: "🏗️", title: "Industrial Controls Engineers", desc: "Confirm control transformer specifications for stepping industrial voltage down to control circuit levels." },
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
