import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const H2 = "text-2xl font-semibold text-gray-900";
const HEADING = { fontFamily: "var(--font-heading)" };
const SECTION = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";

const money = (symbol: string, n: number) => `${symbol}${n.toFixed(2)}`;

/* Example prices for the tables, not live prices: the calculator takes yours. */
const US_PRICE = 3.5;
const EU_PRICE = 1.75;
const MPG_ROWS: [number, string][] = [
  [15, "Large pickup or SUV"], [20, "Midsize SUV"], [25, "Average sedan"], [30, "Efficient sedan"],
  [35, "Small car"], [40, "Economy car"], [50, "Hybrid"],
];
const L100_ROWS: [number, string][] = [
  [4, "Hybrid"], [5, "Small diesel"], [6, "Small petrol car"], [7, "Family car"],
  [8, "Compact SUV"], [10, "Large SUV"], [12, "Van or large 4×4"],
];

const EXAMPLES = [
  {
    title: "Weekend road trip, split four ways",
    text: "Chicago to Nashville is about 470 miles each way. With Round trip ticked that is 940 miles; at 30 MPG the car needs 31.3 gallons, and at $3.50 a gallon the fuel costs $109.67. Split between four friends, each pays $27.42.",
  },
  {
    title: "European car in L/100 km",
    text: "A family car rated at 6.5 L/100 km drives the roughly 465 km from Paris to Lyon. It needs 465 × 6.5 ÷ 100 = 30.2 liters; at €1.75 a liter the trip costs €52.89, or about 11.4 cents per km.",
  },
  {
    title: "Gas car or electric for the commute",
    text: "A 40-mile daily round trip over 22 working days is 880 miles a month. At 28 MPG and $3.50 that is $110.00 of gasoline. An EV using 30 kWh per 100 miles needs 264 kWh; at $0.17 per kWh charging at home costs $44.88, saving $65.12 a month.",
  },
];

export default function ToolSEOContent() {
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className={`mt-12 ${SECTION.replace("mt-8 ", "")}`}>
        <h2 className={`${H2} mb-4`} style={HEADING}>What This Fuel Cost Calculator Does</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter a distance, your car&apos;s fuel economy and the fuel price, and the calculator returns the
            <strong> fuel needed, the total trip cost and the cost per mile or kilometer</strong>. It works in
            miles, MPG and gallons or in kilometers and liters, with economy as <strong>L/100 km</strong> (the
            European convention) or km/L.
          </p>
          <p>
            For real trips it can double the distance for a <strong>round trip</strong>, <strong>split the
            cost</strong> between passengers, and <strong>compare</strong> the same trip in another car or in an
            <strong> electric car</strong> at your own electricity rate. Prices, currency and economy are always
            yours to enter; the currency is only guessed from your location to start with.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className={SECTION}>
        <h2 className={`${H2} mb-4`} style={HEADING}>How Fuel Cost Is Calculated</h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 mb-4 font-mono text-sm text-gray-900 space-y-1">
          <p><span className="font-semibold">Fuel needed</span> = distance ÷ MPG (or km/L)</p>
          <p><span className="font-semibold">Fuel needed</span> = distance × L/100 km ÷ 100</p>
          <p><span className="font-semibold">Trip cost</span> = fuel needed × price per gallon or liter</p>
          <p><span className="font-semibold">Electric</span> = distance ÷ 100 × kWh per 100 × price per kWh</p>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Real consumption moves with speed, traffic, hills, load and temperature. Use your car&apos;s
          real-world average from its trip computer or fill-ups rather than the official rating, and enter a
          slightly worse figure for fast highway driving or winter trips.
        </p>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className={SECTION}>
        <h2 className={`${H2} mb-6`} style={HEADING}>How to Use the Fuel Cost Calculator</h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name: title, text: desc }, i) => (
            <li key={i} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{title}:</strong> {desc}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 4. Worked Examples ── */}
      <section className={SECTION}>
        <h2 className={`${H2} mb-6`} style={HEADING}>Worked Examples</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {EXAMPLES.map(({ title, text }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={HEADING}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Reference Tables ── */}
      <section className={SECTION}>
        <h2 className={`${H2} mb-6`} style={HEADING}>Fuel Cost per 100 Miles and per 100 km</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={HEADING}>Per 100 miles at ${US_PRICE.toFixed(2)}/gal</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">MPG</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">Gallons</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">Cost</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MPG_ROWS.map(([mpg, label]) => (
                  <tr key={mpg}>
                    <td className="py-1.5 px-3 font-mono text-gray-800">{mpg}</td>
                    <td className="py-1.5 px-3 text-right font-mono text-gray-600">{(100 / mpg).toFixed(2)}</td>
                    <td className="py-1.5 px-3 text-right font-mono font-semibold text-gray-900">{money("$", (100 / mpg) * US_PRICE)}</td>
                    <td className="py-1.5 px-3 text-xs text-gray-500">{label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={HEADING}>Per 100 km at €{EU_PRICE.toFixed(2)}/L</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">L/100 km</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">km/L</th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-700">Cost</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {L100_ROWS.map(([l100, label]) => (
                  <tr key={l100}>
                    <td className="py-1.5 px-3 font-mono text-gray-800">{l100}</td>
                    <td className="py-1.5 px-3 text-right font-mono text-gray-600">{(100 / l100).toFixed(1)}</td>
                    <td className="py-1.5 px-3 text-right font-mono font-semibold text-gray-900">{money("€", l100 * EU_PRICE)}</td>
                    <td className="py-1.5 px-3 text-xs text-gray-500">{label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Example prices only. Enter today&apos;s local price in the calculator for your own figure.
        </p>
      </section>

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />
    </>
  );
}
