import React from 'react';
import RelatedTools from '@/components/RelatedTools';

export default function SEOContent() {
  const relatedTools = [
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
      slug: 'case-converter',
      name: 'Case Converter',
      description: 'Convert text between different cases',
      icon: '🔤',
      category: 'text'
    },
    {
      slug: 'text-to-clipboard',
      name: 'Text to Clipboard',
      description: 'Copy text with one click in multiple formats',
      icon: '📋',
      category: 'text'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How to Use */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Remove Duplicate Lines Tool</h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">1.</span>
            <span><strong>Paste or upload your text:</strong> Enter your multi-line text directly into the input area, paste from clipboard, or drag and drop a .txt or .csv file.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">2.</span>
            <span><strong>Configure processing options:</strong> Choose from options like ignore case, trim whitespace, remove empty lines, sort order, and text transformations.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">3.</span>
            <span><strong>Click "Remove Duplicates":</strong> Process your text instantly to remove all duplicate lines. Enable auto-process for real-time cleaning as you type.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">4.</span>
            <span><strong>Copy or download results:</strong> Use the copy button to copy cleaned text to clipboard, or download as a .txt file. View detailed statistics about duplicates removed.</span>
          </li>
        </ol>
      </section>

      {/* What is Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Remove Duplicate Lines Tool?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A Remove Duplicate Lines Tool is a powerful text processing utility that automatically identifies and removes identical lines from multi-line text, lists, or data files. This tool is essential for cleaning up datasets, removing redundant entries from lists, and ensuring data quality in various text-based workflows.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our advanced duplicate remover runs entirely in your browser, processing text client-side without uploading data to any server. It supports large text files with 10,000+ lines and offers sophisticated options like case-insensitive matching, whitespace trimming, sorting, and even an inverse mode to keep only duplicate entries.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether you're cleaning email lists, removing duplicate URLs, processing log files, or organizing code snippets, this tool provides instant results with detailed statistics showing exactly how many duplicates were found and removed. The intuitive interface includes drag-and-drop file upload, one-click copying, and automatic processing options for maximum efficiency.
        </p>
      </section>

      {/* Use Cases */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📧 Email List Cleaning</h3>
            <p className="text-sm text-gray-700">Remove duplicate email addresses from mailing lists to ensure each recipient receives only one message.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔗 URL Deduplication</h3>
            <p className="text-sm text-gray-700">Clean up lists of URLs by removing duplicate links, perfect for SEO audits and link management.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📊 Data Processing</h3>
            <p className="text-sm text-gray-700">Remove duplicate entries from CSV files, database exports, and data analysis workflows.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">💻 Code Cleanup</h3>
            <p className="text-sm text-gray-700">Identify and remove duplicate import statements, configuration entries, or code snippets.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📝 List Management</h3>
            <p className="text-sm text-gray-700">Clean up todo lists, shopping lists, or any text-based lists by removing repeated items.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔍 Log File Analysis</h3>
            <p className="text-sm text-gray-700">Extract unique entries from log files to identify distinct events or error messages.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Instant Processing:</strong> Remove duplicates from thousands of lines in milliseconds with optimized algorithms.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>100% Privacy:</strong> All processing happens in your browser - no data is uploaded to servers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Advanced Options:</strong> Case-insensitive matching, whitespace trimming, sorting, and text transformations.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Detailed Statistics:</strong> See exactly how many duplicates were removed and how many lines remain.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Multiple Input Methods:</strong> Paste text, upload files, or drag-and-drop for maximum convenience.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Undo/Redo Support:</strong> Easily revert changes or try different processing options.</span>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does the duplicate detection work?</h3>
            <p className="text-gray-700 leading-relaxed">
              The tool compares each line of text to identify duplicates. By default, it performs exact matching, but you can enable "Ignore Case" to treat "Apple" and "apple" as duplicates, or "Trim Whitespace" to ignore leading/trailing spaces. The tool uses efficient Set-based algorithms to handle large files with 10,000+ lines instantly. When duplicates are found, only the first occurrence is kept by default, though you can use "Keep Only Duplicates" mode to extract just the repeated lines.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the difference between "Remove Duplicates" and "Keep Only Duplicates"?</h3>
            <p className="text-gray-700 leading-relaxed">
              "Remove Duplicates" (default mode) keeps the first occurrence of each unique line and removes all subsequent duplicates, giving you a clean list of unique entries. "Keep Only Duplicates" does the opposite - it shows you only the lines that appeared more than once in your input, which is useful for finding what items are repeated in your data. For example, if you have a list with "apple" appearing 3 times and "banana" once, the default mode would show both once, while "Keep Only Duplicates" would show only "apple".
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I process very large text files?</h3>
            <p className="text-gray-700 leading-relaxed">
              Yes! The tool is optimized to handle large text files efficiently. It can process files with 10,000+ lines instantly using optimized JavaScript Set operations. Since all processing happens in your browser, the only limitation is your device's available memory. For extremely large files (50,000+ lines), processing may take a few seconds but will still complete successfully. The tool also supports drag-and-drop file upload for .txt and .csv files, making it easy to process large datasets.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What sorting options are available?</h3>
            <p className="text-gray-700 leading-relaxed">
              The tool offers four sorting options: "No Sorting" (preserves original order), "Sort A-Z" (alphabetical ascending with numeric awareness), "Sort Z-A" (alphabetical descending), and "Randomize" (shuffles lines randomly). The alphabetical sorting is smart enough to handle numbers correctly, so "item2" comes before "item10". You can apply sorting after removing duplicates to organize your cleaned data. Combine sorting with text transformations like uppercase or lowercase for even more control over your output.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure when using this tool?</h3>
            <p className="text-gray-700 leading-relaxed">
              Absolutely! This tool runs entirely in your browser using client-side JavaScript. Your text never leaves your device or gets uploaded to any server. All processing, including duplicate detection, sorting, and transformations, happens locally on your computer. This means your data remains completely private and secure. You can even use the tool offline once the page has loaded. The tool doesn't store any data, cookies, or tracking information related to your text content.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What are the text transformation options?</h3>
            <p className="text-gray-700 leading-relaxed">
              The tool includes four text transformation options that apply before duplicate detection: "None" (no changes), "UPPERCASE" (converts all text to capital letters), "lowercase" (converts all text to small letters), and "Capitalize" (capitalizes the first letter of each line). These transformations are useful when you want to standardize text formatting while removing duplicates. For example, using uppercase transformation ensures that "Hello", "hello", and "HELLO" are all treated as the same line and deduplicated accordingly.
            </p>
          </div>
        </div>
      </section>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
