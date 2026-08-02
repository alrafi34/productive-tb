export default function DataTransferCostCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Data Transfer Cost Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>data transfer cost calculator</strong> is a free browser-based tool that estimates the cost of moving data between cloud providers, CDNs, VPS servers, object storage services, APIs, and streaming platforms. Data transfer — also called bandwidth or egress traffic — is one of the most overlooked cloud expenses: most people understand storage pricing but underestimate what it costs to actually move that data in and out.
          </p>
          <p>
            This calculator lets you estimate transfer costs before deployment, helping you avoid unexpected cloud bills. It supports both binary (GiB, TiB) and decimal (GB, TB) unit conventions side by side, since providers are not always consistent about which one they actually bill against — a gap that has surprised more than one engineering team at invoice time.
          </p>
          <p>
            Built for <strong>cloud engineers, DevOps engineers, backend developers, system administrators, startup founders, SaaS companies, CDN users, video streaming platforms, AI/ML teams, enterprise IT teams, and students learning cloud computing</strong>, the tool runs entirely in your browser with instant calculations, no signup, and no data ever leaving your device.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Data Transfer Cost Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator normalizes both your data size and your price into a common base unit, then multiplies them together.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Total Cost = Normalized Data Size × Normalized Unit Price</p>
              <p>Period Cost = Total Cost × Transfer Count</p>
              <p>Monthly Cost = Period Cost × Periods per Month</p>
              <p>Yearly Cost = Period Cost × Periods per Year</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Binary-Named Units", "MiB, GiB, TiB, and PiB always use true 1024-based math, since that's their defined meaning — this never changes."],
              ["Decimal-Named Units", "MB, GB, TB, and PB follow your selected Conversion Standard — Decimal mode uses 1000-based math, Binary mode treats them the same as their binary counterparts, matching how many providers actually bill."],
              ["Transfer Count", "Multiplies a single transfer's cost to model repeated transfers within one billing period, such as 120 monthly API calls."],
              ["Billing Period Projection", "Scales your period cost into standardized monthly and yearly figures using period-to-month and period-to-year multipliers."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Data Transfer Cost Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Data Size", "Type the amount of data being transferred and choose its unit — MB, MiB, GB, GiB, TB, TiB, PB, or PiB."],
                ["Enter Your Transfer Price", "Type the price your provider charges and select the matching price unit."],
                ["Choose a Billing Period and Conversion Standard", "Select your billing frequency and Decimal or Binary unit conversion."],
                ["Read the Live Cost Estimate", "The estimated, monthly, and yearly costs update instantly as you type."],
                ["Compare, Export, or Share", "Check the Decimal vs. Binary comparison, then copy, export, print, or share the result."],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "8 data units — MB, MiB, GB, GiB, TB, TiB, PB, PiB",
                "4 price units with automatic normalization",
                "6 billing periods with monthly and yearly projections",
                "Decimal vs. Binary conversion standard toggle",
                "Live side-by-side Decimal vs. Binary cost comparison",
                "Real-time calculation with a 150ms debounced update",
                "Transfer count multiplier for repeated transfers",
                "9 supported currencies",
                "3 quick example presets matching common real-world scenarios",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON",
                "Print-ready report and full-text copy",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcut — Esc to reset",
                "Inline validation with clear, friendly error messages",
                "No signup required — 100% free to use",
                "All processing runs locally — no data leaves your browser",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Estimating a One-Time Data Migration Cost",
              scenario: "A DevOps engineer entering 500 GB at $0.09/GB gets an instant $45.00 estimate before kicking off a one-time migration between cloud regions, avoiding a surprise line item on next month's invoice.",
            },
            {
              title: "Budgeting Monthly CDN Egress",
              scenario: "A startup founder selects Monthly billing, enters their expected 8 TB of monthly CDN egress at $0.05/GB under Binary mode, and gets both the monthly figure ($409.60) and an automatic yearly projection for their budget spreadsheet.",
            },
            {
              title: "Comparing AWS, Azure, and GCP Egress Pricing",
              scenario: "A cloud architect runs the same data volume through the calculator three times with each provider's published per-GB egress price, using the results to build a side-by-side cost comparison before choosing a region.",
            },
            {
              title: "Modeling API-Driven Transfer Costs",
              scenario: "A backend developer sets Transfer Count to 120 to model 120 monthly API calls, each transferring a fixed payload size, to estimate the cumulative monthly bandwidth cost of a new integration.",
            },
            {
              title: "Catching a Binary vs. Decimal Billing Discrepancy",
              scenario: "An AI/ML team estimating a 1.5 PB dataset transfer notices the Decimal vs. Binary comparison table shows a meaningfully different cost between standards, prompting them to check their provider's actual billing documentation before committing.",
            },
            {
              title: "Teaching Cloud Cost Fundamentals",
              scenario: "A student learning cloud computing uses the inline GB vs. GiB explanation and the built-in comparison table to understand why the same transfer can be billed differently depending on unit convention.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Common Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Always check your provider's actual billing documentation to confirm whether they bill \"GB\" as 1000-based or 1024-based before finalizing a budget estimate.",
                "Use the Decimal vs. Binary comparison table as a sanity check — a large gap between the two numbers is a signal worth investigating before you commit to a number.",
                "Model Transfer Count realistically for API-heavy workloads — even small per-call payloads add up fast at high monthly call volumes.",
                "Compare egress pricing across providers using the same normalized units, not the raw numbers each provider publishes in their own preferred unit.",
                "Save recurring cost estimates to history so you can quickly compare pricing changes over time as your provider updates their rates.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't assume all cloud providers use the same unit convention — mixing decimal and binary assumptions is one of the most common causes of cloud budget surprises.",
                "Don't forget ingress is often free while egress is billed — make sure the price you're entering actually reflects outbound transfer, not storage or inbound cost.",
                "Don't ignore free-tier egress allowances — many providers offer a monthly free egress quota that should be subtracted from your billable volume before estimating cost.",
                "Don't use a single one-time calculation to represent recurring monthly costs — select the correct billing period so the monthly and yearly projections are meaningful.",
                "Don't overlook regional pricing differences — the same provider often charges different egress rates depending on the source and destination region.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Unit Conversion Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">System</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Equals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1 GB", "Decimal", "1,000 MB (1,000,000,000 bytes)"],
                ["1 GiB", "Binary", "1,024 MiB (1,073,741,824 bytes)"],
                ["1 TB", "Decimal", "1,000 GB"],
                ["1 TiB", "Binary", "1,024 GiB"],
                ["1 PB", "Decimal", "1,000 TB"],
                ["1 PiB", "Binary", "1,024 TiB"],
              ].map(([unit, system, equals]) => (
                <tr key={unit} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{unit}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{system}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{equals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Many cloud providers label 1024-based units as &quot;GB&quot; or &quot;TB&quot; rather than the technically correct &quot;GiB&quot; or &quot;TiB&quot; — always verify against your provider&apos;s billing documentation.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a Data Transfer Cost Calculator?",
              a: "A Data Transfer Cost Calculator is a free browser-based tool that estimates the cost of transferring data between cloud providers, CDNs, VPS servers, object storage services, or APIs, based on a data size, a price per unit, and a billing period.",
            },
            {
              q: "How is the transfer cost calculated?",
              a: "Total Cost = Normalized Data Size × Normalized Unit Price. The calculator converts your entered data size and price into a common base unit, then multiplies them together.",
            },
            {
              q: "What is the difference between GB and GiB?",
              a: "GB traditionally means 1000 megabytes in the decimal system, while GiB always means exactly 1024 mebibytes in the binary system — many cloud providers historically used \"GB\" to mean what is technically a GiB.",
            },
            {
              q: "What does the Conversion Standard toggle actually change?",
              a: "MiB, GiB, TiB, and PiB are always 1024-based. The toggle only changes how the ambiguous MB, GB, TB, and PB units are interpreted — Decimal mode uses 1000-based math, Binary mode uses 1024-based math.",
            },
            {
              q: "Why did my 8 TB transfer cost more when I selected Binary mode?",
              a: "Under Binary mode, 8 TB is treated as 8,192 GB rather than 8,000 GB, since many providers bill using binary-equivalent units labeled as decimal ones.",
            },
            {
              q: "What is the Transfer Count field for?",
              a: "Transfer Count lets you model repeated transfers within a single billing period, such as 120 monthly API calls, by multiplying the single-transfer cost by the count.",
            },
            {
              q: "How are Monthly and Yearly costs projected?",
              a: "Based on your selected billing period, the calculator scales your period cost using standard period-to-month and period-to-year multipliers.",
            },
            {
              q: "Does this calculator support cloud egress fees?",
              a: "Yes. Enter your cloud provider's published egress or bandwidth price per GB (or GiB) and your expected transfer volume for an instant cost estimate.",
            },
            {
              q: "Can I calculate costs in currencies other than USD?",
              a: "Yes. The calculator supports USD, EUR, GBP, CAD, AUD, SGD, INR, BDT, and JPY for formatting — it does not perform live currency conversion.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your data size, pricing, and billing details are never transmitted to any server or stored in any database.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "☁️", title: "Cloud & DevOps Engineers", desc: "Estimate egress and bandwidth costs before deploying infrastructure across regions or providers." },
            { icon: "💻", title: "Backend Developers", desc: "Model API-driven transfer costs using the transfer count multiplier for realistic monthly estimates." },
            { icon: "🚀", title: "Startup Founders & SaaS Companies", desc: "Budget cloud bandwidth costs accurately before they show up as a surprise on next month's invoice." },
            { icon: "📡", title: "CDN Users & Streaming Platforms", desc: "Compare egress pricing across CDN providers using consistent normalized units and currencies." },
            { icon: "🤖", title: "AI/ML Teams", desc: "Estimate large dataset transfer costs at the petabyte scale, checking decimal vs. binary billing assumptions." },
            { icon: "🎓", title: "Students Learning Cloud Computing", desc: "Understand the real difference between GB and GiB pricing using a live, interactive comparison." },
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
