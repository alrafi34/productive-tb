export default function HttpStatusCodeLookupSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete HTTP Status Code Reference Guide</h2>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What are HTTP Status Codes?</h3>
            <p className="text-gray-700 mb-4">
              HTTP status codes are three-digit numbers returned by web servers to indicate the result of a client's request. 
              They provide essential information about whether a request was successful, encountered an error, or requires 
              additional action. Understanding these codes is crucial for web developers, API engineers, and anyone working 
              with web technologies.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">HTTP Status Code Categories</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">1xx - Informational</h4>
                <p className="text-sm text-blue-800">
                  Indicates that the request was received and understood. These are interim responses 
                  used to inform the client that the initial part of the request has been received.
                </p>
                <div className="mt-2 text-xs text-blue-700">
                  Examples: 100 Continue, 101 Switching Protocols
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">2xx - Success</h4>
                <p className="text-sm text-green-800">
                  Indicates that the client's request was successfully received, understood, and accepted. 
                  These are the codes you want to see in your applications.
                </p>
                <div className="mt-2 text-xs text-green-700">
                  Examples: 200 OK, 201 Created, 204 No Content
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">3xx - Redirection</h4>
                <p className="text-sm text-yellow-800">
                  Indicates that further action needs to be taken by the client to complete the request. 
                  Usually involves redirecting to a different URL.
                </p>
                <div className="mt-2 text-xs text-yellow-700">
                  Examples: 301 Moved Permanently, 302 Found, 304 Not Modified
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">4xx - Client Error</h4>
                <p className="text-sm text-orange-800">
                  Indicates that the client seems to have made an error. The request contains bad syntax 
                  or cannot be fulfilled by the server.
                </p>
                <div className="mt-2 text-xs text-orange-700">
                  Examples: 400 Bad Request, 401 Unauthorized, 404 Not Found
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg md:col-span-2">
                <h4 className="font-semibold text-red-900 mb-2">5xx - Server Error</h4>
                <p className="text-sm text-red-800">
                  Indicates that the server failed to fulfill an apparently valid request. These errors 
                  originate from the server side and are not the client's fault.
                </p>
                <div className="mt-2 text-xs text-red-700">
                  Examples: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Most Common HTTP Status Codes</h3>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900">200 OK</h4>
                <p className="text-sm text-gray-700 mt-1">
                  The most common success status. Indicates that the request has succeeded and the server 
                  has returned the requested data.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900">404 Not Found</h4>
                <p className="text-sm text-gray-700 mt-1">
                  The most famous error code. Indicates that the server cannot find the requested resource. 
                  Often seen when accessing broken links or deleted pages.
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900">500 Internal Server Error</h4>
                <p className="text-sm text-gray-700 mt-1">
                  A generic server error indicating that something went wrong on the server side, 
                  but the server couldn't be more specific about the error condition.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Why HTTP Status Codes Matter</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>API Development:</strong> Proper status codes help clients understand request outcomes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>SEO:</strong> Search engines use status codes to understand page availability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Debugging:</strong> Status codes provide immediate insight into what went wrong</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>User Experience:</strong> Proper error handling improves user satisfaction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Monitoring:</strong> Status codes help track application health and performance</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Best Practices for HTTP Status Codes</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700">
                <li><strong>Be Specific:</strong> Use the most appropriate status code for each situation</li>
                <li><strong>Consistency:</strong> Use the same status codes for similar scenarios across your API</li>
                <li><strong>Documentation:</strong> Document which status codes your API returns and when</li>
                <li><strong>Error Messages:</strong> Include helpful error messages in the response body</li>
                <li><strong>Testing:</strong> Test that your application returns correct status codes</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tool Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Search & Filter</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Instant search by code number or keyword</li>
                  <li>• Category filtering (1xx-5xx)</li>
                  <li>• Fuzzy search across descriptions</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Developer Tools</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Copy code information to clipboard</li>
                  <li>• Export detailed code explanations</li>
                  <li>• Recent codes history</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}