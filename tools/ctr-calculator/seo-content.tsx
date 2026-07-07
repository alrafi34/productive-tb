export default function CTRCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the CTR Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter Clicks", "Type the total number of clicks your ad, link, or content received."],
                ["Enter Impressions", "Type the total number of times your content was displayed to users."],
                ["View CTR Instantly", "Your click-through rate updates in real time as you type."],
                ["Export or Share", "Copy, download as TXT/CSV, or share via URL with pre-filled values."],
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
                "Real-time CTR calculation as you type",
                "Performance badge (Excellent / Good / Average / Low)",
                "Calculation history saved locally",
                "Copy result or full breakdown to clipboard",
                "Download as TXT or CSV",
                "Shareable URL with pre-filled values",
                "Decimal precision selector (0–4 places)",
                "Quick example presets to get started fast",
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
          CTR Formula & Examples
        </h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Formula</p>
          <p className="font-mono text-lg text-gray-900 font-semibold">CTR (%) = (Clicks ÷ Impressions) × 100</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Clicks</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Impressions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CTR</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["150", "5,000", "3.00%", "Good"],
                ["2,350", "72,800", "3.23%", "Good"],
                ["35", "1,200", "2.92%", "Good"],
                ["500", "10,000", "5.00%", "Excellent"],
                ["80", "20,000", "0.40%", "Very Low"],
                ["1,000", "50,000", "2.00%", "Average"],
              ].map(([clicks, impressions, ctr, perf]) => (
                <tr key={clicks + impressions} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{clicks}</td>
                  <td className="py-2.5 px-4 font-mono">{impressions}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary font-mono">{ctr}</td>
                  <td className="py-2.5 px-4">{perf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          CTR Benchmarks by Channel
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Channel</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Average CTR</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Good CTR</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Google Search Ads", "2–5%", "5%+", "Varies by industry and keyword intent"],
                ["Google Display Ads", "0.1–0.5%", "1%+", "Lower due to broader, less targeted audience"],
                ["Facebook Ads", "0.5–1.5%", "2%+", "Depends heavily on audience targeting"],
                ["Email Campaigns", "2–5%", "5%+", "Click rate from total delivered emails"],
                ["Organic Search (SEO)", "2–10%", "10%+", "Position 1 can exceed 25–30% CTR"],
                ["Display / Banner Ads", "0.05–0.1%", "0.3%+", "Industry average is around 0.1%"],
              ].map(([channel, avg, good, note]) => (
                <tr key={channel} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{channel}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{avg}</td>
                  <td className="py-2.5 px-4 font-mono">{good}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Benchmarks are approximate industry averages. Actual CTR varies by industry, ad quality, targeting, and competition.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is CTR (Click-Through Rate)?",
              a: "CTR is the percentage of people who clicked on a link, ad, or search result out of the total number who saw it (impressions). It measures how effectively your content attracts clicks. A higher CTR generally means your headline, ad copy, or meta description is compelling and relevant to your audience.",
            },
            {
              q: "How is CTR calculated?",
              a: "CTR is calculated by dividing the number of clicks by the number of impressions, then multiplying by 100 to get a percentage. For example, if your ad received 150 clicks from 5,000 impressions, your CTR is (150 ÷ 5,000) × 100 = 3.00%.",
            },
            {
              q: "What is a good CTR?",
              a: "A \"good\" CTR depends on the channel. For Google Search Ads, 2–5% is typical. For organic search (SEO), position 1 can achieve 25–30%+. For display ads, even 0.1% can be considered average. Always compare against your own historical benchmarks and industry averages rather than a single universal number.",
            },
            {
              q: "Can CTR be greater than 100%?",
              a: "In theory, CTR can exceed 100% if the same user clicks multiple times on the same content. However, most analytics platforms deduplicate or track unique clicks, making this uncommon. If you see CTR above 100%, it may indicate tracking errors or bot traffic.",
            },
            {
              q: "Does CTR affect Google Ads Quality Score?",
              a: "Yes. Expected CTR is one of the three components that determine your Google Ads Quality Score (along with ad relevance and landing page experience). A higher expected CTR can lead to a better Quality Score, which can lower your cost-per-click and improve your ad position.",
            },
            {
              q: "Does CTR affect SEO?",
              a: "CTR is considered a user engagement signal. While Google has not officially confirmed CTR as a direct ranking factor, higher organic CTR means more traffic to your page, which can strengthen its relevance signals over time. Optimizing title tags and meta descriptions to improve CTR is a widely recommended SEO tactic.",
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
          Who Uses This CTR Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔍", title: "SEO Specialists", desc: "Track organic CTR from Google Search Console and optimize title tags and meta descriptions for better rankings." },
            { icon: "📢", title: "PPC Advertisers", desc: "Monitor Google Ads and Bing Ads CTR to improve Quality Score, lower CPC, and maximize return on ad spend." },
            { icon: "📱", title: "Social Media Managers", desc: "Measure Facebook, Instagram, and LinkedIn ad performance to identify winning creatives and audiences." },
            { icon: "📧", title: "Email Marketers", desc: "Track email click rates across campaigns to A/B test subject lines, CTAs, and content blocks." },
            { icon: "📊", title: "Marketing Analysts", desc: "Benchmark performance across channels, generate reports, and present campaign results to stakeholders." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn digital marketing fundamentals by practicing CTR calculations with real-world example data." },
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
