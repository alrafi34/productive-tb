// Bcrypt Hash Verification Logic
import bcrypt from 'bcryptjs';

export interface HashMetadata {
  version: string;
  cost: number;
  salt: string;
  hashLength: number;
  isValid: boolean;
}

export interface VerificationResult {
  matches: boolean;
  metadata: HashMetadata | null;
  error?: string;
}

// Validate Bcrypt hash format
export function isValidBcryptHash(hash: string): boolean {
  // Bcrypt hash format: $2a$10$... or $2b$10$... or $2y$10$...
  const bcryptRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;
  return bcryptRegex.test(hash);
}

// Extract metadata from Bcrypt hash
export function extractHashMetadata(hash: string): HashMetadata | null {
  if (!hash || hash.length < 7) {
    return null;
  }

  try {
    // Bcrypt format: $2a$10$saltsaltsaltsaltsalthashhashhashhashhashhashhash
    const parts = hash.split('$');
    
    if (parts.length < 4) {
      return {
        version: 'unknown',
        cost: 0,
        salt: '',
        hashLength: hash.length,
        isValid: false
      };
    }

    const version = parts[1]; // 2a, 2b, or 2y
    const cost = parseInt(parts[2], 10);
    const saltAndHash = parts[3] || '';
    const salt = saltAndHash.substring(0, 22); // First 22 chars are salt

    return {
      version,
      cost,
      salt,
      hashLength: hash.length,
      isValid: isValidBcryptHash(hash)
    };
  } catch (error) {
    return null;
  }
}

// Verify password against hash
export async function verifyPassword(password: string, hash: string): Promise<VerificationResult> {
  if (!password) {
    return {
      matches: false,
      metadata: null,
      error: 'Password is required'
    };
  }

  if (!hash) {
    return {
      matches: false,
      metadata: null,
      error: 'Hash is required'
    };
  }

  const metadata = extractHashMetadata(hash);

  if (!metadata || !metadata.isValid) {
    return {
      matches: false,
      metadata,
      error: 'Invalid Bcrypt hash format'
    };
  }

  try {
    const matches = await bcrypt.compare(password, hash);
    return {
      matches,
      metadata,
      error: undefined
    };
  } catch (error) {
    return {
      matches: false,
      metadata,
      error: 'Verification failed: ' + (error as Error).message
    };
  }
}

// Generate Bcrypt hash
export async function generateHash(password: string, cost: number = 10): Promise<string> {
  if (!password) {
    throw new Error('Password is required');
  }

  if (cost < 4 || cost > 31) {
    throw new Error('Cost factor must be between 4 and 31');
  }

  return await bcrypt.hash(password, cost);
}

// Batch verify passwords
export async function batchVerifyPasswords(
  passwords: string[],
  hash: string
): Promise<{ password: string; matches: boolean }[]> {
  const results: { password: string; matches: boolean }[] = [];

  for (const password of passwords) {
    const result = await verifyPassword(password, hash);
    results.push({
      password,
      matches: result.matches
    });
  }

  return results;
}

// Analyze hash strength based on cost factor
export function analyzeHashStrength(cost: number): {
  level: string;
  color: string;
  description: string;
} {
  if (cost < 8) {
    return {
      level: 'Low Security',
      color: 'text-red-600',
      description: 'Cost factor is too low. Vulnerable to brute force attacks.'
    };
  } else if (cost >= 8 && cost <= 9) {
    return {
      level: 'Moderate',
      color: 'text-yellow-600',
      description: 'Acceptable but consider increasing to 10-12 for better security.'
    };
  } else if (cost >= 10 && cost <= 12) {
    return {
      level: 'Recommended',
      color: 'text-green-600',
      description: 'Good balance between security and performance.'
    };
  } else {
    return {
      level: 'High Security',
      color: 'text-blue-600',
      description: 'Very secure but may impact performance. Suitable for sensitive data.'
    };
  }
}

// Get version description
export function getVersionDescription(version: string): string {
  switch (version) {
    case '2a':
      return 'Original Bcrypt version';
    case '2b':
      return 'Recommended version (fixes bugs in 2a)';
    case '2y':
      return 'PHP-specific version';
    default:
      return 'Unknown version';
  }
}

// Calculate approximate hash time
export function estimateHashTime(cost: number): string {
  // Rough estimates based on modern hardware
  const baseTime = 0.001; // 1ms for cost 4
  const time = baseTime * Math.pow(2, cost - 4);
  
  if (time < 1) {
    return `~${Math.round(time * 1000)}ms`;
  } else if (time < 60) {
    return `~${Math.round(time)}s`;
  } else {
    return `~${Math.round(time / 60)}min`;
  }
}
