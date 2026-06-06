import React from "react";

export default function IdealGasLawCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is the Ideal Gas Law?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>Ideal Gas Law</strong> is a fundamental equation in chemistry and physics that
            describes the relationship between pressure, volume, temperature, and the amount of an ideal
            gas. The equation is expressed as <strong>PV = nRT</strong>, where P is pressure, V is volume,
            n is the number of moles, R is the universal gas constant, and T is absolute temperature.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The gas constant R equals <strong>8.314472 J/(mol·K)</strong> in SI units. This law combines
            Boyle's Law (P ∝ 1/V at constant T), Charles's Law (V ∝ T at constant P), and Avogadro's Law
            (V ∝ n at constant P and T) into a single unified equation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            While real gases deviate from ideal behavior at very high pressures or very low temperatures,
            the Ideal Gas Law provides excellent approximations for most engineering and scientific
            calculations under standard conditions.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the variable you want to solve for (P, V, n, or T)",
                "Enter the three known values in their respective fields",
                "Select the appropriate unit for each input",
                "The result updates instantly as you type",
                "View the formula, substitution, and step-by-step breakdown",
                "Copy, save, or export the result as needed",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Solve for any of the four variables: P, V, n, or T",
                "Real-time calculation as you type",
                "6 pressure units: Pa, kPa, bar, atm, psi, mmHg",
                "4 volume units: m³, L, mL, ft³",
                "3 temperature units: K, °C, °F",
                "Automatic SI unit conversion",
                "Scientific notation for very large/small values",
                "Formula visualization with substitution",
                "Calculation history with localStorage",
                "Export results as TXT file",
                "Gas presets for common scenarios",
              ].map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Formula Variants
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { var: "P", formula: "P = nRT / V", desc: "Solve for pressure when volume, moles, and temperature are known.", color: "blue" },
            { var: "V", formula: "V = nRT / P", desc: "Solve for volume when pressure, moles, and temperature are known.", color: "green" },
            { var: "n", formula: "n = PV / RT", desc: "Solve for moles when pressure, volume, and temperature are known.", color: "orange" },
            { var: "T", formula: "T = PV / nR", desc: "Solve for temperature when pressure, volume, and moles are known.", color: "purple" },
          ].map(({ var: v, formula, desc, color }) => (
            <div key={v} className={`p-5 bg-${color}-50 border border-${color}-200 rounded-lg`}>
              <div className={`font-mono text-lg font-bold text-${color}-800 mb-2`}>{formula}</div>
              <p className={`text-sm text-${color}-700`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Solving For</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Known Values</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Result</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Temperature (T)", "P=2 atm, V=10 L, n=0.5 mol", "T = 487.3 K", "Above room temperature"],
                ["Pressure (P)", "V=5 L, n=2 mol, T=300 K", "P = 9.84 atm", "High pressure scenario"],
                ["Volume (V)", "P=1 atm, n=1 mol, T=273.15 K", "V = 22.4 L", "STP — molar volume"],
                ["Moles (n)", "P=101.325 kPa, V=1 L, T=298 K", "n = 0.0409 mol", "Room temperature, 1 L"],
                ["Pressure (P)", "V=22.4 L, n=1 mol, T=273.15 K", "P = 1.000 atm", "Validates STP"],
                ["Temperature (T)", "P=1 atm, V=11.2 L, n=0.5 mol", "T = 273.15 K", "Half molar volume at STP"],
              ].map(([solving, known, result, notes]) => (
                <tr key={solving + known} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{solving}</td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-700">{known}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-gray-900">{result}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Unit Conversion Reference
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Pressure Units</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-600">Unit</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-600">Equivalent in Pa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["1 atm", "101,325 Pa"],
                    ["1 bar", "100,000 Pa"],
                    ["1 kPa", "1,000 Pa"],
                    ["1 psi", "6,894.76 Pa"],
                    ["1 mmHg", "133.322 Pa"],
                  ].map(([unit, eq]) => (
                    <tr key={unit} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-mono font-medium">{unit}</td>
                      <td className="py-2 px-3 font-mono text-gray-600">{eq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Temperature Conversions</h3>
            <div className="space-y-2 text-sm">
              {[
                ["°C to K", "K = °C + 273.15"],
                ["°F to K", "K = (°F − 32) × 5/9 + 273.15"],
                ["K to °C", "°C = K − 273.15"],
                ["K to °F", "°F = (K − 273.15) × 9/5 + 32"],
                ["Absolute zero", "0 K = −273.15 °C = −459.67 °F"],
              ].map(([label, formula]) => (
                <div key={label} className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{label}</span>
                  <span className="font-mono text-gray-600">{formula}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🧪", title: "Chemistry Labs",      color: "blue",   desc: "Calculate gas volumes, pressures, and moles in stoichiometry and reaction analysis." },
            { icon: "⚙️", title: "Mechanical Eng.",     color: "green",  desc: "Analyze compressed air systems, pneumatic actuators, and gas-powered machinery." },
            { icon: "🌡️", title: "Thermodynamics",      color: "orange", desc: "Model heat engines, refrigeration cycles, and thermodynamic processes." },
            { icon: "✈️", title: "Aerospace",           color: "purple", desc: "Cabin pressurization, fuel systems, and atmospheric modeling at altitude." },
            { icon: "🏭", title: "Chemical Processing", color: "red",    desc: "Reactor design, gas storage tanks, and industrial process optimization." },
            { icon: "🎓", title: "Education",           color: "gray",   desc: "Core concept in chemistry, physics, and engineering courses worldwide." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-5`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${color}-800`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is the Ideal Gas Law formula?",
              a: "PV = nRT, where P is pressure (Pa), V is volume (m³), n is amount of substance (mol), R is the universal gas constant (8.314472 J/mol·K), and T is absolute temperature (K).",
            },
            {
              q: "What is the value of the gas constant R?",
              a: "R = 8.314472 J/(mol·K) in SI units. This is equivalent to 0.08206 L·atm/(mol·K) or 8.314 Pa·m³/(mol·K). This calculator uses the SI value and converts all inputs accordingly.",
            },
            {
              q: "Why must temperature be in Kelvin?",
              a: "The Ideal Gas Law requires absolute temperature. Kelvin starts at absolute zero (0 K = −273.15 °C), ensuring temperature is always positive. This calculator automatically converts Celsius and Fahrenheit to Kelvin before calculating.",
            },
            {
              q: "What is Standard Temperature and Pressure (STP)?",
              a: "STP is defined as 0 °C (273.15 K) and 1 atm (101.325 kPa). At STP, one mole of an ideal gas occupies exactly 22.414 liters — the molar volume. You can verify this using the calculator.",
            },
            {
              q: "When does the Ideal Gas Law break down?",
              a: "The Ideal Gas Law assumes no intermolecular forces and negligible molecular volume. It becomes less accurate at very high pressures (above ~10 atm), very low temperatures (near condensation), or for polar gases. For such cases, the van der Waals equation is more appropriate.",
            },
            {
              q: "Can I use this for mixtures of gases?",
              a: "Yes, using Dalton's Law of Partial Pressures. Each gas in a mixture behaves independently. Calculate each component separately using its partial pressure and mole count, then sum the results.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
