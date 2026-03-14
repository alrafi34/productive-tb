import { AngleMode, CalculationHistory } from './types';

const HISTORY_KEY = 'scientific-calculator-history';
const MAX_HISTORY = 50;

// Convert degrees to radians
export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Convert radians to degrees
export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// Format number for display
export function formatNumber(num: number): string {
  if (!isFinite(num)) return 'Error';
  if (Math.abs(num) < 1e-10) return '0';
  
  // Scientific notation for very large or small numbers
  if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(6);
  }
  
  // Regular formatting
  const str = num.toString();
  if (str.length > 12) {
    return parseFloat(num.toPrecision(10)).toString();
  }
  return str;
}

// Evaluate mathematical expression
export function evaluateExpression(expr: string, angleMode: AngleMode): { result: number; error?: string } {
  try {
    if (!expr || expr.trim() === '') {
      return { result: 0 };
    }

    // Replace mathematical symbols and functions
    let processedExpr = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, Math.PI.toString())
      .replace(/e(?![0-9])/g, Math.E.toString())
      .replace(/\^/g, '**');

    // Handle trigonometric functions
    const trigFunctions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
    trigFunctions.forEach(fn => {
      const regex = new RegExp(`${fn}\\(([^)]+)\\)`, 'g');
      processedExpr = processedExpr.replace(regex, (match, arg) => {
        const value = evaluateExpression(arg, angleMode).result;
        let result: number;
        
        if (fn === 'sin') {
          result = angleMode === 'deg' ? Math.sin(toRadians(value)) : Math.sin(value);
        } else if (fn === 'cos') {
          result = angleMode === 'deg' ? Math.cos(toRadians(value)) : Math.cos(value);
        } else if (fn === 'tan') {
          result = angleMode === 'deg' ? Math.tan(toRadians(value)) : Math.tan(value);
        } else if (fn === 'asin') {
          result = Math.asin(value);
          result = angleMode === 'deg' ? toDegrees(result) : result;
        } else if (fn === 'acos') {
          result = Math.acos(value);
          result = angleMode === 'deg' ? toDegrees(result) : result;
        } else if (fn === 'atan') {
          result = Math.atan(value);
          result = angleMode === 'deg' ? toDegrees(result) : result;
        } else {
          result = 0;
        }
        
        return result.toString();
      });
    });

    // Handle logarithmic functions
    processedExpr = processedExpr.replace(/log\(([^)]+)\)/g, (match, arg) => {
      const value = evaluateExpression(arg, angleMode).result;
      return Math.log10(value).toString();
    });

    processedExpr = processedExpr.replace(/ln\(([^)]+)\)/g, (match, arg) => {
      const value = evaluateExpression(arg, angleMode).result;
      return Math.log(value).toString();
    });

    // Handle square root
    processedExpr = processedExpr.replace(/√\(([^)]+)\)/g, (match, arg) => {
      const value = evaluateExpression(arg, angleMode).result;
      return Math.sqrt(value).toString();
    });

    processedExpr = processedExpr.replace(/sqrt\(([^)]+)\)/g, (match, arg) => {
      const value = evaluateExpression(arg, angleMode).result;
      return Math.sqrt(value).toString();
    });

    // Handle factorial
    processedExpr = processedExpr.replace(/(\d+)!/g, (match, num) => {
      return factorial(parseInt(num)).toString();
    });

    // Evaluate the expression safely
    const result = Function(`'use strict'; return (${processedExpr})`)();
    
    if (typeof result !== 'number' || !isFinite(result)) {
      return { result: 0, error: 'Invalid calculation' };
    }

    return { result };
  } catch (error) {
    return { result: 0, error: 'Invalid expression' };
  }
}

// Calculate factorial
export function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // Prevent overflow
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// History management
export function saveToHistory(expression: string, result: string): void {
  if (typeof window === 'undefined') return;

  const history = getHistory();
  const item: CalculationHistory = {
    id: crypto.randomUUID(),
    expression,
    result,
    timestamp: Date.now()
  };

  history.unshift(item);
  const trimmed = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): CalculationHistory[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export history as JSON
export function exportHistoryAsJSON(history: CalculationHistory[]): void {
  const json = JSON.stringify(history, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `calculator-history-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Generate random number
export function generateRandomNumber(min: number = 0, max: number = 100): number {
  return Math.random() * (max - min) + min;
}
