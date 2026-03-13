"use client";

export default function BarGraphGeneratorSEOContent() {
  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Bar Graph?</h2>
        <p className="mb-3">
          A bar graph is a visual representation of data using rectangular bars with heights proportional to the values they represent. Bar graphs are one of the most common and effective ways to display and compare data across different categories.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Bar Graph Generator</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Enter labels and values in the data table</li>
          <li>Customize colors for each bar</li>
          <li>Set a chart title</li>
          <li>Choose display options (values, labels, grid)</li>
          <li>Select rendering mode (SVG or Canvas)</li>
          <li>Export your chart as PNG or SVG</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Dynamic Data Table:</strong> Add, edit, and delete rows easily</li>
          <li><strong>Real-time Rendering:</strong> Chart updates instantly as you edit data</li>
          <li><strong>Color Customization:</strong> Choose from 10 vibrant colors per bar</li>
          <li><strong>SVG & Canvas Support:</strong> Choose your preferred rendering method</li>
          <li><strong>Chart Options:</strong> Toggle values, labels, and grid display</li>
          <li><strong>Random Data Generator:</strong> Quickly populate with sample data</li>
          <li><strong>CSV Import:</strong> Paste CSV data to populate the table</li>
          <li><strong>Export Options:</strong> Download as PNG or SVG</li>
          <li><strong>Copy to Clipboard:</strong> Share chart images or data</li>
          <li><strong>Responsive Design:</strong> Works on all devices</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Business Reports:</strong> Display sales, revenue, or performance metrics</li>
          <li><strong>Academic Presentations:</strong> Visualize research data and statistics</li>
          <li><strong>Financial Analysis:</strong> Compare financial data across periods</li>
          <li><strong>Survey Results:</strong> Show survey responses and distributions</li>
          <li><strong>Project Management:</strong> Track project metrics and progress</li>
          <li><strong>Marketing Analytics:</strong> Visualize campaign performance</li>
          <li><strong>Educational Content:</strong> Create visual aids for teaching</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Effective Bar Charts</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Keep labels concise and meaningful</li>
          <li>Use consistent color schemes for related data</li>
          <li>Include a descriptive chart title</li>
          <li>Display values on bars for precise data reading</li>
          <li>Use grid lines for easier value estimation</li>
          <li>Limit the number of bars for clarity (typically 5-10)</li>
          <li>Sort data logically (ascending, descending, or by category)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CSV Data Format</h2>
        <p className="mb-3">
          To import data via CSV, use the following format:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`Label,Value
Product A,40
Product B,25
Product C,20
Product D,15`}
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Rendering Modes</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>SVG:</strong> Scalable vector graphics, perfect for web and print</li>
          <li><strong>Canvas:</strong> Raster graphics, better for complex animations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security</h2>
        <p>
          Your data is processed entirely in your browser. No data is sent to any server, ensuring complete privacy and security. You can safely work with sensitive business or personal data without worrying about exposure.
        </p>
      </section>
    </div>
  );
}
