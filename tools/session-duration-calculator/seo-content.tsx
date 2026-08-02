export default function SessionDurationCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Session Duration Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>session duration calculator</strong> is a free browser-based tool that computes average session duration, total session time, and related engagement metrics from website, app, or analytics data. It answers a question every analytics dashboard glosses over: <em>given a total amount of time and a number of sessions, what does a typical session actually look like?</em>
          </p>
          <p>
            The calculator supports three input modes — manual hours/minutes/seconds entry, a single total-seconds figure, or bulk-pasted analytics data with one duration per line. It automatically converts between seconds, human-readable strings, HH:MM:SS timecodes, and decimal minutes or hours, so the same result is ready for a dashboard, a spreadsheet, or a written report without manual conversion.
          </p>
          <p>
            Built for <strong>website owners, SEO specialists, digital marketers, Google Analytics and GA4 users, product managers, mobile app developers, SaaS companies, UX researchers, and students</strong> learning analytics fundamentals, this tool processes everything locally in your browser — no session data ever leaves your device.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Session Duration Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter your total session time and number of sessions, or paste a list of individual session durations. The calculator converts everything to seconds first, divides by the session count, then converts the result back into every common format.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Total Seconds = (Hours × 3600) + (Minutes × 60) + Seconds</p>
              <p>Average Session Duration = Total Seconds ÷ Number of Sessions</p>
              <p>Hours = floor(Average ÷ 3600)</p>
              <p>Minutes = floor((Average % 3600) ÷ 60)</p>
              <p>Seconds = round(Average % 60)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Time Mode", "Enter hours, minutes, seconds, and a session count for straightforward manual calculations."],
              ["Total Seconds Mode", "Enter a single total-seconds figure alongside a session count — ideal when copying a raw number straight from an analytics export."],
              ["Bulk Paste Mode", "Paste a list of individual session durations, one per line, and the calculator sums and averages them automatically, deriving the session count from the dataset itself."],
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
          How to Use the Session Duration Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Mode", "Select Hours/Minutes/Seconds, Total Seconds, or Paste Analytics Data depending on how your session data is formatted."],
                ["Enter Your Session Data", "Type your total session time and session count, or paste one duration per line."],
                ["Read the Live Average", "The average session duration updates instantly in human-readable, HH:MM:SS, and decimal formats as you type."],
                ["Review the Calculation Breakdown", "Check exactly how your total time and session count produced the result."],
                ["Copy, Export, or Save", "Copy the result or full report, download as CSV or JSON, print a report, or save to local history."],
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
                "3 calculation modes — time entry, total seconds, and bulk paste",
                "Auto-detects plain seconds, HH:MM:SS, MM:SS, and \"Session N = seconds\" formats",
                "Real-time calculation with a 150ms debounced update",
                "Human-readable, HH:MM:SS, decimal minute, and decimal hour output",
                "Per-session bar chart visualization in bulk mode",
                "3 quick example presets",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with analytics-friendly keys",
                "Print-ready report and full-text copy",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcut — Esc to reset",
                "Inline validation with clear, friendly error messages",
                "Ignores invalid or empty rows in bulk mode automatically",
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
              title: "Converting a GA4 Export into a Readable Average",
              scenario: "A marketer exports 2 hours of total session time across 24 sessions from Google Analytics, enters it in Time Mode, and instantly gets a 5-minute average session duration to include in a monthly report.",
            },
            {
              title: "Analyzing Raw Session Logs in Bulk",
              scenario: "A developer pastes 500 individual session lengths in seconds from a server log into Bulk Paste mode and gets an instant total, average, and per-session bar chart without writing a script.",
            },
            {
              title: "Comparing Video Watch Time Across Platforms",
              scenario: "A YouTuber calculates average watch time per view using total watch minutes and view count, converting the result into both a human-readable format and decimal minutes for a sponsor report.",
            },
            {
              title: "Benchmarking Mobile App Session Length",
              scenario: "A mobile app developer pastes session durations exported from an analytics SDK, using the auto-detected HH:MM:SS format to quickly see whether average session length is trending up or down.",
            },
            {
              title: "Building a Custom Analytics Dashboard",
              scenario: "A SaaS company exports the JSON report — with total_seconds, sessions, average_seconds, and formatted_duration keys — and feeds it directly into an internal dashboard without reformatting.",
            },
            {
              title: "Teaching Analytics Fundamentals",
              scenario: "A student learning Google Analytics uses the example presets to see exactly how total time and session count combine into an average, reinforcing the underlying formula before working with a live dataset.",
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
                "Use Bulk Paste mode whenever you have raw per-session data — it automatically derives the session count, eliminating a common source of manual entry errors.",
                "Watch for the ignored-rows warning in bulk mode — it usually means a header row or malformed line slipped into your pasted data.",
                "Use decimal minutes or hours when feeding results into a spreadsheet formula, and HH:MM:SS or the human-readable format when presenting to stakeholders.",
                "Save recurring calculations to history so you can quickly compare this week's average session duration against last week's without re-entering data.",
                "Match your total session time unit to what your analytics platform actually reports — GA4 typically reports engagement time in seconds, not minutes.",
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
                "Don't confuse average session duration with median session duration — a handful of very long sessions can pull the average well above what most users actually experience.",
                "Don't mix time units when pasting bulk data — mixing raw seconds with HH:MM:SS values in the same dataset can produce misleading totals if a line is misread.",
                "Don't treat a rising average session duration as automatically positive — it can also indicate users struggling to complete a task rather than genuine engagement.",
                "Don't forget that bounce sessions (a single pageview with no further interaction) are often excluded from platform-reported averages, which can make manually calculated figures diverge from a dashboard.",
                "Don't paste headers or labels into bulk mode without checking the ignored-rows count — unrecognized text rows are silently skipped rather than causing an error.",
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
          Bulk Input Format Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Format</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example Line</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Parsed As</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Plain Seconds", "240", "240 seconds"],
                ["HH:MM:SS", "01:02:03", "3,723 seconds"],
                ["MM:SS", "02:30", "150 seconds"],
                ["Session Label", "Session 1 = 240", "240 seconds"],
              ].map(([format, example, parsed]) => (
                <tr key={format} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{format}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs font-mono">{example}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{parsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Unrecognized lines and empty rows are automatically ignored and reported as an ignored-row count.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a session duration calculator?",
              a: "A session duration calculator is a free browser-based tool that computes the average length of a session by dividing total session time by the number of sessions, and converts the result into human-readable, HH:MM:SS, and decimal formats.",
            },
            {
              q: "How is average session duration calculated?",
              a: "Average Session Duration = Total Session Time ÷ Number of Sessions. For example, 2 hours (7,200 seconds) across 24 sessions gives 7,200 ÷ 24 = 300 seconds, or 5 minutes per session.",
            },
            {
              q: "What input formats does bulk mode support?",
              a: "Bulk mode accepts one duration per line in plain seconds, HH:MM:SS, MM:SS, or the \"Session N = seconds\" format. Unrecognized lines are automatically ignored and flagged.",
            },
            {
              q: "What is the difference between average session duration and engagement time?",
              a: "Average session duration measures the typical length of a single session across your dataset, while engagement time (as reported by GA4) measures time the app or site was actively in the foreground.",
            },
            {
              q: "Can I calculate session duration from GA4 or Google Analytics data?",
              a: "Yes. Export your total session time and session count, then enter them in Hours/Minutes/Seconds or Total Seconds mode, or paste individual session lengths in bulk mode.",
            },
            {
              q: "Why does the calculator show both HH:MM:SS and decimal formats?",
              a: "Spreadsheets and dashboards often prefer decimal minutes or hours for calculations, while reports typically display HH:MM:SS or a human-readable string for readability.",
            },
            {
              q: "What happens if I enter zero sessions?",
              a: "The calculator requires at least one session to compute an average, since dividing by zero is undefined. You'll see the message: \"Number of sessions must be greater than zero.\"",
            },
            {
              q: "Does bulk mode let me set a custom session count?",
              a: "No — in bulk mode, the number of sessions is automatically derived from the count of valid duration lines you paste.",
            },
            {
              q: "Can I process thousands of session durations at once?",
              a: "Yes. Bulk mode handles large pasted datasets efficiently in the browser, though the chart preview displays only the first 60 sessions while the calculation uses the complete dataset.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your session data is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🌐", title: "Website Owners & SEO Specialists", desc: "Convert raw analytics totals into an average session duration for reporting and benchmarking." },
            { icon: "📊", title: "Google Analytics & GA4 Users", desc: "Turn exported total time and session counts into clean, presentation-ready averages." },
            { icon: "📱", title: "Mobile App Developers", desc: "Analyze bulk-exported session logs to track engagement trends across app versions." },
            { icon: "🏢", title: "SaaS Companies & Product Managers", desc: "Feed the JSON export directly into internal dashboards using analytics-friendly keys." },
            { icon: "🎥", title: "YouTubers & Content Creators", desc: "Calculate average watch time per view for sponsor and platform reporting." },
            { icon: "🎓", title: "Students & UX Researchers", desc: "Learn the session duration formula and practice applying it to different datasets." },
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
