export default function PlumbingPipeSizeCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Plumbing Pipe Size Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Plumbing Pipe Size Calculator is a professional engineering tool that helps you determine the optimal pipe diameter 
            for your plumbing system based on flow rate and velocity requirements. Using the continuity equation, this calculator 
            provides instant, accurate results for residential, commercial, and industrial applications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Select Calculation Mode</h3>
              <p className="text-gray-700">
                Choose what you want to calculate: pipe diameter, flow velocity, or flow rate. The calculator will automatically 
                adjust the input fields based on your selection.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Enter Parameters</h3>
              <p className="text-gray-700">
                Input your known values such as flow rate (in L/s, m³/h, GPM, or ft³/s) and velocity (in m/s or ft/s). 
                Select your pipe material to get velocity recommendations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Review Results</h3>
              <p className="text-gray-700">
                The calculator instantly displays the calculated value along with conversions in multiple units. Review the 
                notes and recommendations to ensure your design meets engineering standards.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Continuity Equation</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator uses the continuity equation, a fundamental principle in fluid mechanics:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="font-mono text-center text-lg">Q = A × V</p>
            <p className="text-center text-sm text-gray-600 mt-2">
              Where Q = Flow Rate, A = Cross-sectional Area, V = Velocity
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            For circular pipes, the area is A = π × (D/2)², which gives us the diameter formula:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-mono text-center text-lg">D = √((4 × Q) / (π × V))</p>
            <p className="text-center text-sm text-gray-600 mt-2">
              Where D = Pipe Diameter
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pipe Material Selection Guide</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">PVC (Polyvinyl Chloride)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Lightweight, corrosion-resistant, and cost-effective. Ideal for cold water supply and drainage systems.
              </p>
              <p className="text-xs text-primary font-semibold">Recommended velocity: 0.6-2.5 m/s</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Copper</h3>
              <p className="text-sm text-gray-700 mb-2">
                Durable with antimicrobial properties. Excellent for hot and cold water distribution in residential buildings.
              </p>
              <p className="text-xs text-primary font-semibold">Recommended velocity: 0.9-3.0 m/s</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Steel</h3>
              <p className="text-sm text-gray-700 mb-2">
                High strength for high-pressure applications. Used in commercial and industrial systems.
              </p>
              <p className="text-xs text-primary font-semibold">Recommended velocity: 1.0-3.5 m/s</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Cast Iron</h3>
              <p className="text-sm text-gray-700 mb-2">
                Heavy-duty with excellent sound dampening. Traditional choice for drainage and sewer systems.
              </p>
              <p className="text-xs text-primary font-semibold">Recommended velocity: 0.6-2.0 m/s</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Velocity Guidelines</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Proper flow velocity is critical for system performance:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Too Low (&lt;0.6 m/s):</strong> Risk of sediment deposition and bacterial growth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Optimal (0.6-3.0 m/s):</strong> Balanced flow with minimal noise and erosion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Too High (&gt;3.0 m/s):</strong> Excessive noise, vibration, and pipe erosion</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Applications</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Residential Water Supply</h3>
              <p className="text-sm text-gray-700">
                Typical flow rates: 0.3-2.0 L/s. Copper or PVC pipes with velocities around 1.5 m/s for quiet operation.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Commercial Buildings</h3>
              <p className="text-sm text-gray-700">
                Higher flow rates: 5-20 L/s. Steel pipes with velocities up to 2.5 m/s for multi-story distribution.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Fire Protection Systems</h3>
              <p className="text-sm text-gray-700">
                Large flow rates: 500+ GPM. Steel pipes designed for high velocities (up to 5 ft/s) during emergency operation.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Industrial Process Lines</h3>
              <p className="text-sm text-gray-700">
                Variable flow rates: 10-100+ m³/h. Material selection based on fluid properties and pressure requirements.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Considerations</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Pressure Loss</h3>
              <p className="text-sm text-blue-800">
                Smaller pipes increase friction losses. Balance pipe size with pressure requirements and energy costs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Future Expansion</h3>
              <p className="text-sm text-blue-800">
                Consider oversizing pipes slightly to accommodate future demand increases without system replacement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Code Compliance</h3>
              <p className="text-sm text-blue-800">
                Always verify calculations against local plumbing codes and standards (IPC, UPC, or regional codes).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Water Hammer</h3>
              <p className="text-sm text-blue-800">
                High velocities increase water hammer risk. Install pressure relief devices and consider velocity limits.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the ideal flow velocity for residential plumbing?</h3>
              <p className="text-gray-700">
                For residential applications, maintain velocities between 1.2-2.0 m/s (4-6.5 ft/s) to minimize noise while 
                ensuring adequate flow. Lower velocities (around 1.5 m/s) are preferred for quiet operation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I convert between different flow rate units?</h3>
              <p className="text-gray-700">
                The calculator automatically handles conversions. Common conversions: 1 L/s = 15.85 GPM = 3.6 m³/h. 
                Results are displayed in multiple units for convenience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Should I round up or down when selecting pipe size?</h3>
              <p className="text-gray-700">
                Always round up to the nearest standard pipe size. Using a slightly larger pipe reduces pressure loss and 
                provides a safety margin. Standard sizes include 15mm, 20mm, 25mm, 32mm, 40mm, 50mm, etc.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Does pipe material affect the calculation?</h3>
              <p className="text-gray-700">
                The basic diameter calculation is material-independent, but different materials have different recommended 
                velocity ranges due to factors like roughness, strength, and noise characteristics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What causes high velocity in pipes?</h3>
              <p className="text-gray-700">
                High velocity results from undersized pipes or excessive flow rates. This can cause noise, vibration, erosion, 
                and water hammer. Increase pipe diameter or reduce flow rate to lower velocity.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Engineering Best Practices</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Always verify calculations with local plumbing codes and standards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider peak demand scenarios, not just average flow rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Account for friction losses in long pipe runs and fittings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Select standard pipe sizes available from manufacturers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Document all calculations for permit applications and future reference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider system expansion and future modifications in your design</span>
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
                Real-time calculations as you type with no delays or page reloads
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-1">Engineering Accuracy</h3>
              <p className="text-sm text-gray-700">
                Based on proven fluid mechanics principles and industry standards
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-semibold text-gray-800 mb-1">Multi-Unit Support</h3>
              <p className="text-sm text-gray-700">
                Works with both metric and imperial units for global applications
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Tool for Engineers</h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator is designed for civil engineers, plumbing engineers, architects, and construction professionals 
            who need accurate pipe sizing calculations. It combines engineering precision with an intuitive interface, 
            making complex hydraulic calculations accessible while maintaining professional-grade accuracy. All calculations 
            run entirely in your browser with no data sent to servers, ensuring privacy and instant performance.
          </p>
        </section>

      </div>
    </div>
  );
}
