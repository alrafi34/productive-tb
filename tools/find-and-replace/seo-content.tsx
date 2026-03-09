import React from 'react';
import RelatedTools from '@/components/RelatedTools';

export default function SEOContent() {
  const relatedTools = [
    {
      slug: 'remove-duplicate-lines',
      name: 'Remove Duplicate Lines',
      description: 'Clean up text by removing duplicate lines',
      icon: '🧹',
      category: 'text'
    },
    {
      slug: 'word-frequency-counter',
      name: 'Word Frequency Counter',
      description: 'Analyze word frequency and text statistics',
      icon: '📊',
      category: 'text'
    },
    {
      slug: 'text-reverser',
      name: 'Text Reverser',
      description: 'Reverse text, words, or letters instantly',
      icon: '🔄',
      category: 'text'
    },
    {
      slug: 'markdown-previewer',
      name: 'Markdown Previewer',
      description: 'Convert Markdown to HTML in real-time',
      icon: '📋',
      category: 'text'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How to Use */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Find and Replace Tool</h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">1.</span>
            <span><strong>Enter your text:</strong> Paste your text into the input area, upload a file (.txt, .md, .csv), or drag and drop a file directly into the text area.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">2.</span>
            <span><strong>Specify find and replace terms:</strong> Enter the text you want to find in the "Find" field and the replacement text in the "Replace with" field. For multiple replacements, switch to Batch mode.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">3.</span>
            <span><strong>Configure options:</strong> Enable Match Case for case-sensitive search, Whole Words Only to match complete words, Use Regex for pattern matching, or Preview Mode to see changes before applying.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">4.</span>
            <span><strong>Replace and review:</strong> Click "Replace First" for single replacement or "Replace All" for all occurrences. View statistics showing matches found and replacements made. Use Undo/Redo to revert changes.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">5.</span>
            <span><strong>Copy or download:</strong> Copy the result to clipboard or download as a text file. In Preview Mode, click "Apply" to move the output back to input for further editing.</span>
          </li>
        </ol>
      </section>

      {/* What is Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Find and Replace Tool?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A Find and Replace Tool is an essential text editing utility that allows you to search for specific words, phrases, or patterns in your text and replace them with different content. This tool is invaluable for writers, developers, content editors, and anyone who needs to make bulk text modifications quickly and accurately.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our advanced find and replace tool runs entirely in your browser, ensuring complete privacy as no data is sent to any server. It supports sophisticated features like regular expressions for pattern matching, case-sensitive searching, whole word matching, and batch replacements where you can define multiple find-replace pairs to process simultaneously.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The tool includes a preview mode that lets you see changes before applying them, comprehensive undo/redo functionality to revert mistakes, and real-time statistics showing how many matches were found and how many replacements were made. Whether you're updating variable names in code, correcting repeated typos in documents, or standardizing terminology across large text files, this tool provides the power and flexibility you need while maintaining a clean, intuitive interface.
        </p>
      </section>

      {/* Use Cases */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">💻 Code Refactoring</h3>
            <p className="text-sm text-gray-700">Rename variables, functions, or classes across code files. Update API endpoints or configuration values in bulk.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📝 Content Editing</h3>
            <p className="text-sm text-gray-700">Fix repeated typos, update brand names, or standardize terminology across articles and documentation.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔗 URL Updates</h3>
            <p className="text-sm text-gray-700">Replace old domain names with new ones, update HTTP to HTTPS, or modify URL parameters across link lists.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📊 Data Cleaning</h3>
            <p className="text-sm text-gray-700">Standardize data formats, remove unwanted characters, or normalize text in CSV files and datasets.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🎨 Template Customization</h3>
            <p className="text-sm text-gray-700">Replace placeholder text in templates, update copyright years, or personalize boilerplate content.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔍 Pattern Matching</h3>
            <p className="text-sm text-gray-700">Use regex to find and replace complex patterns like email addresses, phone numbers, or date formats.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Instant Processing:</strong> Replace thousands of occurrences in milliseconds with optimized algorithms.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>100% Privacy:</strong> All processing happens in your browser - no data is uploaded to servers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Advanced Options:</strong> Match case, whole words, regex patterns, and batch replacements for complex tasks.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Preview Mode:</strong> See changes before applying them to avoid mistakes and verify results.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Undo/Redo Support:</strong> Full history tracking lets you revert changes or try different approaches.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Real-time Statistics:</strong> See exactly how many matches were found and replacements made.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Auto-save:</strong> Your input text is automatically saved to browser storage for convenience.</span>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does the Match Case option work?</h3>
            <p className="text-gray-700 leading-relaxed">
              When Match Case is enabled, the tool performs case-sensitive searching, meaning "Word", "word", and "WORD" are treated as different strings. This is useful when you need to replace specific capitalization patterns without affecting others. For example, if you're replacing "API" with "Application Programming Interface" but want to keep "api" unchanged, enable Match Case. When disabled (default), the search is case-insensitive, so all variations of the word will be found and replaced regardless of capitalization.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between "Replace First" and "Replace All"?</h3>
            <p className="text-gray-700 leading-relaxed">
              "Replace First" replaces only the first occurrence of your search term in the text, which is useful when you want to make selective changes or test your replacement before applying it everywhere. "Replace All" replaces every occurrence of the search term throughout the entire text in a single operation. The tool shows you how many matches were found and how many replacements were made, so you can verify the results. You can always use the Undo button to revert changes if needed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I use Regular Expressions (Regex)?</h3>
            <p className="text-gray-700 leading-relaxed">
              Enable the "Use Regex" checkbox to activate regular expression pattern matching. Regex allows you to find complex patterns instead of literal text. For example, use "\d{3}-\d{3}-\d{4}" to find phone numbers in the format 123-456-7890, or "[a-z]+@[a-z]+\.[a-z]+" to find email addresses. You can use capture groups in your find pattern and reference them in the replacement with $1, $2, etc. For instance, find "(\w+) (\w+)" and replace with "$2 $1" to swap the order of two words. Note that invalid regex patterns will be ignored to prevent errors.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What is Batch Replace mode and when should I use it?</h3>
            <p className="text-gray-700 leading-relaxed">
              Batch Replace mode allows you to define multiple find-replace pairs that are processed sequentially in a single operation. This is incredibly useful when you need to make several different replacements at once. For example, you might want to replace "color" with "colour", "center" with "centre", and "analyze" with "analyse" to convert American English to British English. Each batch item can be individually enabled or disabled using the checkbox, so you can selectively apply certain replacements. Click "+ Add Another" to add more pairs, and use the ✕ button to remove unwanted items. All enabled pairs are processed in order from top to bottom.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does Preview Mode work?</h3>
            <p className="text-gray-700 leading-relaxed">
              Preview Mode (enabled by default) shows the replaced text in a separate output area without modifying your original input. This lets you verify the changes before committing to them. You can review the output, check the statistics, and if everything looks correct, click the "Apply" button to move the output back to the input area for further editing or additional replacements. When Preview Mode is disabled, replacements are applied directly to the input text, which is faster but doesn't give you a chance to review changes first. Preview Mode is especially useful when working with important documents or when using regex patterns where you want to verify the results.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my text data secure when using this tool?</h3>
            <p className="text-gray-700 leading-relaxed">
              Absolutely! This tool runs entirely in your browser using client-side JavaScript. Your text never leaves your device or gets uploaded to any server. All find and replace operations, including regex processing and batch replacements, happen locally on your computer. The only data stored is your input text in your browser's localStorage for convenience (auto-save feature), which remains on your device and can be cleared at any time. You can even use this tool offline once the page has loaded. This makes it completely safe for working with sensitive documents, proprietary code, or confidential information.
            </p>
          </div>
        </div>
      </section>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
