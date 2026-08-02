export default function ViralCoefficientCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Viral Coefficient Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>viral coefficient calculator</strong> (also called a K-Factor calculator) is a free browser-based tool that measures how effectively your existing users bring in new users through referrals, invitations, or sharing. It answers a core growth question: <em>for every user I have, how many new users do they generate on their own?</em>
          </p>
          <p>
            The Viral Coefficient, or K-Factor, is calculated by multiplying the average number of invitations each user sends by the percentage of those invitations that convert into new users. A K-Factor above 1 means your product is growing virally — each generation of referred users is larger than the last — while a K-Factor below 1 means referrals alone will shrink over time and need to be supplemented by other acquisition channels.
          </p>
          <p>
            This tool is built for <strong>startup founders, SaaS businesses, product managers, growth marketers, mobile app developers, social media marketers, affiliate marketers, investors, and students learning growth marketing</strong>. It projects new users from your current K-Factor, simulates compound referral growth across multiple generations, and exports results as CSV, JSON, or a print-ready report — entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Viral Coefficient Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter your average invitations sent per user and your invitation conversion rate, and the calculator instantly returns your K-Factor along with a growth rating. Add your existing user count to project how many new users your current virality generates, or add referral cycles to simulate how that growth compounds across multiple generations.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Viral Coefficient (K) = Average Invitations × (Conversion Rate ÷ 100)</p>
              <p>Projected New Users = Existing Users × K</p>
              <p>Generation N Users = Existing Users × K^N</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["K < 1", "Sub-viral growth. Every referral generation is smaller than the last — referrals alone will not sustain growth, and additional acquisition channels are required."],
              ["K = 1", "Stable growth. Each user roughly replaces themselves through referrals, holding the user base steady without paid acquisition."],
              ["K > 1", "Viral growth. Each generation of referred users is larger than the last, so growth compounds naturally the longer it runs."],
              ["Referral Cycles", "Each cycle represents one full generation of referrals — the users referred by your existing users, then the users referred by those new users, and so on."],
              ["Referral Effectiveness", "A separate rating of your conversion rate alone, showing how well your invitations turn into signups regardless of how many invitations are sent."],
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
          How to Use the Viral Coefficient Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Try an Example (Optional)", "Click a preset like Self-Sustaining (K=1.0) or Strong Viral (K=2.8) to instantly load realistic sample figures."],
                ["Enter Average Invitations", "Type the average number of invitations or shares each user sends. Results update instantly with a 150ms debounce."],
                ["Enter Conversion Rate", "Type the percentage of invitations that convert into a new signup."],
                ["Add Optional Inputs", "Expand Optional Inputs to set your existing user count, number of referral cycles to project, and decimal precision."],
                ["Review Your K-Factor", "Check the gauge, growth status, growth category, and referral effectiveness rating."],
                ["Review the Growth Timeline", "See the compound referral projection chart and table showing new and cumulative users across each generation."],
                ["Compare, Export, or Share", "Use Compare as A/B to evaluate two growth scenarios side by side, export as CSV or JSON, print a formatted report, or copy a shareable URL."],
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
                "Instant K-Factor calculation with a 150ms debounce",
                "Interactive K-Factor gauge with color-coded growth rating",
                "Projected new users from your existing user base",
                "Compound referral growth simulation across multiple generations",
                "Growth timeline chart and responsive projection table",
                "Referral effectiveness rating based on conversion rate alone",
                "Growth status and growth category breakdown",
                "Adjustable decimal precision (0–4 places)",
                "Compare-as-A/B scenario comparison mode",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with full generation breakdown",
                "Print-ready formatted report",
                "Copy full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past results",
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
              title: "Self-Sustaining Referral Loop",
              scenario: "A startup finds that each user sends 5 invitations with a 20% conversion rate. The calculator returns a K-Factor of exactly 1.00 — Stable Growth — meaning referrals alone hold the user base steady without shrinking, a useful baseline before investing in improving the funnel further.",
            },
            {
              title: "Breakout Viral Campaign",
              scenario: "A consumer app sees users sending 8 invitations at a 35% conversion rate during a viral campaign. The calculator returns a K-Factor of 2.80 — Strong Viral Growth — and projects that 1,000 existing users would generate 2,800 new users in a single referral cycle.",
            },
            {
              title: "Identifying a Sub-Viral Product",
              scenario: "A B2B SaaS tool measures 3 invitations per user at a 10% conversion rate, returning a K-Factor of 0.30. Because this falls in Sub-Viral Growth, the team concludes referrals cannot be the primary growth channel and reallocates budget toward paid acquisition and content marketing.",
            },
            {
              title: "Projecting New Users From Existing Base",
              scenario: "A product manager with 1,000 existing users and a K-Factor of 1.42 uses the Projected New Users output to estimate 1,420 new users from the current referral loop alone — a number included directly in the next quarter's growth forecast.",
            },
            {
              title: "Simulating Compound Referral Generations",
              scenario: "A growth marketer models 5 referral cycles at a 2.8 K-Factor starting from 1,000 users. The compound growth table shows cumulative users climbing past 250,000 by the fifth generation — illustrating why even a short viral window can meaningfully change a product's trajectory.",
            },
            {
              title: "Diagnosing a Weak Conversion Funnel",
              scenario: "A team with a low 8% conversion rate uses the Referral Effectiveness rating (Low) to realize their invitation volume is fine but the landing page converting invitees into signups needs redesign — a different fix than simply asking users to invite more people.",
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
                "Improve invitation volume and conversion rate independently — a product can raise K by getting users to send more invites, by improving how well those invites convert, or both, and knowing which lever moved is more useful than the K number alone.",
                "Measure K-Factor over a consistent time window (e.g. 30 days) rather than an all-time average, since referral behavior often changes as a product matures.",
                "Combine viral growth with at least one paid or content-driven acquisition channel — even a K-Factor above 1 rarely stays elevated forever, and diversified growth is more resilient.",
                "Use the compound referral projection cautiously for planning beyond 2–3 generations — real-world K-Factor tends to decay as easy referral opportunities are exhausted, unlike the constant-K math used in a simple projection.",
                "Simplify the sharing action itself (one-click invites, pre-filled messages) — reducing friction in how users invite others often moves K more than incentive programs alone.",
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
                "Don't assume K-Factor alone determines total growth — it multiplies with your existing user base and other acquisition channels, so a high K-Factor on a tiny user base still produces a small absolute number of new users.",
                "Don't confuse a single successful viral moment with a sustained K-Factor — spikes from press coverage or a viral post often decay quickly back toward baseline referral behavior.",
                "Don't ignore churn when celebrating a K-Factor above 1 — a product can have great viral growth and still shrink overall if churn exceeds the new users referrals bring in.",
                "Don't project compound referral generations indefinitely — assuming a constant K-Factor across many generations overstates growth, since the pool of people left to invite eventually shrinks.",
                "Don't optimize only for invitation volume — pushing users to send more invites without improving conversion rate can hurt K-Factor if it feels spammy and reduces trust in future invitations.",
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

      {/* ── Formula Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          K-Factor Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">K-Factor Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Growth Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["0", "No Growth", "Referrals generate no new users at all."],
                ["0 – 1", "Sub-Viral Growth", "Every referral generation is smaller than the last."],
                ["≈ 1", "Stable Growth", "Each user roughly replaces themselves through referrals."],
                ["1 – 2", "Viral Growth", "Each generation of referred users is larger than the last."],
                ["2 – 5", "Strong Viral Growth", "Referrals alone compound the user base significantly."],
                ["5+", "Exceptional Viral Growth", "Rare, breakout-level referral performance."],
              ].map(([range, category, meaning]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-2.5 px-4 text-gray-700">{category}</td>
                  <td className="py-2.5 px-4 text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* K = Average Invitations × (Conversion Rate ÷ 100). Example: 5 invitations × 20% conversion = K of 1.00.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a Viral Coefficient (K-Factor)?",
              a: "The Viral Coefficient, or K-Factor, measures how many additional users each existing user brings into your product through referrals, invitations, or sharing. It's calculated as K = Average Invitations Per User × Conversion Rate.",
            },
            {
              q: "What is a good Viral Coefficient?",
              a: "Generally, a K-Factor above 1 indicates sustainable viral growth, since each generation of referred users is larger than the last. A K-Factor of 1 means growth is stable but not compounding, and below 1 means referrals alone will shrink over time.",
            },
            {
              q: "How do I calculate Viral Coefficient?",
              a: "Multiply the average number of invitations each user sends by your invitation conversion rate (as a decimal): K = Invitations × (Conversion Rate ÷ 100). For example, 5 invitations at a 20% conversion rate gives K = 5 × 0.20 = 1.00.",
            },
            {
              q: "Can a Viral Coefficient be greater than 5?",
              a: "Yes, although it is uncommon and usually occurs during highly successful viral campaigns or breakout product moments. Sustaining a K-Factor that high over a long period is rare, as easy referral opportunities are typically exhausted after the initial spike.",
            },
            {
              q: "How is Projected New Users calculated?",
              a: "Projected New Users = Existing Users × K. For example, 1,000 existing users at a K-Factor of 1.5 projects 1,500 new users from the current referral loop.",
            },
            {
              q: "What does the compound referral projection show?",
              a: "It simulates multiple generations of referrals, where each generation's users are calculated as Existing Users × K raised to the power of the generation number. This shows how quickly growth compounds if the K-Factor holds steady across several referral cycles.",
            },
            {
              q: "What is Referral Effectiveness, and how is it different from K-Factor?",
              a: "Referral Effectiveness rates your conversion rate alone (Low, Moderate, High, or Very High), independent of invitation volume. A product can have a high K-Factor purely from sending many invitations even with low effectiveness, or a strong effectiveness rating with too few invitations to reach K = 1.",
            },
            {
              q: "Is this calculation accurate for predicting real growth?",
              a: "The calculation follows the standard industry K-Factor formula and is accurate as a snapshot metric. Actual business growth also depends on retention, churn, other acquisition channels, and customer lifetime value, which this calculator does not account for directly.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your invitation and conversion data are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 8 ? "border-b border-gray-100 pb-6" : ""}>
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
            { icon: "🚀", title: "Startup Founders & SaaS Businesses", desc: "Measure how much of their growth comes from referrals versus paid acquisition, and decide where to invest next." },
            { icon: "📈", title: "Product Managers & Growth Marketers", desc: "Model the impact of onboarding, incentive, and sharing-flow changes on K-Factor before shipping them." },
            { icon: "📱", title: "Mobile App Developers", desc: "Track viral loops built into app-sharing features and forecast install growth from word-of-mouth." },
            { icon: "📣", title: "Social Media & Affiliate Marketers", desc: "Quantify how effectively a campaign's sharing mechanics turn existing audiences into new ones." },
            { icon: "💰", title: "Investors", desc: "Evaluate a startup's organic growth engine and unit economics as part of growth due diligence." },
            { icon: "🎓", title: "Students Learning Growth Marketing", desc: "Learn how invitation volume and conversion rate combine to drive compounding viral growth." },
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
