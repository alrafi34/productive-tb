import ToolFaq from "@/components/ToolFaq";
import { bandwidthCalculatorConfig } from "./config";

export default function BandwidthCalculatorSEO() {
  const { howToSteps, faq } = bandwidthCalculatorConfig.seo;

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
            real-time results, exportable summaries, no signup required.
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
            {howToSteps.map(({ name: title, text: desc }, i) => (
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
                "Four modes: transfer time, website traffic, streaming usage, multi-user",
                "Automatic unit conversion (KB–TB, Kbps–Gbps)",
                "Plan recommendations for website traffic",
                "Traffic growth projection slider",
                "Quick presets for common scenarios",
                "Copy a summary or export TXT or JSON",
                "Your inputs are not collected or stored",
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

      {/* ── 4. Worked Examples ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Worked Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Sizing a Business Internet Plan",
              scenario: "An office manager is choosing between a 200 Mbps and a 500 Mbps business plan. The office has 80 employees averaging 3 Mbps each, with an 85% peak factor. Multi-User mode returns 204 Mbps at peak, so the 200 Mbps plan would already be full; the 500 Mbps plan leaves about 59% headroom.",
            },
            {
              title: "Overnight Backup to the Cloud",
              scenario: "A DevOps engineer needs to copy 2 TB of database backups over a 1 Gbps line. Transfer Time mode returns about 4 hours 53 minutes at full speed, so they book a 6-hour overnight window to leave room for protocol overhead and retries.",
            },
            {
              title: "Will the Site Outgrow Its Hosting Plan?",
              scenario: "A SaaS site gets 25,000 visitors a month, each viewing 4 pages of about 6 MB. Website Traffic mode returns about 586 GB a month, inside a 1 TB allowance. With the growth slider at 50% the forecast rises to about 879 GB, so the team plans the move to a larger plan before the next campaign.",
            },
            {
              title: "Staying Under a Home Data Cap",
              scenario: "A household has a 500 GB monthly cap and watches 4K video 2 hours a day. At the calculator's 10 GB per hour for 4K, Streaming mode returns 600 GB a month, over the cap. At 1080p it returns 180 GB, leaving 320 GB for everything else.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Reference Tables ── */}
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

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />
    </div>
  );
}
