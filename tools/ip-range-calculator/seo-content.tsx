export default function IpRangeCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the IP Range Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter IPv4 Address", "Type any valid IPv4 address (e.g. 192.168.1.10) in the input field."],
                ["Set CIDR or Subnet Mask", "Use the CIDR slider or enter a subnet mask — they auto-convert each other."],
                ["View Instant Results", "Network address, broadcast, host range, IP class, and more update in real time."],
                ["Export or Copy", "Copy all results to clipboard, or export as TXT or JSON for documentation."],
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
                "Real-time IP range calculations as you type",
                "CIDR ↔ subnet mask auto conversion",
                "Binary visualization of IP, mask, and network",
                "Private / public / loopback / multicast detection",
                "IP class detection (A, B, C, D, E)",
                "Shareable URL with ip + cidr parameters",
                "Calculation history saved in browser",
                "Export results as TXT or JSON",
                "Copy full summary to clipboard",
                "Quick preset buttons for common networks",
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
          Example IP Range Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Input</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Network</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Broadcast</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Host Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Usable Hosts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["192.168.1.10 /24", "192.168.1.0", "192.168.1.255", "192.168.1.1 – 192.168.1.254", "254"],
                ["10.0.0.50 /16", "10.0.0.0", "10.0.255.255", "10.0.0.1 – 10.0.255.254", "65,534"],
                ["172.16.5.100 /26", "172.16.5.64", "172.16.5.127", "172.16.5.65 – 172.16.5.126", "62"],
                ["10.10.0.1 /30", "10.10.0.0", "10.10.0.3", "10.10.0.1 – 10.10.0.2", "2"],
                ["192.168.100.0 /8", "192.0.0.0", "192.255.255.255", "192.0.0.1 – 192.255.255.254", "16,777,214"],
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
              q: "What is an IP range calculator?",
              a: "An IP range calculator takes an IPv4 address and CIDR prefix (or subnet mask) and computes the full network information: network address, broadcast address, usable host range, total hosts, subnet mask, wildcard mask, and IP class. It eliminates manual binary math for network engineers and students.",
            },
            {
              q: "How is the host range calculated?",
              a: "The network address is the first address in the subnet (IP AND mask), the broadcast is the last (network OR inverted mask). Usable hosts are all addresses between them (first host = network + 1, last host = broadcast - 1). A /24 gives 254 usable hosts out of 256 total.",
            },
            {
              q: "What is the wildcard mask?",
              a: "The wildcard mask is the bitwise inverse of the subnet mask. It's used in ACLs and routing protocols. For a /24 subnet (255.255.255.0), the wildcard mask is 0.0.0.255.",
            },
            {
              q: "What does CIDR mean?",
              a: "CIDR (Classless Inter-Domain Routing) notation represents an IP address and its associated network prefix. For example, 192.168.1.0/24 means the first 24 bits are network bits, leaving 8 bits for host addresses.",
            },
            {
              q: "How are /31 and /32 subnets handled?",
              a: "A /31 subnet has 2 addresses, both usable for point-to-point links (RFC 3021). A /32 is a host route with a single address. This calculator handles both cases correctly.",
            },
            {
              q: "How does the shareable URL work?",
              a: "The calculator automatically updates the browser URL with ?ip=x.x.x.x&cidr=xx as you type. You can copy and share this URL to pre-fill the calculator for anyone.",
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
          Who Uses IP Range Calculators?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔧", title: "Network Engineers", desc: "Plan IP addressing schemes, VLAN segmentation, and route summarization for enterprise networks." },
            { icon: "☁️", title: "Cloud Engineers", desc: "Design VPC CIDR blocks, subnet splits, and security group rules for AWS, Azure, and GCP." },
            { icon: "🛡️", title: "Security Professionals", desc: "Configure firewall ACLs, network segmentation, and zero-trust architecture with precision." },
            { icon: "🎓", title: "Certification Learners", desc: "Practice subnetting for CCNA, Network+, and cloud certifications with instant feedback." },
            { icon: "⚙️", title: "System Admins", desc: "Manage DHCP pools, static IP assignments, and troubleshoot IP conflicts efficiently." },
            { icon: "🚀", title: "DevOps Engineers", desc: "Define infrastructure-as-code network configurations with Terraform, Ansible, and CloudFormation." },
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
