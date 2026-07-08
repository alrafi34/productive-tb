export default function AirConditionerPowerCalculatorSEO() {
  const faqItems = [
    {
      q: "What is an air conditioner power calculator?",
      a: "An air conditioner power calculator is a free online tool that computes AC power consumption in watts and kilowatts from the unit's capacity in tons or BTU/h, its energy efficiency rating (EER or SEER), and its operating hours. It also calculates monthly electricity cost and the generator or inverter size required to run the unit. It is used by homeowners, electricians, HVAC engineers, and facility managers to estimate running costs and plan electrical infrastructure.",
    },
    {
      q: "How many watts does a 1 ton AC use?",
      a: "A 1 ton air conditioner has a cooling capacity of 12,000 BTU/h. The actual power consumption in watts depends on the unit's EER (Energy Efficiency Ratio): Power (W) = Cooling Capacity (BTU/h) ÷ EER. For a 1 ton AC with EER 10, power consumption is 12,000 ÷ 10 = 1,200W (1.2 kW). For a more efficient unit with EER 12, it is 1,000W (1.0 kW). Older or low-efficiency units with EER 8 consume 1,500W. Modern inverter ACs often achieve EER 14–18 at part load.",
    },
    {
      q: "How many watts does a 1.5 ton AC use?",
      a: "A 1.5 ton AC has a cooling capacity of 18,000 BTU/h. At EER 10, power consumption is 18,000 ÷ 10 = 1,800W (1.8 kW). At EER 12, it is 1,500W (1.5 kW). At EER 14 (modern inverter), approximately 1,286W. For a non-inverter 1.5 ton window AC with EER 8, consumption is 2,250W. The actual wattage varies by brand, age, ambient temperature, and whether the compressor is running at full capacity.",
    },
    {
      q: "What size generator is required for a 1.5 ton AC?",
      a: "A 1.5 ton AC running at approximately 1,800W requires a generator rated at least 2,500–3,000W to handle startup surge current (typically 2–3× running wattage). For a 1.5 ton AC with 1,800W running load, a 3 kVA generator is the practical minimum. If you are running the AC alongside other loads (lights, fans, refrigerator), add their wattages and plan for a 5 kVA generator. Enter your AC tonnage and EER in this calculator to get an exact generator size recommendation.",
    },
    {
      q: "What is the difference between EER and SEER?",
      a: "EER (Energy Efficiency Ratio) is the cooling capacity (BTU/h) divided by power input (W) measured at a single standard test condition (95°F outdoor, 80°F indoor). SEER (Seasonal Energy Efficiency Ratio) is the same ratio averaged over a full cooling season across varying outdoor temperatures. SEER is always higher than EER for the same unit because it includes milder operating conditions. EER is better for comparing units under worst-case hot conditions; SEER is better for estimating annual energy cost. This calculator supports both.",
    },
    {
      q: "How do I calculate monthly electricity cost for an air conditioner?",
      a: "Monthly electricity cost = (Power in kW) × (Daily operating hours) × (Days per month) × (Electricity rate per kWh). For example, a 1.5 kW AC running 8 hours per day for 30 days at $0.12/kWh: 1.5 × 8 × 30 × 0.12 = $43.20/month. Enter your AC capacity, EER, daily runtime, and local electricity rate into this calculator to get the monthly cost automatically.",
    },
    {
      q: "How many tons of AC do I need for my room?",
      a: "As a general rule, residential spaces require approximately 20 BTU/h per square foot of cooled area under standard conditions. For a 150 sq ft bedroom: 150 × 20 = 3,000 BTU/h = 0.25 ton — a small 5,000 BTU window unit. For a 400 sq ft living room: 400 × 20 = 8,000 BTU/h = 0.67 ton — a 1 ton unit. For a 600 sq ft open-plan space with high ceilings or west-facing windows, increase by 20–30%. This calculator includes a room sizing mode to calculate required tons from room dimensions.",
    },
    {
      q: "What is the power consumption of a 2 ton AC?",
      a: "A 2 ton AC has a cooling capacity of 24,000 BTU/h. At EER 10, power consumption is 24,000 ÷ 10 = 2,400W (2.4 kW). At EER 12, it is 2,000W. At EER 14, approximately 1,714W. For a generator or inverter, a 2 ton AC at 2,400W running load requires a 4–5 kVA generator to handle startup surge. Monthly cost at 8 hours/day, 30 days, $0.12/kWh: 2.4 × 8 × 30 × 0.12 = $69.12.",
    },
    {
      q: "What is BTU and how does it relate to tons?",
      a: "BTU (British Thermal Unit) is a unit of heat energy. In HVAC, BTU/h describes the rate at which an AC removes heat from a space. 1 ton of cooling = 12,000 BTU/h — a historical reference to the cooling power of melting one ton of ice per day. Common conversions: 0.75 ton = 9,000 BTU/h; 1 ton = 12,000 BTU/h; 1.5 ton = 18,000 BTU/h; 2 ton = 24,000 BTU/h; 2.5 ton = 30,000 BTU/h; 3 ton = 36,000 BTU/h.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your AC capacity, EER values, operating hours, and electricity rates are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter AC capacity", "Input your air conditioner's capacity in tons (e.g., 1, 1.5, 2) or BTU/h (e.g., 12000, 18000). Both input methods are supported — select whichever matches your unit's spec sheet or nameplate."],
    ["Enter the EER or SEER rating", "Type the unit's EER (Energy Efficiency Ratio) or SEER from the product label or datasheet. Typical range: 8–10 for older non-inverter units, 12–14 for modern standard units, 16–22 for premium inverter ACs. If unknown, use 10 as a conservative estimate."],
    ["Set daily operating hours and days per month", "Enter how many hours per day the AC runs and how many days per month — typically 30. This drives the monthly energy consumption and cost calculation."],
    ["Enter your electricity rate", "Type your local electricity cost per kWh. This appears on your electricity bill. Common ranges: $0.10–0.15/kWh in the US, ₹5–8/kWh in India, ৳7–10/kWh in Bangladesh."],
    ["Read power, energy, and cost results", "The calculator returns running wattage, monthly kWh consumption, monthly electricity cost, required circuit breaker size, and recommended generator/inverter kVA — all updated instantly as you change inputs."],
    ["Use room sizing mode to find required tonnage", "Switch to room sizing mode, enter room dimensions and sun exposure level, and the calculator returns the required AC capacity in tons and BTU/h for your space."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Air Conditioner Power Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>air conditioner power calculator</strong> is a free online tool that computes AC
            electricity consumption in watts and kilowatts, estimates monthly running cost, and determines
            the generator or inverter size needed to run the unit. It converts between tons, BTU/h, watts,
            and kWh — giving you every number you need to understand, budget for, and power your air
            conditioner.
          </p>
          <p>
            The common questions this tool answers: <em>how many watts does a 1.5 ton AC use, what size
            generator is required for a 1.5 ton AC, what will it cost per month at my electricity rate?</em>
            These seem simple but the answer depends on two variables most people overlook — the unit's EER
            (Energy Efficiency Ratio) and how many hours per day it actually runs. A 1.5 ton AC can consume
            anywhere from 1,100W to 2,200W depending on EER alone. This calculator makes those variables
            explicit and shows their impact on cost instantly.
          </p>
          <p>
            Built for <strong>homeowners estimating electricity bills, electricians sizing circuits and
            generators, HVAC engineers selecting equipment, facility managers tracking energy consumption,
            and anyone buying a new AC who wants to know the real running cost before purchase</strong>.
            Supports tons, BTU/h, EER, SEER, multiple currencies, and room sizing. Browser-based, free,
            no signup.
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
              <p><span className="font-semibold">Generator kVA</span> = (Running Watts × 2.5) ÷ 1000</p>
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
                "Running wattage from tons and EER/SEER",
                "Monthly kWh energy consumption",
                "Monthly electricity cost in your currency",
                "Annual energy cost",
                "Required circuit breaker size",
                "Recommended generator/inverter kVA",
                "Tons ↔ BTU/h ↔ kW conversion",
                "Room sizing mode (sq ft → required tons)",
                "EER vs SEER comparison",
                "Side-by-side comparison of two AC units",
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
              title: "Monthly Electricity Bill Estimation",
              scenario: "A homeowner in Dhaka has a 1.5 ton split AC (EER 11) running 10 hours/day during summer. They enter 1.5 tons, EER 11, 10 hours, 30 days, and ৳8/kWh. The calculator returns: 1,636W running load, 49.1 kWh/day, 1,472 kWh/month, ৳11,773/month in electricity cost. They realize the AC accounts for 60% of their monthly bill and switch to running it 8 hours at night only — saving ৳3,924/month.",
            },
            {
              title: "Generator Sizing for Backup Power",
              scenario: "An electrician is sizing a backup generator for a home with a 2 ton AC (EER 10), a refrigerator (200W), and lights (300W). The AC draws 2,400W running; startup surge is 2,400 × 2.5 = 6,000W. Adding refrigerator and lights: 6,000 + 200 + 300 = 6,500W peak. The calculator recommends a 7.5 kVA generator minimum. The electrician specifies an 8 kVA unit for a 20% safety margin.",
            },
            {
              title: "Comparing Inverter vs Non-Inverter AC",
              scenario: "A buyer is deciding between a non-inverter 1.5 ton AC (EER 9, ₹32,000) and an inverter model (SEER 18, ₹52,000). They enter both models and set 8 hours/day, 180 days/year, ₹7/kWh. Non-inverter: 2,000W × 8h × 180 = 2,880 kWh/year × ₹7 = ₹20,160/year. Inverter at SEER 18 (≈EER 15.75): 1,143W × 8h × 180 = 1,646 kWh × ₹7 = ₹11,522/year. Annual saving: ₹8,638. The ₹20,000 premium pays back in 2.3 years.",
            },
            {
              title: "HVAC Equipment Selection",
              scenario: "An HVAC engineer is selecting AC equipment for a 350 sq ft server room that generates significant internal heat. Using the room sizing mode: 350 sq ft × 25 BTU/sq ft (high internal load) = 8,750 BTU/h = 0.73 ton. The engineer rounds up to a 1 ton unit (12,000 BTU/h) for thermal headroom. They check the power draw at 1 ton / EER 12 = 1,000W and confirm the existing 20A circuit can handle it (max 16A continuous = 1,840W at 115V).",
            },
            {
              title: "Office Building Energy Audit",
              scenario: "A facility manager is auditing power consumption for 20 office split units (all 2 ton, EER 10). Running 9 hours/day, 22 working days/month at $0.11/kWh: each unit draws 2,400W → 52.8 kWh/month → $5.81/month. 20 units: $116.16/month. Replacing 10 units with EER 14 models reduces their consumption to $41.50/month — a saving of $74.66/month, payback in 18 months at typical equipment cost.",
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
                "Use the actual nameplate wattage (input power, not output cooling capacity) if it is printed on the AC unit or in the manual — it is more accurate than calculating from BTU/EER. The BTU/EER method gives a theoretical value; nameplate input watts give the real-world consumption figure.",
                "For inverter ACs, the rated wattage is the maximum (compressor at full speed). Actual average consumption is typically 40–70% of rated input, depending on ambient temperature and thermostat setpoint. Use 60% of rated watts as a conservative average for monthly cost estimation.",
                "When sizing a generator, always use 2.5–3× the running wattage for the surge calculation. AC compressors draw 3–6× rated current at startup for 0.5–2 seconds. A generator that cannot handle this surge will stall even if its continuous rating exceeds the running load.",
                "Higher EER saves more money in hot climates with long cooling seasons. In a climate where the AC runs 6 months/year, going from EER 10 to EER 14 on a 1.5 ton unit saves approximately 400 kWh/year — worth $40–60 at typical residential electricity rates.",
                "For circuit breaker sizing, divide the running wattage by the supply voltage to get running amps, then multiply by 1.25 for the NEC continuous load factor. A 1.5 ton AC at 1,800W on 240V: 1,800 ÷ 240 = 7.5A × 1.25 = 9.4A — a 15A breaker is correct.",
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
                "Don't confuse cooling capacity (BTU/h or tons) with power consumption (watts or kW). They are related through EER but are not the same thing. A 1.5 ton AC does not consume 1.5 kW — it consumes 1,500–2,250W depending on efficiency, while delivering 18,000 BTU/h of cooling.",
                "Don't use SEER directly in the BTU/EER formula without converting. SEER is a seasonal average always higher than EER. Using SEER instead of EER in the Power = BTU/EER formula will underestimate peak wattage. For generator and circuit sizing, always use EER or convert: EER ≈ SEER × 0.875.",
                "Don't undersize a generator by using only running watts. The startup surge of an AC compressor can trip a generator sized only to its running load. Always apply a 2.5–3× surge multiplier when selecting backup power equipment.",
                "Don't assume a bigger AC cools faster. An oversized AC cycles on and off too quickly, failing to dehumidify the room properly and wearing out the compressor faster. Use the room sizing mode to select the correct capacity, not the largest available.",
                "Don't calculate monthly cost from the nameplate BTU rating alone. That rating is the cooling output, not the electrical input. You need the EER to convert BTU/h to watts, then multiply by operating hours and electricity rate. Skipping EER always overstates or understates the actual cost.",
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
          Who Uses This AC Power Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏠", title: "Homeowners", desc: "Estimate monthly electricity costs before buying a new AC, compare inverter vs non-inverter running costs, and decide the right tonnage for each room." },
            { icon: "⚡", title: "Electricians", desc: "Size circuits, MCBs, and backup generators for AC installations. Confirm the existing wiring gauge can handle the running and startup load." },
            { icon: "🌡️", title: "HVAC Engineers", desc: "Select equipment for commercial and residential projects, document power requirements for load schedules, and advise clients on efficiency tradeoffs." },
            { icon: "☀️", title: "Solar Installers", desc: "Size solar arrays and battery banks to offset AC loads. Calculate daily kWh consumption and required panel capacity for AC-heavy homes." },
            { icon: "🏢", title: "Facility Managers", desc: "Audit energy consumption across multiple AC units, identify inefficient equipment for replacement, and build the business case for efficiency upgrades." },
            { icon: "🛒", title: "AC Buyers", desc: "Compare the true total cost of ownership between models before purchase. Factor in running cost over 5–10 years to justify spending more on a higher-efficiency unit." },
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
