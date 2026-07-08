export default function ParkingSpaceCalculatorSEO() {
  const faqItems = [
    {
      q: "What is a parking space calculator?",
      a: "A parking space calculator is a free online tool that determines how many parking stalls fit in a given area, or how much space is required for a given number of vehicles. It accounts for stall dimensions, aisle width, parking angle, drive lane layout, and ADA accessibility requirements. It is used by architects, civil engineers, urban planners, developers, and business owners planning surface lots or structured parking facilities.",
    },
    {
      q: "How many square feet does a parking space require?",
      a: "A standard 90-degree parking stall requires approximately 162–180 square feet of stall area (8.5–9 ft wide × 18–20 ft deep). Including the proportional share of the drive aisle (typically 24 ft wide for two-way traffic), the total area per stall is approximately 300–350 square feet. A compact stall requires around 270–300 square feet per space including aisle. These figures vary by local code, stall angle, and whether aisles are one-way or two-way.",
    },
    {
      q: "What is parking lot layout and how does angle affect it?",
      a: "Parking lot layout refers to the arrangement of stalls and drive aisles within a parking area. The most common angles are 90°, 60°, and 45°. At 90°, stalls are perpendicular to the aisle — this maximizes stall count per area and works with two-way aisles. At 60° and 45°, stalls are angled — this simplifies entering and exiting stalls but requires one-way aisles and typically reduces total stall count per area. 90° layouts are most efficient for standard parking lots; angled layouts are common in urban street parking and smaller lots.",
    },
    {
      q: "How many parking spaces are required by code?",
      a: "Parking requirements vary by jurisdiction, land use type, and local zoning ordinance. Common baselines: retail typically requires 3–5 spaces per 1,000 sq ft of gross floor area; offices require 3–4 per 1,000 sq ft; restaurants require 1 space per 3–4 seats; residential requires 1–2 spaces per dwelling unit. ADA requirements mandate that 1 in every 25 spaces (4%) be accessible, with van-accessible spaces at a ratio of 1 in every 6 accessible spaces. Always verify against your local zoning code.",
    },
    {
      q: "What are standard parking space dimensions?",
      a: "Standard dimensions by category: Standard stall — 8.5–9 ft wide × 18–20 ft deep. Compact stall — 7.5–8 ft wide × 15–16 ft deep. ADA accessible stall — 8 ft wide with a 5 ft access aisle (or 8 ft aisle for van-accessible). Drive aisle — 24 ft wide for 90° two-way traffic; 18–20 ft for one-way 60°/45° angled layouts. These are US-standard dimensions. UK and metric standards differ: a standard UK bay is 2.4m × 4.8m with a 6m aisle.",
    },
    {
      q: "How many parking spaces fit in an acre?",
      a: "A gross acre is 43,560 square feet. At approximately 300–350 sq ft per stall (including aisle), a surface lot fits approximately 124–145 stalls per acre at 90° layout. In practice, after accounting for entrance drives, landscaping buffers, pedestrian pathways, and unusable corners, a well-designed surface parking lot typically achieves 100–120 stalls per usable acre. Structured parking garages achieve significantly higher stall density by stacking levels.",
    },
    {
      q: "What is a parking demand calculator?",
      a: "A parking demand calculator estimates how many parking spaces a facility needs based on occupancy patterns, peak usage, and building type. Unlike a simple stall-count calculator (which tells you how many spaces fit in an area), a demand calculator answers how many spaces are required given expected users. For example, an office building with 200 employees and a 85% peak occupancy rate needs approximately 170 spaces. This tool covers both: physical capacity from area, and demand estimation from occupancy.",
    },
    {
      q: "How do I calculate the number of parking spaces for a building?",
      a: "Multiply the building's gross floor area (or seat/unit count) by the applicable parking ratio from your local zoning code. For example: a 10,000 sq ft retail store at a ratio of 4 spaces per 1,000 sq ft requires 40 spaces. Add the required ADA spaces on top: 40 spaces requires 2 ADA spaces (1 per 25), of which 1 must be van-accessible. Then calculate whether your available lot area can accommodate those spaces using the stall count calculation.",
    },
    {
      q: "What is the difference between a parking lot calculator and a parking space calculator?",
      a: "A parking space calculator focuses on stall dimensions and how many individual stalls fit in a given layout. A parking lot calculator is broader — it includes stall count, aisle count, total area required, landscaping setbacks, and sometimes cost estimation. This tool functions as both: enter the lot dimensions to get stall count, or enter a target stall count to get the required lot area.",
    },
    {
      q: "Is my data private when using this calculator?",
      a: "Yes. All calculations run entirely in your browser using JavaScript. Your lot dimensions, stall counts, and other inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you. The tool works fully offline once the page is loaded.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Enter your lot dimensions", "Input the available parking area length and width in feet or meters. If you have an irregular lot, use the total usable area in square feet or square meters instead of dimensions. The calculator converts between units automatically."],
    ["Select parking angle and stall type", "Choose your parking layout angle — 90° (perpendicular), 60°, or 45° — and select the stall type: standard, compact, or ADA. The stall dimensions and required aisle width update automatically based on your selection."],
    ["Configure aisle and traffic direction", "Select one-way or two-way traffic flow for your drive aisles. Two-way aisles require 24 ft width and work with 90° layouts; one-way aisles are 18–20 ft and suit 60° and 45° angled layouts."],
    ["Read the stall count and layout summary", "The calculator returns the total number of stalls, ADA-required spaces, drive aisle count, total paved area, and the efficiency ratio (useful stall area vs total lot area). The visual layout diagram shows how stalls and aisles are arranged."],
    ["Use the demand calculator to verify requirements", "Switch to demand mode, enter your building type and gross floor area (or seat/unit count), and the tool shows how many spaces your local zoning baseline requires — so you can confirm your lot can meet the code minimum."],
    ["Export your layout summary", "Download the stall count report as a PDF or text file for use in planning applications, design briefs, or client presentations."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Parking Space Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>parking space calculator</strong> is a free online tool that determines how many parking
            stalls fit in a given lot area, or how much space a target number of vehicles requires. It factors
            in stall dimensions, drive aisle width, <strong>parking lot layout</strong> angle, traffic direction,
            and ADA accessibility requirements — producing a complete stall count and layout summary without
            manual drafting.
          </p>
          <p>
            The challenge with parking design is that stall count is never simply area divided by one stall size.
            Every stall requires a proportional share of the drive aisle. The angle of parking changes stall depth
            and aisle width simultaneously. ADA code mandates a minimum number of accessible stalls that grows with
            the total count. A <strong>parking area calculator</strong> that ignores any of these factors
            produces numbers that won't match a real layout. This tool models all of them together.
          </p>
          <p>
            Built for <strong>architects, civil engineers, urban planners, commercial developers, facility
            managers, and business owners</strong> who need accurate stall counts during site feasibility,
            planning applications, or design review. Supports US standard and metric dimensions, 90° / 60° / 45°
            layouts, one-way and two-way aisles, and ADA calculation. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Parking Space Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The total area per stall includes both the stall footprint and a proportional share of the adjacent
            drive aisle. For a 90° two-way layout:
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula (90° Layout)</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Area per Stall</span> = Stall Width × (Stall Depth × 2 + Aisle Width)</p>
              <p><span className="font-semibold">Stall Count</span> = Total Lot Area ÷ Area per Stall</p>
              <p className="text-gray-500 text-xs mt-2">Example: 9 ft × (19 ft × 2 + 24 ft) = 9 × 62 = <span className="text-green-600 font-semibold">558 sq ft per stall</span></p>
              <p className="text-gray-500 text-xs">20,000 sq ft lot ÷ 558 = <span className="text-green-600 font-semibold">~35 stalls</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>90° layout</strong> — stalls perpendicular to aisle; two-way traffic; 24 ft aisle; most efficient stall count per area</li>
            <li><strong>60° layout</strong> — angled stalls; one-way traffic; 18–20 ft aisle; easier ingress/egress, lower density</li>
            <li><strong>45° layout</strong> — shallower angle; one-way traffic; 13–15 ft aisle; lowest density but simplest maneuvering</li>
            <li><strong>ADA requirement</strong> — 1 accessible space per 25 total stalls (4%), minimum 1 van-accessible per 6 accessible</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Parking Space Calculator
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
                "Total stall count from lot area",
                "Required lot area from target stall count",
                "ADA accessible stall count (auto-calculated)",
                "Van-accessible stall count",
                "Drive aisle count and total aisle area",
                "Lot efficiency ratio (stall area vs total)",
                "90°, 60°, and 45° layout options",
                "US standard and metric dimensions",
                "Demand mode: required spaces from building type",
                "Visual layout diagram",
                "Export layout summary as PDF or text",
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
              title: "Retail Development Site Feasibility",
              scenario: "A developer is evaluating a 1.2-acre (52,272 sq ft) site for a strip retail center. The local zoning requires 4 parking spaces per 1,000 sq ft of GFA. The proposed building is 8,000 sq ft, requiring 32 spaces. They enter 52,272 sq ft into the calculator with a 90° layout and standard stalls. The tool returns 93 possible stalls — well above the 32 required. The remaining 61 stalls can be shared with adjacent uses, adding value to the deal.",
            },
            {
              title: "Office Building Compliance Check",
              scenario: "An architect is verifying that a proposed 15,000 sq ft office building on a 0.75-acre site meets parking code (3.5 spaces per 1,000 sq ft = 53 required). They enter the available lot area (32,670 sq ft after building footprint setbacks), select 90° layout, and get 58 achievable stalls. The tool calculates 3 ADA required spaces, of which 1 must be van-accessible. Compliance is confirmed before the building permit application is submitted.",
            },
            {
              title: "Restaurant Parking Demand Analysis",
              scenario: "A restaurant owner is opening a 120-seat diner. Local code requires 1 space per 3 seats plus 1 space per 2 employees on peak shift (12 employees). Total: 40 + 6 = 46 required spaces. They switch the calculator to demand mode, enter 120 seats and 12 employees, and confirm 46 spaces. Their available lot is 0.35 acres (15,246 sq ft). The calculator returns 43 stalls at 90° — 3 short of the minimum. They can request a shared parking agreement with an adjacent evening-use business.",
            },
            {
              title: "Urban Surface Lot Efficiency Comparison",
              scenario: "A parking operator owns a 200 ft × 100 ft (20,000 sq ft) urban lot and wants to know whether a 90° or 60° angled layout produces more stalls. At 90°, the calculator returns 35 stalls. At 60° one-way, it returns 31 stalls. The 90° layout is 4 stalls more efficient — worth approximately $60,000–$80,000 in additional annual revenue at typical urban parking rates. The operator proceeds with the 90° design.",
            },
            {
              title: "Industrial Facility Employee Parking",
              scenario: "A logistics warehouse has 180 employees on peak shift. Code requires 1 space per 2 employees = 90 spaces. The site has a 45,000 sq ft surface area available for parking after the building and loading dock setbacks. The calculator returns 80 standard stalls at 90° — 10 short. Adding compact stalls (which require less area per stall) brings the total to 94, meeting code. The architect specifies 80 standard + 14 compact, designating the compact zone for employee-only use.",
            },
            {
              title: "ADA Compliance Planning",
              scenario: "A property manager is redesigning a 200-space parking lot and needs to verify ADA compliance. They enter 200 stalls into the demand mode. The calculator returns: 8 accessible spaces required (1 per 25), of which 2 must be van-accessible (1 per 6 accessible spaces, rounded up). The current lot has only 4 accessible stalls and 0 van-accessible stalls — a significant code violation. The manager uses the report to budget for the restriping and signage upgrade required.",
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
                "Use 90° two-way layouts as your baseline. They consistently produce the highest stall count per unit area and allow the most flexible ingress/egress patterns. Only move to angled layouts if site geometry forces one-way circulation or if the design brief specifies it.",
                "Always calculate ADA spaces last, after your total stall count is finalized. ADA ratios are applied to the total count — adding stalls late in design can push you over a threshold and add another required accessible space.",
                "For mixed-use sites, check if your jurisdiction allows shared parking agreements. A restaurant that peaks in the evening and an office that peaks during the day can often share a lot at a reduced combined stall count — sometimes by 20–30% — saving significant land area.",
                "The efficiency ratio (stall area ÷ total lot area) for a well-designed surface lot should be 60–70%. Below 55% usually means too many aisles or poor geometry. Above 75% often means insufficient pedestrian pathways or landscape buffers required by code.",
                "When planning for future growth, design the aisle layout first and leave space for additional stall rows rather than filling the lot completely. Adding stalls within an existing aisle framework is far cheaper than redesigning the traffic circulation.",
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
                "Don't use gross lot area for stall count calculations. The usable parking area is always less than the total parcel area — subtract the building footprint, required landscape setbacks, sidewalks, loading zones, and stormwater detention areas before calculating.",
                "Don't mix stall dimensions from different standards. US ADA requires an 8 ft stall with a 5 ft access aisle. If you accidentally use a 2.4m metric stall width alongside US aisle dimensions, the layout will not comply with either standard. Pick one unit system and apply it consistently.",
                "Don't forget end-of-row turning radius space. The calculator assumes regular rectangular rows, but real lots need additional area at the end of each aisle for vehicles to turn and enter the next row. Add 2–4 ft per aisle end in dense lots.",
                "Don't rely on a single parking ratio for all uses in a mixed-use development. A building with retail on the ground floor, offices above, and residential units has three different applicable parking ratios. Calculate each use separately and sum the results.",
                "Don't assume compact stall designation is unrestricted. Many jurisdictions cap compact stalls at 20–30% of total stall count. If you exceed that cap, you cannot count those stalls toward your code minimum.",
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
          Parking Space Dimensions &amp; Stall Count Reference
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Standard Dimensions (US)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Width</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Depth</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Aisle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Standard (90°)",    "9 ft",  "19 ft", "24 ft"],
                    ["Compact (90°)",     "8 ft",  "16 ft", "24 ft"],
                    ["ADA Accessible",    "8 ft",  "19 ft", "+5 ft access"],
                    ["Van-Accessible",    "8 ft",  "19 ft", "+8 ft access"],
                    ["Standard (60°)",    "9 ft",  "20 ft", "18 ft (1-way)"],
                    ["Standard (45°)",    "9 ft",  "19 ft", "13 ft (1-way)"],
                  ].map(([type, w, d, a]) => (
                    <tr key={type} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-gray-700 text-xs">{type}</td>
                      <td className="py-2 px-3 font-mono text-primary font-semibold text-xs">{w}</td>
                      <td className="py-2 px-3 font-mono text-gray-700 text-xs">{d}</td>
                      <td className="py-2 px-3 font-mono text-gray-600 text-xs">{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Stalls per Area (90° Layout)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Lot Area</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Standard Stalls</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">ADA Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["5,000 sq ft",  "~8",   "1"],
                    ["10,000 sq ft", "~17",  "1"],
                    ["20,000 sq ft", "~35",  "2"],
                    ["30,000 sq ft", "~53",  "3"],
                    ["43,560 sq ft (1 ac)", "~78","4"],
                    ["65,340 sq ft (1.5 ac)","~117","5"],
                    ["87,120 sq ft (2 ac)", "~156","7"],
                  ].map(([area, stalls, ada]) => (
                    <tr key={area} className="hover:bg-gray-50">
                      <td className="py-2 px-3 text-gray-700 text-xs font-medium">{area}</td>
                      <td className="py-2 px-3 font-mono text-primary font-semibold text-xs">{stalls}</td>
                      <td className="py-2 px-3 font-mono text-green-600 text-xs">{ada}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Typical Parking Ratios by Use</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Land Use</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical Ratio</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Basis</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["General Retail",       "3–5 spaces",  "per 1,000 sq ft GFA",    "10,000 sq ft → 30–50 spaces"],
                  ["Office",               "3–4 spaces",  "per 1,000 sq ft GFA",    "15,000 sq ft → 45–60 spaces"],
                  ["Restaurant / Diner",   "1 space",     "per 3–4 seats",           "120 seats → 30–40 spaces"],
                  ["Residential",          "1–2 spaces",  "per dwelling unit",       "20 units → 20–40 spaces"],
                  ["Warehouse / Industrial","0.5–1 space","per 1,000 sq ft GFA",    "50,000 sq ft → 25–50 spaces"],
                  ["Hospital",             "3–4 spaces",  "per 1,000 sq ft GFA",    "80,000 sq ft → 240–320 spaces"],
                ].map(([use, ratio, basis, example]) => (
                  <tr key={use} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-800 text-xs">{use}</td>
                    <td className="py-2 px-3 font-mono text-primary font-semibold text-xs">{ratio}</td>
                    <td className="py-2 px-3 text-gray-500 text-xs">{basis}</td>
                    <td className="py-2 px-3 text-green-600 text-xs">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">* Ratios are typical US baselines. Always verify against your local zoning ordinance — requirements vary significantly by municipality.</p>
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
          Who Uses This Parking Space Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏛️", title: "Architects", desc: "Verify parking compliance during schematic design, size lots for permit applications, and produce stall count summaries for planning board submissions." },
            { icon: "🏗️", title: "Civil Engineers", desc: "Design surface lot geometry, calculate paving area for cost estimates, and confirm ADA compliance requirements before construction documents are finalized." },
            { icon: "🏙️", title: "Urban Planners", desc: "Evaluate parking supply adequacy for rezoning applications, shared parking analysis, and transit-oriented development studies." },
            { icon: "🏢", title: "Commercial Developers", desc: "Run quick feasibility checks on site acquisitions to confirm a parcel can support the required parking for the intended use before committing to purchase." },
            { icon: "🛒", title: "Retail & Restaurant Owners", desc: "Verify that an available lease space has sufficient parking to meet local code and support expected customer volume before signing a commercial lease." },
            { icon: "🅿️", title: "Parking Operators", desc: "Optimize layout for revenue-maximizing stall count, compare angled vs. perpendicular configurations, and plan phased expansion of existing lots." },
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
