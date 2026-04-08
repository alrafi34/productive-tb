export default function CSVToJSONSEOContent() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          CSV to JSON Converter – Instant Data Transformation
        </h2>
        <p className="mb-4">
          Convert CSV (Comma-Separated Values) data into structured JSON format instantly with our free browser-based converter. Perfect for developers, data engineers, and analysts who need to transform spreadsheet data for APIs, databases, or JavaScript applications.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3 text-gray-900">How It Works</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Paste CSV data or upload a .csv/.txt file</li>
          <li>Configure parsing options (delimiter, headers, trimming)</li>
          <li>Preview the structured data in a table</li>
          <li>Copy or download the JSON output</li>
        </ol>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3 text-gray-900">Features</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Multiple delimiter support (comma, semicolon, tab, pipe)</li>
          <li>Auto-detect delimiter from CSV data</li>
          <li>Handle quoted values with proper escaping</li>
          <li>Trim whitespace from values</li>
          <li>Use first row as JSON keys</li>
          <li>Real-time table preview</li>
          <li>Pretty or minified JSON output</li>
          <li>Copy to clipboard or download as file</li>
          <li>100% client-side processing</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3 text-gray-900">Example</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <p className="font-semibold text-gray-900 mb-2">Input CSV:</p>
            <pre className="bg-white p-3 rounded border border-gray-200 text-sm overflow-x-auto">
{`name,age,city
John,30,New York
Alice,25,Los Angeles`}
            </pre>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Output JSON:</p>
            <pre className="bg-white p-3 rounded border border-gray-200 text-sm overflow-x-auto">
{`[
  {
    "name": "John",
    "age": "30",
    "city": "New York"
  },
  {
    "name": "Alice",
    "age": "25",
    "city": "Los Angeles"
  }
]`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3 text-gray-900">Use Cases</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Convert spreadsheet exports to JSON for APIs</li>
          <li>Transform database CSV dumps for NoSQL databases</li>
          <li>Prepare data for JavaScript applications</li>
          <li>Integrate CSV data with REST APIs</li>
          <li>Data migration and transformation</li>
          <li>Testing and development workflows</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3 text-gray-900">Privacy & Performance</h3>
        <p>
          All processing happens 100% in your browser. No data is sent to any server. The converter handles large CSV files efficiently with real-time parsing and preview rendering.
        </p>
      </section>
    </div>
  );
}
