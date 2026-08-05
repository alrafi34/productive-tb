export default function ElectricBillCalculatorSEO() {
  const faqItems = [
    {
      q: "What is an electric bill calculator?",
      a: "An electric bill calculator is a free online tool that estimates your total electricity cost from your kWh usage, billing type, and applicable charges. It supports both flat-rate billing, where every unit costs the same, and tiered (slab) billing, where different consumption ranges are charged at different rates, plus service charges, meter charges, and tax.",
    },
    {
      q: "How is an electricity bill calculated?",
      a: "For flat-rate billing: Total = (Units × Rate) + Service Charge + Meter Charge + Tax. For tiered billing, each consumption band is charged at its own rate and the per-band costs are summed before adding fixed charges and tax. For example, 200 kWh at a flat $0.12/kWh rate costs 200 × 0.12 = $24.00 before fixed charges and tax.",
    },
    {
      q: "What is the difference between flat rate and tiered (slab) billing?",
      a: "Flat-rate billing charges the same rate per kWh regardless of how much you use. Tiered billing splits usage into bands — for example the first 100 kWh at one rate, the next 100–300 kWh at a higher rate, and anything above that at a higher rate still — so heavier consumption is charged progressively more per unit. Most residential utilities in South Asia use tiered billing; many US utilities use flat or two-tier billing.",
    },
    {
      q: "How do I find my electricity consumption in kWh?",
      a: "Check your electricity bill for the \"Units Consumed\" or \"kWh Used\" figure for the billing period. You can also read your meter at the start and end of a period and subtract the two readings, or use this site's energy consumption calculator to estimate usage from your appliances directly.",
    },
    {
      q: "What is the difference between kW and kWh?",
      a: "kW (kilowatt) measures power — the rate at which electricity is used at any given moment. kWh (kilowatt-hour) measures energy — power used over time — and is what your bill is actually based on. A 1,000W (1kW) appliance running for one hour uses 1 kWh regardless of how the power varies during that hour.",
    },
    {
      q: "Why do utilities use tiered billing instead of a flat rate?",
      a: "Tiered billing is designed to keep electricity affordable for low-usage households while discouraging excessive consumption at the margin. The first band typically covers baseline needs at the lowest rate, and each additional band raises the marginal cost — so conservation is rewarded and heavy users subsidize the lower tiers to some degree.",
    },
    {
      q: "What are service charges and meter charges?",
      a: "A service charge is a fixed monthly fee that covers grid maintenance and account administration, charged regardless of how much electricity you use. A meter charge covers the cost of reading and maintaining your meter. Both are added on top of your energy consumption cost, before tax is applied to the subtotal.",
    },
    {
      q: "Can I use this calculator for commercial or industrial billing?",
      a: "Yes. Enter your commercial or industrial tariff's flat rate, or set up the slab structure and rates from your utility's commercial tariff schedule. Commercial rates are often structured differently from residential tariffs and may include demand charges that this calculator does not model separately.",
    },
    {
      q: "How accurate is this calculator compared to my actual bill?",
      a: "This calculator applies the exact rates, charges, and tax percentage you enter, so it will match your utility's math closely for the inputs given. Small differences can appear from rounding conventions, additional regulatory fees, or mid-cycle rate changes that your utility applies but that aren't part of the input fields here.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your usage figures, rate structure, and any saved history are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter your consumption", "Input your electricity usage in kWh for the billing period, found on a past bill or from your meter reading difference."],
    ["Select a billing type", "Choose Flat Rate if your utility charges one price per unit, or Tiered (Slab) if it charges different rates across consumption bands."],
    ["Set your rates", "For flat rate, enter the price per kWh. For tiered, enter the minimum and maximum kWh and rate for each band, or start from a built-in preset."],
    ["Add fixed charges and tax", "Enter your service charge, meter charge, and tax percentage so the subtotal and final total match your actual bill structure."],
    ["Review the breakdown", "The results panel shows cost per tier (if tiered), the subtotal, tax amount, and final total bill in your selected currency."],
    ["Save or export the calculation", "Save the result to history for comparison across months, or export the full breakdown as a CSV or text file."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Electric Bill Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>electric bill calculator</strong> estimates your total electricity cost from your
            kWh usage, billing structure, and applicable charges. It supports both flat-rate billing, where
            every unit costs the same, and tiered (slab) billing, where different consumption bands are
            charged at different rates — plus service charges, meter charges, and tax on top.
          </p>
          <p>
            The math behind a flat-rate bill is simple multiplication, but tiered billing requires splitting
            your total usage across multiple bands, calculating each band's cost separately, then summing
            them before fixed charges and tax are applied — a calculation that's easy to get wrong by hand,
            especially with six or more bands like Bangladesh's residential tariff structure. This tool
            handles the band-splitting automatically and shows the cost contributed by each tier.
          </p>
          <p>
            Built for <strong>homeowners checking their bill against the posted tariff, tenants estimating
            costs before signing a lease, and small businesses modeling commercial tariffs</strong>. Supports
            five currencies (BDT, USD, EUR, GBP, INR), built-in tariff presets for Bangladesh, India, the
            USA, and the UK, CSV and text export, and calculation history — free and browser-based.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Flat Rate vs. Tiered Billing Formulas
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Flat rate total</span> = (Units × Rate) + Service Charge + Meter Charge + Tax</p>
              <p><span className="font-semibold">Tiered subtotal</span> = Σ (units in each band × that band's rate)</p>
              <p><span className="font-semibold">Tax</span> = Subtotal × Tax % ÷ 100</p>
              <p className="text-gray-500 text-xs mt-2">Example: 200 kWh flat at $0.12/kWh</p>
              <p className="text-gray-500 text-xs">200 × 0.12 = <span className="text-green-600 font-semibold">$24.00</span> before fixed charges and tax</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Flat rate</strong> — one price per kWh applies to all units consumed</li>
            <li><strong>Tiered (slab) rate</strong> — usage is split into bands (e.g. 0-100, 101-300, 301+), each charged at its own rate</li>
            <li><strong>Service charge / meter charge</strong> — fixed monthly fees added regardless of usage</li>
            <li><strong>Tax</strong> — applied as a percentage of the subtotal (energy cost + fixed charges)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Electric Bill Calculator
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
                "Flat rate and tiered (slab) billing support",
                "Multi-currency: BDT, USD, EUR, GBP, INR",
                "Built-in presets for Bangladesh, India, USA, and UK tariffs",
                "Per-band cost breakdown for tiered billing",
                "Service charge, meter charge, and tax fields",
                "Calculation history (saved locally)",
                "CSV export for spreadsheets",
                "Text export for records",
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
              title: "Bangladesh Residential Tariff Check",
              scenario: "A homeowner in Dhaka used 450 kWh this month and wants to verify their bill against the posted tariff. Using the Bangladesh preset (6 slabs from 4.00 to 11.00 BDT/unit), the calculator splits 450 units across the bands — 75 @ 4.00, 125 @ 5.30, 100 @ 5.80, 100 @ 6.00, and 50 @ 9.50 — returning a subtotal of 2,437.50 BDT before service charge and tax.",
            },
            {
              title: "USA Flat Rate Verification",
              scenario: "A renter in a US state with flat billing used 620 kWh and was billed $86.80. Entering 620 units at $0.12/kWh plus a $9.50 service charge, the calculator returns $74.40 + $9.50 = $83.90 before tax — close enough to confirm the bill is correct once local tax and fees are added.",
            },
            {
              title: "India Tiered Tariff Comparison",
              scenario: "A household in India is deciding whether reducing usage from 520 kWh to 490 kWh crosses a tariff threshold. At 520 kWh, 20 units fall into the 501+ INR 7.00/unit band. At 490 kWh, no units reach that band, and the last 290 units are billed at INR 6.00/unit instead of 7.00 — the calculator shows a saving of roughly INR 200 beyond the raw reduction in units.",
            },
            {
              title: "UK Flat Rate Winter Estimate",
              scenario: "A UK tenant estimates a winter month's bill using higher heating usage of 380 kWh at the UK preset rate of £0.28/kWh. The calculator returns 380 × 0.28 = £106.40 in energy cost, prompting them to budget an extra £106 above their summer average for the season.",
            },
            {
              title: "Small Business Commercial Tariff",
              scenario: "A small retail shop uses 1,200 kWh/month under a commercial flat rate of $0.18/kWh with a $25 service charge and 8% tax. The calculator returns energy cost of $216, plus $25 service charge = $241 subtotal, plus 8% tax ($19.28) for a total bill of $260.28 — used to compare against a competing utility's commercial quote.",
            },
            {
              title: "Year-over-Year Bill Comparison",
              scenario: "A homeowner saves a calculation each month to history at 350 kWh and a flat $0.13/kWh rate, then compares it a year later when usage has grown to 410 kWh at $0.15/kWh. The calculator shows the cost rose from $45.50 to $61.50 — a $16/month increase split roughly evenly between higher usage and the higher rate.",
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
                "Start from a built-in preset if your tariff matches Bangladesh, India, USA, or UK residential structures, then adjust individual slab rates if your local utility has since updated them — it's faster than building the band structure from scratch.",
                "If you're near a tiered billing threshold, calculate both your current usage and a slightly reduced figure. Crossing below a band boundary can save more than the raw kWh reduction suggests, since it also lowers the rate on units within that band.",
                "Enter service charge and meter charge as separate fields even if your bill lists them together — it keeps the breakdown transparent and makes it easier to spot when a utility raises a fixed fee independent of your usage.",
                "Save a calculation to history every billing cycle if you're tracking usage trends. Comparing month over month makes it easy to see how much of a bill increase came from higher consumption versus a rate change.",
                "Use tiered mode even for a nominally flat-rate tariff that has a single \"lifeline\" discount for the first block of units — model it as a two-band tiered structure rather than forcing it into the flat-rate field.",
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
                "Applying the top slab's rate to all units instead of only the units within that band. Tiered billing charges each band at its own rate — a 450 kWh bill isn't 450 × the highest rate, it's the sum of each band's units at that band's own rate.",
                "Forgetting to include tax in the comparison when checking this calculator against your actual bill. The subtotal (energy cost + fixed charges) is taxed as a whole, so compare the final total, not the subtotal, to your bill.",
                "Overlapping or leaving gaps between slab ranges when building a custom tiered structure. Each band's minimum should be exactly one unit above the previous band's maximum, or units will be double-counted or skipped entirely.",
                "Using an outdated preset rate. Utility tariffs change periodically — treat the built-in presets as a starting structure and verify the current rates against your utility's published tariff schedule before relying on the result.",
                "Mixing currencies between the rate you enter and the currency selector. If your slab rates are in local currency but the selector is left on a different currency, the total will display with the wrong currency label even though the math is otherwise correct.",
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
          Common Tariff Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Tariff</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Structure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Bangladesh residential", "Tiered", "0-75 @ 4.00, 76-200 @ 5.30, 201-300 @ 5.80, 301-400 @ 6.00, 401-600 @ 9.50, 601+ @ 11.00 BDT"],
                ["India residential (typical)", "Tiered", "0-100 @ 3.00, 101-200 @ 4.50, 201-500 @ 6.00, 501+ @ 7.00 INR"],
                ["USA residential (typical)", "Flat", "$0.12-$0.15 per kWh, varies by state"],
                ["UK residential (typical)", "Flat", "£0.24-£0.30 per kWh, varies by supplier"],
              ].map(([name, type, structure]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{name}</td>
                  <td className="py-2 px-3 text-gray-700 text-xs">{type}</td>
                  <td className="py-2 px-3 font-mono text-gray-600 text-xs">{structure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Rates shown are illustrative averages — always confirm current rates against your utility's published tariff schedule.</p>
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
          Who Uses This Electric Bill Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏠", title: "Homeowners", desc: "Verify a monthly bill against the posted tariff structure and spot billing errors before paying." },
            { icon: "🏢", title: "Tenants & Renters", desc: "Estimate electricity costs before signing a lease in an unfamiliar tariff region or currency." },
            { icon: "🏪", title: "Small Business Owners", desc: "Model commercial flat or tiered tariffs to compare utility quotes and budget monthly overhead." },
            { icon: "🌏", title: "Expats & Relocating Families", desc: "Convert an unfamiliar tiered tariff structure (like Bangladesh or India's slab system) into an estimated monthly cost." },
            { icon: "📊", title: "Energy Auditors", desc: "Model the cost impact of usage changes across different tariff bands to justify efficiency recommendations." },
            { icon: "🎓", title: "Students", desc: "Learn how tiered utility pricing works and practice slab-based cost calculations for coursework." },
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
