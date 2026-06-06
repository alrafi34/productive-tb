export default function ThermalEfficiencyCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Thermal Efficiency Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Thermal Efficiency Calculator is a professional engineering tool for calculating how effectively a thermodynamic system converts heat energy into useful work. It supports three calculation modes: Basic Thermal Efficiency, Carnot Efficiency, and Engine Efficiency — covering the most common scenarios in mechanical and thermodynamic engineering.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Whether you are analyzing a steam turbine, evaluating a heat engine, studying the Carnot cycle, or assessing an internal combustion engine, this tool delivers instant, accurate results with step-by-step formula breakdowns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thermal Efficiency Formulas</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Basic Thermal Efficiency</h3>
              <code className="text-sm text-gray-700">η = (Useful Output / Heat Input) × 100</code>
              <p className="text-sm text-gray-600 mt-2">
                The fundamental formula for any heat engine. Useful output is the work done by the system; heat input is the total thermal energy supplied.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Carnot Efficiency</h3>
              <code className="text-sm text-gray-700">η = (1 − Tc / Th) × 100</code>
              <p className="text-sm text-gray-600 mt-2">
                The theoretical maximum efficiency for any heat engine operating between two temperature reservoirs. Th is the hot reservoir temperature and Tc is the cold reservoir temperature, both in Kelvin.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Engine Efficiency</h3>
              <code className="text-sm text-gray-700">η = (Power Output / Fuel Energy Input) × 100</code>
              <p className="text-sm text-gray-600 mt-2">
                Used for internal combustion engines, turbines, and power plants. Compares mechanical power output to the rate of fuel energy consumption.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Example 1 — Basic Thermal Efficiency</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Given:</strong> Useful Output = 400 kJ, Heat Input = 1000 kJ</p>
                <p><strong>Calculation:</strong> η = (400 / 1000) × 100 = <strong>40%</strong></p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Example 2 — Carnot Efficiency</h3>
              <div className="text-sm text-green-800 space-y-1">
                <p><strong>Given:</strong> Th = 900 K, Tc = 300 K</p>
                <p><strong>Calculation:</strong> η = (1 − 300/900) × 100 = <strong>66.67%</strong></p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Example 3 — Engine Efficiency</h3>
              <div className="text-sm text-purple-800 space-y-1">
                <p><strong>Given:</strong> Power Output = 1200 W, Fuel Input = 3000 W</p>
                <p><strong>Calculation:</strong> η = (1200 / 3000) × 100 = <strong>40%</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Efficiency Reference Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">System</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Efficiency</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ["Carnot Engine (ideal)", "Up to 67%", "Theoretical maximum — never achieved in practice"],
                  ["Combined Cycle Power Plant", "55–60%", "Best real-world thermal efficiency"],
                  ["Steam Turbine (modern)", "40–45%", "Large utility-scale plants"],
                  ["Gas Turbine", "30–40%", "Simple cycle gas turbines"],
                  ["Diesel Engine", "35–45%", "Heavy-duty diesel engines"],
                  ["Gasoline Engine", "20–35%", "Typical automotive engines"],
                  ["Steam Engine (old)", "5–15%", "Early industrial steam engines"],
                ].map(([sys, eff, note]) => (
                  <tr key={sys}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{sys}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{eff}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Power Plant Analysis", color: "blue", desc: "Evaluate steam and gas turbine cycles, compare plant designs, and identify efficiency improvement opportunities." },
              { title: "Automotive Engineering", color: "green", desc: "Analyze internal combustion engine performance, compare fuel types, and optimize engine design parameters." },
              { title: "Thermodynamics Education", color: "purple", desc: "Visualize Carnot cycle limits, understand second law constraints, and solve textbook problems step by step." },
              { title: "Industrial Boilers", color: "orange", desc: "Assess boiler efficiency, calculate heat losses, and evaluate fuel utilization in industrial heating systems." },
              { title: "Refrigeration & HVAC", color: "red", desc: "Analyze heat pump cycles, calculate COP, and evaluate cooling system performance against Carnot limits." },
              { title: "Renewable Energy", color: "yellow", desc: "Evaluate solar thermal systems, geothermal plants, and ocean thermal energy conversion efficiency." },
            ].map(({ title, color, desc }) => (
              <div key={title} className={`bg-${color}-50 rounded-lg p-4`}>
                <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
                <p className={`text-sm text-${color}-800`}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          <ol className="space-y-3 text-gray-700">
            {[
              ["Select Calculation Mode", "Choose Basic Thermal Efficiency, Carnot Efficiency, or Engine Efficiency based on your application."],
              ["Enter Input Values", "Fill in the required fields. Use the quick presets for common engineering scenarios."],
              ["Select Units", "Choose the appropriate energy or power units. For Carnot mode, select Kelvin or Celsius."],
              ["View Results", "The calculator updates instantly as you type, showing efficiency percentage and rating."],
              ["Review Steps", "Expand the Calculation Steps panel to see the full formula breakdown."],
              ["Export or Share", "Download a TXT report or copy a shareable URL with your inputs pre-filled."],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-start">
                <span className="font-semibold text-primary mr-2">{i + 1}.</span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              ["What is thermal efficiency?", "Thermal efficiency measures how well a heat engine converts thermal energy into useful work. It is expressed as a percentage — a 40% efficient engine converts 40% of its heat input into work and rejects the remaining 60% as waste heat."],
              ["Why can't thermal efficiency reach 100%?", "The second law of thermodynamics prohibits 100% efficiency. All real heat engines must reject some heat to a cold reservoir. The Carnot efficiency sets the theoretical upper limit for any engine operating between two given temperatures."],
              ["What is Carnot efficiency?", "Carnot efficiency is the maximum possible efficiency for a heat engine operating between a hot reservoir at temperature Th and a cold reservoir at Tc (both in Kelvin): η = (1 − Tc/Th) × 100. Real engines always fall below this limit due to irreversibilities."],
              ["What units should I use for Carnot calculations?", "Temperatures must be in absolute units (Kelvin) for the Carnot formula to work correctly. This calculator automatically converts Celsius to Kelvin when you select the °C option."],
              ["How do I improve thermal efficiency?", "Increase the hot reservoir temperature, decrease the cold reservoir temperature, reduce friction and heat losses, use regenerative heat exchangers, and optimize the thermodynamic cycle design."],
            ].map(([q, a]) => (
              <div key={q as string}>
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-700">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
