export default function IndexSizeCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Index Size Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>index size calculator</strong> is a free browser-based tool that estimates the approximate storage size of a database index before you create it — helping you plan disk usage across PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, and SQLite.
          </p>
          <p>
            Enter your row count, indexed column size, and primary key size, and the calculator instantly estimates the raw index size, compression savings, fill-factor impact, and final estimated storage footprint — plus the estimated page count for your chosen page size.
          </p>
          <p>
            This tool is intended as an <strong>estimation calculator, not an exact database profiler</strong>. Actual index size depends on engine internals, storage engine, version, alignment, and compression settings, so treat these numbers as planning estimates rather than precise measurements. It's built for <strong>database administrators, backend developers, data engineers, DevOps engineers, cloud architects, and students</strong> learning database optimization — and it runs entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Index Size Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator builds up an estimate in layers: it starts from a per-row entry size, multiplies by your row count, then applies index-type, compression, fill-factor, and overhead adjustments.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Entry Size = Column Size + Primary Key Size + Pointer + Metadata</p>
              <p>Raw Index Size = Entry Size × Number of Rows</p>
              <p>Compressed Size = Raw Size × Index Type × Compression Ratio</p>
              <p>Fill-Factor Adjusted = Compressed Size ÷ (Fill Factor ÷ 100)</p>
              <p>Final Estimated Size = Adjusted Size × (1 + Overhead %)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Database Pointer & Metadata", "Each engine has a typical per-entry pointer and row-header overhead used automatically based on your selected database engine."],
              ["Index Type Multiplier", "Different index types (B-Tree, GIN, BRIN, Bitmap, and others) have very different typical storage footprints relative to a standard B-Tree, applied as an estimated multiplier."],
              ["Fill Factor", "A lower fill factor leaves more free space per page for future updates, increasing the effective storage footprint."],
              ["Estimated Overhead", "An adjustable buffer for internal structures like free space maps, visibility maps, and index maintenance metadata not captured elsewhere."],
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
          How to Use the Index Size Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Database Engine", "Select PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, SQLite, or Custom."],
                ["Choose an Index Type", "Select B-Tree, Hash, Composite, GIN, BRIN, or another type — each has a different typical storage profile."],
                ["Enter Rows & Column Sizes", "Type your row count, indexed column size, and primary key size in bytes."],
                ["Adjust Fill Factor & Overhead", "Use the sliders to model page density and additional engine overhead."],
                ["Set Page Size & Compression", "Choose your database's page size and an optional compression level."],
                ["Read the Live Result", "Estimated index size, storage breakdown, and page count update instantly as you type."],
                ["Export or Share", "Copy the report, download a CSV or JSON file, print it, or copy a shareable URL."],
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
                "Support for 7 database engines and 11 index types with engine-specific defaults",
                "Composite index estimator for multi-column indexes",
                "Compare two index types side-by-side with a bar chart",
                "Storage breakdown pie chart (compressed data, fill-factor impact, overhead)",
                "Fill factor and overhead sliders with live recalculation",
                "Column type quick-fill suggestions (UUID, BIGINT, VARCHAR, and more)",
                "Automatic Bytes → KB → MB → GB → TB formatting",
                "Estimated page count based on your selected page size",
                "Large index warning when write performance may be impacted",
                "Quick example presets matching common real-world scenarios",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
                "All processing runs locally — no schema details are ever uploaded",
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
              title: "Pre-Deployment Storage Planning",
              scenario: "A DBA estimates the storage footprint of a new B-Tree index on a 5-million-row PostgreSQL table before creating it, confirming disk capacity is sufficient ahead of a production migration.",
            },
            {
              title: "Choosing Between Index Types",
              scenario: "A backend engineer compares a standard B-Tree index against a BRIN index for a large, naturally-ordered timestamp column, discovering the BRIN index is dramatically smaller for the same query benefit.",
            },
            {
              title: "VARCHAR Column Overhead Estimation",
              scenario: "A data engineer estimates the index size for a VARCHAR(40) column across 25 million MySQL rows before deciding whether to index the full column or a shorter prefix.",
            },
            {
              title: "Composite Index Cost Analysis",
              scenario: "A software engineer estimates the storage cost of adding a 3-column composite index on a 150-million-row SQL Server table before approving the schema change.",
            },
            {
              title: "Compression Strategy Evaluation",
              scenario: "A cloud architect compares estimated index sizes at different compression levels to decide whether enabling index compression is worth the added CPU overhead.",
            },
            {
              title: "Database Optimization Coursework",
              scenario: "A student learning database internals uses the calculator to understand how fill factor, pointer size, and index type each contribute to overall index storage.",
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
                "Use the Compare feature before choosing between two index types on the same table — the size difference can be substantial.",
                "BRIN indexes are dramatically smaller than B-Tree for naturally-ordered data like timestamps, but only useful for range queries on that ordering.",
                "A lower fill factor increases index size but reduces page splits on tables with frequent updates — it's a storage-for-performance trade-off.",
                "Use the column type quick-fill buttons to avoid guessing byte sizes for common types like UUID or BIGINT.",
                "Treat every result as an estimate — always validate against your actual database's index statistics before final capacity planning.",
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
                "Don't treat this tool as an exact profiler — real index size depends on engine version, alignment, and internal implementation details this calculator can't fully model.",
                "Don't forget that composite indexes add bytes for every additional column, not just the primary indexed column.",
                "Don't assume all index types shrink with compression the same way — some engines don't support compression for certain index types at all.",
                "Don't ignore the large index warning — very large indexes can noticeably slow down write-heavy workloads.",
                "Don't confuse fill factor with compression — fill factor controls page density for future updates, while compression reduces the raw stored bytes.",
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
          Index Type Size Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Index Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Relative Size</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["B-Tree", "1.0×", "General-purpose ordered index — the most common type"],
                ["Hash", "0.85×", "Equality lookups only, no range queries"],
                ["BRIN", "0.05×", "Extremely compact — naturally-ordered columns like timestamps"],
                ["Bitmap", "0.3×", "Low-cardinality columns in analytical workloads"],
                ["GIN", "1.8×", "Multi-value columns like arrays, JSON, and full-text search"],
                ["Full Text", "2.0×", "Term dictionaries and positional search data"],
                ["Clustered", "1.3×", "Data rows stored together with the index"],
              ].map(([type, size, use]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{type}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{size}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{use}</td>
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
              q: "What is an index size calculator?",
              a: "An index size calculator is a free browser-based tool that estimates the approximate storage size of a database index before you create it, based on row count, column sizes, index type, and database engine.",
            },
            {
              q: "How is index size calculated?",
              a: "Entry Size = Column Size + Primary Key Size + Pointer + Metadata, then Raw Index Size = Entry Size × Number of Rows. For example, a PostgreSQL B-Tree index on 5 million rows with a 16-byte column and 8-byte primary key has an entry size of 40 bytes, producing a raw index size of about 191 MB before compression, fill factor, and overhead adjustments.",
            },
            {
              q: "Is this an exact measurement of my database's index size?",
              a: "No — this is an estimation tool, not a database profiler. Actual index size depends on your specific database engine version, page alignment, storage engine internals, and configuration, which this calculator approximates but cannot replicate exactly.",
            },
            {
              q: "Why is a BRIN index so much smaller than a B-Tree index?",
              a: "BRIN (Block Range INdex) stores summary information per block range rather than an entry for every row, making it dramatically more compact for naturally-ordered data like timestamps — at the cost of being less precise for arbitrary lookups.",
            },
            {
              q: "What does fill factor do to index size?",
              a: "A lower fill factor leaves more free space on each page to accommodate future updates without page splits, which increases the effective storage footprint — the calculator divides the compressed size by the fill factor to model this.",
            },
            {
              q: "What's the difference between compression and fill factor?",
              a: "Compression reduces the actual number of bytes stored for your data. Fill factor controls how densely those bytes are packed onto disk pages, leaving room for future growth — they affect size in opposite directions.",
            },
            {
              q: "How does the Composite Index option work?",
              a: "When you select Composite as the index type, you can specify additional columns beyond the primary indexed column. Each additional column is estimated using the same indexed column size you've entered, and added to the per-row entry size.",
            },
            {
              q: "Is my schema information private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. No table names, column names, row counts, or schema details are ever transmitted to any server.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 7 ? "border-b border-gray-100 pb-6" : ""}>
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
            { icon: "🗄️", title: "Database Administrators", desc: "Estimate storage impact before creating indexes on large tables." },
            { icon: "💻", title: "Backend Developers", desc: "Understand indexing storage trade-offs when designing schemas." },
            { icon: "🗃️", title: "Data Engineers", desc: "Plan disk capacity for indexes across large-scale pipelines." },
            { icon: "⚙️", title: "DevOps Engineers", desc: "Validate storage budgets before database migrations and upgrades." },
            { icon: "☁️", title: "Cloud Architects", desc: "Compare indexing strategies across different database engines." },
            { icon: "🎓", title: "Students", desc: "Learn how index type, fill factor, and compression affect storage." },
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
