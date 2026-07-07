export default function CPACalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          How to Use the CPA Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3
              className="text-lg font-medium text-gray-800 mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                [
                  "Enter Marketing Spend",
                  "Type the total amount spent on your campaign, including all advertising costs for the period.",
                ],
                [
                  "Enter Total Acquisitions",
                  "Type the total number of customers or conversions acquired during the same period.",
                ],
                [
                  "Select Currency",
                  "Choose your preferred currency for formatted output in the result panel.",
                ],
                [
                  "View CPA Instantly",
                  "Your Cost Per Acquisition updates in real time as you type, with a performance assessment.",
                ],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span>
                    <strong>{title}:</strong> {desc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3
              className="text-lg font-medium text-gray-800 mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time CPA calculation as you type",
                "Performance badge (Excellent / Good / Average / High / Very High)",
                "Contextual interpretation for your result",
                "Multiple currency support (USD, EUR, GBP, INR, and more)",
                "Industry preset buttons for quick examples",
                "Copy result or full report to clipboard",
                "Download as TXT or CSV",
                "Shareable URL with pre-filled values",
                "Calculation history saved locally",
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

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CPA Formula &amp; Examples
        </h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Formula</p>
          <p className="font-mono text-lg text-gray-900 font-semibold">
            CPA = Total Marketing Spend ÷ Total Acquisitions
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Marketing Spend
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Acquisitions
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  CPA
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Assessment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$2,500", "100", "$25.00", "Good"],
                ["$750", "30", "$25.00", "Good"],
                ["$5,000", "250", "$20.00", "Good"],
                ["$10,000", "50", "$200.00", "High"],
                ["$1,200", "400", "$3.00", "Excellent"],
                ["$8,500", "40", "$212.50", "High"],
              ].map(([spend, acq, cpa, assessment]) => (
                <tr key={spend + acq} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{spend}</td>
                  <td className="py-2.5 px-4 font-mono">{acq}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary font-mono">
                    {cpa}
                  </td>
                  <td className="py-2.5 px-4">{assessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Average CPA Benchmarks by Industry
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Industry
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Google Ads CPA
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Facebook Ads CPA
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                [
                  "Ecommerce",
                  "$45 – $65",
                  "$38 – $55",
                  "Varies heavily by product price and margin",
                ],
                [
                  "SaaS / Technology",
                  "$100 – $300",
                  "$75 – $200",
                  "Higher LTV justifies elevated CPA",
                ],
                [
                  "Finance / Insurance",
                  "$175 – $400",
                  "$100 – $250",
                  "High-value leads drive premium CPAs",
                ],
                [
                  "Health & Fitness",
                  "$40 – $80",
                  "$30 – $60",
                  "Broad audience keeps costs moderate",
                ],
                [
                  "Education / eLearning",
                  "$60 – $150",
                  "$40 – $100",
                  "Course price and funnel depth affect CPA",
                ],
                [
                  "Travel & Hospitality",
                  "$50 – $120",
                  "$35 – $90",
                  "Seasonal swings significantly impact CPA",
                ],
                [
                  "Real Estate",
                  "$200 – $500+",
                  "$150 – $350",
                  "Long sales cycles inflate acquisition cost",
                ],
              ].map(([industry, google, facebook, note]) => (
                <tr key={industry} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">
                    {industry}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">
                    {google}
                  </td>
                  <td className="py-2.5 px-4 font-mono">{facebook}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Benchmarks are approximate averages. Actual CPA varies by keyword
          targeting, audience quality, landing page conversion rate, and
          campaign maturity.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Cost Per Acquisition (CPA)?",
              a: "CPA is the average cost an advertiser pays to acquire one customer or conversion. It is calculated by dividing total marketing spend by the number of acquisitions (purchases, sign-ups, leads, or other defined goals). CPA is one of the most important efficiency metrics in digital marketing because it directly measures how much it costs to generate a paying customer.",
            },
            {
              q: "How is CPA calculated?",
              a: "CPA is calculated by dividing total marketing spend by the number of acquisitions. For example, if you spent $2,500 and acquired 100 customers, your CPA is $2,500 ÷ 100 = $25.00 per acquisition.",
            },
            {
              q: "What is the difference between CPA and CPC?",
              a: "CPC (Cost Per Click) measures the cost of each click on your ad, while CPA (Cost Per Acquisition) measures the cost of each resulting conversion or customer. CPC tells you traffic efficiency, while CPA tells you acquisition efficiency. A low CPC does not guarantee a low CPA — your landing page conversion rate is the bridge between the two.",
            },
            {
              q: "What is a good CPA?",
              a: "A good CPA depends entirely on the value of a conversion. If a customer is worth $500 in lifetime revenue, a CPA of $100 is excellent. If the same customer is worth $30, a $100 CPA is unsustainable. The key benchmark is that CPA should be significantly lower than Customer Lifetime Value (LTV). A CPA:LTV ratio of 1:3 or better is generally considered healthy.",
            },
            {
              q: "What is Target CPA (tCPA)?",
              a: "Target CPA is a Smart Bidding strategy in Google Ads where the algorithm automatically adjusts bids to try to achieve a specific CPA goal you set. Instead of manually setting bids, you tell Google the CPA you want to achieve, and it optimizes across auctions to hit that target on average.",
            },
            {
              q: "How can I reduce my CPA?",
              a: "Common strategies include improving landing page conversion rates, tightening audience targeting to reduce irrelevant traffic, testing ad creative to increase click-through rates, using negative keywords to filter unqualified clicks, improving the post-click experience, and optimizing your sales funnel to reduce drop-off between click and conversion.",
            },
          ].map(({ q, a }, i) => (
            <div
              key={i}
              className={i < 5 ? "border-b border-gray-100 pb-6" : ""}
            >
              <h3
                className="font-semibold text-gray-800 mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "📢",
              title: "PPC Managers",
              desc: "Track acquisition costs across Google Ads and Microsoft Ads campaigns to optimize bidding strategy and budget allocation.",
            },
            {
              icon: "📱",
              title: "Social Media Advertisers",
              desc: "Measure CPA across Facebook, Instagram, LinkedIn, and TikTok to compare channel efficiency and shift budget to top performers.",
            },
            {
              icon: "🛍️",
              title: "Ecommerce Businesses",
              desc: "Monitor product campaign CPAs against product margins to ensure every paid acquisition is profitable at scale.",
            },
            {
              icon: "🏢",
              title: "Marketing Agencies",
              desc: "Calculate and report CPA metrics across multiple client accounts, channels, and campaign types with a single tool.",
            },
            {
              icon: "🚀",
              title: "Startup Founders",
              desc: "Measure early-stage paid acquisition efficiency to evaluate channel viability and model unit economics before scaling.",
            },
            {
              icon: "🎓",
              title: "Marketing Students",
              desc: "Learn digital advertising fundamentals by practicing CPA calculations using real-world campaign data examples.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-gray-50 border border-gray-100 rounded-lg p-5"
            >
              <div className="text-2xl mb-2">{icon}</div>
              <h3
                className="font-semibold text-gray-800 mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
