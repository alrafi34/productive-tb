import { airConditionerPowerCalculatorConfig } from "./config";

export default function AirConditionerPowerCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const faqItems = airConditionerPowerCalculatorConfig.seo.faq;
  const howToSteps: [string, string][] = airConditionerPowerCalculatorConfig.seo.howToSteps.map(({ name, text }) => [name, text]);

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Air Conditioner Power Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            This <strong>air conditioner power calculator</strong> works out how many watts an AC draws from
            its capacity in tons and its EER or SEER rating (or from the power input on its label), then turns
            that into daily, monthly and yearly <strong>kWh and running cost</strong> at your own electricity
            tariff and currency.
          </p>
          <p>
            The answer to &quot;how many watts does a 1.5 ton AC use?&quot; depends mostly on efficiency: at
            18,000 BTU/h a unit rated EER 8 draws about 2,250 W, while one rated EER 14 draws about 1,290 W.
            Hours of use matter just as much for the bill, so both are inputs you can change and compare.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How AC Power Consumption Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Power (W)</span> = Capacity (BTU/h) ÷ EER</p>
              <p><span className="font-semibold">Monthly kWh</span> = (Power ÷ 1000) × Hours/Day × Days/Month</p>
              <p><span className="font-semibold">Monthly Cost</span> = Monthly kWh × Rate ($/kWh)</p>
              <p><span className="font-semibold">Generator (rule of thumb)</span> ≈ Running Watts × 2.5 for start-up surge</p>
              <p className="text-gray-500 text-xs mt-2">Example: 1.5 ton (18,000 BTU/h) ÷ EER 10 = <span className="text-green-600 font-semibold">1,800W</span></p>
              <p className="text-gray-500 text-xs">1.8 kW × 8h × 30 days × $0.12 = <span className="text-green-600 font-semibold">$51.84/month</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>1 ton</strong> = 12,000 BTU/h cooling capacity (fixed conversion, all regions)</li>
            <li><strong>EER</strong> — measured at peak conditions (95°F outdoor); lower EER = more watts per BTU</li>
            <li><strong>SEER</strong> — seasonal average; convert to EER by multiplying SEER × 0.875 for peak-condition estimate</li>
            <li><strong>Generator sizing</strong> — uses 2.5× running wattage to handle AC compressor startup surge</li>
            <li><strong>Inverter ACs</strong> — variable speed compressor; actual consumption varies 30–100% of rated power depending on load</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Air Conditioner Power Calculator
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
                "Running power from capacity in tons and an EER or SEER rating",
                "Or start from the unit's power input in watts",
                "Daily, monthly and yearly energy use (kWh)",
                "Monthly and yearly cost at your own tariff and currency",
                "Current draw at 120, 208, 230 or 240 V",
                "Cooling capacity in BTU/h and kW",
                "Energy-saving tip for your rating",
                "Runs in your browser — nothing is uploaded",
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

      {/* ── 4. Worked Examples ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Worked Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Monthly Electricity Bill Estimation",
              scenario: "A homeowner in Texas has a 1.5 ton mini-split (EER 11) running 10 hours/day during summer. They enter 1.5 tons, EER 11, 10 hours, 30 days, and $0.15/kWh. The calculator returns: 1,636W running load, 16.4 kWh/day, 491 kWh/month and about $73.60/month in electricity. Cutting the run time to 8 hours a day brings it to 393 kWh and about $58.90 — saving roughly $14.70 a month.",
            },
            {
              title: "Comparing Inverter vs Non-Inverter AC",
              scenario: "A buyer is deciding between a basic 1.5 ton unit (EER 9) and an inverter model (SEER 18) that costs $1,000 more. They run the calculator for each at 8 hours/day, 180 days/year, $0.16/kWh. Basic unit: 2,000W × 8h × 180 = 2,880 kWh/year, about $461/year. Inverter at SEER 18 (≈EER 15.75): 1,143W × 8h × 180 = 1,646 kWh, about $263/year. The annual saving of about $198 pays back the $1,000 premium in roughly 5 years.",
            },
            {
              title: "Solar System Sizing for AC Load",
              scenario: "A homeowner wants solar panels to offset a 1 ton AC running 6 hours/day. The AC at EER 11 draws 1,091W. Daily energy: 1.091 kW × 6h = 6.55 kWh/day. Accounting for inverter losses (90% efficiency) and panel output at their location (5 peak sun hours): panels needed = 6.55 ÷ 0.9 ÷ 5 = 1.46 kW of panel capacity. The homeowner installs a 1.6 kW (4 × 400W) solar array and a 10 kWh battery for evening use.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          AC Power Consumption Reference Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Watts by Tonnage &amp; EER</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Capacity</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">EER 8</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">EER 10</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">EER 12</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">EER 14</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["0.75 ton / 9,000 BTU",  "1,125W","900W", "750W", "643W"],
                    ["1 ton / 12,000 BTU",    "1,500W","1,200W","1,000W","857W"],
                    ["1.5 ton / 18,000 BTU",  "2,250W","1,800W","1,500W","1,286W"],
                    ["2 ton / 24,000 BTU",    "3,000W","2,400W","2,000W","1,714W"],
                    ["2.5 ton / 30,000 BTU",  "3,750W","3,000W","2,500W","2,143W"],
                    ["3 ton / 36,000 BTU",    "4,500W","3,600W","3,000W","2,571W"],
                  ].map(([cap, e8, e10, e12, e14]) => (
                    <tr key={cap} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-gray-700 text-xs">{cap}</td>
                      <td className="py-2 px-3 font-mono text-red-500 text-xs">{e8}</td>
                      <td className="py-2 px-3 font-mono text-gray-700 text-xs">{e10}</td>
                      <td className="py-2 px-3 font-mono text-green-600 text-xs">{e12}</td>
                      <td className="py-2 px-3 font-mono text-green-700 font-semibold text-xs">{e14}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Monthly Cost (8h/day, $0.12/kWh)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Capacity</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">EER 10</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">EER 12</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">EER 14</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1 ton",   "$34.56","$28.80","$24.69"],
                    ["1.5 ton", "$51.84","$43.20","$37.03"],
                    ["2 ton",   "$69.12","$57.60","$49.37"],
                    ["2.5 ton", "$86.40","$72.00","$61.71"],
                    ["3 ton",   "$103.68","$86.40","$74.06"],
                  ].map(([cap, e10, e12, e14]) => (
                    <tr key={cap} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-gray-700 text-xs">{cap}</td>
                      <td className="py-2 px-3 font-mono text-gray-700 text-xs">{e10}</td>
                      <td className="py-2 px-3 font-mono text-green-600 text-xs">{e12}</td>
                      <td className="py-2 px-3 font-mono text-green-700 font-semibold text-xs">{e14}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">* Assumes full-load operation. Inverter ACs typically consume 40–70% of rated watts at average loads.</p>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
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

    </>
  );
}
