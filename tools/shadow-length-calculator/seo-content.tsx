export default function ShadowLengthCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a shadow length calculator?",
      a: "A shadow length calculator is a free online tool that computes the length of a shadow cast by any object based on the object's height and the sun's elevation angle. It uses the trigonometric formula Shadow Length = Object Height ÷ tan(Sun Angle) to produce an accurate result instantly. It is used by architects checking building shadow impact, photographers planning outdoor shoots, teachers demonstrating trigonometry, and anyone who needs to estimate how long a shadow will be at a specific time of day.",
    },
    {
      q: "How do you calculate shadow length from sun angle?",
      a: "Shadow length is calculated by dividing the object height by the tangent of the sun's elevation angle: Shadow Length = Height ÷ tan(Angle°). For a 10-meter building at a sun angle of 30°, the shadow is 10 ÷ tan(30°) = 10 ÷ 0.577 = 17.3 meters. At 45°, tan(45°) = 1, so the shadow equals the object height exactly. At 60°, the shadow is 5.77 meters — shorter because the sun is higher. Enter any height and angle into this calculator to get the result without manual arithmetic.",
    },
    {
      q: "How do I find the sun's elevation angle?",
      a: "Sun elevation angle varies by location, date, and time of day. At solar noon, elevation approximately equals 90° minus your latitude plus a seasonal correction (up to ±23.5° depending on the time of year). Near the equator at midday in summer, the sun may reach 80°+. In northern Europe in winter, noon elevation can be as low as 10–15°. You can find the exact angle for any location and time using a sun position app, a solar elevation chart, or an online ephemeris tool. Once you have the angle, enter it here for the shadow calculation.",
    },
    {
      q: "What is the shadow length when the sun is at 45 degrees?",
      a: "When the sun is at exactly 45° elevation, the shadow length equals the object height. This is because tan(45°) = 1, making the formula Shadow = Height ÷ 1 = Height. A 5-meter fence post casts a 5-meter shadow. A 20-meter building casts a 20-meter shadow. This 45° relationship is the easiest reference point for shadow estimation — if the shadow is longer than the object, the sun is below 45°; if shorter, the sun is above 45°.",
    },
    {
      q: "Why are shadows longer in the morning and evening?",
      a: "Shadow length is determined by the tangent of the sun's angle. At sunrise and sunset, the sun is near 0° elevation — and tan(0°) approaches zero, making the divisor very small and the resulting shadow extremely long. As the sun rises through the morning, the elevation angle increases, the tangent grows, and shadows shorten. The shortest shadows of the day occur at solar noon when the elevation is at its peak. This is why the golden hour produces long dramatic shadows ideal for photography.",
    },
    {
      q: "How do architects use shadow length calculations?",
      a: "Architects use shadow calculations during site analysis and design review to determine whether a proposed building will cast shadows onto neighboring properties, public spaces, streets, or existing buildings. Many planning authorities require shadow impact studies as part of building permit applications, especially for tall or dense urban projects. The calculation is run for multiple times of day (morning, noon, afternoon) and multiple dates (summer solstice, winter solstice, equinox) to show the full range of shadow conditions the design will create across the year.",
    },
    {
      q: "Can this calculator be used for objects other than buildings?",
      a: "Yes. The formula applies to any vertical object: trees, flagpoles, fences, utility poles, solar panel arrays, antennas, or people. The only inputs are the object height and the sun's elevation angle. A 15-meter tree at 60° sun casts an 8.66-meter shadow. A 1.8-meter person at 20° sun casts a 4.95-meter shadow. The calculator works for anything that stands vertically on flat ground.",
    },
    {
      q: "Does terrain slope affect shadow length?",
      a: "Yes. This calculator assumes flat, level ground. On an upward slope toward the sun, the shadow will appear shorter because the ground rises to meet it sooner. On a downward slope away from the sun, the shadow will appear longer because the ground drops away. For sloped terrain, the effective shadow length must account for the gradient, which requires a more complex calculation. For most architectural site analysis purposes, the flat-ground result is used as a baseline with slope adjustments noted separately.",
    },
    {
      q: "What sun angle should I use for solar panel shading analysis?",
      a: "For solar panel shading analysis, use the winter solstice noon elevation angle for your latitude — this is the lowest sun position of the year and produces the longest shadows. Any object that doesn't shade the panels at winter solstice noon won't shade them at any other time either. For example, at 51° north latitude (London), winter solstice noon elevation is approximately 15°. A 3-meter obstacle must be at least 3 ÷ tan(15°) = 11.2 meters from the panels to avoid shading them.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs — object height and sun angle — are never transmitted to any server, stored in any database, or accessible to anyone other than you. The tool works offline once the page is loaded.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter the object height", "Type the height of the object casting the shadow into the height field. You can enter values in meters or feet — select your preferred unit using the unit toggle. The calculator accepts any positive number, including decimals like 2.5 or 12.75."],
    ["Set the sun elevation angle", "Use the angle slider or type directly into the angle field to set the sun's elevation above the horizon in degrees. Values range from 1° (sun near the horizon, very long shadows) to 89° (sun nearly overhead, very short shadows). At 45°, the shadow equals the object height."],
    ["Read the shadow length", "The shadow length result appears instantly as you adjust either input. The result is displayed in the same unit as your height input. The visual diagram updates in real time to show the geometric relationship between the object, the sun angle, and the shadow."],
    ["Try different angles for time-of-day analysis", "Change the sun angle to model different times of day. Use low angles (10–20°) for morning and evening, mid angles (40–60°) for mid-morning and mid-afternoon, and high angles (70–80°) for midday in summer. This lets you see the full range of shadow lengths your object will cast."],
    ["Use the reference table for quick lookup", "Check the shadow length reference table below for pre-calculated values across common sun angles. This is useful for quick checks without entering a specific value — for example, confirming that a 10-meter object casts a 17.3-meter shadow at 30°."],
    ["Export your result", "Click the copy button to copy the result to clipboard, or export the diagram as an image for use in design presentations, planning documents, or client reports."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Shadow Length Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>shadow length calculator</strong> is a free online tool that computes how long a shadow will be
            based on the height of an object and the sun's elevation angle. It answers a practical question that
            architects, photographers, and anyone planning outdoor work regularly needs to solve: <em>how long will
            this shadow be at this time of day?</em>
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
            demonstrating trigonometry, and solar panel installers calculating shading distances</strong>. Enter any
            object height and sun angle to get an accurate shadow length in meters or feet — no signup, fully
            browser-based.
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
              {howToSteps.map(([title, desc], i) => (
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
                "Supports meters and feet",
                "Real-time result as you adjust inputs",
                "Visual diagram of the sun–object–shadow geometry",
                "Shadow length reference table by angle",
                "Copy result to clipboard",
                "Export diagram as image",
                "Works for buildings, trees, poles, people, and any vertical object",
                "100% browser-based — no data sent to any server",
                "No signup required",
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

      {/* ── 5. Tips & Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "For architectural shadow studies, always run calculations for the winter solstice noon angle at your site's latitude — this gives the longest shadows of the year and is the worst-case condition required by most planning authorities. Summer shadows will always be shorter.",
                "Use the 45° angle as your mental reference point. If you know the sun is above 45° (typical midday in summer at mid-latitudes), the shadow is shorter than the object. If below 45° (mornings, evenings, winter midday), the shadow is longer. This lets you sanity-check any result instantly.",
                "For solar panel shading calculations, add a 10–15% safety buffer to the calculated shading distance to account for atmospheric refraction, slightly uneven ground, and diffuse light effects near the edge of the shadow zone.",
                "Shadow direction matters as much as length. This calculator gives you the length, but shadows always point directly away from the sun. In the Northern Hemisphere, midday shadows point north. Morning shadows point west. Combine length with direction for a complete shadow footprint.",
                "When planning photography shoots, golden hour (sun angle 5–10°) produces shadows 5–11× the object height. Blue hour (angle 0–5°) produces shadows effectively too long to work with compositionally. The sweet spot for long dramatic shadows with still-usable light is 10–20° elevation.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't use the same sun angle for all seasons. At 51° N, noon sun elevation ranges from about 15° in December to 62° in June — a 47° difference that produces dramatically different shadow lengths. Always use the angle for the specific date and time you are analyzing.",
                "Don't forget that sun elevation tables give the angle at solar noon (true south), not at a specific clock time. Solar noon can differ from 12:00 by up to 30 minutes depending on your position within your time zone and the equation of time correction.",
                "Don't assume the formula works for angled or leaning objects. The formula Shadow = Height ÷ tan(Angle) only applies to objects that are perfectly vertical. A slanted wall, pitched roof overhang, or leaning post will cast a shadow with a different length that requires a more complex calculation.",
                "Don't ignore surrounding buildings when doing site analysis. A shadow study that models only the proposed building in isolation will miss cumulative shading effects from adjacent existing structures, which can compound the shadow impact significantly.",
                "Don't use 0° or very low angles (under 2°) in calculations — the tangent approaches zero and shadow lengths become theoretically infinite. Sunrise and sunset shadows aren't meaningfully calculable with a simple formula; atmospheric effects and terrain dominate at those angles.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Reference Table ── */}
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

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Shadow Length Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🏛️",
              title: "Architects & Designers",
              desc: "Conduct shadow impact studies for planning applications, assess shading on neighboring properties, and optimize building orientation for natural light at any time of day or year.",
            },
            {
              icon: "🌆",
              title: "Urban Planners",
              desc: "Evaluate shadow effects of proposed developments on streets, parks, and pedestrian areas. Verify compliance with local sunlight access requirements and shadow regulations.",
            },
            {
              icon: "☀️",
              title: "Solar Installers",
              desc: "Calculate minimum setback distances from obstacles to avoid panel shading — especially critical for winter solstice conditions when the sun is lowest and shadows are longest.",
            },
            {
              icon: "📷",
              title: "Photographers & Filmmakers",
              desc: "Plan golden-hour and blue-hour shoots by predicting exact shadow lengths at specific times and locations. Create or avoid long shadows based on creative intent.",
            },
            {
              icon: "🌳",
              title: "Landscape Architects",
              desc: "Size and position trees and structures to create or block shade in gardens, courtyards, and outdoor spaces. Plan shade coverage for patios, play areas, and seating zones.",
            },
            {
              icon: "🎓",
              title: "Teachers & Students",
              desc: "Demonstrate real-world applications of trigonometry. Use the visual diagram to show how tan, opposite, and adjacent sides relate in right triangles with immediate practical examples.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
