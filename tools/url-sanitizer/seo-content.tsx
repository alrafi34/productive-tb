export default function URLSanitizerSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          🧹 URL Tracker Remover - Clean Your Links for Privacy
        </h2>
        
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">What is URL Tracking?</h3>
            <p>
              URL tracking parameters are extra pieces of information added to web links that allow companies 
              to monitor how users interact with their content. These parameters include UTM codes, Facebook 
              click IDs (fbclid), Google click IDs (gclid), and many others that track your browsing behavior 
              across the internet.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Why Remove Tracking Parameters?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Privacy Protection:</strong> Prevent companies from tracking your online activity</li>
              <li><strong>Cleaner Links:</strong> Share professional-looking URLs without tracking noise</li>
              <li><strong>Better Security:</strong> Reduce potential attack vectors in shared links</li>
              <li><strong>Improved Readability:</strong> Make URLs easier to read and understand</li>
              <li><strong>Faster Loading:</strong> Shorter URLs can load slightly faster</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Tracking Parameters We Remove</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">UTM Parameters</h4>
                <ul className="text-sm space-y-1">
                  <li>• utm_source - Traffic source</li>
                  <li>• utm_medium - Marketing medium</li>
                  <li>• utm_campaign - Campaign name</li>
                  <li>• utm_term - Paid keywords</li>
                  <li>• utm_content - Content variation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Platform Trackers</h4>
                <ul className="text-sm space-y-1">
                  <li>• fbclid - Facebook click ID</li>
                  <li>• gclid - Google click ID</li>
                  <li>• msclkid - Microsoft click ID</li>
                  <li>• igshid - Instagram share ID</li>
                  <li>• mc_cid - MailChimp campaign ID</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use This Tool</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose between single URL or batch mode for multiple URLs</li>
              <li>Paste your URL(s) with tracking parameters into the input field</li>
              <li>The tool automatically detects and removes tracking parameters</li>
              <li>Copy the cleaned URL(s) or export them as TXT/CSV files</li>
              <li>View your cleaning history for previously processed URLs</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Privacy & Security</h3>
            <p>
              This URL tracker remover operates entirely in your browser using JavaScript. No URLs are 
              sent to any server, ensuring complete privacy. All processing happens locally on your device, 
              and your data never leaves your computer.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Advanced Features</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Batch Processing:</strong> Clean multiple URLs at once</li>
              <li><strong>Custom Parameters:</strong> Add your own tracking parameters to remove</li>
              <li><strong>Export Options:</strong> Download cleaned URLs as TXT or CSV files</li>
              <li><strong>History Tracking:</strong> Keep track of previously cleaned URLs</li>
              <li><strong>Real-time Cleaning:</strong> See results as you type</li>
              <li><strong>Drag & Drop:</strong> Drop text containing URLs directly into the tool</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
            <p className="text-blue-800 text-sm">
              Before sharing any URL on social media, email, or messaging apps, run it through this 
              tool to remove tracking parameters. This protects both your privacy and the privacy 
              of people who click your links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}