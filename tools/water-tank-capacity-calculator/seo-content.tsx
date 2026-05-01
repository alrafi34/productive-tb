export default function WaterTankCapacityCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Water Tank Capacity Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Water Tank Capacity Calculator is a free online tool that helps you calculate the volume and storage capacity of water tanks based on their shape and dimensions. Whether you're a civil engineer designing water storage systems, an architect planning building infrastructure, a homeowner installing a water tank, or a student learning volume calculations, this calculator provides instant, accurate results for cylindrical and rectangular tanks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Select Tank Shape</h3>
              <p className="text-gray-700">Choose between Rectangular, Cylindrical (Vertical), or Cylindrical (Horizontal) tank shapes. The input fields will adjust based on your selection.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Choose Measurement Unit</h3>
              <p className="text-gray-700">Select your preferred unit: meters, centimeters, feet, or inches. All calculations will use your selected unit.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Enter Dimensions</h3>
              <p className="text-gray-700">For rectangular tanks, enter length, width, and height. For cylindrical tanks, enter radius and height. The calculator updates results in real-time.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Review Results</h3>
              <p className="text-gray-700">The calculator instantly displays tank capacity in liters and gallons, plus volume in cubic meters and cubic feet.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Volume Calculation Formulas</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rectangular Tank</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-2">
                <code className="text-gray-800">Volume = Length × Width × Height</code>
              </div>
              <p className="text-gray-700">
                For a rectangular or box-shaped tank, multiply the three dimensions together. This is the simplest volume calculation.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cylindrical Tank</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-2">
                <code className="text-gray-800">Volume = π × r² × h</code>
              </div>
              <p className="text-gray-700">
                For cylindrical tanks (both vertical and horizontal), use pi (3.14159) times the radius squared times the height. The formula is the same for both orientations.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unit Conversions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1 cubic meter</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Liters</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1,000 liters</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1 cubic meter</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Cubic feet</td>
                  <td className="px-4 py-3 text-sm text-gray-600">35.31 ft³</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1 cubic foot</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Liters</td>
                  <td className="px-4 py-3 text-sm text-gray-600">28.32 liters</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1 liter</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Gallons (US)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">0.264 gallons</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tank Shape Comparison</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Rectangular Tanks</h3>
              <p className="text-sm text-blue-800">
                <strong>Advantages:</strong> Easier to install in corners, against walls, or in tight spaces. Simple to manufacture and often more cost-effective for small sizes.
              </p>
              <p className="text-sm text-blue-800 mt-2">
                <strong>Best for:</strong> Residential basements, rooftop installations, and space-constrained locations.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Cylindrical Tanks</h3>
              <p className="text-sm text-green-800">
                <strong>Advantages:</strong> Structurally stronger, better pressure distribution, more efficient use of materials for large capacities. No corners to collect sediment.
              </p>
              <p className="text-sm text-green-800 mt-2">
                <strong>Best for:</strong> Large-scale storage, underground installations, and high-pressure applications.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Tank Sizes</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>500-1,000 liters:</strong> Small residential tanks for backup water supply or garden use</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>2,000-5,000 liters:</strong> Medium residential tanks for household water storage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>5,000-10,000 liters:</strong> Large residential or small commercial tanks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>10,000-50,000 liters:</strong> Commercial or multi-family building storage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>50,000+ liters:</strong> Industrial, municipal, or community water storage</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Considerations</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Foundation Requirements</h3>
              <p className="text-gray-700">Water is heavy (1 liter = 1 kg). A 5,000-liter tank weighs 5 tons when full. Ensure your foundation can support the total weight including the tank structure.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Location Selection</h3>
              <p className="text-gray-700">Consider accessibility for filling and maintenance, proximity to usage points, and protection from freezing temperatures in cold climates.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Overflow Protection</h3>
              <p className="text-gray-700">Install overflow pipes and drainage systems to prevent flooding. Position overflow outlets away from building foundations.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Ventilation</h3>
              <p className="text-gray-700">Proper ventilation prevents vacuum formation during water withdrawal and allows air circulation to maintain water quality.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintenance Tips</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Regular Cleaning:</strong> Clean tanks annually to remove sediment and prevent bacterial growth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Inspection:</strong> Check for cracks, leaks, and structural integrity every 6 months</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Cover Maintenance:</strong> Ensure lids and covers are secure to prevent contamination and mosquito breeding</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Water Quality:</strong> Test water quality periodically, especially for potable water storage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Winterization:</strong> In cold climates, drain or insulate tanks to prevent freezing damage</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I calculate the capacity of my water tank?</h3>
              <p className="text-gray-700">
                Measure your tank dimensions (length, width, height for rectangular; radius and height for cylindrical), select the appropriate shape in the calculator, enter your measurements, and get instant capacity results in liters and gallons.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What size water tank do I need for my home?</h3>
              <p className="text-gray-700">
                For residential use, calculate daily water consumption (typically 150-200 liters per person) and multiply by the number of days of storage needed. A family of 4 typically needs 2,000-5,000 liters for 2-3 days of backup supply.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Which is better: rectangular or cylindrical tank?</h3>
              <p className="text-gray-700">
                Cylindrical tanks are structurally stronger and more efficient for large capacities. Rectangular tanks are better for tight spaces and easier to install in corners. Choose based on your space constraints and capacity needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How much does a full water tank weigh?</h3>
              <p className="text-gray-700">
                Water weighs approximately 1 kg per liter (or 8.34 lbs per gallon). Add the tank's empty weight to the water weight. For example, a 5,000-liter tank holds 5,000 kg (5 tons) of water plus the tank structure weight.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I use this calculator for other liquids?</h3>
              <p className="text-gray-700">
                Yes, the volume calculations work for any liquid. However, capacity conversions (liters, gallons) assume water. For other liquids, use the volume in cubic meters or cubic feet and apply the appropriate density conversion.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculations</h2>
          <p className="text-gray-700 leading-relaxed">
            For complete water storage system planning, consider using our related calculators: Rainwater Harvesting Calculator to estimate collection potential, Concrete Volume Calculator for tank foundation sizing, and Excavation Volume Calculator for underground tank installation. These tools work together to support comprehensive water storage system design.
          </p>
        </section>

      </div>
    </div>
  );
}
