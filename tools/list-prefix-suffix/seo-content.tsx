export default function SEOContent() {
  return (
    <>
      {/* How to Use */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the List Prefix/Suffix Tool
        </h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Enter Your List</h3>
            <p>Type or paste your list items into the input area, with one item per line. The tool supports lists of any length.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Choose a Template or Customize</h3>
            <p>Select a quick template (Markdown Bullet, Numbered List, Checklist, etc.) or manually enter custom prefix and suffix characters.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Configure Options</h3>
            <p>Enable numbering if needed, choose number format, and toggle options like removing empty lines or trimming spaces.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Step 4: Copy or Download</h3>
            <p>Copy the formatted list to your clipboard or download it as a text file for use in your projects.</p>
          </div>
        </div>
      </section>

      {/* What is List Prefix/Suffix Tool */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is a List Prefix/Suffix Tool?
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            A List Prefix/Suffix Tool is a text formatting utility that automatically adds custom characters or text to the 
            beginning (prefix) or end (suffix) of every line in a list. This tool eliminates the need for manual, repetitive 
            editing when formatting large lists.
          </p>
          <p>
            For example, if you have a plain list of items and need to convert it to a markdown bullet list, the tool can 
            instantly add "- " to the beginning of each line. Similarly, you can add semicolons, commas, or any custom 
            characters to the end of each line for CSV formatting or code generation.
          </p>
          <p>
            The tool is particularly useful for developers, writers, content creators, and anyone who works with structured 
            text data. It supports advanced features like automatic numbering, empty line removal, and space trimming to 
            ensure clean, consistent output.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases for List Prefix/Suffix Tool
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Markdown Formatting</h3>
            <p className="text-gray-600">
              Quickly convert plain lists into markdown bullet points, numbered lists, or checklists for documentation and README files.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Code Generation</h3>
            <p className="text-gray-600">
              Add code comments, array elements, or SQL values to multiple lines at once, saving time in development workflows.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">CSV and Data Formatting</h3>
            <p className="text-gray-600">
              Prepare data for spreadsheets by adding commas, semicolons, or other delimiters to create CSV-compatible formats.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Content Creation</h3>
            <p className="text-gray-600">
              Format lists for blog posts, articles, and social media content with consistent styling and numbering.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Task Management</h3>
            <p className="text-gray-600">
              Create checklists for project management tools, to-do lists, and task tracking systems with checkbox formatting.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Email and Communication</h3>
            <p className="text-gray-600">
              Format lists for professional emails, reports, and presentations with proper numbering and bullet points.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I add both prefix and suffix at the same time?
            </h3>
            <p className="text-gray-600">
              Yes! You can add both a prefix and suffix to each line simultaneously. For example, you can add "- " as a prefix 
              and ";" as a suffix to create "- Item;". The tool also supports numbering in combination with prefixes and suffixes.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              How does the numbering feature work?
            </h3>
            <p className="text-gray-600">
              When you enable numbering, the tool automatically adds sequential numbers to each line. You can customize the 
              starting number (e.g., start at 0 or 5) and choose the separator format (dot, parenthesis, dash, or colon). 
              Numbers are added before any prefix text.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              What does the "Remove Empty Lines" option do?
            </h3>
            <p className="text-gray-600">
              This option automatically filters out any blank lines from your input before applying prefixes and suffixes. 
              It's useful when you have inconsistent spacing in your list and want a clean, compact output without gaps.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I undo changes if I make a mistake?
            </h3>
            <p className="text-gray-600">
              Yes! The tool saves your original input when you first convert it. Click the "Undo" button to restore your 
              original list and start over with different formatting options.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
