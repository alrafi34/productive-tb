export default function DecibelCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Decibel (dB)?</h2>
          <p className="text-gray-700 leading-relaxed">
            The decibel (dB) is a logarithmic unit used to express the ratio between two values, commonly power or amplitude. 
            It's widely used in electronics, audio engineering, telecommunications, and signal processing to measure gain, loss, 
            or signal strength. The logarithmic scale makes it easier to work with very large or very small ratios.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Decibel Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Power-Based Calculation</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">dB = 10 × log₁₀(P₂/P₁)</p>
              <p className="text-sm text-blue-700">
                Used when comparing power levels. A 10 dB increase represents a 10× power increase.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Voltage/Current-Based Calculation</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">dB = 20 × log₁₀(V₂/V₁)</p>
              <p className="text-sm text-purple-700">
                Used when comparing voltage or current levels. A 20 dB increase represents a 10× voltage increase.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Reverse Calculations</h3>
              <p className="text-green-800 font-mono text-sm mb-1">Power Ratio = 10^(dB/10)</p>
              <p className="text-green-800 font-mono text-sm">Voltage Ratio = 10^(dB/20)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common dB Values</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">dB Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Power Ratio</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Voltage Ratio</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">+3 dB</td>
                  <td className="px-4 py-3 text-sm text-gray-700">2× (double)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">1.41×</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">+6 dB</td>
                  <td className="px-4 py-3 text-sm text-gray-700">4×</td>
                  <td className="px-4 py-3 text-sm text-gray-700">2× (double)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">+10 dB</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10×</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3.16×</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">+20 dB</td>
                  <td className="px-4 py-3 text-sm text-gray-700">100×</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10×</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">-3 dB</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.5× (half)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.71×</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">-10 dB</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.1× (10%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.32×</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">-20 dB</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.01× (1%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.1× (10%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎵 Audio Engineering</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Amplifier gain measurements</li>
                <li>Sound pressure level (SPL)</li>
                <li>Microphone sensitivity</li>
                <li>Speaker efficiency ratings</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📡 RF & Telecommunications</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Antenna gain</li>
                <li>Signal attenuation</li>
                <li>Cable loss calculations</li>
                <li>Transmitter power output</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Electronics</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Amplifier specifications</li>
                <li>Filter response curves</li>
                <li>Signal-to-noise ratio (SNR)</li>
                <li>Power supply efficiency</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🔊 Acoustics</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Room acoustics analysis</li>
                <li>Noise reduction ratings</li>
                <li>Hearing protection levels</li>
                <li>Environmental noise assessment</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Decibels?</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>Logarithmic Scale:</strong> Makes it easier to work with very large or very small ratios on a manageable scale.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>Multiplication Becomes Addition:</strong> Cascaded gains/losses can be simply added instead of multiplied.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>Industry Standard:</strong> Universally used in audio, RF, and telecommunications industries.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>Human Perception:</strong> Matches how humans perceive changes in sound intensity and brightness.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 1: Power Gain</h3>
              <p className="text-sm text-gray-700 mb-2">
                An amplifier increases power from 1W to 10W. What is the gain in dB?
              </p>
              <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                dB = 10 × log₁₀(10/1) = 10 × 1 = 10 dB
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 2: Voltage Gain</h3>
              <p className="text-sm text-gray-700 mb-2">
                A circuit doubles the voltage from 1V to 2V. What is the gain in dB?
              </p>
              <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                dB = 20 × log₁₀(2/1) = 20 × 0.301 = 6.02 dB
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 3: Signal Attenuation</h3>
              <p className="text-sm text-gray-700 mb-2">
                A cable causes -20 dB loss. What fraction of power remains?
              </p>
              <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                Power Ratio = 10^(-20/10) = 10^(-2) = 0.01 (1%)
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Using This Calculator</h2>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Choose the correct mode based on whether you're working with power or voltage/current ratios.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>For power calculations, use the 10× multiplier formula (10 × log₁₀).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>For voltage/current calculations, use the 20× multiplier formula (20 × log₁₀).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Negative dB values indicate attenuation or loss, while positive values indicate gain.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Use the quick presets for common gain/loss scenarios to save time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Adjust precision (2-6 decimal places) based on your accuracy requirements.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's the difference between dB, dBm, and dBW?</h3>
              <p className="text-sm text-gray-700">
                dB is a relative unit comparing two values. dBm is absolute power relative to 1 milliwatt (0 dBm = 1 mW). 
                dBW is absolute power relative to 1 watt (0 dBW = 1 W).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is 3 dB called the "half-power point"?</h3>
              <p className="text-sm text-gray-700">
                -3 dB represents exactly half the power (0.5×). This is commonly used in filter design and frequency response 
                analysis to define bandwidth.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I add dB values directly?</h3>
              <p className="text-sm text-gray-700">
                Yes! One major advantage of dB is that cascaded gains/losses can be added. For example, +10 dB followed by 
                +6 dB equals +16 dB total gain.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">When should I use 10× vs 20× multiplier?</h3>
              <p className="text-sm text-gray-700">
                Use 10× for power ratios (P₂/P₁). Use 20× for voltage or current ratios (V₂/V₁ or I₂/I₁). 
                This is because power is proportional to voltage squared (P = V²/R).
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
