export default function AcreToSquareFeetConverterSEO() {
  const faqItems = [
    { q: "How many square feet are in 1 acre?", a: "1 acre equals exactly 43,560 square feet. This is the legally defined value in the United States and internationally — derived from the historical chain-and-furlong surveying system (1 acre = 10 square chains = 10 × 66 ft × 66 ft = 43,560 sq ft). It is a fixed, non-approximated value used in all real estate, agricultural, and land surveying contexts." },
    { q: "How many square feet is 0.25 acres?", a: "0.25 acres equals 10,890 square feet. Calculation: 0.25 × 43,560 = 10,890. A quarter-acre lot is the most common residential lot size in US suburban developments — roughly a 104 ft × 104 ft square, or a 75 ft × 145 ft rectangular lot typical of suburban neighborhoods." },
    { q: "How many square feet is 0.5 acres?", a: "0.5 acres equals 21,780 square feet. Calculation: 0.5 × 43,560 = 21,780. A half-acre lot laid out as a square would be approximately 147.6 ft × 147.6 ft. Half-acre lots are common in semi-rural residential developments and larger suburban subdivisions." },
    { q: "How many acres is 10,890 square feet?", a: "10,890 square feet equals exactly 0.25 acres. Calculation: 10,890 ÷ 43,560 = 0.25. This is one of the most searched conversions — a 10,890 sq ft lot is the standard quarter-acre residential parcel. This converter handles both directions: enter acres to get square feet, or use it as a reference for common sq ft values." },
    { q: "How many acres is 43,560 square feet?", a: "43,560 square feet equals exactly 1 acre. This is the definition. If a property listing says 43,560 sq ft, that is precisely 1.0 acres — the size of a standard American football field from end zone to end zone including the sidelines." },
    { q: "What is the formula to convert acres to square feet?", a: "Square Feet = Acres × 43,560. For the reverse direction: Acres = Square Feet ÷ 43,560. Both use the exact factor of 43,560 — there are no approximations involved. A common mental shortcut is 'multiply by 44,000' which gives a result about 1% high, fine for rough checks but not for legal documents or property transactions." },
    { q: "How big is an acre visually?", a: "One acre is approximately the size of an American football field without the end zones (roughly 300 ft × 145 ft), or a square with sides of about 208.7 feet (63.6 meters). In practical terms: a standard city block is roughly 2–3 acres, a typical suburban quarter-acre lot is 10,890 sq ft, and an acre of farmland grows enough wheat for about 1,500 loaves of bread per harvest." },
    { q: "Can I convert square feet back to acres with this tool?", a: "This tool converts acres to square feet. To convert square feet back to acres, use the square-feet-to-acre-converter tool, which is the companion tool designed for the reverse direction. Both tools are linked from this page. For quick reference: divide your square feet by 43,560 to get acres." },
    { q: "Is the acre the same in the US and UK?", a: "Yes. The international acre used in the US, UK, and most countries is defined as exactly 43,560 square feet or 4,046.856 square meters. There is also a historical US survey acre (used in some older legal descriptions in the US) equal to 43,560.174 square feet — a difference of 0.0004% that is negligible for all practical purposes." },
    { q: "Is my data private when using this converter?", a: "Yes. All conversions run entirely in your browser using JavaScript. Your inputs are never sent to any server, stored in any database, or accessible to anyone other than you. The tool works fully offline once the page has loaded." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter your acre value", "Type any number of acres into the input field. Decimals are fully supported — 0.25, 0.5, 1.75, or 100 all work. The square feet result appears instantly as you type, with no submit button needed."],
    ["Read the square feet result", "The square feet equivalent displays immediately below the input. For 1 acre the result is 43,560 sq ft. For 0.25 acres it is 10,890 sq ft. The result updates with every keystroke and formats large numbers with commas for readability."],
    ["Adjust decimal precision", "Use the precision selector to choose 0, 2, 4, or 6 decimal places. Zero decimals is standard for whole-number property sizes; 4 or 6 decimal places suits legal documents and survey applications where exact fractional areas matter."],
    ["Use presets for common values", "Click any preset button — 0.25, 0.5, 1, 5, or 10 acres — to instantly load that value without typing. Presets cover the most common residential and agricultural lot sizes."],
    ["Copy or export your result", "Click the copy button to send the result to clipboard for pasting into a listing, spreadsheet, or document. Use the download button to save a text report of your conversion history for project documentation."],
    ["Check conversion history", "The tool saves your last 10 conversions locally in your browser. Click any history entry to reload that input value instantly — useful when comparing multiple property sizes side by side."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Acres to Square Feet Converter
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>acres to square feet converter</strong> is a free online tool that instantly
            converts any land area in acres to its equivalent in square feet — and handles the reverse
            direction too. Enter acres, get square feet. The conversion uses the single exact factor:
            <strong> 1 acre = 43,560 square feet</strong>, applied to any decimal or whole-number input
            with up to 6 decimal places of precision.
          </p>
          <p>
            The conversion sounds simple, but the non-round factor makes it error-prone to do mentally.
            A quarter-acre lot is 10,890 sq ft — not 10,000 or 11,000. A half-acre is 21,780 sq ft,
            not 22,000. On a real estate transaction or permit application where property area must be
            exact, a rough mental estimate introduces errors that get embedded in legal documents. This
            tool applies the precise factor every time.
          </p>
          <p>
            Built for <strong>real estate agents converting property listing sizes, buyers evaluating
            land parcels, architects and contractors calculating buildable area from deed descriptions,
            agricultural planners working with field sizes, and anyone who encounters acreage in listings
            and needs to visualize it in square feet</strong>. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Acres to Square Feet Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Conversion Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Square Feet</span> = Acres × 43,560</p>
              <p><span className="font-semibold">Acres</span> = Square Feet ÷ 43,560</p>
              <p className="text-gray-500 text-xs mt-2">Origin: 1 acre = 10 square chains = 10 × (66 ft)² = 43,560 sq ft — exact, no rounding</p>
              <p className="text-gray-500 text-xs">Also: 1 acre = 4,840 sq yd = 4,046.856 m² = 0.404686 hectares</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>1 acre</strong> = 43,560 sq ft = 4,840 sq yd = 208.71 ft × 208.71 ft (if square)</li>
            <li><strong>0.25 acres</strong> = 10,890 sq ft — the standard US quarter-acre residential lot</li>
            <li><strong>0.5 acres</strong> = 21,780 sq ft — half-acre suburban or semi-rural lot</li>
            <li><strong>1 sq mile</strong> = 640 acres = 27,878,400 sq ft</li>
            <li>Quick mental estimate: multiply acres by <strong>44,000</strong> (1% high) — fine for rough checks, not for legal docs</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Acre to Square Feet Converter
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
                "Instant acres to square feet conversion",
                "0, 2, 4, and 6 decimal precision options",
                "Presets: 0.25, 0.5, 1, 5, 10 acres",
                "Comma-formatted output for large numbers",
                "Full reference table (common acre values)",
                "Conversion history (last 10 entries)",
                "Copy result to clipboard",
                "Export conversion report as text",
                "Keyboard shortcuts (Enter to convert, Esc to reset)",
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
              title: "Evaluating a Residential Lot Listing",
              scenario: "A buyer sees a suburban listing described as '0.34 acres' and wants to know if the yard is large enough for a pool and detached garage. They enter 0.34 into the converter: 0.34 × 43,560 = 14,810 sq ft. The house footprint is 2,200 sq ft. Remaining lot area: 14,810 − 2,200 = 12,610 sq ft — enough for a 500 sq ft pool area and a 600 sq ft garage with room to spare. The buyer proceeds with the offer.",
            },
            {
              title: "Permit Application for a New Build",
              scenario: "An architect is preparing a site plan for a 1.2-acre residential development parcel. The zoning ordinance allows a maximum building coverage of 25% of the lot area, expressed in square feet on the permit form. 1.2 × 43,560 = 52,272 sq ft total. 25% coverage limit: 52,272 × 0.25 = 13,068 sq ft maximum footprint. The architect sizes the house and attached garage to 12,400 sq ft combined — under the limit — and submits the permit.",
            },
            {
              title: "Agricultural Seed and Fertilizer Planning",
              scenario: "A market gardener is planting a 3.5-acre field of sweet corn. The seed supplier lists coverage rates in square feet per bag (1 bag per 1,000 sq ft at recommended spacing). 3.5 × 43,560 = 152,460 sq ft. At 1,000 sq ft per bag: 152,460 ÷ 1,000 = 152.46 bags — ordered as 153 bags. Fertilizer application rate is 0.5 lb per 100 sq ft: 152,460 × 0.005 = 762.3 lbs required.",
            },
            {
              title: "Real Estate Agent Listing Conversion",
              scenario: "A real estate agent in Texas is listing a 7.8-acre rural property. The MLS listing platform requires area in both acres and square feet. 7.8 × 43,560 = 339,768 sq ft. The agent enters both values: '7.8 acres (339,768 sq ft)' — immediately readable for local buyers who think in acres and out-of-state buyers who think in square feet. The dual-unit listing gets 40% more inquiries than acreage-only listings on the same platform.",
            },
            {
              title: "Comparing Multiple Parcels for Investment",
              scenario: "A land investor is comparing three rural parcels: 12.4 acres, 8.75 acres, and 15.1 acres. Converting each: 12.4 × 43,560 = 540,144 sq ft; 8.75 × 43,560 = 381,150 sq ft; 15.1 × 43,560 = 657,756 sq ft. Total investable area across all three parcels: 1,579,050 sq ft = 36.25 acres. At $0.85 per sq ft asking price, the combined land cost is $1,342,192 — the investor evaluates whether the total square footage justifies the combined price.",
            },
            {
              title: "Landscape and Irrigation Design",
              scenario: "A landscaping contractor is designing an irrigation system for a 2.25-acre commercial property. The irrigation specification calls out coverage in square feet per zone, with each zone covering 8,000 sq ft. 2.25 × 43,560 = 98,010 sq ft total. Number of zones needed: 98,010 ÷ 8,000 = 12.25 — rounded up to 13 zones. Sod requirement at 1.1 sq ft per roll: 98,010 ÷ 1.1 = 89,100 rolls. Both the zone count and material order flow directly from the acre-to-sq-ft conversion.",
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
                "Use 44,000 as a rough mental multiplier for quick estimates — multiply acres by 44,000 for an approximate square footage. This is 1% high (overestimates by about 440 sq ft per acre), acceptable for casual comparisons but not for permits, listings, or purchase contracts.",
                "When evaluating a property for construction, subtract the house footprint from the total sq ft to find usable outdoor area. Most zoning codes express lot coverage limits as a percentage of total lot area in square feet — convert your deed's acreage first, then calculate coverage against the ordinance.",
                "For agricultural applications, check whether your supplier's coverage rates are given in sq ft or acres. Fertilizer, seed, and pesticide rates are often listed in pounds per 1,000 sq ft or per acre — convert your field size to whichever unit matches the product label before calculating quantity.",
                "Property deeds in the US often describe land in acres to four decimal places — for example, '2.4375 acres'. This is 2 + 7/16 acres, expressed decimally from the old surveying fraction system. Converting: 2.4375 × 43,560 = 106,181.25 sq ft. The fractional precision in the deed matters for boundary disputes and title insurance.",
                "When comparing listings across different markets, some US states list rural properties in acres while urban listings use square feet. Converting everything to sq ft gives a consistent basis for price-per-sq-ft comparisons: divide the listing price by the converted sq ft to get the price per square foot regardless of how the original listing stated the size.",
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
                "Don't round 43,560 to 43,500 or 44,000 for formal documents. On a 10-acre parcel, rounding to 44,000 gives 440,000 sq ft instead of the correct 435,600 sq ft — a difference of 4,400 sq ft, which at $10/sq ft is a $44,000 valuation error.",
                "Don't confuse acres with hectares when reading international property listings. 1 acre ≠ 1 hectare. 1 hectare = 2.47 acres = 107,639 sq ft. A European listing of '2 hectares' is 215,278 sq ft, not 87,120 sq ft (which would be 2 acres). Always confirm which unit the listing uses before converting.",
                "Don't assume a 'square acre' is the only shape. An acre is a unit of area, not shape. 43,560 sq ft can be a long narrow strip (e.g., 200 ft × 217.8 ft), a wide rectangle (e.g., 150 ft × 290.4 ft), or any irregular polygon. When evaluating buildability, dimensions matter as much as total area.",
                "Don't use the US survey acre for modern transactions. The US survey acre (43,560.174 sq ft) differs from the international acre (43,560 sq ft) by 0.174 sq ft per acre — negligible for most purposes but occasionally found in older legal descriptions for government land parcels in the western US. Modern property transactions use the international acre.",
                "Don't skip the conversion step when calculating setback compliance. Zoning ordinances set minimum setbacks in feet from property lines — these are linear dimensions, not area. Converting the lot from acres to sq ft gives you the total area, but you still need the actual lot dimensions (length × width) to check whether a structure meets the 15-ft side setback and 25-ft front setback requirements.",
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
          Acres to Square Feet Conversion Reference Table
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
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
                    ["0.25",  "10,890",     "Quarter-acre residential lot"],
                    ["0.5",   "21,780",     "Half-acre suburban plot"],
                    ["0.75",  "32,670",     "Three-quarter acre"],
                    ["1",     "43,560",     "Standard acre (≈ football field)"],
                    ["1.5",   "65,340",     "Large residential lot"],
                    ["2",     "87,120",     "Small rural parcel"],
                    ["2.5",   "108,900",    "Small farm field"],
                    ["5",     "217,800",    "Medium field or small farm"],
                    ["10",    "435,600",    "Large land parcel"],
                    ["25",    "1,089,000",  "Small ranch"],
                    ["50",    "2,178,000",  "Medium farm"],
                    ["100",   "4,356,000",  "Large farm / estate"],
                    ["320",   "13,939,200", "Half-section (US survey)"],
                    ["640",   "27,878,400", "1 square mile / 1 section"],
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
                    ["5,000",      "0.1148", "Small urban lot"],
                    ["10,000",     "0.2296", "Typical city lot"],
                    ["10,890",     "0.25",   "Quarter acre — exact"],
                    ["15,000",     "0.3444", "Medium suburban lot"],
                    ["21,780",     "0.5",    "Half acre — exact"],
                    ["27,000",     "0.6199", "Large suburban lot"],
                    ["43,560",     "1.0",    "One acre — exact"],
                    ["65,000",     "1.4923", "Large lot / small acreage"],
                    ["87,120",     "2.0",    "Two acres — exact"],
                    ["100,000",    "2.2957", "Large rural parcel"],
                    ["217,800",    "5.0",    "Five acres — exact"],
                    ["435,600",    "10.0",   "Ten acres — exact"],
                    ["500,000",    "11.478", "Small ranch"],
                    ["1,000,000",  "22.957", "Large development site"],
                    ["4,356,000",  "100.0",  "100 acres — exact"],
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
          Who Uses This Acres to Square Feet Converter?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏡", title: "Home Buyers & Sellers", desc: "Translate acreage listings into square feet to evaluate lot size, estimate usable yard space, and compare properties listed with inconsistent units across different markets." },
            { icon: "🏗️", title: "Architects & Contractors", desc: "Convert deed-described land area to square feet for site plans, lot coverage calculations, and permit applications that require total area in sq ft rather than acres." },
            { icon: "🌾", title: "Farmers & Agronomists", desc: "Calculate seed, fertilizer, and pesticide quantities from supplier coverage rates expressed in square feet, using the converted field area from the deed or survey map." },
            { icon: "📋", title: "Real Estate Agents", desc: "Add square footage equivalents to acreage listings for buyers unfamiliar with acres, and quickly convert between units when preparing comparative market analyses." },
            { icon: "🏛️", title: "Planning & Zoning", desc: "Verify that proposed development areas comply with zoning ordinances that express lot coverage, open space, and impervious surface limits in square feet." },
            { icon: "📐", title: "Land Surveyors & Appraisers", desc: "Cross-check survey plat totals, verify deed descriptions, and prepare appraisal reports that require area in both acres and square feet for different sections of the document." },
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
