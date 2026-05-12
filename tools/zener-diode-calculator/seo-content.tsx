export default function ZenerDiodeCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Zener Diode Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Zener Diode Calculator</strong> helps you design and analyze voltage regulator circuits using Zener diodes. This free online tool calculates total current, load current, Zener current, power dissipation, and regulation status. Perfect for circuit design, prototyping, and educational purposes.
        </p>
      </section>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Zener Diode Regulator Formulas
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="font-semibold text-gray-900 mb-2">Total Current:</p>
            <div className="font-mono text-sm">I_total = (Vin - Vz) / Rs</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="font-semibold text-gray-900 mb-2">Load Current:</p>
            <div className="font-mono text-sm">I_load = Vz / RL</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="font-semibold text-gray-900 mb-2">Zener Current:</p>
            <div className="font-mono text-sm">I_zener = I_total - I_load</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="font-semibold text-gray-900 mb-2">Zener Power:</p>
            <div className="font-mono text-sm">P_zener = Vz × I_zener</div>
          </div>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How Zener Diode Voltage Regulation Works
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A Zener diode operates in reverse breakdown mode to maintain a constant voltage across the load. When the input voltage varies, the Zener diode adjusts its current to keep the output voltage stable at the Zener voltage rating.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
          <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Input voltage must be greater than Zener voltage</li>
            <li>• Zener current must be above minimum threshold (typically 5mA)</li>
            <li>• Power dissipation must not exceed Zener maximum rating</li>
            <li>• Series resistor limits current to safe levels</li>
          </ul>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Zener Voltages
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[2.4, 3.3, 3.9, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 9.1, 10, 12, 15, 18].map((voltage) => (
            <div key={voltage} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <div className="font-bold text-gray-900">{voltage}V</div>
              <div className="text-xs text-gray-600 mt-1">Standard</div>
            </div>
          ))}
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use This Calculator
        </h2>
        <ol className="space-y-2 text-gray-700">
          <li><strong>Enter Input Voltage:</strong> The unregulated DC voltage source</li>
          <li><strong>Select Zener Voltage:</strong> Choose from common values or enter custom voltage</li>
          <li><strong>Enter Series Resistor:</strong> Current-limiting resistor value</li>
          <li><strong>Enter Load:</strong> Specify load resistance or load current</li>
          <li><strong>Set Limits (Advanced):</strong> Define minimum Zener current and maximum power</li>
          <li><strong>View Results:</strong> Check regulation status, currents, and power dissipation</li>
        </ol>
      </section>

      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Design Guidelines
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Series Resistor Selection:</strong> Choose Rs to provide adequate Zener current while limiting power dissipation. Typical Zener current is 5-50mA.</p>
          <p><strong>Power Rating:</strong> Select a Zener diode with power rating at least 2× the calculated power dissipation for safety.</p>
          <p><strong>Load Regulation:</strong> Zener regulators work best with relatively constant loads. For varying loads, consider using a voltage regulator IC.</p>
          <p><strong>Input Voltage Range:</strong> Ensure input voltage stays above Zener voltage + minimum dropout (typically 2-3V) under all conditions.</p>
        </div>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h3>
        <div className="space-y-4 text-sm">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 1: 5V Regulator</p>
            <p className="text-gray-700">Input: 12V | Zener: 5.1V | Rs: 220Ω | Load: 1kΩ</p>
            <p className="text-green-700 font-semibold mt-1">Result: Stable regulation, Iz = 26.8mA, Pz = 0.137W</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 2: 3.3V Regulator</p>
            <p className="text-gray-700">Input: 9V | Zener: 3.3V | Rs: 330Ω | Load: 470Ω</p>
            <p className="text-green-700 font-semibold mt-1">Result: Stable regulation, Iz = 10.3mA, Pz = 0.034W</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 3: 12V Regulator</p>
            <p className="text-gray-700">Input: 24V | Zener: 12V | Rs: 470Ω | Load: 2.2kΩ</p>
            <p className="text-green-700 font-semibold mt-1">Result: Stable regulation, Iz = 20.1mA, Pz = 0.241W</p>
          </div>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Simple Voltage Regulation:</strong> Low-current power supplies for logic circuits</li>
          <li>✓ <strong>Reference Voltage:</strong> Stable voltage reference for analog circuits</li>
          <li>✓ <strong>Overvoltage Protection:</strong> Clamp voltage spikes in sensitive circuits</li>
          <li>✓ <strong>Voltage Shifting:</strong> Level translation in signal processing</li>
          <li>✓ <strong>Biasing Circuits:</strong> Provide stable bias voltage for transistors</li>
          <li>✓ <strong>Educational:</strong> Learn about voltage regulation and circuit design</li>
        </ul>
      </section>

      <section className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Important Safety Notes
        </h3>
        <div className="space-y-2 text-gray-700 text-sm">
          <p>⚠️ <strong>Power Dissipation:</strong> Always check that Zener power dissipation is below the maximum rating. Use adequate heatsinking if necessary.</p>
          <p>⚠️ <strong>Current Limits:</strong> Ensure Zener current stays above minimum for regulation and below maximum for safety.</p>
          <p>⚠️ <strong>Load Variations:</strong> Large load changes can affect regulation quality. Consider using a voltage regulator IC for better performance.</p>
          <p>⚠️ <strong>Resistor Wattage:</strong> Don't forget to check series resistor power dissipation and use appropriate wattage rating.</p>
        </div>
      </section>

    </div>
  );
}
