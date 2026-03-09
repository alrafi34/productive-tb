import React from 'react';
import RelatedTools from '@/components/RelatedTools';

export default function SEOContent() {
  const relatedTools = [
    {
      slug: 'find-and-replace',
      name: 'Find and Replace',
      description: 'Search and replace text with advanced options',
      icon: '🔍',
      category: 'text'
    },
    {
      slug: 'remove-duplicate-lines',
      name: 'Remove Duplicate Lines',
      description: 'Clean up text by removing duplicate lines',
      icon: '🧹',
      category: 'text'
    },
    {
      slug: 'markdown-previewer',
      name: 'Markdown Previewer',
      description: 'Convert Markdown to HTML in real-time',
      icon: '📋',
      category: 'text'
    },
    {
      slug: 'word-frequency-counter',
      name: 'Word Frequency Counter',
      description: 'Analyze word frequency and text statistics',
      icon: '📊',
      category: 'text'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How to Use */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Text Diff Checker</h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">1.</span>
            <span><strong>Enter your texts:</strong> Paste or type your original text in Text A and the modified version in Text B. You can also upload files (.txt, .md, .csv) or drag and drop them directly into the text areas.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">2.</span>
            <span><strong>Configure comparison settings:</strong> Choose your comparison level (line, word, or character), and optionally enable Ignore Case or Ignore Whitespace for more flexible comparisons.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">3.</span>
            <span><strong>Compare the texts:</strong> Click the "Compare" button to analyze differences, or enable Auto Compare for real-time comparison as you type. Switch between Side-by-Side and Inline views for different perspectives.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">4.</span>
            <span><strong>Review the results:</strong> Examine the highlighted differences with color coding - green for additions, red for deletions, and gray for unchanged content. Check the statistics dashboard for similarity percentage and difference counts.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">5.</span>
            <span><strong>Export or copy:</strong> Copy the diff to clipboard or download it as a .txt or .html file with preserved highlighting for documentation or sharing purposes.</span>
          </li>
        </ol>
      </section>

      {/* What is Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Text Diff Checker?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A Text Diff Checker is a powerful comparison tool that analyzes two text blocks and highlights the differences between them. This tool is essential for developers reviewing code changes, writers comparing document versions, editors tracking content modifications, and anyone who needs to identify what has changed between two versions of text.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our advanced diff checker runs entirely in your browser, ensuring complete privacy as no data is sent to any server. It uses sophisticated algorithms based on the Longest Common Subsequence (LCS) method to accurately identify additions, deletions, and unchanged content. The tool supports three comparison levels: line-by-line for document comparison, word-by-word for detailed text analysis, and character-by-character for precise change detection.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The tool features both side-by-side and inline viewing modes, synchronized scrolling for easy navigation, and comprehensive statistics including similarity percentage, number of differences, and line counts. With options to ignore case sensitivity and whitespace, you can focus on meaningful content changes while filtering out formatting differences. Whether you're reviewing code commits, comparing contract versions, or tracking document edits, this tool provides the clarity and precision you need.
        </p>
      </section>

      {/* Use Cases */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">💻 Code Review</h3>
            <p className="text-sm text-gray-700">Compare code versions before and after changes, review pull requests, or verify refactoring didn't alter functionality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📝 Document Comparison</h3>
            <p className="text-sm text-gray-700">Track changes in contracts, articles, or reports. Identify what was added, removed, or modified between versions.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">✍️ Content Editing</h3>
            <p className="text-sm text-gray-700">Compare draft versions, review editorial changes, or verify that corrections were properly applied to content.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">⚙️ Configuration Files</h3>
            <p className="text-sm text-gray-700">Compare config files, environment variables, or settings to identify what changed between deployments or environments.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📊 Data Validation</h3>
            <p className="text-sm text-gray-700">Verify data migrations, compare CSV exports, or check that data transformations produced expected results.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔍 Plagiarism Detection</h3>
            <p className="text-sm text-gray-700">Compare documents to identify similarities and differences, useful for academic or content originality verification.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Instant Comparison:</strong> Compare thousands of lines in milliseconds using optimized LCS algorithms.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>100% Privacy:</strong> All processing happens in your browser - no data is uploaded to servers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Multiple Comparison Levels:</strong> Choose between line, word, or character-level comparison for different use cases.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Flexible Viewing Modes:</strong> Switch between side-by-side and inline views with synchronized scrolling.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Smart Filtering:</strong> Ignore case or whitespace differences to focus on meaningful content changes.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Comprehensive Statistics:</strong> See similarity percentage, difference counts, and line statistics at a glance.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Export Options:</strong> Download results as plain text or HTML with preserved highlighting.</span>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the difference between line, word, and character comparison levels?</h3>
            <p className="text-gray-700 leading-relaxed">
              Line-level comparison treats each line as a unit and is best for comparing documents, code files, or any text where line breaks are meaningful. It shows which entire lines were added, removed, or unchanged. Word-level comparison breaks text into words and compares them individually, which is useful for detailed text analysis where you want to see exactly which words changed within lines. Character-level comparison is the most granular, comparing every single character, which is ideal for finding subtle differences like typos, spacing issues, or single-character changes. Choose the level based on your needs: line for general document comparison, word for detailed text analysis, and character for precise change detection.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does the Ignore Case option work?</h3>
            <p className="text-gray-700 leading-relaxed">
              When Ignore Case is enabled, the comparison treats uppercase and lowercase letters as identical. For example, "Hello", "hello", and "HELLO" would all be considered the same. This is particularly useful when comparing texts where capitalization might have changed due to formatting or style updates, but the actual content remains the same. It's commonly used when comparing code (where variable names might have different casing conventions), documents that underwent style changes, or when you want to focus on content differences rather than capitalization. When disabled (default), the tool performs case-sensitive comparison where "Word" and "word" are treated as different.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What does the Ignore Whitespace option do?</h3>
            <p className="text-gray-700 leading-relaxed">
              The Ignore Whitespace option normalizes all whitespace (spaces, tabs, line breaks) before comparison, treating multiple spaces as a single space and trimming leading/trailing whitespace. This is extremely useful when comparing code that has been reformatted, documents with different indentation, or text where spacing changes don't represent meaningful content differences. For example, if one version has "Hello    World" (multiple spaces) and another has "Hello World" (single space), they would be considered identical with this option enabled. This helps you focus on actual content changes rather than formatting differences, which is especially valuable when comparing code that has been auto-formatted or documents that underwent style adjustments.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I interpret the similarity percentage?</h3>
            <p className="text-gray-700 leading-relaxed">
              The similarity percentage represents how much of the content is identical between the two texts. It's calculated based on the comparison level you selected. For line-level comparison, it shows the percentage of lines that are unchanged. For word-level, it's the percentage of words that match. For character-level, it's the percentage of characters that are the same. A 100% similarity means the texts are identical, while 0% means they're completely different. A similarity of 80-90% typically indicates minor edits or updates, 50-70% suggests moderate changes, and below 50% indicates substantial differences. This metric is useful for quickly assessing how much two versions differ and can help you decide if a detailed review is necessary.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the difference between Side-by-Side and Inline view modes?</h3>
            <p className="text-gray-700 leading-relaxed">
              Side-by-Side view displays Text A (original) and Text B (modified) in separate columns, making it easy to see both versions simultaneously. This mode includes synchronized scrolling, so when you scroll one side, the other side scrolls proportionally, helping you maintain context. It's ideal for comparing longer documents or when you want to reference both versions at once. Inline view merges both texts into a single view, showing additions in green, deletions in red, and unchanged content in gray. This mode is better for seeing the flow of changes in context and is particularly useful for reviewing edits in narrative text or when you want to see exactly how the document evolved. You can switch between modes at any time to get different perspectives on the same comparison.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure when using this tool?</h3>
            <p className="text-gray-700 leading-relaxed">
              Absolutely! This tool runs entirely in your browser using client-side JavaScript. Your text never leaves your device or gets uploaded to any server. All comparison operations, including the LCS algorithm calculations and diff rendering, happen locally on your computer. This makes it completely safe for comparing sensitive documents, proprietary code, confidential contracts, or any private information. You can even use this tool offline once the page has loaded. The tool doesn't store any data, use cookies for tracking, or send analytics about your content. Your privacy is guaranteed by the architecture of the tool itself - there's simply no mechanism for your data to leave your device.
            </p>
          </div>
        </div>
      </section>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
