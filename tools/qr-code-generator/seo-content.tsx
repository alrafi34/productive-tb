export default function QRCodeGeneratorSEO() {
  const faqItems = [
    {
      q: "What is a QR code generator and what can I encode?",
      a: "A QR code generator converts text, URLs, and structured data into a scannable two-dimensional barcode that any smartphone camera can read. This generator supports six content types: website URLs, plain text, email addresses, phone numbers, SMS messages, and WiFi credentials. Each type is automatically formatted to the correct QR standard — a WiFi entry is encoded as a WIFI: string that Android and iOS can parse and connect to automatically, while a phone number is encoded as tel: so it opens the dialler on scan.",
    },
    {
      q: "What is error correction and which level should I use?",
      a: "Error correction allows a QR code to be read even when part of it is damaged, obscured, or dirty. The four levels are L (7% recovery), M (15%), Q (25%), and H (30%). For most digital uses — website links on a screen, email signatures — Medium (M) is the right default. For printed materials that may get worn, scratched, or wet, use Quartile (Q) or High (H). Higher correction adds more modules to the code, making it denser — for long URLs with High correction, increase the size to at least 512px.",
    },
    {
      q: "What size should I use for print vs digital?",
      a: "For digital use — social media, email, websites — 256px to 512px is sufficient. For print, the QR code should be at least 2cm x 2cm at its final printed size when scanned at 30cm. For posters or signage scanned from more than a metre away, generate at 512px or 1024px and print at a minimum 5cm x 5cm. Generate at maximum resolution and let your design tool resize down.",
    },
    {
      q: "How do I create a WiFi QR code?",
      a: "Select WiFi as the content type, enter the network name (SSID), the password, and the security type (WPA, WPA2, or WEP for older networks). The generator formats these into the WIFI standard that Android and iOS recognise — when scanned, the phone prompts the user to join the network automatically without typing the password. This is ideal for offices, cafes, events, and guest networks.",
    },
    {
      q: "How do I use custom colors without breaking scannability?",
      a: "The most important rule is contrast: the foreground (modules) must be significantly darker than the background. Black on white is the gold standard. You can use dark blues, greens, or reds on a white or light-coloured background and maintain good scan rates. Avoid low-contrast combinations like yellow on white, light grey on white, or inverted light-on-dark codes. Always scan-test a customised code with at least two different devices before distribution.",
    },
    {
      q: "Do QR codes expire?",
      a: "Static QR codes — which is what this generator creates — never expire. The code itself is permanent. However, if the content encoded becomes unavailable (a URL that returns a 404, a WiFi network that is renamed), the code will still scan but the destination will be broken. For link-based codes, use a reliable URL and periodically verify it resolves. For the ability to change the destination without reprinting, encode a URL shortener link instead.",
    },
    {
      q: "What is the maximum amount of data a QR code can hold?",
      a: "At Low correction, a QR code can hold up to 4,296 alphanumeric characters. In practice, for reliable scanning across devices, keep URL content under 300 characters. Very long URLs create extremely dense codes that require ideal lighting and a high-resolution scanner. For long content, shorten the URL first using a URL shortener service.",
    },
    {
      q: "Can I add a logo to the centre of the QR code?",
      a: "This generator does not currently support embedded logos, but it does support High (H) error correction — which is intentionally designed to allow up to 30% of the code to be obscured and still scan successfully. Export the PNG and overlay a logo in a design tool, use High correction, and keep the logo to under 25% of the code's total area.",
    },
    {
      q: "What is the quiet zone and why does it matter?",
      a: "The quiet zone is the blank white margin surrounding a QR code. Scanner algorithms use it to detect where the code begins and ends. Placing a QR code directly against a busy background without a clear margin frequently causes scan failures. This generator includes the standard quiet zone in its output. When placing the code in a design, maintain at least 4 modules of white space on all four sides.",
    },
    {
      q: "Is my data private when using this QR code generator?",
      a: "Yes. All QR code generation runs entirely in your browser using JavaScript. The content you enter — whether a URL, WiFi password, or phone number — is never transmitted to any server, stored in any database, or accessible to anyone other than you. The PNG is generated locally using the HTML Canvas API and downloaded directly to your device.",
    },
  ];

  const howToSteps: [string, string][] = [
    ["Select the content type", "Choose from URL, Text, Email, Phone, SMS, or WiFi. Selecting the right type ensures the content is encoded in the format that phone cameras recognise — a WiFi code formatted correctly lets devices connect automatically on scan."],
    ["Enter your content", "Type or paste your URL, message, phone number, or WiFi credentials into the input field. The QR code preview updates in real time as you type. For WiFi codes, fill in the network name, password, and security type in the dedicated fields."],
    ["Set the size", "Use the size selector to choose between 128px and 1024px. For digital use 256px is sufficient. For print materials generate at 512px or 1024px to ensure enough resolution at the intended print dimensions."],
    ["Choose error correction", "Select Low (L) for maximum data capacity on clean surfaces, Medium (M) for general use, Quartile (Q) for printed materials with potential wear, or High (H) for harsh environments or codes that will have a logo overlaid."],
    ["Customise colours if needed", "Change the foreground and background colours using the colour pickers. Keep strong contrast between the two — dark foreground on a light background. Avoid low-contrast combinations and scan-test before printing."],
    ["Download or copy", "Click Download PNG to save the QR code as a high-quality image file. Click Copy to Clipboard to paste it directly into a design tool, email, or document without saving a file first."],
    ["Test before distributing", "Scan the code with at least two different devices — one iOS and one Android — before printing or publishing. Verify the destination loads correctly and the content type behaves as expected."],
  ];

  return (
    <>
      {/* 1. Introduction */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a QR Code Generator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>QR code generator</strong> is a free online tool that converts a URL, text
            message, phone number, email address, or WiFi credentials into a scannable
            two-dimensional barcode. Any modern smartphone camera can read a QR code without
            a separate app — point, scan, and the phone opens a URL, dials a number, connects
            to a network, or launches an email compose window automatically.
          </p>
          <p>
            QR codes encode data in a matrix of black and white squares arranged according to
            the ISO 18004 standard. The density of that matrix — and therefore how reliably it
            scans — depends on three things: the length of the content, the error correction
            level selected, and the physical or pixel size at which the code is rendered. Getting
            these three right is the difference between a code that scans instantly and one that
            frustrates users at the moment it matters most.
          </p>
          <p>
            This <strong>free QR code generator</strong> is built for <strong>businesses,
            marketers, designers, developers, event organisers, and restaurant owners</strong>{" "}
            who need reliable, print-ready QR output fast. It supports six content types — URL,
            text, email, phone, SMS, and WiFi — with <strong>customisable size up to
            1024px</strong>, four <strong>error correction levels</strong>, custom foreground
            and background colours, real-time preview, one-click PNG download, clipboard copy,
            and a local generation history. Everything runs in your browser — no data is sent
            to any server.
          </p>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How QR Code Generation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A QR code encodes data by converting your content into a binary bit stream, then
            mapping that stream onto a grid of dark and light modules according to the QR
            specification. The grid includes finder patterns (the three corner squares), timing
            patterns, alignment patterns for larger codes, and format information — all of which
            help scanners orient and decode the code reliably under varying conditions.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Key Parameters</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Version</span> = 1–40 (determines grid size, auto-selected by data length)</p>
              <p><span className="font-semibold">Error correction</span> = L / M / Q / H (7% / 15% / 25% / 30% recovery)</p>
              <p><span className="font-semibold">Data capacity</span> = decreases as error correction increases</p>
              <p><span className="font-semibold">Module size</span> = output px divided by (version x 4 + 17 + quiet zone)</p>
            </div>
          </div>
          <p>
            This generator uses the Canvas API to render the matrix directly in your browser at
            the selected pixel dimensions. Content type detection automatically formats your
            input — a phone number gets the <span className="font-mono text-sm">tel:</span>{" "}
            prefix, WiFi credentials are formatted as{" "}
            <span className="font-mono text-sm">WIFI:T:WPA;S:...;P:...;H:false;</span> — so
            phone cameras trigger the correct action on scan without manual formatting.
          </p>
        </div>
      </section>

      {/* 3. Step-by-Step */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the QR Code Generator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Step-by-Step Guide
            </h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              What This Generator Provides
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Six content types: URL, Text, Email, Phone, SMS, WiFi",
                "Automatic content-type formatting (tel:, mailto:, WIFI:)",
                "Real-time preview — updates as you type",
                "Size options from 128px to 1024px",
                "Four error correction levels: L, M, Q, H",
                "Custom foreground and background colour pickers",
                "One-click PNG download",
                "Copy to clipboard without saving a file",
                "Generation history — last 10 codes stored locally",
                "Keyboard shortcut: Ctrl+Enter to regenerate",
                "Mobile-optimised interface",
                "100% browser-based — no uploads, no server",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Restaurant — Contactless Digital Menu",
              scenario:
                "A café owner wants to replace printed menus with a digital version. They enter the menu URL, set size to 512px, error correction to Q (for laminated table cards that may get scratched), and download the PNG. The code is placed on a 6cm sticker on each table. Customers scan and the menu opens instantly — no app required. When the menu URL changes seasonally, a new code is generated in under 30 seconds.",
            },
            {
              title: "Event Organiser — Badge Check-In Links",
              scenario:
                "A conference organiser generates QR codes for key speaker badges using the URL type at 256px. Each code links to a personalised confirmation page. The PNG is exported directly into the badge design template in Figma. For the general attendee batch, the clipboard copy function moves each code into the layout tool without managing individual files.",
            },
            {
              title: "Office IT — WiFi Guest Network",
              scenario:
                "An IT administrator sets up a guest WiFi network and wants visitors to connect without reading out a complex password. They select the WiFi content type, enter the SSID, password, and WPA2 security type, generate a 400px code, and print it on an A5 card at reception. Guests scan and connect automatically on both iOS and Android — no password typing needed.",
            },
            {
              title: "Marketer — Offline-to-Online Campaign",
              scenario:
                "A marketing team prints 10,000 direct mail flyers pointing to a campaign landing page. They generate the URL QR code at 1024px with High (H) error correction — because the flyer will be physically handled and may arrive crumpled. The team scans the printed proof with three different phones before approving the print run.",
            },
            {
              title: "Designer — Business Card QR Code",
              scenario:
                "A freelance designer wants a QR code on their business card linking to their portfolio. They enter the URL, set a dark navy foreground (#1a2e4a) on white, size 256px, Medium correction, and download the PNG. They test the coloured code on iOS native camera and Google Lens to confirm the contrast is sufficient before importing it into the card template.",
            },
            {
              title: "Developer — App Deep-Link Testing",
              scenario:
                "A mobile developer needs to test a deep link (myapp://product/12345) on a physical device without typing the URL manually. They encode the custom URI scheme as plain text in the generator, display the code on their laptop at 400px, and scan it with the test device. The history panel lets them quickly switch between several test URLs without re-entering them.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Tips & Mistakes */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Shorten long URLs before encoding them. Every additional character increases QR complexity. A short branded link encodes as a sparse, easy-to-scan code compared to a full UTM-tagged URL. Shorter = fewer modules = more reliable scanning at smaller print sizes.",
                "Generate at 1024px even if your final use is smaller. Downscaling a large PNG always produces a sharper result than upscaling a small one. Generate at maximum resolution and let your design tool resize — especially important for print.",
                "Always test with both iOS and Android before printing. iOS native camera, Android native camera, and Google Lens all have slightly different scan algorithms. A code that works on one may fail on another — test all three before committing to print.",
                "For WiFi QR codes, use WPA2 security type unless you specifically need WEP for an older router. WPA2 is universally supported by modern phones. WEP is deprecated and some devices may not offer to connect automatically even when they can read the code.",
                "Do not crop the quiet zone. The white border around the code is part of the QR standard — scanners use it to detect the code boundary. Ensure at least 4 modules of clear space on all sides when placing the code over any background.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't use low-contrast colour combinations. Light grey on white, yellow on white, or any combination where foreground and background are close in lightness will cause scan failures on older cameras. Stick to black on white if in doubt.",
                "Don't print QR codes too small. A code scanned from 30cm needs to be at least 2.5cm x 2.5cm in print. For posters scanned from over a metre away, the code needs to be 5cm or larger. Too small = scan failures = frustrated users.",
                "Don't skip testing on the actual printed output. Colours on screen look different when printed — a blue that appears dark on screen may print lighter, reducing contrast. Print a proof and scan it before approving a full print run.",
                "Don't encode a URL directly in a static code if the destination may change. If the URL changes, the printed code is permanently broken. Use a URL shortener as an intermediary so you can update the destination without reprinting.",
                "Don't place QR codes over busy photographic backgrounds. Even with High error correction, a code sitting over a detailed image frequently confuses scanners. Always use a solid-colour (preferably white) background behind the code.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Reference Tables */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          QR Code Reference: Error Correction, Size &amp; Content Types
        </h2>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Error Correction Level Guide
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Level</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Recovery</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Best for</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Trade-off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["L — Low",      "~7%",  "Digital screens, email, short URLs",       "Densest — hardest to scan if damaged"],
                ["M — Medium",   "~15%", "General use, websites, social media",       "Good balance — recommended default"],
                ["Q — Quartile", "~25%", "Printed cards, menus, product labels",      "More modules — increase size for long URLs"],
                ["H — High",     "~30%", "Outdoor signage, logo overlay, harsh use",  "Largest code — generate at 512px+ for long content"],
              ].map(([level, recovery, best, tradeoff]) => (
                <tr key={level} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs">{level}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-700">{recovery}</td>
                  <td className="py-2 px-3 text-xs text-gray-600">{best}</td>
                  <td className="py-2 px-3 text-xs text-gray-500">{tradeoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Minimum Print Size by Scanning Distance
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Scanning distance</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Min. print size</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Recommended export size</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Typical use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Screen / 15-20 cm",   "Digital only",    "256px",    "Social, email, website"],
                ["Hand-held / 20-30 cm","2.5 cm x 2.5 cm", "256-512px","Business cards, stickers"],
                ["Table-top / 30-60 cm","3.5 cm x 3.5 cm", "512px",    "Menus, product packaging"],
                ["Standing / 60-100 cm","5 cm x 5 cm",     "512-1024px","Posters, event stands"],
                ["Outdoor / 1-3 m",     "10 cm x 10 cm",   "1024px",   "Signage, billboards"],
              ].map(([dist, size, px, use]) => (
                <tr key={dist} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-800 text-xs">{dist}</td>
                  <td className="py-2 px-3 font-mono text-xs text-primary font-semibold">{size}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-700">{px}</td>
                  <td className="py-2 px-3 text-xs text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Supported Content Types &amp; Format Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Content type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Encoded format</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">On scan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["URL",   "https://example.com",             "Opens in browser"],
                ["Text",  "Hello, world!",                   "Displays text"],
                ["Email", "mailto:user@example.com",         "Opens email compose"],
                ["Phone", "tel:+12025551234",                "Opens phone dialler"],
                ["SMS",   "sms:+12025551234?body=Hello",     "Opens SMS compose"],
                ["WiFi",  "WIFI:T:WPA;S:MyNetwork;P:Pass;H:false;", "Prompts to join network"],
              ].map(([type, format, action]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-primary text-xs uppercase tracking-wide">{type}</td>
                  <td className="py-2 px-3 font-mono text-xs text-gray-700 break-all">{format}</td>
                  <td className="py-2 px-3 text-xs text-green-600 font-medium">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Who Uses This */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This QR Code Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🍽️",
              title: "Restaurants & Cafes",
              desc: "Replace printed menus with digital ones. Generate a new code in seconds when the menu URL changes — no reprinting the entire code sheet, just update the short link destination.",
            },
            {
              icon: "📣",
              title: "Marketers & Advertisers",
              desc: "Bridge offline campaigns to online destinations. Print QR codes on flyers, packaging, and out-of-home ads that route to landing pages, product pages, or tracking URLs.",
            },
            {
              icon: "🎪",
              title: "Event Organisers",
              desc: "Generate check-in links, schedule pages, and sponsor pages as QR codes for badges, signage, and programmes. WiFi codes let attendees connect to the event network instantly.",
            },
            {
              icon: "💼",
              title: "Business Professionals",
              desc: "Add QR codes to business cards linking to portfolios, LinkedIn profiles, or contact pages. Encode phone numbers and email addresses directly for one-tap communication.",
            },
            {
              icon: "🖥️",
              title: "Developers & IT Teams",
              desc: "Test deep links and custom URI schemes on physical devices without typing URLs. Generate WiFi QR codes for office guest networks, lab environments, and conference rooms.",
            },
            {
              icon: "🎨",
              title: "Designers & Creators",
              desc: "Generate print-ready 1024px PNG codes for packaging, posters, and product labels. Customise colours to match brand guidelines and verify contrast before handing off to print.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
