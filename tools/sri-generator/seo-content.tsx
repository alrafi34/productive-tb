export default function SRIGeneratorSEOContent() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <section>
        <h2>What is Subresource Integrity (SRI)?</h2>
        <p>
          Subresource Integrity (SRI) is a security feature that enables browsers to verify that resources they fetch 
          (for example, from a CDN) are delivered without unexpected manipulation. It works by allowing you to provide 
          a cryptographic hash that a fetched resource must match.
        </p>
        <p>
          When you include external scripts or stylesheets in your web pages, you're trusting that the CDN or external 
          server hasn't been compromised. SRI adds an extra layer of security by ensuring the file content matches 
          exactly what you expect.
        </p>
      </section>

      <section>
        <h2>Why Use SRI Hash Generator?</h2>
        <ul>
          <li><strong>Security:</strong> Protect your users from compromised CDN resources or man-in-the-middle attacks</li>
          <li><strong>Integrity Verification:</strong> Ensure external resources haven't been tampered with</li>
          <li><strong>Compliance:</strong> Meet security requirements for modern web applications</li>
          <li><strong>Privacy:</strong> All hashing happens in your browser - no data sent to servers</li>
          <li><strong>Speed:</strong> Instant hash generation using Web Crypto API</li>
          <li><strong>Convenience:</strong> Generate ready-to-use HTML snippets with integrity attributes</li>
        </ul>
      </section>

      <section>
        <h2>How SRI Works</h2>
        <p>
          When you add an integrity attribute to a script or link tag, the browser will:
        </p>
        <ol>
          <li>Download the resource from the specified URL</li>
          <li>Calculate the cryptographic hash of the downloaded content</li>
          <li>Compare it with the hash you provided in the integrity attribute</li>
          <li>Only execute/apply the resource if the hashes match</li>
          <li>Block the resource if the hashes don't match, protecting your users</li>
        </ol>
      </section>

      <section>
        <h2>Supported Hash Algorithms</h2>
        <div className="space-y-4">
          <div>
            <h3>SHA-256</h3>
            <p>
              Produces a 256-bit hash. Fast and secure for most use cases. Good choice when you need smaller 
              integrity strings.
            </p>
          </div>
          <div>
            <h3>SHA-384 (Recommended)</h3>
            <p>
              Produces a 384-bit hash. The recommended algorithm for SRI as it provides an excellent balance 
              between security and performance. Most widely used in production environments.
            </p>
          </div>
          <div>
            <h3>SHA-512</h3>
            <p>
              Produces a 512-bit hash. Maximum security with slightly larger integrity strings. Use when you 
              need the highest level of cryptographic security.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>How to Use This Tool</h2>
        
        <h3>Single Resource Mode</h3>
        <ol>
          <li><strong>Fetch URL:</strong> Enter the CDN URL and let the tool fetch and hash it automatically (requires CORS)</li>
          <li><strong>Upload File:</strong> Upload a local JavaScript or CSS file to generate its hash</li>
          <li><strong>Paste Content:</strong> Paste the script/stylesheet content directly for hashing</li>
          <li>Select your preferred hash algorithm (SHA-384 recommended)</li>
          <li>View all generated hashes or copy the ready-to-use HTML snippet</li>
        </ol>

        <h3>Batch Processing Mode</h3>
        <ol>
          <li>Enter multiple CDN URLs (one per line)</li>
          <li>Select your preferred hash algorithm</li>
          <li>Click "Process All" to generate SRI hashes for all resources</li>
          <li>Copy individual snippets or export all at once</li>
          <li>Download as TXT or HTML file for easy integration</li>
        </ol>
      </section>

      <section>
        <h2>Example Usage</h2>
        <p>
          Here's how to use SRI in your HTML:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
{`<!-- Script with SRI -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
        integrity="sha384-vtXRMe3mGCbOeY7l30aIg8H9p3GdeSe4IFlP6G8JMa7o7lXvnz3GFKzPxzJdPfGK"
        crossorigin="anonymous"></script>

<!-- Stylesheet with SRI -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
      crossorigin="anonymous">`}
        </pre>
      </section>

      <section>
        <h2>Important Notes</h2>
        <ul>
          <li><strong>CORS Requirement:</strong> When fetching URLs, the resource must have CORS enabled. If fetch fails, use paste mode.</li>
          <li><strong>crossorigin Attribute:</strong> Always include crossorigin="anonymous" with integrity for proper CORS handling.</li>
          <li><strong>Hash Updates:</strong> If the resource changes (e.g., CDN updates the file), you must regenerate the hash.</li>
          <li><strong>Multiple Algorithms:</strong> You can specify multiple algorithms: integrity="sha256-... sha384-..."</li>
          <li><strong>Browser Support:</strong> SRI is supported in all modern browsers (Chrome, Firefox, Safari, Edge).</li>
        </ul>
      </section>

      <section>
        <h2>Best Practices</h2>
        <ul>
          <li>Use SHA-384 or SHA-512 for production environments</li>
          <li>Always include the crossorigin attribute when using integrity</li>
          <li>Pin specific versions of CDN resources (avoid using "latest" or version ranges)</li>
          <li>Test your pages after adding SRI to ensure resources load correctly</li>
          <li>Keep a record of your SRI hashes for version control</li>
          <li>Update hashes when you intentionally update CDN resource versions</li>
          <li>Use batch processing for multiple resources to save time</li>
          <li>Consider using SRI for all external scripts and stylesheets</li>
        </ul>
      </section>

      <section>
        <h2>Common Use Cases</h2>
        <ul>
          <li><strong>CDN Resources:</strong> Secure jQuery, Bootstrap, Vue, React, and other libraries from CDNs</li>
          <li><strong>Third-Party Scripts:</strong> Verify analytics, advertising, or widget scripts</li>
          <li><strong>Stylesheets:</strong> Ensure CSS frameworks and icon fonts haven't been modified</li>
          <li><strong>Web Fonts:</strong> Protect font files loaded from external sources</li>
          <li><strong>Compliance:</strong> Meet security requirements for PCI-DSS, HIPAA, or other standards</li>
          <li><strong>Enterprise Applications:</strong> Add security layer for corporate web applications</li>
        </ul>
      </section>

      <section>
        <h2>Troubleshooting</h2>
        
        <h3>Resource Blocked by Browser</h3>
        <p>
          If a resource is blocked, check the browser console. Common issues:
        </p>
        <ul>
          <li>Hash mismatch - the resource content has changed, regenerate the hash</li>
          <li>Missing crossorigin attribute - add crossorigin="anonymous"</li>
          <li>Wrong algorithm - ensure you're using the correct hash algorithm</li>
        </ul>

        <h3>CORS Errors When Fetching</h3>
        <p>
          If the tool can't fetch a URL:
        </p>
        <ul>
          <li>The CDN may not have CORS enabled</li>
          <li>Use "Paste Content" mode instead</li>
          <li>Download the file manually and use "Upload File" mode</li>
        </ul>

        <h3>Hash Doesn't Match</h3>
        <p>
          If your generated hash doesn't work:
        </p>
        <ul>
          <li>Ensure you're hashing the exact same content the browser will download</li>
          <li>Check for whitespace or encoding differences</li>
          <li>Verify the CDN URL points to the correct version</li>
        </ul>
      </section>

      <section>
        <h2>Privacy & Security</h2>
        <p>
          This tool is designed with privacy in mind:
        </p>
        <ul>
          <li>All hashing is performed locally in your browser using the Web Crypto API</li>
          <li>No data is sent to any server or third party</li>
          <li>No cookies or tracking mechanisms are used</li>
          <li>Your scripts and URLs remain completely private</li>
          <li>Works offline after initial page load</li>
        </ul>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        
        <h3>Do I need SRI for all external resources?</h3>
        <p>
          While not required, it's highly recommended for any external scripts or stylesheets, especially from 
          third-party CDNs. It adds minimal overhead but significantly improves security.
        </p>

        <h3>What happens if the CDN updates the file?</h3>
        <p>
          The browser will block the resource because the hash won't match. This is intentional - you should 
          pin specific versions and update hashes deliberately when upgrading.
        </p>

        <h3>Can I use SRI with dynamic content?</h3>
        <p>
          SRI is designed for static resources with predictable content. It's not suitable for dynamically 
          generated scripts or resources that change frequently.
        </p>

        <h3>Which algorithm should I choose?</h3>
        <p>
          SHA-384 is recommended for most use cases. It provides strong security with reasonable hash length. 
          Use SHA-512 for maximum security or SHA-256 if you need shorter hashes.
        </p>

        <h3>Does SRI slow down my website?</h3>
        <p>
          The performance impact is negligible. Browsers compute hashes very quickly, and the security benefits 
          far outweigh any minimal overhead.
        </p>

        <h3>Can I use multiple algorithms?</h3>
        <p>
          Yes! You can specify multiple hashes: integrity="sha256-... sha384-...". The browser will use the 
          strongest algorithm it supports.
        </p>
      </section>

      <section>
        <h2>Browser Compatibility</h2>
        <p>
          Subresource Integrity is supported in:
        </p>
        <ul>
          <li>Chrome 45+</li>
          <li>Firefox 43+</li>
          <li>Safari 11.1+</li>
          <li>Edge 17+</li>
          <li>Opera 32+</li>
        </ul>
        <p>
          For older browsers, the integrity attribute is safely ignored, and resources load normally without verification.
        </p>
      </section>
    </div>
  );
}
