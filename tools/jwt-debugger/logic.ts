export interface JWTDecoded {
  header: Record<string, any> | null;
  payload: Record<string, any> | null;
  signature: string;
  isValid: boolean;
  error?: string;
}

export interface TokenAnalysis {
  isExpired: boolean;
  expirationTime?: string;
  issuedAt?: string;
  notBefore?: string;
  issuer?: string;
  audience?: string;
  subject?: string;
  claims: string[];
}

const COMMON_CLAIMS = ["exp", "iat", "nbf", "iss", "aud", "sub", "jti", "typ"];

function base64UrlDecode(str: string): string {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("Invalid base64url string");
  }
  try {
    return decodeURIComponent(
      atob(output)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (e) {
    throw new Error("Failed to decode base64url");
  }
}

export function decodeJWT(token: string): JWTDecoded {
  if (!token || typeof token !== "string") {
    return {
      header: null,
      payload: null,
      signature: "",
      isValid: false,
      error: "Token is empty",
    };
  }

  const parts = token.trim().split(".");

  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: "",
      isValid: false,
      error: "Invalid JWT format. Token must contain three parts separated by dots.",
    };
  }

  try {
    const headerStr = base64UrlDecode(parts[0]);
    const payloadStr = base64UrlDecode(parts[1]);

    const header = JSON.parse(headerStr);
    const payload = JSON.parse(payloadStr);

    return {
      header,
      payload,
      signature: parts[2],
      isValid: true,
    };
  } catch (error) {
    return {
      header: null,
      payload: null,
      signature: parts[2] || "",
      isValid: false,
      error: `Failed to decode JWT: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export function analyzeToken(decoded: JWTDecoded): TokenAnalysis {
  const analysis: TokenAnalysis = {
    isExpired: false,
    claims: [],
  };

  if (!decoded.payload) {
    return analysis;
  }

  const payload = decoded.payload;
  const now = Math.floor(Date.now() / 1000);

  // Check expiration
  if (payload.exp) {
    analysis.expirationTime = new Date(payload.exp * 1000).toISOString();
    analysis.isExpired = payload.exp < now;
  }

  // Check issued at
  if (payload.iat) {
    analysis.issuedAt = new Date(payload.iat * 1000).toISOString();
  }

  // Check not before
  if (payload.nbf) {
    analysis.notBefore = new Date(payload.nbf * 1000).toISOString();
  }

  // Extract standard claims
  if (payload.iss) analysis.issuer = payload.iss;
  if (payload.aud) analysis.audience = Array.isArray(payload.aud) ? payload.aud.join(", ") : payload.aud;
  if (payload.sub) analysis.subject = payload.sub;

  // Collect all claims
  analysis.claims = Object.keys(payload).filter((key) =>
    COMMON_CLAIMS.includes(key)
  );

  return analysis;
}

export function saveToHistory(token: string, decoded: JWTDecoded): void {
  try {
    const history = JSON.parse(localStorage.getItem("jwtDebuggerHistory") || "[]");
    const entry = {
      token: token.substring(0, 50),
      fullToken: token,
      decoded: decoded.payload ? JSON.stringify(decoded.payload).substring(0, 100) : "",
      timestamp: new Date().toISOString(),
    };

    history.unshift(entry);
    if (history.length > 10) {
      history.pop();
    }

    localStorage.setItem("jwtDebuggerHistory", JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}

export function getHistory(): Array<{
  token: string;
  fullToken: string;
  decoded: string;
  timestamp: string;
}> {
  try {
    return JSON.parse(localStorage.getItem("jwtDebuggerHistory") || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem("jwtDebuggerHistory");
}

export const EXAMPLE_TOKENS = {
  simple: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  withExpiration: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U",
  oauth: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJhdWQiOiJteS1hcHAiLCJzdWIiOiJ1c2VyMTIzIiwic2NvcGUiOiJyZWFkIHdyaXRlIn0.signature",
};
