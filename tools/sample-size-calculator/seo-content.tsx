export default function SampleSizeCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Sample Size Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>sample size calculator</strong> is a free browser-based tool that determines the <strong>minimum number of responses</strong> you need to collect for statistically reliable results. It answers the core question every researcher faces before running a survey, poll, or study: <em>how many people do I actually need to ask?</em>
          </p>
          <p>
            Choosing a sample size by guesswork risks two costly mistakes — surveying too few people (producing results too imprecise to trust) or surveying far more than necessary (wasting time and budget). This calculator solves that with the standard statistical formula used by survey companies, pollsters, and researchers worldwide, factoring in your population size, confidence level, margin of error, expected response distribution, and design effect for complex sampling designs.
          </p>
          <p>
            This tool is built for <strong>students, researchers, university faculty, healthcare professionals, survey companies, UX researchers, product managers, business analysts, marketing teams, polling organizations, data scientists, and government agencies</strong>. It runs entirely in your browser — no data is ever sent to a server, and results update instantly as you type.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Sample Size Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator first computes the sample size needed for an infinite population using the standard proportion formula, then applies a finite population correction if you provide a known population size. A design effect multiplier can inflate the result for cluster or multi-stage sampling designs, and a one-sided or two-sided test setting determines which Z-score is used.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>n = (Z² × p × (1 − p)) ÷ E²</p>
              <p>n_adjusted = n ÷ (1 + ((n − 1) ÷ N))</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Z-score", "Derived from your chosen confidence level and test type (one-sided or two-sided) using a standard normal distribution lookup table."],
              ["Expected Proportion (p)", "Your best estimate of how responses will be split. 50% is the most conservative choice and produces the largest, safest sample size."],
              ["Margin of Error (E)", "How much sampling error you're willing to accept, expressed as a percentage."],
              ["Finite Population Correction", "Automatically applied whenever you provide a population size instead of checking Infinite Population — it reduces the required sample for smaller populations."],
              ["Design Effect (DEFF)", "Multiplies the raw sample size to account for cluster sampling, stratification, or other complex survey designs. Leave at 1 for simple random sampling."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step + Key Features ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Sample Size Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Population Size", "Type your total population, or check Infinite Population if you're surveying a very large or unbounded group such as national voters."],
                ["Choose a Confidence Level", "Select how confident you want to be that your results reflect the true population — 95% is the industry standard."],
                ["Set Your Margin of Error", "Choose how much sampling error you can tolerate, from 0.1% to 20%. Lower values require larger samples."],
                ["Adjust Expected Proportion", "Drag the slider to your best estimate of the response split, or leave it at 50% for the safest, most conservative result."],
                ["Fine-Tune Advanced Options", "Optionally set a design effect for cluster sampling, switch between one-sided and two-sided tests, or toggle the confidence interval panel."],
                ["Read the Live Result", "The required sample size, Z-score, calculation steps, and plain-language interpretation update instantly as you adjust any input."],
                ["Export or Share", "Copy the result, download a CSV, TXT, or JSON report, print it, or copy a shareable URL with your inputs encoded."],
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
                "Finite population correction with an infinite population option",
                "Confidence levels from 80% to 99.9% with one-sided and two-sided testing",
                "Adjustable margin of error from 0.1% to 20% with a visual bar",
                "Expected proportion slider with conservative-estimate guidance",
                "Design effect (DEFF) support for cluster and multi-stage sampling",
                "Full calculation steps shown for complete transparency",
                "Estimated confidence interval panel around your expected proportion",
                "Population size sensitivity chart showing how sample size scales with population",
                "Six smart presets: Academic Survey, Market Research, Medical Study, Election Poll, Customer Feedback, UX Research",
                "Side-by-side scenario comparison (Compare as A / Compare as B)",
                "Instant calculation with a 150ms debounce as you type",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
                "Automatic recommendations for very large populations and high confidence levels",
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
              title: "University Survey of a Student Body",
              scenario: "A researcher needs to survey a university with 10,000 enrolled students at a 95% confidence level and ±5% margin of error. Entering these values with a 50% expected proportion returns a required sample size of 370 — the researcher now knows exactly how many completed responses to target.",
            },
            {
              title: "National Election Poll",
              scenario: "A polling organization surveys likely voters nationwide, treating the electorate as an infinite population. At 95% confidence and ±3% margin of error, the calculator returns 1,068 respondents — the standard sample size used by most national polls.",
            },
            {
              title: "Clinical Study at a Small Hospital Network",
              scenario: "A medical researcher studying a treatment outcome in a network of 500 eligible patients needs 99% confidence with a ±5% margin of error. Using a design effect of 1.5 to account for site clustering, the calculator adjusts the sample size accordingly for the finite patient population.",
            },
            {
              title: "SaaS Customer Satisfaction Survey",
              scenario: "A product manager with 10,000 active customers wants directionally reliable feedback without surveying everyone. At 90% confidence and a ±7% margin of error, the calculator returns a manageable sample size suited to a quick in-app survey.",
            },
            {
              title: "UX Research With a Small User Base",
              scenario: "A UX researcher with only 200 beta users needing quick usability feedback sets a 90% confidence level and a wider ±10% margin of error, appropriate for early-stage qualitative-leaning research on a small population.",
            },
            {
              title: "Market Research Across a Large Customer Base",
              scenario: "A market research firm surveying a retailer's 100,000-person loyalty program at 95% confidence and ±4% margin of error uses the finite population correction to avoid over-sampling relative to an infinite-population assumption.",
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
                "Leave the expected proportion at 50% unless you have prior data — it's the most conservative assumption and guarantees your sample is large enough regardless of the true split.",
                "Check Infinite Population whenever your population exceeds roughly 1,000,000 — the finite correction has almost no effect at that scale and the calculator will suggest it automatically.",
                "Use the Population Size Sensitivity chart to see how much sample size you'd save (or need) if your actual population turns out smaller or larger than expected.",
                "If your survey uses cluster sampling (e.g. sampling by school, clinic, or region rather than individuals), set the Design Effect above 1 — ignoring it commonly understates the true sample size needed.",
                "Tighten your margin of error only as much as you truly need — going from ±5% to ±3% roughly triples the required sample size.",
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
                "Don't confuse margin of error with confidence level — margin of error controls precision, confidence level controls how sure you are the true value falls within that margin.",
                "Don't apply finite population correction when your population is genuinely very large — it adds unnecessary complexity with negligible effect above roughly a million.",
                "Don't set expected proportion far from 50% without real prior evidence — an incorrect guess can leave you under-sampled if the true split turns out closer to even.",
                "Don't forget the design effect for multi-stage or clustered surveys — treating clustered data as a simple random sample understates your true required sample size.",
                "Don't chase 99.9% confidence by default — it dramatically increases the required sample size for only a small precision gain over 95% or 99%.",
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
          Common Sample Size Reference Table
        </h2>
        <p className="text-sm text-gray-500 mb-4">All examples use a 50% expected proportion and a two-sided test.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Population</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Confidence Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Margin of Error</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Required Sample Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10,000", "95%", "±5%", "370"],
                ["Infinite", "95%", "±3%", "1,068"],
                ["1,000", "95%", "±5%", "278"],
                ["100,000", "95%", "±4%", "597"],
                ["Infinite", "99%", "±5%", "664"],
                ["500", "90%", "±5%", "176"],
              ].map(([pop, cl, moe, n]) => (
                <tr key={pop + cl + moe} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{pop}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{cl}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{moe}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a sample size calculator?",
              a: "A sample size calculator is a free browser-based tool that determines the minimum number of responses needed for statistically reliable survey or research results. It uses your population size, confidence level, margin of error, and expected proportion to compute the required sample size using the standard statistical formula.",
            },
            {
              q: "How is sample size calculated?",
              a: "The calculator first computes n = (Z² × p × (1 − p)) ÷ E² for an infinite population, where Z is the Z-score for your confidence level, p is the expected proportion, and E is the margin of error. If you provide a finite population size, a correction formula reduces this number to account for the smaller population.",
            },
            {
              q: "What is a good sample size for a survey?",
              a: "It depends on your population, confidence level, and margin of error — there's no universal number. A common benchmark is around 385 respondents for a large or infinite population at 95% confidence and a ±5% margin of error, but smaller populations or wider margins require fewer.",
            },
            {
              q: "What is the difference between confidence level and margin of error?",
              a: "Confidence level is how certain you want to be that your sample reflects the true population — for example, 95% confidence means that if you repeated the survey 100 times, about 95 of those samples would contain the true value within the margin of error. Margin of error is how wide that range of uncertainty is, expressed as a percentage.",
            },
            {
              q: "How do I decide between finite and infinite population?",
              a: "Use a finite population whenever you know the total size of the group you're studying and it's under roughly 1,000,000 — the correction meaningfully reduces the required sample. For very large or effectively unbounded populations, such as a country's general public, check Infinite Population.",
            },
            {
              q: "What does Expected Proportion mean, and why does 50% matter?",
              a: "Expected proportion is your best guess at how responses will split — for example, the percentage of people expected to answer 'yes.' The value p × (1 − p) is maximized at p = 50%, which is why 50% produces the largest, most conservative sample size when the true split is unknown.",
            },
            {
              q: "What is the Design Effect (DEFF) and when should I use it?",
              a: "Design Effect accounts for sampling designs more complex than simple random sampling, such as cluster sampling by school, clinic, or geographic region. A DEFF greater than 1 inflates the required sample size to compensate for the reduced statistical efficiency of clustered data.",
            },
            {
              q: "What's the difference between a one-sided and two-sided test?",
              a: "A two-sided (two-tailed) test accounts for the possibility of a difference in either direction and is the standard choice for most surveys. A one-sided (one-tailed) test only checks for a difference in one specific direction and requires a smaller Z-score, and therefore a smaller sample size, for the same confidence level.",
            },
            {
              q: "Why does a smaller margin of error require a much larger sample?",
              a: "Margin of error appears squared in the denominator of the sample size formula, so cutting it in half roughly quadruples the required sample size. Going from a ±10% to a ±5% margin of error, for instance, increases the required sample size by about four times.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "🎓", title: "Students & Researchers", desc: "Determine the correct sample size before running a thesis survey, experiment, or academic study." },
            { icon: "🏥", title: "Healthcare Professionals", desc: "Plan clinical studies and patient surveys with statistically defensible sample sizes." },
            { icon: "📊", title: "Survey Companies & Pollsters", desc: "Set target response counts for polls, market research, and public opinion surveys." },
            { icon: "🖥️", title: "UX Researchers & PMs", desc: "Size usability studies and in-product surveys appropriately for a limited user base." },
            { icon: "📈", title: "Business & Data Analysts", desc: "Validate that internal survey and testing sample sizes are large enough to trust the results." },
            { icon: "🏛️", title: "Government Agencies", desc: "Plan census-adjacent surveys and public policy research with reliable statistical precision." },
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
