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
  { slug: "character-counter", name: "Character Counter", description: "Count letters, spaces, symbols.", category: "writing", icon: "🔤", free: true },
  { slug: "reading-time-calculator", name: "Reading Time Calculator", description: "Estimate reading time for any text.", category: "writing", icon: "⏱️", free: true },
  { slug: "sentence-case-converter", name: "Sentence Case Converter", description: "Uppercase, lowercase, title case, sentence case.", category: "writing", icon: "🔡", free: true },
  { slug: "paragraph-formatter", name: "Paragraph Formatter", description: "Remove extra spaces, line breaks.", category: "writing", icon: "📝", free: true },
  { slug: "keyword-density-checker", name: "Keyword Density Checker", description: "See how often words appear in text.", category: "writing", icon: "🔍", free: true },
  { slug: "text-reverser", name: "Text Reverser Tool", description: "Reverse letters or words in text.", category: "writing", icon: "🔄", free: true },
  { slug: "text-to-clipboard", name: "Text to Clipboard Copy", description: "Quickly copy text.", category: "writing", icon: "📋", free: true },
  { slug: "plagiarism-checker", name: "Plagiarism Checker", description: "Basic similarity check using API.", category: "writing", icon: "✅", free: true },
  { slug: "word-frequency-counter", name: "Word Frequency Counter", description: "Shows most used words.", category: "writing", icon: "📊", free: true },
  
  // Image & Design Tools (11-18)
  { slug: "image-compressor", name: "Image Compressor", description: "Reduce JPG/PNG size in browser.", category: "image", icon: "🖼️", free: true },
  { slug: "image-resizer", name: "Image Resizer", description: "Set custom width & height.", category: "image", icon: "📐", free: true },
  { slug: "base64-image-encoder", name: "Base64 Image Encoder", description: "Convert images to Base64 string.", category: "image", icon: "🔐", free: true },
  { slug: "hex-to-rgb-converter", name: "HEX to RGB Converter", description: "For designers and devs.", category: "design", icon: "🎨", free: true },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Generate 3-5 color palettes.", category: "design", icon: "🌈", free: true },
  { slug: "gradient-generator", name: "Gradient Generator", description: "Create CSS gradients.", category: "design", icon: "🎨", free: true },
  { slug: "image-dimension-checker", name: "Image Dimension Checker", description: "Read width & height of an image.", category: "image", icon: "📏", free: true },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Resize image to 16×16 or 32×32 for web.", category: "image", icon: "🌐", free: true },
  
  // Security & Password Tools (19-22)
  { slug: "password-generator", name: "Password Generator", description: "Random, strong passwords.", category: "security", icon: "🔒", free: true },
  { slug: "wifi-password-generator", name: "WiFi Password Generator", description: "Easy & secure for home networks.", category: "security", icon: "📶", free: true },
  { slug: "text-encrypt-decrypt", name: "Text Encrypt/Decrypt", description: "Simple ROT13 or Base64.", category: "security", icon: "🔐", free: true },
  { slug: "username-generator", name: "Username Generator", description: "Random usernames for social media.", category: "security", icon: "👤", free: true },
  
  // Math & Calculator Tools (23-26)
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate price after discount.", category: "math", icon: "💰", free: true },
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Find percentage, increase, decrease.", category: "math", icon: "🔢", free: true },
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate age in years, months, days.", category: "math", icon: "🎂", free: true },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Body mass index.", category: "math", icon: "⚖️", free: true },
  
  // URL & QR Tools (27-30)
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Create QR for URL or text.", category: "creator", icon: "📱", free: true },
  { slug: "url-shortener", name: "URL Shortener", description: "Generate a short URL using free API.", category: "creator", icon: "🔗", free: true },
  { slug: "youtube-duration-converter", name: "YouTube Duration Converter", description: "Convert HH:MM:SS to seconds.", category: "creator", icon: "⏲️", free: true },
  { slug: "json-formatter", name: "JSON Formatter", description: "Beautify or minify JSON data.", category: "creator", icon: "📝", free: true },
  
  // Text & Writing Utilities (New)
  { slug: "lorem-ipsum-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder text for designers.", category: "writing", icon: "📄", free: true },
  { slug: "markdown-previewer", name: "Markdown Previewer", description: "Convert Markdown to styled HTML in real-time.", category: "writing", icon: "📋", free: true },
  { slug: "remove-duplicate-lines", name: "Remove Duplicate Lines", description: "Clean up lists by removing identical entries.", category: "writing", icon: "🧹", free: true },
  { slug: "find-and-replace", name: "Find and Replace", description: "Swap specific words across large text blocks.", category: "writing", icon: "🔍", free: true },
  { slug: "text-diff-checker", name: "Text Diff Checker", description: "Compare two text blocks and highlight differences.", category: "writing", icon: "🔀", free: true },
  { slug: "list-alphabetizer", name: "List Alphabetizer", description: "Sort any list from A-Z or Z-A.", category: "writing", icon: "🔤", free: true },
  { slug: "bionic-reading-converter", name: "Bionic Reading Converter", description: "Bold first letters of words for fast reading.", category: "writing", icon: "👁️", free: true },
  { slug: "whitespace-remover", name: "White Space Remover", description: "Strip leading, trailing, or double spaces.", category: "writing", icon: "🧽", free: true },
  
  // Developer & Coding Helpers (New)
  { slug: "json-validator", name: "JSON Validator", description: "Check JSON for syntax errors.", category: "developer", icon: "✅", free: true },
  { slug: "base64-encoder-decoder", name: "Base64 Encoder/Decoder", description: "Convert text to/from Base64 strings.", category: "developer", icon: "🔐", free: true },
  { slug: "url-encoder-decoder", name: "URL Encoder/Decoder", description: "Convert special characters in URLs to %xx format.", category: "developer", icon: "🔗", free: true },
  { slug: "html-entity-encoder", name: "HTML Entity Encoder", description: "Convert symbols like < into &lt;.", category: "developer", icon: "🏷️", free: true },
  { slug: "js-console-mockup", name: "JavaScript Console Mockup", description: "Safe UI playground to test small JS snippets.", category: "developer", icon: "💻", free: true },
  { slug: "cron-expression-descriptor", name: "Cron Expression Descriptor", description: "Translate cron expressions into readable text.", category: "developer", icon: "⏰", free: true },
  { slug: "jwt-debugger", name: "JWT Debugger", description: "Decode JWT header and payload locally.", category: "developer", icon: "🔓", free: true },
  { slug: "regex-tester", name: "RegEx Tester", description: "Visual way to test Regular Expressions.", category: "developer", icon: "🔎", free: true },
  { slug: "code-snippet-image-generator", name: "Code Snippet Image Generator", description: "Turn code into beautiful shareable screenshots.", category: "developer", icon: "📸", free: true },
  { slug: "sql-formatter", name: "SQL Formatter", description: "Format messy SQL queries for readability.", category: "developer", icon: "🗄️", free: true },
  
  // Design & CSS Tools (New)
  { slug: "css-gradient-generator", name: "CSS Gradient Generator", description: "Visual slider to create linear-gradient code.", category: "design", icon: "🌈", free: true },
  { slug: "box-shadow-generator", name: "Box Shadow Generator", description: "Adjust blur, spread, color with sliders.", category: "design", icon: "📦", free: true },
  { slug: "color-format-converter", name: "Color Format Converter", description: "Convert Hex, RGB, HSL, CMYK formats.", category: "design", icon: "🎨", free: true },
  { slug: "css-glassmorphism-generator", name: "CSS Glassmorphism Generator", description: "Generate frosted glass effect code.", category: "design", icon: "🪟", free: true },
  { slug: "svg-path-visualizer", name: "SVG Path Visualizer", description: "Paste SVG path and see shape rendered.", category: "design", icon: "🖌️", free: true },
  { slug: "aspect-ratio-calculator", name: "Aspect Ratio Calculator", description: "Calculate dimensions based on aspect ratio.", category: "design", icon: "📐", free: true },
  { slug: "px-to-rem-converter", name: "PX to REM Converter", description: "Convert pixels to accessible rem units.", category: "design", icon: "📏", free: true },
  { slug: "css-flexbox-grid-playground", name: "CSS Flexbox/Grid Playground", description: "Visual tool for flexbox and grid properties.", category: "design", icon: "🎯", free: true },
  { slug: "contrast-checker", name: "Contrast Checker", description: "Check WCAG accessibility standards.", category: "design", icon: "♿", free: true },
  
  // Math & Data Converters (New)
  { slug: "unit-converter", name: "Unit Converter", description: "Convert metric and imperial units.", category: "math", icon: "📊", free: true },
  { slug: "timestamp-unix-converter", name: "Timestamp/Unix Converter", description: "Convert Unix Epoch to human-readable dates.", category: "math", icon: "🕐", free: true },
  { slug: "binary-hex-decimal-converter", name: "Binary/Hex/Decimal Converter", description: "Switch numbers between different bases.", category: "math", icon: "🔢", free: true },
  { slug: "loan-emi-calculator", name: "Loan/EMI Calculator", description: "Calculate monthly payments with interest.", category: "math", icon: "💳", free: true },
  { slug: "random-number-generator", name: "Random Number Generator", description: "Generate random value within range.", category: "math", icon: "🎲", free: true },
  { slug: "currency-format-previewer", name: "Currency Format Previewer", description: "Show numbers in different global currencies.", category: "math", icon: "💱", free: true },
  { slug: "stopwatch-countdown-timer", name: "Stopwatch/Countdown Timer", description: "High-precision timer tool.", category: "math", icon: "⏱️", free: true },
  
  // File & Image Micro-tools (New)
  { slug: "image-to-grayscale", name: "Image to Grayscale", description: "Apply grayscale filter to images.", category: "image", icon: "⚫", free: true },
  { slug: "exif-data-remover", name: "EXIF Data Remover", description: "Strip metadata from images before sharing.", category: "image", icon: "🔒", free: true },
  { slug: "barcode-generator", name: "Barcode Generator", description: "Generate standard UPC or EAN barcodes.", category: "creator", icon: "📊", free: true },
  { slug: "svg-to-data-uri", name: "SVG to Data URI", description: "Convert SVG code to CSS data URI string.", category: "developer", icon: "🔗", free: true },
  { slug: "pdf-page-counter", name: "PDF Page Counter", description: "Read local PDF file and return page count.", category: "creator", icon: "📄", free: true },
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256 hashes.", category: "security", icon: "#️⃣", free: true },
  { slug: "table-to-markdown", name: "Table to Markdown", description: "Convert spreadsheet tables to Markdown.", category: "writing", icon: "📊", free: true },
  { slug: "csv-to-json-converter", name: "CSV to JSON Converter", description: "Parse CSV files into structured JSON.", category: "developer", icon: "📋", free: true },
  
  // Advanced Text & Writing (New)
  { slug: "anagram-finder", name: "Anagram Finder", description: "Check if two strings contain same letters.", category: "writing", icon: "🔤", free: true },
  { slug: "palindrome-checker", name: "Palindrome Checker", description: "Validate if word reads same backward.", category: "writing", icon: "🔄", free: true },
  { slug: "text-to-slug-converter", name: "Text-to-Slug Converter", description: "Turn text into URL-friendly slugs.", category: "writing", icon: "🔗", free: true },
  { slug: "morse-code-translator", name: "Morse Code Translator", description: "Convert text to dots/dashes and back.", category: "writing", icon: "📡", free: true },
  { slug: "upside-down-text-generator", name: "Upside-Down Text Generator", description: "Flip text using Unicode characters.", category: "writing", icon: "🙃", free: true },
  { slug: "zalgo-text-generator", name: "Zalgo Text Generator", description: "Add glitch decorations to text.", category: "writing", icon: "👾", free: true },
  { slug: "nato-phonetic-converter", name: "NATO Phonetic Alphabet Converter", description: "Convert text to NATO phonetic alphabet.", category: "writing", icon: "📻", free: true },
  { slug: "random-name-picker", name: "Random Name Picker", description: "Randomly select winner from a list.", category: "writing", icon: "🎰", free: true },
  { slug: "sentence-shuffler", name: "Sentence Shuffler", description: "Randomize order of sentences in paragraph.", category: "writing", icon: "🔀", free: true },
  
  // Developer & System Tools (New)
  { slug: "user-agent-parser", name: "User Agent Parser", description: "Display current browser and OS info.", category: "developer", icon: "🌐", free: true },
  { slug: "screen-resolution-checker", name: "Screen Resolution Checker", description: "Show current viewport and screen size.", category: "developer", icon: "📱", free: true },
  { slug: "http-status-code-lookup", name: "HTTP Status Code Lookup", description: "Searchable list of HTTP status codes.", category: "developer", icon: "🔍", free: true },
  { slug: "mime-type-lookup", name: "MIME Type Lookup", description: "Find correct file extension for media type.", category: "developer", icon: "📎", free: true },
  { slug: "html-boilerplate-generator", name: "HTML Boilerplate Generator", description: "Create basic index.html file instantly.", category: "developer", icon: "📄", free: true },
  { slug: "css-selector-tester", name: "CSS Selector Tester", description: "Test selectors and see highlighted elements.", category: "developer", icon: "🎯", free: true },
  { slug: "js-keycode-finder", name: "JavaScript KeyCode Finder", description: "Press key to see numeric code and event.key.", category: "developer", icon: "⌨️", free: true },
  { slug: "yaml-to-json-converter", name: "YAML to JSON Converter", description: "Convert YAML data structures into JSON.", category: "developer", icon: "🔄", free: true },
  { slug: "xml-formatter", name: "XML Formatter", description: "Beautify messy XML or RSS feeds.", category: "developer", icon: "📰", free: true },
  { slug: "docker-run-to-compose", name: "Docker Run to Compose", description: "Convert docker run command into YAML file.", category: "developer", icon: "🐳", free: true },
  
  // Design & Visuals (New)
  { slug: "css-triangle-generator", name: "CSS Triangle Generator", description: "Create CSS-only triangles using borders.", category: "design", icon: "🔺", free: true },
  { slug: "placeholder-image-generator", name: "Placeholder Image Generator", description: "Create SVG with custom dimensions and text.", category: "design", icon: "🖼️", free: true },
  { slug: "golden-ratio-calculator", name: "Golden Ratio Calculator", description: "Split number into 1.618 golden ratio parts.", category: "design", icon: "✨", free: true },
  { slug: "css-filter-tester", name: "CSS Filter Tester", description: "Sliders for grayscale, sepia, invert, blur.", category: "design", icon: "🎨", free: true },
  { slug: "hsl-color-slider", name: "HSL Color Slider", description: "Visual way to understand Hue, Saturation, Lightness.", category: "design", icon: "🌈", free: true },
  { slug: "neumorphism-generator", name: "Box Shadow Neumorphism Generator", description: "Create soft 3D UI effect.", category: "design", icon: "💎", free: true },
  { slug: "font-pairer", name: "Font Pairer", description: "Test two Google Fonts side-by-side.", category: "design", icon: "🔤", free: true },
  { slug: "css-animation-previewer", name: "CSS Animation Previewer", description: "Test ease-in, ease-out, cubic-bezier curves.", category: "design", icon: "🎬", free: true },
  { slug: "svg-pattern-generator", name: "SVG Pattern Generator", description: "Create repeating background patterns.", category: "design", icon: "🔲", free: true },
  { slug: "tailwind-class-builder", name: "Tailwind Class Builder", description: "Toggle styles and see Tailwind classes.", category: "design", icon: "💨", free: true },
  
  // Math, Finance & Logic (New)
  { slug: "percentage-increase-decrease", name: "Percentage Increase/Decrease", description: "Calculate % change between two numbers.", category: "math", icon: "📈", free: true },
  { slug: "tip-calculator", name: "Tip Calculator", description: "Split bill and calculate tip percentage.", category: "math", icon: "💵", free: true },
  { slug: "seconds-to-time-converter", name: "Seconds to HH:MM:SS", description: "Convert large numbers into readable time.", category: "math", icon: "⏲️", free: true },
  { slug: "prime-number-checker", name: "Prime Number Checker", description: "Instantly check if number is prime.", category: "math", icon: "🔢", free: true },
  { slug: "fibonacci-sequence-generator", name: "Fibonacci Sequence Generator", description: "List sequence up to N numbers.", category: "math", icon: "🌀", free: true },
  { slug: "standard-deviation-calculator", name: "Standard Deviation Calculator", description: "Calculate spread of list of numbers.", category: "math", icon: "📊", free: true },
  { slug: "roman-numeral-converter", name: "Roman Numeral Converter", description: "Switch between numbers and Roman numerals.", category: "math", icon: "🏛️", free: true },
  { slug: "fuel-cost-calculator", name: "Fuel Cost Calculator", description: "Calculate trip cost based on distance and MPG.", category: "math", icon: "⛽", free: true },
  { slug: "dice-roller", name: "Probability/Dice Roller", description: "Simulate rolling N number of dice.", category: "math", icon: "🎲", free: true },
  
  // Privacy & Security (New)
  { slug: "password-strength-meter", name: "Password Strength Meter", description: "Score password based on entropy and length.", category: "security", icon: "🔐", free: true },
  { slug: "text-encryptor-aes", name: "Text Encryptor (AES)", description: "Encrypt text with password using Web Crypto API.", category: "security", icon: "🔒", free: true },
  { slug: "credit-card-validator", name: "Credit Card Validator", description: "Use Luhn Algorithm to check CC number validity.", category: "security", icon: "💳", free: true },
  { slug: "email-obfuscator", name: "Email Obfuscator", description: "Convert emails to character codes.", category: "security", icon: "📧", free: true },
  { slug: "secret-note-generator", name: "Secret Note Generator", description: "Generate link with URL fragments for notes.", category: "security", icon: "🔐", free: true },
  { slug: "leetspeak-converter", name: "Leetspeak (1337) Converter", description: "Turn text into 1337 speak.", category: "writing", icon: "🤖", free: true },
  { slug: "file-hash-generator", name: "Simple File Hash", description: "Get SHA-256 fingerprint without uploading.", category: "security", icon: "🔑", free: true },
  { slug: "mock-data-generator", name: "Mock Data Generator", description: "Generate fake names, emails, dates for testing.", category: "developer", icon: "🎭", free: true },
  { slug: "stopwatch-with-laps", name: "Stopwatch with Laps", description: "Sports-style timer with lap-recording list.", category: "math", icon: "⏱️", free: true },
  
  // Visualization & Data (New)
  { slug: "pie-chart-maker", name: "Pie Chart Maker", description: "Render dynamic SVG/Canvas pie charts.", category: "visualization", icon: "📊", free: true },
  { slug: "bar-graph-generator", name: "Bar Graph Generator", description: "Simple table-to-chart tool for reports.", category: "visualization", icon: "📊", free: true },
  { slug: "timeline-creator", name: "Timeline Creator", description: "Visual vertical/horizontal timeline from dates.", category: "visualization", icon: "📅", free: true },
  { slug: "mind-map-builder", name: "Mind Map Builder", description: "Drag-and-drop canvas to connect ideas.", category: "visualization", icon: "🧠", free: true },
  { slug: "word-cloud-generator", name: "Word Cloud Generator", description: "Visual cloud of most used words.", category: "visualization", icon: "☁️", free: true },
  { slug: "heatmap-grid", name: "Heatmap Grid", description: "Visualize density by clicking grid cells.", category: "visualization", icon: "🔥", free: true },
  { slug: "venn-diagram-maker", name: "Venn Diagram Maker", description: "2 or 3-circle overlapping diagram tool.", category: "visualization", icon: "⭕", free: true },
  { slug: "flowchart-logic-mapper", name: "Flowchart Logic Mapper", description: "Connect boxes/arrows to map processes.", category: "visualization", icon: "🔀", free: true },
  { slug: "json-to-csv", name: "JSON to CSV", description: "Flatten JSON objects into spreadsheet file.", category: "developer", icon: "📋", free: true },
  { slug: "xml-to-json", name: "XML to JSON", description: "Translate XML data into modern JSON format.", category: "developer", icon: "🔄", free: true },
  
  // Productivity & Lifestyle (New)
  { slug: "pomodoro-timer", name: "Pomodoro Timer", description: "25/5 minute focus timer with notifications.", category: "productivity", icon: "🍅", free: true },
  { slug: "habit-tracker", name: "Habit Tracker (Local)", description: "Check off daily habits using localStorage.", category: "productivity", icon: "✅", free: true },
  { slug: "simple-budgeter", name: "Simple Budgeter", description: "Add income/expenses to see remaining balance.", category: "productivity", icon: "💰", free: true },
  { slug: "decision-wheel", name: "Decision Wheel", description: "Spin custom wheel to choose options.", category: "productivity", icon: "🎡", free: true },
  { slug: "daily-checklist", name: "Daily Checklist", description: "Persistent To-Do list in browser.", category: "productivity", icon: "📝", free: true },
  { slug: "meditation-breather", name: "Meditation Breather", description: "Visual circle to guide deep breathing.", category: "productivity", icon: "🧘", free: true },
  { slug: "time-zone-converter", name: "Time Zone Converter", description: "See time difference between two cities.", category: "productivity", icon: "🌍", free: true },
  { slug: "working-days-calculator", name: "Working Days Calculator", description: "Subtract weekends/holidays between dates.", category: "productivity", icon: "📆", free: true },
  { slug: "reading-speed-tester", name: "Reading Speed Tester", description: "Time reading speed and get WPM.", category: "productivity", icon: "📖", free: true },
  { slug: "morse-code-audio-player", name: "Morse Code Audio Player", description: "Play text as Morse code beeps.", category: "creator", icon: "🔊", free: true },
  
  // Privacy & Cryptography (New)
  { slug: "url-sanitizer", name: "URL Sanitizer", description: "Strip tracking parameters from links.", category: "security", icon: "🧹", free: true },
  { slug: "random-id-generator", name: "Strong Random ID Generator", description: "Generate UUIDs or CUIDs for testing.", category: "developer", icon: "🆔", free: true },
  { slug: "xss-payload-tester", name: "XSS Payload Tester", description: "Safe environment to see escaped HTML.", category: "security", icon: "🛡️", free: true },
  { slug: "bcrypt-hash-verifier", name: "Bcrypt Hash Verifier", description: "Check if text matches Bcrypt hash.", category: "security", icon: "🔐", free: true },
  { slug: "steganography-tool", name: "Steganography Tool", description: "Hide text message inside image pixels.", category: "security", icon: "🖼️", free: true },
  { slug: "disposable-note", name: "Disposable Note", description: "Write & Destroy UI that clears on tab close.", category: "security", icon: "🗑️", free: true },
  { slug: "browser-fingerprint-viewer", name: "Browser Fingerprint Viewer", description: "Show what info browser reveals.", category: "security", icon: "🔍", free: true },
  { slug: "base32-encoder", name: "Base32 Encoder", description: "Binary-to-text encoding for legacy needs.", category: "developer", icon: "🔐", free: true },
  { slug: "rot13-cipher", name: "Rot13 Cipher", description: "Classic letter rotation encryption tool.", category: "security", icon: "🔄", free: true },
  { slug: "password-entropy-calculator", name: "Password Entropy Calculator", description: "Show mathematical bits of security.", category: "security", icon: "📊", free: true },
  
  // Creative & Fun UI (New)
  { slug: "ascii-art-generator", name: "ASCII Art Generator", description: "Convert image into characters.", category: "creator", icon: "🎨", free: true },
  { slug: "css-border-radius-blob", name: "CSS Border-Radius Blob Maker", description: "Create organic, non-round shapes.", category: "design", icon: "🫧", free: true },
  { slug: "drawing-pad", name: "Drawing Pad", description: "Simple whiteboard to draw and save as PNG.", category: "creator", icon: "✏️", free: true },
  { slug: "pixel-art-grid", name: "Pixel Art Grid", description: "16x16 or 32x32 grid to color cells.", category: "creator", icon: "🎮", free: true },
  { slug: "gradient-text-generator", name: "Gradient Text Generator", description: "Generate background-clip: text CSS code.", category: "design", icon: "🌈", free: true },
  { slug: "soundboard-maker", name: "Soundboard Maker", description: "Upload MP3s and map to keys.", category: "creator", icon: "🎹", free: true },
  { slug: "css-button-library", name: "CSS Button Library", description: "Gallery of copy-paste button styles.", category: "design", icon: "🔘", free: true },
  { slug: "screen-recorder", name: "Screen Recorder", description: "Record screen and download .webm.", category: "creator", icon: "🎥", free: true },
  { slug: "emoji-search-copy", name: "Emoji Search & Copy", description: "Fast-filter UI to find emoji by name.", category: "creator", icon: "😀", free: true },
  { slug: "background-noise-mixer", name: "Background Noise Mixer", description: "Toggle Rain, Cafe, White Noise sounds.", category: "productivity", icon: "🎧", free: true },
  
  // Misc & Utility (New)
  { slug: "html-table-generator", name: "HTML Table Generator", description: "Enter rows/cols to get table code.", category: "developer", icon: "📊", free: true },
  { slug: "list-prefix-suffix", name: "List Item Prefix/Suffix", description: "Add character to every line of list.", category: "writing", icon: "📝", free: true },
  { slug: "social-media-post-preview", name: "Social Media Post Preview", description: "See text as Tweet or LinkedIn Post.", category: "creator", icon: "📱", free: true },
  { slug: "character-map-browser", name: "Character Map Browser", description: "Display all Unicode characters.", category: "writing", icon: "🔤", free: true },
  { slug: "barcode-scanner-camera", name: "Barcode Scanner (Camera)", description: "Use camera to decode barcodes.", category: "creator", icon: "📷", free: true },
  { slug: "unit-ratio-calculator", name: "Unit Ratio Calculator", description: "Simplify fractions like 100:50 to 2:1.", category: "math", icon: "➗", free: true },
  { slug: "color-palette-extractor", name: "Color Palette Extractor", description: "Upload image to get 5 dominant colors.", category: "design", icon: "🎨", free: true },
  { slug: "binary-visualizer", name: "Binary Visualizer", description: "See 0s and 1s represented by lights.", category: "developer", icon: "💡", free: true },
  { slug: "csv-column-picker", name: "CSV Column Picker", description: "Upload CSV and select columns to keep.", category: "developer", icon: "📋", free: true },
  { slug: "markdown-to-html-table", name: "Markdown-to-HTML Table", description: "Convert Markdown pipe tables to HTML.", category: "developer", icon: "📊", free: true },
  
  // Multimedia & Browser APIs (New)
  { slug: "video-to-gif-converter", name: "Video-to-GIF Converter", description: "Turn small clips into GIFs client-side.", category: "multimedia", icon: "🎬", free: true },
  { slug: "audio-visualizer", name: "Audio Visualizer", description: "Real-time frequency bar chart using Web Audio API.", category: "multimedia", icon: "🎵", free: true },
  { slug: "screen-recorder-webm", name: "Screen Recorder to WebM", description: "Capture screen using MediaRecorder.", category: "multimedia", icon: "🎥", free: true },
  { slug: "image-metadata-exif-viewer", name: "Image Metadata (EXIF) Viewer", description: "Display camera model, GPS, ISO from JPG.", category: "multimedia", icon: "📸", free: true },
  { slug: "voice-to-text-notepad", name: "Voice-to-Text Notepad", description: "Transcribe voice using Web Speech API.", category: "multimedia", icon: "🎤", free: true },
  { slug: "text-to-speech-preview", name: "Text-to-Speech Preview", description: "Test browser voices and pitches.", category: "multimedia", icon: "🔊", free: true },
  { slug: "svg-optimizer", name: "SVG Optimizer", description: "Clean up messy SVG code.", category: "multimedia", icon: "✂️", free: true },
  { slug: "color-palette-contrast-grid", name: "Color Palette Contrast Grid", description: "Show readable text/background combinations.", category: "design", icon: "🔲", free: true },
  { slug: "webcam-filter-tester", name: "Webcam Filter Tester", description: "Apply CSS filters to live camera feed.", category: "multimedia", icon: "📹", free: true },
  { slug: "video-frame-extractor", name: "Video Frame Extractor", description: "Save current video frame as PNG.", category: "multimedia", icon: "🖼️", free: true },
  
  // Advanced Developer Tools (New)
  { slug: "crontab-generator", name: "Crontab Generator", description: "Visual UI to build Cron schedules.", category: "developer", icon: "⏰", free: true },
  { slug: "htaccess-redirect-generator", name: ".htaccess Redirect Generator", description: "Build RewriteRule code for Apache.", category: "developer", icon: "🔄", free: true },
  { slug: "git-command-builder", name: "Git Command Builder", description: "Generate exact Git CLI strings.", category: "developer", icon: "🐙", free: true },
  { slug: "js-minifier", name: "JavaScript Minifier (Basic)", description: "Remove comments and extra whitespace.", category: "developer", icon: "📦", free: true },
  { slug: "css-media-query-tester", name: "CSS Media Query Tester", description: "Resize iframe to test breakpoints.", category: "developer", icon: "📱", free: true },
  { slug: "curl-to-fetch-converter", name: "Curl-to-Fetch Converter", description: "Translate curl to JavaScript fetch().", category: "developer", icon: "🔄", free: true },
  { slug: "html-to-jsx-converter", name: "HTML-to-JSX Converter", description: "Convert HTML to React JSX format.", category: "developer", icon: "⚛️", free: true },
  { slug: "json-schema-validator", name: "JSON Schema Validator", description: "Compare JSON against Schema.", category: "developer", icon: "✅", free: true },
  { slug: "responsive-navbar-generator", name: "Responsive Navbar Generator", description: "Generate HTML/CSS for mobile menu.", category: "developer", icon: "🍔", free: true },
  { slug: "sitemap-xml-generator", name: "Sitemap.xml Generator", description: "Wrap URLs in valid XML sitemap tags.", category: "developer", icon: "🗺️", free: true },
  
  // Data & Analytics (Local) (New)
  { slug: "csv-to-html-table", name: "CSV-to-HTML Table", description: "Turn spreadsheet into styled table.", category: "developer", icon: "📊", free: true },
  { slug: "data-anonymizer", name: "Data Anonymizer", description: "Replace names/emails with [REDACTED].", category: "security", icon: "🔒", free: true },
  { slug: "stop-word-remover", name: "Stop-Word Remover", description: "Remove common words for SEO analysis.", category: "writing", icon: "🚫", free: true },
  { slug: "unique-string-generator", name: "Unique String Generator", description: "Create non-repeating alphanumeric strings.", category: "developer", icon: "🆔", free: true },
  { slug: "text-sorter-by-length", name: "Text Sorter (By Length)", description: "Sort lines from shortest to longest.", category: "writing", icon: "📊", free: true },
  { slug: "unicode-escape-converter", name: "Unicode Escape Converter", description: "Convert text to \\u escape sequences.", category: "developer", icon: "🔤", free: true },
  { slug: "number-to-words", name: "Number-to-Words", description: "Convert 1,250 to written form.", category: "math", icon: "🔢", free: true },
  { slug: "frequency-distribution", name: "Frequency Distribution", description: "Calculate number occurrences in dataset.", category: "math", icon: "📊", free: true },
  { slug: "correlation-coefficient-calculator", name: "Correlation Coefficient Calculator", description: "Find relationship between two number sets.", category: "math", icon: "📊", free: true },
  { slug: "json-path-tester", name: "JSON Path Tester", description: "Query JSON objects using path syntax.", category: "developer", icon: "🔍", free: true },
  
  // Randomizers & Simulation (New)
  { slug: "pronounceable-password-generator", name: "Password Pronounceable Generator", description: "Strong passwords easier to remember.", category: "security", icon: "🔐", free: true },
  { slug: "dnd-dice-roller", name: "D&D Dice Roller", description: "Roll d4, d6, d8, d10, d12, d20 with history.", category: "creator", icon: "🎲", free: true },
  { slug: "mock-user-profile-generator", name: "Mock User Profile Generator", description: "Generate name, job, avatar for testing.", category: "developer", icon: "👤", free: true },
  { slug: "lottery-number-picker", name: "Lottery Number Picker", description: "Generate random numbers by country rules.", category: "creator", icon: "🎫", free: true },
  { slug: "coin-flipper", name: "Coin Flipper", description: "3D or CSS-animated coin flip.", category: "creator", icon: "🪙", free: true },
  { slug: "color-blindness-simulator", name: "Color Blindness Simulator", description: "Apply SVG filters for accessibility preview.", category: "design", icon: "👁️", free: true },
  { slug: "typing-speed-trainer", name: "Typing Speed Trainer", description: "Calculate WPM and accuracy.", category: "productivity", icon: "⌨️", free: true },
  { slug: "uuid-v4-generator", name: "UUID v4 Generator", description: "Generate RFC 4122 compliant identifiers.", category: "developer", icon: "🆔", free: true },
  { slug: "fake-credit-card-generator", name: "Fake Credit Card Generator", description: "Valid-pattern numbers for testing.", category: "developer", icon: "💳", free: true },
  { slug: "random-hex-color-generator", name: "Random Hex Color Generator", description: "Spacebar to refresh color inspiration.", category: "design", icon: "🎨", free: true },
  
  // Niche Utilities (New)
  { slug: "morse-code-flasher", name: "Morse Code Flasher", description: "Flash Morse code using screen.", category: "creator", icon: "💡", free: true },
  { slug: "base64-to-image", name: "Base64-to-Image", description: "Paste data string to see image.", category: "developer", icon: "🖼️", free: true },
  { slug: "yaml-to-toml-converter", name: "YAML-to-TOML Converter", description: "Translate between config formats.", category: "developer", icon: "🔄", free: true },
  { slug: "list-inverter", name: "List Inverter", description: "Flip order of items in list.", category: "writing", icon: "🔄", free: true },
  { slug: "email-signature-builder", name: "Email Signature Builder", description: "Get copy-pasteable HTML signature.", category: "creator", icon: "✉️", free: true },
  { slug: "css-clip-path-maker", name: "CSS Clip-Path Maker", description: "Drag-and-drop polygon shape creator.", category: "design", icon: "✂️", free: true },
  { slug: "markdown-to-pdf-print", name: "Markdown-to-PDF (Print)", description: "Use window.print() to save files.", category: "creator", icon: "📝", free: true },
  { slug: "time-difference-seconds", name: "Time Difference (Seconds)", description: "Find gap between two timestamps.", category: "math", icon: "⏱️", free: true },
  { slug: "broken-link-finder", name: "Broken Link Finder (Local)", description: "Extract all <a> tags for review.", category: "developer", icon: "🔗", free: true },
  { slug: "ascii-table-lookup", name: "ASCII Table Lookup", description: "Searchable grid of ASCII characters.", category: "developer", icon: "🔤", free: true },
  
  // Structural & Architecture Helpers (New)
  { slug: "css-glassmorphism-ui-builder", name: "CSS Glassmorphism UI Builder", description: "Visual playground for transparency and blur.", category: "developer", icon: "🪟", free: true },
  { slug: "open-graph-tag-generator", name: "Open Graph (OG) Tag Generator", description: "Create meta tags for social media previews.", category: "developer", icon: "📱", free: true },
  { slug: "robots-txt-generator", name: "Robots.txt Generator", description: "Click-to-build file for search engine rules.", category: "developer", icon: "🤖", free: true },
  { slug: "json-ld-schema-generator", name: "JSON-LD Schema Generator", description: "Create structured data for Google Rich Results.", category: "developer", icon: "📋", free: true },
  { slug: "svg-to-css-background", name: "SVG-to-CSS Background", description: "Convert SVG to data URI string.", category: "developer", icon: "🎨", free: true },
  { slug: "tailwind-config-visualizer", name: "Tailwind Config Visualizer", description: "Preview custom theme colors/spacing.", category: "developer", icon: "💨", free: true },
  { slug: "html-minifier", name: "HTML Minifier", description: "Strip whitespace and comments from HTML.", category: "developer", icon: "📦", free: true },
  { slug: "z-index-manager", name: "Z-Index Manager", description: "Visual stack showing z-index layers.", category: "developer", icon: "📚", free: true },
  { slug: "cors-header-generator", name: "CORS Header Generator", description: "Generate Access-Control-Allow-Origin strings.", category: "developer", icon: "🌐", free: true },
  { slug: "preload-prefetch-link-generator", name: "Preload/Prefetch Link Generator", description: "Create link tags for faster performance.", category: "developer", icon: "⚡", free: true },
  
  // Advanced Calculation & Logic (New)
  { slug: "aspect-ratio-grid", name: "Aspect Ratio Grid", description: "See grid of all standard ratios.", category: "math", icon: "📐", free: true },
  { slug: "binary-subnet-calculator", name: "Binary Subnet Calculator", description: "Calculate IP ranges and CIDR notation.", category: "developer", icon: "🌐", free: true },
  { slug: "compound-interest-grapher", name: "Compound Interest Grapher", description: "Chart showing savings growth over years.", category: "math", icon: "📈", free: true },
  { slug: "inflation-calculator", name: "Inflation Calculator", description: "Show value of $1 across decades.", category: "math", icon: "💵", free: true },
  { slug: "statistical-mode-median-mean", name: "Statistical Mode/Median/Mean", description: "Quick statistical analysis tool.", category: "math", icon: "📊", free: true },
  { slug: "truth-table-generator", name: "Truth Table Generator", description: "Enter logic gate and see resulting table.", category: "math", icon: "🔢", free: true },
  { slug: "gpa-calculator", name: "Grade Point Average (GPA) Calculator", description: "Calculate semester GPA.", category: "math", icon: "🎓", free: true },
  { slug: "time-to-decimal-converter", name: "Time-to-Decimal Converter", description: "Turn 1 hour 30 mins into 1.5 hours.", category: "math", icon: "⏰", free: true },
  { slug: "unix-permissions-calculator", name: "Unix Permissions (Chmod) Calculator", description: "Checkboxes that output 755.", category: "developer", icon: "🔐", free: true },
  { slug: "scientific-notation-converter", name: "Scientific Notation Converter", description: "Switch between standard and E notation.", category: "math", icon: "🔬", free: true },
  
  // Creative & Visual Assets (New)
  { slug: "css-mesh-gradient-generator", name: "CSS Mesh Gradient Generator", description: "Create trendy multi-color backgrounds.", category: "design", icon: "🌈", free: true },
  { slug: "dithering-image-filter", name: "Dithering Image Filter", description: "Turn images into retro pixelated B&W.", category: "image", icon: "⬛", free: true },
  { slug: "custom-scrollbar-styler", name: "Custom Scrollbar Styler", description: "Design webkit-scrollbar styles visually.", category: "design", icon: "📜", free: true },
  { slug: "svg-wave-generator", name: "SVG Wave Generator", description: "Create organic waves for section dividers.", category: "design", icon: "🌊", free: true },
  { slug: "css-keyframe-animator", name: "CSS Keyframe Animator", description: "Timeline UI to build @keyframes.", category: "design", icon: "🎬", free: true },
  { slug: "duotone-image-filter", name: "Duotone Image Filter", description: "Apply two-color gradient map to photos.", category: "image", icon: "🎨", free: true },
  { slug: "pattern-noise-generator", name: "Pattern Noise Generator", description: "Create grain/noise texture for UI depth.", category: "design", icon: "📺", free: true },
  { slug: "icon-font-previewer", name: "Icon Font Previewer", description: "Upload font file to see all icons.", category: "design", icon: "🔤", free: true },
  { slug: "css-counter-styler", name: "CSS Counter Styler", description: "Design custom list markers.", category: "design", icon: "🔢", free: true },
  { slug: "text-to-image-canvas", name: "Text-to-Image (Canvas)", description: "Type quote and download as PNG.", category: "creator", icon: "🖼️", free: true },
  
  // Security & Privacy (Client-Side) (New)
  { slug: "xss-escaper", name: "XSS Escaper", description: "Escape characters to prevent XSS.", category: "security", icon: "🛡️", free: true },
  { slug: "sri-generator", name: "SRI (Subresource Integrity) Generator", description: "Generate integrity hash for CDN scripts.", category: "security", icon: "🔐", free: true },
  { slug: "jwt-expiry-checker", name: "JWT Expiry Checker", description: "Decode token and show minutes until expiry.", category: "security", icon: "⏰", free: true },
  { slug: "password-entropy-visualizer", name: "Password Entropy Visualizer", description: "Show meter of guesses to crack.", category: "security", icon: "📊", free: true },
  { slug: "disposable-data-uri", name: "Disposable Data URI", description: "Convert file to temporary Base64 string.", category: "developer", icon: "🔗", free: true },
  { slug: "http-header-security-checklist", name: "HTTP Header Security Checklist", description: "Help remember Content-Security-Policy.", category: "security", icon: "✅", free: true },
  { slug: "hex-to-binary-string", name: "Hex-to-Binary String", description: "Convert hex dump to binary visualizer.", category: "developer", icon: "🔢", free: true },
  { slug: "zero-width-character-remover", name: "Zero-Width Character Remover", description: "Clean hidden characters from code.", category: "developer", icon: "🧹", free: true },
  { slug: "punycode-converter", name: "Punycode Converter", description: "Convert special URLs to xn-- format.", category: "developer", icon: "🌐", free: true },
  { slug: "text-shuffler-anonymizer", name: "Text Shuffler (Anonymizer)", description: "Scramble middle letters of words.", category: "security", icon: "🔀", free: true },
  
  // Miscellaneous & Fun (New)
  { slug: "morse-code-flashlight", name: "Morse Code Flashlight", description: "Use screen to signal SOS.", category: "creator", icon: "🔦", free: true },
  { slug: "virtual-metronome", name: "Virtual Metronome", description: "Rhythmic click tool for musicians.", category: "creator", icon: "🎵", free: true },
  { slug: "bpm-tapper", name: "BPM Tapper", description: "Tap key to find Beats Per Minute.", category: "creator", icon: "🎶", free: true },
  { slug: "screen-dead-pixel-tester", name: "Screen Dead Pixel Tester", description: "Cycle colors to find monitor flaws.", category: "creator", icon: "📺", free: true },
  { slug: "barcode-generator-code128", name: "Barcode Generator (Code 128)", description: "Generate standard industrial barcodes.", category: "creator", icon: "📊", free: true },
  { slug: "markdown-table-to-json", name: "Markdown Table-to-JSON", description: "Parse Markdown tables into data arrays.", category: "developer", icon: "📋", free: true },
  { slug: "window-resize-event-logger", name: "Window Resize Event Logger", description: "Show history of resize event debouncing.", category: "developer", icon: "📏", free: true },
  { slug: "css-object-fit-tester", name: "CSS Object-Fit Tester", description: "Show cover vs contain on images.", category: "design", icon: "🖼️", free: true },
  { slug: "lorem-pixel-generator", name: "Lorem Pixel Generator", description: "Generate placeholder image service URLs.", category: "design", icon: "🖼️", free: true },
  { slug: "user-story-mad-libs", name: "User-Story Mad Libs", description: "Build As a [role], I want to [action].", category: "productivity", icon: "📝", free: true },
  
  // Advanced Dev & Performance (New)
  { slug: "critical-css-extractor", name: "Critical CSS Extractor", description: "Extract above-the-fold CSS rules.", category: "developer", icon: "✂️", free: true },
  { slug: "bundle-size-estimator", name: "Bundle Size Estimator", description: "Calculate JS library sizes via CDN.", category: "developer", icon: "📊", free: true },
  { slug: "lighthouse-score-simulator", name: "Lighthouse Score Simulator", description: "Check meta tags and accessibility compliance.", category: "developer", icon: "🚦", free: true },
  { slug: "sass-to-css-compiler", name: "CSS Preprocessor (Sass to CSS)", description: "Basic online compiler for SASS mixins.", category: "developer", icon: "🎨", free: true },
  { slug: "http-request-debugger", name: "HTTP Request Debugger", description: "Show fetch cycle headers, timing, response.", category: "developer", icon: "🔍", free: true },
  { slug: "web-vitals-dashboard", name: "Web Vitals Dashboard", description: "Show FID, LCP, and CLS scores.", category: "developer", icon: "📊", free: true },
  { slug: "svg-to-jsx-react", name: "SVG to JSX (React Component)", description: "Wrap SVG in React component template.", category: "developer", icon: "⚛️", free: true },
  { slug: "manifest-json-generator", name: "Manifest.json Generator", description: "Create PWA configuration file.", category: "developer", icon: "📦", free: true },
  { slug: "browser-storage-manager", name: "Browser Storage Manager", description: "Inspect localStorage, sessionStorage, IndexedDB.", category: "developer", icon: "💾", free: true },
  { slug: "service-worker-boilerplate", name: "Service Worker Boilerplate", description: "Generate sw.js for caching strategies.", category: "developer", icon: "⚙️", free: true },
  
  // Data Transformation & Parsing (New)
  { slug: "json-to-sql-insert", name: "JSON to SQL Insert Script", description: "Convert JSON array to INSERT statements.", category: "developer", icon: "📊", free: true },
  { slug: "graphql-query-builder", name: "GraphQL Query Builder", description: "GUI to build valid GraphQL query string.", category: "developer", icon: "🔍", free: true },
  { slug: "csv-to-markdown-table", name: "CSV to Markdown Table", description: "Format CSV into GitHub-friendly markdown.", category: "developer", icon: "📋", free: true },
  { slug: "json-path-finder", name: "JSON Path Finder", description: "Return specific path for given key.", category: "developer", icon: "🔍", free: true },
  { slug: "base64-to-binary", name: "Base64-to-Binary", description: "Convert file stream to binary code.", category: "developer", icon: "🔢", free: true },
  { slug: "uuid-bulk-generator", name: "UUID/GUID Bulk Generator", description: "Generate up to 1,000 unique IDs at once.", category: "developer", icon: "🆔", free: true },
  { slug: "yaml-to-xml-converter", name: "YAML to XML Converter", description: "Handle nested data between formats.", category: "developer", icon: "🔄", free: true },
  { slug: "tsv-to-csv", name: "TSV (Tab-Separated) to CSV", description: "Simple separator swapper for spreadsheets.", category: "developer", icon: "📋", free: true },
  { slug: "log-file-parser", name: "Log File Parser", description: "Strip timestamps from error logs.", category: "developer", icon: "📝", free: true },
  { slug: "number-to-currency-converter", name: "Number-to-Currency Converter", description: "Format numbers into locale currency strings.", category: "math", icon: "💵", free: true },
  
  // Creative & UI/UX Design (New)
  { slug: "css-grid-visualizer", name: "CSS Grid Visualizer", description: "Draw grid layout and copy grid-template-areas.", category: "design", icon: "🔲", free: true },
  { slug: "color-palette-from-image", name: "Color Palette Generator (from Image)", description: "Analyze dominant pixels for 5-color harmony.", category: "design", icon: "🎨", free: true },
  { slug: "font-stack-generator", name: "Font-Stack Generator", description: "Suggest safe fallback fonts for every OS.", category: "design", icon: "🔤", free: true },
  { slug: "css-animation-timeline", name: "CSS Animation Timeline", description: "Visual keyframe slider for custom animations.", category: "design", icon: "🎬", free: true },
  { slug: "box-shadow-layering", name: "Box Shadow Layering", description: "Add multiple box-shadow values for depth.", category: "design", icon: "📦", free: true },
  { slug: "svg-path-simplifier", name: "SVG Path Simplifier", description: "Reduce coordinate points in SVG path.", category: "design", icon: "✂️", free: true },
  { slug: "cursor-style-previewer", name: "Cursor Style Previewer", description: "Test every CSS cursor type in real area.", category: "design", icon: "🖌️", free: true },
  { slug: "placeholder-svg-icon-creator", name: "Placeholder SVG Icon Creator", description: "Generate standard shapes with custom colors.", category: "design", icon: "🔸", free: true },
  { slug: "glassmorphism-layer-tester", name: "Glassmorphism Layer Tester", description: "Control backdrop-filter blur intensities.", category: "design", icon: "🪟", free: true },
  { slug: "css-clip-path-polygon-builder", name: "CSS Clip-Path Builder (Polygon)", description: "Drag points to create complex image masks.", category: "design", icon: "✂️", free: true },
  
  // Privacy & Security (Hardened) (New)
  { slug: "entropy-password-generator", name: "Entropy Password Generator", description: "Use crypto.getRandomValues() for passwords.", category: "security", icon: "🔐", free: true },
  { slug: "filename-sanitizer", name: "Filename Sanitizer", description: "Strip special characters from filenames.", category: "security", icon: "🧹", free: true },
  { slug: "mime-type-checker", name: "MIME-Type Checker", description: "Verify file is what it claims based on headers.", category: "security", icon: "🔍", free: true },
  { slug: "xss-payload-fuzzer", name: "XSS Payload Fuzzer", description: "Safe list of XSS vectors for testing.", category: "security", icon: "🛡️", free: true },
  { slug: "jwt-payload-debugger", name: "JWT Payload Debugger", description: "Decode and flag tokens missing claims.", category: "security", icon: "🔓", free: true },
  { slug: "ip-address-masker", name: "IP Address Masker", description: "Practice converting IP to CIDR blocks.", category: "security", icon: "🌐", free: true },
  { slug: "csrf-token-simulator", name: "CSRF Token Simulator", description: "Visual demo of hidden input tokens.", category: "security", icon: "🔐", free: true },
  { slug: "url-param-stripper", name: "URL Param Stripper", description: "Remove all tracking query parameters.", category: "security", icon: "🧹", free: true },
  { slug: "steganography-decryptor", name: "Steganography Decryptor", description: "Extract hidden data from encoded images.", category: "security", icon: "🔓", free: true },
  { slug: "ciphertext-tester", name: "Ciphertext Tester", description: "Show differences with different salting.", category: "security", icon: "🔐", free: true },
  
  // Specialized Utilities (New)
  { slug: "world-clock-multi-zone", name: "World Clock (Multi-Zone)", description: "Compare up to 5 time zones in one view.", category: "productivity", icon: "🌍", free: true },
  { slug: "keyboard-mapping-tool", name: "Keyboard Mapping Tool", description: "Remap keys visually for custom shortcuts.", category: "productivity", icon: "⌨️", free: true },
  { slug: "stopwatch-split-lap-recorder", name: "Stopwatch (Split Lap Recorder)", description: "Log lap times and calculate averages.", category: "productivity", icon: "⏱️", free: true },
  { slug: "color-blindness-simulator-advanced", name: "Color Blindness Simulator", description: "Simulate protanopia, deuteranopia, tritanopia.", category: "design", icon: "👁️", free: true },
  { slug: "morse-code-audio-generator", name: "Morse Code Audio Generator", description: "Convert text to high-frequency audio tones.", category: "creator", icon: "🔊", free: true },
  { slug: "unit-converter-scientific", name: "Unit Converter (Scientific)", description: "Handle scientific units like Joules to Calories.", category: "math", icon: "🔬", free: true },
  { slug: "typing-rhythm-analyzer", name: "Typing Rhythm Analyzer", description: "Log time between key presses for typing flow.", category: "productivity", icon: "⌨️", free: true },
  { slug: "webcam-snapshot-tool", name: "Webcam Snapshot Tool", description: "Grab frame and download as PNG.", category: "multimedia", icon: "📸", free: true },
  { slug: "broken-link-scanner", name: "Broken Link Scanner", description: "Highlight URLs returning 404/403.", category: "developer", icon: "🔗", free: true },
  { slug: "batch-processor-tool", name: "Everything Batch Processor", description: "Pipe text through three tools in sequence.", category: "developer", icon: "⚙️", free: true },
];

export const categories: Category[] = [
  { slug: "writing", name: "Writing Tools", description: "Word counters, case converters, readability tools.", icon: "✍️" },
  { slug: "image", name: "Image Tools", description: "Compress, resize, and convert images easily.", icon: "🖼️" },
  { slug: "design", name: "Design Tools", description: "Color pickers, gradients, and design helpers.", icon: "🎨" },
  { slug: "security", name: "Security Tools", description: "Password generators and encryption tools.", icon: "🔒" },
  { slug: "math", name: "Math Tools", description: "Calculators, converters, and number utilities.", icon: "🔢" },
  { slug: "creator", name: "Creator Tools", description: "QR codes, URL tools, and content helpers.", icon: "🚀" },
  { slug: "developer", name: "Developer Tools", description: "Code formatters, validators, and dev utilities.", icon: "💻" },
  { slug: "visualization", name: "Visualization Tools", description: "Charts, graphs, timelines, and data visualization.", icon: "📊" },
  { slug: "productivity", name: "Productivity Tools", description: "Timers, trackers, and lifestyle utilities.", icon: "⚡" },
  { slug: "multimedia", name: "Multimedia Tools", description: "Audio, video, and browser API utilities.", icon: "🎥" },
];
