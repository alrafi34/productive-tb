export default function GlassPanelSizeCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Glass Panel Size Calculator</h2>
        <p className="mb-4">
          The <strong>Glass Panel Size Calculator</strong> is a precision tool designed to help architects, engineers, glass installers, 
          and fabricators calculate accurate glass dimensions for installation in windows, doors, partitions, and other architectural applications. 
          This calculator eliminates manual calculation errors and ensures perfect fitting glass panels.
        </p>
        <p>
          By accounting for opening dimensions, frame clearances, and multi-panel configurations, this tool provides exact cut sizes 
          for glass panels, reducing material waste and preventing costly installation issues.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Glass Panel Size Calculator</h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Select Unit:</strong> Choose your preferred measurement unit (mm, cm, or inches).</li>
          <li><strong>Enter Opening Dimensions:</strong> Input the width and height of your opening.</li>
          <li><strong>Set Clearances:</strong> Specify clearance gaps for left, right, top, and bottom edges.</li>
          <li><strong>Configure Panels:</strong> Enter the number of panels and gap between them if multiple panels.</li>
          <li><strong>Choose Frame Type:</strong> Select a preset or custom frame type for automatic clearance adjustment.</li>
          <li><strong>View Results:</strong> The calculator instantly displays panel width, glass height, and total area.</li>
          <li><strong>Export Data:</strong> Download calculations as text for documentation and ordering.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Glass Panel Calculation Formulas</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Single Panel Formula</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm space-y-2">
              <div>Glass Width = Opening Width − (Left Clearance + Right Clearance)</div>
              <div>Glass Height = Opening Height − (Top Clearance + Bottom Clearance)</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Multi-Panel Formula</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm space-y-2">
              <div>Available Width = Opening Width − (Left + Right Clearances)</div>
              <div>Total Gap Width = (Panel Count − 1) × Gap Between Panels</div>
              <div>Panel Width = (Available Width − Total Gap Width) ÷ Panel Count</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="font-semibold text-blue-900 mb-3">Example 1: Single Panel Window</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Input:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Opening Width: 1000 mm</li>
                <li>Opening Height: 2000 mm</li>
                <li>Clearance: 5 mm each side</li>
              </ul>
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Glass Width = 1000 − (5 + 5) = 990 mm</p>
              <p className="ml-4">Glass Height = 2000 − (5 + 5) = 1990 mm</p>
              <p className="mt-3"><strong>Result:</strong> <span className="font-bold text-blue-900">990 mm × 1990 mm</span></p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h3 className="font-semibold text-green-900 mb-3">Example 2: Three-Panel Sliding Door</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Input:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Opening Width: 1500 mm</li>
                <li>Opening Height: 2000 mm</li>
                <li>Panel Count: 3</li>
                <li>Gap Between Panels: 5 mm</li>
                <li>Clearance: 5 mm each side</li>
              </ul>
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Available Width = 1500 − (5 + 5) = 1490 mm</p>
              <p className="ml-4">Total Gap = (3 − 1) × 5 = 10 mm</p>
              <p className="ml-4">Panel Width = (1490 − 10) ÷ 3 = 493.33 mm</p>
              <p className="ml-4">Glass Height = 2000 − (5 + 5) = 1990 mm</p>
              <p className="mt-3"><strong>Result:</strong> <span className="font-bold text-green-900">3 panels of 493.33 mm × 1990 mm</span></p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <h3 className="font-semibold text-purple-900 mb-3">Example 3: Frameless Installation</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Input:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Opening Width: 800 mm</li>
                <li>Opening Height: 1200 mm</li>
                <li>Clearance: 2 mm each side (frameless)</li>
              </ul>
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Glass Width = 800 − (2 + 2) = 796 mm</p>
              <p className="ml-4">Glass Height = 1200 − (2 + 2) = 1196 mm</p>
              <p className="mt-3"><strong>Result:</strong> <span className="font-bold text-purple-900">796 mm × 1196 mm</span></p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Clearance Guidelines</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Frame Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Clearance</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Frameless</td>
                <td className="px-4 py-3 text-sm font-mono">2-3 mm</td>
                <td className="px-4 py-3 text-sm">Minimal clearance for tight fit</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Aluminum Frame</td>
                <td className="px-4 py-3 text-sm font-mono">5-6 mm</td>
                <td className="px-4 py-3 text-sm">Standard window/door frames</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Sliding System</td>
                <td className="px-4 py-3 text-sm font-mono">8-10 mm</td>
                <td className="px-4 py-3 text-sm">Sliding doors and windows</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Wood Frame</td>
                <td className="px-4 py-3 text-sm font-mono">6-8 mm</td>
                <td className="px-4 py-3 text-sm">Traditional wood frames</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">UPVC Frame</td>
                <td className="px-4 py-3 text-sm font-mono">5-7 mm</td>
                <td className="px-4 py-3 text-sm">Modern UPVC windows</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🪟 Windows</h3>
            <p className="text-sm">Calculate glass sizes for fixed, sliding, and casement windows.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🚪 Doors</h3>
            <p className="text-sm">Determine glass panel dimensions for entry doors and sliding doors.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏢 Partitions</h3>
            <p className="text-sm">Calculate glass sizes for office partitions and room dividers.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏠 Shower Enclosures</h3>
            <p className="text-sm">Measure glass panels for bathroom shower enclosures.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏗️ Facades</h3>
            <p className="text-sm">Calculate curtain wall and facade glass panel dimensions.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🪞 Mirrors</h3>
            <p className="text-sm">Determine mirror sizes for wall installations and furniture.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Measure Opening Accurately</h3>
              <p className="text-sm">Use precise measurements from the actual opening, not architectural drawings alone.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Account for Frame Type</h3>
              <p className="text-sm">Different frame systems require different clearances. Use appropriate presets or consult manufacturer specs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Consider Thermal Expansion</h3>
              <p className="text-sm">In extreme temperature environments, add extra clearance for glass expansion.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Verify Panel Width</h3>
              <p className="text-sm">For multi-panel installations, ensure individual panel widths are practical for handling and installation.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Check Maximum Sizes</h3>
              <p className="text-sm">Verify that calculated dimensions don't exceed glass manufacturer's maximum panel sizes.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Document Calculations</h3>
              <p className="text-sm">Export and save calculations for ordering, fabrication, and installation reference.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <ul className="list-disc list-inside space-y-2 text-sm text-red-900">
            <li><strong>Insufficient Clearance:</strong> Too little clearance can cause binding, cracking, or installation failure.</li>
            <li><strong>Excessive Clearance:</strong> Too much clearance creates gaps, drafts, and poor aesthetics.</li>
            <li><strong>Ignoring Frame Depth:</strong> Ensure glass thickness is compatible with frame rabbet depth.</li>
            <li><strong>Forgetting Gaskets:</strong> Account for gasket or seal thickness in clearance calculations.</li>
            <li><strong>Not Checking Squareness:</strong> Measure diagonals to verify opening is square before ordering.</li>
            <li><strong>Mixing Units:</strong> Always use consistent units throughout calculations to avoid errors.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Glass Types and Considerations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Tempered Glass</h3>
            <p className="text-sm text-blue-900">Cannot be cut after tempering. Dimensions must be exact before fabrication.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Laminated Glass</h3>
            <p className="text-sm text-blue-900">Slightly heavier. Ensure frame can support weight and thickness.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Insulated Glass</h3>
            <p className="text-sm text-blue-900">Double or triple pane. Check frame depth for proper fit.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Low-E Glass</h3>
            <p className="text-sm text-blue-900">Coated surface. Handle with care and specify coating side.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">How much clearance should I leave for glass panels?</h3>
            <p className="text-sm text-gray-700">
              Standard clearance is 5-6mm for aluminum frames, 2-3mm for frameless installations, and 8-10mm for sliding systems. 
              Always consult frame manufacturer specifications for exact requirements.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Can I cut tempered glass to size after ordering?</h3>
            <p className="text-sm text-gray-700">
              No, tempered glass cannot be cut, drilled, or modified after the tempering process. All dimensions, holes, and edge 
              work must be completed before tempering. Order exact sizes from this calculator.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">What if my opening is not perfectly square?</h3>
            <p className="text-sm text-gray-700">
              Measure all four sides and both diagonals. Use the smallest measurements for glass dimensions. Consider shimming 
              or adjusting the frame to make it square before glass installation.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">How do I calculate for multiple panels in one opening?</h3>
            <p className="text-sm text-gray-700">
              Enter the total number of panels and the gap between them. The calculator automatically divides the available 
              width equally among all panels, accounting for gaps. Each panel will be the same width.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Should I account for gaskets in clearance?</h3>
            <p className="text-sm text-gray-700">
              Yes, if using setting blocks or gaskets, include their thickness in your clearance measurements. Typical gaskets 
              add 2-4mm per side. Check with your frame supplier for exact gasket dimensions.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">What units should I use for ordering glass?</h3>
            <p className="text-sm text-gray-700">
              Most glass fabricators work in millimeters for precision. This calculator supports mm, cm, and inches. 
              Always confirm with your supplier which unit they prefer for orders.
            </p>
          </div>

        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Glass Panel Size Calculator?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-gray-900">Instant Calculations</h3>
              <p className="text-sm">Real-time results as you type with 150ms debouncing for smooth performance.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-semibold text-gray-900">Precise Dimensions</h3>
              <p className="text-sm">Accurate calculations using industry-standard formulas and clearance guidelines.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <h3 className="font-semibold text-gray-900">Mobile Friendly</h3>
              <p className="text-sm">Responsive design works perfectly on phones, tablets, and desktop computers.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💾</span>
            <div>
              <h3 className="font-semibold text-gray-900">Save & Export</h3>
              <p className="text-sm">Save calculations to history and export as text for documentation.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-semibold text-gray-900">100% Private</h3>
              <p className="text-sm">All calculations run in your browser. No data sent to servers.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🆓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Completely Free</h3>
              <p className="text-sm">No registration, no limits, no hidden costs. Use as much as you need.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Tips</h2>
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">1.</span>
              <span className="text-sm"><strong>Always verify measurements:</strong> Measure twice, order once. Double-check all dimensions before placing orders.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <span className="text-sm"><strong>Use frame presets:</strong> Start with standard presets and adjust based on specific frame requirements.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <span className="text-sm"><strong>Consider installation method:</strong> Different installation techniques may require different clearances.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">4.</span>
              <span className="text-sm"><strong>Account for building movement:</strong> In high-rise buildings, allow extra clearance for structural movement.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">5.</span>
              <span className="text-sm"><strong>Consult professionals:</strong> This tool provides accurate estimates, but always verify with glass fabricators for final specifications.</span>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
