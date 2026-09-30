export const toolConfig = {
  slug: "xml-to-json",
  name: "XML to JSON Converter",
  description: "Convert XML data into modern JSON format instantly with real-time preview",
  category: "developer",
  icon: "🔄",
  free: true,
  backend: false,
  seo: {
    title: "XML to JSON Converter – Convert XML to JSON Online",
    description: "Convert XML into readable JSON with optional pretty-printing and array detection. Preview, copy or download the result in your browser.",
    keywords: [
      "xml to json",
      "xml converter",
      "json converter",
      "xml to json online",
      "convert xml",
      "xml parser",
      "json formatter",
      "xml formatter",
      "free xml to json",
      "online xml converter",
      "xml to json tool",
      "data conversion",
      "xml transformation",
      "json generator",
      "xml to json converter online"
    ],
    openGraph: {
      title: "XML to JSON Converter – Convert XML to JSON Online",
      description: "Convert XML into readable JSON with optional pretty-printing and array detection. Preview, copy or download the result in your browser.",
      type: "website",
      url: "/xml-to-json"
    },
    faq: [
      { q: "What is XML to JSON conversion?", a: "XML to JSON conversion transforms data from XML (eXtensible Markup Language) format into JSON (JavaScript Object Notation) format. This is useful when working with legacy XML data that needs to be used in modern web applications that prefer JSON." },
      { q: "How does the converter handle XML attributes?", a: "When Include XML attributes is enabled, attributes are converted to JSON keys with an @ prefix. For example, XML attributes become JSON properties with the @ symbol prepended to the attribute name." },
      { q: "What is array detection?", a: "Array detection automatically converts repeated sibling elements into JSON arrays. For example, multiple book elements become a book array in JSON instead of individual objects." },
      { q: "Can I convert large XML files?", a: "Yes! This tool runs entirely in your browser and can handle large XML files (100KB+) efficiently. All processing happens locally on your device with no server limitations." },
      { q: "Is this tool free to use?", a: "Yes, our XML to JSON Converter is completely free and runs entirely in your browser. No registration, no limits, and no backend processing required. All conversion happens locally on your device." },
      { q: "What happens to my data?", a: "Your data never leaves your device. All XML parsing and JSON generation happens entirely in your browser. We do not store, transmit, or process your data on any server." },
      { q: "Can I download the converted JSON?", a: "Yes! After conversion, you can download the JSON as a file with a single click. The file will be named converted.json and ready to use in your projects." },
    ],
  },
  features: [
    "Real-time XML to JSON conversion",
    "Automatic array detection for repeated elements",
    "XML attributes handling with @ prefix",
    "Pretty-print and minify options",
    "Drag-and-drop file upload",
    "Copy to clipboard functionality",
    "Download JSON files",
    "Input validation with error messages",
    "LocalStorage history",
    "Mobile-responsive design"
  ]
};
