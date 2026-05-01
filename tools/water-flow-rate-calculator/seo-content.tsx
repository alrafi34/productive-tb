export default function WaterFlowRateCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Water Flow Rate Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Water Flow Rate Calculator is a professional engineering tool designed for calculating water flow rates in 
            building plumbing systems. Using the fundamental flow equation Q = A × v, this calculator provides instant, 
            accurate results for residential, commercial, and industrial applications. Perfect for civil engineers, architects, 
            plumbers, and students learning fluid mechanics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Select Calculation Mode</h3>
              <p className="text-gray-700">
                Choose what you want to calculate: flow rate, velocity, or pipe diameter. The calculator will automatically 
                adjust the input fields based on your selection.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Enter Known Values</h3>
              <p className="text-gray-700">
                Input your known parameters such as pipe diameter (in mm) and velocity (in m/s) to calculate flow rate, 
                or enter flow rate and diameter to find velocity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Review Results</h3>
              <p className="text-gray-700">
                The calculator instantly displays results in multiple units including L/min, GPM, m³/s, along with 
                recommendations and warnings based on engineering best practices.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Flow Rate Formula</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator uses the fundamental continuity equation for fluid flow:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="font-mono text-center text-lg">Q = A × v</p>
            <p className="text-center text-sm text-gray-600 mt-2">
              Where Q = Flow Rate, A = Cross-sectional Area, v = Velocity
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            For circular pipes, the cross-sectional area is calculated as:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-mono text-center text-lg">A = π × (D/2)²</p>
            <p className="text-center text-sm text-gray-600 mt-2">
              Where D = Pipe Diameter
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Plumbing Fixtures</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Kitchen Faucet</h3>
              <p className="text-sm text-gray-700 mb-2">
                Typical diameter: 15mm, Velocity: 1.5 m/s, Flow rate: ~15-20 L/min
              </p>
              <p className="text-xs text-primary font-semibold">Residential Application</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Bathroom Sink</h3>
              <p className="text-sm text-gray-700 mb-2">
                Typical diameter: 12mm, Velocity: 1.2 m/s, Flow rate: ~8-12 L/min
              </p>
              <p className="text-xs text-primary font-semibold">Residential Application</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Shower Head</h3>
              <p className="text-sm text-gray-700 mb-2">
                Typical diameter: 15mm, Velocity: 2.0 m/s, Flow rate: ~20-25 L/min
              </p>
              <p className="text-xs text-primary font-semibold">Residential Application</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Main House Supply</h3>
              <p className="text-sm text-gray-700 mb-2">
                Typical diameter: 25mm, Velocity: 2.0 m/s, Flow rate: ~60-80 L/min
              </p>
              <p className="text-xs text-primary font-semibold">Residential Main Line</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Flow Velocity Guidelines</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Proper flow velocity is critical for efficient plumbing system operation:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Too Low (&lt;0.6 m/s):</strong> Risk of sediment deposition, bacterial growth, and stagnant water</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Optimal (0.6-3.0 m/s):</strong> Balanced flow with minimal noise, erosion, and pressure loss</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Too High (&gt;3.0 m/s):</strong> Excessive noise, vibration, erosion, and water hammer risk</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unit Conversions</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Flow Rate Conversions</h3>
              <p className="text-sm text-blue-800">
                1 m³/s = 60,000 L/min = 15,850 GPM
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Velocity Conversions</h3>
              <p className="text-sm text-blue-800">
                1 m/s = 3.281 ft/s = 196.85 ft/min
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Diameter Conversions</h3>
              <p className="text-sm text-blue-800">
                1 inch = 25.4 mm, 1 mm = 0.03937 inches
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Considerations</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Pressure Requirements</h3>
              <p className="text-sm text-gray-700">
                Ensure adequate pressure is available to achieve desired flow rates. Minimum 20 psi for residential fixtures.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Pipe Material Selection</h3>
              <p className="text-sm text-gray-700">
                Choose appropriate materials (PVC, copper, PEX) based on water quality, pressure, and local codes.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Friction Losses</h3>
              <p className="text-sm text-gray-700">
                Account for pressure losses due to friction in long pipe runs, fittings, and elevation changes.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Peak Demand</h3>
              <p className="text-sm text-gray-700">
                Design for peak simultaneous usage, not just individual fixture requirements.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Typical Flow Rates by Application</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Fixture/Application</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Flow Rate (L/min)</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Flow Rate (GPM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Kitchen Faucet</td>
                  <td className="px-4 py-2 text-sm text-gray-700">15-20</td>
                  <td className="px-4 py-2 text-sm text-gray-700">4-5</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Bathroom Sink</td>
                  <td className="px-4 py-2 text-sm text-gray-700">8-12</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2-3</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Shower</td>
                  <td className="px-4 py-2 text-sm text-gray-700">20-25</td>
                  <td className="px-4 py-2 text-sm text-gray-700">5-6.5</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Bathtub</td>
                  <td className="px-4 py-2 text-sm text-gray-700">30-40</td>
                  <td className="px-4 py-2 text-sm text-gray-700">8-10</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Toilet</td>
                  <td className="px-4 py-2 text-sm text-gray-700">10-15</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2.5-4</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Washing Machine</td>
                  <td className="px-4 py-2 text-sm text-gray-700">25-35</td>
                  <td className="px-4 py-2 text-sm text-gray-700">6.5-9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the ideal flow velocity for residential plumbing?</h3>
              <p className="text-gray-700">
                For residential applications, maintain velocities between 1.2-2.5 m/s (4-8 ft/s). This range provides adequate 
                flow while minimizing noise and preventing erosion. Lower velocities around 1.5 m/s are preferred for quiet operation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I calculate flow rate if I know diameter and velocity?</h3>
              <p className="text-gray-700">
                Use the formula Q = A × v, where A = π × (D/2)². First calculate the cross-sectional area from the diameter, 
                then multiply by velocity. The calculator handles all conversions automatically.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What causes low water flow in buildings?</h3>
              <p className="text-gray-700">
                Low flow can result from undersized pipes, excessive friction losses, low supply pressure, clogged fixtures, 
                or simultaneous usage exceeding system capacity. Use this calculator to verify proper pipe sizing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How does pipe diameter affect flow rate?</h3>
              <p className="text-gray-700">
                Flow rate is proportional to the square of the diameter (Q ∝ D²). Doubling the diameter increases flow capacity 
                by four times at the same velocity. This is why proper pipe sizing is critical.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is water hammer and how can I prevent it?</h3>
              <p className="text-gray-700">
                Water hammer is a pressure surge caused by sudden flow changes. Prevent it by keeping velocities below 3 m/s, 
                installing water hammer arrestors, and using slow-closing valves. High velocities increase water hammer risk.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Engineering Best Practices</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Always verify calculations against local plumbing codes and standards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Design for peak demand scenarios with simultaneous fixture usage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Account for pressure losses in long runs and elevation changes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Maintain velocities within recommended ranges to prevent problems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider future expansion when sizing main supply lines</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Document all calculations for permit applications and future reference</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-1">Instant Results</h3>
              <p className="text-sm text-gray-700">
                Real-time calculations with automatic updates as you type
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-1">Engineering Accuracy</h3>
              <p className="text-sm text-gray-700">
                Based on fundamental fluid mechanics principles
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-semibold text-gray-800 mb-1">Multi-Unit Support</h3>
              <p className="text-sm text-gray-700">
                Automatic conversions between metric and imperial units
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Tool for Building Design</h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator is designed for civil engineers, architects, plumbers, and contractors who need accurate water 
            flow calculations for building plumbing systems. It combines engineering precision with an intuitive interface, 
            making complex hydraulic calculations accessible while maintaining professional-grade accuracy. All calculations 
            run entirely in your browser with no data sent to servers, ensuring privacy and instant performance.
          </p>
        </section>

      </div>
    </div>
  );
}
