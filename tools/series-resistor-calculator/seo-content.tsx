export default function SeriesResistorCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is a Series Resistor Calculator?
        </h2>
        <p className="mb-4">
          A <strong>Series Resistor Calculator</strong> is a tool that calculates the total resistance of resistors connected in series. In a series circuit, resistors are connected end-to-end, and the total resistance is simply the sum of all individual resistances.
        </p>
        <p>
          This calculator is essential for electronics students, electrical engineers, hobbyists working with Arduino and IoT projects, repair technicians, and educators who need to quickly verify circuit designs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Series Resistance Formula
        </h2>
        <p className="mb-4">
          The formula for calculating total resistance in a series circuit is:
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="font-mono text-center text-lg">
            <strong>R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + ... + R<sub>n</sub></strong>
          </p>
        </div>
        <p className="mb-4">
          Where:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>R<sub>total</sub></strong> is the total resistance in the series circuit</li>
          <li><strong>R<sub>1</sub>, R<sub>2</sub>, R<sub>3</sub>, ..., R<sub>n</sub></strong> are the individual resistor values</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Three Resistors</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> R<sub>1</sub> = 100Ω, R<sub>2</sub> = 220Ω, R<sub>3</sub> = 330Ω
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Formula:</strong> R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub>
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> R<sub>total</sub> = 100 + 220 + 330 = 650Ω
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 650Ω or 0.65kΩ
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Kilo-ohm Resistors</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> R<sub>1</sub> = 1kΩ, R<sub>2</sub> = 2kΩ, R<sub>3</sub> = 3kΩ
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> R<sub>total</sub> = 1 + 2 + 3 = 6kΩ
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 6kΩ or 6000Ω
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: Mixed Values</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> R<sub>1</sub> = 10Ω, R<sub>2</sub> = 0Ω (wire), R<sub>3</sub> = 5Ω
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> R<sub>total</sub> = 10 + 0 + 5 = 15Ω
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 15Ω
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Series Circuits
        </h2>
        <p className="mb-4">
          In a <strong>series circuit</strong>, components are connected in a single path, so the same current flows through all components. Key characteristics include:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Same Current:</strong> The current is the same through all resistors</li>
          <li><strong>Voltage Divides:</strong> The total voltage is divided across the resistors</li>
          <li><strong>Resistance Adds:</strong> Total resistance increases with each added resistor</li>
          <li><strong>Single Path:</strong> If one component fails, the entire circuit breaks</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Resistance Units
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Unit</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Symbol</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Value in Ohms</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Common Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Ohm</td>
                <td className="border border-gray-300 px-4 py-2">Ω</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Low resistance values</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Kilo-ohm</td>
                <td className="border border-gray-300 px-4 py-2">kΩ</td>
                <td className="border border-gray-300 px-4 py-2">1,000</td>
                <td className="border border-gray-300 px-4 py-2">Medium resistance values</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Mega-ohm</td>
                <td className="border border-gray-300 px-4 py-2">MΩ</td>
                <td className="border border-gray-300 px-4 py-2">1,000,000</td>
                <td className="border border-gray-300 px-4 py-2">High resistance values</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Resistor Values (E12 Series)
        </h2>
        <p className="mb-4">
          Standard resistor values follow the E12 series (12 values per decade):
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82].map(value => (
            <div key={value} className="bg-gray-100 border border-gray-300 rounded p-2 text-center text-sm font-mono">
              {value}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          These values are multiplied by powers of 10 (e.g., 10Ω, 100Ω, 1kΩ, 10kΩ, 100kΩ, 1MΩ)
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use This Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Add Resistors:</strong> Click "Add Resistor" to add input fields for each resistor</li>
          <li><strong>Enter Values:</strong> Input the resistance value and select the unit (Ω, kΩ, or MΩ)</li>
          <li><strong>Bulk Input (Optional):</strong> Use the bulk input field to paste multiple values separated by commas or newlines</li>
          <li><strong>View Results:</strong> The total resistance is calculated instantly as you type</li>
          <li><strong>Convert Units:</strong> See the result in different units automatically</li>
          <li><strong>Copy or Export:</strong> Save your calculation for future reference</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Series vs Parallel Resistors
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Aspect</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Series</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Parallel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Formula</td>
                <td className="border border-gray-300 px-4 py-2">R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub></td>
                <td className="border border-gray-300 px-4 py-2">1/R<sub>total</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + 1/R<sub>3</sub></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Current</td>
                <td className="border border-gray-300 px-4 py-2">Same through all</td>
                <td className="border border-gray-300 px-4 py-2">Divides among branches</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Voltage</td>
                <td className="border border-gray-300 px-4 py-2">Divides across resistors</td>
                <td className="border border-gray-300 px-4 py-2">Same across all</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Total Resistance</td>
                <td className="border border-gray-300 px-4 py-2">Increases</td>
                <td className="border border-gray-300 px-4 py-2">Decreases</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Instant Results:</strong> Calculate total resistance in real-time</li>
          <li><strong>Multiple Resistors:</strong> Add as many resistors as needed</li>
          <li><strong>Unit Conversion:</strong> Automatic conversion between Ω, kΩ, and MΩ</li>
          <li><strong>Bulk Input:</strong> Paste multiple values at once</li>
          <li><strong>No Installation:</strong> Works entirely in your browser</li>
          <li><strong>History Tracking:</strong> Save and review past calculations</li>
          <li><strong>Educational:</strong> Perfect for learning electronics</li>
          <li><strong>Professional:</strong> Quick calculations for circuit design</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Applications of Series Resistors
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Voltage Dividers:</strong> Creating specific voltage levels</li>
          <li><strong>Current Limiting:</strong> Protecting LEDs and other components</li>
          <li><strong>Biasing Circuits:</strong> Setting operating points for transistors</li>
          <li><strong>Pull-up/Pull-down Resistors:</strong> Digital logic circuits</li>
          <li><strong>Sensor Circuits:</strong> Thermistors and photoresistors</li>
          <li><strong>Filter Circuits:</strong> RC and RL filters</li>
          <li><strong>Timing Circuits:</strong> 555 timer and oscillator circuits</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What happens when resistors are connected in series?</h3>
            <p className="text-gray-700">
              When resistors are connected in series, the total resistance increases. The same current flows through all resistors, but the voltage is divided across them proportionally to their resistance values.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How do I read resistor color codes?</h3>
            <p className="text-gray-700">
              Resistor color codes use colored bands to indicate resistance values. The first two bands represent digits, the third is a multiplier, and the fourth (if present) is tolerance. Use a resistor color code calculator for easy decoding.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I mix different unit values?</h3>
            <p className="text-gray-700">
              Yes! This calculator automatically converts all values to a common unit before calculating. You can enter some resistors in Ω, others in kΩ, and the calculator will handle the conversion.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What if one resistor is much larger than the others?</h3>
            <p className="text-gray-700">
              In a series circuit, the largest resistor dominates the total resistance. If one resistor is significantly larger, it will determine most of the circuit's behavior.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How accurate is this calculator?</h3>
            <p className="text-gray-700">
              This calculator provides mathematically accurate results based on the formula R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + ... However, real-world resistors have tolerances (typically ±5% or ±1%), so actual measured values may vary slightly.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Who Should Use This Calculator?
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Students:</strong> Learning electronics and circuit theory</li>
          <li><strong>Engineers:</strong> Designing and analyzing electronic circuits</li>
          <li><strong>Hobbyists:</strong> Building Arduino, Raspberry Pi, and IoT projects</li>
          <li><strong>Technicians:</strong> Troubleshooting and repairing electronic equipment</li>
          <li><strong>Teachers:</strong> Demonstrating series circuit calculations in class</li>
          <li><strong>Makers:</strong> Prototyping and testing circuit designs</li>
        </ul>
      </section>
    </div>
  );
}
