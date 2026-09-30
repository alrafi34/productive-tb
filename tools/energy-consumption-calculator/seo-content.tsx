import { energyConsumptionCalculatorConfig } from "./config";
export default function EnergyConsumptionCalculatorSEO() {
  const faqItems = energyConsumptionCalculatorConfig.seo.faq;

  const howToSteps: [string, string][] = energyConsumptionCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Energy Consumption Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>energy consumption calculator</strong> converts an appliance's power rating and usage
            time into kilowatt-hours (kWh) and an estimated electricity cost. Enter wattage, hours and
            minutes of daily use, quantity, and your electricity rate — and the calculator returns daily,
            monthly, and yearly energy use and cost, for one appliance or an entire household list.
          </p>
          <p>
            The calculation itself is simple multiplication, but doing it by hand across a dozen appliances
            with mixed units — some in watts, some in kW, usage measured in hours for one device and minutes
            for another — is where errors creep in. This tool handles unit conversion automatically, sums
            every appliance into a combined total, and flags which single device is driving the bill the most.
          </p>
          <p>
            Built for <strong>homeowners tracking electricity bills, renters estimating costs before moving
            in, energy auditors, and students learning power-to-energy calculations</strong>. Supports
            unlimited appliances, built-in presets for common devices, CSV and text export, and calculation
            history — entirely browser-based, free, with no signup.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          The Energy Consumption Formula
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Energy (kWh)</span> = Power (W) × Time (hours) × Quantity ÷ 1000</p>
              <p><span className="font-semibold">Cost</span> = Energy (kWh) × Rate ($/kWh)</p>
              <p className="text-gray-500 text-xs mt-2">Example: a 1,500W kettle used 0.5 hours/day</p>
              <p className="text-gray-500 text-xs">Energy = 1,500 × 0.5 ÷ 1000 = <span className="text-green-600 font-semibold">0.75 kWh/day</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Power (W)</strong> — the appliance's rated wattage, from its nameplate or manual</li>
            <li><strong>Time</strong> — total hours and minutes of use per day, converted to decimal hours (e.g. 5h 30m = 5.5 hours)</li>
            <li><strong>Quantity</strong> — number of identical devices, multiplied into the total</li>
            <li><strong>Rate</strong> — your cost per kWh, found on a recent electricity bill</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Energy Consumption Calculator
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
                "Unlimited appliances tracked at once",
                "28 built-in appliance presets with typical wattage",
                "Daily, monthly, and yearly energy and cost totals",
                "Highest-consumer detection across your appliance list",
                "Calculation history (saved locally)",
                "CSV export for spreadsheets",
                "Text export for reports",
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
              title: "Air Conditioner Summer Budget",
              scenario: "A homeowner running an 18,000 BTU mini-split (about 1,500W) 8 hours a day in summer enters these values at $0.18/kWh. The calculator returns 12 kWh per day, 360 kWh per month and a monthly cost of $64.80, so they raise the thermostat from 72°F to 77°F (22°C to 25°C) and re-run the numbers at 6 hours a day, cutting the estimate to $48.60 a month.",
            },
            {
              title: "Renter Pre-Move Cost Estimate",
              scenario: "A renter evaluating a new apartment lists a refrigerator (60W average draw, 24h/day), 6 LED bulbs (10W each, 5h/day), a laptop (60W, 8h/day), and a washing machine (500W, 1h/day) at $0.15/kWh. Combined, the calculator returns 2.72 kWh/day and $0.41/day, about $12.24/month for these devices, which they use to budget alongside rent before signing the lease.",
            },
            {
              title: "Standby Power Audit",
              scenario: "An energy auditor suspects a household's WiFi router (10W) and phone chargers (5W each, 4 units) left plugged in 24/7 are adding hidden cost. Entering 10W × 24h plus 4 × 5W × 24h at $0.13/kWh returns 0.72 kWh/day, or $2.81/month — small per device, but the auditor flags it as a $34/year phantom-load line item across the household.",
            },
            {
              title: "Small Business Kitchen Equipment",
              scenario: "A café owner lists a 2,000W induction cooktop (2h/day), a 1,200W microwave (0.5h/day), and a 1,800W dishwasher (1h/day) at a commercial rate of $0.18/kWh. The calculator returns 6.4 kWh/day combined and $1.15/day, or roughly $34.56/month — used to compare against a supplier quote for a lower-wattage induction unit.",
            },
            {
              title: "LED Retrofit Savings Comparison",
              scenario: "A facilities manager compares 20 incandescent bulbs (60W each, 6h/day) against 20 LED replacements (10W each, 6h/day) at $0.13/kWh. Incandescent: 7.2 kWh/day ($0.94/day). LED: 1.2 kWh/day ($0.16/day). The calculator shows a saving of $0.78/day, or about $284.70/year, which the manager uses to justify the retrofit's payback period.",
            },
            {
              title: "Water Heater Off-Peak Scheduling",
              scenario: "A homeowner on a time-of-use plan runs a 2,000W water heater for 2 hours a day. At a peak rate of $0.22/kWh, that's 4 kWh/day for $0.88/day. Shifting the same usage to an off-peak rate of $0.09/kWh drops the daily cost to $0.36 — a saving of $0.52/day, or about $189.80/year, calculated by re-entering the rate field for each scenario.",
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
                "Use a plug-in power meter for compressor-based appliances (fridges, ACs, heat pumps) instead of the nameplate wattage. These devices cycle on and off, so their average draw is often 30-50% below the rated figure printed on the label.",
                "Enter standby devices separately from active-use devices. A router or set-top box running 24 hours a day at just 10W still adds up to 7.3 kWh a month — small individually, but a household with a dozen such devices can lose $30-50 a year to phantom load.",
                "Check your bill for tiered or time-of-use pricing before entering a single flat rate. If your utility charges more per kWh above a usage threshold, or charges different peak/off-peak rates, calculate high-usage appliances at the marginal rate that actually applies to them.",
                "Save a baseline calculation to history before making an efficiency change (like an LED retrofit or a thermostat adjustment), then create a second calculation with the new numbers so you can compare the exact dollar difference side by side.",
                "Export to CSV when auditing more than a handful of appliances — it's far easier to sort, filter, and chart in a spreadsheet than to read through a long list of individual result cards on screen.",
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
                "Entering power in kilowatts but leaving the field labeled as watts, or vice versa. A 1.5kW heater entered as \"1.5\" instead of \"1500\" understates energy use by a factor of 1,000 — always convert kW to W by multiplying by 1,000 first.",
                "Forgetting to set the electricity rate, or leaving the default placeholder value in place. The energy figure in kWh is accurate regardless, but the cost estimate is meaningless unless the rate matches your actual utility pricing.",
                "Using nameplate maximum wattage for devices with variable draw, like a laptop charger or a variable-speed motor. These often run well below their rated peak most of the time, so a nameplate-based estimate can overstate real cost.",
                "Comparing this calculator's total directly against your electricity bill without accounting for fixed service charges, taxes, and appliances you didn't include. The calculator estimates only the variable energy cost of the specific devices you enter.",
                "Ignoring quantity when multiple identical devices are in use. Four 10W LED bulbs used together is 40W of combined load, not 10W — always set the quantity field rather than entering a single unit and forgetting the rest.",
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
          Common Appliance Power Ratings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Appliance</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Power</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Usage</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Daily kWh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["LED bulb", "10W", "5 hours/day", "0.05 kWh"],
                ["Ceiling fan", "75W", "8 hours/day", "0.6 kWh"],
                ["Refrigerator (average draw)", "60W", "24 hours/day", "1.44 kWh"],
                ["Laptop", "60W", "8 hours/day", "0.48 kWh"],
                ["Microwave oven", "1,200W", "0.5 hours/day", "0.6 kWh"],
                ["Window AC (10,000 BTU)", "900W", "8 hours/day", "7.2 kWh"],
                ["Central AC (3 ton)", "3,500W", "8 hours/day", "28 kWh"],
                ["Washing machine", "500W", "1 hour/day", "0.5 kWh"],
                ["Electric kettle", "1,500W", "0.5 hours/day", "0.75 kWh"],
                ["Electric water heater (tank)", "4,500W", "3 hours/day", "13.5 kWh"],
                ["Clothes dryer", "3,000W", "1 hour/day", "3 kWh"],
                ["EV charger (Level 2)", "7,200W", "1 hour/day", "7.2 kWh"],
              ].map(([name, power, usage, kwh]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{name}</td>
                  <td className="py-2 px-3 font-mono text-gray-700 text-xs">{power}</td>
                  <td className="py-2 px-3 text-gray-600 text-xs">{usage}</td>
                  <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{kwh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Figures are typical nameplate values and usage patterns — actual draw varies by model, efficiency rating, and cycling behavior.</p>
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
          Who Uses This Energy Consumption Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏠", title: "Homeowners", desc: "Track which appliances drive the monthly electricity bill and test the dollar impact of changes like thermostat settings before committing." },
            { icon: "🏢", title: "Renters", desc: "Estimate monthly electricity costs for a new apartment's typical appliance load before signing a lease or budgeting move-in expenses." },
            { icon: "🔍", title: "Energy Auditors", desc: "Build a full appliance-by-appliance energy breakdown for a household or facility, including standby and phantom load devices." },
            { icon: "🎓", title: "Students", desc: "Work through power-to-energy conversion problems and verify homework answers using real appliance wattage figures." },
            { icon: "🏭", title: "Facilities Managers", desc: "Compare energy cost before and after equipment upgrades, such as an LED retrofit or replacing older kitchen equipment." },
            { icon: "🌱", title: "Environmentally Conscious Users", desc: "Estimate the energy footprint of daily appliance use as a first step toward calculating an associated carbon footprint." },
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
