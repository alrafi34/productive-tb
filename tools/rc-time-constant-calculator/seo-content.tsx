export default function RCTimeConstantCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is RC Time Constant?
        </h2>
        <p className="mb-4">
          The RC time constant (τ, tau) is a fundamental parameter in resistor-capacitor (RC) circuits 
          that determines how quickly a capacitor charges or discharges through a resistor. It is 
          calculated using the simple formula: <strong>τ = R × C</strong>, where R is resistance in 
          ohms and C is capacitance in farads.
        </p>
        <p>
          The time constant represents the time required for the voltage across a charging capacitor 
          to reach approximately 63.2% of its final value, or for a discharging capacitor to fall to 
          36.8% of its initial value. After 5 time constants (5τ), the capacitor is considered fully 
          charged or discharged at 99.3%.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          RC Time Constant Formula
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <p className="text-center text-xl font-mono font-bold text-blue-900 mb-2">
            τ = R × C
          </p>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Where:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>τ (tau) = Time constant in seconds</li>
              <li>R = Resistance in ohms (Ω)</li>
              <li>C = Capacitance in farads (F)</li>
            </ul>
          </div>
        </div>
        <p>
          For charging: V(t) = V₀ × (1 - e^(-t/τ))<br />
          For discharging: V(t) = V₀ × e^(-t/τ)
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Calculate RC Time Constant
        </h2>
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li>
            <strong>Identify the resistance value</strong> - Measure or determine the resistance 
            in your circuit (in ohms, kΩ, or MΩ)
          </li>
          <li>
            <strong>Identify the capacitance value</strong> - Find the capacitance rating 
            (in F, mF, µF, nF, or pF)
          </li>
          <li>
            <strong>Convert to base units</strong> - Convert resistance to ohms and capacitance 
            to farads if necessary
          </li>
          <li>
            <strong>Multiply R × C</strong> - Calculate the product to get the time constant 
            in seconds
          </li>
          <li>
            <strong>Interpret the result</strong> - Use the time constant to determine charging 
            and discharging times
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Charging and Discharging Percentages
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Charging (%)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Discharging (%)</th>
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
          Common Applications of RC Circuits
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Timing circuits</strong> - Creating delays and pulse generation</li>
          <li><strong>Filters</strong> - Low-pass, high-pass, and band-pass filters</li>
          <li><strong>Signal coupling</strong> - AC coupling in audio and communication circuits</li>
          <li><strong>Power supply smoothing</strong> - Reducing ripple in DC power supplies</li>
          <li><strong>Oscillators</strong> - Generating periodic waveforms</li>
          <li><strong>Integrators and differentiators</strong> - Signal processing applications</li>
          <li><strong>Flash photography</strong> - Charging flash capacitors</li>
          <li><strong>Touch sensors</strong> - Capacitive sensing applications</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Standard RC Filter</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> R = 10 kΩ, C = 10 µF
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              R = 10 kΩ = 10,000 Ω<br />
              C = 10 µF = 0.00001 F<br />
              τ = 10,000 × 0.00001 = 0.1 seconds = 100 ms
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Time constant = 100 ms
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Fast Response Circuit</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> R = 1 kΩ, C = 1 µF
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              R = 1 kΩ = 1,000 Ω<br />
              C = 1 µF = 0.000001 F<br />
              τ = 1,000 × 0.000001 = 0.001 seconds = 1 ms
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Time constant = 1 ms
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: Power Supply Filter</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> R = 100 Ω, C = 1000 µF
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              R = 100 Ω<br />
              C = 1000 µF = 0.001 F<br />
              τ = 100 × 0.001 = 0.1 seconds = 100 ms
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Time constant = 100 ms
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
              What does the RC time constant represent?
            </h3>
            <p className="text-gray-700">
              The RC time constant (τ) represents the time it takes for a capacitor to charge to 
              63.2% of the supply voltage or discharge to 36.8% of its initial voltage through a 
              resistor. It's a measure of how fast the circuit responds to voltage changes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How long does it take for a capacitor to fully charge?
            </h3>
            <p className="text-gray-700">
              A capacitor is considered fully charged after approximately 5 time constants (5τ), 
              at which point it reaches 99.3% of the supply voltage. Theoretically, it takes 
              infinite time to reach 100%, but 5τ is the practical standard.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What happens if I increase the resistance in an RC circuit?
            </h3>
            <p className="text-gray-700">
              Increasing the resistance increases the time constant, making the capacitor charge 
              and discharge more slowly. This is useful for creating longer delays or slower 
              response times in timing circuits.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What happens if I increase the capacitance?
            </h3>
            <p className="text-gray-700">
              Increasing the capacitance also increases the time constant, resulting in slower 
              charging and discharging. Larger capacitors store more charge and take longer to 
              reach a given voltage level.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I use this calculator for RL circuits?
            </h3>
            <p className="text-gray-700">
              No, this calculator is specifically for RC (resistor-capacitor) circuits. RL 
              (resistor-inductor) circuits have a different time constant formula: τ = L/R, 
              where L is inductance in henries. Use an RL time constant calculator for those circuits.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Why is the time constant important in circuit design?
            </h3>
            <p className="text-gray-700">
              The time constant is crucial for designing filters, timing circuits, and signal 
              processing applications. It determines the frequency response of filters, the delay 
              in timing circuits, and the transient response of systems. Understanding τ helps 
              engineers predict and control circuit behavior.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips for Using the RC Time Constant Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Always ensure your resistance and capacitance values are positive numbers</li>
          <li>Use the unit dropdowns to avoid manual conversion errors</li>
          <li>Check the charging/discharging times table to understand circuit behavior</li>
          <li>Use presets for common circuit configurations to save time</li>
          <li>Save your calculations to history for future reference</li>
          <li>Export results for documentation and sharing with team members</li>
          <li>Remember that 5τ is the standard for "fully charged" or "fully discharged"</li>
          <li>Consider tolerance of real components when designing circuits</li>
        </ul>
      </section>
    </div>
  );
}
