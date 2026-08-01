export default function LeadConversionFunnelCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Lead Conversion Funnel Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>lead conversion funnel calculator</strong> is a free browser-based tool that analyzes how effectively visitors, leads, or prospects move through every stage of a marketing or sales process. It answers the question every growth marketer and sales leader needs to know: <em>where exactly are we losing people, and which stage deserves attention first?</em>
          </p>
          <p>
            A funnel rarely has just one number worth tracking — a healthy top-of-funnel conversion rate can hide a broken middle stage, and a strong overall conversion rate can mask an inefficient path with more leaks than necessary. This tool solves that by calculating the conversion rate and drop-off percentage between every single stage, the overall funnel conversion, and a funnel efficiency score, then automatically highlighting your single biggest bottleneck on both a data table and an interactive visual funnel.
          </p>
          <p>
            This tool is built for <strong>digital marketers, SEO professionals, performance marketers, growth hackers, sales teams, CRM users, SaaS companies, startup founders, marketing agencies, eCommerce businesses, affiliate marketers, and students</strong> learning marketing analytics. It supports 2 to 10 fully custom, reorderable stages, exports results as CSV, JSON, PNG, or SVG, and saves funnel history for before-and-after comparison — all processed entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Lead Conversion Funnel Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter a value for each funnel stage, from the widest top-of-funnel number down to the narrowest final outcome. The calculator computes the relationship between every adjacent pair of stages, plus the funnel as a whole.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Conversion Rate = (Stage B ÷ Stage A) × 100</p>
              <p>Drop-Off Rate = ((Stage A − Stage B) ÷ Stage A) × 100</p>
              <p>Overall Conversion = (Final Stage ÷ First Stage) × 100</p>
              <p>Efficiency Score = (Overall Conversion ÷ 100)^(1 ÷ Number of Transitions) × 100</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Stage-by-Stage Conversion", "The percentage of people who successfully move from one stage to the very next one — the most granular view of funnel health."],
              ["Drop-Off Percentage", "The inverse of conversion rate — how many people are lost at each specific transition, which is where optimization work should focus."],
              ["Overall Conversion", "The percentage of your very first stage that reaches your very last stage — the headline number for reporting funnel performance."],
              ["Funnel Efficiency Score", "A geometric-mean-based score from 0-100 that normalizes performance across funnels with different numbers of stages, since simply multiplying more stages together always produces a smaller overall percentage."],
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
          How to Use the Lead Conversion Funnel Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Build Your Funnel Stages", "Start from the default 5-stage funnel or click Load Sample Data, then rename each stage to match your actual process — anywhere from 2 to 10 stages are supported."],
                ["Enter Values for Each Stage", "Type the number of visitors, leads, or customers at each stage. Every metric updates instantly with a short debounce as you type."],
                ["Reorder or Add/Remove Stages", "Drag a stage by its handle to reorder it, use the up/down arrows as an alternative, and use Add Stage or the ✕ button to change how many stages you're tracking."],
                ["Review the Visual Funnel and Metrics", "Check the interactive SVG funnel diagram, overall conversion rate, funnel efficiency score, and the automatically highlighted biggest drop-off stage."],
                ["Read the Insights and Fix Bottlenecks", "Review the auto-generated insights identifying your best and worst-performing transitions, then adjust values to model potential improvements."],
                ["Save, Compare, or Export", "Save the funnel to history, compare it against a previously saved funnel, or export as CSV, JSON, PNG, SVG, or a printed report."],
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
                "2 to 10 fully customizable, reorderable funnel stages",
                "Real-time calculation with a 150ms debounced update",
                "Interactive SVG funnel diagram, proportional to stage values",
                "Automatic biggest-bottleneck detection and highlighting",
                "Funnel efficiency score based on geometric mean conversion",
                "Funnel health indicator (Healthy, Needs Attention, Critical)",
                "Drag-and-drop and arrow-button stage reordering",
                "Strict validation toggle with over-100% conversion warnings",
                "3 one-click sample datasets covering different funnel types",
                "Undo support for recent stage edits (Ctrl/Cmd+Z)",
                "Auto-saves your last session and restores it on return",
                "Funnel history — save and compare current vs. previous",
                "Export as CSV, JSON, PNG, or SVG",
                "Print-ready PDF report and full-text copy",
                "Keyboard shortcuts — Ctrl/Cmd+Z to undo, Esc to reset",
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
              title: "Finding the Real Bottleneck in a Sales Funnel",
              scenario: "A growth marketer enters a 5-stage funnel — 20,000 website visitors, 2,000 leads, 700 qualified leads, 250 sales calls, and 60 customers. The calculator flags Visitors → Leads (only 10% conversion) as the biggest drop-off, redirecting the team's optimization budget toward landing page and lead-capture improvements instead of the sales process.",
            },
            {
              title: "Diagnosing a SaaS Trial-to-Paid Funnel",
              scenario: "A SaaS growth lead enters 8,500 ad clicks, 1,150 signups, 650 free trials, and 145 paid customers, finding a 56.52% signup-to-trial rate but only a 22.31% trial-to-paid rate — clear evidence that onboarding and trial engagement, not top-of-funnel acquisition, is the highest-leverage fix.",
            },
            {
              title: "Reporting Agency Funnel Performance to a Client",
              scenario: "An agency account manager enters 50,000 landing page visitors, 7,800 newsletter subscribers, 620 booked calls, and 83 clients, then exports a printed report showing the full stage breakdown, overall conversion rate, and efficiency score to include directly in the monthly client presentation.",
            },
            {
              title: "Modeling a Funnel Improvement Before Implementing It",
              scenario: "A CRM manager duplicates a saved funnel and increases the Qualified Leads value to simulate a new lead-scoring process, immediately seeing the projected overall conversion rate rise from 0.30% to 0.45% — quantifying the expected impact before committing engineering resources to the change.",
            },
            {
              title: "Comparing Funnel Health Before and After a Redesign",
              scenario: "A performance marketer saves a funnel before a landing page redesign, implements the redesign, then saves a second funnel afterward and uses Compare to show the efficiency score improving from 18/100 to 31/100 — concrete evidence the redesign worked.",
            },
            {
              title: "Teaching Funnel Analytics in a Marketing Course",
              scenario: "A marketing instructor has students build a funnel from scratch using Add Stage, deliberately create a bottleneck by lowering one stage's value, and watch the tool automatically flag and explain the resulting drop-off — turning an abstract concept into a hands-on exercise.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Best Practices ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Name your stages precisely — \"Leads\" means something different at every company, and a vague stage name makes a saved funnel confusing to interpret weeks later.",
                "Fix the biggest drop-off first, not the lowest absolute conversion rate. A 10% conversion rate might be completely normal for that stage type, while a 30% drop where 90% is expected is the real emergency.",
                "Use the efficiency score, not just overall conversion, when comparing funnels with different numbers of stages — a 4-stage funnel and an 8-stage funnel with the same overall percentage don't perform equally well per stage.",
                "Save a funnel before making any significant change to your marketing or sales process, so you always have a true baseline to compare against with the Compare feature.",
                "Model hypothetical improvements by manually adjusting one stage's value and watching how the overall conversion and efficiency score respond — this quickly shows which stage improvement would have the biggest overall impact.",
                "Turn off Strict Validation only when intentionally modeling a hypothetical scenario — leaving it on for real historical data catches typos and data entry mistakes immediately.",
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
                "Don't compare drop-off percentages across stages of very different types without context — a 60% drop-off from Visitors to Leads is often normal, while a 60% drop-off from Sales Call to Customer usually signals a real process problem.",
                "Don't build a funnel with stages that aren't strictly sequential subsets of each other — each stage should represent people who passed through every prior stage, or the conversion math won't reflect reality.",
                "Don't ignore a low efficiency score just because the overall conversion rate looks acceptable — a low efficiency score across many stages can still add up to a passable headline number while hiding real inefficiency.",
                "Don't treat the funnel efficiency score as a universal benchmark across industries — a 15/100 efficiency score might be entirely normal for a long, high-value B2B enterprise sales funnel and alarming for a short-cycle ecommerce funnel.",
                "Don't forget to re-save your funnel to history after making changes if you want to track progress over time — the Compare feature only works against previously saved snapshots.",
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

      {/* ── Benchmark Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Funnel Types Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Funnel Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Stages</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example Overall Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["B2B Sales Funnel", "Visitors → Leads → Qualified Leads → Sales Calls → Customers", "0.3% – 2%"],
                ["SaaS Free Trial Funnel", "Ad Clicks → Signups → Free Trials → Paid Customers", "1% – 5%"],
                ["Agency / Consultation Funnel", "Landing Page Visitors → Subscribers → Booked Calls → Clients", "0.1% – 1%"],
                ["Ecommerce Funnel", "Product Views → Add to Cart → Checkout Started → Purchase", "1% – 4%"],
                ["Content / Newsletter Funnel", "Article Readers → Email Signups → Repeat Visitors → Customers", "0.5% – 3%"],
              ].map(([type, stages, range]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{type}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{stages}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Ranges are illustrative reference points, not guarantees. Actual overall conversion depends heavily on industry, price point, traffic quality, and sales cycle length.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a lead conversion funnel calculator?",
              a: "A lead conversion funnel calculator is a free browser-based tool that measures how effectively leads or visitors move through each stage of a marketing or sales process, from initial awareness down to a final outcome like paying customers. It calculates the conversion rate and drop-off percentage between every stage as well as the overall funnel conversion rate.",
            },
            {
              q: "How is conversion rate calculated between two stages?",
              a: "Conversion rate between two stages is calculated as (Current Stage ÷ Previous Stage) × 100. For example, if 1,500 people become leads out of 12,000 visitors, the conversion rate is (1,500 ÷ 12,000) × 100 = 12.5%.",
            },
            {
              q: "How is overall funnel conversion calculated?",
              a: "Overall funnel conversion is calculated as (Final Stage ÷ First Stage) × 100. For example, if 120 customers come from an original 12,000 visitors, the overall conversion rate is (120 ÷ 12,000) × 100 = 1%.",
            },
            {
              q: "What is the funnel efficiency score?",
              a: "The funnel efficiency score is the geometric mean of every stage-to-stage conversion rate, expressed out of 100. It represents the equivalent conversion rate each stage would need if every stage converted equally well, making it a fairer comparison across funnels with different numbers of stages.",
            },
            {
              q: "How does the calculator detect the biggest bottleneck?",
              a: "The calculator compares the drop-off percentage between every pair of adjacent stages and automatically flags the transition with the highest drop-off as the biggest bottleneck, both in the stage table and on the visual funnel diagram, along with a written insight explaining where the leak is happening.",
            },
            {
              q: "Can I use more or fewer than 5 stages?",
              a: "Yes. The calculator supports between 2 and 10 stages. Use Add Stage to insert a new stage, the ✕ button to remove one, and drag-and-drop or the up/down arrows to reorder stages to match your actual funnel structure.",
            },
            {
              q: "What does the strict validation toggle do?",
              a: "When Strict Validation is enabled (the default), a stage cannot have a higher value than the stage directly before it, since that would represent an impossible conversion rate over 100%. Disabling it allows exploratory values, but the calculator will still show a clear warning when a conversion rate exceeds 100%.",
            },
            {
              q: "Can I compare two different funnels?",
              a: "Yes. Save a funnel to history, then click Compare next to any saved entry to see a Current vs. Previous Funnel comparison showing overall conversion rate and efficiency score side by side.",
            },
            {
              q: "What's the difference between conversion rate and drop-off rate?",
              a: "Conversion rate is the percentage of people from one stage who successfully move to the next stage. Drop-off rate is the percentage who do not — the two always add up to 100% for any given stage transition.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your funnel stage names, values, and any saved history are never transmitted to any server, stored in any database, or accessible to anyone other than you. History is stored only in your browser's local storage.",
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
            { icon: "📊", title: "Growth & Performance Marketers", desc: "Pinpoint the exact stage losing the most leads and prioritize optimization budget against the highest-leverage fix." },
            { icon: "💼", title: "Sales Teams & CRM Users", desc: "Track how leads move from first contact through qualification, calls, and closed deals to identify process gaps." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Produce exportable funnel reports and before/after comparisons for client reviews and optimization proposals." },
            { icon: "💻", title: "SaaS & Startup Teams", desc: "Diagnose signup-to-trial and trial-to-paid conversion separately to find where onboarding is losing users." },
            { icon: "🛒", title: "eCommerce & Affiliate Marketers", desc: "Model funnels from product views through checkout to spot where cart abandonment is hurting revenue most." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn how conversion rate, drop-off, and overall funnel math relate to each other through hands-on experimentation." },
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
