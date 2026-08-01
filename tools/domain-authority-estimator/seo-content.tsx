export default function DomainAuthorityEstimatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Domain Authority Estimator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>domain authority estimator</strong> is a free browser-based SEO tool that calculates a website's estimated authority score using a transparent, weighted algorithm built from publicly known ranking signals. Unlike official Domain Authority — a proprietary metric owned by Moz that requires access to their private web index and algorithm — this estimator uses inputs you can collect from any standard SEO platform to produce a comparable, actionable score between 0 and 100.
          </p>
          <p>
            Domain authority reflects how likely a website is to rank well in search engine results. It is not a metric Google uses directly, but it is widely accepted as a proxy for link equity, trustworthiness, and competitive positioning. A site with a high estimated DA has accumulated more quality referring domains, older domain history, higher organic traffic, and cleaner backlink signals than a lower-scoring competitor. Understanding these signals — and how they combine — is essential for diagnosing ranking gaps and prioritising SEO investments.
          </p>
          <p>
            This tool is built for <strong>SEO professionals, digital marketers, website owners, content strategists, link-building specialists, and SEO students</strong> who need an instant, data-informed authority benchmark without a paid Moz subscription. Enter signals from Ahrefs, SEMrush, Google Search Console, or any backlink tool. The score, factor breakdown, strengths, weaknesses, and prioritised recommendations update instantly in your browser — no data is sent to any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Domain Authority Score Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The estimator uses a seven-factor weighted algorithm. Each input is first normalised to a 0–100 scale — using logarithmic scaling for backlink and traffic counts to prevent unrealistic score jumps at high volumes — then multiplied by its assigned weight. A spam score penalty is subtracted last. The final score is clamped between 0 and 100.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Scoring Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p>DA = (rdScore × 0.35) + (blScore × 0.20) + (trafficScore × 0.15)</p>
              <p className="pl-5">+ (ageScore × 0.10) + (httpsScore × 0.05)</p>
              <p className="pl-5">+ (brandScore × 0.05) + (contentScore × 0.05)</p>
              <p className="pl-5">− (spamScore × 0.15)</p>
              <p className="text-gray-400 text-xs mt-2">Result clamped to 0–100</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Referring Domains (35%)", "Logarithmically scaled up to 1,000,000 unique linking domains — the single largest authority signal because link diversity outweighs raw link volume."],
              ["Total Backlinks (20%)", "Logarithmically scaled up to 100,000,000 links — high volume matters but yields diminishing returns without domain diversity."],
              ["Organic Traffic (15%)", "Logarithmically scaled up to 5,000,000 monthly visitors — reflects real-world search visibility and content relevance."],
              ["Domain Age (10%)", "Linear scale capped at 25 years — older domains have accumulated more trust signals over time passively."],
              ["HTTPS (5%)", "Binary signal — secure connection enabled scores 100, disabled scores 0. A confirmed Google ranking factor since 2014."],
              ["Brand Mentions (5%)", "Tiered score across Low / Medium / High / Very High — entity signals from unlinked mentions contribute to authority."],
              ["Content Quality (5%)", "Tiered score across Poor / Average / Good / Excellent — quality content earns natural links and topical trust."],
              ["Spam Score Penalty (−15%)", "Applied as spamScore × 0.15 — a 40% spam score removes 6 points from the final estimate."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Domain Authority Estimator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Pull Your Backlink Data", "Open Ahrefs Site Explorer, SEMrush Backlink Analytics, Moz Link Explorer, or Majestic for the domain you want to evaluate. Note the referring domain count, total backlink count, and spam score. These three figures drive 70% of your estimated score."],
                ["Enter Domain and Core Signals", "Type the domain name — the tool automatically strips https://, www., and trailing slashes. Enter referring domains and total backlinks in the number fields. These carry the two highest weights (35% and 20%) in the algorithm."],
                ["Add Traffic and Age", "Enter your estimated monthly organic visitors from Google Search Console or an SEO platform's Traffic Overview. Add the domain's registration age in years — find this via WHOIS lookup or directly in your registrar dashboard."],
                ["Set the Spam Score Slider", "Drag the spam score slider to match your backlink audit figure. Moz's spam score, Ahrefs' toxicity rating, or SEMrush's toxicity score can inform this value. A clean profile sits at 0–5%; anything above 20% applies a significant penalty."],
                ["Configure Quality Signals", "Toggle HTTPS on or off to reflect your current server configuration. Select the brand mentions tier that best represents your domain's online presence. Choose the content quality level that reflects your site's depth and authority."],
                ["Read the Score and Act on Recommendations", "Your estimated DA score, authority level, circular gauge, strengths, weaknesses, and prioritised recommendations update in real time. Work from the top of the recommendations list — those actions carry the most weight. Export as TXT or JSON for reporting, or copy the full report to clipboard."],
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
                "Real-time DA score with 150ms debounced updates",
                "Animated circular SVG gauge with live score",
                "Seven-factor weighted scoring algorithm",
                "Logarithmic scaling for backlinks and traffic",
                "Spam score slider with live penalty display",
                "HTTPS toggle, brand mentions, and content quality inputs",
                "Colour-coded authority levels: Very Weak → Excellent",
                "Factor breakdown with individual progress bars",
                "Strengths and weaknesses panels",
                "Prioritised recommendations ordered by impact",
                "DA score reference table (0–100 interpretation)",
                "Algorithm weight transparency table",
                "Export report as TXT or JSON",
                "Copy full report to clipboard in one click",
                "Save up to 20 estimates to local browser history",
                "All processing runs locally — no data leaves your browser",
                "No signup, no account, no rate limits",
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
              title: "Competitor Benchmarking Before a Campaign",
              scenario: "An SEO strategist is planning a six-month link-building campaign for a SaaS client currently sitting at an estimated DA of 32. They run the top three competitors through the estimator and find two score 58 and 61. The factor breakdown reveals that the gap is almost entirely in referring domains — competitors have 800+ while the client has 120. The strategist sets a target of 300 referring domains over six months and allocates outreach budget accordingly.",
            },
            {
              title: "Prospect Qualification for Guest Posts",
              scenario: "A link-building specialist evaluates 15 prospect sites before sending outreach emails. Rather than paying for 15 Moz API lookups, they pull referring domain counts and ages from Ahrefs free tier, then run each site through the estimator. Sites scoring above 40 are added to the outreach list; those below 20 are deprioritised unless they are highly relevant niche publications.",
            },
            {
              title: "Monthly Client Authority Report",
              scenario: "A digital marketing agency tracks authority trends for eight clients monthly. An account manager pulls each client's referring domain count, backlink volume, and spam score from SEMrush, enters the figures, and exports the JSON report. Scores are pasted into the monthly reporting template to show month-over-month authority progression alongside ranking and traffic data.",
            },
            {
              title: "Diagnosing a Ranking Drop",
              scenario: "A website owner notices their primary product page dropped from position 3 to position 11 after a Google core update. They run the estimator and find their spam score has crept from 4% to 28% following a link exchange arrangement six months earlier. The spam penalty alone is subtracting 4.2 points from their estimated score. They initiate a backlink audit and submit a disavow file to Google Search Console.",
            },
            {
              title: "New Domain vs Aged Domain Acquisition Decision",
              scenario: "An affiliate marketer is choosing between registering a new domain and acquiring a 7-year-old expired domain with 180 referring domains but a 35% spam score. They run both scenarios through the estimator. The new domain scores 14 with default signals; the aged domain scores 41 after the spam penalty is applied. They decide to acquire the aged domain and budget three months for backlink cleanup before launching content.",
            },
            {
              title: "Teaching SEO Authority Fundamentals",
              scenario: "An SEO instructor uses the estimator in a workshop with 20 students. Each student inputs their own blog's data and watches how adjusting referring domains from 10 to 100 shifts their score by roughly 22 points — more than any other single action. The transparent weight display makes the relative value of each signal immediately clear without requiring students to reverse-engineer a black-box tool.",
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
                "Focus on referring domains first — they carry 35% of the score and respond fastest to outreach campaigns. Going from 50 to 200 unique linking domains will move your estimated DA more than tripling your raw backlink count from the same 50 sites.",
                "Use logarithmic intuition when setting goals: the jump from 0 to 1,000 referring domains is much larger in score terms than the jump from 5,000 to 6,000. Early link-building has disproportionate returns on authority.",
                "Set your spam score conservatively — it is better to overestimate and fix the problems than to underestimate and wonder why your rankings are soft. A 20% spam score removes 3 full points from your estimated DA.",
                "Run the estimator monthly to track authority trends, not just as a one-time audit. A consistent upward trajectory in estimated DA — even by 1–2 points per month — correlates with ranking improvements over a 6–12 month period.",
                "When comparing two domains, hold all variables constant except the one you are investigating. This reveals the marginal impact of each signal and helps you decide where to invest time and budget for maximum authority gain.",
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
                "Don't treat this score as identical to Moz's official DA. The two scores may differ because this estimator uses a transparent public-signal algorithm while Moz's metric incorporates proprietary crawl data, link quality signals, and weighting adjustments you cannot replicate externally.",
                "Don't ignore the spam score penalty in favour of maximising backlink volume. 500 backlinks from 10 low-quality, spammy sites may raise your raw link count while simultaneously pushing your spam score above 30% — a net negative for estimated authority.",
                "Don't compare estimated DA scores across completely different niches without context. A local service business with DA 35 competing in a low-competition local market may outrank a news site with DA 55 in their specific niche searches.",
                "Don't use estimated DA as your only decision metric when buying or acquiring domains. Always supplement with a manual backlink audit to check for link scheme history, past penalties, and anchor text over-optimisation that a single score cannot capture.",
                "Don't obsess over the exact score number. A score of 47 vs 49 is not meaningful — focus on the trend direction and the specific weaknesses identified in the recommendations panel, which give you concrete actions to take.",
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
          Domain Authority Signal Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Signal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Weight</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Scaling Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Referring Domains",  "35%",  "Log₁₀ scale to 1M",    "Highest — prioritise above raw backlink count"],
                ["Total Backlinks",    "20%",  "Log₁₀ scale to 100M",  "Strong — diminishing returns without domain diversity"],
                ["Organic Traffic",    "15%",  "Log₁₀ scale to 5M/mo", "Reflects search visibility and content topical depth"],
                ["Domain Age",         "10%",  "Linear, cap 25 years",  "Passive — improves over time without action needed"],
                ["HTTPS Security",     "5%",   "Binary",                "Quick win — migrate once and the signal is permanent"],
                ["Brand Mentions",     "5%",   "Tiered (4 levels)",     "Entity authority signal — grows with PR and community presence"],
                ["Content Quality",    "5%",   "Tiered (4 levels)",     "Influences natural link earning and topical relevance"],
                ["Spam Score",         "−15%", "Linear penalty",        "Negative — toxic links actively reduce estimated authority"],
              ].map(([signal, weight, scaling, impact]) => (
                <tr key={signal} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{signal}</td>
                  <td className={`py-2.5 px-4 font-mono font-semibold ${weight.startsWith("−") ? "text-red-600" : "text-primary"}`}>{weight}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{scaling}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* This scoring algorithm is transparent and independent from Moz's proprietary DA metric. Weights are based on publicly documented SEO ranking factor research.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Domain Authority (DA)?",
              a: "Domain Authority is a score from 0 to 100 developed by Moz that predicts how likely a domain is to rank in search engine result pages. It is calculated using a proprietary algorithm that considers the quantity and quality of inbound links, linking domain diversity, and other signals from Moz's web index. DA is not a metric used by Google — it is an SEO industry proxy for competitive benchmarking. Higher scores indicate greater link equity and ranking potential relative to other domains.",
            },
            {
              q: "How is this estimator different from Moz's official DA?",
              a: "Moz's official Domain Authority is calculated using their proprietary web crawl data covering hundreds of billions of links, their own quality-weighting algorithms, and machine learning trained on ranking outcomes. This estimator uses a transparent, publicly documented formula applied to signals you provide manually. The two scores will differ — sometimes significantly — because this tool cannot replicate Moz's proprietary link quality assessments or crawl breadth. Use this tool for directional guidance and trend tracking, not as a substitute for the official Moz score.",
            },
            {
              q: "What is a good Domain Authority score?",
              a: "DA is a relative metric — what constitutes a 'good' score depends entirely on your competition. A DA of 35 is excellent for a local business website competing in low-competition local searches but weak for an e-commerce site competing against DA 70+ retailers. As a rough guide: 0–20 is typical for new or low-link sites, 21–40 for growing sites with active link-building, 41–60 for established mid-authority sites, 61–80 for strong industry authorities, and 81–100 is reserved for major brands and news publications.",
            },
            {
              q: "Why does referring domains carry more weight than total backlinks?",
              a: "Google and most SEO research consistently show that the number of unique domains linking to a site is a stronger authority signal than raw link count. 500 backlinks from 500 unique domains represents broad editorial recognition across the web. 500 backlinks from 5 domains — even strong ones — represents concentrated link equity with limited diversity. A site can manipulate raw backlink counts easily, but earning genuine links from hundreds of different sites is harder to fake and correlates more strongly with organic ranking success.",
            },
            {
              q: "How do I find my referring domain count?",
              a: "The most accurate sources are paid SEO platforms: Ahrefs Site Explorer shows referring domains on the main overview dashboard, SEMrush shows it in Backlink Analytics under the Referring Domains tab, and Moz Link Explorer shows Linking Root Domains. For a free estimate, Google Search Console's Links report shows your top linking sites — count the unique domains in that list. Keep in mind that Google's reported linking sites are a sample, so the actual count may be higher than what GSC shows.",
            },
            {
              q: "What is spam score and why does it reduce my authority estimate?",
              a: "Spam score is a metric that estimates the proportion of your backlink profile that comes from low-quality, spammy, or link-scheme sources. Moz's spam score, Ahrefs' toxicity score, and SEMrush's toxicity rating all measure related but slightly different aspects of backlink quality. In this estimator, a high spam score applies a direct penalty because toxic backlinks are associated with lower search rankings, algorithmic penalties from Google's link spam detection, and manual action risk in Google Search Console.",
            },
            {
              q: "How can I improve my domain authority?",
              a: "The highest-impact actions in order are: (1) Earn links from more unique referring domains through guest posts, digital PR, resource page outreach, and original research. (2) Reduce your spam score by auditing and disavowing toxic backlinks via Google Search Console. (3) Create high-quality content that earns natural links from authoritative sources in your niche. (4) Ensure HTTPS is enabled — a quick technical fix that permanently satisfies this ranking signal. (5) Build brand visibility through PR, podcast appearances, and community engagement to increase entity authority signals.",
            },
            {
              q: "How long does it take to improve domain authority?",
              a: "Authority scores respond to link-building with a delay of weeks to months — both for Moz's crawl cycle to index new links and for the underlying ranking improvements that reflect genuine authority gain. A focused link-building campaign targeting 50 new referring domains typically shows measurable authority improvement within 3–6 months. Domain age is the only signal that cannot be accelerated — it improves passively. Spam score reduction often takes 2–4 months after a disavow submission for Google to process the changes.",
            },
            {
              q: "Can I use this tool to estimate competitor authority?",
              a: "Yes. Pull your competitor's referring domain count, backlink count, domain age, and traffic estimate from any SEO platform, then enter those values into the estimator. Compare the factor breakdown side by side with your own domain to identify the specific gaps. The most common finding is that competitors with higher rankings have significantly more referring domains — often 3–10 times more — while other factors like domain age and HTTPS are roughly equivalent.",
            },
            {
              q: "Does this tool store my data?",
              a: "No. All calculations run entirely in your browser using JavaScript. None of the domain names, backlink counts, or other signals you enter are transmitted to any server. When you use the Save to History feature, data is stored only in your browser's localStorage — it stays on your device and is cleared when you clear your browser data. This makes the tool safe for auditing client domains or sensitive internal data.",
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Tool?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔍", title: "SEO Professionals",    desc: "Benchmark client domains against competitors, diagnose authority gaps, track month-over-month score trends, and identify the highest-impact link-building opportunities before committing outreach budget." },
            { icon: "📈", title: "Digital Marketers",    desc: "Qualify link prospects quickly without a paid Moz subscription, produce structured authority reports for client dashboards, and explain DA concepts to stakeholders using the transparent weight breakdown." },
            { icon: "🌐", title: "Website Owners",       desc: "Understand where your domain stands relative to competitors, identify which SEO signals are weakest, and get a clear prioritised action list without needing to interpret complex platform dashboards." },
            { icon: "✍️", title: "Content Strategists", desc: "Estimate the authority of publications being considered for guest posts or content partnerships, and understand how a strong content quality score contributes to overall domain authority over time." },
            { icon: "🏢", title: "Marketing Agencies",  desc: "Generate authority benchmarks across multiple client domains in a structured, exportable format — without using API credits. Use JSON exports to pipe data into custom reporting workflows." },
            { icon: "🎓", title: "SEO Students",         desc: "Learn how domain authority is constructed from individual signals, explore the impact of each factor by adjusting inputs, and build intuition for which SEO investments deliver the highest authority return." },
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
