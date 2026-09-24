const BEARING: [string, string, string, string][] = [
  ["Crystalline bedrock", "—", "12,000", "574.6"],
  ["Sedimentary and foliated rock", "—", "4,000", "191.5"],
  ["Sandy gravel and/or gravel", "GW, GP", "3,000", "143.6"],
  ["Sand, silty sand, clayey sand, silty gravel, clayey gravel", "SW, SP, SM, SC, GM, GC", "2,000", "95.8"],
  ["Clay, sandy clay, silty clay, clayey silt, silt, sandy silt", "CL, ML, MH, CH", "1,500", "71.8"],
];

export default function FoundationDepthCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Foundation Depth Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This calculator answers the two questions a residential footing has to satisfy: <strong>how deep</strong> its
          bottom must sit below grade, and <strong>how wide</strong> it must be to carry its load. It follows the
          International Residential Code (IRC) minimums and presumptive soil bearing values used across most of the US,
          with a metric mode for the same rules.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Depth and width are governed by different things. Depth is set by frost and the code minimum — not by load.
          Load and soil strength set the width. Treating one as the other is the most common mistake in footing
          estimates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Depth Is Determined</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>At least 12 in below undisturbed ground</strong> for exterior footings (IRC R403.1.4).
          </li>
          <li>
            <strong>Below the frost line</strong> (R403.1.4.1). Soil that freezes under a footing expands and lifts it —
            frost heave. The frost depth is set by your local building department (IRC Table R301.2(1)); across the US it
            ranges from effectively zero along the Gulf Coast to 48–60 in or more in the northern states.
          </li>
          <li>
            The required depth is the <strong>greater of the two</strong>. Frost-protected shallow foundations (R403.3),
            which use rigid insulation to raise the frost line, are the main exception.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Width Is Determined</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700 mb-2"><strong>Wall footing:</strong> Width = Wall load per foot (plf) ÷ Allowable bearing (psf)</p>
          <p className="text-sm text-gray-700"><strong>Column footing:</strong> Area = Column load (lb) ÷ Allowable bearing (psf); side = √Area</p>
        </div>
        <p className="text-gray-700">
          Footings must also be at least <strong>12 in wide</strong> and <strong>6 in thick</strong> (IRC R403.1.1), so a
          light load on good soil is governed by the minimum rather than the formula. Widths are rounded up to the next
          ¼ in — a footing is never sized smaller than the load needs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Presumptive Soil Bearing Values</h2>
        <p className="text-gray-700 mb-4">
          Without a geotechnical report, the IRC allows these allowable bearing pressures (Table R401.4.1). They already
          include a margin of safety, so they are used directly — not divided by a further safety factor.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left border-b">Soil</th>
                <th className="px-3 py-2 text-left border-b">USCS</th>
                <th className="px-3 py-2 text-left border-b">psf</th>
                <th className="px-3 py-2 text-left border-b">kPa</th>
              </tr>
            </thead>
            <tbody>
              {BEARING.map(([soil, uscs, psf, kpa]) => (
                <tr key={soil} className="border-b last:border-0">
                  <td className="px-3 py-2">{soil}</td>
                  <td className="px-3 py-2 text-gray-500">{uscs}</td>
                  <td className="px-3 py-2 font-semibold">{psf}</td>
                  <td className="px-3 py-2">{kpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Worked Example</h2>
        <p className="text-gray-700 mb-2">
          An exterior wall carrying 2,800 plf on silty sand (2,000 psf) where the local frost depth is 36 in:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Depth = greater of 12 in and 36 in = <strong>36 in (3 ft)</strong> to the bottom of the footing — frost governs</li>
          <li>Width = 2,800 ÷ 2,000 = 1.4 ft = 16.8 in, rounded up to <strong>17 in</strong> — load governs over the 12 in minimum</li>
        </ul>
        <p className="text-gray-700 mt-2">The same wall on clay (1,500 psf) needs 2,800 ÷ 1,500 = 1.87 ft, or 22.5 in.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When You Need an Engineer</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Expansive soils</strong> — clays with a plasticity index of 15 or more need special design (IRC R403.1.8).</li>
          <li><strong>Fill, organic or soft soils</strong>, or bearing values below the presumptive table.</li>
          <li><strong>High groundwater</strong>, slopes, or footings near an existing foundation or retaining wall.</li>
          <li><strong>Commercial buildings or heavy loads</strong>, which fall under the IBC and usually require a soils report.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This tool gives code-minimum estimates for planning and bidding. It is not a foundation design — the engineer
          of record and your building department have the final say.
        </p>
      </section>
    </div>
  );
}
