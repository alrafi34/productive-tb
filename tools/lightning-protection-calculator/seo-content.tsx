export default function LightningProtectionCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Lightning Protection Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Lightning Protection Calculator is a professional estimation tool designed to help engineers, architects, and building planners assess lightning protection requirements for structures. This calculator provides preliminary risk assessments based on building height, area, location risk level, and structure type.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Whether you're designing a residential home, commercial building, or critical infrastructure, this calculator offers instant risk scoring and protection level recommendations to guide your lightning protection system planning.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-yellow-900">
              <strong>Important Disclaimer:</strong> This tool provides preliminary estimations for educational and planning purposes only. Professional engineering consultation and compliance with local building codes and lightning protection standards (such as NFPA 780, IEC 62305) are required for actual system design and installation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Risk Score Calculation:</strong> Comprehensive risk assessment based on multiple factors</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Protection Level Classification:</strong> Automatic determination of required protection level</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>System Recommendations:</strong> Specific lightning protection system suggestions</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Cost Estimation:</strong> Approximate cost ranges for different protection levels</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Common Presets:</strong> Quick calculations for typical building types</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Save and review previous assessments</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Reports:</strong> Download detailed assessment reports</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Risk Assessment Methodology</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Height Factor</h3>
              <p className="text-sm text-gray-700">
                Taller structures are more likely to be struck by lightning. The height factor is calculated as: <code>min(Height / 100, 2.0)</code>
              </p>
              <p className="text-sm text-gray-600 mt-2">Weight in risk score: 35%</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Area Factor</h3>
              <p className="text-sm text-gray-700">
                Larger building footprints have higher lightning strike probability. The area factor is calculated as: <code>min(Area / 1000, 1.5)</code>
              </p>
              <p className="text-sm text-gray-600 mt-2">Weight in risk score: 25%</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Location Risk Factor</h3>
              <p className="text-sm text-gray-700">
                Geographic location affects lightning frequency. Risk levels range from Low (0.2) to Very High (1.0) based on regional lightning activity.
              </p>
              <p className="text-sm text-gray-600 mt-2">Weight in risk score: 25%</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Structure Type Factor</h3>
              <p className="text-sm text-gray-700">
                Different structure types have varying protection requirements. Critical infrastructure requires the highest protection level.
              </p>
              <p className="text-sm text-gray-600 mt-2">Weight in risk score: 15%</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Overall Risk Score Formula</h3>
              <code className="text-sm text-blue-800">
                Risk Score = (Height × 0.35) + (Area × 0.25) + (Location Risk × 0.25) + (Structure Type × 0.15)
              </code>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Protection Levels</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Score</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Protection Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">System Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Est. Cost</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">&lt; 0.3</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Minimal</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Basic grounding system</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$500 - $2,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">0.3 - 0.5</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Basic</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Single air terminal with down conductors</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$2,000 - $5,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">0.5 - 0.7</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Moderate</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Multiple air terminals with mesh system</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$5,000 - $15,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">0.7 - 0.9</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Advanced multi-point protection system</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$15,000 - $50,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">&gt; 0.9</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Advanced</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Critical infrastructure protection system</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$50,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lightning Protection System Components</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Air Terminals (Lightning Rods)</h3>
              <p className="text-gray-700">
                Metallic rods installed at the highest points of a structure to intercept lightning strikes. Modern systems may use Early Streamer Emission (ESE) terminals for enhanced protection.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Down Conductors</h3>
              <p className="text-gray-700">
                Heavy-gauge cables that provide a low-resistance path for lightning current to flow from air terminals to the grounding system. Multiple down conductors are used for larger structures.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Grounding System</h3>
              <p className="text-gray-700">
                A network of ground rods, plates, or grids that safely dissipate lightning energy into the earth. Proper grounding is critical for system effectiveness and typically requires ground resistance below 10 ohms.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Surge Protection Devices (SPDs)</h3>
              <p className="text-gray-700">
                Electronic devices installed at electrical panels and sensitive equipment to protect against voltage surges caused by lightning strikes or switching events.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Bonding Connections</h3>
              <p className="text-gray-700">
                Metallic connections that bond all conductive building elements (metal roofs, pipes, HVAC systems) to the lightning protection system to prevent side flashes and ensure equipotential bonding.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Residential Buildings</h3>
              <p className="text-sm text-blue-800">
                Protect homes and residential structures from lightning damage. Essential in areas with high lightning activity.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Commercial Buildings</h3>
              <p className="text-sm text-green-800">
                Safeguard office buildings, retail centers, and commercial facilities from lightning strikes and electrical surges.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Industrial Facilities</h3>
              <p className="text-sm text-purple-800">
                Protect manufacturing plants, warehouses, and industrial structures with comprehensive lightning protection systems.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Critical Infrastructure</h3>
              <p className="text-sm text-orange-800">
                Advanced protection for data centers, hospitals, telecommunications facilities, and other mission-critical structures.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Enter Building Height:</strong> Input the height of your structure in meters.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>Enter Building Area:</strong> Input the building footprint area in square meters.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Select Location Risk:</strong> Choose the lightning risk level for your geographic area.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Select Structure Type:</strong> Choose the type of building or facility.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>Optional - Ground Resistance:</strong> If known, enter the ground resistance value.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>View Results:</strong> The calculator instantly shows risk score, protection level, and recommendations.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">7.</span>
              <span><strong>Use Presets:</strong> Click on common building types for quick calculations.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">8.</span>
              <span><strong>Export or Save:</strong> Download assessment reports or save to history for future reference.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lightning Protection Standards</h2>
          
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">NFPA 780 (USA)</h3>
              <p className="text-sm text-gray-700">
                Standard for the Installation of Lightning Protection Systems. Widely used in North America for residential, commercial, and industrial structures.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">IEC 62305 (International)</h3>
              <p className="text-sm text-gray-700">
                International standard for protection against lightning. Provides comprehensive guidelines for risk assessment and protection system design.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">BS EN 62305 (UK/Europe)</h3>
              <p className="text-sm text-gray-700">
                British and European standard based on IEC 62305. Includes specific requirements for lightning protection in European countries.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">UL 96A (USA)</h3>
              <p className="text-sm text-gray-700">
                Standard for Installation Requirements for Lightning Protection Systems. Focuses on component specifications and installation practices.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do all buildings need lightning protection?</h3>
              <p className="text-gray-700">
                Not all buildings require lightning protection systems. The need depends on factors like building height, location, structure type, and local building codes. Taller buildings, structures in high-risk areas, and critical infrastructure typically require protection.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does a lightning protection system work?</h3>
              <p className="text-gray-700">
                A lightning protection system provides a low-resistance path for lightning current to flow safely to ground. Air terminals intercept strikes, down conductors carry the current, and the grounding system dissipates energy into the earth, protecting the structure and its occupants.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is ground resistance and why is it important?</h3>
              <p className="text-gray-700">
                Ground resistance measures how easily electrical current flows into the earth. Lower resistance (typically below 10 ohms) ensures effective lightning energy dissipation. High ground resistance can reduce system effectiveness and may require additional grounding electrodes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I install a lightning protection system myself?</h3>
              <p className="text-gray-700">
                Lightning protection systems should be designed and installed by qualified professionals. Improper installation can be ineffective or even dangerous. Professional installation ensures compliance with standards and proper system performance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much does a lightning protection system cost?</h3>
              <p className="text-gray-700">
                Costs vary widely based on building size, complexity, and protection level required. Basic residential systems may cost $2,000-$5,000, while comprehensive commercial or industrial systems can range from $15,000 to $50,000 or more.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Does lightning protection prevent strikes?</h3>
              <p className="text-gray-700">
                Lightning protection systems don't prevent strikes. Instead, they provide a safe path for lightning current to reach ground, protecting the structure, electrical systems, and occupants from damage and injury.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Considerations</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-red-900">
              <strong>Professional Consultation Required:</strong> This calculator provides preliminary estimates only. Always consult with licensed electrical engineers and lightning protection specialists for actual system design.
            </p>
            <p className="text-sm text-red-900">
              <strong>Comply with Local Codes:</strong> Lightning protection requirements vary by jurisdiction. Ensure compliance with local building codes, electrical codes, and lightning protection standards.
            </p>
            <p className="text-sm text-red-900">
              <strong>Regular Inspection:</strong> Lightning protection systems require periodic inspection and maintenance to ensure continued effectiveness. Annual inspections are recommended.
            </p>
            <p className="text-sm text-red-900">
              <strong>Comprehensive Protection:</strong> Lightning protection should be part of a comprehensive electrical safety strategy including surge protection, proper grounding, and electrical system design.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
