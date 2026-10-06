export const toolConfig = {
  slug: "csv-to-json-converter",
  name: "CSV to JSON Converter",
  description: "Parse CSV text or files into structured JSON. Preview table, download JSON, copy to clipboard.",
  category: "developer",
  icon: "📋",
  free: true,
  backend: false,
  seo: {
    title: "CSV to JSON Converter – Free, Private, In Your Browser",
    description: "Convert CSV to a JSON array of objects. Paste text or upload a file, pick comma, semicolon, tab or pipe, preview the table, then copy or download the JSON.",
    keywords: [
      "csv to json",
      "csv converter",
      "json converter",
      "csv to json online",
      "convert csv",
      "csv parser",
      "json generator",
      "csv to json tool",
      "free csv to json",
      "online csv converter",
      "csv to json converter",
      "data conversion",
      "csv transformation",
      "json export",
      "csv to json converter online"
    ],
    openGraph: {
      title: "CSV to JSON Converter – Free, Private, In Your Browser",
      description: "Convert CSV to a JSON array of objects. Paste text or upload a file, pick comma, semicolon, tab or pipe, preview the table, then copy or download the JSON.",
      type: "website",
      url: "https://productivetoolbox.com/tools/developer/csv-to-json-converter"
    },
    howToSteps: [
      { name: "Add your CSV", text: "Paste CSV text into the input box or upload a .csv or .txt file, such as an export from Excel, Google Sheets or a database." },
      { name: "Set the delimiter", text: "Choose comma, semicolon, tab or pipe, or turn on auto-detect. Files saved by Excel in much of Europe use semicolons." },
      { name: "Choose the options", text: "Use the first row as JSON keys, trim spaces around values, handle quoted fields, and pick pretty-printed or minified JSON." },
      { name: "Check the preview", text: "The table preview shows how rows and columns were read, with the row and column count." },
      { name: "Copy or download", text: "Copy the JSON to the clipboard or download it as a .json file." },
    ],
    faq: [
      { q: "How does CSV map to JSON?", a: "With Use first row as headers on, each following row becomes one JSON object whose keys are the header names, and the whole file becomes an array of those objects. With it off, the keys are column_1, column_2 and so on." },
      { q: "Are numbers and true/false converted?", a: "No. Every value is kept as a JSON string, for example \"30\" rather than 30, because CSV has no data types and values such as ZIP codes (\"02115\") or IDs with leading zeros would be damaged by automatic conversion. Convert the fields you need in your own code." },
      { q: "How are commas, quotes and line breaks inside a value handled?", a: "As in the CSV standard (RFC 4180): a value wrapped in double quotes may contain the delimiter and line breaks, and a doubled quote (\"\") inside it becomes one quote. For example \"Los Angeles, CA\" stays one value." },
      { q: "Why is my file split into the wrong columns?", a: "The delimiter is probably different. Excel uses a semicolon in countries where the comma is the decimal separator, such as Germany, France and Spain; choose Semicolon or turn on auto-detect. Tab-separated files need Tab." },
      { q: "What happens with blank or repeated column names?", a: "A blank header becomes column_1, column_2 and so on by position, and a repeated header gets a suffix such as email_2, so no column is dropped from the JSON. Empty lines in the file are skipped." },
      { q: "Is my data uploaded?", a: "No. We do not collect or store what you enter." },
    ],
  },
  features: [
    "Real-time CSV to JSON conversion",
    "Multiple delimiter support (comma, semicolon, tab, pipe)",
    "Auto-detect delimiter",
    "Handle quoted values",
    "Trim whitespace option",
    "Use first row as headers",
    "Drag-and-drop file upload",
    "Copy to clipboard functionality",
    "Download JSON files",
    "Table preview with scrolling",
    "Input validation with error messages",
    "Pretty and minified JSON output",
    "Mobile-responsive design"
  ]
};

export const config = toolConfig;
