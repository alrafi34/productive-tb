export default function LEDResistorCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About LED Resistor Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>LED Resistor Calculator</strong> helps you determine the correct current-limiting resistor value for LED circuits. LEDs require a resistor to prevent damage from excessive current. This free online tool calculates the exact resistor value, suggests standard resistor values, and recommends the appropriate power rating.
        </p>
      </section>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          LED Resistor Formula
        </h3>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-4">
          R = (Vs - Vf × N) / I
        </div>
        <p className="text-gray-700 text-sm mb-2">
          Where:
        </p>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>• R = Resistance in Ohms (Ω)</li>
          <li>• Vs = Supply Voltage</li>
          <li>• Vf = LED Forward Voltage</li>
          <li>• N = Number of LEDs in series</li>
          <li>• I = LED Current in Amperes</li>
        </ul>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common LED Forward Voltages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">Red LED</h4>
            <p className="text-sm text-red-800">Forward Voltage: 1.8-2.2V (typical 2.0V)</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Green LED</h4>
            <p className="text-sm text-green-800">Forward Voltage: 2.0-2.2V (typical 2.1V)</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Yellow LED</h4>
            <p className="text-sm text-yellow-800">Forward Voltage: 2.0-2.2V (typical 2.1V)</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Blue/White LED</h4>
            <p className="text-sm text-blue-800">Forward Voltage: 3.0-3.4V (typical 3.2V)</p>
          </div>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use This Calculator
        </h2>
        <ol className="space-y-2 text-gray-700">
          <li><strong>Enter Supply Voltage:</strong> The voltage source powering your circuit (e.g., 5V, 9V, 12V)</li>
          <li><strong>Enter LED Forward Voltage:</strong> Check LED datasheet or use presets for common colors</li>
          <li><strong>Enter LED Current:</strong> Typical values are 10-20mA for standard LEDs</li>
          <li><strong>Set Number of LEDs:</strong> If connecting multiple LEDs in series</li>
          <li><strong>View Results:</strong> Get exact and standard resistor values with power rating</li>
        </ol>
      </section>

      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Important Safety Notes
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Always use a resistor:</strong> Never connect an LED directly to a power source without a current-limiting resistor.</p>
          <p><strong>Power rating:</strong> Use a resistor with at least 2× the calculated power dissipation for safety and longevity.</p>
          <p><strong>Check polarity:</strong> LEDs are polarized - connect the longer leg (anode) to positive and shorter leg (cathode) to negative.</p>
          <p><strong>Heat dissipation:</strong> If the resistor gets hot, use a higher wattage rating or reduce the current.</p>
        </div>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h3>
        <div className="space-y-4 text-sm">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 1: Red LED with 5V Supply</p>
            <p className="text-gray-700">Supply: 5V | LED: 2.0V @ 20mA</p>
            <p className="text-green-700 font-semibold mt-1">Result: 150Ω resistor (0.25W)</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 2: White LED with 9V Supply</p>
            <p className="text-gray-700">Supply: 9V | LED: 3.2V @ 20mA</p>
            <p className="text-green-700 font-semibold mt-1">Result: 290Ω → 330Ω resistor (0.25W)</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 3: Two Red LEDs in Series with 12V</p>
            <p className="text-gray-700">Supply: 12V | 2× LEDs: 2.0V @ 20mA</p>
            <p className="text-green-700 font-semibold mt-1">Result: 400Ω → 390Ω resistor (0.25W)</p>
          </div>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Arduino Projects:</strong> Calculate resistors for LED indicators and displays</li>
          <li>✓ <strong>Raspberry Pi:</strong> Connect LEDs to GPIO pins safely</li>
          <li>✓ <strong>DIY Electronics:</strong> Build custom LED circuits and lighting projects</li>
          <li>✓ <strong>Automotive:</strong> Add LED indicators and accent lighting</li>
          <li>✓ <strong>Home Automation:</strong> Create LED status indicators for smart devices</li>
          <li>✓ <strong>Educational:</strong> Learn about Ohm's Law and LED circuits</li>
        </ul>
      </section>

    </div>
  );
}
