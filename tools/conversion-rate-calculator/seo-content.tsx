export default function ConversionRateCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Conversion Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter Visitors", "Type the total number of visitors, sessions, or impressions for your campaign or page."],
                ["Enter Conversions", "Type the number of desired actions completed — purchases, sign-ups, downloads, etc."],
                ["View Rate Instantly", "Your conversion rate updates in real time as you type."],
                ["Export or Share", "Copy, download as TXT/CSV, or share via a pre-filled URL for team reporting."],
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
                "Real-time conversion rate calculation as you type",
                "Performance badge (Exceptional / Excellent / Good / Average / Low)",
                "Industry preset buttons for quick example data",
                "Calculation history saved locally in browser",
                "Copy result or full breakdown to clipboard",
                "Download as TXT or CSV",
                "Shareable URL with pre-filled values",
                "Decimal precision selector (0–4 places)",
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
          Conversion Rate Formula & Examples
        </h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Formula</p>
          <p className="font-mono text-lg text-gray-900 font-semibold">Conversion Rate (%) = (Conversions ÷ Visitors) × 100</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Visitors</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Conversions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Conversion Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5,000", "175", "3.50%", "Good"],
                ["12,800", "512", "4.00%", "Good"],
                ["900", "81", "9.00%", "Excellent"],
                ["10,000", "80", "0.80%", "Low"],
                ["2,500", "325", "13.00%", "Exceptional"],
                ["50,000", "1,500", "3.00%", "Good"],
              ].map(([v, c, rate, perf]) => (
                <tr key={v + c} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{v}</td>
                  <td className="py-2.5 px-4 font-mono">{c}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary font-mono">{rate}</td>
                  <td className="py-2.5 px-4">{perf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Conversion Rate Benchmarks by Industry
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry / Channel</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Average Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Good Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Ecommerce (General)", "1–3%", "3–5%", "Highly competitive; varies by product type"],
                ["SaaS / Software", "3–7%", "7%+", "Free trials and demos boost rates significantly"],
                ["Lead Generation Pages", "5–15%", "15%+", "Depends on offer quality and targeting"],
                ["Email Campaigns", "2–5%", "5–10%", "Click-to-conversion from email traffic"],
                ["Google Ads (Search)", "2–5%", "5%+", "High-intent traffic converts better"],
                ["Facebook / Meta Ads", "1–3%", "3%+", "Cold audience requires warming up"],
                ["Landing Pages", "4–8%", "10%+", "Highly optimized pages can exceed 20%"],
              ].map(([industry, avg, good, note]) => (
                <tr key={industry} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{industry}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{avg}</td>
                  <td className="py-2.5 px-4 font-mono">{good}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Benchmarks are approximate industry averages. Actual rates vary by traffic quality, offer, page design, and audience.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a conversion rate?",
              a: "A conversion rate is the percentage of visitors who complete a desired action out of the total number of visitors. The desired action can be a purchase, sign-up, download, form submission, subscription, or any other goal you define. It is one of the most important KPIs in digital marketing because it directly reflects how effective your campaign, page, or offer is.",
            },
            {
              q: "How is conversion rate calculated?",
              a: "Conversion rate is calculated by dividing the number of conversions by the total number of visitors, then multiplying by 100. For example, if 5,000 visitors came to your page and 175 purchased, the conversion rate is (175 ÷ 5,000) × 100 = 3.5%.",
            },
            {
              q: "What is a good conversion rate?",
              a: "A good conversion rate depends on the industry and type of goal. For ecommerce, 1–3% is typical and 3–5% is considered strong. For lead generation pages, 5–15% is common. For email campaigns, 2–5% is average. Always benchmark against your own historical data and your specific industry.",
            },
            {
              q: "Can conversion rate exceed 100%?",
              a: "Yes — if you count multiple conversions per visitor (e.g. a user who adds multiple items to a cart), conversions can technically exceed unique visitors. This calculator will still compute the rate and display a note when conversions exceed visitors.",
            },
            {
              q: "What is the difference between conversion rate and CTR?",
              a: "CTR (Click-Through Rate) measures the percentage of people who clicked on a link or ad out of those who saw it. Conversion rate measures how many of those who visited a page or clicked actually completed a goal. CTR is a top-of-funnel metric; conversion rate is further down the funnel.",
            },
            {
              q: "How do I improve my conversion rate?",
              a: "Common tactics include improving page load speed, writing clearer calls to action, using social proof and testimonials, A/B testing headlines and layouts, simplifying forms, adding trust signals (SSL, guarantees), and targeting higher-quality traffic through better audience segmentation.",
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
            { icon: "🛍️", title: "Ecommerce Owners", desc: "Track store conversion rates by product page, cart, and checkout to identify drop-off points and optimize the buying journey." },
            { icon: "📢", title: "PPC Advertisers", desc: "Measure Google Ads and Meta Ads conversion performance to optimize bids, improve Quality Score, and reduce cost per acquisition." },
            { icon: "📧", title: "Email Marketers", desc: "Calculate click-to-conversion rates from email campaigns to evaluate CTA effectiveness and list quality." },
            { icon: "🚀", title: "SaaS Founders", desc: "Monitor free trial, demo request, and sign-up conversion rates to optimize onboarding funnels and improve MRR growth." },
            { icon: "📊", title: "Marketing Analysts", desc: "Track and compare conversion rates across channels, landing pages, and campaigns for executive reporting and strategy." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn digital marketing fundamentals by practicing conversion rate calculations with real-world data examples." },
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
