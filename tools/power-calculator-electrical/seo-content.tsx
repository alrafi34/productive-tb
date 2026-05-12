export default function PowerCalculatorElectricalSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Electrical Power Calculator
        </h2>
        <p className="mb-4">
          The Electrical Power Calculator is a fast and accurate tool for calculating electrical power, voltage, or current using the fundamental relationship P = V × I. Whether you're an electrical engineer, student, technician, or hobbyist, this calculator provides instant results with support for multiple units and real-time calculations.
        </p>
        <p>
          This calculator eliminates manual calculation errors and saves time by providing immediate results as you type. With support for various voltage, current, and power units, you can work in the units most convenient for your application.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Select Calculation Mode:</strong> Choose whether to calculate Power, Voltage, or Current</li>
          <li><strong>Enter Known Values:</strong> Input the two known values (e.g., voltage and current)</li>
          <li><strong>Select Units:</strong> Choose appropriate units for each value (V, mV, kV, A, mA, W, mW, kW)</li>
          <li><strong>View Results:</strong> The calculator updates instantly as you type</li>
          <li><strong>Use Presets:</strong> Apply common voltage presets (5V, 12V, 220V, etc.)</li>
          <li><strong>Save or Export:</strong> Save calculations to history or export as text file</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding the Power Formula
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <h3 className="font-semibold text-blue-900 mb-2">Basic Formula</h3>
          <p className="text-blue-800 font-mono text-lg mb-2">
            P = V × I
          </p>
          <p className="text-blue-800 text-sm">
            Where P = Power (Watts), V = Voltage (Volts), I = Current (Amperes)
          </p>
        </div>
        <div className="space-y-3">
          <div>
            <strong>Calculate Power:</strong> P = V × I (multiply voltage by current)
          </div>
          <div>
            <strong>Calculate Voltage:</strong> V = P / I (divide power by current)
          </div>
          <div>
            <strong>Calculate Current:</strong> I = P / V (divide power by voltage)
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Real-time Calculation:</strong> Instant results as you type</li>
          <li><strong>Multi-mode Operation:</strong> Calculate power, voltage, or current</li>
          <li><strong>Unit Conversion:</strong> Support for V, mV, kV, A, mA, W, mW, kW</li>
          <li><strong>Voltage Presets:</strong> Quick access to common voltages (USB, automotive, household)</li>
          <li><strong>Calculation History:</strong> Save and reload previous calculations</li>
          <li><strong>Export Function:</strong> Download calculations as text files</li>
          <li><strong>Copy to Clipboard:</strong> Quickly copy results</li>
          <li><strong>Input Validation:</strong> Prevents invalid entries and division by zero</li>
          <li><strong>Responsive Design:</strong> Works on desktop, tablet, and mobile</li>
          <li><strong>No Installation:</strong> Runs entirely in your browser</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Voltage Standards
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b text-left">Standard</th>
                <th className="px-4 py-2 border-b text-left">Voltage</th>
                <th className="px-4 py-2 border-b text-left">Application</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">USB</td>
                <td className="px-4 py-2 border-b">5V DC</td>
                <td className="px-4 py-2 border-b">USB devices, phone charging</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Automotive</td>
                <td className="px-4 py-2 border-b">12V DC</td>
                <td className="px-4 py-2 border-b">Car electrical systems</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Industrial</td>
                <td className="px-4 py-2 border-b">24V DC</td>
                <td className="px-4 py-2 border-b">Industrial control systems</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">US Standard</td>
                <td className="px-4 py-2 border-b">110-120V AC</td>
                <td className="px-4 py-2 border-b">North American household</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">EU Standard</td>
                <td className="px-4 py-2 border-b">220-230V AC</td>
                <td className="px-4 py-2 border-b">European household</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">UK Standard</td>
                <td className="px-4 py-2 border-b">230-240V AC</td>
                <td className="px-4 py-2 border-b">UK household</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Practical Examples
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: LED Light</h3>
            <p className="text-sm mb-2">Calculate power consumption of an LED running at 5V with 0.02A current:</p>
            <p className="text-sm font-mono">P = 5V × 0.02A = 0.1W (100mW)</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Household Appliance</h3>
            <p className="text-sm mb-2">Calculate current draw of a 2200W heater on 220V:</p>
            <p className="text-sm font-mono">I = 2200W / 220V = 10A</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: Car Battery</h3>
            <p className="text-sm mb-2">Calculate voltage needed for 60W headlight drawing 5A:</p>
            <p className="text-sm font-mono">V = 60W / 5A = 12V</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Unit Conversions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Voltage</h3>
            <ul className="text-sm space-y-1">
              <li>1 kV = 1,000 V</li>
              <li>1 V = 1,000 mV</li>
              <li>1 kV = 1,000,000 mV</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Current</h3>
            <ul className="text-sm space-y-1">
              <li>1 A = 1,000 mA</li>
              <li>1 mA = 0.001 A</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Power</h3>
            <ul className="text-sm space-y-1">
              <li>1 kW = 1,000 W</li>
              <li>1 W = 1,000 mW</li>
              <li>1 kW = 1,000,000 mW</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What is the difference between AC and DC power?
            </h3>
            <p className="text-sm">
              AC (Alternating Current) changes direction periodically, while DC (Direct Current) flows in one direction. The formula P = V × I applies to both, but AC calculations may require additional considerations for power factor.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I use this calculator for three-phase power?
            </h3>
            <p className="text-sm">
              This calculator is designed for single-phase power calculations. Three-phase power requires different formulas that account for phase relationships.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Why do I get an error when dividing by zero?
            </h3>
            <p className="text-sm">
              Division by zero is mathematically undefined. When calculating voltage (V = P / I), current cannot be zero. When calculating current (I = P / V), voltage cannot be zero.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How accurate are the calculations?
            </h3>
            <p className="text-sm">
              The calculator performs exact mathematical calculations. Results are displayed with up to 4 decimal places for precision. Real-world measurements may vary due to meter accuracy and environmental factors.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What's the relationship between this and Ohm's Law?
            </h3>
            <p className="text-sm">
              This calculator uses P = V × I. Ohm's Law (V = I × R) relates voltage, current, and resistance. Combined, these formulas allow you to calculate power when resistance is known: P = I²R or P = V²/R.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Safety Considerations
        </h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Always follow electrical safety guidelines</strong> when working with electricity</li>
            <li><strong>Turn off power</strong> before working on electrical circuits</li>
            <li><strong>Use proper tools</strong> and personal protective equipment</li>
            <li><strong>Verify calculations</strong> with appropriate measuring instruments</li>
            <li><strong>Consult professionals</strong> for high-voltage or high-power applications</li>
            <li><strong>Follow local codes</strong> and regulations for electrical work</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Professional Applications
        </h2>
        <div className="space-y-3">
          <div>
            <strong>Electrical Engineers:</strong> Quick calculations for circuit design and analysis
          </div>
          <div>
            <strong>Electricians:</strong> Verify power requirements and circuit capacity
          </div>
          <div>
            <strong>Electronics Technicians:</strong> Calculate component ratings and power dissipation
          </div>
          <div>
            <strong>Students:</strong> Learn and verify electrical concepts and homework problems
          </div>
          <div>
            <strong>DIY Enthusiasts:</strong> Plan projects and select appropriate components
          </div>
          <div>
            <strong>Educators:</strong> Demonstrate electrical principles in classroom settings
          </div>
        </div>
      </section>

      <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Calculate Electrical Power Instantly
        </h2>
        <p className="text-gray-700">
          Use our free Electrical Power Calculator to quickly calculate power, voltage, or current using P = V × I. Get instant results with unit conversion, presets, and calculation history. Perfect for engineers, students, and technicians!
        </p>
      </section>
    </div>
  );
}
