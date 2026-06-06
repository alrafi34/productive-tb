export default function LatencyCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How the Latency Calculator Works</h2>
        <p>
          This tool calculates estimated network latency based on the physical distance between two points, the transmission
          medium, available bandwidth, and packet size. The three main components of end-to-end delay are propagation delay,
          transmission delay, and routing overhead.
        </p>
        <p className="mt-3">
          All calculations run locally in your browser using standard networking formulas. No data is sent to any server.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Formulas</h2>
        <pre className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Propagation Delay (ms) = (Distance in km ÷ Signal Speed in km/s) × 1000

Transmission Delay (ms) = (Packet Size in bits ÷ Bandwidth in bps) × 1000

Round Trip Time (RTT)   = One-Way Total Latency × 2

Total Latency           = Propagation + Transmission + Routing Overhead

Example: 5,000 km at 100 Mbps, fiber, 1500 byte packet, 20% overhead
  Propagation:    5000 ÷ 200,000 × 1000  = 25 ms
  Transmission:   12000 ÷ 100,000,000 × 1000 = 0.12 ms
  Routing (20%):  25 × 0.20              = 5 ms
  Total:          25 + 0.12 + 5          = 30.12 ms
  RTT:            30.12 × 2              = 60.24 ms`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Signal Speeds by Medium</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Medium</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Speed</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Fiber Optic", "~200,000 km/s", "~2/3 speed of light in glass fiber"],
                ["Copper Cable", "~180,000 km/s", "Slightly slower due to electrical resistance"],
                ["Satellite", "~120,000 km/s (eff.)", "Geostationary orbit adds 35,786 km each way"],
                ["Wireless / WiFi", "~160,000 km/s", "Variable — affected by interference and walls"],
                ["Cellular (4G/5G)", "~140,000 km/s", "Includes tower aggregation overhead"],
              ].map(([medium, speed, notes]) => (
                <tr key={medium} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-medium text-gray-800">{medium}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono">{speed}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Latency Performance Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Latency</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Rating</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["< 20 ms", "Excellent", "High-frequency trading, real-time control systems"],
                ["20–50 ms", "Good", "Competitive gaming, video calls, live streaming"],
                ["50–100 ms", "Moderate", "Casual gaming, VoIP, web browsing"],
                ["100–200 ms", "Poor", "Basic web browsing, email — noticeable delay in calls"],
                ["> 200 ms", "Very High", "Satellite links, degraded user experience"],
              ].map(([latency, rating, use]) => (
                <tr key={latency} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-mono font-semibold text-gray-900">{latency}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-medium">{rating}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What is propagation delay?",
              a: "Propagation delay is the time it takes for a signal to travel from the sender to the receiver across a physical medium. It depends purely on distance and the signal speed of the medium — not on bandwidth.",
            },
            {
              q: "What is transmission delay?",
              a: "Transmission delay is the time required to push all bits of a packet onto the wire. It depends on packet size and bandwidth: a larger packet or a slower link increases this delay.",
            },
            {
              q: "What is RTT (round-trip time)?",
              a: "RTT is the total time for a signal to travel from source to destination and back. It is approximately twice the one-way latency and is what tools like 'ping' measure.",
            },
            {
              q: "Why is satellite latency so high?",
              a: "Geostationary satellites orbit at ~35,786 km above Earth. A signal must travel up to the satellite and back down, adding roughly 240 ms of propagation delay each way — before any processing or routing time.",
            },
            {
              q: "What causes gaming lag?",
              a: "Gaming lag is caused by a combination of propagation delay (distance to server), transmission delay (packet size vs bandwidth), routing overhead (number of network hops), and server processing time. This calculator estimates the network component.",
            },
            {
              q: "How does routing overhead affect latency?",
              a: "Real-world packets don't travel in straight lines. They pass through multiple routers, cross different ISP networks, and can experience congestion. The routing overhead slider simulates this additional delay as a percentage of propagation delay.",
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
