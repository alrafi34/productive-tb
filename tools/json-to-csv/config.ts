export const toolConfig = {
  slug: "json-to-csv",
  name: "JSON to CSV Converter",
  description: "Convert JSON data into CSV spreadsheet format instantly with flattening support",
  category: "developer",
  icon: "📊",
  free: true,
  backend: false,
  seo: {
    title: "JSON to CSV Converter – Flatten JSON for Excel & Sheets",
    description: "Flatten nested JSON objects into CSV for Excel or Google Sheets. Preview the table, then copy or download the CSV, all in your browser.",
    keywords: [
      "json to csv",
      "json converter",
      "csv converter",
      "json to csv online",
      "convert json",
      "flatten json",
      "csv generator",
      "json to spreadsheet",
      "free json to csv",
      "online json converter",
      "json to csv tool",
      "data conversion",
      "json transformation",
      "csv export",
      "json to csv converter online"
    ],
    openGraph: {
      title: "JSON to CSV Converter – Flatten JSON for Excel & Sheets",
      description: "Flatten nested JSON objects into CSV for Excel or Google Sheets. Preview the table, then copy or download the CSV, all in your browser.",
      type: "website",
      url: "/json-to-csv"
    },
    faq: [
      { q: "What is JSON to CSV conversion?", a: "JSON to CSV conversion transforms data from JSON (JavaScript Object Notation) format into CSV (Comma-Separated Values) format. This is useful when you need to import JSON data into spreadsheet applications like Excel or Google Sheets." },
      { q: "What does flattening do?", a: "Flattening converts nested JSON objects and arrays into a flat structure with dot-notation keys. For example, an object with nested address becomes separate columns like address.city and address.zip, making it compatible with spreadsheet formats." },
      { q: "Can I use different delimiters?", a: "Yes! You can choose between comma, semicolon, or tab as your delimiter. This is useful when your data contains commas or when working with different regional CSV formats." },
      { q: "How are arrays handled?", a: "Arrays are flattened with index-based keys. For example, an array of tags becomes tags.0, tags.1, tags.2, etc. Each array element gets its own column in the CSV output." },
      { q: "Is this tool free to use?", a: "Yes, our JSON to CSV Converter is completely free and runs entirely in your browser. No registration, no limits, and no backend processing required. All conversion happens locally on your device." },
      { q: "What happens to my data?", a: "Your data never leaves your device. All JSON parsing and CSV generation happens entirely in your browser. We do not store, transmit, or process your data on any server." },
      { q: "Can I download the CSV file?", a: "Yes! After conversion, you can download the CSV as a file with a single click. The file will be named data.csv and is ready to open in Excel or Google Sheets." },
    ],
  },
  features: [
    "Real-time JSON to CSV conversion",
    "Automatic nested object flattening",
    "Array element handling",
    "Custom delimiter support (comma, semicolon, tab)",
    "Include/exclude headers option",
    "Drag-and-drop file upload",
    "Copy to clipboard functionality",
    "Download CSV files",
    "Input validation with error messages",
    "LocalStorage history",
    "Mobile-responsive design"
  ]
};
