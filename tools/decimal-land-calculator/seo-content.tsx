import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function DecimalLandCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Decimal Land Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>decimal land calculator</strong> is a free online tool that converts land area between
            Decimal — also called <strong>Shotok</strong> in Bengali — and all major South Asian and
            international land units: Acre, Katha, Bigha, Square Feet, Square Meter, Hectare, and Cent.
            It answers the question that property buyers, sellers, and surveyors across Bangladesh and eastern
            India deal with daily: <em>how many square feet is this plot, and what is it in acres?</em>
          </p>
          <p>
            The challenge is that land measurement in South Asia is not uniform. One Decimal is always 435.6
            square feet — that part is fixed. But 1 Katha in Bangladesh (720 sq ft) is a completely different
            size from 1 Katha in Bihar (1,361.25 sq ft) or 1 Katha in Nepal (3,645 sq ft). Using the wrong
            regional standard in a property transaction or legal document can produce conversion errors that
            misrepresent a plot by a factor of 2 or more. This tool handles regional differences automatically
            through its preset selector.
          </p>
          <p>
            Built for <strong>property buyers and sellers in Bangladesh and India, real estate agents, land
            surveyors, legal document preparers, farmers, and NRIs managing property abroad</strong> who need
            fast and accurate conversions across all regional units. Enter any value, select your region, and
            get every conversion at once — free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Decimal Land Conversion Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Every conversion is anchored to the fixed relationship between Decimal and Square Feet, then scaled
            through the regional unit definitions. The core chain is:
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Core Conversion Relationships</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">1 Decimal (Shotok)</span> = 435.6 sq ft = 40.47 sq m</p>
              <p><span className="font-semibold">100 Decimal</span> = 1 Acre = 43,560 sq ft</p>
              <p><span className="font-semibold">1 Hectare</span> = 247.1 Decimal = 2.471 Acres</p>
              <p><span className="font-semibold">Output Unit</span> = (Input × Input sq ft value) ÷ Output sq ft value</p>
            </div>
          </div>
          <p>Key points about how regional presets affect the calculation:</p>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Decimal / Shotok / Acre / Square Feet / Square Meter / Hectare / Cent</strong> — fixed globally, same in every region</li>
            <li><strong>Katha</strong> — 720 sq ft (Bangladesh / West Bengal), 1,361.25 sq ft (Bihar), 3,645 sq ft (Nepal)</li>
            <li><strong>Bigha</strong> — 14,400 sq ft (Bangladesh / West Bengal), 27,225 sq ft (Bihar), 72,900 sq ft (Nepal)</li>
            <li>Always match the regional preset to the location of the land being measured</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Decimal Land Calculator
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
                "Instant conversion across 9 land units simultaneously",
                "Regional presets: Bangladesh, West Bengal, Bihar, Nepal, Global",
                "Decimal / Shotok input and output",
                "Acre, Katha, Bigha conversions",
                "Square Feet, Square Meter, Hectare, Cent",
                "Results update in real time as you type",
                "Copy individual results to clipboard",
                "Export full conversion as text file",
                "Your inputs are not collected or stored",
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
              title: "Residential Property Purchase in Bangladesh",
              scenario: "A buyer in Dhaka is looking at a plot listed as 5 Shotok. Their bank requires the plot size in square meters for the mortgage application. They enter 5 Decimal, select Bangladesh preset, and the calculator instantly returns 202.34 square meters and 2,178 square feet. They copy the square meter value directly into the bank form — no manual calculation, no conversion error risk.",
            },
            {
              title: "Inherited Land Division Among Siblings",
              scenario: "A family in West Bengal inherits a 33 Decimal agricultural plot. Three siblings need to divide it equally. Each sibling's share is 11 Decimal — but the lawyer's document requires the area in both Katha and square meters. Entering 11 Decimal (West Bengal preset) returns 6.65 Katha and 444.6 square meters. The lawyer uses both figures in the deed without needing to verify the arithmetic separately.",
            },
            {
              title: "NRI Checking Property Value Before Purchase",
              scenario: "An NRI living in the UK receives a property listing from Bangladesh showing 8 Shotok at a quoted price per Decimal. They are unfamiliar with Shotok but understand acres and square feet. Entering 8 in the calculator immediately shows 0.08 Acres and 3,484.8 square feet — familiar reference points that let them judge whether the price per area is reasonable compared to properties they know.",
            },
            {
              title: "Agricultural Land Lease Calculation",
              scenario: "A farmer in Bihar is leasing 2 Bigha of rice paddy land. The lease agreement uses Decimal for the area and sets a per-Decimal annual rate. They need to know how many Decimal 2 Bigha equals under Bihar standards. Entering 2 Bigha (Bihar preset) returns 125 Decimal — a very different result than entering 2 Bigha under Bangladesh standards, which would return only 66.12 Decimal. The regional preset prevents a costly calculation error.",
            },
            {
              title: "Building Permit Application",
              scenario: "A developer in Chittagong submits a building permit application for a 12.5 Decimal plot. The municipal authority requires plot area in both square meters and square feet for the application form. The calculator returns 505.9 square meters and 5,445 square feet in one step. The developer pastes both values directly into the digital permit form and submits without needing a separate converter for each unit.",
            },
            {
              title: "Real Estate Listing Standardization",
              scenario: "A real estate agency in Bangladesh manages 40 property listings, each recorded in the seller's preferred unit — some in Shotok, some in Katha, some in square feet. To publish a standardized listing database, the agent processes each entry through the calculator to get every property in a consistent Decimal + square meter + square feet format. The export function produces a text file for each conversion that can be referenced in the listing.",
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
                "Always match the regional preset to the location of the land — not your own location. If the land is in Bihar but you are checking from Dhaka, select Bihar preset. Using the wrong region makes Katha and Bigha conversions wrong by a factor of 2–5×.",
                "When reading a Bangladeshi property document, 'Shotok' and 'Decimal' are always the same unit. If you see both in the same document (e.g., '8 Shotok / 8 Decimal'), they are confirming the same measurement in two names, not two different areas.",
                "For legal documents and bank forms, always include both Decimal and Square Feet in your submission. Most South Asian financial institutions accept Decimal for land records but require Square Feet or Square Meters for mortgage applications.",
                "The 100 Decimal = 1 Acre relationship is the fastest mental check for reasonableness. A 50 Decimal plot is half an acre. A 10 Decimal plot is about 4,356 square feet — roughly the size of a small residential plot in a suburban area.",
                "When comparing property prices across different cities or regions that use different primary units, always convert everything to Acre or Square Meter first. Comparing Decimal prices from Bangladesh directly with Katha prices from Bihar will be misleading because the Katha sizes differ.",
                "If you receive a plot size in Cent (used in Kerala and Tamil Nadu), note that 1 Cent = 1 Decimal = 435.6 square feet. They are the same unit with different regional names.",
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
                "Don't assume Katha is the same size everywhere. A 3 Katha plot in Bangladesh is 2,160 sq ft. A 3 Katha plot in Bihar is 4,083.75 sq ft. Using the wrong regional Katha definition in a purchase negotiation could mean a 90% discrepancy in what you think you are buying.",
                "Don't confuse Decimal with Dismil. In some older Indian land records, 'Dismil' appears as an alternate spelling of Decimal. They are the same unit — 1 Dismil = 1 Decimal = 435.6 sq ft. If you see 'Dismil' on a historical deed, treat it identically to Decimal.",
                "Don't convert without first confirming the source unit. If a document says '6 kathas' without specifying the region, do not assume Bangladesh standard. Ask for the region or cross-reference the total area in square feet against the listed Katha count before committing to a conversion.",
                "Don't skip the decimal point. Entering '5' when you mean '0.5 Acre' produces a result 10× too large. Double-check that the input value and input unit match exactly what appears on the source document.",
                "Don't rely on generic online converters that don't support regional presets. A converter that treats Katha as a fixed size will give wrong results for any region that isn't Bangladesh. Always use a tool that lets you specify the regional standard.",
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
          Decimal Land Conversion Reference Tables
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Decimal ↔ Common Units</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Decimal (Shotok)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Acre</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Sq Feet</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Sq Meter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    [1,   "0.01",    "435.6",    "40.47"],
                    [2,   "0.02",    "871.2",    "80.94"],
                    [5,   "0.05",    "2,178",    "202.3"],
                    [8,   "0.08",    "3,484.8",  "323.8"],
                    [10,  "0.10",    "4,356",    "404.7"],
                    [20,  "0.20",    "8,712",    "809.4"],
                    [33,  "0.33",    "14,374.8", "1,335.5"],
                    [50,  "0.50",    "21,780",   "2,023.4"],
                    [100, "1.00",    "43,560",   "4,046.9"],
                  ].map(([d, ac, sf, sm]) => (
                    <tr key={d} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{d}</td>
                      <td className="py-2 px-3 font-mono text-gray-700 text-xs">{ac}</td>
                      <td className="py-2 px-3 font-mono text-green-600 text-xs">{sf}</td>
                      <td className="py-2 px-3 font-mono text-gray-600 text-xs">{sm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Acre ↔ Decimal</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Acre</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Decimal (Shotok)</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Sq Feet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["0.05",  "5",   "2,178"],
                    ["0.10",  "10",  "4,356"],
                    ["0.25",  "25",  "10,890"],
                    ["0.50",  "50",  "21,780"],
                    ["1.00",  "100", "43,560"],
                    ["1.50",  "150", "65,340"],
                    ["2.00",  "200", "87,120"],
                    ["5.00",  "500", "217,800"],
                    ["10.00", "1,000", "435,600"],
                  ].map(([ac, d, sf]) => (
                    <tr key={ac} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-mono font-semibold text-primary text-xs">{ac}</td>
                      <td className="py-2 px-3 font-mono text-gray-700 text-xs">{d}</td>
                      <td className="py-2 px-3 font-mono text-green-600 text-xs">{sf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Regional Standards: Katha &amp; Bigha Sizes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Region</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">1 Katha (sq ft)</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">1 Katha (Decimal)</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">1 Bigha (sq ft)</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">1 Bigha (Decimal)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Bangladesh",   "720",     "1.653",  "14,400",  "33.06"],
                  ["West Bengal",  "720",     "1.653",  "14,400",  "33.06"],
                  ["Bihar",        "1,361.25","3.125",  "27,225",  "62.5"],
                  ["Nepal",        "3,645",   "8.37",   "72,900",  "167.3"],
                ].map(([region, kSqFt, kDec, bSqFt, bDec]) => (
                  <tr key={region} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-semibold text-gray-800 text-xs">{region}</td>
                    <td className="py-2 px-3 font-mono text-xs text-gray-600">{kSqFt}</td>
                    <td className="py-2 px-3 font-mono text-xs text-primary font-semibold">{kDec}</td>
                    <td className="py-2 px-3 font-mono text-xs text-gray-600">{bSqFt}</td>
                    <td className="py-2 px-3 font-mono text-xs text-primary font-semibold">{bDec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">* 1 Decimal = 435.6 sq ft and 1 Acre = 100 Decimal are fixed across all regions. Only Katha and Bigha vary by location.</p>
        </div>
      </section>

      <ToolFaq items={faq} />

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Decimal Land Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🏡",
              title: "Property Buyers & Sellers",
              desc: "Verify plot sizes when reviewing listings, negotiate based on accurate per-Decimal pricing, and confirm that a property's stated area in Shotok matches the square footage before signing any agreement.",
            },
            {
              icon: "⚖️",
              title: "Legal Document Preparers",
              desc: "Convert land areas between Decimal, Katha, and Square Feet for property deeds, mutation applications, and inheritance documents that require measurements in multiple units simultaneously.",
            },
            {
              icon: "📐",
              title: "Land Surveyors",
              desc: "Produce multi-unit survey reports covering Decimal, Acre, and Square Meter in a single step. Confirm that field measurements recorded in one unit match the legal records filed in another.",
            },
            {
              icon: "🌾",
              title: "Farmers & Agricultural Workers",
              desc: "Calculate crop field sizes, fertilizer requirements per Decimal, irrigation planning, and lease agreements for paddy land and vegetable plots using the exact regional unit in local use.",
            },
            {
              icon: "✈️",
              title: "NRIs Managing Overseas Property",
              desc: "Convert Shotok or Decimal plot sizes into Acres and Square Feet to understand property values in familiar units, compare pricing with international markets, and communicate with overseas agents.",
            },
            {
              icon: "🏗️",
              title: "Developers & Construction Teams",
              desc: "Convert land area for building permit applications, calculate FAR (Floor Area Ratio) requirements, plan project layouts, and prepare tender documents that specify area in multiple required units.",
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
