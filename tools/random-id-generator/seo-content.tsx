import React from "react";

export default function RandomIDGeneratorSEOContent() {
  return (
    <div className="mt-12 space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          UUID / CUID Generator – Generate Unique IDs Instantly
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The UUID / CUID Generator is a free, browser-based tool that instantly
          generates unique identifiers for databases, APIs, testing, and
          distributed systems. Generate single or bulk IDs in multiple formats
          with zero server requests.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Why Use This Tool?</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-3">
            <span className="text-primary font-bold">✓</span>
            <span>
              <strong>Instant Generation:</strong> Create IDs in milliseconds
              without API calls
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold">✓</span>
            <span>
              <strong>Multiple Formats:</strong> UUID v1, UUID v4, CUID, and
              NanoID support
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold">✓</span>
            <span>
              <strong>Bulk Generation:</strong> Generate up to 10,000 IDs at
              once
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold">✓</span>
            <span>
              <strong>Multiple Output Formats:</strong> Plain list, comma
              separated, JSON, or SQL INSERT
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold">✓</span>
            <span>
              <strong>100% Private:</strong> All generation happens in your
              browser
            </span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">ID Types Explained</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">UUID v4 (Random)</h4>
            <p className="text-sm text-gray-700">
              The most common UUID format. Generates random 128-bit identifiers
              with extremely low collision probability. Perfect for general
              purpose use.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">UUID v1 (Time-based)</h4>
            <p className="text-sm text-gray-700">
              Generates IDs based on timestamp and machine identifier. Useful
              when you need sortable IDs or want to extract creation time.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">CUID</h4>
            <p className="text-sm text-gray-700">
              Collision-resistant IDs optimized for horizontal scaling. Shorter
              than UUIDs and designed for distributed systems.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">NanoID</h4>
            <p className="text-sm text-gray-700">
              Tiny, secure, URL-friendly unique string IDs. Smaller than UUIDs
              while maintaining security. Customizable length (10-64 chars).
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Use Cases</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>Database Testing:</strong> Generate test data with unique
            IDs
          </li>
          <li>
            <strong>API Development:</strong> Create mock request/response IDs
          </li>
          <li>
            <strong>Distributed Systems:</strong> Generate collision-resistant
            IDs
          </li>
          <li>
            <strong>Bulk Data Seeding:</strong> Create thousands of IDs for
            testing
          </li>
          <li>
            <strong>Microservices:</strong> Generate IDs for inter-service
            communication
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Output Formats</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Plain List</h4>
            <p className="text-xs text-gray-600 font-mono mb-2">
              One ID per line
            </p>
            <p className="text-sm text-gray-700">
              Simple newline-separated format. Easy to paste into spreadsheets
              or text files.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">Comma Separated</h4>
            <p className="text-xs text-gray-600 font-mono mb-2">
              id1, id2, id3
            </p>
            <p className="text-sm text-gray-700">
              Comma-separated values. Perfect for inline use in code or
              configuration.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">JSON Array</h4>
            <p className="text-xs text-gray-600 font-mono mb-2">
              ["id1", "id2", "id3"]
            </p>
            <p className="text-sm text-gray-700">
              Valid JSON array format. Ready to use in APIs and JavaScript.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">SQL INSERT</h4>
            <p className="text-xs text-gray-600 font-mono mb-2">
              INSERT INTO table VALUES (...)
            </p>
            <p className="text-sm text-gray-700">
              Ready-to-execute SQL INSERT statement for database seeding.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">FAQ</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">
              Are the IDs truly unique?
            </h4>
            <p className="text-sm text-gray-700">
              Yes. UUID v4 has a collision probability of 1 in 5.3 billion
              billion. CUID and NanoID are also collision-resistant for
              practical purposes.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">
              Is my data sent to a server?
            </h4>
            <p className="text-sm text-gray-700">
              No. All ID generation happens entirely in your browser using
              crypto.getRandomValues(). Nothing is logged or stored.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">
              Can I generate 10,000+ IDs?
            </h4>
            <p className="text-sm text-gray-700">
              Yes, up to 10,000 IDs. For larger batches, consider running the
              generation multiple times or using a backend service.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-1">
              Which ID type should I use?
            </h4>
            <p className="text-sm text-gray-700">
              Use UUID v4 for general purpose. Use CUID for distributed systems.
              Use NanoID for short, URL-friendly IDs. Use UUID v1 if you need
              sortable IDs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
