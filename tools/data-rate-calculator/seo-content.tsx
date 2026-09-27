import ToolFaq from "@/components/ToolFaq";
import { dataRateCalculatorConfig } from "./config";

export default function DataRateCalculatorSEO() {
  const { howToSteps, faq } = dataRateCalculatorConfig.seo;
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Data Rate Calculator
        </h2>
        <p className="mb-4">
          The Data Rate Calculator is a comprehensive tool for calculating data transmission rates, transfer speeds, and bandwidth in networks and communication systems. It helps engineers, students, and IT professionals understand and optimize data transfer performance.
        </p>
        <p>
          This calculator supports multiple calculation modes and unit conversions, making it perfect for network analysis, internet speed calculations, and communication system design.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Three calculation modes: Data & Time → Rate, Rate & Time → Data, Rate & Data → Time</li>
          <li>Support for Bytes, KB, MB, GB, TB data units</li>
          <li>Support for seconds, minutes, hours time units</li>
          <li>Support for B/s, KB/s, MB/s, GB/s rate units</li>
          <li>Real-time calculation with debounced input handling</li>
          <li>Adjustable decimal precision (2-8 decimal places)</li>
          <li>Common presets for typical scenarios</li>
          <li>Step-by-step calculation breakdown</li>
          <li>Calculation history with localStorage persistence</li>
          <li>Export results to text file</li>
          <li>Copy results to clipboard</li>
          <li>Responsive design for all devices</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Calculation Formulas
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Data Rate from Data and Time</h3>
            <p className="font-mono text-sm mb-2">Data Rate = Data Size / Time</p>
            <p className="text-sm text-gray-600">
              Calculate transmission speed when you know the amount of data and transfer time
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Data Size from Rate and Time</h3>
            <p className="font-mono text-sm mb-2">Data Size = Data Rate × Time</p>
            <p className="text-sm text-gray-600">
              Calculate how much data can be transferred at a given rate over time
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Time from Rate and Data</h3>
            <p className="font-mono text-sm mb-2">Time = Data Size / Data Rate</p>
            <p className="text-sm text-gray-600">
              Calculate how long it takes to transfer data at a specific rate
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Network Performance Analysis</h3>
            <p className="text-sm text-blue-800">
              Measure and analyze network throughput, bandwidth utilization, and transfer speeds.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Internet Speed Testing</h3>
            <p className="text-sm text-green-800">
              Understand download and upload speeds, verify ISP performance, and troubleshoot connectivity.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">File Transfer Planning</h3>
            <p className="text-sm text-purple-800">
              Estimate transfer times for backups, cloud uploads, and large file transfers.
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">Communication System Design</h3>
            <p className="text-sm text-orange-800">
              Design and optimize data communication systems, protocols, and network infrastructure.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: File Download</h3>
            <p className="text-sm mb-2">
              <strong>Input:</strong> Data = 100 MB, Time = 10 seconds
            </p>
            <p className="text-sm mb-2">
              <strong>Output:</strong> Data Rate = 10 MB/s
            </p>
            <p className="text-sm text-gray-600">
              A 100 MB file downloaded in 10 seconds indicates a transfer rate of 10 MB/s.
            </p>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Backup Time</h3>
            <p className="text-sm mb-2">
              <strong>Input:</strong> Data = 1 GB, Rate = 8 MB/s
            </p>
            <p className="text-sm mb-2">
              <strong>Output:</strong> Time = 128 seconds (2.13 minutes)
            </p>
            <p className="text-sm text-gray-600">
              Backing up 1 GB at 8 MB/s takes approximately 2 minutes.
            </p>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: Streaming Data</h3>
            <p className="text-sm mb-2">
              <strong>Input:</strong> Rate = 5 MB/s, Time = 1 hour
            </p>
            <p className="text-sm mb-2">
              <strong>Output:</strong> Data = 18 GB
            </p>
            <p className="text-sm text-gray-600">
              Streaming at 5 MB/s for 1 hour consumes 18 GB of data.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Data Rates
        </h2>
        <p className="mb-4">
          Data rate, also known as bit rate or bandwidth, measures how fast data is transmitted over a network or communication channel. It's typically expressed in bytes per second (B/s) or bits per second (bps).
        </p>
        <p className="mb-4">
          Understanding data rates is essential for:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Evaluating network performance and capacity</li>
          <li>Planning data transfers and backups</li>
          <li>Optimizing streaming and real-time applications</li>
          <li>Troubleshooting slow connections</li>
          <li>Designing communication systems</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Unit Conversions
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Data Size Units</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>1 KB = 1,024 Bytes</li>
            <li>1 MB = 1,024 KB = 1,048,576 Bytes</li>
            <li>1 GB = 1,024 MB = 1,073,741,824 Bytes</li>
            <li>1 TB = 1,024 GB = 1,099,511,627,776 Bytes</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips for Using the Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Use appropriate units to avoid extremely large or small numbers</li>
          <li>Increase decimal precision for more accurate results</li>
          <li>Save frequently used calculations to history for quick access</li>
          <li>Export results for documentation and reporting</li>
          <li>Use presets as starting points for common scenarios</li>
          <li>Verify results with step-by-step calculations</li>
          <li>Remember that actual transfer rates may vary due to network overhead</li>
        </ul>
      </section>

      <ToolFaq items={faq} />
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>How to Use the Data Rate Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
