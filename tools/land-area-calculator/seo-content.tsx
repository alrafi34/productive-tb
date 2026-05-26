export default function LandAreaCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Land Area Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Land Area Calculator is a fast, browser-based utility that computes land area in square feet from length and width dimensions. It supports input in feet, meters, and yards, automatically converting to square feet and providing additional conversions to square meters, square yards, and acres.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Whether you are buying or selling property, planning construction, or estimating agricultural land, this tool gives you instant, accurate results without any backend or internet dependency.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Instant Calculations:</strong> Results update in real-time as you type, with debounced input handling for smooth performance.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Multi-Unit Support:</strong> Enter dimensions in feet, meters, or yards — the tool converts everything to square feet automatically.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Conversion Outputs:</strong> Alongside square feet, see results in square meters, square yards, and acres.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Save up to 10 recent calculations locally and reload them with one click.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Copy &amp; Share:</strong> Copy the result to clipboard or generate a shareable link with your inputs pre-filled.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export:</strong> Download a formatted text report of your calculation.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Mobile-First:</strong> Large touch targets, numeric keyboard support, and a responsive layout for all screen sizes.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Formula &amp; Conversion</h2>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Basic Formula</h3>
              <code className="text-sm text-gray-700">Area = Length × Width</code>
              <p className="text-sm text-gray-600 mt-2">
                For a rectangular plot, multiply the length by the width. When dimensions are in non-foot units, each dimension is first converted to feet before multiplication.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Unit Conversion Factors</h3>
              <div className="space-y-1 text-sm text-gray-700 font-mono">
                <div>1 meter = 3.28084 feet</div>
                <div>1 yard = 3 feet</div>
                <div>1 sq ft = 0.092903 sq m</div>
                <div>1 sq ft = 0.111111 sq yd</div>
                <div>1 acre = 43,560 sq ft</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example: Meters Input</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <div>Length = 10 m → 32.8084 ft</div>
                <div>Width = 20 m → 65.6168 ft</div>
                <div>Area = 32.8084 × 65.6168 = <strong>2,152.78 sq ft</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Select Unit:</strong> Choose feet, meters, or yards from the unit selector.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>Enter Length:</strong> Type the length of your land plot.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Enter Width:</strong> Type the width of your land plot.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>View Results:</strong> The area in square feet updates instantly, along with sq m, sq yd, and acres.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>Copy or Share:</strong> Use the copy button to grab the result, or generate a shareable link.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>Save to History:</strong> Click "Save" to store the calculation for later reference.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Uses This Tool</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Real Estate</h3>
              <p className="text-sm text-blue-800">Buyers, sellers, and agents quickly verify plot sizes and compare listings in a consistent unit.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Construction</h3>
              <p className="text-sm text-green-800">Engineers and contractors estimate material quantities and site coverage from land dimensions.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Agriculture</h3>
              <p className="text-sm text-purple-800">Farmers calculate field area to plan irrigation, seeding rates, and crop yield estimates.</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Homeowners</h3>
              <p className="text-sm text-orange-800">Homeowners measure yards, gardens, and outdoor spaces for landscaping and fencing projects.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate land area in square feet?</h3>
              <p className="text-gray-700">Multiply the length by the width of the rectangular plot. If your dimensions are in meters or yards, the calculator converts them to feet first before multiplying.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I enter dimensions in meters?</h3>
              <p className="text-gray-700">Yes. Select "Meters" from the unit dropdown and enter your dimensions. The tool automatically converts to feet using the factor 1 m = 3.28084 ft.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How many square feet are in an acre?</h3>
              <p className="text-gray-700">One acre equals 43,560 square feet. The calculator shows the acreage alongside the square feet result.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Does this work for non-rectangular land?</h3>
              <p className="text-gray-700">This calculator is designed for rectangular plots. For irregular shapes, use the Plot Area Calculator which supports triangles and trapezoids.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is my data stored anywhere?</h3>
              <p className="text-gray-700">No. All calculations happen entirely in your browser. History is saved only to your device's local storage and never sent to any server.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
