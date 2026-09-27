import ToolFaq from "@/components/ToolFaq";
import { floorFinishCalculatorConfig } from "./config";

export default function FloorFinishCalculatorSEO() {
  const { howToSteps, faq } = floorFinishCalculatorConfig.seo;
  return (
    <div className="mt-16 space-y-12 max-w-4xl mx-auto">
      
      {/* About Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">About Floor Finish Calculator</h2>
        <p className="text-gray-700 leading-relaxed">
          The Floor Finish Calculator is a professional tool designed to help architects, contractors, interior designers, and homeowners accurately estimate the quantity of floor finishing materials needed for any project. Whether you're installing tiles, wood planks, laminate, or marble, this calculator provides instant and precise material estimates with built-in wastage calculation.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Eliminate guesswork and reduce material waste with real-time calculations that account for room dimensions, material sizes, and industry-standard wastage percentages. Perfect for residential renovations, commercial projects, and new construction planning.
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Formula */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Calculation Formula</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Step 1: Calculate Total Floor Area</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Total Area = Room Length × Room Width
            </code>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Step 2: Calculate Material Unit Area</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Unit Area = Material Length × Material Width
            </code>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Step 3: Calculate Base Units Required</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Base Units = Total Area ÷ Unit Area
            </code>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Step 4: Apply Wastage and Round Up</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Final Units = ⌈Base Units × (1 + Wastage%)⌉
            </code>
            <p className="text-blue-800 text-sm mt-2">
              The ceiling function (⌈⌉) ensures you always have enough material by rounding up to the nearest whole unit.
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Calculation Examples</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 1: Standard Tile Installation</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Room: 10 ft × 12 ft</li>
                <li>Tile Size: 2 ft × 2 ft</li>
                <li>Wastage: 10%</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">
                Total Area = 10 × 12 = 120 sq ft<br />
                Tile Area = 2 × 2 = 4 sq ft<br />
                Base Units = 120 ÷ 4 = 30 tiles<br />
                With Wastage = 30 × 1.10 = 33 tiles
              </p>
              <p className="text-gray-700 mt-3"><strong>Result:</strong> 33 tiles required</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 2: Wood Plank Flooring</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Room: 15 ft × 20 ft</li>
                <li>Plank Size: 4 ft × 0.5 ft</li>
                <li>Wastage: 15%</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">
                Total Area = 15 × 20 = 300 sq ft<br />
                Plank Area = 4 × 0.5 = 2 sq ft<br />
                Base Units = 300 ÷ 2 = 150 planks<br />
                With Wastage = 150 × 1.15 = 172.5 → 173 planks
              </p>
              <p className="text-gray-700 mt-3"><strong>Result:</strong> 173 planks required</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 3: Large Format Tile</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Room: 5 m × 4 m</li>
                <li>Tile Size: 0.5 m × 0.5 m</li>
                <li>Wastage: 8%</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">
                Total Area = 5 × 4 = 20 m²<br />
                Tile Area = 0.5 × 0.5 = 0.25 m²<br />
                Base Units = 20 ÷ 0.25 = 80 tiles<br />
                With Wastage = 80 × 1.08 = 86.4 → 87 tiles
              </p>
              <p className="text-gray-700 mt-3"><strong>Result:</strong> 87 tiles required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wastage Guidelines */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Wastage Guidelines</h2>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Ceramic & Porcelain Tiles</h3>
            <p className="text-gray-700 text-sm">
              <strong>Recommended Wastage: 5-10%</strong><br />
              Standard installations with minimal cuts. Add 15% for diagonal patterns or complex layouts.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Wood & Laminate Planks</h3>
            <p className="text-gray-700 text-sm">
              <strong>Recommended Wastage: 10-15%</strong><br />
              Accounts for end cuts, stagger patterns, and potential defects. Increase for herringbone or chevron patterns.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Natural Stone & Marble</h3>
            <p className="text-gray-700 text-sm">
              <strong>Recommended Wastage: 10-15%</strong><br />
              Higher wastage due to natural variations, breakage risk, and pattern matching requirements.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Complex Patterns</h3>
            <p className="text-gray-700 text-sm">
              <strong>Recommended Wastage: 15-20%</strong><br />
              Diagonal layouts, herringbone, chevron, or custom patterns require additional material for cuts and alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Tips & Best Practices</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Measure accurately:</strong> Always measure room dimensions at multiple points and use the largest measurement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Account for obstacles:</strong> Subtract areas for permanent fixtures like kitchen islands or built-in cabinets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Buy extra for future repairs:</strong> Keep 5-10 extra units for future repairs or replacements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Check batch numbers:</strong> Ensure all materials come from the same production batch for color consistency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Consider layout direction:</strong> Running planks parallel to the longest wall typically requires less wastage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Use presets:</strong> Start with standard material sizes from the preset templates for quick estimates.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <ToolFaq items={faq} />

      {/* Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Benefits of Using This Calculator</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-700 text-sm">
              Get real-time calculations as you type with no delays or page refreshes.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Accurate Estimates</h3>
            <p className="text-gray-700 text-sm">
              Precise calculations with automatic wastage ensure you order the right amount.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">Save Money</h3>
            <p className="text-gray-700 text-sm">
              Avoid over-ordering or under-ordering materials, reducing waste and extra costs.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Export Reports</h3>
            <p className="text-gray-700 text-sm">
              Download CSV or text reports for quotes, budgets, and project documentation.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Materials</h3>
            <p className="text-gray-700 text-sm">
              Support for tiles, wood, laminate, marble, and custom materials in one tool.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p className="text-gray-700 text-sm">
              Works perfectly on all devices for on-site measurements and calculations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
