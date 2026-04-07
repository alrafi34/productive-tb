import React from 'react';

export default function Base32EncoderSEOContent() {
  return (
    <div className="max-w-4xl mx-auto mt-16 px-4">
      <div className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Base32 Encoding</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">What is Base32?</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Base32 is a binary-to-text encoding scheme that uses a 32-character alphabet to represent binary data. 
              It's commonly used in 2FA (Two-Factor Authentication) systems, TOTP secrets, and applications where 
              case-insensitive encoding is required.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Use Cases</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• 2FA and TOTP secret keys</li>
              <li>• Legacy authentication protocols</li>
              <li>• Case-insensitive data encoding</li>
              <li>• Git object names and references</li>
              <li>• Network protocols and APIs</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Base32 Alphabet</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">RFC 4648 (Standard)</h4>
              <code className="text-sm bg-white px-3 py-2 rounded border block">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ234567
              </code>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Crockford Base32</h4>
              <code className="text-sm bg-white px-3 py-2 rounded border block">
                0123456789ABCDEFGHJKMNPQRSTVWXYZ
              </code>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-semibold text-gray-800 mb-1">Secure</h4>
            <p className="text-xs text-gray-600">100% client-side processing</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-gray-800 mb-1">Fast</h4>
            <p className="text-xs text-gray-600">Instant encoding and decoding</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold text-gray-800 mb-1">Accurate</h4>
            <p className="text-xs text-gray-600">RFC 4648 compliant</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Use auto-detect mode for quick conversion</li>
            <li>• Enable grouping for better readability</li>
            <li>• Crockford variant avoids confusing characters</li>
            <li>• Perfect for 2FA secret key management</li>
          </ul>
        </div>

        <div className="text-center text-xs text-gray-500 border-t pt-6">
          <p>
            This Base32 encoder/decoder tool processes all data locally in your browser. 
            No data is sent to external servers, ensuring complete privacy and security.
          </p>
        </div>
      </div>
    </div>
  );
}