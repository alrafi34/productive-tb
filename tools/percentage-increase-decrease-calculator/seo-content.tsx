export default function PercentageChangeSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How Percentage Change is Calculated
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              The Formula
            </h3>
            <p className="text-gray-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              To find the percentage increase or decrease between two values, you subtract the old value from the new value, divide the result by the absolute value of the old value, and then multiply by 100.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-700">
              ((New Value - Old Value) / |Old Value|) × 100
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Real-World Examples
            </h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="text-primary mr-2">●</span>
                <span><strong>Investing:</strong> If you buy a stock at $80 and it rises to $100, that is a 25% increase.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">●</span>
                <span><strong>Discounts:</strong> If an item was $150 and is now $120, that represents a 20% decrease.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">●</span>
                <span><strong>Business Growth:</strong> Tracking monthly revenue growth or churn rates using percentage change.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Advanced Tool Features
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Reverse Percentage Calculation
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Often you know the final price and the discount applied but need to find the original price. Our reverse mode handles the math automatically (Original = Final / (1 + Rate)).
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Multi-Step Simulation
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculate compounded changes. If a price increases by 20% and then decreases by 10%, it's not a simple 10% net gain—it's actually an 8% gain. Use our simulator to track sequential changes accurately.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
