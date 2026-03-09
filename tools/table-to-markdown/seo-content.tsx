import React from 'react';
import RelatedTools from '@/components/RelatedTools';

export default function SEOContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Table to Markdown Converter</h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">1.</span>
            <span><strong>Paste your table data:</strong> Copy a table from Excel, Google Sheets, or any spreadsheet application and paste it into the input area. You can also upload CSV, TSV, or TXT files.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">2.</span>
            <span><strong>Configure settings:</strong> Choose header mode (first row, no header, or custom), select delimiter type (auto-detect, tab, comma, pipe, or space), and enable formatting options.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">3.</span>
            <span><strong>Set column alignments:</strong> For each column, choose left, center, or right alignment. This controls how the Markdown table will be formatted.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">4.</span>
            <span><strong>Convert to Markdown:</strong> Click "Convert to Markdown" to generate the table. View the Markdown code and rendered preview simultaneously.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[#058554] min-w-[24px]">5.</span>
            <span><strong>Copy or download:</strong> Copy the Markdown to clipboard or download as a .md file for use in documentation, GitHub, or any Markdown editor.</span>
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Table to Markdown Converter?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          A Table to Markdown Converter is a specialized tool that transforms spreadsheet data into Markdown table syntax. Markdown tables are widely used in documentation, README files, GitHub, GitLab, forums, and content management systems that support Markdown formatting. This tool eliminates the tedious manual process of creating Markdown tables by automatically parsing your data and generating properly formatted Markdown syntax.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our converter runs entirely in your browser, ensuring complete privacy as no data is sent to any server. It intelligently detects delimiters (tabs, commas, pipes, or spaces) to parse your table data correctly, supports multiple header modes including custom headers, and offers advanced formatting options like column alignment, pretty formatting with fixed widths, special character escaping, and backtick wrapping for code tables.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether you're creating documentation, writing README files, preparing content for GitHub wikis, or formatting data for any Markdown-supported platform, this tool provides instant conversion with full control over formatting. The live preview feature lets you see exactly how your table will render, and the statistics dashboard shows row count, column count, and total cells for verification.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📚 Documentation</h3>
            <p className="text-sm text-gray-700">Create tables for technical documentation, API references, and user guides in Markdown format.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">💻 GitHub README</h3>
            <p className="text-sm text-gray-700">Format tables for GitHub README files, wikis, and issue templates with proper Markdown syntax.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📊 Data Presentation</h3>
            <p className="text-sm text-gray-700">Convert spreadsheet data into Markdown tables for blog posts, articles, and content platforms.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📝 Note Taking</h3>
            <p className="text-sm text-gray-700">Create formatted tables in Markdown-based note-taking apps like Obsidian, Notion, or Joplin.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔧 Configuration Files</h3>
            <p className="text-sm text-gray-700">Format configuration tables for YAML, TOML, or Markdown-based config documentation.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">📈 Reports</h3>
            <p className="text-sm text-gray-700">Convert data tables from Excel or Google Sheets into Markdown for reports and presentations.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Instant Conversion:</strong> Convert tables in seconds with automatic delimiter detection.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>100% Privacy:</strong> All processing happens in your browser - no data uploaded to servers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Multiple Input Methods:</strong> Paste from Excel/Sheets, upload CSV/TSV files, or type manually.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Column Alignment Control:</strong> Set left, center, or right alignment for each column independently.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Pretty Formatting:</strong> Generate clean, readable Markdown with fixed column widths.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Live Preview:</strong> See both Markdown code and rendered table simultaneously.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#058554] mt-1">✓</span>
            <span><strong>Flexible Headers:</strong> Use first row, auto-generate, or provide custom headers.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does the tool detect table columns?</h3>
            <p className="text-gray-700 leading-relaxed">
              The tool uses intelligent delimiter detection to identify columns in your data. When set to "Auto Detect", it analyzes the first line to determine whether your data uses tabs (most common from Excel/Sheets), commas (CSV format), pipes (already formatted tables), or multiple spaces (text-aligned tables). You can also manually select the delimiter if auto-detection doesn't work correctly. The tool handles quoted CSV values properly, so commas within quotes won't be treated as delimiters. For best results, ensure your data has consistent delimiters throughout all rows.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the difference between the header modes?</h3>
            <p className="text-gray-700 leading-relaxed">
              "First Row is Header" treats the first line of your data as column headers, which is the most common scenario when copying from spreadsheets. "No Header (Auto-generate)" creates generic headers like "Column 1", "Column 2", etc., and treats all your data (including the first row) as table content - useful when your data doesn't have headers. "Custom Headers" lets you define your own header names while treating all input data as table rows. This is perfect when you want different header names than what's in your source data or when you need to add headers to headerless data with specific names.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How do column alignments work in Markdown?</h3>
            <p className="text-gray-700 leading-relaxed">
              Column alignment in Markdown is controlled by colons in the separator row. Left alignment uses `:---` (colon on left), center alignment uses `:---:` (colons on both sides), and right alignment uses `---:` (colon on right). The tool lets you set alignment for each column independently through dropdown menus. Left alignment is default and best for text, center alignment works well for short values or symbols, and right alignment is ideal for numbers. The alignment affects how the table renders in Markdown viewers, GitHub, documentation sites, and other platforms that support Markdown tables.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What does "Pretty Format" do?</h3>
            <p className="text-gray-700 leading-relaxed">
              Pretty Format creates visually aligned Markdown tables with fixed column widths, making the raw Markdown code easier to read and edit. It calculates the maximum width needed for each column (including headers and all data rows) and pads cells with spaces to create uniform columns. This results in Markdown that looks like a proper table even in plain text editors. When disabled, the tool generates compact Markdown with minimal spacing, which is functionally identical but less readable in source form. Pretty formatting is recommended for documentation and files you'll edit manually, while compact format is fine for automated generation or when file size matters.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">When should I use "Escape Special Chars" or "Wrap in Backticks"?</h3>
            <p className="text-gray-700 leading-relaxed">
              "Escape Special Chars" adds backslashes before Markdown special characters (like *, _, [, ], |, etc.) to prevent them from being interpreted as Markdown formatting. Use this when your table contains text with these characters that should be displayed literally. "Wrap in Backticks" surrounds each cell with backticks (`), which is useful for code tables, technical documentation, or when you want to preserve exact formatting and prevent any Markdown interpretation. Backticks also give cells a monospace font and gray background in most Markdown renderers. Use escaping for mixed content and backticks for code/technical data.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure when using this tool?</h3>
            <p className="text-gray-700 leading-relaxed">
              Absolutely! This tool runs entirely in your browser using client-side JavaScript. Your table data never leaves your device or gets uploaded to any server. All parsing, conversion, and formatting operations happen locally on your computer. This makes it completely safe for converting sensitive data, proprietary information, confidential reports, or any private content. You can even use this tool offline once the page has loaded. The tool doesn't store any data, use cookies for tracking, or send analytics about your content. Your privacy is guaranteed by the architecture of the tool itself - there's simply no mechanism for your data to leave your device.
            </p>
          </div>
        </div>
      </section>

      <RelatedTools currentTool="table-to-markdown" tools={["text-diff-checker", "markdown-previewer", "remove-duplicate-lines", "whitespace-remover"]} />
    </div>
  );
}
