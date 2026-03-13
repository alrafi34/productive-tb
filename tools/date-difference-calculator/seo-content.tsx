export default function DateDifferenceCalculatorSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Calculate Date Difference
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Select Start Date:</strong> Choose the beginning date using the date picker or type it in YYYY-MM-DD format.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Select End Date:</strong> Choose the ending date. The calculator automatically ensures the end date is after the start date.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>View Results:</strong> The difference is calculated instantly in years, months, and days, plus total days, weeks, and months.</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              What You Can Do
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Calculate exact age in years, months, and days
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                View difference in multiple formats (days, weeks, months)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Include time difference with hours, minutes, seconds
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Use quick presets for common calculations
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Save and reload recent calculations
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Copy results to clipboard instantly
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Calculations
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Age Calculation
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Birth Date:</span>
                <span className="font-mono font-semibold text-gray-900">1990-05-15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Today:</span>
                <span className="font-mono font-semibold text-gray-900">2026-03-13</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Age:</span>
                <span className="font-mono font-bold text-primary">35 years, 9 months, 26 days</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Project Duration
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Start:</span>
                <span className="font-mono font-semibold text-gray-900">2023-01-01</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End:</span>
                <span className="font-mono font-semibold text-gray-900">2023-12-31</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Duration:</span>
                <span className="font-mono font-bold text-primary">364 days</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Event Countdown
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">From:</span>
                <span className="font-mono font-semibold text-gray-900">2024-01-01</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">To:</span>
                <span className="font-mono font-semibold text-gray-900">2024-12-25</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Time Until:</span>
                <span className="font-mono font-bold text-primary">11 months, 24 days</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Relationship Duration
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Anniversary:</span>
                <span className="font-mono font-semibold text-gray-900">2020-06-15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Today:</span>
                <span className="font-mono font-semibold text-gray-900">2026-03-13</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Together:</span>
                <span className="font-mono font-bold text-primary">5 years, 8 months, 26 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How does the calculator handle leap years?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Our calculator automatically accounts for leap years when calculating date differences. It correctly handles February 29th and ensures accurate day counts across all years, including century years that follow special leap year rules.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What's the difference between total days and the days component?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The "days" component shows the remaining days after accounting for full years and months (e.g., 2 years, 3 months, 15 days). "Total days" shows the complete difference as a single number of days (e.g., 835 days total).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can I calculate the difference including time?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes! Enable the "Include time difference" option to see hours, minutes, and seconds in addition to years, months, and days. This is useful for precise calculations like event countdowns or time tracking.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How are months calculated when they have different lengths?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The calculator uses a calendar-based approach that respects actual month lengths. For example, from January 31 to February 28 is considered 28 days (not a full month), while January 1 to February 1 is exactly 1 month.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is my data stored or sent anywhere?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              No. All calculations happen entirely in your browser using JavaScript. Your dates are never sent to any server. The history feature stores recent calculations only in your browser's local storage for your convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Date Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Instant Results</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Get accurate date differences immediately as you select dates. No waiting, no page reloads.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Multiple Formats</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              View results in years/months/days, total days, weeks, or months—whatever format you need.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>100% Private</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              All calculations run in your browser. Your dates never leave your device.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">🎂</span>
              Age Calculation
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculate exact age in years, months, and days. Perfect for birthday planning, age verification, or milestone tracking.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">📊</span>
              Project Management
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Track project durations, calculate sprint lengths, and measure time between milestones for better planning.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">⚖️</span>
              Legal & Business
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculate contract durations, statute of limitations periods, notice periods, and other time-sensitive legal matters.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">🎉</span>
              Event Planning
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Count down to weddings, vacations, anniversaries, or any special event. Plan ahead with accurate time calculations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
