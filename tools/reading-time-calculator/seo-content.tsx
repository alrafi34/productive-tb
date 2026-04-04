export default function ReadingTimeCalculatorSEOContent() {
  return (
    <div className="max-w-4xl mx-auto mt-16 prose prose-gray">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          About Reading Time Calculator
        </h2>
        
        <div className="space-y-6 text-gray-600">
          <p>
            Our Reading Time Calculator is a powerful tool designed for bloggers, content creators, writers, and publishers 
            who need to estimate how long it takes to read their articles and blog posts. Simply paste your text and get 
            instant reading time estimates for different reading speeds.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Key Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Multiple Reading Speeds:</strong> Get estimates for slow (150 WPM), average (200 WPM), fast (250 WPM), and speed readers (300 WPM)</li>
            <li><strong>Custom WPM Setting:</strong> Set your own words-per-minute rate for personalized calculations</li>
            <li><strong>Comprehensive Text Analysis:</strong> Word count, character count, sentence count, and paragraph count</li>
            <li><strong>Speaking Time Estimation:</strong> Calculate how long it would take to speak your content aloud</li>
            <li><strong>Reading Difficulty Assessment:</strong> Automatic categorization from "Very Short" to "Very Long"</li>
            <li><strong>Export Options:</strong> Copy results or generate reading time badges for your blog</li>
            <li><strong>Dark Mode Support:</strong> Comfortable reading in any lighting condition</li>
            <li><strong>Local Storage:</strong> Your text is automatically saved locally for convenience</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How Reading Time is Calculated</h3>
          <p>
            Reading time is calculated using the simple formula: <strong>Total Words ÷ Words Per Minute = Reading Time</strong>. 
            Our calculator uses industry-standard reading speeds:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-4">
            <li>Slow Reader: 150 words per minute</li>
            <li>Average Reader: 200 words per minute (most common)</li>
            <li>Fast Reader: 250 words per minute</li>
            <li>Speed Reader: 300+ words per minute</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Perfect for Content Creators</h3>
          <p>
            This tool is essential for bloggers and content marketers who want to display "X minute read" indicators on their articles. 
            Many popular blogs and publications use reading time estimates to help readers decide whether to engage with content 
            based on their available time.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Privacy & Security</h3>
          <p>
            Your text is processed entirely in your browser - nothing is sent to our servers. The tool works completely offline 
            after loading, ensuring your content remains private and secure. Text is only saved locally in your browser's storage 
            for your convenience.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Use Cases</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Blog Posts:</strong> Add reading time estimates to improve user experience</li>
            <li><strong>Articles:</strong> Help readers gauge time commitment before starting</li>
            <li><strong>Documentation:</strong> Estimate time needed to read technical guides</li>
            <li><strong>Marketing Content:</strong> Optimize content length for target audiences</li>
            <li><strong>Academic Papers:</strong> Estimate reading time for research materials</li>
            <li><strong>Email Newsletters:</strong> Gauge appropriate content length</li>
            <li><strong>Social Media:</strong> Plan content that fits platform expectations</li>
          </ul>

          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h4 className="font-semibold text-gray-800 mb-3">💡 Pro Tips</h4>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Most blog readers prefer articles that take 3-7 minutes to read</li>
              <li>Use the custom WPM slider to match your specific audience's reading speed</li>
              <li>Speaking time is useful for podcast scripts and video narration</li>
              <li>Copy the reading time badge to add professional "X min read" labels to your content</li>
              <li>The tool handles large texts efficiently, perfect for long-form content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}