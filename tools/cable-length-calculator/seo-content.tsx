export default function CableLengthCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Cable Length Calculator
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Cable Length Calculator is a professional tool designed to help electricians, network engineers, and 
            installers accurately determine the required cable length for any installation project. It accounts for 
            distance, slack allowance, bends, and installation conditions to ensure you order the right amount of 
            cable without shortages or excessive waste.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Accurate Cable Length Matters
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Underestimating cable length leads to project delays, additional costs, and potential safety issues from 
            splicing or extending cables. Overestimating results in material waste and increased project costs. This 
            calculator helps you find the optimal cable length by considering all installation factors.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Professional installations require slack for terminations, service loops, and future maintenance. The 
            calculator automatically factors in these requirements based on cable type and installation method.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How Cable Length Calculation Works
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Base Distance
              </h3>
              <p className="text-blue-800 text-sm">
                The straight-line or measured distance from the cable origin to the destination. This is your starting 
                point for all calculations.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Slack Allowance
              </h3>
              <p className="text-green-800 text-sm">
                Additional cable length (typically 10-20%) for terminations, service loops, and installation flexibility. 
                Prevents tension on connections and allows for future adjustments or repairs.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Bend Allowance
              </h3>
              <p className="text-purple-800 text-sm">
                Extra length required for each bend or turn in the cable path. Typically 0.3-0.5 meters per 90-degree 
                bend, depending on cable type and bend radius requirements.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Installation Factor
              </h3>
              <p className="text-yellow-800 text-sm">
                Multiplier based on installation method. Conduit runs require more length due to friction and pulling 
                constraints. Underground installations need extra for settling and future access.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recommended Slack Percentages
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Cable Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Recommended Slack</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">Electrical Power</td>
                  <td className="px-4 py-3 text-gray-700">10-15%</td>
                  <td className="px-4 py-3 text-gray-700">Terminations and service loops</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Ethernet (Cat5e/6)</td>
                  <td className="px-4 py-3 text-gray-700">10-12%</td>
                  <td className="px-4 py-3 text-gray-700">Patch panel connections</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Fiber Optic</td>
                  <td className="px-4 py-3 text-gray-700">15-20%</td>
                  <td className="px-4 py-3 text-gray-700">Splice trays and service loops</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Coaxial</td>
                  <td className="px-4 py-3 text-gray-700">10-12%</td>
                  <td className="px-4 py-3 text-gray-700">Connector installation</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Underground</td>
                  <td className="px-4 py-3 text-gray-700">15-20%</td>
                  <td className="px-4 py-3 text-gray-700">Settling and future access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Installation Type Factors
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Straight Run (1.0×)</h3>
              <p className="text-sm text-gray-700">
                Direct, unobstructed cable path with minimal bends. No additional length factor required.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">In Conduit (1.05×)</h3>
              <p className="text-sm text-gray-700">
                Cable pulled through conduit. Extra length accounts for friction and pulling constraints.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Wall Routing (1.1×)</h3>
              <p className="text-sm text-gray-700">
                Cable routed through walls, studs, or joists. Additional length for vertical and horizontal runs.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Underground (1.15×)</h3>
              <p className="text-sm text-gray-700">
                Buried cable installation. Extra length for settling, depth changes, and future access.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Overhead (1.08×)</h3>
              <p className="text-sm text-gray-700">
                Aerial cable installation. Additional length for sag, pole-to-pole spans, and weather movement.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Common Applications
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Residential Wiring:</strong> Electrical circuits, home networking, security systems</li>
            <li><strong>Commercial Buildings:</strong> Office networks, lighting circuits, HVAC controls</li>
            <li><strong>Data Centers:</strong> Server connections, fiber backbones, patch panel runs</li>
            <li><strong>Industrial Facilities:</strong> Motor circuits, control wiring, instrumentation</li>
            <li><strong>Telecommunications:</strong> Fiber optic networks, coaxial distribution, telephone lines</li>
            <li><strong>Solar Installations:</strong> DC wiring from panels to inverters</li>
            <li><strong>Security Systems:</strong> Camera cables, access control wiring</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cable-Specific Considerations
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Electrical Power Cables</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Allow slack at both ends for terminations in junction boxes or panels</li>
                <li>Consider voltage drop for long runs (use voltage drop calculator)</li>
                <li>Account for conduit fill requirements</li>
                <li>Add extra length for future circuit modifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ethernet Cables</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Maximum run length: 90 meters (295 feet) for solid cable</li>
                <li>Add 10% for patch panel terminations and cable management</li>
                <li>Avoid tight bends (minimum 4× cable diameter)</li>
                <li>Consider plenum-rated cable for air handling spaces</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fiber Optic Cables</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Require larger bend radius (typically 10× cable diameter)</li>
                <li>Need service loops at splice points (3-5 meters)</li>
                <li>More sensitive to installation stress and tension</li>
                <li>Consider fusion splice or mechanical splice requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Coaxial Cables</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Signal loss increases with length (check specifications)</li>
                <li>Avoid sharp bends to prevent impedance changes</li>
                <li>Add slack for connector installation and weatherproofing</li>
                <li>Consider amplifiers for long runs</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Use This Calculator
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Enter the measured distance between cable endpoints</li>
            <li>Select the appropriate unit (meters or feet)</li>
            <li>Choose the cable type (electrical, Ethernet, fiber, or coaxial)</li>
            <li>Select the installation method</li>
            <li>Adjust slack percentage (or use recommended value)</li>
            <li>Enter the number of bends or turns in the cable path</li>
            <li>Set bend allowance per turn (default 0.5m)</li>
            <li>View instant results with total cable length</li>
            <li>Review recommendations and breakdown</li>
            <li>Save to history or export results</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Real-time calculations</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Metric and imperial units</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Multiple cable types</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Installation type factors</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Adjustable slack percentage</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Bend allowance calculation</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Smart recommendations</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Detailed breakdown</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Common presets</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Calculation history</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Export to text/CSV</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mobile responsive</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Always measure the actual cable path, not just straight-line distance</li>
            <li>Add extra slack for terminations at both ends (minimum 30cm each)</li>
            <li>Account for vertical rises and drops in multi-story installations</li>
            <li>Consider future modifications or repairs when determining slack</li>
            <li>Document cable routes and lengths for future reference</li>
            <li>Order slightly more cable than calculated to account for waste and errors</li>
            <li>Use cable management accessories to organize excess slack</li>
            <li>Follow manufacturer specifications for minimum bend radius</li>
            <li>Label cables at both ends for easy identification</li>
            <li>Test cables after installation to verify proper length and connections</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How much slack should I add?
              </h3>
              <p className="text-gray-700">
                Generally, add 10-15% slack for most installations. Fiber optic cables need 15-20%, and underground 
                installations require 15-20%. Always add at least 30cm (1 foot) at each end for terminations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is bend allowance?
              </h3>
              <p className="text-gray-700">
                Bend allowance is extra cable length needed for each turn or bend in the cable path. A 90-degree bend 
                typically requires 0.3-0.5 meters of additional cable, depending on the cable type and bend radius.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Should I round up the final length?
              </h3>
              <p className="text-gray-700">
                Yes, always round up to the nearest standard cable length or add a small buffer (1-2 meters) to account 
                for measurement errors, cutting waste, and unforeseen installation challenges.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if my cable run exceeds maximum length?
              </h3>
              <p className="text-gray-700">
                For Ethernet cables exceeding 90 meters, use fiber optic cable or install network switches/repeaters. 
                For electrical cables, consider voltage drop and wire size requirements. Long fiber runs may need 
                amplification or regeneration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I measure cable distance accurately?
              </h3>
              <p className="text-gray-700">
                Use a measuring tape or laser distance meter to measure the actual cable path, including vertical and 
                horizontal runs. For complex routes, break the measurement into segments and add them together. Don't 
                forget to include rises to ceiling spaces or drops to floor outlets.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Common Mistakes to Avoid
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-red-900 text-sm">
              <li>Measuring straight-line distance instead of actual cable path</li>
              <li>Forgetting to add slack for terminations and service loops</li>
              <li>Not accounting for vertical rises in multi-story buildings</li>
              <li>Ignoring bend allowance for corners and turns</li>
              <li>Underestimating conduit friction and pulling constraints</li>
              <li>Not considering future maintenance or modifications</li>
              <li>Ordering exact calculated length without buffer</li>
              <li>Using inappropriate cable type for the application</li>
              <li>Exceeding maximum cable length specifications</li>
              <li>Not documenting cable routes and lengths</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Disclaimer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator provides estimates based on typical installation practices and industry standards. Actual 
            cable requirements may vary depending on specific site conditions, installation methods, and local codes. 
            Always verify measurements on-site and consult with qualified professionals for critical installations. 
            Add appropriate safety margins and follow manufacturer specifications for cable handling and installation.
          </p>
        </section>

      </div>
    </div>
  );
}
