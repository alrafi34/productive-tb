export default function CPCCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the CPC Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Quick Start Guide</h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter Advertising Cost", "Type the total amount spent on the ad campaign, including all ad spend for the period."],
                ["Enter Total Clicks", "Type the total number of clicks received from your ads during the same period."],
                ["Select Currency", "Choose your preferred currency for formatted output in the result panel."],
                ["View CPC Instantly", "Your Cost Per Click updates in real time as you type, with a performance assessment."],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time CPC calculation as you type",
                "Performance badge (Very Low / Low / Average / High / Very High)",
                "Contextual interpretation for your result",
                "Multiple currency support (USD, EUR, GBP, and more)",
                "Industry preset buttons for quick examples",
                "Copy result or full report to clipboard",
                "Download as TXT or CSV",
                "Shareable URL with pre-filled values",
                "Calculation history saved locally",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          CPC Formula & Examples
        </h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Formula</p>
          <p className="font-mono text-lg text-gray-900 font-semibold">CPC = Total Advertising Cost ÷ Total Clicks</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ad Spend</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Clicks</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CPC</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$500",    "250",   "$2.00",  "Average"],
                ["$1,250",  "5,000", "$0.25",  "Low"],
                ["€850",    "680",   "€1.25",  "Average"],
                ["$5,000",  "500",   "$10.00", "Very High"],
                ["$200",    "1,000", "$0.20",  "Low"],
                ["$3,000",  "600",   "$5.00",  "High"],
              ].map(([spend, clicks, cpc, assessment]) => (
                <tr key={spend + clicks} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{spend}</td>
                  <td className="py-2.5 px-4 font-mono">{clicks}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary font-mono">{cpc}</td>
                  <td className="py-2.5 px-4">{assessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Average CPC Benchmarks by Industry
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Google Ads CPC</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Facebook Ads CPC</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Legal / Attorneys",  "$6–$100+", "$1.32",    "Highest CPC on Google due to extreme competition"],
                ["Finance / Insurance","$3–$15",   "$3.77",    "High-value leads justify premium bids"],
                ["Health & Medical",   "$2–$7",    "$1.32",    "Competitive but varies widely by specialty"],
                ["Ecommerce",          "$0.50–$2", "$0.45",    "Broad range; product type drives CPC heavily"],
                ["Technology / SaaS",  "$1–$6",    "$1.27",    "B2B SaaS keywords command higher CPCs"],
                ["Education",          "$1–$4",    "$1.06",    "Online courses and degrees are competitive"],
                ["Travel & Hospitality","$0.50–$3","$0.63",    "Seasonal variation is significant"],
              ].map(([industry, google, facebook, note]) => (
                <tr key={industry} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{industry}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{google}</td>
                  <td className="py-2.5 px-4 font-mono">{facebook}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are approximate averages. Actual CPC varies by keyword, targeting, quality score, and bid strategy.</p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "What is Cost Per Click (CPC)?", a: "CPC is the amount an advertiser pays each time a user clicks on their ad. It is one of the most widely used pricing models in digital advertising, used across Google Ads, Microsoft Ads, Facebook Ads, LinkedIn, and most other ad platforms. CPC tells you the efficiency of your paid traffic acquisition." },
            { q: "How is CPC calculated?", a: "CPC is calculated by dividing the total advertising cost by the total number of clicks. For example, if you spent $500 and received 250 clicks, your CPC is $500 ÷ 250 = $2.00 per click." },
            { q: "What is a good CPC?", a: "A good CPC depends on your industry, channel, and the value of a conversion. A $5 CPC may be excellent for a business where a conversion is worth $500, but terrible for one worth $10. Always evaluate CPC in the context of your conversion rate and customer lifetime value." },
            { q: "What is the difference between CPC and CPM?", a: "CPC (Cost Per Click) charges advertisers only when a user clicks the ad. CPM (Cost Per Mille) charges per 1,000 impressions regardless of clicks. CPC is better for direct-response campaigns where you want measurable actions. CPM is better for brand awareness where impressions matter more." },
            { q: "What is maximum CPC vs average CPC?", a: "Maximum CPC (also called max bid) is the highest amount you are willing to pay per click — it is a ceiling you set. Average CPC is what you actually paid on average across all clicks, which is often lower than your maximum bid because of auction dynamics and quality scores." },
            { q: "How can I reduce my CPC?", a: "Common strategies include improving your Quality Score (ad relevance, landing page experience, expected CTR), using more specific long-tail keywords, tightening audience targeting, improving ad copy to increase CTR, adding negative keywords to filter irrelevant traffic, and using bid adjustments for better-performing segments." },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📢", title: "PPC Specialists",     desc: "Analyse campaign cost efficiency across Google Ads and Microsoft Ads accounts and optimise bidding strategies for better performance." },
            { icon: "📱", title: "Social Media Managers",desc: "Track CPC across Facebook, Instagram, LinkedIn, and TikTok ad campaigns to compare platform efficiency and allocate budget." },
            { icon: "🛍️", title: "Ecommerce Businesses", desc: "Monitor product ad CPC to ensure advertising costs stay below the margin on each sale for profitable paid traffic campaigns." },
            { icon: "🏢", title: "Marketing Agencies",   desc: "Calculate and report CPC metrics for multiple clients across different industries and advertising platforms." },
            { icon: "🚀", title: "Startup Founders",     desc: "Track early-stage paid acquisition cost per click to evaluate channel viability before scaling ad spend." },
            { icon: "🎓", title: "Marketing Students",   desc: "Learn digital advertising fundamentals by practicing CPC calculations using real-world campaign data examples." },
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
