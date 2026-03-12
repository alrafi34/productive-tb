// Email Obfuscation Logic

// Validate email format
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// HTML Character Code Encoding
export function encodeToHtmlCharCodes(email: string): string {
  return email
    .split('')
    .map(char => `&#${char.charCodeAt(0)};`)
    .join('');
}

// Hexadecimal Encoding
export function encodeToHex(email: string): string {
  return email
    .split('')
    .map(char => `&#x${char.charCodeAt(0).toString(16)};`)
    .join('');
}

// JavaScript Obfuscation
export function encodeToJavaScript(email: string): string {
  const charCodes = email.split('').map(char => char.charCodeAt(0)).join(',');
  const randomId = Math.random().toString(36).substring(2, 8);
  
  return `<script id="${randomId}">
document.write(String.fromCharCode(${charCodes}));
</script>`;
}

// Mixed Encoding (Random mix of decimal and hex)
export function encodeToMixed(email: string): string {
  return email
    .split('')
    .map(char => {
      const useHex = Math.random() > 0.5;
      if (useHex) {
        return `&#x${char.charCodeAt(0).toString(16)};`;
      } else {
        return `&#${char.charCodeAt(0)};`;
      }
    })
    .join('');
}

// Mailto Link Generator
export function generateMailtoLink(email: string, linkText: string = "Email Me"): string {
  const encoded = encodeToHtmlCharCodes(email);
  return `<a href="mailto:${encoded}">${linkText}</a>`;
}

// Mailto Link with Hex
export function generateMailtoLinkHex(email: string, linkText: string = "Email Me"): string {
  const encoded = encodeToHex(email);
  return `<a href="mailto:${encoded}">${linkText}</a>`;
}

// HTML Snippet Generator
export function generateHtmlSnippet(email: string, encoding: 'decimal' | 'hex' | 'mixed'): string {
  const randomId = Math.random().toString(36).substring(2, 8);
  let encoded = '';
  
  switch (encoding) {
    case 'decimal':
      encoded = encodeToHtmlCharCodes(email);
      break;
    case 'hex':
      encoded = encodeToHex(email);
      break;
    case 'mixed':
      encoded = encodeToMixed(email);
      break;
  }
  
  return `<p id="${randomId}">Contact us at: ${encoded}</p>`;
}

// Decode obfuscated email
export function decodeObfuscatedEmail(encoded: string): string {
  // Create a temporary element to decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = encoded;
  return textarea.value;
}

// Batch encode emails
export function batchEncodeEmails(emails: string[], encoding: 'decimal' | 'hex' | 'mixed'): { email: string; encoded: string }[] {
  return emails.map(email => {
    let encoded = '';
    switch (encoding) {
      case 'decimal':
        encoded = encodeToHtmlCharCodes(email);
        break;
      case 'hex':
        encoded = encodeToHex(email);
        break;
      case 'mixed':
        encoded = encodeToMixed(email);
        break;
    }
    return { email, encoded };
  });
}

// Calculate spam risk
export function calculateSpamRisk(email: string, isEncoded: boolean): { level: string; color: string; message: string } {
  if (!isEncoded) {
    return {
      level: 'High',
      color: 'text-red-600',
      message: 'Plain text emails are easily scraped by bots'
    };
  }
  
  return {
    level: 'Low',
    color: 'text-green-600',
    message: 'Obfuscated emails are harder for bots to detect'
  };
}

// Generate random ID
export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 8);
}
