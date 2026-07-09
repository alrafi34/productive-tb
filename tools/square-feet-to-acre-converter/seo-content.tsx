export default function SquareFeetToAcreConverterSEO() {
  const faqItems = [
    { q: "How many acres is 1,000 square feet?", a: "1,000 square feet equals 0.02296 acres. Calculation: 1,000 ÷ 43,560 = 0.02296. Small urban lots, studio apartments, and individual commercial units are often described in square feet — this converter makes it easy to express those areas in acres for land registry, planning, or comparison purposes." },
    { q: "How many acres is 10,890 square feet?", a: "10,890 square feet equals exactly 0.25 acres — a quarter acre. This is one of the most commonly searched conversions because 0.25 acres (10,890 sq ft) is the standard residential lot size in most US suburban developments. A 75 ft × 145 ft lot is a typical layout." },
    { q: "How many acres is 43,560 square feet?", a: "43,560 square feet equals exactly 1 acre. This is the definition — 1 acre = 43,560 sq ft. If a deed or survey describes a parcel as 43,560 square feet, it is precisely 1.0 acres." },
    { q: "What is the formula to convert square feet to acres?", a: "Acres = Square Feet ÷ 43,560. For the reverse: Square Feet = Acres × 43,560. The divisor 43,560 is exact — derived from the historical chain-and-furlong surveying system (1 acre = 10 square chains = 10 × 66 ft × 66 ft). There is no rounding in this conversion." },
    { q: "How many acres is 5,000 square feet?", a: "5,000 square feet equals 0.1148 acres. Calculation: 5,000 ÷ 43,560 = 0.1148. This is a typical small urban lot or large commercial unit footprint. At 4 decimal places: 0.1148 acres." },
    { q: "How many acres is 2,000 square feet?", a: "2,000 square feet equals 0.0459 acres. Calculation: 2,000 ÷ 43,560 = 0.04592. Most residential homes have a floor area of 1,500–3,000 sq ft — converting the floor area to acres shows just how small a building footprint is relative to even a quarter-acre lot." },
    { q: "Can I convert acres back to square feet with this tool?", a: "Yes. Use the swap button to reverse the direction — enter acres and receive square feet. The same tool covers both sq ft to acres and acres to sq ft. For dedicated reverse conversion, the acre-to-square-feet-converter is the companion tool linked from this page." },
    { q: "Is the square foot the same everywhere?", a: "Yes. The international foot is defined as exactly 0.3048 meters, making 1 square foot exactly 0.092903 square meters. The US survey foot differs by about 2 parts per million — negligible for all property and land measurement purposes. This converter uses the international definition." },
    { q: "How precise is this converter?", a: "The converter uses the exact factor of 43,560 sq ft per acre with no approximation. You can select 0, 2, 4, or 6 decimal places in the output. For legal documents and survey applications, use 4–6 decimal places. For casual property comparisons, 2 decimal places is sufficient." },
    { q: "Is my data private when using this converter?", a: "Yes. All conversions run entirely in your browser using JavaScript. Your inputs are never sent to any server, stored in any database, or accessible to anyone other than you. The tool works fully offline once the page has loaded." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter your square feet value", "Type any number of square feet into the input field. Decimals are fully supported — 10,890, 43,560, or 2,178.75 all work. The acre result appears instantly as you type with no submit button needed."],
    ["Read the acre result", "The acre equivalent displays immediately below the input. For 43,560 sq ft the result is exactly 1 acre. For 10,890 sq ft it is 0.25 acres. Large numbers are formatted with commas for readability."],
    ["Adjust decimal precision", "Use the precision selector to choose 0, 2, 4, or 6 decimal places. Two decimals suits most property comparisons; 4–6 decimal places is appropriate for legal documents and survey records."],
    ["Use presets for common values", "Click any preset button — 10,890, 21,780, 43,560, or 87,120 sq ft — to instantly load common residential and agricultural lot sizes without typing."],
    ["Swap to acres-to-square-feet", "Click the swap button to reverse the conversion direction — enter acres and receive square feet. The same tool covers both directions without navigating away."],
    ["Copy or export your result", "Click copy to send the result to clipboard for pasting into a listing, permit form, or spreadsheet. Download a text report of your conversion history for documentation or project records."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Square Feet to Acres Converter
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>square feet to acres converter</strong> is a free online tool that instantly converts
            any land or property area in square feet to its equivalent in acres — and handles the reverse
            direction too. Enter square feet, get acres. The conversion uses one exact factor:
            <strong> 1 acre = 43,560 square feet</strong>, applied to any input at up to 6 decimal places.
          </p>
          <p>
            Property deeds, survey plats, and real estate listings frequently switch between square feet and
            acres without explanation. A 10,890 sq ft lot is a quarter acre. A 43,560 sq ft parcel is
            exactly 1 acre. A permit application that asks for lot area in acres when the deed says
            "87,120 square feet" requires a precise conversion — not a mental estimate. The non-round
            divisor (43,560) makes mental math error-prone; this tool applies the exact factor every time.
          </p>
          <p>
            Built for <strong>home buyers reading listing data, real estate agents preparing comparisons,
            architects calculating site coverage, contractors sizing permits, agricultural planners
            working with field areas, and anyone who encounters square footage and needs the acreage</strong>.
            Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Square Feet to Acres Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Conversion Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Acres</span> = Square Feet ÷ 43,560</p>
              <p><span className="font-semibold">Square Feet</span> = Acres × 43,560</p>
              <p className="text-gray-500 text-xs mt-2">Origin: 1 acre = 10 square chains = 10 × (66 ft)² = 43,560 sq ft — exact, no rounding</p>
              <p className="text-gray-500 text-xs">Also: 1 acre = 4,840 sq yd = 4,046.856 m² = 0.404686 hectares</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>10,890 sq ft</strong> = 0.25 acres — the standard US quarter-acre residential lot</li>
            <li><strong>21,780 sq ft</strong> = 0.5 acres — half-acre suburban lot</li>
            <li><strong>43,560 sq ft</strong> = 1 acre — the definition; also roughly a football field without end zones</li>
            <li><strong>87,120 sq ft</strong> = 2 acres — typical small farm parcel or large suburban estate</li>
            <li>Quick mental estimate: divide sq ft by <strong>44,000</strong> (underestimates by ~1%) — fine for rough checks, not legal docs</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Square Feet to Acres Converter
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
                "Instant sq ft to acres conversion",
                "Reverse conversion: acres to square feet",
                "0, 2, 4, and 6 decimal precision options",
                "Presets: 10,890 / 21,780 / 43,560 / 87,120 sq ft",
                "Comma-formatted output for large numbers",
                "Full reference table (common sq ft values)",
                "Conversion history (last 10 entries)",
                "Copy result to clipboard",
                "Export conversion report as text",
                "100% browser-based — no data sent to server",
                "No registration required",
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
              title: "Reading a Property Survey",
              scenario: "A buyer receives a survey plat that describes a residential lot as 13,068 square feet. They want to know the acreage to compare with other listings quoted in acres. 13,068 ÷ 43,560 = 0.3000 acres exactly — a 30% of an acre lot. Comparing with a nearby listing at 0.28 acres (12,197 sq ft), they confirm the surveyed lot is larger by 871 sq ft before making their offer.",
            },
            {
              title: "Permit Application Coverage Ratio",
              scenario: "An architect is submitting a building permit for a 2,850 sq ft house on a 14,200 sq ft lot. The zoning ordinance limits lot coverage to 25% and requires the ratio be expressed in acres. 14,200 ÷ 43,560 = 0.326 acres total. 2,850 ÷ 14,200 = 20.1% coverage — under the 25% limit. Both figures go into the permit submission with the acre-based lot size for the header field.",
            },
            {
              title: "Commercial Leasing Comparison",
              scenario: "A retail tenant is comparing two commercial spaces: 8,400 sq ft in one building and a second site listed as 0.19 acres. To compare directly, they convert 0.19 acres × 43,560 = 8,276 sq ft. The first space is 124 sq ft larger. At $28/sq ft annual rent, that difference is $3,472 per year — a factor worth knowing before negotiations.",
            },
            {
              title: "Agricultural Field Planning",
              scenario: "A market gardener maps a 65,000 sq ft growing area from a GPS survey app that outputs square feet. Their seed supplier quotes seeding rates per acre. 65,000 ÷ 43,560 = 1.4927 acres. At 15 lbs of seed per acre, they need 1.4927 × 15 = 22.39 lbs — ordered as 23 lbs. Without the conversion, ordering by rough estimate would have under- or over-ordered by a full bag.",
            },
            {
              title: "Real Estate Listing Preparation",
              scenario: "A real estate agent lists a rural property that the county assessor records as 196,020 square feet. Most rural buyers think in acres. 196,020 ÷ 43,560 = 4.5 acres exactly. The agent lists the property as '4.5 acres (196,020 sq ft)' — the dual-unit format serves buyers from both urban (sq ft) and rural (acres) markets and reduces 'how big is that really?' follow-up questions.",
            },
            {
              title: "Lot Coverage for Home Addition",
              scenario: "A homeowner wants to add a 600 sq ft detached garage to a 9,800 sq ft lot. Current house footprint: 1,800 sq ft. Existing coverage: 1,800 ÷ 9,800 = 18.4%. After addition: 2,400 ÷ 9,800 = 24.5%. Converting lot size: 9,800 ÷ 43,560 = 0.225 acres. The permit application requires both the coverage percentage and the lot size in acres — this converter provides the acreage in one step.",
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
                "Use 44,000 as a mental divisor for quick acre estimates — dividing sq ft by 44,000 gives a result about 1% too low (underestimates by ~436 sq ft per acre). Fine for rough comparisons, not for legal descriptions or permit submissions.",
                "When reading a property listing, always confirm whether the stated square footage refers to living area (the interior) or lot area (the full parcel). Lot area ÷ 43,560 gives the acreage; living area ÷ 43,560 gives the building footprint ratio relative to one acre.",
                "For agricultural applications, convert your total field area to acres first, then multiply by per-acre application rates for seed, fertilizer, or irrigation. Doing the rate calculation in sq ft introduces an extra step and a potential error.",
                "When comparing properties, convert everything to acres at 2 decimal places for a side-by-side comparison. At 4 decimal places the differences look significant even when they are negligible — 0.2296 vs 0.2300 acres is 17 sq ft, less than one parking space.",
                "GPS survey apps and GIS tools often report polygon areas in square feet or square meters. Always convert to acres before submitting to county assessors, title companies, or zoning boards — most official forms require acreage, not square footage.",
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
                "Don't divide by 40,000 or 45,000 as a shortcut — both introduce errors over 2%. On a 50,000 sq ft parcel, dividing by 40,000 gives 1.25 acres; the correct answer is 1.148 acres. That 0.1-acre difference is worth thousands of dollars at commercial land rates.",
                "Don't confuse building floor area with lot area when converting. A 2,400 sq ft house on a 10,890 sq ft lot does not sit on 0.055 acres — it sits on a 0.25-acre lot with a 2,400 sq ft footprint covering 22% of it. The conversion should always apply to the lot area.",
                "Don't use the US survey foot instead of the international foot for modern property transactions. The US survey foot (used in some older western US government land descriptions) produces a negligible difference of 0.0002% — but mixing the two systems in a single calculation can cause confusion. Stick to the international standard: 1 acre = 43,560 sq ft.",
                "Don't round to 2 decimal places on legal documents. A deed that says '2.00 acres' when the actual area is 87,076 sq ft (1.998 acres) is technically inaccurate. Use 4 decimal places for anything that will be recorded or submitted to a government office.",
                "Don't forget that acreage in property deeds often excludes easements, rights-of-way, and unbuildable areas. The gross lot area in square feet may convert to 1.5 acres, but the net buildable area after easements could be 1.1 acres — a distinction that matters for zoning compliance calculations.",
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
          Square Feet to Acres Conversion Reference Table
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Square Feet → Acres</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Square Feet</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Acres</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["1,000",     "0.0230", "Studio / small shop"],
                    ["2,000",     "0.0459", "Typical house footprint"],
                    ["5,000",     "0.1148", "Small urban lot"],
                    ["10,000",    "0.2296", "Standard city lot"],
                    ["10,890",    "0.25",   "Quarter acre — exact"],
                    ["15,000",    "0.3444", "Medium suburban lot"],
                    ["21,780",    "0.5",    "Half acre — exact"],
                    ["27,000",    "0.6199", "Large suburban lot"],
                    ["43,560",    "1.0",    "One acre — exact"],
                    ["65,000",    "1.4923", "Small acreage"],
                    ["87,120",    "2.0",    "Two acres — exact"],
                    ["100,000",   "2.2957", "Large rural parcel"],
                    ["217,800",   "5.0",    "Five acres — exact"],
                    ["435,600",   "10.0",   "Ten acres — exact"],
                    ["4,356,000", "100.0",  "100 acres — exact"],
                  ].map(([sqft, ac, ctx]) => (
                    <tr key={sqft} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{sqft}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{ac}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{ctx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Acres → Square Feet</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Acres</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Square Feet</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["0.1",   "4,356",      "Small urban lot"],
                    ["0.25",  "10,890",     "Quarter acre — exact"],
                    ["0.5",   "21,780",     "Half acre — exact"],
                    ["0.75",  "32,670",     "Three-quarter acre"],
                    ["1",     "43,560",     "One acre — exact"],
                    ["1.5",   "65,340",     "Large residential lot"],
                    ["2",     "87,120",     "Two acres — exact"],
                    ["2.5",   "108,900",    "Small farm field"],
                    ["5",     "217,800",    "Medium field"],
                    ["10",    "435,600",    "Large parcel"],
                    ["25",    "1,089,000",  "Small ranch"],
                    ["50",    "2,178,000",  "Medium farm"],
                    ["100",   "4,356,000",  "Large farm"],
                    ["320",   "13,939,200", "Half-section (US)"],
                    ["640",   "27,878,400", "1 square mile"],
                  ].map(([ac, sqft, ctx]) => (
                    <tr key={ac} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{ac} ac</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{sqft}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{ctx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">* All values use the exact factor: 1 acre = 43,560 sq ft. Rounded to 4 decimal places for display where applicable.</p>
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
          Who Uses This Square Feet to Acres Converter?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏡", title: "Home Buyers & Sellers", desc: "Convert lot sizes between square feet and acres to compare listings, evaluate lot value, and understand how much land is included with a property." },
            { icon: "🏗️", title: "Architects & Contractors", desc: "Calculate lot coverage ratios, translate survey measurements to acreage for permit submissions, and verify buildable area against zoning coverage limits." },
            { icon: "🌾", title: "Farmers & Agricultural Planners", desc: "Convert GPS or GIS survey outputs from square feet to acres for seed ordering, fertilizer calculations, and crop yield projections based on per-acre rates." },
            { icon: "📋", title: "Real Estate Agents & Appraisers", desc: "Quickly convert between listing units so properties are expressed in the unit buyers expect — urban listings in sq ft, rural listings in acres." },
            { icon: "🏛️", title: "Planning & Zoning Officers", desc: "Verify lot area submissions on permit applications, cross-check coverage ratios, and confirm that parcel areas expressed in square feet match the stated acreage in zoning documents." },
            { icon: "📐", title: "Land Surveyors", desc: "Cross-check plat calculations, verify deed descriptions, and prepare documents that require area in both sq ft and acres for different sections of a legal description." },
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
