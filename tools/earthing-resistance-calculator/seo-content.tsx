export default function EarthingResistanceCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Earthing Resistance?</h2>
          <p className="text-gray-700 leading-relaxed">
            Earthing (grounding) resistance is the resistance encountered by fault current when flowing from an electrical 
            installation through the earth electrode into the ground. Low earthing resistance is essential for electrical 
            safety, as it ensures that fault currents can flow safely to earth, triggering protective devices and preventing 
            electric shock hazards. The resistance depends on soil resistivity, electrode dimensions, and installation configuration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Earthing Resistance Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Single Vertical Rod</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">R = (ρ / (2πL)) × [ln(4L/d) - 1]</p>
              <p className="text-sm text-blue-700 mb-2">
                This is the most common formula for calculating the resistance of a single vertical earth electrode.
              </p>
              <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li><strong>R</strong> = Earthing Resistance (Ohms)</li>
                <li><strong>ρ</strong> = Soil Resistivity (Ohm·meter)</li>
                <li><strong>L</strong> = Rod Length (meters)</li>
                <li><strong>d</strong> = Rod Diameter (meters)</li>
                <li><strong>ln</strong> = Natural logarithm</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Multiple Rods in Parallel</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">R_total ≈ (R_single / n) × (1 / η)</p>
              <p className="text-sm text-purple-700">
                Where n is the number of rods and η is the efficiency factor (0.4-1.0) depending on spacing. 
                Wider spacing improves efficiency.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Soil Resistivity Values</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Soil Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resistivity (Ω·m)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Characteristics</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Wet Organic Soil</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Excellent conductivity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Moist Soil</td>
                  <td className="px-4 py-3 text-sm text-gray-700">50</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Good conductivity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Clay</td>
                  <td className="px-4 py-3 text-sm text-gray-700">40</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Good when moist</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Dry Soil</td>
                  <td className="px-4 py-3 text-sm text-gray-700">100</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Moderate conductivity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Sandy Clay</td>
                  <td className="px-4 py-3 text-sm text-gray-700">150</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Fair conductivity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Sand</td>
                  <td className="px-4 py-3 text-sm text-gray-700">2000</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Poor conductivity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Gravel</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3000</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Very poor conductivity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Rock</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10000+</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Extremely poor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Resistance Values</h2>
          
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Excellent: &lt; 1Ω</h3>
                  <p className="text-sm text-green-800">
                    Ideal for sensitive equipment, data centers, and telecommunications. Provides maximum safety.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Good: 1-5Ω</h3>
                  <p className="text-sm text-green-800">
                    Suitable for most residential and commercial installations. Meets standard safety requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 text-xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Acceptable: 5-10Ω</h3>
                  <p className="text-sm text-yellow-800">
                    Marginally acceptable for some applications. Consider improvement for better safety.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Poor: &gt; 10Ω</h3>
                  <p className="text-sm text-red-800">
                    Unacceptable for most installations. Requires immediate improvement to ensure safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Earthing Resistance</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Soil Resistivity:</strong> The most significant factor. Lower resistivity means lower resistance. 
                Varies with soil type, moisture content, temperature, and chemical composition.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Electrode Length:</strong> Longer electrodes penetrate deeper into potentially more conductive soil layers. 
                Doubling length roughly halves resistance.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Electrode Diameter:</strong> Larger diameter reduces resistance slightly, but effect is logarithmic. 
                Length is more effective than diameter.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Number of Electrodes:</strong> Multiple electrodes in parallel reduce total resistance, but efficiency 
                decreases if spacing is insufficient.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Electrode Spacing:</strong> For multiple electrodes, spacing should be at least 2× electrode length 
                for optimal efficiency.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Moisture Content:</strong> Dry soil has much higher resistivity. Seasonal variations can significantly 
                affect resistance.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Temperature:</strong> Frozen soil has very high resistivity. Consider worst-case conditions in cold climates.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 1: Standard Rod in Dry Soil</h3>
              <p className="text-sm text-gray-700 mb-2">
                Soil resistivity: 100 Ω·m, Rod length: 2.5m, Rod diameter: 16mm (0.016m)
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>4L/d = (4 × 2.5) / 0.016 = 625</div>
                <div>ln(625) = 6.438</div>
                <div>ln(4L/d) - 1 = 6.438 - 1 = 5.438</div>
                <div>ρ / (2πL) = 100 / (2 × π × 2.5) = 6.366</div>
                <div>R = 6.366 × 5.438 = 34.6Ω</div>
                <div className="text-red-600 font-bold">Status: High - Requires improvement</div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 2: Long Rod in Moist Soil</h3>
              <p className="text-sm text-gray-700 mb-2">
                Soil resistivity: 50 Ω·m, Rod length: 3m, Rod diameter: 20mm (0.02m)
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>4L/d = (4 × 3) / 0.02 = 600</div>
                <div>ln(600) = 6.397</div>
                <div>ln(4L/d) - 1 = 6.397 - 1 = 5.397</div>
                <div>ρ / (2πL) = 50 / (2 × π × 3) = 2.653</div>
                <div>R = 2.653 × 5.397 = 14.3Ω</div>
                <div className="text-yellow-600 font-bold">Status: Acceptable - Consider improvement</div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 3: Multiple Rods</h3>
              <p className="text-sm text-gray-700 mb-2">
                4 rods, each 34.6Ω, spacing 5m (2× rod length), efficiency factor ≈ 0.7
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>R_single = 34.6Ω</div>
                <div>R_parallel = 34.6 / 4 = 8.65Ω (ideal)</div>
                <div>R_actual = 8.65 / 0.7 = 12.4Ω (with efficiency factor)</div>
                <div className="text-yellow-600 font-bold">Status: Acceptable - Better than single rod</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Improve Earthing Resistance</h2>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Increase Electrode Length:</strong> Use longer rods (3m or more) to reach deeper, more conductive soil layers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Install Multiple Electrodes:</strong> Use several rods in parallel with adequate spacing (minimum 2× rod length).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Soil Treatment:</strong> Add salt, bentonite, or chemical earthing compounds to reduce soil resistivity around electrodes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Use Larger Diameter Rods:</strong> While less effective than length, larger diameter helps slightly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Install During Wet Season:</strong> Moisture improves conductivity. Maintain moisture with periodic watering.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Use Copper-Bonded Rods:</strong> Better conductivity and corrosion resistance than plain steel.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Consider Horizontal Electrodes:</strong> Buried strips or plates can be effective in rocky terrain.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Insufficient Electrode Length</h3>
                  <p className="text-sm text-red-800">
                    Using short rods (less than 2m) in high-resistivity soil results in poor earthing. Always use adequate length.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Inadequate Spacing</h3>
                  <p className="text-sm text-red-800">
                    Placing multiple electrodes too close together reduces efficiency. Maintain spacing of at least 2× rod length.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Poor Connections</h3>
                  <p className="text-sm text-red-800">
                    Loose or corroded connections increase resistance. Use proper clamps and protect connections from corrosion.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Ignoring Soil Conditions</h3>
                  <p className="text-sm text-red-800">
                    Not testing soil resistivity before installation can lead to inadequate earthing. Always measure soil conditions first.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the ideal earthing resistance value?</h3>
              <p className="text-sm text-gray-700">
                For most installations, less than 5Ω is considered good. Sensitive equipment and telecommunications require 
                less than 1Ω. Industrial installations typically target 1-5Ω. Local electrical codes may specify maximum values.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I measure soil resistivity?</h3>
              <p className="text-sm text-gray-700">
                Soil resistivity is measured using specialized equipment like the Wenner four-point method or soil resistivity 
                meters. Professional testing is recommended for critical installations. Typical values range from 10 Ω·m 
                (wet organic soil) to 10,000+ Ω·m (rock).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use this calculator for plate electrodes?</h3>
              <p className="text-sm text-gray-700">
                This calculator is optimized for vertical rod electrodes. Plate electrodes use different formulas. 
                For plates, resistance depends on plate area and burial depth. Consult specialized references for plate calculations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How often should earthing resistance be tested?</h3>
              <p className="text-sm text-gray-700">
                Test earthing systems annually or after any modifications. More frequent testing (quarterly or semi-annually) 
                is recommended for critical installations. Seasonal variations can affect resistance, so test during dry conditions 
                to ensure worst-case performance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between earthing and grounding?</h3>
              <p className="text-sm text-gray-700">
                The terms are often used interchangeably. "Earthing" is more common in British English, while "grounding" 
                is preferred in American English. Both refer to the connection of electrical systems to the earth for safety purposes.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Important Safety Note</h2>
          <p className="text-sm text-yellow-800 leading-relaxed">
            This calculator provides theoretical estimates based on standard formulas. Actual earthing resistance can vary 
            due to soil conditions, installation quality, and environmental factors. Always verify installations with proper 
            earth resistance testing equipment. Consult qualified electrical engineers and follow local electrical codes and 
            standards. Proper earthing is critical for electrical safety and must be installed by qualified professionals.
          </p>
        </section>

      </div>
    </div>
  );
}
