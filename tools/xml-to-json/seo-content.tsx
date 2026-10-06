import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function XMLToJsonSEOContent() {
  // Same questions as the FAQPage schema
  const { faq } = toolConfig.seo;
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the XML to JSON Converter
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Paste your XML code into the editor or drag & drop a .xml file</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Configure conversion options (attributes, arrays, formatting)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Click Convert to transform XML into JSON instantly</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Copy the JSON to clipboard or download as a file</span>
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
                Real-time XML to JSON conversion
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Automatic array detection for repeated elements
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                XML attributes handling with @ prefix
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Pretty-print and minify options
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Drag & drop file upload support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Conversion history
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our XML to JSON Converter?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Instant Conversion
            </h3>
            <p className="text-sm text-gray-600">
              Get real-time JSON output as you paste or modify your XML data
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Developer Friendly
            </h3>
            <p className="text-sm text-gray-600">
              Perfect for developers, API testers, and data engineers
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              100% Private
            </h3>
            <p className="text-sm text-gray-600">
              We do not collect or store what you enter.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔧</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Flexible Options
            </h3>
            <p className="text-sm text-gray-600">
              Control attributes, arrays, and formatting to match your needs
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📥</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Easy File Handling
            </h3>
            <p className="text-sm text-gray-600">
              Drag and drop XML files or upload directly from your computer
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
              API Integration & Migration
            </h3>
            <p>Convert XML responses from legacy APIs into JSON format for use in modern web applications and microservices.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Data Transformation
            </h3>
            <p>Transform XML configuration files, RSS feeds, or SOAP responses into JSON for easier processing and storage.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Database Import
            </h3>
            <p>Convert XML data exports into JSON format for importing into NoSQL databases like MongoDB or Firebase.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Web Development
            </h3>
            <p>Quickly convert XML data into JSON for use in JavaScript frameworks like React, Vue, or Angular.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Data Analysis
            </h3>
            <p>Transform XML datasets into JSON for analysis with tools like Python, R, or JavaScript data libraries.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Learning & Education
            </h3>
            <p>Perfect for students learning about data formats and understanding how XML and JSON differ in structure.</p>
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
              Example 1: Simple XML
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Input (XML):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`<person>
  <name>Alice</name>
  <age>25</age>
</person>`}
                </pre>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Output (JSON):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`{
  "person": {
    "name": "Alice",
    "age": "25"
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Example 2: XML with Attributes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Input (XML):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`<book id="1" year="2023">
  <title>JavaScript</title>
  <author>John</author>
</book>`}
                </pre>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Output (JSON):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`{
  "book": {
    "@id": "1",
    "@year": "2023",
    "title": "JavaScript",
    "author": "John"
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Example 3: Nested XML with Arrays
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Input (XML):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`<library>
  <book>
    <title>JS Guide</title>
  </book>
  <book>
    <title>Python</title>
  </book>
</library>`}
                </pre>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Output (JSON):</p>
                <pre className="text-xs p-3 rounded bg-gray-100 text-gray-800 overflow-x-auto">
{`{
  "library": {
    "book": [
      { "title": "JS Guide" },
      { "title": "Python" }
    ]
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
