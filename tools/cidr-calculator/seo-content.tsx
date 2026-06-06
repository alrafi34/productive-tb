export default function CidrCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the CIDR Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter IP/CIDR", "Type an IPv4 address with CIDR prefix (e.g. 192.168.1.1/24) in the input field, or switch to Manual mode to enter IP and subnet mask separately."],
                ["Adjust CIDR Prefix", "Use the slider or quick-select buttons (/8, /16, /24, /28…) to change the prefix length instantly."],
                ["View Instant Results", "Network address, broadcast, host range, wildcard mask, IP class, and more update in real time as you type."],
                ["Export or Copy", "Copy all results to clipboard, or download as TXT or JSON for documentation and infrastructure-as-code."],
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
                "Real-time CIDR calculation as you type",
                "CIDR notation and subnet mask input modes",
                "CIDR ↔ subnet mask auto-conversion",
                "Quick CIDR preset buttons (/8 to /32)",
                "CIDR prefix slider for fast adjustments",
                "Binary visualization of IP, mask, and network",
                "Private / public / loopback / multicast detection",
                "IP class detection (A, B, C, D, E)",
                "Shareable URL with ip + cidr parameters",
                "Calculation history saved in browser",
                "Export results as TXT or JSON",
                "Copy full summary to clipboard",
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
          Example CIDR Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Input</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Network</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Broadcast</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Usable Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Usable Hosts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["192.168.1.1/24", "192.168.1.0", "192.168.1.255", "192.168.1.1 – 192.168.1.254", "254"],
                ["10.0.0.1/16", "10.0.0.0", "10.0.255.255", "10.0.0.1 – 10.0.255.254", "65,534"],
                ["172.16.50.10/28", "172.16.50.0", "172.16.50.15", "172.16.50.1 – 172.16.50.14", "14"],
                ["10.10.0.1/30", "10.10.0.0", "10.10.0.3", "10.10.0.1 – 10.10.0.2", "2"],
                ["8.8.8.8/24", "8.8.8.0", "8.8.8.255", "8.8.8.1 – 8.8.8.254", "254"],
              ].map(([input, network, broadcast, range, hosts]) => (
                <tr key={input} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{input}</td>
                  <td className="py-2.5 px-4 font-mono">{network}</td>
                  <td className="py-2.5 px-4 font-mono">{broadcast}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary">{hosts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          CIDR & Subnet Mask Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CIDR</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Subnet Mask</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Wildcard</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Addresses</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Usable Hosts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["/8", "255.0.0.0", "0.255.255.255", "16,777,216", "16,777,214"],
                ["/16", "255.255.0.0", "0.0.255.255", "65,536", "65,534"],
                ["/24", "255.255.255.0", "0.0.0.255", "256", "254"],
                ["/25", "255.255.255.128", "0.0.0.127", "128", "126"],
                ["/26", "255.255.255.192", "0.0.0.63", "64", "62"],
                ["/27", "255.255.255.224", "0.0.0.31", "32", "30"],
                ["/28", "255.255.255.240", "0.0.0.15", "16", "14"],
                ["/29", "255.255.255.248", "0.0.0.7", "8", "6"],
                ["/30", "255.255.255.252", "0.0.0.3", "4", "2"],
                ["/31", "255.255.255.254", "0.0.0.1", "2", "2 (P2P)"],
                ["/32", "255.255.255.255", "0.0.0.0", "1", "1 (host)"],
              ].map(([cidr, mask, wildcard, total, usable]) => (
                <tr key={cidr} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{cidr}</td>
                  <td className="py-2.5 px-4 font-mono">{mask}</td>
                  <td className="py-2.5 px-4 font-mono">{wildcard}</td>
                  <td className="py-2.5 px-4">{total}</td>
                  <td className="py-2.5 px-4 font-semibold">{usable}</td>
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
              q: "What is CIDR notation?",
              a: "CIDR (Classless Inter-Domain Routing) notation represents an IP address and its associated network prefix length. For example, 192.168.1.0/24 means the first 24 bits are the network portion and the remaining 8 bits identify hosts. CIDR replaced the older class-based (A/B/C) addressing system to allow flexible subnet allocation.",
            },
            {
              q: "How is the network address calculated?",
              a: "The network address is calculated by performing a bitwise AND between the IP address and the subnet mask. For 192.168.1.25/24, the subnet mask is 255.255.255.0 and the result is 192.168.1.0 — the base address of the subnet.",
            },
            {
              q: "What is the broadcast address?",
              a: "The broadcast address is the last IP in the subnet, calculated by performing a bitwise OR between the network address and the inverted subnet mask (wildcard mask). Any packet sent to the broadcast address reaches all hosts in the subnet.",
            },
            {
              q: "How many usable hosts does a /24 have?",
              a: "A /24 subnet has 256 total addresses (2^8). Two are reserved — the network address and broadcast address — leaving 254 usable host addresses. The formula is 2^(32 - CIDR) - 2 for any prefix from /1 to /30.",
            },
            {
              q: "What are /31 and /32 subnets used for?",
              a: "A /31 subnet contains exactly 2 addresses, both usable for point-to-point links between routers (RFC 3021). A /32 is a host route representing a single device — commonly used in loopback interfaces and static routes.",
            },
            {
              q: "What is a wildcard mask?",
              a: "The wildcard mask is the bitwise inverse of the subnet mask. It indicates which bits are 'free' (host bits). For /24 (mask 255.255.255.0), the wildcard is 0.0.0.255. Wildcard masks are used extensively in Cisco ACLs and OSPF network statements.",
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
          Who Uses CIDR Calculators?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔧", title: "Network Engineers", desc: "Plan IP addressing, VLAN segmentation, and route summarization for enterprise and carrier networks." },
            { icon: "☁️", title: "Cloud Engineers", desc: "Design VPC CIDR blocks, subnet splits, and security group rules for AWS, Azure, and GCP infrastructure." },
            { icon: "🛡️", title: "Security Professionals", desc: "Configure firewall ACLs, network segmentation, and zero-trust architecture using CIDR ranges." },
            { icon: "🎓", title: "Certification Students", desc: "Practice subnetting for CCNA, Network+, AWS Solutions Architect, and other networking certifications." },
            { icon: "⚙️", title: "DevOps Engineers", desc: "Define Terraform, CloudFormation, and Ansible network configurations with precise CIDR blocks." },
            { icon: "🚀", title: "System Administrators", desc: "Manage DHCP scopes, static IP assignments, and troubleshoot IP conflicts across server infrastructure." },
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
