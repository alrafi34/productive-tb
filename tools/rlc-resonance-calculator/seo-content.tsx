export default function RLCResonanceCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is RLC Resonance?
        </h2>
        <p className="mb-4">
          RLC resonance occurs in circuits containing a resistor (R), inductor (L), and capacitor (C) 
          when the inductive reactance and capacitive reactance are equal in magnitude but opposite in 
          phase. At the resonant frequency, these reactances cancel each other out, leaving only the 
          resistance to oppose current flow.
        </p>
        <p>
          The resonant frequency is calculated using the formula: <strong>f₀ = 1 / (2π√LC)</strong>, 
          where f₀ is in hertz, L is inductance in henries, and C is capacitance in farads. This 
          frequency is fundamental in radio tuning, filters, oscillators, and many other electronic 
          applications.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          RLC Resonance Formula
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <p className="text-center text-xl font-mono font-bold text-blue-900 mb-2">
            f₀ = 1 / (2π √(LC))
          </p>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Where:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>f₀ = Resonant frequency in hertz (Hz)</li>
              <li>L = Inductance in henries (H)</li>
              <li>C = Capacitance in farads (F)</li>
              <li>π = Pi (approximately 3.14159)</li>
            </ul>
          </div>
        </div>
        <p className="mb-2">
          <strong>Additional formulas:</strong>
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Quality Factor: Q = (1/R) × √(L/C)</li>
          <li>Bandwidth: BW = f₀ / Q</li>
          <li>Impedance at resonance (series): Z = R</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Calculate RLC Resonant Frequency
        </h2>
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li>
            <strong>Identify the inductance value</strong> - Measure or determine the inductance 
            in your circuit (in H, mH, or µH)
          </li>
          <li>
            <strong>Identify the capacitance value</strong> - Find the capacitance rating 
            (in F, mF, µF, nF, or pF)
          </li>
          <li>
            <strong>Convert to base units</strong> - Convert inductance to henries and capacitance 
            to farads if necessary
          </li>
          <li>
            <strong>Multiply L × C</strong> - Calculate the product of inductance and capacitance
          </li>
          <li>
            <strong>Take the square root</strong> - Calculate √(LC)
          </li>
          <li>
            <strong>Multiply by 2π</strong> - Calculate 2π√(LC)
          </li>
          <li>
            <strong>Take the reciprocal</strong> - Calculate 1 / (2π√(LC)) to get the frequency in Hz
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Series vs Parallel RLC Circuits
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Characteristic</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Series RLC</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Parallel RLC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Resonant Frequency</td>
                <td className="border border-gray-300 px-4 py-2">f₀ = 1/(2π√LC)</td>
                <td className="border border-gray-300 px-4 py-2">f₀ = 1/(2π√LC)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Impedance at Resonance</td>
                <td className="border border-gray-300 px-4 py-2">Minimum (Z = R)</td>
                <td className="border border-gray-300 px-4 py-2">Maximum</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Current at Resonance</td>
                <td className="border border-gray-300 px-4 py-2">Maximum</td>
                <td className="border border-gray-300 px-4 py-2">Minimum</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Phase Angle</td>
                <td className="border border-gray-300 px-4 py-2">0° (in phase)</td>
                <td className="border border-gray-300 px-4 py-2">0° (in phase)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Power Factor</td>
                <td className="border border-gray-300 px-4 py-2">1 (unity)</td>
                <td className="border border-gray-300 px-4 py-2">1 (unity)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications of RLC Circuits
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Radio tuning</strong> - Selecting specific frequencies in AM/FM receivers</li>
          <li><strong>Bandpass filters</strong> - Allowing specific frequency ranges to pass</li>
          <li><strong>Bandstop filters</strong> - Blocking specific frequency ranges (notch filters)</li>
          <li><strong>Oscillators</strong> - Generating periodic waveforms at specific frequencies</li>
          <li><strong>Impedance matching</strong> - Maximizing power transfer between circuits</li>
          <li><strong>Signal processing</strong> - Filtering and shaping electrical signals</li>
          <li><strong>Wireless communication</strong> - Antenna tuning and RF circuits</li>
          <li><strong>Power factor correction</strong> - Improving efficiency in AC power systems</li>
          <li><strong>Audio equalizers</strong> - Adjusting specific frequency bands</li>
          <li><strong>Induction heating</strong> - Operating at resonant frequency for efficiency</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Audio Filter (159 Hz)</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> R = 10 Ω, L = 10 mH, C = 100 µF
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              L = 10 mH = 0.01 H<br />
              C = 100 µF = 0.0001 F<br />
              LC = 0.01 × 0.0001 = 0.000001<br />
              √(LC) = 0.001<br />
              2π√(LC) = 2 × 3.14159 × 0.001 = 0.006283<br />
              f₀ = 1 / 0.006283 ≈ 159.15 Hz
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Resonant frequency = 159.15 Hz
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: RF Circuit (5 kHz)</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> R = 5 Ω, L = 1 mH, C = 1 µF
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              L = 1 mH = 0.001 H<br />
              C = 1 µF = 0.000001 F<br />
              LC = 0.001 × 0.000001 = 0.000000001<br />
              √(LC) = 0.0000316<br />
              2π√(LC) = 0.0001987<br />
              f₀ = 1 / 0.0001987 ≈ 5032.92 Hz ≈ 5.03 kHz
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Resonant frequency = 5.03 kHz
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: High Frequency Circuit (1.59 MHz)</h3>
            <p className="text-sm mb-2">
              <strong>Given:</strong> R = 50 Ω, L = 10 µH, C = 1 nF
            </p>
            <p className="text-sm mb-2">
              <strong>Calculation:</strong><br />
              L = 10 µH = 0.00001 H<br />
              C = 1 nF = 0.000000001 F<br />
              LC = 0.00001 × 0.000000001 = 1e-14<br />
              √(LC) = 1e-7<br />
              2π√(LC) = 6.283e-7<br />
              f₀ = 1 / 6.283e-7 ≈ 1,591,549 Hz ≈ 1.59 MHz
            </p>
            <p className="text-sm">
              <strong>Result:</strong> Resonant frequency = 1.59 MHz
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Quality Factor (Q)
        </h2>
        <p className="mb-4">
          The quality factor (Q) is a dimensionless parameter that describes how underdamped an 
          oscillator or resonator is. It characterizes the bandwidth relative to the center frequency.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="font-semibold mb-2">Q = (1/R) × √(L/C)</p>
          <p className="text-sm">Or equivalently: Q = f₀ / BW</p>
        </div>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>High Q (Q &gt; 10):</strong> Sharp resonance, narrow bandwidth, low energy loss</li>
          <li><strong>Medium Q (1 &lt; Q &lt; 10):</strong> Moderate selectivity, balanced response</li>
          <li><strong>Low Q (Q &lt; 1):</strong> Broad resonance, wide bandwidth, high damping</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What is resonant frequency in an RLC circuit?
            </h3>
            <p className="text-gray-700">
              Resonant frequency is the frequency at which the inductive reactance (XL) equals the 
              capacitive reactance (XC), causing them to cancel out. At this frequency, the circuit 
              impedance is purely resistive, and the circuit can oscillate with maximum amplitude 
              for a given input.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Why does resistance not affect the resonant frequency?
            </h3>
            <p className="text-gray-700">
              The resonant frequency depends only on the energy storage elements (L and C), not on 
              the energy dissipation element (R). Resistance affects the sharpness of resonance 
              (quality factor) and bandwidth, but not the frequency at which resonance occurs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What happens at frequencies below resonance?
            </h3>
            <p className="text-gray-700">
              Below the resonant frequency, capacitive reactance (XC) is greater than inductive 
              reactance (XL), so the circuit behaves capacitively. The impedance increases as 
              frequency decreases, and current leads voltage in phase.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What happens at frequencies above resonance?
            </h3>
            <p className="text-gray-700">
              Above the resonant frequency, inductive reactance (XL) is greater than capacitive 
              reactance (XC), so the circuit behaves inductively. The impedance increases as 
              frequency increases, and current lags voltage in phase.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How do I increase the resonant frequency?
            </h3>
            <p className="text-gray-700">
              To increase the resonant frequency, you can either decrease the inductance (L) or 
              decrease the capacitance (C), or both. Since f₀ is inversely proportional to √(LC), 
              reducing either component will increase the frequency.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What is the difference between bandwidth and quality factor?
            </h3>
            <p className="text-gray-700">
              Bandwidth (BW) is the range of frequencies over which the circuit responds effectively, 
              typically measured between the half-power points. Quality factor (Q) is the ratio of 
              resonant frequency to bandwidth (Q = f₀/BW). Higher Q means narrower bandwidth and 
              sharper resonance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I use this calculator for parallel RLC circuits?
            </h3>
            <p className="text-gray-700">
              Yes, the resonant frequency formula f₀ = 1/(2π√LC) is the same for both series and 
              parallel RLC circuits. However, the impedance behavior differs: series RLC has minimum 
              impedance at resonance, while parallel RLC has maximum impedance at resonance.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips for Using the RLC Resonance Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Always ensure your inductance and capacitance values are positive numbers</li>
          <li>Use the unit dropdowns to avoid manual conversion errors</li>
          <li>Check the quality factor to understand the sharpness of resonance</li>
          <li>Use presets for common circuit configurations to save time</li>
          <li>Save your calculations to history for future reference</li>
          <li>Export results for documentation and sharing with team members</li>
          <li>Consider component tolerances when designing resonant circuits</li>
          <li>Remember that real inductors have DC resistance that affects Q</li>
          <li>Account for parasitic capacitance in high-frequency applications</li>
          <li>Use higher Q for selective filters and lower Q for broadband applications</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Practical Design Considerations
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Component Selection</h3>
            <p className="text-sm text-gray-700">
              Choose components with appropriate voltage and current ratings. For high-Q circuits, 
              use low-loss capacitors (NPO/COG ceramic or film) and air-core or ferrite-core inductors 
              with low DC resistance.
            </p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Temperature Stability</h3>
            <p className="text-sm text-gray-700">
              Component values change with temperature. Use temperature-stable components (NPO capacitors, 
              precision inductors) for frequency-critical applications like oscillators and filters.
            </p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">PCB Layout</h3>
            <p className="text-sm text-gray-700">
              Minimize parasitic inductance and capacitance in high-frequency circuits. Keep traces 
              short, use ground planes, and place components close together to maintain the designed 
              resonant frequency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
