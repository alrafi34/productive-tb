import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function JSONToCSVSEOContent() {
  // Same questions as the FAQPage schema
  const { faq } = toolConfig.seo;
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the JSON to CSV Converter
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Paste your JSON code into the editor or drag & drop a .json file</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Configure conversion options (flatten, headers, delimiter)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Click Convert to transform JSON into CSV instantly</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Copy the CSV to clipboard or download as a file</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">5</span>
                <span>Access your conversion history for quick reuse</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Real-time JSON to CSV conversion
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Automatic nested object flattening
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Array element handling with indexing
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Custom delimiter support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Drag & drop file upload support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Conversion history with localStorage
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our JSON to CSV Converter?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Instant Conversion
            </h3>
            <p className="text-sm text-gray-600">
              Get real-time CSV output as you paste or modify your JSON data
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Developer Friendly
            </h3>
            <p className="text-sm text-gray-600">
              Perfect for developers, data analysts, and API testers
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              100% Private
            </h3>
            <p className="text-sm text-gray-600">
              All processing happens in your browser. Your data never leaves your device
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔧</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Flexible Options
            </h3>
            <p className="text-sm text-gray-600">
              Control flattening, headers, and delimiters to match your needs
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📥</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Easy File Handling
            </h3>
            <p className="text-sm text-gray-600">
              Drag and drop JSON files or upload directly from your computer
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Mobile Ready
            </h3>
            <p className="text-sm text-gray-600">
              Fully responsive design works seamlessly on all devices
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="space-y-4 text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              API Response Processing
            </h3>
            <p>Convert JSON responses from APIs into CSV format for analysis in spreadsheet applications.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Data Export
            </h3>
            <p>Export JSON data from databases or applications into CSV for use in Excel or Google Sheets.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Data Analysis
            </h3>
            <p>Transform JSON datasets into CSV format for analysis with spreadsheet tools and business intelligence software.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Bulk Data Import
            </h3>
            <p>Prepare JSON data in CSV format for bulk import into other systems or databases.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Report Generation
            </h3>
            <p>Convert JSON data into CSV for creating reports and presentations in spreadsheet applications.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Learning & Education
            </h3>
            <p>Perfect for students learning about data formats and understanding how JSON and CSV differ in structure.</p>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Conversion Examples
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Example 1: Simple JSON Array
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Input (JSON):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`[
  { "name": "Alice", "age": 25 },
  { "name": "Bob", "age": 30 }
]`}
                </pre>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Output (CSV):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`name,age
Alice,25
Bob,30`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Example 2: Nested Objects (Flattened)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Input (JSON):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`[
  {
    "name": "Alice",
    "address": {
      "city": "NY",
      "zip": "10001"
    }
  }
]`}
                </pre>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Output (CSV):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`name,address.city,address.zip
Alice,NY,10001`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Example 3: Arrays in JSON
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Input (JSON):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`[
  { "id": 1, "tags": ["js", "web"] },
  { "id": 2, "tags": ["python"] }
]`}
                </pre>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Output (CSV):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`id,tags.0,tags.1
1,js,web
2,python,`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
