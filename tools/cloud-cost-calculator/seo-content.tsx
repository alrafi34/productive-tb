export default function CloudCostCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Cloud Cost Estimation Works</h2>
        <p>
          Cloud providers charge for compute, storage, networking, and managed services separately.
          This calculator combines all those line items into a single monthly estimate so you can
          budget infrastructure before committing to a provider or writing a single line of code.
        </p>
        <p className="mt-3">
          Prices in this tool are representative on-demand rates. Reserved instances, committed-use
          discounts, and free-tier allowances can reduce actual bills by 30–70%, so treat estimates
          as upper-bound planning figures rather than exact invoices.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cost Formulas</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Compute   = (vCPU × cpu_price + RAM_GB × ram_price) × servers × (hours / 730) × region_mul
Storage   = block_GB × block_price × servers × region_mul
Object    = object_GB × object_price × region_mul
Database  = db_base_price × region_mul
Bandwidth = egress_GB × bw_price × region_mul
Serverless= (executions / 1,000,000) × per_million_price
CDN       = (requests / 10,000,000) × per_10M_price

Monthly Total = Compute + Storage + Object + Database + Bandwidth + Serverless + CDN
Yearly Total  = Monthly Total × 12
Hourly Rate   = Monthly Total / runtime_hours`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Provider Comparison Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Provider</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Best For</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Pricing Model</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["AWS", "Enterprise, global reach, widest service catalog", "On-demand, reserved, spot"],
                ["Google Cloud", "Data analytics, ML/AI workloads, Kubernetes", "On-demand, committed-use, preemptible"],
                ["Azure", "Microsoft-heavy enterprise, hybrid cloud", "Pay-as-you-go, reserved, spot"],
                ["DigitalOcean", "Developer-friendly, small to mid-size apps", "Predictable flat-rate droplets"],
                ["Cloudflare", "CDN, edge compute, DNS, Workers", "Generous free tier, flat pro plans"],
                ["Vercel", "Next.js, JAMstack, serverless front-ends", "Per-invocation + bandwidth overages"],
                ["Railway", "Full-stack apps, fast deploys", "Usage-based, credit system"],
                ["Fly.io", "Global edge deployment, containers", "Per-second compute billing"],
                ["Render", "Web services, background workers, DBs", "Per-service monthly pricing"],
              ].map(([provider, use, model]) => (
                <tr key={provider} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-semibold text-gray-800">{provider}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{use}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choosing the Right Cloud Provider</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Personal projects & prototypes</h3>
            <p>
              Vercel, Railway, Render, and Fly.io all have free tiers that can host a simple app at
              zero cost. DigitalOcean's $4–$6/month droplets are the cheapest paid option for
              always-on servers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Startups ($50–$500/month)</h3>
            <p>
              DigitalOcean, Render, and Fly.io typically offer 30–50% lower compute costs than
              AWS/GCP/Azure at this scale. Use managed databases only if operational overhead
              outweighs the price premium.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Scale-ups ($500–$5,000/month)</h3>
            <p>
              AWS, GCP, and Azure become competitive once you commit to 1- or 3-year reserved
              instances. Savings of 40–60% over on-demand rates are typical. At this point,
              infrastructure-as-code and cost monitoring tools (AWS Cost Explorer, GCP Billing)
              pay for themselves.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Enterprise ($5,000+/month)</h3>
            <p>
              Negotiate enterprise discount agreements directly with cloud vendors. A multi-cloud
              strategy using the cheapest provider per workload type can save 20–40% at scale.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Cost Optimization Tips</h2>
        <div className="space-y-3">
          {[
            ["Right-size instances", "Most teams over-provision by 2–3×. Profile actual CPU/memory usage and downsize to the next smaller tier."],
            ["Use spot / preemptible instances", "60–90% cheaper for batch, CI/CD, and fault-tolerant workloads. Not suitable for stateful services without checkpointing."],
            ["Reserved / committed-use pricing", "1-year commitments save 30–40%; 3-year save up to 60%. Only commit to baseline capacity you are certain to use."],
            ["Reduce egress costs", "Bandwidth egress is one of the largest surprise bills. Keep data processing within the same region and use a CDN to serve static assets instead of direct server egress."],
            ["Auto-scaling + scale-to-zero", "Serverless and scale-to-zero containers eliminate idle compute costs for variable traffic workloads."],
            ["Storage tiering", "Move infrequently accessed data to cheaper tiers (S3 Glacier, GCS Nearline) — 70–80% cheaper than hot storage."],
          ].map(([title, desc]) => (
            <div key={title as string}>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How accurate are these estimates?",
              a: "The estimates use representative on-demand pricing and are accurate to within 20–30% for most configurations. Actual bills vary based on reserved pricing, free-tier usage, data transfer direction (intra-region is usually free), support plan costs, and premium services like load balancers, NAT gateways, and monitoring.",
            },
            {
              q: "Why is AWS often more expensive in the comparison?",
              a: "AWS on-demand rates are among the highest in the industry. Their value comes from breadth of services, global availability zones, compliance certifications, and mature tooling — not lowest price. At scale with reserved pricing, the gap narrows significantly.",
            },
            {
              q: "What is data egress and why does it cost so much?",
              a: "Egress is data leaving the cloud provider's network to the internet or another provider. Major providers charge $0.08–$0.09/GB for internet egress. For read-heavy applications this can exceed compute costs. CDNs and DigitalOcean's generous bandwidth allowances are popular ways to reduce this.",
            },
            {
              q: "Does this tool include free tier costs?",
              a: "No — free tiers are excluded to give a realistic baseline. AWS offers 750 hours/month of t2.micro, GCP gives $300 credit for 90 days, and most platforms offer some free allowance. Subtract those from the estimate manually for your first year.",
            },
            {
              q: "What is the difference between object storage and block storage?",
              a: "Block storage (EBS, Persistent Disks) is attached directly to a server like an SSD — fast, low-latency, used for OS and databases. Object storage (S3, GCS, R2) is accessed over HTTP — cheaper, unlimited scale, used for files, backups, media, and static assets.",
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
