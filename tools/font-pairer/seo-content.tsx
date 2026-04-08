export default function FontPairerSEOContent() {
  return (
    <div className="max-w-5xl mx-auto mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Font Pairer?
        </h2>
        <p className="text-base leading-relaxed">
          A font pairer is a design tool that helps you discover and preview beautiful typography combinations. It allows you to test two Google Fonts side by side with custom sample text, making it easy to find the perfect heading and body font combination for your website or design project.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Font Pairer
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-base">
          <li>Select a heading font from the dropdown or search</li>
          <li>Select a body font from the second dropdown</li>
          <li>Customize the sample text to see how it looks</li>
          <li>Adjust font sizes, weights, line height, and letter spacing</li>
          <li>Copy the CSS snippet or Google Fonts link for your project</li>
          <li>Save your favorite pairs for future reference</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Font Pairing Tips
        </h2>
        <ul className="list-disc list-inside space-y-2 text-base">
          <li>Pair serif headings with clean sans-serif body text for better readability</li>
          <li>Use contrasting font styles to create visual hierarchy</li>
          <li>Ensure sufficient contrast between heading and body fonts</li>
          <li>Test your pairing at different sizes and weights</li>
          <li>Consider the mood and personality of your brand</li>
          <li>Limit yourself to 2-3 fonts maximum for a cohesive design</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Popular Font Combinations
        </h2>
        <div className="space-y-3 text-base">
          <p><strong>Playfair Display + Inter:</strong> Elegant serif heading with modern clean body text. Perfect for blogs and editorial sites.</p>
          <p><strong>Montserrat + Open Sans:</strong> Modern geometric pairing popular in startup landing pages and tech websites.</p>
          <p><strong>Bebas Neue + Roboto:</strong> Bold display heading with readable UI body text. Great for headlines and apps.</p>
          <p><strong>Raleway + Lato:</strong> Sophisticated pairing ideal for luxury brands and professional portfolios.</p>
          <p><strong>Merriweather + Source Sans Pro:</strong> Classic serif with contemporary sans-serif for content-heavy sites.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Google Fonts?
        </h2>
        <p className="text-base leading-relaxed">
          Google Fonts provides a free, open-source library of over 1,400 fonts. They're optimized for web performance, support multiple languages, and are easy to implement. All fonts are served via Google's CDN, ensuring fast loading times for your website visitors.
        </p>
      </section>
    </div>
  );
}
