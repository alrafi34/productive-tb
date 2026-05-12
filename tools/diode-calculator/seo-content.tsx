export default function DiodeCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Diode Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Diode Calculator</strong> helps you analyze diode behavior in circuits by calculating voltage drop, current flow, and required resistor values. This free online tool supports silicon, germanium, Schottky diodes, and LEDs, making it perfect for circuit design, analysis, and troubleshooting.
        </p>
      </section>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Diode Circuit Formulas
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="font-semibold text-gray-900 mb-2">Current Calculation:</p>
            <div className="font-mono text-sm">I = (Vs - Vf) / R</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="font-semibold text-gray-900 mb-2">Resistor Calculation:</p>
            <div className="font-mono text-sm">R = (Vs - Vf) / I</div>
          </div>
        </div>
        <p className="text-gray-700 text-sm mt-4">
          Where Vs = Supply Voltage, Vf = Forward Voltage, R = Resistance, I = Current
        </p>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Diode Types & Forward Voltages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Silicon Diode</h4>
            <p className="text-sm text-gray-700">Forward Voltage: ~0.7V</p>
            <p className="text-xs text-gray-600 mt-1">Most common type (1N4001, 1N4007)</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Germanium Diode</h4>
            <p className="text-sm text-gray-700">Forward Voltage: ~0.3V</p>
            <p className="text-xs text-gray-600 mt-1">Lower voltage drop (1N34A)</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Schottky Diode</h4>
            <p className="text-sm text-gray-700">Forward Voltage: ~0.3V</p>
            <p className="text-xs text-gray-600 mt-1">Fast switching (1N5817, 1N5819)</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">LED</h4>
            <p className="text-sm text-gray-700">Forward Voltage: 1.8-3.4V</p>
            <p className="text-xs text-gray-600 mt-1">Depends on color (red ~2V, blue/white ~3.2V)</p>
          </div>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use This Calculator
        </h2>
        <ol className="space-y-2 text-gray-700">
          <li><strong>Select Calculation Mode:</strong> Choose what you want to calculate (current, resistor, or voltage drop)</li>
          <li><strong>Enter Supply Voltage:</strong> The voltage source powering your circuit</li>
          <li><strong>Enter Forward Voltage:</strong> Use presets for common diode types or enter custom value</li>
          <li><strong>Enter Additional Parameters:</strong> Resistor value (for current) or desired current (for resistor)</li>
          <li><strong>View Results:</strong> Get instant calculations with step-by-step breakdown</li>
        </ol>
      </section>

      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Important Notes
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Forward voltage:</strong> The voltage drop across a diode when it's conducting. This is approximately constant for a given diode type.</p>
          <p><strong>Reverse bias:</strong> This calculator assumes forward-biased operation. In reverse bias, diodes block current (except for small leakage).</p>
          <p><strong>Power dissipation:</strong> Always use a resistor with adequate power rating (at least 2× calculated power).</p>
          <p><strong>Temperature effects:</strong> Forward voltage decreases slightly with temperature (~-2mV/°C for silicon).</p>
        </div>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h3>
        <div className="space-y-4 text-sm">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 1: Calculate Current</p>
            <p className="text-gray-700">Supply: 5V | Diode: 0.7V (Silicon) | Resistor: 1kΩ</p>
            <p className="text-green-700 font-semibold mt-1">Result: 4.3 mA</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 2: Calculate Resistor for LED</p>
            <p className="text-gray-700">Supply: 12V | LED: 2V | Desired Current: 20mA</p>
            <p className="text-green-700 font-semibold mt-1">Result: 500Ω → 510Ω standard (0.25W)</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 3: Voltage Drop Analysis</p>
            <p className="text-gray-700">Supply: 9V | Diode: 0.7V (Silicon)</p>
            <p className="text-green-700 font-semibold mt-1">Result: 0.7V drop, 8.3V remaining</p>
          </div>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>LED Circuits:</strong> Calculate current-limiting resistors for LED indicators</li>
          <li>✓ <strong>Rectifier Circuits:</strong> Analyze voltage drops in AC-to-DC conversion</li>
          <li>✓ <strong>Protection Circuits:</strong> Design reverse polarity and overvoltage protection</li>
          <li>✓ <strong>Signal Processing:</strong> Calculate parameters for clipping and clamping circuits</li>
          <li>✓ <strong>Power Supplies:</strong> Analyze diode behavior in voltage regulators</li>
          <li>✓ <strong>Educational:</strong> Learn about diode characteristics and circuit analysis</li>
        </ul>
      </section>

    </div>
  );
}
