import { siteConfig } from "@/config/site";

export const qrCodeGeneratorConfig = {
  slug: "qr-code-generator",
  name: "QR Code Generator",
  description: "Generate customisable QR codes for URLs, text, WiFi, email, phone, and SMS with instant PNG export.",
  category: "creator",
  icon: "📱",
  free: true,
  backend: false,
  seo: {
    title: "QR Code Generator — Free QR Code Maker Online | Productive Toolbox",
    description: "Create QR codes for URLs, WiFi, email, phone, and text. Customise size, colours, and error correction. Download PNG instantly. Free, no signup, browser-based.",
    keywords: [
      "qr code generator",
      "qr code generator online",
      "free qr code generator",
      "qr code maker",
      "create qr code online",
      "qr code creator",
      "generate qr code",
      "custom qr code generator",
      "qr code download png",
      "wifi qr code generator",
      "url qr code generator",
      "qr code for website",
      "qr code for business card",
      "qr code for menu",
      "qr code for wifi",
      "qr code no signup",
      "free qr code maker no account",
      "high resolution qr code",
      "qr code with custom colors",
      "qr code error correction",
      "qr code for print",
      "qr code for marketing",
      "online qr code generator free",
      "qr code generator no watermark",
      "scannable qr code maker",
    ],
    openGraph: {
      title: "QR Code Generator — Free QR Code Maker Online",
      description: "Create QR codes for URLs, WiFi, email, phone, and text. Customise size and colours. Download PNG instantly. Free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/creator/qr-code-generator`,
    },
    howToSteps: [
      {
        name: "Select the content type",
        text: "Choose from URL, Text, Email, Phone, SMS, or WiFi. Selecting the correct type ensures the content is encoded in the format phone cameras recognise — WiFi codes formatted correctly let devices connect automatically on scan.",
      },
      {
        name: "Enter your content",
        text: "Type or paste your URL, message, phone number, or WiFi credentials. The QR code preview updates in real time. For WiFi codes, fill in the network name, password, and security type.",
      },
      {
        name: "Set the size",
        text: "Choose between 128px and 1024px. For digital use 256px is sufficient. For print materials generate at 512px or 1024px to ensure enough resolution at the intended print dimensions.",
      },
      {
        name: "Choose error correction",
        text: "Select Low for maximum data capacity, Medium for general use, Quartile for printed materials with potential wear, or High for harsh environments or codes that will have a logo overlaid.",
      },
      {
        name: "Customise colours if needed",
        text: "Change foreground and background colours using the colour pickers. Keep strong contrast between the two — dark foreground on a light background. Scan-test before printing.",
      },
      {
        name: "Download or copy",
        text: "Click Download PNG to save the QR code. Click Copy to Clipboard to paste it directly into a design tool without saving a file first.",
      },
      {
        name: "Test before distributing",
        text: "Scan with at least two different devices — one iOS and one Android — before printing or publishing. Verify the destination loads and the content type triggers the correct action.",
      },
    ],
    faq: [
      {
        q: "What is a QR code generator and what can I encode?",
        a: "A QR code generator converts text, URLs, and structured data into a scannable barcode. This generator supports six types: website URLs, plain text, email addresses, phone numbers, SMS messages, and WiFi credentials. Each type is automatically formatted to the correct standard so phone cameras trigger the right action on scan.",
      },
      {
        q: "What is error correction and which level should I use?",
        a: "Error correction allows a QR code to be read even when part of it is damaged. The four levels are L (7% recovery), M (15%), Q (25%), and H (30%). Medium is the right default for most digital uses. For printed materials that may get worn, use Quartile or High. Higher correction makes the code denser, so increase the size for long URLs with high correction.",
      },
      {
        q: "What size should I use for print vs digital?",
        a: "For digital use 256px to 512px is sufficient. For print, the QR code should be at least 2.5cm at its final printed size when scanned at 30cm. For posters or signage scanned from over a metre away, generate at 1024px and print at 5cm or larger. Generate at maximum resolution and let your design tool resize down.",
      },
      {
        q: "How do I create a WiFi QR code?",
        a: "Select WiFi as the content type, enter the network name, password, and security type (WPA2 for most modern routers). The generator formats these into the WIFI standard that Android and iOS recognise — when scanned, the phone prompts the user to join the network automatically without typing the password.",
      },
      {
        q: "How do I use custom colors without breaking scannability?",
        a: "The most important rule is contrast: the foreground must be significantly darker than the background. Black on white is the gold standard. Dark blues, greens, or reds on a white background work well. Avoid low-contrast combinations like yellow on white or light grey on white. Always scan-test a customised code with two different devices before distribution.",
      },
      {
        q: "Do QR codes expire?",
        a: "Static QR codes never expire. The code itself is permanent. However, if the content encoded becomes unavailable — a URL that returns 404, a WiFi network that is renamed — the code still scans but the destination is broken. For link-based codes, use a reliable URL and periodically verify it resolves.",
      },
      {
        q: "What is the maximum amount of data a QR code can hold?",
        a: "At Low correction, a QR code can hold up to 4,296 alphanumeric characters. In practice, keep URL content under 300 characters for reliable scanning across devices. Very long URLs create extremely dense codes. For long content, shorten the URL first using a URL shortener.",
      },
      {
        q: "Can I add a logo to the centre of the QR code?",
        a: "This generator does not support embedded logos directly, but it supports High error correction — which allows up to 30% of the code to be obscured and still scan. Export the PNG, overlay a logo in a design tool, use High correction, and keep the logo under 25% of the total code area.",
      },
      {
        q: "What is the quiet zone and why does it matter?",
        a: "The quiet zone is the blank white margin surrounding a QR code. Scanner algorithms use it to detect where the code begins and ends. Placing a QR code directly against a busy background without a clear margin frequently causes scan failures. This generator includes the standard quiet zone. Maintain at least 4 modules of white space on all sides when placing the code in a design.",
      },
      {
        q: "Is my data private when using this QR code generator?",
        a: "Yes. All QR code generation runs entirely in your browser using JavaScript. The content you enter — whether a URL, WiFi password, or phone number — is never transmitted to any server, stored in any database, or accessible to anyone other than you. The PNG is generated locally using the HTML Canvas API and downloaded directly to your device.",
      },
    ],
  },
  features: [
    "Six content types: URL, Text, Email, Phone, SMS, WiFi",
    "Automatic content-type formatting",
    "Real-time preview as you type",
    "Size options from 128px to 1024px",
    "Four error correction levels: L, M, Q, H",
    "Custom foreground and background colours",
    "One-click PNG download",
    "Copy to clipboard",
    "Generation history — last 10 codes stored locally",
    "Keyboard shortcut: Ctrl+Enter to regenerate",
    "Mobile-optimised interface",
    "100% browser-based — no uploads, no server",
  ],
  relatedTools: [
    "wifi-password-generator",
    "url-encoder-decoder",
    "base64-encoder-decoder",
    "placeholder-image-generator",
    "color-palette-generator",
  ],
};
