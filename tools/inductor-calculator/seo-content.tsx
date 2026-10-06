import { inductorCalculatorConfig } from "./config";
export default function InductorCalculatorSEO() {
  const faqItems = inductorCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = inductorCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Inductor Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>inductor calculator</strong> computes coil inductance from physical winding
            parameters, or calculates inductive reactance from a known inductance and frequency. It covers
            three common needs: solenoid inductance from turns, core area, length, and material; air-core
            coil inductance using the standard circular-cross-section approximation; and inductive reactance
            (XL) for any inductor at a given frequency.
          </p>
          <p>
            Inductance calculations are more geometry-dependent than resistance or capacitance — the same
            wire wound with more turns, a different core material, or a shorter coil length produces a
            different inductance entirely, and the turns term is squared, so small changes in winding count
            have an outsized effect. This tool handles the full formula for each scenario, including
            permeability selection for air, iron, or a custom core material, so you don't need to look up
            constants like μ₀ separately.
          </p>
          <p>
            Built for <strong>electronics hobbyists winding custom coils, RF and radio enthusiasts,
            electrical engineering students, and hardware designers</strong> sizing chokes and filter
            inductors. Supports three calculation modes, full unit prefix ranges, step-by-step derivation,
            and text export — free.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Inductance &amp; Reactance Formulas
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Solenoid</span>: L = (μ × N² × A) ÷ l</p>
              <p><span className="font-semibold">Air-core coil</span>: L ≈ (μ₀ × N² × π × r²) ÷ l</p>
              <p><span className="font-semibold">Inductive reactance</span>: XL = 2πfL</p>
              <p className="text-gray-500 text-xs mt-2">Example: 10µH inductor at 1MHz</p>
              <p className="text-gray-500 text-xs">XL = 2π × 1,000,000 × 0.00001 = <span className="text-green-600 font-semibold">62.8Ω</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>N (turns)</strong> — appears squared in the inductance formula; doubling turns quadruples inductance</li>
            <li><strong>μ (permeability)</strong> — μ₀ (air) ≈ 4π×10⁻⁷ H/m; iron and ferrite cores multiply this significantly</li>
            <li><strong>A / r</strong> — cross-sectional area (or radius, for circular coils) — larger area increases inductance</li>
            <li><strong>l</strong> — coil length — a longer winding for the same turns and area decreases inductance</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Inductor Calculator
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
                "Three modes: solenoid, air-core coil, inductive reactance",
                "Air, iron, and custom permeability core options",
                "Full unit prefix support: H/mH/µH/nH, Hz/kHz/MHz, m/cm/mm",
                "Complete step-by-step derivation for every result",
                "Automatic unit conversion display",
                "Calculation history",
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
              title: "RF Coil Winding for a Radio Project",
              scenario: "A hobbyist winding an air-core RF coil needs about 1.26µH for a resonant circuit. Using Air-Core mode with 100 turns, 1cm radius, and 10cm coil length, the calculator confirms L ≈ 1.24µH — close enough that they proceed with winding the coil as planned before fine-tuning with a variable capacitor.",
            },
            {
              title: "Choke Inductor Reactance at Switching Frequency",
              scenario: "A power supply designer wants to confirm a 100µH choke provides sufficient impedance at a 100kHz switching frequency. Using Reactance mode with L = 100µH and f = 100kHz, the calculator returns XL = 62.8Ω, which they compare against the ripple current requirement to confirm the choke is adequately sized.",
            },
            {
              title: "Iron-Core Transformer Winding Estimate",
              scenario: "An electronics student calculates the inductance of a 200-turn coil wound on an iron core (relative permeability ≈ 200) with a 2cm² cross-section and 15cm length. Using Solenoid mode with the iron preset, the calculator returns L ≈ 6.7mH — over 150 times higher than the same winding on an air core, illustrating the core material's effect.",
            },
            {
              title: "EMI Filter Inductor Selection",
              scenario: "An engineer needs an inductor with at least 500Ω of reactance at a 10MHz noise frequency for an EMI filter. Testing a 10µH inductor in Reactance mode at f = 10MHz, the calculator returns XL = 628Ω — comfortably above the 500Ω target, confirming the part is suitable before ordering.",
            },
            {
              title: "Custom Coil Turns Count Planning",
              scenario: "A hobbyist wants to know how many turns are needed to hit 10µH on a specific air-core form with 0.5cm radius and 5cm length. By testing turn counts of 50, 75, and 100 in Air-Core mode, they find 75 turns gives L ≈ 8.9µH and 85 turns gives L ≈ 11.4µH, letting them interpolate the exact turns count needed.",
            },
            {
              title: "Audio Crossover Inductor Verification",
              scenario: "An audio hobbyist building a passive speaker crossover measures an inductor's turns and core dimensions to verify its rated 2.5mH value before installing it. Using Solenoid mode with the measured parameters and an iron-core permeability estimate, the calculator returns a close match to the labeled rating, confirming the part hasn't been mislabeled.",
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
                "Since inductance scales with turns squared, adjusting turn count is the most powerful lever for hitting a target inductance — a 20% increase in turns gives roughly a 44% increase in inductance, not just 20%.",
                "For air-core coils, keep the coil noticeably longer than its diameter for the simplified formula to stay accurate — short, fat coils need a correction factor (like Wheeler's formula) that this basic approximation doesn't include.",
                "When comparing core materials, remember relative permeability multiplies inductance directly — a core with 10x the permeability of air gives roughly 10x the inductance for an identical winding, all else equal.",
                "Use Reactance mode to sanity-check whether an inductor is appropriately sized for a given frequency before ordering — if XL is much lower than expected at your operating frequency, the part may be undersized for the application.",
                "When reverse-engineering an unlabeled coil, measure its physical dimensions and turns count first, then use Solenoid mode with an estimated core permeability to get a ballpark inductance value before confirming with an LCR meter.",
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
                "Forgetting that turns are squared in the inductance formula. Doubling turns doesn't double inductance — it quadruples it, which is easy to miss if you're estimating changes mentally rather than recalculating.",
                "Using the air-core approximation for a short, fat coil and expecting an accurate result. The simplified formula overestimates inductance for coils where length is comparable to or shorter than the diameter, due to end-fringing effects it doesn't model.",
                "Mixing up radius and diameter when entering coil dimensions. The formula uses radius (r), not diameter — entering a diameter value where radius is expected overestimates inductance by a factor of four, since area scales with r².",
                "Assuming XL is the only opposition to current in a real inductor circuit. Real inductors also have winding resistance (DCR) and, at high frequencies, parasitic capacitance — XL alone describes the ideal reactive component only.",
                "Confusing this calculator's air-core and solenoid modes. Air-core mode assumes a circular cross-section defined by radius; solenoid mode accepts any cross-sectional area and lets you specify a non-air core material — pick the mode matching your actual coil geometry and core.",
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
          Inductive Reactance Reference (10µH Inductor)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Frequency</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Reactance (XL)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["60 Hz", "0.0038 Ω"],
                ["1 kHz", "0.063 Ω"],
                ["100 kHz", "6.28 Ω"],
                ["1 MHz", "62.8 Ω"],
                ["10 MHz", "628 Ω"],
                ["100 MHz", "6,283 Ω"],
              ].map(([freq, xl]) => (
                <tr key={freq} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{freq}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{xl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Calculated using XL = 2πfL for a fixed 10µH inductor. Reactance scales linearly with both frequency and inductance.</p>
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
          Who Uses This Inductor Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📻", title: "RF & Radio Hobbyists", desc: "Wind custom air-core coils for resonant circuits, antennas, and radio frequency filters with a predicted inductance." },
            { icon: "🎓", title: "Electronics Students", desc: "Learn and verify inductance and reactance formulas, including the effect of turns, core material, and frequency." },
            { icon: "⚡", title: "Power Electronics Engineers", desc: "Verify choke and filter inductor reactance at switching frequencies during power supply design." },
            { icon: "🔌", title: "Electronics Hobbyists", desc: "Estimate inductance for custom-wound coils and verify unlabeled or hand-wound inductors." },
            { icon: "🎛️", title: "Audio Hobbyists", desc: "Calculate crossover inductor values and verify labeled component values against measured winding dimensions." },
            { icon: "🛡️", title: "EMI/EMC Engineers", desc: "Confirm filter inductors provide sufficient reactance at target noise frequencies for compliance testing." },
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
