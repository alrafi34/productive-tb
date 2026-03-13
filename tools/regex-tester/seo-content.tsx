export default function RegexTesterSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          About RegEx Tester
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The RegEx Tester is a powerful, browser-based tool for testing and debugging regular expressions. 
          Whether you are a beginner learning regex or an advanced developer optimizing complex patterns, 
          this tool provides instant visual feedback with live highlighting, capture group inspection, 
          and replacement preview. All processing happens entirely in your browser with no server required.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Key Features
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Real-time Testing:</strong> See results instantly as you type your regex pattern</li>
          <li><strong>Live Match Highlighting:</strong> Matches are highlighted directly in the test text</li>
          <li><strong>Capture Groups:</strong> View all captured groups for each match</li>
          <li><strong>Match Navigation:</strong> Jump between matches with next/previous buttons</li>
          <li><strong>Replacement Preview:</strong> See how replacements will look before applying</li>
          <li><strong>Regex Flags:</strong> Toggle g, i, m, s, u, y flags with descriptions</li>
          <li><strong>Error Handling:</strong> Clear error messages for invalid patterns</li>
          <li><strong>Regex Cheat Sheet:</strong> Quick reference for common patterns and syntax</li>
          <li><strong>Example Templates:</strong> Pre-built patterns for email, phone, URL, date, IPv4, etc.</li>
          <li><strong>History:</strong> Save and reload your last 20 regex tests</li>
          <li><strong>Export Options:</strong> Download matches as JSON or CSV</li>
          <li><strong>Keyboard Shortcuts:</strong> Ctrl+Enter to test, Ctrl+L to clear, Ctrl+/ for cheat sheet</li>
          <li><strong>Large Text Support:</strong> Handle 200,000+ character inputs efficiently</li>
          <li><strong>100% Client-Side:</strong> All processing happens in your browser</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use
        </h2>
        <ol className="space-y-3 text-gray-700 list-decimal list-inside">
          <li>
            <strong>Enter Regex Pattern:</strong> Type your regular expression in the Pattern field. 
            For example: type digits to match numbers.
          </li>
          <li>
            <strong>Select Flags:</strong> Check the flags you need (g for global, i for case-insensitive, etc.). 
            Hover over each flag to see its description.
          </li>
          <li>
            <strong>Enter Test Text:</strong> Paste or type the text you want to test the regex against.
          </li>
          <li>
            <strong>View Results:</strong> Matches appear instantly with their positions and captured groups.
          </li>
          <li>
            <strong>Navigate Matches:</strong> Use Previous/Next buttons to jump between matches.
          </li>
          <li>
            <strong>Test Replacements:</strong> Enter a replacement string to preview how replacements will look.
          </li>
          <li>
            <strong>Export Results:</strong> Download matches as JSON or CSV for further processing.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Understanding Regular Expressions
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Regular expressions (regex) are patterns used to match character combinations in strings. 
          They are powerful tools for text processing, validation, and data extraction.
        </p>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Basic Syntax</h3>
            <p>Regex patterns use special characters to define what to match:</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Backslash-d matches any digit (0-9)</li>
              <li>Backslash-w matches word characters (a-z, A-Z, 0-9, underscore)</li>
              <li>Backslash-s matches whitespace</li>
              <li>Period matches any character except newline</li>
              <li>Asterisk means zero or more</li>
              <li>Plus means one or more</li>
              <li>Question mark means zero or one</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Flags</h3>
            <p>Flags modify how the regex behaves:</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li><strong>g</strong> (global) - find all matches, not just the first</li>
              <li><strong>i</strong> (case-insensitive) - ignore uppercase/lowercase differences</li>
              <li><strong>m</strong> (multiline) - caret and dollar match line boundaries, not just string boundaries</li>
              <li><strong>s</strong> (dotall) - period matches newlines</li>
              <li><strong>u</strong> (unicode) - treat pattern as Unicode</li>
              <li><strong>y</strong> (sticky) - match from lastIndex position</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Email Validation</h3>
            <p>Matches valid email addresses like john@example.com</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Phone Number</h3>
            <p>Matches phone numbers in XXX-XXX-XXXX format like 123-456-7890</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">URL Extraction</h3>
            <p>Matches HTTP and HTTPS URLs in text</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Date Format (YYYY-MM-DD)</h3>
            <p>Matches dates like 2026-03-13</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">IPv4 Address</h3>
            <p>Matches IP addresses like 192.168.1.1</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Extract Numbers</h3>
            <p>Matches all numbers in text</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Capture Groups
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Capture groups allow you to extract specific parts of a match. They are created using parentheses.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-3">
          <p className="text-sm text-gray-700"><strong>Example:</strong></p>
          <p className="text-sm text-gray-600 font-mono mt-1">Pattern: (word)+@(word+.word+)</p>
          <p className="text-sm text-gray-600 font-mono">Text: john@example.com</p>
          <p className="text-sm text-gray-600 font-mono mt-2">Results:</p>
          <p className="text-sm text-gray-600 font-mono">Group 0 (full match): john@example.com</p>
          <p className="text-sm text-gray-600 font-mono">Group 1: john</p>
          <p className="text-sm text-gray-600 font-mono">Group 2: example.com</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Replacement Patterns
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          When replacing matches, you can use special replacement patterns to reference matched text and groups.
        </p>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li>Dollar-ampersand - the entire matched string</li>
          <li>Dollar-1, Dollar-2, etc. - captured groups</li>
          <li>Dollar-backtick - text before the match</li>
          <li>Dollar-apostrophe - text after the match</li>
        </ul>
        <div className="bg-gray-50 p-4 rounded-lg mt-3">
          <p className="text-sm text-gray-700"><strong>Example:</strong></p>
          <p className="text-sm text-gray-600 font-mono mt-1">Pattern: digits</p>
          <p className="text-sm text-gray-600 font-mono">Text: Price is 100 USD</p>
          <p className="text-sm text-gray-600 font-mono">Replace with: [matched]</p>
          <p className="text-sm text-gray-600 font-mono mt-2">Result: Price is [100] USD</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Performance Tips
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Use specific patterns:</strong> Specific patterns are faster than generic ones</li>
          <li><strong>Avoid backtracking:</strong> Use atomic groups or possessive quantifiers when possible</li>
          <li><strong>Test with realistic data:</strong> Use actual data similar to what you will process</li>
          <li><strong>Use the global flag:</strong> When you need all matches, use the g flag</li>
          <li><strong>Anchor patterns:</strong> Use caret and dollar to limit search scope</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Keyboard Shortcuts
        </h2>
        <div className="space-y-2 text-gray-700">
          <div>
            <strong>Ctrl+Enter (or Cmd+Enter on Mac):</strong> Run the regex test
          </div>
          <div>
            <strong>Ctrl+L (or Cmd+L on Mac):</strong> Clear all inputs
          </div>
          <div>
            <strong>Ctrl+/ (or Cmd+/ on Mac):</strong> Toggle the regex cheat sheet
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Export Options
        </h2>
        <div className="space-y-3 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Export as JSON</h3>
            <p>Download all matches with their positions and capture groups in JSON format for programmatic processing.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Export as CSV</h3>
            <p>Download matches in CSV format for spreadsheet applications like Excel or Google Sheets.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          History and Recent Tests
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The tool automatically saves your last 20 regex tests in browser localStorage. You can quickly reload 
          any previous test by clicking on it in the history panel. This is useful for iterating on complex patterns 
          or comparing different approaches.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Security and Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Your privacy is important:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>100% Client-Side:</strong> All regex processing happens in your browser</li>
          <li><strong>No Server Communication:</strong> Nothing is sent to any server</li>
          <li><strong>No Tracking:</strong> We do not track what patterns you test</li>
          <li><strong>Local Storage Only:</strong> History is stored only in your browser</li>
          <li><strong>No Third-Party Scripts:</strong> No analytics or tracking code</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Common Errors and Solutions
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Unterminated group</h3>
            <p className="text-sm">Make sure all opening parentheses have matching closing parentheses.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Invalid escape sequence</h3>
            <p className="text-sm">Some characters need to be escaped with a backslash. For example, use backslash-period to match a literal period.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">No matches found</h3>
            <p className="text-sm">Your pattern might be too specific. Try using more general patterns or check if your test text contains the expected data.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Greedy vs Non-greedy</h3>
            <p className="text-sm">By default, quantifiers are greedy. Use non-greedy versions for non-greedy matching.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Browser Compatibility
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This tool works in all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. 
          The RegExp engine uses JavaScript native implementation, which is supported in all browsers 
          released after 2015. All features including capture groups, flags, and replacements are fully supported.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Can I test complex regex patterns?</h3>
            <p className="text-sm">Yes! The tool supports all JavaScript regex features including lookahead, lookbehind, named groups, and more.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">How large can my test text be?</h3>
            <p className="text-sm">The tool can handle 200,000+ characters efficiently. Very large texts may take a moment to process.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Is my data stored anywhere?</h3>
            <p className="text-sm">No, all processing happens in your browser. Only your history is stored locally in your browser localStorage.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Can I use this offline?</h3>
            <p className="text-sm">Yes, once the page loads, all functionality works offline. No internet connection is required.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">What is the difference between global and non-global matching?</h3>
            <p className="text-sm">Without the g flag, only the first match is returned. With g, all matches are found.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
