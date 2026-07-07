export default function BounceRateCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Bounce Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter Single Page Visits", "Type the number of sessions where the user viewed only one page and left without interacting further."],
                ["Enter Total Visits", "Type the total number of sessions or visits to your website or page during the same period."],
                ["View Bounce Rate Instantly", "Your bounce rate updates in real time as you type with a performance assessment."],
                ["Export or Share", "Copy the result, download as TXT/CSV, or share via a pre-filled URL for reporting."],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time bounce rate calculation as you type",
                "Performance badge (Excellent / Good / Average / High)",
                "Contextual interpretation of your result",
                "Industry preset buttons for quick examples",
                "Calculation history saved locally in browser",
                "Copy result or full report to clipboard",
                "Download as TXT or CSV",
                "Shareable URL with pre-filled values",
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Bounce Rate Formula & Examples
        </h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Formula</p>
          <p className="font-mono text-lg text-gray-900 font-semibold">Bounce Rate (%) = (Single Page Visits ÷ Total Visits) × 100</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Single Page Visits</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Visits</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Bounce Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["500", "2,000", "25.00%", "Excellent"],
                ["1,250", "5,000", "25.00%", "Excellent"],
                ["3,200", "4,000", "80.00%", "High"],
                ["800", "2,000", "40.00%", "Good"],
                ["1,500", "2,500", "60.00%", "Average"],
                ["100", "1,000", "10.00%", "Excellent"],
              ].map(([b, t, rate, assessment]) => (
                <tr key={b + t} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{b}</td>
                  <td className="py-2.5 px-4 font-mono">{t}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary font-mono">{rate}</td>
                  <td className="py-2.5 px-4">{assessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Bounce Rate Benchmarks by Website Type
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Website Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Bounce Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Assessment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Retail / Ecommerce", "20–45%", "Good", "Product pages with clear navigation tend to retain visitors"],
                ["B2B / Lead Gen", "25–55%", "Good–Average", "Longer content and complex offerings increase single-page exits"],
                ["Blogs / Content Sites", "65–90%", "Average–High", "Readers often arrive, consume one article, and leave — this is expected"],
                ["Landing Pages", "60–90%", "Context-dependent", "High bounce rate can be acceptable if goal is a single CTA"],
                ["News / Media Sites", "40–65%", "Average", "News readers often read one article per session"],
                ["SaaS / Software", "30–60%", "Good–Average", "Varies by funnel stage and traffic source"],
                ["Portals / Dashboards", "10–30%", "Excellent", "Logged-in users typically navigate multiple pages per session"],
              ].map(([type, rate, assessment, note]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{type}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{rate}</td>
                  <td className="py-2.5 px-4">{assessment}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Benchmarks are approximate industry averages. Actual bounce rate varies by traffic source, content type, device, and user intent.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is bounce rate?",
              a: "Bounce rate is the percentage of visitors who land on a page and leave without navigating to any other page on the same website. A 'bounce' is a session in which the user only views one page and takes no further action such as clicking a link, filling a form, or visiting another page.",
            },
            {
              q: "How is bounce rate calculated?",
              a: "Bounce rate is calculated by dividing the number of single-page sessions (bounces) by the total number of sessions, then multiplying by 100. For example, if 500 out of 2,000 visitors leave after one page, the bounce rate is (500 ÷ 2,000) × 100 = 25%.",
            },
            {
              q: "What is a good bounce rate?",
              a: "A good bounce rate depends heavily on the type of website. Generally, 10–30% is considered excellent, 31–50% is good, 51–70% is average, and above 70% is high. However, a blog or news site with 80% bounce rate is not necessarily a problem, as readers often arrive, read one article, and leave by design.",
            },
            {
              q: "Does bounce rate affect SEO?",
              a: "Bounce rate itself is not a confirmed direct Google ranking factor. However, it correlates strongly with user engagement signals that do influence rankings, such as dwell time, pogo-sticking, and click-through satisfaction. A consistently high bounce rate can indicate content quality issues that indirectly affect your organic performance.",
            },
            {
              q: "What is the difference between bounce rate and exit rate?",
              a: "Bounce rate measures sessions where a user viewed only one page. Exit rate measures the percentage of users who left from a specific page, regardless of how many pages they viewed in their session. A page can have a high exit rate because it is the natural last step in a user journey (e.g., a confirmation page) without that being a problem.",
            },
            {
              q: "How can I reduce my bounce rate?",
              a: "Common strategies include improving page load speed, making content immediately relevant to the traffic source, adding clear internal links and calls to action, improving mobile usability, ensuring the page design is clean and trustworthy, and matching ad copy to landing page content to reduce expectation mismatch.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔍", title: "SEO Professionals", desc: "Analyze bounce rate data from Google Analytics and Search Console to identify underperforming pages and prioritize content improvements." },
            { icon: "🏪", title: "Ecommerce Owners", desc: "Track product and category page bounce rates to identify where shoppers are dropping off before reaching the cart or checkout." },
            { icon: "📝", title: "Content Marketers", desc: "Measure how effectively blog posts and landing pages retain reader attention and encourage further exploration of the site." },
            { icon: "📊", title: "Marketing Analysts", desc: "Include bounce rate metrics in campaign performance reports and A/B testing analysis for stakeholder presentations." },
            { icon: "🏢", title: "Digital Agencies", desc: "Quickly calculate and benchmark bounce rate data for client websites during SEO audits and monthly performance reviews." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn web analytics fundamentals by practicing bounce rate calculations with real-world data from Google Analytics." },
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
