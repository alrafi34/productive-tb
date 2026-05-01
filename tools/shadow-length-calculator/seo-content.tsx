export default function ShadowLengthCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Shadow Length Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Shadow Length Calculator is a fast, accurate tool designed to calculate the length of shadows cast by 
            objects based on their height and the sun's elevation angle. Using basic trigonometry, this calculator provides 
            instant results for architects, engineers, construction planners, photographers, and students working with light, 
            shadows, and spatial design.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Enter Object Height</h3>
              <p className="text-gray-700">
                Input the height of the object that will cast a shadow. You can use either meters or feet as your unit of 
                measurement.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Set Sun Elevation Angle</h3>
              <p className="text-gray-700">
                Use the slider to adjust the sun's elevation angle from 1° (low sun, near horizon) to 89° (sun nearly 
                overhead). The angle dramatically affects shadow length.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: View Results</h3>
              <p className="text-gray-700">
                The calculator instantly displays the shadow length in your chosen unit, plus a visual diagram showing the 
                relationship between object height, sun angle, and shadow projection.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Export or Save</h3>
              <p className="text-gray-700">
                Copy results to clipboard, export the visual diagram as an image, or save calculations to history for 
                future reference.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Formula</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Shadow length is calculated using basic trigonometry:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="font-mono text-center text-lg">Shadow Length = Object Height ÷ tan(Sun Angle)</p>
            <p className="text-center text-sm text-gray-600 mt-2">
              Where the sun angle is measured in degrees from the horizon
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The tangent function relates the angle of elevation to the ratio of opposite side (object height) to adjacent 
            side (shadow length). As the sun rises higher (larger angle), the tangent increases, resulting in shorter 
            shadows. When the sun is low (small angle), shadows are much longer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shadow Length by Sun Angle</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Sun Angle</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Shadow Length (10m object)</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">15°</td>
                  <td className="px-4 py-2 text-sm text-gray-700">37.3 m</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Very long shadow, early morning/late evening</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">30°</td>
                  <td className="px-4 py-2 text-sm text-gray-700">17.3 m</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Long shadow, mid-morning/mid-afternoon</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">45°</td>
                  <td className="px-4 py-2 text-sm text-gray-700">10.0 m</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Shadow equals object height</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">60°</td>
                  <td className="px-4 py-2 text-sm text-gray-700">5.8 m</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Short shadow, late morning/early afternoon</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">75°</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2.7 m</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Very short shadow, near midday</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Architecture & Building Design</h3>
              <p className="text-sm text-gray-700">
                Calculate shadow impact on neighboring properties, design building setbacks, plan outdoor spaces, and 
                optimize natural lighting by understanding shadow patterns throughout the day.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Urban Planning</h3>
              <p className="text-sm text-gray-700">
                Analyze shadow effects on streets, parks, and public spaces. Ensure adequate sunlight access for 
                pedestrian areas and comply with shadow regulations in dense urban environments.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Photography & Cinematography</h3>
              <p className="text-sm text-gray-700">
                Plan outdoor shoots by predicting shadow lengths at different times of day. Optimize lighting conditions 
                and create desired shadow effects for artistic compositions.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Education & Learning</h3>
              <p className="text-sm text-gray-700">
                Teach trigonometry concepts, demonstrate practical applications of mathematics, and help students 
                understand the relationship between angles and ratios.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Concepts</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Sun Elevation Angle</h3>
              <p className="text-sm text-gray-700">
                The angle between the sun and the horizon, measured in degrees. 0° means sun at horizon (sunrise/sunset), 
                90° means sun directly overhead (only possible in tropics). Higher angles produce shorter shadows.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Tangent Function</h3>
              <p className="text-sm text-gray-700">
                A trigonometric function that relates an angle to the ratio of opposite to adjacent sides in a right 
                triangle. In shadow calculations, tan(angle) = height ÷ shadow length.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Shadow Direction</h3>
              <p className="text-sm text-gray-700">
                Shadows always point away from the sun. In the Northern Hemisphere, shadows point north at midday. Shadow 
                direction changes throughout the day as the sun moves across the sky.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Special Case: 45° Angle</h3>
              <p className="text-sm text-gray-700">
                When the sun is at 45° elevation, the shadow length exactly equals the object height. This is because 
                tan(45°) = 1, making the calculation simple: shadow = height ÷ 1 = height.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Examples</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Building Shadow Analysis</h3>
              <p className="text-sm text-blue-800">
                A 20-meter tall building at 30° sun angle casts a 34.6-meter shadow. This helps determine if the shadow 
                will affect neighboring properties or public spaces.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Tree Planting</h3>
              <p className="text-sm text-blue-800">
                A 15-meter tree at 60° sun angle casts an 8.7-meter shadow. Use this to plan tree placement that provides 
                shade without blocking windows or solar panels.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Photography Planning</h3>
              <p className="text-sm text-blue-800">
                A 2-meter person at 20° sun angle casts a 5.5-meter shadow. Photographers can use this to plan portrait 
                sessions with desired shadow lengths for dramatic effect.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why can't I use 0° or 90° angles?</h3>
              <p className="text-gray-700">
                At 0°, the sun is at the horizon and shadows are infinitely long. At 90°, the sun is directly overhead 
                and there is no shadow (or a very tiny one directly beneath the object). The tangent function is undefined 
                or approaches infinity at these extremes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I find the sun's elevation angle?</h3>
              <p className="text-gray-700">
                Sun elevation varies by location, date, and time of day. You can use sun position calculators, smartphone 
                apps, or astronomical tables. At solar noon (when sun is highest), elevation equals 90° minus your latitude 
                (adjusted for season).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Does this account for terrain slope?</h3>
              <p className="text-gray-700">
                This calculator assumes flat, level ground. On sloped terrain, shadow length will vary depending on whether 
                the slope faces toward or away from the sun. For sloped surfaces, more complex calculations are needed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why do shadows change length throughout the day?</h3>
              <p className="text-gray-700">
                As the sun moves across the sky, its elevation angle changes. Shadows are longest at sunrise and sunset 
                (low angles) and shortest at solar noon (highest angle). The rate of change is fastest near sunrise/sunset.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I use this for indoor lighting design?</h3>
              <p className="text-gray-700">
                Yes! The same trigonometric principles apply to artificial light sources. Replace "sun angle" with the 
                angle of your light source relative to the ground, and calculate shadow lengths for interior design and 
                stage lighting.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How accurate is this calculator?</h3>
              <p className="text-gray-700">
                The calculator uses standard trigonometric formulas and is mathematically accurate. Real-world shadows may 
                vary slightly due to atmospheric refraction, terrain irregularities, or object shape complexity, but results 
                are suitable for most practical applications.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Guidelines</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Calculate shadows at multiple times of day for comprehensive analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider seasonal variations in sun angle for year-round planning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Account for shadow impact on solar panels, gardens, and outdoor spaces</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Use shadow analysis to optimize building orientation and window placement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Verify calculations with local building codes and shadow regulations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider cumulative shadow effects from multiple buildings or objects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Document shadow studies for planning approvals and design presentations</span>
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
                Real-time calculations with immediate visual feedback and diagram
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">📐</div>
              <h3 className="font-semibold text-gray-800 mb-1">Accurate Formula</h3>
              <p className="text-sm text-gray-700">
                Based on standard trigonometric principles used in professional applications
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-1">Easy to Use</h3>
              <p className="text-sm text-gray-700">
                Simple interface with visual diagram and export options
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Shadow Calculation Tool</h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator is designed for architects, engineers, planners, photographers, and students who need quick 
            and accurate shadow length calculations. It combines mathematical precision with an intuitive interface and 
            visual diagram, making trigonometry accessible while maintaining professional-grade accuracy. All calculations 
            run entirely in your browser with no data sent to servers, ensuring privacy and instant performance. Use this 
            tool for preliminary analysis, educational purposes, and design planning.
          </p>
        </section>

      </div>
    </div>
  );
}
