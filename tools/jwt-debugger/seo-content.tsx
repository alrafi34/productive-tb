import { toolConfig } from "./config";

export default function JWTDebuggerSEOContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-700">
      <div className="prose prose-sm max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          About JWT Debugger
        </h2>
        
        <p className="mb-4">
          The JWT Debugger is a powerful online tool designed to help developers decode and inspect JSON Web Tokens instantly. Whether you're debugging authentication issues, testing OAuth implementations, or analyzing token claims, this tool provides instant insights into your JWT structure.
        </p>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          What is a JWT?
        </h3>
        <p className="mb-4">
          A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. It consists of three Base64URL-encoded parts separated by dots: header, payload, and signature.
        </p>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Key Features
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Instant JWT token decoding</li>
          <li>Header and payload inspection</li>
          <li>Expiration time conversion and detection</li>
          <li>Claim analysis and highlighting</li>
          <li>Token status indicator (valid/expired)</li>
          <li>Copy decoded sections to clipboard</li>
          <li>Base64URL visualization</li>
          <li>JSON syntax highlighting</li>
          <li>Local history tracking</li>
          <li>100% client-side processing</li>
        </ul>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          How to Use
        </h3>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>Paste your JWT token into the input area</li>
          <li>The tool automatically decodes and displays the header and payload</li>
          <li>View token analysis including expiration time and claims</li>
          <li>Copy any section to your clipboard</li>
          <li>Check token status (valid/expired)</li>
        </ol>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          JWT Structure
        </h3>
        <p className="mb-4">
          A JWT consists of three parts:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Header:</strong> Contains token type and hashing algorithm</li>
          <li><strong>Payload:</strong> Contains claims (user data, expiration, etc.)</li>
          <li><strong>Signature:</strong> Ensures token integrity and authenticity</li>
        </ul>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Common JWT Claims
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>exp:</strong> Expiration time (Unix timestamp)</li>
          <li><strong>iat:</strong> Issued at time (Unix timestamp)</li>
          <li><strong>nbf:</strong> Not before time (Unix timestamp)</li>
          <li><strong>iss:</strong> Issuer of the token</li>
          <li><strong>aud:</strong> Audience (intended recipient)</li>
          <li><strong>sub:</strong> Subject (user identifier)</li>
          <li><strong>jti:</strong> JWT ID (unique identifier)</li>
        </ul>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Use Cases
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>API Developers:</strong> Debug authentication tokens</li>
          <li><strong>Backend Engineers:</strong> Inspect token claims and expiration</li>
          <li><strong>Security Testing:</strong> Analyze token structure and validity</li>
          <li><strong>OAuth Implementation:</strong> Verify token format and claims</li>
          <li><strong>Troubleshooting:</strong> Identify token-related issues</li>
        </ul>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Privacy & Security
        </h3>
        <p className="mb-4">
          All JWT decoding is performed entirely in your browser. Your tokens are never sent to any server or stored on external systems. This ensures complete privacy and security for sensitive authentication tokens.
        </p>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Tips for Best Results
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Use the example tokens to understand JWT structure</li>
          <li>Check the expiration time to verify token validity</li>
          <li>Review all claims to understand token permissions</li>
          <li>Use the history feature to track recently decoded tokens</li>
          <li>Copy decoded sections for documentation or debugging</li>
        </ul>
      </div>
    </div>
  );
}
