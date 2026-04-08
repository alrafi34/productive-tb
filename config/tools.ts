export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  free: boolean;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export const tools: Tool[] = [
  // Writing & Content Tools (1-10)
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, paragraphs, and reading time.", category: "writing", icon: "📝", free: true },
  { slug: "sentence-case-converter", name: "Sentence Case Converter", description: "Convert text to uppercase, lowercase, title case, or sentence case.", category: "writing", icon: "🔡", free: true },
  { slug: "paragraph-formatter", name: "Paragraph Formatter", description: "Clean text by fixing spaces, line breaks, and paragraph structure.", category: "writing", icon: "📝", free: true },
  { slug: "keyword-density-checker", name: "Keyword Density Checker", description: "Analyze keyword frequency and density percentages for SEO writing.", category: "writing", icon: "🔍", free: true },
  { slug: "text-reverser", name: "Text Reverser Tool", description: "Reverse letters, words, sentences, or paragraph order instantly.", category: "writing", icon: "🔄", free: true },
  { slug: "text-to-clipboard", name: "Text to Clipboard Copy", description: "Copy one or multiple text blocks in plain, HTML, or Markdown format.", category: "writing", icon: "📋", free: true },
  { slug: "word-frequency-counter", name: "Word Frequency Counter", description: "Analyze word counts, percentages, and repeated terms in text.", category: "writing", icon: "📊", free: true },
  
  // Image & Design Tools (11-18)
  { slug: "image-compressor", name: "Image Compressor", description: "Reduce JPG/PNG size in browser.", category: "image", icon: "🖼️", free: true },
  { slug: "image-resizer", name: "Image Resizer", description: "Set custom width & height.", category: "image", icon: "📐", free: true },
  { slug: "base64-image-encoder", name: "Base64 Image Encoder", description: "Convert images to Base64 string.", category: "image", icon: "🔐", free: true },
  { slug: "hex-to-rgb-converter", name: "HEX to RGB Converter", description: "Convert HEX, RGB, RGBA, and HSL color formats instantly.", category: "design", icon: "🎨", free: true },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Generate harmony-based palettes with export and contrast checks.", category: "design", icon: "🌈", free: true },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Resize image to 16×16 or 32×32 for web.", category: "image", icon: "🌐", free: true },
  
  // Security & Password Tools (19-22)
  { slug: "password-generator", name: "Password Generator", description: "Random, strong passwords.", category: "security", icon: "🔒", free: true },
  { slug: "wifi-password-generator", name: "WiFi Password Generator", description: "Easy & secure for home networks.", category: "security", icon: "📶", free: true },
  { slug: "text-encrypt-decrypt", name: "Text Encrypt/Decrypt", description: "Simple ROT13 or Base64.", category: "security", icon: "🔐", free: true },
  { slug: "username-generator", name: "Username Generator", description: "Random usernames for social media.", category: "security", icon: "👤", free: true },
  
  // Math & Calculator Tools (23-26)
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate price after discount.", category: "calculator", icon: "💰", free: true },
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Find percentage, increase, decrease.", category: "calculator", icon: "🔢", free: true },
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate exact age, days lived, and next birthday from date of birth.", category: "calculator", icon: "🎂", free: true },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Body mass index.", category: "calculator", icon: "⚖️", free: true },
  
  // URL & QR Tools (27-30)
  
  // Text & Writing Utilities (New)
  { slug: "lorem-ipsum-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder paragraphs, sentences, or words with copy and download support.", category: "writing", icon: "📄", free: true },
  { slug: "markdown-previewer", name: "Markdown Previewer", description: "Preview Markdown as HTML with live rendering, file load, and export options.", category: "writing", icon: "📋", free: true },
  { slug: "remove-duplicate-lines", name: "Remove Duplicate Lines", description: "Deduplicate line-based text with case, whitespace, and sort controls.", category: "writing", icon: "🧹", free: true },
  { slug: "find-and-replace", name: "Find and Replace", description: "Search and replace text with regex, batch rules, and preview controls.", category: "writing", icon: "🔍", free: true },
  { slug: "text-diff-checker", name: "Text Diff Checker", description: "Compare text versions by line, word, or character with visual diff output.", category: "writing", icon: "🔀", free: true },
  { slug: "bionic-reading-converter", name: "Bionic Reading Converter", description: "Convert text into adjustable bionic-style emphasis with export options.", category: "writing", icon: "👁️", free: true },
  { slug: "whitespace-remover", name: "White Space Remover", description: "Clean leading/trailing spaces, extra gaps, tabs, and empty lines.", category: "writing", icon: "🧽", free: true },
  
  // Developer & Coding Helpers (New)
  { slug: "json-validator", name: "JSON Validator", description: "Check JSON for syntax errors.", category: "developer", icon: "✅", free: true },
  { slug: "base64-encoder-decoder", name: "Base64 Encoder/Decoder", description: "Convert text to/from Base64 strings.", category: "developer", icon: "🔐", free: true },
  { slug: "url-encoder-decoder", name: "URL Encoder/Decoder", description: "Convert special characters in URLs to %xx format.", category: "developer", icon: "🔗", free: true },
  { slug: "jwt-debugger", name: "JWT Debugger", description: "Decode and inspect JSON Web Tokens instantly.", category: "developer", icon: "🔐", free: true },
  
  // Design & CSS Tools (New)
  { slug: "css-gradient-generator", name: "CSS Gradient Generator", description: "Create linear and radial gradients with copy-ready CSS.", category: "design", icon: "🌈", free: true },
  { slug: "css-box-shadow-generator", name: "CSS Box Shadow Generator", description: "Build layered shadows with live preview and copy-ready CSS.", category: "design", icon: "📦", free: true },
  { slug: "color-format-converter", name: "Color Format Converter", description: "Convert HEX, RGB, HSL, RGBA, HSLA, and CMYK instantly.", category: "design", icon: "🎨", free: true },
  { slug: "css-glassmorphism-generator", name: "CSS Glassmorphism Generator", description: "Create frosted glass effects with live preview and copy-ready code.", category: "design", icon: "🪟", free: true },
  { slug: "svg-path-visualizer", name: "SVG Path Visualizer", description: "Render and debug SVG path data with live preview.", category: "design", icon: "🖌️", free: true },
  { slug: "aspect-ratio-calculator", name: "Aspect Ratio Calculator", description: "Calculate dimensions based on aspect ratio.", category: "calculator", icon: "📐", free: true },
  { slug: "contrast-checker", name: "Contrast Checker", description: "Test WCAG AA and AAA color contrast accessibility.", category: "design", icon: "♿", free: true },
  
  // Math & Data Converters (New)
  { slug: "timestamp-unix-converter", name: "Timestamp/Unix Converter", description: "Convert Unix Epoch to human-readable dates.", category: "calculator", icon: "🕐", free: true },
  { slug: "binary-hex-decimal-converter", name: "Binary/Hex/Decimal Converter", description: "Switch numbers between different bases.", category: "math", icon: "🔢", free: true },
  { slug: "loan-emi-calculator", name: "Loan/EMI Calculator", description: "Calculate monthly payments with interest.", category: "calculator", icon: "💳", free: true },
  { slug: "random-number-generator", name: "Random Number Generator", description: "Generate random value within range.", category: "math", icon: "🎲", free: true },
  { slug: "currency-format-previewer", name: "Currency Format Previewer", description: "Show numbers in different global currencies.", category: "calculator", icon: "💱", free: true },
  
  // File & Image Micro-tools (New)
  { slug: "image-to-grayscale", name: "Image to Grayscale", description: "Apply grayscale filter to images.", category: "image", icon: "⚫", free: true },
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256 hashes.", category: "security", icon: "#️⃣", free: true },
  { slug: "table-to-markdown", name: "Table to Markdown", description: "Convert CSV, TSV, or spreadsheet data into aligned markdown tables.", category: "writing", icon: "📊", free: true },
  
  // Advanced Text & Writing (New)
  { slug: "anagram-finder", name: "Anagram Finder", description: "Check single or bulk words for anagrams with detailed letter analysis.", category: "writing", icon: "🔤", free: true },
  { slug: "palindrome-checker", name: "Palindrome Checker", description: "Check single or bulk text for palindromes with rule-based filtering.", category: "writing", icon: "🔄", free: true },
  { slug: "text-to-slug-converter", name: "Text-to-Slug Converter", description: "Convert single or bulk titles into SEO-friendly URL slugs.", category: "writing", icon: "🔗", free: true },
  { slug: "morse-code-translator", name: "Morse Code Translator", description: "Translate text and Morse code with audio playback and custom symbol settings.", category: "writing", icon: "📡", free: true },
  { slug: "upside-down-text-generator", name: "Upside-Down Text Generator", description: "Flip, mirror, and decode Unicode text with preset styles.", category: "writing", icon: "🙃", free: true },
  { slug: "zalgo-text-generator", name: "Zalgo Text Generator", description: "Add glitch decorations to text.", category: "writing", icon: "👾", free: true },
  { slug: "nato-phonetic-converter", name: "NATO Phonetic Alphabet Converter", description: "Convert text to NATO phonetic alphabet.", category: "writing", icon: "📻", free: true },
  { slug: "random-name-picker", name: "Random Name Picker", description: "Randomly select winner from a list.", category: "writing", icon: "🎰", free: true },
  
  // Developer & System Tools (New)
  
  // Design & Visuals (New)
  { slug: "golden-ratio-calculator", name: "Golden Ratio Calculator", description: "Split number into 1.618 golden ratio parts.", category: "calculator", icon: "✨", free: true },
  { slug: "css-filter-tester", name: "CSS Filter Tester", description: "Preview and tune CSS image filters with live sliders.", category: "design", icon: "🎨", free: true },
  { slug: "hsl-color-slider", name: "HSL Color Slider", description: "Adjust hue, saturation, and lightness with live preview.", category: "design", icon: "🌈", free: true },
  { slug: "neumorphism-generator", name: "Box Shadow Neumorphism Generator", description: "Create raised and pressed soft UI styles with live preview.", category: "design", icon: "💎", free: true },
  { slug: "css-animation-previewer", name: "CSS Animation Previewer", description: "Preview easing and cubic-bezier animations with live controls.", category: "design", icon: "🎬", free: true },
  
  // Math, Finance & Logic (New)
  { slug: "percentage-increase-decrease", name: "Percentage Increase/Decrease", description: "Calculate % change between two numbers.", category: "calculator", icon: "📈", free: true },
  { slug: "fuel-cost-calculator", name: "Fuel Cost Calculator", description: "Calculate trip cost based on distance and MPG.", category: "calculator", icon: "⛽", free: true },
  { slug: "ohms-law-calculator", name: "Ohm's Law Calculator", description: "Calculate Voltage, Current, or Resistance instantly using Ohm's Law.", category: "calculator", icon: "⚡", free: true },
  { slug: "power-consumption-calculator", name: "Power Consumption Calculator", description: "Estimate electric bill based on appliance usage.", category: "calculator", icon: "🔌", free: true },

  
  // Privacy & Security (New)
  { slug: "password-strength-meter", name: "Password Strength Meter", description: "Score password based on entropy and length.", category: "security", icon: "🔐", free: true },
  { slug: "leetspeak-converter", name: "Leetspeak (1337) Converter", description: "Turn text into 1337 speak.", category: "writing", icon: "🤖", free: true },
  
  // Visualization & Data (New)
  { slug: "pie-chart-maker", name: "Pie Chart Maker", description: "Render dynamic SVG/Canvas pie charts.", category: "visualization", icon: "📊", free: true },
  { slug: "bar-graph-generator", name: "Bar Graph Generator", description: "Simple table-to-chart tool for reports.", category: "visualization", icon: "📊", free: true },
  { slug: "mind-map-builder", name: "Mind Map Builder", description: "Drag-and-drop canvas to connect ideas.", category: "visualization", icon: "🧠", free: true },
  { slug: "word-cloud-generator", name: "Word Cloud Generator", description: "Visual cloud of most used words.", category: "visualization", icon: "☁️", free: true },
  { slug: "heatmap-grid", name: "Heatmap Grid", description: "Visualize density by clicking grid cells.", category: "visualization", icon: "🔥", free: true },
  { slug: "venn-diagram-maker", name: "Venn Diagram Maker", description: "2 or 3-circle overlapping diagram tool.", category: "visualization", icon: "⭕", free: true },
  { slug: "flowchart-logic-mapper", name: "Flowchart Logic Mapper", description: "Connect boxes/arrows to map processes.", category: "visualization", icon: "🔀", free: true },
  { slug: "json-to-csv", name: "JSON to CSV", description: "Flatten JSON objects into spreadsheet file.", category: "developer", icon: "📋", free: true },
  { slug: "xml-to-json", name: "XML to JSON", description: "Translate XML data into modern JSON format.", category: "developer", icon: "🔄", free: true },
  
  // Productivity & Lifestyle (New)
  { slug: "pomodoro-timer", name: "Pomodoro Timer", description: "25/5 minute focus timer with notifications.", category: "productivity", icon: "🍅", free: true },
  
  // Privacy & Cryptography (New)
  
  // Creative & Fun UI (New)
  { slug: "css-border-radius-blob", name: "CSS Border-Radius Blob Maker", description: "Create organic, non-round shapes.", category: "design", icon: "🫧", free: true },
  { slug: "gradient-text-generator", name: "Gradient Text Generator", description: "Generate background-clip: text CSS code.", category: "design", icon: "🌈", free: true },
  
  // Misc & Utility (New)
  { slug: "list-prefix-suffix", name: "List Item Prefix/Suffix", description: "Add character to every line of list.", category: "writing", icon: "📝", free: true },
  { slug: "unit-ratio-calculator", name: "Unit Ratio Calculator", description: "Simplify ratios like 100:50 to 2:1 instantly.", category: "calculator", icon: "⚖️", free: true },
  { slug: "date-difference-calculator", name: "Date Difference Calculator", description: "Calculate years, months, days between two dates.", category: "calculator", icon: "📅", free: true },
  { slug: "color-palette-extractor", name: "Color Palette Extractor", description: "Upload image to get 5 dominant colors.", category: "design", icon: "🎨", free: true },
  
  // Multimedia & Browser APIs (New)
  { slug: "color-palette-contrast-grid", name: "Color Palette Contrast Grid", description: "Test all palette text/background pairs for WCAG contrast.", category: "design", icon: "🔲", free: true },
  
  // Advanced Developer Tools (New)
  
  // Data & Analytics (Local) (New)
  
  // Randomizers & Simulation (New)
  { slug: "color-blindness-simulator", name: "Color Blindness Simulator", description: "Apply SVG filters for accessibility preview.", category: "design", icon: "👁️", free: true },
  { slug: "random-hex-color-generator", name: "Random Hex Color Generator", description: "Spacebar to refresh color inspiration.", category: "design", icon: "🎨", free: true },
  
  // Niche Utilities (New)
  
  // Structural & Architecture Helpers (New)
  
  // Advanced Calculation & Logic (New)
  
  // Creative & Visual Assets (New)
  { slug: "css-mesh-gradient-generator", name: "CSS Mesh Gradient Generator", description: "Create trendy multi-color backgrounds.", category: "design", icon: "🌈", free: true },
  { slug: "custom-scrollbar-styler", name: "Custom Scrollbar Styler", description: "Design webkit-scrollbar styles visually.", category: "design", icon: "📜", free: true },
  { slug: "css-keyframe-animator", name: "CSS Keyframe Animator", description: "Timeline UI to build @keyframes.", category: "design", icon: "🎬", free: true },
  { slug: "pattern-noise-generator", name: "Pattern Noise Generator", description: "Create grain/noise texture for UI depth.", category: "design", icon: "📺", free: true },
  
  // Security & Privacy (Client-Side) (New)
  
  // Miscellaneous & Fun (New)
  
  // Advanced Dev & Performance (New)
  
  // Data Transformation & Parsing (New)
  
  // Creative & UI/UX Design (New)
  { slug: "css-cursor-style-previewer", name: "CSS Cursor Style Previewer", description: "Test and preview all CSS cursor types with interactive examples.", category: "design", icon: "👆", free: true },
  { slug: "css-clamp-generator", name: "CSS Clamp Generator", description: "Generate responsive CSS clamp() values for fluid typography.", category: "design", icon: "📏", free: true },
  { slug: "glassmorphism-layer-tester", name: "Glassmorphism Layer Tester", description: "Control backdrop-filter blur intensities.", category: "design", icon: "🪟", free: true },
  
  // Privacy & Security (Hardened) (New)
  { slug: "ip-address-masker", name: "IP Address Masker", description: "Practice converting IP to CIDR blocks.", category: "security", icon: "🌐", free: true },
  
  // Specialized Utilities (New)
  
  // Multimedia & Media Processing (New)
  
  // Professional Developer Tools (New)
  
  // Advanced Science & Math Utilities (New)
  { slug: "matrix-calculator", name: "Matrix Calculator", description: "Performs addition, multiplication, and inversion of matrices.", category: "calculator", icon: "🔢", free: true },
  { slug: "temperature-conversion-scientific", name: "Temperature Conversion (Scientific)", description: "Kelvin, Celsius, Fahrenheit, Rankine.", category: "calculator", icon: "🌡️", free: true },
  { slug: "checksum-calculator", name: "Checksum Calculator", description: "CRC32/SHA-1/SHA-256 for local files.", category: "security", icon: "✅", free: true },
  
  // Niche & Advanced Utilities (New)
  { slug: "hex-to-rgba-converter", name: "Hex-to-RGBA Converter", description: "Adds an alpha channel slider.", category: "design", icon: "🎨", free: true },
  
  // Advanced Developer Productivity (New)
  
  // Advanced Math & Science Logic (New)

  // New Calculators (80) to reach 200 total in category
  { slug: "time-duration-calculator", name: "Time Duration Calculator", description: "Find hours and minutes between two times.", category: "calculator", icon: "⏳", free: true },
  { slug: "centimeter-to-meter-converter", name: "Centimeter to Meter Converter", description: "Convert centimeters to meters instantly.", category: "calculator", icon: "📏", free: true },
  { slug: "square-meter-to-square-foot-converter", name: "Square Meter to Square Foot Converter", description: "Convert area measurements from square meters (m²) to square feet (ft²) instantly.", category: "calculator", icon: "📐", free: true },


  { slug: "average-calculator", name: "Average Calculator", description: "Calculate the arithmetic mean of numbers instantly.", category: "calculator", icon: "🔢", free: true },
  { slug: "meter-to-km-converter", name: "Meter to Kilometer Converter", description: "Convert M to KM instantly.", category: "calculator", icon: "🛣️", free: true },
  { slug: "inch-to-cm-converter", name: "Inch to Centimeter Converter", description: "Convert Inches to CM.", category: "calculator", icon: "📏", free: true },
  //{ slug: "feet-to-meter-converter", name: "Feet to Meter Converter", description: "Convert Feet to Meters.", category: "calculator", icon: "📏", free: true },
  //{ slug: "kg-to-pound-converter", name: "Kilogram to Pound Converter", description: "Convert KG to Lbs.", category: "calculator", icon: "⚖️", free: true },
  //{ slug: "gram-to-ounce-converter", name: "Gram to Ounce Converter", description: "Convert Grams to Ounces.", category: "calculator", icon: "⚖️", free: true },
  //{ slug: "liter-to-ml-converter", name: "Liter to Milliliter Converter", description: "Convert L to ML.", category: "calculator", icon: "🥤", free: true },
  //{ slug: "sqm-to-sqft-converter", name: "Square Meter to Square Foot Converter", description: "Area unit conversion.", category: "calculator", icon: "🏠", free: true },
  //{ slug: "acre-to-hectare-converter", name: "Acre to Hectare Converter", description: "Large area unit conversion.", category: "calculator", icon: "🚜", free: true },
  { slug: "scientific-calculator", name: "Scientific Calculator", description: "Advanced scientific calculator with trig, logs, powers, and memory tools.", category: "calculator", icon: "🔬", free: true },
  { slug: "fraction-calculator", name: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions with automatic simplification.", category: "calculator", icon: "➗", free: true },
  { slug: "exponent-calculator", name: "Exponent Calculator", description: "Calculate powers (x to the y) instantly with support for negative and fractional exponents.", category: "calculator", icon: "🔢", free: true },
  { slug: "square-root-calculator", name: "Square Root Calculator", description: "Calculate the square root of any number instantly with precision control.", category: "math", icon: "√", free: true },


  { slug: "mortgage-calculator", name: "Mortgage Calculator", description: "Calculate monthly home loan payments.", category: "calculator", icon: "🏠", free: true },
  { slug: "simple-interest-calculator", name: "Simple Interest Calculator", description: "Calculate simple interest and total amount based on principal, rate, and time instantly.", category: "calculator", icon: "💰", free: true },
  { slug: "compound-interest-calculator", name: "Compound Interest Calculator", description: "Calculate compound interest and visualize investment growth over time.", category: "calculator", icon: "📈", free: true },
  { slug: "investment-return-calculator", name: "Investment Return (ROI) Calculator", description: "Calculate gain or loss percentage.", category: "calculator", icon: "💹", free: true },
  { slug: "profit-margin-calculator", name: "Profit Margin Calculator", description: "Find gross and net profit margins.", category: "calculator", icon: "💰", free: true },
  { slug: "salary-calculator", name: "Salary Calculator", description: "Convert annual salary to hourly, monthly, weekly.", category: "calculator", icon: "💸", free: true },
  { slug: "gst-vat-calculator", name: "GST / VAT Calculator", description: "Add or remove tax from price.", category: "calculator", icon: "🧾", free: true },
  { slug: "bmr-calculator", name: "BMR Calculator", description: "Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) instantly.", category: "health", icon: "🔥", free: true },
  { slug: "ideal-weight-calculator", name: "Ideal Weight Calculator", description: "Compare ideal body weight using multiple formulas.", category: "calculator", icon: "⚖️", free: true },
  { slug: "body-fat-calculator", name: "Body Fat Calculator", description: "Estimate body fat percentage with US Navy and BMI methods.", category: "calculator", icon: "📏", free: true },
  { slug: "daily-calorie-calculator", name: "Daily Calorie Calculator", description: "Calories needed for maintenance or weight loss.", category: "calculator", icon: "🍎", free: true },


  // Advanced Calculators (Statistics, Chemistry, Electronics, etc.)

  // ── New 50 Tools ── (Writing & Content)
  { slug: "reading-time-calculator", name: "Reading Time Calculator", description: "Paste article text to estimate reading time at multiple WPM speeds. Perfect for bloggers.", category: "writing", icon: "⏱️", free: true },
  { slug: "html-entity-encoder", name: "HTML Entity Encoder / Decoder", description: "Convert HTML special characters like <, >, & to safe entities and back.", category: "writing", icon: "🏷️", free: true },
  { slug: "reading-speed-tester", name: "Reading Speed Tester", description: "Time yourself reading a standard passage and get your WPM score with comprehension level.", category: "productivity", icon: "📖", free: true },

  // ── New 50 Tools ── (Design)
  { slug: "css-flexbox-playground", name: "CSS Flexbox Playground", description: "Visually configure flexbox properties with live preview and copy-ready CSS output.", category: "design", icon: "🎯", free: true },
  { slug: "px-to-rem-converter", name: "PX to REM Converter", description: "Convert pixel values to rem/em units with configurable base font size.", category: "design", icon: "📏", free: true },
  { slug: "css-triangle-generator", name: "CSS Triangle Generator", description: "Create pure CSS triangles for tooltips, arrows, and card decorations with live preview.", category: "design", icon: "🔺", free: true },
  { slug: "placeholder-image-generator", name: "Placeholder Image Generator", description: "Generate SVG/Canvas placeholder images with custom size, color, and text for UI mockups.", category: "design", icon: "🖼️", free: true },
  { slug: "font-pairer", name: "Google Font Pairer", description: "Preview two Google Fonts side by side with custom sample text. Find your perfect font combo.", category: "design", icon: "🔤", free: true },
  { slug: "svg-pattern-generator", name: "SVG Pattern Generator", description: "Generate repeating SVG patterns (dots, lines, cross, grid) for CSS backgrounds with color controls.", category: "design", icon: "🔲", free: true },
  { slug: "css-button-generator", name: "CSS Button Style Generator", description: "Design a button visually with color, border-radius, shadow, and hover effects. Get copy-ready CSS.", category: "design", icon: "🔘", free: true },

  // ── New 50 Tools ── (Developer)
  { slug: "json-formatter", name: "JSON Formatter & Beautifier", description: "Beautify or minify JSON, highlight syntax errors, and explore nested structure with tree view.", category: "developer", icon: "📝", free: true },
  { slug: "mock-data-generator", name: "Mock Data Generator", description: "Generate fake names, emails, phone numbers, addresses, and dates for testing and prototyping.", category: "developer", icon: "🎭", free: true },
  { slug: "cron-expression-generator", name: "Cron Expression Generator", description: "Build cron schedules visually with dropdowns and see human-readable description instantly.", category: "developer", icon: "⏰", free: true },
  { slug: "user-agent-parser", name: "User Agent Parser", description: "Detect and display current browser name, version, OS, device type from the User-Agent string.", category: "developer", icon: "🌐", free: true },
  { slug: "screen-resolution-checker", name: "Screen Resolution Checker", description: "Display current viewport, screen resolution, DPR, and orientation. Useful for responsive debugging.", category: "developer", icon: "📱", free: true },
  { slug: "http-status-code-lookup", name: "HTTP Status Code Lookup", description: "Searchable encyclopedia of all HTTP status codes with descriptions, use cases, and examples.", category: "developer", icon: "🔍", free: true },
  { slug: "base32-encoder", name: "Base32 Encoder / Decoder", description: "Encode and decode text using Base32 — used in 2FA secrets and legacy systems.", category: "developer", icon: "🔐", free: true },
  { slug: "csv-to-json-converter", name: "CSV to JSON Converter", description: "Parse CSV text or files into structured JSON. Preview table, download JSON, copy to clipboard.", category: "developer", icon: "📋", free: true },
  { slug: "git-command-builder", name: "Git Command Builder", description: "Select Git operations from dropdowns and get the exact CLI command with explanation.", category: "developer", icon: "🐙", free: true },
  { slug: "html-boilerplate-generator", name: "HTML Boilerplate Generator", description: "Configure options (charset, meta tags, CSS reset, JS) and download a ready-to-use HTML5 template.", category: "developer", icon: "📄", free: true },
  { slug: "js-keycode-finder", name: "JavaScript KeyCode Finder", description: "Press any key to instantly see event.key, event.code, keyCode, and charCode values.", category: "developer", icon: "⌨️", free: true },
  { slug: "yaml-to-json-converter", name: "YAML to JSON Converter", description: "Paste YAML data and instantly convert it to valid JSON with syntax highlighting and error checking.", category: "developer", icon: "🔄", free: true },
  { slug: "random-id-generator", name: "UUID / CUID Generator", description: "Generate UUIDs (v1, v4), CUIDs, and NanoIDs for testing. Copy single or bulk output.", category: "developer", icon: "🆔", free: true },
  { slug: "sql-query-formatter", name: "SQL Query Formatter", description: "Beautify and format messy SQL queries with syntax highlighting, indentation, and keyword casing.", category: "developer", icon: "🗄️", free: true },

  // ── New 50 Tools ── (Security)
  { slug: "password-entropy-calculator", name: "Password Entropy Calculator", description: "Calculate password strength in mathematical bits of entropy. Shows time to crack and recommendations.", category: "security", icon: "📊", free: true },
  { slug: "url-sanitizer", name: "URL Tracker Remover", description: "Paste any URL to strip UTM parameters, fbclid, gclid, and other tracking tokens automatically.", category: "security", icon: "🧹", free: true },
  { slug: "rot13-cipher", name: "ROT13 Cipher Encoder", description: "Encode and decode text using the classic ROT13 substitution cipher. Also supports Caesar shift.", category: "security", icon: "🔄", free: true },
  { slug: "disposable-note", name: "Disposable Secure Note", description: "Write a note that is automatically wiped when you close the tab. Nothing is saved or sent anywhere.", category: "security", icon: "🗑️", free: true },

  // ── New 50 Tools ── (Creator)
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Create custom scannable QR codes for links, text, WiFi, and contact data.", category: "creator", icon: "📱", free: true },
  //{ slug: "emoji-search-copy", name: "Emoji Search & Copy", description: "Search over 3,000 emojis by name, category, or keyword. Click to copy instantly.", category: "creator", icon: "😀", free: true },
  { slug: "ascii-art-generator", name: "ASCII Art Generator", description: "Convert text or images into ASCII character art. Choose font styles and density.", category: "creator", icon: "🎨", free: true },
  { slug: "drawing-pad", name: "Drawing Pad", description: "Freehand drawing whiteboard with color pickers, brush sizes, eraser, and PNG export.", category: "creator", icon: "✏️", free: true },
  { slug: "social-media-post-preview", name: "Social Media Post Preview", description: "See how your text looks as a Twitter/X post, LinkedIn update, or Instagram caption before publishing.", category: "creator", icon: "📱", free: true },
  { slug: "pixel-art-grid", name: "Pixel Art Creator", description: "Color a 16×16 or 32×32 pixel grid to create retro pixel art. Export as PNG or CSS grid code.", category: "creator", icon: "🎮", free: true },
  { slug: "dice-roller", name: "Dice Roller Simulator", description: "Roll custom dice sets (D4, D6, D8, D12, D20) with animated roll effect and history log.", category: "creator", icon: "🎲", free: true },

  // ── New 50 Tools ── (Productivity)
  { slug: "habit-tracker", name: "Habit Tracker", description: "Track daily habits with streaks and progress visualization using localStorage — no account needed.", category: "productivity", icon: "✅", free: true },
  { slug: "decision-wheel", name: "Decision Wheel Spinner", description: "Add custom options and spin the wheel to randomly pick one. Perfect for decisions or team picks.", category: "productivity", icon: "🎡", free: true },
  { slug: "time-zone-converter", name: "Time Zone Converter", description: "Convert time between world cities instantly. See multiple time zones side by side.", category: "productivity", icon: "🌍", free: true },
  { slug: "daily-checklist", name: "Daily To-Do Checklist", description: "A persistent daily checklist stored in localStorage. Add, check, and reset tasks every day.", category: "productivity", icon: "📝", free: true },
  { slug: "voice-to-text-notepad", name: "Voice-to-Text Notepad", description: "Click a button and speak — transcribe voice to text using the browser's Web Speech API. Download notes.", category: "productivity", icon: "🎤", free: true },
  { slug: "working-days-calculator", name: "Working Days Calculator", description: "Calculate business days between two dates with flexible weekend configurations (1 or 2 days) and optional public holidays.", category: "productivity", icon: "📆", free: true },
  { slug: "meditation-breather", name: "Breathing Exercise Timer", description: "Animated visual guide for box breathing, 4-7-8, and other techniques to reduce stress.", category: "productivity", icon: "🧘", free: true },
  { slug: "simple-budgeter", name: "Simple Budget Planner", description: "Add income and expense entries and see remaining balance, spending chart, and category breakdown.", category: "productivity", icon: "💰", free: true },

  // ── New 50 Tools ── (Visualization)
  { slug: "timeline-creator", name: "Visual Timeline Creator", description: "Add events with dates to build a shareable visual horizontal or vertical timeline. Export as PNG.", category: "visualization", icon: "📅", free: true },

  // ── New 50 Tools ── (Math)
  { slug: "prime-number-checker", name: "Prime Number Checker", description: "Check if any number is prime and find all prime numbers up to N using the Sieve of Eratosthenes.", category: "math", icon: "🔢", free: true },
  { slug: "fibonacci-sequence-generator", name: "Fibonacci Sequence Generator", description: "Generate Fibonacci numbers up to N terms with animated display and golden ratio visualization.", category: "math", icon: "🌀", free: true },

  // ── New 50 Tools ── (Image)
  { slug: "image-metadata-exif-viewer", name: "Image EXIF Metadata Viewer", description: "Upload a JPG to view embedded EXIF data: camera model, GPS coordinates, ISO, shutter speed.", category: "image", icon: "📸", free: true },

  // ── New 50 Tools ── (Multimedia)
  { slug: "text-to-speech-preview", name: "Text-to-Speech Preview", description: "Convert any text to speech using browser voices. Choose language, pitch, rate, and voice.", category: "multimedia", icon: "🔊", free: true },
  { slug: "webcam-photo-booth", name: "Webcam Photo Booth", description: "Apply real-time CSS/canvas filters to live webcam feed and capture photos. Download as PNG.", category: "multimedia", icon: "📹", free: true },
  { slug: "audio-visualizer", name: "Audio Visualizer", description: "Upload an audio file or use your microphone to see a real-time frequency bar chart visualization.", category: "multimedia", icon: "🎵", free: true },
  { slug: "video-frame-extractor", name: "Video Frame Extractor", description: "Load a video file, scrub to any moment, and save the current frame as a PNG image.", category: "multimedia", icon: "🎬", free: true },
];

