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

export const httpCodes: HttpStatusCode[] = [
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