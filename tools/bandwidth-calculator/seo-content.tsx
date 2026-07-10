import React from "react";

export default function BandwidthCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* ── 1. Introduction ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Bandwidth Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>bandwidth calculator</strong> is a free online tool that estimates internet data
            usage, file transfer times, and network capacity requirements based on file size, connection
            speed, number of users, or streaming quality. It answers the practical questions that come
            up every time you size a network or plan data usage: <em>how long will this transfer take,
            how much monthly bandwidth do my users consume, and how much capacity do I actually need?</em>
          </p>
          <p>
            The challenge is that bandwidth questions span four completely different contexts — a single
            file download, a website serving thousands of visitors, a household streaming 4K video, and
            a business network supporting hundreds of concurrent users. Each requires a different formula,
            different units, and different planning assumptions. This tool handles all four modes in one
            place, with automatic unit conversion across KB, MB, GB, TB, Kbps, Mbps, and Gbps.
          </p>
          <p>
            This <strong>network bandwidth calculator</strong> is built for <strong>network engineers
            sizing infrastructure, website owners choosing hosting plans, cloud architects estimating
            data egress costs, DevOps engineers planning deployments, content streamers tracking data
            caps, and networking students preparing for certifications</strong>. Four calculation modes,
            real-time results, exportable summaries, browser-based with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Bandwidth Calculations Work
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Each of the four modes uses a distinct formula. The calculator converts all inputs to a
            common base (bits and seconds) before computing, then formats the result into the most
            readable unit automatically.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-3">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Transfer Time</span> = (File Size in bits) ÷ (Speed in bps)</p>
              <p className="text-gray-500 text-xs ml-4">Example: 10 GB @ 100 Mbps → (10 × 8 × 1,024²) bits ÷ 100,000,000 bps = 858.99 s ≈ 14 min 19 sec</p>
              <p className="mt-3"><span className="font-semibold">Website Bandwidth</span> = Visitors × Page Size (MB) × Pages per Visit</p>
              <p className="text-gray-500 text-xs ml-4">Example: 50,000 visitors × 4 MB × 3 pages = 600,000 MB = 585.9 GB/month</p>
              <p className="mt-3"><span className="font-semibold">Streaming Usage</span> = Bitrate (GB/hr) × Hours/Day × Days/Month</p>
              <p className="text-gray-500 text-xs ml-4">Example: 1080p (3 GB/hr) × 4 hrs/day × 30 days = 360 GB/month</p>
              <p className="mt-3"><span className="font-semibold">Multi-User Capacity</span> = Concurrent Users × Speed per User × Peak Factor</p>
              <p className="text-gray-500 text-xs ml-4">Example: 200 users × 5 Mbps × 80% = 800 Mbps required</p>
            </div>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li>• <strong>Bits vs Bytes</strong> — network speeds use bits (Mbps); file sizes use bytes (MB). 1 MB = 8 Mb. The calculator converts automatically.</li>
            <li>• <strong>Binary vs decimal prefixes</strong> — 1 GB (binary) = 1,073,741,824 bytes; 1 GB (decimal) = 1,000,000,000 bytes. Transfer time uses binary; ISP speed ratings use decimal — this discrepancy explains why downloads feel slower than advertised.</li>
            <li>• <strong>Peak factor</strong> — real networks never run at 100% utilization. A 70–80% peak factor is standard engineering practice for sizing capacity headroom.</li>
            <li>• <strong>Growth multiplier</strong> — the website mode includes a traffic growth slider that projects bandwidth needs 6–24 months forward so you can size hosting plans ahead of demand.</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Bandwidth Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ol className="space-y-5 text-gray-600">
            {[
              ["Select a Calculation Mode", "Choose one of the four tabs: Transfer Time, Website Traffic, Streaming Usage, or Multi-User. Each mode shows different input fields relevant to that specific calculation. You can switch between modes without losing your other inputs."],
              ["Enter Your Values", "Fill in the required fields for your chosen mode — file size and connection speed for Transfer Time, visitor counts and page size for Website Traffic, quality and viewing hours for Streaming, or user count and speed per user for Multi-User. Use the dropdowns to set the correct units (KB/MB/GB, Kbps/Mbps/Gbps) — the calculator converts automatically."],
              ["Read the Results", "The result appears immediately as you type. Transfer Time shows hours, minutes, and seconds. Website Traffic shows GB or TB per month. Streaming shows monthly GB with a breakdown by quality tier. Multi-User shows the required bandwidth capacity in Mbps or Gbps."],
              ["Adjust Variables to Compare Scenarios", "Change inputs to model different scenarios — increase connection speed to see how it cuts transfer time, raise concurrent users to find the capacity threshold, or switch streaming quality to understand the data cost difference between 1080p and 4K."],
              ["Export or Copy Your Result", "Use the copy button to copy the result to clipboard, or click Export to download a full summary as a TXT or JSON file. The shareable URL encodes your current inputs so you can send the exact calculation to a colleague."],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ol>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tool Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time results as you type",
                "4 calculation modes in one tool",
                "Auto unit conversion (KB/MB/GB/TB, Kbps/Mbps/Gbps)",
                "Smart bandwidth plan recommendations",
                "Traffic growth projection slider",
                "Quick preset buttons for common scenarios",
                "Export results as TXT or JSON",
                "Copy full summary to clipboard",
                "Shareable URL with inputs encoded",
                "Browser-based — no signup required",
                "Works on mobile and tablet",
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

      {/* ── 4. Use Cases ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Sizing a Business Internet Plan",
              scenario: "An office manager is choosing between a 200 Mbps and 500 Mbps business plan. Their office has 80 employees, each averaging 3 Mbps of usage, with an 85% peak factor. Entering those values in Multi-User mode returns 204 Mbps required — meaning the 200 Mbps plan is exactly at capacity with no headroom. They upgrade to 500 Mbps, which gives 59% headroom for future growth.",
            },
            {
              title: "Cloud File Transfer Planning (DevOps)",
              scenario: "A DevOps engineer needs to transfer 2 TB of database backups to AWS S3 over a 1 Gbps dedicated line. Using Transfer Time mode with 2 TB and 1,000 Mbps, the calculator returns 4 hours 46 minutes. They schedule the transfer for an overnight maintenance window with a 6-hour buffer to account for overhead and retries.",
            },
            {
              title: "Shared Hosting vs VPS Decision",
              scenario: "A startup's SaaS product gets 25,000 monthly visitors, averaging 6 MB per page over 4 pages per session. Website Traffic mode returns 3,516 GB (3.44 TB) per month. Their current shared host allows 1 TB/month — they're consuming 3.4× their limit and need to migrate to a VPS or cloud plan with unmetered bandwidth immediately.",
            },
            {
              title: "ISP Data Cap Management (Household)",
              scenario: "A household has a 500 GB/month ISP data cap. They stream Netflix at 4K for 2 hours per day across 30 days. Streaming mode returns 600 GB/month for 4K at 2 hrs/day — over their cap. Switching to 1080p returns 180 GB/month, leaving 320 GB for everything else. They downgrade the Netflix plan to 1080p and stay under the cap.",
            },
            {
              title: "CDN Bandwidth Budget Estimation",
              scenario: "A cloud architect is estimating monthly CDN costs for a media site. The site serves 200,000 visitors per month, each loading 12 MB of assets across 2 pages. Website Traffic mode returns 4,577 GB (4.47 TB) per month. At $0.085 per GB (Cloudflare R2 pricing), that's approximately $389/month in CDN egress costs — factored into the infrastructure budget.",
            },
            {
              title: "Conference Room AV Bandwidth Sizing",
              scenario: "An IT manager is installing video conferencing in 8 conference rooms that will run simultaneous 4K video calls. Each 4K call requires approximately 25 Mbps. Multi-User mode with 8 users at 25 Mbps and 100% peak returns 200 Mbps dedicated to conferencing. They add a separate 200 Mbps VLAN for AV traffic to prevent it from degrading general office connectivity.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips & Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Always add 20–30% overhead to transfer time estimates", "The calculated transfer time assumes 100% of the connection is dedicated to your transfer with zero protocol overhead, TCP retransmission, or routing latency. In practice, real throughput is 70–80% of the advertised speed. Add at least 25% buffer to every transfer time estimate, especially for cloud and WAN transfers."],
                ["Use 70–80% peak factor for business networks", "A network running at 90%+ utilization will feel congested. Standard network engineering practice is to size for 70–80% peak utilization, leaving 20–30% headroom for bursts, background traffic, and future growth. For latency-sensitive applications like VoIP or video calls, use 60% to be safe."],
                ["Measure your actual page size before using the website mode", "Browser DevTools → Network tab → disable cache → hard reload your page. The 'Transferred' figure at the bottom is your actual page weight. Default assumptions of 2–5 MB are often wrong for media-heavy sites — some pages exceed 20 MB with hero videos and uncompressed images."],
                ["ISP speeds are in Mbps (megabits), file sizes are in MB (megabytes)", "Your 1 Gbps connection downloads at 125 MB/s — not 1,000 MB/s. The factor-of-8 difference trips up even experienced engineers. If your transfer time looks 8× faster than expected, check that you haven't mixed bits and bytes in your inputs."],
                ["Project traffic growth before choosing a hosting tier", "Website bandwidth compounds. A site growing 15% per month doubles in traffic within 5 months. Use the growth slider to project 12 months out — size for future traffic, not current traffic, to avoid mid-contract emergency upgrades."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0">💡</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Mistakes</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Confusing Mbps with MB/s", "The single most common bandwidth error. Network speed (Mbps) and file size (MB) use different base units — bits vs bytes. 100 Mbps ≠ 100 MB/s. 100 Mbps = 12.5 MB/s. Mixing them produces transfer time estimates that are 8× off in either direction."],
                ["Ignoring compression and protocol overhead", "Raw file sizes don't account for HTTP/TCP protocol overhead (~5%), TLS encryption overhead (~3%), or compression differences. A 1 GB compressed archive transfers at a different effective rate than 1 GB of uncompressed video. The calculator gives a baseline — real transfers will vary."],
                ["Using 100% peak factor for multi-user estimates", "Setting peak factor to 100% assumes all users simultaneously max out their connections — almost never true in practice. It leads to severe over-provisioning. Use 70–80% for office environments, 60% for latency-sensitive AV setups, and 50% for public Wi-Fi with highly variable usage."],
                ["Sizing hosting bandwidth on average traffic, not peak", "Web traffic has predictable spikes — business hours, marketing campaigns, press coverage. A site averaging 50 GB/month can spike to 15 GB in a single day during a viral event. Size for peak concurrent load, not monthly averages, to avoid downtime when it matters most."],
                ["Forgetting upload bandwidth for remote work and backups", "ISP plans are asymmetric — a 500 Mbps download plan may only offer 20–50 Mbps upload. For businesses with remote workers uploading large files or running offsite backups, the upload constraint is often the real bottleneck. Enter your upload speed when calculating outbound transfer times."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Reference Tables ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Bandwidth Reference Tables
        </h2>

        {/* Transfer time at common speeds */}
        <h3 className="text-base font-semibold text-gray-700 mb-3">File Transfer Time by Connection Speed</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">File Size</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">25 Mbps</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">100 Mbps</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">500 Mbps</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">1 Gbps</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">10 Gbps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["100 MB",    "32 sec",     "8 sec",      "1.6 sec",    "0.8 sec",    "0.08 sec"],
                ["1 GB",      "5 min 22 s", "1 min 22 s", "16 sec",     "8 sec",      "0.8 sec"],
                ["10 GB",     "53 min",     "13 min 40 s","2 min 44 s", "1 min 22 s", "8 sec"],
                ["100 GB",    "8 hr 53 m",  "2 hr 13 m",  "26 min 40 s","13 min 21 s","1 min 22 s"],
                ["1 TB",      "~3.7 days",  "~22.3 hrs",  "~4.5 hrs",   "~2.2 hrs",   "13 min 21 s"],
                ["10 TB",     "~37 days",   "~9.3 days",  "~44.7 hrs",  "~22.3 hrs",  "~2.2 hrs"],
              ].map(([size, t25, t100, t500, t1g, t10g]) => (
                <tr key={size} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{size}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{t25}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{t100}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{t500}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{t1g}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{t10g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mb-8">* Times assume 100% throughput. Real-world transfers are typically 70–85% of rated speed due to protocol overhead. Add 20–30% to these figures for practical planning.</p>

        {/* Streaming bitrates */}
        <h3 className="text-base font-semibold text-gray-700 mb-3">Streaming Bandwidth by Quality</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Quality</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Bitrate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">GB/Hour</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Min. Speed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">2 hrs/day × 30 days</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">4 hrs/day × 30 days</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["480p SD",    "~1.5 Mbps",  "0.7",  "2 Mbps",   "42 GB",    "84 GB"],
                ["720p HD",    "~3 Mbps",    "1.5",  "4 Mbps",   "90 GB",    "180 GB"],
                ["1080p FHD",  "~6 Mbps",    "3.0",  "8 Mbps",   "180 GB",   "360 GB"],
                ["2K QHD",     "~12 Mbps",   "6.0",  "15 Mbps",  "360 GB",   "720 GB"],
                ["4K UHD",     "~20 Mbps",   "10.0", "25 Mbps",  "600 GB",   "1,200 GB"],
                ["4K HDR",     "~25 Mbps",   "12.5", "30 Mbps",  "750 GB",   "1,500 GB"],
              ].map(([q, br, gbhr, speed, m2, m4]) => (
                <tr key={q} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary">{q}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{br}</td>
                  <td className="py-2.5 px-4 font-mono">{gbhr}</td>
                  <td className="py-2.5 px-4">{speed}</td>
                  <td className="py-2.5 px-4 font-mono">{m2}</td>
                  <td className="py-2.5 px-4 font-mono">{m4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">* Bitrates vary by codec (H.264, H.265/HEVC, AV1) and platform. H.265 uses roughly half the bitrate of H.264 at the same quality. Actual usage may differ from these averages.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is bandwidth and how is it measured?",
              a: "Bandwidth is the maximum rate at which data can be transmitted over a network connection in a given amount of time. It is measured in bits per second — Kbps (kilobits), Mbps (megabits), or Gbps (gigabits). Bandwidth is often confused with speed, but it is more accurately described as capacity: a wider pipe allows more data to flow simultaneously, but doesn't change how fast any individual packet travels (that's latency).",
            },
            {
              q: "How is file transfer time calculated?",
              a: "Transfer time equals the file size in bits divided by the connection speed in bits per second. For a 10 GB file at 100 Mbps: convert 10 GB to bits (10 × 8 × 1,073,741,824 = 85,899,345,920 bits), then divide by 100,000,000 bps = 858.99 seconds ≈ 14 minutes 19 seconds. The calculator handles all unit conversions automatically and adds no artificial overhead — apply a 20–30% real-world buffer yourself.",
            },
            {
              q: "How do I calculate monthly website bandwidth usage?",
              a: "Monthly bandwidth = monthly visitors × average page size in MB × average pages per session. For example, 100,000 visitors loading 5 MB per page across 3 pages each = 1,500,000 MB = 1,464 GB per month. To find your actual page size, open Chrome DevTools, go to the Network tab, disable cache, and hard-reload your page — the 'Transferred' total at the bottom is your real page weight.",
            },
            {
              q: "What is the difference between Mbps and MB/s?",
              a: "Mbps (megabits per second) is the unit ISPs use for connection speed. MB/s (megabytes per second) is the unit used for file sizes and download progress bars. Since 1 byte = 8 bits, 1 MB/s = 8 Mbps. A 100 Mbps connection downloads at approximately 12.5 MB/s — not 100 MB/s. This is the most common source of confusion when estimating transfer times.",
            },
            {
              q: "How much bandwidth does 4K streaming use per month?",
              a: "4K streaming uses approximately 20–25 Mbps per stream, or roughly 10–12.5 GB per hour. At 2 hours per day for 30 days, that equals 600–750 GB per month per 4K stream. A household with two simultaneous 4K streams can consume 1.2–1.5 TB per month from streaming alone, before accounting for web browsing, gaming, video calls, and file downloads.",
            },
            {
              q: "What does business bandwidth calculator mean, and what's different from home use?",
              a: "A business bandwidth calculator accounts for concurrent users, a peak usage factor, and mixed traffic types (video calls, file transfers, cloud backups, SaaS applications) simultaneously. Home use is mostly sequential — one person streams, then another browses. Business use is concurrent — dozens or hundreds of users are active simultaneously, which means you must multiply individual usage by the number of concurrent users and add headroom for peaks.",
            },
            {
              q: "What is a good bandwidth for a small business?",
              a: "For a 10–20 person office with standard cloud applications (email, Google Workspace, Zoom), a 100–200 Mbps symmetric business connection is typically sufficient. For 50+ employees or teams running video calls and large file transfers regularly, 500 Mbps to 1 Gbps is recommended. Use the Multi-User mode to calculate your specific requirement based on actual user count and usage patterns — generic benchmarks often miss the mark.",
            },
            {
              q: "Why is my actual download speed slower than my advertised bandwidth?",
              a: "Several factors reduce real-world throughput below advertised speeds: TCP protocol overhead consumes roughly 5% of bandwidth, TLS encryption adds 2–3%, ISP congestion during peak hours can reduce effective speeds by 20–50%, and Wi-Fi introduces additional latency and packet loss that further reduce sustained throughput. Test your actual speed at fast.com or speedtest.net and use the measured result — not the advertised speed — when calculating transfer times.",
            },
            {
              q: "How do I estimate bandwidth for a network with many users?",
              a: "Multiply the number of concurrent users by the per-user bandwidth requirement, then multiply by a peak usage factor (typically 0.70–0.80 for office environments). For example, 100 concurrent users each needing 5 Mbps at 75% peak utilization = 100 × 5 × 0.75 = 375 Mbps. Add 20–30% buffer for headroom, giving a recommended provisioned capacity of 450–490 Mbps. Use the Multi-User mode to model your exact scenario.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your file sizes, connection speeds, user counts, and any other values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔧", title: "Network Engineers", desc: "Size bandwidth pipes, model peak utilization, and plan capacity upgrades for enterprise LANs and WANs. The Multi-User mode maps directly to standard network capacity planning workflows." },
            { icon: "☁️", title: "Cloud Architects", desc: "Estimate data egress costs and transfer times for S3, Azure Blob, and GCS migrations. Calculate how long a multi-TB dataset move will take before committing to a maintenance window." },
            { icon: "🌐", title: "Website Owners & Developers", desc: "Choose the right hosting plan by translating visitor counts and page sizes into monthly GB. The growth slider shows exactly when current bandwidth will run out as traffic scales." },
            { icon: "📺", title: "Streamers & Households", desc: "Calculate monthly data usage for Netflix, YouTube, Twitch, and Disney+ at different quality settings. Find the streaming quality that keeps the household under an ISP data cap." },
            { icon: "⚙️", title: "DevOps & Platform Engineers", desc: "Size CI/CD artifact transfers, container registry pulls, and deployment pipelines. Understand whether a 200 Mbps office uplink can support 50 engineers pulling large Docker images simultaneously." },
            { icon: "🎓", title: "Networking Students", desc: "Practice bandwidth and transfer time calculations for CCNA, Network+, and CompTIA A+ certification exams. The formula breakdowns show exactly how each mode's calculation works step by step." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
