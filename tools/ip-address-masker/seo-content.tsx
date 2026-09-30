import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function IPAddressMaskerSEOContent() {
  // Same questions as the FAQPage schema
  const { faq } = toolConfig.seo;
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the IP Address Masker Tool
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Enter an IP address and CIDR or subnet mask</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>View instant calculations of network ranges</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Copy results or practice with random exercises</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Available Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                IP to CIDR conversion
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Network range calculator
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Interactive practice mode
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Batch IP processing
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Hosts calculator
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our IP Address Masker?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Calculations</h3>
            <p className="text-gray-600 text-sm">Real-time subnet calculations as you type with no delays</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">Practice Mode</h3>
            <p className="text-gray-600 text-sm">Learn subnetting with interactive exercises and instant feedback</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-800 mb-2">Batch Processing</h3>
            <p className="text-gray-600 text-sm">Process multiple IP addresses simultaneously for network planning</p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">For Students</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Practice subnetting for networking certifications (CCNA, Network+)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Understand IP addressing and subnet masks</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Visualize network ranges and boundaries</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Complete homework and lab assignments</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">For IT Professionals</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Plan network infrastructure and IP allocation</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Calculate subnet requirements for new networks</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Troubleshoot network connectivity issues</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Document network configurations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
