import React from "react";

export default function CloudCostCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* ── 1. Introduction ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Cloud Cost Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>cloud cost calculator</strong> is a free online tool that estimates monthly
            infrastructure spending across cloud providers — AWS, Google Cloud, Azure, DigitalOcean,
            Vercel, Railway, Fly.io, and more — before you provision a single resource. It answers the
            question every engineering team faces at architecture review:{" "}
            <em>how much will this infrastructure actually cost per month?</em>
          </p>
          <p>
            Cloud pricing is deliberately complex. Compute, storage, database, bandwidth, serverless
            invocations, and CDN requests are each billed separately, with different rates per region
            and dramatic differences between on-demand and reserved pricing. A startup that skips cost
            estimation often hits a $4,000 AWS bill where they expected $800 — because they forgot
            data egress, left an oversized instance running, or didn't account for database I/O costs.
          </p>
          <p>
            This <strong>cloud pricing calculator</strong> is built for <strong>startup founders
            planning infrastructure budgets, engineers designing new services, DevOps teams right-sizing
            existing deployments, CTOs comparing provider costs before migration, and students learning
            cloud architecture and cost optimization</strong>. Covers compute, storage, object storage,
            managed database, bandwidth, serverless, and CDN line items. Compare up to 9 providers
            side by side. Browser-based, free, no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Cloud Cost Estimation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Cloud providers charge for each resource category independently. The calculator sums all
            line items into a single monthly total using representative on-demand rates, then applies a
            regional multiplier to account for price differences between AWS us-east-1 and ap-southeast-1.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Cost Formulas</p>
            <div className="space-y-1.5 font-mono text-xs text-gray-900">
              <p><span className="font-semibold">Compute</span>   = (vCPU × cpu_price + RAM_GB × ram_price) × servers × (hours ÷ 730) × region_mul</p>
              <p><span className="font-semibold">Block Storage</span> = block_GB × block_price × servers × region_mul</p>
              <p><span className="font-semibold">Object Storage</span> = object_GB × object_price × region_mul</p>
              <p><span className="font-semibold">Database</span>  = db_base_price × region_mul</p>
              <p><span className="font-semibold">Bandwidth</span> = egress_GB × bw_price × region_mul</p>
              <p><span className="font-semibold">Serverless</span> = (executions ÷ 1,000,000) × per_million_price</p>
              <p><span className="font-semibold">CDN</span>       = (requests ÷ 10,000,000) × per_10M_price</p>
              <p className="pt-1 border-t border-gray-200 font-semibold">Monthly Total = sum of all line items above</p>
            </div>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li>• <strong>On-demand rates</strong> — estimates use public list prices. Reserved/committed-use discounts (30–60%) are not applied by default — treat results as upper-bound planning figures.</li>
            <li>• <strong>Regional multiplier</strong> — US regions are baseline (1.0×). Asian and South American regions run 10–30% higher due to lower demand density.</li>
            <li>• <strong>Egress vs ingress</strong> — inbound data (ingress) is free on all major providers. Outbound (egress) to the internet is billed at $0.08–$0.09/GB on AWS/GCP/Azure.</li>
            <li>• <strong>Free tier exclusion</strong> — free tier allowances are not subtracted. Subtract them manually for first-year estimates.</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Cloud Cost Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ol className="space-y-5 text-gray-600">
            {[
              ["Select a Provider", "Choose your target cloud provider from the dropdown — AWS, Google Cloud, Azure, DigitalOcean, Vercel, Railway, Fly.io, Render, or Cloudflare. The pricing rates update automatically to match that provider's public list prices. Switch providers at any point to compare costs without re-entering your configuration."],
              ["Configure Compute", "Enter your server count, vCPU count, RAM in GB, and expected monthly runtime hours. For a single always-on server use 730 hours (full month). For dev environments or scheduled workloads, enter the actual expected runtime to avoid overestimating."],
              ["Add Storage, Database, and Bandwidth", "Enter block storage GB attached to your servers, object storage GB (S3/GCS/R2) for files and backups, managed database tier if applicable, and expected monthly egress GB. Egress is outbound data — the volume your users download from your servers each month."],
              ["Add Serverless and CDN (if applicable)", "If your architecture uses serverless functions (Lambda, Cloud Functions, Workers), enter expected monthly invocations. For CDN, enter expected monthly request volume. Both are billed separately from compute and can be significant at scale."],
              ["Read the Breakdown and Compare Providers", "The cost breakdown shows each line item separately so you can see exactly where the budget goes. Switch to a different provider to compare the same configuration — the breakdown updates instantly, letting you identify which provider is cheapest for your specific workload mix."],
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
                "9 providers: AWS, GCP, Azure, DigitalOcean, Vercel, Railway, Fly.io, Render, Cloudflare",
                "7 cost categories: compute, block, object, DB, bandwidth, serverless, CDN",
                "Per-item line breakdown",
                "Regional pricing multipliers",
                "Monthly, yearly, and hourly rate outputs",
                "Switch providers without re-entering config",
                "Browser-based — no signup required",
                "All estimates use public on-demand rates",
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
              title: "Startup Infrastructure Budget (AWS vs DigitalOcean)",
              scenario: "A 3-person startup is choosing between AWS and DigitalOcean for their MVP. Their config: 2 servers, 2 vCPU, 4 GB RAM, 100 GB block storage, 50 GB object storage, 200 GB egress. AWS on-demand returns ~$180/month. DigitalOcean returns ~$74/month — 59% cheaper. They ship on DigitalOcean and plan to evaluate AWS reserved pricing at Series A when 1-year commitments make sense.",
            },
            {
              title: "Cloud Migration Cost Estimate (AWS → GCP)",
              scenario: "A CTO is evaluating migrating a production workload from AWS to GCP to take advantage of GCP's committed-use discounts and BigQuery for analytics. Current AWS spend is $3,200/month on-demand. Entering the same config in GCP returns $2,850/month on-demand — a modest saving. But with a 1-year committed-use discount (30%), GCP drops to ~$2,000/month, saving $14,400 per year. The migration is approved.",
            },
            {
              title: "Serverless vs Always-On Cost Comparison",
              scenario: "An engineer is deciding between a $50/month always-on Fly.io server and serverless on AWS Lambda for an API handling 8 million requests/month. The Lambda estimate: 8M invocations × $0.20/million = $1.60 for invocations, plus compute time. Total Lambda cost comes to $4.20/month — 88% cheaper than the always-on server. They migrate the stateless API endpoints to Lambda and keep only the stateful worker on Fly.io.",
            },
            {
              title: "Egress Cost Shock Prevention",
              scenario: "A developer builds a video platform and budgets $200/month for AWS. They forget to account for egress. With 50,000 monthly users each downloading 400 MB of video, egress is 20 TB/month. At AWS's $0.085/GB rate, that's $1,700/month in bandwidth alone — $1,500 more than their total budget. The calculator flags this before launch. They switch video delivery to Cloudflare Stream, which includes bandwidth in the plan.",
            },
            {
              title: "DevOps Right-Sizing Exercise",
              scenario: "A DevOps engineer suspects their company is over-provisioned. Current setup: 6 servers at 8 vCPU / 32 GB RAM each on AWS ($1,890/month). Profiling shows average CPU utilization of 12% and memory at 18%. They model a right-sized config: 6 servers at 4 vCPU / 16 GB RAM. The calculator returns $945/month — exactly 50% less. They downsize and save $11,340/year with no performance impact.",
            },
            {
              title: "SaaS Pricing Model Validation",
              scenario: "A founder is building a $29/month SaaS product and needs to verify the unit economics. At 100 customers, infrastructure config (2 servers, managed DB, 500 GB object storage, 1 TB egress) comes to $420/month on AWS. Monthly revenue is $2,900. Infrastructure as a percentage of revenue is 14.5% — within the healthy 15–25% range for early-stage SaaS. The founder validates the pricing model before launch.",
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
                ["Add 20–30% buffer to every estimate", "On-demand estimates exclude hidden costs that appear on real invoices: load balancer hourly fees (~$16–$18/month on AWS), NAT gateway data processing, DNS query charges, monitoring and logging ingestion (CloudWatch, Stackdriver), and support plan costs. A 20–30% buffer covers most of these surprises."],
                ["Model reserved pricing separately for committed workloads", "The calculator shows on-demand rates. For any workload you know will run continuously for 12+ months, apply a 30–40% reduction for 1-year reserved instances (AWS) or committed-use discounts (GCP) on top of the on-demand estimate. 3-year commitments save up to 60%."],
                ["Enter egress before finalising provider choice", "Bandwidth egress is the most commonly forgotten line item and the most expensive at scale. AWS and GCP charge $0.085/GB for internet egress. A video or file-heavy application can accumulate more in bandwidth than compute. Enter your estimated egress GB first — it often changes the provider comparison significantly."],
                ["Use DigitalOcean and Render for predictable flat-rate billing", "For startups where billing surprises are costly, DigitalOcean Droplets and Render services use flat monthly pricing per instance rather than per-second metered billing. The cost estimate is exactly what you pay — no egress surprises, no per-request overages at the DigitalOcean tier."],
                ["Model Vercel and Railway separately from compute", "Vercel and Railway bill differently from IaaS providers — they charge per invocation and per bandwidth overage above a plan threshold. Enter your expected monthly function invocations and traffic volume to see whether a Pro plan upgrade is cheaper than overage charges at your usage level."],
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
                ["Forgetting egress entirely", "The single most common cause of 'my bill was 3× what I expected'. Inbound data is free. Outbound data to the internet is not. Every file download, API response, and video stream contributes to egress. Estimate your users' monthly download volume — not just server-to-server traffic — and include it in every estimate."],
                ["Comparing on-demand AWS to reserved GCP or Azure", "If a competitor quotes a GCP price that looks 40% cheaper than your AWS estimate, check whether they applied committed-use pricing to GCP while using on-demand for AWS. The comparison is only valid if both use the same pricing tier. Use this calculator to set both to on-demand rates first, then apply discounts equally."],
                ["Sizing for peak, not average", "Provisioning for peak load on always-on instances when traffic is variable leads to massive over-provisioning. Consider auto-scaling groups or serverless for variable workloads — the calculator lets you model both scenarios so you can compare the monthly cost of always-on vs scale-to-zero."],
                ["Ignoring managed service premiums", "A managed RDS PostgreSQL instance on AWS costs 2–4× more than running PostgreSQL on an EC2 instance of the same size. The premium buys automated backups, failover, and patching. Whether that's worth it is a business decision — but the cost differential should be explicit, not assumed.",
                ],
                ["Using list price as the final budget number", "Cloud costs are negotiable at scale. AWS, GCP, and Azure all offer enterprise discount programs (EDP/CUD) for customers spending $100K+/year. At that scale, the list-price estimate in this calculator can overstate actual costs by 20–40%. Use it for planning; negotiate the actual rate."],
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

      {/* ── 6. Provider Comparison Table ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Cloud Provider Comparison
        </h2>

        <h3 className="text-base font-semibold text-gray-700 mb-3">Provider Overview</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Provider</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Best For</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Pricing Model</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Egress Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["AWS",          "Enterprise, global reach, widest service catalog", "On-demand, reserved, spot",           "$0.085–$0.09/GB"],
                ["Google Cloud", "Data analytics, ML/AI workloads, Kubernetes",      "On-demand, committed-use, preemptible","$0.085–$0.08/GB"],
                ["Azure",        "Microsoft-heavy enterprise, hybrid cloud",          "Pay-as-you-go, reserved, spot",       "$0.087/GB"],
                ["DigitalOcean", "Developers, small-to-mid apps, flat pricing",       "Predictable flat-rate droplets",       "1–3 TB included/month"],
                ["Cloudflare",   "CDN, edge compute, DNS, Workers",                   "Generous free tier, flat pro plans",   "Included on Workers plans"],
                ["Vercel",       "Next.js, JAMstack, serverless front-ends",          "Per-invocation + bandwidth overages",  "100 GB included (Pro)"],
                ["Railway",      "Full-stack apps, fast deploys",                     "Usage-based, credit system",           "Metered per GB"],
                ["Fly.io",       "Global edge deployment, containers",                "Per-second compute billing",           "Metered per GB"],
                ["Render",       "Web services, background workers, DBs",             "Per-service monthly pricing",          "100 GB included/month"],
              ].map(([provider, use, model, egress]) => (
                <tr key={provider} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-primary">{provider}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{use}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{model}</td>
                  <td className="py-3 px-4 font-mono text-xs">{egress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-gray-700 mb-3">Cost by Budget Scale</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Scale</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Monthly Budget</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Recommended Providers</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Key Consideration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Personal / Prototype", "$0–$20",       "Vercel, Railway, Render (free tier)", "Free tier limits — check function invocation caps"],
                ["Early Startup",        "$20–$200",     "DigitalOcean, Fly.io, Render",        "Flat-rate billing avoids invoice surprises"],
                ["Growing Startup",      "$200–$1,000",  "DigitalOcean, AWS (on-demand)",       "Managed DB premium vs self-hosted tradeoff"],
                ["Scale-up",             "$1,000–$5,000","AWS, GCP, Azure (reserved)",          "1-year reserved instances cut compute 30–40%"],
                ["Enterprise",           "$5,000+",      "AWS, GCP, Azure (EDP/CUD)",           "Negotiate enterprise discount programs directly"],
              ].map(([scale, budget, providers, note]) => (
                <tr key={scale} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary">{scale}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{budget}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-600">{providers}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-500">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">* Pricing benchmarks are approximate on-demand rates as of mid-2026. Actual pricing varies by region, usage tier, and negotiated discounts.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a cloud cost calculator?",
              a: "A cloud cost calculator is a free online tool that estimates monthly infrastructure spending across cloud providers based on your configuration — server count, CPU, RAM, storage, database, bandwidth, serverless invocations, and CDN requests. It lets you model costs before provisioning resources, compare providers side by side, and validate infrastructure budgets against revenue projections or funding constraints.",
            },
            {
              q: "How accurate are the estimates?",
              a: "Estimates use representative on-demand list prices and are accurate to within 20–30% for most standard configurations. Actual invoices vary based on reserved or committed-use pricing (which reduces costs 30–60%), free-tier allowances, intra-region data transfer (usually free), support plan costs, premium services like load balancers and NAT gateways, and negotiated enterprise discount agreements. Add a 20–30% buffer to every estimate for planning purposes.",
            },
            {
              q: "What is data egress and why does it cost so much?",
              a: "Egress is data leaving the cloud provider's network to the internet or to another provider. Major providers charge $0.085–$0.09/GB for internet egress. For a video platform serving 50,000 users each downloading 400 MB per month, egress alone is 20 TB × $0.085 = $1,700/month. Egress is the most commonly underestimated line item in cloud budgets. DigitalOcean includes 1–3 TB/month per droplet; Cloudflare Workers includes egress in the plan.",
            },
            {
              q: "What is the difference between block storage and object storage?",
              a: "Block storage (EBS on AWS, Persistent Disks on GCP) attaches directly to a server like an SSD — fast, low-latency, used for operating systems and databases. Object storage (S3, GCS, R2) is accessed over HTTP — much cheaper per GB, unlimited scale, used for files, backups, media assets, and static content. Block storage costs $0.08–$0.12/GB/month; object storage costs $0.02–$0.023/GB/month.",
            },
            {
              q: "Why is AWS often more expensive than DigitalOcean or Render?",
              a: "AWS on-demand rates are among the highest in the industry because you pay for the breadth of services, global availability zones, compliance certifications, and mature tooling — not lowest price. DigitalOcean and Render offer simpler, flatter pricing models that are 40–60% cheaper for equivalent compute at small to medium scale. At large scale with AWS reserved pricing, the gap narrows significantly.",
            },
            {
              q: "What is a GCP cost calculator and how is it different from an AWS pricing calculator?",
              a: "A GCP cost calculator estimates Google Cloud Platform costs using GCP-specific pricing — their compute engine rates, Cloud Storage pricing, BigQuery, and Cloud Functions invocation costs. An AWS pricing calculator uses Amazon's rates — EC2, S3, RDS, Lambda. The underlying cost categories are similar, but the per-unit prices differ. This tool covers both providers in a single interface so you can switch between them and compare the same config instantly.",
            },
            {
              q: "What is a cloud migration cost calculator?",
              a: "A cloud migration cost calculator estimates what your current infrastructure would cost if moved to a different cloud provider. You configure your existing setup (servers, storage, database, bandwidth) and compare the monthly cost across providers to identify potential savings. The estimate helps justify or reject migration projects based on hard dollar figures rather than assumptions.",
            },
            {
              q: "Does the calculator include free tier allowances?",
              a: "No — free tier credits and allowances are excluded to give a realistic baseline for ongoing costs. AWS offers 750 hours/month of t2.micro for 12 months, GCP gives $300 in credits for 90 days, and most platforms offer some free allowance. Subtract those from the estimate manually when planning first-year costs, then use the full estimate for year two onwards.",
            },
            {
              q: "How do reserved instances and committed-use discounts affect the estimate?",
              a: "Reserved instances (AWS) and committed-use discounts (GCP) reduce compute costs by 30–40% for 1-year commitments and up to 60% for 3-year commitments in exchange for upfront payment or a usage pledge. This calculator uses on-demand rates. For always-on workloads you are confident will run for 12+ months, apply a 30–40% reduction to the compute line item to model reserved pricing.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your configuration values — server counts, storage sizes, and any other inputs — are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🚀", title: "Startup Founders", desc: "Validate infrastructure unit economics before launch, compare providers to find the cheapest option for the MVP stage, and present credible cost projections to investors or co-founders." },
            { icon: "⚙️", title: "DevOps & Platform Engineers", desc: "Right-size existing deployments by comparing current provisioning against a leaner configuration, and quantify the savings from moving to reserved instances or switching providers." },
            { icon: "🏗️", title: "Cloud Architects", desc: "Model infrastructure costs during the design phase before resources are provisioned, compare serverless vs always-on cost profiles, and evaluate provider tradeoffs for multi-cloud designs." },
            { icon: "💼", title: "CTOs & Engineering Managers", desc: "Build infrastructure cost projections for annual budgets, validate that engineering team proposals fit within spending constraints, and make data-driven provider migration decisions." },
            { icon: "🧑‍💻", title: "Developers", desc: "Quickly estimate whether a personal project or side business will be viable at a given monthly cost, choose between Vercel/Railway/Fly.io for a new deployment, and avoid billing surprises on first-time cloud accounts." },
            { icon: "🎓", title: "Cloud Architecture Students", desc: "Learn how different infrastructure components contribute to monthly cost, understand the pricing model differences between IaaS, PaaS, and serverless, and practice cost optimization scenarios for certification study." },
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
