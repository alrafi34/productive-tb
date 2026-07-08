export default function JSONValidatorSEO() {
  const faqItems = [
    {
      q: "What is a JSON validator and what does it check?",
      a: "A JSON validator parses your JSON against the ECMA-404 specification and reports exactly where the input breaks the rules. It checks for missing or extra commas, unclosed braces and brackets, unquoted keys, invalid escape sequences in strings, trailing commas, and incorrect value types. This tool also reports the character position and line number of the first syntax error it finds, so you can jump straight to the problem rather than scanning the entire document.",
    },
    {
      q: "What is the difference between validating and formatting JSON?",
      a: "Validation checks whether the JSON is syntactically correct — it is a pass or fail check. Formatting (also called beautifying or pretty-printing) takes valid JSON and re-renders it with consistent indentation and line breaks so it is easy to read. Formatting does not change the data — only the whitespace. This tool validates first and only allows formatting on input that passes validation, preventing you from formatting malformed JSON and masking the underlying error.",
    },
    {
      q: "What does JSON minification do?",
      a: "Minification removes all whitespace — spaces, tabs, and newlines — that are not part of a string value. It produces the most compact possible representation of the same JSON data. A formatted JSON file with 2-space indentation can be 30-40% larger than its minified equivalent for deeply nested structures. Minification is standard practice before embedding JSON in API responses, config bundles, or any context where payload size affects performance.",
    },
    {
      q: "What are the most common JSON syntax errors?",
      a: "The most frequent errors are: trailing commas after the last property in an object or array (valid in JavaScript but illegal in JSON), using single quotes instead of double quotes around keys or string values, unquoted keys (valid in JavaScript object literals but not in JSON), missing commas between properties, unclosed braces or brackets, and invalid escape sequences inside strings. The error message from this tool includes the character position of the first violation.",
    },
    {
      q: "Can I validate JSON from an API response?",
      a: "Yes. Copy the response body from your browser DevTools Network tab, Postman, Insomnia, or curl output and paste it directly into the editor. The validator parses it with the same JSON.parse engine your browser uses, so a valid result here means the response will parse without error in any modern JavaScript environment. This is useful for confirming that a backend endpoint is returning well-formed JSON before you wire it into your application code.",
    },
    {
      q: "What is JSON depth and why does it matter?",
      a: "JSON depth is the maximum nesting level in your document — how many objects or arrays are nested inside each other at the deepest point. A flat object has depth 1; an array of objects each containing arrays of objects might reach depth 4 or 5. Very deep nesting (depth 10 or higher) is often a sign of poorly structured data and can cause performance issues in parsers and query engines. This tool reports the maximum depth in the stats panel so you can identify over-nested structures.",
    },
    {
      q: "Is there a size limit on JSON I can validate?",
      a: "There is no enforced server-side limit because all processing runs in your browser. In practice, JavaScript's JSON.parse can handle files of several megabytes without difficulty on modern hardware. The tool displays the input size in the stats panel (bytes or KB) so you can monitor it. For very large files — tens of megabytes — browser tab memory may become a constraint, but for typical API payloads, config files, and data exports, size is not an issue.",
    },
    {
      q: "What is the difference between JSON and JavaScript object literals?",
      a: "JSON is a strict data serialisation format derived from JavaScript syntax but with tighter rules. JSON requires all keys to be double-quoted strings, does not allow trailing commas, does not support comments, and does not allow undefined, functions, or Infinity as values. JavaScript object literals are more permissive — they allow unquoted keys, single-quoted strings, trailing commas, and comments. Code that looks like valid JS object notation will often fail JSON validation for exactly these reasons.",
    },
    {
      q: "Can I save or export my formatted or minified JSON?",
      a: "Click the Copy to Clipboard button to copy the current output and paste it anywhere. The tool also maintains a local history of your last 10 validated inputs, stored in your browser's localStorage, so you can return to a previous session without re-pasting. For downloading, copy the output and paste it into a text editor, then save with a .json extension. Direct file download is not required since the clipboard covers the most common workflow.",
    },
    {
      q: "Is my JSON data private when using this tool?",
      a: "Yes. All validation, formatting, and minification runs entirely in your browser using JavaScript's native JSON.parse and JSON.stringify. Your JSON is never transmitted to any server, stored in any remote database, or accessible to anyone other than you. The history feature saves a truncated preview to your browser's localStorage only — the data stays on your device.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Paste or type your JSON", "Paste your JSON directly into the editor, or drag and drop a .json file onto the input area. The editor accepts any size of JSON — API response bodies, configuration files, data exports, or hand-written objects."],
    ["Validate", "Click Validate JSON or press Ctrl+Enter. The tool runs JSON.parse on your input and reports the result instantly. If valid, a green indicator appears. If invalid, the error message shows the exact position and line number of the first syntax violation."],
    ["Read the error message", "When validation fails, the error output shows the character position, line number, and a short context extract around the problem. Use the line number to jump to the issue in your source. Common messages include 'Unexpected token', 'Expected comma', and 'Unterminated string'."],
    ["Format for readability", "Once the JSON is valid, click Format to pretty-print it with 2-space or 4-space indentation. Formatted JSON is easier to read, diff in version control, and share with colleagues. The indentation setting is remembered between sessions."],
    ["Minify for production", "Click Minify to strip all whitespace and produce the most compact version of the JSON. Paste the minified output into API responses, environment variables, or config bundles where payload size matters."],
    ["Review the stats panel", "Check the stats display for character count, line count, file size, maximum nesting depth, and key count. These metrics are useful for understanding document structure and catching unexpected complexity."],
    ["Copy and use your output", "Click Copy to Clipboard on the formatted or minified output to transfer it to your editor, terminal, or API testing tool. The history panel lets you retrieve any of your last 10 inputs without re-pasting."],
  ];

  return (
    <>
      {/* 1. Introduction */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a JSON Validator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>JSON validator</strong> is a free online tool that parses your JSON against
            the ECMA-404 specification and tells you exactly whether it is valid — and if not,
            precisely where it breaks. Unlike copying JSON into a code editor and hoping the
            syntax highlighting catches the problem, a dedicated validator reports the character
            position, line number, and a diagnostic message for the first error it finds.
          </p>
          <p>
            JSON errors are easy to make and surprisingly hard to spot by eye. A trailing comma
            after the last property in an object is legal in JavaScript but illegal in JSON. A
            single-quoted string looks fine at a glance but fails the spec. An extra closing brace
            buried 200 lines down in a large API response can invalidate the entire document.
            These are the kinds of problems that cost developers minutes or hours when debugging
            without the right tool.
          </p>
          <p>
            This <strong>free online JSON validator</strong> is built for <strong>developers,
            API engineers, QA testers, data analysts, and anyone who works with JSON</strong>{" "}
            regularly. Beyond validation it includes <strong>JSON formatting</strong> with
            configurable indentation, <strong>JSON minification</strong> for production payloads,
            a <strong>stats panel</strong> showing size, depth, and key count, drag-and-drop file
            upload, clipboard copy, and a local session history. Everything runs in your
            browser — your JSON never leaves your device.
          </p>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How JSON Validation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            JSON validation uses the browser's native <span className="font-mono text-sm">JSON.parse()</span> —
            the same engine JavaScript uses when deserialising API responses. If it throws a{" "}
            <span className="font-mono text-sm">SyntaxError</span>, the input is invalid. The
            error message contains a character position that this tool converts to a line and
            column number so you can locate the problem immediately.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">What the tool checks</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Syntax</span> — braces, brackets, commas, colons in correct positions</p>
              <p><span className="font-semibold">Strings</span> — double-quoted, no unescaped control characters</p>
              <p><span className="font-semibold">Values</span> — string, number, boolean, null, object, array only</p>
              <p><span className="font-semibold">Numbers</span> — no leading zeros, no NaN, no Infinity</p>
              <p><span className="font-semibold">Keys</span> — must be double-quoted strings, no duplicates flag</p>
            </div>
          </div>
          <p>
            Formatting calls <span className="font-mono text-sm">JSON.stringify(parsed, null, spaces)</span>{" "}
            on the already-parsed object, which normalises the output to a canonical structure —
            consistent key order within each object level, standardised number representations,
            and uniform indentation. Minification calls{" "}
            <span className="font-mono text-sm">JSON.stringify(parsed)</span> with no spacing
            argument, producing the most compact valid representation. Neither operation changes
            the data — only the whitespace and serialisation format.
          </p>
        </div>
      </section>

      {/* 3. Step-by-Step */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the JSON Validator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Step-by-Step Guide
            </h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              What This Tool Provides
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Instant validation using native JSON.parse",
                "Error message with line number and character position",
                "Context extract around the error location",
                "Format with 2-space or 4-space indentation",
                "Minify — remove all non-essential whitespace",
                "Stats: size, character count, lines, depth, key count",
                "Drag-and-drop .json file upload",
                "Copy formatted or minified output to clipboard",
                "Session history — last 10 inputs stored locally",
                "Keyboard shortcut: Ctrl+Enter to validate",
                "Dark and light theme toggle",
                "100% browser-based — no server, no upload",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Debugging a Broken API Response",
              scenario:
                "A frontend developer is getting a parse error in their fetch handler but can't tell whether the problem is in the response or their code. They copy the raw response body from the Chrome DevTools Network tab and paste it into the validator. The tool reports: 'Unexpected token at position 1,842, line 47'. They jump to line 47 in the response and find a trailing comma after the last item in a prices array — a known quirk in the legacy backend serialiser. They file the bug report with the exact line number.",
            },
            {
              title: "Pre-deployment Config File Check",
              scenario:
                "A DevOps engineer has a 300-line JSON config file for a cloud function. Before pushing to production, they paste it into the validator as a final sanity check. Validation passes. They then use the stats panel to confirm the nesting depth is 4 — within their team's agreed maximum — and that the key count matches their mental model of the structure. The formatted output is copied back into the repo for a clean git diff.",
            },
            {
              title: "Formatting Minified API Output for Debugging",
              scenario:
                "A backend engineer receives a minified JSON blob in a support ticket: a single 8,000-character line with no whitespace. They paste it into the validator, confirm it is valid, and click Format with 2-space indentation. The readable output is 340 lines. They scroll to the users array and immediately spot that one user record is missing the required role field. The fix takes two minutes once the data is legible.",
            },
            {
              title: "Minifying a Package Config for a Build Bundle",
              scenario:
                "A developer is embedding a JSON schema into a JavaScript bundle and wants to minimise the impact on bundle size. The formatted schema is 4.2 KB. They paste it into the validator, confirm it is valid, click Minify, and copy the output: 2.7 KB — a 36% reduction. They paste the minified version into the source file and confirm the build passes without any deserialisation errors.",
            },
            {
              title: "Checking AI-Generated or LLM-Output JSON",
              scenario:
                "A developer is using an LLM to generate structured JSON output. The model occasionally produces responses with single-quoted strings, unquoted keys, or trailing commas — all invalid JSON. After each generation, they paste the output into the validator before passing it to JSON.parse in their application. The error messages identify exactly which generation patterns need to be corrected in the prompt or post-processing step.",
            },
            {
              title: "Teaching JSON Syntax to Junior Developers",
              scenario:
                "A tech lead runs a short workshop on JSON fundamentals with a new team. They use the validator as a live demonstration tool — pasting examples with intentional errors and asking the group to predict what the error message will say before running validation. The line-number output and context extract make error types concrete. Common misconceptions (trailing commas are fine, single quotes work) are corrected in real time.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Tips & Mistakes */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Use Ctrl+Enter to validate without moving your hands from the keyboard. This makes the validate-fix-validate loop fast when working through a large file with multiple errors — the tool reports one error at a time, so you fix and re-validate until the file is clean.",
                "When you get an error at position 0 or line 1, the most likely causes are a BOM (byte order mark) prepended to the file, an HTTP status line included in the pasted response body, or a leading HTML error page that replaced your expected JSON response. Check the first few characters before looking further in.",
                "Format before diffing in version control. Minified JSON produces enormous single-line diffs. Formatting first makes changes readable and reduces review time. Copy the formatted output back to the source file and commit — the diff will show only meaningful changes.",
                "Use the depth metric to catch accidental over-nesting early. If a config file that should be flat is showing depth 7, there is likely a structural error — an extra level of wrapping that was added unintentionally and is now being read as part of the expected schema.",
                "For JSON generated by third-party services, validate before writing any parsing code against it. Service contracts change, and a field that was a string in staging may become an integer in production. Catching unexpected types at the validation stage is faster than debugging runtime type errors.",
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
                "Don't use trailing commas. The last property in a JSON object and the last element in a JSON array must not have a comma after them. This is the single most common JSON error, especially for developers who write JavaScript daily where trailing commas are permitted.",
                "Don't use single quotes. JSON requires double quotes for all string values and all keys. Single-quoted strings are valid JavaScript but invalid JSON. The error message will say 'Unexpected token' at the position of the single quote.",
                "Don't add comments. JSON does not support comments — not // single-line, not /* block */ style. If you need commented JSON for config files, consider JSONC or JSON5 formats, and strip the comments before passing to a standard JSON parser.",
                "Don't assume valid JavaScript is valid JSON. The two overlap but are not equivalent. NaN, Infinity, undefined, and unquoted keys are all valid in JavaScript contexts but illegal in JSON. Always validate independently rather than relying on JS syntax highlighting.",
                "Don't copy responses with HTTP headers included. When copying from curl or a REST client, make sure you copy only the response body — not the HTTP status line, content-type header, or any surrounding wrapper text. Any non-JSON prefix will cause an immediate parse failure at position 0.",
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

      {/* 6. Reference Table */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          JSON Syntax Reference
        </h2>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Common JSON Errors &amp; Fixes
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Error type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Invalid example</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Valid fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Trailing comma",       '{"a": 1, "b": 2,}',         '{"a": 1, "b": 2}'],
                ["Single-quoted string", "{'key': 'value'}",           '{"key": "value"}'],
                ["Unquoted key",         '{key: "value"}',             '{"key": "value"}'],
                ["Comment",             '{"a": 1 // comment}',        '{"a": 1}'],
                ["Undefined value",      '{"a": undefined}',           '{"a": null}'],
                ["NaN value",            '{"ratio": NaN}',             '{"ratio": null}'],
                ["Trailing dot number",  '{"n": 1.}',                  '{"n": 1.0}'],
                ["Missing comma",        '{"a": 1 "b": 2}',            '{"a": 1, "b": 2}'],
                ["Extra closing brace",  '{"a": 1}}',                  '{"a": 1}'],
                ["Bare string",          'hello',                      '"hello"'],
              ].map(([error, invalid, fix]) => (
                <tr key={error} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-xs text-primary uppercase tracking-wide">{error}</td>
                  <td className="py-2 px-3 font-mono text-xs text-red-500">{invalid}</td>
                  <td className="py-2 px-3 font-mono text-xs text-green-600">{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Valid JSON Value Types
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Example</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["String",  '"Hello, world!"',     "Must use double quotes. Escape \\, \", \\n, \\t, \\uXXXX"],
                ["Number",  '42, 3.14, -7, 1e10',  "No leading zeros, no NaN, no Infinity"],
                ["Boolean", 'true, false',          "Lowercase only — True and False are invalid"],
                ["Null",    'null',                 "Lowercase only — Null and NULL are invalid"],
                ["Object",  '{"key": "value"}',    "Keys must be double-quoted strings"],
                ["Array",   '[1, "two", true]',    "Can mix types — any valid JSON value is allowed"],
              ].map(([type, example, note]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{type}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-800">{example}</td>
                  <td className="py-2 px-3 text-xs text-gray-600">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Format vs Minify — Size Impact
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Format</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical size</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Minified",         "Baseline (smallest)",   "API responses, bundles, environment variables"],
                ["2-space indented", "~25-35% larger",        "Source files, config, code review"],
                ["4-space indented", "~35-50% larger",        "Documentation, team standards, readability"],
              ].map(([fmt, size, use]) => (
                <tr key={fmt} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-800 text-xs">{fmt}</td>
                  <td className="py-2 px-3 font-mono text-xs text-primary">{size}</td>
                  <td className="py-2 px-3 text-xs text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Who Uses This */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This JSON Validator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "👨‍💻",
              title: "Frontend Developers",
              desc: "Debug API response parsing errors, validate mock data files, and format JSON configs for readability before committing to version control.",
            },
            {
              icon: "⚙️",
              title: "Backend Engineers",
              desc: "Confirm serialiser output is well-formed before shipping, validate webhook payloads, and minify JSON before embedding in environment configs or bundles.",
            },
            {
              icon: "🧪",
              title: "QA & API Testers",
              desc: "Validate every response body in a test suite, catch schema regressions early, and use the stats panel to monitor payload size and depth trends across releases.",
            },
            {
              icon: "📊",
              title: "Data Analysts",
              desc: "Validate JSON exports from databases, BI tools, and data pipelines before loading into downstream systems. Format large blobs for manual inspection.",
            },
            {
              icon: "🤖",
              title: "AI & LLM Developers",
              desc: "Check structured outputs from language models before passing to JSON.parse. Identify which generation patterns produce invalid JSON and refine prompts accordingly.",
            },
            {
              icon: "🎓",
              title: "Students & Educators",
              desc: "Learn JSON syntax hands-on with immediate feedback. Use the error messages to understand exactly why a given structure is invalid and how to fix it.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
