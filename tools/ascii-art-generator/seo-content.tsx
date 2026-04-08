import React from "react";

export default function AsciiArtGeneratorSEOContent() {
  return (
    <div className="mt-12 space-y-8 max-w-4xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is ASCII Art?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          ASCII art is a graphic design technique that uses printable characters from the ASCII standard to create images and text effects. It has been popular since the early days of computing and remains widely used in terminal applications, social media, and creative projects.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use This Tool
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="text-primary font-bold">1.</span>
            <span>Choose between Text or Image mode</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold">2.</span>
            <span>Enter text or upload an image</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold">3.</span>
            <span>Adjust width, density, and character set</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold">4.</span>
            <span>Copy or download your ASCII art</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Features
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Convert text to ASCII art</li>
          <li>✓ Convert images to ASCII art</li>
          <li>✓ Adjustable width and density</li>
          <li>✓ Multiple character sets</li>
          <li>✓ Different ASCII styles</li>
          <li>✓ Copy to clipboard</li>
          <li>✓ Download as TXT or PNG</li>
          <li>✓ History of recent conversions</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips for Best Results
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>For Text:</strong> Shorter text works better. Longer text may need wider output width.
          </li>
          <li>
            <strong>For Images:</strong> High-contrast images produce better ASCII art. Avoid very small or very large images.
          </li>
          <li>
            <strong>Width:</strong> Larger width values produce more detailed ASCII art but may be harder to display.
          </li>
          <li>
            <strong>Character Sets:</strong> Different character sets create different visual effects. Experiment to find your favorite.
          </li>
        </ul>
      </section>
    </div>
  );
}
