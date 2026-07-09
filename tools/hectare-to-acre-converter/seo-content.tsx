export default function HectareToAcreConverterSEO() {
  const faqItems = [
    { q: "How many acres is 1 hectare?", a: "1 hectare equals 2.47105 acres. This is derived from the exact international definitions: 1 hectare = 10,000 square meters, and 1 acre = 4,046.856 square meters. Dividing: 10,000 ÷ 4,046.856 = 2.47105." },
    { q: "How many hectares is 1 acre?", a: "1 acre equals 0.404686 hectares. This is the reciprocal of the hectare-to-acre factor: 1 ÷ 2.47105 = 0.404686. Use the swap button in this tool to convert acres to hectares directly." },
    { q: "Which is bigger — a hectare or an acre?", a: "A hectare is larger. 1 hectare = 2.47105 acres, so a hectare is about 2.47 times the size of an acre. A hectare is 10,000 square meters (100m × 100m); an acre is 4,046.86 square meters." },
    { q: "How many acres is 0.5 hectares?", a: "0.5 hectares equals 1.23553 acres. Calculation: 0.5 × 2.47105 = 1.23553. Half a hectare is just over 1.2 acres." },
    { q: "How many acres is 2.5 hectares?", a: "2.5 hectares equals 6.17763 acres. Calculation: 2.5 × 2.47105 = 6.17763." },
    { q: "How many acres is 10 hectares?", a: "10 hectares equals 24.7105 acres. Calculation: 10 × 2.47105 = 24.7105. A 10-hectare farm is approximately 25 acres." },
    { q: "How many acres is 100 hectares?", a: "100 hectares equals 247.105 acres. 100 hectares is also 1 square kilometer. Calculation: 100 × 2.47105 = 247.105." },
    { q: "Where are hectares used vs acres?", a: "Hectares are the standard metric land unit used across most of Europe, Asia, Africa, South America, and by international agricultural organizations including the FAO. Acres are primarily used in the United States, United Kingdom, Canada, and a few other countries. Most international farming data, UN statistics, and European land records use hectares." },
    { q: "What is the hectare to acre formula?", a: "Acres = Hectares × 2.47105. For reverse conversion: Hectares = Acres × 0.404686. Both factors are internationally standardized. A quick mental shortcut: multiply hectares by 2.5 for a close approximation (2.5× vs the exact 2.47105×)." },
    { q: "Is my data private when using this converter?", a: "Yes. All conversions run entirely in your browser using JavaScript. Your inputs are never sent to any server, stored in any database, or accessible to anyone other than you. The tool works fully offline once the page has loaded." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter your hectare value", "Type any number of hectares into the input field. Decimals are fully supported — 0.5, 2.47, or 1000 all work. The acre result appears instantly as you type."],
    ["Read the acre result", "The acre equivalent displays immediately. For 1 hectare, the result is 2.47105 acres. For 0.5 hectare, it is 1.23553 acres. The result updates with every keystroke."],
    ["Adjust decimal precision", "Use the precision selector to choose 2, 4, 6, or 8 decimal places. Four decimal places is suitable for most agricultural and real estate purposes; six or more for legal or scientific precision."],
    ["Use presets for common values", "Click any preset button — 0.5, 1, 5, 10, 50, or 100 ha — to instantly load that value. Presets cover the most common land parcel sizes in farming, property, and development contexts."],
    ["Swap to acres-to-hectares", "Click the swap button to reverse the conversion direction. Enter acres and receive hectares — the same tool covers both directions without navigating to a different page."],
    ["Copy or export your result", "Click copy to send the result to clipboard, or download a text report of your conversion history for documentation, client handoff, or property records."],
  ];

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Hectare to Acre Converter?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>hectare to acre converter</strong> is a free online tool that instantly converts
            any land area value between hectares (ha) and acres — in both directions. Enter hectares
            and get acres; use the swap button and enter acres to get hectares. One tool covers the
            full <strong>ha to acres</strong> and <strong>acres to hectares</strong> conversion without
            needing separate calculators.
          </p>
          <p>
            The conversion is anchored to a single fixed relationship: <strong>1 hectare =
            2.47105 acres</strong>, derived from the international definitions of both units
            (1 ha = 10,000 m², 1 acre = 4,046.856 m²). Despite being a simple multiplication,
            the non-round factor means approximations quickly accumulate error — 10 hectares rounded
            to "about 25 acres" is off by over 1 acre from the correct 24.7105. This tool applies
            the precise factor to any input, at up to 8 decimal places.
          </p>
          <p>
            Built for <strong>farmers comparing international land data, real estate agents working
            with cross-border property listings, land surveyors preparing documentation, agricultural
            researchers processing datasets, and anyone who regularly encounters both metric and
            imperial land measurements</strong>. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Hectare to Acre Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Conversion Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Acres</span> = Hectares × 2.47105</p>
              <p><span className="font-semibold">Hectares</span> = Acres × 0.404686</p>
              <p className="text-gray-500 text-xs mt-2">Derived from: 1 ha = 10,000 m² and 1 acre = 4,046.856 m²</p>
              <p className="text-gray-500 text-xs">Factor: 10,000 ÷ 4,046.856 = <span className="text-green-600 font-semibold">2.47105</span></p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>1 hectare</strong> = 2.47105 acres = 10,000 m² = 107,639 sq ft</li>
            <li><strong>1 acre</strong> = 0.404686 ha = 4,046.86 m² = 43,560 sq ft</li>
            <li><strong>100 hectares</strong> = 247.105 acres = 1 km²</li>
            <li><strong>640 acres</strong> = 259 hectares = 1 square mile (1 US section)</li>
            <li>Quick mental estimate: multiply hectares by <strong>2.5</strong> (1.2% high — fine for rough checks)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Hectare to Acre Converter
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
                "Instant ha to acres conversion",
                "Reverse conversion: acres to hectares",
                "2, 4, 6, and 8 decimal precision",
                "Presets: 0.5, 1, 5, 10, 50, 100 ha",
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
              title: "International Farm Comparison",
              scenario: "An agricultural researcher is comparing crop yield data from European farms (reported in hectares per tonne) with US farms (reported in acres per bushel). They need to normalize all plots to the same unit. A 450-hectare farm in Germany: 450 × 2.47105 = 1,111.97 acres. A 1,200-acre farm in Iowa: 1,200 × 0.404686 = 485.62 hectares. With both farms expressed in hectares, the yield-per-unit comparison becomes valid.",
            },
            {
              title: "Cross-Border Real Estate Listing",
              scenario: "A UK estate agency is listing a 8.5-hectare rural property for an American buyer who is accustomed to acres. 8.5 × 2.47105 = 21.00 acres. The agent adds both values to the listing: '8.5 hectares (21.0 acres)' — immediately legible to both metric and imperial markets. The reverse is equally common: a buyer asking about a 55-acre US ranch needs to know it is 22.26 hectares for comparison with European land they already own.",
            },
            {
              title: "Agricultural Planning and Crop Rotation",
              scenario: "A farm manager in Canada is rotating crops across three paddocks: 12.4 ha, 8.7 ha, and 15.1 ha. The seed supplier quotes coverage rates in acres per bag. Total area: 36.2 ha × 2.47105 = 89.45 acres. At 50 acres per bag, they need 1.79 bags — rounded up to 2 bags. Without an accurate conversion, they would have used the rough ×2.5 estimate (90.5 acres) and ordered the same 2 bags — but with finer crops where every acre matters, the 1-acre error changes planting density.",
            },
            {
              title: "Land Survey and Legal Documentation",
              scenario: "A surveyor in New Zealand is preparing a subdivision consent application. The local council requires the total site area reported in both hectares (for zoning compliance) and acres (for historical land register compatibility). The site measures 3.78 hectares. 3.78 × 2.47105 = 9.340569 acres. Both values are reported to 6 decimal places on the legal document — a precision the mental-math 'multiply by 2.5' shortcut cannot provide.",
            },
            {
              title: "Forest and Conservation Management",
              scenario: "A conservation trust is purchasing a 247-acre forest in the UK and needs to report the acquisition area in hectares for their EU-funded grant application, which requires metric units. 247 × 0.404686 = 99.957 hectares — essentially 100 hectares. The trust reports '99.96 hectares (approximately 100 ha)' in the grant application. Interestingly, 100 hectares = 247.105 acres, confirming the site was originally specified as a round metric area.",
            },
            {
              title: "Food Production and Yield Reporting",
              scenario: "An agronomist is reporting wheat yield data for a 2,500-hectare operation to an international commodity trader who uses acres. 2,500 × 2.47105 = 6,177.63 acres. The 3.8 tonne/hectare yield becomes: 3.8 × 0.404686 = 1.538 tonne/acre (or approximately 57 bushels/acre at standard wheat density). Both the area and yield conversions depend on the precise 2.47105 factor — not the approximate 2.5 shortcut.",
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
                "Use 2.5× as a mental shortcut for rough estimates — multiply hectares by 2.5 for an approximate acre count. It is 1.2% high (overestimates by about 1 acre per 83 hectares), which is acceptable for casual checks but not legal or financial documents.",
                "When reporting land area for international agricultural grant applications, always use hectares — the FAO, EU, and most development agencies require metric units. Convert any acre-based source data to hectares before submission.",
                "For land purchase decisions, always use 4+ decimal places. A 0.001 acre per hectare rounding error on a 500-hectare transaction equals 0.5 acres — potentially thousands of dollars of land area at commercial rates.",
                "Remember that 1 km² = 100 hectares = 247.105 acres. If you need to convert between square kilometers and acres, go through hectares as an intermediate step: km² × 100 = hectares × 2.47105 = acres.",
                "Cross-check large conversions against the approximate rule: if the answer isn't close to hectares × 2.5, something is wrong. 1,000 hectares should be close to 2,500 acres — the exact 2,471.05 confirms the conversion is correct.",
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
                "Don't use 2.5 as an exact conversion factor for official documents. The correct factor is 2.47105 — using 2.5 introduces a 1.2% error that accumulates significantly on large land areas. 100 hectares at 2.5× gives 250 acres; the correct answer is 247.105 acres.",
                "Don't confuse hectares with square hectometers or other similar-sounding metric area units. 1 hectare = 100 ares = 10,000 square meters. There is no such unit as a 'square hectare.' If you see 'hm²' it means square hectometer, which equals 1 hectare.",
                "Don't invert the formula accidentally. Hectares to acres: multiply by 2.47105. Acres to hectares: multiply by 0.404686 (or divide by 2.47105). Multiplying by 2.47105 when converting acres to hectares gives a result 6× too large.",
                "Don't assume all international land documents use metric. UK land registry records use hectares for official area, but many English agricultural leases and estate agent listings still quote in acres. Always confirm the unit before applying a conversion.",
                "Don't rely on browser language settings to determine whether a document uses acres or hectares. A US-based company operating land in Europe may report in hectares; a UK-based buyer may request acres. Always confirm the expected unit with the counterparty.",
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
          Hectare to Acre Conversion Reference Table
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
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
                    ["0.1",   "0.2471",   "Small garden plot"],
                    ["0.25",  "0.6178",   "Quarter hectare"],
                    ["0.5",   "1.2355",   "Half hectare"],
                    ["1",     "2.4711",   "1 football pitch (approx)"],
                    ["2",     "4.9421",   "Smallholding"],
                    ["2.5",   "6.1776",   "Typical small farm field"],
                    ["5",     "12.355",   "Small farm"],
                    ["10",    "24.711",   "Medium farm parcel"],
                    ["20",    "49.421",   "Large field"],
                    ["50",    "123.55",   "Small estate"],
                    ["100",   "247.11",   "1 km² = 100 ha"],
                    ["250",   "617.76",   "Medium farm"],
                    ["500",   "1235.5",   "Large farm"],
                    ["1000",  "2471.1",   "Large estate / ranch"],
                    ["10000", "24711",    "National park scale"],
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
                    ["0.25",  "0.1012",  "Quarter acre lot"],
                    ["0.5",   "0.2023",  "Half acre"],
                    ["1",     "0.4047",  "Standard acre"],
                    ["2",     "0.8094",  "Large residential lot"],
                    ["5",     "2.0234",  "Small farm plot"],
                    ["10",    "4.0469",  "Medium farm field"],
                    ["25",    "10.117",  "Small farm"],
                    ["50",    "20.234",  "Medium farm"],
                    ["100",   "40.469",  "Large farm"],
                    ["247",   "99.957",  "≈ 100 hectares"],
                    ["320",   "129.5",   "Half section (US)"],
                    ["640",   "259.0",   "1 section = 1 sq mile"],
                    ["1000",  "404.69",  "Large ranch"],
                    ["5000",  "2023.4",  "Very large estate"],
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
        </div>
        <p className="text-xs text-gray-400 mt-4">* All values use the exact factor: 1 ha = 2.47105 acres. Rounded to 4 decimal places for display.</p>
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
          Who Uses This Hectare to Acre Converter?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🌾", title: "Farmers & Agronomists", desc: "Compare international farm data, normalize yield statistics across metric and imperial systems, and calculate seed, fertilizer, and pesticide quantities from supplier rates quoted in either unit." },
            { icon: "🏡", title: "Real Estate Agents", desc: "Convert land listing sizes for cross-border buyers who are unfamiliar with the local measurement unit. Present property dimensions in both hectares and acres in the same listing." },
            { icon: "📐", title: "Land Surveyors", desc: "Prepare survey documents, legal descriptions, and subdivision applications that require area in both metric and imperial units for different jurisdictional requirements." },
            { icon: "🌍", title: "International Researchers", desc: "Standardize land area data from sources using different unit systems for comparative studies, climate research, food security analysis, and environmental reporting." },
            { icon: "🏛️", title: "Government & Planning", desc: "Prepare planning applications, zoning documents, and grant submissions that may require area in specific units depending on the receiving jurisdiction or funding body." },
            { icon: "✈️", title: "NRIs & Overseas Buyers", desc: "Evaluate foreign land and property holdings in familiar units. Convert listings, title documents, and survey reports between metric and imperial without needing a second tool." },
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
