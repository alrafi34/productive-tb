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
  { slug: "paragraph-formatter", name: "Paragraph Formatter", description: "Remove extra spaces, line breaks.", category: "writing", icon: "📄", free: true },
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
];

export const categories: Category[] = [
  { slug: "writing", name: "Writing Tools", description: "Word counters, case converters, readability tools.", icon: "✍️" },
  { slug: "image", name: "Image Tools", description: "Compress, resize, and convert images easily.", icon: "🖼️" },
  { slug: "design", name: "Design Tools", description: "Color pickers, gradients, and design helpers.", icon: "🎨" },
  { slug: "security", name: "Security Tools", description: "Password generators and encryption tools.", icon: "🔒" },
  { slug: "math", name: "Math Tools", description: "Calculators, converters, and number utilities.", icon: "🔢" },
  { slug: "creator", name: "Creator Tools", description: "QR codes, URL tools, and content helpers.", icon: "🚀" },
];
