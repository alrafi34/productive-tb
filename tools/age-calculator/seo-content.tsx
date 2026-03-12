export default function AgeCalculatorSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Calculate Your Exact Age Online
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Step-by-Step Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Select Your Birth Date:</strong> Use the interactive calendar or simply type out your exact Date of Birth (DOB).</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Choose the Comparison Date:</strong> It defaults to today's date automatically, but you can alter this to see how old you were or will be on any historical date.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Get Instant Math:</strong> As soon as you finish selecting your dates, the tool instantly processes leap years and specific calendrical jumps to present your precise age.</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Advanced Data Outputs
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Discover total lifetime days/hours/minutes lived
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Track specific countdown timers to your next birthday
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Find the specific day of the week you were born on
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Check off massive milestone events (like turning 10,000 days old)
              </li>
            </ul>
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
              Does this calculator consider leap years?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes, absolutely! Calculating precise ages manually can quickly become overwhelmingly confusing due to leap years (February 29 variables) and differing month lengths. This JavaScript-powered logic automatically adjusts the background calendar models so every day is correctly documented and tabulated.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How do I find out how many days I have been alive?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Simply input your birthday into the "Date of Birth" slot. Along with the traditional read-out detailing your lifespan in Years, Months, and Days, checking the "Lifetime Statistics" panel underneath immediately reveals the grand total of days, hours, and even minutes you've actively been around for.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can I determine how old I will be in the future?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes! By unlocking the "Current Date" field by default (it typically runs live on today's current timezone date) you can insert a past or future date into the parameter, such as an upcoming significant retirement year or historical graduation date, to run differential age comparisons. 
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is this safe or tracked?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Completely private. Because your Birth Dates remain strictly as client-side data variables, they are never dispatched into our servers, aggregated into a database, or observed remotely. Once you exit our utility tab, your inputs are instantly destroyed and wiped. 
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Age Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⏱️</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Chronological Accuracy</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Stop trying to blindly trace back years by memory; simply define the timestamps to mathematically map out your precise lifespans with zero hassle.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Robust Extra Tracking</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Finding your raw age is fun, but exploring the esoteric metrics (like uncovering which distinct day of the week you were delivered on) adds dynamic flare.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Easy Exportable Results</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Want an offline roster mapping out an entire department? You can paste in batch arrays of birthdays straight from a spreadsheet to crunch outputs via CSV format safely.</p>
          </div>
        </div>
      </section>
    </>
  );
}
