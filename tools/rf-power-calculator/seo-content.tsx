export default function RFPowerCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About RF Power Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The RF Power Calculator is a professional engineering tool designed for calculating and converting radio frequency (RF) signal power between different units. This calculator supports conversions between Watts (W), decibel-milliwatts (dBm), and decibel-watts (dBW), making it essential for RF engineers, wireless system designers, and telecommunications professionals.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Whether you're designing antenna systems, analyzing signal strength, or working with wireless communication networks, this calculator provides instant and accurate power conversions with detailed calculation steps.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Multiple Input Modes:</strong> Calculate from Watts, dBm, dBW, or voltage and resistance</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Real-time Conversion:</strong> Instant conversion between all power units</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Voltage-to-Power:</strong> Calculate power from voltage and resistance values</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Common Presets:</strong> Quick access to standard RF power levels</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Save and review previous calculations</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Results:</strong> Download calculation reports as text files</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Adjustable Precision:</strong> Control decimal places from 2 to 10</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">RF Power Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Watts to dBm</h3>
              <code className="text-sm text-gray-700">dBm = 10 × log₁₀(P × 1000)</code>
              <p className="text-sm text-gray-600 mt-2">Where P is power in Watts</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">dBm to Watts</h3>
              <code className="text-sm text-gray-700">P(W) = 10^(dBm/10) / 1000</code>
              <p className="text-sm text-gray-600 mt-2">Convert dBm back to Watts</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Watts to dBW</h3>
              <code className="text-sm text-gray-700">dBW = 10 × log₁₀(P)</code>
              <p className="text-sm text-gray-600 mt-2">Where P is power in Watts</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">dBW to Watts</h3>
              <code className="text-sm text-gray-700">P(W) = 10^(dBW/10)</code>
              <p className="text-sm text-gray-600 mt-2">Convert dBW back to Watts</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Voltage to Power</h3>
              <code className="text-sm text-gray-700">P = V² / R</code>
              <p className="text-sm text-gray-600 mt-2">Where V is voltage in Volts and R is resistance in Ohms</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">dBm to dBW Conversion</h3>
              <code className="text-sm text-gray-700">dBW = dBm - 30</code>
              <p className="text-sm text-gray-600 mt-2">Quick conversion between dBm and dBW</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common RF Power Levels</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Watts</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">dBm</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">dBW</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Bluetooth Low Energy</td>
                  <td className="px-4 py-3 text-sm text-gray-700">1 mW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0 dBm</td>
                  <td className="px-4 py-3 text-sm text-gray-700">-30 dBW</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Bluetooth Classic</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10 mW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10 dBm</td>
                  <td className="px-4 py-3 text-sm text-gray-700">-20 dBW</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">WiFi Router</td>
                  <td className="px-4 py-3 text-sm text-gray-700">100 mW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">20 dBm</td>
                  <td className="px-4 py-3 text-sm text-gray-700">-10 dBW</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Mobile Phone</td>
                  <td className="px-4 py-3 text-sm text-gray-700">1 W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">30 dBm</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0 dBW</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Amateur Radio (HF)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10 W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">40 dBm</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10 dBW</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">FM Radio Transmitter</td>
                  <td className="px-4 py-3 text-sm text-gray-700">100 W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">50 dBm</td>
                  <td className="px-4 py-3 text-sm text-gray-700">20 dBW</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding RF Power Units</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Watts (W)</h3>
              <p className="text-gray-700">
                The standard SI unit of power. In RF systems, power is often expressed in milliwatts (mW) for low-power applications like Bluetooth and WiFi, or in watts for higher-power applications like radio transmitters.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">dBm (Decibel-Milliwatts)</h3>
              <p className="text-gray-700">
                A logarithmic unit referenced to 1 milliwatt. dBm is widely used in RF engineering because it makes it easier to work with the large range of power levels encountered in wireless systems. 0 dBm equals 1 mW, and every 3 dB represents approximately a doubling or halving of power.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">dBW (Decibel-Watts)</h3>
              <p className="text-gray-700">
                A logarithmic unit referenced to 1 watt. dBW is commonly used for higher-power RF applications. The relationship between dBm and dBW is simple: dBW = dBm - 30. For example, 30 dBm equals 0 dBW (both represent 1 watt).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Wireless Communications</h3>
              <p className="text-sm text-blue-800">
                Calculate transmitter power, receiver sensitivity, and link budgets for WiFi, Bluetooth, cellular, and other wireless systems.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Antenna Design</h3>
              <p className="text-sm text-green-800">
                Determine power levels for antenna testing, EIRP calculations, and radiation pattern measurements.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">RF Testing</h3>
              <p className="text-sm text-purple-800">
                Convert between power units when using spectrum analyzers, signal generators, and power meters.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Telecommunications</h3>
              <p className="text-sm text-orange-800">
                Calculate signal strength, path loss, and power budgets for radio and microwave communication links.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Select Calculation Mode:</strong> Choose whether you're starting with Watts, dBm, dBW, or voltage/resistance values.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>Enter Input Values:</strong> Type in your known power value or voltage and resistance.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>View Results:</strong> The calculator instantly shows power in all units (W, dBm, dBW, mW).</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Review Calculation Steps:</strong> See the detailed formulas and steps used for the conversion.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>Use Presets:</strong> Click on common examples for quick calculations of standard power levels.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>Export or Save:</strong> Copy results, save to history, or download a detailed calculation report.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for RF Power Calculations</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-yellow-900">
              <strong>Remember the 3 dB Rule:</strong> Every 3 dB change represents approximately a doubling (increase) or halving (decrease) of power. For example, 20 dBm is about twice the power of 17 dBm.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>10 dB = 10x Power:</strong> A 10 dB increase means 10 times more power. For example, 30 dBm (1 W) is 10 times more powerful than 20 dBm (0.1 W).
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Standard Impedance:</strong> Most RF systems use 50Ω impedance. Some cable TV systems use 75Ω. Always verify the impedance when calculating power from voltage.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Safety First:</strong> High RF power can be dangerous. Always follow safety guidelines when working with RF transmitters and ensure proper grounding and shielding.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between dBm and dBW?</h3>
              <p className="text-gray-700">
                Both are logarithmic power units, but they have different reference points. dBm is referenced to 1 milliwatt, while dBW is referenced to 1 watt. The conversion is simple: dBW = dBm - 30. For example, 30 dBm = 0 dBW = 1 watt.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why use logarithmic units like dBm instead of watts?</h3>
              <p className="text-gray-700">
                RF systems often deal with very large ranges of power levels, from nanowatts to kilowatts. Logarithmic units compress this range into manageable numbers and make calculations involving gains and losses much simpler (addition instead of multiplication).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate power from voltage and resistance?</h3>
              <p className="text-gray-700">
                Use the formula P = V²/R, where P is power in watts, V is voltage in volts, and R is resistance in ohms. This assumes the voltage is measured across the resistance (load). For RF systems, R is typically the characteristic impedance (50Ω or 75Ω).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is a typical WiFi router power output?</h3>
              <p className="text-gray-700">
                Most WiFi routers transmit at around 100 mW (20 dBm or -10 dBW). However, this can vary by country due to regulatory limits and by frequency band (2.4 GHz vs 5 GHz).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use this calculator for audio power?</h3>
              <p className="text-gray-700">
                While the mathematical conversions work for any power measurement, this calculator is optimized for RF applications. Audio power calculations often involve additional factors like speaker impedance matching and RMS vs peak power.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