export const categories: Category[] = [
  { slug: "writing", name: "Writing Tools", description: "Word counters, case converters, readability tools.", icon: "✍️" },
  { slug: "image", name: "Image Tools", description: "Compress, resize, and convert images easily.", icon: "🖼️" },
  { slug: "design", name: "Design Tools", description: "Color pickers, gradients, and design helpers.", icon: "🎨" },
  { slug: "security", name: "Security Tools", description: "Password generators and encryption tools.", icon: "🔒" },
  { slug: "calculator", name: "Calculator Tools", description: "All types of calculators — BMI, loan, GPA, and more.", icon: "🧮" },
  { slug: "math", name: "Math Tools", description: "Advanced math operations and number conversions.", icon: "🔢" },
  { slug: "creator", name: "Creator Tools", description: "QR codes, URL tools, and content helpers.", icon: "🚀" },
  { slug: "developer", name: "Developer Tools", description: "Code formatters, validators, and dev utilities.", icon: "💻" },
  { slug: "visualization", name: "Visualization Tools", description: "Charts, graphs, timelines, and data visualization.", icon: "📊" },
  { slug: "productivity", name: "Productivity Tools", description: "Timers, trackers, and lifestyle utilities.", icon: "⚡" },
  { slug: "health", name: "Health Tools", description: "BMI, BMR, calorie calculators and health utilities.", icon: "🍎" },
  { slug: "multimedia", name: "Multimedia Tools", description: "Audio, video, and browser API utilities.", icon: "🎥" },
];
