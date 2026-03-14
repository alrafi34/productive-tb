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
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, paragraphs.", category: "writing", icon: "📝", free: true },
  { slug: "sentence-case-converter", name: "Sentence Case Converter", description: "Uppercase, lowercase, title case, sentence case.", category: "writing", icon: "🔡", free: true },
  { slug: "paragraph-formatter", name: "Paragraph Formatter", description: "Remove extra spaces, line breaks.", category: "writing", icon: "📝", free: true },
  { slug: "keyword-density-checker", name: "Keyword Density Checker", description: "See how often words appear in text.", category: "writing", icon: "🔍", free: true },
  { slug: "text-reverser", name: "Text Reverser Tool", description: "Reverse letters or words in text.", category: "writing", icon: "🔄", free: true },
  { slug: "text-to-clipboard", name: "Text to Clipboard Copy", description: "Quickly copy text.", category: "writing", icon: "📋", free: true },
  { slug: "word-frequency-counter", name: "Word Frequency Counter", description: "Shows most used words.", category: "writing", icon: "📊", free: true },
  
  // Image & Design Tools (11-18)
  { slug: "image-compressor", name: "Image Compressor", description: "Reduce JPG/PNG size in browser.", category: "image", icon: "🖼️", free: true },
  { slug: "image-resizer", name: "Image Resizer", description: "Set custom width & height.", category: "image", icon: "📐", free: true },
  { slug: "base64-image-encoder", name: "Base64 Image Encoder", description: "Convert images to Base64 string.", category: "image", icon: "🔐", free: true },
  { slug: "hex-to-rgb-converter", name: "HEX to RGB Converter", description: "For designers and devs.", category: "design", icon: "🎨", free: true },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Generate 3-5 color palettes.", category: "design", icon: "🌈", free: true },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Resize image to 16×16 or 32×32 for web.", category: "image", icon: "🌐", free: true },
  
  // Security & Password Tools (19-22)
  { slug: "password-generator", name: "Password Generator", description: "Random, strong passwords.", category: "security", icon: "🔒", free: true },
  { slug: "wifi-password-generator", name: "WiFi Password Generator", description: "Easy & secure for home networks.", category: "security", icon: "📶", free: true },
  { slug: "text-encrypt-decrypt", name: "Text Encrypt/Decrypt", description: "Simple ROT13 or Base64.", category: "security", icon: "🔐", free: true },
  { slug: "username-generator", name: "Username Generator", description: "Random usernames for social media.", category: "security", icon: "👤", free: true },
  
  // Math & Calculator Tools (23-26)
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate price after discount.", category: "calculator", icon: "💰", free: true },
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Find percentage, increase, decrease.", category: "calculator", icon: "🔢", free: true },
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate age in years, months, days.", category: "calculator", icon: "🎂", free: true },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Body mass index.", category: "calculator", icon: "⚖️", free: true },
  
  // URL & QR Tools (27-30)
  
  // Text & Writing Utilities (New)
  { slug: "lorem-ipsum-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder text for designers.", category: "writing", icon: "📄", free: true },
  { slug: "markdown-previewer", name: "Markdown Previewer", description: "Convert Markdown to styled HTML in real-time.", category: "writing", icon: "📋", free: true },
  { slug: "remove-duplicate-lines", name: "Remove Duplicate Lines", description: "Clean up lists by removing identical entries.", category: "writing", icon: "🧹", free: true },
  { slug: "find-and-replace", name: "Find and Replace", description: "Swap specific words across large text blocks.", category: "writing", icon: "🔍", free: true },
  { slug: "text-diff-checker", name: "Text Diff Checker", description: "Compare two text blocks and highlight differences.", category: "writing", icon: "🔀", free: true },
  { slug: "bionic-reading-converter", name: "Bionic Reading Converter", description: "Bold first letters of words for fast reading.", category: "writing", icon: "👁️", free: true },
  { slug: "whitespace-remover", name: "White Space Remover", description: "Strip leading, trailing, or double spaces.", category: "writing", icon: "🧽", free: true },
  
  // Developer & Coding Helpers (New)
  { slug: "json-validator", name: "JSON Validator", description: "Check JSON for syntax errors.", category: "developer", icon: "✅", free: true },
  { slug: "base64-encoder-decoder", name: "Base64 Encoder/Decoder", description: "Convert text to/from Base64 strings.", category: "developer", icon: "🔐", free: true },
  { slug: "url-encoder-decoder", name: "URL Encoder/Decoder", description: "Convert special characters in URLs to %xx format.", category: "developer", icon: "🔗", free: true },
  { slug: "jwt-debugger", name: "JWT Debugger", description: "Decode and inspect JSON Web Tokens instantly.", category: "developer", icon: "🔐", free: true },
  
  // Design & CSS Tools (New)
  { slug: "css-gradient-generator", name: "CSS Gradient Generator", description: "Visual slider to create linear-gradient code.", category: "design", icon: "🌈", free: true },
  { slug: "css-box-shadow-generator", name: "CSS Box Shadow Generator", description: "Adjust blur, spread, color with sliders.", category: "design", icon: "📦", free: true },
  { slug: "color-format-converter", name: "Color Format Converter", description: "Convert Hex, RGB, HSL, CMYK formats.", category: "design", icon: "🎨", free: true },
  { slug: "css-glassmorphism-generator", name: "CSS Glassmorphism Generator", description: "Generate frosted glass effect code.", category: "design", icon: "🪟", free: true },
  { slug: "svg-path-visualizer", name: "SVG Path Visualizer", description: "Paste SVG path and see shape rendered.", category: "design", icon: "🖌️", free: true },
  { slug: "aspect-ratio-calculator", name: "Aspect Ratio Calculator", description: "Calculate dimensions based on aspect ratio.", category: "calculator", icon: "📐", free: true },
  { slug: "contrast-checker", name: "Contrast Checker", description: "Check WCAG accessibility standards.", category: "design", icon: "♿", free: true },
  
  // Math & Data Converters (New)
  { slug: "timestamp-unix-converter", name: "Timestamp/Unix Converter", description: "Convert Unix Epoch to human-readable dates.", category: "calculator", icon: "🕐", free: true },
  { slug: "binary-hex-decimal-converter", name: "Binary/Hex/Decimal Converter", description: "Switch numbers between different bases.", category: "math", icon: "🔢", free: true },
  { slug: "loan-emi-calculator", name: "Loan/EMI Calculator", description: "Calculate monthly payments with interest.", category: "calculator", icon: "💳", free: true },
  { slug: "random-number-generator", name: "Random Number Generator", description: "Generate random value within range.", category: "math", icon: "🎲", free: true },
  { slug: "currency-format-previewer", name: "Currency Format Previewer", description: "Show numbers in different global currencies.", category: "calculator", icon: "💱", free: true },
  
  // File & Image Micro-tools (New)
  { slug: "image-to-grayscale", name: "Image to Grayscale", description: "Apply grayscale filter to images.", category: "image", icon: "⚫", free: true },
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256 hashes.", category: "security", icon: "#️⃣", free: true },
  { slug: "table-to-markdown", name: "Table to Markdown", description: "Convert spreadsheet tables to Markdown.", category: "writing", icon: "📊", free: true },
  
  // Advanced Text & Writing (New)
  { slug: "anagram-finder", name: "Anagram Finder", description: "Check if two strings contain same letters.", category: "writing", icon: "🔤", free: true },
  { slug: "palindrome-checker", name: "Palindrome Checker", description: "Validate if word reads same backward.", category: "writing", icon: "🔄", free: true },
  { slug: "text-to-slug-converter", name: "Text-to-Slug Converter", description: "Turn text into URL-friendly slugs.", category: "writing", icon: "🔗", free: true },
  { slug: "morse-code-translator", name: "Morse Code Translator", description: "Convert text to dots/dashes and back.", category: "writing", icon: "📡", free: true },
  { slug: "upside-down-text-generator", name: "Upside-Down Text Generator", description: "Flip text using Unicode characters.", category: "writing", icon: "🙃", free: true },
  { slug: "zalgo-text-generator", name: "Zalgo Text Generator", description: "Add glitch decorations to text.", category: "writing", icon: "👾", free: true },
  { slug: "nato-phonetic-converter", name: "NATO Phonetic Alphabet Converter", description: "Convert text to NATO phonetic alphabet.", category: "writing", icon: "📻", free: true },
  { slug: "random-name-picker", name: "Random Name Picker", description: "Randomly select winner from a list.", category: "writing", icon: "🎰", free: true },
  
  // Developer & System Tools (New)
  
  // Design & Visuals (New)
  { slug: "golden-ratio-calculator", name: "Golden Ratio Calculator", description: "Split number into 1.618 golden ratio parts.", category: "calculator", icon: "✨", free: true },
  { slug: "css-filter-tester", name: "CSS Filter Tester", description: "Sliders for grayscale, sepia, invert, blur.", category: "design", icon: "🎨", free: true },
  { slug: "hsl-color-slider", name: "HSL Color Slider", description: "Visual way to understand Hue, Saturation, Lightness.", category: "design", icon: "🌈", free: true },
  { slug: "neumorphism-generator", name: "Box Shadow Neumorphism Generator", description: "Create soft 3D UI effect.", category: "design", icon: "💎", free: true },
  { slug: "css-animation-previewer", name: "CSS Animation Previewer", description: "Test ease-in, ease-out, cubic-bezier curves.", category: "design", icon: "🎬", free: true },
  
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
  { slug: "color-palette-contrast-grid", name: "Color Palette Contrast Grid", description: "Show readable text/background combinations.", category: "design", icon: "🔲", free: true },
  
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
  { slug: "feet-to-meter-converter", name: "Feet to Meter Converter", description: "Convert Feet to Meters.", category: "calculator", icon: "📏", free: true },
  { slug: "kg-to-pound-converter", name: "Kilogram to Pound Converter", description: "Convert KG to Lbs.", category: "calculator", icon: "⚖️", free: true },
  { slug: "gram-to-ounce-converter", name: "Gram to Ounce Converter", description: "Convert Grams to Ounces.", category: "calculator", icon: "⚖️", free: true },
  { slug: "liter-to-ml-converter", name: "Liter to Milliliter Converter", description: "Convert L to ML.", category: "calculator", icon: "🥤", free: true },
  { slug: "sqm-to-sqft-converter", name: "Square Meter to Square Foot Converter", description: "Area unit conversion.", category: "calculator", icon: "🏠", free: true },
  { slug: "acre-to-hectare-converter", name: "Acre to Hectare Converter", description: "Large area unit conversion.", category: "calculator", icon: "🚜", free: true },
  { slug: "scientific-calculator", name: "Scientific Calculator", description: "Advanced calculator with trigonometry, logarithms, powers, and mathematical functions.", category: "calculator", icon: "🔬", free: true },
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
  { slug: "ideal-weight-calculator", name: "Ideal Weight Calculator", description: "Check healthy weight for your height.", category: "calculator", icon: "⚖️", free: true },
  { slug: "body-fat-calculator", name: "Body Fat Calculator", description: "Estimate body fat percentage using US Navy or BMI methods with instant results.", category: "calculator", icon: "📏", free: true },
  { slug: "daily-calorie-calculator", name: "Daily Calorie Calculator", description: "Calories needed for maintenance or weight loss.", category: "calculator", icon: "🍎", free: true },


  // Advanced Calculators (Statistics, Chemistry, Electronics, etc.)
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
