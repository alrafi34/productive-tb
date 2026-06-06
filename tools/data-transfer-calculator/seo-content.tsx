export default function DataTransferCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Data Transfer Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter Data Size", "Type the size of the file or dataset you want to transfer (e.g. 100 GB, 5 TB) and choose the correct unit from the dropdown."],
                ["Set Transfer Speed", "Enter your internet or network speed. Use speed presets like WiFi, Fiber, or SSD for one-click setup. Choose Mbps, Gbps, or MB/s as needed."],
                ["Adjust Efficiency Loss", "Use the slider to simulate real-world overhead (protocol overhead, congestion). Default is 10%."],
                ["Read the Result", "The estimated transfer time updates instantly. Copy or export the full breakdown."],
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
                "Supports B, KB, MB, GB, TB, PB file sizes",
                "Supports Kbps, Mbps, Gbps, KB/s, MB/s, GB/s speeds",
                "Efficiency loss slider (0–50%) for real-world accuracy",
                "Speed presets: WiFi, Fiber, 5G, Cable, SSD, USB 3.0",
                "Size presets: 100 MB, 1 GB, 10 GB, 100 GB, 1 TB",
                "Full breakdown: seconds, minutes, hours, days",
                "Shareable URL with all parameters",
                "Calculation history saved in browser",
                "Export as TXT or JSON",
                "Copy full summary to clipboard",
                "Bits vs bytes hint to prevent common confusion",
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
          Example Transfer Time Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data Size</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Speed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Loss</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Transfer Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["4.5 GB", "20 Mbps", "0%", "~30 min"],
                ["100 GB", "100 Mbps", "10%", "~2h 39m"],
                ["100 GB", "1 Gbps", "10%", "~16m"],
                ["1 TB", "100 Mbps", "10%", "~27h 18m"],
                ["5 TB", "1 Gbps", "10%", "~11h 6m"],
                ["1 TB", "500 MB/s (SSD)", "5%", "~18m 19s"],
                ["10 GB", "50 Mbps (WiFi)", "15%", "~25m 52s"],
                ["500 MB", "300 Mbps (5G)", "10%", "~12s"],
              ].map(([size, spd, loss, time]) => (
                <tr key={`${size}-${spd}`} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{size}</td>
                  <td className="py-2.5 px-4 font-mono">{spd}</td>
                  <td className="py-2.5 px-4">{loss}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Connection Speeds Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Connection Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Speed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Real Throughput</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">1 GB Transfer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["DSL", "10–25 Mbps", "~1–3 MB/s", "~5–10 min"],
                ["Cable", "100–500 Mbps", "~12–62 MB/s", "~15s – 1.5min"],
                ["Fiber (Home)", "1 Gbps", "~125 MB/s", "~8s"],
                ["WiFi 5 (802.11ac)", "50–200 Mbps", "~6–25 MB/s", "~40s – 3min"],
                ["5G Mobile", "100–1000 Mbps", "~12–125 MB/s", "~8s – 1.5min"],
                ["USB 3.0", "5 Gbps", "~500 MB/s", "~2s"],
                ["Internal SSD (NVMe)", "3,500 MB/s", "~3.5 GB/s", "<1s"],
                ["Enterprise 10 GbE", "10 Gbps", "~1.25 GB/s", "<1s"],
              ].map(([conn, speed, throughput, time]) => (
                <tr key={conn} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary">{conn}</td>
                  <td className="py-2.5 px-4 font-mono">{speed}</td>
                  <td className="py-2.5 px-4">{throughput}</td>
                  <td className="py-2.5 px-4 font-semibold">{time}</td>
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
              a: "Transfer Time = Data Size (bits) ÷ Effective Speed (bps). The effective speed is your stated speed reduced by the efficiency loss percentage to simulate real-world conditions like TCP overhead, retransmissions, and network congestion.",
            },
            {
              q: "What is efficiency loss and why does it matter?",
              a: "Theoretical speed is rarely achieved in practice. Protocol overhead (TCP/IP headers), packet retransmissions, network congestion, server throttling, and hardware limitations typically reduce real throughput by 5–20%. The default 10% loss gives a realistic estimate.",
            },
            {
              q: "Why is Mbps different from MB/s?",
              a: "Mbps means megabits per second; MB/s means megabytes per second. Since 1 byte = 8 bits, a 100 Mbps connection transfers at approximately 12.5 MB/s. ISPs advertise in Mbps; file sizes are measured in MB/GB. This calculator converts everything automatically.",
            },
            {
              q: "What is the difference between KB and Kbps?",
              a: "KB (kilobytes) is a storage unit for file sizes using binary multiples (1 KB = 1,024 bytes). Kbps (kilobits per second) is a network speed unit using decimal multiples (1 Kbps = 1,000 bits/s). The calculator handles both correctly.",
            },
            {
              q: "Can I use this for cloud backup time estimates?",
              a: "Yes. Select 'Cloud Backup' as the transfer type, enter your backup size (e.g. 2 TB), and set your upload speed (typically much slower than download). Increase the efficiency loss to 15–25% to account for cloud storage API overhead.",
            },
            {
              q: "Why does the URL update automatically?",
              a: "The calculator encodes your inputs into the browser URL so you can bookmark or share a specific calculation. Anyone opening the link will see the same pre-filled values.",
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
          Who Uses a Data Transfer Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "☁️", title: "Cloud Engineers", desc: "Estimate S3, Azure Blob, or GCS upload durations for large datasets before kicking off migrations." },
            { icon: "🎬", title: "Video Editors", desc: "Plan upload times for raw footage or rendered files to frame.io, Dropbox, or YouTube before deadlines." },
            { icon: "🔧", title: "System Admins", desc: "Calculate backup windows, disaster recovery RTO timelines, and storage migration schedules." },
            { icon: "🎮", title: "Gamers", desc: "Estimate game download and update times before events or tournaments." },
            { icon: "⚙️", title: "DevOps Engineers", desc: "Size CI/CD artifact transfers, Docker image pulls, and deployment package upload durations." },
            { icon: "🎓", title: "Students & Researchers", desc: "Estimate dataset download times for machine learning projects and research data transfers." },
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
