export interface HttpStatusCode {
  code: number;
  name: string;
  category: string;
  description: string;
  useCase: string;
  example: string;
}

export interface RecentCode {
  id: string;
  code: HttpStatusCode;
  timestamp: number;
}

const codeList: HttpStatusCode[] = [
  {
    code: 103,
    name: "Early Hints",
    category: "Informational",
    description: "Sent before the final response so the browser can start preloading resources listed in Link headers while the server prepares the page.",
    useCase: "Speeding up page loads by letting the browser fetch CSS, fonts or scripts early.",
    example: "HTTP/1.1 103 Early Hints\nLink: </style.css>; rel=preload; as=style"
  },
  {
    code: 203,
    name: "Non-Authoritative Information",
    category: "Success",
    description: "The request succeeded, but a transforming proxy modified the returned content from the origin server's 200 response.",
    useCase: "Proxies or gateways that alter headers or content before passing it on.",
    example: "GET /page → 203 Non-Authoritative Information"
  },
  {
    code: 205,
    name: "Reset Content",
    category: "Success",
    description: "The request succeeded and the client should reset the document view, for example clear a form.",
    useCase: "Clearing a form after a successful submission so the user can enter new data.",
    example: "POST /form → 205 Reset Content"
  },
  {
    code: 206,
    name: "Partial Content",
    category: "Success",
    description: "The server is returning only the byte range the client asked for with a Range header.",
    useCase: "Resuming downloads and streaming video or audio in chunks.",
    example: "GET /video.mp4\nRange: bytes=0-1023\n\nHTTP/1.1 206 Partial Content\nContent-Range: bytes 0-1023/146515"
  },
  {
    code: 207,
    name: "Multi-Status",
    category: "Success",
    description: "WebDAV: the body contains separate status codes for several independent operations.",
    useCase: "WebDAV requests that act on several files at once.",
    example: "PROPFIND /folder → 207 Multi-Status"
  },
  {
    code: 208,
    name: "Already Reported",
    category: "Success",
    description: "WebDAV: members of a binding were already listed earlier in the same multi-status response and are not repeated.",
    useCase: "Avoiding repeated entries in WebDAV collection listings.",
    example: "PROPFIND /folder → 208 Already Reported"
  },
  {
    code: 226,
    name: "IM Used",
    category: "Success",
    description: "The server fulfilled a GET request and the response is the result of instance manipulations (delta encoding) applied to the current resource.",
    useCase: "Sending only the changes to a resource instead of the whole resource (RFC 3229).",
    example: "GET /feed\nA-IM: feed\n\nHTTP/1.1 226 IM Used"
  },
  {
    code: 300,
    name: "Multiple Choices",
    category: "Redirection",
    description: "The resource has several representations and the client or user should choose one.",
    useCase: "Offering the same document in several formats or languages.",
    example: "GET /document → 300 Multiple Choices"
  },
  {
    code: 303,
    name: "See Other",
    category: "Redirection",
    description: "The response is at another URL and must be fetched with GET, regardless of the original method.",
    useCase: "Redirecting to a confirmation page after a form POST (Post/Redirect/Get pattern).",
    example: "POST /order → 303 See Other\nLocation: /order/123/confirmation"
  },
  {
    code: 402,
    name: "Payment Required",
    category: "Client Error",
    description: "Reserved for future use; some APIs use it when a paid plan, credits or a payment is needed.",
    useCase: "APIs signalling that a subscription has expired or a quota needs payment.",
    example: "GET /api/premium → 402 Payment Required"
  },
  {
    code: 406,
    name: "Not Acceptable",
    category: "Client Error",
    description: "The server cannot produce a response matching the Accept headers sent by the client.",
    useCase: "A client asking only for XML from an API that returns JSON.",
    example: "GET /api/data\nAccept: application/xml\n\n→ 406 Not Acceptable"
  },
  {
    code: 407,
    name: "Proxy Authentication Required",
    category: "Client Error",
    description: "The client must authenticate with the proxy before the request can go through.",
    useCase: "Corporate networks where a proxy requires a login.",
    example: "GET http://example.com/ → 407 Proxy Authentication Required\nProxy-Authenticate: Basic"
  },
  {
    code: 408,
    name: "Request Timeout",
    category: "Client Error",
    description: "The server timed out waiting for the client to finish sending the request.",
    useCase: "Slow or dropped connections while a request is being sent.",
    example: "POST /upload (client stalls) → 408 Request Timeout"
  },
  {
    code: 410,
    name: "Gone",
    category: "Client Error",
    description: "The resource was deliberately removed and will not come back; unlike 404, this is permanent.",
    useCase: "Deleted products, expired offers or retired API versions. Search engines drop 410 pages faster than 404s.",
    example: "GET /old-promo → 410 Gone"
  },
  {
    code: 411,
    name: "Length Required",
    category: "Client Error",
    description: "The server refuses the request because it has no Content-Length header.",
    useCase: "Servers that need the body size before accepting an upload.",
    example: "POST /upload (no Content-Length) → 411 Length Required"
  },
  {
    code: 412,
    name: "Precondition Failed",
    category: "Client Error",
    description: "A condition in the request headers, such as If-Match or If-Unmodified-Since, was not met.",
    useCase: "Preventing lost updates when two clients edit the same resource.",
    example: "PUT /doc/1\nIf-Match: \"v1\"\n\n→ 412 Precondition Failed"
  },
  {
    code: 413,
    name: "Content Too Large",
    category: "Client Error",
    description: "The request body is larger than the server allows. Formerly called Payload Too Large.",
    useCase: "File uploads over the size limit.",
    example: "POST /upload (200 MB) → 413 Content Too Large"
  },
  {
    code: 414,
    name: "URI Too Long",
    category: "Client Error",
    description: "The URL is longer than the server is willing to process.",
    useCase: "Very long query strings, often from a GET that should be a POST.",
    example: "GET /search?q=… (10,000 characters) → 414 URI Too Long"
  },
  {
    code: 415,
    name: "Unsupported Media Type",
    category: "Client Error",
    description: "The server does not accept the format of the request body given in Content-Type.",
    useCase: "Sending XML or form data to an endpoint that only accepts JSON.",
    example: "POST /api/users\nContent-Type: text/plain\n\n→ 415 Unsupported Media Type"
  },
  {
    code: 416,
    name: "Range Not Satisfiable",
    category: "Client Error",
    description: "The byte range asked for in the Range header is outside the size of the resource.",
    useCase: "Resuming a download from an offset past the end of the file.",
    example: "GET /file.zip\nRange: bytes=99999999-\n\n→ 416 Range Not Satisfiable"
  },
  {
    code: 417,
    name: "Expectation Failed",
    category: "Client Error",
    description: "The server cannot meet the requirement in the request's Expect header.",
    useCase: "A server that does not support Expect: 100-continue.",
    example: "PUT /file\nExpect: 100-continue\n\n→ 417 Expectation Failed"
  },
  {
    code: 418,
    name: "I'm a teapot",
    category: "Client Error",
    description: "An April Fools' joke from RFC 2324 (Hyper Text Coffee Pot Control Protocol); the server refuses to brew coffee because it is a teapot.",
    useCase: "Easter eggs; some services use it to reject requests they want to ignore.",
    example: "BREW /pot → 418 I'm a teapot"
  },
  {
    code: 421,
    name: "Misdirected Request",
    category: "Client Error",
    description: "The request reached a server that cannot produce a response for this host and scheme.",
    useCase: "HTTP/2 connection reuse across domains that share a certificate but not a server.",
    example: "GET https://other.example.com/ (reused connection) → 421 Misdirected Request"
  },
  {
    code: 423,
    name: "Locked",
    category: "Client Error",
    description: "WebDAV: the resource is locked.",
    useCase: "Editing a file another user has locked.",
    example: "PUT /docs/report.docx → 423 Locked"
  },
  {
    code: 424,
    name: "Failed Dependency",
    category: "Client Error",
    description: "WebDAV: the request failed because an earlier request it depended on failed.",
    useCase: "Batch WebDAV operations where one step fails.",
    example: "PROPPATCH /file → 424 Failed Dependency"
  },
  {
    code: 425,
    name: "Too Early",
    category: "Client Error",
    description: "The server will not process a request that might be replayed, sent in TLS 1.3 early data.",
    useCase: "Protecting non-idempotent requests from replay attacks.",
    example: "POST /pay (TLS early data) → 425 Too Early"
  },
  {
    code: 426,
    name: "Upgrade Required",
    category: "Client Error",
    description: "The server refuses the request over the current protocol and names the one to switch to in the Upgrade header.",
    useCase: "Requiring clients to move to a newer TLS or HTTP version.",
    example: "GET / → 426 Upgrade Required\nUpgrade: HTTP/2"
  },
  {
    code: 428,
    name: "Precondition Required",
    category: "Client Error",
    description: "The server requires the request to be conditional, for example with If-Match.",
    useCase: "APIs that insist on If-Match to avoid lost updates.",
    example: "PUT /doc/1 (no If-Match) → 428 Precondition Required"
  },
  {
    code: 431,
    name: "Request Header Fields Too Large",
    category: "Client Error",
    description: "A single header or all headers together are too large.",
    useCase: "Oversized cookies, often after a site sets too many.",
    example: "GET / (8 KB Cookie header) → 431 Request Header Fields Too Large"
  },
  {
    code: 451,
    name: "Unavailable For Legal Reasons",
    category: "Client Error",
    description: "The server cannot provide the resource for legal reasons, such as a court order or government block.",
    useCase: "Content blocked in a country, for example by a court order.",
    example: "GET /article → 451 Unavailable For Legal Reasons"
  },
  {
    code: 505,
    name: "HTTP Version Not Supported",
    category: "Server Error",
    description: "The server does not support the HTTP version used in the request.",
    useCase: "Old clients or unusual protocol versions.",
    example: "GET / HTTP/3.0 → 505 HTTP Version Not Supported"
  },
  {
    code: 506,
    name: "Variant Also Negotiates",
    category: "Server Error",
    description: "The server's content negotiation is misconfigured: the chosen variant is itself set up to negotiate.",
    useCase: "A configuration error in transparent content negotiation.",
    example: "GET /doc → 506 Variant Also Negotiates"
  },
  {
    code: 507,
    name: "Insufficient Storage",
    category: "Server Error",
    description: "WebDAV: the server cannot store what is needed to complete the request.",
    useCase: "Uploading to a server or account that is out of disk space.",
    example: "PUT /files/big.iso → 507 Insufficient Storage"
  },
  {
    code: 508,
    name: "Loop Detected",
    category: "Server Error",
    description: "WebDAV: the server found an infinite loop while processing the request.",
    useCase: "Circular bindings in a WebDAV collection.",
    example: "PROPFIND /folder (Depth: infinity) → 508 Loop Detected"
  },
  {
    code: 510,
    name: "Not Extended",
    category: "Server Error",
    description: "Further extensions to the request are needed for the server to fulfil it (RFC 2774, now historic).",
    useCase: "Rarely seen; an experimental HTTP extension framework.",
    example: "GET /resource → 510 Not Extended"
  },
  {
    code: 511,
    name: "Network Authentication Required",
    category: "Server Error",
    description: "The client must authenticate to get network access; usually sent by a captive portal.",
    useCase: "Hotel, airport and café Wi-Fi login pages.",
    example: "GET http://example.com/ → 511 Network Authentication Required"
  },

  // 1xx Informational
  {
    code: 100,
    name: "Continue",
    category: "Informational",
    description: "The server has received the request headers and the client should proceed to send the request body.",
    useCase: "Used with large file uploads when the client needs confirmation before sending the body.",
    example: "POST /upload HTTP/1.1\nExpect: 100-continue\n\nHTTP/1.1 100 Continue"
  },
  {
    code: 101,
    name: "Switching Protocols",
    category: "Informational",
    description: "The requester has asked the server to switch protocols and the server has agreed to do so.",
    useCase: "Used when upgrading from HTTP to WebSocket or HTTP/2.",
    example: "GET /chat HTTP/1.1\nUpgrade: websocket\n\nHTTP/1.1 101 Switching Protocols"
  },
  {
    code: 102,
    name: "Processing",
    category: "Informational",
    description: "The server has received and is processing the request, but no response is available yet.",
    useCase: "Used in WebDAV to indicate that the server is processing a complex request.",
    example: "PROPFIND /folder HTTP/1.1\n\nHTTP/1.1 102 Processing"
  },

  // 2xx Success
  {
    code: 200,
    name: "OK",
    category: "Success",
    description: "The request succeeded. The meaning of success depends on the HTTP method.",
    useCase: "Standard response for successful HTTP requests.",
    example: "GET /api/users → 200 OK\n{\"users\": [{\"id\": 1, \"name\": \"John\"}]}"
  },
  {
    code: 201,
    name: "Created",
    category: "Success",
    description: "The request succeeded, and a new resource was created as a result.",
    useCase: "Returned when a POST request successfully creates a new resource.",
    example: "POST /api/users → 201 Created\nLocation: /api/users/123"
  },
  {
    code: 202,
    name: "Accepted",
    category: "Success",
    description: "The request has been accepted for processing, but the processing has not been completed.",
    useCase: "Used for asynchronous processing where the request is queued for later execution.",
    example: "POST /api/process-video → 202 Accepted\n{\"job_id\": \"abc123\"}"
  },
  {
    code: 204,
    name: "No Content",
    category: "Success",
    description: "The server successfully processed the request, but is not returning any content.",
    useCase: "Common response for DELETE requests or PUT requests that don't return data.",
    example: "DELETE /api/users/123 → 204 No Content"
  },

  // 3xx Redirection
  {
    code: 301,
    name: "Moved Permanently",
    category: "Redirection",
    description: "The URL of the requested resource has been changed permanently.",
    useCase: "Used when a page has permanently moved to a new URL for SEO purposes.",
    example: "GET /old-page → 301 Moved Permanently\nLocation: /new-page"
  },
  {
    code: 302,
    name: "Found",
    category: "Redirection",
    description: "The URI of requested resource has been changed temporarily.",
    useCase: "Temporary redirects, such as during maintenance or A/B testing.",
    example: "GET /login → 302 Found\nLocation: /auth/signin"
  },
  {
    code: 304,
    name: "Not Modified",
    category: "Redirection",
    description: "The resource has not been modified since the version specified by the request headers.",
    useCase: "Used for caching - tells the client to use their cached version.",
    example: "GET /api/data\nIf-None-Match: \"abc123\" → 304 Not Modified"
  },
  {
    code: 307,
    name: "Temporary Redirect",
    category: "Redirection",
    description: "The request should be repeated with another URI, but future requests should still use the original URI.",
    useCase: "Similar to 302 but guarantees that the method and body won't be changed.",
    example: "POST /api/submit → 307 Temporary Redirect\nLocation: /api/submit-v2"
  },
  {
    code: 308,
    name: "Permanent Redirect",
    category: "Redirection",
    description: "The request and all future requests should be repeated using another URI.",
    useCase: "Similar to 301 but guarantees that the method and body won't be changed.",
    example: "POST /api/old → 308 Permanent Redirect\nLocation: /api/new"
  },

  // 4xx Client Errors
  {
    code: 400,
    name: "Bad Request",
    category: "Client Error",
    description: "The server cannot or will not process the request due to an apparent client error.",
    useCase: "Invalid JSON, missing required fields, or malformed request syntax.",
    example: "POST /api/users\n{\"invalid\": json} → 400 Bad Request"
  },
  {
    code: 401,
    name: "Unauthorized",
    category: "Client Error",
    description: "The client must authenticate itself to get the requested response.",
    useCase: "Missing or invalid authentication credentials.",
    example: "GET /api/profile → 401 Unauthorized\nWWW-Authenticate: Bearer"
  },
  {
    code: 403,
    name: "Forbidden",
    category: "Client Error",
    description: "The client does not have access rights to the content.",
    useCase: "User is authenticated but doesn't have permission to access the resource.",
    example: "DELETE /api/admin/users → 403 Forbidden\n{\"error\": \"Insufficient permissions\"}"
  },
  {
    code: 404,
    name: "Not Found",
    category: "Client Error",
    description: "The server cannot find the requested resource.",
    useCase: "Requested page, API endpoint, or resource does not exist.",
    example: "GET /api/users/999 → 404 Not Found\n{\"error\": \"User not found\"}"
  },
  {
    code: 405,
    name: "Method Not Allowed",
    category: "Client Error",
    description: "The request method is known by the server but is not supported by the target resource.",
    useCase: "Using POST on a GET-only endpoint, or DELETE on a read-only resource.",
    example: "POST /api/users/123 → 405 Method Not Allowed\nAllow: GET, PUT"
  },
  {
    code: 409,
    name: "Conflict",
    category: "Client Error",
    description: "The request conflicts with the current state of the server.",
    useCase: "Trying to create a resource that already exists or version conflicts.",
    example: "POST /api/users\n{\"email\": \"existing@example.com\"} → 409 Conflict"
  },
  {
    code: 422,
    name: "Unprocessable Entity",
    category: "Client Error",
    description: "The request was well-formed but was unable to be followed due to semantic errors.",
    useCase: "Validation errors in API requests with correct syntax but invalid data.",
    example: "POST /api/users\n{\"age\": -5} → 422 Unprocessable Entity"
  },
  {
    code: 429,
    name: "Too Many Requests",
    category: "Client Error",
    description: "The user has sent too many requests in a given amount of time.",
    useCase: "Rate limiting to prevent abuse or overload.",
    example: "GET /api/data → 429 Too Many Requests\nRetry-After: 60"
  },

  // 5xx Server Errors
  {
    code: 500,
    name: "Internal Server Error",
    category: "Server Error",
    description: "The server has encountered a situation it does not know how to handle.",
    useCase: "Generic server error when something goes wrong on the backend.",
    example: "GET /api/users → 500 Internal Server Error\n{\"error\": \"Database connection failed\"}"
  },
  {
    code: 501,
    name: "Not Implemented",
    category: "Server Error",
    description: "The request method is not supported by the server and cannot be handled.",
    useCase: "Server doesn't support the functionality required to fulfill the request.",
    example: "PATCH /api/users → 501 Not Implemented"
  },
  {
    code: 502,
    name: "Bad Gateway",
    category: "Server Error",
    description: "The server, while working as a gateway, received an invalid response from the upstream server.",
    useCase: "Proxy server received invalid response from backend server.",
    example: "GET /api/data → 502 Bad Gateway\n(nginx can't reach backend)"
  },
  {
    code: 503,
    name: "Service Unavailable",
    category: "Server Error",
    description: "The server is not ready to handle the request, often due to maintenance or overload.",
    useCase: "Server maintenance, overload, or temporary unavailability.",
    example: "GET /api/users → 503 Service Unavailable\nRetry-After: 3600"
  },
  {
    code: 504,
    name: "Gateway Timeout",
    category: "Server Error",
    description: "The server is acting as a gateway and did not receive a timely response from the upstream server.",
    useCase: "Proxy server timeout waiting for response from backend.",
    example: "GET /api/slow-process → 504 Gateway Timeout"
  }
];

