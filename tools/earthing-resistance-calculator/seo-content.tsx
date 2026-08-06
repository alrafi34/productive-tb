export default function EarthingResistanceCalculatorSEO() {
  const faqItems = [
    { q: "What is an earthing resistance calculator?", a: "An earthing resistance calculator is a tool that computes the resistance-to-ground of a driven rod electrode using soil resistivity, rod length, and rod diameter — or, for multiple rods, the combined resistance adjusted for spacing efficiency. It answers the core question every electrical installer and engineer needs before signing off a grounding system: will this earth electrode meet the target resistance, and how do I get there if it doesn't?" },
    { q: "How is single rod earthing resistance calculated?", a: "The calculator uses the standard vertical rod formula R = (ρ / 2πL) × [ln(4L/d) − 1], where ρ is soil resistivity in ohm-meters, L is rod length in meters, and d is rod diameter in meters. The tool computes 4L/d, takes its natural logarithm, subtracts 1, multiplies by ρ divided by 2πL, and shows every intermediate step so you can verify the math by hand." },
    { q: "How does the calculator handle multiple rods?", a: "For more than one rod, the calculator first computes the single-rod resistance, then divides by the number of rods and divides again by an efficiency factor between 0.4 and 1.0 that depends on the spacing-to-length ratio. Rods placed closer together interfere with each other's current dissipation field, so the combined resistance is always higher than a simple 1/n division would suggest." },
    { q: "What is a good earthing resistance value?", a: "Under 1Ω is excellent and typically reserved for data centers, telecommunications, and sensitive electronic equipment. 1–5Ω is good and meets most residential and commercial code requirements. 5–10Ω is acceptable but worth improving, and above 10Ω is considered poor and generally requires remediation — though acceptable thresholds vary by local electrical code and installation type." },
    { q: "What soil resistivity value should I use?", a: "Soil resistivity should ideally be measured on-site with a four-point Wenner method tester, since values vary enormously by soil type — from around 10 Ω·m for wet organic soil to over 10,000 Ω·m for solid rock. If a site test isn't available, use the calculator's built-in soil type reference as a starting estimate, but treat it as approximate since resistivity also shifts with moisture and temperature." },
    { q: "Why does rod length matter more than rod diameter?", a: "Because diameter appears only inside the logarithm term ln(4L/d) while length appears both inside the logarithm and as a direct divisor in ρ/(2πL), doubling rod length has a far larger effect on resistance than doubling diameter. This is why the calculator's improvement recommendations prioritize longer rods over thicker ones when resistance is too high." },
    { q: "What does the efficiency factor mean for multiple rods?", a: "The efficiency factor represents how much overlap exists between adjacent rods' current dissipation zones in the soil. When rods are spaced at least twice their length apart, the calculator returns an efficiency close to 1.0, meaning the rods work almost independently. Closer spacing drops the efficiency factor toward 0.4, meaning the rods partially compete for the same conductive soil volume." },
    { q: "Does this calculator work for plate or strip electrodes?", a: "No. This calculator is built specifically for vertical rod electrodes and applies the rod-specific formula R = (ρ / 2πL) × [ln(4L/d) − 1]. Plate and horizontal strip electrodes use different geometry-dependent formulas based on plate area or strip length and burial depth, and are not covered by this tool." },
    { q: "How can I lower a high earthing resistance reading?", a: "The calculator's built-in recommendation engine suggests, in order of typical effectiveness: increasing rod length to 3 meters or more, adding parallel rods spaced at least twice the rod length apart, and treating the soil around the electrode with salt, bentonite, or a chemical earthing compound. Rod diameter increases help only marginally due to the logarithmic relationship." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your soil resistivity, rod dimensions, and configuration inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter soil resistivity", "Type the soil resistivity value in ohm-meters, ideally from an on-site four-point Wenner test. If you don't have a measured value, use the built-in soil type reference (wet organic soil through rock) as an estimate."],
    ["Enter rod length and diameter", "Enter the vertical rod length in meters and its diameter in meters — common diameters are 0.016m (16mm) and 0.02m (20mm). Rod length has the largest effect on resistance, so this is the input to prioritize getting right."],
    ["Set the number of rods", "Enter 1 for a single rod calculation, or more than 1 to switch the calculator to the multiple-rod formula, which divides the single-rod resistance by the rod count and an efficiency factor."],
    ["Enter spacing for multiple rods", "If using more than one rod, enter the center-to-center spacing between rods. Spacing at least twice the rod length gives the best efficiency factor and the lowest combined resistance."],
    ["Read the resistance and status", "The calculator instantly returns the resistance in ohms along with a status label — excellent, good, acceptable, or poor — and shows every calculation step from 4L/d through the final result."],
    ["Apply recommendations if resistance is high", "If the result falls in the poor range, the calculator suggests specific improvements such as longer rods, additional parallel rods, or soil treatment, based on your current inputs."],
  ];

  return (
    <>
      {/* 1. Introduction */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Earthing Resistance Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>earthing resistance calculator</strong> is a free tool that computes the resistance-to-ground
            of a vertical earth rod electrode from soil resistivity, rod length, and rod diameter, and extends the
            calculation to multiple rods in parallel using a spacing-based efficiency factor. It answers the
            question every electrical installer faces before signing off a grounding system: <em>what resistance
            will this earth electrode actually achieve, and does it meet code?</em>
          </p>
          <p>
            Earthing (grounding) resistance determines how effectively fault current dissipates into the earth
            during a ground fault. Too high a resistance means fault current can't trip protective devices fast
            enough, leaving equipment energized and creating a shock hazard. Getting the electrode design right
            the first time — rather than discovering a failed resistance test after installation — saves
            re-excavation, additional rods, and inspection delays.
          </p>
          <p>
            This tool is built for <strong>licensed electricians installing grounding systems, electrical
            engineers designing earthing schemes for buildings and substations, solar and telecom installers
            grounding equipment enclosures, and students studying IEEE 80 or IEC 62305 earthing calculations</strong>.
            It shows the full calculation — 4L/d, the natural logarithm, and the final resistance — step by step,
            supports single and multiple-rod configurations, includes a soil resistivity reference table, and
            flags when your design needs improvement. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Earthing Resistance Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Single Rod</span> = (ρ ÷ 2πL) × [ln(4L/d) − 1]</p>
              <p><span className="font-semibold">Multiple Rods</span> = (R<sub>single</sub> ÷ n) × (1 ÷ η)</p>
              <p className="text-gray-500 text-xs mt-2">ρ = soil resistivity (Ω·m) · L = rod length (m) · d = rod diameter (m) · n = number of rods · η = efficiency factor (0.4–1.0)</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Soil resistivity (ρ):</strong> the single largest factor in resistance, ranging from 10 Ω·m in wet organic soil to over 10,000 Ω·m in solid rock</li>
            <li><strong>Rod length (L):</strong> appears both inside and outside the logarithm — doubling length roughly halves resistance, making it the most effective lever</li>
            <li><strong>Rod diameter (d):</strong> affects resistance only through the logarithmic term, so increasing diameter has a comparatively small effect</li>
            <li><strong>Efficiency factor (η):</strong> for multiple rods, this scales from 0.4 (closely spaced, high mutual interference) toward 1.0 (spacing ≥ 2× rod length, near-independent electrodes)</li>
            <li><strong>Status classification:</strong> the calculator labels results excellent (&lt;1Ω), good (1–5Ω), acceptable (5–10Ω), or poor (&gt;10Ω), and generates improvement recommendations automatically when resistance is high</li>
          </ul>
        </div>
      </section>

      {/* 3. Step-by-Step */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Earthing Resistance Calculator
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
                "Real-time calculation as you type",
                "Full step-by-step formula breakdown",
                "Single rod and multiple rod modes",
                "Automatic efficiency factor for rod spacing",
                "Built-in soil resistivity reference (8 soil types)",
                "Status classification: excellent to poor",
                "Automatic improvement recommendations",
                "Six preset configurations to start from",
                "Calculation history (last 20 entries)",
                "Export results as a text report",
                "100% browser-based — no data sent to a server",
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

      {/* 4. Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Residential Ground Rod in Dry Soil",
              scenario: "An electrician is installing a standard grounding rod for a home service panel in dry soil measured at 100 Ω·m, using a 2.5m rod with 16mm (0.016m) diameter. The calculator returns 4L/d = 625, ln(625) = 6.438, giving a resistance of 34.6Ω — well into the 'poor' status. Following the tool's recommendation, they add a second rod spaced 5 meters apart, dropping the combined resistance to roughly 12.4Ω.",
            },
            {
              title: "Telecom Equipment Shelter Grounding",
              scenario: "A telecom technician needs sub-1Ω grounding for a cell site equipment shelter and starts with moist soil at 50 Ω·m and a single 3m rod, 20mm diameter — yielding 14.3Ω, still too high for sensitive electronics. They switch to 6 rods spaced 6 meters apart in the 'Industrial Setup' preset, and the efficiency-adjusted result drops into the acceptable range, prompting further soil treatment to reach the sub-1Ω telecom target.",
            },
            {
              title: "Commercial Building Earthing Design",
              scenario: "An electrical engineer is designing the earthing system for a commercial building on clay soil (40 Ω·m). Using a 3m rod at 0.02m diameter, the single-rod resistance calculates to roughly 11.4Ω. They test 3 rods at 6m spacing per the calculator's 'Multiple Rods (Moist Soil)' preset and the combined resistance falls to approximately 4.5Ω, comfortably within the 5Ω target for commercial installations.",
            },
            {
              title: "Industrial Substation Grounding Grid",
              scenario: "A substation project needs low resistance across a large industrial site with soil resistivity of 80 Ω·m. Starting from the calculator's 'Industrial Setup' preset — 6 rods, 3m length, 6m spacing — the tool returns an efficiency factor near 0.85 due to the generous spacing, giving a combined resistance under 3Ω, which the engineer documents as the baseline before field verification testing.",
            },
            {
              title: "Rocky Terrain Remediation",
              scenario: "An installer working on rocky terrain (soil resistivity 3,000 Ω·m, gravel) enters a single 2.5m rod and gets a resistance above 500Ω — far into the poor range. The calculator's recommendations point toward chemical soil treatment and multiple rods; after modeling 4 rods at 5m spacing plus a bentonite backfill assumption, the team plans for supplemental chemical earthing compound to bring the site within code.",
            },
            {
              title: "Solar Inverter Ground Fault Protection",
              scenario: "A solar installer grounds a rooftop inverter pad in sandy clay soil (150 Ω·m) with a single 2.5m, 16mm rod. The calculator shows 4L/d = 625, resistance of 51.9Ω — status poor. They increase rod length to 3m per the tool's top recommendation, which alone reduces resistance by roughly 15%, and add a second rod to bring the final reading into the acceptable range before inspection.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Tips & Mistakes */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Prioritize rod length over rod diameter when resistance is too high. Because length appears both inside and outside the logarithm term while diameter only affects the logarithm, going from a 2.5m to a 3m rod cuts resistance far more than doubling the diameter from 16mm to 32mm ever would.",
                "Space multiple rods at least twice the rod length apart to get the calculator's best efficiency factor. Rods placed closer than this compete for the same conductive soil volume around each electrode, and the combined resistance ends up noticeably higher than a naive 1/n division would predict.",
                "Measure soil resistivity on-site with a four-point Wenner test rather than relying on generic soil-type tables whenever the installation is code-critical. Resistivity for the same soil type can vary several-fold depending on moisture content, compaction, and local mineral composition.",
                "Retest earthing resistance seasonally if the installation is in a climate with dry summers or freezing winters. Soil resistivity rises sharply when soil dries out or freezes, so a system that measured 3Ω in spring can measure significantly higher in a dry August — design with a safety margin below the code limit, not right at it.",
                "When a single rod can't reach your target, model multiple rods before assuming you need chemical treatment. Two or three properly spaced rods often achieve a lower resistance more reliably and with less long-term maintenance than soil additives, which can leach out over several years.",
                "Use copper-bonded steel rods rather than plain galvanized steel where budget allows. Better conductivity at the rod-to-soil interface and greater corrosion resistance mean the measured resistance stays closer to the calculated value over the system's service life.",
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
                "Don't use a generic soil resistivity table value for a code-critical installation without on-site verification. Table values are useful for early estimation, but actual resistivity at your specific site can differ by a factor of two or more depending on local moisture and composition — always confirm with field testing before finalizing a design.",
                "Don't space multiple rods too closely to save trenching effort. Rods placed less than their own length apart barely improve on a single rod's resistance because their current dissipation zones overlap heavily — the calculator's efficiency factor drops toward 0.4 in this case, largely canceling the benefit of adding more rods.",
                "Don't assume increasing rod diameter will meaningfully fix a high resistance reading. Because diameter only enters the formula inside a natural logarithm, even doubling or tripling it produces a small percentage change in resistance — length and additional rods are far more effective levers.",
                "Don't ignore seasonal variation when a resistance reading is borderline. A system measuring 9Ω in wet spring conditions may test above 15Ω in a dry summer, so design and test with margin below your target rather than treating a single favorable measurement as proof of long-term compliance.",
                "Don't apply this calculator's formula to plate or horizontal strip electrodes. The vertical rod formula assumes a specific current-dissipation geometry that doesn't hold for plates or buried strips — using it for those electrode types will give a materially wrong resistance estimate.",
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

      {/* 6. Reference Table */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Soil Resistivity &amp; Resistance Status Reference
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Typical Soil Resistivity by Type</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Soil Type</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Resistivity (Ω·m)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Conductivity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Wet Organic Soil", "10", "Excellent"],
                    ["Moist Soil", "50", "Good"],
                    ["Clay", "40", "Good when moist"],
                    ["Dry Soil", "100", "Moderate"],
                    ["Sandy Clay", "150", "Fair"],
                    ["Sand", "2,000", "Poor"],
                    ["Gravel", "3,000", "Very poor"],
                    ["Rock", "10,000+", "Extremely poor"],
                  ].map(([type, res, cond]) => (
                    <tr key={type} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{type}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{res}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{cond}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Typical ranges only. Always verify with on-site four-point Wenner testing for code-critical installations.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Resistance Status Thresholds</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Resistance</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["< 1 Ω", "Excellent", "Data centers, telecom, sensitive electronics"],
                    ["1 – 5 Ω", "Good", "Most residential and commercial installations"],
                    ["5 – 10 Ω", "Acceptable", "Meets minimum code, improvement recommended"],
                    ["> 10 Ω", "Poor", "Requires improvement before approval"],
                  ].map(([range, status, use]) => (
                    <tr key={range} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{range}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{status}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Local electrical codes may specify different maximum values — always confirm the applicable requirement for your jurisdiction.</p>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
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

      {/* 8. Who Uses This */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Earthing Resistance Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Licensed Electricians", desc: "Verify ground rod designs meet target resistance before installation and document calculations for inspection sign-off." },
            { icon: "🏗️", title: "Electrical Engineers", desc: "Design earthing schemes for buildings, substations, and industrial sites, modeling rod count and spacing before specifying materials." },
            { icon: "📡", title: "Telecom & Solar Installers", desc: "Ground equipment shelters, cell sites, and inverter pads where sub-1Ω resistance is often required for sensitive electronics." },
            { icon: "🎓", title: "Electrical Engineering Students", desc: "Work through IEEE 80 and IEC 62305 earthing exercises, verify textbook examples, and build intuition for how soil and geometry affect resistance." },
            { icon: "🔧", title: "Maintenance Technicians", desc: "Evaluate whether an aging grounding system still meets target resistance and plan remediation such as additional rods or soil treatment." },
            { icon: "🏭", title: "Industrial Safety Engineers", desc: "Model grounding grids for substations and industrial facilities where fault current magnitude makes low earthing resistance a safety-critical requirement." },
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
