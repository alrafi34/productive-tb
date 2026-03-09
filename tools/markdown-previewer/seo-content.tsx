export default function MarkdownPreviewerSEOContent() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Markdown Previewer</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
        <li><strong>Type Markdown:</strong> Enter or paste your Markdown text in the editor on the left.</li>
        <li><strong>See Live Preview:</strong> Watch your Markdown convert to styled HTML instantly in the preview pane.</li>
        <li><strong>Customize View:</strong> Switch between split view and preview-only mode, or toggle light/dark themes.</li>
        <li><strong>Export:</strong> Copy the HTML to clipboard or download as HTML or Markdown file.</li>
      </ol>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Markdown?</h2>
      <p className="text-gray-700 mb-4">
        Markdown is a lightweight markup language that uses plain text formatting syntax to create formatted documents. Created by John Gruber in 2004, Markdown is designed to be easy to read and write, converting seamlessly to HTML. It's widely used for documentation, README files, blog posts, and content management systems.
      </p>
      <p className="text-gray-700 mb-6">
        Our free Markdown previewer converts your Markdown text to styled HTML in real-time, directly in your browser. No uploads, no server processing—everything happens locally on your device. The tool supports all standard Markdown syntax including headers, lists, links, images, code blocks, tables, and more.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">How does the Markdown previewer work?</h3>
      <p className="text-gray-700 mb-4">
        The Markdown previewer uses JavaScript to parse your Markdown syntax and convert it to HTML in real-time. As you type, the tool instantly processes your text using a Markdown parser that recognizes formatting patterns like headers (#), bold (**text**), italic (*text*), links, code blocks, and more. The converted HTML is then displayed with proper styling in the preview pane.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">What Markdown syntax is supported?</h3>
      <p className="text-gray-700 mb-4">
        The tool supports all standard Markdown features: headers (H1-H6), paragraphs, bold and italic text, strikethrough, inline code and code blocks with syntax highlighting, links, images, ordered and unordered lists, nested lists, blockquotes, horizontal rules, task lists with checkboxes, and tables. It also handles line breaks and special characters correctly.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">Is my Markdown content saved or uploaded?</h3>
      <p className="text-gray-700 mb-4">
        No! All Markdown processing happens entirely in your browser using JavaScript. Your content is never uploaded to any server, stored in databases, or transmitted over the internet. Everything stays on your local device, ensuring complete privacy. You can optionally save your work by downloading it as a Markdown or HTML file.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I use this for code documentation?</h3>
      <p className="text-gray-700 mb-4">
        Absolutely! The Markdown previewer is perfect for writing technical documentation, README files, and code comments. It supports fenced code blocks with syntax highlighting for multiple programming languages. Simply wrap your code in triple backticks (```) and optionally specify the language for proper syntax coloring. This makes it ideal for developers creating documentation.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I export my Markdown?</h3>
      <p className="text-gray-700 mb-4">
        You have multiple export options: (1) Copy the rendered HTML to your clipboard for pasting into websites or emails, (2) Download as an HTML file with all styling preserved, or (3) Download as a Markdown (.md) file to save your original text. The HTML export includes inline CSS so the formatting is preserved when you open it in a browser.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I switch between light and dark themes?</h3>
      <p className="text-gray-700 mb-4">
        The tool features a clean, light theme optimized for readability and comfortable viewing. The interface maintains excellent contrast and proper syntax highlighting for code blocks, making it easy to read and edit Markdown content for extended periods. The consistent styling ensures your formatted text looks professional and polished.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
        <li><strong>Documentation:</strong> Write technical documentation, API docs, and user guides with proper formatting.</li>
        <li><strong>README Files:</strong> Create GitHub README files with live preview before committing.</li>
        <li><strong>Blog Posts:</strong> Draft blog content in Markdown and export as HTML for publishing.</li>
        <li><strong>Note Taking:</strong> Take formatted notes with headers, lists, and code snippets.</li>
        <li><strong>Content Writing:</strong> Write articles and content with structured formatting.</li>
        <li><strong>Learning Markdown:</strong> Practice Markdown syntax with instant visual feedback.</li>
        <li><strong>Email Drafts:</strong> Compose formatted emails and export as HTML.</li>
        <li><strong>Project Planning:</strong> Create task lists, checklists, and project outlines.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
        <li><strong>100% Free:</strong> No registration, subscriptions, or hidden fees.</li>
        <li><strong>Real-Time Preview:</strong> See your formatted text instantly as you type.</li>
        <li><strong>Complete Privacy:</strong> All processing happens locally in your browser.</li>
        <li><strong>Syntax Highlighting:</strong> Code blocks are highlighted for better readability.</li>
        <li><strong>Multiple Export Options:</strong> Download as HTML or Markdown, or copy to clipboard.</li>
        <li><strong>Responsive Design:</strong> Works perfectly on desktop, tablet, and mobile devices.</li>
        <li><strong>No Installation:</strong> Works directly in your browser without any software.</li>
      </ul>
    </div>
  );
}
