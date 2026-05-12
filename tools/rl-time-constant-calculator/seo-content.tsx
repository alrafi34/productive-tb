export default function RLTimeConstantCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is RL Time Constant?
        </h2>
        <p className="mb-4">
          The RL time constant (τ, tau) is a fundamental parameter in resistor-inductor (RL) circuits 
          that determines how quickly current rises or decays through an inductor. It is calculated 
          using the formula: <strong>τ = L / R</strong>, where L is inductance in henries and R is 
          resistance in ohms.
        </p>
        <p>
          The time constant represents the time required for the current in an RL circuit to reach 
          approximately 63.2% of its final value when rising, or to decay to 36.8% of its initial 
          value when falling. After 5 time constants (5τ), the current is considered to have reached 
          its steady state at 99.3%.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          RL Time Constant Formula
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <p className="text-center text-xl font-mono font-bold text-blue-900 mb-2">
            τ = L / R
          </p>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Where:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>τ (tau) = Time constant in seconds</li>
              <li>L = Inductance in henries (H)</li>
              <li>R = Resistance in ohms (Ω)</li>
            </ul>
          </div>
        </div>
        <p>
          For current rise: I(t) = I₀ × (1 - e^(-t/τ))<br />
          For current decay: I(t) = I₀ × e^(-t/τ)
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Calculate RL Time Constant
        </h2>
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li>
            <strong>Identify the inductance value</strong> - Measure or determine the inductance 
            in your circuit (in H, mH, or µH)
          </li>
          <li>
            <strong>Identify the resistance value</strong> - Find the total series resistance 
            (in Ω, kΩ, or MΩ)
          </li>
          <li>
            <strong>Convert to base units</strong> - Convert inductance to henries and resistance 
            to ohms if necessary
          </li>
          <li>
            <strong>Divide L by R</strong> - Calculate the quotient to get the time constant 
            in seconds
          </li>
          <li>
            <strong>Interpret the result</strong> - Use the time constant to determine current 
            rise and decay times
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Current Rise and Decay Percentages
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Current Rise (%)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Current Decay (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">1τ</td>
                <td className="border border-gray-300 px-4 py-2">63.2%</td>
                <td className="border border-gray-300 px-4 py-2">36.8%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">2τ</td>
                <td className="border border-gray-300 px-4 py-2">86.5%</td>
                <td className="border border-gray-300 px-4 py-2">13.5%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">3τ</td>
                <td className="border border-gray-300 px-4 py-2">95.0%</td>
                <td className="border border-gray-300 px-4 py-2">5.0%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">4τ</td>
                <td className="border border-gray-300 px-4 py-2">98.2%</td>
                <td className="border border-gray-300 px-4 py-2">1.8%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">5τ</td>
                <td className="border border-gray-300 px-4 py-2">99.3%</td>
                <td className="border border-gray-300 px-4 py-2">0.7%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications of RL Circuits
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Power supply filters</strong> - Smoothing DC power supplies and reducing ripple</li>
          <li><strong>Inductive loads</strong> - Motors, solenoids, and relay coils</li>
          <li><strong>RF circuits</strong> - Tuning circuits and impedance matching</li>
          <li><strong>Energy storage</strong> - Storing energy in magnetic fields</li>
          <li><strong>Current limiting</strong> - Controlling inrush current in circuits</li>
          <li><strong>Delay circuits</strong> - Creating time delays in switching applications</li>
          <li><strong>Snubber circuits</strong> - Protecting switches from voltage spikes</li>
          <li><strong>Transformers</strong> - Understanding leakage inductance effects</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Standard RL Filter</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> L = 10 mH, R = 100 Ω
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              L = 10 mH = 0.01 H<br />
              R = 100 Ω<br />
              τ = 0.01 / 100 = 0.0001 seconds = 0.1 ms
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Time constant = 0.1 ms
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Motor Winding</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> L = 500 mH, R = 5 Ω
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              L = 500 mH = 0.5 H<br />
              R = 5 Ω<br />
              τ = 0.5 / 5 = 0.1 seconds = 100 ms
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Time constant = 100 ms
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: RF Circuit</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> L = 100 µH, R = 50 Ω
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              L = 100 µH = 0.0001 H<br />
              R = 50 Ω<br />
              τ = 0.0001 / 50 = 0.000002 seconds = 2 µs
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Time constant = 2 µs
            </p>
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
              What does the RL time constant represent?
            </h3>
            <p className="text-gray-700">
              The RL time constant (τ) represents the time it takes for current in an inductor to 
              rise to 63.2% of its final value or decay to 36.8% of its initial value through a 
              resistor. It's a measure of how fast the circuit responds to changes in voltage.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How long does it take for current to reach steady state?
            </h3>
            <p className="text-gray-700">
              Current in an RL circuit is considered to have reached steady state after approximately 
              5 time constants (5τ), at which point it reaches 99.3% of its final value. Theoretically, 
              it takes infinite time to reach 100%, but 5τ is the practical standard.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What happens if I increase the inductance in an RL circuit?
            </h3>
            <p className="text-gray-700">
              Increasing the inductance increases the time constant, making the current rise and decay 
              more slowly. This is because a larger inductor stores more magnetic energy and resists 
              changes in current more strongly.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What happens if I increase the resistance?
            </h3>
            <p className="text-gray-700">
              Increasing the resistance decreases the time constant, resulting in faster current rise 
              and decay. Higher resistance means more energy is dissipated as heat, allowing the 
              magnetic field to build up or collapse more quickly.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What's the difference between RC and RL time constants?
            </h3>
            <p className="text-gray-700">
              RC time constant (τ = RC) applies to resistor-capacitor circuits and describes voltage 
              changes across a capacitor. RL time constant (τ = L/R) applies to resistor-inductor 
              circuits and describes current changes through an inductor. RC uses multiplication while 
              RL uses division.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Why is the RL time constant important in circuit design?
            </h3>
            <p className="text-gray-700">
              The time constant is crucial for understanding transient behavior in inductive circuits, 
              designing filters, controlling motor startup characteristics, and protecting circuits 
              from voltage spikes. It helps engineers predict how quickly current will change when 
              voltage is applied or removed.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips for Using the RL Time Constant Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Always ensure your inductance and resistance values are positive numbers</li>
          <li>Use the unit dropdowns to avoid manual conversion errors</li>
          <li>Check the current rise/decay times table to understand circuit behavior</li>
          <li>Use presets for common circuit configurations to save time</li>
          <li>Save your calculations to history for future reference</li>
          <li>Export results for documentation and sharing with team members</li>
          <li>Remember that 5τ is the standard for "steady state" current</li>
          <li>Consider the DC resistance of real inductors in your calculations</li>
          <li>Account for component tolerances when designing circuits</li>
          <li>Use smaller time constants for faster response in switching applications</li>
        </ul>
      </section>
    </div>
  );
}
