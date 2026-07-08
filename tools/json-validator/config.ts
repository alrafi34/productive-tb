import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "json-validator",
  name: "JSON Validator",
  description: "Validate, format, and minify JSON instantly with real-time error detection, line-number reporting, stats analysis, and clipboard export.",
  category: "developer",
  icon: "✅",
  free: true,
  backend: false,
  seo: {
    title: "JSON Validator — Free Online JSON Validator & Formatter | Productive Toolbox",
    description: "Validate JSON syntax instantly with line-number error reporting. Format with 2 or 4-space indent, minify for production, and analyse depth and size. Free, browser-based, no upload.",
    keywords: [
      "json validator",
      "json validator online",
      "free json validator",
      "validate json online",
      "json checker",
      "json syntax checker",
      "json formatter",
      "format json online",
      "json beautifier",
      "json minifier",
      "minify json online",
      "json parser online",
      "json error checker",
      "check json syntax",
      "json lint",
      "jsonlint online",
      "validate json free",
      "json validator no signup",
      "json format and validate",
      "online json tool",
      "json validator with line numbers",
      "json validator for developers",
      "json pretty print online",
      "json compress online",
      "json size calculator",
    ],
    openGraph: {
      title: "JSON Validator — Free Online JSON Validator & Formatter",
      description: "Validate JSON with line-number errors, format with configurable indent, minify for production, analyse depth and size. Free and 100% browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/developer/json-validator`,
    },
    howToSteps: [
      {
        name: "Paste or type your JSON",
        text: "Paste your JSON directly into the editor, or drag and drop a .json file onto the input area. The editor accepts API response bodies, configuration files, data exports, or hand-written objects of any size.",
      },
      {
        name: "Validate",
        text: "Click Validate JSON or press Ctrl+Enter. The tool runs JSON.parse on your input and reports the result instantly. If invalid, the error message shows the exact character position and line number of the first syntax violation.",
      },
      {
        name: "Read the error message",
        text: "When validation fails, the output shows the character position, line number, and a context extract around the problem. Common messages include Unexpected token, Expected comma, and Unterminated string.",
      },
      {
        name: "Format for readability",
        text: "Once the JSON is valid, click Format to pretty-print it with 2-space or 4-space indentation. Formatted JSON is easier to read, diff in version control, and share with colleagues.",
      },
      {
        name: "Minify for production",
        text: "Click Minify to strip all whitespace and produce the most compact version of the JSON. Paste the output into API responses, environment variables, or config bundles where payload size matters.",
      },
      {
        name: "Review the stats panel",
        text: "Check the stats display for character count, line count, file size, maximum nesting depth, and key count. These metrics help identify unexpected complexity and catch over-nested structures early.",
      },
      {
        name: "Copy and use your output",
        text: "Click Copy to Clipboard on the formatted or minified output to transfer it to your editor, terminal, or API testing tool. The history panel lets you retrieve any of your last 10 inputs without re-pasting.",
      },
    ],
    faq: [
      {
        q: "What is a JSON validator and what does it check?",
        a: "A JSON validator parses your JSON against the ECMA-404 specification and reports exactly where the input breaks the rules. It checks for missing or extra commas, unclosed braces and brackets, unquoted keys, invalid escape sequences, trailing commas, and incorrect value types. This tool reports the character position and line number of the first syntax error so you can jump straight to the problem.",
      },
      {
        q: "What is the difference between validating and formatting JSON?",
        a: "Validation checks whether the JSON is syntactically correct — it is a pass or fail check. Formatting takes valid JSON and re-renders it with consistent indentation and line breaks for readability. Formatting does not change the data, only the whitespace. This tool validates first and only allows formatting on input that passes validation.",
      },
      {
        q: "What does JSON minification do?",
        a: "Minification removes all whitespace — spaces, tabs, and newlines — that are not part of a string value. It produces the most compact possible representation of the same JSON data. A formatted file with 2-space indentation can be 30-40% larger than its minified equivalent for deeply nested structures. Minification is standard before embedding JSON in API responses or config bundles.",
      },
      {
        q: "What are the most common JSON syntax errors?",
        a: "The most frequent errors are: trailing commas after the last property in an object or array, using single quotes instead of double quotes, unquoted keys, missing commas between properties, unclosed braces or brackets, and invalid escape sequences inside strings. The error message includes the character position of the first violation.",
      },
      {
        q: "Can I validate JSON from an API response?",
        a: "Yes. Copy the raw response body from your browser DevTools Network tab, Postman, Insomnia, or curl output and paste it directly into the editor. The validator uses the same JSON.parse engine as your browser, so a valid result here means the response will parse without error in any modern JavaScript environment.",
      },
      {
        q: "What is JSON depth and why does it matter?",
        a: "JSON depth is the maximum nesting level in your document — how many objects or arrays are nested inside each other at the deepest point. Very deep nesting (depth 10 or higher) is often a sign of poorly structured data and can cause performance issues in parsers and query engines. This tool reports the maximum depth in the stats panel.",
      },
      {
        q: "Is there a size limit on JSON I can validate?",
        a: "There is no enforced limit because all processing runs in your browser. JavaScript's JSON.parse handles files of several megabytes without difficulty on modern hardware. The stats panel displays the input size so you can monitor it. For typical API payloads, config files, and data exports, size is not an issue.",
      },
      {
        q: "What is the difference between JSON and JavaScript object literals?",
        a: "JSON requires all keys to be double-quoted strings, does not allow trailing commas, does not support comments, and does not allow undefined, functions, or Infinity as values. JavaScript object literals allow unquoted keys, single-quoted strings, trailing commas, and comments. Code that looks like valid JS will often fail JSON validation for exactly these reasons.",
      },
      {
        q: "Can I save or export my formatted or minified JSON?",
        a: "Click Copy to Clipboard to copy the current output and paste it anywhere. The tool also maintains a local history of your last 10 validated inputs in your browser's localStorage so you can return to a previous session. Copy the output into a text editor and save with a .json extension to create a file.",
      },
      {
        q: "Is my JSON data private when using this tool?",
        a: "Yes. All validation, formatting, and minification runs entirely in your browser using JavaScript's native JSON.parse and JSON.stringify. Your JSON is never transmitted to any server, stored in any remote database, or accessible to anyone other than you. The history feature saves a truncated preview to localStorage only — the data stays on your device.",
      },
    ],
  },
  features: [
    "Instant validation using native JSON.parse",
    "Error message with line number and character position",
    "Context extract around the error location",
    "Format with 2-space or 4-space indentation",
    "Minify — remove all non-essential whitespace",
    "Stats: size, character count, lines, depth, key count",
    "Drag-and-drop .json file upload",
    "Copy formatted or minified output to clipboard",
    "Session history — last 10 inputs stored locally",
    "Keyboard shortcut: Ctrl+Enter to validate",
    "Dark and light theme toggle",
    "100% browser-based — no server, no upload",
  ],
  relatedTools: [
    "json-formatter",
    "base64-encoder-decoder",
    "xml-formatter",
    "yaml-validator",
    "url-encoder-decoder",
  ],
};
