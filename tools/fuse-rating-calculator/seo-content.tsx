export default function FuseRatingCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Fuse Rating?</h2>
          <p className="text-gray-700 leading-relaxed">
            A fuse rating is the maximum current (in amperes) that a fuse can safely carry continuously without blowing. 
            When current exceeds this rating, the fuse element melts and breaks the circuit, protecting equipment and wiring 
            from damage caused by overcurrent conditions. Selecting the correct fuse rating is critical for both safety and 
            reliable operation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Fuse Rating</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Step 1: Calculate Current</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">I = P / V</p>
              <p className="text-sm text-blue-700">
                Where I = Current (Amperes), P = Power (Watts), V = Voltage (Volts)
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Step 2: Apply Safety Factor</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Adjusted Current = I × 1.25</p>
              <p className="text-sm text-purple-700">
                Standard safety factor of 1.25 (125%) prevents nuisance blowing during normal operation
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Step 3: Select Standard Rating</h3>
              <p className="text-sm text-green-700">
                Choose the nearest higher standard fuse rating from available sizes (1A, 2A, 3A, 5A, 6A, 10A, 13A, 15A, 16A, 20A, etc.)
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Fuse Ratings</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating (A)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Use</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">1A - 3A</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Small electronics, LED lights</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">5A - 6A</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Lighting circuits, small appliances</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">10A - 13A</td>
                  <td className="px-4 py-3 text-sm text-gray-700">General power outlets, medium appliances</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">15A - 20A</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Heavy appliances, power tools</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">25A - 40A</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Air conditioners, water heaters, industrial equipment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fuse Types</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Fast Blow (F)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Blows quickly when current exceeds rating. Used for circuits with resistive loads.
              </p>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Lighting circuits</li>
                <li>Heating elements</li>
                <li>General electronics</li>
                <li>Sensitive equipment</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🔄 Slow Blow (T)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Tolerates brief current surges. Used for inductive loads with high startup current.
              </p>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Electric motors</li>
                <li>Transformers</li>
                <li>Compressors</li>
                <li>Inductive loads</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Factor Explained</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>1.0 (No margin):</strong> Fuse rated exactly at calculated current. Risk of nuisance blowing during normal operation.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>1.25 (Standard - Recommended):</strong> 25% safety margin. Prevents nuisance blowing while maintaining protection.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>1.5 (High safety):</strong> 50% safety margin. Used for circuits with occasional surges or multiple devices.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>1.6 (Very high):</strong> 60% safety margin. For motors and equipment with high inrush current.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 1: Microwave Oven</h3>
              <p className="text-sm text-gray-700 mb-2">
                A 1000W microwave operates at 220V. What fuse rating is needed?
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>Current: I = 1000W / 220V = 4.55A</div>
                <div>Adjusted: 4.55A × 1.25 = 5.68A</div>
                <div className="text-primary font-bold">Recommended Fuse: 6A</div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 2: Electric Kettle</h3>
              <p className="text-sm text-gray-700 mb-2">
                A 1500W kettle operates at 220V. What fuse rating is needed?
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>Current: I = 1500W / 220V = 6.82A</div>
                <div>Adjusted: 6.82A × 1.25 = 8.52A</div>
                <div className="text-primary font-bold">Recommended Fuse: 10A</div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 3: Air Conditioner</h3>
              <p className="text-sm text-gray-700 mb-2">
                A 2000W AC unit operates at 220V. What fuse rating is needed?
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>Current: I = 2000W / 220V = 9.09A</div>
                <div>Adjusted: 9.09A × 1.25 = 11.36A</div>
                <div className="text-primary font-bold">Recommended Fuse: 13A</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Using Oversized Fuses</h3>
                  <p className="text-sm text-red-800">
                    A fuse that's too large won't protect the circuit properly and can cause fire hazards or equipment damage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Using Undersized Fuses</h3>
                  <p className="text-sm text-red-800">
                    A fuse that's too small will blow frequently during normal operation, causing inconvenience and potential equipment stress.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Ignoring Voltage Rating</h3>
                  <p className="text-sm text-red-800">
                    Always ensure the fuse voltage rating meets or exceeds the circuit voltage. Using a lower voltage fuse is dangerous.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Wrong Fuse Type</h3>
                  <p className="text-sm text-red-800">
                    Using fast blow fuses on motor circuits or slow blow fuses on sensitive electronics can cause problems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use This Calculator</h2>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Installing new electrical appliances or equipment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Replacing blown fuses with the correct rating</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Designing electrical circuits and distribution boards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Troubleshooting frequent fuse blowing issues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Learning electrical safety and circuit protection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Verifying existing fuse ratings for safety compliance</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens if I use a fuse that's too large?</h3>
              <p className="text-sm text-gray-700">
                An oversized fuse won't blow when it should, allowing excessive current to flow through the circuit. 
                This can cause wiring to overheat, damage equipment, or create fire hazards. Always use the correctly sized fuse.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why does my fuse keep blowing?</h3>
              <p className="text-sm text-gray-700">
                Frequent fuse blowing indicates either: (1) the fuse is undersized for the load, (2) there's a short circuit 
                or ground fault, (3) too many devices on one circuit, or (4) a faulty appliance drawing excessive current. 
                Investigate the cause before replacing the fuse.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use a circuit breaker instead of a fuse?</h3>
              <p className="text-sm text-gray-700">
                Yes, circuit breakers serve the same protective function as fuses but can be reset instead of replaced. 
                Modern installations typically use circuit breakers, but fuses are still common in older systems and specific applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's the difference between AC and DC fuses?</h3>
              <p className="text-sm text-gray-700">
                DC fuses are designed for direct current circuits and must handle the arc that forms when DC current is interrupted. 
                AC fuses are for alternating current. Never use an AC fuse in a DC circuit as it may not provide adequate protection.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I round up or down when selecting a fuse?</h3>
              <p className="text-sm text-gray-700">
                Always round UP to the next standard fuse rating after applying the safety factor. Never round down, 
                as this could result in nuisance blowing during normal operation.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Safety Warning</h2>
          <p className="text-sm text-yellow-800 leading-relaxed">
            This calculator provides recommendations based on standard electrical calculations. Always consult local electrical 
            codes and regulations, which may have specific requirements for fuse ratings. If you're unsure about electrical work, 
            consult a qualified electrician. Incorrect fuse selection can result in fire hazards, equipment damage, or personal injury.
          </p>
        </section>

      </div>
    </div>
  );
}
