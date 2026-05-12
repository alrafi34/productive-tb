export default function CapacitorCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is a Capacitor Calculator?
        </h2>
        <p className="mb-4">
          A <strong>Capacitor Calculator</strong> is an educational and engineering tool that helps you calculate electrical properties of capacitors including capacitance, charge, voltage, and stored energy. Using fundamental capacitor formulas, this calculator provides instant results with step-by-step explanations.
        </p>
        <p>
          This tool is essential for electrical engineering students, physics learners, circuit designers, electronics hobbyists, and professionals who need quick and accurate capacitor calculations.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Capacitor Formulas
        </h2>
        <p className="mb-4">
          The calculator uses these fundamental capacitor equations:
        </p>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Charge Formula</h3>
            <p className="font-mono text-center text-lg mb-2">
              <strong>Q = C × V</strong>
            </p>
            <p className="text-sm text-blue-800">
              Where Q is charge (Coulombs), C is capacitance (Farads), and V is voltage (Volts)
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Capacitance Formula</h3>
            <p className="font-mono text-center text-lg mb-2">
              <strong>C = Q ÷ V</strong>
            </p>
            <p className="text-sm text-green-800">
              Calculate capacitance when you know charge and voltage
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Voltage Formula</h3>
            <p className="font-mono text-center text-lg mb-2">
              <strong>V = Q ÷ C</strong>
            </p>
            <p className="text-sm text-purple-800">
              Calculate voltage when you know charge and capacitance
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-2">Energy Formula</h3>
            <p className="font-mono text-center text-lg mb-2">
              <strong>E = ½ × C × V²</strong>
            </p>
            <p className="text-sm text-orange-800">
              Calculate energy stored in a capacitor (Joules)
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Calculate Charge</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> Capacitance = 10µF, Voltage = 5V
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Formula:</strong> Q = C × V
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> Q = 0.00001 F × 5 V = 0.00005 C
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 50 µC (microcoulombs)
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Calculate Capacitance</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> Charge = 0.002C, Voltage = 10V
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Formula:</strong> C = Q ÷ V
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> C = 0.002 C ÷ 10 V = 0.0002 F
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 200 µF (microfarads)
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: Calculate Energy</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> Capacitance = 100µF, Voltage = 12V
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Formula:</strong> E = ½ × C × V²
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> E = 0.5 × 0.0001 F × (12 V)² = 0.0072 J
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 7.2 mJ (millijoules)
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Capacitor Units
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Property</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Symbol</th>
                <th className="border border-gray-300 px-4 py-2 text-left">SI Unit</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Common Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Capacitance</td>
                <td className="border border-gray-300 px-4 py-2">C</td>
                <td className="border border-gray-300 px-4 py-2">Farad (F)</td>
                <td className="border border-gray-300 px-4 py-2">µF, nF, pF</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Charge</td>
                <td className="border border-gray-300 px-4 py-2">Q</td>
                <td className="border border-gray-300 px-4 py-2">Coulomb (C)</td>
                <td className="border border-gray-300 px-4 py-2">µC, nC, mC</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Voltage</td>
                <td className="border border-gray-300 px-4 py-2">V</td>
                <td className="border border-gray-300 px-4 py-2">Volt (V)</td>
                <td className="border border-gray-300 px-4 py-2">V, mV, kV</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Energy</td>
                <td className="border border-gray-300 px-4 py-2">E</td>
                <td className="border border-gray-300 px-4 py-2">Joule (J)</td>
                <td className="border border-gray-300 px-4 py-2">J, mJ, µJ</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-700">
            <strong>Unit Prefixes:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-700">
            <li>p (pico) = 10⁻¹² = 0.000000000001</li>
            <li>n (nano) = 10⁻⁹ = 0.000000001</li>
            <li>µ (micro) = 10⁻⁶ = 0.000001</li>
            <li>m (milli) = 10⁻³ = 0.001</li>
            <li>k (kilo) = 10³ = 1000</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use This Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Select Calculation Mode:</strong> Choose what you want to calculate (Charge, Capacitance, Voltage, or Energy)</li>
          <li><strong>Enter Known Values:</strong> Input the values you know with appropriate units</li>
          <li><strong>View Results:</strong> The calculator instantly shows the result with step-by-step calculations</li>
          <li><strong>Check Conversions:</strong> See the result in multiple units for convenience</li>
          <li><strong>Copy or Export:</strong> Save your calculation for future reference</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Capacitor Values
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Typical Range</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Common Uses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Ceramic</td>
                <td className="border border-gray-300 px-4 py-2">1pF - 1µF</td>
                <td className="border border-gray-300 px-4 py-2">High-frequency circuits, decoupling</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Electrolytic</td>
                <td className="border border-gray-300 px-4 py-2">1µF - 10,000µF</td>
                <td className="border border-gray-300 px-4 py-2">Power supplies, audio circuits</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Film</td>
                <td className="border border-gray-300 px-4 py-2">100pF - 10µF</td>
                <td className="border border-gray-300 px-4 py-2">Precision circuits, audio</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Tantalum</td>
                <td className="border border-gray-300 px-4 py-2">0.1µF - 1000µF</td>
                <td className="border border-gray-300 px-4 py-2">Compact designs, portable devices</td>
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
          <li><strong>Instant Results:</strong> Get calculations in real-time as you type</li>
          <li><strong>Multiple Modes:</strong> Calculate charge, capacitance, voltage, or energy</li>
          <li><strong>Unit Conversion:</strong> Automatic conversion between different units</li>
          <li><strong>Step-by-Step:</strong> See detailed calculation steps for learning</li>
          <li><strong>Educational:</strong> Perfect for students learning electronics</li>
          <li><strong>Professional:</strong> Quick calculations for circuit design</li>
          <li><strong>No Installation:</strong> Works entirely in your browser</li>
          <li><strong>History Tracking:</strong> Save and review past calculations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is a capacitor?</h3>
            <p className="text-gray-700">
              A capacitor is an electronic component that stores electrical energy in an electric field. It consists of two conductive plates separated by an insulating material (dielectric).
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is capacitance?</h3>
            <p className="text-gray-700">
              Capacitance is the ability of a capacitor to store electric charge. It is measured in Farads (F), though practical capacitors are usually measured in microfarads (µF), nanofarads (nF), or picofarads (pF).
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How do I read capacitor values?</h3>
            <p className="text-gray-700">
              Capacitor values are often marked on the component. For example, "104" means 10 × 10⁴ pF = 100,000 pF = 100 nF = 0.1 µF. The first two digits are the value, and the third is the multiplier (number of zeros).
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is the difference between charge and capacitance?</h3>
            <p className="text-gray-700">
              Capacitance (C) is the capacity to store charge, measured in Farads. Charge (Q) is the actual amount of electrical charge stored, measured in Coulombs. They are related by Q = C × V.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How much energy can a capacitor store?</h3>
            <p className="text-gray-700">
              The energy stored in a capacitor is calculated using E = ½CV². For example, a 100µF capacitor charged to 12V stores 0.0072 Joules (7.2 millijoules) of energy.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I use this calculator for supercapacitors?</h3>
            <p className="text-gray-700">
              Yes! The formulas work for all types of capacitors, including supercapacitors (ultracapacitors). Just use the appropriate capacitance value, which can be several Farads for supercapacitors.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Applications of Capacitors
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Power Supply Filtering:</strong> Smoothing voltage in DC power supplies</li>
          <li><strong>Energy Storage:</strong> Storing energy for flash photography, defibrillators</li>
          <li><strong>Signal Coupling:</strong> Passing AC signals while blocking DC</li>
          <li><strong>Timing Circuits:</strong> Creating time delays with RC circuits</li>
          <li><strong>Motor Starting:</strong> Providing starting torque for AC motors</li>
          <li><strong>Noise Suppression:</strong> Filtering out electrical noise</li>
          <li><strong>Tuning Circuits:</strong> Selecting specific frequencies in radios</li>
          <li><strong>Power Factor Correction:</strong> Improving efficiency in AC systems</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Who Should Use This Calculator?
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Students:</strong> Learning electrical engineering and physics concepts</li>
          <li><strong>Engineers:</strong> Designing and analyzing electronic circuits</li>
          <li><strong>Hobbyists:</strong> Building DIY electronics projects</li>
          <li><strong>Technicians:</strong> Troubleshooting and repairing electronic equipment</li>
          <li><strong>Teachers:</strong> Demonstrating capacitor calculations in class</li>
          <li><strong>Researchers:</strong> Quick calculations for experimental setups</li>
        </ul>
      </section>
    </div>
  );
}
