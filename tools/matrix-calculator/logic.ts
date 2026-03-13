export type MatrixOperation = 'add' | 'subtract' | 'multiply' | 'determinant' | 'inverse' | 'transpose';

export interface MatrixResult {
  success: boolean;
  result?: number[][];
  scalar?: number;
  error?: string;
  message?: string;
}

export interface CalculationHistory {
  id: string;
  operation: MatrixOperation;
  matrixA: number[][];
  matrixB?: number[][];
  result: MatrixResult;
  timestamp: number;
}

// Validate matrix
export function isValidMatrix(matrix: any[][]): boolean {
  if (!Array.isArray(matrix) || matrix.length === 0) return false;
  const cols = matrix[0].length;
  if (cols === 0) return false;
  
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== cols) return false;
    for (const val of row) {
      if (typeof val !== 'number' || isNaN(val)) return false;
    }
  }
  return true;
}

// Matrix addition
export function addMatrices(a: number[][], b: number[][]): MatrixResult {
  if (!isValidMatrix(a) || !isValidMatrix(b)) {
    return { success: false, error: 'Invalid matrix format' };
  }
  
  if (a.length !== b.length || a[0].length !== b[0].length) {
    return { success: false, error: 'Matrices must have same dimensions' };
  }
  
  const result = a.map((row, i) => row.map((val, j) => val + b[i][j]));
  return { success: true, result };
}

// Matrix subtraction
export function subtractMatrices(a: number[][], b: number[][]): MatrixResult {
  if (!isValidMatrix(a) || !isValidMatrix(b)) {
    return { success: false, error: 'Invalid matrix format' };
  }
  
  if (a.length !== b.length || a[0].length !== b[0].length) {
    return { success: false, error: 'Matrices must have same dimensions' };
  }
  
  const result = a.map((row, i) => row.map((val, j) => val - b[i][j]));
  return { success: true, result };
}

// Matrix multiplication
export function multiplyMatrices(a: number[][], b: number[][]): MatrixResult {
  if (!isValidMatrix(a) || !isValidMatrix(b)) {
    return { success: false, error: 'Invalid matrix format' };
  }
  
  if (a[0].length !== b.length) {
    return { success: false, error: `Incompatible dimensions: ${a.length}x${a[0].length} and ${b.length}x${b[0].length}` };
  }
  
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = Math.round(sum * 1e10) / 1e10; // Fix floating point errors
    }
  }
  
  return { success: true, result };
}

// Matrix determinant (2x2 and NxN using LU decomposition)
export function determinant(matrix: number[][]): MatrixResult {
  if (!isValidMatrix(matrix)) {
    return { success: false, error: 'Invalid matrix format' };
  }
  
  if (matrix.length !== matrix[0].length) {
    return { success: false, error: 'Matrix must be square' };
  }
  
  const n = matrix.length;
  
  if (n === 1) {
    return { success: true, scalar: matrix[0][0] };
  }
  
  if (n === 2) {
    const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    return { success: true, scalar: Math.round(det * 1e10) / 1e10 };
  }
  
  // LU decomposition for larger matrices
  const a = matrix.map(row => [...row]);
  let det = 1;
  
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(a[k][i]) > Math.abs(a[maxRow][i])) {
        maxRow = k;
      }
    }
    
    if (Math.abs(a[maxRow][i]) < 1e-10) {
      return { success: true, scalar: 0 };
    }
    
    if (maxRow !== i) {
      [a[i], a[maxRow]] = [a[maxRow], a[i]];
      det *= -1;
    }
    
    det *= a[i][i];
    
    for (let k = i + 1; k < n; k++) {
      const factor = a[k][i] / a[i][i];
      for (let j = i; j < n; j++) {
        a[k][j] -= factor * a[i][j];
      }
    }
  }
  
  return { success: true, scalar: Math.round(det * 1e10) / 1e10 };
}

