export default function YAMLToJSONSEOContent() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          YAML to JSON Converter
        </h2>
        <p className="mb-4">
          Convert YAML configuration files to JSON format instantly. Perfect for DevOps engineers, backend developers, and anyone working with configuration management systems.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Why Convert YAML to JSON?
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Many APIs and systems require JSON format</li>
          <li>Easier integration with JavaScript/Node.js applications</li>
          <li>Better compatibility with web services</li>
          <li>Simplified data processing and validation</li>
          <li>Standardized format for data exchange</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Common Use Cases
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Converting Kubernetes manifests to JSON</li>
          <li>Transforming Docker Compose files</li>
          <li>Processing CI/CD pipeline configurations</li>
          <li>Converting Ansible playbooks</li>
          <li>Migrating configuration files between systems</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Features
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Real-time YAML validation</li>
          <li>Instant conversion to JSON</li>
          <li>Customizable indentation (2 spaces, 4 spaces, or tabs)</li>
          <li>JSON minification support</li>
          <li>Copy to clipboard functionality</li>
          <li>Download as JSON file</li>
          <li>Drag and drop file support</li>
          <li>Error detection with line numbers</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          How to Use
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Paste your YAML content in the input area</li>
          <li>Or drag and drop a YAML/YML file</li>
          <li>Choose your preferred indentation style</li>
          <li>View the converted JSON instantly</li>
          <li>Copy or download the result</li>
        </ol>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Example Conversion
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">YAML Input:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`server:
  host: localhost
  port: 8080
database:
  name: mydb
  user: admin`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">JSON Output:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`{
  "server": {
    "host": "localhost",
    "port": 8080
  },
  "database": {
    "name": "mydb",
    "user": "admin"
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Tips & Best Practices
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Ensure proper YAML indentation (spaces, not tabs)</li>
          <li>Use consistent key naming conventions</li>
          <li>Validate YAML syntax before conversion</li>
          <li>Test converted JSON with your application</li>
          <li>Use minified JSON for production APIs</li>
        </ul>
      </section>
    </div>
  );
}
