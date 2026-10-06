import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";
export default function UserAgentParserSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;
  return (
    <>
      <div className="mt-16 prose prose-gray max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            User Agent Parser – Browser Detection Made Simple
          </h2>
          
          <div className="space-y-6 text-gray-700">
            <p>
              The User Agent Parser is an essential developer tool that instantly analyzes User-Agent strings 
              to extract detailed information about browsers, operating systems, devices, and rendering engines. 
              Perfect for QA testing, browser compatibility debugging, and web analytics validation.
            </p>
  
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              What is a User-Agent String?
            </h3>
            <p>
              A User-Agent string is a text identifier that web browsers send to websites, containing information 
              about the browser type, version, operating system, and device. This tool parses that string into 
              human-readable components for easy analysis.
            </p>
  
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Key Features
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Automatic Detection:</strong> Instantly shows your current browser information on page load</li>
              <li><strong>Manual Testing:</strong> Test any User-Agent string for compatibility debugging</li>
              <li><strong>Comprehensive Parsing:</strong> Extracts browser, OS, device type, and rendering engine</li>
              <li><strong>Export Options:</strong> Copy results as JSON or plain text for documentation</li>
              <li><strong>History Tracking:</strong> Keeps track of recently parsed User-Agent strings</li>
              <li><strong>Example Library:</strong> Quick-test common browser/device combinations</li>
            </ul>
  
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Perfect for Developers and QA Teams
            </h3>
            <p>
              This tool is invaluable for web developers, QA testers, and support teams who need to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Debug browser-specific compatibility issues</li>
              <li>Test responsive design across different devices</li>
              <li>Validate analytics and tracking implementations</li>
              <li>Document browser support for bug reports</li>
              <li>Understand user environment for support tickets</li>
            </ul>
  
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Privacy & Security
            </h3>
            <p>
              We do not collect or store what you enter.
            </p>
  
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
              <p className="text-blue-800 text-sm">
                Use this tool during cross-browser testing to quickly identify which browser and version 
                your users are experiencing issues with. The parsed information can be invaluable for 
                bug reports and compatibility documentation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>How to Use the User Agent Parser</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>
      <ToolFaq items={faq} />
    </>
  );
}