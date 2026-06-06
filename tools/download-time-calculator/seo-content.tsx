export default function DownloadTimeCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How the Download Time Calculator Works</h2>
        <p>
          This tool estimates how long a file will take to download based on your internet connection speed and the size of the file.
          It converts file sizes (KB, MB, GB, TB) and connection speeds (Kbps, Mbps, Gbps) into a common unit — bits per second —
          then divides to produce an accurate duration.
        </p>
        <p className="mt-3">
          Because file sizes use bytes and internet speeds use bits, the calculator automatically handles the conversion.
          One byte equals 8 bits, so a 100 Mbps connection transfers at roughly 12.5 MB/s, not 100 MB/s.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Formula</h2>
        <p>
          The core formula is straightforward:
        </p>
        <pre className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Download Time (seconds) = (File Size in Bytes × 8) ÷ (Speed in bits/s × Efficiency)

Example: 5 GB at 50 Mbps with 90% efficiency
= (5 × 1,073,741,824 × 8) ÷ (50,000,000 × 0.90)
= 42,949,672,960 ÷ 45,000,000
≈ 954 seconds ≈ 15 minutes 54 seconds`}
        </pre>
        <p className="mt-3">
          The efficiency factor accounts for real-world conditions: protocol overhead, network congestion, WiFi interference,
          and server-side throttling. A 90% efficiency setting is a realistic estimate for most connections.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Download Scenarios</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">File Type</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Typical Size</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">50 Mbps</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">100 Mbps</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">300 Mbps</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["MP3 Song", "5 MB", "< 1 sec", "< 1 sec", "< 1 sec"],
                ["HD Movie", "4 GB", "~11 min", "~5 min", "~2 min"],
                ["Software Update", "1 GB", "~3 min", "~1.5 min", "30 sec"],
                ["AAA Video Game", "100 GB", "~4.5 hrs", "~2 hrs", "~45 min"],
                ["4K Movie", "50 GB", "~2 hrs", "~1 hr", "~22 min"],
                ["Linux ISO", "700 MB", "~2 min", "~1 min", "20 sec"],
              ].map(([type, size, t50, t100, t300]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-medium text-gray-800">{type}</td>
                  <td className="px-4 py-2.5 border border-gray-200">{size}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono">{t50}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono">{t100}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono">{t300}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">Times based on 90% efficiency (real-world conditions). 1 GB = 1,073,741,824 bytes.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Connection Efficiency</h2>
        <p>
          Your advertised internet speed (e.g. 100 Mbps) is rarely your actual download throughput.
          Real-world efficiency is reduced by:
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>TCP/IP protocol overhead (~3–5%)</li>
          <li>Network congestion and packet retransmission</li>
          <li>WiFi signal interference and shared bandwidth</li>
          <li>Server-side bandwidth caps and throttling</li>
          <li>ISP contention ratios during peak hours</li>
        </ul>
        <p className="mt-3">
          A setting of 90% is a good baseline for a typical wired connection. Use 80% for WiFi, and 70% for congested or
          mobile networks.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How long does it take to download 50 GB at 100 Mbps?",
              a: "At 100 Mbps with 90% efficiency, a 50 GB file takes approximately 1 hour 11 minutes. At full 100% theoretical speed it would take about 1 hour 4 minutes.",
            },
            {
              q: "Why is my download slower than the calculator predicts?",
              a: "Several factors reduce real-world speeds: the server you are downloading from may not support your full bandwidth, WiFi introduces overhead, and network congestion at peak hours can halve effective speeds. Use the efficiency slider to model these scenarios.",
            },
            {
              q: "What is the difference between Mbps and MB/s?",
              a: "Mbps (megabits per second) is the unit used for internet speed. MB/s (megabytes per second) is used for file transfer rates. Since 1 byte = 8 bits, a 100 Mbps connection transfers at ~12.5 MB/s.",
            },
            {
              q: "How do I calculate download time for a 100 GB game?",
              a: "Enter 100 in the File Size field, select GB, then enter your internet speed. At 100 Mbps with 90% efficiency, 100 GB takes roughly 2 hours 22 minutes.",
            },
            {
              q: "Does the calculator work for upload times too?",
              a: "Yes. The same formula applies for uploads. Enter the file size and your upstream speed (check with a speed test). Most ISPs provide significantly slower upload speeds than download speeds.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-gray-800 mb-1">{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
