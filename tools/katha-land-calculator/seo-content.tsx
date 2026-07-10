import React from "react";

export default function KathaLandCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* ── 1. Introduction ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Katha Land Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>katha land calculator</strong> is a free online tool that converts land area between
            Katha (also spelled Kata) and every major unit used in South Asian property records — Decimal,
            Bigha, Acre, Square Feet, Square Meter, and Hectare. It answers the core question in regional
            property transactions: <em>how many decimal is this plot, and what is it in square feet?</em>
          </p>
          <p>
            The challenge is that 1 Katha does not mean the same thing in every location. In Bangladesh
            and West Bengal, 1 Katha equals 720 sq ft. In Bihar, it equals 1,361.25 sq ft. In Nepal,
            1 Katha equals 3,645 sq ft — five times the Bangladesh value. Using the wrong regional
            standard produces errors of hundreds of square feet that invalidate land deeds, dispute
            boundary surveys, and create legal liability in sale agreements.
          </p>
          <p>
            This <strong>kata land calculator</strong> is built for <strong>property buyers and sellers,
            real estate agents, land surveyors, lawyers preparing deed documents, and farmers managing
            agricultural plots</strong> across Bangladesh, West Bengal, Bihar, and Nepal. Supports
            Katha, Decimal, Bigha, Acre, Square Feet, Square Meter, and Hectare. Browser-based,
            free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Katha Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            All conversions go through a common base unit — Square Feet — using a two-step process.
            First, the input value is multiplied by the regional square-feet equivalent of that unit.
            Then the total square feet is divided by the target unit's square-feet value.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Conversion Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Step 1:</span> Input × Unit_sqft = Total Square Feet</p>
              <p><span className="font-semibold">Step 2:</span> Total Sq Ft ÷ Target_sqft = Output Value</p>
              <p className="text-gray-500 mt-2">Example (Bangladesh): 5 Katha → 5 × 720 = 3,600 sq ft → 3,600 ÷ 435.6 = 8.264 Decimal</p>
            </div>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li>• <strong>Katha</strong> — 720 sq ft (BD/WB), 1,361.25 sq ft (Bihar), 3,645 sq ft (Nepal)</li>
            <li>• <strong>Decimal / Shotok</strong> — 435.6 sq ft (consistent across all regions)</li>
            <li>• <strong>Bigha</strong> — 20 Katha in all regions (size varies because Katha size varies)</li>
            <li>• <strong>Acre</strong> — 43,560 sq ft (universal)</li>
            <li>• <strong>Square Meter</strong> — 10.764 sq ft (universal SI conversion)</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Katha Land Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ol className="space-y-5 text-gray-600">
            {[
              ["Enter Your Land Area", "Type the numeric value of your plot — whole numbers or decimals are both accepted. For example, enter 8.5 for a plot of 8.5 Katha or 2.75 for 2.75 Decimal. The calculator starts converting immediately as you type."],
              ["Select Your Input Unit", "Choose the unit your measurement is already in — Katha, Decimal, Bigha, Acre, Square Feet, Square Meter, or Hectare. This is the 'from' unit that anchors all output conversions."],
              ["Choose Your Regional Standard", "Select Bangladesh, West Bengal, Bihar, or Nepal from the region dropdown. This setting changes the Katha and Bigha sizes to match local land records. Decimal and Acre remain constant regardless of region."],
              ["Read All Conversions at Once", "The results panel shows your value converted into every supported unit simultaneously — no need to run the calculator separately for each target unit. All outputs update in real time."],
              ["Copy or Export Results", "Click any individual result to copy it to your clipboard. Use the export button to download the full conversion summary as a text file suitable for attaching to property documents or client reports."],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ol>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tool Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time conversion as you type",
                "4 regional standards: Bangladesh, West Bengal, Bihar, Nepal",
                "7 output units in one panel",
                "Click-to-copy any result",
                "Export full conversion as TXT",
                "Shareable URL with your inputs",
                "Browser-based — no signup required",
                "Works on mobile and tablet",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Residential Land Purchase (Bangladesh)",
              scenario: "A buyer in Dhaka is quoted a 5 Katha plot for ৳85 lakh. They need to verify the plot size in Decimal for comparison with other listings quoted in Decimal. Entering 5 Katha (Bangladesh standard) returns 8.264 Decimal, 3,600 sq ft, and 0.0826 Acre — confirming the plot is roughly the same size as a nearby 8.5 Decimal listing they had inspected.",
            },
            {
              title: "Agricultural Land Record (Bihar)",
              scenario: "A farmer in Patna inherits a 12 Katha plot but needs the area in Acres for a government crop insurance form that only accepts Acre values. Using Bihar standard (1 Katha = 1,361.25 sq ft), 12 Katha = 16,335 sq ft = 0.375 Acre. The farmer enters 0.375 on the form and attaches the exported text file as documentation.",
            },
            {
              title: "Property Listing Conversion (West Bengal)",
              scenario: "A real estate agent in Kolkata has a 3 Bigha agricultural plot to list on a national property portal that requires Square Meter values. Using West Bengal standard, 3 Bigha = 60 Katha = 43,200 sq ft = 4,013.8 sq m. The agent lists the property at 4,013.8 m² and includes the Katha value in the description for local buyers.",
            },
            {
              title: "Legal Deed Preparation (Nepal)",
              scenario: "A lawyer in Kathmandu is drafting a sale deed for a 2.5 Katha urban plot. The Nepalese land registration office requires the area in both Katha and Square Meter. At Nepal standard (3,645 sq ft per Katha), 2.5 Katha = 9,112.5 sq ft = 846.6 sq m. The lawyer uses the exported result to populate both fields in the notarized deed.",
            },
            {
              title: "Cross-Region Comparison",
              scenario: "An NRI investor is comparing plots in Bangladesh and Bihar simultaneously. A 10 Katha plot in Dhaka (7,200 sq ft) looks identical in Katha count to a 10 Katha Bihar plot (13,612.5 sq ft), but the Bihar plot is 89% larger. Switching the regional dropdown instantly shows the difference and prevents a costly misunderstanding.",
            },
            {
              title: "Boundary Survey Verification",
              scenario: "A land surveyor in Rajshahi measures a plot as 1,440 sq ft. The deed says 2 Katha. Entering 1,440 sq ft with Bangladesh standard confirms it equals exactly 2 Katha — the deed is correct. If it had returned 2.05 or 1.95 Katha, there would be a boundary discrepancy to investigate.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips & Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Always confirm the regional standard first", "Before entering any value, check which region applies. A land deed from Bihar and one from Bangladesh may both say '10 Katha' but differ by 6,412.5 sq ft. When in doubt, ask for the deed's district of issuance."],
                ["Use Decimal as a sanity check", "Decimal (Shotok) is constant at 435.6 sq ft across all regions. If a conversion looks wrong, convert to Decimal first — it's the easiest unit to verify manually since 100 Decimal = 1 Acre exactly."],
                ["Katha and Kata are the same unit", "Queries for 'kata land' and 'katha land' refer to the same unit. The spelling varies by language and romanization preference but the measurement is identical."],
                ["Export before closing the browser", "The calculator doesn't save sessions. If you're doing due diligence on a property purchase, use the export button to download a timestamped text record of your conversion before closing the tab."],
                ["Double-check the Bigha direction", "Bigha is always 20 Katha, but since Katha varies, 1 Bigha in Nepal (72,900 sq ft) is more than 5× a Bangladesh Bigha (14,400 sq ft). Never assume Bigha values are comparable across regions."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0">💡</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Mistakes</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Using the wrong region", "The most expensive mistake in katha conversions. Defaulting to Bangladesh standard when the land is in Bihar overstates the area by 89%. Always set the region before reading any output."],
                ["Confusing Bigha and Katha", "Some users enter a Bigha value in the Katha field. 1 Bigha ≠ 1 Katha. In Bangladesh, 1 Bigha = 20 Katha = 14,400 sq ft. Select the correct input unit — the tool covers both."],
                ["Rounding conversion outputs", "Land records require precision. Rounding 8.264 Decimal to 8 Decimal on a legal document introduces a 0.264 Decimal (~115 sq ft) gap that can void a transfer deed or cause boundary disputes."],
                ["Assuming Decimal and Katha are interchangeable", "They are not. 1 Katha (Bangladesh) = 1.653 Decimal. A 10 Decimal plot is not the same as a 10 Katha plot — the Katha plot is 65% larger."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Reference Table ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Katha Conversion Reference Tables
        </h2>

        {/* Regional standards */}
        <h3 className="text-base font-semibold text-gray-700 mb-3">Regional Standards</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">1 Katha (sq ft)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">1 Katha (sq m)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">1 Bigha (sq ft)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Katha per Bigha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Bangladesh", "720", "66.89", "14,400", "20"],
                ["West Bengal", "720", "66.89", "14,400", "20"],
                ["Bihar", "1,361.25", "126.47", "27,225", "20"],
                ["Nepal", "3,645", "338.63", "72,900", "20"],
              ].map(([region, sqft, sqm, bigha, ratio]) => (
                <tr key={region} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{region}</td>
                  <td className="py-3 px-4 font-mono">{sqft}</td>
                  <td className="py-3 px-4 font-mono">{sqm}</td>
                  <td className="py-3 px-4 font-mono">{bigha}</td>
                  <td className="py-3 px-4 font-mono">{ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Common conversions — Bangladesh standard */}
        <h3 className="text-base font-semibold text-gray-700 mb-3">Common Katha Conversions — Bangladesh / West Bengal (720 sq ft)</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Katha</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Decimal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sq Feet</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sq Meter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Acre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1", "1.653", "720", "66.89", "0.01653"],
                ["2", "3.306", "1,440", "133.78", "0.03306"],
                ["3", "4.959", "2,160", "200.67", "0.04959"],
                ["5", "8.264", "3,600", "334.45", "0.08264"],
                ["10", "16.529", "7,200", "668.90", "0.16529"],
                ["20", "33.058", "14,400", "1,337.8", "0.33058"],
                ["40", "66.116", "28,800", "2,675.6", "0.66116"],
                ["60", "99.174", "43,200", "4,013.4", "0.99174"],
              ].map(([k, d, sf, sm, ac]) => (
                <tr key={k} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{k}</td>
                  <td className="py-2.5 px-4 font-mono">{d}</td>
                  <td className="py-2.5 px-4 font-mono">{sf}</td>
                  <td className="py-2.5 px-4 font-mono">{sm}</td>
                  <td className="py-2.5 px-4 font-mono">{ac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">* Decimal = 435.6 sq ft and Acre = 43,560 sq ft are consistent across all regions.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Katha in land measurement?",
              a: "Katha (also spelled Kata or Katha) is a traditional land measurement unit used across South Asia, particularly in Bangladesh, West Bengal, Bihar, and Nepal. It is subdivided from Bigha — there are always 20 Katha in 1 Bigha — but the absolute size of 1 Katha in square feet varies significantly by region. It is commonly used in property deeds, residential plot sales, and agricultural land records throughout eastern India and Bangladesh.",
            },
            {
              q: "How many square feet is 1 Katha?",
              a: "It depends on the region. In Bangladesh and West Bengal, 1 Katha equals 720 square feet. In Bihar, 1 Katha equals 1,361.25 square feet. In Nepal, 1 Katha equals 3,645 square feet. Always confirm which regional standard applies to a property before performing any conversion — using the wrong standard can introduce errors of hundreds of square feet.",
            },
            {
              q: "How many Decimal is 1 Katha in Bangladesh?",
              a: "In Bangladesh, 1 Katha equals 720 sq ft and 1 Decimal (Shotok) equals 435.6 sq ft, giving 1 Katha ≈ 1.653 Decimal. So a 5 Katha plot is approximately 8.264 Decimal, and a 10 Katha plot is approximately 16.529 Decimal. Decimal is fixed at 435.6 sq ft in all regions.",
            },
            {
              q: "How many Katha in 1 Bigha?",
              a: "1 Bigha equals 20 Katha in all regions — Bangladesh, West Bengal, Bihar, and Nepal. The Bigha-to-Katha ratio is constant, but because the size of 1 Katha differs by region, 1 Bigha in Nepal (72,900 sq ft) is more than five times larger than 1 Bigha in Bangladesh (14,400 sq ft). Always specify the region when comparing Bigha values.",
            },
            {
              q: "How many Katha in 1 Acre (Bangladesh)?",
              a: "1 Acre = 43,560 sq ft. In Bangladesh where 1 Katha = 720 sq ft, there are 43,560 ÷ 720 = 60.5 Katha in 1 Acre. In Bihar (1 Katha = 1,361.25 sq ft), there are approximately 32 Katha per Acre. In Nepal (1 Katha = 3,645 sq ft), there are approximately 11.95 Katha per Acre.",
            },
            {
              q: "What is the difference between Katha and Decimal?",
              a: "Katha and Decimal are both units of land area used in South Asia, but they measure different quantities. Decimal (Shotok) is fixed at 435.6 sq ft everywhere. Katha varies — it is 720 sq ft in Bangladesh but 1,361.25 sq ft in Bihar. In Bangladesh, 1 Katha = 1.653 Decimal, meaning Katha is the larger unit. The two units are used for different property types: Decimal for smaller residential plots and Katha for medium to large plots.",
            },
            {
              q: "Is 'kata land' the same as 'katha land'?",
              a: "Yes. 'Kata' and 'Katha' refer to the same unit of land measurement. The spelling difference comes from transliteration variations between Bengali, Hindi, and Nepali scripts. In Google Search, queries for 'kata land calculator' and 'katha land calculator' are looking for the same tool. This calculator handles both spellings and all regional standards.",
            },
            {
              q: "Can I convert from Decimal to Katha using this tool?",
              a: "Yes. Select Decimal as your input unit and the calculator will output the equivalent value in Katha (along with Bigha, Acre, Square Feet, Square Meter, and Hectare) simultaneously. Remember to set your regional standard first — the Katha output for the same Decimal input will differ between Bangladesh and Bihar.",
            },
            {
              q: "How do I find out which Katha standard my land deed uses?",
              a: "Check the district or upazila listed in your deed. Bangladesh and West Bengal deeds use 720 sq ft per Katha. Bihar deeds use 1,361.25 sq ft. Nepal deeds use 3,645 sq ft. If you have an older deed without a clear region, cross-reference the listed square footage with the Katha count — the ratio will identify which standard was used.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your land area values, region selections, and conversion results are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🏠", title: "Property Buyers & Sellers", desc: "Verify plot sizes during negotiations and confirm deed measurements before signing sale agreements. Catches regional standard mismatches before they become legal disputes." },
            { icon: "🧑‍💼", title: "Real Estate Agents", desc: "Convert between Katha, Decimal, and Square Feet when listing properties on national portals or preparing comparative market analyses for clients across South Asia." },
            { icon: "📐", title: "Land Surveyors", desc: "Cross-check field measurements against deed records in multiple units. Export conversion summaries to attach to official survey reports submitted to land registration offices." },
            { icon: "⚖️", title: "Lawyers & Notaries", desc: "Populate sale deeds, gift deeds, and partition documents with accurate multi-unit measurements required by land registration authorities in Bangladesh, India, and Nepal." },
            { icon: "🌾", title: "Farmers & Agricultural Landowners", desc: "Calculate plot areas for crop insurance applications, government subsidy claims, and agricultural land records that require values in Acre or Square Meter alongside local Katha." },
            { icon: "🎓", title: "Students & Researchers", desc: "Study South Asian land measurement systems and practice unit conversion for geography, real estate, and urban planning coursework using real regional standards." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
