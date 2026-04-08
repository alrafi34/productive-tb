export interface PrimeCheckResult {
  isPrime: boolean;
  number: number;
  factors?: number[];
  explanation: string;
}

export interface SieveResult {
  primes: number[];
  totalCount: number;
  maxNumber: number;
}

export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export function checkPrime(n: number): PrimeCheckResult {
  if (n < 2) {
    return {
      isPrime: false,
      number: n,
      explanation: "Numbers less than 2 are not prime numbers."
    };
  }

  if (n === 2) {
    return {
      isPrime: true,
      number: n,
      explanation: "2 is the only even prime number."
    };
  }

  if (n % 2 === 0) {
    return {
      isPrime: false,
      number: n,
      factors: [2, n / 2],
      explanation: `${n} is divisible by 2, so it's not prime.`
    };
  }

  const factors: number[] = [];
  const limit = Math.sqrt(n);
  
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }

  if (factors.length > 0) {
    factors.sort((a, b) => a - b);
    return {
      isPrime: false,
      number: n,
      factors,
      explanation: `${n} is divisible by: ${factors.join(", ")}`
    };
  }

  return {
    isPrime: true,
    number: n,
    explanation: `${n} is a prime number! It's only divisible by 1 and itself.`
  };
}

export function sieveOfEratosthenes(limit: number): SieveResult {
  if (limit < 2) {
    return { primes: [], totalCount: 0, maxNumber: limit };
  }

  const isPrimeArray = new Array(limit + 1).fill(true);
  isPrimeArray[0] = isPrimeArray[1] = false;

  for (let i = 2; i * i <= limit; i++) {
    if (isPrimeArray[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrimeArray[j] = false;
      }
    }
  }

  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrimeArray[i]) {
      primes.push(i);
    }
  }

  return {
    primes,
    totalCount: primes.length,
    maxNumber: limit
  };
}

export function formatPrimeList(primes: number[]): string {
  return primes.join(", ");
}

export function exportPrimesAsCSV(primes: number[]): string {
  let csv = "Index,Prime Number\n";
  primes.forEach((prime, index) => {
    csv += `${index + 1},${prime}\n`;
  });
  return csv;
}

export function exportPrimesAsJSON(primes: number[]): string {
  return JSON.stringify({
    primes,
    count: primes.length,
    generated: new Date().toISOString()
  }, null, 2);
}

export function getPrimeDensity(primes: number[], limit: number): number {
  return (primes.length / limit) * 100;
}