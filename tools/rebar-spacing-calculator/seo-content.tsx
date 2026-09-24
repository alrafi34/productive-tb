const US_BARS: [string, string, string, string, string][] = [
  ["#3", "0.375", "9.5", "0.11", "0.376"],
  ["#4", "0.500", "12.7", "0.20", "0.668"],
  ["#5", "0.625", "15.9", "0.31", "1.043"],
  ["#6", "0.750", "19.1", "0.44", "1.502"],
  ["#7", "0.875", "22.2", "0.60", "2.044"],
  ["#8", "1.000", "25.4", "0.79", "2.670"],
];

const COVER: [string, string][] = [
  ["Cast against and permanently exposed to earth (footings)", "3 in"],
  ["Exposed to weather or earth — #6 through #18 bars", "2 in"],
  ["Exposed to weather or earth — #5 bars and smaller", "1½ in"],
  ["Not exposed — slabs, walls and joists, #11 and smaller", "¾ in"],
  ["Not exposed — beams and columns (primary reinforcement, ties, stirrups)", "1½ in"],
];

export default function RebarSpacingCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Rebar Spacing Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Rebar Spacing Calculator finds the center-to-center spacing of reinforcing bars across a slab, wall or
          beam width — or the number of bars needed to stay within a maximum spacing. It works in inches or
          millimeters, has one-click US bar sizes (#3–#8), and checks the result against the ACI 318 minimum and
          maximum spacing limits.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Spacing controls crack width, load distribution and whether concrete can flow between bars. Too wide and
          the section cracks or is under-reinforced; too tight and the concrete honeycombs around the steel.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Pick a unit:</strong> inches or millimeters. Values you have already typed are converted.</li>
          <li><strong>Select a mode:</strong> &ldquo;Calculate Spacing&rdquo; from a bar count, or &ldquo;Calculate Number of Bars&rdquo; from a maximum spacing.</li>
          <li><strong>Enter the width</strong> of the element and the <strong>clear cover</strong> on each side.</li>
          <li><strong>Choose the bar:</strong> tap #3–#8 (or a metric size) or type a diameter.</li>
          <li><strong>Optionally enter the max aggregate size</strong> — the ACI check assumes ¾ in if left blank.</li>
          <li><strong>Read the result</strong> and any ACI 318 warning under it.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Formulas</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Calculate Spacing:</h3>
          <p className="text-sm text-gray-700 mb-2">Effective Width = Total Width − (2 × Clear Cover)</p>
          <p className="text-sm text-gray-700 mb-2">Center-to-Center Spacing = Effective Width ÷ (Number of Bars − 1)</p>
          <p className="text-sm text-gray-700">Clear Spacing = Spacing − Bar Diameter</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Calculate Number of Bars:</h3>
          <p className="text-sm text-gray-700 mb-2">Effective Width = Total Width − (2 × Clear Cover)</p>
          <p className="text-sm text-gray-700 mb-2">Number of Bars = ⌈Effective Width ÷ Maximum Spacing⌉ + 1</p>
          <p className="text-sm text-gray-700">
            The count is rounded <em>up</em>: the spacing you enter is treated as a maximum, so the actual spacing
            always comes out equal to or tighter than it — never wider.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Worked Example (Imperial)</h2>
        <p className="text-gray-700 mb-2">
          A 48 in wide slab strip, 1½ in clear cover each side, #5 bars at no more than 12 in on center:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Effective width = 48 − (2 × 1.5) = <strong>45 in</strong></li>
          <li>Bars = ⌈45 ÷ 12⌉ + 1 = 4 + 1 = <strong>5 bars</strong></li>
          <li>Actual spacing = 45 ÷ 4 = <strong>11.25 in</strong> on center — within the 12 in maximum</li>
          <li>Clear spacing = 11.25 − 0.625 = <strong>10.625 in</strong> — above the 1 in ACI minimum, below the 18 in slab maximum</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ACI 318 Spacing Limits</h2>
        <p className="text-gray-700 mb-4">
          The calculator checks the two limits that most often govern (ACI 318-19):
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>
            <strong>Minimum clear spacing</strong> between parallel bars in a layer (25.2.1): the greatest of
            {" "}<strong>1 in</strong>, the <strong>bar diameter</strong>, and <strong>4/3 × the maximum aggregate size</strong>.
            With ¾ in aggregate that is 1 in; with 1½ in aggregate it rises to 2 in.
          </li>
          <li>
            <strong>Maximum spacing in slabs:</strong> flexural reinforcement in one-way slabs may not exceed the lesser
            of 3h and 18 in (7.7.2.3); shrinkage and temperature reinforcement the lesser of 5h and 18 in (24.4.3.3),
            where h is the slab thickness. The calculator flags anything over 18 in; check 3h or 5h for thin slabs.
          </li>
        </ul>
        <p className="text-gray-700">
          Beams, columns, walls and footings have further member-specific limits (crack-control spacing, tie spacing,
          development and splice lengths). Treat these checks as a first pass — the engineer of record and your local
          code have the final say.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">US Rebar Sizes</h2>
        <p className="text-gray-700 mb-4">
          US bar numbers give the nominal diameter in eighths of an inch — a #5 bar is 5/8 in. Standard ASTM A615 values:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left border-b">Bar</th>
                <th className="px-3 py-2 text-left border-b">Diameter (in)</th>
                <th className="px-3 py-2 text-left border-b">Diameter (mm)</th>
                <th className="px-3 py-2 text-left border-b">Area (in²)</th>
                <th className="px-3 py-2 text-left border-b">Weight (lb/ft)</th>
              </tr>
            </thead>
            <tbody>
              {US_BARS.map(([bar, dIn, dMm, area, wt]) => (
                <tr key={bar} className="border-b last:border-0">
                  <td className="px-3 py-2 font-semibold">{bar}</td>
                  <td className="px-3 py-2">{dIn}</td>
                  <td className="px-3 py-2">{dMm}</td>
                  <td className="px-3 py-2">{area}</td>
                  <td className="px-3 py-2">{wt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Clear Cover to Enter</h2>
        <p className="text-gray-700 mb-4">
          Specified concrete cover for cast-in-place, non-prestressed concrete (ACI 318-19, Table 20.5.1.3.1):
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <tbody>
              {COVER.map(([exposure, cover]) => (
                <tr key={exposure} className="border-b last:border-0">
                  <td className="px-3 py-2 text-gray-700">{exposure}</td>
                  <td className="px-3 py-2 font-semibold whitespace-nowrap">{cover}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
