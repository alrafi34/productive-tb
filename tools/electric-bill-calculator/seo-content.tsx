import { electricBillCalculatorConfig } from "./config";

export default function ElectricBillCalculatorSEO() {
  // Same questions as the FAQPage schema, so the page and the markup agree
  const faqItems = electricBillCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = electricBillCalculatorConfig.seo.howToSteps.map(
    ({ name, text }) => [name, text]
  );

  // Monthly use = watts × hours a day × 30 days ÷ 1,000; cost at $0.18/kWh
  const applianceCosts: [string, string, string, string, string][] = [
    ["LED bulb", "10 W", "5 h", "1.5 kWh", "$0.27"],
    ["Ceiling fan", "75 W", "8 h", "18 kWh", "$3.24"],
    ["Refrigerator (average draw)", "60 W", "24 h", "43.2 kWh", "$7.78"],
    ["Television", "100 W", "4 h", "12 kWh", "$2.16"],
    ["Laptop", "60 W", "6 h", "10.8 kWh", "$1.94"],
    ["Desktop PC", "250 W", "4 h", "30 kWh", "$5.40"],
    ["Washing machine", "500 W", "1 h", "15 kWh", "$2.70"],
    ["Microwave", "1,100 W", "18 min", "9.9 kWh", "$1.78"],
    ["Window / portable AC", "1,500 W", "6 h", "270 kWh", "$48.60"],
    ["Space heater", "1,500 W", "4 h", "180 kWh", "$32.40"],
    ["Clothes dryer", "3,000 W", "1 h", "90 kWh", "$16.20"],
    ["Water heater (tank)", "4,500 W", "3 h", "405 kWh", "$72.90"],
    ["EV charger (Level 2)", "7,200 W", "1 h", "216 kWh", "$38.88"],
  ];

  const priceReference: [string, string, string][] = [
    ["United States – average home", "≈ 18¢ per kWh", "EIA, 2026"],
    ["United States – range by state", "≈ 13¢ (Nevada) to 50¢+ (Hawaii)", "2026 state averages"],
    ["United Kingdom – price cap", "26.32p per kWh + 54.83p per day", "Ofgem, Oct–Dec 2026"],
    ["European Union – household average", "≈ €0.29 per kWh, taxes included", "Eurostat, 2nd half 2025"],
    ["Germany", "≈ €0.39 per kWh", "Eurostat, 2nd half 2025"],
    ["Ireland", "≈ €0.40 per kWh", "Eurostat, 2nd half 2025"],
    ["Hungary", "≈ €0.11 per kWh", "Eurostat, 2nd half 2025"],
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
            An <strong>electric bill calculator</strong> turns the electricity you use into money. Give it
            your usage in kilowatt-hours (kWh) and the price you pay per kWh, add any fixed charges and tax,
            and it returns the bill, line by line.
          </p>
          <p>
            You don&apos;t need a past bill to start. If you only know your appliances, switch to{" "}
            <strong>Estimate from watts</strong>: enter each device&apos;s wattage and how many hours a day it
            runs, and the calculator works out the kWh for the billing period and prices it at your rate.
            That makes it just as useful for budgeting a new home, checking what a space heater or an EV
            charger will add, or comparing a supplier&apos;s offer.
          </p>
          <p>
            It works anywhere. The calculator opens in your local currency (US dollar, euro, pound, Canadian
            or Australian dollar and more), handles flat and tiered (block) pricing, and includes presets for
            the U.S. average, the UK price cap and the EU average. Every number stays editable, so you can
            match your own utility&apos;s tariff exactly.
          </p>
        </div>
      </section>

      {/* ── 2. Formulas ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Calculate Your Electric Bill
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Every electricity bill comes down to three steps: find the energy used, price it, then add the fixed parts.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Energy (kWh)</span> = watts × hours per day × days ÷ 1,000</p>
              <p><span className="font-semibold">Energy cost</span> = kWh × price per kWh</p>
              <p><span className="font-semibold">Bill</span> = energy cost + fixed charges + tax</p>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Worked examples</h3>
          <ul className="space-y-2 ml-4 list-disc">
            <li>
              <strong>From a meter reading (U.S.):</strong> 900 kWh × $0.18 = <strong>$162.00</strong> of energy.
              Add your utility&apos;s monthly customer charge and any local tax to get the full bill.
            </li>
            <li>
              <strong>From an appliance&apos;s watts:</strong> a 1,500 W space heater used 4 hours a day for
              30 days uses 1,500 × 4 × 30 ÷ 1,000 = 180 kWh, which costs 180 × $0.18 = <strong>$32.40</strong>.
            </li>
            <li>
              <strong>With a standing charge (UK):</strong> 270 kWh × £0.2632 = £71.06, plus 30 days × 54.83p =
              £16.45, gives a bill of <strong>£87.51</strong>.
            </li>
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
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Calculator Does</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Bill from kWh, or kWh estimated from appliance watts",
                "Your own price per kWh, in your local currency",
                "Flat and tiered (block) pricing",
                "Standing, service and meter charges",
                "Tax as a percentage of the bill",
                "Presets: U.S. average, UK price cap, EU average and more",
                "Line-by-line cost breakdown",
                "History saved in your browser",
                "CSV and text export",
                "Free, no sign-up, nothing sent to a server",
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

      {/* ── 4. Appliance costs ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Much Electricity Do Appliances Use?
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Typical monthly use and cost over 30 days at the U.S. average of $0.18 per kWh. Wattage is on the
          appliance&apos;s label or manual; your own hours and rate will differ, so enter them in{" "}
          <strong>Estimate from watts</strong> above.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Appliance</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Power</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Use per day</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">kWh per month</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Cost per month</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applianceCosts.map(([name, watts, hours, kwh, cost]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{name}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-600 text-xs">{watts}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-600 text-xs">{hours}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-600 text-xs">{kwh}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-900 text-xs font-semibold">{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          * A refrigerator is rated at 100–200 W, but its compressor cycles on and off, so about 60 W on average
          is closer to real use.
        </p>
      </section>

      {/* ── 5. Price reference ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Average Electricity Prices per kWh
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Use the rate on your own bill whenever you can. If you don&apos;t have one, these published averages
          are a reasonable starting point.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Region</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Residential price</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {priceReference.map(([region, price, source]) => (
                <tr key={region} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{region}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{price}</td>
                  <td className="py-2 px-3 text-gray-500 text-xs">{source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          * Prices change often and vary by utility, supplier, plan and time of day. UK and EU figures include
          VAT and taxes.
        </p>
      </section>

      {/* ── 6. Flat vs tiered ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Flat, Tiered and Time-of-Use Pricing
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <ul className="space-y-2 ml-4 list-disc">
            <li>
              <strong>Flat rate:</strong> every kWh costs the same. This is the most common plan in the UK and
              much of Europe, and for many U.S. utilities.
            </li>
            <li>
              <strong>Tiered (block) rate:</strong> the price steps up once you pass a threshold. Each block is
              charged only for the kWh inside it: with 0–500 kWh at $0.15 and 501+ at $0.20, a 700 kWh month
              costs 500 × 0.15 + 200 × 0.20 = <strong>$115</strong>, not 700 × 0.20.
            </li>
            <li>
              <strong>Time-of-use:</strong> the price depends on the hour, cheaper overnight and dearer at the
              evening peak. Enter your usage-weighted average rate as a flat rate, or work out peak and off-peak
              kWh separately and add the two results.
            </li>
          </ul>
        </div>
      </section>

      {/* ── 7. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Checking a U.S. monthly bill",
              scenario: "A household in Ohio used 900 kWh last month. At 18¢ per kWh the energy costs $162.00; adding the utility's $10 customer charge gives $172.00 before tax, so a $175 bill checks out once local tax is included.",
            },
            {
              title: "What a space heater really costs",
              scenario: "A renter in Chicago wants to know whether a 1,500 W space heater is affordable. Running it 4 hours a day for 30 days uses 180 kWh, adding $32.40 a month at $0.18 per kWh.",
            },
            {
              title: "UK bill with a standing charge",
              scenario: "A flat in Manchester uses 270 kWh a month on the price-cap tariff. Energy costs £71.06 at 26.32p per kWh, and the 54.83p daily standing charge adds £16.45, for a bill of £87.51.",
            },
            {
              title: "Budgeting in the EU",
              scenario: "A couple moving to Spain expects to use about 300 kWh a month. At the EU average of €0.29 per kWh, taxes included, they budget €87 a month for electricity.",
            },
            {
              title: "Charging an electric car at home",
              scenario: "A driver in Texas charges a car on a 7.2 kW Level 2 charger for an hour a day. That is 216 kWh a month, or $38.88 at $0.18 per kWh, which they compare with their monthly fuel spend.",
            },
            {
              title: "Small business with sales tax",
              scenario: "A small shop uses 1,200 kWh a month at $0.18 per kWh with a $25 service charge and 8% tax. Energy is $216, the subtotal $241, tax $19.28, and the total bill $260.28.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Tips & Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips to Lower Your Bill &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Find your all-in rate: divide last month's total bill by the kWh used. It includes delivery charges and fees, so it predicts your next bill better than the headline energy rate.",
                "Target heating and cooling first. Water heaters, space heaters, air conditioners and dryers run at 1,500–4,500 W, so an hour less a day saves far more than switching off lights.",
                "Swap remaining incandescent bulbs for LEDs: a 60 W bulb and a 10 W LED give similar light, and the LED uses about a sixth of the energy.",
                "On a time-of-use plan, run the dishwasher, washing machine and EV charger overnight, when the rate is lowest.",
                "Save a calculation each month to see whether a higher bill came from using more kWh or from a price rise.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Mixing up watts and kWh. Watts are how fast a device uses power; kWh are how much it used. Divide by 1,000 and multiply by hours to go from one to the other.",
                "Using an appliance's maximum rating for devices that cycle. Fridges, freezers and thermostatic heaters are only drawing full power part of the time.",
                "Adding tax twice. UK and EU unit rates usually include VAT already; add tax only when your bill lists it separately.",
                "Forgetting the standing or customer charge. It is billed every day or month even at zero usage, and can be a large share of a small bill.",
                "Charging every kWh at the top tier on a tiered plan. Each block has its own price and applies only to the kWh inside it.",
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

      {/* ── 9. FAQ ── */}
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

      {/* ── 10. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Electric Bill Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏠", title: "Homeowners", desc: "Check a monthly bill, spot billing errors, and see which appliances drive the cost." },
            { icon: "🔑", title: "Renters & Movers", desc: "Budget for electricity before signing a lease or moving to a new city or country." },
            { icon: "🚗", title: "EV Owners", desc: "Work out what home charging adds to the bill and compare it with fuel." },
            { icon: "🏪", title: "Small Businesses", desc: "Estimate monthly energy costs and compare supplier or utility quotes." },
            { icon: "☀️", title: "Solar Shoppers", desc: "Measure current usage and spending before sizing solar panels or a battery." },
            { icon: "🎓", title: "Students & Teachers", desc: "Practice converting watts to kWh and pricing energy use for science and economics classes." },
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
