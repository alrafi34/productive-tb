import { toolConfig } from "./config";

export default function SQLFormatterSEOContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-700">
      <div className="prose prose-sm max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          About SQL Formatter
        </h2>
        
        <p className="mb-4">
          The SQL Formatter is a powerful online tool designed to help developers, database administrators, and data analysts format and beautify SQL queries instantly. Whether you're working with messy, minified, or poorly structured SQL code, this tool transforms it into clean, readable, and well-organized queries.
        </p>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Key Features
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Real-time SQL formatting with instant preview</li>
          <li>Support for multiple SQL dialects (MySQL, PostgreSQL, SQLite, SQL Server)</li>
          <li>Uppercase and lowercase keyword options</li>
          <li>Column alignment for better readability</li>
          <li>SQL minification for compact queries</li>
          <li>Query statistics and analysis</li>
          <li>Copy to clipboard functionality</li>
          <li>Local history tracking</li>
          <li>100% client-side processing - no data sent to servers</li>
        </ul>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          How to Use
        </h3>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>Paste your SQL query into the input area</li>
          <li>Select your SQL dialect from the dropdown</li>
          <li>Choose formatting options (uppercase keywords, column alignment)</li>
          <li>Click "Format SQL" to beautify your query</li>
          <li>Copy the formatted result to your clipboard</li>
        </ol>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Use Cases
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Backend Developers:</strong> Format complex queries for better code review</li>
          <li><strong>Database Administrators:</strong> Standardize SQL formatting across projects</li>
          <li><strong>Data Analysts:</strong> Make queries more readable for documentation</li>
          <li><strong>Students:</strong> Learn proper SQL formatting conventions</li>
          <li><strong>Debugging:</strong> Identify issues in poorly formatted queries</li>
        </ul>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Supported SQL Dialects
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Generic SQL:</strong> Standard SQL syntax</li>
          <li><strong>MySQL:</strong> MySQL-specific syntax and functions</li>
          <li><strong>PostgreSQL:</strong> PostgreSQL-specific features</li>
          <li><strong>SQLite:</strong> SQLite-compatible queries</li>
          <li><strong>SQL Server:</strong> T-SQL syntax support</li>
        </ul>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Privacy & Security
        </h3>
        <p className="mb-4">
          All SQL formatting is performed entirely in your browser. Your queries are never sent to any server or stored on external systems. This ensures complete privacy and security for sensitive database queries.
        </p>

        <h3 className="text-lg font-semibold mb-3 text-gray-900">
          Tips for Best Results
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Use the example queries to understand formatting patterns</li>
          <li>Enable "Align Columns" for SELECT statements with many columns</li>
          <li>Use uppercase keywords for consistency with SQL standards</li>
          <li>Check the query statistics to understand query complexity</li>
          <li>Use minify option to reduce query size for transmission</li>
        </ul>
      </div>
    </div>
  );
}
