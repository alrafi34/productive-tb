export default function MockDataGeneratorSEOContent() {
  return (
    <div className="mt-16 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Generate Realistic Mock Data for Development & Testing
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Perfect for Developers</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Test forms and user interfaces</li>
              <li>• Populate databases with sample data</li>
              <li>• Create realistic API responses</li>
              <li>• Generate demo content for presentations</li>
              <li>• Prototype applications with real-looking data</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Multiple Export Formats</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>JSON:</strong> Perfect for API testing and web development</li>
              <li>• <strong>CSV:</strong> Import into spreadsheets and databases</li>
              <li>• <strong>TSV:</strong> Tab-separated for data analysis tools</li>
              <li>• <strong>Table:</strong> Human-readable format for documentation</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Data Types Available</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span>👤</span>
              <span>Names (First, Last, Full)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>Email Addresses</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>Phone Numbers</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏠</span>
              <span>Addresses & Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏢</span>
              <span>Companies & Job Titles</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>Dates & Timestamps</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔤</span>
              <span>Usernames</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Passwords</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔑</span>
              <span>UUIDs & IDs</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use</h3>
          <ol className="space-y-2 text-gray-600">
            <li><strong>1.</strong> Select the data fields you need from the checkbox list</li>
            <li><strong>2.</strong> Choose how many records to generate (1-10,000)</li>
            <li><strong>3.</strong> Pick your preferred output format (Table, JSON, CSV)</li>
            <li><strong>4.</strong> Click "Generate Data" to create your mock dataset</li>
            <li><strong>5.</strong> Copy to clipboard or download as a file</li>
          </ol>
        </div>

        <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-100">
          <h3 className="text-lg font-semibold text-green-900 mb-3">Why Use Mock Data?</h3>
          <p className="text-green-800 mb-3">
            Mock data is essential for software development, allowing you to test applications 
            without using real user information. This protects privacy while providing realistic 
            data for development and testing scenarios.
          </p>
          <p className="text-green-800">
            Our generator creates diverse, realistic-looking data that helps identify edge cases 
            and ensures your applications work correctly with various data types and formats.
          </p>
        </div>
      </div>
    </div>
  );
}