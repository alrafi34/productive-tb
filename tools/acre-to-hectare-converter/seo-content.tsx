export default function AcreToHectareConverterSEO() {
  const faqItems = [
    { q: "How many hectares is 1 acre?", a: "1 acre equals 0.404686 hectares. This is derived from the exact international definitions: 1 acre = 4,046.856 square meters and 1 hectare = 10,000 square meters. Dividing: 4,046.856 ÷ 10,000 = 0.404686." },
    { q: "How many acres is 1 hectare?", a: "1 hectare equals 2.47105 acres. This is the reciprocal of the acre-to-hectare factor: 1 ÷ 0.404686 = 2.47105. Use the swap button in this tool to convert hectares to acres directly." },
    { q: "Which is bigger — an acre or a hectare?", a: "A hectare is larger. 1 hectare = 2.47105 acres, so a hectare is about 2.47 times the size of an acre. An acre is 4,046.86 square meters; a hectare is 10,000 square meters." },
    { q: "How many hectares is 0.5 acres?", a: "0.5 acres equals 0.202343 hectares. Calculation: 0.5 × 0.404686 = 0.202343. Half an acre is approximately 0.20 hectares." },
    { q: "How many hectares is 2.5 acres?", a: "2.5 acres equals 1.01172 hectares. Calculation: 2.5 × 0.404686 = 1.01172." },
    { q: "How many hectares is 10 acres?", a: "10 acres equals 4.04686 hectares. Calculation: 10 × 0.404686 = 4.04686. A 10-acre field is approximately 4 hectares." },
    { q: "How many hectares is 100 acres?", a: "100 acres equals 40.4686 hectares. Calculation: 100 × 0.404686 = 40.4686." },
    { q: "How many hectares is 640 acres (1 square mile)?", a: "640 acres equals 258.999 hectares — approximately 259 hectares. One US section (1 square mile) of land is 640 acres or about 259 hectares." },
    { q: "What is the acre to hectare formula?", a: "Hectares = Acres × 0.404686. For reverse conversion: Acres = Hectares × 2.47105. Quick mental shortcut: divide acres by 2.5 for a rough hectare estimate (1.2% low — fine for casual checks, not official documents)." },
    { q: "Is my data private when using this converter?", a: "Yes. All conversions run entirely in your browser using JavaScript. Your inputs are never sent to any server, stored in any database, or accessible to anyone other than you. The tool works fully offline once the page has loaded." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter your acre value", "Type any number of acres into the input field. Decimals are fully supported — 0.25, 1.5, or 640 all work. The hectare result appears instantly as you type."],
    ["Read the hectare result", "The hectare equivalent displays immediately. For 1 acre, the result is 0.404686 hectares. For 10 acres, it is 4.04686 hectares. The result updates with every keystroke."],
    ["Adjust decimal precision", "Use the precision selector to choose 2, 4, 6, or 8 decimal places. Four decimal places covers most agricultural and real estate needs; six or more for legal or scientific precision."],
    ["Use presets for common values", "Click any preset button — 0.25, 0.5, 1, 5, 10, or 100 acres — to instantly load standard values. Presets cover the most common residential lot and farm field sizes."],
    ["Swap to hectares-to-acres", "Click the swap button to reverse the conversion direction. Enter hectares and receive acres — the same tool covers both directions without navigating to a different page."],
    ["Copy or export your result", "Click copy to send the result to clipboard, or download a text report of your conversion history for documentation, client handoff, or property records."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Acre to Hectare Converter?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>acre to hectare converter</strong> is a free online tool that instantly converts
            any land area value between acres and hectares (ha) — in both directions. Enter acres and get
            hectares; use the swap button and enter hectares to get acres. One tool covers the full
            <strong> acres to hectares</strong> and <strong>hectares to acres</strong> conversion without
            needing separate calculators.
          </p>
          <p>
            The conversion is anchored to one fixed factor: <strong>1 acre = 0.404686 hectares</strong>,
            derived from the international definitions of both units (1 acre = 4,046.856 m², 1 ha =
            10,000 m²). The rough shortcut — divide acres by 2.5 — is only 1.2% off, but that error
            accumulates on large areas: on a 500-acre farm it understates the hectare count by about
            2.5 hectares. This tool applies the precise factor at up to 8 decimal places.
          </p>
          <p>
            Built for <strong>farmers comparing international land data, real estate agents working with
            cross-border property listings, land surveyors preparing documentation, agricultural
            researchers processing datasets, and anyone who regularly moves between imperial and metric
            land measurements</strong>. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Acre to Hectare Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Conversion Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Hectares</span> = Acres × 0.404686</p>
              <p><span className="font-semibold">Acres</span> = Hectares × 2.47105</p>
              <p className="text-gray-500 text-xs mt-2">Derived from: 1 acre = 4,046.856 m² and 1 ha = 10,000 m²</p>
              <p className="text-gray-500 text-xs">Factor: 4,046.856 ÷ 10,000 = <span className="text-green-600 font-semibold">0.404686</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>1 acre</strong> = 0.404686 ha = 4,046.86 m² = 43,560 sq ft</li>
            <li><strong>1 hectare</strong> = 2.47105 acres = 10,000 m² = 107,639 sq ft</li>
            <li><strong>640 acres</strong> = 259 hectares = 1 square mile (1 US section)</li>
            <li><strong>100 hectares</strong> = 247.105 acres = 1 km²</li>
            <li>Quick mental estimate: divide acres by <strong>2.5</strong> for approximate hectares (1.2% low)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Acre to Hectare Converter
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
                "Instant acres to hectares conversion",
                "Reverse conversion: hectares to acres",
                "2, 4, 6, and 8 decimal precision",
                "Presets: 0.25, 0.5, 1, 5, 10, 100 acres",
                "Full reference table (common values both directions)",
                "Land size context descriptions",
                "Conversion history (last 10 entries)",
                "Copy result to clipboard",
                "Export conversion report",
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
              title: "Selling US Land to European Buyers",
              scenario: "A US ranch broker is marketing a 320-acre Montana property to European investors who think in hectares. 320 × 0.404686 = 129.5 hectares. The listing description reads: '320 acres (129.5 ha)'. European buyers immediately understand the scale — 129.5 hectares is larger than most European farms, making the size immediately legible without mental conversion. The broker uses this converter for every listing marketed internationally.",
            },
            {
              title: "Grant Application Area Reporting",
              scenario: "A US nonprofit is applying for an EU-funded reforestation grant. Their site is 1,800 acres. The application requires hectare values. 1,800 × 0.404686 = 728.43 hectares. They report '728.4 hectares' in the application. If they had used the ÷2.5 shortcut: 720 ha — off by 8.4 hectares, which at the grant's per-hectare funding rate would have understated the eligible area by several thousand euros.",
            },
            {
              title: "UK Property Purchase Comparison",
              scenario: "A buyer in England is comparing three rural properties: 45 acres, 62 acres, and 38 acres. They want to understand the sizes in hectares for comparison with European farms they already own in France (recorded in hectares). 45 ac = 18.21 ha; 62 ac = 25.09 ha; 38 ac = 15.38 ha. Their French farm is 22 hectares — the 62-acre property is the closest in size and is the one they shortlist.",
            },
            {
              title: "Agricultural Yield Normalization",
              scenario: "A commodity analyst is comparing soybean yields from US farms (reported in bushels per acre) with Brazilian farms (reported in tonnes per hectare). Before yield comparison is possible, all areas must be in the same unit. A US farm report covering 2,400 acres: 2,400 × 0.404686 = 971.25 hectares. The yield comparison now uses hectares as the standard denominator across both datasets.",
            },
            {
              title: "Planning Permission Documentation",
              scenario: "A developer in Wales is applying for planning permission on a 7.5-acre brownfield site. The Welsh planning authority requires all areas reported in hectares in the application. 7.5 × 0.404686 = 3.035 hectares. The application states '3.035 ha (7.5 acres)'. The precise 4-decimal-place conversion matches the survey documentation exactly — avoiding any request for clarification from the planning officer.",
            },
            {
              title: "Carbon Credit Land Registration",
              scenario: "A landowner in the US is registering a 240-acre forest for voluntary carbon credits. The carbon registry uses hectares. 240 × 0.404686 = 97.125 hectares. At a typical sequestration rate of 2 tCO₂/ha/year, the project generates approximately 194 tonnes per year. Using the rough ÷2.5 approximation (96 ha) would underestimate annual credits by about 2.25 tonnes — a small but compounding error over a 20-year contract.",
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
                "Use ÷2.5 as a mental shortcut for rough estimates — divide acres by 2.5 for an approximate hectare count. It is 1.2% low (underestimates by about 1 hectare per 83 acres), which is acceptable for casual sizing but not for legal or financial documents.",
                "For international grant applications and research submissions, hectares are almost always the required unit. Convert any acre-based data to hectares before submitting to FAO, EU, or UN agencies.",
                "Cross-check large conversions: 640 acres should give approximately 259 hectares (the exact value is 258.999). If your answer is far from 259, check whether you multiplied instead of divided.",
                "When buying overseas land measured in acres, always verify whether the listing uses US or UK acres — they are the same unit (both 4,046.86 m²), but some historical UK documents used a surveying acre that is slightly different. Modern deeds use the standard international acre.",
                "For carbon credit and environmental project registration, use 6 decimal places — small area differences compound over multi-year contracts. The difference between 0.4047 and 0.404686 per acre is negligible on small areas but meaningful on thousands of acres over decades.",
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
                "Don't divide by 2.5 for official documents. The correct factor is 0.404686 — using ÷2.5 (= × 0.4) introduces a 1.2% error. On 1,000 acres: the shortcut gives 400 ha; the correct answer is 404.69 ha — a difference of 4.69 hectares.",
                "Don't confuse acres with square footage in the formula. Acres and square feet are both imperial area units but are not interchangeable. 1 acre = 43,560 sq ft. Converting sq ft to hectares requires a different factor: 1 sq ft = 0.0000929 ha.",
                "Don't invert the formula. Acres to hectares: multiply by 0.404686. Hectares to acres: multiply by 2.47105. Multiplying acres by 2.47105 gives a result 6× too large — a common error when the user forgets which direction they are converting.",
                "Don't assume 'land area' in a document is always in gross area. Usable farmland or net developable area can differ significantly from the gross parcel area stated in the deed, especially for parcels with water bodies, easements, or steep terrain. Convert what the document states, then clarify with the landowner what is usable.",
                "Don't use the same conversion for roods, perches, or other historical land units. Older British land records may use acres, roods, and perches (ARP notation). A rood is ¼ acre and a perch is 1/160 acre. Convert each unit separately before applying the acre-to-hectare factor.",
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
          Acre to Hectare Conversion Reference Table
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Acres → Hectares</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Acres</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Hectares (ha)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["0.1",   "0.04047", "Tiny garden / lot"],
                    ["0.25",  "0.10117", "Quarter acre lot"],
                    ["0.5",   "0.20234", "Half acre"],
                    ["1",     "0.40469", "Standard acre"],
                    ["2",     "0.80937", "Large residential lot"],
                    ["5",     "2.02343", "Small farm plot"],
                    ["10",    "4.04686", "Medium field"],
                    ["20",    "8.09371", "Small farm"],
                    ["50",    "20.234",  "Medium farm"],
                    ["100",   "40.469",  "Large farm"],
                    ["247",   "99.957",  "≈ 100 hectares"],
                    ["320",   "129.50",  "Half section (US)"],
                    ["640",   "259.00",  "1 sq mile = 1 section"],
                    ["1000",  "404.69",  "Large ranch"],
                    ["10000", "4046.9",  "Large agricultural region"],
                  ].map(([ac, ha, ctx]) => (
                    <tr key={ac} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{ac} ac</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{ha}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{ctx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Hectares → Acres</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Hectares (ha)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Acres</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["0.1",   "0.2471",  "Small garden"],
                    ["0.25",  "0.6178",  "Quarter hectare"],
                    ["0.5",   "1.2355",  "Half hectare"],
                    ["1",     "2.4711",  "Standard hectare"],
                    ["2",     "4.9421",  "Smallholding"],
                    ["5",     "12.355",  "Small farm"],
                    ["10",    "24.711",  "Medium farm parcel"],
                    ["20",    "49.421",  "Large field"],
                    ["50",    "123.55",  "Small estate"],
                    ["100",   "247.11",  "100 ha = 1 km²"],
                    ["259",   "640.04",  "≈ 1 sq mile"],
                    ["500",   "1235.5",  "Large farm"],
                    ["1000",  "2471.1",  "Large estate"],
                    ["5000",  "12355",   "Very large farm"],
                    ["10000", "24711",   "National park scale"],
                  ].map(([ha, ac, ctx]) => (
                    <tr key={ha} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{ha} ha</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{ac}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{ctx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">* All values use the exact factor: 1 acre = 0.404686 ha. Rounded to 4–5 significant figures for display.</p>
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
          Who Uses This Acre to Hectare Converter?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🌾", title: "Farmers & Agronomists", desc: "Normalize yield data across metric and imperial systems, compare international farm sizes, and calculate inputs from supplier rates quoted in either unit." },
            { icon: "🏡", title: "Real Estate Agents", desc: "Convert US and UK property listings to hectares for European and international buyers, and convert European listings to acres for US buyers — both directions from one tool." },
            { icon: "📐", title: "Land Surveyors", desc: "Prepare survey documents and legal descriptions requiring area in both imperial and metric units for different jurisdictional requirements." },
            { icon: "🌿", title: "Environmental & Carbon Teams", desc: "Register land areas for carbon credit schemes, reforestation grants, and conservation programs that require metric area in hectares." },
            { icon: "🏛️", title: "Government & Planning", desc: "Prepare grant applications, zoning documents, and EIA reports requiring area in specific units depending on the receiving jurisdiction." },
            { icon: "🎓", title: "Students & Researchers", desc: "Convert land area data between systems for academic papers, geographic analysis, food security research, and cross-national comparative studies." },
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
