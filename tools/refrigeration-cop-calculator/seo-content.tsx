export default function RefrigerationCOPCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Refrigeration COP Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Refrigeration COP Calculator is a professional engineering tool for determining the Coefficient of Performance (COP) of refrigeration and air conditioning systems. COP is a dimensionless ratio that measures how efficiently a system transfers heat compared to the work it consumes — a higher COP means better energy efficiency.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            This calculator supports two methods: the Basic COP formula using actual cooling effect and power input values, and the Carnot COP formula for computing the theoretical maximum efficiency based on reservoir temperatures. Both methods support multiple engineering units including Watts, kW, BTU/hr, TR, HP, Celsius, Fahrenheit, and Kelvin.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Refrigeration COP Formulas</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Basic Refrigeration COP</h3>
              <code className="text-sm text-gray-700">COP = Q_cooling / W_input</code>
              <p className="text-sm text-gray-600 mt-2">
                The fundamental formula for any refrigeration system. Q_cooling is the heat removed from the refrigerated space (in Watts), and W_input is the compressor or electrical power consumed. A COP of 5 means the system removes 5 J of heat for every 1 J of electrical energy used.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Carnot Refrigeration COP</h3>
              <code className="text-sm text-gray-700">COP_Carnot = T_c / (T_h − T_c)</code>
              <p className="text-sm text-gray-600 mt-2">
                The theoretical maximum COP for any refrigeration system operating between a cold reservoir at T_c (Kelvin) and a hot reservoir at T_h (Kelvin). Real systems always achieve a lower COP than the Carnot ideal due to irreversibilities such as friction, heat transfer across finite temperature differences, and compressor losses.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Example 1 — Basic COP</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Given:</strong> Cooling Effect = 5,000 W, Power Input = 1,000 W</p>
                <p><strong>Calculation:</strong> COP = 5000 / 1000 = <strong>5.00</strong></p>
                <p><strong>Meaning:</strong> 5 units of cooling are delivered per unit of electrical energy consumed.</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Example 2 — Carnot COP</h3>
              <div className="text-sm text-green-800 space-y-1">
                <p><strong>Given:</strong> T_cold = 5 °C = 278.15 K, T_hot = 35 °C = 308.15 K</p>
                <p><strong>Calculation:</strong> COP = 278.15 / (308.15 − 278.15) = 278.15 / 30 = <strong>9.27</strong></p>
                <p><strong>Meaning:</strong> The theoretical maximum COP for this system is 9.27.</p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Example 3 — Unit Conversion (TR)</h3>
              <div className="text-sm text-purple-800 space-y-1">
                <p><strong>Given:</strong> Cooling Effect = 2 TR, Compressor Power = 2 kW</p>
                <p><strong>Conversion:</strong> 2 TR = 7,033.7 W, 2 kW = 2,000 W</p>
                <p><strong>Calculation:</strong> COP = 7033.7 / 2000 = <strong>3.52</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Typical COP Values for Common Systems</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">System</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical COP</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ["Carnot Refrigerator (5°C → 35°C)", "~9.3", "Theoretical maximum — never achieved"],
                  ["Modern Air Conditioner (HVAC)", "3.0 – 6.0", "Split AC systems, EER-rated units"],
                  ["Household Refrigerator", "1.5 – 3.0", "Standard kitchen refrigerators"],
                  ["Commercial Cold Storage", "2.0 – 4.0", "Industrial refrigeration units"],
                  ["Heat Pump (Heating Mode)", "3.0 – 5.0", "Air-source heat pumps in mild climates"],
                  ["Industrial Chiller", "4.0 – 7.0", "Centrifugal and screw chiller systems"],
                  ["Cryogenic Refrigerator", "0.1 – 0.5", "Very low temperatures near absolute zero"],
                ].map(([sys, cop, note]) => (
                  <tr key={sys as string}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{sys}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{cop}</td>
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
              { title: "HVAC System Design", color: "blue", desc: "Evaluate air conditioning systems during design, compare unit options, and verify energy efficiency compliance." },
              { title: "Cold Storage Optimization", color: "green", desc: "Assess refrigeration performance in food storage, pharmaceutical, and industrial cold room applications." },
              { title: "Energy Auditing", color: "purple", desc: "Measure actual COP against nameplate values to identify degraded performance and maintenance needs." },
              { title: "Engineering Education", color: "orange", desc: "Solve thermodynamics problems, verify textbook examples, and explore Carnot cycle theory interactively." },
              { title: "System Benchmarking", color: "red", desc: "Compare COP against Carnot ideal to quantify system irreversibilities and set improvement targets." },
              { title: "Renewable & Heat Pump Systems", color: "yellow", desc: "Evaluate ground-source and air-source heat pump efficiency across seasonal temperature ranges." },
            ].map(({ title, color, desc }) => (
              <div key={title} className={`bg-${color}-50 rounded-lg p-4`}>
                <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
                <p className={`text-sm text-${color}-800`}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Calculator</h2>
          <ol className="space-y-3 text-gray-700">
            {[
              ["Select Calculation Method", "Choose Basic COP for actual system measurements, or Carnot COP for the theoretical maximum based on operating temperatures."],
              ["Enter Input Values", "For Basic COP, enter cooling effect and power input. For Carnot COP, enter the cold and hot reservoir temperatures."],
              ["Select Units", "Use the unit dropdowns to match your data — Watts, kW, BTU/hr, TR, HP for power; °C, °F, or K for temperatures."],
              ["View Instant Results", "The COP updates in real-time as you type. The result card shows COP, rating, and a normalized breakdown."],
              ["Review Calculation Steps", "Expand the Calculation Steps section to see the full step-by-step formula substitution."],
              ["Export or Save", "Download a TXT summary or save the calculation to history for comparison with other system configurations."],
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
              [
                "What is COP in refrigeration?",
                "COP (Coefficient of Performance) is the ratio of the useful cooling effect produced by a refrigeration system to the work input required. A COP of 4 means 4 units of heat are removed for every 1 unit of electrical energy consumed. Unlike thermal efficiency, COP can exceed 1.",
              ],
              [
                "What is a good COP for a refrigeration system?",
                "A COP above 4 is generally considered high efficiency for refrigeration systems. Modern air conditioners typically achieve COP values between 3 and 6. Industrial chillers can reach 6–7. Household refrigerators typically range from 1.5 to 3.",
              ],
              [
                "What is Carnot COP and why does it matter?",
                "The Carnot COP is the theoretical maximum achievable COP for any refrigeration system operating between two temperature reservoirs. It depends only on the absolute temperatures: COP_Carnot = T_c / (T_h − T_c). Real systems always fall below this limit due to friction, heat transfer losses, and compressor inefficiencies. Comparing your actual COP to Carnot COP tells you how close your system is to the thermodynamic ideal.",
              ],
              [
                "What units can this calculator handle?",
                "For the Basic COP method, cooling effect can be entered in Watts (W), kilowatts (kW), BTU/hr, or Tons of Refrigeration (TR). Power input supports Watts (W), kilowatts (kW), or horsepower (HP). For the Carnot method, temperatures can be entered in Celsius (°C), Fahrenheit (°F), or Kelvin (K) — all are automatically converted to Kelvin for the calculation.",
              ],
              [
                "How is COP related to EER and SEER?",
                "EER (Energy Efficiency Ratio) is measured in BTU/hr per Watt. To convert EER to COP: COP = EER / 3.412. SEER (Seasonal Energy Efficiency Ratio) is a seasonal average of EER. A system with SEER 16 has an approximate average COP of 4.7.",
              ],
              [
                "Can COP be greater than 1?",
                "Yes — unlike thermal efficiency which is always less than 100%, COP for a refrigeration system can and typically does exceed 1. This is because the refrigerant moves heat from a cold to hot reservoir using a relatively small amount of work. A COP of 5 means the system delivers 5× more cooling energy than it consumes as work.",
              ],
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