// Registered IANA codes in numeric order
export const httpCodes: HttpStatusCode[] = [...codeList].sort((a, b) => a.code - b.code);

export const commonCodes = [200, 201, 301, 302, 400, 401, 403, 404, 429, 500, 502, 503];

export const categories = [
  "All",
  "Informational",
  "Success", 
  "Redirection",
  "Client Error",
  "Server Error"
];

export function searchCodes(query: string, category: string = "All"): HttpStatusCode[] {
  const q = query.toLowerCase().trim();
  
  let filtered = httpCodes;
  
  // Filter by category
  if (category !== "All") {
    filtered = filtered.filter(code => code.category === category);
  }
  
  // If no query, return all in category
  if (!q) {
    return filtered;
  }
  
  // Search by code number, name, description, or use case
  return filtered.filter(code =>
    code.code.toString().includes(q) ||
    code.name.toLowerCase().includes(q) ||
    code.description.toLowerCase().includes(q) ||
    code.useCase.toLowerCase().includes(q)
  );
}

export function getCodeByNumber(codeNumber: number): HttpStatusCode | undefined {
  return httpCodes.find(code => code.code === codeNumber);
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text)
    .then(() => true)
    .catch(() => false);
}

export function saveToRecent(code: HttpStatusCode): void {
  const recent = getRecentCodes();
  const newItem: RecentCode = {
    id: crypto.randomUUID(),
    code,
    timestamp: Date.now()
  };
  
  // Remove duplicates and keep only last 10
  const filtered = recent.filter(item => item.code.code !== code.code);
  const updated = [newItem, ...filtered].slice(0, 10);
  
  localStorage.setItem('http-codes-recent', JSON.stringify(updated));
}

export function getRecentCodes(): RecentCode[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('http-codes-recent');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearRecentCodes(): void {
  localStorage.removeItem('http-codes-recent');
}

export function exportCodeInfo(code: HttpStatusCode): void {
  const content = `HTTP ${code.code} ${code.name}

Category: ${code.category}

Description:
${code.description}

Use Case:
${code.useCase}

Example:
${code.example}`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `http-${code.code}-${code.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}