export default function RoomLightingCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Room Lighting Calculation?</h2>
          <p className="text-gray-700 leading-relaxed">
            Room lighting calculation determines the optimal number of light fixtures or bulbs needed to properly illuminate 
            a space based on its size, purpose, and lighting standards. The calculation uses lux (illumination level) standards 
            and converts them into the number of lights required based on lumen output. Proper lighting ensures comfort, 
            productivity, safety, and energy efficiency while avoiding under-lighting or over-lighting.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Lighting Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Basic Formula</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Number of Lights = (Area × Lux) / Lumens per Light</p>
              <p className="text-sm text-blue-700">
                This formula calculates the total lumens required and divides by the output of each light fixture.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Step-by-Step Calculation</h3>
              <ol className="text-sm text-purple-700 space-y-2 list-decimal list-inside">
                <li>Calculate room area: Area = Width × Length</li>
                <li>Determine required lux level based on room type</li>
                <li>Calculate total lumens needed: Total Lumens = Area × Lux</li>
                <li>Divide by lumens per bulb: Lights = Total Lumens / Lumens per Bulb</li>
                <li>Round up to nearest whole number</li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Key Terms</h3>
              <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                <li><strong>Lux (lx)</strong> = Illumination level (lumens per square meter)</li>
                <li><strong>Lumen (lm)</strong> = Total light output from a bulb</li>
                <li><strong>Area</strong> = Room size in square meters or square feet</li>
                <li><strong>Lights</strong> = Number of fixtures or bulbs needed</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Lux Levels by Room Type</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lux Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Bedroom</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">100 lux</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Soft, relaxing lighting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Hallway/Corridor</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">100 lux</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Basic navigation lighting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Living Room</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">150 lux</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Comfortable ambient lighting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Dining Room</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">150 lux</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Ambient dining lighting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Bathroom</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">200 lux</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Clear task lighting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Kitchen</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">300 lux</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Bright task lighting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Garage/Workshop</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">300 lux</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Bright work area lighting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Office/Study</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">400 lux</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Bright work lighting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Bulb Types and Lumen Output</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">LED Bulbs (Most Efficient)</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">LED 60W Equivalent (9W)</span>
                  <span className="font-mono text-gray-900">800 lm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">LED 75W Equivalent (12W)</span>
                  <span className="font-mono text-gray-900">1100 lm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">LED 100W Equivalent (16W)</span>
                  <span className="font-mono text-gray-900">1600 lm</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">CFL Bulbs (Compact Fluorescent)</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">CFL 60W Equivalent (13W)</span>
                  <span className="font-mono text-gray-900">800 lm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">CFL 75W Equivalent (18W)</span>
                  <span className="font-mono text-gray-900">1100 lm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">CFL 100W Equivalent (23W)</span>
                  <span className="font-mono text-gray-900">1600 lm</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Halogen Bulbs</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Halogen 60W (43W)</span>
                  <span className="font-mono text-gray-900">900 lm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Halogen 75W (53W)</span>
                  <span className="font-mono text-gray-900">1200 lm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Halogen 100W (72W)</span>
                  <span className="font-mono text-gray-900">1800 lm</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Incandescent Bulbs (Traditional)</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Incandescent 60W</span>
                  <span className="font-mono text-gray-900">800 lm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Incandescent 75W</span>
                  <span className="font-mono text-gray-900">1100 lm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Incandescent 100W</span>
                  <span className="font-mono text-gray-900">1600 lm</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-3">
            Note: LED bulbs are the most energy-efficient option, using 80-90% less energy than incandescent bulbs 
            while producing the same amount of light.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 1: Small Bedroom</h3>
              <p className="text-sm text-gray-700 mb-2">
                10 ft × 10 ft bedroom, 800 lumen LED bulbs
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>Area = 10 × 10 = 100 sq ft = 9.29 m²</div>
                <div>Lux Level = 100 lux (bedroom standard)</div>
                <div>Total Lumens = 9.29 × 100 = 929 lm</div>
                <div>Lights = 929 / 800 = 1.16</div>
                <div className="text-green-600 font-bold">Result: 2 lights needed ✓</div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 2: Living Room</h3>
              <p className="text-sm text-gray-700 mb-2">
                15 ft × 20 ft living room, 1100 lumen LED bulbs
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>Area = 15 × 20 = 300 sq ft = 27.87 m²</div>
                <div>Lux Level = 150 lux (living room standard)</div>
                <div>Total Lumens = 27.87 × 150 = 4180 lm</div>
                <div>Lights = 4180 / 1100 = 3.8</div>
                <div className="text-green-600 font-bold">Result: 4 lights needed ✓</div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 3: Home Office</h3>
              <p className="text-sm text-gray-700 mb-2">
                10 ft × 12 ft office, 1100 lumen LED bulbs
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>Area = 10 × 12 = 120 sq ft = 11.15 m²</div>
                <div>Lux Level = 400 lux (office standard)</div>
                <div>Total Lumens = 11.15 × 400 = 4460 lm</div>
                <div>Lights = 4460 / 1100 = 4.05</div>
                <div className="text-green-600 font-bold">Result: 5 lights needed ✓</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Lighting Requirements</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Room Purpose:</strong> Task-oriented rooms (offices, kitchens) need more light than relaxation spaces (bedrooms).
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Natural Light:</strong> Rooms with large windows may need fewer artificial lights during daytime.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Wall Colors:</strong> Light-colored walls reflect more light, while dark walls absorb light and may require more fixtures.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Ceiling Height:</strong> Higher ceilings may require more powerful lights or additional fixtures.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Age of Occupants:</strong> Older adults typically need 2-3 times more light than younger people for the same tasks.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Fixture Type:</strong> Recessed lights, pendants, and surface-mounted fixtures distribute light differently.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Light Distribution:</strong> Directional lights (spotlights) vs. omnidirectional lights (bulbs) affect coverage.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lighting Design Best Practices</h2>
          
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Layer Your Lighting</h3>
                  <p className="text-sm text-green-800">
                    Combine ambient (general), task (focused), and accent (decorative) lighting for flexibility and visual interest.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Use Dimmers</h3>
                  <p className="text-sm text-green-800">
                    Install dimmer switches to adjust lighting levels for different activities and times of day, saving energy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Consider Color Temperature</h3>
                  <p className="text-sm text-green-800">
                    Warm white (2700-3000K) for living spaces, neutral white (3500-4100K) for kitchens, cool white (5000-6500K) for offices.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Distribute Evenly</h3>
                  <p className="text-sm text-green-800">
                    Space lights evenly to avoid dark spots and shadows. For recessed lights, space them 4-6 feet apart.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Choose Energy-Efficient Bulbs</h3>
                  <p className="text-sm text-green-800">
                    LED bulbs use 75-80% less energy than incandescent and last 25 times longer, saving money over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Lighting Mistakes to Avoid</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Relying on a Single Central Light</h3>
                  <p className="text-sm text-red-800">
                    One ceiling light creates harsh shadows. Use multiple light sources for better coverage and ambiance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Ignoring Task Lighting</h3>
                  <p className="text-sm text-red-800">
                    Work areas, reading nooks, and kitchen counters need dedicated task lighting beyond general illumination.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Using Wrong Color Temperature</h3>
                  <p className="text-sm text-red-800">
                    Cool white in bedrooms feels harsh; warm white in offices can feel dim. Match color temperature to room purpose.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Over-Lighting or Under-Lighting</h3>
                  <p className="text-sm text-red-800">
                    Too much light wastes energy and causes glare; too little strains eyes. Use this calculator for optimal levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between lumens and lux?</h3>
              <p className="text-sm text-gray-700">
                Lumens measure the total light output from a bulb, while lux measures illumination level (lumens per square meter) 
                on a surface. A 1000-lumen bulb in a small room creates higher lux than the same bulb in a large room.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I find the lumen rating of my bulbs?</h3>
              <p className="text-sm text-gray-700">
                Check the bulb packaging or the bulb itself. Modern bulbs are required to display lumen output. For older 
                incandescent bulbs, use these approximations: 60W ≈ 800lm, 75W ≈ 1100lm, 100W ≈ 1600lm.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I use the same lux level throughout my home?</h3>
              <p className="text-sm text-gray-700">
                No. Different rooms have different lighting needs. Bedrooms need soft lighting (100 lux), while offices need 
                bright lighting (400 lux). Use the room type selector in this calculator for appropriate standards.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use fewer high-lumen bulbs instead of more low-lumen bulbs?</h3>
              <p className="text-sm text-gray-700">
                While the total lumens may be the same, using more fixtures with lower-lumen bulbs typically provides better 
                light distribution and reduces harsh shadows. However, fewer high-lumen fixtures can work well with proper placement.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does ceiling height affect lighting requirements?</h3>
              <p className="text-sm text-gray-700">
                Higher ceilings require more light because the distance from the light source to the floor increases. For ceilings 
                above 10 feet, consider increasing the number of lights by 10-20% or using higher-lumen bulbs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Are LED bulbs really worth the higher upfront cost?</h3>
              <p className="text-sm text-gray-700">
                Yes. LED bulbs use 75-80% less energy and last 15-25 times longer than incandescent bulbs. A typical LED bulb 
                saves $50-$100 in electricity costs over its lifetime, far exceeding the initial price difference.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            This calculator provides the minimum number of lights needed for adequate illumination. For better light distribution 
            and ambiance, consider adding 1-2 extra fixtures or using a combination of ceiling lights, wall sconces, and lamps. 
            Always install dimmer switches for flexibility in adjusting light levels to suit different activities and moods.
          </p>
        </section>

      </div>
    </div>
  );
}
