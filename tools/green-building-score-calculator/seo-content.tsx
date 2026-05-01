export default function GreenBuildingScoreCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Green Building Score Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Green Building Score Calculator is a comprehensive sustainability assessment tool that helps architects, 
            developers, and building owners estimate how environmentally friendly their building is. This calculator 
            evaluates key sustainability factors including energy efficiency, water usage, materials, indoor environmental 
            quality, site impact, renewable energy, and waste management to provide an overall green building score.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Energy Efficiency</h3>
              <p className="text-gray-700">
                Adjust the energy efficiency slider (0-100%) based on your building's insulation, HVAC systems, 
                lighting, and overall energy performance. Higher values indicate better energy efficiency.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Water Efficiency</h3>
              <p className="text-gray-700">
                Set the water efficiency level based on low-flow fixtures, rainwater harvesting, greywater recycling, 
                and water conservation measures implemented in your building.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Material Sustainability</h3>
              <p className="text-gray-700">
                Select the type of materials used: Standard Materials (conventional), Recycled Materials (reused content), 
                or Eco-certified Materials (certified sustainable products).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Indoor Environmental Quality</h3>
              <p className="text-gray-700">
                Rate the indoor air quality, natural lighting, ventilation, and overall comfort level of your building's 
                interior spaces.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 5: Site & Additional Factors</h3>
              <p className="text-gray-700">
                Choose your site type (Urban, Suburban, or Rural), set renewable energy usage percentage, and select 
                your waste management approach.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 6: Review Score & Suggestions</h3>
              <p className="text-gray-700">
                The calculator instantly displays your total score (0-100), rating level, detailed breakdown by category, 
                and personalized improvement suggestions.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Scoring System</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Green Building Score is calculated using a weighted scoring system where each sustainability factor 
            contributes to the final score:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Energy Efficiency (25%):</strong> Largest impact on overall score</li>
              <li><strong>Water Efficiency (15%):</strong> Water conservation and management</li>
              <li><strong>Material Sustainability (15%):</strong> Eco-friendly material selection</li>
              <li><strong>Indoor Environmental Quality (15%):</strong> Occupant health and comfort</li>
              <li><strong>Site Sustainability (10%):</strong> Location and land use impact</li>
              <li><strong>Renewable Energy (10%):</strong> Clean energy generation</li>
              <li><strong>Waste Management (10%):</strong> Waste reduction and recycling</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rating Levels Explained</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Excellent (90-100)</h3>
              <p className="text-sm text-green-800">
                Outstanding sustainability performance. Building meets or exceeds highest green building standards 
                with comprehensive eco-friendly features across all categories.
              </p>
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Very Good (75-89)</h3>
              <p className="text-sm text-blue-800">
                Strong sustainability performance with significant green features. Building demonstrates commitment 
                to environmental responsibility with room for minor improvements.
              </p>
            </div>
            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Good (60-74)</h3>
              <p className="text-sm text-yellow-800">
                Moderate sustainability performance. Building has implemented several green features but has 
                opportunities for significant improvements in multiple areas.
              </p>
            </div>
            <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Average (40-59)</h3>
              <p className="text-sm text-orange-800">
                Basic sustainability measures in place. Building meets minimum requirements but needs substantial 
                improvements to achieve meaningful environmental performance.
              </p>
            </div>
            <div className="border border-red-200 bg-red-50 rounded-lg p-4 md:col-span-2">
              <h3 className="font-semibold text-red-900 mb-2">Poor (0-39)</h3>
              <p className="text-sm text-red-800">
                Limited sustainability features. Building requires comprehensive upgrades across multiple categories 
                to improve environmental performance and reduce ecological impact.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Sustainability Factors</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Energy Efficiency</h3>
              <p className="text-sm text-gray-700">
                Measures building insulation, HVAC efficiency, lighting systems, appliance efficiency, and overall 
                energy consumption. High-performance buildings use 30-50% less energy than standard construction.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Water Efficiency</h3>
              <p className="text-sm text-gray-700">
                Evaluates water-saving fixtures, rainwater harvesting, greywater recycling, irrigation efficiency, 
                and water conservation strategies. Efficient buildings can reduce water use by 30-50%.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Material Sustainability</h3>
              <p className="text-sm text-gray-700">
                Considers use of recycled materials, locally sourced products, rapidly renewable materials, 
                low-VOC products, and certified sustainable materials (FSC wood, recycled steel, etc.).
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Indoor Environmental Quality</h3>
              <p className="text-sm text-gray-700">
                Assesses air quality, natural lighting, ventilation, thermal comfort, acoustic performance, and 
                use of non-toxic materials. Directly impacts occupant health and productivity.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Site Sustainability</h3>
              <p className="text-sm text-gray-700">
                Evaluates location efficiency, access to public transportation, minimized site disturbance, 
                stormwater management, and heat island reduction strategies.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Renewable Energy</h3>
              <p className="text-sm text-gray-700">
                Measures on-site renewable energy generation (solar panels, wind turbines, geothermal systems) 
                and percentage of energy needs met by renewable sources.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Waste Management</h3>
              <p className="text-sm text-gray-700">
                Considers construction waste diversion, recycling programs, composting facilities, and strategies 
                to minimize waste generation throughout building lifecycle.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Improvement Strategies</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Energy Improvements</h3>
              <p className="text-sm text-blue-800">
                Upgrade insulation, install energy-efficient windows, use LED lighting, optimize HVAC systems, 
                add programmable thermostats, and seal air leaks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Water Conservation</h3>
              <p className="text-sm text-blue-800">
                Install low-flow fixtures, implement rainwater harvesting, use drought-resistant landscaping, 
                add greywater systems, and fix leaks promptly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Material Selection</h3>
              <p className="text-sm text-blue-800">
                Choose recycled content materials, use locally sourced products, select FSC-certified wood, 
                specify low-VOC paints and finishes, and prioritize durable materials.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Indoor Quality Enhancement</h3>
              <p className="text-sm text-blue-800">
                Maximize natural daylight, improve ventilation systems, use non-toxic materials, add air 
                filtration, and incorporate plants for air purification.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Renewable Energy Integration</h3>
              <p className="text-sm text-blue-800">
                Install solar panels, consider wind turbines where appropriate, explore geothermal systems, 
                and investigate community solar programs.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Green Buildings</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-800 mb-1">Cost Savings</h3>
              <p className="text-sm text-gray-700">
                Reduced energy and water bills, lower maintenance costs, and increased property value
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-semibold text-gray-800 mb-1">Environmental Impact</h3>
              <p className="text-sm text-gray-700">
                Lower carbon footprint, reduced resource consumption, and minimized environmental damage
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">😊</div>
              <h3 className="font-semibold text-gray-800 mb-1">Occupant Health</h3>
              <p className="text-sm text-gray-700">
                Improved air quality, better natural lighting, and enhanced comfort and productivity
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Green Building Certifications</h2>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-1">LEED (Leadership in Energy and Environmental Design)</h3>
              <p className="text-sm text-gray-700">
                Most widely recognized green building certification system. Rates buildings on sustainability 
                performance with Certified, Silver, Gold, and Platinum levels.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-1">BREEAM (Building Research Establishment Environmental Assessment Method)</h3>
              <p className="text-sm text-gray-700">
                International certification focusing on sustainable building design, construction, and operation. 
                Popular in Europe and Asia.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-1">Green Globes</h3>
              <p className="text-sm text-gray-700">
                Flexible, affordable green building certification with online assessment tools and third-party 
                verification.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-1">Living Building Challenge</h3>
              <p className="text-sm text-gray-700">
                Most rigorous green building standard requiring net-positive energy, water, and waste performance.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is a good green building score?</h3>
              <p className="text-gray-700">
                A score of 75 or above indicates very good to excellent sustainability performance. Scores between 
                60-74 show good performance with room for improvement. Buildings scoring below 60 should prioritize 
                sustainability upgrades.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How does this calculator compare to LEED certification?</h3>
              <p className="text-gray-700">
                This calculator provides a simplified sustainability assessment inspired by green building standards 
                like LEED. It's designed for quick estimation and educational purposes. Official LEED certification 
                requires detailed documentation and third-party verification.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Which factor has the biggest impact on the score?</h3>
              <p className="text-gray-700">
                Energy efficiency has the largest weight (25%) because it significantly impacts both environmental 
                performance and operating costs. However, all factors contribute to overall sustainability.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I use this for existing buildings?</h3>
              <p className="text-gray-700">
                Yes! This calculator works for both new construction and existing buildings. For existing buildings, 
                assess current performance and use suggestions to identify improvement opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How often should I reassess my building's score?</h3>
              <p className="text-gray-700">
                Reassess annually or after major upgrades to track improvement progress. Regular assessment helps 
                identify new opportunities and measure the impact of sustainability initiatives.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Start with energy efficiency improvements for maximum impact</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider lifecycle costs, not just initial construction expenses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Integrate sustainability from the design phase for best results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Focus on passive design strategies before active systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Prioritize improvements based on cost-effectiveness and impact</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Monitor and verify performance after implementation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Educate occupants on sustainable building features and practices</span>
            </li>
          </ul>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Quick Sustainability Assessment Tool</h2>
          <p className="text-gray-700 leading-relaxed">
            This Green Building Score Calculator provides instant sustainability assessment for architects, developers, 
            homeowners, and students. It offers real-time scoring, detailed breakdowns, and actionable improvement 
            suggestions. While simplified compared to official certification processes, it serves as an excellent 
            educational tool and preliminary assessment for green building projects. All calculations run in your 
            browser with complete privacy. Use this tool for design decisions, retrofit planning, and sustainability 
            education.
          </p>
        </section>

      </div>
    </div>
  );
}
