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
      slug: 'find-and-replace',
      name: 'Find and Replace',
      description: 'Search and replace text with advanced options',
      icon: '🔍',
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
      slug: 'bionic-reading-converter',
      name: 'Bionic Reading Converter',
      description: 'Convert text to Bionic Reading style',
      icon: '👁️',
      category: 'text'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How to Use */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the White Space Remover</h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">1.</span>
            <span><strong>Enter your text:</strong> Paste or type your text into the input area, upload a file (.txt, .md, .csv), or drag and drop a file directly into the text area.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">2.</span>
            <span><strong>Select cleaning options:</strong> Choose which types of whitespace to remove - leading spaces, trailing spaces, multiple consecutive spaces, empty lines, or all spaces. Enable tab conversion if needed.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">3.</span>
            <span><strong>Preview extra spaces:</strong> Click "Highlight Spaces" to see all extra whitespace highlighted in yellow before cleaning. This helps you understand what will be removed.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">4.</span>
            <span><strong>Clean the text:</strong> Click "Clean Whitespace" to process your text. Enable "Auto Clean on Paste" for instant cleaning as you paste text.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">5.</span>
            <span><strong>Copy or download:</strong> Copy the cleaned text to clipboard or download it as .txt, .md, or .csv file. View statistics showing spaces removed and lines processed.</span>
          </li>
        </ol>
      </section>

      {/* What is Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a White Space Remover?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A White Space Remover is a text cleaning tool that strips unwanted spaces, tabs, and line breaks from your text. It helps you clean up messy text by removing leading spaces at the beginning of lines, trailing spaces at the end of lines, multiple consecutive spaces between words, and empty lines. This tool is essential for formatting text, cleaning data exports, preparing code, and ensuring consistent text formatting.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our advanced whitespace remover runs entirely in your browser, ensuring complete privacy as no data is sent to any server. It offers comprehensive cleaning options including the ability to remove all spaces (useful for creating compact identifiers), convert tabs to spaces or vice versa with customizable tab size, and automatically clean text as you paste it. The tool also features a unique highlight mode that visually shows you all extra whitespace before cleaning, helping you understand exactly what will be removed.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether you're cleaning up copied text from PDFs, formatting code, preparing data for import, or standardizing text formatting across documents, this tool provides the precision and control you need. With features like undo/redo, multiple download formats, statistics tracking, and settings persistence, you have complete control over your text cleaning workflow. The tool handles large text files efficiently and provides instant feedback on how many spaces were removed and lines were processed.
        </p>
      </section>

      {/* Use Cases */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📄 PDF Text Cleanup</h3>
            <p className="text-sm text-gray-700">Clean up text copied from PDFs that often contains extra spaces, line breaks, and formatting issues.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">💻 Code Formatting</h3>
            <p className="text-sm text-gray-700">Remove trailing whitespace from code, convert tabs to spaces, and clean up indentation for consistent formatting.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📊 Data Preparation</h3>
            <p className="text-sm text-gray-700">Clean CSV exports, database dumps, or spreadsheet data by removing extra spaces that can cause import errors.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">✍️ Content Editing</h3>
            <p className="text-sm text-gray-700">Remove double spaces after periods, clean up pasted content, and standardize spacing in articles and documents.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔗 URL Lists</h3>
            <p className="text-sm text-gray-700">Clean up lists of URLs by removing leading/trailing spaces that can break links or cause validation errors.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📧 Email Lists</h3>
            <p className="text-sm text-gray-700">Remove extra spaces from email address lists to ensure proper formatting and prevent delivery issues.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Instant Cleaning:</strong> Process thousands of lines in milliseconds with optimized algorithms.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>100% Privacy:</strong> All processing happens in your browser - no data is uploaded to servers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Visual Feedback:</strong> Highlight mode shows exactly what whitespace will be removed before cleaning.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Flexible Options:</strong> Choose exactly which types of whitespace to remove with granular control.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Tab Conversion:</strong> Convert between tabs and spaces with customizable tab size (2-8 spaces).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Detailed Statistics:</strong> See exactly how many spaces were removed, lines processed, and tabs converted.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Multiple Export Formats:</strong> Download as .txt, .md, or .csv to match your workflow.</span>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the difference between leading, trailing, and multiple spaces?</h3>
            <p className="text-gray-700 leading-relaxed">
              Leading spaces are whitespace characters at the beginning of a line, before any text content. These are common when text is copied from formatted documents or code with indentation. Trailing spaces are whitespace at the end of a line, after the last character, which are often invisible but can cause issues in data processing or version control. Multiple consecutive spaces are two or more spaces in a row within the text, which typically should be a single space. Our tool lets you selectively remove any combination of these, giving you precise control over text cleaning. For example, you might want to keep leading spaces for code indentation but remove trailing spaces and multiple spaces.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">When should I use "Remove All Spaces"?</h3>
            <p className="text-gray-700 leading-relaxed">
              The "Remove All Spaces" option removes every space character from your text, including spaces between words. This is useful for specific scenarios like creating compact identifiers, removing spaces from phone numbers or credit card numbers, generating hashtags from phrases, or creating URL-safe strings. For example, "Hello World" becomes "HelloWorld". This option overrides all other space removal settings since it removes everything. Use it carefully as it will make normal text unreadable, but it's perfect for technical tasks where you need to eliminate all whitespace completely. For most text cleaning tasks, you'll want to use the selective options instead.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does tab conversion work?</h3>
            <p className="text-gray-700 leading-relaxed">
              Tab conversion allows you to standardize indentation in code or text. "Tabs to Spaces" replaces each tab character with a specified number of spaces (default 4, adjustable from 2-8). This is useful when you need consistent spacing for code that will be displayed in environments that render tabs differently. "Spaces to Tabs" does the opposite - it converts sequences of spaces (matching your tab size setting) into tab characters, which can reduce file size and make indentation more consistent. You can only enable one conversion at a time. The tool tracks how many tabs were converted and shows this in the statistics. This is particularly useful for code formatting, preparing text for specific editors, or standardizing files across a project.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What does the Highlight Spaces feature do?</h3>
            <p className="text-gray-700 leading-relaxed">
              The Highlight Spaces feature provides visual feedback by marking all extra whitespace in yellow before you clean the text. This includes leading spaces at the start of lines, trailing spaces at the end of lines, and multiple consecutive spaces within text. It's incredibly useful for understanding exactly what will be removed when you click "Clean Whitespace". You can toggle the highlight on and off to compare the original text with the highlighted version. This feature helps you verify that the cleaning options you've selected will produce the desired result, preventing accidental removal of intentional spacing. It's especially helpful when working with formatted text, code, or data where spacing might be significant.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I enable "Auto Clean on Paste"?</h3>
            <p className="text-gray-700 leading-relaxed">
              "Auto Clean on Paste" automatically processes your text as soon as you paste it into the input area, providing instant results without clicking the Clean button. This is convenient when you're repeatedly cleaning similar text and want immediate feedback. However, you might want to keep it disabled if you need to review or adjust the text before cleaning, if you want to change cleaning options first, or if you're working with very large text blocks where you want to control when processing happens. The setting is saved in your browser, so your preference persists across sessions. You can always use the manual "Clean Whitespace" button for more control, and the Undo feature lets you revert if auto-cleaning produces unexpected results.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my text data secure when using this tool?</h3>
            <p className="text-gray-700 leading-relaxed">
              Absolutely! This tool runs entirely in your browser using client-side JavaScript. Your text never leaves your device or gets uploaded to any server. All whitespace removal operations, including highlighting, tab conversion, and statistics calculation, happen locally on your computer. The only data stored is your preference settings (cleaning options) and the last cleaned text in your browser's localStorage for convenience, which remains on your device and can be cleared at any time. You can even use this tool offline once the page has loaded. This makes it completely safe for cleaning sensitive documents, proprietary code, confidential data, or any private content. Your privacy is guaranteed by the architecture of the tool itself.
            </p>
          </div>
        </div>
      </section>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
