export default function BandwidthCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Bandwidth Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Four Calculation Modes
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Transfer Time", "Enter a file size and internet speed to calculate exactly how long a download or upload will take."],
                ["Website Traffic", "Input monthly visitors, average page size, and pages per visit to estimate total monthly bandwidth consumption."],
                ["Streaming Usage", "Select video quality (480p to 4K), hours per day, and days per month to calculate monthly data usage."],
                ["Multi-User", "Enter concurrent users, average speed per user, and peak usage percentage to determine required bandwidth capacity."],
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
                "Real-time calculations as you type",
                "4 calculation modes in one tool",
                "Auto unit conversion (KB/MB/GB/TB, Kbps/Mbps/Gbps)",
                "Human-readable formatted outputs",
                "Smart bandwidth plan recommendations",
                "Quick preset buttons for common scenarios",
                "Calculation history saved in browser",
                "Export results as TXT or JSON",
                "Copy full summary to clipboard",
                "Mobile-friendly sliders and inputs",
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
          Example Bandwidth Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Scenario</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Input</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Transfer Time", "10 GB file @ 100 Mbps", "~13 min 20 sec"],
                ["Transfer Time", "1 TB file @ 1 Gbps", "~2 hrs 22 min"],
                ["Website Traffic", "10K visitors × 5 MB × 3 pages", "~146.5 GB/month"],
                ["Website Traffic", "100K visitors × 3 MB × 5 pages", "~1.43 TB/month"],
                ["Streaming", "1080p × 4 hrs/day × 30 days", "360 GB/month"],
                ["Streaming", "4K × 3 hrs/day × 30 days", "900 GB/month"],
                ["Multi-User", "500 users × 2 Mbps @ 80% peak", "800 Mbps peak"],
                ["Multi-User", "1000 users × 5 Mbps @ 70% peak", "3,500 Mbps peak"],
              ].map(([scenario, input, result]) => (
                <tr key={input} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{scenario}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{input}</td>
                  <td className="py-2.5 px-4 font-semibold">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Streaming Bandwidth Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Quality</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">GB/Hour</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Min. Speed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">4 hrs/day × 30 days</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Monthly (GB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["480p", "0.7", "~1.6 Mbps", "4 × 30 = 120 hrs", "84 GB"],
                ["720p (HD)", "1.5", "~3.3 Mbps", "4 × 30 = 120 hrs", "180 GB"],
                ["1080p (Full HD)", "3.0", "~6.7 Mbps", "4 × 30 = 120 hrs", "360 GB"],
                ["2K (QHD)", "6.0", "~13.3 Mbps", "4 × 30 = 120 hrs", "720 GB"],
                ["4K (UHD)", "10.0", "~22.2 Mbps", "4 × 30 = 120 hrs", "1,200 GB"],
              ].map(([q, gbhr, speed, calc, monthly]) => (
                <tr key={q} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary">{q}</td>
                  <td className="py-2.5 px-4 font-mono">{gbhr}</td>
                  <td className="py-2.5 px-4">{speed}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-500">{calc}</td>
                  <td className="py-2.5 px-4 font-semibold">{monthly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "How is transfer time calculated?",
              a: "Transfer time = file size (in bits) ÷ speed (in bits per second). For a 10 GB file at 100 Mbps: 10 × 8 × 1024 Mb ÷ 100 = 819.2 seconds ≈ 13 minutes 39 seconds. The calculator handles all unit conversions automatically.",
            },
            {
              q: "How is monthly website bandwidth estimated?",
              a: "Monthly bandwidth = monthly visitors × average page size (MB) × average pages per visitor. For example, 10,000 visitors loading 5 MB across 3 pages = 150,000 MB = ~146.5 GB/month. The growth slider projects future usage.",
            },
            {
              q: "How accurate are the streaming estimates?",
              a: "Estimates are based on typical bitrates: 480p (~700 KB/s), 720p (~1.5 Mbps), 1080p (~3 Mbps), 2K (~6 Mbps), 4K (~10 Mbps). Actual usage varies by codec (H.264 vs H.265/HEVC), platform compression, and content complexity.",
            },
            {
              q: "What does peak usage percentage mean?",
              a: "Peak usage accounts for the fact that not all users are consuming maximum bandwidth simultaneously. An 80% peak factor means you plan for 80% of the theoretical maximum. This is a standard over-provisioning practice for network infrastructure.",
            },
            {
              q: "What is the difference between Mbps and MB/s?",
              a: "Mbps (megabits per second) is used for network speeds; MB/s (megabytes per second) is used for file sizes. To convert: 1 MB/s = 8 Mbps. A 100 Mbps connection downloads at ~12.5 MB/s. This calculator handles all conversions internally.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 4 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses Bandwidth Calculators?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔧", title: "Network Engineers", desc: "Plan infrastructure capacity, size bandwidth pipes, and model peak utilization for enterprise networks." },
            { icon: "☁️", title: "Cloud Architects", desc: "Estimate data egress costs, CDN bandwidth budgets, and transfer times for cloud infrastructure." },
            { icon: "🌐", title: "Website Owners", desc: "Choose the right hosting plan by understanding how many visitors translate into monthly bandwidth usage." },
            { icon: "📺", title: "Content Streamers", desc: "Estimate monthly data usage for Netflix, YouTube, or live streaming to avoid ISP data caps." },
            { icon: "⚙️", title: "DevOps Engineers", desc: "Size CI/CD artifact transfers, container registry pulls, and deployment bandwidth requirements." },
            { icon: "🎓", title: "Networking Students", desc: "Practice bandwidth calculations for CCNA, Network+, and other networking certification exams." },
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
