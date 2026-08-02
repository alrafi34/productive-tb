export default function StorageRequirementCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Storage Requirement Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>storage requirement calculator</strong> is a free browser-based tool that estimates how much digital storage you actually need for files, backups, CCTV recordings, databases, websites, media libraries, or cloud storage. It goes beyond a simple multiplication by modeling the real-world overhead that catches most people off guard: compression savings, multiple backup copies, RAID redundancy, year-over-year growth, and a safety margin.
          </p>
          <p>
            Rather than guessing and buying too little (or wildly overpaying for capacity you&apos;ll never use), this tool walks through each factor step by step and shows exactly how your raw data size becomes a final, purchasable storage requirement — complete with a recommended disk size, a suggested cloud plan tier, and an estimated monthly cost.
          </p>
          <p>
            Built for <strong>home users, students, developers, system administrators, cloud engineers, database administrators, content creators, photographers, videographers, security camera installers, small businesses, and enterprise IT teams</strong>, the calculator supports three focused calculation modes — File Storage, Backup Storage, and Video/CCTV Storage — covering the vast majority of real-world storage planning scenarios.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Storage Requirement Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Each mode runs its own calculation pipeline, but they all end the same way — applying a safety margin to the final figure and mapping it to a recommended disk size and cloud plan.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">File Storage Pipeline</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Raw Storage = Average File Size × Number of Files</p>
              <p>Projected Storage = Raw Storage × (1 + Growth%) ^ Years</p>
              <p>Compressed Storage = Projected Storage × (1 − Compression%)</p>
              <p>Backup Storage = Compressed Storage × Backup Copies</p>
              <p>Redundant Storage = Backup Storage × RAID Multiplier</p>
              <p>Final Storage = Redundant Storage × (1 + Safety Margin%)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Backup Storage Mode", "Required Storage = Daily Backup Size × Retention Period (in days), then a safety margin is applied — ideal for planning backup retention windows."],
              ["Video / CCTV Storage Mode", "Required Storage = (Bitrate ÷ 8) × Seconds Recorded per Day × Recording Days × Number of Cameras — the standard formula used by security camera installers."],
              ["Automatic Unit Conversion", "All results use the binary standard (1024 Bytes = 1 KB, and so on up to Exabytes) and are automatically displayed in the most readable unit."],
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
          How to Use the Storage Requirement Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Mode", "Select File Storage, Backup Storage, or Video / CCTV Storage depending on what you're planning capacity for."],
                ["Enter Your Storage Details", "Type your file size and count, daily backup size and retention, or video bitrate and recording schedule."],
                ["Adjust Growth, Compression, and Redundancy", "Set annual growth, compression ratio, backup copies, RAID redundancy, and a safety margin."],
                ["Review the Live Results", "See the final required storage, a breakdown donut chart, a 5-year growth forecast, and step-by-step calculation math."],
                ["Get Recommendations and Export", "Check the recommended disk size and cloud plan, then copy, print, or export the report."],
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
                "3 calculation modes — File Storage, Backup Storage, and Video/CCTV Storage",
                "5 file scenario presets — Basic, Database, Website, Cloud, and Custom",
                "Real-time calculation with a 150ms debounced update",
                "Automatic binary unit conversion from Bytes up to Exabytes",
                "Compression, backup copies, and RAID redundancy modeling",
                "Annual growth projection with a 5-year forecast chart",
                "Interactive donut chart showing the storage breakdown",
                "Automatic disk size and cloud plan recommendations",
                "Cost estimation across 8 currencies",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON",
                "Print-ready report and full-text copy",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcut — Esc to reset",
                "Inline validation with friendly, realistic-value warnings",
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
              title: "Planning a Personal Photo Archive",
              scenario: "A photographer enters 25 MB average RAW file size across 10,000 files, applies 20% compression and 2 backup copies with a 20% safety margin, and gets a clear 480 GB final requirement — enough to choose the right external SSD with confidence.",
            },
            {
              title: "Sizing a Cloud Backup Retention Window",
              scenario: "An IT administrator switches to Backup Storage mode, enters a 25 GB daily backup and a 90-day retention policy, and instantly sees the required storage and a suggested cloud plan tier before committing to a provider.",
            },
            {
              title: "Estimating CCTV Storage for a New Installation",
              scenario: "A security camera installer enters an 8 Mbps bitrate, 24 hours of daily recording, 4 cameras, and 30 days of retention, and gets a clear multi-terabyte total to size the NVR's hard drive correctly before the job.",
            },
            {
              title: "Forecasting Database Growth for Budget Planning",
              scenario: "A database administrator selects the Database Storage scenario preset, adjusts row size and count, and sets a 3-year growth projection period to justify a storage budget increase to management using the 5-year forecast chart.",
            },
            {
              title: "Comparing RAID Configurations Before Purchase",
              scenario: "A small business owner toggles between RAID 1, RAID 5, and RAID 6 to see exactly how much extra raw capacity each redundancy level requires before ordering a NAS array.",
            },
            {
              title: "Estimating Monthly Cloud Storage Costs",
              scenario: "A SaaS founder enters their expected file storage volume and their cloud provider's per-GB pricing to get an instant monthly cost estimate before signing a contract.",
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
                "Always include a safety margin of at least 15-20% — real-world storage fills up faster than raw calculations suggest due to temporary files and OS overhead.",
                "Use the growth projection period on file storage only when you have a genuine multi-year horizon in mind — leave it at 0 for a snapshot of current needs.",
                "Compare RAID options side by side before buying hardware — RAID 6 roughly doubles the effective cost per usable terabyte compared to no redundancy.",
                "For CCTV planning, remember that variable bitrate cameras with motion-triggered recording use significantly less storage than constant 24/7 recording at a fixed bitrate.",
                "Save calculations to history when comparing multiple storage vendor quotes, so you can quickly reload the baseline requirement for each conversation.",
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
                "Don't forget backup copies when sizing primary storage — 3 backup copies of your data effectively quadruples your total required capacity.",
                "Don't assume RAID is a substitute for backups — RAID protects against drive failure, not accidental deletion, ransomware, or fire and theft.",
                "Don't apply compression ratios optimistically — already-compressed formats like JPEG, MP4, and ZIP see little to no benefit from additional compression.",
                "Don't ignore unit differences — mixing decimal (1000-based) marketing capacities with binary (1024-based) actual usable capacity is a common source of confusion when buying drives.",
                "Don't size CCTV storage using average bitrate alone if your cameras use motion-triggered recording — actual usage will typically be lower than a constant-bitrate estimate.",
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
          RAID Redundancy Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">RAID Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Overhead</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Protection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["None", "0%", "No redundancy — any drive failure means data loss"],
                ["RAID 1 (Mirror)", "100%", "Tolerates 1 drive failure"],
                ["RAID 5", "~33% (4-drive array)", "Tolerates 1 drive failure via single parity"],
                ["RAID 6", "~50% (4-drive array)", "Tolerates 2 drive failures via dual parity"],
                ["RAID 10", "100%", "Tolerates multiple failures if not in the same mirror pair"],
              ].map(([level, overhead, protection]) => (
                <tr key={level} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{level}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{overhead}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{protection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Overhead percentages are typical estimates assuming a common 4-drive array and vary with actual array size.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a Storage Requirement Calculator?",
              a: "A Storage Requirement Calculator is a free browser-based tool that estimates how much digital storage you need for files, backups, CCTV recordings, databases, websites, or cloud storage, accounting for compression, backup copies, RAID redundancy, growth, and a safety margin.",
            },
            {
              q: "How is total file storage calculated?",
              a: "Total Storage = Average File Size × Number of Files. From there, the calculator applies growth projection, compression, backup copies, RAID overhead, and a safety margin in sequence.",
            },
            {
              q: "How does the calculator handle unit conversion?",
              a: "All storage units use the binary standard: 1024 Bytes = 1 KB, 1024 KB = 1 MB, and so on. Results are automatically formatted in the most readable unit, from Bytes up to Exabytes.",
            },
            {
              q: "How is CCTV storage calculated?",
              a: "CCTV storage uses Required Storage = (Bitrate ÷ 8) × Seconds per Day × Recording Days × Number of Cameras, then applies your safety margin.",
            },
            {
              q: "What do the RAID redundancy options mean?",
              a: "RAID 1 and RAID 10 mirror data, roughly doubling required capacity. RAID 5 adds single parity (~33% overhead), and RAID 6 adds dual parity (~50% overhead) on a typical 4-drive array.",
            },
            {
              q: "What is a safety margin and why does it matter?",
              a: "A safety margin adds a buffer percentage on top of your calculated storage need to account for unexpected growth and overhead — most IT professionals recommend at least 15-20%.",
            },
            {
              q: "How does the tool recommend a disk size?",
              a: "The calculator compares your final required storage against common thresholds — recommending an External HDD above 1 TB, a NAS above 4 TB, and Enterprise Storage above 20 TB.",
            },
            {
              q: "How is estimated cost calculated?",
              a: "Estimated Cost = Final Required Storage (in GB) × Your Entered Cost per GB, giving a rough cost estimate based on your own pricing input.",
            },
            {
              q: "Can I use this for cloud storage planning?",
              a: "Yes. Enter your expected cost per GB from your cloud provider's pricing page, and the calculator will suggest an appropriate cloud storage plan tier.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your storage figures are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "💻", title: "System Administrators & Cloud Engineers", desc: "Plan server, NAS, and cloud storage capacity with RAID and growth modeling built in." },
            { icon: "📷", title: "Photographers & Videographers", desc: "Estimate storage needs for growing media libraries with compression and backup planning." },
            { icon: "🎥", title: "Security Camera Installers", desc: "Size NVR and DVR hard drives correctly using bitrate-based CCTV storage calculations." },
            { icon: "🗄️", title: "Database Administrators", desc: "Forecast database storage growth over multiple years for budget and capacity planning." },
            { icon: "🏢", title: "Small Businesses & Enterprise IT Teams", desc: "Get cost estimates and disk recommendations before purchasing hardware or cloud plans." },
            { icon: "🎓", title: "Students & Home Users", desc: "Learn how compression, backups, and redundancy affect real-world storage requirements." },
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
