export const toolConfig = {
  slug: "yaml-to-json-converter",
  name: "YAML to JSON Converter",
  description: "Paste YAML data and instantly convert it to valid JSON with syntax highlighting and error checking.",
  category: "developer",
  icon: "🔄",
  free: true,
  backend: false,
  seo: {
    title: "YAML to JSON Converter – Convert YAML to JSON Instantly",
    description: "Paste YAML and convert it into valid, formatted JSON with syntax highlighting and clear error messages for invalid input.",
    keywords: [
      "yaml to json",
      "yaml converter",
      "convert yaml to json online",
      "yaml parser",
      "devops yaml tools",
      "yaml to json converter",
      "json converter",
      "yaml to json online",
      "free yaml converter",
      "online yaml to json",
      "kubernetes yaml converter",
      "docker compose converter",
      "ci/cd yaml converter",
      "configuration converter",
      "yaml transformation"
    ],
    openGraph: {
      title: "YAML to JSON Converter – Convert YAML to JSON Instantly",
      description: "Paste YAML and convert it into valid, formatted JSON with syntax highlighting and clear error messages for invalid input.",
      type: "website",
      url: "/tools/developer/yaml-to-json-converter"
    },
    faq: [
      { q: "How does YAML map to JSON?", a: "Key: value pairs become JSON object properties, indented blocks become nested objects, and lines starting with - become array items. Numbers, true/false and null are converted to their JSON types; everything else becomes a string." },
      { q: "Why does my YAML fail to convert?", a: "The most common causes are tabs used for indentation (YAML requires spaces), inconsistent indentation within one block, and a missing space after a colon. The converter points to the line where parsing stopped." },
      { q: "Which YAML features are supported?", a: "Mappings, nested objects, lists, comments and plain scalar values, which covers typical config files such as Docker Compose, GitHub Actions and Kubernetes manifests. Advanced features such as anchors and aliases (&, *), multi-document files (---) and block text (| and >) are not supported." },
      { q: "What is the difference between YAML and JSON?", a: "They describe the same kinds of data. YAML relies on indentation and allows comments, which makes it easier to write by hand; JSON uses braces and quotes and has no comments, which makes it stricter and easier for programs to parse. JSON is valid YAML 1.2." },
      { q: "Can I minify or download the JSON?", a: "Yes. Choose 2-space, 4-space or tab indentation, or minify the output to a single line, then copy it or download it as a .json file." },
    ],
  },
  features: [
    "Real-time YAML to JSON conversion",
    "YAML syntax validation",
    "Instant error detection with line numbers",
    "Customizable indentation (2, 4 spaces, tabs)",
    "JSON minification support",
    "Drag-and-drop file upload",
    "Copy to clipboard functionality",
    "Download JSON files",
    "Syntax highlighting",
    "Large YAML file support",
    "Mobile-responsive design",
    "Your inputs are not collected or stored",
    "Support for complex nested structures",
    "Array and object handling"
  ]
};

export const config = toolConfig;
