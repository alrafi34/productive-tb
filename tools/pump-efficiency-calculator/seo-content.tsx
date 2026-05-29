export default function PumpEfficiencyCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Pump Efficiency?</h2>
          <p className="text-gray-700 leading-relaxed">
            Pump efficiency is the ratio of hydraulic power delivered to the fluid versus the mechanical
            power input to the pump shaft, expressed as a percentage. It measures how effectively a pump
            converts input energy into useful fluid energy. A pump with 70% efficiency transfers 70% of
            the input power to the fluid, while 30% is lost as heat, friction, and mechanical losses.
            Pump efficiency is a critical metric for energy audits, system design, and operational cost
            optimization in water supply, HVAC, industrial, and agricultural systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pump Efficiency Formula</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Efficiency Formula</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">η (%) = (P_hydraulic / P_input) × 100</p>
              <p className="text-sm text-blue-700">
                Where P_hydraulic is the useful power delivered to the fluid and P_input is the shaft
                power supplied to the pump.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Hydraulic Power Formula</h3>
              <p className="text-green-800 font-mono text-lg mb-2">P_hyd (W) = ρ × g × Q × H</p>
              <p className="text-sm text-green-700">
                ρ = fluid density (kg/m³), g = 9.81 m/s², Q = flow rate (m³/s), H = pump head (m).
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Worked Example</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Given:</strong> Q = 100 m³/h, H = 20 m, P_in = 8 kW, ρ = 1000 kg/m³</p>
                <p><strong>Step 1:</strong> Q = 100 / 3600 = 0.02778 m³/s</p>
                <p><strong>Step 2:</strong> P_hyd = 1000 × 9.81 × 0.02778 × 20 = 5,450 W = 5.45 kW</p>
                <p><strong>Step 3:</strong> η = (5450 / 8000) × 100 = <strong>68.1%</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pump Efficiency Ratings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Application</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm">≥ 80%</td><td className="px-4 py-3 text-sm text-green-600 font-semibold">Excellent</td><td className="px-4 py-3 text-sm text-gray-600">Large centrifugal pumps, optimized systems</td></tr>
                <tr><td className="px-4 py-3 text-sm">60–80%</td><td className="px-4 py-3 text-sm text-blue-600 font-semibold">Good</td><td className="px-4 py-3 text-sm text-gray-600">Industrial pumps, water supply, HVAC</td></tr>
                <tr><td className="px-4 py-3 text-sm">40–60%</td><td className="px-4 py-3 text-sm text-yellow-600 font-semibold">Fair</td><td className="px-4 py-3 text-sm text-gray-600">Older pumps, off-design operation</td></tr>
                <tr><td className="px-4 py-3 text-sm">&lt; 40%</td><td className="px-4 py-3 text-sm text-red-600 font-semibold">Poor</td><td className="px-4 py-3 text-sm text-gray-600">Worn pumps, severe misapplication</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Pump Efficiency</h2>
          <div className="space-y-3 text-gray-700">
            {[
              { title: "Operating Point vs. BEP", body: "Pumps are most efficient at their Best Efficiency Point (BEP). Operating far from BEP — either at very low or very high flow — significantly reduces efficiency and increases wear." },
              { title: "Pump Size and Type", body: "Larger centrifugal pumps generally achieve higher efficiencies (80–90%) than small pumps (50–70%). Positive displacement pumps can reach 85–95% efficiency but are suited for different applications." },
              { title: "Impeller Condition", body: "Worn, corroded, or damaged impellers reduce hydraulic efficiency by 5–15%. Regular inspection and replacement of worn impellers restores performance." },
              { title: "Fluid Viscosity", body: "High-viscosity fluids (oils, slurries) reduce pump efficiency compared to water. Viscosity correction factors must be applied when pumping fluids other than water." },
              { title: "System Resistance", body: "Poorly designed piping with excessive bends, undersized pipes, or partially closed valves increases system resistance, forcing the pump to operate away from its BEP." },
              { title: "Mechanical Losses", body: "Bearing friction, seal drag, and coupling losses account for 2–5% of input power. Proper lubrication and alignment minimize these losses." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">•</span>
                <div><strong>{item.title}:</strong> {item.body}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What is a good pump efficiency?",
                a: "For centrifugal pumps, 70–85% is considered good efficiency. Large, well-designed pumps can reach 88–92%. Small pumps (below 5 kW) typically achieve 50–70%. Efficiency above 80% is excellent for most industrial applications.",
              },
              {
                q: "How do I improve pump efficiency?",
                a: "Operate the pump near its Best Efficiency Point (BEP), trim or replace worn impellers, reduce unnecessary pipe fittings and bends, use variable speed drives (VFDs) to match flow demand, and ensure proper alignment and lubrication.",
              },
              {
                q: "What is the difference between pump efficiency and motor efficiency?",
                a: "Pump efficiency measures how well the pump converts shaft power to hydraulic power. Motor efficiency measures how well the motor converts electrical power to shaft power. Overall system efficiency = pump efficiency × motor efficiency.",
              },
              {
                q: "Why does pump efficiency matter for energy costs?",
                a: "A pump running at 60% efficiency instead of 80% consumes 33% more energy for the same output. For a 50 kW pump running 8,000 hours/year at $0.12/kWh, that difference costs over $8,000 annually.",
              },
              {
                q: "What units does this calculator support?",
                a: "The calculator supports both metric (m³/s, m³/h, L/s, L/min, meters, kW) and imperial (GPM, ft³/s, feet, horsepower) unit systems. All conversions are handled automatically.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-gray-900 mb-1">{item.q}</h3>
                <p className="text-sm text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            Always compare your calculated efficiency against the pump manufacturer&apos;s performance curve at
            the actual operating flow rate and head. If your measured efficiency is more than 5–10% below
            the curve value, it indicates wear, cavitation, or system issues that need attention. Installing
            a variable frequency drive (VFD) on pumps that run at partial load can recover 20–40% of energy
            costs by matching pump speed to actual demand.
          </p>
        </section>

      </div>
    </div>
  );
}
