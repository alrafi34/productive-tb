import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function ShadowLengthCalculatorSEO() {
  const { howToSteps, faq } = toolConfig.seo;


  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Shadow Length Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            This <strong>shadow length calculator</strong> works out how long a shadow is from the height of an
            object and the sun&apos;s elevation angle. You can set the angle yourself, or choose a city (or type
            coordinates), a date and a local time and let it calculate where the sun is, how long the shadow is and
            which way it points, with an hour-by-hour table for the whole day.
          </p>
          <p>
            The calculation relies on a single trigonometric relationship — <strong>Shadow Length = Object Height ÷
            tan(Sun Angle)</strong> — but applying it manually requires knowing the tangent value for the angle, which
            most people don't have memorized. The relationship is also non-linear: going from 15° to 30° cuts the shadow
            in half, but going from 60° to 75° only reduces it by about 3 meters for a 10-meter object. This tool
            handles the math instantly and visualizes the geometry so the result is immediately understandable.
          </p>
          <p>
            Built for <strong>architects checking building shadow impact on neighboring properties, urban planners
            conducting shadow studies for permit applications, photographers planning golden-hour shoots, teachers
            demonstrating trigonometry, and solar panel installers calculating shading distances</strong>. We do not collect or store what you enter.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Shadow Length Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculation is based on right-triangle trigonometry. The object is the vertical leg, the shadow is the
            horizontal leg, and the sun's ray is the hypotenuse. The angle between the sun's ray and the ground is the
            elevation angle.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Shadow Length Formula</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Shadow Length</span> = Object Height ÷ tan(Sun Elevation Angle°)</p>
              <p className="text-gray-500 text-xs mt-2">Example: 10m building at 30° → 10 ÷ tan(30°) = 10 ÷ 0.577 = <span className="text-green-600 font-semibold">17.32 m</span></p>
              <p className="text-gray-500 text-xs">Example: 10m building at 60° → 10 ÷ tan(60°) = 10 ÷ 1.732 = <span className="text-green-600 font-semibold">5.77 m</span></p>
            </div>
          </div>
          <p>Key relationships to understand:</p>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>At 45°</strong> — shadow length exactly equals object height (tan 45° = 1)</li>
            <li><strong>Below 45°</strong> — shadow is longer than the object (sun is lower)</li>
            <li><strong>Above 45°</strong> — shadow is shorter than the object (sun is higher)</li>
            <li><strong>Below 10°</strong> — shadows become very long (tan approaches 0); sunrise/sunset conditions</li>
            <li><strong>Above 80°</strong> — shadows are very short; only possible in tropical locations near midday</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Shadow Length Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(({ name: title, text: desc }, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Calculator Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Shadow length from any object height and sun angle",
                "Sun elevation and direction from a date, local time and place",
                "13 US, European and Australian cities, or your own coordinates",
                "Shadow direction as a compass bearing",
                "Hour-by-hour shadow table for the chosen day",
                "Meters and feet, with a live diagram",
                "Copy, history, and export as image or text",
                "Your inputs are not collected or stored",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Building Shadow Impact Assessment",
              scenario: "An architect is designing a 24-meter residential tower in a dense urban neighborhood. Local planning rules require a shadow study showing impact at 9am, 12pm, and 3pm on the winter solstice. At 51° N latitude, winter solstice noon sun angle is approximately 15°. At that angle, the tower casts a 24 ÷ tan(15°) = 89.6-meter shadow — nearly 90 meters extending north. The architect uses this result to adjust the tower's footprint and orientation before submitting the planning application.",
            },
            {
              title: "Solar Panel Shading Distance",
              scenario: "A homeowner in Edinburgh (56° N) is planning rooftop solar panels but has a 3-meter parapet wall at the south end of the roof. At winter solstice noon, the sun elevation is approximately 10.5°. The parapet casts a shadow of 3 ÷ tan(10.5°) = 16.2 meters — meaning panels must be placed at least 17 meters from the parapet to avoid shading during the worst case of the year. The roof is only 12 meters deep, so the parapet height needs to be reduced or the panels placed differently.",
            },
            {
              title: "Photography Golden Hour Planning",
              scenario: "A portrait photographer is scouting a location for a sunset shoot. At 6pm in July at 52° N, the sun elevation is approximately 8°. A 1.75-meter subject at 8° sun casts a 1.75 ÷ tan(8°) = 12.5-meter shadow — long enough to create dramatic leading lines across the ground. The photographer confirms the shadow direction (toward the camera) and books the location for the shoot with confidence the shadow will fall as planned.",
            },
            {
              title: "Tree Placement for Garden Shade",
              scenario: "A landscape designer is recommending tree placement for a new garden. The client wants a tree that shades the patio (8 meters from the planned planting spot) at 2pm in summer. At 2pm on a summer afternoon at 48° N, sun elevation is approximately 50°. A tree at that distance would need to be at least 8 × tan(50°) = 9.5 meters tall to cast a shadow reaching the patio. The designer specifies a mature height species of 10–12 meters to guarantee shade within the patio area.",
            },
            {
              title: "Construction Site Temporary Shading",
              scenario: "A site manager needs to verify that a 12-meter construction crane won't cast shadows onto a neighboring building's solar installation during morning operating hours. At 9am in autumn, sun elevation is approximately 22°. The crane casts a shadow of 12 ÷ tan(22°) = 29.7 meters to the west. The neighboring solar array is 18 meters west of the crane — inside the shadow zone. The manager schedules crane operation to avoid the critical 8–10am window when the solar array is most active.",
            },
            {
              title: "Urban Street Canyon Analysis",
              scenario: "A city planner is reviewing proposals for a 30-meter mixed-use building on a north–south street. They need to determine how many hours the opposite sidewalk will be in shadow on the spring equinox. At equinox at 45° N, noon sun elevation is 45° and shadow equals building height (30m). The street is 20 meters wide. Working backwards: the building casts a 20-meter shadow when the sun elevation reaches arctan(30/20) = 56°. The planner calculates that the sidewalk is in shadow from sunrise until approximately 10:30am — acceptable under local sunlight access guidelines.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Shadow Length Reference Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Shadow Length by Sun Angle (10m Object)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Sun Angle</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Shadow (10m)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["5°",  "114.3 m", "Sunrise / sunset"],
                    ["10°", "56.7 m",  "Early morning / late evening"],
                    ["15°", "37.3 m",  "Winter midday at 52° N"],
                    ["20°", "27.5 m",  "Morning / afternoon"],
                    ["30°", "17.3 m",  "Mid-morning / mid-afternoon"],
                    ["45°", "10.0 m",  "Shadow = object height"],
                    ["50°", "8.4 m",   "Late morning / early afternoon"],
                    ["60°", "5.8 m",   "Summer midday at 45° N"],
                    ["70°", "3.6 m",   "Summer midday at 35° N"],
                    ["80°", "1.8 m",   "Near-vertical sun (tropics)"],
                  ].map(([angle, shadow, note]) => (
                    <tr key={angle} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{angle}</td>
                      <td className="py-2 px-3 font-mono text-green-600 font-semibold text-xs">{shadow}</td>
                      <td className="py-2 px-3 text-gray-500 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Winter Solstice Noon Sun Angle by Latitude</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Latitude</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Example City</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Winter Noon Angle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["25° N", "Miami / Karachi",    "41.5°"],
                    ["35° N", "Los Angeles / Tokyo", "31.5°"],
                    ["45° N", "Portland / Milan",    "21.5°"],
                    ["51° N", "London / Warsaw",     "15.5°"],
                    ["53° N", "Dublin / Berlin",     "13.5°"],
                    ["60° N", "Oslo / Helsinki",     "6.5°"],
                    ["25° S", "São Paulo / Brisbane","41.5°"],
                    ["34° S", "Sydney / Cape Town",  "32.5°"],
                  ].map(([lat, city, angle]) => (
                    <tr key={lat} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-semibold text-gray-700 text-xs">{lat}</td>
                      <td className="py-2 px-3 text-gray-500 text-xs">{city}</td>
                      <td className="py-2 px-3 font-mono text-primary font-semibold text-xs">{angle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Winter solstice noon angle = 90° − latitude − 23.5°. Southern hemisphere winter is June solstice.</p>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />

    </>
  );
}
