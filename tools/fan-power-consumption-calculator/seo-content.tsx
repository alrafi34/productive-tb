export default function FanPowerConsumptionCalculatorSEO() {
  const faqItems = [
    { q: "What is a fan power consumption calculator?", a: "A fan power consumption calculator is a free online tool that converts a fan's wattage, daily usage hours, and your electricity tariff into daily, monthly, and yearly energy use (in kWh) and the exact cost. It also estimates the current draw the fan places on a circuit. It is used by homeowners, renters, landlords, and facility managers to budget electricity bills and compare fan types before buying." },
    { q: "How is fan electricity cost calculated?", a: "The calculator first finds daily energy: Daily Energy (kWh) = (Power in watts × Hours per Day) ÷ 1000. Monthly energy multiplies that by your days-per-month setting, and yearly energy multiplies it by 365. Each of those energy figures is then multiplied by your electricity tariff (cost per kWh) to get daily, monthly, and yearly cost." },
    { q: "How much electricity does a ceiling fan use?", a: "A standard induction-motor ceiling fan rated at 75W run 8 hours a day uses 0.6 kWh daily, 18 kWh a month, and 219 kWh a year. At $0.12/kWh that is $2.16 a month and roughly $26.28 a year. An energy-efficient BLDC ceiling fan rated at 50W under the same usage uses only 12 kWh a month — $1.44, a 33% reduction." },
    { q: "Is it cheaper to run a fan or an air conditioner?", a: "Fans are dramatically cheaper to run. A 75W ceiling fan running 8 hours a day costs about $2.16 a month at $0.12/kWh, while a 1.5-ton air conditioner running the same 8 hours a day typically costs $40–55 a month depending on its EER rating — 20 to 25 times more. Use this calculator alongside an AC power calculator to compare the two loads directly before deciding whether a fan can substitute for cooling in mild weather." },
    { q: "How much can I save by switching to a BLDC or inverter fan?", a: "Replacing a 75W standard ceiling fan with a 50W BLDC model at 8 hours a day, 30 days a month, and $0.12/kWh saves 6 kWh a month — $0.72 a month or $8.64 a year per fan. Across a home with five ceiling fans, that is roughly $43 a year, and BLDC fans typically pay back their price premium within two to three years of daily use." },
    { q: "Does fan speed affect the power consumption calculation?", a: "Yes, but you must account for it manually. The calculator uses whatever wattage you enter, which should reflect the fan's actual draw at the speed you run it — not the maximum wattage printed on the box. Many fans draw 30–50% less power at medium speed than at high speed, so check your fan's spec sheet for per-speed wattage or measure it with a plug-in power meter for an exact figure." },
    { q: "How do I find my fan's wattage if it isn't labeled?", a: "Check the motor housing, base, or a rating plate for a wattage or amperage figure — most fans list wattage directly. If only voltage and current are given, calculate Power (W) = Voltage (V) × Current (A). If no rating is available at all, a plug-in power meter (kill-a-watt style) plugged between the fan and outlet gives the most accurate real-world reading." },
    { q: "What voltage does the current calculation use?", a: "This calculator estimates current draw using a fixed 230V supply: Current (A) = Power (W) ÷ 230. This matches most of the world outside North America. If your electrical system runs on 110–120V, the displayed current figure will be inaccurate for your circuit — recalculate manually using Power ÷ your actual supply voltage before sizing wiring or breakers." },
    { q: "Should I leave a fan running in an empty room?", a: "No. Fans cool people through moving air across skin (the wind-chill effect), not by lowering the room's air temperature. A fan running in an empty room provides no cooling benefit to anyone while still drawing its full rated wattage continuously, so turning it off when you leave is pure savings with no downside." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your fan wattage, usage hours, and electricity tariff are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter fan power in watts", "Type the fan's wattage from its label or manual — most fans draw 30–200W depending on type and size. Use the actual draw at your normal speed setting, not the maximum printed on the box, for the most accurate cost."],
    ["Set usage hours per day", "Enter how many hours per day the fan runs, from 0 to 24. This is the single biggest driver of monthly cost, so use your realistic average rather than a worst-case estimate."],
    ["Set days per month", "Enter the number of days in your billing cycle, typically 30. Adjust to 28, 29, or 31 to match a specific calendar month exactly if you're reconciling against a utility bill."],
    ["Enter your electricity tariff", "Type your cost per kWh from your electricity bill. This is multiplied by the calculated energy use to produce daily, monthly, and yearly cost figures."],
    ["Apply a fan preset (optional)", "Choose from nine built-in presets — standard and BLDC ceiling fans, table fans, pedestal fans, tower fans, bathroom and kitchen exhaust fans, and industrial fans — to auto-fill typical wattage and usage hours."],
    ["Read the results and export", "Review daily, monthly, and yearly energy and cost, plus estimated current draw at 230V. Save the calculation to history, copy a summary, or export a text or CSV report."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Fan Power Consumption Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>fan power consumption calculator</strong> is a free online tool that converts a fan's
            wattage and daily usage hours into exact energy use and electricity cost — daily, monthly, and
            yearly. It answers the question behind every electricity bill: <em>how much is running this fan
            actually costing me?</em>
          </p>
          <p>
            Fans are cheap to run individually, but the numbers add up across a household or building running
            multiple units for hours a day, every day, all season. A single 75W ceiling fan looks trivial —
            until you realize five of them running 8 hours a day adds roughly $130 a year to an electricity
            bill. This calculator makes that cost explicit and lets you compare fan types, speeds, and usage
            patterns before you commit to buying or running one.
          </p>
          <p>
            Built for <strong>homeowners and renters tracking utility bills, landlords estimating shared
            electricity costs across rental units, facility managers running industrial or workshop fans,
            electricians checking circuit current draw, and energy-conscious households comparing fan running
            cost against air conditioning</strong>. Includes nine built-in fan presets, calculation history,
            and text and CSV export. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Fan Power Consumption Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Daily Energy (kWh)</span> = (Power (W) × Hours/Day) ÷ 1000</p>
              <p><span className="font-semibold">Monthly Energy</span> = Daily Energy × Days/Month</p>
              <p><span className="font-semibold">Yearly Energy</span> = Daily Energy × 365</p>
              <p><span className="font-semibold">Cost</span> = Energy (kWh) × Tariff ($/kWh)</p>
              <p><span className="font-semibold">Current (A)</span> = Power (W) ÷ 230V</p>
              <p className="text-gray-500 text-xs mt-2">Example: 75W fan × 8h ÷ 1000 = <span className="text-green-600 font-semibold">0.6 kWh/day</span> → × 30 days × $0.12 = <span className="text-green-600 font-semibold">$2.16/month</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Wattage is the input you control most</strong> — it should reflect the fan's real draw at your normal running speed, not the maximum rating on the box</li>
            <li><strong>Days per month</strong> — defaults to 30 but can be set to 28, 29, or 31 to match an exact billing cycle</li>
            <li><strong>Yearly figures</strong> always use a fixed 365-day multiplier on daily energy, independent of the days-per-month setting used for the monthly figure</li>
            <li><strong>Current draw</strong> assumes a fixed 230V supply — recalculate manually for 110–120V systems using Power ÷ your actual voltage</li>
            <li><strong>Tariff</strong> is your cost per kWh from your electricity bill — the calculator applies it uniformly across daily, monthly, and yearly energy</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Fan Power Consumption Calculator
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
                "Daily, monthly, and yearly energy in kWh",
                "Daily, monthly, and yearly electricity cost",
                "Estimated current draw at 230V",
                "9 built-in fan type presets",
                "Automatic energy-saving suggestion based on your inputs",
                "Calculation history (last 20 entries, saved locally)",
                "Export results as a text report",
                "Export results as CSV",
                "Copy result to clipboard",
                "100% browser-based — no data sent to any server",
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
              title: "Standard Ceiling Fan Monthly Budget",
              scenario: "A homeowner wants to know what their bedroom ceiling fan adds to the electricity bill. They enter 75W, 8 hours/day, 30 days, $0.12/kWh. The calculator returns 0.6 kWh daily, 18 kWh monthly, 219 kWh yearly, and a monthly cost of $2.16 ($26.28/year). The current draw at 230V is 0.33A, confirming the fan is a negligible load on its circuit.",
            },
            {
              title: "BLDC Upgrade Payback",
              scenario: "The same homeowner compares their 75W standard fan against a 50W BLDC replacement at the same 8 hours/day and $0.12/kWh. The BLDC fan costs $1.44/month ($17.28/year) versus $2.16/month for the standard fan — a saving of $0.72/month, or $8.64/year per fan. Across 5 ceiling fans in the house, that's $43.20/year, enough to justify replacing fans as they wear out rather than buying like-for-like.",
            },
            {
              title: "Kitchen Exhaust Fan Running Cost",
              scenario: "A renter wants to isolate their kitchen exhaust fan's contribution to a shared utility bill. They enter 150W, 3 hours/day, 30 days, $0.12/kWh. The calculator returns 0.45 kWh daily, 13.5 kWh monthly, and $1.62/month ($19.71/year) — useful context when splitting a utility bill with roommates who don't cook as often.",
            },
            {
              title: "Industrial Workshop Fan Load",
              scenario: "A facility manager is budgeting for a 200W industrial fan running 12 hours/day, 26 working days/month, at a commercial rate of $0.11/kWh. The calculator returns 2.4 kWh daily, 62.4 kWh monthly, a monthly cost of $6.86, and a yearly cost of $96.36 across 365 operating days. Current draw is 0.87A — the manager checks this against the workshop's circuit rating before adding two more identical fans.",
            },
            {
              title: "Multi-Unit Rental Cost Estimate",
              scenario: "A landlord is estimating shared electricity cost across a 4-unit building where each unit runs one 75W ceiling fan 10 hours/day during summer, 30 days/month, at $0.12/kWh. Per fan: 0.75 kWh daily, 22.5 kWh monthly, $2.70/month. Across all 4 units, that's $10.80/month building-wide — a figure the landlord uses to set a fair utilities surcharge in the lease.",
            },
            {
              title: "Fan vs Air Conditioner Cost Comparison",
              scenario: "An energy-conscious household compares a 75W ceiling fan (8h/day, $0.12/kWh) at $2.16/month against a 1.5-ton air conditioner at roughly 1,800W under the same 8 hours/day — about $51.84/month using a separate AC power calculator. Running fans and raising the AC thermostat 2–3°C keeps comfort levels similar while cutting the combined cooling bill by roughly 30–40%, saving $15–20/month.",
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
                "Use the fan's actual running wattage at your normal speed setting, not the maximum wattage printed on the box. A fan rated 75W at top speed may draw only 45–50W at medium — enter the real figure for an accurate cost, ideally measured with a plug-in power meter.",
                "BLDC (brushless DC) ceiling fans use 35–50% less power than standard induction motor fans for comparable airflow. Run the calculator with both wattages side by side to see the exact monthly saving before deciding whether the higher upfront price is worth it.",
                "Multiply the calculator's current result by the number of identical fans sharing a circuit to check breaker capacity. Five 75W fans draw about 1.6A combined at 230V — well within a standard 15A circuit — but five 200W industrial fans draw about 4.3A, worth checking against other loads on the same breaker.",
                "The current figure assumes a fixed 230V supply. If you're on a 110–120V system, don't use the displayed amperage for wiring or breaker decisions — recalculate with Power ÷ your actual voltage instead.",
                "Set days-per-month to match your actual billing cycle (28, 29, 30, or 31) rather than always using 30 if you're trying to reconcile the calculator's monthly figure against a specific utility bill.",
                "Pair fans with a higher air conditioner thermostat setting rather than running the AC alone. Raising the AC setpoint 2–3°C while running ceiling fans can cut combined cooling costs by 30–40% for only a few extra dollars a month in fan electricity.",
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
                "Don't enter the maximum wattage from the box if you normally run the fan at a lower speed. Most fans draw 30–50% less power at medium than at high speed, so using the top-speed rating overstates your actual cost.",
                "Don't leave fans running in empty rooms. A fan only creates a cooling sensation through moving air across skin — it does not lower the room's actual temperature, so an unoccupied room gets zero benefit while the fan keeps drawing full wattage.",
                "Don't assume all fans of the same category use the same wattage. 'Ceiling fan' alone can mean anywhere from a 28W BLDC unit to a 90W standard induction fan — always check the specific model's rating, not a general category assumption.",
                "Don't use the calculator's 230V-based current estimate to size wiring or breakers on a 110–120V electrical system. The formula is fixed to 230V; for North American systems, divide power by your actual supply voltage instead.",
                "Don't forget that yearly cost uses a fixed 365-day multiplier on daily energy, independent of whatever days-per-month value you set for the monthly figure — the two are calculated separately, not by simply multiplying monthly cost by 12.",
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
          Fan Power &amp; Monthly Cost Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Fan Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Power</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Usage</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Monthly kWh</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Monthly Cost*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Ceiling Fan (Standard)", "75W", "8h/day", "18.0 kWh", "$2.16"],
                ["Ceiling Fan (BLDC)", "50W", "8h/day", "12.0 kWh", "$1.44"],
                ["Table Fan (Small)", "40W", "6h/day", "7.2 kWh", "$0.86"],
                ["Table Fan (Medium)", "60W", "6h/day", "10.8 kWh", "$1.30"],
                ["Pedestal Fan", "55W", "8h/day", "13.2 kWh", "$1.58"],
                ["Tower Fan", "45W", "10h/day", "13.5 kWh", "$1.62"],
                ["Exhaust Fan (Bathroom)", "30W", "2h/day", "1.8 kWh", "$0.22"],
                ["Exhaust Fan (Kitchen)", "150W", "3h/day", "13.5 kWh", "$1.62"],
                ["Industrial Fan", "200W", "12h/day", "72.0 kWh", "$8.64"],
              ].map(([type, power, hours, kwh, cost]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-medium text-gray-700 text-xs">{type}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{power}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-600 text-xs">{hours}</td>
                  <td className="py-1.5 px-3 font-mono text-gray-700 text-xs">{kwh}</td>
                  <td className="py-1.5 px-3 font-mono font-semibold text-green-600 text-xs">{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Monthly cost assumes $0.12/kWh and 30 days/month. Actual wattage varies by brand, motor type, and speed setting — always check the fan's label for its exact rating.</p>
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
          Who Uses This Fan Power Consumption Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏠", title: "Homeowners", desc: "Budget monthly electricity cost for ceiling, table, and pedestal fans before summer, and compare standard vs BLDC models before an upgrade." },
            { icon: "🔑", title: "Renters & Tenants", desc: "Estimate their share of a shared utility bill when running personal fans, and check whether a portable fan is cheaper to run than requesting AC access." },
            { icon: "🏘️", title: "Landlords & Property Managers", desc: "Estimate combined fan electricity cost across multiple rental units to set fair utility charges or plan energy-efficient fan replacements at turnover." },
            { icon: "🏭", title: "Facility Managers", desc: "Budget for industrial and workshop fans running long daily hours, and check current draw against circuit capacity before adding more units." },
            { icon: "⚡", title: "Electricians", desc: "Estimate current draw for fan circuits during installation planning, and verify multiple fans on a shared circuit stay within safe amperage limits." },
            { icon: "🌱", title: "Energy-Conscious Households", desc: "Compare fan running cost against air conditioning to find the cheapest way to stay comfortable, and calculate the payback period on efficient fan upgrades." },
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
