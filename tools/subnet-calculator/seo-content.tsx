export default function SubnetCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Subnet Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter IPv4 Address", "Type any valid IPv4 address (e.g. 192.168.1.10) in the input field."],
                ["Set CIDR Prefix", "Drag the slider or type a subnet mask (e.g. 255.255.255.0) to auto-convert."],
                ["View Results Instantly", "Network address, broadcast, host range and more update in real time."],
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
                "Real-time subnet calculations as you type",
                "CIDR ↔ subnet mask auto conversion",
                "Binary visualization of IP and mask",
                "Private / public / loopback IP detection",
                "Calculation history saved locally",
                "Export results as TXT or JSON",
                "Copy all results to clipboard",
                "Quick presets for common subnets",
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
          Example Subnet Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Input</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Network</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Broadcast</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Usable Hosts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["192.168.1.10 /24", "192.168.1.0", "192.168.1.255", "254"],
                ["10.0.0.50 /16", "10.0.0.0", "10.0.255.255", "65,534"],
                ["172.16.10.33 /27", "172.16.10.32", "172.16.10.63", "30"],
                ["10.10.0.1 /30", "10.10.0.0", "10.10.0.3", "2"],
                ["192.168.100.0 /8", "192.0.0.0", "192.255.255.255", "16,777,214"],
              ].map(([input, network, broadcast, hosts]) => (
                <tr key={input} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{input}</td>
                  <td className="py-2.5 px-4 font-mono">{network}</td>
                  <td className="py-2.5 px-4 font-mono">{broadcast}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary">{hosts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Subnet Mask Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CIDR</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Subnet Mask</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Addresses</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Usable Hosts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["/8", "255.0.0.0", "16,777,216", "16,777,214"],
                ["/16", "255.255.0.0", "65,536", "65,534"],
                ["/24", "255.255.255.0", "256", "254"],
                ["/25", "255.255.255.128", "128", "126"],
                ["/26", "255.255.255.192", "64", "62"],
                ["/27", "255.255.255.224", "32", "30"],
                ["/28", "255.255.255.240", "16", "14"],
                ["/29", "255.255.255.248", "8", "6"],
                ["/30", "255.255.255.252", "4", "2"],
              ].map(([cidr, mask, total, usable]) => (
                <tr key={cidr} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{cidr}</td>
                  <td className="py-2.5 px-4 font-mono">{mask}</td>
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
              q: "What is a subnet calculator?",
              a: "A subnet calculator is a tool that takes an IPv4 address and CIDR prefix and computes the network address, broadcast address, usable host range, subnet mask, wildcard mask, and number of hosts. It eliminates manual bitwise calculations for network engineers and students.",
            },
            {
              q: "What is CIDR notation?",
              a: "CIDR (Classless Inter-Domain Routing) notation represents an IP address and its associated network prefix. For example, 192.168.1.0/24 means the first 24 bits are the network portion, leaving 8 bits for host addresses (256 total, 254 usable).",
            },
            {
              q: "How is the network address calculated?",
              a: "The network address is computed by performing a bitwise AND between the IP address and the subnet mask. For 192.168.1.100 with mask 255.255.255.0, the result is 192.168.1.0.",
            },
            {
              q: "How many usable hosts are in a /24 subnet?",
              a: "A /24 subnet has 256 total addresses (2^8). Subtracting the network address and broadcast address gives 254 usable hosts.",
            },
            {
              q: "What is a wildcard mask?",
              a: "A wildcard mask is the inverse of the subnet mask. It's used in access control lists (ACLs) and routing protocols. For a /24 subnet mask of 255.255.255.0, the wildcard mask is 0.0.0.255.",
            },
            {
              q: "Who should use this tool?",
              a: "Network engineers, system administrators, DevOps engineers, cloud engineers, cybersecurity professionals, and students studying for CCNA, Network+, AWS, or Azure certifications.",
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
          Who Uses Subnet Calculators?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔧", title: "Network Engineers", desc: "Plan VLAN segmentation, IP addressing schemes, and route summarization for enterprise networks." },
            { icon: "☁️", title: "Cloud Engineers", desc: "Design VPC CIDR blocks, subnet splits, and security group rules for AWS, Azure, and GCP." },
            { icon: "🛡️", title: "Security Professionals", desc: "Configure firewall rules, ACLs, and network segmentation for zero-trust architecture." },
            { icon: "🎓", title: "Certification Learners", desc: "Practice subnetting for CCNA, Network+, and cloud certifications with instant feedback." },
            { icon: "⚙️", title: "System Admins", desc: "Manage DHCP pools, static IP assignments, and troubleshoot IP conflicts efficiently." },
            { icon: "🚀", title: "DevOps Engineers", desc: "Define infrastructure-as-code network configurations with precision and confidence." },
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
