export default function ElevationDesignCalculatorSEO() {
  return (
    <div className="mt-16 space-y-12 max-w-4xl mx-auto">
      
      {/* About Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">About Elevation Design Calculator</h2>
        <p className="text-gray-700 leading-relaxed">
          The Elevation Design Calculator is a professional architectural tool that helps architects, engineers, and designers calculate balanced building elevation proportions. By analyzing width, height, and floor count, this calculator provides instant feedback on facade proportions, ensuring visually pleasing and structurally harmonious designs.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether you're designing a residential building, commercial structure, or high-rise tower, this tool helps you maintain ideal proportions using standard ratios, the golden ratio (1:1.618), or custom proportions tailored to your specific design requirements.
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Enter Building Dimensions</h3>
            <p className="text-gray-700 text-sm">
              Input the building width, height, and number of floors in feet or meters.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Select Design Mode</h3>
            <p className="text-gray-700 text-sm">
              Choose between standard proportions, golden ratio, or custom ratio for your elevation design.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. View Results</h3>
            <p className="text-gray-700 text-sm">
              Get instant calculations for floor height, width-to-height ratio, and visual elevation preview with recommendations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Export Design</h3>
            <p className="text-gray-700 text-sm">
              Save your calculations to history or export detailed reports for documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Calculation Formulas</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Floor Height</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Floor Height = Total Height ÷ Number of Floors
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Divides the total building height equally among all floors.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Width-to-Height Ratio</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Ratio = Total Height ÷ Width
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Determines the proportion relationship between width and height. Ideal range: 1.5 to 1.8.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Golden Ratio Mode</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Height = Width × 1.618
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Applies the golden ratio (φ ≈ 1.618) for aesthetically balanced proportions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Custom Ratio Mode</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Height = Width × Custom Ratio
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Allows you to define your own proportion ratio based on specific design requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Design Guidelines */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Elevation Design Guidelines</h2>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Ideal Proportions</h3>
            <p className="text-gray-700 text-sm">
              For balanced elevations, maintain a width-to-height ratio between 1.5 and 1.8. This range provides visual harmony and structural stability.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Floor Height Standards</h3>
            <p className="text-gray-700 text-sm">
              Residential: 9-12 ft (2.7-3.6 m) per floor<br />
              Commercial: 12-15 ft (3.6-4.5 m) per floor<br />
              High-rise: 10-14 ft (3.0-4.2 m) per floor
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Golden Ratio Application</h3>
            <p className="text-gray-700 text-sm">
              The golden ratio (1:1.618) creates naturally pleasing proportions. Use this mode for aesthetically focused designs where visual balance is paramount.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Facade Elements</h3>
            <p className="text-gray-700 text-sm">
              Consider window placement, balcony lines, and horizontal divisions when designing elevations. These elements should align with floor divisions for visual coherence.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">🏠 Residential Design</h3>
            <p className="text-gray-700 text-sm">
              Calculate proportions for houses, apartments, and residential complexes. Ensure balanced facade designs that meet aesthetic and functional requirements.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">🏢 Commercial Buildings</h3>
            <p className="text-gray-700 text-sm">
              Design office buildings, retail spaces, and commercial structures with proper floor heights and elevation proportions for professional appearance.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">🏗️ High-Rise Towers</h3>
            <p className="text-gray-700 text-sm">
              Plan multi-story towers with consistent floor heights and balanced proportions. Ensure structural harmony across all elevation levels.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">📐 Conceptual Design</h3>
            <p className="text-gray-700 text-sm">
              Quickly test different proportion scenarios during early design phases. Experiment with golden ratio and custom ratios for optimal results.
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Calculation Examples</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 1: Small Residential Building</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Width: 30 ft</li>
                <li>Height: 24 ft</li>
                <li>Floors: 2</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Output:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Floor Height: 12 ft</li>
                <li>Width-to-Height Ratio: 0.8</li>
                <li>Status: Building appears too wide, consider increasing height</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 2: Golden Ratio Design</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Width: 40 ft</li>
                <li>Design Mode: Golden Ratio</li>
                <li>Floors: 4</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Output:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Calculated Height: 64.7 ft</li>
                <li>Floor Height: 16.2 ft</li>
                <li>Width-to-Height Ratio: 1.618</li>
                <li>Status: Balanced proportions ✓</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 3: Commercial Office Building</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Width: 60 ft</li>
                <li>Height: 96 ft</li>
                <li>Floors: 6</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Output:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Floor Height: 16 ft</li>
                <li>Width-to-Height Ratio: 1.6</li>
                <li>Status: Balanced proportions ✓</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Design Tips & Best Practices</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Start with presets:</strong> Use built-in templates for common building types to establish baseline proportions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Consider context:</strong> Adjust proportions based on surrounding buildings and site constraints.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Floor height matters:</strong> Ensure adequate ceiling heights for intended use (residential vs. commercial).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Use golden ratio wisely:</strong> Best for aesthetic-focused designs where visual harmony is the primary goal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Export and document:</strong> Save calculations for client presentations and construction documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Iterate designs:</strong> Test multiple proportion scenarios to find the optimal balance for your project.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">What is the ideal width-to-height ratio for buildings?</summary>
            <p className="text-gray-700 text-sm mt-2">
              The ideal ratio typically ranges from 1.5 to 1.8, meaning the height should be 1.5 to 1.8 times the width. This creates visually balanced proportions that are neither too squat nor too tall.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">When should I use the golden ratio mode?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Use golden ratio mode (1:1.618) when aesthetic harmony is a primary design goal. It's particularly effective for landmark buildings, cultural centers, and designs where visual appeal is paramount.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">What is a typical floor height for residential buildings?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Residential floor heights typically range from 9 to 12 feet (2.7 to 3.6 meters). Standard ceiling height is 8-9 feet, with additional space for floor structure and services.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">How do I adjust proportions for a narrow site?</summary>
            <p className="text-gray-700 text-sm mt-2">
              For narrow sites, you may need to accept a higher width-to-height ratio. Use custom ratio mode to find a balance between site constraints and aesthetic requirements. Consider vertical emphasis in facade design.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">Can I use this calculator for high-rise buildings?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Yes, the calculator works for buildings of any height. For high-rises, pay special attention to floor height consistency and overall proportion. Typical high-rise floor heights range from 10 to 14 feet.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">What if my ratio falls outside the ideal range?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Ratios outside 1.5-1.8 aren't necessarily wrong—they depend on building type and context. The calculator provides recommendations, but final decisions should consider functional requirements, site constraints, and design intent.
            </p>
          </details>
        </div>
      </section>

      {/* Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Benefits of Using This Calculator</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-700 text-sm">
              Get immediate feedback on elevation proportions with real-time calculations and visual preview.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Accurate Calculations</h3>
            <p className="text-gray-700 text-sm">
              Precise mathematical formulas ensure reliable results for professional architectural work.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Visual Feedback</h3>
            <p className="text-gray-700 text-sm">
              See your elevation design rendered with floor divisions and dimension annotations.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">💾</div>
            <h3 className="font-semibold text-gray-900 mb-2">Save & Export</h3>
            <p className="text-gray-700 text-sm">
              Store calculations in history and export detailed reports for documentation.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="font-semibold text-gray-900 mb-2">Design Flexibility</h3>
            <p className="text-gray-700 text-sm">
              Choose from standard, golden ratio, or custom proportions to match your design vision.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p className="text-gray-700 text-sm">
              Works seamlessly on all devices—desktop, tablet, and mobile for on-site calculations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
