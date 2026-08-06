export default function RoomLightingCalculatorSEO() {
  const faqItems = [
    { q: "What is a room lighting calculator?", a: "A room lighting calculator is a free online tool that determines how many light fixtures or bulbs a room needs based on its floor area, its intended use, and the light output (lumens) of the bulbs you plan to install. It uses the lumen method — a standard lighting-design formula that converts room area and a target illumination level (lux) into a required lumen total, then divides by your bulb's lumen rating to get a fixture count." },
    { q: "How is the number of lights calculated?", a: "The calculator multiplies room area in square meters by the recommended lux level for the room type to get total lumens required, then divides that by the lumen output of a single bulb and rounds up to the nearest whole fixture. Lights Needed = ceil((Width × Length in m² × Lux Level) ÷ Lumens per Light). The result is then checked against the achieved lux to flag under-lit or over-lit outcomes." },
    { q: "What is a good lux level for my room?", a: "It depends entirely on the room's function. Bedrooms and hallways need only 100 lux for comfortable ambient lighting, living and dining rooms typically use 150 lux, bathrooms and garages need 200-300 lux for task visibility, and kitchens and offices need 300-400 lux for detailed work. These are general residential and light-commercial guidelines — specialized spaces like photography studios or retail displays often need custom lux values well outside this range." },
    { q: "What is the difference between lumens and lux?", a: "Lumens measure the total light output produced by a single bulb — a fixed number printed on the packaging regardless of room size. Lux measures illumination density: how many lumens actually land on each square meter of floor or work surface. The same 800-lumen bulb produces a high lux reading in a small closet and a much lower lux reading spread across a large open room, which is why room area is central to the calculation." },
    { q: "Should I enter room dimensions in feet or meters?", a: "Use whichever unit matches how you measured the room — the calculator converts automatically. If you select feet, the tool converts your width and length to square meters internally before applying the lux formula, since lux is internationally defined as lumens per square meter. Entering feet dimensions while assuming a metric lux target (or vice versa) without letting the tool convert is the most common source of an inaccurate light count." },
    { q: "What does 'over-lit' or 'under-lit' mean in the results?", a: "Because the calculator always rounds the raw fixture count up to a whole number, the achieved lux after rounding rarely matches the target exactly. If the achieved lux comes in more than 10% below the target, the room is flagged under-lit; if it exceeds the target by more than 30%, it is flagged over-lit — usually the result of a small room needing 'less than one' bulb but requiring at least one full fixture. Optimal means the achieved lux lands within that band." },
    { q: "How does ceiling height affect the lighting calculation?", a: "The core lumen-method formula in this calculator is based on floor area and does not adjust automatically for ceiling height, but height still matters in practice. Light spreads out and loses intensity over a longer throw distance, so rooms with ceilings above roughly 2.4 m (8 ft) should add 10-20% more lumens per light, or select a higher lux target, to compensate for fixtures mounted further from the work surface." },
    { q: "Can I use this calculator for a room with a custom lighting requirement?", a: "Yes. Selecting 'Custom' as the room type unlocks a direct lux input field, letting you enter any illumination target instead of the built-in residential and office presets. This is useful for spaces like photography studios, retail product displays, workshops with detailed assembly work, or any room where the standard 100-400 lux range from the presets doesn't apply." },
    { q: "How do I compare LED, CFL, halogen, and incandescent bulbs in the calculator?", a: "Enter the lumen rating printed on the bulb packaging into the Lumens per Light field — the calculator's built-in bulb type shortcuts fill this in automatically for common wattage-equivalent bulbs (for example, an LED rated at 800 lumens replaces a 60W incandescent that also produces about 800 lumens). Comparing bulbs by lumens rather than watts is essential because an LED uses roughly 85% less wattage than an incandescent for the same light output." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your room dimensions, lux selections, and bulb specifications are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter room dimensions", "Type the width and length of the room. Measure wall to wall for the most accurate area — the calculator multiplies these two values to get floor area before applying the lighting formula."],
    ["Select feet or meters", "Choose the unit that matches how you measured. The calculator converts feet-based dimensions to square meters internally, since the lux standard is always expressed as lumens per square meter."],
    ["Choose the room type", "Pick from bedroom, living room, kitchen, office, bathroom, dining room, hallway, or garage — each carries a standard recommended lux level. Select 'Custom' to enter your own target lux for specialized spaces."],
    ["Enter lumens per light", "Type the lumen output printed on your bulb's packaging, or open the bulb type panel to apply a common LED, CFL, halogen, or incandescent preset automatically."],
    ["Read the fixture count and status", "The calculator returns the number of lights needed, the lux actually achieved once that count is rounded up, and a status of under-lit, optimal, or over-lit so you know whether to adjust bulb output or fixture count."],
    ["Save, copy, or export the result", "Save the calculation to your local history for later reference, copy a summary to the clipboard, or export a full text report listing every step of the calculation for a lighting plan or purchase order."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Room Lighting Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>room lighting calculator</strong> is a free online tool that determines how many light
            fixtures a room needs by combining its floor area with the recommended illumination level (lux) for
            that room's purpose. It answers the question every homeowner and designer eventually asks:{" "}
            <em>how many lights do I actually need for this room?</em>
          </p>
          <p>
            Guessing at fixture counts leads to two common outcomes — a dim room that strains the eyes during
            evening tasks, or an over-lit space that wastes electricity and creates glare. This tool applies the
            lumen method used in professional lighting design: it converts your room's area and target lux into
            a total lumen requirement, divides by your bulb's rated output, and rounds up to a practical fixture
            count — then checks whether that count actually lands within a comfortable range of the target.
          </p>
          <p>
            Built for <strong>homeowners planning a renovation, interior and lighting designers specifying
            fixture counts, electricians quoting installation jobs, architects sizing lighting plans, and
            renters trying to improve a poorly lit apartment</strong>. Supports feet and meters, eight built-in
            room-type presets plus a custom lux mode, common bulb-type shortcuts, calculation history, and a
            downloadable report. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Room Lighting Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Area (m²)</span> = Width × Length (converted to meters if entered in feet)</p>
              <p><span className="font-semibold">Total Lumens Required</span> = Area (m²) × Lux Level</p>
              <p><span className="font-semibold">Lights Needed</span> = ceil(Total Lumens Required ÷ Lumens per Light)</p>
              <p><span className="font-semibold">Lux Achieved</span> = (Lights Needed × Lumens per Light) ÷ Area (m²)</p>
              <p className="text-gray-500 text-xs mt-2">Example: 15 ft × 20 ft living room (150 lux, 1,100 lm bulbs) → 27.87 m² × 150 = <span className="text-green-600 font-semibold">4,181 lm required → 4 lights → 157.9 lux achieved</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Lux (lx)</strong> — illumination density, measured in lumens per square meter; this is the target the calculator solves for</li>
            <li><strong>Lumens (lm)</strong> — the total light output of a single bulb, printed on its packaging regardless of room size</li>
            <li><strong>Room type presets</strong> — standard lux levels from 100 (bedroom, hallway) to 400 (office) built into the tool, or a custom lux value for specialized spaces</li>
            <li><strong>Rounding behavior</strong> — the fixture count always rounds up, so achieved lux is checked separately and flagged as under-lit (more than 10% below target), optimal, or over-lit (more than 30% above target)</li>
            <li><strong>Unit conversion</strong> — feet-based dimensions are converted to square meters automatically since lux is internationally defined per square meter, not per square foot</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Room Lighting Calculator
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
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Tool Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time recalculation as you type",
                "8 built-in room-type lux presets plus custom lux",
                "Quick preset rooms (bedroom, living room, kitchen, office, bathroom, garage)",
                "Common bulb-type shortcuts (LED, CFL, halogen, incandescent)",
                "Feet and meters unit support",
                "Under-lit / optimal / over-lit status check",
                "Calculation history (last 20 entries, saved locally)",
                "Export full calculation as a text report",
                "Copy result to clipboard",
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
              title: "Small Bedroom — Rounding to Over-Lit",
              scenario: "A homeowner is fitting a 10 ft × 10 ft bedroom (100 sq ft = 9.29 m²) with 800-lumen LED bulbs. At the bedroom standard of 100 lux, the room needs only 929 total lumens — technically 1.16 bulbs. The calculator rounds up to 2 lights, delivering 1,600 lumens and 172 lux achieved, 72% above target. The tool flags this over-lit, so the homeowner adds a dimmer switch instead of removing a fixture entirely.",
            },
            {
              title: "Living Room — Optimal Fit",
              scenario: "An interior designer is specifying fixtures for a 15 ft × 20 ft living room (27.87 m²) at the standard 150 lux, using 1,100-lumen LED bulbs. Total lumens required is 4,181; dividing by 1,100 and rounding up gives 4 lights, delivering 4,400 lumens and 157.9 lux achieved — just 5.3% above target. The design is confirmed optimal and specified as-is for the client.",
            },
            {
              title: "Home Office — Task Lighting Check",
              scenario: "A remote worker is lighting a 10 ft × 12 ft home office (11.15 m²) at the office standard of 400 lux with 1,100-lumen bulbs. Total lumens required is 4,459; dividing by 1,100 gives 4.05, rounded up to 5 lights, delivering 5,500 lumens and 493 lux achieved — 23% above target but still within the optimal band. The extra headroom is useful for close detail work at a desk.",
            },
            {
              title: "Kitchen — Bright Task Lighting",
              scenario: "A homeowner is planning recessed lighting for a 12 ft × 12 ft kitchen (13.38 m²) at the kitchen standard of 300 lux using 1,100-lumen LEDs. Total lumens required is 4,014; dividing by 1,100 and rounding up gives 4 lights, delivering 4,400 lumens and 329 lux — 9.6% above target and comfortably optimal for food prep and reading labels.",
            },
            {
              title: "Photography Studio — Custom Lux Mode",
              scenario: "A photographer is lighting a 15 ft × 12 ft studio space (16.72 m²) that needs far more light than any residential preset. Using Custom mode at 500 lux with 1,600-lumen bulbs, total lumens required is 8,361; dividing by 1,600 and rounding up gives 6 lights, delivering 9,600 lumens and 574 lux achieved — 14.8% above target, comfortably optimal for consistent product photography.",
            },
            {
              title: "Garage Workshop — Precise Match",
              scenario: "A DIYer is wiring a 20 ft × 20 ft garage workshop (37.16 m²) at the garage standard of 300 lux using 1,600-lumen LED shop lights. Total lumens required is 11,148; dividing by 1,600 and rounding up gives 7 lights, delivering 11,200 lumens and 301.4 lux achieved — within 0.5% of the target, one of the closest possible matches the rounding method can produce.",
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
                "Always compare bulbs by lumens, never watts. An LED rated at 800 lumens produces the same brightness as a 60W incandescent that also outputs about 800 lumens, but uses roughly 85% less electricity — the wattage number tells you nothing about how bright a modern bulb actually is.",
                "If the result comes back over-lit for a small room, don't assume you need fewer fixtures — a single bulb is often already 'too much' for a tiny space at the target lux. Add a dimmer switch instead of leaving the room permanently under-served by only one fixture.",
                "For open-plan spaces that combine a kitchen and dining or living area, calculate each zone separately with its own lux target and sum the fixture counts, rather than averaging one lux value across the whole footprint.",
                "Rooms with ceilings above roughly 2.4 m (8 ft) spread light over a longer throw distance before it reaches the floor. Compensate by entering a higher lumens-per-light value or targeting a higher lux level than the standard preset.",
                "Dark walls and ceilings absorb 20–30% more light than light-colored surfaces reflect back into the room. In a room with dark paint or exposed dark wood, add one extra fixture beyond the raw calculation or move to the next brighter bulb preset.",
                "Use Custom lux mode for anything outside standard residential or office use — retail product displays, art studios, and detailed workshop benches often need 500 lux or more, well above the built-in presets.",
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
                "Don't mix feet dimensions with a metric lux assumption without letting the calculator convert units. Lux is always lumens per square meter — entering square footage directly against a lux target overstates the required lumens by roughly 10.76×.",
                "Don't rely on a single central ceiling fixture rated at the full lumen total. Real rooms need light distributed across multiple points to avoid dark corners and harsh shadows, even when one very bright bulb would satisfy the raw lumen math.",
                "Don't ignore an under-lit warning because 'it looks fine during the day.' The calculator's lux target reflects evening and artificial-lighting conditions — daylight through windows isn't part of the formula and shouldn't be used to justify skipping fixtures.",
                "Don't apply one lux standard across an entire multi-purpose room. A kitchen island needs 300 lux for food prep while an adjoining breakfast nook only needs 150 lux — treating the whole space as one zone either overlights the seating area or underlights the counter.",
                "Don't forget to re-check the calculation after switching bulb brands. Two bulbs marketed as '60W equivalent' can differ in actual lumen output by 10–15% between manufacturers — always use the lumen figure printed on that specific product's packaging.",
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

      {/* ── 6. Reference Tables ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Lux Level and Bulb Output Reference Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Standard Lux Levels by Room Type</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Room Type</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Lux</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Bedroom", "100", "Soft, relaxing lighting"],
                    ["Hallway/Corridor", "100", "Basic navigation lighting"],
                    ["Living Room", "150", "Comfortable ambient lighting"],
                    ["Dining Room", "150", "Ambient dining lighting"],
                    ["Bathroom", "200", "Clear task lighting"],
                    ["Kitchen", "300", "Bright task lighting"],
                    ["Garage/Workshop", "300", "Bright work area lighting"],
                    ["Office/Study", "400", "Bright work lighting"],
                  ].map(([type, lux, purpose]) => (
                    <tr key={type} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-medium text-gray-700 text-xs">{type}</td>
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{lux} lux</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Standard residential and light-commercial guidelines. Specialized spaces (studios, retail displays) should use Custom lux mode.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Bulb Lumen Output</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Bulb</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Lumens</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Watts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["LED 60W Equivalent", "800 lm", "9W"],
                    ["LED 75W Equivalent", "1,100 lm", "12W"],
                    ["LED 100W Equivalent", "1,600 lm", "16W"],
                    ["CFL 60W Equivalent", "800 lm", "13W"],
                    ["CFL 75W Equivalent", "1,100 lm", "18W"],
                    ["Halogen 60W", "900 lm", "43W"],
                    ["Incandescent 60W", "800 lm", "60W"],
                    ["Incandescent 100W", "1,600 lm", "100W"],
                  ].map(([bulb, lm, w]) => (
                    <tr key={bulb} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-medium text-gray-700 text-xs">{bulb}</td>
                      <td className="py-1.5 px-3 font-mono font-semibold text-green-600 text-xs">{lm}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-600 text-xs">{w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* LED and CFL bulbs match incandescent lumen output at a fraction of the wattage — always compare by lumens, not watts.</p>
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
          Who Uses This Room Lighting Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏠", title: "Homeowners & DIYers", desc: "Plan fixture counts for a renovation or new build before buying bulbs. Compare LED, CFL, and halogen options by lumens to avoid an under-lit or wastefully bright room." },
            { icon: "🎨", title: "Interior & Lighting Designers", desc: "Specify fixture quantities per room quickly during client proposals. Use custom lux mode for accent lighting or spaces outside standard residential guidelines." },
            { icon: "⚡", title: "Electricians", desc: "Confirm fixture counts and circuit loads before quoting an installation job. Export a text report to attach to a customer estimate or job file." },
            { icon: "🏗️", title: "Architects & Building Designers", desc: "Verify that a floor plan's lighting allowance meets code-adjacent illumination guidelines for each room type during early design review." },
            { icon: "🏢", title: "Facility & Office Managers", desc: "Check whether existing office lighting meets the 400 lux task-lighting standard, and calculate how many additional fixtures are needed after a layout change." },
            { icon: "🔑", title: "Renters & Small Space Dwellers", desc: "Improve a poorly lit apartment room with plug-in lamps and fixtures sized correctly for the space, without needing an electrician for a quick lighting fix." },
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