// Matrix inverse using Gauss-Jordan elimination
export function inverseMatrix(matrix: number[][]): MatrixResult {
  if (!isValidMatrix(matrix)) {
    return { success: false, error: 'Invalid matrix format' };
  }
  
  if (matrix.length !== matrix[0].length) {
    return { success: false, error: 'Matrix must be square' };
  }
  
  const n = matrix.length;
  const det = determinant(matrix);
  
  if (!det.success || det.scalar === 0) {
    return { success: false, error: 'Matrix is singular (determinant = 0), cannot invert' };
  }
  
  // Create augmented matrix [A | I]
  const augmented: number[][] = [];
  for (let i = 0; i < n; i++) {
    augmented[i] = [...matrix[i], ...Array(n).fill(0)];
    augmented[i][n + i] = 1;
  }
  
  // Gauss-Jordan elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = k;
      }
    }
    
    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
    
    // Scale pivot row
    const pivot = augmented[i][i];
    for (let j = 0; j < 2 * n; j++) {
      augmented[i][j] /= pivot;
    }
    
    // Eliminate column
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = augmented[k][i];
        for (let j = 0; j < 2 * n; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }
  }
  
  // Extract inverse from augmented matrix
  const result: number[][] = [];
  for (let i = 0; i < n; i++) {
    result[i] = augmented[i].slice(n).map(val => Math.round(val * 1e10) / 1e10);
  }
  
  return { success: true, result };
}

// Matrix transpose
export function transposeMatrix(matrix: number[][]): MatrixResult {
  if (!isValidMatrix(matrix)) {
    return { success: false, error: 'Invalid matrix format' };
  }
  
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result: number[][] = Array(cols).fill(null).map(() => Array(rows));
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  
  return { success: true, result };
}

// Perform operation
export function performOperation(
  operation: MatrixOperation,
  matrixA: number[][],
  matrixB?: number[][]
): MatrixResult {
  switch (operation) {
    case 'add':
      return matrixB ? addMatrices(matrixA, matrixB) : { success: false, error: 'Second matrix required' };
    case 'subtract':
      return matrixB ? subtractMatrices(matrixA, matrixB) : { success: false, error: 'Second matrix required' };
    case 'multiply':
      return matrixB ? multiplyMatrices(matrixA, matrixB) : { success: false, error: 'Second matrix required' };
    case 'determinant':
      return determinant(matrixA);
    case 'inverse':
      return inverseMatrix(matrixA);
    case 'transpose':
      return transposeMatrix(matrixA);
    default:
      return { success: false, error: 'Unknown operation' };
  }
}

// Convert matrix to CSV
export function matrixToCSV(matrix: number[][]): string {
  return matrix.map(row => row.map(val => {
    const str = val.toString();
    return str.includes(',') ? `"${str}"` : str;
  }).join(',')).join('\n');
}

// Parse matrix from string
export function parseMatrix(input: string): number[][] | null {
  try {
    const lines = input.trim().split('\n').filter(line => line.trim());
    const matrix: number[][] = [];
    
    for (const line of lines) {
      const values = line.split(/[\s,;]+/).filter(v => v.trim());
      const row: number[] = [];
      
      for (const val of values) {
        const num = parseFloat(val);
        if (isNaN(num)) return null;
        row.push(num);
      }
      
      if (row.length > 0) {
        matrix.push(row);
      }
    }
    
    return matrix.length > 0 ? matrix : null;
  } catch {
    return null;
  }
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Local storage helpers
const HISTORY_KEY = 'matrix-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(
  operation: MatrixOperation,
  matrixA: number[][],
  result: MatrixResult,
  matrixB?: number[][]
): void {
  if (typeof window === 'undefined') return;

  const stored = getHistory();
  const item: CalculationHistory = {
    id: crypto.randomUUID(),
    operation,
    matrixA,
    matrixB,
    result,
    timestamp: Date.now()
  };

  stored.unshift(item);
  const trimmed = stored.slice(0, MAX_HISTORY);
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

// Export functions
export function exportAsCSV(matrix: number[][], filename: string = 'matrix'): void {
  const csv = matrixToCSV(matrix);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Example matrices
export const EXAMPLE_MATRICES = {
  identity2x2: [[1, 0], [0, 1]],
  identity3x3: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  example2x2: [[1, 2], [3, 4]],
  example3x3: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  example2x3: [[1, 2, 3], [4, 5, 6]],
};
