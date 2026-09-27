import ToolFaq from "@/components/ToolFaq";
import { sunlightExposureCalculatorConfig } from "./config";

export default function SunlightExposureCalculatorSEO() {
  const { howToSteps, faq } = sunlightExposureCalculatorConfig.seo;
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Sunlight Exposure Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Sunlight Exposure Calculator is a professional visualization tool designed to help architects, engineers, 
            urban planners, and solar energy professionals analyze how sunlight interacts with buildings throughout the day. 
            This browser-based tool simulates sun position, shadow behavior, and sunlight intensity, providing instant visual 
            and numerical insights for optimal building design and solar panel placement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <ol className="space-y-3 text-gray-600 leading-relaxed">
            {howToSteps.map(({ name, text }, i) => (
              <li key={name} className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                <span><strong>{name}:</strong> {text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Sun Position Calculations</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator uses solar geometry formulas to determine sun position:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 space-y-2">
            <p className="font-mono text-sm">Solar Declination: δ = 23.45° × sin((360/365) × (284 + N))</p>
            <p className="font-mono text-sm">Hour Angle: H = 15° × (time - 12)</p>
            <p className="font-mono text-sm">Solar Elevation: sin(α) = sin(lat) × sin(δ) + cos(lat) × cos(δ) × cos(H)</p>
            <p className="font-mono text-sm">Shadow Length = Building Height ÷ tan(elevation)</p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            These calculations account for Earth's tilt, rotation, and the observer's latitude to accurately predict sun 
            position at any time and date. The tool visualizes this data in an intuitive canvas-based interface.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Metrics Explained</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Sun Elevation (Altitude)</h3>
              <p className="text-sm text-gray-700">
                The angle between the sun and the horizon, measured in degrees. 0° means sun at horizon, 90° means sun 
                directly overhead. Higher elevation = shorter shadows and more intense light.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Sun Azimuth</h3>
              <p className="text-sm text-gray-700">
                The compass direction of the sun, measured in degrees from North (0°). East is 90°, South is 180°, West is 
                270°. Determines shadow direction and which building facades receive direct sunlight.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Shadow Length</h3>
              <p className="text-sm text-gray-700">
                The distance from the building base to the shadow's end, calculated using building height and sun elevation. 
                Longer shadows occur at low sun angles (morning/evening), shorter at midday.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Exposure Percentage</h3>
              <p className="text-sm text-gray-700">
                The amount of direct sunlight received by the selected surface (wall/roof/ground), accounting for sun angle 
                and surface orientation. 100% means optimal direct exposure, 0% means no direct sunlight.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Light Intensity</h3>
              <p className="text-sm text-gray-700">
                The relative strength of sunlight, accounting for atmospheric absorption. Maximum at 90° elevation (sun 
                overhead), decreasing at lower angles due to longer atmospheric path.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Architecture & Building Design</h3>
              <p className="text-sm text-gray-700">
                Optimize building orientation for natural lighting, minimize unwanted heat gain, design effective shading 
                systems, and ensure adequate daylight in interior spaces.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Solar Panel Placement</h3>
              <p className="text-sm text-gray-700">
                Determine optimal panel orientation and tilt angle, identify shading issues, estimate daily energy 
                production, and maximize solar efficiency throughout the year.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Urban Planning</h3>
              <p className="text-sm text-gray-700">
                Analyze shadow impact on neighboring properties, ensure adequate sunlight access for public spaces, comply 
                with solar access regulations, and optimize street and park layouts.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Real Estate Analysis</h3>
              <p className="text-sm text-gray-700">
                Evaluate property sunlight exposure, assess natural lighting quality, identify optimal room placement, and 
                understand seasonal variations in daylight.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seasonal Variations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Season/Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Sun Characteristics</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Design Implications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Summer Solstice (June 21)</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Highest elevation, longest day</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Maximum solar gain, shortest shadows</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Winter Solstice (Dec 21)</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Lowest elevation, shortest day</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Minimum solar gain, longest shadows</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Equinoxes (Mar 21, Sep 21)</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Moderate elevation, equal day/night</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Balanced conditions, transitional design</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Optimal Building Orientations</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Northern Hemisphere</h3>
              <p className="text-sm text-blue-800">
                South-facing (180°) walls receive maximum sunlight year-round. Ideal for passive solar heating in winter. 
                North-facing walls receive minimal direct sun, suitable for spaces requiring consistent, indirect light.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Southern Hemisphere</h3>
              <p className="text-sm text-blue-800">
                North-facing (0°) walls receive maximum sunlight. Design principles are inverted compared to Northern 
                Hemisphere. East and west orientations similar in both hemispheres.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">East-West Orientation</h3>
              <p className="text-sm text-blue-800">
                East-facing (90°) receives morning sun, west-facing (270°) receives afternoon sun. West exposure typically 
                warmer due to accumulated daily heat. Consider shading for west-facing windows in hot climates.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shadow Analysis Guidelines</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Analyze shadows at critical times: 9 AM, 12 PM, and 3 PM for comprehensive understanding</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider both summer and winter solstice conditions for year-round analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Account for neighboring buildings and trees that may cast additional shadows</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Verify shadow impact on outdoor spaces, gardens, and solar panels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Check local regulations regarding shadow restrictions on adjacent properties</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Use animation feature to visualize shadow movement throughout the day</span>
            </li>
          </ul>
        </section>

        <ToolFaq items={faq} />

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Maximize Natural Light</h3>
              <p className="text-sm text-gray-700">
                Orient main living spaces toward the sun's path. Use clerestory windows for deep light penetration. Consider 
                light shelves to bounce daylight deeper into rooms.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Control Solar Heat Gain</h3>
              <p className="text-sm text-gray-700">
                Design overhangs sized to block summer sun while admitting winter sun. Use deciduous trees for seasonal 
                shading. Consider low-E glazing for west-facing windows.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Optimize Solar Panels</h3>
              <p className="text-sm text-gray-700">
                Ensure panels face optimal direction with appropriate tilt. Minimize shading from chimneys, vents, or nearby 
                structures. Consider seasonal sun path variations.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Respect Neighbors</h3>
              <p className="text-sm text-gray-700">
                Analyze shadow impact on adjacent properties. Comply with solar access regulations. Consider setbacks and 
                building height to minimize overshadowing.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-1">Real-Time Visualization</h3>
              <p className="text-sm text-gray-700">
                Instant visual feedback with animated sun movement and shadow projection
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-1">Accurate Calculations</h3>
              <p className="text-sm text-gray-700">
                Based on solar geometry formulas used in professional applications
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-semibold text-gray-800 mb-1">Global Coverage</h3>
              <p className="text-sm text-gray-700">
                Works for any location worldwide with preset cities for convenience
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Sunlight Analysis Tool</h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator is designed for architects, engineers, urban planners, and solar energy professionals who need 
            quick and accurate sunlight exposure analysis. It combines scientific solar position calculations with intuitive 
            canvas-based visualization, making complex sun path analysis accessible while maintaining professional-grade 
            accuracy. All calculations and rendering run entirely in your browser with no data sent to servers, ensuring 
            privacy and instant performance. Use this tool for preliminary analysis and conceptual design, and consult with 
            professionals for detailed engineering and compliance verification.
          </p>
        </section>

      </div>
    </div>
  );
}
